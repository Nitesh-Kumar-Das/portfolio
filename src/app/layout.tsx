import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../style/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nitesh Kumar Das | Full-Stack Developer & AI Engineer",
  description:
    "Full-Stack Developer specializing in AI, ML, and modern web technologies. Expert in building intelligent applications, chatbots, and data-driven solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Remove PolygonBg from global layout so it only appears in Hero */}
        {/* <PolygonBg /> */}
        {children}
      </body>
    </html>
  );
}
