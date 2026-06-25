import StarCanvas from '@/components/StarCanvas'
import Hud from '@/components/Hud'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Education from '@/components/Education'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      {/* Fixed layers — always visible */}
      <StarCanvas />
      <Hud />
      <Nav />

      {/* Scrollable content */}
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  )
}
