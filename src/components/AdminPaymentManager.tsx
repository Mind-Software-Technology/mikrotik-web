'use client';

import React, { useState } from 'react';
import { CreditCard, CheckCircle, Clock, AlertTriangle, Search, Filter, Printer, Check, X, Eye, FileText, Send, DollarSign } from 'lucide-react';

export interface Transaction {
  id: string;
  invoiceNo: string;
  clientName: string;
  planName: string;
  amount: number;
  date: string;
  method: string;
  status: 'Lunas' | 'Pending' | 'Expired';
  proofUrl?: string;
}

export default function AdminPaymentManager() {
  const [activeFilter, setActiveFilter] = useState<'Semua' | 'Pending' | 'Lunas' | 'Expired'>('Semua');
  const [searchTerm, setSearchTerm] = useState('');

  // Initial mock data for payment management
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx-1',
      invoiceNo: 'INV/2026/0726/001',
      clientName: 'Budi Santoso (RT 04 / Blok A2)',
      planName: 'Home Fiber 20 Mbps',
      amount: 200000,
      date: '26 Jul 2026 - 10:15',
      method: 'Transfer BCA (Manual)',
      status: 'Pending',
      proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 'tx-2',
      invoiceNo: 'INV/2026/0726/002',
      clientName: 'Rian Hernanda (RT 02 / No 14)',
      planName: 'Pro Speed 50 Mbps',
      amount: 350000,
      date: '26 Jul 2026 - 09:30',
      method: 'QRIS Auto Gateway',
      status: 'Lunas'
    },
    {
      id: 'tx-3',
      invoiceNo: 'INV/2026/0726/003',
      clientName: 'Siti Aminah (RT 01 / Blok C5)',
      planName: 'Home Fiber 10 Mbps',
      amount: 150000,
      date: '26 Jul 2026 - 08:45',
      method: 'Mandiri Virtual Account',
      status: 'Lunas'
    },
    {
      id: 'tx-4',
      invoiceNo: 'INV/2026/0725/088',
      clientName: 'Agus Setiawan (RT 05 / No 09)',
      planName: 'Home Fiber 20 Mbps',
      amount: 200000,
      date: '25 Jul 2026 - 22:10',
      method: 'Transfer Mandiri (Manual)',
      status: 'Pending',
      proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 'tx-5',
      invoiceNo: 'INV/2026/0724/042',
      clientName: 'Dedi Kurniawan (RT 03 / No 22)',
      planName: 'Hotspot Voucher 30 Hari',
      amount: 50000,
      date: '24 Jul 2026 - 14:00',
      method: 'Alfamart Payment',
      status: 'Expired'
    }
  ]);

  const [selectedProofTx, setSelectedProofTx] = useState<Transaction | null>(null);
  const [selectedPrintTx, setSelectedPrintTx] = useState<Transaction | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleApprove = (txId: string) => {
    setTransactions(prev => prev.map(t => t.id === txId ? { ...t, status: 'Lunas' } : t));
    setSelectedProofTx(null);
    showNotification('✅ Pembayaran berhasil diverifikasi & tagihan LUNAS!');
  };

  const handleReject = (txId: string) => {
    setTransactions(prev => prev.map(t => t.id === txId ? { ...t, status: 'Expired' } : t));
    setSelectedProofTx(null);
    showNotification('⚠️ Bukti transfer ditolak. Status tagihan menjadi Expired.');
  };

  const filteredTx = transactions.filter(t => {
    const matchesFilter = activeFilter === 'Semua' || t.status === activeFilter;
    const matchesSearch = t.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.planName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRevenue = transactions.filter(t => t.status === 'Lunas').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingCount = transactions.filter(t => t.status === 'Pending').length;

  return (
    <div className="space-y-6 text-xs">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-[9999] px-4 py-3 rounded-xl bg-slate-900 border border-emerald-500 text-emerald-300 font-semibold shadow-2xl animate-scaleUp">
          {toastMsg}
        </div>
      )}

      {/* Top Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400">Total Pendapatan Terverifikasi</div>
            <div className="text-xl font-extrabold text-white mt-1">
              Rp {totalRevenue.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/60 to-slate-900 border border-amber-500/30 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400">Pending Approvals</div>
            <div className="text-xl font-extrabold text-white mt-1">
              {pendingCount} Transaksi
            </div>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400">Metode Gateway Terbanyak</div>
            <div className="text-sm font-bold text-white mt-1">QRIS Auto & VA</div>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400">Auto WhatsApp Receipt</div>
            <div className="text-sm font-bold text-emerald-400 mt-1">Aktif 100%</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Send className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Control Bar: Filter Tabs & Search */}
      <div className="glass-panel p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {(['Semua', 'Pending', 'Lunas', 'Expired'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                activeFilter === filter
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {filter} {filter === 'Pending' && pendingCount > 0 && `(${pendingCount})`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari Invoice / Pelanggan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-panel overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider font-semibold">
                <th className="p-3.5">No. Invoice</th>
                <th className="p-3.5">Pelanggan & Paket</th>
                <th className="p-3.5">Nominal</th>
                <th className="p-3.5">Metode Pembayaran</th>
                <th className="p-3.5">Tanggal</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredTx.map(t => (
                <tr key={t.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-3.5 font-mono text-cyan-300 font-semibold">{t.invoiceNo}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-white">{t.clientName}</div>
                    <div className="text-[11px] text-slate-400">{t.planName}</div>
                  </td>
                  <td className="p-3.5 font-bold text-white">
                    Rp {t.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="p-3.5 text-slate-300">{t.method}</td>
                  <td className="p-3.5 text-slate-400 text-[11px]">{t.date}</td>
                  <td className="p-3.5">
                    {t.status === 'Lunas' && <span className="badge badge-success">Lunas</span>}
                    {t.status === 'Pending' && <span className="badge badge-pending">Perlu Verifikasi</span>}
                    {t.status === 'Expired' && <span className="badge badge-danger">Expired</span>}
                  </td>
                  <td className="p-3.5 text-right space-x-1.5">
                    {t.status === 'Pending' && t.proofUrl && (
                      <button
                        onClick={() => setSelectedProofTx(t)}
                        className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 inline mr-1" /> Bukti
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedPrintTx(t)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition-colors"
                      title="Cetak Invoice PDF"
                    >
                      <Printer className="w-3.5 h-3.5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Verifikasi Bukti Transfer */}
      {selectedProofTx && (
        <div className="modal-overlay">
          <div className="modal-content max-w-md p-6 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" /> Verifikasi Bukti Transfer Manual
              </h3>
              <button onClick={() => setSelectedProofTx(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[11px] text-slate-400">Invoice: <strong className="text-cyan-400">{selectedProofTx.invoiceNo}</strong></div>
                <div className="text-sm font-bold text-white">{selectedProofTx.clientName}</div>
                <div className="text-xs text-emerald-400 font-extrabold">Nominal: Rp {selectedProofTx.amount.toLocaleString('id-ID')}</div>
              </div>

              <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950 p-2 text-center">
                <div className="text-[10px] text-slate-400 mb-2">Pratinjau Bukti Struk Transfer:</div>
                <div className="p-6 rounded-lg bg-slate-900 border border-dashed border-slate-800 text-slate-300 text-xs font-mono">
                  [ SIMULASI STRUK BANK TRANSFER ]<br />
                  BCA VA / MANDIRI / BRI<br />
                  Nominal: Rp {selectedProofTx.amount.toLocaleString('id-ID')}<br />
                  Status: SUCCESS
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleReject(selectedProofTx.id)}
                  className="btn-outline-danger"
                >
                  <X className="w-3.5 h-3.5 inline mr-1" /> Tolak Bukti
                </button>
                <button
                  onClick={() => handleApprove(selectedProofTx.id)}
                  className="btn-emerald text-xs"
                >
                  <Check className="w-4 h-4" /> Setujui & LUNAS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cetak Invoice Receipt */}
      {selectedPrintTx && (
        <div className="modal-overlay">
          <div className="modal-content max-w-lg p-6 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Printer className="w-4 h-4 text-cyan-400" /> Pratinjau Kuitansi Pembayaran
              </h3>
              <button onClick={() => setSelectedPrintTx(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Receipt Sheet */}
            <div className="p-6 bg-white text-slate-900 rounded-xl font-sans space-y-4 text-xs shadow-2xl">
              <div className="flex items-center justify-between border-b pb-3 border-slate-200">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">GLOBAL TEKNOLOGI</h4>
                  <p className="text-[10px] text-slate-500">Kwitansi Resmi Pembayaran Tagihan Internet</p>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs font-bold text-cyan-700">{selectedPrintTx.invoiceNo}</div>
                  <div className="text-[10px] text-slate-500">{selectedPrintTx.date}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Diterima Dari:</span>
                  <strong className="text-slate-900">{selectedPrintTx.clientName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Metode Pembayaran:</span>
                  <strong className="text-slate-900">{selectedPrintTx.method}</strong>
                </div>
              </div>

              <table className="w-full text-left border-collapse my-2">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-[10px]">
                    <th className="py-1">Deskripsi Layanan</th>
                    <th className="py-1 text-right">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 font-bold">{selectedPrintTx.planName}</td>
                    <td className="py-2 text-right font-extrabold">Rp {selectedPrintTx.amount.toLocaleString('id-ID')}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <span className="text-xs font-bold uppercase text-emerald-600">STATUS: {selectedPrintTx.status}</span>
                <span className="text-[10px] text-slate-400">Dicetak Otomatis Oleh System</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedPrintTx(null);
                  showNotification('📄 Dokumen Invoice berhasil diunduh (PDF Simulated)');
                }}
                className="btn-primary text-xs"
              >
                Unduh PDF Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
