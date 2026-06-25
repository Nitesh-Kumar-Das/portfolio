'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from './About'
import { Mail, Linkedin, Github } from 'lucide-react'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const CONTACTS = [
  {
    label: 'Email',
    href: 'mailto:niteshkumardas2025@gmail.com',
    Icon: Mail,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nitesh-kumar-das-224434297',
    Icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Nitesh-Kumar-Das',
    Icon: Github,
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="relative py-32 px-6 md:px-16" style={{ zIndex: 1 }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-2xl mx-auto text-center"
      >
        <SectionLabel label="OPEN CHANNEL" />

        <motion.h2
          variants={reveal}
          className="font-display font-bold mt-2 mb-5"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--stellar-white)' }}
        >
          Get In Touch
        </motion.h2>

        <motion.p
          variants={reveal}
          className="font-body text-[15px] leading-relaxed mb-10"
          style={{ color: 'var(--stardust)' }}
        >
          Open to roles in AI engineering, LLM systems, and full-stack development.
          Let&apos;s build something worth launching.
        </motion.p>

        <motion.div
          variants={stagger}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          {CONTACTS.map(({ label, href, Icon }) => (
            <motion.a
              key={label}
              variants={reveal}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-mono text-[12px] tracking-wider px-6 py-3 rounded-md w-full sm:w-auto justify-center transition-all duration-200"
              style={{
                backgroundColor: 'var(--glass-bg)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--glass-border)',
                color: 'var(--stardust)',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--aurora-cyan)'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--aurora-cyan)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(0,229,255,0.2)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border)'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--stardust)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <Icon size={14} />
              {label}
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={reveal}
          className="pt-8"
          style={{ borderTop: '1px dashed rgba(0,229,255,0.15)' }}
        >
          <p
            className="font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{ color: 'rgba(0,229,255,0.3)' }}
          >
            -- END OF TRANSMISSION -- 2025 -- NITESH KUMAR DAS --
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
