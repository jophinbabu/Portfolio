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
          padding: 7rem 0 3rem;
        }
        .contact-shell {
          border: 1px solid var(--border);
          border-radius: 24px;
          background: var(--surface);
          box-shadow: var(--shadow-soft);
          overflow: hidden;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        .contact-side {
          padding: 1.4rem;
        }
        .contact-side--left {
          border-bottom: 1px solid var(--border);
        }
        .contact-kicker {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          margin-bottom: 0.85rem;
          font-size: 0.64rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: var(--fg3);
          text-transform: uppercase;
          font-family: var(--font-mono);
        }
        .contact-intro {
          color: var(--fg2);
          font-size: 0.98rem;
          line-height: 1.7;
          max-width: 34rem;
        }
        .contact-info-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          margin-top: 1.35rem;
        }
        .contact-info-card {
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 0.85rem 0.95rem;
          background: var(--surface-strong);
        }
        .contact-info-label {
          display: block;
          margin-bottom: 0.45rem;
          color: var(--fg3);
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-family: var(--font-mono);
        }
        .contact-info-value {
          color: var(--fg);
          font-size: 0.96rem;
          font-weight: 700;
          line-height: 1.45;
          word-break: break-word;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          width: 100%;
        }
        .contact-form-panel {
          border: 1px solid var(--border);
          border-radius: 14px;
          background: var(--surface-strong);
          padding: 0.9rem;
        }
        .contact-form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--fg2);
          font-family: var(--font-sans);
        }
        .status-card {
          margin-top: 0.2rem;
          padding: 0.9rem 1rem;
          border-radius: 14px;
          font-size: 0.88rem;
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
          padding-top: 2rem;
          margin-top: 2rem;
          font-size: 0.75rem;
          color: var(--fg3);
          flex-wrap: wrap;
          gap: 0.9rem;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        @media (min-width: 900px) {
          .contact-grid {
            grid-template-columns: 0.95fr 1.05fr;
          }
          .contact-side {
            padding: 2rem;
          }
          .contact-side--left {
            border-bottom: none;
            border-right: 1px solid var(--border);
          }
          .contact-info-row {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 768px) {
          .footer-wrapper {
            padding: 5rem 0 2rem;
          }
          .contact-shell {
            border-radius: 20px;
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
        <div className="contact-shell">
          <div className="contact-grid">
            <div className="contact-side contact-side--left">
              <AnimateInView yOffset={24}>
                <p className="contact-kicker">
                  <span style={{ color: "var(--accent)" }}>//</span> Contact
                </p>
                <h2
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4.4rem)",
                    marginBottom: "0.9rem",
                    lineHeight: 0.98,
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "-0.04em",
                    fontWeight: 800,
                    color: "var(--fg)",
                  }}
                >
                  Let&apos;s talk
                </h2>
                <p className="contact-intro">
                  Open to product work, AI systems, and full-stack builds that need sharp execution.
                </p>

                <div className="contact-info-row">
                  {CONTACT_ITEMS.map((item) => (
                    <div key={item.label} className="contact-info-card">
                      <span className="contact-info-label">{item.label}</span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="contact-info-value"
                          style={{
                            borderBottom: "1px solid transparent",
                            paddingBottom: "0.1rem",
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
              </AnimateInView>
            </div>

            <div className="contact-side">
              <AnimateInView delay={0.15} yOffset={24}>
                <form onSubmit={handleSubmit} className="contact-form">
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
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project."
                      required
                      className="form-input form-textarea"
                    />
                  </div>

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
                      padding: "1rem 2rem",
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      marginTop: "0.15rem",
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>

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
