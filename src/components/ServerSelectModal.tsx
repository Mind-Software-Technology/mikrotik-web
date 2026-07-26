'use client';

import React from 'react';
import { X, Server, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

interface ServerSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectServer: (serverName: string) => void;
}

export default function ServerSelectModal({ isOpen, onClose, onSelectServer }: ServerSelectModalProps) {
  if (!isOpen) return null;

  const servers = [
    {
      id: 'srv-1',
      name: 'Server 1 - Jakarta Cloud DataCenter',
      ip: '103.144.xxx.01',
      ping: '4ms',
      load: '32%',
      status: 'Online',
      badge: 'Utama (Recommended)'
    },
    {
      id: 'srv-2',
      name: 'Server 2 - Surabaya Fiber Node',
      ip: '103.189.xxx.12',
      ping: '12ms',
      load: '45%',
      status: 'Online',
      badge: 'Secondary Node'
    },
    {
      id: 'srv-3',
      name: 'Server 3 - High Speed SG Gateway',
      ip: '139.59.xxx.88',
      ping: '18ms',
      load: '20%',
      status: 'Online',
      badge: 'Backup Remote'
    }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-xl p-6 relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Pilih Cluster Server</h3>
              <p className="text-xs text-slate-400">Pilih node server terdekat untuk sinkronisasi Mikrotik & OLT Anda</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {servers.map((srv) => (
            <div
              key={srv.id}
              onClick={() => onSelectServer(srv.name)}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/60 hover:bg-slate-800/80 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300">{srv.name}</h4>
                  <span className="badge badge-info text-[9px]">{srv.badge}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span>IP: {srv.ip}</span>
                  <span>Latency: <strong className="text-emerald-400">{srv.ping}</strong></span>
                  <span>Load: {srv.load}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <span>Pilih</span>
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button onClick={onClose} className="btn-secondary text-xs">
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
