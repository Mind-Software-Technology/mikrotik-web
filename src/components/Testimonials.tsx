'use client';

import React from 'react';
import { User } from 'lucide-react';

const PARTNERS = [
  'Tekling Media Telematika', 'JAVA MEDIA', 'evanet NETWORK', 'BOOMBAS',
  'Saktinet.com', 'trustnet', 'CROSSNET', 'garudamedia.net',
  'Digi.wifi', 'NET Hotspot', 'ROCKNET', 'LinkBit',
  'SE_WUDONET', 'VERTIGO', 'Majapahit Network', 'KAMBAR.NET'
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section" style={{ background: '#ffffff', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative Background Shapes */}
      <div style={{ position: 'absolute', top: -50, left: 0, width: 300, height: 200, background: 'rgba(167, 139, 250, 0.1)', borderRadius: '0 0 100% 0', transform: 'rotate(-10deg)' }} />
      <div style={{ position: 'absolute', top: -50, right: -50, width: 400, height: 300, background: 'rgba(167, 139, 250, 0.15)', borderRadius: '0 0 0 100%', transform: 'rotate(10deg)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 className="section-title" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: 16 }}>
            Buat Usahamu Menjadi Lebih <span style={{ color: '#2563eb' }}>Profesional</span>
          </h2>
          <p className="section-subtitle" style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            Mari bergabung dengan pengusaha RT/RW Net lainnya dan buat usahamu menjadi lebih mudah dan terstruktur.
          </p>
        </div>

        {/* Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2.5fr', gap: 40, alignItems: 'center' }} className="mitra-grid">
          
          {/* Left: Mitra Card */}
          <div style={{ position: 'relative' }}>
            <div className="card" style={{ 
              padding: 48, 
              background: '#ffffff',
              borderRadius: '32px 32px 32px 0',
              boxShadow: '0 20px 50px -10px rgba(0,0,0,0.08)',
              border: '1px solid #f1f5f9',
              display: 'flex', flexDirection: 'column',
              position: 'relative', zIndex: 10
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', background: '#f8fafc',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 32, border: '1px solid #e2e8f0',
                boxShadow: '0 10px 20px -5px rgba(0,0,0,0.05)'
              }}>
                <User size={32} color="#475569" fill="#e2e8f0" />
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', letterSpacing: '0.05em', marginBottom: 8, textTransform: 'uppercase' }}>
                MITRA KAMI
              </div>
              <div style={{ fontSize: '4rem', fontWeight: 900, color: '#0f172a', lineHeight: 1, letterSpacing: '-0.03em' }}>
                1857
              </div>
            </div>

            {/* Dot Grid Decoration */}
            <div style={{
              position: 'absolute', bottom: -30, left: -40, zIndex: 0,
              opacity: 0.15
            }}>
              <svg width="120" height="120" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dotPattern2" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="2" fill="#0f172a" />
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100" height="100" fill="url(#dotPattern2)" />
              </svg>
            </div>
            
            {/* Background Light Blue Circle Decoration */}
            <div style={{
              position: 'absolute', bottom: -60, left: 40, width: 150, height: 150,
              background: 'rgba(56, 189, 248, 0.1)', borderRadius: '50%', zIndex: -1
            }} />
          </div>

          {/* Right: Partner Logos Grid */}
          <div style={{ 
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
            gap: '24px 32px', alignContent: 'center' 
          }}>
            {PARTNERS.map((partner, i) => (
              <div key={i} style={{ 
                height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
                filter: 'grayscale(100%) opacity(0.5)', transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.filter = 'grayscale(0%) opacity(1)';
                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.filter = 'grayscale(100%) opacity(0.5)';
                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
              }}
              >
                {/* Simulated Logo Typography */}
                <div style={{ 
                  fontSize: partner.length > 15 ? '0.75rem' : '0.9rem', 
                  fontWeight: 900, color: '#334155', textAlign: 'center',
                  fontFamily: i % 2 === 0 ? 'inherit' : 'sans-serif',
                  letterSpacing: i % 3 === 0 ? '-0.02em' : '0.05em'
                }}>
                  {partner.toUpperCase()}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .mitra-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
