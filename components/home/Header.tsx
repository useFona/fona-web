"use client";
import React, { useState, useEffect } from "react";
import { BreathingBlobBackground } from "../ui/wavy-background";
import { AuroraText } from "../magicui/aurora-text";
import { ArrowRight } from "lucide-react";
import { ChromeIcon } from "../ui/ChromeIcon";
import { RiFirefoxBrowserFill as FirefoxIcon } from "../ui/FireFoxIcon";

// Browser detection function - matches the one in BreathingBlobBackground
const detectBrowser = () => {
  if (typeof window === 'undefined') return null;

  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.includes('firefox')) {
    return 'firefox';
  } else if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
    return 'chrome';
  } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    return 'safari';
  } else if (userAgent.includes('edg')) {
    return 'edge';
  } else {
    return 'chrome'; // fallback to chrome
  }
};

export function Header() {
  const [browser, setBrowser] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Add a small delay to make the animation more noticeable
    setTimeout(() => {
      setBrowser(detectBrowser());
    }, 300);
  }, []);

  const handleChromeClick = () => {
    // Add your Chrome Web Store URL here
    window.open('https://chrome.google.com/webstore', '_blank');
  };

  const handleFirefoxClick = () => {
    // Add your Firefox Add-ons URL here
    window.open('https://addons.mozilla.org/en-US/firefox/addon/fona', '_blank');
  };

  const getBrowserButton = () => {
    if (browser === 'firefox') {
      return (
        <button
          onClick={handleFirefoxClick}
          className="group flex items-center gap-2 sm:gap-4 bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] text-[#0a0a0a] font-bold rounded-full hover:opacity-90 transition-all duration-200 transform hover:scale-105 border-3 border-[#0a0a0a] overflow-hidden min-w-[180px] sm:min-w-[220px] h-12 sm:h-14 px-4 sm:px-6"
        >
          <FirefoxIcon className="w-7 h-7 text-[#0a0a0a] font-extrabold" />
          <div className="text-left flex-1">
            <div className="font-semibold font-inter text-xl">
              Add to Firefox
            </div>
          </div>
        </button>
      );
    } else {
      // Default to Chrome (including fallback)
      return (
        <button
          onClick={handleChromeClick}
          className="group flex items-center gap-2 sm:gap-4 bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] text-[#0a0a0a] font-bold rounded-full hover:opacity-90 transition-all duration-200 transform hover:scale-105 border-3 border-[#0a0a0a] overflow-hidden min-w-[180px] sm:min-w-[220px] h-12 sm:h-14 px-4 sm:px-6"
        >
          <ChromeIcon className="w-7 h-7 text-[#0a0a0a] font-extrabold" />
          <div className="text-left flex-1">
            <div className="font-bold text-xl font-inter">
              Add to Chrome
            </div>
          </div>
        </button>
      );
    }
  };

  return (
    <BreathingBlobBackground className="max-w-4xl mx-auto pb-20">
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold text-center px-4">
        With <AuroraText colors={["#FFBB94", "#DC586D", "#FB9590"]} className="font-extrabold text-4xl sm:text-5xl md:text-6xl">FONA</AuroraText> we prioritize your flow
      </p>
      <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-white font-bold text-center px-4">
        because that thing
      </p>
      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white font-bold inter-var text-center px-4">
        Matters!
      </p>

      {/* Button Container with conditional layout */}
      <div className={`flex gap-6 justify-center items-center mt-8 transition-all duration-700 ease-in-out ${!isClient || !browser
          ? 'flex-col'
          : 'flex-col sm:flex-row'
        }`}>

        {/* Get Started Button - always visible */}
        <button
          className={`group relative bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] text-[#0a0a0a] font-bold text-lg sm:text-2xl py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:opacity-90 transition-all duration-700 transform hover:scale-105 border-3 border-[#0a0a0a] overflow-hidden w-40 sm:w-48 h-12 sm:h-14 flex items-center justify-center ${!isClient || !browser
              ? 'order-1'
              : 'order-1 sm:order-1'
            }`}
          onClick={() => window.location.href = "/dashboard"}
        >
          <span className="absolute transition-all duration-300 group-hover:-translate-x-4 group-hover:opacity-0">
            Get Started
          </span>
          <ArrowRight
            className="absolute h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0"
            strokeWidth={2}
          />
        </button>

        {/* Browser Button - appears with animation */}
        <div className={`transition-all duration-700 ease-in-out ${!isClient || !browser
            ? 'opacity-0 transform scale-95 translate-y-2'
            : 'opacity-100 transform scale-100 translate-y-0'
          } order-2`}>
          {(isClient && browser) && getBrowserButton()}
        </div>
      </div>
    </BreathingBlobBackground>
  );
}
