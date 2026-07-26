'use client';

import React, { useState } from 'react';
import { Router, Cpu, Users, Activity, MapPin, Power, RefreshCw, Lock, Unlock, Wifi, Layers } from 'lucide-react';

export default function AdminDashboard() {
  const [subscribers, setSubscribers] = useState([
    { id: 'sub-1', name: 'Budi Santoso', username: 'budi_rt04', ip: '10.10.20.14', profile: 'Home_20M', status: 'Online', uptime: '14d 06h', speed: '20 Mbps' },
    { id: 'sub-2', name: 'Rian Hernanda', username: 'rian_bekasi', ip: '10.10.20.15', profile: 'Pro_50M', status: 'Online', uptime: '02d 11h', speed: '50 Mbps' },
    { id: 'sub-3', name: 'Agus Setiawan', username: 'agus_cikarang', ip: '10.10.20.18', profile: 'Home_20M', status: 'Isolir', uptime: 'Offline', speed: '0 Mbps' },
    { id: 'sub-4', name: 'Siti Aminah', username: 'siti_rt01', ip: '10.10.20.22', profile: 'Home_10M', status: 'Online', uptime: '28d 19h', speed: '10 Mbps' }
  ]);

  const toggleIsolir = (id: string) => {
    setSubscribers(prev => prev.map(s => {
      if (s.id === id) {
        const newStatus = s.status === 'Online' ? 'Isolir' : 'Online';
        return { ...s, status: newStatus };
      }
      return s;
    }));
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Top Status Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400">Router Core Mikrotik</div>
            <div className="text-base font-bold text-white mt-1">CCR2004-16G-2S+</div>
            <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">CPU Load: 12% • Temp 41°C</div>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Router className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400">Status OLT EPON/GPON</div>
            <div className="text-base font-bold text-white mt-1">VSOL V1600D4</div>
            <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">4 PON Ports Active</div>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
            <Cpu className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400">Total User PPPoE Aktif</div>
            <div className="text-xl font-extrabold text-white mt-1">1,482 Users</div>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400">Realtime Bandwidth</div>
            <div className="text-xl font-extrabold text-cyan-400 mt-1">8.42 Gbps</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Realtime Bandwidth SVG Graph Visualizer */}
      <div className="glass-panel p-5 space-y-3 border border-slate-800">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" /> Live Interface Traffic Monitor (Ether1 - Uplink Provider)
          </h4>
          <span className="badge badge-info text-[10px]">RX: 8.42 Gbps / TX: 1.15 Gbps</span>
        </div>

        <div className="h-36 w-full bg-slate-950/80 rounded-xl p-3 border border-slate-800 relative overflow-hidden flex items-end">
          {/* Simulated Wave Grid */}
          <svg className="w-full h-full text-cyan-500/40 overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 100">
            <path
              d="M 0,80 Q 50,30 100,60 T 200,40 T 300,70 T 400,20 T 500,50 L 500,100 L 0,100 Z"
              fill="rgba(56, 189, 248, 0.15)"
              stroke="none"
            />
            <path
              d="M 0,80 Q 50,30 100,60 T 200,40 T 300,70 T 400,20 T 500,50"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      </div>

      {/* PPPoE User Table & ODP Splitter Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Subscribers list */}
        <div className="lg:col-span-8 space-y-3">
          <div className="glass-panel overflow-hidden border border-slate-800">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <Wifi className="w-4 h-4 text-cyan-400" /> Kelola Pelanggan PPPoE & Isolir Otomatis
              </h4>
              <span className="text-[10px] text-slate-400">Total: {subscribers.length} Pelanggan Terdaftar</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/60 text-slate-400 text-[10px] uppercase font-semibold">
                    <th className="p-3">Pelanggan</th>
                    <th className="p-3">IP Address</th>
                    <th className="p-3">Profile Paket</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Aksi Isolir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {subscribers.map(s => (
                    <tr key={s.id} className="hover:bg-slate-900/40">
                      <td className="p-3">
                        <div className="font-bold text-white">{s.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">@{s.username}</div>
                      </td>
                      <td className="p-3 font-mono text-slate-300">{s.ip}</td>
                      <td className="p-3 text-cyan-300 font-semibold">{s.profile}</td>
                      <td className="p-3">
                        {s.status === 'Online' ? (
                          <span className="badge badge-success">Online ({s.uptime})</span>
                        ) : (
                          <span className="badge badge-danger">Isolir / Offline</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => toggleIsolir(s.id)}
                          className={`px-3 py-1 rounded font-bold text-[10px] transition-all flex items-center gap-1 inline-flex ${
                            s.status === 'Online'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                          }`}
                        >
                          {s.status === 'Online' ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                          {s.status === 'Online' ? 'Isolir' : 'Buka Isolir'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: ODP Fiber Map Visualizer */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-4 border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-400" /> Mapping Distribution Box (ODP)
            </h4>
            <span className="badge badge-info text-[9px]">4/8 Splitter Used</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">ODP-BKS-01 (RT 04)</span>
                <span className="text-emerald-400 font-mono text-[10px]">-18.4 dBm</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(port => (
                  <div
                    key={port}
                    className={`p-1.5 rounded text-center text-[10px] font-mono font-bold ${
                      port <= 5 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-950 text-slate-500 border border-slate-800'
                    }`}
                  >
                    P{port}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">ODP-BKS-02 (RT 02)</span>
                <span className="text-emerald-400 font-mono text-[10px]">-19.1 dBm</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(port => (
                  <div
                    key={port}
                    className={`p-1.5 rounded text-center text-[10px] font-mono font-bold ${
                      port <= 7 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-950 text-slate-500 border border-slate-800'
                    }`}
                  >
                    P{port}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
