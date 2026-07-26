'use client';

import React, { useState } from 'react';
import {
  X, LayoutDashboard, Users, CreditCard, Settings, Bell,
  CheckCircle2, Clock, XCircle, Search, Filter,
  Eye, Download, RefreshCw, Plus, Wifi, WifiOff, Activity,
  ArrowUpRight, DollarSign, TrendingUp,
} from 'lucide-react';

type Tab = 'dashboard' | 'payment' | 'pelanggan' | 'settings';

interface Payment {
  id: string; nama: string; paket: string; nominal: string;
  metode: string; status: 'lunas' | 'pending' | 'expired' | 'refund';
  tanggal: string; channel: string;
}

const PAYMENTS: Payment[] = [
  { id: 'INV-2024-001', nama: 'Budi Santoso', paket: 'OLT II', nominal: 'Rp 250.000', metode: 'QRIS', status: 'lunas', tanggal: '26 Jul 2024', channel: 'Midtrans' },
  { id: 'INV-2024-002', nama: 'Dewi Rahayu', paket: 'LITE II', nominal: 'Rp 125.000', metode: 'VA BCA', status: 'pending', tanggal: '25 Jul 2024', channel: 'Xendit' },
  { id: 'INV-2024-003', nama: 'Agus Prasetyo', paket: 'SILVER PRO', nominal: 'Rp 320.000', metode: 'GoPay', status: 'lunas', tanggal: '25 Jul 2024', channel: 'Midtrans' },
  { id: 'INV-2024-004', nama: 'Rina Kusuma', paket: 'BRONZE II', nominal: 'Rp 180.000', metode: 'Transfer BRI', status: 'pending', tanggal: '24 Jul 2024', channel: 'Manual' },
  { id: 'INV-2024-005', nama: 'Hendra Wijaya', paket: 'OLT I', nominal: 'Rp 150.000', metode: 'Dana', status: 'expired', tanggal: '23 Jul 2024', channel: 'Midtrans' },
  { id: 'INV-2024-006', nama: 'Sari Indah', paket: 'LITE I', nominal: 'Rp 75.000', metode: 'OVO', status: 'lunas', tanggal: '23 Jul 2024', channel: 'Xendit' },
  { id: 'INV-2024-007', nama: 'Dodi Firmansyah', paket: 'OLT III', nominal: 'Rp 400.000', metode: 'VA Mandiri', status: 'lunas', tanggal: '22 Jul 2024', channel: 'Xendit' },
  { id: 'INV-2024-008', nama: 'Lina Marlina', paket: 'BRONZE I', nominal: 'Rp 100.000', metode: 'QRIS', status: 'refund', tanggal: '22 Jul 2024', channel: 'Midtrans' },
];

const PELANGGAN = [
  { id: 'P-001', nama: 'Budi Santoso', paket: 'OLT II', ip: '192.168.1.10', status: 'aktif', router: 'MK-01', expire: '26 Agu 2024' },
  { id: 'P-002', nama: 'Dewi Rahayu', paket: 'LITE II', ip: '192.168.1.11', status: 'aktif', router: 'MK-02', expire: '25 Agu 2024' },
  { id: 'P-003', nama: 'Rina Kusuma', paket: 'BRONZE II', ip: '192.168.1.15', status: 'suspend', router: 'MK-01', expire: '24 Jul 2024' },
  { id: 'P-004', nama: 'Agus Prasetyo', paket: 'SILVER PRO', ip: '10.0.0.5', status: 'aktif', router: 'MK-03', expire: '25 Agu 2024' },
  { id: 'P-005', nama: 'Hendra Wijaya', paket: 'OLT I', ip: '192.168.2.1', status: 'nonaktif', router: 'MK-02', expire: '23 Jul 2024' },
  { id: 'P-006', nama: 'Sari Indah', paket: 'LITE I', ip: '10.0.0.12', status: 'aktif', router: 'MK-01', expire: '23 Agu 2024' },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  lunas:    { bg: '#dcfce7', color: '#16a34a', label: 'Lunas' },
  pending:  { bg: '#fef9c3', color: '#ca8a04', label: 'Pending' },
  expired:  { bg: '#fee2e2', color: '#dc2626', label: 'Expired' },
  refund:   { bg: '#ede9fe', color: '#7c3aed', label: 'Refund' },
  aktif:    { bg: '#dcfce7', color: '#16a34a', label: 'Aktif' },
  suspend:  { bg: '#fef9c3', color: '#ca8a04', label: 'Suspend' },
  nonaktif: { bg: '#fee2e2', color: '#dc2626', label: 'Nonaktif' },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.nonaktif;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 20,
      background: s.bg, color: s.color,
      fontSize: '0.7rem', fontWeight: 700,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
      {s.label}
    </span>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 9,
      padding: '9px 12px', borderRadius: 7,
      background: active ? '#eff6ff' : 'transparent',
      border: active ? '1px solid #bfdbfe' : '1px solid transparent',
      color: active ? '#1e90ff' : '#64748b',
      cursor: 'pointer', fontSize: '0.82rem', fontWeight: active ? 700 : 500,
      transition: 'all 0.15s', textAlign: 'left', fontFamily: 'inherit',
    }}>
      {icon} {label}
    </button>
  );
}

function DashboardTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }} className="admin-stats-grid">
        {[
          { label: 'Total Pelanggan', value: '2.847', icon: <Users size={15} />, color: '#1e90ff', bg: '#dbeafe', sub: '+12 bulan ini' },
          { label: 'Aktif Bulan Ini', value: '2.312', icon: <CheckCircle2 size={15} />, color: '#059669', bg: '#dcfce7', sub: '81.2% dari total' },
          { label: 'Pendapatan', value: 'Rp 84.2Jt', icon: <DollarSign size={15} />, color: '#7c3aed', bg: '#ede9fe', sub: '+8.4% vs bulan lalu' },
          { label: 'Transaksi Hari Ini', value: '143', icon: <Activity size={15} />, color: '#d97706', bg: '#fef3c7', sub: '3 pending verifikasi' },
        ].map(s => (
          <div key={s.label} style={{
            background: '#fff', border: '1px solid #f1f5f9',
            borderRadius: 10, padding: '12px 14px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</span>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                {s.icon}
              </div>
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1a1a2e', marginBottom: 3 }}>{s.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.67rem', color: '#059669', fontWeight: 600 }}>
              <ArrowUpRight size={10} /> {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Network */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 12 }} className="admin-chart-grid">
        {/* Revenue bars */}
        <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 10, padding: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a1a2e' }}>Pendapatan 6 Bulan</span>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Feb – Jul 2024</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 90 }}>
            {[
              { m: 'Feb', v: 52, r: '52Jt' }, { m: 'Mar', v: 65, r: '65Jt' },
              { m: 'Apr', v: 58, r: '58Jt' }, { m: 'Mei', v: 78, r: '78Jt' },
              { m: 'Jun', v: 88, r: '88Jt' }, { m: 'Jul', v: 84, r: '84Jt' },
            ].map((bar, i) => (
              <div key={bar.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: '0.58rem', color: i === 5 ? '#1e90ff' : '#94a3b8', fontWeight: 600 }}>{bar.r}</span>
                <div style={{
                  width: '100%', height: `${bar.v}%`, minHeight: 4,
                  background: i === 5 ? 'linear-gradient(to top, #1e90ff, #38bdf8)' : '#dbeafe',
                  borderRadius: '3px 3px 0 0',
                }} />
                <span style={{ fontSize: '0.58rem', color: '#94a3b8' }}>{bar.m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Router status */}
        <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 10, padding: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a1a2e', marginBottom: 12 }}>Status Router</div>
          {[
            { name: 'MK-01 (Main)', ip: '192.168.1.1', online: true, load: 42 },
            { name: 'MK-02 (Backup)', ip: '10.0.0.1', online: true, load: 28 },
            { name: 'MK-03 (OLT)', ip: '172.16.0.1', online: true, load: 61 },
            { name: 'MK-04 (Fiber)', ip: '10.10.0.1', online: false, load: 0 },
          ].map(r => (
            <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid #f8fafc' }}>
              <span style={{ color: r.online ? '#16a34a' : '#dc2626' }}>{r.online ? <Wifi size={13} /> : <WifiOff size={13} />}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1a1a2e' }}>{r.name}</div>
                <div style={{ fontSize: '0.63rem', color: '#94a3b8' }}>{r.ip}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.7rem', color: r.online ? '#16a34a' : '#dc2626', fontWeight: 700 }}>
                  {r.online ? 'Online' : 'Offline'}
                </div>
                <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Load: {r.load}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent payments */}
      <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '12px 14px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a1a2e' }}>Transaksi Terbaru</span>
          <span style={{ fontSize: '0.72rem', color: '#1e90ff', cursor: 'pointer', fontWeight: 600 }}>Lihat Semua</span>
        </div>
        <table className="data-table">
          <thead><tr><th>Invoice</th><th>Pelanggan</th><th>Nominal</th><th>Metode</th><th>Status</th></tr></thead>
          <tbody>
            {PAYMENTS.slice(0, 5).map(p => (
              <tr key={p.id}>
                <td style={{ color: '#1e90ff', fontSize: '0.75rem', fontWeight: 700 }}>{p.id}</td>
                <td style={{ fontSize: '0.8rem' }}>{p.nama}</td>
                <td style={{ fontWeight: 700 }}>{p.nominal}</td>
                <td style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.metode}</td>
                <td><StatusBadge status={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PaymentTab() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = PAYMENTS.filter(p => {
    const q = search.toLowerCase();
    const ms = !q || p.nama.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    const mf = statusFilter === 'all' || p.status === statusFilter;
    return ms && mf;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        {[
          { l: 'Lunas', v: PAYMENTS.filter(p => p.status === 'lunas').length, color: '#16a34a', bg: '#dcfce7', icon: <CheckCircle2 size={14} /> },
          { l: 'Pending', v: PAYMENTS.filter(p => p.status === 'pending').length, color: '#ca8a04', bg: '#fef9c3', icon: <Clock size={14} /> },
          { l: 'Expired', v: PAYMENTS.filter(p => p.status === 'expired').length, color: '#dc2626', bg: '#fee2e2', icon: <XCircle size={14} /> },
        ].map(s => (
          <div key={s.l} style={{ background: s.bg, border: `1px solid ${s.color}30`, borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: s.color }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{s.l}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: s.color }}>{s.v}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 160 }}>
          <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input className="input" placeholder="Cari nama / invoice..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 30 }} />
        </div>
        <select className="select-input" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: 'auto' }}>
          <option value="all">Semua</option>
          <option value="lunas">Lunas</option>
          <option value="pending">Pending</option>
          <option value="expired">Expired</option>
          <option value="refund">Refund</option>
        </select>
        <button className="btn btn-blue btn-sm"><Plus size={12} /> Tambah</button>
        <button className="btn btn-sm" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569' }}><Download size={12} /> Export</button>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{filtered.length} transaksi</span>
          <button className="btn btn-sm" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', padding: '5px 10px' }}><RefreshCw size={11} /> Refresh</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ minWidth: 580 }}>
            <thead><tr><th>Invoice</th><th>Pelanggan</th><th>Paket</th><th>Nominal</th><th>Metode</th><th>Tanggal</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td style={{ color: '#1e90ff', fontWeight: 700, fontSize: '0.75rem' }}>{p.id}</td>
                  <td style={{ fontWeight: 600 }}>{p.nama}</td>
                  <td><span className="badge badge-blue">{p.paket}</span></td>
                  <td style={{ fontWeight: 700 }}>{p.nominal}</td>
                  <td style={{ color: '#64748b' }}>{p.metode}</td>
                  <td style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{p.tanggal}</td>
                  <td><StatusBadge status={p.status} /></td>
                  <td>
                    <div style={{ display: 'flex', gap: 5 }}>
                      <button className="btn btn-sm" style={{ padding: '4px 8px', background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#64748b' }}><Eye size={12} /></button>
                      {p.status === 'pending' && (
                        <button className="btn btn-sm" style={{ padding: '4px 8px', background: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0', fontSize: '0.68rem' }}>Verif</button>
                      )}
                    </div>
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

function PelangganTab() {
  const [search, setSearch] = useState('');
  const filtered = PELANGGAN.filter(p => !search || p.nama.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 160 }}>
          <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input className="input" placeholder="Cari pelanggan..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 30 }} />
        </div>
        <button className="btn btn-sm" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569' }}><Filter size={12} /> Filter</button>
        <button className="btn btn-blue btn-sm"><Plus size={12} /> Tambah</button>
      </div>

      <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ minWidth: 520 }}>
            <thead><tr><th>ID</th><th>Nama</th><th>Paket</th><th>IP</th><th>Router</th><th>Expire</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{p.id}</td>
                  <td style={{ fontWeight: 700 }}>{p.nama}</td>
                  <td><span className="badge badge-blue">{p.paket}</span></td>
                  <td style={{ fontFamily: 'monospace', color: '#64748b', fontSize: '0.75rem' }}>{p.ip}</td>
                  <td style={{ color: '#64748b', fontSize: '0.75rem' }}>{p.router}</td>
                  <td style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{p.expire}</td>
                  <td><StatusBadge status={p.status} /></td>
                  <td>
                    <div style={{ display: 'flex', gap: 5 }}>
                      <button className="btn btn-sm" style={{ padding: '4px 8px', background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#64748b' }}><Eye size={12} /></button>
                      {p.status === 'suspend' && (
                        <button className="btn btn-sm" style={{ padding: '4px 8px', background: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0', fontSize: '0.68rem' }}>Aktifkan</button>
                      )}
                    </div>
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

const NAV_ITEMS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={14} /> },
  { key: 'payment', label: 'Pembayaran', icon: <CreditCard size={14} /> },
  { key: 'pelanggan', label: 'Pelanggan', icon: <Users size={14} /> },
  { key: 'settings', label: 'Pengaturan', icon: <Settings size={14} /> },
];

interface AdminDemoModalProps { onClose: () => void; initialTab?: Tab }

export default function AdminDemoModal({ onClose, initialTab = 'dashboard' }: AdminDemoModalProps) {
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 1000 }}>
        {/* Header */}
        <div style={{
          padding: '12px 18px', borderBottom: '1px solid #f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(135deg,#1e90ff,#0055c8)',
          borderRadius: '12px 12px 0 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutDashboard size={14} color="#fff" />
            </div>
            <div>
              <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.92rem' }}>Admin Panel</span>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.8)', marginLeft: 6 }}>— Prototype Demo</span>
            </div>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.62rem', fontWeight: 800, padding: '2px 8px', borderRadius: 12 }}>DEMO</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', color: '#fff', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Bell size={12} />
              <span style={{ background: '#dc2626', width: 14, height: 14, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem' }}>3</span>
            </button>
            <button className="btn btn-sm" onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', display: 'flex', gap: 4, alignItems: 'center' }}>
              <X size={13} /> Tutup
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', minHeight: 500, background: '#f8fafc' }}>
          {/* Sidebar */}
          <div style={{
            width: 175, flexShrink: 0,
            padding: '12px 8px', borderRight: '1px solid #f1f5f9',
            background: '#fff', display: 'flex', flexDirection: 'column', gap: 3,
          }}>
            {/* User */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px 10px', borderBottom: '1px solid #f1f5f9', marginBottom: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#1e90ff,#0055c8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: '#fff', flexShrink: 0 }}>A</div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1a1a2e' }}>Admin ISP</div>
                <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>Super Admin</div>
              </div>
            </div>

            {NAV_ITEMS.map(n => <NavItem key={n.key} icon={n.icon} label={n.label} active={tab === n.key} onClick={() => setTab(n.key)} />)}
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: 14, overflowY: 'auto' }}>
            {tab === 'dashboard' && <DashboardTab />}
            {tab === 'payment' && <PaymentTab />}
            {tab === 'pelanggan' && <PelangganTab />}
            {tab === 'settings' && (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
                <Settings size={40} style={{ marginBottom: 12, opacity: 0.3, display: 'block', margin: '0 auto 12px' }} />
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Pengaturan sistem tersedia di versi full.</p>
                <p style={{ fontSize: '0.78rem', marginTop: 6 }}>Meliputi: konfigurasi router, payment gateway, dan notifikasi.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .admin-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .admin-chart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
