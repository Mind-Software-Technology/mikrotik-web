'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import AdminDemoModal from '@/components/AdminDemoModal';
import { ServerModal } from '@/components/Modals';
import { useRouter } from 'next/navigation';

type ModalType = 'none' | 'admin' | 'server';

export default function Home() {
  const router = useRouter();
  const [modal, setModal] = useState<ModalType>('none');
  const [demoTab, setDemoTab] = useState<'dashboard' | 'payment' | 'client'>('dashboard');
  const [planName, setPlanName] = useState('');
  const [planPrice, setPlanPrice] = useState('');

  const openDemo = (tab?: 'admin' | 'payment' | 'client') => {
    setDemoTab(tab === 'payment' ? 'payment' : 'dashboard');
    setModal('admin');
  };

  const openRegister = () => router.push('/auth/registration');
  const openServer = () => setModal('server');
  const close = () => setModal('none');

  const selectPlan = (name: string, price: string) => {
    // Navigate with URL param so the registration page can pre-select the plan if we want to
    router.push(`/auth/registration`);
  };

  return (
    <>
      <Navbar onOpenServerModal={openServer} onOpenDemo={openDemo} />

      <main>
        <Hero onOpenRegisterModal={openRegister} onOpenDemo={openDemo} />
        <Services onOpenDemo={openDemo} />
        <Pricing onSelectPlan={selectPlan} />
        <Testimonials />
      </main>

      <Footer onOpenDemo={openDemo} />
      <ChatbotWidget />

      {modal === 'admin' && (
        <AdminDemoModal onClose={close} initialTab={demoTab === 'payment' ? 'payment' : 'dashboard'} />
      )}
      {modal === 'server' && <ServerModal onClose={close} />}
    </>
  );
}
