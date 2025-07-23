'use client'
import { useState, useEffect } from 'react';
import { Coffee } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { FaGithub } from "react-icons/fa";
import CreatorNoteModal from '@/components/home/CreatorNoteModal';

const Discord = ({ size = 16, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="9" cy="12" r="1"/>
    <circle cx="15" cy="12" r="1"/>
    <path d="m7.5 7.5c3.5-1 9.5-1 9 0"/>
    <path d="m7 16.5c3.5 1 6.5 1 10 0"/>
    <path d="m15.5 17c0 1 1.5 3 2 3c1.5 0 2.833-1.667 3.5-3c.667-1.667.5-5.833-1.5-11.5c-1.457.688-4 1.5-4 1.5"/>
    <path d="m8.5 17c0 1-1.5 3-2 3c-1.5 0-2.833-1.667-3.5-3c-.667-1.667-.5-5.833 1.5-11.5c1.457.688 4 1.5 4 1.5"/>
  </svg>
);

export default function Footer() {
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);

  const handleCreatorNoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCreatorModalOpen(true);
  };

  // Handle modal open/close with body scroll
  useEffect(() => {
    if (isCreatorModalOpen) {
      // Disable locomotive scroll when modal is open
      const locomotiveEl = document.querySelector('[data-scroll-container]');
      if (locomotiveEl) {
        locomotiveEl.className = 'style';
      }
      document.body.className = 'style';
    } else {
      // Re-enable locomotive scroll when modal is closed
      const locomotiveEl = document.querySelector('[data-scroll-container]');
      if (locomotiveEl) {
        locomotiveEl.className = '';
      }
      document.body.className = '';
    }

    return () => {
      // Cleanup
      const locomotiveEl = document.querySelector('[data-scroll-container]');
      if (locomotiveEl) {
        locomotiveEl.className = '';
      }
      document.body.className = '';
    };
  }, [isCreatorModalOpen]);

  return (
    <>
      <footer className="border-t border-[#dc586d] bg-[#0a0a0a] py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center">
                <img src="/fona.svg" alt="Fona" className="h-full w-full" />
              </div>
              <AuroraText colors={["#FFBB94", "#DC586D", "#FB9590"]} className="font-bold text-xl sm:text-2xl font-inter">
                Fona
              </AuroraText>
            </div>
            <div className="flex flex-col items-center gap-4 sm:gap-6 sm:flex-row">
              <nav className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm sm:text-base">
                <button
                  onClick={handleCreatorNoteClick}
                  className="text-gray-400 transition-colors hover:text-[#dc586d] cursor-pointer relative z-10 text-sm sm:text-base"
                  type="button"
                >
                  Creator's Note
                </button>
              </nav>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <a
                  href="https://coff.ee/meetjainn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 sm:gap-2 rounded-full bg-neutral-900 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-neutral-50 transition-all hover:bg-neutral-800"
                >
                  <Coffee size={14} className="transition-transform group-hover:scale-110 flex-shrink-0" />
                  <span>Support Us</span>
                </a>
                <a
                  href="https://github.com/useFona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-neutral-600 transition-all hover:bg-neutral-50 hover:shadow-sm"
                >
                  <FaGithub size={14} className="transition-transform group-hover:scale-110 flex-shrink-0" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 flex flex-col items-center justify-between gap-2 border-t border-[#292929] pt-4 text-xs sm:text-sm text-neutral-500 sm:pt-6 md:flex-row md:gap-0">
            <p className="text-center">
              © {new Date().getFullYear()} Fona. All rights reserved.
            </p>
            <p className="mt-1 sm:mt-2 text-center text-xs sm:text-sm md:mt-0">
              Made with <span className="text-red-500">♥</span> by{" "}
              <a
                href="https://github.com/not-meet"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-[#dc586d]"
              >
                Meet Jain
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Creator Note Modal - Render outside of locomotive scroll container */}
      {isCreatorModalOpen && (
        <CreatorNoteModal 
          isOpen={isCreatorModalOpen} 
          onClose={() => setIsCreatorModalOpen(false)} 
        />
      )}
    </>
  );
}