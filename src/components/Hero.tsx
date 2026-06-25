'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const orbitVariant = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.8, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center px-6 md:px-16 pt-20 pb-10"
      style={{ zIndex: 1 }}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* Left — Text */}
        <motion.div
          className="flex-1 max-w-2xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={item}
            className="font-mono text-[11px] tracking-[0.18em] uppercase mb-5"
            style={{ color: 'var(--aurora-cyan)' }}
          >
            // Engineer · Builder · Researcher
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display font-bold leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(36px, 6vw, 68px)', color: 'var(--stellar-white)' }}
          >
            Engineering
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, var(--aurora-cyan), var(--aurora-teal))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Intelligence.
            </span>
            <br />
            <span style={{ color: 'var(--stardust)', fontSize: '0.72em', fontWeight: 400 }}>
              From Model to Production.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="font-body text-[15px] leading-relaxed mb-8 max-w-lg"
            style={{ color: 'var(--stardust)' }}
          >
            AI & Data Science undergrad at GTBIT (CGPA 8.63) · LLM Post-Training Intern at
            Ethara AI · Building production-grade ML systems, full-stack platforms, and
            real-time applications.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="font-mono text-[12px] tracking-wider px-6 py-3 rounded-md transition-all duration-200"
              style={{
                backgroundColor: 'var(--aurora-cyan)',
                color: 'var(--void)',
                fontWeight: 600,
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(0,229,255,0.5)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              [ View Projects ]
            </a>
            <a
              href="/resume.pdf"
              download="Nitesh_Kumar_Das_Resume.pdf"
              className="font-mono text-[12px] tracking-wider px-6 py-3 rounded-md transition-all duration-200"
              style={{
                border: '1px solid var(--aurora-cyan)',
                color: 'var(--aurora-cyan)',
                backgroundColor: 'rgba(0,229,255,0.05)',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(0,229,255,0.25)'
                ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0,229,255,0.1)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0,229,255,0.05)'
              }}
            >
              [ Download Resume ]
            </a>
            <a
              href="mailto:niteshkumardas2025@gmail.com"
              className="font-mono text-[12px] tracking-wider px-6 py-3 rounded-md transition-all duration-200"
              style={{
                border: '1px solid var(--aurora-cyan)',
                color: 'var(--aurora-cyan)',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(0,229,255,0.25)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              [ Get In Touch ]
            </a>
          </motion.div>
        </motion.div>

        {/* Right — Orbit Diagram */}
        <motion.div
          className="hidden md:flex flex-shrink-0 items-center justify-center"
          variants={orbitVariant}
          initial="hidden"
          animate="visible"
          style={{ width: 340, height: 340 }}
        >
          <OrbitDiagram />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest animate-pulse"
        style={{ color: 'rgba(0,229,255,0.45)' }}
      >
        ↓ scroll
      </div>
    </section>
  )
}

function OrbitDiagram() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const cx = 170
  const cy = 170

  // Each orbit: the ellipse track + the animating node
  const orbits = [
    {
      rx: 72, ry: 28,
      stroke: 'rgba(0,229,255,0.22)',
      nodeColor: '#00E5FF',
      nodeFill: 'rgba(0,229,255,0.1)',
      dur: '18s',
      clockwise: true,
      label: 'AI/ML',
      nodeR: 7,
      // Static position (rightmost of ellipse) for reduced-motion fallback
      staticX: 170 + 72,
      staticY: 170,
    },
    {
      rx: 112, ry: 44,
      stroke: 'rgba(123,47,255,0.22)',
      nodeColor: '#a78bfa',
      nodeFill: 'rgba(123,47,255,0.1)',
      dur: '32s',
      clockwise: false,
      label: 'Full-Stack',
      nodeR: 8,
      staticX: 170 - 112,
      staticY: 170,
    },
    {
      rx: 152, ry: 60,
      stroke: 'rgba(0,255,200,0.18)',
      nodeColor: '#00FFC8',
      nodeFill: 'rgba(0,255,200,0.08)',
      dur: '48s',
      clockwise: true,
      label: 'LLM Eval',
      nodeR: 9,
      staticX: 170 + 152,
      staticY: 170,
    },
  ]

  // Build a full-ellipse SVG path for animateMotion
  // Starting from rightmost point (cx+rx, cy), going clockwise or counter-clockwise
  const makePath = (rx: number, ry: number, cw: boolean) => {
    const sweep = cw ? 1 : 0
    // Two arcs to complete the ellipse
    return [
      `M ${cx + rx},${cy}`,
      `a ${rx},${ry} 0 1,${sweep} ${-2 * rx},0`,
      `a ${rx},${ry} 0 1,${sweep} ${2 * rx},0`,
    ].join(' ')
  }

  return (
    <svg
      viewBox="0 0 340 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', overflow: 'visible' }}
    >
      <defs>
        {orbits.map((o, i) => (
          <path
            key={i}
            id={`op-${i}`}
            d={makePath(o.rx, o.ry, o.clockwise)}
          />
        ))}
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ellipse rings */}
      {orbits.map((o, i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={o.rx}
          ry={o.ry}
          stroke={o.stroke}
          strokeWidth={1}
          strokeDasharray="4 3"
        />
      ))}

      {/* Core glow */}
      <circle cx={cx} cy={cy} r={40} fill="url(#coreGlow)" />
      <circle
        cx={cx} cy={cy} r={24}
        fill="rgba(0,229,255,0.06)"
        stroke="rgba(0,229,255,0.65)"
        strokeWidth="1.5"
      />
      <text
        x={cx} y={cy + 5}
        textAnchor="middle"
        fill="#00E5FF"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
        fontWeight="600"
      >
        NKD
      </text>

      {/* Animated nodes — each travels its own ellipse path */}
      {orbits.map((o, i) =>
        reducedMotion ? (
          /* Static fallback */
          <g key={i} transform={`translate(${o.staticX}, ${o.staticY})`}>
            <circle r={o.nodeR} fill={o.nodeFill} stroke={o.nodeColor} strokeWidth="1.2" />
            <text
              x="0" y="4"
              textAnchor="middle"
              fill={o.nodeColor}
              fontFamily="JetBrains Mono, monospace"
              fontSize="5"
            >
              {o.label}
            </text>
          </g>
        ) : (
          <g key={i}>
            <circle r={o.nodeR} fill={o.nodeFill} stroke={o.nodeColor} strokeWidth="1.2" />
            <text
              x="0" y="4"
              textAnchor="middle"
              fill={o.nodeColor}
              fontFamily="JetBrains Mono, monospace"
              fontSize="5"
            >
              {o.label}
            </text>
            <animateMotion
              dur={o.dur}
              repeatCount="indefinite"
              rotate="none"
            >
              <mpath href={`#op-${i}`} />
            </animateMotion>
          </g>
        )
      )}
    </svg>
  )
}
