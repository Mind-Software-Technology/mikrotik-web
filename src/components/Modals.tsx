'use client';

import React, { useState } from 'react';
import { X, Server, Globe, ShieldCheck, CheckCircle2, Zap, ChevronRight, LogIn } from 'lucide-react';

const SERVERS = [
  { id: 'sg', name: 'Singapore (SG)', flag: '🇸🇬', latency: '12ms', status: 'Optimal', cap: '94%', color: '#1e90ff' },
  { id: 'id-jkt', name: 'Jakarta (ID)', flag: '🇮🇩', latency: '5ms', status: 'Optimal', cap: '78%', color: '#059669' },
  { id: 'id-sby', name: 'Surabaya (ID)', flag: '🇮🇩', latency: '8ms', status: 'Optimal', cap: '62%', color: '#7c3aed' },
  { id: 'my', name: 'Malaysia (MY)', flag: '🇲🇾', latency: '18ms', status: 'Baik', cap: '45%', color: '#d97706' },
];

interface ServerModalProps { onClose: () => void }

export function ServerModal({ onClose }: ServerModalProps) {
  const [selected, setSelected] = useState('id-jkt');

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 460 }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid #f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(135deg,#1e90ff,#0055c8)',
          borderRadius: '12px 12px 0 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Server size={16} color="#fff" />
            <span style={{ fontWeight: 800, color: '#fff' }}>Pilih Server Login</span>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={14} />
          </button>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: 4 }}>
            Pilih server terdekat untuk koneksi terbaik.
          </p>
          {SERVERS.map(s => (
            <div key={s.id} onClick={() => setSelected(s.id)} style={{
              padding: '12px 16px', borderRadius: 8, cursor: 'pointer',
              border: selected === s.id ? `2px solid ${s.color}` : '1px solid #e2e8f0',
              background: selected === s.id ? `${s.color}08` : '#fff',
              display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: '1.2rem' }}>{s.flag}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}>{s.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Ping: {s.latency} · Kapasitas: {s.cap}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '0.72rem', color: s.color, fontWeight: 700 }}>{s.status}</span>
                {selected === s.id && <CheckCircle2 size={16} color={s.color} />}
              </div>
            </div>
          ))}

          <button className="btn btn-blue" style={{ marginTop: 4, justifyContent: 'center' }} onClick={onClose}>
            <LogIn size={14} /> Sign In Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Register Modal ────────────────────────────────────
interface RegisterModalProps { onClose: () => void; planName?: string; planPrice?: string }

export function RegisterModal({ onClose, planName, planPrice }: RegisterModalProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ nama: '', email: '', wa: '', isp: '' });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 480 }}>
        {/* Header */}
        <div style={{
          padding: '18px 20px',
          background: 'linear-gradient(135deg,#1e90ff,#0055c8)',
          borderRadius: '12px 12px 0 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>
              {step === 1 ? '🚀 Daftar Trial 7 Hari Gratis' : '✅ Konfirmasi Pendaftaran'}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.85)' }}>
              {planName ? `Paket ${planName} — Rp ${planPrice}/bln` : 'Semua fitur tersedia selama 7 hari'}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={14} />
          </button>
        </div>

        <div style={{ padding: 24 }}>
          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 24 }}>
            {[{ n: 1, label: 'Data Diri' }, { n: 2, label: 'Konfirmasi' }].map((s, i) => (
              <React.Fragment key={s.n}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: step >= s.n ? '#1e90ff' : '#f1f5f9',
                    color: step >= s.n ? '#fff' : '#94a3b8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
                  }}>{s.n}</div>
                  <span style={{ fontSize: '0.75rem', color: step >= s.n ? '#1e90ff' : '#94a3b8', fontWeight: 600 }}>{s.label}</span>
                </div>
                {i === 0 && <div style={{ flex: 1, height: 1, background: step > 1 ? '#1e90ff' : '#e2e8f0', margin: '0 12px' }} />}
              </React.Fragment>
            ))}
          </div>

          {step === 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>Nama Lengkap *</label>
                <input className="input" placeholder="Masukkan nama lengkap" value={form.nama} onChange={update('nama')} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>Email Aktif *</label>
                <input className="input" type="email" placeholder="nama@email.com" value={form.email} onChange={update('email')} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>No. WhatsApp *</label>
                <input className="input" placeholder="08xx-xxxx-xxxx" value={form.wa} onChange={update('wa')} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>Nama ISP / RT-RW Net</label>
                <input className="input" placeholder="Contoh: NetJawa" value={form.isp} onChange={update('isp')} />
              </div>
              <button
                className="btn btn-blue"
                style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
                onClick={() => setStep(2)}
                disabled={!form.nama || !form.email || !form.wa}
              >
                Lanjut <ChevronRight size={15} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{
                background: '#eff6ff', border: '1px solid #bfdbfe',
                borderRadius: 8, padding: '14px 16px',
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1e90ff', marginBottom: 10 }}>Ringkasan Pendaftaran</div>
                {[
                  { label: 'Nama', val: form.nama },
                  { label: 'Email', val: form.email },
                  { label: 'WhatsApp', val: form.wa },
                  { label: 'ISP', val: form.isp || '–' },
                  { label: 'Paket', val: planName || 'Trial Free (7 hari)' },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.8rem' }}>
                    <span style={{ color: '#64748b' }}>{r.label}</span>
                    <span style={{ fontWeight: 700, color: '#1a1a2e' }}>{r.val}</span>
                  </div>
                ))}
              </div>

              {['Trial 7 hari gratis – tidak perlu kartu kredit', 'Setup & onboarding oleh tim kami', 'Support 24/7 via WhatsApp & Telegram'].map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#475569' }}>
                  <CheckCircle2 size={14} color="#059669" style={{ flexShrink: 0 }} /> {b}
                </div>
              ))}

              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button className="btn" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: 'center', border: '1px solid #e2e8f0', background: '#fff', color: '#334155' }}>← Kembali</button>
                <button className="btn btn-blue" onClick={onClose} style={{ flex: 1, justifyContent: 'center' }}>
                  <Zap size={14} /> Aktivasi Trial!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
