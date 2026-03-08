"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  accentColor: string;
  className?: string;
}

export default function GlowCard({ children, accentColor, className = "" }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [floatDelay, setFloatDelay] = useState(0);
  const [glowPhase, setGlowPhase] = useState(0);

  // Autonomous animation loop — only runs on desktop for performance
  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    if (isMobile) return;

    let start: number | null = null;
    const duration = 4000 + Math.random() * 2000;

    const tick = (ts: number) => {
      if (!start) start = ts;
      setGlowPhase(((ts - start) % duration) / duration);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Figure-8 spotlight path
  const autoX = isHovered ? mousePos.x : 50 + 38 * Math.cos(glowPhase * Math.PI * 2);
  const autoY = isHovered ? mousePos.y : 50 + 22 * Math.sin(glowPhase * Math.PI * 4);

  // Gentle autonomous 3D sway
  const autoRotateX = isHovered ? mousePos.rotateX : Math.sin(glowPhase * Math.PI * 2) * 4;
  const autoRotateY = isHovered ? mousePos.rotateY : Math.cos(glowPhase * Math.PI * 2) * 5;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setMousePos({
      x,
      y,
      rotateX: ((e.clientY - rect.top - cy) / cy) * -8,
      rotateY: ((e.clientX - rect.left - cx) / cx) * 8,
    });
  }, []);

  useEffect(() => {
    setFloatDelay(Math.random() * -6);
  }, []);

  return (
    <div
      style={{
        animation: `glowFloat 6s ease-in-out ${floatDelay}s infinite`,
        height: "100%",
        perspective: "1200px",
      }}
    >
      <style>{`
        @keyframes glowFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }

        @keyframes borderSpin {
          from { --border-angle: 0deg; }
          to   { --border-angle: 360deg; }
        }

        @property --border-angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        @keyframes haloPulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 0.45; transform: scale(1.05); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0;  transform: scale(0.4); }
          50%       { opacity: 1;  transform: scale(1.3); }
        }

        .gc-wrap {
          position: relative;
          height: 100%;
          border-radius: 20px;
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* Soft ambient halo beneath the card */
        .gc-wrap::before {
          content: "";
          position: absolute;
          inset: -10px;
          border-radius: 26px;
          background: radial-gradient(ellipse at center, var(--glow-color) 0%, transparent 70%);
          opacity: 0.2;
          filter: blur(20px);
          animation: haloPulse 3s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        /* Spinning conic border */
        .gc-border {
          position: relative;
          height: 100%;
          border-radius: 20px;
          padding: 1.5px;
          background: conic-gradient(
            from var(--border-angle),
            transparent 20%,
            var(--glow-color) 45%,
            #ffffff 50%,
            var(--glow-color) 55%,
            transparent 80%
          );
          animation: borderSpin 3s linear infinite;
          z-index: 1;
        }

        /* Card surface — clean white */
        .gc-body {
          position: relative;
          height: 100%;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow: hidden;
          box-shadow:
            0 4px 32px rgba(0,0,0,0.07),
            0 1px 4px rgba(0,0,0,0.04),
            inset 0 1px 0 rgba(255,255,255,1);
        }

        /* Moving spotlight — very soft tint on white */
        .gc-spotlight {
          position: absolute;
          inset: 0;
          border-radius: 18px;
          background: radial-gradient(
            circle at var(--spot-x) var(--spot-y),
            color-mix(in srgb, var(--glow-color) 14%, transparent) 0%,
            transparent 55%
          );
          pointer-events: none;
          z-index: 2;
        }

        @media (pointer: coarse), (max-width: 768px) {
          .gc-body {
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            background: #ffffff;
          }
          .gc-wrap::before, .gc-border, .gc-particle {
            animation-duration: 5s !important; /* Slow down for mobile CPU */
          }
           .gc-wrap {
            transform: none !important;
            transition: none !important;
          }
        }

        /* Top shimmer line */
        .gc-shimmer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            color-mix(in srgb, var(--glow-color) 70%, white),
            transparent
          );
          border-radius: 18px 18px 0 0;
          pointer-events: none;
          z-index: 4;
        }

        /* Corner particles */
        .gc-particle {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--glow-color);
          filter: blur(1.5px);
          pointer-events: none;
          z-index: 5;
        }
        .gc-particle:nth-child(1) { top: 8px;    left: 8px;    animation: twinkle 2.2s ease-in-out 0.0s infinite; }
        .gc-particle:nth-child(2) { top: 8px;    right: 8px;   animation: twinkle 2.2s ease-in-out 0.6s infinite; }
        .gc-particle:nth-child(3) { bottom: 8px; left: 8px;    animation: twinkle 2.2s ease-in-out 1.1s infinite; }
        .gc-particle:nth-child(4) { bottom: 8px; right: 8px;   animation: twinkle 2.2s ease-in-out 1.7s infinite; }

        /* Content layer */
        .gc-content {
          position: relative;
          z-index: 10;
          height: 100%;
        }
      `}</style>

      <div
        ref={cardRef}
        className={`gc-wrap ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos((p) => ({ ...p, rotateX: 0, rotateY: 0 }));
        }}
        style={
          {
            "--glow-color": accentColor,
            transform: `rotateX(${autoRotateX}deg) rotateY(${autoRotateY}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
            transition: isHovered
              ? "transform 0.1s ease-out"
              : "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
            transformStyle: "preserve-3d",
            willChange: "transform",
          } as React.CSSProperties
        }
      >
        <div className="gc-border">
          <div
            className="gc-body"
            style={
              {
                "--spot-x": `${autoX}%`,
                "--spot-y": `${autoY}%`,
              } as React.CSSProperties
            }
          >
            <div className="gc-particle" />
            <div className="gc-particle" />
            <div className="gc-particle" />
            <div className="gc-particle" />

            <div className="gc-shimmer" />
            <div className="gc-spotlight" />

            <div className="gc-content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}