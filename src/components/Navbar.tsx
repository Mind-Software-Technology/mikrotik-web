'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, LogIn, ChevronRight, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenServerModal: () => void;
  onOpenDemo: (tab?: 'admin' | 'payment' | 'client') => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimoni', href: '#testimonials' },
];

export default function Navbar({ onOpenServerModal, onOpenDemo }: NavbarProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`glass-nav ${scrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed', top: scrolled ? 16 : 0, left: scrolled ? '5%' : 0, right: scrolled ? '5%' : 0, 
          zIndex: 900,
          borderRadius: scrolled ? 24 : 0,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          height: 76, display: 'flex', alignItems: 'center',
          boxShadow: scrolled ? '0 10px 40px -10px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <a href="#home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/logo.png" alt="Global SmartApp" style={{ height: 42, objectFit: 'contain' }} />
          </a>

          {/* Desktop Nav */}
          <ul className="desktop-only" style={{ display: 'flex', gap: 8, listStyle: 'none' }}>
            {NAV_LINKS.map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  style={{
                    position: 'relative',
                    display: 'block',
                    padding: '8px 16px',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: activeLink === l.label ? '#0f172a' : '#64748b',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0f172a'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = activeLink === l.label ? '#0f172a' : '#64748b'; }}
                  onClick={() => setActiveLink(l.label)}
                >
                  {l.label}
                  {activeLink === l.label && (
                    <motion.div
                      layoutId="nav-pill"
                      style={{
                        position: 'absolute', inset: 0, 
                        background: 'rgba(139, 61, 255, 0.08)',
                        borderRadius: 99, zIndex: -1
                      }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-only">
            <button className="btn btn-outline" onClick={() => router.push('/billing')} style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              <LayoutDashboard size={16} /> Billing
            </button>
            <button className="btn btn-primary" onClick={() => router.push('/choose_server')} style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              <LogIn size={16} /> Login
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="mobile-btn"
            style={{
              display: 'none',
              background: '#f8fafc', border: '1px solid #e2e8f0',
              borderRadius: 12, padding: 10, cursor: 'pointer', color: '#0f172a',
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 890,
              background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', paddingTop: 100,
              display: 'flex', flexDirection: 'column',
            }}
          >
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: '16px 24px', background: '#f8fafc',
                    borderRadius: 16, border: '1px solid #e2e8f0',
                    fontSize: '1.1rem', fontWeight: 700, color: '#0f172a',
                    textDecoration: 'none', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  {l.label} <ChevronRight size={18} color="#64748b" />
                </a>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 32 }}>
                <button className="btn btn-outline" style={{ justifyContent: 'center', padding: 16 }} onClick={() => { router.push('/billing'); setMobileOpen(false); }}>
                  <LayoutDashboard size={18} /> Billing Panel
                </button>
                <button className="btn btn-primary" style={{ justifyContent: 'center', padding: 16 }} onClick={() => { router.push('/choose_server'); setMobileOpen(false); }}>
                  <LogIn size={18} /> Sign In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
