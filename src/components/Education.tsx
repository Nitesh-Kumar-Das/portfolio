'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ACHIEVEMENTS } from '@/data/content'
import { SectionLabel } from './About'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-28 px-6 md:px-16" style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto">
        <SectionLabel label="CREDENTIALS" />
        <h2
          className="font-display font-bold mb-14 mt-1"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--stellar-white)' }}
        >
          Education & Achievements
        </h2>

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        >
          {/* Education card */}
          <motion.div
            variants={reveal}
            className="rounded-xl p-7"
            style={{
              backgroundColor: 'var(--glass-bg)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3
                  className="font-display font-bold text-[18px] leading-tight"
                  style={{ color: 'var(--stellar-white)' }}
                >
                  Guru Tegh Bahadur Institute of Technology
                </h3>
                <p className="font-mono text-[11px] mt-1" style={{ color: 'var(--aurora-cyan)' }}>
                  B.Tech · Artificial Intelligence & Data Science
                </p>
              </div>
              <span
                className="font-mono text-[10px] px-2.5 py-1 rounded-md shrink-0 ml-3"
                style={{
                  backgroundColor: 'rgba(0,229,255,0.08)',
                  border: '1px solid rgba(0,229,255,0.2)',
                  color: 'var(--aurora-cyan)',
                }}
              >
                2026
              </span>
            </div>

            <p
              className="font-mono text-[11px] mb-2 uppercase tracking-widest"
              style={{ color: 'var(--stardust)' }}
            >
              CGPA
            </p>
            <div
              className="relative h-2 rounded-full overflow-hidden mb-1.5"
              style={{ backgroundColor: 'rgba(0,229,255,0.1)' }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, var(--aurora-cyan), var(--aurora-teal))',
                  boxShadow: '0 0 10px rgba(0,229,255,0.5)',
                }}
                initial={{ width: 0 }}
                animate={isInView ? { width: '86.3%' } : { width: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              />
            </div>
            <p className="font-mono text-[12px]" style={{ color: 'var(--aurora-cyan)' }}>
              8.63 / 10.0
            </p>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={stagger} className="flex flex-col gap-4">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div
                key={i}
                variants={reveal}
                className="flex items-start gap-4 rounded-xl px-5 py-4"
                style={{
                  backgroundColor: 'var(--glass-bg)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--glass-border)',
                  borderLeft: '2px solid var(--aurora-cyan)',
                }}
              >
                <span
                  className="text-[18px] shrink-0 mt-0.5"
                  style={{ color: 'var(--aurora-cyan)' }}
                >
                  {a.glyph}
                </span>
                <div>
                  <p
                    className="font-display font-bold text-[14px]"
                    style={{ color: 'var(--stellar-white)' }}
                  >
                    {a.title}
                  </p>
                  <p className="font-mono text-[11px] mt-0.5" style={{ color: 'var(--stardust)' }}>
                    {a.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
