"use client";
import React, { useState, useEffect } from "react";
import { BreathingBlobBackground } from "../ui/wavy-background";
import { AuroraText } from "../magicui/aurora-text";
import { ArrowRight } from "lucide-react";
import { ChromeIcon } from "../ui/ChromeIcon";
import { RiFirefoxBrowserFill as FirefoxIcon } from "../ui/FireFoxIcon";

// Browser detection function
const detectBrowser = () => {
  if (typeof window === 'undefined') return 'chrome'; // Default for SSR
  
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
    return 'chrome'; // Default fallback
  }
};

export function Header() {
  const [browser, setBrowser] = useState('chrome');

  useEffect(() => {
    setBrowser(detectBrowser());
  }, []);

  const handleChromeClick = () => {
    // Add your Chrome Web Store URL here
    window.open('https://chrome.google.com/webstore', '_blank');
  };

  const handleFirefoxClick = () => {
    // Add your Firefox Add-ons URL here
    window.open('https://addons.mozilla.org', '_blank');
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
      return (
        <button
          onClick={handleChromeClick}
          className="group flex items-center gap-2 sm:gap-4 bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] text-[#0a0a0a] font-bold rounded-full hover:opacity-90 transition-all duration-200 transform hover:scale-105 border-3 border-[#0a0a0a] overflow-hidden min-w-[180px] sm:min-w-[220px] h-12 sm:h-14 px-4 sm:px-6"
        >
          <ChromeIcon className="w-7 h-7 text-[#0a0a0a] font-extrabold " />
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
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
        {/* Get Started Button */}
        <button 
          className="group relative bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] text-[#0a0a0a] font-bold text-lg sm:text-2xl py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:opacity-90 transition-all duration-200 transform hover:scale-105 border-3 border-[#0a0a0a] overflow-hidden w-40 sm:w-48 h-12 sm:h-14 flex items-center justify-center"
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

        {/* Dynamic Browser Button */}
        {getBrowserButton()}
      </div>
    </BreathingBlobBackground>
  );
}