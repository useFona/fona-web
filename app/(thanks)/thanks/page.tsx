"use client";
import { useEffect } from 'react';
import { ArrowRight, Copy, Github } from 'lucide-react';
import { AuroraText } from '@/components/magicui/aurora-text';
import Footer from '@/components/home/Footer';
import { Logo } from '@/components/ui/Logo';


export default function ThanksPage() {
  useEffect(() => {
    // Add the scrollbar styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      ::-webkit-scrollbar {
        width: 4px;
      }
      ::-webkit-scrollbar-track {
        background: #0a0a0a;
      }
      ::-webkit-scrollbar-thumb {
        background: #1a1a1a;
        border-radius: 2px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #2a2a2a;
      }
      html {
        scrollbar-width: thin;
        scrollbar-color: #1a1a1a #0a0a0a;
      }
    `;
    document.head.appendChild(style);

    (async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();
      } catch (error) {
        console.error('Locomotive Scroll failed:', error);
      }
    })();
  }, []);

  const handleDashboardClick = () => {
    window.open('https://fona.meet-jain.in/dashboard', '_blank');
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/useFona', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden relative">
      <Logo />
      {/* Header Section */}
      <header className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-6">
            Thanks for downloading{' '}
            <AuroraText
              colors={["#FFBB94", "#DC586D", "#FB9590"]}
              className="font-extrabold"
            >
              FONA
            </AuroraText>
            !
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium max-w-3xl mx-auto leading-relaxed">
            From here onwards we will make sure that your flow while making notes keeps constant
          </p>
        </div>
      </header>

      {/* Horizontal Line */}
      <div className="max-w-6xl mx-auto px-4">
        <hr className="border-[#2a2a2a] border-t-2" />
      </div>

      {/* Main Content Sections */}
      <main className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-6 text-center">so now what?</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">

            {/* Section 1: Copy Token */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-8 rounded-2xl border border-[#2a2a2a] hover:border-[#3a3a3a] transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-[#0a0a0a]">1</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Copy your token from the dashboard
                </h3>
              </div>

              <button
                onClick={handleDashboardClick}
                className="w-full group bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] text-[#0a0a0a] font-bold text-lg py-3 px-6 rounded-full hover:opacity-90 transition-all duration-200 transform hover:scale-105 border-2 border-[#0a0a0a] flex items-center justify-center gap-3"
              >
                <Copy className="w-5 h-5" />
                <span className="transition-all duration-300 group-hover:-translate-x-2">
                  Dashboard
                </span>
                <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-2" />
              </button>
            </div>

            {/* Section 2: Add Token */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-8 rounded-2xl border border-[#2a2a2a] hover:border-[#3a3a3a] transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-[#0a0a0a]">2</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  Add token to extension and get your extension sync with your profile
                </h3>
              </div>

              <p className="text-[#888] text-center mt-4">
                Paste your token in the extension login
              </p>
            </div>

            {/* Section 3: Select Active Page */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-8 rounded-2xl border border-[#2a2a2a] hover:border-[#3a3a3a] transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-[#0a0a0a]">3</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Select active page : )
                </h3>
              </div>

              <p className="text-xl font-semibold text-center bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] bg-clip-text text-transparent">
                Happy notes making &lt;3
              </p>
            </div>

          </div>

          {/* Need Help Section */}
          <div className="mt-16 mb-16">
            <div className="max-w-6xl mx-auto border-2 border-dotted border-[#6a6562] bg-transparent p-0.5 rounded-2xl">
              <div className="bg-gradient-to-br from-transparent to-[#0f0f0f] p-8 rounded-2xl">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Need Assistance?</h2>
                  <p className="text-xl md:text-2xl text-[#ccc] mb-8 max-w-3xl mx-auto leading-relaxed">
                    Facing any challenges or have questions about FONA? We're here to help you get the most out of your note-taking experience. Don't hesitate to reach out!
                  </p>

                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Get Help & Contribute</h3>
                    <p className="text-[#aaa] mb-8 max-w-2xl mx-auto text-lg md:text-xl">
                      Report bugs, request features, or browse our documentation on GitHub. Your feedback helps us improve FONA for everyone.
                    </p>
                  </div>

                  <button
                    onClick={handleGitHubClick}
                    className="group bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] text-[#0a0a0a] font-bold text-lg py-4 px-8 rounded-full hover:opacity-90 transition-all duration-200 transform hover:scale-105 border-2 border-[#0a0a0a] flex items-center gap-3 mx-auto"
                  >
                    <Github className="w-6 h-6" />
                    <span className="transition-all duration-300">
                      Get Support on GitHub
                    </span>
                    <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="mt-16">
            <div className="max-w-6xl mx-auto border-2 border-dashed border-[#DC586D] bg-transparent p-0.5 rounded-2xl">
              <div className="bg-gradient-to-br from-transparent to-[#0f0f0f] p-8 rounded-2xl">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Support Our Development</h2>
                  <p className="text-xl md:text-2xl text-[#ccc] mb-8 max-w-3xl mx-auto leading-relaxed">
                    If you find FONA useful, consider supporting us :) every contribution matters! your slight efforts will help us a lot in long run :) to make fona bigger & better! Thank you &lt;3
                  </p>

                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Ways to Support:</h3>
                    <p className="text-[#aaa] mb-8 max-w-lg mx-auto text-lg md:text-xl">
                      Buy us a coffee to fuel development
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href="https://buymeacoffee.com/meetjainn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] text-[#0a0a0a] font-bold text-lg py-3 px-8 rounded-full hover:opacity-90 transition-all duration-200 transform hover:scale-105 border-2 border-[#0a0a0a] flex items-center gap-3"
                    >
                      <span>☕</span>
                      <span className="transition-all duration-300">
                        Buy a coffee
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
