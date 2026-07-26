'use client';

import React, { useState } from 'react';
import { CreditCard, QrCode, CheckCircle, Clock, Wifi, ShieldAlert, ArrowRight, Download, RefreshCw, Zap } from 'lucide-react';

export default function ClientPortal() {
  const [billStatus, setBillStatus] = useState<'Belum Bayar' | 'Lunas'>('Belum Bayar');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'qris' | 'bca' | 'gopay'>('qris');
  const [isProcessing, setIsProcessing] = useState(false);
  const [speedtesting, setSpeedtesting] = useState(false);
  const [speedResult, setSpeedResult] = useState<{ rx: number; tx: number } | null>({ rx: 20.4, tx: 5.2 });

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBillStatus('Lunas');
      setShowPaymentModal(false);
    }, 1500);
  };

  const handleRunSpeedtest = () => {
    setSpeedtesting(true);
    setTimeout(() => {
      setSpeedtesting(false);
      setSpeedResult({
        rx: +(19 + Math.random() * 2).toFixed(1),
        tx: +(4.8 + Math.random() * 1).toFixed(1)
      });
    }, 1800);
  };

  return (
    <div className="space-y-6 text-xs max-w-4xl mx-auto">
      {/* Top Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950 via-[#12193b] to-purple-950 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <span className="badge badge-info text-[10px]">Selamat Datang Pelanggan</span>
          <h3 className="text-xl font-bold text-white">Budi Santoso (RT 04 / No A2)</h3>
          <p className="text-slate-300 text-xs">ID Pelanggan: <strong className="text-cyan-300 font-mono">BKS-04-142</strong></p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] text-slate-400">Status Jaringan</div>
            <div className="text-emerald-400 font-bold text-xs flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> ONLINE (Terhubung)
            </div>
          </div>
          <button
            onClick={handleRunSpeedtest}
            disabled={speedtesting}
            className="btn-secondary text-xs py-2 px-4"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${speedtesting ? 'animate-spin' : ''}`} /> Speedtest
          </button>
        </div>
      </div>

      {/* Bill Status Alert Card */}
      <div className={`p-6 rounded-2xl border transition-all ${
        billStatus === 'Belum Bayar'
          ? 'bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)]'
          : 'bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border-emerald-500/40'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              {billStatus === 'Belum Bayar' ? (
                <Clock className="w-5 h-5 text-amber-400" />
              ) : (
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              )}
              <span className="text-sm font-extrabold text-white uppercase tracking-wider">
                Tagihan Bulan Juli 2026
              </span>
            </div>

            <div className="text-2xl font-black text-white">
              Rp 200.000 <span className="text-xs text-slate-400 font-normal">/ Home Fiber 20 Mbps</span>
            </div>

            <p className="text-xs text-slate-300">
              {billStatus === 'Belum Bayar' ? (
                <span>Jatuh tempo: <strong className="text-amber-300 font-semibold">30 Juli 2026</strong>. Bayar tepat waktu agar tidak terisolir otomatis.</span>
              ) : (
                <span className="text-emerald-300 font-semibold">LUNAS - Pembayaran Terverifikasi Otomatis Via QRIS.</span>
              )}
            </p>
          </div>

          <div>
            {billStatus === 'Belum Bayar' ? (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="btn-primary py-3 px-6 text-sm"
              >
                <CreditCard className="w-4 h-4" /> Bayar Tagihan Sekarang
              </button>
            ) : (
              <button disabled className="btn-emerald cursor-default py-2.5 px-5 text-xs">
                <CheckCircle className="w-4 h-4" /> Tagihan Sudah Lunas
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Package Info & Speedtest Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-panel p-5 space-y-3 border border-slate-800">
          <h4 className="text-xs font-bold text-white flex items-center gap-2">
            <Wifi className="w-4 h-4 text-cyan-400" /> Detail Paket Internet
          </h4>
          <div className="space-y-1.5 text-slate-300 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Paket:</span>
              <strong className="text-white">Home Fiber 20 Mbps</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">IP Public Remote:</span>
              <strong className="text-mono text-cyan-300">103.144.xxx.14</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Router Rumah:</span>
              <strong className="text-slate-200">ONT Huawei HG8245H</strong>
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 space-y-3 border border-slate-800">
          <h4 className="text-xs font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" /> Hasil Speedtest Terakhir
          </h4>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Download (RX)</div>
              <div className="text-lg font-bold text-emerald-400 mt-0.5">{speedResult?.rx} Mbps</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Upload (TX)</div>
              <div className="text-lg font-bold text-cyan-400 mt-0.5">{speedResult?.tx} Mbps</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content max-w-md p-6 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-cyan-400" /> Simulasi Payment Gateway
              </h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedMethod('qris')}
                  className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                    selectedMethod === 'qris'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  QRIS Instant
                </button>
                <button
                  onClick={() => setSelectedMethod('bca')}
                  className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                    selectedMethod === 'bca'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  BCA VA
                </button>
                <button
                  onClick={() => setSelectedMethod('gopay')}
                  className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                    selectedMethod === 'gopay'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  GoPay / OVO
                </button>
              </div>

              {/* QR Code Container */}
              <div className="p-6 rounded-2xl bg-white text-slate-900 text-center space-y-3 shadow-inner">
                <div className="w-40 h-40 bg-slate-950 p-3 rounded-xl mx-auto flex items-center justify-center border-2 border-cyan-500">
                  <QrCode className="w-32 h-32 text-cyan-400" />
                </div>
                <div className="text-xs font-bold text-slate-800">
                  Scan Dengan Aplikasi E-Wallet / Mobile Banking Anda
                </div>
                <div className="text-[11px] text-slate-500">
                  Total Tagihan: <strong className="text-slate-900 font-bold">Rp 200.000</strong>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
                <button onClick={() => setShowPaymentModal(false)} className="btn-secondary text-xs">
                  Batal
                </button>
                <button
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="btn-primary text-xs"
                >
                  {isProcessing ? 'Memproses Callback...' : 'Simulasi Pembayaran Sukses'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
