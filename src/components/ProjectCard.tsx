"use client";

import Image from "next/image";
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
  impact?: string;
  metrics?: readonly { value: string; label: string }[];
  stack?: readonly string[];
};

export default function ProjectCard({
  title,
  category,
  description,
  imageSrc,
  link,
  year = "2024",
  impact,
  metrics = [],
  stack = [],
}: ProjectProps) {
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
        background: 'linear-gradient(135deg, color-mix(in srgb, var(--surface-strong) 88%, transparent), color-mix(in srgb, var(--surface-soft) 86%, transparent))',
        borderRadius: '20px',
        transition: 'border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 34px 90px rgba(15,23,42,0.13)' : '0 18px 54px rgba(15,23,42,0.07)',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasImages && (
        <div
          className="project-media"
          style={{
            width: '100%',
            aspectRatio: '4 / 3',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: '#f1f5f9',
            position: 'relative',
            boxShadow: '0 22px 60px rgba(15,23,42,0.16)',
          }}
        >
          {images.map((src, index) => (
            <motion.div
              key={src}
              initial={false}
              animate={{
                opacity: currentImgIndex === index ? 1 : 0,
                scale: isHovered && currentImgIndex === index ? 1.04 : 1,
              }}
              transition={{
                opacity: { duration: 0.9 },
                scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              }}
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: currentImgIndex === index ? 'auto' : 'none',
              }}
            >
              <Image
                src={src}
                alt={`${title} — image ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                quality={85}
                priority={index === 0}
              />
            </motion.div>
          ))}

          {images.length > 1 && (
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                display: 'flex',
                gap: '0.4rem',
                zIndex: 2,
              }}
            >
              {images.map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: i === currentImgIndex ? '20px' : '6px',
                    height: '3px',
                    borderRadius: '2px',
                    background: i === currentImgIndex ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
                    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              ))}
            </div>
          )}

          {/* Subtle hover gradient overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 60%, rgba(37,99,235,0.18) 100%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              zIndex: 2,
              padding: '0.45rem 0.65rem',
              borderRadius: '999px',
              background: 'rgba(15,23,42,0.72)',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(12px)',
            }}
          >
            {year}
          </div>
        </div>
      )}
      
      <div className="project-content" style={{ display: 'flex', flexDirection: 'column', paddingTop: hasImages ? '1.5rem' : '0' }}>
        <p style={{ 
          fontFamily: "var(--font-mono)", 
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
          fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', 
          marginBottom: '2rem', 
          fontWeight: 800, 
          lineHeight: 1.1, 
          color: 'var(--fg)',
          fontFamily: "var(--font-sans)",
          letterSpacing: '-0.03em'
        }}>
          {title}
        </h3>
        
        <p style={{ 
          color: 'var(--fg2)', 
          fontSize: '1.05rem', 
          maxWidth: '58ch', 
          lineHeight: 1.6, 
          marginBottom: 'auto',
          fontWeight: 400
        }}>
          {description}
        </p>

        {(impact || metrics.length > 0) && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginTop: '2rem',
          }}>
            {impact && (
              <div style={{
                border: '1px solid color-mix(in srgb, var(--accent) 18%, var(--border))',
                borderRadius: '12px',
                padding: '1rem 1.1rem',
                background: 'var(--surface)',
                boxShadow: 'inset 0 1px 0 color-mix(in srgb, var(--surface-strong) 70%, white)',
              }}>
                <p style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                }}>
                  Impact
                </p>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: 'var(--fg2)',
                  fontWeight: 500,
                }}>
                  {impact}
                </p>
              </div>
            )}

            {metrics.length > 0 && (
              <div style={{
                border: '1px solid color-mix(in srgb, var(--accent) 18%, var(--border))',
                borderRadius: '12px',
                padding: '1rem 1.1rem',
                background: 'var(--surface)',
                boxShadow: 'inset 0 1px 0 color-mix(in srgb, var(--surface-strong) 70%, white)',
              }}>
                <p style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                }}>
                  Key Metrics
                </p>
                <div style={{ display: 'grid', gap: '0.7rem' }}>
                  {metrics.map((metric) => (
                    <div key={`${metric.label}-${metric.value}`} className="project-metric-row" style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--fg)' }}>{metric.value}</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--fg2)', textAlign: 'right', maxWidth: '150px' }}>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {stack.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.55rem',
            marginTop: '1.2rem',
          }}>
            {stack.map((item) => (
              <span
                key={item}
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '0.45rem 0.8rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(15,23,42,0.12)',
                  background: 'var(--surface-strong)',
                  color: 'var(--fg)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.03em',
                  boxShadow: 'inset 0 1px 0 color-mix(in srgb, var(--surface-strong) 70%, white)',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="project-footer" style={{ 
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
             fontFamily: "var(--font-mono)"
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
        .project-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, color-mix(in srgb, var(--accent) 16%, transparent), transparent 32%),
            radial-gradient(circle at 88% 10%, rgba(16,185,129,0.12), transparent 30%);
          opacity: 0.55;
        }

        .project-card > * {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 1024px) {
          .project-card {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            border-radius: 18px !important;
          }
        }

        @media (max-width: 640px) {
          .project-card {
            padding: 1rem !important;
            gap: 1.25rem !important;
            border-radius: 18px !important;
          }
          .project-media {
            border-radius: 14px !important;
            aspect-ratio: 16 / 11 !important;
          }
          .project-content {
            padding-top: 0 !important;
          }
          .project-content h3 {
            font-size: clamp(1.9rem, 11vw, 2.65rem) !important;
            margin-bottom: 1rem !important;
          }
          .project-content p {
            font-size: 0.96rem !important;
          }
          .project-metric-row {
            display: grid !important;
            grid-template-columns: 0.7fr 1fr;
          }
          .project-footer {
            align-items: flex-start !important;
            gap: 1rem !important;
            padding-top: 1.2rem !important;
            margin-top: 1.6rem !important;
          }
        }
      `}</style>
    </CardContainer>
  );
}
