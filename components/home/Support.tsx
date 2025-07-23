import { Heart } from "lucide-react";

export const Support = () => {
  const handleBuyMeCoffee = () => {
    // Replace with your actual Buy Me a Coffee URL
    window.open('https://coff.ee/meetjainn', '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl px-4 mx-auto min-h-screen bg-[#0a0a0a]">
     
        {/* Heart Icon at top center */}
        <div className="mb-6">
          <Heart 
            className="w-16 h-16 p-3 border-2 border-[#dc586d] text-[#dc586d] bg-[#dc586d]/20 rounded-full animate-pulse" 
          />
        </div>
        
        {/* Support message */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-inter md:text-4xl lg:text-5xl text-white font-bold text-center mb-4">
            Liked Fona?
          </h1>
          <p className="text-gray-400 font-inter font-semibold md:text-xl lg:text-2xl text-center">
            Support Fona if it helps you stay focused and productive, consider supporting us. 
            Your donation helps keep us motivated to improve the extension and add new features.
          </p>
        </div>

        {/* Buy Me a Coffee Button */}
        <button
          onClick={handleBuyMeCoffee}
          className="bg-yellow-400/60 hover:bg-yellow-500/60 border-2 border-yellow-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto space-x-2 w-auto h-14"
        >
          <span className="text-xl">☕</span>
          <span>Buy me a coffee</span>
        </button>
    </div>
  );
};