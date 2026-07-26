'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, User, Layers, ArrowLeft } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminPaymentManager from './AdminPaymentManager';
import ClientPortal from './ClientPortal';

interface LiveDemoHubProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'admin' | 'payment' | 'client';
}

export default function LiveDemoHub({ isOpen, onClose, initialTab = 'admin' }: LiveDemoHubProps) {
  const [activeTab, setActiveTab] = useState<'admin' | 'payment' | 'client'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay p-2 md:p-6 z-[9999]">
      <div className="modal-content max-w-7xl w-full h-[92vh] flex flex-col overflow-hidden border border-cyan-500/40 shadow-2xl">
        {/* Top Hub Bar */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Kembali ke Landing Page"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                Interactive Live Demo <span className="badge badge-success text-[10px]">GLOBAL SMARTAPP SYSTEM</span>
              </h3>
              <p className="text-[11px] text-slate-400">Pilih modul di bawah ini untuk menguji coba fitur secara langsung</p>
            </div>
          </div>

          {/* Module Switcher Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Router & OLT
            </button>

            <button
              onClick={() => setActiveTab('payment')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'payment'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" /> Admin Kelola Pembayaran
            </button>

            <button
              onClick={() => setActiveTab('client')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'client'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Portal Pelanggan QRIS
            </button>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Active View Area */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-slate-950/70">
          {activeTab === 'admin' && <AdminDashboard />}
          {activeTab === 'payment' && <AdminPaymentManager />}
          {activeTab === 'client' && <ClientPortal />}
        </div>
      </div>
    </div>
  );
}
