"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return () => unsub();
  }, [scrollY]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Outfit:wght@400;500;600;700&display=swap');

        .nav-link {
          position: relative;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          color: rgba(15,23,42,0.45);
          text-decoration: none;
          transition: color 0.25s;
          padding: 0.25rem 0;
        }
        .nav-link:hover { color: rgba(15,23,42,0.9); }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0; right: 0;
          height: 1px;
          background: #2563eb;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover::after { transform: scaleX(1); }

        .nav-cta {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          color: #fff;
          background: #2563eb;
          border: 1.5px solid #2563eb;
          border-radius: 3px;
          padding: 0.45rem 1.1rem;
          text-decoration: none;
          transition: background 0.25s, box-shadow 0.25s;
          white-space: nowrap;
        }
        .nav-cta:hover {
          background: #1d4ed8;
          box-shadow: 0 6px 24px rgba(37,99,235,0.3);
        }

        .hamburger-line {
          display: block;
          width: 100%;
          height: 1px;
          background: rgba(15,23,42,0.55);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s;
        }

        .mobile-nav-link {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          color: rgba(15,23,42,0.5);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(15,23,42,0.08);
          transition: color 0.25s;
        }
        .mobile-nav-link:hover { color: rgba(15,23,42,0.9); }
        .mobile-nav-link-num {
          font-size: 0.52rem;
          color: rgba(37,99,235,0.6);
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.1em;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: "0 clamp(1.5rem, 4vw, 3.2rem)",
          height: scrolled ? "56px" : "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "height 0.35s cubic-bezier(0.16,1,0.3,1), background 0.35s, border-color 0.35s",
          background: scrolled ? "rgba(255,255,255,0.82)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(15,23,42,0.08)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        {/* ── Left: Wordmark ── */}
        <Link
          href="/"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            {/* Logo mark */}
            <div style={{
              width: "32px", height: "32px",
              border: "1.5px solid rgba(37,99,235,0.4)",
              borderRadius: "6px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(37,99,235,0.05)",
              flexShrink: 0,
              overflow: "hidden", // added to contain the image
            }}>
              <img 
                src="/logo.svg" 
                alt="Jophin Babu Logo" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </div>
            <span style={{
              fontSize: "0.72rem", fontWeight: 600,
              letterSpacing: "0.06em",
              color: "rgba(15,23,42,0.6)",
              fontFamily: "'Outfit', sans-serif",
              display: "none",
            }}>
              {/* Hidden on small, shown via CSS if needed */}
            </span>
          </motion.div>
        </Link>

        {/* ── Center: Nav links (desktop) ── */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(1.8rem, 3vw, 3rem)",
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.slice(0, 2).map(({ label, href }) => (
            <Link key={label} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Right: CTA + Hamburger ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          {/* Divider */}
          <div style={{
            width: "1px", height: "16px",
            background: "rgba(15,23,42,0.15)",
            display: "block",
          }} />

          {/* CTA — desktop */}
          <Link href="#contact" className="nav-cta desktop-cta">
            Let's Talk
          </Link>

          {/* Hamburger — mobile */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
            style={{
              display: "none", // shown at <768px via inline media equivalent below
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.4rem",
              width: "32px",
              flexDirection: "column",
              gap: "6px",
              alignItems: "flex-end",
            }}
          >
            <span
              className="hamburger-line"
              style={{
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
                width: "22px",
              }}
            />
            <span
              className="hamburger-line"
              style={{
                opacity: menuOpen ? 0 : 1,
                width: "14px",
              }}
            />
            <span
              className="hamburger-line"
              style={{
                transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
                width: "22px",
              }}
            />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 90,
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "clamp(2rem, 8vw, 5rem)",
            }}
          >
            <div style={{ marginBottom: "2rem" }}>
              <span style={{
                fontSize: "0.55rem", fontWeight: 600,
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: "rgba(37,99,235,0.55)",
                fontFamily: "'DM Mono', monospace",
              }}>
                Navigation
              </span>
            </div>

            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={href}
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mobile-nav-link-num">0{i + 1}</span>
                  {label}
                </Link>
              </motion.div>
            ))}

            {/* Bottom meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                marginTop: "3rem",
                display: "flex",
                gap: "1.5rem",
              }}
            >
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/jophin-babu-0ab046318" },
                { label: "GitHub", href: "https://github.com/jophinbabu" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.6rem", fontWeight: 500,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "rgba(15,23,42,0.45)",
                    textDecoration: "none",
                    fontFamily: "'DM Mono', monospace",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(15,23,42,0.95)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(15,23,42,0.45)")}
                >
                  {label} ↗
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}