import { AuroraText } from "@/components/magicui/aurora-text"
import { ChromeIcon } from "@/components/ui/ChromeIcon"
import { RiFirefoxBrowserFill as FirefoxIcon } from "@/components/ui/FireFoxIcon"

export const Extension = () => {
  const handleChromeClick = () => {
    window.open('https://chromewebstore.google.com/detail/fona/aiacndhhemhiamcjbmncinfbhnidfdgm', '_blank');
  };

  const handleFirefoxClick = () => {
    window.open('https://addons.mozilla.org/en-US/firefox/addon/fona', '_blank');
  };

  return (
    <div className="py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-2xl font-inter md:text-4xl lg:text-4xl text-white font-bold text-center mb-4">
          Get <AuroraText colors={["#FFBB94", "#DC586D", "#FB9590"]} className="font-extrabold text-5xl">Fona's</AuroraText> Extension Today!
        </h1>

        {/* Description */}
        <p className="text-gray-200 text-lg font-semibold font-inter mt-4 leading-relaxed mb-12">
          Add Fona's lightweight extension to start making organized notes without breaking your flow!
        </p>

        {/* Browser Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Chrome Button */}
          <button
            onClick={handleChromeClick}
            className="group flex items-center gap-4 bg-[gray]/10  dark:bg-[gray]/10 border-2 border-[#242424] dark:border-[#242424] hover:border-[#242424] dark:hover:border-[#242424] rounded-xl px-8 py-4 transition-all duration-300 hover:shadow-lg hover:scale-105 min-w-[220px]"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#242424] via-[#242424] to-[#242424] rounded-full flex items-center justify-center">
              <ChromeIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold font-inter text-white dark:text-white group-hover:text-green-600 dark:group-hover:text-green-600">
                Add to Chrome
              </div>
              <div className="text-sm font-inter text-gray-500 dark:text-gray-400">
                Free Extension
              </div>
            </div>
          </button>

          {/* Firefox Button */}
          <button
            onClick={handleFirefoxClick}
            className="group flex items-center gap-4 bg-[gray]/10 dark:bg-[gray]/10 border-2 border-[#242424] dark:border-[#242424] hover:border-[#242424] dark:hover:border-[#242424] rounded-xl px-8 py-4 transition-all duration-300 hover:shadow-lg hover:scale-105 min-w-[220px]"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#242424] via-[#242424] to-[#242424] rounded-full flex items-center justify-center">
              <FirefoxIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold font-inter text-white dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-600">
                Add to Firefox
              </div>
              <div className="text-sm font-inter text-gray-500 dark:text-gray-400">
                Free Extension
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
