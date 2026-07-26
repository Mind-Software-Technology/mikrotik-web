'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Server, ArrowRight, Info, ShieldCheck,
  Globe, Network, Zap
} from 'lucide-react';

// ─── Illustration SVGs ─────────────────────────────────
function IllustrationServer() {
  return (
    <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 280, filter: 'drop-shadow(0 10px 20px rgba(37,99,235,0.15))' }}>
      {/* Server rack body */}
      <rect x="80" y="40" width="160" height="160" rx="12" fill="#ffffff" stroke="#bfdbfe" strokeWidth="2" />
      {/* Server units */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x="96" y={56 + i * 28} width="128" height="20" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
          <circle cx="116" cy={66 + i * 28} r="4" fill={i === 0 ? '#2563eb' : i === 1 ? '#2563eb' : i === 2 ? '#f59e0b' : '#2563eb'} />
          <rect x="126" y={62 + i * 28} width="40" height="8" rx="2" fill="#e2e8f0"/>
          <rect x="174" y={62 + i * 28} width="20" height="8" rx="2" fill="#cbd5e1"/>
        </g>
      ))}
      {/* Connection lines */}
      <path d="M160 200 Q 160 218 100 218 Q 60 218 60 200" stroke="#2563eb" strokeWidth="2" fill="none" strokeDasharray="4 4" />
      <path d="M160 200 Q 160 220 220 220 Q 260 220 260 200" stroke="#7c3aed" strokeWidth="2" fill="none" strokeDasharray="4 4" />
    </svg>
  );
}

// ─── Slide data ────────────────────────────────────────
const SLIDES = [
  {
    title: 'Multi-Server Support',
    desc: 'Pilih server yang paling stabil di lokasi Anda untuk pengalaman terbaik.',
    icon: <Server size={32} color="#2563eb" />,
  },
  {
    title: 'Data Sinkronisasi',
    desc: 'Semua server menampilkan data yang sama. Perpindahan server tidak mempengaruhi data Anda.',
    icon: <Globe size={32} color="#7c3aed" />,
  },
  {
    title: 'Keamanan Terjamin',
    desc: 'Setiap server dilindungi dengan enkripsi SSL/TLS dan sistem DDoS Protection.',
    icon: <ShieldCheck size={32} color="#16a34a" />,
  },
];

// ─── Server options ────────────────────────────────────
const SERVERS = [
  {
    id: 'server-1',
    label: 'SERVER 1',
    url: 'https://app.global-smartapp.com',
    color: '#2563eb',
    status: 'online',
    ping: '5ms',
  },
  {
    id: 'server-2',
    label: 'SERVER 2',
    url: 'https://app2.global-smartapp.com',
    color: '#16a34a',
    status: 'online',
    ping: '8ms',
  },
  {
    id: 'server-3',
    label: 'SERVER 3',
    url: 'https://app3.global-smartapp.com',
    color: '#7c3aed',
    status: 'online',
    ping: '12ms',
  },
];

// ─── Server icon SVG ──────────────────────────────────
function ServerIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="4" width="28" height="8" rx="3" fill="#f8fafc" stroke={color} strokeWidth="1.5" strokeOpacity="0.4"/>
      <circle cx="7" cy="8" r="2" fill={color} />
      <rect x="12" y="6" width="8" height="4" rx="1" fill={color} fillOpacity="0.4"/>
      <rect x="22" y="6.5" width="5" height="3" rx="1" fill={color} fillOpacity="0.2"/>
      
      <rect x="2" y="14" width="28" height="8" rx="3" fill="#f8fafc" stroke={color} strokeWidth="1.5" strokeOpacity="0.4"/>
      <circle cx="7" cy="18" r="2" fill={color} />
      <rect x="12" y="16" width="8" height="4" rx="1" fill={color} fillOpacity="0.4"/>
      <rect x="22" y="16.5" width="5" height="3" rx="1" fill={color} fillOpacity="0.2"/>
      
      <rect x="2" y="22" width="28" height="6" rx="3" fill="#f8fafc" stroke={color} strokeWidth="1.5" strokeOpacity="0.2"/>
    </svg>
  );
}

