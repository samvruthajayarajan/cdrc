'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Search } from '@/components/Icon';

interface University {
  _id?: string;
  name: string;
  slug: string;
  location: string;
  naac: string;
  accreditation: string;
  logoInitial: string;
  programs: Array<{ name: string; duration: string }>;
}

export default function UniversitiesManagement() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await fetch('/api/universities');
      const data = await response.json();
      if (data.success) {
        setUniversities(data.data);
      }
    } catch (error) {
      console.error('Error fetching universities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const response = await fetch(`/api/universities/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        alert('University deleted successfully!');
        fetchUniversities();
      } else {
        alert('Failed to delete university');
      }
    } catch (error) {
      console.error('Error deleting university:', error);
      alert('Error deleting university');
    }
  };

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <div style={{
        background: '#fff',
        padding: '2rem',
        color: '#1f2937',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Link href="/admin" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#6b7280',
            textDecoration: 'none',
            marginBottom: '1rem',
            opacity: 0.9
          }}>
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: '#1f2937' }}>
                Manage Universities
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: 0.9, color: '#6b7280' }}>
                {universities.length} universities in total
              </p>
            </div>
            <Link
              href="/admin/universities/create"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.5rem',
                background: '#fff',
                color: '#1e40af',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,255,255,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Plus size={20} />
              Add University
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Search Bar */}
        <div style={{
          background: '#fff',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} color="#64748b" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search universities by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 3rem',
                border: '2px solid #e2e8f0',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#1e40af'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
            />
          </div>
        </div>

        {/* Universities Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
            Loading universities...
          </div>
        ) : filteredUniversities.length === 0 ? (
          <div style={{
            background: '#fff',
            borderRadius: '1rem',
            padding: '4rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
              {searchTerm ? 'No universities found matching your search.' : 'No universities yet. Add your first university!'}
            </p>
          </div>
        ) : (
          <div style={{
            background: '#fff',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#1e293b' }}>University</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#1e293b' }}>Location</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#1e293b' }}>NAAC</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#1e293b' }}>Programs</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 700, color: '#1e293b' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUniversities.map((uni, index) => (
                    <tr key={uni._id || index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: '1.25rem'
                          }}>
                            {uni.logoInitial || uni.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: '#1e293b' }}>{uni.name}</div>
                            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{uni.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', color: '#64748b' }}>
                        {uni.location || 'N/A'}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.375rem 0.75rem',
                          background: '#dbeafe',
                          color: '#1e40af',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 600
                        }}>
                          {uni.naac || uni.accreditation}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: '#64748b' }}>
                        {uni.programs?.length || 0} programs
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          {uni._id ? (
                            <Link
                              href={`/admin/universities/edit/${uni._id}`}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                padding: '0.5rem 1rem',
                                background: '#dbeafe',
                                color: '#1e40af',
                                borderRadius: '0.5rem',
                                textDecoration: 'none',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                transition: 'all 0.3s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#1e40af';
                                e.currentTarget.style.color = '#fff';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#dbeafe';
                                e.currentTarget.style.color = '#1e40af';
                              }}
                            >
                              <Edit size={16} />
                              Edit
                            </Link>
                          ) : (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.375rem',
                              padding: '0.5rem 1rem',
                              background: '#f1f5f9',
                              color: '#94a3b8',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              fontWeight: 600
                            }}>
                              <Edit size={16} />
                              No ID
                            </span>
                          )}
                          <button
                            onClick={() => handleDelete(uni._id || '', uni.name)}
                            disabled={!uni._id}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.375rem',
                              padding: '0.5rem 1rem',
                              background: uni._id ? '#fee2e2' : '#f1f5f9',
                              color: uni._id ? '#dc2626' : '#94a3b8',
                              border: 'none',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              cursor: uni._id ? 'pointer' : 'not-allowed',
                              transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => {
                              if (uni._id) {
                                e.currentTarget.style.background = '#dc2626';
                                e.currentTarget.style.color = '#fff';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (uni._id) {
                                e.currentTarget.style.background = '#fee2e2';
                                e.currentTarget.style.color = '#dc2626';
                              }
                            }}
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
