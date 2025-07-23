"use client";
import { FileText, LayoutDashboard, Blocks } from "lucide-react";
import { useEffect, useState  } from "react";

export const Slideshow = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    
    const slides = [
      {
        id: 'extension',
        icon: Blocks,
        title: 'Extension',
        image: '/slide1.png'
      },
      {
        id: 'page',
        icon: FileText,
        title: 'Page',
        image: '/slide2.png'
      },
      {
        id: 'dashboard',
        icon: LayoutDashboard,
        title: 'Dashboard',
        image: '/slide.png'
      }
    ];
  
    // Auto-rotate slides every 3 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, 3000);
  
      return () => clearInterval(interval);
    }, [slides.length]);
  
    const handleSlideClick = (index: number) => {
      setActiveSlide(index);
    };
  
    return (
      <div className="w-full max-w-7xl mx-auto mt-8 mb-8">
        {/* Navigation Row */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 px-4">
          {slides.map((slide, index) => {
            const IconComponent = slide.icon;
            return (
              <button
                key={slide.id}
                onClick={() => handleSlideClick(index)}
                className={`flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 relative group ${
                  activeSlide === index ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                <IconComponent size={20} className="transition-colors duration-300" />
                <span className="text-base font-medium transition-colors duration-300">
                  {slide.title}
                </span>
                <div 
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-white transition-all duration-300 ${
                    activeSlide === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                  }`}
                />
              </button>
            );
          })}
        </div>
  
        {/* Image Display */}
        <div className="relative w-[90vw] sm:w-[85vw] md:w-[80vw] h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[81vh] flex items-center justify-center bg-gray-900/20 rounded-xl p-2 mx-auto">
          <img
            src={slides[activeSlide].image}
            alt={slides[activeSlide].title}
            className="h-full w-full object-contain rounded-lg shadow-2xl transition-all duration-500 transform hover:scale-[1.02]"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              width: '100%',
              height: 'auto'
            }}
          />
        </div>
      </div>
    );
  };