export default function ChooseServerPage() {
  const router = useRouter();
  const [slide, setSlide] = useState(0);
  const [hoveredServer, setHoveredServer] = useState<string | null>(null);
  const [connectingId, setConnectingId] = useState<string | null>(null);

  // Auto-advance carousel
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 3000);
    return () => clearInterval(t);
  }, []);

  const handleConnect = (srv: typeof SERVERS[0]) => {
    setConnectingId(srv.id);
    setTimeout(() => {
      // Navigate to auth login page with server param
      router.push(`/auth?server=${srv.id.replace('server-', '')}`);
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px 16px',
    }}>
      {/* ── Global Animated Background ── */}
      <div className="global-bg" />

      {/* ── Main card ── */}
      <div style={{
        width: '100%', maxWidth: 1000,
        background: '#ffffff',
        borderRadius: 32,
        border: '1px solid #e2e8f0',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
      }} className="server-card">
        
        {/* ── LEFT PANEL ── */}
        <div style={{
          flex: 1.2,
          background: 'linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)',
          borderRight: '1px solid #e2e8f0',
          padding: '60px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }} className="server-left">
          
          {/* Logo */}
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 99, padding: '8px 20px',
              marginBottom: 40,
              boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: '#2563eb',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              }}>
                <Zap size={14} color="#fff" />
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', letterSpacing: '0.05em' }}>
                GLOBAL SMARTAPP
              </div>
            </div>

            {/* Illustration */}
            <div style={{ marginBottom: 40, animation: 'float 6s ease-in-out infinite' }}>
              <IllustrationServer />
            </div>
          </div>

          {/* Carousel slide */}
          <div style={{ textAlign: 'center', width: '100%' }}>
            {/* Icon */}
            <div style={{
              width: 64, height: 64, borderRadius: 20,
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              transition: 'all 0.4s ease',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            }}>
              {SLIDES[slide].icon}
            </div>

            <h3 style={{
              fontSize: '1.25rem', fontWeight: 800, color: '#0f172a',
              marginBottom: 12, lineHeight: 1.3,
            }}>
              {SLIDES[slide].title}
            </h3>
            <p style={{
              fontSize: '0.9rem', color: '#64748b',
              lineHeight: 1.6, maxWidth: 300, margin: '0 auto 24px',
            }}>
              {SLIDES[slide].desc}
            </p>

            {/* Dots */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              {SLIDES.map((_, i) => (
                <button key={i}
                  onClick={() => setSlide(i)}
                  style={{
                    width: i === slide ? 32 : 8,
                    height: 8, borderRadius: 99,
                    background: i === slide ? '#2563eb' : '#cbd5e1',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{
          flex: 1,
          padding: '60px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#ffffff',
        }} className="server-right">
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h1 style={{
              fontSize: '2rem', fontWeight: 900, color: '#0f172a',
              marginBottom: 12, lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>
              Pilih Server
            </h1>
            <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
              Pilih server untuk melanjutkan login
            </p>
          </div>

          {/* Server buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            {SERVERS.map(srv => {
              const isHovered = hoveredServer === srv.id;
              const isConnecting = connectingId === srv.id;

              return (
                <button
                  key={srv.id}
                  onClick={() => !connectingId && handleConnect(srv)}
                  onMouseEnter={() => setHoveredServer(srv.id)}
                  onMouseLeave={() => setHoveredServer(null)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    background: '#ffffff',
                    border: isHovered || isConnecting
                      ? `2px solid ${srv.color}`
                      : '1px solid #e2e8f0',
                    borderRadius: 20,
                    padding: '0',
                    cursor: connectingId ? 'not-allowed' : 'pointer',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                    boxShadow: isHovered && !isConnecting
                      ? `0 10px 25px -5px ${srv.color}40`
                      : '0 4px 6px -1px rgba(0,0,0,0.05)',
                    transform: isHovered && !isConnecting ? 'translateY(-3px)' : 'translateY(0)',
                  }}
                >
                  {/* Left colored badge */}
                  <div style={{
                    width: 90,
                    padding: '24px 12px',
                    background: `color-mix(in srgb, ${srv.color} 10%, transparent)`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    flexShrink: 0,
                    borderRight: `1px solid color-mix(in srgb, ${srv.color} 20%, transparent)`,
                  }}>
                    <ServerIcon color={srv.color} />
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 900, color: srv.color,
                      letterSpacing: '0.05em', textTransform: 'uppercase',
                    }}>
                      {srv.label}
                    </span>
                  </div>

                  {/* Right: text + arrow */}
                  <div style={{ flex: 1, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{
                        fontSize: '1rem', fontWeight: 800, color: '#0f172a',
                        marginBottom: 6,
                      }}>
                        {isConnecting ? 'Menghubungkan...' : 'Login Sekarang'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: '#16a34a',
                          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                          animation: 'pulse-dot 2s ease-in-out infinite',
                        }} />
                        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>
                          Online · Ping {srv.ping}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: isConnecting ? 'transparent' : `color-mix(in srgb, ${srv.color} 10%, transparent)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'all 0.2s',
                    }}>
                      {isConnecting ? (
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%',
                          border: '3px solid #e2e8f0',
                          borderTopColor: srv.color,
                          animation: 'spin 0.8s linear infinite',
                        }} />
                      ) : (
                        <ArrowRight size={20} color={srv.color} />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Back link */}
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <a href="/" style={{
              fontSize: '0.9rem', color: '#64748b',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
              fontWeight: 700, transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#0f172a')}
            onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
            >
              &larr; Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(0,0,0,0.1); }
          50% { opacity: 0.5; box-shadow: 0 0 12px rgba(0,0,0,0.1); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 900px) {
          .server-card {
            flex-direction: column !important;
            max-width: 500px !important;
          }
          .server-left {
            padding: 40px 32px !important;
            border-right: none !important;
            border-bottom: 1px solid #e2e8f0 !important;
          }
          .server-right {
            width: 100% !important;
            padding: 40px 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
