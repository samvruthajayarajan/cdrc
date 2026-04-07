'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import EnrollmentModal from '@/components/EnrollmentModal';
import { BookOpen, Clock, Search, GraduationCap } from '@/components/Icon';

interface Program {
  _id?: string;
  name: string;
  duration: string;
  university: string;
  description?: string;
}

const CATEGORIES = ['All', 'MBA', 'MCA', 'BBA', 'BCA', 'B.Com / M.Com', 'BA / MA', 'Other'];

function getCategory(name: string): string {
  const n = name.toUpperCase();
  if (n.includes('MBA')) return 'MBA';
  if (n.includes('MCA')) return 'MCA';
  if (n.includes('BBA')) return 'BBA';
  if (n.includes('BCA')) return 'BCA';
  if (n.includes('BCOM') || n.includes('B COM') || n.includes('MCOM') || n.includes('M COM')) return 'B.Com / M.Com';
  if (n.startsWith('BA') || n.startsWith('MA ') || n.includes('BACHELOR OF ARTS') || n.includes('MASTER OF ARTS')) return 'BA / MA';
  return 'Other';
}

const GRAD_COLORS = [
  ['#1e40af', '#3b82f6'],
  ['#7c3aed', '#a78bfa'],
  ['#0f766e', '#2dd4bf'],
  ['#b45309', '#fbbf24'],
  ['#be185d', '#f472b6'],
  ['#1d4ed8', '#60a5fa'],
  ['#065f46', '#34d399'],
  ['#9f1239', '#fb7185'],
];

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ university: string; program: string } | null>(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/api/programs').then(r => r.json()).then(d => {
      if (d.success) setPrograms(d.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = programs.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.university?.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || getCategory(p.name) === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', height: 420, overflow: 'hidden',
        backgroundImage: 'url(https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        backgroundSize: 'cover', backgroundPosition: 'center 40%',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,15,40,0.65) 0%, rgba(10,15,40,0.8) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem', paddingTop: 80, textAlign: 'center', zIndex: 1 }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 50, padding: '5px 16px', color: '#fff', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              500+ Programs Available
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Explore Online Programs
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto 2rem', lineHeight: 1.7 }}>
              UGC-DEB approved degrees from India&apos;s top universities. Study at your own pace.
            </p>
            <div style={{ position: 'relative', maxWidth: 480, width: '100%', margin: '0 auto' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none', zIndex: 2 }} />
              <input
                type="text"
                placeholder="Search programs or universities..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '0.9rem 1.25rem 0.9rem 2.75rem', borderRadius: 50, border: 'none', fontSize: '0.92rem', outline: 'none', color: '#0f172a', background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', boxSizing: 'border-box' }}
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div style={{ background: '#1e40af', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          {[['500+', 'Programs'], ['14+', 'Universities'], ['UGC-DEB', 'Approved'], ['Online', 'Mode']].map(([val, lbl]) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORY FILTER ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0.875rem 2rem', position: 'sticky', top: 56, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '6px 16px', borderRadius: 50, border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: '0.82rem', whiteSpace: 'nowrap', transition: 'all 0.2s', fontFamily: 'inherit',
              background: activeCategory === cat ? '#1e40af' : '#f1f5f9',
              color: activeCategory === cat ? '#fff' : '#475569',
            }}>
              {cat}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '0.82rem', color: '#94a3b8', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {filtered.length} programs
          </span>
        </div>
      </div>

      {/* ── GRID ── */}
      <section style={{ padding: '2rem 2rem 5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem' }}>
              <div style={{ display: 'inline-block', width: 40, height: 40, border: '4px solid #e2e8f0', borderTop: '4px solid #1e40af', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
              <p style={{ color: '#64748b' }}>No programs found.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
              {filtered.map((p, i) => {
                const cardId = p._id || `prog-${i}`;
                const [c1, c2] = GRAD_COLORS[i % GRAD_COLORS.length];
                const isUG = ['BA', 'BBA', 'BCA', 'BCOM', 'B COM', 'BSC'].some(x => p.name.toUpperCase().startsWith(x));
                return (
                  <AnimateOnScroll key={cardId} animation="fadeUp" delay={(i % 9) * 40}>
                    <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.25s', display: 'flex', flexDirection: 'column' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = '0 16px 40px rgba(30,64,175,0.13)'; el.style.borderColor = '#93c5fd'; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; el.style.borderColor = '#e2e8f0'; }}
                    >
                      {/* Gradient header */}
                      <div style={{ height: 80, background: `linear-gradient(135deg, ${c1}, ${c2})`, display: 'flex', alignItems: 'center', padding: '0 1.25rem', gap: '0.875rem', position: 'relative' }}>
                        <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <BookOpen size={20} color="#fff" />
                        </div>
                        <span style={{ background: isUG ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.62rem', fontWeight: 800, padding: '3px 9px', borderRadius: 50, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                          {isUG ? 'UG' : 'PG'}
                        </span>
                      </div>

                      {/* Body */}
                      <div style={{ padding: '1.1rem 1.25rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.35, marginBottom: '0.5rem', flex: 1 }}>{p.name}</h3>

                        <div style={{ display: 'flex', gap: '0.875rem', marginBottom: '0.875rem' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#64748b' }}>
                            <Clock size={11} color="#94a3b8" /> {p.duration}
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#64748b' }}>
                            <GraduationCap size={11} color="#94a3b8" /> Online
                          </span>
                        </div>

                        {p.university && (
                          <div style={{ fontSize: '0.73rem', color: '#94a3b8', marginBottom: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {p.university}
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.875rem', borderTop: '1px solid #f1f5f9' }}>
                          <Link href={`/programs/${cardId}`}
                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.6rem', border: '1.5px solid #1e40af', borderRadius: 8, color: '#1e40af', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none', transition: 'all 0.2s', background: '#fff' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#eff6ff'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#fff'; }}
                          >
                            Details
                          </Link>
                          <button onClick={() => setModal({ university: p.university || 'CDRC', program: p.name })}
                            style={{ flex: 1, padding: '0.6rem', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', transition: 'background 0.2s', fontFamily: 'inherit' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1e3a8a'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1e40af'; }}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '3.5rem 2rem' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              Not sure which program to choose?
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              Our counsellors provide free guidance to help you pick the right program for your career goals.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { const btn = document.querySelector('.cf-floating-btn') as HTMLButtonElement; if (btn) btn.click(); }}
                style={{ padding: '0.8rem 2rem', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                Find My Course
              </button>
              <Link href="/contact" style={{ padding: '0.8rem 2rem', background: '#fff', color: '#374151', border: '1px solid #e2e8f0', borderRadius: 8, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                Talk to Counsellor
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {modal && <EnrollmentModal university={modal.university} program={modal.program} onClose={() => setModal(null)} />}
    </div>
  );
}
