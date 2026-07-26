'use client';

import React, { useState } from 'react';
import { MessageCircle, Headphones, ShieldCheck, X } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {isOpen && (
        <div className="mb-3 p-4 glass-panel border border-emerald-500/40 w-72 space-y-3 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-400" /> Customer Support WA
            </span>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <a
              href="https://wa.me/6285242230599"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-between text-decoration-none transition-colors"
            >
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-bold text-white">Support Teknis</div>
                  <div className="text-[10px] text-slate-400">Jam Kerja 08:00 - 16:00</div>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500 text-slate-950 font-extrabold px-1.5 py-0.5 rounded">Chat</span>
            </a>

            <a
              href="https://wa.me/6281997974928"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 flex items-center justify-between text-decoration-none transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="font-bold text-white">Administrasi & Sales</div>
                  <div className="text-[10px] text-slate-400">Daftar Baru & Upgrade</div>
                </div>
              </div>
              <span className="text-[10px] bg-slate-800 text-cyan-300 font-extrabold px-1.5 py-0.5 rounded">Chat</span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2"
        title="Layanan Customer Support WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="hidden md:inline text-xs font-bold pr-1">Live Support WA</span>
      </button>
    </div>
  );
}
