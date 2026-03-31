'use client';
import Link from 'next/link';
import Image from 'next/image';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { CheckCircle, Award, Globe, Briefcase } from '@/components/Icon';

const stats = [
  { value: '10,000+', label: 'Students Enrolled' },
  { value: '14+', label: 'Partner Universities' },
  { value: '500+', label: 'Programs Available' },
  { value: '10+', label: 'Years of Excellence' },
];

const highlights = [
  { icon: <CheckCircle size={28} />, title: 'UGC-DEB Approved', desc: 'All programs comply with UGC Distance Education Bureau regulations.' },
  { icon: <Award size={28} />, title: 'NAAC Accredited', desc: 'Partner universities hold NAAC A+ and A++ accreditation.' },
  { icon: <Globe size={28} />, title: 'Globally Recognized', desc: 'WES evaluation available for international recognition of degrees.' },
  { icon: <Briefcase size={28} />, title: 'Career Support', desc: 'Dedicated placement assistance and career counseling for all students.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero - Full Width Image with Overlay Content */}
      <section style={{ 
        position: 'relative', 
        padding: '8rem 2rem 3rem',
        overflow: 'visible',
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5rem'
      }}>
        {/* Background Image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80" 
            alt="Students learning together" 
            fill 
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 64, 175, 0.75) 100%)'
          }} />
        </div>

        {/* Content Overlay */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', width: '100%' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
              <h1 style={{ 
                fontSize: 'clamp(3rem, 7vw, 5rem)', 
                fontWeight: 800, 
                color: '#fff', 
                marginBottom: 0,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
              }}>
                <span className="slide-in-left" style={{ display: 'inline-block' }}>Your Gateway to</span>
                <br/>
                <span style={{ 
                  display: 'inline-block',
                  overflow: 'hidden',
                  maxWidth: '100%'
                }}>
                  <span className="slide-in-right split-text" style={{ 
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #93c5fd 0%, #dbeafe 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    backgroundSize: '200% 200%',
                    whiteSpace: 'nowrap'
                  }}>Quality Education</span>
                </span>
              </h1>
            </div>
            
            <AnimateOnScroll animation="fadeUp" delay={100}>
              <p className="fade-in-up" style={{ 
                color: 'rgba(255,255,255,0.95)', 
                fontSize: '1.25rem', 
                lineHeight: 1.8,
                marginBottom: '2.5rem',
                fontWeight: 400,
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                maxWidth: '750px',
                margin: '0 auto 2.5rem'
              }}>
                Partner with India's top UGC-approved universities. Earn recognized degrees online with flexible learning, expert guidance, and career support.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp" delay={200}>
              <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center', position: 'relative', zIndex: 30 }}>
                <Link 
                  href="/programs"
                  className="button-hover-animation"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.75rem',
                    background: '#fff',
                    color: '#1e40af',
                    borderRadius: '3rem',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    boxShadow: '0 8px 30px rgba(255, 255, 255, 0.3)',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Browse Programs
                </Link>
                <Link 
                  href="/contact"
                  className="button-hover-animation"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.75rem',
                    background: 'transparent',
                    color: '#fff',
                    border: '2px solid rgba(255,255,255,0.4)',
                    borderRadius: '3rem',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    backdropFilter: 'blur(10px)',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Talk to Expert
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes slideInLeft {
            0% {
              opacity: 0;
              transform: translateX(-100px);
            }
            60% {
              transform: translateX(10px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            0% {
              opacity: 0;
              transform: translateX(100px);
            }
            60% {
              transform: translateX(-10px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes splitBreak {
            0% {
              letter-spacing: -0.02em;
              opacity: 0;
              transform: scale(0.8);
            }
            30% {
              letter-spacing: 0.15em;
              opacity: 0.7;
              transform: scale(1.05);
            }
            100% {
              letter-spacing: -0.02em;
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .slide-in-left {
            animation: slideInLeft 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          .slide-in-right {
            animation: slideInRight 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s both;
          }

          .split-text {
            animation: splitBreak 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s both, gradientShift 3s ease infinite 1.5s;
          }

          .fade-in-up {
            animation: fadeInUp 0.8s ease-out 0.6s both;
          }

          .button-hover-animation {
            position: relative;
            overflow: hidden;
          }

          .button-hover-animation::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
          }

          .button-hover-animation:hover::before {
            width: 300px;
            height: 300px;
          }

          .button-hover-animation:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(255, 255, 255, 0.4);
          }

          @media (max-width: 768px) {
            section > div > div {
              padding: 0 1rem;
            }
          }
        `}</style>
      </section>

      {/* Mission */}
      <section style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="about-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <AnimateOnScroll animation="slideRight">
              <div style={{ position: 'relative', paddingBottom: '2rem' }}>
                <div className="img-zoom-wrap" style={{ borderRadius: '1rem', overflow: 'hidden', position: 'relative', aspectRatio: '4/3', boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}>
                  <Image src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=80" alt="Students in classroom" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                </div>
                <div className="badge-float" style={{ position: 'absolute', bottom: 0, left: 0, background: '#1e40af', borderRadius: '0.75rem', padding: '1rem 1.25rem', boxShadow: '0 8px 24px rgba(30,64,175,0.4)' }}>
                  <div style={{ color: '#fff', fontWeight: 900, fontSize: '1.5rem', lineHeight: 1 }}>10+</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', marginTop: '0.2rem' }}>Years of Excellence</div>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="slideLeft">
              <div>
                <h2 className="section-heading left-heading" style={{ textAlign: 'left' }}>Our <span style={{ color: '#1e40af' }}>Mission</span></h2>
                <p style={{ color: '#6b7280', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.9rem' }}>
                  CDRC is a leading education consultancy based in Kanhangad, Kerala, dedicated to making quality higher education accessible to all. We partner with 14+ UGC-approved, NAAC-accredited universities to offer 500+ online degree and diploma programs.
                </p>
                <p style={{ color: '#6b7280', lineHeight: 1.8, marginBottom: '1.75rem', fontSize: '0.9rem' }}>
                  Our online degrees are fully equivalent to traditional degrees and are valid for government jobs, higher studies, and private sector employment across India and internationally. 73% of our graduates report career advancement within 2 years.
                </p>
                <Link href="/universities" className="btn-animated" style={{ background: '#1e40af', color: '#fff', padding: '0.75rem 1.75rem', borderRadius: 50, fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem', display: 'inline-block' }}>
                  Explore Universities
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .about-grid-layout { grid-template-columns: 1fr !important; gap: 3rem !important; }
          }
        `}</style>
      </section>

      {/* Highlights */}
      <section style={{ padding: '5rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeDown">
            <h2 className="section-heading">What Makes Us <span style={{ color: '#1e40af' }}>Different</span></h2>
          </AnimateOnScroll>
          <div className="stagger-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {highlights.map((h, i) => (
              <AnimateOnScroll key={i} animation="rotateIn" delay={i * 80}>
                <div className="feature-card" style={{ height: '100%' }}>
                  <div style={{ marginBottom: '1rem', color: '#1e40af' }}>{h.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.6rem', color: '#1f2937' }}>{h.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.7 }}>{h.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Info box */}
      <section style={{ padding: '4rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ 
              background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
              padding: '3rem 2.5rem',
              borderRadius: '1.25rem',
              boxShadow: '0 20px 60px rgba(30, 64, 175, 0.25)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative elements with animation */}
              <div className="float-animation" style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                filter: 'blur(40px)'
              }} />
              <div className="float-animation-reverse" style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '150px',
                height: '150px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '50%',
                filter: 'blur(30px)'
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <div className="bounce-animation" style={{
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    border: '2px solid rgba(255,255,255,0.2)',
                    flexShrink: 0
                  }}>
                    🎓
                  </div>
                  <h3 style={{ 
                    color: '#fff', 
                    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', 
                    fontWeight: 800,
                    margin: 0,
                    letterSpacing: '-0.01em'
                  }}>
                    UGC Recognized Online Education
                  </h3>
                </div>
                
                <p style={{ 
                  color: 'rgba(255,255,255,0.95)', 
                  lineHeight: 1.8, 
                  fontSize: '1rem',
                  marginBottom: '2rem'
                }}>
                  All programs offered through CDRC are approved by the University Grants Commission (UGC) and are fully equivalent to traditional on-campus degrees. These degrees are accepted for government job applications (UPSC, SSC, Banking), higher studies (Masters, PhD), and private sector employment across India and internationally through WES evaluation.
                </p>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem'
                }}>
                  {[
                    { icon: '✓', text: 'UGC-DEB Approved' },
                    { icon: '✓', text: 'NAAC Accredited' },
                    { icon: '✓', text: 'WES Evaluation Available' },
                    { icon: '✓', text: 'Valid for Govt. Jobs' }
                  ].map((item, i) => (
                    <AnimateOnScroll key={i} animation="fadeUp" delay={i * 100}>
                      <div className="ugc-feature-card" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        padding: '1rem 1.25rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(255,255,255,0.2)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}>
                        <span className="pulse-animation" style={{
                          width: '28px',
                          height: '28px',
                          background: 'rgba(255,255,255,0.2)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontWeight: 900,
                          fontSize: '1rem',
                          flexShrink: 0,
                          animationDelay: `${i * 0.2}s`
                        }}>
                          {item.icon}
                        </span>
                        <span style={{
                          color: '#fff',
                          fontSize: '0.9rem',
                          fontWeight: 600
                        }}>
                          {item.text}
                        </span>
                      </div>
                    </AnimateOnScroll>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
