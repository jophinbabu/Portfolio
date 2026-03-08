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
      <a href="https://github.com/jophinbabu" target="_blank" rel="noopener noreferrer" style={{ transition: 'transform 0.2s' }}>
        <Github size={20} />
      </a>
      <a href="https://www.linkedin.com/in/jophin-babu-0ab046318" target="_blank" rel="noopener noreferrer" style={{ transition: 'transform 0.2s' }}>
        <Linkedin size={20} />
      </a>
      <a href="mailto:jophinbabu@example.com" style={{ transition: 'transform 0.2s' }}>
        <Mail size={20} />
      </a>
      
      <div style={{ width: '1px', height: '60px', backgroundColor: 'rgba(15,23,42,0.15)', margin: '0 auto' }} />
    </motion.div>
  );
}
