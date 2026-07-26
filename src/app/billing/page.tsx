'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard, CreditCard, ArrowUpDown, Wallet, Settings,
  Bell, LogOut, Search, Filter, Download, RefreshCw, Eye,
  ChevronDown, TrendingUp, TrendingDown, DollarSign, Clock,
  CheckCircle2, XCircle, AlertCircle, ArrowUpRight, ArrowDownRight,
  Plus, MoreVertical, Copy, BarChart2, Users, ShieldCheck,
  Network, Zap, ReceiptText, Building2, ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';

// ─── Types ─────────────────────────────────────────────
type TxStatus = 'success' | 'pending' | 'failed' | 'refund' | 'expired';
type NavTab = 'dashboard' | 'transaksi' | 'mutasi' | 'settlement' | 'merchant' | 'settings';

interface Transaction {
  id: string; orderId: string; merchant: string; amount: number;
  method: string; channel: string; status: TxStatus;
  date: string; time: string; pelanggan: string; paket: string;
}

// ─── Mock data ─────────────────────────────────────────
const TRANSACTIONS: Transaction[] = [
  { id: 'TRX-240001', orderId: 'ORD-GSA-001', merchant: 'NetJawa Yogyakarta', amount: 250000, method: 'QRIS', channel: 'Midtrans', status: 'success', date: '26 Jul 2024', time: '13:42', pelanggan: 'Budi Santoso', paket: 'OLT II' },
  { id: 'TRX-240002', orderId: 'ORD-GSA-002', merchant: 'FiberNusa Cirebon', amount: 125000, method: 'VA BCA', channel: 'Xendit', status: 'pending', date: '26 Jul 2024', time: '12:18', pelanggan: 'Dewi Rahayu', paket: 'LITE II' },
  { id: 'TRX-240003', orderId: 'ORD-GSA-003', merchant: 'TexaNet Tasikmalaya', amount: 320000, method: 'GoPay', channel: 'Midtrans', status: 'success', date: '25 Jul 2024', time: '11:05', pelanggan: 'Agus Prasetyo', paket: 'SILVER PRO' },
  { id: 'TRX-240004', orderId: 'ORD-GSA-004', merchant: 'NetLampung', amount: 180000, method: 'OVO', channel: 'Xendit', status: 'failed', date: '25 Jul 2024', time: '10:33', pelanggan: 'Rina Kusuma', paket: 'BRONZE II' },
  { id: 'TRX-240005', orderId: 'ORD-GSA-005', merchant: 'NetJawa Yogyakarta', amount: 150000, method: 'Dana', channel: 'Midtrans', status: 'success', date: '24 Jul 2024', time: '09:22', pelanggan: 'Hendra Wijaya', paket: 'OLT I' },
  { id: 'TRX-240006', orderId: 'ORD-GSA-006', merchant: 'FiberNusa Cirebon', amount: 75000, method: 'VA Mandiri', channel: 'Xendit', status: 'success', date: '24 Jul 2024', time: '08:15', pelanggan: 'Sari Indah', paket: 'LITE I' },
  { id: 'TRX-240007', orderId: 'ORD-GSA-007', merchant: 'ISP Garut', amount: 400000, method: 'Transfer BRI', channel: 'Manual', status: 'pending', date: '23 Jul 2024', time: '16:48', pelanggan: 'Dodi Firmansyah', paket: 'OLT III' },
  { id: 'TRX-240008', orderId: 'ORD-GSA-008', merchant: 'NetLampung', amount: 100000, method: 'QRIS', channel: 'Midtrans', status: 'refund', date: '23 Jul 2024', time: '14:20', pelanggan: 'Lina Marlina', paket: 'BRONZE I' },
  { id: 'TRX-240009', orderId: 'ORD-GSA-009', merchant: 'TexaNet Tasikmalaya', amount: 200000, method: 'ShopeePay', channel: 'Xendit', status: 'expired', date: '22 Jul 2024', time: '11:10', pelanggan: 'Rafi Ahmad', paket: 'SILVER' },
  { id: 'TRX-240010', orderId: 'ORD-GSA-010', merchant: 'ISP Garut', amount: 250000, method: 'GoPay', channel: 'Midtrans', status: 'success', date: '22 Jul 2024', time: '09:55', pelanggan: 'Nina Sari', paket: 'OLT II' },
];

