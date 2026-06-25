'use client'
import { useRef } from 'react'
import { useStarField } from '@/hooks/useStarField'

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useStarField(canvasRef)

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
