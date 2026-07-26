'use client';

import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, MessageCircle, ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenDemo: (tab?: 'admin' | 'payment' | 'client') => void;
}

const LINKS = {
  Produk: [
    { label: 'Fitur Mikrotik', href: '#features' },
    { label: 'Fitur OLT', href: '#features' },
    { label: 'Payment Gateway', href: '#features' },
    { label: 'Bot Telegram', href: '#features' },
    { label: 'Maps ODP', href: '#features' },
  ],
  Harga: [
    { label: 'Paket OLT', href: '#pricing' },
    { label: 'Paket LITE', href: '#pricing' },
    { label: 'Paket BRONZE', href: '#pricing' },
    { label: 'Paket SILVER', href: '#pricing' },
    { label: 'Trial Gratis', href: '#pricing' },
  ],
  Perusahaan: [
    { label: 'Tentang Kami', href: '#about' },
    { label: 'Blog', href: '#' },
    { label: 'Karir', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

export default function Footer({ onOpenDemo }: FooterProps) {
  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      paddingTop: 80,
      paddingBottom: 40,
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48,
          marginBottom: 64,
        }}>
          {/* Brand & Contact Column */}
          <div className="footer-brand-col" style={{ gridColumn: '1 / -1', maxWidth: 400 }}>
            <div style={{ marginBottom: 24 }}>
              <img src="/logo.png" alt="Global SmartApp" style={{ height: 48, objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 32, color: '#64748b' }}>
              Platform billing & manajemen jaringan RT/RW Net terpadu #1 di Indonesia.
              Integrasi cerdas dengan Mikrotik, OLT GPON/EPON, dan Payment Gateway otomatis.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: <Phone size={16} />, text: '+62 813-XXXX-XXXX' },
                { icon: <Mail size={16} />, text: 'support@globalsmartapp.com' },
                { icon: <MapPin size={16} />, text: 'Indonesia (Layanan Nasional)' },
              ].map(c => (
                <div key={c.text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ background: '#f8fafc', padding: 8, borderRadius: 8, border: '1px solid #e2e8f0', display: 'flex', color: '#3b82f6' }}>
                    {c.icon}
                  </div>
                  <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <h4 style={{
                fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase',
                letterSpacing: '0.08em', color: '#0f172a', marginBottom: 24,
              }}>
                {title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, padding: 0, margin: 0 }}>
                {items.map(item => (
                  <li key={item.label}>
                    <a href={item.href} style={{
                      fontSize: '0.9rem', color: '#64748b', textDecoration: 'none',
                      transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 500
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#3b82f6';
                      (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#64748b';
                      (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(0)';
                    }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 32, borderTop: '1px solid #f1f5f9'
        }}>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
            © {new Date().getFullYear()} PT Global Teknologi CATV Indonesia. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#" style={{ 
              color: '#64748b', textDecoration: 'none', fontSize: '0.85rem', 
              display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600,
              padding: '6px 12px', background: '#f8fafc', borderRadius: 99, transition: 'all 0.2s'
            }}
            onMouseEnter={e => { (e.currentTarget.style.color = '#22c55e'); (e.currentTarget.style.background = '#f0fdf4'); }}
            onMouseLeave={e => { (e.currentTarget.style.color = '#64748b'); (e.currentTarget.style.background = '#f8fafc'); }}
            >
              <MessageCircle size={14} /> Hubungi via WhatsApp
            </a>
            <a href="https://global-smartapp.com" target="_blank" rel="noopener noreferrer" style={{ 
              color: '#64748b', textDecoration: 'none', fontSize: '0.85rem', 
              display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600,
              padding: '6px 12px', background: '#f8fafc', borderRadius: 99, transition: 'all 0.2s'
            }}
            onMouseEnter={e => { (e.currentTarget.style.color = '#3b82f6'); (e.currentTarget.style.background = '#eff6ff'); }}
            onMouseLeave={e => { (e.currentTarget.style.color = '#64748b'); (e.currentTarget.style.background = '#f8fafc'); }}
            >
              <ExternalLink size={14} /> Website Resmi
            </a>
          </div>
        </div>
      </div>
      
      <style>{`
        @media (min-width: 900px) {
          .footer-brand-col { grid-column: span 2 !important; }
        }
      `}</style>
    </footer>
  );
}
