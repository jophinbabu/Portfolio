"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

type ProjectProps = {
  title: string;
  category: string;
  description: string;
  imageSrc?: string | readonly string[];
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
      className={`project-card p-6 md:p-10`} 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: hasImages ? 'minmax(300px, 1fr) minmax(300px, 1fr)' : '1fr', 
        gap: '4rem', 
        textDecoration: 'none', 
        color: 'inherit', 
        position: 'relative',
        border: `1px solid ${isHovered ? 'var(--accent)' : 'var(--border)'}`,
        background: 'rgba(15,23,42,0.02)',
        borderRadius: '16px',
        transition: 'border-color 0.4s ease, transform 0.4s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasImages && (
        <div 
        style={{ 
          width: '100%', 
          height: '60vh', 
          minHeight: '400px', 
          borderRadius: '12px', 
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
              opacity: currentImgIndex === index ? 1 : 0,
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
      
      <div style={{ display: 'flex', flexDirection: 'column', paddingTop: hasImages ? '1.5rem' : '0' }}>
        <p style={{ 
          fontFamily: "'DM Mono', monospace", 
          fontSize: '0.65rem', 
          fontWeight: 600,
          letterSpacing: '0.15em', 
          marginBottom: '2rem', 
          color: 'var(--fg3)',
          textTransform: 'uppercase'
        }}>
          ( {year} )
        </p>
        
        <h3 style={{ 
          fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', 
          marginBottom: '2rem', 
          fontWeight: 800, 
          lineHeight: 1.1, 
          color: 'var(--fg)',
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: '-0.03em'
        }}>
          {title}
        </h3>
        
        <p style={{ 
          color: 'var(--fg2)', 
          fontSize: '1.05rem', 
          maxWidth: '480px', 
          lineHeight: 1.6, 
          marginBottom: 'auto',
          fontWeight: 400
        }}>
          {description}
        </p>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderTop: '1px solid var(--border)', 
          paddingTop: '2rem', 
          marginTop: '3rem' 
        }}>
           <span style={{ 
             textTransform: 'uppercase', 
             letterSpacing: '0.15em', 
             fontSize: '0.65rem', 
             fontWeight: 600,
             color: 'var(--fg3)',
             fontFamily: "'DM Mono', monospace"
           }}>
             {category}
           </span>
           {link && (
             <motion.div 
                animate={{ 
                  x: isHovered ? 4 : 0, 
                  y: isHovered ? -4 : 0, 
                  color: isHovered ? 'var(--accent)' : 'var(--fg2)' 
                }}
                transition={{ duration: 0.3 }}
             >
                <ArrowUpRight size={28} />
             </motion.div>
           )}
        </div>
      </div>
      
      <style jsx>{`
        @media (max-width: 1024px) {
          .project-card {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </CardContainer>
  );
}
