"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import AnimateInView from "./AnimateInView";

const CONTACT_ITEMS = [
  {
    label: "Email",
    value: "jophin735@gmail.com",
    href: "mailto:jophin735@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 7356066391",
    href: "tel:7356066391",
  },
  {
    label: "Location",
    value: "Kochi, Kerala",
  },
  {
    label: "Reply Time",
    value: "Within 24 hours",
  },
];

export default function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_placeholder",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_placeholder",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          title: "Portfolio Inquiry",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_key_placeholder"
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="contact"
      className="footer-wrapper"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--fg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style jsx>{`
        .footer-wrapper {
          padding: 10rem 0 4rem;
        }
        .contact-shell {
          border: 1px solid var(--border);
          border-radius: 28px;
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--surface) 86%, transparent), transparent 72%),
            var(--surface);
          box-shadow: var(--shadow-soft);
          overflow: hidden;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        .contact-side {
          padding: 3rem;
        }
        .contact-side--left {
          border-bottom: 1px solid var(--border);
          background:
            radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 12%, transparent), transparent 45%),
            transparent;
        }
        .contact-kicker {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: var(--fg3);
          text-transform: uppercase;
          font-family: var(--font-mono);
        }
        .contact-intro {
          color: var(--fg2);
          font-size: 1rem;
          line-height: 1.7;
          max-width: 36rem;
        }
        .contact-info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.9rem;
          margin-top: 2rem;
        }
        .contact-info-card {
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1rem 1.05rem;
          background: var(--surface-strong);
        }
        .contact-info-label {
          display: block;
          margin-bottom: 0.55rem;
          color: var(--fg3);
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-family: var(--font-mono);
        }
        .contact-info-value {
          color: var(--fg);
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.5;
          word-break: break-word;
        }
        .contact-note {
          margin-top: 1.2rem;
          border: 1px solid color-mix(in srgb, var(--accent) 18%, var(--border));
          border-radius: 18px;
          padding: 1rem 1.05rem;
          background: color-mix(in srgb, var(--surface-strong) 90%, transparent);
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        .contact-form-panel {
          border: 1px solid var(--border);
          border-radius: 18px;
          background: var(--surface-strong);
          padding: 1rem;
        }
        .contact-form-label {
          display: block;
          margin-bottom: 0.55rem;
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--fg2);
          font-family: var(--font-sans);
        }
        .contact-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 0.35rem;
        }
        .status-card {
          margin-top: 0.5rem;
          padding: 1rem;
          border-radius: 14px;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .status-card--success {
          background: color-mix(in srgb, #22c55e 12%, var(--surface-strong));
          border: 1px solid color-mix(in srgb, #22c55e 26%, var(--border));
          color: #16a34a;
        }
        .status-card--error {
          background: color-mix(in srgb, #dc2626 12%, var(--surface-strong));
          border: 1px solid color-mix(in srgb, #dc2626 26%, var(--border));
          color: #dc2626;
        }
        .footer-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border);
          padding-top: 2.5rem;
          font-size: 0.75rem;
          color: var(--fg3);
          flex-wrap: wrap;
          gap: 1rem;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1.02fr 1fr;
          }
          .contact-side--left {
            border-bottom: none;
            border-right: 1px solid var(--border);
          }
          .contact-info-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 768px) {
          .footer-wrapper {
            padding: 6rem 0 2rem !important;
          }
          .contact-shell {
            border-radius: 22px;
          }
          .contact-side {
            padding: 1.35rem;
          }
          .contact-intro {
            font-size: 0.98rem;
          }
          .footer-meta {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--border), transparent)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        <div style={{ marginBottom: "8rem" }}>
          <div className="contact-shell">
            <div className="contact-grid">
              <div className="contact-side contact-side--left">
                <AnimateInView yOffset={30}>
                  <p className="contact-kicker">
                    <span style={{ color: "var(--accent)" }}>//</span> Contact
                  </p>
                  <h2
                    style={{
                      fontSize: "clamp(3rem, 6vw, 5rem)",
                      marginBottom: "1rem",
                      lineHeight: 0.95,
                      fontFamily: "var(--font-sans)",
                      letterSpacing: "-0.04em",
                      fontWeight: 800,
                      color: "var(--fg)",
                    }}
                  >
                    Let&apos;s talk
                  </h2>
                  <p className="contact-intro">
                    I&apos;m open to freelance work, product collaborations, and full-time opportunities where thoughtful engineering and product taste matter.
                  </p>

                  <div className="contact-info-grid">
                    {CONTACT_ITEMS.map((item) => (
                      <div key={item.label} className="contact-info-card">
                        <span className="contact-info-label">{item.label}</span>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="contact-info-value"
                            style={{
                              borderBottom: "1px solid transparent",
                              paddingBottom: "0.15rem",
                              transition: "border-color 0.3s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderBottomColor = "var(--accent)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderBottomColor = "transparent";
                            }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="contact-info-value">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="contact-note">
                    <p
                      style={{
                        fontSize: "0.68rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        fontFamily: "var(--font-mono)",
                        marginBottom: "0.55rem",
                        fontWeight: 700,
                      }}
                    >
                      Best Fit
                    </p>
                    <p
                      style={{
                        color: "var(--fg2)",
                        lineHeight: 1.65,
                        fontSize: "0.98rem",
                      }}
                    >
                      Great fit for startups, internal tools, AI-enabled products, and systems that need both engineering depth and fast iteration.
                    </p>
                  </div>
                </AnimateInView>
              </div>

              <div className="contact-side">
                <AnimateInView delay={0.2} yOffset={30}>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div style={{ marginBottom: "0.35rem" }}>
                      <p className="contact-kicker" style={{ marginBottom: "0.8rem" }}>
                        <span style={{ color: "var(--accent)" }}>//</span> Start a Conversation
                      </p>
                      <p
                        style={{
                          color: "var(--fg2)",
                          lineHeight: 1.65,
                          fontSize: "0.98rem",
                          maxWidth: "34rem",
                        }}
                      >
                        Share a bit about what you&apos;re building and I&apos;ll reply with next steps, ideas, or a practical way we can work together.
                      </p>
                    </div>

                    <div className="contact-form-panel">
                      <label htmlFor="name" className="contact-form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="contact-form-panel">
                      <label htmlFor="email" className="contact-form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="contact-form-panel">
                      <label htmlFor="message" className="contact-form-label">
                        Project Brief
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me what you're building, what stage it's in, and where you need help."
                        required
                        className="form-input form-textarea"
                      />
                    </div>

                    <div className="contact-actions">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-accent"
                        style={{
                          width: "fit-content",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.1em",
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          padding: "1.1rem 2.2rem",
                          opacity: isSubmitting ? 0.7 : 1,
                          cursor: isSubmitting ? "not-allowed" : "pointer",
                        }}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                      <span
                        style={{
                          color: "var(--fg3)",
                          fontSize: "0.78rem",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Prefer email? `mailto:jophin735@gmail.com`
                      </span>
                    </div>

                    {submitStatus === "success" && (
                      <div className="status-card status-card--success">
                        Message sent successfully. I&apos;ll get back to you soon.
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="status-card status-card--error">
                        Failed to send message. Please try again later.
                      </div>
                    )}
                  </form>
                </AnimateInView>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-meta">
          <p>© {new Date().getFullYear()} Jophin Babu. All rights reserved.</p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <a
              href="https://www.linkedin.com/in/jophin-babu-0ab046318"
              target="_blank"
              rel="noopener noreferrer"
              style={{ transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg3)")}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/jophinbabu"
              target="_blank"
              rel="noopener noreferrer"
              style={{ transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg3)")}
            >
              GitHub
            </a>
          </div>
          <p>Designed & Engineered in India</p>
        </div>
      </div>
    </footer>
  );
}
