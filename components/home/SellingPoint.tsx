import { AnimatedBeamComponent } from "./AnimatedBeams";
import { BoxRevealSection } from "./BoxReveal";



export const SellingPoint = () => {
  return (
    <div className="w-full py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-white font-bold text-center mb-6 sm:mb-8 md:mb-10">
          Why Fona?
        </h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left side - Box Reveal Text */}
          <div className="flex justify-center lg:justify-start">
            <BoxRevealSection />
          </div>

          {/* Right side - Animated Beam */}
          <div className="flex justify-center lg:justify-end">
            <AnimatedBeamComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
