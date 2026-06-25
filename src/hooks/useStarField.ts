'use client'
import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  speed: number
  twinkleOffset: number
  isCyan: boolean
  opacity: number
}

export function useStarField(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const stars: Star[] = []
    const STAR_COUNT = 260

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: 0.3 + Math.random() * 1.2,
        speed: 0.05 + Math.random() * 0.25,
        twinkleOffset: Math.random() * Math.PI * 2,
        isCyan: Math.random() < 0.35,
        opacity: 0.4 + Math.random() * 0.6,
      })
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.008

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const px = ((mx / canvas.width) - 0.5) * 12
      const py = ((my / canvas.height) - 0.5) * 12

      for (const star of stars) {
        star.y -= star.speed
        if (star.y < -2) {
          star.y = canvas.height + 2
          star.x = Math.random() * canvas.width
        }

        const twinkle = 0.5 + 0.5 * Math.sin(t * 1.5 + star.twinkleOffset)
        const alpha = star.opacity * (0.6 + 0.4 * twinkle)

        ctx.beginPath()
        ctx.arc(
          star.x + px,
          star.y + py,
          star.radius,
          0,
          Math.PI * 2
        )
        ctx.fillStyle = star.isCyan
          ? `rgba(0, 229, 255, ${alpha})`
          : `rgba(232, 238, 255, ${alpha * 0.8})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [canvasRef])
}
