'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Board } from '@/lib/data';
import EnrollmentModal from '@/components/EnrollmentModal';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Search, BookOpen } from '@/components/Icon';

const RB = '#4169e1';
const RBD = '#2a4db5';
const RBL = '#e8eef9';

export default function OpenSchoolPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ university: string; program: string } | null>(null);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/open-school').then(r => r.json()).then(data => {
      setBoards(Array.isArray(data) ? data : []);
      setLoading(false);
    }).catch(() => { setBoards([]); setLoading(false); });
  }, []);

  const toggle = (key: string) => setExpanded(prev => {
    const s = new Set(prev); s.has(key) ? s.delete(key) : s.add(key); return s;
  });

  const filtered = boards.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ background: '#f0f4ff', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', height: 380, overflow: 'hidden',
        backgroundImage: 'url(/open-school-hero.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center 40%',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,15,40,0.55)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '3.5rem', paddingLeft: '2rem', paddingRight: '2rem', textAlign: 'center', zIndex: 2 }}>
          <AnimateOnScroll animation="fadeUp">
            <span style={{ display: 'inline-block', color: '#90caf9', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
              Open School
            </span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: '1.5rem', lineHeight: 1.15 }}>
              We&apos;ll help you complete<br />your Class 10 &amp; 12
            </h1>
            <div style={{ position: 'relative', maxWidth: 480, width: '100%', margin: '0 auto' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none', zIndex: 2 }} />
              <input
                type="text"
                placeholder="Search boards..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '0.9rem 1.25rem 0.9rem 2.75rem', borderRadius: 50, border: 'none', fontSize: '0.92rem', outline: 'none', color: '#0f172a', boxSizing: 'border-box', background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a' }}>
            Showing <strong>{filtered.length}</strong> out of <strong>{boards.length}</strong> Boards Available
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.6rem 1.25rem', background: '#4169e1', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
              ⚙ Filter
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: '#64748b' }}>
              <span>Sort by:</span>
              <select style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '0.4rem 0.75rem', fontSize: '0.85rem', color: '#0f172a', outline: 'none', cursor: 'pointer' }}>
                <option>Most Popular</option>
                <option>Name A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── CARDS ── */}
      <section style={{ padding: '2.5rem 2rem 4rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem' }}>
              <div style={{ display: 'inline-block', width: 40, height: 40, border: `4px solid #e2e8f0`, borderTop: `4px solid ${RB}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: 16 }}>
              <p style={{ color: '#64748b' }}>No boards found.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {filtered.map((board, i) => (
                <AnimateOnScroll key={i} animation="fadeUp" delay={i * 50} style={{ height: '100%' }}>
                  <div
                    style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', transition: 'all 0.25s', display: 'flex', flexDirection: 'column', height: '100%' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 12px 32px rgba(65,105,225,0.14)'; el.style.borderColor = '#bfdbfe'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)'; el.style.borderColor = '#e2e8f0'; }}
                  >
                    {/* Header bar */}
                    <div style={{ height: 8, background: `linear-gradient(90deg, ${RB}, ${RBD})` }} />

                    {/* Card body */}
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Title row */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ width: 48, height: 48, background: RBL, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <BookOpen size={22} color={RB} />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3, marginBottom: '0.25rem' }}>{board.name}</h3>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <span style={{ background: RBL, color: RB, fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 50 }}>Govt. Approved</span>
                            <span style={{ background: '#f0fdf4', color: '#15803d', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 50 }}>{board.programs?.length || 0} Programs</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      {board.description && (
                        <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.65, marginBottom: '1rem' }}>{board.description}</p>
                      )}

                      {/* Stats row */}
                      <div style={{ display: 'flex', gap: '1.5rem', padding: '0.875rem 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', marginBottom: '1rem' }}>
                        {[
                          { label: 'Type', value: 'Open School' },
                          { label: 'Mode', value: 'Flexible' },
                          { label: 'Recognition', value: 'National' },
                        ].map((s, j) => (
                          <div key={j}>
                            <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{s.label}</div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{s.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Program list */}
                      <div style={{ flex: 1, marginBottom: '1rem' }}>
                        {board.programs?.slice(0, expanded.has(`board-${i}`) ? undefined : 2).map((p, j) => (
                          <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.4rem 0', borderBottom: j < (expanded.has(`board-${i}`) ? board.programs.length - 1 : 1) ? '1px solid #f8fafc' : 'none' }}>
                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: RB, flexShrink: 0 }} />
                            <span style={{ fontSize: '0.8rem', color: '#374151', fontWeight: 500 }}>{p.name}</span>
                          </div>
                        ))}
                        {(board.programs?.length || 0) > 2 && (
                          <button onClick={() => toggle(`board-${i}`)} style={{ background: 'none', border: 'none', color: RB, fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', padding: '6px 0 0', display: 'block', fontFamily: 'inherit' }}>
                            {expanded.has(`board-${i}`) ? 'See Less ↑' : `+${(board.programs?.length || 0) - 2} more programs ↓`}
                          </button>
                        )}
                      </div>

                      {/* Enroll button */}
                      <button
                        onClick={() => setModal({ university: board.name, program: 'Open School Programs' })}
                        style={{ width: '100%', padding: '0.7rem', background: RB, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'background 0.2s', fontFamily: 'inherit', marginTop: 'auto' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = RBD; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = RB; }}
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '0 2rem 4rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ background: `linear-gradient(135deg, ${RB}, ${RBD})`, borderRadius: 14, padding: '1.75rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', top: '-60px', right: '-60px', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Talk to Experts</div>
                <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: 800, color: '#fff' }}>Not sure which board to choose?</h3>
              </div>
              <Link href="/contact" style={{ padding: '0.75rem 1.75rem', background: '#90caf9', color: RBD, borderRadius: 8, fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                Consult Now
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {modal && <EnrollmentModal university={modal.university} program={modal.program} onClose={() => setModal(null)} />}
    </div>
  );
}
