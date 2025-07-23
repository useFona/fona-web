'use client';
import React from 'react';
import { ShineBorder } from '@/components/magicui/shine-border';

// Token Loading Component
const TokenLoading: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 bg-[#121212] rounded-lg p-4 w-full h-full shadow-lg">
      <div className="h-12 w-32 bg-[#7b7b7d] rounded animate-pulse" /> {/* Title */}
      <div className="w-full max-w-full mt-10">
        <div className="flex items-center justify-between">
          <div className="h-6 w-16 bg-[#7b7b7d] rounded animate-pulse" /> {/* Copy button */}
        </div>
        <div className="mt-2 text-center bg-[#181818] rounded-lg p-3">
          <div className="h-6 w-3/4 mx-auto bg-[#7b7b7d] rounded animate-pulse" /> {/* Token text */}
        </div>
        <div className="w-full mt-4 h-12 bg-[#7b7b7d] rounded-lg animate-pulse" /> {/* Generate button */}
      </div>
    </div>
  );
};

// User Loading Component
const UserLoading: React.FC = () => {
  return (
    <div className="flex items-center gap-4 bg-[#161616] rounded-lg p-4 mt-2 w-[400px]">
      <div className="w-16 h-16 bg-[#7b7b7d] rounded-full animate-pulse" /> {/* Profile image */}
      <div className="flex-1">
        <div className="h-10 w-48 bg-[#7b7b7d] rounded animate-pulse" /> {/* Name */}
        <hr className="border-[#7b7b7d] my-2" />
        <div className="h-4 w-32 bg-[#7b7b7d] rounded animate-pulse" /> {/* Email */}
      </div>
    </div>
  );
};

// Pages Loading Component
const PagesLoading: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 bg-[#161616] rounded-lg p-4 flex-1 w-[500px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-12 w-32 bg-[#7b7b7d] rounded animate-pulse" /> {/* Pages count */}
        </div>
      </div>
      <div className="mt-auto">
        <div className="h-10 w-full bg-[#7b7b7d] rounded-lg animate-pulse" /> {/* Add New Page button */}
      </div>
    </div>
  );
};

// Main UserDetailsLoading Component
const UserDetailsLoading: React.FC = () => {
  return (
    <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
      <div className="flex gap-2 bg-[#161616] rounded-lg p-4 h-[350px]">
        {/* Left side - Token */}
        <div className="flex flex-3 flex-col gap-4">
          <TokenLoading />
        </div>

        {/* Vertical separator */}
        <div className="h-full mx-2 border-r border-[#7b7b7d]" />

        {/* Right side - User Info and Pages */}
        <div className="flex flex-5 flex-col">
          <div className="flex flex-col gap-4 bg-[#121212] rounded-lg p-5 w-full h-full shadow-lg relative">
            {/* Logout Button Placeholder */}
            <div className="absolute top-4 right-4">
              <div className="h-10 w-24 bg-[#7b7b7d] rounded-lg animate-pulse" /> {/* Logout button */}
            </div>

            {/* User Details */}
            <UserLoading />

            {/* Pages Section */}
            <PagesLoading />
          </div>
        </div>
      </div>
    </ShineBorder>
  );
};

export default UserDetailsLoading;
