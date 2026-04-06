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
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          padding: 8px 14px;
          font-weight: 500;
          font-size: 0.92rem;
          text-decoration: none;
          color: #475569;
          border-radius: 8px;
          transition: color 0.2s ease, background 0.2s ease;
          font-family: 'Inter', system-ui, sans-serif;
          white-space: nowrap;
        }
        .nav-link:hover { color: #1e40af; background: rgba(30,64,175,0.06); }
        .nav-link.active {
          color: #1e40af;
          font-weight: 600;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 14px;
          right: 14px;
          height: 2px;
          background: linear-gradient(90deg, #1e40af, #3b82f6);
          border-radius: 2px;
        }
        .btn-find {
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.88rem;
          border: none;
          cursor: pointer;
          color: #fff;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          font-family: 'Inter', system-ui, sans-serif;
          box-shadow: 0 2px 10px rgba(30,64,175,0.3);
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .btn-find:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(30,64,175,0.4); }
        .btn-login {
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.88rem;
          text-decoration: none;
          color: #1e40af;
          background: transparent;
          border: 1.5px solid #bfdbfe;
          font-family: 'Inter', system-ui, sans-serif;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .btn-login:hover { background: rgba(30,64,175,0.06); border-color: #93c5fd; }
        .btn-login.active { background: #1e40af; color: #fff; border-color: #1e40af; }
        @media (max-width: 1024px) {
          #nav-links { display: none !important; }
          #nav-actions { display: none !important; }
          #hamburger { display: flex !important; }
        }
        @media (max-width: 640px) {
          #nav-brand span { font-size: 1.5rem !important; }
        }
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 12px rgba(0,0,0,0.06)',
      }}>
        <div style={{
          maxWidth: 1320, margin: '0 auto',
          padding: '0 2rem',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          height: 68,
        }}>

          {/* Logo */}
          <Link id="nav-brand" href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 900, fontSize: '1rem',
              fontFamily: 'Inter, system-ui, sans-serif',
              flexShrink: 0,
            }}>C</div>
            <span style={{
              fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}>CDRC</span>
          </Link>

          {/* Center nav links */}
          <nav id="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${pathname === link.href ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right action buttons */}
          <div id="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              className="btn-find"
              onClick={() => {
                const btn = document.querySelector('.cf-floating-btn') as HTMLButtonElement;
                if (btn) btn.click();
              }}
            >
              ✨ Find My Course
            </button>
            <Link
              href="/login"
              className={`btn-login${pathname === '/login' ? ' active' : ''}`}
            >
              Login
            </Link>
          </div>

          {/* Hamburger */}
          <button
            id="hamburger"
            onClick={() => setOpen(!open)}
            style={{
              display: 'none', flexDirection: 'column', justifyContent: 'center',
              alignItems: 'center', gap: 5,
              width: 44, height: 44,
              background: 'transparent', border: '1.5px solid #e2e8f0',
              cursor: 'pointer', borderRadius: 10,
            }}
          >
            <span style={{ display: 'block', width: 20, height: 2, background: '#1e40af', borderRadius: 2, transition: 'all 0.25s', transform: open ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ display: 'block', width: 20, height: 2, background: '#1e40af', borderRadius: 2, transition: 'all 0.25s', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', width: 20, height: 2, background: '#1e40af', borderRadius: 2, transition: 'all 0.25s', transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: '#fff', borderBottom: '1px solid #e2e8f0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            padding: '1.25rem 2rem 1.5rem',
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block', padding: '12px 16px', borderRadius: 10,
                  fontWeight: 500, fontSize: '0.95rem', textDecoration: 'none',
                  color: pathname === link.href ? '#1e40af' : '#475569',
                  background: pathname === link.href ? 'rgba(30,64,175,0.07)' : 'transparent',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  borderLeft: pathname === link.href ? '3px solid #3b82f6' : '3px solid transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <button
                className="btn-find"
                style={{ flex: 1 }}
                onClick={() => {
                  setOpen(false);
                  const btn = document.querySelector('.cf-floating-btn') as HTMLButtonElement;
                  if (btn) btn.click();
                }}
              >
                ✨ Find My Course
              </button>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="btn-login"
                style={{ flex: 1, textAlign: 'center' }}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
