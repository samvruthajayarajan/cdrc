'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Search, MapPin, GraduationCap } from '@/components/Icon';

interface University {
  name: string;
  slug: string;
  naac?: string;
  location?: string;
  programs: Array<{ name: string; duration: string }>;
  image?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapUni = (u: any): University => ({
  name: u.name,
  slug: u.slug || u.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  naac: u.naac || u.ranking || u.accreditation,
  location: u.location || 'India',
  programs: u.programs || [],
  image: u.image?.startsWith('http') ? u.image : undefined,
});

const UNI_IMAGES = [
  'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/universities').then(r => r.json()).then(d => {
      if (d.success && d.data?.length) setUniversities(d.data.map(mapUni));
      else setUniversities([]);
    }).catch(() => setUniversities([])).finally(() => setLoading(false));
  }, []);

  const filtered = universities.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        height: 420,
        overflow: 'hidden',
        backgroundImage: 'url(https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,15,40,0.6) 0%, rgba(10,15,40,0.75) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem', paddingTop: 80, textAlign: 'center', zIndex: 1 }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 50, padding: '5px 16px', color: '#fff', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              14+ Partner Universities
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Find Your Dream University
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto 2rem', lineHeight: 1.7 }}>
              UGC-approved online degrees from India&apos;s top NAAC-accredited institutions.
            </p>
            <div style={{ position: 'relative', maxWidth: 480, width: '100%', margin: '0 auto' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none', zIndex: 2 }} />
              <input
                type="text"
                placeholder="Search universities or locations..."
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
          {[['14+', 'Universities'], ['500+', 'Programs'], ['UGC-DEB', 'Approved'], ['NAAC', 'Accredited']].map(([val, lbl]) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RESULTS COUNT ── */}
      <div style={{ padding: '1.5rem 2rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            Showing <strong style={{ color: '#0f172a' }}>{filtered.length}</strong> universities
            {search && <> for &quot;<strong style={{ color: '#1e40af' }}>{search}</strong>&quot;</>}
          </p>
        </div>
      </div>

      {/* ── GRID ── */}
      <section style={{ padding: '1.5rem 2rem 5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem' }}>
              <div style={{ display: 'inline-block', width: 40, height: 40, border: '4px solid #e2e8f0', borderTop: '4px solid #1e40af', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏛️</div>
              <p style={{ color: '#64748b' }}>No universities found.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {filtered.map((uni, i) => {
                const imgSrc = uni.image || UNI_IMAGES[i % UNI_IMAGES.length];
                return (
                  <AnimateOnScroll key={i} animation="fadeUp" delay={(i % 6) * 60}>
                    <Link href={`/universities/${uni.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                      <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0', background: '#fff', transition: 'all 0.25s', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = '0 20px 48px rgba(30,64,175,0.15)'; el.style.borderColor = '#93c5fd'; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; el.style.borderColor = '#e2e8f0'; }}
                      >
                        {/* Image */}
                        <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imgSrc} alt={uni.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                          />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)' }} />
                          {uni.naac && (
                            <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.95)', color: '#1e40af', fontSize: '0.65rem', fontWeight: 800, padding: '4px 10px', borderRadius: 6, letterSpacing: '0.04em' }}>
                              {uni.naac}
                            </div>
                          )}
                          <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
                            <div style={{ display: 'inline-block', background: '#1e40af', color: '#fff', fontSize: '0.6rem', fontWeight: 800, padding: '3px 9px', borderRadius: 4, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>
                              UGC Approved
                            </div>
                          </div>
                        </div>

                        {/* Body */}
                        <div style={{ padding: '1.25rem' }}>
                          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.35, marginBottom: '0.4rem' }}>{uni.name}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: '1rem' }}>
                            <MapPin size={12} color="#94a3b8" />
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{uni.location}</span>
                          </div>

                          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.1rem', flexWrap: 'wrap' }}>
                            {[`${uni.programs.length}+ Programs`, 'Online Mode', 'UG & PG'].map((tag, j) => (
                              <span key={j} style={{ padding: '3px 10px', background: '#f1f5f9', color: '#475569', borderRadius: 50, fontSize: '0.72rem', fontWeight: 600 }}>{tag}</span>
                            ))}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.875rem', borderTop: '1px solid #f1f5f9' }}>
                            <span style={{ fontSize: '0.8rem', color: '#1e40af', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <GraduationCap size={14} color="#1e40af" /> Explore Programs
                            </span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                          </div>
                        </div>
                      </div>
                    </Link>
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
              Not sure which university to pick?
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              Our counsellors provide free, personalised guidance to help you choose the right university and program.
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
    </div>
  );
}
