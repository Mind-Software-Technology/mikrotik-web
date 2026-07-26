'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, ShieldCheck, MapPin, Mail, Phone, Lock, Check, Zap } from 'lucide-react';

const PLANS = [
  { id: 'lite-1', name: 'LITE I', price: '75.000', color: '#2dd4bf',
    features: ['1 Router Mikrotik', 'Hotspot Manager', '200 User Hotspot', 'Payment Gateway', '1 Admin'] },
  { id: 'olt-1', name: 'OLT I', price: '150.000', color: '#3b82f6',
    features: ['2 Router Mikrotik', '2 OLT', '500 User PPP & Hotspot', 'WA Gateway', '3 Admin'] },
  { id: 'olt-2', name: 'OLT II', price: '250.000', color: '#8b3dff', popular: true,
    features: ['5 Router Mikrotik', '5 OLT', '1.000 User PPP & Hotspot', 'Multi Payment GW', '10 Admin'] },
  { id: 'olt-3', name: 'OLT III', price: '400.000', color: '#f59e0b',
    features: ['Unlimited Router', 'Unlimited OLT', '5.000 User PPP & Hotspot', 'Semua Payment GW', 'Unlimited Admin'] },
];

export default function RegistrationPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>('olt-2');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    businessName: '',
    address: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/billing'); // Redirect to dashboard on success
    }, 2000);
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'transparent', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      
      {/* ─── Top Gradient Header ─── */}
      <div style={{
        background: 'linear-gradient(135deg, #8b3dff, #3b82f6)',
        padding: '32px 24px',
        textAlign: 'center',
        color: '#fff',
        position: 'relative', zIndex: 1
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.02em' }}>
          Bergabunglah bersama kami dan nikmati layanan terbaik untuk bisnis internet Anda
        </h2>
      </div>

      {/* ─── Stepper ─── */}
      <div style={{ padding: '32px 24px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {['Data Diri', 'Pilih Paket', 'Konfirmasi'].map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: i < 2 ? '#8b3dff' : '#e2e8f0',
                color: i < 2 ? '#fff' : '#94a3b8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: '0.9rem',
                boxShadow: i < 2 ? '0 4px 10px rgba(139,61,255,0.3)' : 'none'
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: 600, color: i < 2 ? '#0f172a' : '#94a3b8' }}>
                {step}
              </span>
              {i < 2 && <div style={{ width: 40, height: 2, background: '#e2e8f0' }} />}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div style={{ flex: 1, padding: '0 24px 64px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 32, alignItems: 'flex-start' }} className="reg-layout">
          
          {/* LEFT: Account Info Form */}
          <form onSubmit={handleRegister} className="glass-card" style={{ flex: 1, padding: 40, background: '#ffffff', borderRadius: 24, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <div style={{ background: '#eff6ff', padding: 10, borderRadius: 12 }}>
                <User size={24} color="#3b82f6" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Informasi Akun</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="reg-form-grid">
              <div>
                <label className="form-label">Nama Lengkap</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="text" className="input" placeholder="Masukkan nama lengkap" required style={{ paddingLeft: 44 }} />
                </div>
              </div>
              <div>
                <label className="form-label">Nama Mitra/Usaha</label>
                <div style={{ position: 'relative' }}>
                  <Zap size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="text" className="input" placeholder="Contoh: TEXA TUNNEL" required style={{ paddingLeft: 44 }} />
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Alamat (Kabupaten)</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="text" className="input" placeholder="Isikan dengan Kabupaten/Kota Anda" required style={{ paddingLeft: 44 }} />
                </div>
              </div>

              <div>
                <label className="form-label">Email</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="email" className="input" placeholder="email@example.com" required style={{ paddingLeft: 44 }} />
                </div>
              </div>
              <div>
                <label className="form-label">Nomor WhatsApp</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="tel" className="input" placeholder="087708770877" required style={{ paddingLeft: 44 }} />
                </div>
              </div>

              <div>
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="password" className="input" placeholder="Minimal 6 karakter" required style={{ paddingLeft: 44 }} />
                </div>
              </div>
              <div>
                <label className="form-label">Konfirmasi Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="password" className="input" placeholder="Ulangi password" required style={{ paddingLeft: 44 }} />
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: 18, fontSize: '1.1rem' }}>
                {loading ? 'Memproses...' : 'Daftar Sekarang'}
              </button>
            </div>
          </form>

          {/* RIGHT: Select Package */}
          <div style={{ flex: 1.2, padding: 40, background: '#ffffff', borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ display: 'inline-flex', background: '#f8fafc', padding: 10, borderRadius: 12, marginBottom: 12, border: '1px solid #e2e8f0' }}>
                <ShieldCheck size={24} color="#8b3dff" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Pilih Paket Layanan</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Klik pada paket yang sesuai dengan kebutuhan bisnis Anda</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              {PLANS.map(plan => (
                <motion.div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  whileHover={{ y: -4 }}
                  style={{
                    padding: 24, borderRadius: 20, cursor: 'pointer',
                    background: selectedPlan === plan.id ? '#ffffff' : '#f8fafc',
                    border: selectedPlan === plan.id ? `2px solid ${plan.color}` : '2px solid transparent',
                    boxShadow: selectedPlan === plan.id ? `0 10px 30px -10px ${plan.color}` : 'none',
                    transition: 'all 0.2s', position: 'relative', overflow: 'hidden'
                  }}
                >
                  <div className="badge" style={{ background: '#f1f5f9', color: '#64748b', marginBottom: 16 }}>{plan.name.split(' ')[0]}</div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>{plan.name}</h4>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: plan.color, marginBottom: 4, letterSpacing: '-0.02em' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 700 }}>Rp </span>{plan.price}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: 20 }}>/bulan</div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {plan.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#475569', fontWeight: 500 }}>
                        <Check size={14} color="#10b981" /> {f}
                      </li>
                    ))}
                  </ul>

                  {selectedPlan === plan.id && (
                    <div style={{
                      position: 'absolute', top: 16, right: 16, 
                      background: plan.color, color: '#fff', 
                      borderRadius: '50%', padding: 4, display: 'flex',
                      boxShadow: `0 4px 10px rgba(0,0,0,0.1)`
                    }}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 700;
          color: #475569;
          margin-bottom: 8px;
        }
        @media (max-width: 1024px) {
          .reg-layout { flex-direction: column; }
          .reg-layout > * { width: 100%; }
        }
        @media (max-width: 640px) {
          .reg-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
