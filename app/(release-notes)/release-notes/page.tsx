"use client";
import { useEffect } from 'react';
import { Calendar, Tag, Sparkles, Bug, Users, Code2 } from 'lucide-react';
import { AuroraText } from '@/components/magicui/aurora-text';
import { Logo } from '@/components/ui/Logo';
import Footer from '@/components/home/Footer';


export default function ReleaseNotesPage() {
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      <Logo />
      {/* Header Section */}
      <header className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-6">
            <AuroraText
              colors={["#FFBB94", "#DC586D", "#FB9590"]}
              className="font-extrabold"
            >
              FONA
            </AuroraText>
            {' '}got a new upgrade!
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-[#ccc] font-medium max-w-3xl mx-auto leading-relaxed">
            A complete log of how FONA keeps getting better and better!
          </p>
        </div>
      </header>

      {/* Horizontal Line */}
      <div className="max-w-6xl mx-auto px-4">
        <hr className="border-[#2a2a2a] border-t-2" />
      </div>

      {/* Release Notes Header */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-4">
            Release Notes
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8 px-4 mb-16">
        <div className="max-w-6xl mx-auto">

          {/* First Release Note */}
          <div className="border-2 border-dashed border-[#FFBB94] bg-transparent p-0.5 rounded-2xl">
            <div className="bg-gradient-to-br from-transparent to-[#0f0f0f] p-8 rounded-2xl">

              {/* Version and Date Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                  <div className="bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] p-2 rounded-lg">
                    <Tag className="w-5 h-5 text-[#0a0a0a]" />
                  </div>
                  <span className="text-2xl font-bold text-white">v1.2.0</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-[#0a0a0a]" />
                  </div>
                  <span className="text-lg text-[#ccc]">Date to be added</span>
                </div>
              </div>

              {/* What's New Section */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] p-2 rounded-lg">
                    <Sparkles className="w-6 h-6 text-[#0a0a0a]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">What's New!</h3>
                </div>

                <p className="text-lg md:text-xl text-[#ccc] mb-6 leading-relaxed">
                  This time we majorly focused on enhancing our extension after listening to reviews and day to day user experience we added minimal yet very effective features!
                </p>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 text-[#ddd]">
                    <span className="text-[#FFBB94] text-xl mt-1">•</span>
                    <span className="text-lg leading-relaxed">Enhanced extension UI of the extension</span>
                  </div>
                  <div className="flex items-start gap-3 text-[#ddd]">
                    <span className="text-[#FFBB94] text-xl mt-1">•</span>
                    <span className="text-lg leading-relaxed">Added manual close button of the selected text menu thus user can now manually remove it for that selected texts</span>
                  </div>
                  <div className="flex items-start gap-3 text-[#ddd]">
                    <span className="text-[#FFBB94] text-xl mt-1">•</span>
                    <span className="text-lg leading-relaxed">Added blacklist site for FONA - we realized users generally don't want FONA on every website thus we added domain based blacklisting in FONA!</span>
                  </div>
                </div>

                {/* Bug Fixes Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-r from-[#DC586D] to-[#FB9590] p-2 rounded-lg">
                      <Bug className="w-5 h-5 text-[#0a0a0a]" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Bug Fixes!</h4>
                  </div>
                  <div className="flex items-start gap-3 text-[#ddd]">
                    <span className="text-[#DC586D] text-xl mt-1">•</span>
                    <span className="text-lg leading-relaxed">Now newly created page gets active selected thus user don't have to click it again to make it active</span>
                  </div>
                </div>

                {/* Developer's Note */}
                <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] p-6 rounded-xl border border-[#2a2a2a]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] p-2 rounded-lg">
                      <Code2 className="w-5 h-5 text-[#0a0a0a]" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Developer's Note</h4>
                  </div>
                  <p className="text-[#ccc] leading-relaxed mb-4">
                    Hope these small fixes helped you to make notes while being in flow! Our main focus for this release was taking care of extension we also made very significant changes in the code base as well!
                  </p>
                  <p className="text-[#ccc] leading-relaxed mb-4">
                    With next release we are aiming to make the main web more better - reducing loading times, increasing editor's canvas and increasing sync systems significantly!
                  </p>
                  <p className="text-lg font-medium bg-gradient-to-r from-[#FFBB94] via-[#DC586D] to-[#FB9590] bg-clip-text text-transparent">
                    Until the next one! Thank you! ❤️
                  </p>
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
