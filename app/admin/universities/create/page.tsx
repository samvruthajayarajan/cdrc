'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2 } from '@/components/Icon';

interface Program {
  name: string;
  duration: string;
  description: string;
}

export default function CreateUniversity() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    location: '',
    naac: '',
    accreditation: '',
    logoInitial: '',
    image: '',
    description: '',
    facilities: [''],
    ranking: '',
  });
  const [programs, setPrograms] = useState<Program[]>([
    { name: '', duration: '', description: '' }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleFacilityChange = (index: number, value: string) => {
    const newFacilities = [...formData.facilities];
    newFacilities[index] = value;
    setFormData(prev => ({ ...prev, facilities: newFacilities }));
  };

  const addFacility = () => {
    setFormData(prev => ({ ...prev, facilities: [...prev.facilities, ''] }));
  };

  const removeFacility = (index: number) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index)
    }));
  };

  const handleProgramChange = (index: number, field: keyof Program, value: string) => {
    const newPrograms = [...programs];
    newPrograms[index][field] = value;
    setPrograms(newPrograms);
  };

  const addProgram = () => {
    setPrograms([...programs, { name: '', duration: '', description: '' }]);
  };

  const removeProgram = (index: number) => {
    setPrograms(programs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/universities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          facilities: formData.facilities.filter(f => f.trim() !== ''),
          programs: programs.filter(p => p.name.trim() !== '')
        }),
      });

      if (response.ok) {
        alert('University created successfully!');
        router.push('/admin/universities');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to create university'}`);
      }
    } catch (error) {
      console.error('Error creating university:', error);
      alert('Error creating university');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
        padding: '2rem',
        color: '#fff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link href="/admin/universities" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#fff',
            textDecoration: 'none',
            marginBottom: '1rem',
            opacity: 0.9
          }}>
            <ArrowLeft size={20} />
            Back to Universities
          </Link>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>
            Create New University
          </h1>
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <div style={{
            background: '#fff',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '1.5rem' }}>
              Basic Information
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b' }}>
                  University Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                {formData.slug && (
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
                    URL: /universities/{formData.slug}
                  </p>
                )}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b' }}>
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Noida, Uttar Pradesh"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b' }}>
                  NAAC Grade *
                </label>
                <input
                  type="text"
                  name="naac"
                  value={formData.naac}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., NAAC A++"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b' }}>
                  Logo Initial *
                </label>
                <input
                  type="text"
                  name="logoInitial"
                  value={formData.logoInitial}
                  onChange={handleInputChange}
                  required
                  maxLength={1}
                  placeholder="e.g., A"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b' }}>
                  Card Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                  Optional: Image displayed on university card (180px height)
                </p>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b' }}>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b' }}>
                Ranking
              </label>
              <input
                type="text"
                name="ranking"
                value={formData.ranking}
                onChange={handleInputChange}
                placeholder="e.g., Ranked #8 in NIRF 2023"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>

          {/* Facilities */}
          <div style={{
            background: '#fff',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>
                Facilities
              </h2>
              <button
                type="button"
                onClick={addFacility}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: '#1e40af',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Plus size={16} />
                Add Facility
              </button>
            </div>

            {formData.facilities.map((facility, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={facility}
                  onChange={(e) => handleFacilityChange(index, e.target.value)}
                  placeholder="e.g., Digital Library"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                {formData.facilities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFacility(index)}
                    style={{
                      padding: '0.75rem',
                      background: '#fee2e2',
                      color: '#dc2626',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Programs */}
          <div style={{
            background: '#fff',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>
                Programs
              </h2>
              <button
                type="button"
                onClick={addProgram}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: '#059669',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Plus size={16} />
                Add Program
              </button>
            </div>

            {programs.map((program, index) => (
              <div key={index} style={{
                padding: '1.5rem',
                background: '#f8fafc',
                borderRadius: '0.75rem',
                marginBottom: '1rem',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>
                    Program {index + 1}
                  </h3>
                  {programs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProgram(index)}
                      style={{
                        padding: '0.5rem',
                        background: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>
                      Program Name *
                    </label>
                    <input
                      type="text"
                      value={program.name}
                      onChange={(e) => handleProgramChange(index, 'name', e.target.value)}
                      required
                      placeholder="e.g., MBA"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>
                      Duration *
                    </label>
                    <input
                      type="text"
                      value={program.duration}
                      onChange={(e) => handleProgramChange(index, 'duration', e.target.value)}
                      required
                      placeholder="e.g., 2 Years"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>
                    Description
                  </label>
                  <textarea
                    value={program.description}
                    onChange={(e) => handleProgramChange(index, 'description', e.target.value)}
                    rows={2}
                    placeholder="Brief description of the program"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Link
              href="/admin/universities"
              style={{
                padding: '0.875rem 2rem',
                background: '#e2e8f0',
                color: '#1e293b',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0.875rem 2rem',
                background: loading ? '#94a3b8' : '#1e40af',
                color: '#fff',
                border: 'none',
                borderRadius: '0.75rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Creating...' : 'Create University'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
