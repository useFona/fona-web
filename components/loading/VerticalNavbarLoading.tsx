'use client';
import React from 'react';

// Profile Loading Component
const ProfileLoading: React.FC = () => {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-12 h-12 rounded-full bg-[#7b7b7d] animate-pulse flex-shrink-0" /> {/* Profile image */}
      <div className="h-5 w-32 bg-[#7b7b7d] rounded animate-pulse" /> {/* User name */}
    </div>
  );
};

// Dashboard Loading Component
const DashboardLoading: React.FC = () => {
  return (
    <div className="w-full mb-8">
      <div className="rounded-lg p-4 flex items-center justify-start gap-2">
        <div className="w-5 h-5 bg-[#7b7b7d] rounded animate-pulse" /> {/* Dashboard icon */}
        <div className="h-5 w-24 bg-[#7b7b7d] rounded animate-pulse" /> {/* Dashboard text */}
      </div>
      <div className="rounded-lg p-4 flex items-center justify-start gap-2">
        <div className="w-5 h-5 bg-[#7b7b7d] rounded animate-pulse" /> {/* FilePlus2 icon */}
        <div className="h-5 w-32 bg-[#7b7b7d] rounded animate-pulse" /> {/* Create New Page text */}
      </div>
      <div className="rounded-lg p-3 flex justify-start items-start gap-2">
        <div className="w-5 h-5 bg-[#7b7b7d] rounded animate-pulse" /> {/* RotateCcw icon */}
        <div className="h-5 w-28 bg-[#7b7b7d] rounded animate-pulse" /> {/* Refresh page text */}
      </div>
      <hr className="my-2 border border-[#7b7b7d] opacity-50 mx-auto w-[90%]" /> {/* Separator */}
    </div>
  );
};

// Recent Pages Loading Component
const RecentPagesLoading: React.FC = () => {
  return (
    <div className="w-full mb-6">
      <div className="bg-[#191919] border-[#242424] border-2 rounded-4xl py-1 mb-4 flex items-center justify-center gap-2">
        <div className="h-5 w-28 bg-[#7b7b7d] rounded animate-pulse" /> {/* Recent Pages header */}
      </div>
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg p-3 flex items-center gap-2"
          >
            <div className="w-5 h-5 bg-[#7b7b7d] rounded animate-pulse" /> {/* File icon */}
            <div className="h-5 w-3/4 bg-[#7b7b7d] rounded animate-pulse" /> {/* Page title */}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main VerticalNavbarLoading Component
const VerticalNavbarLoading: React.FC = () => {
  return (
    <nav className="fixed h-[97vh] w-[20%] border-2 border-[#292929] bg-[#161616] rounded-4xl flex flex-col mx-2 my-3 p-3 z-50 shadow-black">
      {/* Profile Section */}
      <ProfileLoading />
      <hr className="my-2 border-t border-[#7b7b7d] opacity-50 mx-auto w-[90%]" />

      {/* Dashboard Section */}
      <DashboardLoading />

      {/* Center Content */}
      <div className="flex flex-col items-center flex-1">
        {/* Recent Pages Section */}
        <RecentPagesLoading />
      </div>
    </nav>
  );
};

export default VerticalNavbarLoading;
