'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Building, Award, MapPin, DollarSign, Search, BookOpen, Globe, Mail, Phone, GraduationCap } from '@/components/Icon';

interface Program { name: string; duration: string; description: string; }

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #e2e8f0',
  borderRadius: '8px', fontSize: '0.95rem', outline: 'none',
  background: '#fff', color: '#1e293b', boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: '0.4rem', fontWeight: 600,
  color: '#374151', fontSize: '0.875rem',
};
const sectionStyle: React.CSSProperties = {
  background: '#fff', borderRadius: '12px', padding: '2rem',
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: '1.5rem',
  border: '1px solid #f1f5f9',
};
const grid2: React.CSSProperties = {
  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #1e40af, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>{title}</div>
        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{subtitle}</div>
      </div>
    </div>
  );
}

function Field({ label, name, type = 'text', placeholder = '', required = false, hint = '', value, onChange }: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean; hint?: string;
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}{required && <span style={{ color: '#ef4444' }}> *</span>}</label>
      <input type={type} name={name} value={value} onChange={e => onChange(e.target.value)}
        required={required} placeholder={placeholder} style={inputStyle} />
      {hint && <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>{hint}</p>}
    </div>
  );
}

export default function CreateUniversity() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', slug: '', type: 'Private', established: '',
    ranking: '', naac: 'A++', ugcApproved: true, aicteApproved: false,
    city: '', state: '', location: '',
    minFee: '', maxFee: '',
    metaTitle: '', metaDescription: '', keywords: '', canonicalUrl: '', robotsMeta: 'Index, Follow',
    ogTitle: '', ogImageUrl: '', ogDescription: '',
    description: '', highlights: '', facilities: '',
    logoUrl: '', bannerUrl: '',
    website: '', email: '', phone: '',
    featured: false, active: true,
    logoInitial: '', accreditation: '', image: '',
  });
  const [programs, setPrograms] = useState<Program[]>([{ name: '', duration: '', description: '' }]);

  const set = (field: string, value: string | boolean) => setForm(p => ({ ...p, [field]: value }));

  const handleName = (v: string) => {
    const slug = v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setForm(p => ({ ...p, name: v, slug, logoInitial: v[0]?.toUpperCase() || '' }));
  };

  const handleProgramChange = (i: number, f: keyof Program, v: string) => {
    const p = [...programs]; p[i][f] = v; setPrograms(p);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        name: form.name, slug: form.slug,
        logoInitial: form.logoInitial || form.name[0]?.toUpperCase(),
        accreditation: `UGC Approved | NAAC ${form.naac}`,
        naac: `NAAC ${form.naac}`,
        location: form.location || `${form.city}, ${form.state}`,
        description: form.description,
        facilities: form.facilities.split(',').map(s => s.trim()).filter(Boolean),
        ranking: form.ranking, image: form.bannerUrl || form.logoUrl || '',
        programs: programs.filter(p => p.name.trim()),
        type: form.type, established: form.established,
        ugcApproved: form.ugcApproved, aicteApproved: form.aicteApproved,
        city: form.city, state: form.state,
        minFee: form.minFee, maxFee: form.maxFee,
        metaTitle: form.metaTitle, metaDescription: form.metaDescription,
        keywords: form.keywords, website: form.website,
        email: form.email, phone: form.phone,
        featured: form.featured, active: form.active,
        highlights: form.highlights.split(',').map(s => s.trim()).filter(Boolean),
      };
      const res = await fetch('/api/universities', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) { router.push('/admin/universities'); }
      else { const err = await res.json(); alert(err.error || 'Failed'); }
    } catch { alert('Error creating university'); }
    finally { setLoading(false); }
  };


  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ background: 'linear-gradient(135deg, #1e40af, #1e3a8a)', padding: '1.5rem 2rem', color: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Link href="/admin/universities" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#fff', textDecoration: 'none', opacity: 0.85, marginBottom: '0.75rem', fontSize: '0.9rem' }}>
            <ArrowLeft size={18} /> Back to Universities
          </Link>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900 }}>Create New University</h1>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <form onSubmit={handleSubmit}>

          {/* BASIC INFORMATION */}
          <div style={sectionStyle}>
            <SectionHeader icon={<Building size={20} color="#fff" />} title="Basic Information" subtitle="Enter the basic details of the university" />
            <div style={grid2}>
              <div>
                <label style={labelStyle}>University Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input style={inputStyle} value={form.name} onChange={e => handleName(e.target.value)} required placeholder="e.g., Amity University" />
              </div>
              <div>
                <label style={labelStyle}>Slug <span style={{ color: '#ef4444' }}>*</span></label>
                <input style={inputStyle} value={form.slug} onChange={e => set('slug', e.target.value)} required placeholder="amity-university" />
                {form.slug && <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>Used in URL: /universities/{form.slug}</p>}
              </div>
              <div>
                <label style={labelStyle}>University Type</label>
                <select value={form.type} onChange={e => set('type', e.target.value)} style={{ ...inputStyle }}>
                  <option>Private</option><option>Public</option><option>Deemed</option><option>Central</option>
                </select>
              </div>
              <Field label="Established Year" name="established" placeholder="e.g., 2003" value={form.established} onChange={v => set('established', v)} />
            </div>
          </div>

          {/* RATINGS & APPROVALS */}
          <div style={sectionStyle}>
            <SectionHeader icon={<Award size={20} color="#fff" />} title="Ratings & Approvals" subtitle="Add accreditation and approval details" />
            <div style={grid2}>
              <div>
                <label style={labelStyle}>Rating / Ranking</label>
                <select value={form.ranking} onChange={e => set('ranking', e.target.value)} style={{ ...inputStyle }}>
                  <option value="">Select</option>
                  {['A++', 'A+', 'A', 'B++', 'B+', 'B'].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>NAAC Grade</label>
                <select value={form.naac} onChange={e => set('naac', e.target.value)} style={{ ...inputStyle }}>
                  {['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C'].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem' }}>
              {[['ugcApproved', 'UGC Approved'], ['aicteApproved', 'AICTE Approved']].map(([k, lbl]) => (
                <label key={k} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 500, color: '#374151', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={(form as unknown as Record<string, boolean>)[k]}
                    onChange={e => set(k, e.target.checked)} style={{ width: 16, height: 16, accentColor: '#1e40af' }} />
                  {lbl}
                </label>
              ))}
            </div>
          </div>

          {/* LOCATION */}
          <div style={sectionStyle}>
            <SectionHeader icon={<MapPin size={20} color="#fff" />} title="Location" subtitle="Specify the university location" />
            <div style={grid2}>
              <Field label="City" name="city" placeholder="Noida" required value={form.city} onChange={v => set('city', v)} />
              <Field label="State" name="state" placeholder="Uttar Pradesh" value={form.state} onChange={v => set('state', v)} />
            </div>
            <div style={{ marginTop: '1.25rem' }}>
              <label style={labelStyle}>Full Location / Address</label>
              <input style={inputStyle} value={form.location} onChange={e => set('location', e.target.value)} placeholder="Sector 125, Noida, Uttar Pradesh" />
            </div>
          </div>

          {/* FEE STRUCTURE */}
          <div style={sectionStyle}>
            <SectionHeader icon={<DollarSign size={20} color="#fff" />} title="Fee Structure" subtitle="Set the fee range for programs" />
            <div style={grid2}>
              <div>
                <label style={labelStyle}>Minimum Fee (₹)</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.9rem' }}>₹</span>
                  <input style={{ ...inputStyle, paddingLeft: '1.75rem' }} type="number" value={form.minFee} onChange={e => set('minFee', e.target.value)} placeholder="50000" />
                </div>
                {form.minFee && <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>₹{Number(form.minFee).toLocaleString('en-IN')}</p>}
              </div>
              <div>
                <label style={labelStyle}>Maximum Fee (₹)</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.9rem' }}>₹</span>
                  <input style={{ ...inputStyle, paddingLeft: '1.75rem' }} type="number" value={form.maxFee} onChange={e => set('maxFee', e.target.value)} placeholder="499999" />
                </div>
                {form.maxFee && <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>₹{Number(form.maxFee).toLocaleString('en-IN')}</p>}
              </div>
            </div>
          </div>

          {/* SEO */}
          <div style={sectionStyle}>
            <SectionHeader icon={<Search size={20} color="#fff" />} title="SEO & Social Sharing" subtitle="Optimize for search engines and social media" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Meta Title</label>
                <input style={inputStyle} value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)} placeholder="Best Private University" maxLength={60} />
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>{form.metaTitle.length}/60 characters</p>
              </div>
              <div>
                <label style={labelStyle}>Meta Description</label>
                <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} value={form.metaDescription} onChange={e => set('metaDescription', e.target.value)} placeholder="Brief description for search results..." maxLength={160} />
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>{form.metaDescription.length}/160 characters</p>
              </div>
              <Field label="Keywords" name="keywords" placeholder="university,admission,courses" hint="Comma separated keywords" value={form.keywords} onChange={v => set('keywords', v)} />
              <div style={grid2}>
                <Field label="Canonical URL" name="canonicalUrl" placeholder="https://example.com/university/slug" value={form.canonicalUrl} onChange={v => set('canonicalUrl', v)} />
                <div>
                  <label style={labelStyle}>Robots Meta</label>
                  <select value={form.robotsMeta} onChange={e => set('robotsMeta', e.target.value)} style={{ ...inputStyle }}>
                    <option>Index, Follow</option><option>NoIndex, Follow</option><option>Index, NoFollow</option><option>NoIndex, NoFollow</option>
                  </select>
                </div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: 8, padding: '1.25rem', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 600, color: '#374151', marginBottom: '1rem', fontSize: '0.9rem' }}>Open Graph (Social Sharing)</div>
                <div style={grid2}>
                  <Field label="OG Title" name="ogTitle" placeholder="Title for Facebook/Twitter" value={form.ogTitle} onChange={v => set('ogTitle', v)} />
                  <Field label="OG Image URL" name="ogImageUrl" placeholder="Image URL for social preview" value={form.ogImageUrl} onChange={v => set('ogImageUrl', v)} />
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <label style={labelStyle}>OG Description</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={form.ogDescription} onChange={e => set('ogDescription', e.target.value)} placeholder="Description for social sharing..." />
                </div>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div style={sectionStyle}>
            <SectionHeader icon={<BookOpen size={20} color="#fff" />} title="Description" subtitle="Provide detailed information about the university" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>About University</label>
                <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={5} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Write a detailed description about the university, its history, achievements, and what makes it unique..." maxLength={1000} />
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>{form.description.length}/1000 characters</p>
              </div>
              <div>
                <label style={labelStyle}>Highlights (comma separated)</label>
                <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} value={form.highlights} onChange={e => set('highlights', e.target.value)} placeholder="100% Placement Assistance, Industry Partnerships, Flexible Learning, Expert Faculty" />
              </div>
              <div>
                <label style={labelStyle}>Facilities (comma separated)</label>
                <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} value={form.facilities} onChange={e => set('facilities', e.target.value)} placeholder="Digital Library, Online Labs, Student Portal, Career Services, Alumni Network" />
              </div>
            </div>
          </div>

          {/* MEDIA */}
          <div style={sectionStyle}>
            <SectionHeader icon={<Globe size={20} color="#fff" />} title="Media" subtitle="Add logo and banner image URLs" />
            <div style={grid2}>
              <div>
                <label style={labelStyle}>Logo Image URL</label>
                <input style={inputStyle} value={form.logoUrl} onChange={e => set('logoUrl', e.target.value)} placeholder="https://example.com/logo.png" />
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>Recommended: Square image (200x200px)</p>
              </div>
              <div>
                <label style={labelStyle}>Banner Image URL</label>
                <input style={inputStyle} value={form.bannerUrl} onChange={e => set('bannerUrl', e.target.value)} placeholder="https://example.com/banner.jpg" />
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>Recommended: Wide image (1200x400px)</p>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div style={sectionStyle}>
            <SectionHeader icon={<Phone size={20} color="#fff" />} title="Contact Information" subtitle="Add contact details for the university" />
            <div style={grid2}>
              <div>
                <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Globe size={14} color="#64748b" /> Website
                </label>
                <input style={inputStyle} value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://www.university.edu" />
              </div>
              <div>
                <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Mail size={14} color="#64748b" /> Email
                </label>
                <input style={inputStyle} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="admissions@university.edu" />
              </div>
            </div>
            <div style={{ marginTop: '1.25rem', maxWidth: 320 }}>
              <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Phone size={14} color="#64748b" /> Phone
              </label>
              <input style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 73560 04410" />
            </div>
          </div>

          {/* SETTINGS */}
          <div style={sectionStyle}>
            <SectionHeader icon={<Award size={20} color="#fff" />} title="Settings" subtitle="Configure visibility and featured status" />
            <div style={grid2}>
              {[['featured', 'Featured University', 'Display on homepage and featured sections'], ['active', 'Active', 'University is visible to students']].map(([k, lbl, desc]) => (
                <label key={k} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: 10, border: `2px solid ${(form as unknown as Record<string, boolean>)[k] ? '#bfdbfe' : '#e2e8f0'}`, background: (form as unknown as Record<string, boolean>)[k] ? '#eff6ff' : '#f8fafc', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <input type="checkbox" checked={(form as unknown as Record<string, boolean>)[k]} onChange={e => set(k, e.target.checked)} style={{ width: 18, height: 18, accentColor: '#1e40af' }} />
                  <div>
                    <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9rem' }}>{lbl}</div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* PROGRAMS */}
          <div style={sectionStyle}>
            <SectionHeader icon={<GraduationCap size={20} color="#fff" />} title="Programs Offered" subtitle="Add the programs offered by this university" />
            {programs.map((prog, i) => (
              <div key={i} style={{ background: '#f8fafc', borderRadius: 10, padding: '1.25rem', marginBottom: '1rem', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 600, color: '#374151', fontSize: '0.9rem' }}>Program {i + 1}</span>
                  {programs.length > 1 && (
                    <button type="button" onClick={() => setPrograms(programs.filter((_, j) => j !== i))} style={{ padding: '0.4rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 6, cursor: 'pointer', display: 'flex' }}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div style={grid2}>
                  <div>
                    <label style={labelStyle}>Program Name <span style={{ color: '#ef4444' }}>*</span></label>
                    <input style={inputStyle} value={prog.name} onChange={e => handleProgramChange(i, 'name', e.target.value)} required placeholder="e.g., MBA" />
                  </div>
                  <div>
                    <label style={labelStyle}>Duration <span style={{ color: '#ef4444' }}>*</span></label>
                    <input style={inputStyle} value={prog.duration} onChange={e => handleProgramChange(i, 'duration', e.target.value)} required placeholder="e.g., 2 Years" />
                  </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <label style={labelStyle}>Description</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={prog.description} onChange={e => handleProgramChange(i, 'description', e.target.value)} placeholder="Brief description..." />
                </div>
              </div>
            ))}
            <button type="button" onClick={() => setPrograms([...programs, { name: '', duration: '', description: '' }])} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0.6rem 1.25rem', background: '#1e40af', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
              <Plus size={16} /> Add Program
            </button>
          </div>

          {/* ACTIONS */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => setForm(f => ({ ...f, name: '', slug: '', description: '', highlights: '', facilities: '' }))} style={{ padding: '0.75rem 1.5rem', background: '#f1f5f9', color: '#374151', border: '1.5px solid #e2e8f0', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
              Clear Form
            </button>
            <Link href="/admin/universities" style={{ padding: '0.75rem 1.5rem', background: '#fff', color: '#374151', border: '1.5px solid #e2e8f0', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
              Cancel
            </Link>
            <button type="submit" disabled={loading} style={{ padding: '0.75rem 1.75rem', background: loading ? '#94a3b8' : '#1e40af', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Plus size={16} /> {loading ? 'Creating...' : 'Create University'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