const STATUS_CFG: Record<TxStatus, { label: string; bg: string; color: string; icon: React.ReactNode }> = {
  success: { label: 'Sukses', bg: '#dcfce7', color: '#16a34a', icon: <CheckCircle2 size={12} /> },
  pending: { label: 'Pending', bg: '#fef3c7', color: '#d97706', icon: <Clock size={12} /> },
  failed:  { label: 'Gagal',   bg: '#fee2e2', color: '#dc2626', icon: <XCircle size={12} /> },
  refund:  { label: 'Refund',  bg: '#f3e8ff', color: '#7c3aed', icon: <ArrowUpDown size={12} /> },
  expired: { label: 'Expired', bg: '#f1f5f9', color: '#64748b', icon: <AlertCircle size={12} /> },
};

function StatusBadge({ status }: { status: TxStatus }) {
  const c = STATUS_CFG[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 12px', borderRadius: 99,
      background: c.bg, color: c.color,
      fontSize: '0.75rem', fontWeight: 800,
      border: `1px solid color-mix(in srgb, ${c.color} 30%, transparent)`,
    }}>
      {c.icon} {c.label}
    </span>
  );
}

function fmt(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

// ─── Sidebar nav item ──────────────────────────────────
function SideNavItem({ icon, label, active, badge, onClick }: {
  icon: React.ReactNode; label: string; active: boolean; badge?: number; onClick: () => void;
}) {
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 16px', borderRadius: 12, cursor: 'pointer',
      background: active ? '#eff6ff' : 'transparent',
      border: active ? '1px solid #bfdbfe' : '1px solid transparent',
      color: active ? '#2563eb' : '#64748b',
      fontWeight: active ? 800 : 600, fontSize: '0.9rem',
      textAlign: 'left', fontFamily: 'inherit',
      transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
    }}
    onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc'; (e.currentTarget as HTMLButtonElement).style.color = '#0f172a'; } }}
    onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#64748b'; } }}
    >
      <span style={{ flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge !== undefined && (
        <span style={{ background: '#ef4444', color: '#fff', borderRadius: 99, fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          {badge}
        </span>
      )}
    </button>
  );
}

// ─── Dashboard tab ─────────────────────────────────────
function DashboardTab() {
  const total = TRANSACTIONS.reduce((s, t) => s + (t.status === 'success' ? t.amount : 0), 0);
  const pending = TRANSACTIONS.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0);
  const txCount = TRANSACTIONS.filter(t => t.status === 'success').length;
  const failRate = Math.round((TRANSACTIONS.filter(t => t.status === 'failed').length / TRANSACTIONS.length) * 100);

  const STATS = [
    { label: 'Total Pendapatan', value: fmt(total), sub: '+12.4% vs minggu lalu', up: true, icon: <DollarSign size={20} />, color: '#2563eb' },
    { label: 'Menunggu Settlement', value: fmt(pending), sub: `${TRANSACTIONS.filter(t => t.status === 'pending').length} transaksi pending`, up: false, icon: <Clock size={20} />, color: '#d97706' },
    { label: 'Transaksi Sukses', value: txCount.toString(), sub: 'Dari total 10 transaksi', up: true, icon: <CheckCircle2 size={20} />, color: '#16a34a' },
    { label: 'Tingkat Gagal', value: `${failRate}%`, sub: '1 transaksi gagal', up: false, icon: <XCircle size={20} />, color: '#dc2626' },
  ];

  // Chart data
  const chartBars = [
    { label: 'Sen', val: 65, amount: 812000 },
    { label: 'Sel', val: 48, amount: 598000 },
    { label: 'Rab', val: 80, amount: 1020000 },
    { label: 'Kam', val: 55, amount: 687000 },
    { label: 'Jum', val: 90, amount: 1125000 },
    { label: 'Sab', val: 70, amount: 875000 },
    { label: 'Min', val: 40, amount: 500000 },
  ];

  const methods = [
    { name: 'QRIS', pct: 34, color: '#2563eb' },
    { name: 'VA Bank', pct: 28, color: '#7c3aed' },
    { name: 'E-Wallet', pct: 24, color: '#16a34a' },
    { name: 'Manual', pct: 14, color: '#d97706' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }} className="billing-stats">
        {STATS.map(s => (
          <div key={s.label} className="card" style={{
            padding: '28px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</span>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: `color-mix(in srgb, ${s.color} 15%, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, border: `1px solid color-mix(in srgb, ${s.color} 20%, transparent)` }}>{s.icon}</div>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', marginBottom: 8, letterSpacing: '-0.02em' }}>{s.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
              {s.up ? <TrendingUp size={16} color="#16a34a" /> : <TrendingDown size={16} color="#dc2626" />}
              <span style={{ color: s.up ? '#16a34a' : '#dc2626', fontWeight: 700 }}>{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Method distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }} className="billing-chart-grid">
        {/* Bar chart */}
        <div className="card" style={{ padding: '28px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#0f172a' }}>Volume Transaksi</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 4 }}>7 hari terakhir</div>
            </div>
            <select style={{ fontSize: '0.85rem', fontWeight: 700, border: '1px solid #e2e8f0', borderRadius: 12, padding: '10px 16px', color: '#0f172a', background: '#f8fafc', outline: 'none', cursor: 'pointer' }}>
              <option>7 hari</option><option>30 hari</option><option>3 bulan</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 200 }}>
            {chartBars.map((b, i) => (
              <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
                title={fmt(b.amount)}>
                <div style={{
                  width: '100%', height: `${b.val}%`,
                  background: i === 4 ? '#2563eb' : '#e2e8f0',
                  borderRadius: '8px 8px 0 0', minHeight: 4,
                  cursor: 'pointer', transition: 'all 0.3s',
                  boxShadow: i === 4 ? '0 4px 10px rgba(37,99,235,0.2)' : 'none'
                }}
                onMouseEnter={e => { if(i!==4) (e.currentTarget as HTMLDivElement).style.background = '#cbd5e1'; }}
                onMouseLeave={e => { if(i!==4) (e.currentTarget as HTMLDivElement).style.background = '#e2e8f0'; }}
                />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Method distribution */}
        <div className="card" style={{ padding: '28px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#0f172a', marginBottom: 24 }}>Metode Pembayaran</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {methods.map(m => (
              <div key={m.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#475569' }}>{m.name}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 900, color: m.color }}>{m.pct}%</span>
                </div>
                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: `${m.pct}%`, height: '100%', background: m.color, borderRadius: 99, transition: 'width 0.8s ease' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Channel summary */}
          <div style={{ borderTop: '1px solid #e2e8f0', marginTop: 28, paddingTop: 24 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Distribusi Gateway</div>
            {[
              { name: 'Midtrans', val: '5 tx', color: '#2563eb' },
              { name: 'Xendit', val: '4 tx', color: '#7c3aed' },
              { name: 'Manual', val: '1 tx', color: '#d97706' },
            ].map(c => (
              <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#64748b' }}>{c.name}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 900, color: c.color }}>{c.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="card" style={{ overflow: 'hidden', padding: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 900, fontSize: '1.2rem', color: '#0f172a' }}>Transaksi Terbaru</span>
          <span style={{ fontSize: '0.9rem', color: '#2563eb', cursor: 'pointer', fontWeight: 800 }}>Lihat Semua &rarr;</span>
        </div>
        <table className="data-table">
          <thead><tr><th>ID Transaksi</th><th>Pelanggan</th><th>Merchant</th><th>Metode</th><th>Nominal</th><th>Waktu</th><th>Status</th></tr></thead>
          <tbody>
            {TRANSACTIONS.slice(0, 6).map(t => (
              <tr key={t.id}>
                <td style={{ color: '#2563eb', fontWeight: 800 }}>{t.id}</td>
                <td style={{ fontWeight: 700, color: '#0f172a' }}>{t.pelanggan}</td>
                <td style={{ color: '#64748b', fontWeight: 600 }}>{t.merchant}</td>
                <td style={{ fontWeight: 600, color: '#475569' }}>{t.method}</td>
                <td style={{ fontWeight: 900, color: '#0f172a' }}>{fmt(t.amount)}</td>
                <td style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>{t.date} {t.time}</td>
                <td><StatusBadge status={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Transaksi tab ─────────────────────────────────────
function TransaksiTab() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = TRANSACTIONS.filter(t => {
    const q = search.toLowerCase();
    const ms = !q || t.id.toLowerCase().includes(q) || t.pelanggan.toLowerCase().includes(q) || t.orderId.toLowerCase().includes(q);
    const mf = statusFilter === 'all' || t.status === statusFilter;
    const mm = methodFilter === 'all' || t.method === methodFilter;
    return ms && mf && mm;
  });

  const selectedTx = TRANSACTIONS.find(t => t.id === selected);

  return (
    <div style={{ display: 'flex', gap: 24, height: '100%' }}>
      {/* Main list */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
            <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input className="input" placeholder="Cari ID, nama pelanggan, order ID..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 44, background: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a' }} />
          </div>
          <select className="select-input" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: 'auto', background: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a' }}>
            <option value="all">Semua Status</option>
            <option value="success">Sukses</option>
            <option value="pending">Pending</option>
            <option value="failed">Gagal</option>
            <option value="refund">Refund</option>
            <option value="expired">Expired</option>
          </select>
          <select className="select-input" value={methodFilter} onChange={e => setMethodFilter(e.target.value)} style={{ width: 'auto', background: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a' }}>
            <option value="all">Semua Metode</option>
            <option value="QRIS">QRIS</option>
            <option value="GoPay">GoPay</option>
            <option value="OVO">OVO</option>
            <option value="Dana">Dana</option>
            <option value="VA BCA">VA BCA</option>
            <option value="VA Mandiri">VA Mandiri</option>
          </select>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: 8, borderRadius: 12, padding: '12px 20px' }}>
            <Download size={18} /> Export
          </button>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: 8, borderRadius: 12, padding: '12px 20px' }}>
            <RefreshCw size={18} /> Refresh
          </button>
        </div>

        {/* Counter */}
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94a3b8' }}>{filtered.length} transaksi ditemukan</div>

        {/* Table */}
        <div className="card" style={{ overflow: 'hidden', padding: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ minWidth: 800 }}>
              <thead><tr><th></th><th>ID Transaksi</th><th>Order ID</th><th>Pelanggan</th><th>Paket</th><th>Nominal</th><th>Metode</th><th>Gateway</th><th>Tanggal</th><th>Status</th><th>Aksi</th></tr></thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={t.id} style={{ background: selected === t.id ? '#eff6ff' : undefined }}>
                    <td>
                      <input type="radio" checked={selected === t.id} onChange={() => setSelected(selected === t.id ? null : t.id)} style={{ accentColor: '#2563eb', width: 18, height: 18 }} />
                    </td>
                    <td style={{ color: '#2563eb', fontWeight: 800, whiteSpace: 'nowrap' }}>{t.id}</td>
                    <td style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap' }}>{t.orderId}</td>
                    <td style={{ fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>{t.pelanggan}</td>
                    <td><span className="badge badge-blue">{t.paket}</span></td>
                    <td style={{ fontWeight: 900, color: '#0f172a', whiteSpace: 'nowrap' }}>{fmt(t.amount)}</td>
                    <td style={{ fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>{t.method}</td>
                    <td><span className="badge badge-purple">{t.channel}</span></td>
                    <td style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap' }}>{t.date} {t.time}</td>
                    <td><StatusBadge status={t.status} /></td>
                    <td>
                      <button onClick={() => setSelected(t.id)} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9'; (e.currentTarget as HTMLButtonElement).style.color = '#0f172a'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc'; (e.currentTarget as HTMLButtonElement).style.color = '#64748b'; }}
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selectedTx && (
        <div className="card" style={{
          width: 360, flexShrink: 0,
          padding: 28,
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
          alignSelf: 'flex-start', position: 'sticky', top: 0,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <span style={{ fontWeight: 900, fontSize: '1.2rem', color: '#0f172a' }}>Detail Transaksi</span>
            <button onClick={() => setSelected(null)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <XCircle size={20} />
            </button>
          </div>
          <div style={{ textAlign: 'center', marginBottom: 28, padding: '24px', background: '#f8fafc', borderRadius: 20, border: '1px solid #e2e8f0' }}>
            <StatusBadge status={selectedTx.status} />
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginTop: 16, letterSpacing: '-0.02em' }}>{fmt(selectedTx.amount)}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#94a3b8', marginTop: 8 }}>{selectedTx.date} &middot; {selectedTx.time}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              ['ID Transaksi', selectedTx.id],
              ['Order ID', selectedTx.orderId],
              ['Pelanggan', selectedTx.pelanggan],
              ['Paket', selectedTx.paket],
              ['Merchant', selectedTx.merchant],
              ['Metode', selectedTx.method],
              ['Gateway', selectedTx.channel],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #e2e8f0', paddingBottom: 16 }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#64748b' }}>{k}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#0f172a', textAlign: 'right', maxWidth: 180, wordBreak: 'break-all' }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            <button className="btn btn-outline" style={{ flex: 1, borderRadius: 14, padding: '12px' }}>
              <Copy size={18} /> Salin ID
            </button>
            {selectedTx.status === 'pending' && (
              <button className="btn btn-primary" style={{ flex: 1, borderRadius: 14, padding: '12px', background: '#16a34a', color: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', fontWeight: 900 }}>
                <CheckCircle2 size={18} /> Verif
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Settlement tab ─────────────────────────────────────
function SettlementTab() {
  const SETTLEMENTS = [
    { id: 'STL-001', period: '26 Jul 2024', gross: 1295000, fee: 25900, net: 1269100, txCount: 5, status: 'settled', gateway: 'Midtrans' },
    { id: 'STL-002', period: '25 Jul 2024', gross: 825000, fee: 16500, net: 808500, txCount: 3, status: 'process', gateway: 'Xendit' },
    { id: 'STL-003', period: '24 Jul 2024', gross: 475000, fee: 9500, net: 465500, txCount: 2, status: 'settled', gateway: 'Midtrans' },
    { id: 'STL-004', period: '23 Jul 2024', gross: 500000, fee: 10000, net: 490000, txCount: 2, status: 'settled', gateway: 'Xendit' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="billing-stats">
        {[
          { label: 'Total Settlement', value: fmt(3033100), color: '#16a34a' },
          { label: 'Dalam Proses', value: fmt(808500), color: '#d97706' },
          { label: 'Total Fee', value: fmt(61900), color: '#7c3aed' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</span>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: `color-mix(in srgb, ${s.color} 15%, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, border: `1px solid color-mix(in srgb, ${s.color} 20%, transparent)` }}>
                {s.label === 'Total Settlement' ? <CheckCircle2 size={28} /> : s.label === 'Dalam Proses' ? <Clock size={28} /> : <DollarSign size={28} />}
              </div>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid #e2e8f0', fontWeight: 900, fontSize: '1.2rem', color: '#0f172a' }}>
          Riwayat Settlement
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>ID Settlement</th><th>Periode</th><th>Gateway</th><th>Gross Amount</th><th>Fee (2%)</th><th>Net Amount</th><th>Tx</th><th>Status</th></tr></thead>
            <tbody>
              {SETTLEMENTS.map(s => (
                <tr key={s.id}>
                  <td style={{ color: '#2563eb', fontWeight: 800 }}>{s.id}</td>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{s.period}</td>
                  <td><span className="badge badge-purple">{s.gateway}</span></td>
                  <td style={{ fontWeight: 800, color: '#475569' }}>{fmt(s.gross)}</td>
                  <td style={{ color: '#dc2626', fontWeight: 700 }}>-{fmt(s.fee)}</td>
                  <td style={{ fontWeight: 900, color: '#16a34a' }}>{fmt(s.net)}</td>
                  <td style={{ color: '#64748b', fontWeight: 700 }}>{s.txCount} tx</td>
                  <td>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '6px 14px', borderRadius: 99, fontSize: '0.8rem', fontWeight: 800,
                      background: s.status === 'settled' ? '#dcfce7' : '#fef3c7',
                      color: s.status === 'settled' ? '#16a34a' : '#d97706',
                      border: s.status === 'settled' ? '1px solid #bbf7d0' : '1px solid #fde68a',
                    }}>
                      {s.status === 'settled' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                      {s.status === 'settled' ? 'Settled' : 'Proses'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Merchant tab ───────────────────────────────────────
function MerchantTab() {
  const MERCHANTS = [
    { id: 'MCH-001', name: 'NetJawa Yogyakarta', owner: 'Agus Prasetyo', city: 'Yogyakarta', plan: 'SILVER PRO', revenue: 570000, status: 'active', joined: 'Jan 2024' },
    { id: 'MCH-002', name: 'FiberNusa Cirebon', owner: 'Dewi Rahayu', city: 'Cirebon', plan: 'LITE II', revenue: 200000, status: 'active', joined: 'Feb 2024' },
    { id: 'MCH-003', name: 'TexaNet Tasikmalaya', owner: 'Rian Hernanda', city: 'Tasikmalaya', plan: 'OLT II', revenue: 820000, status: 'active', joined: 'Mar 2024' },
    { id: 'MCH-004', name: 'NetLampung', owner: 'Hendra Wijaya', city: 'Bandar Lampung', plan: 'BRONZE II', revenue: 280000, status: 'suspend', joined: 'Apr 2024' },
    { id: 'MCH-005', name: 'ISP Garut', owner: 'Dodi Firmansyah', city: 'Garut', plan: 'OLT III', revenue: 500000, status: 'active', joined: 'Mei 2024' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input className="input" placeholder="Cari merchant..." style={{ paddingLeft: 44, background: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a' }} />
        </div>
        <button className="btn btn-primary" style={{ borderRadius: 12, padding: '12px 24px' }}><Plus size={18} /> Tambah Merchant</button>
        <button className="btn btn-outline" style={{ borderRadius: 12, padding: '12px 24px' }}><Download size={18} /> Export</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
        {MERCHANTS.map(m => (
          <div key={m.id} className="card" style={{ padding: 28 }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#93c5fd';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #bfdbfe' }}>
                <Building2 size={28} color="#2563eb" />
              </div>
              <span style={{
                padding: '6px 14px', borderRadius: 99, fontSize: '0.8rem', fontWeight: 900,
                background: m.status === 'active' ? '#dcfce7' : '#fef3c7',
                color: m.status === 'active' ? '#16a34a' : '#d97706',
                border: m.status === 'active' ? '1px solid #bbf7d0' : '1px solid #fde68a'
              }}>
                {m.status === 'active' ? 'Aktif' : 'Suspend'}
              </span>
            </div>
            <div style={{ fontWeight: 900, fontSize: '1.25rem', color: '#0f172a', marginBottom: 6, letterSpacing: '-0.01em' }}>{m.name}</div>
            <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600, marginBottom: 20 }}>{m.owner} &middot; {m.city}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <span className="badge badge-blue">{m.plan}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>Bergabung {m.joined}</span>
            </div>
            <div style={{ padding: '20px', background: '#f8fafc', borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', marginBottom: 8 }}>Revenue Bulan Ini</div>
              <div style={{ fontWeight: 900, fontSize: '1.5rem', color: '#16a34a' }}>{fmt(m.revenue)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Navigation items ──────────────────────────────────
const NAV: { key: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { key: 'transaksi', label: 'Transaksi', icon: <CreditCard size={20} />, badge: 2 },
  { key: 'mutasi', label: 'Mutasi Saldo', icon: <ArrowUpDown size={20} /> },
  { key: 'settlement', label: 'Settlement', icon: <ReceiptText size={20} /> },
  { key: 'merchant', label: 'Merchant', icon: <Building2 size={20} /> },
  { key: 'settings', label: 'Pengaturan', icon: <Settings size={20} /> },
];

// ─── Main Page ─────────────────────────────────────────
export default function BillingPage() {
  const [tab, setTab] = useState<NavTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      background: '#f8fafc', color: '#0f172a',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: sidebarOpen ? 280 : 90, flexShrink: 0,
        background: '#ffffff', borderRight: '1px solid #e2e8f0',
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden', zIndex: 50
      }}>
        {/* Brand */}
        <div style={{
          padding: '0 24px', borderBottom: '1px solid #e2e8f0',
          display: 'flex', alignItems: 'center', gap: 16,
          height: 90, flexShrink: 0,
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: 14, flexShrink: 0,
            background: '#2563eb',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          }}>
            <Network size={22} color="#fff" />
          </div>
          {sidebarOpen && (
            <div style={{ whiteSpace: 'nowrap' }}>
              <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Billing Pro</div>
              <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 800, letterSpacing: '0.05em' }}>GLOBAL SMARTAPP</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {sidebarOpen && (
            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 12px 12px' }}>
              Menu Utama
            </div>
          )}
          {NAV.map(n => (
            <SideNavItem key={n.key} icon={n.icon} label={sidebarOpen ? n.label : ''} active={tab === n.key} badge={sidebarOpen ? n.badge : undefined} onClick={() => setTab(n.key)} />
          ))}
        </nav>

        {/* User */}
        <div style={{
          padding: '24px', borderTop: '1px solid #e2e8f0',
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
            background: '#eff6ff', border: '1px solid #bfdbfe',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', fontWeight: 900, color: '#2563eb',
          }}>A</div>
          {sidebarOpen && (
            <div style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap' }}>
              <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis' }}>Admin Global</div>
              <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 700 }}>Super Admin</div>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, zIndex: 40 }}>
        {/* Topbar */}
        <header style={{
          height: 90, flexShrink: 0, background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '0 40px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 20,
          position: 'sticky', top: 0, zIndex: 100,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <button onClick={() => setSidebarOpen(v => !v)} style={{
              background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 12,
              cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc'; }}
            >
              <SlidersHorizontal size={22} />
            </button>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {NAV.find(n => n.key === tab)?.label ?? 'Billing'}
              </h1>
              <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600, marginTop: 4 }}>Overview & Statistics</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: '#dcfce7', border: '1px solid #bbf7d0',
              borderRadius: 99, padding: '8px 16px',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 6px rgba(0,0,0,0.1)', animation: 'pulse-dot 2s infinite' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#16a34a', letterSpacing: '0.05em' }}>API Connected</span>
            </div>
            <button style={{ 
              background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 12, 
              cursor: 'pointer', color: '#475569', display: 'flex', position: 'relative',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc'; }}
            >
              <Bell size={22} />
              <span style={{ position: 'absolute', top: 8, right: 8, width: 10, height: 10, background: '#ef4444', borderRadius: '50%', border: '2px solid #ffffff' }} />
            </button>
            <a href="/" style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px',
              borderRadius: 12, border: '1px solid #e2e8f0',
              background: '#f8fafc', cursor: 'pointer', color: '#0f172a',
              fontSize: '0.9rem', textDecoration: 'none', fontWeight: 800,
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f1f5f9'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f8fafc'; }}
            >
              <LogOut size={18} /> Keluar
            </a>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: 40, overflowY: 'auto' }}>
          {tab === 'dashboard' && <DashboardTab />}
          {tab === 'transaksi' && <TransaksiTab />}
          {tab === 'settlement' && <SettlementTab />}
          {tab === 'merchant' && <MerchantTab />}
          {(tab === 'mutasi' || tab === 'settings') && (
            <div style={{ textAlign: 'center', padding: '120px 20px', color: '#94a3b8' }}>
              <div style={{ width: 100, height: 100, borderRadius: 30, background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#cbd5e1', boxShadow: '0 10px 25px rgba(0,0,0,0.02)' }}>
                {tab === 'mutasi' ? <ArrowUpDown size={40} /> : <Settings size={40} />}
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', marginBottom: 12, letterSpacing: '-0.02em' }}>
                {tab === 'mutasi' ? 'Mutasi Saldo' : 'Pengaturan'}
              </p>
              <p style={{ fontSize: '1rem', fontWeight: 600 }}>Fitur ini tersedia di versi penuh (integrasi Payreless API).</p>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 6px rgba(0,0,0,0.1); opacity: 1; }
          50% { box-shadow: 0 0 12px rgba(0,0,0,0.1); opacity: 0.5; }
        }
        @media (max-width: 1024px) {
          .billing-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .billing-chart-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .billing-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
