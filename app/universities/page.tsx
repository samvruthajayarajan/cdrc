'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Search, GraduationCap, Award } from '@/components/Icon';

interface University {
  name: string;
  slug: string;
  accreditation: string;
  naac?: string;
  programs: Array<{ name: string; duration: string }>;
  image?: string;
}

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await fetch('/api/universities');
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      if (data.success) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedUniversities = data.data.map((uni: any) => ({
          name: uni.name,
          slug: uni.slug || uni.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          accreditation: uni.naac || uni.accreditation,
          naac: uni.naac || uni.accreditation,
          programs: uni.programs || [],
          image: uni.image && uni.image.startsWith('http') ? uni.image : undefined,
        }));
        setUniversities(mappedUniversities);
      }
    } catch (error) {
      console.error('Error fetching universities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <section style={{ position: 'relative', padding: '10rem 2rem 6rem', background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', borderRadius: '50px', color: '#fff', fontSize: '0.9rem', fontWeight: 600, marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.3)' }}>
              <Award size={18} />
              UGC APPROVED &amp; NAAC ACCREDITED
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeUp" delay={100}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, color: '#fff', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>Our Partner Universities</h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeUp" delay={200}>
            <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1.25rem', maxWidth: 800, margin: '0 auto 3rem', lineHeight: 1.7, fontWeight: 400 }}>Explore 14+ prestigious universities offering world-class online education programs</p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeUp" delay={300}>
            <div style={{ maxWidth: 650, margin: '0 auto', position: 'relative' }}>
              <Search size={22} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none', zIndex: 2 }} />
              <input
                type="text"
                placeholder="Search universities by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '1.25rem 1.5rem 1.25rem 4rem', fontSize: '1.05rem', border: 'none', borderRadius: '60px', background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', outline: 'none', transition: 'all 0.3s ease', color: '#1e293b' }}
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section style={{ padding: '6rem 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', padding: '1.5rem 2rem', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <GraduationCap size={24} style={{ color: '#1e40af' }} />
                <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>{filteredUniversities.length} {filteredUniversities.length === 1 ? 'University' : 'Universities'} Found</span>
              </div>
              <div style={{ fontSize: '0.95rem', color: '#64748b' }}>Click any card to explore programs</div>
            </div>
          </AnimateOnScroll>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
              <div style={{ display: 'inline-block', width: '50px', height: '50px', border: '4px solid #e2e8f0', borderTop: '4px solid #1e40af', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <p style={{ marginTop: '1.5rem', color: '#64748b', fontSize: '1.1rem' }}>Loading...</p>
            </div>
          ) : filteredUniversities.length === 0 ? (
            <AnimateOnScroll animation="fadeUp">
              <div style={{ textAlign: 'center', padding: '6rem 2rem', background: '#fff', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem' }}>No universities found</h3>
                <p style={{ color: '#64748b', fontSize: '1.05rem' }}>Try adjusting your search criteria</p>
              </div>
            </AnimateOnScroll>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
              {filteredUniversities.map((uni, index) => (
                <AnimateOnScroll key={index} animation="fadeUp" delay={index * 80}>
                  <Link
                    href={`/universities/${uni.slug}`}
                    style={{ textDecoration: 'none', display: 'block' }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={{ position: 'relative', background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: hoveredCard === index ? '0 25px 60px rgba(30, 64, 175, 0.25)' : '0 10px 30px rgba(0,0,0,0.08)', transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer', height: '100%' }}>
                      <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: '#e2e8f0' }}>
                        {uni.image ? (
                          <>
                            <Image src={uni.image} alt={uni.name} fill style={{ objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.85) 0%, rgba(59, 130, 246, 0.75) 100%)', opacity: hoveredCard === index ? 1 : 0, transition: 'opacity 0.4s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
                              <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, opacity: hoveredCard === index ? 1 : 0, transition: 'opacity 0.3s ease 0.1s' }}>View Details →</div>
                            </div>
                          </>
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', color: '#fff', fontSize: '4rem', fontWeight: 900 }}>{uni.name.charAt(0)}</div>
                        )}
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.95)', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, color: '#1e40af', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                          <Award size={14} />
                          NAAC
                        </div>
                      </div>
                      <div style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem', lineHeight: 1.3, minHeight: '3.6rem' }}>{uni.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: '#f1f5f9', borderRadius: '12px', marginBottom: '1.25rem' }}>
                          <GraduationCap size={18} style={{ color: '#1e40af' }} />
                          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#475569' }}>{uni.programs?.length || 0}+ Programs</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.5rem' }}>{uni.accreditation}</div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', background: hoveredCard === index ? '#1e40af' : '#f8fafc', borderRadius: '12px', transition: 'all 0.3s ease' }}>
                          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: hoveredCard === index ? '#fff' : '#1e40af' }}>Explore Programs</span>
                          <span style={{ fontSize: '1.2rem', color: hoveredCard === index ? '#fff' : '#1e40af' }}>→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: '6rem 2rem', background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', marginBottom: '1.5rem' }}>Ready to Begin Your Learning Journey?</h2>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', marginBottom: '3rem', lineHeight: 1.7 }}>Join thousands of students transforming their careers</p>
            <Link href="/contact" style={{ display: 'inline-block', padding: '1.25rem 3rem', background: '#fff', color: '#1e40af', borderRadius: '60px', fontWeight: 800, fontSize: '1.1rem', textDecoration: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>Get Started Today →</Link>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
