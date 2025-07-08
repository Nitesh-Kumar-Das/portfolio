'use client';
import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('2025');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Nitesh Kumar Das
            </div>
            <p className="text-gray-300 mb-4">
              Full-Stack Developer | AI Engineer | ML Specialist
              <br />
              Creating intelligent solutions with modern web technologies.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  whileHover={{ x: 5 }}
                  className="block text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-2 text-gray-300">
              <p>niteshkumardas2025@gmail.com</p>
              <p>India</p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm flex items-center gap-2 mb-4 md:mb-0"
            >
              Made with <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> by Nitesh Kumar Das
              <span className="mx-2">•</span>
              © {currentYear} All rights reserved
            </motion.p>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:glow transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
