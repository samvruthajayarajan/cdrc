'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/universities', label: 'Universities' },
  { href: '/open-school', label: 'Open School' },
  { href: '/programs', label: 'Programs' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <nav style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 90 }}>

          {/* Brand */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
            <div style={{ width: 42, height: 42, background: '#1e40af', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '1.3rem', flexShrink: 0 }}>C</div>
            <div>
              <div style={{ color: '#1e40af', fontWeight: 900, fontSize: '1.6rem', lineHeight: 1 }}>CDRC</div>
              <div style={{ color: '#6b7280', fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap' }}>Career Development & Research Centre</div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul style={{ display: 'flex', listStyle: 'none', gap: '0.25rem', alignItems: 'center', margin: 0, padding: 0 }} id="desktop-nav">
            {links.map(l => (
              <li key={l.href}>
                <Link href={l.href} style={{
                  display: 'block', padding: '0.65rem 1.1rem', borderRadius: '0.5rem',
                  fontWeight: 600, fontSize: '1rem', textDecoration: 'none', transition: 'all 0.2s',
                  color: pathname === l.href ? '#1e40af' : '#374151',
                  background: pathname === l.href ? '#dbeafe' : 'transparent',
                }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <Link href="/login" style={{
            background: '#1e40af', color: '#fff', padding: '0.75rem 1.75rem',
            borderRadius: 50, fontWeight: 600, fontSize: '1rem', textDecoration: 'none',
            whiteSpace: 'nowrap', flexShrink: 0,
          }} id="nav-cta">
            Login
          </Link>

          {/* Hamburger — shown on mobile via JS toggle */}
          <button onClick={() => setOpen(!open)} id="hamburger"
            style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
            <span style={{ width: 24, height: 2.5, background: '#374151', borderRadius: 2, display: 'block' }} />
            <span style={{ width: 24, height: 2.5, background: '#374151', borderRadius: 2, display: 'block' }} />
            <span style={{ width: 24, height: 2.5, background: '#374151', borderRadius: 2, display: 'block' }} />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{ borderTop: '1px solid #e5e7eb', padding: '0.75rem 0 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                display: 'block', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
                color: pathname === l.href ? '#1e40af' : '#374151',
                background: pathname === l.href ? '#dbeafe' : 'transparent',
              }}>
                {l.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setOpen(false)} style={{
              display: 'block', textAlign: 'center', margin: '0.5rem 0 0',
              background: '#1e40af', color: '#fff', padding: '0.75rem',
              borderRadius: 50, fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none',
            }}>
              Login
            </Link>
          </div>
        )}
      </nav>

      {/* Responsive CSS injected inline */}
      <style>{`
        @media (max-width: 768px) {
          #desktop-nav { display: none !important; }
          #nav-cta { display: none !important; }
          #hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
