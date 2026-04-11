'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const BLANK_OPTION = { value: '', label: '', icon: 'fa-circle', categories: [] as string[], min: '' as string | number, max: '' as string | number };
const BLANK_Q = { question: '', field: '', order: 0, isActive: true, options: [{ ...BLANK_OPTION }] };

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label style={labelStyle}>{label}</label>{children}</div>;
}

const labelStyle: React.CSSProperties = { display: 'block', fontWeight: 600, color: '#334155', fontSize: '0.9rem', marginBottom: '6px' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 14px', border: '2px solid #E2E8F0', borderRadius: '10px', fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' };
const btnStyle = (color: string): React.CSSProperties => ({ padding: '10px 20px', background: color, color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '8px' });
const iconBtn = (color: string): React.CSSProperties => ({ width: '36px', height: '36px', background: color + '22', color, border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' });

const RBL = '#1a237e'; // Royal Blue

interface Suggestion {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
  read?: boolean;
  source?: string;
}

export default function SuggestUniversityAdminPage() {
  const [activeTab, setActiveTab] = useState<'questions' | 'submissions'>('questions');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState<Suggestion | null>(null);
  const [modal, setModal] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const h = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  };

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact', { headers: h() });
      const data = await res.json();
      if (data.success) {
        const filtered = (data.data || []).filter((c: any) =>
          c.message?.includes('Suggested University:') || c.source === 'suggest-university'
        );
        setSuggestions(filtered);
      }
    } catch { showToast('Failed to load submissions', 'error'); }
    finally { setLoading(false); }
  };

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/suggest-university-questions', { headers: h() });
      const data = await res.json();
      setQuestions(Array.isArray(data) ? data : []);
    } catch { showToast('Failed to load questions', 'error'); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (activeTab === 'submissions') loadSubmissions();
    else loadQuestions();
  }, [activeTab]);

  // Question Actions
  const openAdd = () => setModal({ mode: 'add', data: { ...BLANK_Q, options: [{ ...BLANK_OPTION }] } });
  const openEdit = (q: any) => setModal({ mode: 'edit', data: JSON.parse(JSON.stringify(q)) });

  const saveQuestion = async () => {
    const { data, mode } = modal;
    if (!data.question.trim() || !data.field.trim() || data.options.length === 0) {
      showToast('Question, field, and at least one option are required', 'error'); return;
    }
    setSaving(true);
    try {
      const url = mode === 'add' ? '/api/admin/suggest-university-questions' : `/api/admin/suggest-university-questions/${data._id}`;
      const method = mode === 'add' ? 'POST' : 'PUT';
      const cleanOptions = data.options.map((o: any) => ({
        value: o.value, label: o.label, icon: o.icon || 'fa-circle',
        ...(o.categories?.length ? { categories: o.categories } : {}),
        ...(o.min !== '' && o.min !== undefined ? { min: Number(o.min) } : {}),
        ...(o.max !== '' && o.max !== undefined ? { max: Number(o.max) } : {}),
      }));
      const res = await fetch(url, { method, headers: h(), body: JSON.stringify({ ...data, options: cleanOptions }) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      showToast(mode === 'add' ? 'Question added!' : 'Question updated!');
      setModal(null); loadQuestions();
    } catch (err: any) { showToast(err.message || 'Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const deleteQ = async (id: string, question: string) => {
    if (!confirm(`Delete question: "${question}"?`)) return;
    try {
      await fetch(`/api/admin/suggest-university-questions/${id}`, { method: 'DELETE', headers: h() });
      showToast('Question deleted'); loadQuestions();
    } catch { showToast('Delete failed', 'error'); }
  };

  const toggleActive = async (q: any) => {
    try {
      await fetch(`/api/admin/suggest-university-questions/${q._id}`, { method: 'PUT', headers: h(), body: JSON.stringify({ isActive: !q.isActive }) });
      showToast('Status updated'); loadQuestions();
    } catch { showToast('Failed', 'error'); }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Delete this submission?')) return;
    try {
      await fetch(`/api/contact/${id}`, { method: 'DELETE', headers: h() });
      showToast('Deleted');
      setSuggestions(s => s.filter(x => x._id !== id));
      if (selectedSub?._id === id) setSelectedSub(null);
    } catch { showToast('Delete failed', 'error'); }
  };

  const setField = (key: string, val: any) => setModal((m: any) => ({ ...m, data: { ...m.data, [key]: val } }));
  const setOption = (i: number, key: string, val: any) => setModal((m: any) => {
    const opts = [...m.data.options]; opts[i] = { ...opts[i], [key]: val };
    return { ...m, data: { ...m.data, options: opts } };
  });
  const addOption = () => setModal((m: any) => ({ ...m, data: { ...m.data, options: [...m.data.options, { ...BLANK_OPTION }] } }));
  const removeOption = (i: number) => setModal((m: any) => ({ ...m, data: { ...m.data, options: m.data.options.filter((_: any, idx: number) => idx !== i) } }));

  const parseMessage = (msg: string) => {
    const uniMatch = msg.match(/Suggested University: (.+)/);
    const coursesMatch = msg.match(/Courses: (.+)/);
    const extraMatch = msg.split('\n\n')[1];
    return {
      university: uniMatch?.[1] || '—',
      courses: coursesMatch?.[1] || '—',
      extra: extraMatch?.trim() || '',
    };
  };

  return (
    <div style={{ padding: 'clamp(1rem, 4vw, 2.5rem)', background: '#f8fafc', minHeight: '100vh' }}>
      {toast && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 99999, padding: '14px 22px', borderRadius: '12px', background: toast.type === 'error' ? '#DC2626' : '#16A34A', color: '#fff', fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', fontSize: '0.95rem' }}>
          {toast.msg}
        </div>
      )}

      {/* Header & Tabs */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ margin: '0 0 6px', fontSize: '1.3rem', fontWeight: 500, color: '#0F172A' }}>🏛️ Suggest University</h1>
            <p style={{ margin: 0, color: '#64748B', fontSize: '0.9rem' }}>Manage questions and view user suggestions.</p>
          </div>
          <div style={{ display: 'flex', background: '#f1f5f9', padding: '5px', borderRadius: '12px', gap: '5px' }}>
            <button 
              onClick={() => setActiveTab('questions')}
              style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: activeTab === 'questions' ? '#fff' : 'transparent', color: activeTab === 'questions' ? RBL : '#64748b', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', boxShadow: activeTab === 'questions' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s' }}>
              Questions
            </button>
            <button 
              onClick={() => setActiveTab('submissions')}
              style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: activeTab === 'submissions' ? '#fff' : 'transparent', color: activeTab === 'submissions' ? RBL : '#64748b', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', boxShadow: activeTab === 'submissions' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s' }}>
              Submissions
            </button>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {activeTab === 'questions' ? (
              <button onClick={openAdd} style={btnStyle(RBL)}>+ Add Question</button>
            ) : (
              <button onClick={loadSubmissions} style={btnStyle('#64748b')}>↻ Refresh</button>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748B' }}>Loading {activeTab}...</div>
      ) : activeTab === 'questions' ? (
        /* QUESTIONS VIEW */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {questions.length === 0 ? (
            <div style={{ background: '#fff', borderRadius: '16px', padding: '60px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: '#334155', margin: '0 0 10px' }}>No questions yet</h3>
              <p style={{ color: '#64748B', margin: '0 0 20px' }}>Click "+ Add Question" to get started.</p>
            </div>
          ) : (
            questions.map((q, idx) => (
              <div key={q._id} style={{ background: '#fff', borderRadius: '16px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: `4px solid ${q.isActive ? RBL : '#CBD5E1'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <span style={{ background: '#EFF6FF', color: RBL, padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500 }}>Q{idx + 1}</span>
                      <span style={{ background: '#F1F5F9', color: '#64748B', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>field: {q.field}</span>
                      <span style={{ background: '#F1F5F9', color: '#64748B', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>order: {q.order}</span>
                      <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: q.isActive ? '#DCFCE7' : '#FEE2E2', color: q.isActive ? '#16A34A' : '#DC2626' }}>{q.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                    <h3 style={{ margin: '0 0 12px', fontSize: '1.1rem', color: '#0F172A' }}>{q.question}</h3>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {q.options.map((o: any) => (
                        <span key={o.value} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', color: '#334155' }}>{o.label}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button onClick={() => toggleActive(q)} style={iconBtn(q.isActive ? '#D97706' : '#16A34A')} title={q.isActive ? 'Deactivate' : 'Activate'}>{q.isActive ? '⊘' : '✓'}</button>
                    <button onClick={() => openEdit(q)} style={iconBtn('#3B82F6')} title="Edit">✎</button>
                    <button onClick={() => deleteQ(q._id, q.question)} style={iconBtn('#DC2626')} title="Delete">✕</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* SUBMISSIONS VIEW */
        <div style={{ display: 'grid', gridTemplateColumns: selectedSub ? '1fr 380px' : '1fr', gap: '20px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {suggestions.length === 0 ? (
              <div style={{ background: '#fff', borderRadius: '16px', padding: '60px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏛️</div>
                <h3 style={{ color: '#334155', margin: '0 0 10px' }}>No submissions yet</h3>
              </div>
            ) : (
              suggestions.map(s => {
                const parsed = parseMessage(s.message);
                return (
                  <div key={s._id}
                    onClick={() => setSelectedSub(selectedSub?._id === s._id ? null : s)}
                    style={{ background: '#fff', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', cursor: 'pointer', borderLeft: `4px solid ${selectedSub?._id === s._id ? '#4361EE' : '#e2e8f0'}`, transition: 'all .2s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                          <span style={{ background: '#EFF6FF', color: RBL, padding: '3px 10px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600 }}>🏛️ {parsed.university}</span>
                          <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{new Date(s.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.95rem', marginBottom: 4 }}>{s.name}</div>
                        <div style={{ color: '#64748b', fontSize: '0.82rem', marginBottom: 6 }}>{s.email}{s.phone ? ` · ${s.phone}` : ''}</div>
                        <div style={{ color: '#475569', fontSize: '0.82rem', background: '#f8fafc', padding: '6px 10px', borderRadius: 8 }}>
                          <span style={{ fontWeight: 600 }}>Courses: </span>{parsed.courses}
                        </div>
                      </div>
                      <button onClick={e => { e.stopPropagation(); deleteSubmission(s._id); }} style={iconBtn('#DC2626')} title="Delete">✕</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {selectedSub && (() => {
            const parsed = parseMessage(selectedSub.message);
            return (
              <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', position: 'sticky', top: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500, color: '#0f172a' }}>Submission Details</h3>
                  <button onClick={() => setSelectedSub(null)} style={{ background: '#f1f5f9', border: 'none', width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', color: '#64748b', fontSize: '0.9rem' }}>✕</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { label: 'Name', value: selectedSub.name },
                    { label: 'Email', value: selectedSub.email },
                    { label: 'Phone', value: selectedSub.phone || '—' },
                    { label: 'Suggested University', value: parsed.university },
                    { label: 'Courses', value: parsed.courses },
                    { label: 'Submitted', value: new Date(selectedSub.createdAt).toLocaleString('en-IN') },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{label}</div>
                      <div style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: label === 'Suggested University' ? 600 : 400 }}>{value}</div>
                    </div>
                  ))}
                  {parsed.extra && (
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Additional Message</div>
                      <div style={{ fontSize: '0.88rem', color: '#475569', background: '#f8fafc', padding: '10px 12px', borderRadius: 8, lineHeight: 1.6 }}>{parsed.extra}</div>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <a href={`mailto:${selectedSub.email}`} style={{ ...btnStyle(RBL), flex: 1, justifyContent: 'center', textDecoration: 'none', fontSize: '0.85rem' }}>✉ Reply</a>
                    <button onClick={() => deleteSubmission(selectedSub._id)} style={{ ...btnStyle('#DC2626'), fontSize: '0.85rem' }}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* QUESTION MODAL */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflow: 'auto', padding: '35px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 500, color: '#0F172A' }}>{modal.mode === 'add' ? 'Add New Question' : 'Edit Question'}</h2>
              <button onClick={() => setModal(null)} style={{ background: '#F1F5F9', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', color: '#64748B' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <FormField label="Question Text *">
                <input value={modal.data.question} onChange={e => setField('question', e.target.value)} placeholder="e.g. What is your highest education qualification?" style={inputStyle} />
              </FormField>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                <FormField label="Field Name *">
                  <input value={modal.data.field} onChange={e => setField('field', e.target.value)} placeholder="e.g. education" style={inputStyle} />
                </FormField>
                <FormField label="Order">
                  <input type="number" value={modal.data.order} onChange={e => setField('order', Number(e.target.value))} style={inputStyle} />
                </FormField>
                <FormField label="Status">
                  <select value={String(modal.data.isActive)} onChange={e => setField('isActive', e.target.value === 'true')} style={inputStyle}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </FormField>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <label style={labelStyle}>Options *</label>
                  <button onClick={addOption} style={{ ...btnStyle('#10B981'), padding: '6px 14px', fontSize: '0.85rem' }}>+ Add Option</button>
                </div>
                {modal.data.options.map((opt: any, i: number) => (
                  <div key={i} style={{ background: '#F8FAFC', borderRadius: '12px', padding: '15px', marginBottom: '10px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontWeight: 600, color: '#64748B', fontSize: '0.85rem' }}>Option {i + 1}</span>
                      {modal.data.options.length > 1 && (
                        <button onClick={() => removeOption(i)} style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '8px', padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>Remove</button>
                      )}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                      <div><label style={{ ...labelStyle, fontSize: '0.8rem' }}>Value *</label><input value={opt.value} onChange={e => setOption(i, 'value', e.target.value)} placeholder="e.g. graduate" style={{ ...inputStyle, padding: '8px 12px' }} /></div>
                      <div><label style={{ ...labelStyle, fontSize: '0.8rem' }}>Label *</label><input value={opt.label} onChange={e => setOption(i, 'label', e.target.value)} placeholder="e.g. Graduate" style={{ ...inputStyle, padding: '8px 12px' }} /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                      <div><label style={{ ...labelStyle, fontSize: '0.8rem' }}>FA Icon</label><input value={opt.icon} onChange={e => setOption(i, 'icon', e.target.value)} placeholder="fa-graduation-cap" style={{ ...inputStyle, padding: '8px 12px' }} /></div>
                      <div><label style={{ ...labelStyle, fontSize: '0.8rem' }}>Min Fee</label><input type="number" value={opt.min ?? ''} onChange={e => setOption(i, 'min', e.target.value)} placeholder="50000" style={{ ...inputStyle, padding: '8px 12px' }} /></div>
                      <div><label style={{ ...labelStyle, fontSize: '0.8rem' }}>Max Fee</label><input type="number" value={opt.max ?? ''} onChange={e => setOption(i, 'max', e.target.value)} placeholder="100000" style={{ ...inputStyle, padding: '8px 12px' }} /></div>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ ...labelStyle, fontSize: '0.8rem' }}>Categories (comma-separated)</label>
                      <input value={Array.isArray(opt.categories) ? opt.categories.join(', ') : ''} onChange={e => setOption(i, 'categories', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))} placeholder="MBA, BBA" style={{ ...inputStyle, padding: '8px 12px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
              <button onClick={() => setModal(null)} style={{ padding: '12px 24px', background: '#F1F5F9', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit', color: '#64748B' }}>Cancel</button>
              <button onClick={saveQuestion} disabled={saving} style={{ ...btnStyle(RBL), padding: '12px 28px', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Saving...' : modal.mode === 'add' ? 'Add Question' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
