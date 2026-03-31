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
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
          Dashboard Overview
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.link}
            style={{
              textDecoration: 'none',
              background: '#fff',
              borderRadius: '1.25rem',
              padding: '1.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = stat.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '100px',
              height: '100px',
              background: stat.bgColor,
              borderRadius: '50%',
              opacity: 0.5
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: stat.bgColor,
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color
                }}>
                  {stat.icon}
                </div>
                <span style={{
                  padding: '0.375rem 0.75rem',
                  background: '#dcfce7',
                  color: '#16a34a',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {stat.change}
                </span>
              </div>
              
              <h3 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                {stat.value.toLocaleString()}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>
                {stat.label}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{
        background: '#fff',
        borderRadius: '1.25rem',
        padding: '2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
          Quick Actions
        </h2>
        
        {/* Migration Button */}
        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#fef3c7', borderRadius: '0.75rem', border: '1px solid #fbbf24' }}>
          <p style={{ fontSize: '0.9rem', color: '#92400e', marginBottom: '0.75rem' }}>
            <strong>Database Migration:</strong> Click below to add slugs to existing universities (required for detail pages to work)
          </p>
          <button
            onClick={handleMigrate}
            disabled={migrating}
            style={{
              padding: '0.75rem 1.5rem',
              background: migrating ? '#94a3b8' : '#1e40af',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 600,
              cursor: migrating ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem'
            }}
          >
            {migrating ? 'Migrating...' : 'Run Migration'}
          </button>
          {migrateMessage && (
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: migrateMessage.includes('✅') ? '#16a34a' : '#dc2626' }}>
              {migrateMessage}
            </p>
          )}
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          <Link
            href="/admin/universities/create"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.25rem 1.5rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: '#fff',
              borderRadius: '1rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Plus size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: '0.125rem' }}>Add University</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Create new university profile</div>
            </div>
          </Link>

          <Link
            href="/admin/programs/create"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.25rem 1.5rem',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              borderRadius: '1rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Plus size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: '0.125rem' }}>Add Program</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Create new academic program</div>
            </div>
          </Link>

          <Link
            href="/admin/enrollments"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.25rem 1.5rem',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#fff',
              borderRadius: '1rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(245, 158, 11, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: '0.125rem' }}>View Enrollments</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Manage student applications</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        background: '#fff',
        borderRadius: '1.25rem',
        padding: '2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
          Recent Activity
        </h2>
        <div style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>
          No recent activity to display
        </div>
      </div>
    </div>
  );
}
