"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

type ProjectProps = {
  title: string;
  category: string;
  description: string;
  imageSrc?: string | string[];
  link?: string;
  year?: string;
};

export default function ProjectCard({ title, category, description, imageSrc, link, year = "2024" }: ProjectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = imageSrc ? (Array.isArray(imageSrc) ? imageSrc : [imageSrc]) : [];
  const hasImages = images.length > 0;

  // Auto cycle images if there are multiple
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImgIndex((prev) => (prev + 1) % images.length);
      }, 3000); // 3 seconds per image
      return () => clearInterval(interval);
    }
  }, [images.length]);
  
  // Conditionally render card container (wrapper)
  const CardContainer = link ? "a" : "div";
  const containerProps = link ? {
    href: link,
    target: "_blank",
    rel: "noopener noreferrer"
  } : {};

  return (
    <CardContainer 
      {...containerProps}
      className={`project-card ${link ? 'hoverable-link' : ''}`} 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: hasImages ? 'minmax(300px, 1fr) minmax(300px, 1fr)' : '1fr', 
        gap: '4rem', textDecoration: 'none', color: 'inherit', paddingBottom: '6rem', position: 'relative' 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasImages && (
        <div 
        style={{ 
          width: '100%', 
          height: '65vh', 
          minHeight: '400px', 
          borderRadius: '30px', 
          overflow: 'hidden', 
          backgroundColor: '#e2e8f0', 
          position: 'relative',
        }} 
      >
        {images.map((src, index) => (
          <motion.img 
            key={src}
            src={src} 
            alt={`${title} - image ${index + 1}`} 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentImgIndex === index ? 0.9 : 0,
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ 
              opacity: { duration: 1 }, // Smooth crossfade
              scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
            }}
            style={{ 
              position: 'absolute', 
              top: 0, left: 0, 
              width: '100%', height: '100%', 
              objectFit: 'cover', 
              display: 'block' 
            }}
          />
        ))}
        
        {/* Subtle hover overlay */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: isHovered ? 0.2 : 0 }}
           style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--accent)', pointerEvents: 'none' }}
        />
      </div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', paddingTop: hasImages ? '2rem' : '0' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '1.2rem', marginBottom: '3rem', color: '#64748b' }}>( {year} )</p>
        
        <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '3rem', fontWeight: 800, lineHeight: 1.1, color: 'var(--section-dark-fg)' }}>
          {title}
        </h3>
        
        <p style={{ color: '#475569', fontSize: '1.2rem', maxWidth: '400px', lineHeight: 1.6, marginBottom: 'auto' }}>
          {description}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(15,23,42,0.1)', paddingTop: '2rem', marginTop: '4rem' }}>
           <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.9rem', color: '#64748b' }}>{category}</span>
           {link && (
             <motion.div 
                animate={{ x: isHovered ? 5 : 0, y: isHovered ? -5 : 0, color: isHovered ? 'var(--accent)' : '#0f172a' }}
                transition={{ duration: 0.3 }}
             >
                <ArrowUpRight size={32} />
             </motion.div>
           )}
        </div>
      </div>
      
      {/* CSS for responsive grid inside the component style block is skipped, handled by global grid-2 later or media queries */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .project-card {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
        .hoverable-link {
          cursor: pointer;
        }
      `}</style>
    </CardContainer>
  );
}
