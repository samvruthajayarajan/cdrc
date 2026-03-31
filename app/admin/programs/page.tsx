'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Search } from '@/components/Icon';

interface Program {
  _id?: string;
  name: string;
  duration: string;
  university: string;
  description?: string;
}

export default function ProgramsManagement() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs');
      const data = await response.json();
      if (data.success) {
        setPrograms(data.data);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const response = await fetch(`/api/programs/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        alert('Program deleted successfully!');
        fetchPrograms();
      } else {
        alert('Failed to delete program');
      }
    } catch (error) {
      console.error('Error deleting program:', error);
      alert('Error deleting program');
    }
  };

  const filteredPrograms = programs.filter(prog =>
    prog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prog.university?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
        padding: '2rem',
        color: '#fff'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Link href="/admin" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#fff',
            textDecoration: 'none',
            marginBottom: '1rem',
            opacity: 0.9
          }}>
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                Manage Programs
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                {programs.length} programs in total
              </p>
            </div>
            <Link
              href="/admin/programs/create"
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
              Add Program
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
              placeholder="Search programs by name or university..."
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

        {/* Programs Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
            Loading programs...
          </div>
        ) : filteredPrograms.length === 0 ? (
          <div style={{
            background: '#fff',
            borderRadius: '1rem',
            padding: '4rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
              {searchTerm ? 'No programs found matching your search.' : 'No programs yet. Add your first program!'}
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
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#1e293b' }}>Program Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#1e293b' }}>Duration</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#1e293b' }}>University</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#1e293b' }}>Description</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 700, color: '#1e293b' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrograms.map((prog, index) => (
                    <tr key={prog._id || index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 600, color: '#1e293b' }}>{prog.name}</div>
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
                          {prog.duration}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: '#64748b' }}>
                        {prog.university || 'N/A'}
                      </td>
                      <td style={{ padding: '1rem', color: '#64748b', maxWidth: '300px' }}>
                        {prog.description ? (
                          <div style={{ 
                            fontSize: '0.875rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {prog.description}
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.875rem', fontStyle: 'italic', color: '#9ca3af' }}>No description</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <Link
                            href={`/admin/programs/edit/${prog._id}`}
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
                          <button
                            onClick={() => handleDelete(prog._id || '', prog.name)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.375rem',
                              padding: '0.5rem 1rem',
                              background: '#fee2e2',
                              color: '#dc2626',
                              border: 'none',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#dc2626';
                              e.currentTarget.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#fee2e2';
                              e.currentTarget.style.color = '#dc2626';
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
