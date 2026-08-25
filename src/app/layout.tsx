import type { Metadata, Viewport } from "next";
import { Kalam, Patrick_Hand } from "next/font/google";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollReveals } from "@/components/motion/ScrollReveals";
import { MailboxLoader } from "@/components/motion/MailboxLoader";
import { WebAnalytics } from "@/components/analytics/WebAnalytics";
import { profile } from "@/lib/content";
import "./globals.css";

/**
 * Self-hosted by next/font at build time — no runtime request to Google, and
 * fallback metrics are matched automatically so swapping in the real face
 * causes no layout shift (a hard requirement of the §9 CLS gate).
 */
const kalam = Kalam({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-kalam",
  display: "swap",
  fallback: ["Comic Sans MS", "cursive"],
});

const patrickHand = Patrick_Hand({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-patrick",
  display: "swap",
  fallback: ["Comic Sans MS", "cursive"],
});

export const metadata: Metadata = {
  title: `${profile.name}, Full-stack Developer`,
  description: profile.valueProp,
  openGraph: {
    title: `${profile.name}, Full-stack Developer`,
    description: profile.valueProp,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fdfbf7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${kalam.variable} ${patrickHand.variable}`}>
      <head>
        {/*
          Runs BEFORE first paint. sessionStorage cannot be read during SSR, so
          without this a returning visitor would see the loader paint and then
          vanish. Setting the attribute up front lets CSS suppress it instantly.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('nkd-intro-played')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.introSeen='1'}}catch(e){document.documentElement.dataset.introSeen='1'}",
          }}
        />
        {/* With JS off, nothing can dismiss the overlay, so never show it. */}
        <noscript>
          <style>{`.mailbox-overlay{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <MailboxLoader />
        {/* LazyMotion + `m` keeps Framer Motion at ~4.6KB instead of ~32KB.
            Using <motion.div> anywhere in the tree defeats this. */}
        <MotionRoot>
          <SmoothScroll>{children}</SmoothScroll>
          <ScrollReveals />
        </MotionRoot>
        <WebAnalytics />
      </body>
    </html>
  );
}
