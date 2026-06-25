'use client'
import { useEffect, useState } from 'react'

export default function Hud() {
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setPulse(p => !p), 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="fixed right-4 z-30 font-mono text-[10px] leading-[18px] select-none pointer-events-none"
      style={{
        top: '64px',
        color: 'rgba(0,229,255,0.42)',
        textAlign: 'right',
      }}
    >
      <div className="flex items-center justify-end gap-1.5 mb-1">
        <span>SYS: ONLINE</span>
        <span
          className="inline-block w-1.5 h-1.5 rounded-full transition-opacity duration-700"
          style={{
            backgroundColor: '#00ff88',
            opacity: pulse ? 1 : 0.25,
            boxShadow: pulse ? '0 0 6px #00ff88' : 'none',
          }}
        />
      </div>
      <div>VER: 2025.06</div>
      <div>LAT: 28.6139°N</div>
      <div>LON: 77.2090°E</div>
    </div>
  )
}
