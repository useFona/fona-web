"use client";
import { useEffect, useRef } from 'react';
import 'locomotive-scroll/locomotive-scroll.css';
import { Header } from '@/components/home/Header';
import { Hero } from '@/components/home/Hero';
import { SellingPoint } from '@/components/home/SellingPoint';
import { Working } from '@/components/home/Working';
import { Extension } from '@/components/home/Extention';
import { Support } from '@/components/home/Support';
import Footer from '@/components/home/Footer';

export default function Home() {
  useEffect(() => {
    // Add the scrollbar styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      ::-webkit-scrollbar {
        width: 4px;
      }
      ::-webkit-scrollbar-track {
        background: #0a0a0a;
      }
      ::-webkit-scrollbar-thumb {
        background: #1a1a1a;
        border-radius: 2px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #2a2a2a;
      }
      html {
        scrollbar-width: thin;
        scrollbar-color: #1a1a1a #0a0a0a;
      }
    `;
    document.head.appendChild(style);

    (async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();
      } catch (error) {
        console.error('Locomotive Scroll failed:', error);
      }
    })()
  }, []);
  
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <Hero />
      <SellingPoint />
      <Working />
      <Extension />
      <Support />
      <Footer />
    </div>
  );
}