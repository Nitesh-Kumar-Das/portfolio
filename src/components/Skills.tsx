'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SKILL_GROUPS } from '@/data/content'
import { SectionLabel } from './About'

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative py-28 px-6 md:px-16" style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto">
        <SectionLabel label="CAPABILITY MATRIX" />
        <h2
          className="font-display font-bold mb-14 mt-1"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--stellar-white)' }}
        >
          Technical Stack
        </h2>

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--glass-border)' }}
        >
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.label}
              variants={reveal}
              className="p-7"
              style={{
                backgroundColor: 'var(--glass-bg)',
                backdropFilter: 'blur(16px)',
                borderRight: i % 2 === 0 ? '1px solid var(--glass-border)' : 'none',
                borderBottom: i < 2 ? '1px solid var(--glass-border)' : 'none',
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <span style={{ color: 'var(--aurora-cyan)', fontSize: '14px' }}>{group.glyph}</span>
                <span
                  className="font-mono text-[11px] uppercase tracking-widest"
                  style={{ color: 'var(--aurora-cyan)' }}
                >
                  {group.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map(skill => (
                  <span
                    key={skill}
                    className="font-mono text-[11px] px-3 py-1.5 rounded-full cursor-default transition-all duration-150"
                    style={{
                      backgroundColor: 'rgba(13,31,60,0.8)',
                      border: '1px solid rgba(0,229,255,0.15)',
                      color: 'var(--stardust)',
                    }}
                    onMouseEnter={e => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--aurora-cyan)'
                      ;(e.currentTarget as HTMLElement).style.color = 'var(--aurora-cyan)'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 10px rgba(0,229,255,0.2)'
                    }}
                    onMouseLeave={e => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,255,0.15)'
                      ;(e.currentTarget as HTMLElement).style.color = 'var(--stardust)'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
