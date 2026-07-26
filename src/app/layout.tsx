import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global SmartApp – Billing & Manajemen RT/RW Net",
  description:
    "Platform billing & manajemen jaringan RT/RW Net terpadu. Integrasi Mikrotik, OLT GPON/EPON, Payment Gateway Midtrans & Xendit, Telegram Bot, dan ODP Fiber Maps.",
  keywords: "billing rt rw net, mikrotik, olt, payment gateway, internet provider, manajemen jaringan",
  openGraph: {
    title: "Global SmartApp – Billing & Manajemen RT/RW Net",
    description: "Platform terpadu untuk ISP & RT/RW Net: Mikrotik, OLT, Payment Gateway, Bot Telegram, WA Gateway.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <div className="global-bg" />
        <div className="grid-bg" />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
