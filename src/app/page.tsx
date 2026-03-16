"use client";

import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import AnimateInView from "@/components/AnimateInView";
import ScrollRevealText from "@/components/ScrollRevealText";
import GlowCard from "@/components/GlowCard";
import { portfolioAssets } from "@/lib/portfolioAssets";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main>
      <Hero />
      
      {/* ─── INTRO SECTION ─── */}
      <section id="about" style={{ padding: '10rem 0 8rem', backgroundColor: 'var(--background)', position: 'relative', overflow: 'hidden' }}>
        {/* ─ Dot Grid Pattern ─ */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(15,23,42,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            zIndex: 0, pointerEvents: "none",
          }}
        />

        {/* ─ Vertical Grid lines ─ */}
        {[16.66, 33.33, 50, 66.66, 83.33].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p}%`,
              top: 0, bottom: 0,
              width: "1px",
              background: "rgba(15,23,42,0.03)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* ─ Radial glow ─ */}
        <div
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "clamp(400px, 60vw, 800px)",
            height: "clamp(400px, 60vw, 800px)",
            background: "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 65%)",
            filter: "blur(60px)",
            zIndex: 0, pointerEvents: "none",
          }}
        />

        {/* ─ Horizontal midline ─ */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0, right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.1) 25%, rgba(37,99,235,0.1) 75%, transparent 100%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          {/* Section label row */}
          <AnimateInView yOffset={20}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
              <p className="section-label" style={{ margin: 0, color: 'var(--fg3)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>
                <span style={{ color: 'var(--accent)' }}>//</span> Intro
              </p>
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
            .intro-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 6rem;
              margin-top: 6rem;
            }
            .stats-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 3rem;
              padding-top: 0.5rem;
            }
            @media (max-width: 1024px) {
              .intro-grid {
                grid-template-columns: 1fr;
                gap: 4rem;
                margin-top: 4rem;
              }
            }
          `}</style>

          {/* Two-column detail area */}
          <div className="intro-grid">
            {/* Left column — description with accent border */}
            <AnimateInView yOffset={30}>
              <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '2rem' }}>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--fg)', marginBottom: '1.5rem' }}>
                  Bringing your vision to life quickly and efficiently—whether it&apos;s web apps, AI systems, or mobile platforms—I&apos;ve got it covered, delivering smooth and effective solutions from start to finish.
                </p>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--fg2)' }}>
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
              <div className="stats-grid">
                {[
                  { value: '2', label: 'Year of Experience' },
                  { value: '6', label: 'Projects Delivered' },
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
                    <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--fg3)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
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
      <section style={{ padding: '8rem 0', backgroundColor: 'var(--background)', position: 'relative', overflow: 'hidden' }}>
        {/* ─ Dot Grid Pattern ─ */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            zIndex: 0, pointerEvents: "none",
          }}
        />

        {/* ─ Vertical Grid lines ─ */}
        {[16.66, 33.33, 50, 66.66, 83.33].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p}%`,
              top: 0, bottom: 0,
              width: "1px",
              background: "rgba(15,23,42,0.02)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <AnimateInView yOffset={20}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
              <p className="section-label" style={{ margin: 0, color: 'var(--fg3)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'DM Mono', monospace" }}>
                <span style={{ color: 'var(--accent)' }}>//</span> Expertise
              </p>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
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
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--fg2)', marginBottom: '1.5rem', flex: 1 }}>
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
                          border: `1px solid var(--border)`,
                          color: 'var(--fg2)',
                          background: 'var(--surface)',
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

      <section id="projects" style={{ 
        backgroundColor: 'var(--background)', 
        color: 'var(--fg)', 
        padding: '10rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* ─ Dot Grid Pattern ─ */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            zIndex: 0, pointerEvents: "none",
          }}
        />

        {/* ─ Radial glow ─ */}
        <div
          style={{
            position: "absolute",
            top: "20%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "clamp(400px, 60vw, 800px)",
            height: "clamp(400px, 60vw, 800px)",
            background: "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 65%)",
            filter: "blur(60px)",
            zIndex: 0, pointerEvents: "none",
          }}
        />

        {/* ─ Vertical Grid lines ─ */}
        {[16.66, 33.33, 50, 66.66, 83.33].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p}%`,
              top: 0, bottom: 0,
              width: "1px",
              background: "rgba(15,23,42,0.03)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <AnimateInView yOffset={40}>
             <p style={{ 
               marginBottom: '6rem',
               fontSize: '0.65rem', 
               fontWeight: 600,
               letterSpacing: '0.15em', 
               color: 'var(--fg3)',
               textTransform: 'uppercase',
               fontFamily: "'DM Mono', monospace",
               display: 'flex',
               alignItems: 'center',
               gap: '0.75rem'
             }}>
               <span style={{ color: 'var(--accent)' }}>//</span> Projects
             </p>
          </AnimateInView>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
            <AnimateInView yOffset={60}>
              <ProjectCard 
                title="BloodLink"
                category="React Native & Spring Boot"
                description="A full-cycle Laboratory Information Management System (LIMS) deployed live at Amala Hospital, used daily by 50+ medical staff. Tracks blood units end-to-end from donor registration to issuance, with 100% traceability across 2000+ donors."
                impact="Replaced manual blood-bank workflows with a live traceability system used by hospital staff every day."
                metrics={[
                  { value: '50+', label: 'medical staff using it daily' },
                  { value: '2000+', label: 'donor records tracked' },
                  { value: '100%', label: 'unit-level traceability' },
                ]}
                stack={['React Native', 'Spring Boot', 'PostgreSQL', 'LIMS Workflow']}
                imageSrc={portfolioAssets.projects.bloodlink}
                link="https://github.com"
                year="2026"
              />
            </AnimateInView>
            <AnimateInView yOffset={60}>
              <ProjectCard 
                title="RoadGuard AI"
                category="Computer Vision & Full-Stack"
                description="An end-to-end computer vision pipeline that automates road infrastructure inspection. A vehicle-mounted phone captures GPS-tagged frames, streams them to a YOLOv8 inference server, and plots real-time defect markers on a live Leaflet map dashboard."
                impact="Turned road inspection into a real-time field workflow with GPS-tagged detections and map-based review."
                metrics={[
                  { value: 'Live', label: 'defect plotting on dashboard' },
                  { value: 'YOLOv8', label: 'vision inference pipeline' },
                  { value: 'GPS', label: 'frame-level geotagging' },
                ]}
                stack={['YOLOv8', 'FastAPI', 'Leaflet', 'GPS Frame Streaming']}
                imageSrc={portfolioAssets.projects.roadguard}
                link="http://3.6.94.162:8000/"
                year="2026"
              />
            </AnimateInView>
            <AnimateInView yOffset={60}>
              <ProjectCard 
                title="Tata Trading AI"
                category="Quantitative Trading"
                description="A quantitative trading system for the Indian stock market. Built with a custom Confidence Threshold Optimizer and a LightGBM model trained on 33 technical indicators."
                impact="Combined model confidence scoring with technical analysis to produce a more decision-ready trading signal."
                metrics={[
                  { value: '33', label: 'technical indicators used' },
                  { value: 'LightGBM', label: 'core predictive model' },
                  { value: 'Custom', label: 'confidence threshold optimizer' },
                ]}
                stack={['Python', 'LightGBM', 'Technical Indicators', 'Threshold Optimizer']}
                imageSrc={portfolioAssets.projects.tataTrading}
                link="https://tatasteel-ai-prediciton-model.vercel.app"
                year="2026"
              />
            </AnimateInView>
            <AnimateInView yOffset={60}>
              <ProjectCard 
                title="Automatic Exam Seating System"
                category="React, Node.js, MongoDB"
                impact="Compressed a slow manual academic workflow into an automated planning system built for large seating constraints."
                metrics={[
                  { value: 'Days -> Minutes', label: 'planning time reduced' },
                  { value: 'Auto', label: 'constraint-based seat allocation' },
                ]}
                stack={['React', 'Node.js', 'MongoDB', 'Constraint Scheduling']}
                description="An automated seating arrangement system that handles complex scheduling constraints for exams. Reduced planning time from days to minutes using constraint-based algorithms — eliminating the manual effort typically involved in organizing large-scale exam halls."
                year="2024"
              />
            </AnimateInView>
            <AnimateInView yOffset={60}>
              <ProjectCard 
                title="PaisaWise"
                category="Python, Random Forest"
                impact="Made budgeting more proactive by forecasting near-term financial needs from historical spending data."
                metrics={[
                  { value: 'Quarterly', label: 'budget forecasting horizon' },
                  { value: 'ML', label: 'prediction-driven planning' },
                ]}
                stack={['Python', 'Random Forest', 'Time-Series Forecasting', 'Budget Analytics']}
                description="A machine learning-powered financial tool that forecasts an organisation's budget for the next quarter. Built around a Random Forest model, it analyzes historical financial data to deliver accurate, data-driven budget predictions — helping organisations plan smarter and reduce financial uncertainty."
                link="https://github.com"
                year="2025"
              />
            </AnimateInView>
            <AnimateInView yOffset={60}>
              <ProjectCard 
                title="BigChat Platform"
                category="Real-Time Systems"
                impact="Packaged multiple synchronous collaboration tools into one fast, secure communication experience."
                metrics={[
                  { value: 'E2E', label: 'encrypted messaging flow' },
                  { value: 'WebRTC', label: 'video calling engine' },
                  { value: 'Realtime', label: 'canvas and game sync' },
                ]}
                stack={['Socket.io', 'WebRTC', 'End-to-End Encryption', 'Shared Canvas Sync']}
                description="A secure platform with End-to-End Encryption, WebRTC video calling, a shared canvas, and multiplayer mini-games — all synced in real time via Socket.io."
                imageSrc={portfolioAssets.projects.bigChat}
                link="https://bigchat-frontend.vercel.app"
                year="2026"
              />
            </AnimateInView>
          </div>
        </div>
      </section>

    </main>
  );
}
