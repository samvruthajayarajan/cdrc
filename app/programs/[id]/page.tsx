'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Award, CheckCircle, GraduationCap, Users } from '@/components/Icon';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import EnrollmentModal from '@/components/EnrollmentModal';

interface Program {
  _id: string;
  name: string;
  duration: string;
  university: string;
  description?: string;
}

const HIGHLIGHTS: Record<string, string[]> = {
  MBA: ['Business Strategy', 'Financial Management', 'Marketing Analytics', 'Operations Management', 'Leadership Skills', 'Business Ethics'],
  MCA: ['Software Engineering', 'Data Structures', 'Cloud Computing', 'Cybersecurity', 'AI & Machine Learning', 'Database Systems'],
  BBA: ['Business Fundamentals', 'Entrepreneurship', 'Digital Marketing', 'HR Management', 'Finance Basics', 'Business Communication'],
  BCA: ['Programming Languages', 'Database Management', 'Web Development', 'Networking', 'Software Testing', 'Mobile App Dev'],
  DEFAULT: ['Comprehensive Curriculum', 'Industry-Relevant Skills', 'Expert Faculty', 'Flexible Learning', 'Career Support', 'Live Sessions'],
};

const CAREER_ROLES: Record<string, string[]> = {
  MBA: ['Business Manager', 'Marketing Manager', 'Finance Analyst', 'HR Manager', 'Operations Head', 'Entrepreneur'],
  MCA: ['Software Developer', 'Data Scientist', 'Cloud Architect', 'Cybersecurity Analyst', 'IT Manager', 'Full Stack Dev'],
  BBA: ['Business Analyst', 'Sales Executive', 'Marketing Executive', 'HR Executive', 'Entrepreneur', 'Brand Manager'],
  BCA: ['Web Developer', 'Software Tester', 'Database Admin', 'Network Engineer', 'App Developer', 'UI/UX Designer'],
  DEFAULT: ['Industry Professional', 'Team Lead', 'Consultant', 'Analyst', 'Manager', 'Specialist'],
};

function getKey(name: string): string {
  const n = name.toUpperCase();
  for (const key of ['MBA', 'MCA', 'BBA', 'BCA']) {
    if (n.includes(key)) return key;
  }
  return 'DEFAULT';
}

const STEPS = [
  { num: '01', title: 'Apply Online', desc: 'Fill the enrollment form with your details' },
  { num: '02', title: 'Submit Documents', desc: 'Upload your academic certificates' },
  { num: '03', title: 'Pay Fees', desc: 'One-time or EMI payment options available' },
  { num: '04', title: 'Start Learning', desc: 'Access the portal and begin your journey' },
];

