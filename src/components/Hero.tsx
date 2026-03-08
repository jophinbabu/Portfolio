"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const ROLES = ["Full-Stack Developer", "AI / ML Engineer", "Creative Builder"];
const STATS = [
  { value: "1", label: "Year Exp." },
  { value: "6", label: "Projects" },
  { value: "10+", label: "Tech Stacks" },
];
const TICKER_ITEMS = [
  "React", "·", "Next.js", "·", "Node.js", "·", "Python", "·",
  "PyTorch", "·", "TypeScript", "·", "AWS", "·", "PostgreSQL", "·",
  "Docker", "·", "Tailwind", "·", "FastAPI", "·", "MongoDB", "·",
];

/* ─────────────────────────────────────────────
   AMBIENT MOUSE GLOW
───────────────────────────────────────────── */
function AmbientGlow() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const x = useSpring(mx, { stiffness: 35, damping: 22 });
  const y = useSpring(my, { stiffness: 35, damping: 22 });

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [mx, my]);

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: "72vw",
          height: "72vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 68%)",
          filter: "blur(70px)",
          translateX: useTransform(x, [0, 1], ["-25vw", "45vw"]),
          translateY: useTransform(y, [0, 1], ["-25vh", "45vh"]),
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   TICKER
───────────────────────────────────────────── */
function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      style={{
        position: "absolute",
        bottom: "4.8rem",
        left: 0,
        right: 0,
        overflow: "hidden",
        borderTop: "1px solid rgba(15,23,42,0.055)",
        borderBottom: "1px solid rgba(15,23,42,0.055)",
        padding: "0.65rem 0",
        zIndex: 6,
        maskImage:
          "linear-gradient(90deg, transparent 0%, black 7%, black 93%, transparent 100%)",
      }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: "2.2rem", width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: "0.58rem",
              fontWeight: item === "·" ? 400 : 600,
              letterSpacing: item === "·" ? 0 : "0.24em",
              textTransform: "uppercase",
              color: item === "·" ? "rgba(37,99,235,0.55)" : "rgba(15,23,42,0.25)",
              fontFamily: "'DM Mono', monospace",
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 110]);
  const fadeOut = useTransform(scrollY, [0, 420], [1, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setRoleIdx((p) => (p + 1) % ROLES.length), 3400);
    return () => clearInterval(iv);
  }, []);

  const letterV = {
    hidden: { y: "105%", opacity: 0 },
    show: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        delay: 0.45 + i * 0.055,
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  const FIRST = "JOPHIN".split("");
  const LAST = "BABU".split("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        :root {
          --bg:      #ffffff;
          --border:  rgba(15,23,42,0.08);
          --accent:  #2563eb;
          --accent2: #3b82f6;
          --fg:      #0f172a;
          --fg2:     rgba(15,23,42,0.65);
          --fg3:     rgba(15,23,42,0.4);
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: var(--bg);
          color: var(--fg);
          font-family: 'Outfit', sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* ── CTA buttons ── */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.82rem 2.1rem;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          color: #fff; background: var(--accent);
          border: 1.5px solid var(--accent); border-radius: 4px;
          text-decoration: none; cursor: pointer;
          transition: background 0.28s, box-shadow 0.28s;
        }
        .btn-primary:hover {
          background: #1d4ed8;
          box-shadow: 0 10px 36px rgba(37,99,235,0.32);
        }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.82rem 2.1rem;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          color: var(--fg2); background: transparent;
          border: 1.5px solid var(--border); border-radius: 4px;
          text-decoration: none; cursor: pointer;
          transition: border-color 0.28s, color 0.28s;
        }
        .btn-ghost:hover {
          border-color: rgba(37,99,235,0.38);
          color: var(--fg);
        }

        /* ── Social links ── */
        .s-link {
          color: var(--fg3);
          text-decoration: none;
          font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          display: flex; align-items: center; gap: 0.5rem;
          transition: color 0.25s;
        }
        .s-link:hover { color: rgba(15,23,42,1); }
        .s-link-bar {
          width: 18px; height: 1px;
          background: currentColor;
          transition: width 0.3s;
          flex-shrink: 0;
        }
        .s-link:hover .s-link-bar { width: 30px; }

        @media (max-width: 1024px) {
          .side-label {
            display: none !important;
          }
        }
      `}</style>

      <AmbientGlow />

      <section
        ref={sectionRef}
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
        }}
      >

        {/* ─ Background Video ─ */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.15,
            zIndex: 0,
            pointerEvents: "none",
            mixBlendMode: "luminosity",
          }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* ─ Grid columns ─ */}
        {[16.66, 33.33, 50, 66.66, 83.33].map((p, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 2.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              left: `${p}%`,
              top: 0, bottom: 0,
              width: "1px",
              background: "var(--border)",
              transformOrigin: "top",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* ─ Horizontal midline ─ */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            top: "50%",
            left: 0, right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.15) 25%, rgba(37,99,235,0.15) 75%, transparent 100%)",
            transformOrigin: "center",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* ─ Radial glow behind name ─ */}
        <div
          style={{
            position: "absolute",
            top: "44%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "clamp(400px, 60vw, 800px)",
            height: "clamp(200px, 28vw, 420px)",
            background: "radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 65%)",
            filter: "blur(48px)",
            zIndex: 0, pointerEvents: "none",
          }}
        />

        {/* ─ Dot Grid Pattern ─ */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(15,23,42,0.1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            zIndex: 1, pointerEvents: "none",
          }}
        />

        {/* ─ Top-left wordmark ─ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            position: "absolute",
            top: "clamp(1.5rem, 3vw, 2.2rem)",
            left: "clamp(1.5rem, 4vw, 3.2rem)",
            zIndex: 10,
          }}
        >
          <span style={{
            fontSize: "0.8rem", fontWeight: 700,
            letterSpacing: "0.04em",
            color: "rgba(15,23,42,0.65)",
            fontFamily: "'Outfit', sans-serif",
          }}>
            JB<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </motion.div>

        {/* ─ Top-right metadata ─ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          style={{
            position: "absolute",
            top: "clamp(1.5rem, 3vw, 2.2rem)",
            right: "clamp(1.5rem, 4vw, 3.2rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.28rem",
            zIndex: 10,
          }}
        >
          {["Est. 2022", "Portfolio v2026"].map((t, i) => (
            <span key={i} style={{
              fontSize: "0.54rem", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: i === 1 ? "rgba(37,99,235,0.65)" : "var(--fg3)",
              fontFamily: "'DM Mono', monospace",
            }}>{t}</span>
          ))}
        </motion.div>

        {/* ─ Side rotated labels ─ */}
        {[
          { side: "left", text: "Jophin Babu — Developer & Engineer", rotate: "-90deg" },
          { side: "right", text: "Kochi, Kerala · India", rotate: "90deg" },
        ].map(({ side, text, rotate }) => (
          <motion.div
            key={side}
            className="side-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 1 }}
            style={{
              position: "absolute",
              [side]: "2rem",
              top: "50%",
              transform: `translateY(-50%) rotate(${rotate})`,
              fontSize: "0.52rem", fontWeight: 600,
              letterSpacing: "0.26em", textTransform: "uppercase",
              color: "var(--fg3)",
              fontFamily: "'DM Mono', monospace",
              whiteSpace: "nowrap",
              zIndex: 5, pointerEvents: "none",
            }}
          >
            {text}
          </motion.div>
        ))}

        {/* ══ MAIN CONTENT ══ */}
        <motion.div
          style={{
            y: yParallax,
            opacity: fadeOut,
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            padding: "0 clamp(1.5rem, 6vw, 6rem)",
          }}
        >



          {/* ── Name block ── */}
          <div style={{ textAlign: "center", position: "relative" }}>

            {/* FIRST */}
            <div style={{
              overflow: "hidden", lineHeight: 0.87,
              display: "flex", justifyContent: "center",
            }}>
              {FIRST.map((l, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="show"
                  variants={letterV}
                  style={{
                    fontSize: "clamp(4.2rem, 12.5vw, 14rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    color: "var(--fg)",
                    fontFamily: "'Outfit', sans-serif",
                    userSelect: "none",
                    display: "inline-block",
                  }}
                >
                  {l}
                </motion.span>
              ))}
            </div>

            {/* Accent divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: "2px",
                margin: "0.12em auto",
                maxWidth: "clamp(180px, 28vw, 380px)",
                background: "linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent)",
                borderRadius: "2px",
                transformOrigin: "center",
              }}
            />

            {/* LAST */}
            <div style={{
              overflow: "hidden", lineHeight: 0.87,
              display: "flex", justifyContent: "center",
            }}>
              {LAST.map((l, i) => (
                <motion.span
                  key={i}
                  custom={i + FIRST.length}
                  initial="hidden"
                  animate="show"
                  variants={letterV}
                  style={{
                    fontSize: "clamp(4.2rem, 12.5vw, 14rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    color: "transparent",
                    WebkitTextStroke: "1.5px rgba(15,23,42,0.65)",
                    fontFamily: "'Outfit', sans-serif",
                    userSelect: "none",
                    display: "inline-block",
                  }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ── Role cycler ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.8 }}
            style={{
              marginTop: "clamp(1.4rem, 2.8vw, 2.2rem)",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              height: "1.5rem",
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "32px", height: "1px",
                background: "var(--accent)",
                transformOrigin: "left", flexShrink: 0,
              }}
            />
            <div style={{
              overflow: "hidden", height: "1.5rem",
              display: "flex", alignItems: "center",
              minWidth: "clamp(200px, 26vw, 320px)",
              justifyContent: "center",
            }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={{ y: 22, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -22, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontSize: "clamp(0.68rem, 1.1vw, 0.9rem)",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--fg2)",
                    fontFamily: "'DM Mono', monospace",
                    whiteSpace: "nowrap",
                  }}
                >
                  {ROLES[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "32px", height: "1px",
                background: "var(--accent)",
                transformOrigin: "right", flexShrink: 0,
              }}
            />
          </motion.div>

          {/* ── Stats row ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.42, duration: 0.8 }}
            style={{
              marginTop: "clamp(1.8rem, 3.2vw, 2.8rem)",
              display: "flex",
              border: "1px solid var(--border)",
              borderRadius: "5px",
              overflow: "hidden",
              background: "rgba(15,23,42,0.02)",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "clamp(0.8rem, 1.5vw, 1.1rem) clamp(1.4rem, 3vw, 2.6rem)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.22rem",
                  borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span style={{
                  fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                  fontWeight: 700, lineHeight: 1,
                  color: "var(--fg)",
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: "-0.02em",
                }}>
                  {s.value}
                </span>
                <span style={{
                  fontSize: "0.56rem", fontWeight: 500,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: "var(--fg3)",
                  fontFamily: "'DM Mono', monospace",
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.62, duration: 0.8 }}
            style={{
              marginTop: "clamp(2rem, 3.8vw, 3rem)",
              display: "flex",
              gap: "0.85rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a href="/resume.pdf" download="Jophin_Babu_Resume.pdf" type="application/pdf" className="btn-primary">
              Download Resume
              <span style={{ opacity: 0.75 }}>↓</span>
            </a>
            <a href="#projects" className="btn-ghost">
              View Projects
              <span style={{ opacity: 0.45 }}>→</span>
            </a>
          </motion.div>

        </motion.div>

        {/* ─ Ticker ─ */}
        <Ticker />

        {/* ─ Bottom bar ─ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1 }}
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "4rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 clamp(1.5rem, 4vw, 3.2rem)",
            zIndex: 10,
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Socials */}
          <div style={{ display: "flex", gap: "1.8rem" }}>
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/jophin-babu-0ab046318" },
              { label: "GitHub", href: "https://github.com/jophinbabu" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="s-link">
                <span className="s-link-bar" />
                {label}
              </a>
            ))}
          </div>

          {/* Scroll indicator — center */}
          <div style={{
            position: "absolute", left: "50%",
            transform: "translateX(-50%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "0.4rem",
          }}>
            <div style={{
              width: "17px", height: "27px",
              borderRadius: "9px",
              border: "1px solid rgba(15,23,42,0.14)",
              display: "flex", justifyContent: "center",
              paddingTop: "5px",
            }}>
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [1, 0.25, 1] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                style={{
                  width: "2px", height: "5px",
                  borderRadius: "2px",
                  background: "var(--accent)",
                }}
              />
            </div>
          </div>

          {/* Page index */}
          <span style={{
            fontSize: "0.54rem", fontWeight: 500,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--fg3)",
            fontFamily: "'DM Mono', monospace",
          }}>
            01 / Hero
          </span>
        </motion.div>

      </section>
    </>
  );
}