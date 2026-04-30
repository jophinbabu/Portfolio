"use client";

import Link from "next/link";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
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
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme =
      savedTheme === "dark" || savedTheme === "light"
        ? (savedTheme as "light" | "dark")
        : preferredDark
          ? "dark"
          : "light";

    root.dataset.theme = nextTheme;
    const frame = window.requestAnimationFrame(() => setTheme(nextTheme));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextTheme = theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  };

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
        .nav-link {
          position: relative;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-family: var(--font-mono);
          color: var(--fg3);
          text-decoration: none;
          transition: color 0.25s;
          padding: 0.25rem 0;
        }
        .nav-link:hover { color: var(--fg); }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0; right: 0;
          height: 1px;
          background: var(--accent);
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
          font-family: var(--font-mono);
          color: #fff;
          background: var(--accent);
          border: 1.5px solid var(--accent);
          border-radius: 3px;
          padding: 0.45rem 1.1rem;
          text-decoration: none;
          transition: background 0.25s, box-shadow 0.25s;
          white-space: nowrap;
        }
        .nav-cta:hover {
          background: var(--accent-strong);
          box-shadow: 0 6px 24px rgba(37,99,235,0.3);
        }

        .theme-toggle {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--fg);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .theme-toggle:hover {
          transform: translateY(-1px);
          background: var(--surface-strong);
          border-color: rgba(96,165,250,0.45);
        }

        .hamburger-line {
          display: block;
          width: 100%;
          height: 1px;
          background: var(--fg2);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s;
        }

        .mobile-nav-link {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-family: var(--font-mono);
          color: var(--fg3);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(15,23,42,0.08);
          transition: color 0.25s;
        }
        .mobile-nav-link:hover { color: var(--fg); }
        .mobile-nav-link-num {
          font-size: 0.52rem;
          color: rgba(37,99,235,0.6);
          font-family: var(--font-mono);
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
          background: scrolled ? "var(--surface)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
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
              border: "1.5px solid rgba(96,165,250,0.45)",
              borderRadius: "6px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(96,165,250,0.12)",
              position: "relative",
              flexShrink: 0,
              overflow: "hidden", // added to contain the image
            }}>
              <Image
                src="/logo.svg"
                alt="Jophin Babu Logo"
                width={32}
                height={32}
                priority
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <span style={{
              fontSize: "0.72rem", fontWeight: 600,
              letterSpacing: "0.06em",
              color: "var(--fg2)",
              fontFamily: "var(--font-sans)",
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
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
          </button>

          {/* Divider */}
          <div style={{
            width: "1px", height: "16px",
            background: "var(--border)",
            display: "block",
          }} />

          {/* CTA — desktop */}
          <Link href="#contact" className="nav-cta desktop-cta">
            Let&apos;s Talk
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
              background: "var(--surface-strong)",
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
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
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
                    color: "var(--fg3)",
                    textDecoration: "none",
                    fontFamily: "var(--font-mono)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg3)")}
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