export default function ProgramDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrollOpen, setEnrollOpen] = useState(false);

  useEffect(() => {
    fetch('/api/programs').then(r => r.json()).then(d => {
      if (d.success && d.data?.length) {
        const found = d.data.find((p: Program) => p._id?.toString() === id);
        if (found) setProgram(found); else setError('not found');
      } else setError('not found');
      setLoading(false);
    }).catch(() => { setError('error'); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 44, height: 44, border: '4px solid #e2e8f0', borderTop: '4px solid #1e40af', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    </div>
  );

  if (error || !program) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Program Not Found</h1>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>This program doesn&apos;t exist or has been removed.</p>
        <Link href="/programs" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0.75rem 1.5rem', background: '#1e40af', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Programs
        </Link>
      </div>
    </div>
  );

  const key = getKey(program.name);
  const highlights = HIGHLIGHTS[key];
  const roles = CAREER_ROLES[key];
  const isUG = ['BA', 'BBA', 'BCA', 'BCOM', 'B COM', 'BSC'].some(p => program.name.toUpperCase().startsWith(p));

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', height: 340, overflow: 'hidden',
        backgroundImage: 'url(https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        backgroundSize: 'cover', backgroundPosition: 'center 30%',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,15,40,0.7) 0%, rgba(10,15,40,0.85) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'calc(80px + 1rem) 2rem 2.5rem', maxWidth: 1100, margin: '0 auto', width: '100%', left: 0, right: 0, zIndex: 1 }}>
          <AnimateOnScroll animation="fadeUp">
            <Link href="/programs" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, marginBottom: '1rem', transition: 'color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)'; }}
            >
              <ArrowLeft size={14} /> All Programs
            </Link>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeUp" delay={60}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ background: isUG ? 'rgba(34,197,94,0.25)' : 'rgba(59,130,246,0.25)', border: `1px solid ${isUG ? 'rgba(34,197,94,0.5)' : 'rgba(59,130,246,0.5)'}`, borderRadius: 50, padding: '3px 12px', color: isUG ? '#86efac' : '#93c5fd', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {isUG ? 'Undergraduate' : 'Postgraduate'}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 50, padding: '3px 12px', color: 'rgba(255,255,255,0.85)', fontSize: '0.72rem', fontWeight: 700 }}>
                UGC Approved
              </span>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeUp" delay={100}>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              {program.name}
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeUp" delay={140}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
              {[
                { icon: <Clock size={13} color="rgba(255,255,255,0.7)" />, label: 'Duration', value: program.duration },
                { icon: <BookOpen size={13} color="rgba(255,255,255,0.7)" />, label: 'Mode', value: 'Online' },
                { icon: <GraduationCap size={13} color="rgba(255,255,255,0.7)" />, label: 'University', value: program.university || 'Multiple' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {item.icon}
                  <div>
                    <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</div>
                    <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 700 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2rem 5rem', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* About */}
          <AnimateOnScroll animation="fadeUp">
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, background: '#eff6ff', borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={14} color="#1e40af" />
                </span>
                About this Program
              </h2>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.85, color: '#475569' }}>
                {program.description || `${program.name} is a UGC-DEB approved online program offered through CDRC's partner universities. This ${program.duration} program equips students with industry-relevant skills through a flexible online format, allowing you to study at your own pace from anywhere in India.`}
              </p>
            </div>
          </AnimateOnScroll>

          {/* What you'll learn */}
          <AnimateOnScroll animation="fadeUp" delay={60}>
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, background: '#eff6ff', borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={14} color="#1e40af" />
                </span>
                What You&apos;ll Learn
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: '0.6rem' }}>
                {highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.6rem 0.875rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1e40af', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', color: '#374151', fontWeight: 500 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Career Opportunities */}
          <AnimateOnScroll animation="fadeUp" delay={100}>
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, background: '#eff6ff', borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={14} color="#1e40af" />
                </span>
                Career Opportunities
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {roles.map((r, i) => (
                  <span key={i} style={{ padding: '6px 14px', background: '#eff6ff', color: '#1e40af', borderRadius: 50, fontSize: '0.82rem', fontWeight: 600, border: '1px solid #bfdbfe' }}>{r}</span>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Admission Process */}
          <AnimateOnScroll animation="fadeUp" delay={140}>
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 28, background: '#eff6ff', borderRadius: 7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={14} color="#1e40af" />
                </span>
                Admission Process
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '1rem' }}>
                {STEPS.map((s, i) => (
                  <div key={i} style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#e2e8f0', lineHeight: 1, marginBottom: '0.5rem' }}>{s.num}</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.3rem' }}>{s.title}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: '80px' }}>
          <AnimateOnScroll animation="fadeUp" delay={80}>
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Program Details</div>
              {[
                { label: 'Duration', value: program.duration },
                { label: 'Mode', value: 'Online' },
                { label: 'Approval', value: 'UGC-DEB' },
                { label: 'Level', value: isUG ? 'Undergraduate' : 'Postgraduate' },
                ...(program.university ? [{ label: 'University', value: program.university }] : []),
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.label}</span>
                  <span style={{ fontSize: '0.82rem', color: '#0f172a', fontWeight: 700, textAlign: 'right', maxWidth: '55%' }}>{item.value}</span>
                </div>
              ))}
              <button onClick={() => setEnrollOpen(true)}
                style={{ width: '100%', padding: '0.85rem', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', marginTop: '1.25rem', marginBottom: '0.625rem', transition: 'background 0.2s', fontFamily: 'inherit' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1e3a8a'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1e40af'; }}
              >
                Apply Now
              </button>
              <Link href="/contact" style={{ display: 'block', padding: '0.75rem', border: '1.5px solid #1e40af', color: '#1e40af', borderRadius: 10, fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', textAlign: 'center', transition: 'background 0.2s', boxSizing: 'border-box' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#eff6ff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
              >
                Free Counselling
              </Link>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeUp" delay={120}>
            <div style={{ background: '#0f172a', borderRadius: 14, padding: '1.5rem' }}>
              <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', marginBottom: '1rem' }}>Why Choose CDRC?</h3>
              {['UGC-DEB Approved Programs', 'Free Expert Counselling', 'Flexible Online Learning', 'EMI Payment Options', 'Placement Assistance'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.6rem' }}>
                  <CheckCircle size={13} color="#60a5fa" />
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeUp" delay={160}>
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.25rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>📞</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.2rem' }}>Need Help?</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem' }}>Mon–Sat, 9AM–6PM</div>
              <a href="tel:+919846446055" style={{ display: 'block', padding: '0.6rem', background: '#f0fdf4', color: '#15803d', borderRadius: 8, fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
                +91 9846446055
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {enrollOpen && (
        <EnrollmentModal onClose={() => setEnrollOpen(false)} university={program.university || 'CDRC'} program={program.name} />
      )}
    </div>
  );
}
