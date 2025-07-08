'use client';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import PolygonBg from './PolygonBg';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Nitesh-Kumar-Das', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/nitesh-kumar-das-224434297/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:niteshkumardas2025@gmail.com', label: 'Email' },
  { icon: Instagram, href: 'https://www.instagram.com/_niteshkumardas_?igsh=OG9maWdoenIwMWxy', label: 'Instagram' },
];

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <PolygonBg />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/70 to-slate-900/80 animate-gradient" />
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Hi, I'm</span>
              <br />
              <span className="text-white">Nitesh Kumar Das</span>
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-gray-300 mb-8 max-w-2xl">
            Full-Stack Developer | AI Enthusiast | ML Engineer crafting intelligent digital experiences with modern web technologies and machine learning solutions.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(99, 102, 241, 0.5)' }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300">View My Work</motion.button>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 border-2 border-indigo-500 text-indigo-400 font-semibold rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300" href="/resume/resume.pdf" download>Download Resume</motion.a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex gap-6 justify-center lg:justify-start">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a key={label} href={href} whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }} className="p-3 text-gray-400 hover:text-indigo-400 transition-colors duration-300" aria-label={label}>
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-white cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          <ArrowDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
