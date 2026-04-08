'use client';
import { useState, useEffect } from 'react';
import { Search, Mail, Phone, Users } from '@/components/Icon';

interface Lead {
  _id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  source: string;
  status: 'New' | 'Contacted' | 'Converted' | 'Lost';
  createdAt: string;
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  New:       { bg: '#eff6ff', color: '#1e40af' },
  Contacted: { bg: '#fefce8', color: '#a16207' },
  Converted: { bg: '#f0fdf4', color: '#15803d' },
  Lost:      { bg: '#fef2f2', color: '#dc2626' },
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetch('/api/leads').then(r => r.json()).then(d => {
      if (d.success) setLeads(d.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setLeads(prev => prev.map(l => l._id === id ? { ...l, status: status as Lead['status'] } : l));
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead?')) return;
    await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    setLeads(prev => prev.filter(l => l._id !== id));
  };

  const filtered = leads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.course?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts: Record<string, number> = {
    All: leads.length,
    New: leads.filter(l => l.status === 'New').length,
    Contacted: leads.filter(l => l.status === 'Contacted').length,
    Converted: leads.filter(l => l.status === 'Converted').length,
    Lost: leads.filter(l => l.status === 'Lost').length,
  };

  return (
    <div style={{ padding: '1.5rem', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", minHeight: '100vh', background: '#f8fafc' }}>
      <style>{`
        @media (max-width: 768px) {
          .leads-table { display: none !important; }
          .leads-cards { display: flex !important; }
          .leads-stats { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (min-width: 769px) {
          .leads-cards { display: none !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.6rem)', fontWeight: 800, color: '#0f172a', margin: 0 }}>Brochure Leads</h1>
          <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: 4 }}>Users who requested brochures — track and follow up</p>
        </div>

        {/* Stats */}
        <div className="leads-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', marginBottom: 20 }}>
          {Object.entries(counts).map(([status, count]) => (
            <div key={status}
              style={{ background: '#fff', borderRadius: 12, padding: '0.875rem 1rem', border: `1.5px solid ${statusFilter === status ? '#1e40af' : '#f1f5f9'}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'border-color 0.2s' }}
              onClick={() => setStatusFilter(status)}>
              <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 900, color: status === 'All' ? '#1e40af' : STATUS_COLORS[status]?.color || '#1e40af', lineHeight: 1 }}>{count}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginTop: 3 }}>{status}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={{ background: '#fff', borderRadius: 12, padding: '0.875rem 1.1rem', border: '1px solid #f1f5f9', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Search size={15} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search by name, email, phone or course..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: '0.88rem', color: '#0f172a', background: 'transparent', fontFamily: 'inherit' }}
          />
          {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}>✕</button>}
        </div>

        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b', background: '#fff', borderRadius: 16 }}>Loading leads...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', background: '#fff', borderRadius: 16, border: '1px solid #f1f5f9' }}>
            <Users size={40} color="#e2e8f0" />
            <p style={{ color: '#64748b', marginTop: '1rem' }}>No leads found.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="leads-table" style={{ background: '#fff', borderRadius: 16, border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                      {['Name', 'Contact', 'Course', 'Source', 'Status', 'Date', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((lead, i) => (
                      <tr key={lead._id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f8fafc' : 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <td style={{ padding: '13px 16px' }}>
                          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.87rem' }}>{lead.name}</div>
                        </td>
                        <td style={{ padding: '13px 16px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <a href={`tel:${lead.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#1e40af', fontSize: '0.79rem', textDecoration: 'none', fontWeight: 500 }}>
                              <Phone size={11} color="#1e40af" /> {lead.phone}
                            </a>
                            <a href={`mailto:${lead.email}`} style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748b', fontSize: '0.77rem', textDecoration: 'none' }}>
                              <Mail size={11} color="#94a3b8" /> {lead.email}
                            </a>
                          </div>
                        </td>
                        <td style={{ padding: '13px 16px', fontSize: '0.81rem', color: '#374151', maxWidth: 180 }}>
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.course || '—'}</div>
                        </td>
                        <td style={{ padding: '13px 16px' }}>
                          <span style={{ background: '#eef2ff', color: '#4361EE', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: 50 }}>
                            {lead.source || 'Brochure'}
                          </span>
                        </td>
                        <td style={{ padding: '13px 16px' }}>
                          <select value={lead.status} onChange={e => updateStatus(lead._id, e.target.value)}
                            style={{ padding: '4px 10px', borderRadius: 50, border: 'none', fontWeight: 700, fontSize: '0.7rem', cursor: 'pointer', fontFamily: 'inherit', outline: 'none', background: STATUS_COLORS[lead.status]?.bg || '#f1f5f9', color: STATUS_COLORS[lead.status]?.color || '#374151' }}>
                            {['New', 'Contacted', 'Converted', 'Lost'].map(s => <option key={s}>{s}</option>)}
                          </select>
                        </td>
                        <td style={{ padding: '13px 16px', fontSize: '0.77rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                          {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                        </td>
                        <td style={{ padding: '13px 16px' }}>
                          <button onClick={() => deleteLead(lead._id)}
                            style={{ padding: '5px 12px', background: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: 7, cursor: 'pointer', fontSize: '0.77rem', fontWeight: 600, fontFamily: 'inherit' }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="leads-cards" style={{ flexDirection: 'column', gap: '0.75rem' }}>
              {filtered.map(lead => (
                <div key={lead._id} style={{ background: '#fff', borderRadius: 14, padding: '1.1rem', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{lead.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 2 }}>
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
                      </div>
                    </div>
                    <select value={lead.status} onChange={e => updateStatus(lead._id, e.target.value)}
                      style={{ padding: '4px 10px', borderRadius: 50, border: 'none', fontWeight: 700, fontSize: '0.7rem', cursor: 'pointer', fontFamily: 'inherit', outline: 'none', background: STATUS_COLORS[lead.status]?.bg || '#f1f5f9', color: STATUS_COLORS[lead.status]?.color || '#374151' }}>
                      {['New', 'Contacted', 'Converted', 'Lost'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                    <a href={`tel:${lead.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1e40af', fontSize: '0.83rem', textDecoration: 'none', fontWeight: 500 }}>
                      <Phone size={13} color="#1e40af" /> {lead.phone}
                    </a>
                    <a href={`mailto:${lead.email}`} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: '0.81rem', textDecoration: 'none' }}>
                      <Mail size={13} color="#94a3b8" /> {lead.email}
                    </a>
                  </div>

                  {lead.course && (
                    <div style={{ fontSize: '0.78rem', color: '#374151', background: '#f8fafc', padding: '5px 10px', borderRadius: 7, marginBottom: 10 }}>
                      📚 {lead.course}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ background: '#eef2ff', color: '#4361EE', fontSize: '0.68rem', fontWeight: 700, padding: '3px 10px', borderRadius: 50 }}>
                      {lead.source || 'Brochure'}
                    </span>
                    <button onClick={() => deleteLead(lead._id)}
                      style={{ padding: '5px 14px', background: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: 7, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, fontFamily: 'inherit' }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
