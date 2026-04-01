'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, GraduationCap, BookOpen, TrendingUp, Plus, ArrowLeft } from '@/components/Icon';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUniversities: 0,
    totalPrograms: 0,
    totalEnrollments: 0,
    totalStudents: 0
  });
  const [migrating, setMigrating] = useState(false);
  const [migrateMessage, setMigrateMessage] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setStats({
        totalUniversities: 14,
        totalPrograms: 120,
        totalEnrollments: 450,
        totalStudents: 10000
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleMigrate = async () => {
    setMigrating(true);
    setMigrateMessage('');
    
    try {
      const response = await fetch('/api/universities/migrate', {
        method: 'POST'
      });
      const data = await response.json();
      
      if (data.success) {
        setMigrateMessage(`✅ ${data.message}`);
      } else {
        setMigrateMessage(`❌ Migration failed: ${data.error}`);
      }
    } catch (error) {
      setMigrateMessage(`❌ Error: ${error}`);
    } finally {
      setMigrating(false);
    }
  };

  const statCards = [
    { icon: <GraduationCap size={28} />, label: 'Universities', value: stats.totalUniversities, change: '+12%', color: '#3b82f6', bgColor: '#eff6ff', link: '/admin/universities' },
    { icon: <BookOpen size={28} />, label: 'Programs', value: stats.totalPrograms, change: '+8%', color: '#10b981', bgColor: '#f0fdf4', link: '/admin/programs' },
    { icon: <Users size={28} />, label: 'Enrollments', value: stats.totalEnrollments, change: '+23%', color: '#f59e0b', bgColor: '#fffbeb', link: '/admin/enrollments' },
    { icon: <TrendingUp size={28} />, label: 'Students', value: stats.totalStudents, change: '+15%', color: '#8b5cf6', bgColor: '#faf5ff', link: '#' },
  ];

  return (
    <div style={{ padding: '2.5rem', background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          Dashboard
        </h1>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        <Link
          href="/admin/universities"
          style={{
            textDecoration: 'none',
            background: '#fff',
            borderRadius: '12px',
            padding: '1.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 500 }}>Universities</span>
            <div style={{ width: '32px', height: '32px', background: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={18} color="#3b82f6" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937' }}>
            {stats.totalUniversities}
          </div>
        </Link>

        <Link
          href="/admin/programs"
          style={{
            textDecoration: 'none',
            background: '#fff',
            borderRadius: '12px',
            padding: '1.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 500 }}>Programs</span>
            <div style={{ width: '32px', height: '32px', background: '#fef3c7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={18} color="#f59e0b" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937' }}>
            {stats.totalPrograms}
          </div>
        </Link>

        <Link
          href="/admin/open-school"
          style={{
            textDecoration: 'none',
            background: '#fff',
            borderRadius: '12px',
            padding: '1.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 500 }}>Open School Courses</span>
            <div style={{ width: '32px', height: '32px', background: '#d1fae5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={18} color="#10b981" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937' }}>
            5
          </div>
        </Link>

        <Link
          href="/admin/enrollments"
          style={{
            textDecoration: 'none',
            background: '#fff',
            borderRadius: '12px',
            padding: '1.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 500 }}>Enrollments</span>
            <div style={{ width: '32px', height: '32px', background: '#e9d5ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} color="#a855f7" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937' }}>
            {stats.totalEnrollments}
          </div>
        </Link>

        <Link
          href="/admin/contacts"
          style={{
            textDecoration: 'none',
            background: '#fff',
            borderRadius: '12px',
            padding: '1.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 500 }}>Contact Messages</span>
            <div style={{ width: '32px', height: '32px', background: '#fee2e2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937' }}>
            0
          </div>
        </Link>
      </div>

      {/* Recent Enrollments Table */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        border: '1px solid #e5e7eb',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '1.5rem' }}>
          Recent Enrollments
        </h2>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: '#6b7280' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: '#6b7280' }}>Program</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: '#6b7280' }}>Date</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: '#6b7280' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937' }}>Amit Kumar</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>Data Science & Analytics</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>2024-03-05</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ padding: '0.25rem 0.75rem', background: '#d1fae5', color: '#065f46', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                    Approved
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937' }}>Priya Patel</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>MBA in Finance</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>2024-02-10</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ padding: '0.25rem 0.75rem', background: '#fef3c7', color: '#92400e', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1f2937' }}>Rahul Sharma</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>Computer Science & Engineering</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>2024-01-15</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ padding: '0.25rem 0.75rem', background: '#d1fae5', color: '#065f46', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                    Approved
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Migration Section - Keep existing functionality */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '1.5rem' }}>
          Database Management
        </h2>
        
        <div style={{ padding: '1.25rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fbbf24', marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#92400e', marginBottom: '1rem', lineHeight: 1.6 }}>
            <strong>Database Migration:</strong> Click below to add slugs to existing universities (required for detail pages to work)
          </p>
          <button
            onClick={handleMigrate}
            disabled={migrating}
            style={{
              padding: '0.625rem 1.25rem',
              background: migrating ? '#9ca3af' : '#1e40af',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: migrating ? 'not-allowed' : 'pointer',
              fontSize: '0.875rem',
              transition: 'all 0.2s'
            }}
          >
            {migrating ? 'Migrating...' : 'Run Migration'}
          </button>
          {migrateMessage && (
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: migrateMessage.includes('✅') ? '#16a34a' : '#dc2626', fontWeight: 500 }}>
              {migrateMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
