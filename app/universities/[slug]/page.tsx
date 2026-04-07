'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Award, BookOpen, GraduationCap, CheckCircle, Clock } from '@/components/Icon';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import EnrollmentModal from '@/components/EnrollmentModal';

// Royal blue palette
const RB = '#4169e1';
const RBD = '#2a4db5';
const RBL = '#e8eef9';

interface University {
  _id?: string;
  name: string;
  slug: string;
  location: string;
  naac: string;
  image?: string;
  description: string;
  facilities: string[];
  ranking?: string;
  programs: Array<{ name: string; duration: string; description?: string }>;
}

function ProgramCard({ program, onEnroll }: {
  program: { name: string; duration: string; description?: string };
  onEnroll: (name: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const desc = program.description || '';
  const words = desc.split(' ');
  const isLong = words.length > 25;
  const preview = isLong && !expanded ? words.slice(0, 25).join(' ') + '...' : desc;

  return (
    <div style={{ background: '#fff', borderRadius: '0.875rem', border: '1px solid #e2e8f0', padding: '1.25rem', display: 'flex', flexDirection: 'column', transition: 'all 0.2s', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = RB; el.style.boxShadow = `0 6px 20px rgba(65,105,225,0.12)`; el.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = '#e2e8f0'; el.style.boxShadow = '0 1px 6px rgba(0,0,0,0.05)'; el.style.transform = 'translateY(0)'; }}
    >
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
        <div style={{ width: 38, height: 38, borderRadius: '0.625rem', background: RBL, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <BookOpen size={18} color={RB} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.35, marginBottom: '0.2rem' }}>{program.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={11} color="#94a3b8" />
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>{program.duration}</span>
          </div>
        </div>
      </div>
      {desc && (
        <div style={{ flex: 1, marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>{preview}</p>
          {isLong && (
            <button onClick={() => setExpanded(!expanded)} style={{ background: 'none', border: 'none', color: RB, fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', padding: '3px 0 0', display: 'block' }}>
              {expanded ? 'See Less ↑' : 'See More ↓'}
            </button>
          )}
        </div>
      )}
      <button onClick={() => onEnroll(program.name)}
        style={{ width: '100%', padding: '0.6rem', background: RB, color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', marginTop: 'auto', transition: 'background 0.2s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = RBD; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = RB; }}
      >Enroll Now</button>
    </div>
  );
}

export default function UniversityDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resolve = (uni: any): University => ({
      ...uni,
      location: uni.location || 'India',
      naac: uni.naac || uni.ranking || uni.accreditation || 'UGC Approved',
      description: uni.description || `${uni.name} is a UGC-approved university offering quality online degree programs.`,
      facilities: uni.facilities?.length ? uni.facilities : ['Online Learning Platform', 'Digital Library', 'Student Support', 'Live Classes', 'Career Guidance'],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const match = (uni: any) => uni.slug === slug || uni.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug;

    fetch('/api/universities').then(r => r.json()).then(d => {
      if (d.success && d.data?.length) {
        const found = d.data.find(match);
        if (found) setUniversity(resolve(found)); else setError('not found');
      } else setError('not found');
      setLoading(false);
    }).catch(() => { setError('error'); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, border: `4px solid #e2e8f0`, borderTop: `4px solid ${RB}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  if (error || !university) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>University Not Found</h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          {error === 'error' ? 'Something went wrong. Please try again.' : `No university found for "${slug}".`}
        </p>
        <Link href="/universities" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0.75rem 1.5rem', background: RB, color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Universities
        </Link>
      </div>
    </div>
  );

  const handleEnroll = (p: string) => { setSelectedProgram(p); setIsEnrollmentOpen(true); };
  const hasImage = university.image?.startsWith('http');

  return (
    <div className="page-enter" style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── HERO — full-width image, light overlay ── */}
      <section className="uni-banner" style={{
        position: 'relative', height: 420, overflow: 'hidden',
        background: hasImage
          ? `url(${university.image}) center/cover`
          : `linear-gradient(135deg, ${RB} 0%, ${RBD} 100%)`,
      }}>
        {/* light overlay — just enough for text readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.38)' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'calc(80px + 1rem) 2rem 2.5rem', maxWidth: 1200, margin: '0 auto', width: '100%', left: 0, right: 0 }}>
          <AnimateOnScroll animation="fadeUp">
            <Link href="/universities" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, marginBottom: '1rem' }}>
              <ArrowLeft size={15} /> Back to Universities
            </Link>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeUp" delay={80}>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              {university.name}
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeUp" delay={160}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {[
                { icon: <MapPin size={13} color="#fff" />, text: university.location },
                { icon: <Award size={13} color="#fff" />, text: university.naac },
                { icon: <GraduationCap size={13} color="#fff" />, text: `${university.programs.length}+ Programs` },
              ].map((b, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 50, padding: '5px 12px', color: '#fff', fontSize: '0.78rem', fontWeight: 600 }}>
                  {b.icon} {b.text}
                </span>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 2rem 4rem' }}>

        {/* About */}
        <AnimateOnScroll animation="fadeUp">
          <div style={{ background: '#fff', borderRadius: '1.25rem', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 28, height: 28, background: RBL, borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={15} color={RB} />
              </span>
              About the University
            </h2>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.85, color: '#475569' }}>{university.description}</p>
            {university.ranking && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: '1rem', padding: '5px 12px', background: RBL, borderRadius: 50, color: RB, fontWeight: 700, fontSize: '0.78rem' }}>
                <Award size={13} color={RB} /> {university.ranking}
              </span>
            )}
          </div>
        </AnimateOnScroll>

        {/* Facilities */}
        {university.facilities?.length > 0 && (
          <AnimateOnScroll animation="fadeUp" delay={80}>
            <div style={{ background: '#fff', borderRadius: '1.25rem', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, background: RBL, borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={15} color={RB} />
                </span>
                Facilities &amp; Features
              </h2>
              <div className="facilities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.6rem' }}>
                {university.facilities.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.6rem 0.875rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <CheckCircle size={13} color={RB} />
                    <span style={{ fontSize: '0.83rem', color: '#475569', fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        )}

        {/* Programs */}
        {university.programs?.length > 0 && (
          <AnimateOnScroll animation="fadeUp" delay={160}>
            <div style={{ background: '#fff', borderRadius: '1.25rem', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 28, height: 28, background: RBL, borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GraduationCap size={15} color={RB} />
                  </span>
                  Programs Offered
                </h2>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: RB, background: RBL, borderRadius: 50, padding: '3px 12px' }}>{university.programs.length} Programs</span>
              </div>
              <div className="programs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {university.programs.map((program, index) => (
                  <ProgramCard key={index} program={program} onEnroll={handleEnroll} />
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        )}

        {/* CTA */}
        <AnimateOnScroll animation="fadeUp" delay={200}>
          <div style={{ marginTop: '1.5rem', background: `linear-gradient(135deg, ${RB}, ${RBD})`, borderRadius: '1.25rem', padding: '2rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.3rem' }}>Need help choosing a program?</h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.85rem' }}>Our counsellors are here to guide you.</p>
            </div>
            <Link href="/contact" style={{ padding: '0.8rem 1.75rem', background: '#fff', color: RB, borderRadius: 8, fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none', flexShrink: 0 }}>
              Talk to Counsellor →
            </Link>
          </div>
        </AnimateOnScroll>
      </div>

      {isEnrollmentOpen && (
        <EnrollmentModal onClose={() => setIsEnrollmentOpen(false)} university={university.name} program={selectedProgram} />
      )}
    </div>
  );
}
