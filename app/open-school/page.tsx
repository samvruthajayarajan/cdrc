'use client';
import { useState, useEffect } from 'react';
import { Board } from '@/lib/data';
import EnrollmentModal from '@/components/EnrollmentModal';
import Marquee from '@/components/Marquee';
import Image from 'next/image';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Award } from '@/components/Icon';

export default function OpenSchoolPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ university: string; program: string } | null>(null);
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/open-school')
      .then(r => r.json())
      .then(data => { 
        // Ensure data is an array, if it's an error object or not an array, use empty array
        if (Array.isArray(data)) {
          setBoards(data);
        } else {
          console.error('API returned non-array data:', data);
          setBoards([]);
        }
        setLoading(false); 
      })
      .catch(error => {
        console.error('Failed to fetch boards:', error);
        setBoards([]);
        setLoading(false);
      });
  }, []);

  const toggleProgram = (boardIndex: number, programIndex: number) => {
    const key = `${boardIndex}-${programIndex}`;
    setExpandedPrograms(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div>
      <section style={{ position: 'relative', padding: '16rem 2rem 11rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&q=80" alt="Students in classroom" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 40%', transform: 'scale(1.08)' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,16,40,0.82)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem' }}>Open School Programs</h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: 560, lineHeight: 1.8 }}>
            Flexible Class 10 & 12 education — study at your own pace, certificates equivalent to CBSE/ICSE.
          </p>
        </div>
      </section>

      <Marquee />

      <section style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <h2 className="section-heading">Open <span style={{ color: '#1e40af' }}>School Boards</span></h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeUp" delay={100}>
            <div style={{ 
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', 
              padding: '2.5rem 3rem', 
              borderRadius: '1.25rem', 
              border: '1px solid #bfdbfe',
              marginBottom: '3.5rem',
              boxShadow: '0 4px 16px rgba(30, 64, 175, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                <div style={{
                  minWidth: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)'
                }}>
                  <Award size={28} color="#fff" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    color: '#1e40af', 
                    fontSize: '1.25rem', 
                    fontWeight: 700, 
                    marginBottom: '1rem',
                    letterSpacing: '-0.01em'
                  }}>
                    Nationally Recognized Certification
                  </h3>
                  <p style={{ 
                    color: '#334155', 
                    lineHeight: 1.8, 
                    fontSize: '1rem',
                    marginBottom: '1rem'
                  }}>
                    Open School certificates are fully equivalent to CBSE/ICSE and are accepted for higher education admissions and government jobs. Ideal for working professionals, dropouts, and students in remote areas.
                  </p>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '1rem',
                    marginTop: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        background: '#1e40af', 
                        borderRadius: '50%' 
                      }} />
                      <span style={{ color: '#475569', fontSize: '0.95rem', fontWeight: 500 }}>
                        Study at your own pace
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        background: '#1e40af', 
                        borderRadius: '50%' 
                      }} />
                      <span style={{ color: '#475569', fontSize: '0.95rem', fontWeight: 500 }}>
                        Flexible exam schedules
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        background: '#1e40af', 
                        borderRadius: '50%' 
                      }} />
                      <span style={{ color: '#475569', fontSize: '0.95rem', fontWeight: 500 }}>
                        UGC approved programs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#6b7280', padding: '3rem' }}>Loading boards...</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {boards.map((board, i) => (
                <AnimateOnScroll key={i} animation={i % 2 === 0 ? 'zoomIn' : 'rotateIn'} delay={i * 150}>
                  <div className="feature-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        boxShadow: '0 8px 24px rgba(30, 64, 175, 0.3)'
                      }}>
                        <Award size={40} color="#fff" />
                      </div>
                      <h3 style={{ color: '#1f2937', fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.4rem' }}>{board.name}</h3>
                      <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{board.description}</p>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: '#1e40af', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Available Programs:</h4>
                      <div style={{ minHeight: '280px', maxHeight: '280px', overflowY: 'auto' }}>
                        {board.programs?.map((p, j) => {
                          const key = `${i}-${j}`;
                          const isExpanded = expandedPrograms.has(key);
                          const shouldTruncate = p.subjects.length > 80;
                          const displayText = isExpanded || !shouldTruncate ? p.subjects : truncateText(p.subjects, 80);
                          
                          return (
                            <div key={j} style={{ background: '#f8fafc', border: '1px solid #e5e7eb', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                              <div style={{ color: '#1f2937', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.2rem' }}>{p.name}</div>
                              <div style={{ color: '#9ca3af', fontSize: '0.78rem', marginBottom: shouldTruncate ? '0.5rem' : '0' }}>
                                {displayText}
                              </div>
                              {shouldTruncate && (
                                <button
                                  onClick={() => toggleProgram(i, j)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#1e40af',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    padding: '0',
                                    textDecoration: 'underline'
                                  }}
                                >
                                  {isExpanded ? 'See less' : 'See more'}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <button onClick={() => setModal({ university: board.name, program: 'Open School Programs' })}
                      style={{ marginTop: '1.5rem', width: '100%', background: '#1e40af', color: '#fff', padding: '0.875rem', border: 'none', borderRadius: 50, fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
                      Enroll Now
                    </button>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>
      {modal && <EnrollmentModal university={modal.university} program={modal.program} onClose={() => setModal(null)} />}
    </div>
  );
}


