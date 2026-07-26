'use client';

import React, { useState } from 'react';
import { Check, Star, Zap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PricingProps {
  onSelectPlan: (planName: string, price: string) => void;
}

type Category = 'OLT' | 'LITE' | 'BRONZE' | 'SILVER';

const PLANS: Record<Category, {
  id: string; name: string; price: string; desc: string;
  features: string[]; popular?: boolean; color: string;
}> = {
  OLT: [
    { id: 'olt-1', name: 'OLT I', price: '150.000', color: '#3b82f6',
      desc: '2 Router Mikrotik + 2 OLT + 500 PPP',
      features: ['2 Router Mikrotik', '2 OLT (VSOL/HSGQ)', '500 PPP Secrets', 'Payment Gateway', 'Bot Telegram', 'WA Gateway', 'Maps ODP', '3 Admin'] },
    { id: 'olt-2', name: 'OLT II', price: '250.000', color: '#8b3dff', popular: true,
      desc: '5 Router Mikrotik + 5 OLT + 1.000 PPP',
      features: ['5 Router Mikrotik', '5 OLT GPON/EPON', '1.000 PPP Secrets', 'Multi Payment GW', 'Bot Telegram Pro', 'WA Gateway', 'Maps ODP', '10 Admin'] },
    { id: 'olt-3', name: 'OLT III', price: '400.000', color: '#2dd4bf',
      desc: 'Unlimited Router + Unlimited OLT + 5.000 PPP',
      features: ['Unlimited Mikrotik', 'Unlimited OLT', '5.000 PPP Secrets', 'Semua Payment GW', 'Bot Telegram Pro', 'WA Gateway Pro', 'Maps ODP Pro', 'Unlimited Admin'] },
  ],
  LITE: [
    { id: 'lite-1', name: 'LITE I', price: '75.000', color: '#2dd4bf',
      desc: '1 Router + Hotspot + 200 User',
      features: ['1 Router Mikrotik', 'Hotspot Manager', '200 User Hotspot', 'Payment Gateway', 'Bot Telegram', '1 Admin'] },
    { id: 'lite-2', name: 'LITE II', price: '125.000', color: '#3b82f6', popular: true,
      desc: '3 Router + Hotspot + 500 User',
      features: ['3 Router Mikrotik', 'Hotspot Manager', '500 User Hotspot', 'Multi Payment GW', 'Bot Telegram', 'WA Gateway', '5 Admin'] },
  ],
  BRONZE: [
    { id: 'bronze-1', name: 'BRONZE I', price: '100.000', color: '#f59e0b',
      desc: '2 Router + PPPoE + 300 Secret',
      features: ['2 Router Mikrotik', 'PPPoE Manager', '300 PPP Secrets', 'Payment Gateway', 'Bot Telegram', '3 Admin'] },
    { id: 'bronze-2', name: 'BRONZE II', price: '180.000', color: '#ef4444', popular: true,
      desc: '5 Router + PPPoE + 800 Secret',
      features: ['5 Router Mikrotik', 'PPPoE Manager', '800 PPP Secrets', 'Multi Payment GW', 'Bot Telegram', 'WA Gateway', '7 Admin'] },
  ],
  SILVER: [
    { id: 'silver-1', name: 'SILVER', price: '200.000', color: '#94a3b8',
      desc: '3 Router + OLT 1 + PPPoE/Hotspot Mix',
      features: ['3 Router Mikrotik', '1 OLT', 'Mix PPPoE/Hotspot', 'Payment Gateway', 'Bot Telegram', 'WA Gateway', '5 Admin'] },
    { id: 'silver-2', name: 'SILVER PRO', price: '320.000', color: '#8b3dff', popular: true,
      desc: '10 Router + 3 OLT + 2.000 PPP',
      features: ['10 Router Mikrotik', '3 OLT GPON', '2.000 PPP Secrets', 'Semua Payment GW', 'Bot Telegram Pro', 'WA Gateway Pro', 'Maps ODP', '15 Admin'] },
  ],
};

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'OLT', label: 'OLT (GPON/EPON)' },
  { key: 'LITE', label: 'LITE (Hotspot)' },
  { key: 'BRONZE', label: 'BRONZE (PPPoE)' },
  { key: 'SILVER', label: 'SILVER (Mix)' },
];

