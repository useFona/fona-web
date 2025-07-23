'use client'
import { X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ComicText } from "@/components/magicui/comic-text";
import { PixelImage } from "@/components/magicui/pixel-image";
import { AuroraText } from "@/components/magicui/aurora-text";

interface CreatorNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatorNoteModal: React.FC<CreatorNoteModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" 
      style={{ zIndex: 99999 }}
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-7xl h-[85vh] bg-[#0a0a0a] rounded-lg border border-white/10 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <AuroraText colors={["#FFBB94", "#DC586D", "#FB9590"]} className="text-2xl font-bold">
              Creator's Note
            </AuroraText>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex flex-col items-center lg:flex-row gap-8">
            {/* Left side - Image */}
            <div className="lg:w-2/5 xl:w-1/3 flex-shrink-0">
              <div className="relative">
                <PixelImage
                  src="/creator.jpeg"
                  customGrid={{ rows: 8, cols: 6 }}
                  grayscaleAnimation
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
              
              {/* Social Links */}
              <div className="mt-6 flex justify-center gap-4">
                <a
                  href="https://github.com/not-meet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/not-meet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="X (Twitter)"
                >
                  <FaXTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/not-meet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="lg:w-3/5 xl:w-2/3 space-y-6">
              <div className="text-center mb-6">
                <ComicText fontSize={2}>Meet Jain</ComicText>
              </div>
              
              <div>
                <div className="prose prose-invert max-w-none space-y-4 text-gray-300 font-inter leading-relaxed">
                  <p>
                    Welcome to <span className="text-[#DC586D] font-semibold">Fona</span>! I'm thrilled you're here exploring this project.
                  </p>
                  
                  <p>
                    I am a full stack developer who is trying to make small changes in the ecosystem which can lead to a greater change, and one of my trials for making change comes out to be <span className="text-[#DC586D] font-semibold">FONA</span>!
                  </p>
                  
                  <p>
                    The project clicked to me when I was reading K8's docs and since it was not very easy to gulp, I wanted to make some notes or highlight some stuff. Using Notion or even a pop-up based notes app was a hassle — it broke my flow of reading and was just bad while taking care of organizing notes as well!
                  </p>
                  
                  <p>
                    I lurked a bit to find an alternative but none of them fits my needs, so then I said let's make a solution. After quite an effort of two weeks or three, I created Fona while keeping one thing in mind: it's not replacing your old favorite notes app but, trying to help you to start making notes while not even thinking about how they will look, copy & paste or even navigation. It's my approach to help users to attain flow, save time, and clear that small friction.
                  </p>
                  
                  <p>
                    I hope you liked my work and feel free to experiment, come up with changes, found any bug create issues and contribute. It will be absolutely the best if we make this better together!
                  </p>
                  
                  <p className="text-[#FFBB94] font-medium">
                    Thanks for checking it out — I'll keep improving and adding new features. If it helps you, consider supporting the project! ✨
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-gray-500 text-center">
                  Check out my <a href="https://meet-jain.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#DC586D] hover:underline">portfolio</a> for more projects and work
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render modal outside of locomotive scroll container
  return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null;
};

export default CreatorNoteModal;