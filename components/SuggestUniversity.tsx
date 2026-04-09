'use client';
import { useState } from 'react';

const ACCENT = '#4361EE';
const DARK = '#0f172a';

const KNOWN_UNIVERSITIES = [
  'Amrita Vishwa Vidyapeetham', 'Manipal University', 'GLA University',
  'Jain University', 'Chandigarh University', 'LPU', 'Amity University',
  'IGNOU', 'Symbiosis', 'Lovely Professional University', 'Other',
];

const COMMON_COURSES = [
  'MBA', 'MCA', 'BBA', 'BCA', 'B.Com', 'M.Com', 'B.Sc', 'M.Sc',
  'BA', 'MA', 'B.Tech', 'M.Tech', 'LLB', 'LLM', 'Other',
];

interface FormData {
  university: string;
  otherUniversity: string;
  courses: string[];
  otherCourse: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function SuggestUniversity({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>({
    university: '', otherUniversity: '', courses: [],
    otherCourse: '', name: '', email: '', phone: '', message: '',
  });

  const toggleCourse = (c: string) => {
    setForm(f => ({
      ...f,
      courses: f.courses.includes(c) ? f.courses.filter(x => x !== c) : [...f.courses, c],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      name: form.name, email: form.email, phone: form.phone,
      message: `Suggested University: ${form.university === 'Other' ? form.otherUniversity : form.university}\nCourses: ${form.courses.join(', ')}${form.otherCourse ? ', ' + form.otherCourse : ''}\n\n${form.message}`,
      source: 'suggest-university',
    };
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } catch {}
    setSubmitting(false);
    setStep(4);
  };

  const uniName = form.university === 'Other' ? form.otherUniversity : form.university;
  const canNext1 = form.university && (form.university !== 'Other' || form.otherUniversity.trim());
  const canNext2 = form.courses.length > 0;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(4px)', zIndex: 3000 }} />

      {/* Modal */}
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 3001, width: '90%', maxWidth: 480, background: '#fff', borderRadius: 22, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.25)' }}>

        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, #1a1a3e 0%, ${ACCENT} 100%)`, padding: '1.5rem 1.75rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: 'radial-gradient(circle,rgba(255,255,255,0.1) 0%,transparent 70%)', borderRadius: '50%' }} />
          {/* Step dots */}
          <div style={{ display: 'flex', gap: 6, marginBottom: '1rem' }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ height: 4, flex: 1, borderRadius: 2, background: step > s ? '#4ade80' : step === s ? '#fff' : 'rgba(255,255,255,0.25)', transition: 'background .3s' }} />
            ))}
          </div>
          <h2 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 .25rem', letterSpacing: '-0.02em' }}>
            {step === 1 && '🏛️ Suggest a University'}
            {step === 2 && '📚 Courses Offered'}
            {step === 3 && '📋 Your Details'}
            {step === 4 && '✅ Thank You!'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '.8rem', margin: 0 }}>
            {step === 1 && 'Which university would you like to suggest?'}
            {step === 2 && `What courses does ${uniName || 'this university'} offer?`}
            {step === 3 && 'Fill in your contact details'}
            {step === 4 && 'We received your suggestion!'}
          </p>
          <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, width: 28, height: 28, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 7, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem 1.75rem 1.75rem' }}>

          {/* STEP 1 — University */}
          {step === 1 && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', marginBottom: '1rem' }}>
                {KNOWN_UNIVERSITIES.map(u => (
                  <button key={u} onClick={() => setForm(f => ({ ...f, university: u }))}
                    style={{ padding: '10px 12px', borderRadius: 10, border: `2px solid ${form.university === u ? ACCENT : '#e2e8f0'}`, background: form.university === u ? '#eef2ff' : '#f8fafc', color: form.university === u ? ACCENT : '#374151', fontWeight: form.university === u ? 700 : 500, fontSize: '.82rem', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s' }}>
                    {u}
                  </button>
                ))}
              </div>
              {form.university === 'Other' && (
                <input
                  type="text" placeholder="Enter university name"
                  value={form.otherUniversity}
                  onChange={e => setForm(f => ({ ...f, otherUniversity: e.target.value }))}
                  style={{ width: '100%', padding: '10px 13px', borderRadius: 9, border: `1.5px solid ${ACCENT}`, fontSize: '.88rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', marginBottom: '.75rem' }}
                />
              )}
              <button onClick={() => setStep(2)} disabled={!canNext1}
                style={{ width: '100%', padding: '12px', background: canNext1 ? ACCENT : '#e2e8f0', color: canNext1 ? '#fff' : '#94a3b8', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '.9rem', cursor: canNext1 ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>
                Next →
              </button>
            </div>
          )}

          {/* STEP 2 — Courses */}
          {step === 2 && (
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '1rem' }}>
                {COMMON_COURSES.map(c => (
                  <button key={c} onClick={() => toggleCourse(c)}
                    style={{ padding: '7px 14px', borderRadius: 20, border: `2px solid ${form.courses.includes(c) ? ACCENT : '#e2e8f0'}`, background: form.courses.includes(c) ? '#eef2ff' : '#f8fafc', color: form.courses.includes(c) ? ACCENT : '#374151', fontWeight: form.courses.includes(c) ? 700 : 500, fontSize: '.8rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s' }}>
                    {form.courses.includes(c) ? '✓ ' : ''}{c}
                  </button>
                ))}
              </div>
              {form.courses.includes('Other') && (
                <input type="text" placeholder="Specify other courses"
                  value={form.otherCourse}
                  onChange={e => setForm(f => ({ ...f, otherCourse: e.target.value }))}
                  style={{ width: '100%', padding: '10px 13px', borderRadius: 9, border: `1.5px solid ${ACCENT}`, fontSize: '.88rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', marginBottom: '.75rem' }}
                />
              )}
              <div style={{ display: 'flex', gap: '.75rem' }}>
                <button onClick={() => setStep(1)} style={{ padding: '12px 20px', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0', borderRadius: 10, fontWeight: 600, fontSize: '.88rem', cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
                <button onClick={() => setStep(3)} disabled={!canNext2}
                  style={{ flex: 1, padding: '12px', background: canNext2 ? ACCENT : '#e2e8f0', color: canNext2 ? '#fff' : '#94a3b8', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '.9rem', cursor: canNext2 ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Enquiry details */}
          {step === 3 && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
                { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+91 98765 43210', required: false },
              ].map(({ key, label, type, placeholder, required }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: '.76rem', fontWeight: 600, color: '#374151', marginBottom: 4 }}>{label}{required && ' *'}</label>
                  <input type={type} required={required} placeholder={placeholder}
                    value={form[key as keyof FormData] as string}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    style={{ width: '100%', padding: '10px 13px', borderRadius: 9, border: '1.5px solid #e2e8f0', fontSize: '.88rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: '.76rem', fontWeight: 600, color: '#374151', marginBottom: 4 }}>Additional Message</label>
                <textarea placeholder="Any other details about the university or courses..." rows={3}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ width: '100%', padding: '10px 13px', borderRadius: 9, border: '1.5px solid #e2e8f0', fontSize: '.88rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  onFocus={e => (e.target.style.borderColor = ACCENT)}
                  onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
                />
              </div>
              <div style={{ display: 'flex', gap: '.75rem' }}>
                <button type="button" onClick={() => setStep(2)} style={{ padding: '12px 20px', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0', borderRadius: 10, fontWeight: 600, fontSize: '.88rem', cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
                <button type="submit" disabled={submitting}
                  style={{ flex: 1, padding: '12px', background: submitting ? '#94a3b8' : ACCENT, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '.9rem', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: submitting ? 'none' : `0 4px 14px ${ACCENT}40` }}>
                  {submitting ? 'Submitting...' : 'Submit Suggestion'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4 — Success */}
          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '.5rem 0' }}>
              <div style={{ width: 64, height: 64, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: DARK, marginBottom: '.5rem' }}>Suggestion Received!</h3>
              <p style={{ color: '#64748b', fontSize: '.88rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Thanks for suggesting <strong style={{ color: DARK }}>{uniName}</strong>. Our team will review it and get back to you soon.
              </p>
              <button onClick={onClose} style={{ padding: '11px 28px', background: ACCENT, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '.9rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
