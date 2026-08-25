import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { profile } from "@/lib/content";

/**
 * Contact endpoint. Sends via Resend.
 *
 * The API key is read at REQUEST time, not module scope, so a missing key
 * produces a clean 503 at runtime instead of blowing up the build.
 */

// Simple fixed-window limiter. In-memory, so it is per server instance and
// resets on redeploy — which is the right trade for a personal site. If this
// ever needs to be real, move it to Upstash/Redis; the shape stays the same.
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }
  if (entry.count >= MAX_PER_WINDOW) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true, retryAfter: 0 };
}

// Keep the map from growing without bound on a long-lived instance.
function sweep() {
  const now = Date.now();
  for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
}

function clientKey(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email isn't configured yet. Please use the address below instead." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Server-side validation is the real gate; the client copy is only UX.
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 400 },
    );
  }

  const { name, email, message, company } = parsed.data;

  // Honeypot tripped: report success and send nothing. Telling a bot it failed
  // just teaches it which field to leave blank next time.
  if (company) return NextResponse.json({ ok: true });

  sweep();
  const limit = rateLimit(clientKey(req));
  if (!limit.ok) {
    return NextResponse.json(
      { error: "That's a few messages in a row. Please try again a bit later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const resend = new Resend(apiKey);

  /**
   * `from` must be an address on a domain verified in Resend. The
   * onboarding@resend.dev fallback works without any setup but ONLY delivers to
   * the Resend account owner's own address, so it is fine for local testing and
   * wrong for production. Set CONTACT_FROM once a domain is verified.
   */
  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO ?? profile.email;

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    subject: `Portfolio enquiry from ${name}`,
    // Lets a reply go straight back to the sender rather than to Resend.
    replyTo: email,
    text: `${message}\n\n---\nFrom: ${name} <${email}>`,
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.6">
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        <hr style="border:none;border-top:1px solid #e5e0d8;margin:24px 0" />
        <p style="color:#555">
          From <strong>${escapeHtml(name)}</strong>
          &lt;<a href="mailto:${encodeURIComponent(email)}">${escapeHtml(email)}</a>&gt;
        </p>
      </div>
    `,
  });

  if (error) {
    // Log the real reason server-side; return something a visitor can act on.
    console.error("[contact] resend error:", error);
    return NextResponse.json(
      { error: "Couldn't send that just now. Please use the address below instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: data?.id });
}
