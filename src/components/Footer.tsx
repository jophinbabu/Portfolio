"use client";

import AnimateInView from "./AnimateInView";

export default function Footer() {
  return (
    <footer id="contact" style={{ backgroundColor: '#f8fafc', color: '#0f172a', padding: '10rem 0 4rem', textAlign: 'center' }}>
      <div className="container">
        <AnimateInView yOffset={30}>
          <p className="section-label" style={{ justifyContent: 'center' }}><span>//</span> Contact</p>
          <h2 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', marginBottom: '4rem', lineHeight: 1 }}>Reach<br/>Out.</h2>
        </AnimateInView>
        
        <AnimateInView delay={0.2} yOffset={30}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', marginBottom: '8rem', fontSize: '1.2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</span>
              <a href="mailto:jophinbabu@example.com" style={{ fontWeight: 500, borderBottom: '1px solid transparent' }} onMouseEnter={(e) => e.currentTarget.style.borderBottom = '1px solid #0f172a'} onMouseLeave={(e) => e.currentTarget.style.borderBottom = '1px solid transparent'}>hello@jophin.com</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</span>
              <span style={{ fontWeight: 500 }}>Thrissur, Kerala</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Social</span>
              <a href="https://www.linkedin.com/in/jophin-babu-0ab046318" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 500, borderBottom: '1px solid transparent' }} onMouseEnter={(e) => e.currentTarget.style.borderBottom = '1px solid #0f172a'} onMouseLeave={(e) => e.currentTarget.style.borderBottom = '1px solid transparent'}>LinkedIn / X</a>
            </div>
          </div>
        </AnimateInView>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(15,23,42,0.1)', paddingTop: '2rem', fontSize: '0.9rem', color: '#64748b', flexWrap: 'wrap', gap: '1rem' }}>
          <p>© {new Date().getFullYear()} Jophin Babu</p>
          <p>Built for Performance & Design</p>
        </div>
      </div>
    </footer>
  );
}
