'use client';
import React from 'react';

// Title Loading Component
const TitleLoading: React.FC = () => {
  return (
    <div className="h-10 w-48 bg-black dark:bg-gray-700 rounded animate-pulse mx-auto mb-8" />
  );
};

// Search Bar Loading Component
const SearchBarLoading: React.FC = () => {
  return (
    <div className="flex w-full sm:w-96">
      <div className="flex-1 h-10 bg-black dark:bg-gray-700 rounded-lg animate-pulse mr-3" /> {/* Search input */}
      <div className="h-10 w-24 bg-black dark:bg-gray-700 rounded-sm animate-pulse" /> {/* Search button */}
    </div>
  );
};

// Sort Buttons Loading Component
const SortButtonsLoading: React.FC = () => {
  return (
    <div className="flex gap-2">
      <div className="h-10 w-36 bg-black dark:bg-gray-700 rounded-lg animate-pulse" /> {/* Sort by Name button */}
      <div className="h-10 w-36 bg-black dark:bg-gray-700 rounded-lg animate-pulse" /> {/* Sort by Newest button */}
    </div>
  );
};

// Cards Loading Component
const CardsLoading: React.FC = () => {
  // Simulate 3-6 cards to mimic a typical loading state
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-48 w-full bg-black dark:bg-gray-700 rounded-lg animate-pulse p-4 flex flex-col gap-4"
        >
          <div className="h-6 w-3/4 bg-black dark:bg-gray-600 rounded animate-pulse" /> {/* Card title */}
          <div className="h-4 w-full bg-black dark:bg-gray-600 rounded animate-pulse" /> {/* Card description */}
          <div className="h-4 w-1/2 bg-black dark:bg-gray-600 rounded animate-pulse mt-auto" /> {/* Card link */}
        </div>
      ))}
    </div>
  );
};

// Main PagesLoading Component
const PagesLoading: React.FC = () => {
  return (
    <div className="h-auto w-full my-8">
      <TitleLoading />

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
        <SearchBarLoading />
        <SortButtonsLoading />
      </div>

      {/* Cards Section */}
      <CardsLoading />
    </div>
  );
};

export default PagesLoading;
