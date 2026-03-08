"use client";

import { useRef, useState, useCallback } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  accentColor: string;
  className?: string;
}

export default function GlowCard({ children, accentColor, className = "" }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Calculate 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    
    const rotateX = (mouseY / centerY) * -6; // max 6 degrees
    const rotateY = (mouseX / centerX) * 6;

    setMousePos({ x, y, rotateX, rotateY });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`glow-card ${isHovered ? "glow-card--active" : ""} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos((p) => ({ ...p, rotateX: 0, rotateY: 0 }));
      }}
      style={{
        "--glow-x": `${mousePos.x}%`,
        "--glow-y": `${mousePos.y}%`,
        "--glow-color": accentColor,
        transform: isHovered 
          ? `perspective(1000px) rotateX(${mousePos.rotateX}deg) rotateY(${mousePos.rotateY}deg) scale3d(1.02, 1.02, 1.02)` 
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      } as React.CSSProperties}
    >
      {/* Animated gradient border layer */}
      <div className="glow-card__border" />
      {/* Inner glow spotlight */}
      <div className="glow-card__spotlight" />
      {/* Content */}
      <div className="glow-card__content">
        {children}
      </div>
    </div>
  );
}
