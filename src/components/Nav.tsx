'use client'
import { useState, useEffect } from 'react'
import { NAV_LINKS } from '@/data/content'
import { X, Menu } from 'lucide-react'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkStyle =
    'font-mono text-[11px] uppercase tracking-widest transition-colors duration-200 hover:text-aurora-cyan'

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 h-14"
        style={{
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          backgroundColor: scrolled ? 'rgba(4,6,15,0.82)' : 'rgba(4,6,15,0.55)',
          borderBottom: '1px solid var(--glass-border)',
          transition: 'background-color 0.3s',
        }}
      >
        <a
          href="#"
          className="font-display font-bold text-lg tracking-tight"
          style={{ color: 'var(--aurora-cyan)' }}
        >
          NKD
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={linkStyle}
              style={{ color: 'var(--stardust)' }}
            >
              {link}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download="Nitesh_Kumar_Das_Resume.pdf"
            className={linkStyle}
            style={{ color: 'var(--aurora-cyan)' }}
          >
            Resume ↴
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-1"
          style={{ color: 'var(--stardust)' }}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-10 md:hidden"
          style={{ backgroundColor: 'rgba(4,6,15,0.97)' }}
        >
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-display font-bold text-3xl"
              style={{ color: 'var(--stellar-white)' }}
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download="Nitesh_Kumar_Das_Resume.pdf"
            className="font-display font-bold text-3xl"
            style={{ color: 'var(--aurora-cyan)' }}
            onClick={() => setOpen(false)}
          >
            Resume ↴
          </a>
        </div>
      )}
    </>
  )
}
