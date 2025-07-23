"use client";
import { useEffect, useRef } from 'react';
import { Header } from '@/components/home/Header';
import { Hero } from '@/components/home/Hero';
import { SellingPoint } from '@/components/home/SellingPoint';
import { Working } from '@/components/home/Working';
import { Extension } from '@/components/home/Extention';
import { Support } from '@/components/home/Support';
import Footer from '@/components/home/Footer';

export default function Home() {
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    let scroll: any;

    const initLocomotiveScroll = async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;

        scroll = new LocomotiveScroll({
          el: document.querySelector('[data-scroll-container]') as HTMLElement,
          smooth: true,
          resetNativeScroll: true,
          tablet: {
            smooth: false,
            breakpoint: 768
          },
          smartphone: {
            smooth: false,
          }
        });

        scrollRef.current = scroll;

        // Update after initialization
        setTimeout(() => {
          scroll.update();
        }, 100);

      } catch (error) {
        console.error('Locomotive Scroll initialization failed:', error);
      }
    };

    initLocomotiveScroll();

    // Cleanup function - this runs when component unmounts (when leaving the page)
    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy();
        scrollRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run once

  return (
    <div data-scroll-container>
      <div className="min-h-screen bg-[#0a0a0a]" data-scroll-section>
        <div data-scroll data-scroll-speed="-0.5">
          <Header />
        </div>

        <div data-scroll data-scroll-speed="1">
          <Hero />
        </div>

        <div data-scroll data-scroll-speed="0.5">
          <SellingPoint />
        </div>

        <div data-scroll data-scroll-speed="-0.3">
          <Working />
        </div>

        <div data-scroll data-scroll-speed="0.8">
          <Extension />
        </div>

        <div data-scroll data-scroll-speed="0.3">
          <Support />
        </div>

        <div data-scroll>
          <Footer />
        </div>
      </div>
    </div>
  );
}
