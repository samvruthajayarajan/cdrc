import Link from 'next/link';
import Image from 'next/image';
import Marquee from '@/components/Marquee';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import UniversityCard from '@/components/UniversityCard';
import { GraduationCap, Monitor, Building, DollarSign, Phone, Award, Clock, BookOpen, TrendingUp } from '@/components/Icon';

const features = [
  { icon: <GraduationCap size={28} />, title: 'UGC Approved Programs', desc: 'All programs are UGC-DEB approved and equivalent to regular degrees, valid for government jobs and higher studies.' },
  { icon: <Monitor size={28} />, title: 'Flexible Learning', desc: 'Study anywhere, anytime on any device. No fixed class schedules — learn at your own pace.' },
  { icon: <Building size={28} />, title: '14+ Partner Universities', desc: 'Choose from top NAAC-accredited universities including Amity, Manipal, GLA, Jain, and more.' },
  { icon: <DollarSign size={28} />, title: 'Affordable Fees', desc: 'Programs starting from ₹10,000. EMI options and scholarships available for eligible students.' },
  { icon: <Phone size={28} />, title: 'Expert Guidance', desc: 'Our counselors help you choose the right program and university based on your career goals.' },
  { icon: <Award size={28} />, title: 'Proven Results', desc: '73% of graduates report career advancement within 2 years of completing their online degree.' },
];

const stats = [
  { value: '10,000+', label: 'Students Enrolled' },
  { value: '14+', label: 'Partner Universities' },
  { value: '500+', label: 'Programs Available' },
  { value: '10+', label: 'Years of Excellence' },
];

const advantages = [
  { icon: <Clock size={28} />, title: 'Flexibility and Convenience', desc: 'Study at your own pace, anytime, anywhere, and balance your studies with your work and personal life.' },
  { icon: <DollarSign size={28} />, title: 'Cost Effectiveness', desc: 'Online programs can be more affordable compared to traditional on-campus programs.' },
  { icon: <BookOpen size={28} />, title: 'Wide Range of Programs', desc: 'Choose from a variety of undergraduate and postgraduate degree programs across diverse fields.' },
  { icon: <Monitor size={28} />, title: 'Online Exam', desc: 'You can choose your space to write the exam. No worry about centre, travel, or location. Take your gadgets and attend the exam.' },
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80" alt="Students" fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,16,40,0.96) 0%, rgba(10,16,40,0.85) 50%, rgba(10,16,40,0.5) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '10rem 2rem 7rem' }}>
          <div style={{ maxWidth: 600 }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Shaping Bright Futures
            </h1>
            <p className="hero-subtitle" style={{ color: '#cbd5e1', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: 520 }}>
              Study anywhere, anytime, and on any device. Access to education through Secondary, Senior secondary, Graduation, and Post-Graduation programs online.
            </p>
            <div className="hero-buttons" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <Link href="/universities" className="btn-animated" style={{ background: '#1e40af', color: '#fff', padding: '0.75rem 1.75rem', borderRadius: 50, fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem', display: 'inline-block' }}>
                Explore Universities
              </Link>
              <Link href="/contact" style={{ background: 'transparent', color: '#fff', padding: '0.75rem 1.75rem', borderRadius: 50, fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem', border: '2px solid rgba(255,255,255,0.5)', display: 'inline-block', transition: 'all 0.3s' }}>
                Contact Us
              </Link>
            </div>
            <div className="hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              {stats.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 'clamp(1.4rem, 3vw, 1.75rem)', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.3rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <Marquee />

      {/* ── Why Choose CDRC ── */}
      <section style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <h2 className="section-heading">Why Choose <span style={{ color: '#1e40af' }}>CDRC?</span></h2>
          </AnimateOnScroll>
          <div className="stagger-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {features.map((f, i) => (
              <AnimateOnScroll key={i} animation={i % 2 === 0 ? 'fadeLeft' : 'fadeRight'} delay={i * 80}>
                <div className="feature-card" style={{ height: '100%' }}>
                  <div style={{ marginBottom: '1rem', color: '#1e40af' }}>{f.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.6rem', color: '#1f2937' }}>{f.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .stagger-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .stagger-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── About teaser ── */}
      <section style={{ padding: '5rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="about-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            {/* Image */}
            <AnimateOnScroll animation="slideRight">
              <div style={{ position: 'relative', paddingBottom: '2rem' }}>
                <div className="img-zoom-wrap" style={{ borderRadius: '1rem', overflow: 'hidden', position: 'relative', aspectRatio: '4/3', boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}>
                  <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80" alt="Students collaborating" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                </div>
                <div className="badge-float" style={{ position: 'absolute', bottom: 0, right: 0, background: '#1e40af', borderRadius: '0.75rem', padding: '1rem 1.25rem', boxShadow: '0 8px 24px rgba(30,64,175,0.4)' }}>
                  <div style={{ color: '#fff', fontWeight: 900, fontSize: '1.5rem', lineHeight: 1 }}>73%</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', marginTop: '0.2rem' }}>Career Growth</div>
                </div>
              </div>
            </AnimateOnScroll>
            {/* Text */}
            <AnimateOnScroll animation="slideLeft">
              <div>
                <h2 className="section-heading left-heading" style={{ textAlign: 'left' }}>About <span style={{ color: '#1e40af' }}>CDRC</span></h2>
                <p style={{ color: '#6b7280', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.9rem' }}>
                  CDRC is a leading education consultancy based in Kanhangad, Kerala, dedicated to making quality higher education accessible to all. We partner with 14+ UGC-approved, NAAC-accredited universities to offer 500+ online degree and diploma programs.
                </p>
                <p style={{ color: '#6b7280', lineHeight: 1.8, marginBottom: '1.75rem', fontSize: '0.9rem' }}>
                  Our online degrees are fully equivalent to traditional degrees and are valid for government jobs, higher studies, and private sector employment across India and internationally.
                </p>
                <Link href="/about" className="btn-animated" style={{ background: '#1e40af', color: '#fff', padding: '0.75rem 1.75rem', borderRadius: 50, fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem', display: 'inline-block' }}>
                  Learn More
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

      {/* ── Advantages ── */}
      <section style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <h2 className="section-heading">Advantages Of Online Degree Programs</h2>
          </AnimateOnScroll>
          <div className="stagger-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {advantages.map((a, i) => (
              <AnimateOnScroll key={i} animation="zoomIn" delay={i * 80}>
                <div className="feature-card" style={{ height: '100%' }}>
                  <div style={{ marginBottom: '1rem', color: '#1e40af' }}>{a.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.6rem', color: '#1f2937' }}>{a.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.7 }}>{a.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: 'relative', padding: '5rem 2rem 6rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80" alt="Campus" fill sizes="100vw" style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,16,40,0.88)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
            Ready to Shape Your Future?
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            Join 10,000+ students who have transformed their careers through CDRC&apos;s online education programs.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/universities" style={{ background: '#fff', color: '#1e40af', padding: '0.75rem 2rem', borderRadius: 50, fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem', display: 'inline-block' }}>
              Explore Universities
            </Link>
            <Link href="/contact" style={{ background: 'transparent', color: '#fff', padding: '0.75rem 2rem', borderRadius: 50, fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem', border: '2px solid rgba(255,255,255,0.5)', display: 'inline-block' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
