import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export. Every page in this site is already static; the only dynamic
   * surface was /api/contact, which now lives in the Worker (see worker/).
   */
  output: "export",

  /**
   * Cloudflare has no sharp, so Next cannot optimise images at build time.
   * The hero is pre-converted to WebP (1.98MB PNG -> 166KB) and served as-is,
   * which is both smaller and host-independent.
   */
  images: { unoptimized: true },
};

export default nextConfig;
