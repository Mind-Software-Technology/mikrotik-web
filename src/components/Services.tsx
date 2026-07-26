'use client';

import React from 'react';
import { Router, Cpu, CreditCard, MessageSquareCode, MessageCircle, MapPin, Users, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServicesProps {
  onOpenDemo: (tab?: 'admin' | 'payment' | 'client') => void;
}

const SERVICES = [
  { icon: <Router size={24} />, color: '#2563eb', title: 'Integrasi Mikrotik', desc: 'Hotspot, PPPoE, Secret & Profile Management via RouterOS API. Kelola semua router dari satu dashboard.', tags: ['RouterOS API', 'Hotspot', 'PPPoE'] },
  { icon: <Cpu size={24} />, color: '#7c3aed', title: 'Integrasi OLT', desc: 'Dukungan penuh VSOL, HSGQ, HIOSO, ZTE untuk jaringan GPON & EPON fiber optik.', tags: ['GPON', 'EPON', 'ZTE', 'VSOL'] },
  { icon: <CreditCard size={24} />, color: '#16a34a', title: 'Payment Gateway', desc: 'Integrasi Midtrans, Xendit & Global Gateway. VA, QRIS, e-Wallet dalam satu sistem.', tags: ['Midtrans', 'Xendit', 'QRIS'] },
  { icon: <MessageSquareCode size={24} />, color: '#d97706', title: 'Bot Telegram', desc: 'Notifikasi tagihan, perpanjangan otomatis, dan broadcast ke pelanggan via Telegram.', tags: ['Notifikasi', 'Broadcast', 'Auto-renew'] },
  { icon: <MessageCircle size={24} />, color: '#0d9488', title: 'WA Gateway', desc: 'Kirim invoice & OTP via WhatsApp. Respon otomatis dengan template yang fleksibel.', tags: ['Invoice WA', 'OTP', 'Auto Reply'] },
  { icon: <MapPin size={24} />, color: '#dc2626', title: 'Maps ODP Fiber', desc: 'Peta distribusi ODP & titik jaringan berbasis Google Maps untuk survei & monitoring.', tags: ['Google Maps', 'ODP', 'Coverage'] },
  { icon: <Users size={24} />, color: '#2563eb', title: 'Manajemen Pelanggan', desc: 'Database pelanggan lengkap, riwayat tagihan, histori paket, dan laporan keuangan.', tags: ['CRM', 'Laporan', 'Invoice'] },
  { icon: <Monitor size={24} />, color: '#9333ea', title: 'Dashboard Real-Time', desc: 'Monitor trafik jaringan, status pelanggan, dan pendapatan secara real-time.', tags: ['Real-time', 'Analytics', 'Monitoring'] },
];

export default function Services({ onOpenDemo }: ServicesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }
  };

  return (
    <section id="features" className="section" style={{ background: '#f8fafc', padding: '100px 0' }}>
      <div className="container">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="section-header" style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div className="section-label" style={{ 
            display: 'inline-flex',
            background: '#eff6ff', color: '#2563eb',
            border: '1px solid #bfdbfe',
            boxShadow: '0 4px 10px rgba(37,99,235,0.1)',
            padding: '6px 14px', borderRadius: 99,
            fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em',
            marginBottom: 20
          }}>Fitur Unggulan</div>
          <h2 className="section-title" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 20 }}>
            Semua yang Anda Butuhkan <br/><span style={{ color: '#2563eb' }}>dalam Satu Platform</span>
          </h2>
          <p className="section-subtitle" style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            Dari manajemen router hingga penagihan otomatis — integrasi lengkap agar
            bisnis RT/RW Net Anda berjalan mulus tanpa hambatan.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32, position: 'relative', zIndex: 10 }}
        >
          {SERVICES.map(svc => (
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)' }}
              key={svc.title} className="service-card" style={{ 
              padding: 40, 
              background: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 10px 25px -10px rgba(0,0,0,0.05)',
              display: 'flex', flexDirection: 'column',
              transition: 'all 0.2s ease',
              border: '1px solid #e2e8f0'
            }}
            >
              <div
                className="feature-card-icon"
                style={{ 
                  width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 24,
                  color: svc.color, 
                  background: `color-mix(in srgb, ${svc.color} 10%, transparent)`,
                  boxShadow: `0 4px 15px color-mix(in srgb, ${svc.color} 20%, transparent)`
                }}
              >
                {svc.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', marginBottom: 16, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>{svc.title}</h3>
              <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.7 }}>{svc.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative element (Dot Grid like in image) */}
        <div style={{
          position: 'absolute', bottom: -50, left: -50, zIndex: 0,
          opacity: 0.1
        }}>
          <svg width="150" height="150" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" fill="#0f172a" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100" height="100" fill="url(#dotPattern)" />
          </svg>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => onOpenDemo('admin')}
            style={{ padding: '14px 28px', fontSize: '1.05rem' }}
          >
            Lihat Demo Semua Fitur &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
