'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EXPERIENCE } from '@/data/content'
import { SectionLabel } from './About'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="relative py-28 px-6 md:px-16" style={{ zIndex: 1 }}>
      <div className="max-w-4xl mx-auto">
        <SectionLabel label="MISSION LOG" />
        <h2
          className="font-display font-bold mb-14 mt-1"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--stellar-white)' }}
        >
          Experience
        </h2>

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-4 top-2 bottom-2 w-px hidden md:block"
            style={{ background: 'linear-gradient(180deg, var(--aurora-cyan), transparent)' }}
          />

          {EXPERIENCE.map((entry, i) => (
            <motion.div
              key={i}
              variants={reveal}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: i * 0.12 }}
              className="relative md:pl-14 mb-8"
            >
              {/* Timeline dot */}
              <div
                className="hidden md:block absolute left-0 top-5 w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--void)',
                  border: '1.5px solid var(--aurora-cyan)',
                  boxShadow: '0 0 12px rgba(0,229,255,0.35)',
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--aurora-cyan)' }} />
              </div>

              {/* Card */}
              <div
                className="rounded-xl p-7"
                style={{
                  backgroundColor: 'var(--glass-bg)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3
                      className="font-display font-bold text-[20px]"
                      style={{ color: 'var(--stellar-white)' }}
                    >
                      {entry.role}
                    </h3>
                    <p className="font-mono text-[12px] mt-0.5" style={{ color: 'var(--aurora-cyan)' }}>
                      {entry.company} · {entry.location}
                    </p>
                  </div>
                  <span
                    className="font-mono text-[11px] px-3 py-1 rounded-md shrink-0 h-fit"
                    style={{
                      backgroundColor: 'rgba(0,229,255,0.08)',
                      border: '1px solid rgba(0,229,255,0.2)',
                      color: 'var(--aurora-cyan)',
                    }}
                  >
                    {entry.period}
                  </span>
                </div>

                <ul className="space-y-2 mb-5">
                  {entry.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-[13.5px] leading-relaxed">
                      <span className="mt-0.5 shrink-0" style={{ color: 'var(--aurora-cyan)' }}>▸</span>
                      <span style={{ color: 'var(--stardust)' }}>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {entry.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: 'rgba(0,229,255,0.07)',
                        border: '1px solid rgba(0,229,255,0.18)',
                        color: 'var(--aurora-teal)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
