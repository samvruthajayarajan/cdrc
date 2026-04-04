'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Award, BookOpen, GraduationCap, Building } from '@/components/Icon';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import EnrollmentModal from '@/components/EnrollmentModal';

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

export default function UniversityDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/universities')
      .then(r => {
        if (!r.ok) throw new Error(`API error: ${r.status}`);
        return r.json();
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(data => {
        if (data.success && data.data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const found = data.data.find((uni: any) => 
            uni.slug === slug || 
            uni.slug?.startsWith(slug + '-') ||
            uni.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
          );
          if (found) {
            setUniversity({
              ...found,
              location: found.location || 'India',
              naac: found.naac || found.accreditation || 'UGC Approved',
              description: found.description || `${found.name} is a UGC-approved university offering quality online degree programs with flexible learning options for working professionals.`,
              facilities: found.facilities?.length ? found.facilities : ['Online Learning Platform', 'Digital Library', 'Student Support', 'Live Classes', 'Career Guidance', 'Online Assessments'],
            });
          } else {
            setError('University not found');
          }
        } else {
          setError('Failed to load universities');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load university');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Loading university...</p>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>University Not Found</h1>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>The university you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/universities" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: '#1e40af', color: '#fff', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600 }}>
            <ArrowLeft size={20} />
            Back to Universities
          </Link>
        </div>
      </div>
    );
  }

  const handleEnroll = (programName: string) => {
    setSelectedProgram(programName);
    setIsEnrollmentOpen(true);
  };

  const defaultImage = 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=400&fit=crop';
  const bannerImage = university.image && university.image.startsWith('http') ? university.image : defaultImage;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Banner Section */}
      <div style={{
        position: 'relative',
        height: '400px',
        background: `linear-gradient(rgba(30, 64, 175, 0.7), rgba(30, 64, 175, 0.9)), url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }}>
        <div style={{ maxWidth: '1200px', width: '100%', padding: '0 2rem' }}>
          <AnimateOnScroll animation="fadeUp">
            <Link href="/universities" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#fff', textDecoration: 'none', marginBottom: '2rem', fontSize: '1rem', fontWeight: 600, opacity: 0.9 }}>
              <ArrowLeft size={20} />
              Back to Universities
            </Link>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeUp" delay={100}>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.2 }}>
              {university.name}
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeUp" delay={200}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={20} />
                <span style={{ fontSize: '1.1rem' }}>{university.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} />
                <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{university.naac}</span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Content Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* About Section */}
        <AnimateOnScroll animation="fadeUp">
          <div style={{ background: '#fff', borderRadius: '1.25rem', padding: '2.5rem', marginBottom: '3rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Building size={32} color="#1e40af" />
              About the University
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#475569', marginBottom: '1.5rem' }}>
              {university.description}
            </p>
            {university.ranking && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)', borderRadius: '0.75rem', color: '#1e40af', fontWeight: 600 }}>
                <Award size={20} />
                {university.ranking}
              </div>
            )}
          </div>
        </AnimateOnScroll>

        {/* Facilities Section */}
        {university.facilities && university.facilities.length > 0 && (
          <AnimateOnScroll animation="fadeUp" delay={100}>
            <div style={{ background: '#fff', borderRadius: '1.25rem', padding: '2.5rem', marginBottom: '3rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '1.5rem' }}>
                Facilities &amp; Features
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {university.facilities.map((facility, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                    <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff' }}>
                      <span style={{ fontSize: '1.25rem' }}>✓</span>
                    </div>
                    <span style={{ color: '#475569', fontWeight: 500 }}>{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        )}

        {/* Programs Section */}
        {university.programs && university.programs.length > 0 && (
          <AnimateOnScroll animation="fadeUp" delay={200}>
            <div style={{ background: '#fff', borderRadius: '1.25rem', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <GraduationCap size={32} color="#1e40af" />
                Programs Offered
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {university.programs.map((program, index) => (
                  <div key={index}
                    style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0', transition: 'all 0.3s ease', cursor: 'pointer' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(30, 64, 175, 0.12)'; e.currentTarget.style.borderColor = '#1e40af'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <BookOpen size={24} color="#fff" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem' }}>{program.name}</h3>
                        <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>{program.duration}</span>
                      </div>
                    </div>
                    {program.description && (
                      <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1rem' }}>{program.description}</p>
                    )}
                    <button
                      onClick={() => handleEnroll(program.name)}
                      style={{ width: '100%', padding: '0.75rem', background: '#1e40af', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#1e3a8a'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#1e40af'; e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                      Enroll Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        )}
      </div>

      {isEnrollmentOpen && (
        <EnrollmentModal
          onClose={() => setIsEnrollmentOpen(false)}
          university={university.name}
          program={selectedProgram}
        />
      )}
    </div>
  );
}
