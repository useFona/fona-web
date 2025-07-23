'use client';
import React from 'react';

// Title Loading Component
const TitleLoading: React.FC = () => {
  return (
    <div className="mb-8 text-center">
      <div className="flex items-center justify-center gap-2">
        <div className="h-10 w-48 bg-[#7b7b7d] rounded animate-pulse" /> {/* Title */}
        <div className="h-6 w-6 bg-[#7b7b7d] rounded animate-pulse" /> {/* Edit button */}
      </div>
    </div>
  );
};

// Editor Loading Component
const EditorLoading: React.FC = () => {
  return (
    <div className="w-full h-96 bg-[#7b7b7d] rounded-lg animate-pulse">
      <div className="p-4 space-y-4">
        <div className="h-6 w-3/4 bg-[#7b7b7d] rounded animate-pulse" /> {/* Placeholder for editor content */}
        <div className="h-6 w-1/2 bg-[#7b7b7d] rounded animate-pulse" />
        <div className="h-6 w-2/3 bg-[#7b7b7d] rounded animate-pulse" />
      </div>
    </div>
  );
};

// Main EditorPageLoading Component
const EditorPageLoading: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <TitleLoading />
      <EditorLoading />
    </div>
  );
};

export default EditorPageLoading;
