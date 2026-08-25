/**
 * Cloudflare Web Analytics beacon.
 *
 * Manual embed rather than Cloudflare's one-click injection: automatic
 * injection only works for a domain proxied through Cloudflare (orange-clouded),
 * which a workers.dev deployment is not.
 *
 * The site token is public by design — it ends up in the HTML of every page —
 * so NEXT_PUBLIC_ is correct here and nothing secret is exposed. It is read
 * from the environment anyway so the value is not hardcoded in source.
 *
 * Renders nothing when the token is missing or outside production, which keeps
 * local development out of your analytics and makes the site safe to build
 * before you have created the site in the Cloudflare dashboard.
 *
 * No Subresource Integrity hash, deliberately. Cloudflare does not version-pin
 * beacon.min.js so they can ship security fixes to it, and their own docs state
 * there is no safe way to apply `integrity` to a manual embed — a pinned hash
 * would break the script the moment they update it. Automatic injection is the
 * only path that gets SRI, and that requires a proxied domain.
 */
export function WebAnalytics() {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
  if (!token || process.env.NODE_ENV !== "production") return null;

  return (
    <script
      // type="module" is required for manual embeds; without it the beacon
      // throws a syntax error in very old browsers.
      type="module"
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
