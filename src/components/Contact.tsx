'use client';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name, // must match EmailJS template variable
          email: formData.email, // must match EmailJS template variable
          subject: formData.subject,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      alert('Something went wrong. Please try again later.');
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'niteshkumardas2025@gmail.com',
      link: 'mailto:niteshkumardas2025@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'India',
      link: '#'
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Nitesh-Kumar-Das', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/nitesh-kumar-das-224434297/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:niteshkumardas2025@gmail.com', label: 'Email' },
    { icon: Instagram, href: 'https://www.instagram.com/_niteshkumardas_?igsh=OG9maWdoenIwMWxy', label: 'Instagram' },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to build intelligent solutions together? Let's discuss your AI project, 
            full-stack development needs, or ML model requirements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Let's Connect</h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center gap-4 p-4 glass rounded-xl hover:glow transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <item.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <p className="text-gray-300">{item.details}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2, y: -2 }}
                    className="w-12 h-12 glass rounded-full flex items-center justify-center text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* 3D Floating Element */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop"
              }}
              className="mt-8 w-32 h-32 mx-auto lg:mx-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center glass"
            >
              <Mail className="text-indigo-400" size={40} />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                    placeholder="Your Name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                  placeholder="Project Discussion"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white hover:glow'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
