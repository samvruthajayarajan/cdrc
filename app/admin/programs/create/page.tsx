'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from '@/components/Icon';

function CreateProgramPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    duration: '',
    university: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (data.success) {
        alert('Program created successfully!');
        router.push('/admin/programs');
      } else {
        setError(data.error || 'Failed to create program');
      }
    } catch (err) {
      setError('An error occurred while creating the program');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
        padding: '2rem',
        color: '#fff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link href="/admin/programs" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#fff',
            textDecoration: 'none',
            marginBottom: '1rem',
            opacity: 0.9
          }}>
            <ArrowLeft size={20} />
            Back to Programs
          </Link>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>
            Create New Program
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <div style={{
          background: '#fff',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Program Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., MBA (Marketing)"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Duration <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                required
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="e.g., 2 Years"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                University
              </label>
              <input
                type="text"
                value={form.university}
                onChange={(e) => setForm({ ...form, university: e.target.value })}
                placeholder="e.g., AMITY University"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of the program..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {error && (
              <div style={{
                padding: '1rem',
                background: '#fee2e2',
                border: '1px solid #fecaca',
                borderRadius: '0.75rem',
                color: '#991b1b',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem' }}>
              <Link
                href="/admin/programs"
                style={{
                  flex: 1,
                  padding: '0.875rem 1.5rem',
                  borderRadius: '0.75rem',
                  border: '2px solid #e5e7eb',
                  background: '#fff',
                  color: '#6b7280',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textAlign: 'center',
                  textDecoration: 'none'
                }}
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '0.875rem 1.5rem',
                  borderRadius: '0.75rem',
                  background: loading ? '#93c5fd' : 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)'
                }}
              >
                {loading ? 'Creating...' : 'Create Program'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProgramPage;
