'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Mail, Lock, LogIn, Eye, EyeOff, Key, UserPlus,
  User, Network, ShieldCheck, Zap, Server, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Premium Light Theme Illustrations (SVG animations) ───────────────────
function IllustrationWelcome() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 280, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))' }}>
      <rect x="50" y="30" width="180" height="120" rx="12" fill="#ffffff" stroke="rgba(139,61,255,0.3)" strokeWidth="1" />
      <rect x="60" y="40" width="160" height="100" rx="6" fill="#f8fafc"/>
      {/* Glow */}
      <circle cx="140" cy="90" r="50" fill="url(#glowGradient)" opacity="0.3" />
      <defs>
        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b3dff" stopOpacity="1" />
          <stop offset="100%" stopColor="#8b3dff" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Content lines */}
      <rect x="75" y="55" width="80" height="6" rx="3" fill="#3b82f6"/>
      <rect x="75" y="68" width="55" height="4" rx="2" fill="#cbd5e1"/>
      <rect x="75" y="80" width="100" height="4" rx="2" fill="#cbd5e1"/>
      
      {/* Dashboard chart bars */}
      {[0,1,2,3,4,5].map((i) => (
        <rect key={i} x={75 + i * 22} y={125 - i * 8 - 10} width="14" height={i * 8 + 10} rx="3"
          fill={i === 5 ? '#8b3dff' : i === 4 ? '#3b82f6' : '#e2e8f0'}/>
      ))}
      
      {/* Floating elements */}
      <circle cx="20" cy="50" r="4" fill="#3b82f6" style={{ animation: 'float 4s ease-in-out infinite' }} />
      <circle cx="260" cy="140" r="3" fill="#2dd4bf" style={{ animation: 'float 5s ease-in-out infinite' }} />
      <rect x="180" y="55" width="30" height="30" rx="8" fill="rgba(45,212,191,0.1)" stroke="#2dd4bf" strokeWidth="1" />
      <path d="M190 70 L195 75 L202 65" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function IllustrationNetwork() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 280, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))' }}>
      <circle cx="140" cy="100" r="28" fill="#ffffff" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="140" cy="100" r="14" fill="#3b82f6" />
      {/* Pulses */}
      <circle cx="140" cy="100" r="35" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
      <circle cx="140" cy="100" r="45" stroke="rgba(59,130,246,0.1)" strokeWidth="1" />
      
      {[[50,50],[230,50],[50,150],[230,150],[140,20],[140,180]].map(([cx,cy], i) => (
        <g key={i}>
          <line x1="140" y1="100" x2={cx} y2={cy} stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4"/>
          <circle cx={cx} cy={cy} r="12" fill="#ffffff" stroke="#8b3dff" strokeWidth="1.5"/>
          <circle cx={cx} cy={cy} r="5" fill="#2dd4bf" />
        </g>
      ))}
    </svg>
  );
}

function IllustrationSecurity() {
  return (
    <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 280, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))' }}>
      <path d="M140 25 L210 55 L210 115 Q210 165 140 185 Q70 165 70 115 L70 55 Z"
        fill="#ffffff" stroke="#2dd4bf" strokeWidth="2"/>
      <path d="M140 40 L195 65 L195 115 Q195 152 140 170 Q85 152 85 115 L85 65 Z"
        fill="rgba(45,212,191,0.1)" stroke="#2dd4bf" strokeWidth="1"/>
      <path d="M115 105 L135 125 L165 90" stroke="#2dd4bf" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* Data streams */}
      <rect x="40" y="80" width="20" height="4" rx="2" fill="#8b3dff" opacity="0.3"/>
      <rect x="220" y="120" width="25" height="4" rx="2" fill="#3b82f6" opacity="0.3"/>
    </svg>
  );
}

