"use client";

import { useState } from "react";
import AnimateInView from "./AnimateInView";
import emailjs from '@emailjs/browser';

export default function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // These keys will need to be configured in EmailJS and .env.local by the user
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_placeholder',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_placeholder',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'jophin735@gmail.com', // destination email
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key_placeholder'
      );

      setSubmitStatus("success");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="footer-wrapper" style={{
      backgroundColor: 'var(--background)',
      color: 'var(--fg)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* ─ Top border gradient ─ */}
      <div style={{
        position: "absolute",
        top: 0, left: "10%", right: "10%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, var(--border), transparent)",
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '6rem',
          marginBottom: '8rem'
        }}>
          {/* CSS for larger screens to split into 2 columns */}
          <style jsx>{`
            .footer-wrapper {
              padding: 10rem 0 4rem;
            }
            @media (max-width: 768px) {
              .footer-wrapper {
                padding: 6rem 0 2rem !important;
              }
            }
            @media (min-width: 1024px) {
              .contact-grid {
                grid-template-columns: 1fr 1fr !important;
                gap: 8rem !important;
              }
            }
          `}</style>

          <div className="contact-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4rem',
          }}>

            {/* Left Side: Text and Contact Info */}
            <div>
              <AnimateInView yOffset={30}>
                <p style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '2rem',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: 'var(--fg3)',
                  textTransform: 'uppercase',
                  fontFamily: "'DM Mono', monospace"
                }}>
                  <span style={{ color: 'var(--accent)' }}>//</span> Contact
                </p>
                <h2 style={{
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  marginBottom: '1.5rem',
                  lineHeight: 0.95,
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: '-0.04em',
                  fontWeight: 800,
                  color: 'var(--fg)'
                }}>
                  Let&apos;s talk
                </h2>
                <p style={{
                  color: 'var(--fg2)',
                  fontSize: '1.05rem',
                  maxWidth: '450px',
                  marginBottom: '4rem',
                  lineHeight: 1.6
                }}>
                  Always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                </p>

                {/* Direct Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div>
                    <span style={{ display: 'block', color: 'var(--fg3)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: "'DM Mono', monospace", marginBottom: '0.5rem' }}>Email</span>
                    <a href="mailto:jophin735@gmail.com" style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--fg)', borderBottom: '1px solid transparent', paddingBottom: '0.2rem', transition: 'border-color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = 'var(--accent)'} onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}>
                      jophin735@gmail.com
                    </a>
                  </div>
                  <div>
                    <span style={{ display: 'block', color: 'var(--fg3)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: "'DM Mono', monospace", marginBottom: '0.5rem' }}>Phone</span>
                    <a href="tel:7356066391" style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--fg)', borderBottom: '1px solid transparent', paddingBottom: '0.2rem', transition: 'border-color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = 'var(--accent)'} onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}>
                      +91 7356066391
                    </a>
                  </div>
                  <div>
                    <span style={{ display: 'block', color: 'var(--fg3)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: "'DM Mono', monospace", marginBottom: '0.5rem' }}>Location</span>
                    <span style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--fg)' }}>Kochi, Kerala</span>
                  </div>
                </div>
              </AnimateInView>
            </div>

            {/* Right Side: Contact Form */}
            <AnimateInView delay={0.2} yOffset={30}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '600px' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="name" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--fg2)', fontFamily: "'Outfit', sans-serif" }}>Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--fg2)', fontFamily: "'Outfit', sans-serif" }}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="message" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--fg2)', fontFamily: "'Outfit', sans-serif" }}>Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    className="form-input form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-accent"
                  style={{
                    marginTop: '1.5rem',
                    width: 'fit-content',
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: '0.1em',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    padding: '1.2rem 3rem',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                    borderRadius: '8px',
                    color: '#16a34a',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    ✓ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    border: '1px solid rgba(220, 38, 38, 0.2)',
                    borderRadius: '8px',
                    color: '#dc2626',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    ✕ Failed to send message. Please try again later.
                  </div>
                )}

              </form>
            </AnimateInView>
          </div>
        </div>

        {/* Footer Bottom row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border)',
          paddingTop: '2.5rem',
          fontSize: '0.75rem',
          color: 'var(--fg3)',
          flexWrap: 'wrap',
          gap: '1rem',
          fontFamily: "'DM Mono', monospace",
          letterSpacing: '0.05em'
        }}>
          <p>© {new Date().getFullYear()} Jophin Babu. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="https://www.linkedin.com/in/jophin-babu-0ab046318" target="_blank" rel="noopener noreferrer" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--fg)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--fg3)'}>LinkedIn</a>
            <a href="https://github.com/jophinbabu" target="_blank" rel="noopener noreferrer" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--fg)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--fg3)'}>GitHub</a>
          </div>
          <p>Designed & Engineered in India</p>
        </div>
      </div>
    </footer>
  );
}
