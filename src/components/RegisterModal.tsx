'use client';

import React, { useState } from 'react';
import { X, ClipboardList, CheckCircle2, ShieldCheck } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: { name: string; price: string };
  onSuccessDemo: () => void;
}

export default function RegisterModal({ isOpen, onClose, selectedPlan, onSuccessDemo }: RegisterModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    ispName: '',
    phone: '',
    email: '',
    mikrotikType: 'RB750Gr3 / RB3018'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      onSuccessDemo();
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-lg p-6 relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Registrasi Trial 7 Hari Gratis</h3>
              <p className="text-xs text-slate-400">Tanpa kartu kredit, langsung aktifkan portal billing anda</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-white">Registrasi Berhasil!</h4>
            <p className="text-xs text-slate-300">
              Mengarahkan Anda langsung ke Interactive Live Demo Portal...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {selectedPlan && (
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
                <span className="text-slate-300 font-semibold">Paket Yang Dipilih:</span>
                <span className="text-cyan-300 font-bold">{selectedPlan.name} ({selectedPlan.price})</span>
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Nama Pemilik / Owner RT/RW Net</label>
              <input
                type="text"
                required
                placeholder="Contoh: Rian Hernanda"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Usaha / ISP</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: TexaNet Fiber"
                  value={formData.ispName}
                  onChange={(e) => setFormData({ ...formData, ispName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">No. WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="08123456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Tipe Router / OLT Utama</label>
              <select
                value={formData.mikrotikType}
                onChange={(e) => setFormData({ ...formData, mikrotikType: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                <option>MikroTik RB750Gr3 / hEX / hAP</option>
                <option>MikroTik CCR1009 / CCR2004</option>
                <option>OLT VSOL / HSGQ / HIOSO EPON</option>
                <option>OLT ZTE C300 / C320 GPON</option>
                <option>OLT Huawei GPON</option>
              </select>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
              <button type="button" onClick={onClose} className="btn-secondary text-xs">
                Batal
              </button>
              <button type="submit" className="btn-primary text-xs">
                <ShieldCheck className="w-4 h-4" /> Aktifkan Trial 7 Hari
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
