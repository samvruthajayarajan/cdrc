'use client';
import { useState } from 'react';

interface Props { university: string; program: string; onClose: () => void; }

export default function EnrollmentModal({ university, program, onClose }: Props) {
  const [form, setForm] = useState({ studentName: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function validate() {
    const e: Record<string, string> = {};
    if (!form.studentName.trim()) e.studentName = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone)) e.phone = 'Phone must be 10 digits';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    try {
      const res = await fetch('/api/enrollments', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, university, program }),
      });
      if (res.ok) { setStatus('success'); setTimeout(onClose, 2500); }
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '1.5rem',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>

        {/* Header with Gradient */}
        <div style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          padding: '2rem',
          borderRadius: '1.5rem 1.5rem 0 0',
          position: 'relative'
        }}>
          <button 
            onClick={onClose} 
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              fontWeight: 300,
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            ×
          </button>
          <div style={{ textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎓</div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              Enrollment Inquiry
            </h2>
            <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>
              We&apos;ll contact you within 24 hours
            </p>
          </div>
        </div>

        <div style={{ padding: '2rem' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ 
                fontSize: '5rem', 
                marginBottom: '1.5rem',
                animation: 'bounce 1s ease-in-out'
              }}>
                ✅
              </div>
              <h3 style={{ 
                color: '#10b981', 
                fontSize: '1.5rem', 
                fontWeight: 800, 
                marginBottom: '0.75rem' 
              }}>
                Enrollment Submitted!
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                We&apos;ll contact you within 24 hours to complete your admission.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Full Name */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: 700, 
                  color: '#1f2937', 
                  marginBottom: '0.5rem' 
                }}>
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Your full name" 
                  value={form.studentName}
                  onChange={e => { 
                    setForm(p => ({ ...p, studentName: e.target.value })); 
                    setErrors(p => ({ ...p, studentName: '' })); 
                  }}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    border: errors.studentName ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    background: '#f9fafb'
                  }}
                  onFocus={(e) => {
                    if (!errors.studentName) e.currentTarget.style.borderColor = '#1e40af';
                    e.currentTarget.style.background = '#fff';
                  }}
                  onBlur={(e) => {
                    if (!errors.studentName) e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.background = '#f9fafb';
                  }}
                />
                {errors.studentName && (
                  <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.375rem' }}>
                    {errors.studentName}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: 700, 
                  color: '#1f2937', 
                  marginBottom: '0.5rem' 
                }}>
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  value={form.email}
                  onChange={e => { 
                    setForm(p => ({ ...p, email: e.target.value })); 
                    setErrors(p => ({ ...p, email: '' })); 
                  }}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    border: errors.email ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    background: '#f9fafb'
                  }}
                  onFocus={(e) => {
                    if (!errors.email) e.currentTarget.style.borderColor = '#1e40af';
                    e.currentTarget.style.background = '#fff';
                  }}
                  onBlur={(e) => {
                    if (!errors.email) e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.background = '#f9fafb';
                  }}
                />
                {errors.email && (
                  <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.375rem' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: 700, 
                  color: '#1f2937', 
                  marginBottom: '0.5rem' 
                }}>
                  Phone Number <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="tel" 
                  placeholder="10-digit mobile number" 
                  value={form.phone}
                  onChange={e => { 
                    setForm(p => ({ ...p, phone: e.target.value })); 
                    setErrors(p => ({ ...p, phone: '' })); 
                  }}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    border: errors.phone ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    background: '#f9fafb'
                  }}
                  onFocus={(e) => {
                    if (!errors.phone) e.currentTarget.style.borderColor = '#1e40af';
                    e.currentTarget.style.background = '#fff';
                  }}
                  onBlur={(e) => {
                    if (!errors.phone) e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.background = '#f9fafb';
                  }}
                />
                {errors.phone && (
                  <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.375rem' }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* University and Program - Side by Side */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: 700, 
                    color: '#1f2937', 
                    marginBottom: '0.5rem' 
                  }}>
                    University / Board
                  </label>
                  <input 
                    value={university} 
                    readOnly 
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      background: '#f3f4f6',
                      color: '#6b7280',
                      cursor: 'not-allowed'
                    }}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: 700, 
                    color: '#1f2937', 
                    marginBottom: '0.5rem' 
                  }}>
                    Program
                  </label>
                  <input 
                    value={program} 
                    readOnly 
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '0.875rem',
                      background: '#f3f4f6',
                      color: '#6b7280',
                      cursor: 'not-allowed'
                    }}
                  />
                </div>
              </div>

              {/* Message (Optional) */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: 700, 
                  color: '#1f2937', 
                  marginBottom: '0.5rem' 
                }}>
                  Message (Optional)
                </label>
                <textarea 
                  placeholder="Any additional information..." 
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical',
                    minHeight: '100px',
                    transition: 'all 0.3s',
                    background: '#f9fafb',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#1e40af';
                    e.currentTarget.style.background = '#fff';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.background = '#f9fafb';
                  }}
                />
              </div>

              {status === 'error' && (
                <div style={{
                  padding: '1rem',
                  background: '#fee2e2',
                  border: '1px solid #fecaca',
                  borderRadius: '0.75rem',
                  color: '#991b1b',
                  fontSize: '0.875rem',
                  textAlign: 'center'
                }}>
                  Something went wrong. Please try again.
                </div>
              )}

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem' }}>
                <button 
                  type="button" 
                  onClick={onClose} 
                  style={{
                    flex: 1,
                    padding: '0.875rem 1.5rem',
                    borderRadius: '0.75rem',
                    border: '2px solid #e5e7eb',
                    background: '#fff',
                    color: '#6b7280',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f9fafb';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={status === 'loading'} 
                  style={{
                    flex: 1,
                    padding: '0.875rem 1.5rem',
                    borderRadius: '0.75rem',
                    background: status === 'loading' ? '#93c5fd' : 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    if (status !== 'loading') {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(30, 64, 175, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.3)';
                  }}
                >
                  {status === 'loading' ? 'Submitting...' : 'Submit Enrollment'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
