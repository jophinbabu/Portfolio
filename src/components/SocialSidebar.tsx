"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function SocialSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      style={{
        position: 'fixed',
        left: '2rem',
        bottom: '4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        zIndex: 50,
        mixBlendMode: 'normal',
        color: '#0f172a',
      }}
    >
      <a href="https://github.com/jophinbabu" target="_blank" rel="noopener noreferrer" style={{ transition: 'all 0.3s', color: 'var(--fg)', opacity: 0.8 }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'scale(1)'; }}>
        <Github size={24} />
      </a>
      <a href="https://www.linkedin.com/in/jophin-babu-0ab046318" target="_blank" rel="noopener noreferrer" style={{ transition: 'all 0.3s', color: '#0077b5', opacity: 0.8 }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'scale(1)'; }}>
        <Linkedin size={24} />
      </a>
      <a href="mailto:jophin735@gmail.com" style={{ transition: 'all 0.3s', color: 'var(--accent)', opacity: 0.8 }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'scale(1)'; }}>
        <Mail size={24} />
      </a>
      
      <div style={{ width: '1px', height: '60px', backgroundColor: 'rgba(15,23,42,0.15)', margin: '0 auto' }} />
    </motion.div>
  );
}
