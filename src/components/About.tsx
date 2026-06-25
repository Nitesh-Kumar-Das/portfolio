'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '@/data/content'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-28 px-6 md:px-16" style={{ zIndex: 1 }}>
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="SYSTEM.PROFILE" />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10"
        >
          {/* Terminal profile card */}
          <motion.div variants={reveal}>
            <div
              className="rounded-xl p-6 h-full"
              style={{
                backgroundColor: 'var(--glass-bg)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <p className="font-mono text-[11px] mb-5" style={{ color: 'var(--aurora-cyan)' }}>
                &gt; SYSTEM.PROFILE
              </p>
              {[
                ['Name', 'Nitesh Kumar Das'],
                ['Status', 'ACTIVE'],
                ['Role', 'AI/ML Engineer · Full-Stack Dev'],
                ['Location', 'Delhi NCR, India'],
                ['Institution', 'GTBIT'],
                ['CGPA', '8.63 / 10.0'],
                ['Current', 'LLM Post-Training Intern @ Ethara AI'],
              ].map(([key, val]) => (
                <div key={key} className="flex gap-3 mb-2.5 text-[13px]">
                  <span className="font-mono w-24 shrink-0" style={{ color: 'var(--aurora-cyan)' }}>
                    {key}
                  </span>
                  <span className="font-body" style={{ color: 'var(--stellar-white)' }}>
                    {val}
                  </span>
                </div>
              ))}
              <div className="mt-5 pt-4 border-t" style={{ borderColor: 'var(--glass-border)' }}>
                <a
                  href="/resume.pdf"
                  download="Nitesh_Kumar_Das_Resume.pdf"
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider py-2 px-4 rounded transition-all duration-200"
                  style={{
                    border: '1px solid rgba(0,229,255,0.3)',
                    color: 'var(--aurora-cyan)',
                    backgroundColor: 'rgba(0,229,255,0.03)',
                  }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--aurora-cyan)'
                    ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0,229,255,0.1)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(0,229,255,0.2)'
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,255,0.3)'
                    ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0,229,255,0.03)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  <span>&gt; DOWNLOAD_RESUME.EXE</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div variants={reveal} className="flex flex-col justify-center">
            <p
              className="font-body text-[15px] leading-[1.85] mb-5"
              style={{ color: 'var(--stardust)' }}
            >
              I build things that sit at the intersection of machine learning and production software.
              Currently working as an LLM Post-Training Intern at Ethara AI, where I contribute to
              evaluation workflows, write PRDs, and design rubrics for enterprise AI systems.
            </p>
            <p
              className="font-body text-[15px] leading-[1.85] mb-5"
              style={{ color: 'var(--stardust)' }}
            >
              Outside of that, I&apos;ve shipped AI-powered platforms ranging from multi-model agricultural
              systems trained on 150k+ samples, to GPT-integrated study tools and OCR-driven expense
              trackers — all the way to real-time chat with WebSocket infrastructure.
            </p>
            <p className="font-mono text-[12px]" style={{ color: 'var(--aurora-cyan)' }}>
              // Next target: production AI systems at scale.
            </p>
          </motion.div>
        </motion.div>

        {/* Stat row */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-3 gap-4 mt-12"
        >
          {STATS.map(stat => (
            <motion.div
              key={stat.label}
              variants={reveal}
              className="flex flex-col items-center justify-center py-7 rounded-xl"
              style={{
                backgroundColor: 'var(--glass-bg)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <span
                className="font-display font-bold"
                style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--aurora-cyan)' }}
              >
                {stat.value}
              </span>
              <span
                className="font-mono text-[10px] uppercase tracking-widest mt-1.5 text-center"
                style={{ color: 'var(--stardust)' }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="font-mono text-[11px] tracking-[0.2em]" style={{ color: 'var(--aurora-cyan)' }}>
        // {label}
      </span>
      <div
        className="flex-1 max-w-32 h-px"
        style={{ background: 'linear-gradient(90deg, rgba(0,229,255,0.4), transparent)' }}
      />
    </div>
  )
}
