import React from 'react';
import { Slideshow } from './SlideShow';


export const Hero = () => {
  return (
    <div className="max-w-full mx-auto overflow-hidden mb-8">
      <div className="text-center px-4">
        <p className="text-xl sm:text-2xl md:text-4xl lg:text-4xl text-white font-bold text-center mb-3 sm:mb-4 px-4">
          All you need to do is select and send
        </p>
        <p className="text-base sm:text-lg md:text-4xl lg:text-3xl text-white font-bold text-center px-4">
          After that we've got you covered!
        </p>
      </div>
      
      {/* Slideshow Component */}
      <Slideshow />
    </div>
  );
};