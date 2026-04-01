'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Mail, Phone, Users, GraduationCap } from '@/components/Icon';

interface Enrollment {
  _id?: string;
  studentName: string;
  email: string;
  phone: string;
  university: string;
  program: string;
  message?: string;
  createdAt?: string;
  status?: string;
}

export default function EnrollmentsManagement() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch('/api/enrollments');
      const data = await response.json();
      if (data.success) {
        setEnrollments(data.data);
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/enrollments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        fetchEnrollments();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  const getStatusStyle = (status?: string) => {
    const currentStatus = status || 'pending';
    switch (currentStatus) {
      case 'approved':
        return { background: '#dcfce7', color: '#16a34a', border: '1px solid #86efac' };
      case 'rejected':
        return { background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5' };
      default:
        return { background: '#fef3c7', color: '#d97706', border: '1px solid #fcd34d' };
    }
  };

  const filteredEnrollments = enrollments.filter(enr =>
    enr.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enr.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enr.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enr.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Link href="/admin" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#1e40af',
            textDecoration: 'none',
            marginBottom: '1rem',
            fontWeight: 600
          }}>
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: '#1f2937' }}>
              Enrollment Inquiries
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#6b7280' }}>
              {enrollments.length} inquiries received
            </p>
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
              placeholder="Search by student name, email, university, or program..."
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

        {/* Enrollments List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
            Loading enrollments...
          </div>
        ) : filteredEnrollments.length === 0 ? (
          <div style={{
            background: '#fff',
            borderRadius: '1rem',
            padding: '4rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
              {searchTerm ? 'No enrollments found matching your search.' : 'No enrollment inquiries yet.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {filteredEnrollments.map((enr, index) => (
              <div key={enr._id || index} style={{
                background: '#fff',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  {/* Left Column */}
                  <div>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Users size={18} color="#1e40af" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                          Student
                        </span>
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>
                        {enr.studentName}
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <Mail size={16} color="#64748b" />
                        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                          {enr.email}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Phone size={16} color="#64748b" />
                        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                          {enr.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <GraduationCap size={18} color="#1e40af" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                          Program Details
                        </span>
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.25rem' }}>
                        {enr.program}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                        {enr.university}
                      </div>
                    </div>

                    {enr.message && (
                      <div style={{
                        padding: '0.75rem',
                        background: '#f8fafc',
                        borderRadius: '0.5rem',
                        border: '1px solid #e2e8f0',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '0.25rem' }}>
                          MESSAGE
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#475569' }}>
                          {enr.message}
                        </div>
                      </div>
                    )}

                    {/* Status Dropdown */}
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                        Status
                      </div>
                      <select
                        value={enr.status || 'pending'}
                        onChange={(e) => handleStatusChange(enr._id || '', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.625rem 0.875rem',
                          borderRadius: '0.5rem',
                          border: '2px solid #e2e8f0',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          outline: 'none',
                          transition: 'all 0.3s',
                          ...getStatusStyle(enr.status)
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Date */}
                {enr.createdAt && (
                  <div style={{ 
                    marginTop: '1rem', 
                    paddingTop: '1rem', 
                    borderTop: '1px solid #e2e8f0',
                    fontSize: '0.75rem',
                    color: '#94a3b8'
                  }}>
                    Submitted: {new Date(enr.createdAt).toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
