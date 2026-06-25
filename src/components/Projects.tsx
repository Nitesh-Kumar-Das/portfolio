'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROJECTS, Project } from '@/data/content'
import { SectionLabel } from './About'
import { Github, ExternalLink } from 'lucide-react'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const row1 = PROJECTS.slice(0, 3)
  const row2 = PROJECTS.slice(3)

  return (
    <section id="projects" className="relative py-28 px-6 md:px-16" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="DEPLOYED SYSTEMS" />
        <h2
          className="font-display font-bold mb-14 mt-1"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--stellar-white)' }}
        >
          Projects
        </h2>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-6"
        >
          {/* Row 1 — 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {row1.map(project => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>

          {/* Row 2 — 2 cards centred */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-[66%] md:mx-auto">
            {row2.map(project => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={cardReveal}
      whileHover={{ y: -4 }}
      className="flex flex-col rounded-xl p-6 cursor-default group transition-all duration-200"
      style={{
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--glass-border)',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.border = '1px solid rgba(0,229,255,0.45)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(0,229,255,0.12)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.border = '1px solid var(--glass-border)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3
          className="font-display font-bold text-[17px] leading-tight"
          style={{ color: 'var(--stellar-white)' }}
        >
          {project.title}
        </h3>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: project.status === 'LIVE' ? '#00ff88' : '#f59e0b',
              boxShadow: project.status === 'LIVE'
                ? '0 0 6px #00ff88'
                : '0 0 6px #f59e0b',
            }}
          />
          <span className="font-mono text-[9px]" style={{ color: 'var(--stardust)' }}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Stack badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.map(s => (
          <span
            key={s}
            className="font-mono text-[9.5px] px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: 'rgba(123,47,255,0.1)',
              border: '1px solid rgba(123,47,255,0.3)',
              color: '#c4b5fd',
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Bullets */}
      <ul className="space-y-2 mb-4 flex-1">
        {project.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed">
            <span className="mt-0.5 shrink-0 text-[10px]" style={{ color: 'var(--aurora-cyan)' }}>▸</span>
            <span style={{ color: 'var(--stardust)' }}>{b}</span>
          </li>
        ))}
      </ul>

      {/* Metric */}
      <div
        className="font-mono text-[11px] px-3 py-2 rounded-md mb-4"
        style={{
          backgroundColor: 'rgba(0,229,255,0.06)',
          borderLeft: '2px solid var(--aurora-cyan)',
          color: 'var(--aurora-cyan)',
        }}
      >
        {project.metric}
      </div>

      {/* Links */}
      <div className="flex gap-4 mt-auto">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-[11px] transition-colors duration-150 hover:text-aurora-cyan"
          style={{ color: 'var(--stardust)' }}
        >
          <Github size={13} />
          GitHub
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[11px] transition-colors duration-150"
            style={{ color: 'var(--aurora-teal)' }}
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  )
}