const SLIDES = [
  { illustration: <IllustrationWelcome />, title: 'Selamat Datang!', desc: 'Kelola bisnis RT/RW Net Anda dengan platform tercanggih dan terpercaya.' },
  { illustration: <IllustrationNetwork />, title: 'Monitoring Real-Time', desc: 'Pantau trafik OLT, status router Mikrotik, dan pelanggan dari satu dashboard.' },
  { illustration: <IllustrationSecurity />, title: 'Keamanan Tingkat Tinggi', desc: 'Sistem terenkripsi penuh memastikan data pelanggan dan transaksi Anda aman.' },
];

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serverParam = searchParams.get('server') || '1';

  const [slide, setSlide] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const serverLabel = `SERVER ${serverParam}`;
  const serverColors: Record<string, string> = { '1': '#8b3dff', '2': '#2dd4bf', '3': '#3b82f6' };
  const accentColor = serverColors[serverParam] || '#8b3dff';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Email dan password wajib diisi.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/billing');
    }, 2000);
  };

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      padding: '20px',
    }}>

      {/* Main card */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%', maxWidth: 1040,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(30px)',
          borderRadius: 32,
          border: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 30px 60px -20px rgba(0,0,0,0.1)',
          display: 'flex', overflow: 'hidden',
          position: 'relative', zIndex: 10,
        }} 
        className="auth-card"
      >
        {/* ── LEFT: Illustration panel ── */}
        <div style={{
          flex: 1.2,
          background: 'linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)',
          borderRight: '1px solid rgba(0,0,0,0.05)',
          padding: '64px 48px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'space-between',
          position: 'relative',
        }} className="auth-left-panel">
          
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z\' fill=\'%23000000\' fill-opacity=\'0.02\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")', zIndex: 0 }} />

          {/* Logo */}
          <div style={{ zIndex: 1, marginBottom: 20 }}>
            <img src="/logo.png" alt="Global SmartApp Logo" style={{ height: 48, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.05))' }} />
          </div>

          {/* Carousel illustration */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', zIndex: 1 }}>
            <div style={{ marginBottom: 48, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5 }}
                >
                  {SLIDES[slide].illustration}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ textAlign: 'center' }}
              >
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', marginBottom: 12, letterSpacing: '-0.02em' }}>
                  {SLIDES[slide].title}
                </h3>
                <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6, maxWidth: 340, margin: '0 auto' }}>
                  {SLIDES[slide].desc}
                </p>
              </motion.div>
            </AnimatePresence>
            
            {/* Dots */}
            <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)} style={{
                  width: i === slide ? 32 : 8, height: 8, borderRadius: 99,
                  background: i === slide ? accentColor : '#cbd5e1',
                  border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease',
                  boxShadow: i === slide ? `0 0 10px rgba(0,0,0,0.1)` : 'none'
                }} />
              ))}
            </div>
          </div>

          {/* Server badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
            border: `1px solid color-mix(in srgb, ${accentColor} 20%, transparent)`,
            borderRadius: 99, padding: '8px 20px', zIndex: 1
          }}>
            <Server size={14} color={accentColor} />
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: accentColor, letterSpacing: '0.05em' }}>{serverLabel}</span>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2dd4bf', boxShadow: '0 0 10px rgba(0,0,0,0.1)', animation: 'pulse-glow 2s infinite' }} />
          </div>
        </div>

        {/* ── RIGHT: Login form panel ── */}
        <div style={{
          flex: 1,
          padding: '72px 64px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          background: '#ffffff',
        }} className="auth-right-panel">
          
          <div style={{ marginBottom: 48 }}>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', marginBottom: 12, letterSpacing: '-0.02em' }}>
              Welcome back
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#64748b' }}>
              Masuk ke akun administrator Anda.
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  background: '#fef2f2', border: '1px solid #fecaca',
                  borderRadius: 12, padding: '12px 16px',
                  fontSize: '0.9rem', color: '#dc2626', display: 'flex', alignItems: 'center', gap: 10,
                  fontWeight: 600
                }}>
                  <ShieldCheck size={18} /> {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 10 }}>
                Alamat Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  placeholder="admin@domain.com"
                  className="input"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={{ paddingLeft: 48 }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 10 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  style={{ paddingLeft: 48, paddingRight: 48 }}
                />
                <button type="button" onClick={() => setShowPass(v => !v)} style={{
                  position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#94a3b8', padding: 4, display: 'flex', alignItems: 'center',
                }}>
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%', padding: '16px', fontSize: '1.1rem', marginTop: 8,
                background: loading ? '#cbd5e1' : `linear-gradient(135deg, ${accentColor}, #3b82f6)`,
                boxShadow: loading ? 'none' : `0 10px 30px -10px ${accentColor}`,
                color: loading ? '#64748b' : '#fff'
              }}
            >
              {loading ? (
                <>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 1s linear infinite' }} />
                  Verifikasi...
                </>
              ) : (
                <>
                  <LogIn size={20} /> Login ke Dashboard
                </>
              )}
            </button>
          </form>

          <div style={{
            display: 'flex', flexDirection: 'column', gap: 16, marginTop: 40,
            borderTop: '1px solid #f1f5f9', paddingTop: 32,
          }}>
            {[
              { icon: <Key size={16} />, label: 'Lupa Password?', href: '#' },
              { icon: <UserPlus size={16} />, label: 'Pendaftaran Klien Baru', href: '#' },
              { icon: <User size={16} />, label: 'Masuk ke Portal Klien', href: '#' },
            ].map(l => (
              <a key={l.label} href={l.href} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                fontSize: '0.95rem', color: '#64748b',
                textDecoration: 'none', transition: 'all 0.2s',
                fontWeight: 600,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0f172a'; e.currentTarget.style.transform = 'translateX(5px)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.transform = 'translateX(0)'; }}
              >
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: 6, borderRadius: 8 }}>{l.icon}</div>
                {l.label}
              </a>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a href="/choose_server" style={{
              fontSize: '0.9rem', color: '#94a3b8',
              textDecoration: 'none', transition: 'color 0.2s',
              fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#0f172a')}
            onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
            >
              &larr; Ganti Server Login
            </a>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        
        @media (max-width: 1000px) {
          .auth-card { flex-direction: column !important; max-width: 600px !important; }
          .auth-left-panel { padding: 48px 32px !important; border-right: none !important; border-bottom: 1px solid #e2e8f0 !important; flex: none !important; }
          .auth-right-panel { width: 100% !important; padding: 48px 32px !important; }
        }
      `}</style>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid #e2e8f0', borderTopColor: '#8b3dff', animation: 'spin 1s linear infinite' }} />
      </div>
    }>
      <AuthForm />
    </Suspense>
  );
}
