'use client';
import { useState, useEffect } from 'react';
import EnrollmentModal from '@/components/EnrollmentModal';
import Marquee from '@/components/Marquee';
import Image from 'next/image';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { BookOpen } from '@/components/Icon';

interface Program {
  _id?: string;
  name: string;
  duration: string;
  university: string;
  description?: string;
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ university: string; program: string } | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/programs')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setPrograms(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div>
      <section style={{ position: 'relative', padding: '16rem 2rem 11rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80" alt="Student studying" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 20%' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,16,40,0.82)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Academic Programs</h1>
          <p style={{ color: '#e2e8f0', fontSize: '1.125rem', maxWidth: 640, lineHeight: 1.7, fontWeight: 400 }}>
            Explore our comprehensive range of UGC-approved online degree programs offered in collaboration with leading universities across India.
          </p>
        </div>
      </section>

      <Marquee />

      <section style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeDown">
            <h2 className="section-heading">Available <span style={{ color: '#1e40af' }}>Programs</span></h2>
            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1.05rem', maxWidth: 700, margin: '1rem auto 3rem', lineHeight: 1.7 }}>
              Choose from a diverse selection of undergraduate and postgraduate programs designed to advance your career.
            </p>
          </AnimateOnScroll>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#6b7280', padding: '3rem' }}>Loading programs...</p>
          ) : programs.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280', padding: '3rem' }}>No programs available yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {programs.map((p, i) => {
                const animations = ['fadeUp', 'fadeLeft', 'fadeRight', 'scaleUp', 'zoomIn'];
                const animation = animations[i % animations.length];
                const cardId = p._id || `program-${i}`;
                const isExpanded = expandedCards.has(cardId);
                const hasDescription = p.description && p.description.length > 0;
                const shouldTruncate = hasDescription && (p.description?.length || 0) > 100;
                
                return (
                  <AnimateOnScroll key={cardId} animation={animation as any} delay={(i % 12) * 40}>
                    <div style={{ 
                      background: '#fff',
                      borderRadius: '1rem',
                      padding: '1.5rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      border: '1px solid #e5e7eb',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                      }}>
                        <BookOpen size={24} color="#fff" />
                      </div>
                      <h3 style={{ color: '#111827', fontWeight: 600, fontSize: '1.05rem', lineHeight: 1.5, marginBottom: '1rem' }}>{p.name}</h3>
                      <div style={{ color: '#4b5563', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 600, color: '#374151' }}>Duration:</span> 
                        <span>{p.duration}</span>
                      </div>
                      <div style={{ color: '#4b5563', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 600, color: '#374151' }}>Mode:</span> 
                        <span>Online • UGC Approved</span>
                      </div>
                      {p.university && (
                        <div style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                          {p.university}
                        </div>
                      )}
                      {hasDescription && (
                        <div style={{ marginBottom: '1rem', flex: 1 }}>
                          <p style={{ 
                            color: '#475569', 
                            fontSize: '0.9rem', 
                            lineHeight: 1.7,
                            marginBottom: '0.5rem'
                          }}>
                            {isExpanded ? p.description : truncateText(p.description || '', 100)}
                          </p>
                          {shouldTruncate && (
                            <button
                              onClick={() => toggleExpand(cardId)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#1e40af',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                padding: 0,
                                textDecoration: 'underline',
                                textUnderlineOffset: '2px'
                              }}
                            >
                              {isExpanded ? 'Show less' : 'Read more'}
                            </button>
                          )}
                        </div>
                      )}
                      <button onClick={() => setModal({ university: p.university || 'CDRC', program: p.name })}
                        style={{ 
                          width: '100%', 
                          background: '#1e40af', 
                          color: '#fff', 
                          padding: '0.875rem 1rem', 
                          border: 'none', 
                          borderRadius: '0.5rem', 
                          fontWeight: 600, 
                          cursor: 'pointer', 
                          fontSize: '0.9rem',
                          marginTop: 'auto',
                          letterSpacing: '0.01em',
                          transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#1e3a8a';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#1e40af';
                        }}>
                        Apply Now
                      </button>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          )}
        </div>
      </section>
      {modal && <EnrollmentModal university={modal.university} program={modal.program} onClose={() => setModal(null)} />}
    </div>
  );
}



