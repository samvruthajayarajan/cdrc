'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import EnrollmentModal from '@/components/EnrollmentModal';

interface Course { name: string; duration: string; description?: string; }
interface Skill {
  _id: string; name: string; description: string; category: string;
  duration: string; level: string; price: string; image?: string;
  courses: Course[]; slug: string;
}

const levelColor: Record<string, string> = {
  Beginner: '#16a34a', Intermediate: '#d97706', Advanced: '#dc2626',
};

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [enrollModal, setEnrollModal] = useState<{ open: boolean; skill: string; course: string }>({ open: false, skill: '', course: '' });

  useEffect(() => {
    fetch('/api/skills').then(r => r.json()).then(d => {
      if (d.success) setSkills(d.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];
  const filtered = skills.filter(s =>
    (activeCategory === 'All' || s.category === activeCategory) &&
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #4361EE 0%, #2d2d6b 100%)', paddingTop: 'calc(68px + 4rem)', paddingBottom: '5rem', paddingLeft: '2rem', paddingRight: '2rem', textAlign: 'center', color: '#fff' }}>
        <div>
          <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '4px 14px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem', border: '1px solid rgba(255,255,255,0.25)' }}>Skill Development</span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.15, color: '#fff' }}>Skill Courses by CDRC</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', maxWidth: 560, margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            Industry-relevant skill programs designed to boost your career with practical, hands-on learning.
          </p>
          <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>
            <svg style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" placeholder="Search skills..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '1rem 1.25rem 1rem 3rem', borderRadius: 50, border: 'none', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }} />
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section style={{ padding: '2rem 2rem 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingBottom: '1.5rem' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ padding: '8px 18px', borderRadius: 50, border: `1.5px solid ${activeCategory === cat ? '#4361EE' : '#e2e8f0'}`, background: activeCategory === cat ? '#4361EE' : '#fff', color: activeCategory === cat ? '#fff' : '#64748b', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Skills grid */}
      <section style={{ padding: '4rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>Loading skills...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
              <p>No skills found. Check back soon or contact us for more information.</p>
              <Link href="/contact" style={{ display: 'inline-block', marginTop: '1rem', background: '#4361EE', color: '#fff', padding: '10px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Contact Us</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
              {filtered.map((skill, i) => (
                <AnimateOnScroll key={skill._id} animation="fadeUp" delay={i * 60}>
                  <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(67,97,238,0.12)'; e.currentTarget.style.borderColor = '#4361EE'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>
                    {/* Banner */}
                    <div style={{
                      height: 140,
                      backgroundColor: '#4361EE',
                      backgroundImage: 'linear-gradient(135deg, #4361EE 0%, #2d2d6b 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                      flexShrink: 0,
                    }}>
                      {skill.image ? (
                        <img
                          src={skill.image}
                          alt={skill.name}
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <div style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.3)', letterSpacing: '-0.04em', position: 'relative', zIndex: 1 }}>{skill.name.charAt(0)}</div>
                      )}
                      <div style={{ position: 'absolute', top: 12, right: 12, background: levelColor[skill.level] || '#4361EE', color: '#fff', padding: '3px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 700 }}>{skill.level}</div>
                      <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '3px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 600, backdropFilter: 'blur(8px)' }}>{skill.category}</div>
                    </div>

                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', lineHeight: 1.3 }}>{skill.name}</h3>
                      <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1rem' }}>{skill.description}</p>

                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                        {skill.duration && <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748b', fontSize: '0.8rem' }}>⏱ {skill.duration}</span>}
                        {skill.price && <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748b', fontSize: '0.8rem' }}>₹ {skill.price}</span>}
                      </div>

                      {skill.courses && skill.courses.length > 0 && (
                        <div style={{ marginBottom: '1.25rem' }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Courses Included</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {skill.courses.slice(0, 3).map((c, ci) => (
                              <div key={ci} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#374151' }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4361EE', flexShrink: 0 }} />
                                {c.name} {c.duration && <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>({c.duration})</span>}
                              </div>
                            ))}
                            {skill.courses.length > 3 && <div style={{ fontSize: '0.8rem', color: '#4361EE', fontWeight: 600 }}>+{skill.courses.length - 3} more</div>}
                          </div>
                        </div>
                      )}

                      <button onClick={() => setEnrollModal({ open: true, skill: skill.name, course: skill.name })}
                        style={{ width: '100%', padding: '0.75rem', background: '#4361EE', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.93rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#2d2d6b'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#4361EE'; }}>
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

      {enrollModal.open && (
        <EnrollmentModal university="CDRC Skill Programs" program={enrollModal.course} onClose={() => setEnrollModal({ open: false, skill: '', course: '' })} />
      )}
    </div>
  );
}
