"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";

const content = [
  {
    title: "Create Your Account",
    description:
      "Start by creating your account and get the token from the dashboard. This secure token will authenticate your browser extension and ensure your data remains protected while syncing across devices.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center rounded-lg">
        <img 
          src="/working1.png" 
          alt="Create Account Step"
          className="h-full w-full object-cover rounded-lg"
        />
      </div>
    ),
  },
  {
    title: "Install Browser Extension",
    description:
      "Add the extension to your browser and add the token to verify your user account. The extension seamlessly integrates with your browsing experience, allowing you to capture content from any webpage instantly.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center rounded-lg">
        <img 
          src="/working2.png" 
          alt="Browser Extension Step"
          className="h-full w-full object-cover rounded-lg"
        />
      </div>
    ),
  },
  {
    title: "Select or Create Page",
    description:
      "Select an existing page or create a new one to add your content. Organize your notes efficiently with our intuitive page management system that adapts to your workflow and keeps everything structured.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center rounded-lg">
        <img 
          src="/working3.png" 
          alt="Page Selection Step"
          className="h-full w-full object-cover rounded-lg"
        />
      </div>
    ),
  },
  {
    title: "Capture Content",
    description:
      "Double tap or select the part you want to save in your note with the type seen in the menu. Choose from various content types like text, images, links, or code snippets to build comprehensive notes.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center rounded-lg">
        <img 
          src="/working4.png" 
          alt="Content Capture Step"
          className="h-full w-full object-cover rounded-lg"
        />
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}

export const Working = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Don't render on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div className="py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl font-inter md:text-4xl lg:text-4xl text-white font-bold text-center mb-4">
            How it works
          </h2>
        </div>
        <StickyScrollRevealDemo />
      </div>
    </div>
  );
};