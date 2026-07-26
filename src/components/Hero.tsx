'use client';

import React from 'react';
import { ArrowRight, CheckCircle, Zap, Play, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenRegisterModal: () => void;
  onOpenDemo: (tab?: 'admin' | 'payment' | 'client') => void;
}

export default function Hero({ onOpenRegisterModal, onOpenDemo }: HeroProps) {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="home" className="hero-section" style={{
      paddingTop: 180, paddingBottom: 140, position: 'relative'
    }}>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', gap: 60 }}>
          
          {/* LEFT: Text */}
          <motion.div 
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="badge" style={{ 
              marginBottom: 32, 
              background: '#ffffff', 
              border: '1px solid #e2e8f0', 
              color: '#3b82f6',
              boxShadow: '0 4px 20px rgba(59,130,246,0.15)',
              padding: '8px 16px'
            }}>
              <Zap size={14} style={{ marginRight: 8, color: '#f59e0b' }} /> Sistem Terpadu Global 2.0
            </motion.div>

            <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(3rem, 5vw, 4.8rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: 24, letterSpacing: '-0.03em', color: '#0f172a' }}>
              Integrasi Cerdas<br />
              <span style={{ 
                background: 'linear-gradient(135deg, #2563eb, #8b3dff)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                Mikrotik & OLT
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.7, marginBottom: 48, maxWidth: 540, fontWeight: 400 }}>
              BILLING GLOBAL adalah aplikasi berbasis website yang dirancang untuk memudahkan manajemen Mikrotik dan OLT Anda. Pantau jaringan di mana pun dan kapan pun dengan satu klik.
            </motion.p>

            {/* Feature checklist */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
              {[
                'Dukungan penuh perangkat VSOL, HSGQ, dan ZTE.',
                'Integrasi Payment Gateway otomatis (VA & QRIS).',
                'Sistem Notifikasi WhatsApp dan Telegram.'
              ].map((f, i) => (
                <motion.div key={f} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1), duration: 0.6, ease: "easeOut" }}
                  style={{ display: 'flex', alignItems: 'center', gap: 14 }}
                >
                  <div style={{ background: '#eff6ff', padding: 6, borderRadius: '50%', boxShadow: '0 2px 10px rgba(59,130,246,0.1)' }}>
                    <CheckCircle size={16} color="#3b82f6" strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: '1.05rem', color: '#334155', fontWeight: 600 }}>{f}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <button 
                onClick={onOpenRegisterModal}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  color: '#ffffff', padding: '16px 32px', borderRadius: 99,
                  fontWeight: 700, fontSize: '1.05rem', border: 'none', cursor: 'pointer',
                  boxShadow: '0 10px 25px -5px rgba(37,99,235,0.4)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(37,99,235,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(37,99,235,0.4)'; }}
              >
                Registrasi Sekarang <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => onOpenDemo('admin')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: '#ffffff', color: '#0f172a', 
                  padding: '16px 32px', borderRadius: 99,
                  fontWeight: 700, fontSize: '1.05rem', border: '1px solid #e2e8f0', cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                  transition: 'background 0.2s, transform 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Play size={18} fill="currentColor" color="#3b82f6" /> Lihat Demo
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Modern Floating Card with Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: 1000 }}
          >
            <motion.div 
              className="animate-float"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid #ffffff',
                borderRadius: 40,
                padding: '60px 40px',
                boxShadow: '0 30px 60px -15px rgba(0,0,0,0.1), 0 0 40px rgba(59,130,246,0.1)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                maxWidth: 480, width: '100%',
                position: 'relative'
              }}
            >
              {/* Glass reflection */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)', borderRadius: '40px 40px 0 0', pointerEvents: 'none' }} />
              
              <img src="/logo.png" alt="Global CATV Logo" style={{ width: '100%', maxWidth: 360, display: 'block', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.05))', position: 'relative', zIndex: 1 }} />
              
              <div style={{ 
                marginTop: 40, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: '16px 24px', 
                display: 'flex', alignItems: 'center', gap: 16, width: '100%',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
              }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={24} color="#3b82f6" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>ISO 9001:2015 Certified</div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Standar Mutu Internasional</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