export default function Pricing({ onSelectPlan }: PricingProps) {
  const [cat, setCat] = useState<Category>('OLT');
  const plans = PLANS[cat];

  return (
    <section id="pricing" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="badge badge-glow" style={{ marginBottom: 24 }}>Paket Harga</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 24, color: '#0f172a' }}>
            Pilih Paket yang <span className="text-gradient-primary">Tepat untuk Bisnis Anda</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
            Semua paket sudah termasuk setup gratis, training, dan support via WhatsApp & Telegram. 
            Tanpa biaya tersembunyi.
          </p>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 64 }}>
          <div style={{ 
            display: 'inline-flex', background: '#f8fafc', 
            border: '1px solid #e2e8f0',
            borderRadius: 99, padding: 8, overflowX: 'auto', maxWidth: '100%',
            backdropFilter: 'blur(10px)'
          }}>
            {CATEGORIES.map(c => (
              <button key={c.key} onClick={() => setCat(c.key)} style={{
                position: 'relative',
                background: 'transparent',
                color: cat === c.key ? '#0f172a' : '#64748b',
                border: 'none', borderRadius: 99, padding: '12px 28px',
                fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                transition: 'color 0.3s', whiteSpace: 'nowrap',
              }}>
                {cat === c.key && (
                  <motion.div
                    layoutId="pricing-tab"
                    style={{
                      position: 'absolute', inset: 0, 
                      background: '#ffffff',
                      border: '1px solid rgba(139,61,255,0.1)',
                      borderRadius: 99, zIndex: -1,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                    }}
                  />
                )}
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <motion.div 
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(plans.length, 3)}, 1fr)`,
            gap: 32,
            maxWidth: plans.length === 1 ? 400 : plans.length === 2 ? 800 : '100%',
            margin: '0 auto',
          }}
        >
          <AnimatePresence mode="popLayout">
            {plans.map((plan, i) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                key={plan.id} 
                className="glass-card" 
                style={{
                  position: 'relative', padding: 48,
                  display: 'flex', flexDirection: 'column',
                  ...(plan.popular ? {
                    borderColor: plan.color,
                    boxShadow: `0 20px 50px -15px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.1)`,
                    transform: 'scale(1.03)',
                    zIndex: 10
                  } : {})
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                    background: `linear-gradient(135deg, ${plan.color}, #3b82f6)`,
                    color: '#fff', padding: '6px 20px',
                    borderRadius: 99, fontSize: '0.75rem', fontWeight: 900,
                    display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                    boxShadow: `0 4px 15px rgba(0,0,0,0.1)`,
                    letterSpacing: '0.05em'
                  }}>
                    <Star size={14} fill="currentColor" /> PALING POPULER
                  </div>
                )}

                {/* Plan header */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
                    background: `color-mix(in srgb, ${plan.color} 10%, transparent)`, 
                    color: plan.color, border: `1px solid color-mix(in srgb, ${plan.color} 20%, transparent)`,
                    padding: '8px 16px', borderRadius: 12,
                  }}>
                    <Zap size={16} />
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.05em' }}>{plan.name}</span>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: 24, lineHeight: 1.6 }}>{plan.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 700 }}>Rp</span>
                    <span style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em' }}>{plan.price}</span>
                    <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/bln</span>
                  </div>
                </div>

                <div style={{ height: 1, background: '#f1f5f9', margin: '24px 0' }} />

                {/* Features */}
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 20, margin: '24px 0 40px', listStyle: 'none', flex: 1 }}>
                  {plan.features.map((f, index) => (
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (index * 0.05) }}
                      key={f} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: '0.95rem', color: '#475569', fontWeight: 500 }}
                    >
                      <div style={{ background: `color-mix(in srgb, ${plan.color} 15%, transparent)`, borderRadius: '50%', padding: 4, display: 'flex', flexShrink: 0 }}>
                        <Check size={14} color={plan.color} />
                      </div>
                      {f}
                    </motion.li>
                  ))}
                </ul>

                <button
                  className={plan.popular ? "btn btn-primary" : "btn btn-outline"}
                  onClick={() => onSelectPlan(plan.name, plan.price)}
                  style={{ width: '100%', padding: '16px', fontSize: '1.05rem' }}
                >
                  {plan.popular ? <Zap size={18} /> : <ShieldCheck size={18} />}
                  {plan.popular ? 'Mulai Sekarang' : 'Pilih Paket'}
                </button>
                
                {plan.popular && (
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(139,61,255,0.05), transparent 50%)', pointerEvents: 'none', zIndex: -1 }} />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <p style={{ textAlign: 'center', marginTop: 48, fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>
          * Trial 7 hari gratis tersedia untuk semua paket. Pembayaran via Transfer Bank, QRIS, atau VA.
        </p>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .glass-card { transform: none !important; }
        }
      `}</style>
    </section>
  );
}
