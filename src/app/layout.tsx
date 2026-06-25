import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nitesh Kumar Das — AI/ML Engineer',
  description:
    'Portfolio of Nitesh Kumar Das — AI/ML Engineer, Full-Stack Developer, LLM Evaluation Specialist. Building production-grade ML systems and full-stack applications.',
  keywords: ['AI', 'ML', 'Full-Stack', 'Next.js', 'FastAPI', 'PyTorch', 'LLM'],
  authors: [{ name: 'Nitesh Kumar Das' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
