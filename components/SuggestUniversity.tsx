'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const ACCENT = '#4361EE';
const DARK = '#0f172a';

export default function SuggestUniversity({ onClose }: { onClose: () => void }) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loadingQ, setLoadingQ] = useState(true);
  const [step, setStep] = useState(0); // 0=loading, 1..n=questions, n+1=results, n+2=lead form, n+3=success
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<any[]>([]);
  const [fallback, setFallback] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [animate, setAnimate] = useState(true);

  // Lead form state
  const [lead, setLead] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);

  // Fetch questions from public API
  useEffect(() => {
    fetch('/api/public/suggest-university-questions')
      .then(r => r.json())
      .then(data => {
        const qs = Array.isArray(data) && data.length > 0 ? data : [];
        setQuestions(qs);
        setStep(qs.length > 0 ? 1 : -1);
      })
      .catch(() => setStep(-1))
      .finally(() => setLoadingQ(false));
  }, []);

  const currentQ = questions[step - 1];
  const isLastQ = step === questions.length;
  const resultsStep = questions.length + 1;
  const leadStep = questions.length + 2;
  const successStep = questions.length + 3;

  const handleOption = (field: string, value: string) => {
    const newAnswers = { ...answers, [field]: value };
    setAnswers(newAnswers);

    if (isLastQ) {
      // Last question answered – find matching universities
      findUniversities(newAnswers);
    } else {
      setAnimate(false);
      setTimeout(() => { setStep(s => s + 1); setAnimate(true); }, 220);
    }
  };

  const findUniversities = async (ans: Record<string, string>) => {
    setSearching(true);
    setStep(resultsStep);
    try {
      const [uniRes, progRes] = await Promise.all([
        fetch('/api/universities'),
        fetch('/api/public/programs'),
      ]);
      const uniData = await uniRes.json();
      const progData = await progRes.json();
      const universities: any[] = uniData?.data || uniData || [];
      const programs: any[] = Array.isArray(progData) ? progData : progData?.data || [];

      // All selected option labels from answers
      const selectedLabels = questions
        .map(q => q.options.find((o: any) => o.value === ans[q.field])?.label || '')
        .filter(Boolean)
        .map((l: string) => l.toLowerCase().replace(/[\s.\-]/g, ''));

      // Attach programs to each university
      const uniWithPrograms = universities.map((u: any) => {
        const uNameNS = (u.name || '').toLowerCase().replace(/[\s.\-]/g, '');
        const uProgs = programs.filter((p: any) => {
          const pUni = (p.university || '').toLowerCase().replace(/[\s.\-]/g, '');
          return pUni && (pUni.includes(uNameNS) || uNameNS.includes(pUni));
        });
        return { ...u, _programs: uProgs };
      });

      // EXACT match: any selected label matches the university name or any of its program names
      const matched = uniWithPrograms.filter(u => {
        const uNameNS = (u.name || '').toLowerCase().replace(/[\s.\-]/g, '');
        const progNames = u._programs.map((p: any) => (p.name || '').toLowerCase().replace(/[\s.\-]/g, ''));
        return selectedLabels.some(label =>
          uNameNS.includes(label) || label.includes(uNameNS) ||
          progNames.some((pn: string) => pn.includes(label) || label.includes(pn))
        );
      });

      if (matched.length > 0) {
        setResults(matched.slice(0, 4));
        setFallback([]);
      } else {
        // Fallback: similar = universities that have any programs at all
        const similar = uniWithPrograms
          .filter(u => u._programs.length > 0)
          .slice(0, 4);
        setResults([]);
        setFallback(similar);
      }
    } catch {
      setResults([]);
      setFallback([]);
    } finally {
      setSearching(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const formattedAnswers = questions.map(q => {
      const opt = q.options.find((o: any) => o.value === answers[q.field]);
      return opt ? `${q.question}: ${opt.label}` : '';
    }).filter(Boolean).join(' | ');
    const matchedNames = [...results, ...fallback].map((u: any) => u.name).join(', ');
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          phone: lead.phone || 'N/A',
          source: 'Suggest University Quiz',
          course: `Matched: ${matchedNames || 'None'} | Prefs: ${formattedAnswers}`,
        }),
      });
    } catch {}
    setSubmitting(false);
    setStep(successStep);
  };

  const goBack = () => {
    setAnimate(false);
    setTimeout(() => { setStep(s => s - 1); setAnimate(true); }, 150);
  };

  const totalSteps = questions.length;
  const progressPct = totalSteps > 0 ? Math.min((step / totalSteps) * 100, 100) : 0;

  // ── RENDER ──
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(4px)', zIndex: 3000 }} />

      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 3001, width: '92%', maxWidth: 500, background: '#fff', borderRadius: 22, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.25)', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, #1a1a3e 0%, ${ACCENT} 100%)`, padding: '1.35rem 1.6rem 1.1rem', position: 'relative', flexShrink: 0 }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, width: 28, height: 28, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 7, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <h2 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, margin: '0 0 .2rem', letterSpacing: '-0.02em' }}>
            {step <= totalSteps && step > 0 && '🏛️ Find Your University'}
            {step === resultsStep && '🎯 Matched Universities'}
            {step === leadStep && '📋 Get Personalised Help'}
            {step === successStep && '✅ Request Received!'}
            {step === -1 && '⚙️ Quiz Not Configured'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '.78rem', margin: 0 }}>
            {step <= totalSteps && step > 0 && `Question ${step} of ${totalSteps}`}
            {step === resultsStep && 'Universities matched to your preferences'}
            {step === leadStep && 'Our counsellors will reach out personally'}
            {step === successStep && 'We will contact you shortly!'}
          </p>
          {/* Progress bar */}
          {step > 0 && step <= totalSteps && (
            <div style={{ marginTop: '0.75rem', height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progressPct}%`, background: '#fff', borderRadius: 2, transition: 'width 0.4s ease' }} />
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem 1.6rem 1.6rem', overflowY: 'auto', flex: 1 }}>

          {/* Loading questions */}
          {loadingQ && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b', fontSize: '.9rem' }}>Loading questions...</div>
          )}

          {/* No questions configured */}
          {step === -1 && (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: '#64748b' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⚙️</div>
              <p style={{ margin: 0 }}>No quiz questions configured yet. Please ask an admin to set up the Suggest University questions.</p>
            </div>
          )}

          {/* Quiz questions */}
          {step > 0 && step <= totalSteps && currentQ && (
            <div key={step} style={{ animation: animate ? 'suFadeIn 0.3s ease' : 'none' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: DARK, marginBottom: '1rem', lineHeight: 1.4 }}>{currentQ.question}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {currentQ.options.map((opt: any, i: number) => {
                  const selected = answers[currentQ.field] === opt.value;
                  return (
                    <button key={i} onClick={() => handleOption(currentQ.field, opt.value)}
                      style={{ padding: '11px 15px', borderRadius: 10, border: `2px solid ${selected ? ACCENT : '#e2e8f0'}`, background: selected ? '#eef2ff' : '#f8fafc', color: selected ? ACCENT : '#374151', fontWeight: selected ? 700 : 500, fontSize: '.88rem', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s', display: 'flex', alignItems: 'center', gap: 8 }}>
                      {selected && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              {step > 1 && (
                <button onClick={goBack} style={{ padding: '10px 20px', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0', borderRadius: 10, fontWeight: 600, fontSize: '.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
              )}
            </div>
          )}

          {/* Results */}
          {step === resultsStep && (
            <div>
              {searching ? (
                <div style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                  <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTopColor: ACCENT, borderRadius: '50%', animation: 'suSpin 0.8s linear infinite', margin: '0 auto 1rem' }} />
                  <p style={{ margin: 0, fontSize: '.9rem' }}>Finding the best universities for you...</p>
                </div>
              ) : (
                <>
                  {results.length > 0 ? (
                    <>
                      <p style={{ color: '#64748b', fontSize: '.85rem', marginBottom: '1rem', marginTop: 0 }}>We found <strong style={{ color: DARK }}>{results.length}</strong> universities matching your preferences:</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                        {results.map((u: any, i: number) => (
                          <div key={i} style={{ padding: '12px 14px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                            {u.logo ? (
                              <img src={u.logo} alt={u.name} style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 6, flexShrink: 0, background: '#fff', border: '1px solid #e2e8f0' }} />
                            ) : (
                              <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, #1a1a3e, ${ACCENT})`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>🏛️</div>
                            )}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 600, fontSize: '.88rem', color: DARK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
                              {u.location && <div style={{ fontSize: '.75rem', color: '#64748b' }}>{u.location}</div>}
                            </div>
                            <Link href={`/universities/${u.slug || u._id}`} onClick={onClose} style={{ padding: '6px 12px', background: ACCENT, color: '#fff', borderRadius: 8, fontSize: '.75rem', fontWeight: 600, textDecoration: 'none', flexShrink: 0 }}>View →</Link>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : fallback.length > 0 ? (
                    <>
                      <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10, padding: '10px 14px', marginBottom: '1rem', fontSize: '.82rem', color: '#92400e' }}>
                        No exact match found for your preferences. Here are universities that may offer related courses:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                        {fallback.map((u: any, i: number) => (
                          <div key={i} style={{ padding: '12px 14px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                            {u.logo ? (
                              <img src={u.logo} alt={u.name} style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 6, flexShrink: 0, background: '#fff', border: '1px solid #e2e8f0' }} />
                            ) : (
                              <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, #1a1a3e, ${ACCENT})`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>🏛️</div>
                            )}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 600, fontSize: '.88rem', color: DARK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
                              {u.location && <div style={{ fontSize: '.75rem', color: '#64748b' }}>{u.location}</div>}
                            </div>
                            <Link href={`/universities/${u.slug || u._id}`} onClick={onClose} style={{ padding: '6px 12px', background: ACCENT, color: '#fff', borderRadius: 8, fontSize: '.75rem', fontWeight: 600, textDecoration: 'none', flexShrink: 0 }}>View →</Link>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '1.5rem 0', color: '#64748b', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
                      <p style={{ margin: 0, fontSize: '.9rem' }}>No universities found for your preferences right now. Our counsellors can help!</p>
                    </div>
                  )}

                  <button onClick={() => setStep(leadStep)}
                    style={{ width: '100%', padding: '13px', background: ACCENT, color: '#fff', border: 'none', borderRadius: 11, fontWeight: 600, fontSize: '.9rem', cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 4px 16px ${ACCENT}40` }}>
                    Get Personalised Counselling →
                  </button>
                </>
              )}
            </div>
          )}

          {/* Lead form */}
          {step === leadStep && (
            <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
              <p style={{ margin: '0 0 .5rem', color: '#64748b', fontSize: '.85rem' }}>Fill in your details and our counsellors will reach out with personalised university recommendations.</p>
              {[
                { key: 'name', label: 'Full Name *', type: 'text', placeholder: 'Your full name', required: true },
                { key: 'email', label: 'Email *', type: 'email', placeholder: 'you@example.com', required: true },
                { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+91 98765 43210', required: false },
              ].map(({ key, label, type, placeholder, required }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: '.76rem', fontWeight: 600, color: '#374151', marginBottom: 4 }}>{label}</label>
                  <input type={type} required={required} placeholder={placeholder}
                    value={lead[key as keyof typeof lead]}
                    onChange={e => setLead(l => ({ ...l, [key]: e.target.value }))}
                    style={{ width: '100%', padding: '10px 13px', borderRadius: 9, border: '1.5px solid #e2e8f0', fontSize: '.88rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => (e.target.style.borderColor = ACCENT)}
                    onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', gap: '.75rem', marginTop: '.25rem' }}>
                <button type="button" onClick={() => setStep(resultsStep)} style={{ padding: '11px 18px', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0', borderRadius: 10, fontWeight: 600, fontSize: '.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
                <button type="submit" disabled={submitting}
                  style={{ flex: 1, padding: '12px', background: submitting ? '#94a3b8' : ACCENT, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: '.9rem', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: submitting ? 'none' : `0 4px 14px ${ACCENT}40` }}>
                  {submitting ? 'Submitting...' : 'Request Counselling'}
                </button>
              </div>
            </form>
          )}

          {/* Success */}
          {step === successStep && (
            <div style={{ textAlign: 'center', padding: '.75rem 0' }}>
              <div style={{ width: 68, height: 68, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: DARK, marginBottom: '.5rem' }}>You're all set, {lead.name?.split(' ')[0] || 'there'}!</h3>
              <p style={{ color: '#64748b', fontSize: '.88rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Our counselling team will contact you at <strong style={{ color: DARK }}>{lead.email}</strong> within 24 hours with personalised university recommendations.
              </p>
              <button onClick={onClose} style={{ padding: '11px 32px', background: ACCENT, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: '.9rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                Done
              </button>
            </div>
          )}
        </div>

        <style>{`
          @keyframes suFadeIn { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes suSpin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </>
  );
}
