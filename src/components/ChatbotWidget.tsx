'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Headphones } from 'lucide-react';

interface Msg { from: 'bot' | 'user'; text: string; time: string }

const RESPONSES: Record<string, string> = {
  default: 'Terima kasih sudah menghubungi Global SmartApp! Tim kami siap membantu 24/7. Ada yang bisa kami bantu?',
  harga: 'Harga paket kami mulai dari Rp 75.000/bulan (LITE) hingga Rp 400.000/bulan (OLT III). Semua paket termasuk setup gratis & support. Ingin info paket tertentu?',
  trial: 'Ya, kami menyediakan trial GRATIS 7 hari untuk semua paket! Tidak perlu kartu kredit. Hubungi kami untuk aktivasi trial Anda.',
  mikrotik: 'Global SmartApp mendukung integrasi penuh RouterOS API untuk manajemen Hotspot, PPPoE, Secret & Profile. Kompatibel dengan semua versi RouterOS.',
  olt: 'Kami mendukung OLT VSOL, HSGQ, HIOSO, dan ZTE untuk jaringan GPON/EPON. Setup biasanya selesai dalam 1-2 jam.',
  payment: 'Tersedia Midtrans, Xendit, dan Global Gateway. Mendukung VA Bank, QRIS, GoPay, OVO, Dana, dan transfer manual.',
  telegram: 'Bot Telegram kami kirim notifikasi tagihan, reminder perpanjangan, dan broadcast promo. Pelanggan bisa cek tagihan via bot 24 jam.',
  whatsapp: 'WA Gateway terintegrasi untuk kirim invoice, OTP, dan notifikasi perpanjangan otomatis ke pelanggan.',
  support: 'Support kami tersedia 24/7 via WhatsApp, Telegram, dan Live Chat. Response time rata-rata < 15 menit.',
};

function getBotReply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('harga') || t.includes('biaya') || t.includes('tarif') || t.includes('paket')) return RESPONSES.harga;
  if (t.includes('trial') || t.includes('gratis') || t.includes('coba')) return RESPONSES.trial;
  if (t.includes('mikrotik') || t.includes('router') || t.includes('pppoe') || t.includes('hotspot')) return RESPONSES.mikrotik;
  if (t.includes('olt') || t.includes('gpon') || t.includes('fiber') || t.includes('epon')) return RESPONSES.olt;
  if (t.includes('payment') || t.includes('bayar') || t.includes('midtrans') || t.includes('qris')) return RESPONSES.payment;
  if (t.includes('telegram') || t.includes('bot')) return RESPONSES.telegram;
  if (t.includes('whatsapp') || t.includes('wa')) return RESPONSES.whatsapp;
  if (t.includes('support') || t.includes('bantuan') || t.includes('help')) return RESPONSES.support;
  return RESPONSES.default;
}

function now() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

const QUICK = ['Info Harga', 'Trial Gratis', 'Mikrotik API', 'Payment Gateway'];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: 'bot', text: 'Halo! 👋 Saya SmartBot, asisten AI Global SmartApp. Ada yang bisa saya bantu?', time: now() },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMessages(prev => [...prev, { from: 'user', text: t, time: now() }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: getBotReply(t), time: now() }]);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button onClick={() => setOpen(true)} aria-label="Chat" style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
          width: 56, height: 56, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e90ff, #0055c8)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          animation: 'pulse-chat 2s ease-in-out infinite',
        }}>
          <Headphones size={22} color="#fff" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
          width: 340, borderRadius: 14,
          background: '#fff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.2s ease',
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #1e90ff, #0055c8)',
            padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Bot size={18} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>SmartBot</div>
              <div style={{ fontSize: '0.67rem', color: 'rgba(255,255,255,0.8)' }}>● Online · Global SmartApp CS</div>
            </div>
            <button onClick={() => setMinimized(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 4 }}>
              {minimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
            </button>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 4 }}>
              <X size={16} />
            </button>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div style={{
                overflowY: 'auto', padding: 14,
                display: 'flex', flexDirection: 'column', gap: 10,
                maxHeight: 300, minHeight: 200,
                background: '#f8fafc',
              }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    flexDirection: msg.from === 'user' ? 'row-reverse' : 'row',
                    gap: 7, alignItems: 'flex-end',
                  }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                      background: msg.from === 'bot' ? 'linear-gradient(135deg,#1e90ff,#0055c8)' : '#e2e8f0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {msg.from === 'bot' ? <Bot size={13} color="#fff" /> : <User size={13} color="#64748b" />}
                    </div>
                    <div style={{
                      maxWidth: '75%',
                      background: msg.from === 'bot' ? '#fff' : '#1e90ff',
                      borderRadius: msg.from === 'bot' ? '12px 12px 12px 3px' : '12px 12px 3px 12px',
                      padding: '8px 11px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    }}>
                      <p style={{ fontSize: '0.8rem', color: msg.from === 'bot' ? '#1a1a2e' : '#fff', lineHeight: 1.55, margin: 0 }}>
                        {msg.text}
                      </p>
                      <span style={{ fontSize: '0.6rem', color: msg.from === 'bot' ? '#94a3b8' : 'rgba(255,255,255,0.7)', marginTop: 3, display: 'block', textAlign: msg.from === 'user' ? 'right' : 'left' }}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: 'linear-gradient(135deg,#1e90ff,#0055c8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Bot size={13} color="#fff" />
                    </div>
                    <div style={{
                      background: '#fff', borderRadius: '12px 12px 12px 3px',
                      padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    }}>
                      {[0, 1, 2].map(d => (
                        <div key={d} style={{
                          width: 5, height: 5, borderRadius: '50%',
                          background: '#1e90ff',
                          animation: `bounce 1s ease-in-out ${d * 0.15}s infinite`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              {/* Quick replies */}
              <div style={{
                padding: '8px 10px', display: 'flex', flexWrap: 'wrap', gap: 5,
                borderTop: '1px solid #f1f5f9', background: '#fff',
              }}>
                {QUICK.map(q => (
                  <button key={q}
                    onClick={() => setInput(q)}
                    style={{
                      padding: '4px 9px', borderRadius: 12,
                      border: '1px solid #e2e8f0',
                      background: '#f8fafc', color: '#475569',
                      fontSize: '0.68rem', cursor: 'pointer', fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#1e90ff';
                      (e.currentTarget as HTMLButtonElement).style.color = '#1e90ff';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0';
                      (e.currentTarget as HTMLButtonElement).style.color = '#475569';
                    }}
                  >{q}</button>
                ))}
              </div>

              {/* Input */}
              <div style={{
                padding: '10px 12px',
                display: 'flex', gap: 8, alignItems: 'center',
                borderTop: '1px solid #f1f5f9', background: '#fff',
              }}>
                <input
                  className="input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Ketik pesan..."
                  style={{ borderRadius: 20, fontSize: '0.8rem', padding: '7px 14px' }}
                />
                <button onClick={send} disabled={!input.trim()} style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: input.trim() ? 'linear-gradient(135deg,#1e90ff,#0055c8)' : '#f1f5f9',
                  border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  transition: 'all 0.2s',
                }}>
                  <Send size={14} color={input.trim() ? '#fff' : '#94a3b8'} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
