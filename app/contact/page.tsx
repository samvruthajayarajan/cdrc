'use client';
import Marquee from '@/components/Marquee';
import Image from 'next/image';
import { useState } from 'react';
import { Phone, Mail, MessageCircle, MapPin } from '@/components/Icon';
import AnimateOnScroll from '@/components/AnimateOnScroll';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  const contacts = [
    { icon: <Phone size={26} />, title: 'Phone Numbers', items: [
      { text: '0467-2211200', href: 'tel:04672211200' },
      { text: '+91 9846446055', href: 'tel:+919846446055' },
      { text: '+91 9562446055', href: 'tel:+919562446055' },
      { text: '+91 7511100080', href: 'tel:+917511100080' },
    ]},
    { icon: <Mail size={26} />, title: 'Email Addresses', items: [
      { text: 'info@cdrc.edu.in', href: 'mailto:info@cdrc.edu.in' },
      { text: 'admissions@cdrc.edu.in', href: 'mailto:admissions@cdrc.edu.in' },
    ]},
    { icon: <MessageCircle size={26} />, title: 'WhatsApp', items: [
      { text: '+91 9846446055', href: 'https://wa.me/919846446055' },
    ]},
    { icon: <MapPin size={26} />, title: 'Office Address', items: [
      { text: 'City Centre Building, 2nd Floor', href: '' },
      { text: 'Near Bus Stand, Kanhangad', href: '' },
      { text: 'Kasargod, Kerala - 671315', href: '' },
    ]},
  ];

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%', padding: '0.875rem 1rem',
    border: `1px solid ${errors[field] ? '#ef4444' : '#e5e7eb'}`,
    borderRadius: '0.5rem', fontSize: '0.95rem', fontFamily: 'inherit',
    outline: 'none', transition: 'border-color 0.2s', background: '#fff', color: '#1f2937',
  });

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', padding: '16rem 2rem 11rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80" alt="Team working" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 30%' }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,16,40,0.82)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem' }}>Contact Us</h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: 560, lineHeight: 1.8 }}>
            Get in touch with our admission counselors — Monday to Saturday, 9 AM to 6 PM.
          </p>
        </div>
      </section>

      <Marquee />

      {/* Contact cards */}
      <section style={{ padding: '5rem 2rem 4rem', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2 className="section-heading">Get In <span style={{ color: '#1e40af' }}>Touch</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {contacts.map((c, i) => (
              <AnimateOnScroll key={c.title} animation={i % 2 === 0 ? 'fadeLeft' : 'fadeRight'} delay={i * 100}>
                <div className="feature-card">
                  <div style={{ marginBottom: '1rem', color: '#1e40af' }}>{c.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.875rem', color: '#1f2937' }}>{c.title}</h3>
                  {c.items.map((item, idx) => (
                    item.href
                      ? <a key={idx} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                          style={{ display: 'block', color: '#1e40af', textDecoration: 'none', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.875rem' }}>
                          {item.text}
                        </a>
                      : <p key={idx} style={{ color: '#6b7280', marginBottom: '0.25rem', fontSize: '0.875rem' }}>{item.text}</p>
                  ))}
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Office hours */}
          <AnimateOnScroll animation="fadeUp">
            <div style={{ 
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', 
              padding: '2.5rem 3rem', 
              borderRadius: '1.25rem', 
              border: '1px solid #bfdbfe',
              marginBottom: '4rem',
              boxShadow: '0 4px 16px rgba(30, 64, 175, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h3 style={{ 
                  color: '#1e40af', 
                  fontWeight: 700, 
                  fontSize: '1.25rem',
                  margin: 0
                }}>
                  Office Hours
                </h3>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                gap: '2rem'
              }}>
                <div style={{
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(10px)',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.5)'
                }}>
                  <p style={{ 
                    color: '#1e40af', 
                    fontWeight: 700, 
                    marginBottom: '0.5rem', 
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Monday – Saturday
                  </p>
                  <p style={{ 
                    color: '#1f2937', 
                    fontSize: '1.125rem',
                    fontWeight: 600
                  }}>
                    9:00 AM – 6:00 PM
                  </p>
                </div>
                
                <div style={{
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(10px)',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.5)'
                }}>
                  <p style={{ 
                    color: '#1e40af', 
                    fontWeight: 700, 
                    marginBottom: '0.5rem', 
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Sunday
                  </p>
                  <p style={{ 
                    color: '#64748b', 
                    fontSize: '1.125rem',
                    fontWeight: 600
                  }}>
                    Closed
                  </p>
                </div>
                
                <div style={{
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(10px)',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.5)'
                }}>
                  <p style={{ 
                    color: '#1e40af', 
                    fontWeight: 700, 
                    marginBottom: '0.5rem', 
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    WhatsApp Support
                  </p>
                  <p style={{ 
                    color: '#1f2937', 
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    lineHeight: 1.5
                  }}>
                    Quick response during office hours
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Contact Form */}
      <section style={{ padding: '5rem 2rem 6rem', background: '#fff', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }} className="contact-form-grid">

            {/* Left — info */}
            <AnimateOnScroll animation="slideRight">
              <div style={{ paddingTop: '3rem' }}>
                <h2 className="section-heading left-heading" style={{ textAlign: 'left' }}>Send Us a <span style={{ color: '#1e40af' }}>Message</span></h2>
                <p style={{ color: '#6b7280', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
                  Have a question about admissions, programs, or fees? Fill in the form and our counselors will get back to you within 24 hours.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { icon: <Phone size={20} color="#1e40af" />, label: 'Call Us', value: '+91 9846446055' },
                    { icon: <Mail size={20} color="#1e40af" />, label: 'Email Us', value: 'info@cdrc.edu.in' },
                    { icon: <MapPin size={20} color="#1e40af" />, label: 'Visit Us', value: 'City Centre Building, 2nd Floor, Near Bus Stand, Kanhangad, Kasargod, Kerala - 671315' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ width: 44, height: 44, background: '#dbeafe', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#1f2937', fontSize: '0.875rem', marginBottom: '0.2rem' }}>{item.label}</div>
                        <div style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.5 }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            {/* Right — form */}
            <AnimateOnScroll animation="slideLeft">
              <div style={{ background: '#fff', borderRadius: '1rem', padding: '2.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', border: '1px solid #e5e7eb', marginTop: '3rem' }}>
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                  <h3 style={{ color: '#16a34a', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Message Sent!</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Thank you for reaching out. Our team will contact you within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} style={{ marginTop: '1.5rem', background: '#1e40af', color: '#fff', padding: '0.75rem 1.75rem', borderRadius: 50, border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#1f2937', marginBottom: '1.75rem' }}>Contact Form</h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: '0.4rem' }}>Full Name *</label>
                      <input type="text" placeholder="Your full name" value={form.name}
                        onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })); }}
                        style={inputStyle('name')} />
                      {errors.name && <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.25rem' }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: '0.4rem' }}>Email Address *</label>
                      <input type="email" placeholder="your@email.com" value={form.email}
                        onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: '' })); }}
                        style={inputStyle('email')} />
                      {errors.email && <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.25rem' }}>{errors.email}</p>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: '0.4rem' }}>Phone Number</label>
                      <input type="tel" placeholder="+91 XXXXXXXXXX" value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        style={inputStyle('')} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: '0.4rem' }}>Subject</label>
                      <input type="text" placeholder="e.g. Admission Inquiry" value={form.subject}
                        onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                        style={inputStyle('')} />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#374151', marginBottom: '0.4rem' }}>Message *</label>
                    <textarea placeholder="Write your message here..." value={form.message} rows={5}
                      onChange={e => { setForm(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: '' })); }}
                      style={{ ...inputStyle('message'), resize: 'vertical' }} />
                    {errors.message && <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.25rem' }}>{errors.message}</p>}
                  </div>

                  {status === 'error' && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem' }}>Something went wrong. Please try again.</p>}

                  <button type="submit" disabled={status === 'loading'}
                    style={{ width: '100%', background: '#1e40af', color: '#fff', padding: '0.875rem', border: 'none', borderRadius: 50, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', opacity: status === 'loading' ? 0.7 : 1, transition: 'all 0.3s' }}>
                    {status === 'loading' ? 'Sending...' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
            </AnimateOnScroll>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .contact-form-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          }
        `}</style>
      </section>

      {/* Admin Access Section */}
      <section style={{ padding: '3rem 2rem', background: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <AnimateOnScroll animation="fadeUp">
            <div style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.875rem 2rem',
              background: '#fff',
              border: '2px solid #e5e7eb',
              borderRadius: '50px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#1e40af';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => window.location.href = '/login'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span style={{ 
                color: '#1e40af', 
                fontWeight: 600, 
                fontSize: '0.95rem',
                letterSpacing: '0.01em'
              }}>
                Admin Access
              </span>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
