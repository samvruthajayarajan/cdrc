'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Search, GraduationCap, Award } from '@/components/Icon';

interface University {
  name: string; slug: string; accreditation: string;
  naac?: string; programs: Array<{ name: string; duration: string }>; image?: string;
}

const ACCENT = '#4361EE';
const COLORS = ['#4361EE','#7c3aed','#0891b2','#059669','#dc2626','#d97706','#2563eb','#9333ea'];

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/universities').then(r => r.json()).then(d => {
      if (d.success) setUniversities(d.data.map((u: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
        name: u.name,
        slug: u.slug || u.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''),
        accreditation: u.naac || u.accreditation,
        programs: u.programs || [],
        image: u.image?.startsWith('http') ? u.image : undefined,
      })));
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = universities.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(135deg, #1e2fa8 0%, ${ACCENT} 55%, #7b93ff 100%)`, padding: 'calc(68px + 4rem) 2rem 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', top: '-150px', right: '-150px', animation: 'float 9s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', bottom: '-80px', left: '5%', animation: 'float 11s ease-in-out infinite reverse' }} />
          <div style={{ position: 'absolute', width: 90, height: 90, borderRadius: '18px', background: 'rgba(255,255,255,0.08)', top: '25%', left: '8%', transform: 'rotate(25deg)', animation: 'float 6s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', top: '15%', right: '15%', animation: 'float 5s ease-in-out infinite reverse' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          {/* left */}
          <div style={{ flex: '1 1 460px' }}>
            <AnimateOnScroll animation="fadeUp">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 50, padding: '5px 14px', color: '#fff', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7effa0', display: 'inline-block' }} />
                India&apos;s Trusted University Network
              </span>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeUp" delay={80}>
              <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '1.1rem' }}>
                Explore Our<br /><span style={{ color: '#b8ccff' }}>Partner Universities</span>
              </h1>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeUp" delay={160}>
              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 480, marginBottom: '2rem' }}>
                15+ UGC-approved, NAAC-accredited universities offering world-class online degree programs across India.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeUp" delay={240}>
              <div style={{ position: 'relative', maxWidth: 460 }}>
                <Search size={17} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none', zIndex: 2 }} />
                <input type="text" placeholder="Search universities..." value={search} onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', padding: '0.9rem 1.2rem 0.9rem 2.8rem', fontSize: '0.93rem', border: 'none', borderRadius: 50, background: '#fff', outline: 'none', color: '#1e293b', boxSizing: 'border-box', boxShadow: '0 8px 30px rgba(0,0,0,0.18)' }} />
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeUp" delay={300}>
              <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                {['✓ UGC Approved','✓ NAAC Accredited','✓ WES Recognized'].map(t => (
                  <span key={t} style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.8rem', fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </AnimateOnScroll>
          </div>

          {/* right — 3 stat cards stacked */}
          <div style={{ flex: '0 1 280px', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {[
              { icon: <GraduationCap size={22} style={{ color: ACCENT }} />, value: '15+', label: 'Partner Universities' },
              { icon: <Award size={22} style={{ color: ACCENT }} />, value: '95%', label: 'Placement Rate' },
              { icon: <span style={{ fontSize: '1.2rem' }}>🎓</span>, value: '50K+', label: 'Students Enrolled' },
            ].map((s, i) => (
              <AnimateOnScroll key={i} animation="fadeUp" delay={i * 90 + 200}>
                <div style={{ background: 'rgba(255,255,255,0.13)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 16, padding: '1rem 1.4rem', display: 'flex', alignItems: 'center', gap: '0.9rem', animation: `floatBadge ${5 + i}s ease-in-out infinite ${i % 2 ? 'reverse' : ''}` }}>
                  <div style={{ width: 42, height: 42, borderRadius: 11, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.68)', marginTop: 2 }}>{s.label}</div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section style={{ padding: '3.5rem 2rem 6rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>{filtered.length} Universities</span>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Click a card to explore programs</span>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem' }}>
              <div style={{ display: 'inline-block', width: 42, height: 42, border: '4px solid #e2e8f0', borderTop: `4px solid ${ACCENT}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: 18 }}>
              <p style={{ color: '#64748b' }}>No universities found.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.4rem' }}>
              {filtered.map((uni, i) => {
                const color = COLORS[i % COLORS.length];
                const isHov = hovered === i;
                return (
                  <AnimateOnScroll key={i} animation="fadeUp" delay={i * 45}>
                    <Link href={`/universities/${uni.slug}`} style={{ textDecoration: 'none', display: 'block' }}
                      onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                      <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', border: `1.5px solid ${isHov ? color : '#e2e8f0'}`, boxShadow: isHov ? `0 12px 40px ${color}28` : '0 2px 10px rgba(0,0,0,0.06)', transform: isHov ? 'translateY(-5px)' : 'none', transition: 'all 0.28s ease', display: 'flex', flexDirection: 'column' }}>
                        {/* banner */}
                        <div style={{ height: 130, position: 'relative', background: `linear-gradient(135deg, ${color}ee, ${color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {uni.image
                            ? <Image src={uni.image} alt={uni.name} fill style={{ objectFit: 'cover' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                            : <span style={{ fontSize: '2.8rem', fontWeight: 900, color: 'rgba(255,255,255,0.28)' }}>{uni.name.charAt(0)}</span>
                          }
                          <span style={{ position: 'absolute', top: 10, right: 10, background: '#fff', borderRadius: 50, padding: '2px 9px', fontSize: '0.65rem', fontWeight: 800, color }}>NAAC ✓</span>
                        </div>
                        {/* body */}
                        <div style={{ padding: '1.1rem 1.3rem 1.3rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <h3 style={{ fontSize: '0.97rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem', lineHeight: 1.35 }}>{uni.name}</h3>
                          <p style={{ fontSize: '0.76rem', color: '#64748b', lineHeight: 1.6, marginBottom: '0.9rem', flex: 1 }}>{uni.accreditation}</p>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color, background: `${color}15`, padding: '3px 9px', borderRadius: 50 }}>{uni.programs?.length || 0}+ Programs</span>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isHov ? color : '#cbd5e1', transition: 'color 0.2s' }}>Explore →</span>
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
      <section style={{ padding: '5rem 2rem', background: `linear-gradient(135deg, #1e2fa8 0%, ${ACCENT} 100%)` }}>
        <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, color: '#fff', marginBottom: '0.9rem' }}>Ready to Start Your Journey?</h2>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.97rem', marginBottom: '2rem', lineHeight: 1.7 }}>Join thousands of students advancing their careers with CDRC.</p>
            <Link href="/contact" style={{ display: 'inline-block', padding: '0.9rem 2.4rem', background: '#fff', color: ACCENT, borderRadius: 50, fontWeight: 800, fontSize: '0.97rem', textDecoration: 'none', boxShadow: '0 8px 28px rgba(0,0,0,0.15)' }}>Get Started →</Link>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
