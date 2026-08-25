"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { StickyNote } from "@/components/ui/StickyNote";
import { SketchBadge, SketchDivider } from "@/components/sketch/Sketch";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { profile } from "@/lib/content";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

export function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactValues) => {
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({
          kind: "error",
          message: payload.error ?? "Something went wrong. Please try the address below.",
        });
        return;
      }
      reset();
      setStatus({ kind: "sent" });
    } catch {
      // Offline, DNS failure, request blocked. The address below still works.
      setStatus({
        kind: "error",
        message: "Couldn't reach the server. Please use the address below instead.",
      });
    }
  };

  const sending = status.kind === "sending";

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-20 md:px-8">
      <div className="mb-8">
        <StickyNote>Contact</StickyNote>
      </div>
      <h2 className="mb-4 font-hand text-4xl md:text-5xl">Drop me a note</h2>
      <p className="mb-12 font-body text-lg md:text-xl">
        Open to full-stack and AI engineering work. Messages land straight in my inbox.
      </p>

      {/* Framed as a handwritten note torn from the same pad. */}
      <div className="relative rotate-1 rounded-wobbly border-[3px] border-pencil bg-white p-6 shadow-hard-lg md:p-8">
        {status.kind === "sent" ? (
          <div className="flex flex-col items-start gap-4 py-6" role="status">
            <h3 className="font-hand text-3xl">Sent. Thanks!</h3>
            <p className="font-body text-lg">
              I&rsquo;ll reply to you directly, usually within a day or two.
            </p>
            <Button variant="secondary" onClick={() => setStatus({ kind: "idle" })}>
              Send another
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8" noValidate>
            <Input
              id="name"
              label="Your name"
              placeholder="Ada Lovelace"
              autoComplete="name"
              disabled={sending}
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              id="email"
              label="Your email"
              type="email"
              placeholder="ada@example.com"
              autoComplete="email"
              disabled={sending}
              error={errors.email?.message}
              {...register("email")}
            />
            <Textarea
              id="message"
              label="Message"
              placeholder="What are you building?"
              disabled={sending}
              error={errors.message?.message}
              {...register("message")}
            />

            {/*
              Honeypot. Hidden from people and from assistive tech, but present
              in the DOM for naive bots to fill in. aria-hidden + tabIndex -1
              keeps it out of the keyboard path entirely.
            */}
            <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="company">Company (leave this empty)</label>
              <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
            </div>

            <div className="flex flex-wrap items-center gap-8">
              <Button type="submit" disabled={sending}>
                {sending ? "Sending…" : "Send it"}
                <Send size={20} strokeWidth={3} aria-hidden="true" />
              </Button>

              {status.kind === "error" && (
                <p role="alert" className="font-body text-lg text-accent-ink">
                  {status.message}
                </p>
              )}
            </div>
          </form>
        )}
      </div>

      <SketchDivider className="my-12 text-pencil/40" />

      <ul className="flex flex-wrap gap-x-8 gap-y-4">
        <li>
          <a
            href={`mailto:${profile.email}`}
            className="wavy-underline inline-flex min-h-12 items-center gap-2 font-body text-lg"
          >
            <Mail size={22} strokeWidth={2.5} aria-hidden="true" />
            {profile.email}
          </a>
        </li>
        <li>
          <a
            href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
            className="wavy-underline inline-flex min-h-12 items-center gap-2 font-body text-lg"
          >
            <Phone size={22} strokeWidth={2.5} aria-hidden="true" />
            {profile.phone}
          </a>
        </li>
        <li>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="wavy-underline inline-flex min-h-12 items-center gap-2 font-body text-lg"
          >
            <SketchBadge>GH</SketchBadge>
            GitHub
          </a>
        </li>
        <li>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="wavy-underline inline-flex min-h-12 items-center gap-2 font-body text-lg"
          >
            <SketchBadge>in</SketchBadge>
            LinkedIn
          </a>
        </li>
      </ul>
    </section>
  );
}
