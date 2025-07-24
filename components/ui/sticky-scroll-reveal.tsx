"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export const StickyScroll = ({
  content,
  contentClassName,
  autoScrollInterval = 2000, // 2 seconds by default
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
  autoScrollInterval?: number;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollTimerRef.current = setInterval(() => {
        setActiveCard((prev) => (prev + 1) % content.length);
      }, autoScrollInterval);
    };

    startAutoScroll();

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [autoScrollInterval, content.length]);

  // Auto-scroll the content area when activeCard changes
  useEffect(() => {
    if (containerRef.current && cardRefs.current[activeCard]) {
      const container = containerRef.current;
      const activeElement = cardRefs.current[activeCard];
      
      if (activeElement) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = activeElement.getBoundingClientRect();
        const relativeTop = elementRect.top - containerRect.top;
        const currentScrollTop = container.scrollTop;
        const targetScrollTop = currentScrollTop + relativeTop;
        
        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
      }
    }
  }, [activeCard]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row h-auto md:h-[40rem] gap-6 md:gap-10 w-full overflow-hidden rounded-md">
      {/* Image on the left */}
      <div className="sticky top-0 h-64 md:h-full w-full md:w-[45%] p-4 md:p-10 flex items-center justify-center">
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          {content.map((item, index) => (
            <motion.div
              key={`image-${index}`}
              className="absolute inset-0 h-full w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: activeCard === index ? 1 : 0,
                scale: activeCard === index ? 1 : 0.95,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {item.content}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline Progress Bar - Hidden on mobile */}
      <div className="hidden md:block sticky top-0 h-full w-[10%] py-10 items-center justify-center">
        <div className="relative h-full w-1 mx-auto">
          {/* Background line */}
          <div className="absolute inset-x-0 top-0 h-full w-0.5 bg-[#161616] dark:bg-gray-600 mx-auto rounded-full"></div>
          
          {/* Progress line */}
          <motion.div
            className="absolute inset-x-0 top-0 w-0.5 bg-gradient-to-b from-[#852e4e] to-[#ffbb94] mx-auto rounded-full"
            animate={{
              height: `${((activeCard + 1) / content.length) * 100}%`
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          ></motion.div>
          
          {/* Timeline dots with numbers */}
          {content.map((_, index) => (
            <motion.div
              key={`timeline-${index}`}
              className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold"
              style={{ 
                top: `${(index / (content.length - 1)) * 100}%`,
                marginTop: index === 0 ? '0' : index === content.length - 1 ? '-32px' : '-16px'
              }}
              animate={{
                backgroundColor: activeCard >= index ? "#ffbb94" : "#161616",
                borderColor: activeCard >= index ? "#fb9590" : "#292929",
                color: activeCard >= index ? "#292929" : "#6b7280",
                scale: activeCard === index ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {index + 1}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content on the right */}
      <div 
        ref={containerRef}
        className="w-full md:w-[45%] p-4 md:p-10 overflow-y-auto scrollbar-hide"
        style={{ 
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}
      >
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div
              key={`content-${index}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="my-10 md:my-20 min-h-[150px] md:min-h-[200px] flex flex-col justify-center"
            >
              <motion.h2
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                  y: activeCard === index ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
                className="text-2xl md:text-3xl font-bold font-inter text-white mb-3 md:mb-4"
              >
                {item.title}
              </motion.h2>
              <motion.p
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                  y: activeCard === index ? 0 : 10,
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-lg font-inter text-gray-400 leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
    </div>
  );
};