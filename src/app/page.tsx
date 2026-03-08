"use client";

import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import AnimateInView from "@/components/AnimateInView";
import ScrollRevealText from "@/components/ScrollRevealText";
import GlowCard from "@/components/GlowCard";

export default function Home() {
  return (
    <main>
      <Hero />
      
      {/* ─── INTRO SECTION ─── */}
      <section id="about" style={{ padding: '10rem 0 8rem', backgroundColor: 'var(--background)', position: 'relative' }}>
        <div className="container">
          {/* Section label row */}
          <AnimateInView yOffset={20}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
              <p className="section-label" style={{ margin: 0 }}><span>//</span> Intro</p>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>
          </AnimateInView>

          {/* Big scroll-reveal statement */}
          <ScrollRevealText
            text="I partner with founders to turn ideas into real products. I focus on clear interfaces, sharp decisions, and fast execution."
            className="intro-reveal-text"
          />
          <style jsx>{`
            .intro-reveal-text {
              font-size: clamp(2.2rem, 5vw, 4.5rem);
              font-weight: 800;
              line-height: 1.15;
              letter-spacing: -0.03em;
              margin-bottom: 0;
              max-width: 1200px;
            }
          `}</style>

          {/* Two-column detail area */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', marginTop: '6rem' }}>
            {/* Left column — description with accent border */}
            <AnimateInView yOffset={30}>
              <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '2rem' }}>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#444', marginBottom: '1.5rem' }}>
                  Bringing your vision to life quickly and efficiently—whether it&apos;s web apps, AI systems, or mobile platforms—I&apos;ve got it covered, delivering smooth and effective solutions from start to finish.
                </p>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#777' }}>
                  I&apos;ve architected full-stack AI pipelines, built real-time platforms used by medical professionals, and engineered quantitative trading models. I love turning complex logic into seamless experiences.
                </p>
              </div>
              <div style={{ marginTop: '3rem' }}>
                <a
                  href="#projects"
                  className="btn btn-accent"
                  style={{ padding: '1rem 2.5rem', borderRadius: '100px', fontSize: '0.95rem' }}
                >
                  See my Work →
                </a>
              </div>
            </AnimateInView>

            {/* Right column — stats grid */}
            <AnimateInView yOffset={30} delay={0.15}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', paddingTop: '0.5rem' }}>
                {[
                  { value: '3+', label: 'Years of Experience' },
                  { value: '10+', label: 'Projects Delivered' },
                  { value: '4', label: 'Domains Explored' },
                  { value: '∞', label: 'Curiosity Level' },
                ].map((stat, i) => (
                  <div key={i} style={{ textAlign: 'left' }}>
                    <p style={{
                      fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                      fontWeight: 900,
                      lineHeight: 1,
                      marginBottom: '0.5rem',
                      color: i === 0 ? 'var(--accent)' : 'var(--foreground)',
                    }}>
                      {stat.value}
                    </p>
                    <p style={{ fontSize: '0.85rem', fontWeight: 500, color: '#888', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* ─── EXPERTISE SECTION ─── */}
      <section style={{ padding: '8rem 0', backgroundColor: 'var(--section-dark-bg)', color: 'var(--section-dark-fg)' }}>
        <div className="container">
          <AnimateInView yOffset={20}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
              <p className="section-label" style={{ margin: 0 }}><span>//</span> Expertise</p>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            </div>
          </AnimateInView>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                num: '01',
                title: 'Frontend & Mobile',
                desc: 'Crafting responsive, pixel-perfect interfaces with modern frameworks and fluid animations.',
                tags: ['React.js', 'Next.js', 'React Native', 'TailwindCSS', 'Framer Motion'],
                accent: '#ff4d29',
              },
              {
                num: '02',
                title: 'Backend Systems',
                desc: 'Building robust APIs, microservices, and real-time infrastructure that scales.',
                tags: ['Node.js', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Socket.io'],
                accent: '#3b82f6',
              },
              {
                num: '03',
                title: 'AI / ML',
                desc: 'Deploying intelligent models from training to production-grade inference pipelines.',
                tags: ['YOLOv8', 'LightGBM', 'OpenCV', 'Pandas', 'TensorFlow'],
                accent: '#22c55e',
              },
              {
                num: '04',
                title: 'Cloud & DevOps',
                desc: 'Containerized deployments, CI/CD pipelines, and cloud-native architecture.',
                tags: ['AWS', 'Docker', 'Nginx', 'GitHub Actions', 'Vercel'],
                accent: '#a855f7',
              },
              {
                num: '05',
                title: 'Cybersecurity',
                desc: 'Secure system design with a focus on encryption, auth, and vulnerability analysis.',
                tags: ['Penetration Testing', 'JWT/OAuth', 'E2E Encryption', 'OWASP'],
                accent: '#eab308',
              },
            ].map((skill, index) => (
              <AnimateInView key={skill.num} delay={index * 0.08} yOffset={30}>
                <GlowCard accentColor={skill.accent}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: skill.accent, letterSpacing: '0.05em' }}>
                      {skill.num}
                    </span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>{skill.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(15,23,42,0.6)', marginBottom: '1.5rem', flex: 1 }}>
                    {skill.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          padding: '0.35rem 0.75rem',
                          borderRadius: '100px',
                          border: `1px solid rgba(15,23,42,0.15)`,
                          color: 'rgba(15,23,42,0.65)',
                          letterSpacing: '0.03em',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" style={{ backgroundColor: 'var(--section-dark-bg)', color: 'var(--section-dark-fg)', padding: '10rem 0' }}>
        <div className="container">
          <AnimateInView yOffset={40}>
             <p className="section-label" style={{ marginBottom: '6rem' }}><span>//</span> Projects</p>
          </AnimateInView>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
            <AnimateInView yOffset={60}>
              <ProjectCard 
                title="BloodLink"
                category="React Native & Spring Boot"
                description="A full-cycle Laboratory Information Management System (LIMS) deployed live at Amala Hospital, used daily by 50+ medical staff. Tracks blood units end-to-end from donor registration to issuance, with 100% traceability across 2000+ donors."
                imageSrc={[
                  "/bloodlink-1.png",
                  "/bloodlink-2.jpg",
                  "/bloodlink-3.jpg",
                  "/bloodlink-4.jpg",
                  "/bloodlink-5.jpg"
                ]}
                link="https://github.com"
                year="2026"
              />
            </AnimateInView>
            <AnimateInView yOffset={60}>
              <ProjectCard 
                title="RoadGuard AI"
                category="Computer Vision & Full-Stack"
                description="An end-to-end computer vision pipeline that automates road infrastructure inspection. A vehicle-mounted phone captures GPS-tagged frames, streams them to a YOLOv8 inference server, and plots real-time defect markers on a live Leaflet map dashboard."
                imageSrc={[
                  "/roadguard-1.jpg",
                  "/roadguard-2.jpg",
                  "/roadguard-3.png"
                ]}
                link="http://3.6.94.162:8000/"
                year="2024"
              />
            </AnimateInView>
            <AnimateInView yOffset={60}>
              <ProjectCard 
                title="Tata Trading AI"
                category="Quantitative Trading"
                description="A quantitative trading system for the Indian stock market. Built with a custom Confidence Threshold Optimizer and a LightGBM model trained on 33 technical indicators."
                imageSrc="/tata-trading.png"
                link="https://tatasteel-ai-prediciton-model.vercel.app"
                year="2023"
              />
            </AnimateInView>
            <AnimateInView yOffset={60}>
              <ProjectCard 
                title="Automatic Exam Seating System"
                category="React, Node.js, MongoDB"
                description="An automated seating arrangement system that handles complex scheduling constraints for exams. Reduced planning time from days to minutes using constraint-based algorithms — eliminating the manual effort typically involved in organizing large-scale exam halls."
                year="2023"
              />
            </AnimateInView>
            <AnimateInView yOffset={60}>
              <ProjectCard 
                title="PaisaWise"
                category="Python, Random Forest"
                description="A machine learning-powered financial tool that forecasts an organisation's budget for the next quarter. Built around a Random Forest model, it analyzes historical financial data to deliver accurate, data-driven budget predictions — helping organisations plan smarter and reduce financial uncertainty."
                link="https://github.com"
                year="2024"
              />
            </AnimateInView>
            <AnimateInView yOffset={60}>
              <ProjectCard 
                title="BigChat Platform"
                category="Real-Time Systems"
                description="A secure platform with End-to-End Encryption, WebRTC video calling, a shared canvas, and multiplayer mini-games — all synced in real time via Socket.io."
                imageSrc={[
                  "/bigchat-1.png",
                  "/bigchat-2.png",
                  "/bigchat-3.png"
                ]}
                link="https://bigchat-frontend.vercel.app"
                year="2023"
              />
            </AnimateInView>
          </div>
        </div>
      </section>

    </main>
  );
}
