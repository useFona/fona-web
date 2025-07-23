import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { FileText, User } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

const Circle = forwardRef<

  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const fonaRef = useRef<HTMLDivElement>(null);
  const output1Ref = useRef<HTMLDivElement>(null);
  const output2Ref = useRef<HTMLDivElement>(null);
  const output3Ref = useRef<HTMLDivElement>(null);
  const output4Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[400px] w-full items-center justify-center overflow-hidden p-6"
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-8">
        {/* User Icon */}
        <div className="flex flex-col justify-center">
          <Circle ref={userRef} className="bg-[#161616] size-14 border-[#292929]">
            <User className="h-6 w-6" color="gray" />
          </Circle>
        </div>

        {/* Fona Logo (Center) */}
        <div className="flex flex-col justify-center">
          <Circle ref={fonaRef} className="size-16 border-[#292929] bg-gradient-to-br from-[#161616] to-[#121212]">
            <Image src="/fona.svg" alt="Fona" width={50} height={50} />
          </Circle>
        </div>

        {/* Output Pages */}
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={output1Ref} className="bg-[#FFBB94]/20 border-[#FFBB94]">
            <FileText className="h-4 w-4 text-[#FFBB94]" />
          </Circle>
          <Circle ref={output2Ref} className="bg-[#DC586D]/20 border-[#DC586D]">
            <FileText className="h-4 w-4 text-[#DC586D]" />
          </Circle>
          <Circle ref={output3Ref} className="bg-[#FB9590]/20 border-[#FB9590]">
            <FileText className="h-4 w-4 text-[#FB9590]" />
          </Circle>
          <Circle ref={output4Ref} className="bg-[#FFBB94]/20 border-[#FFBB94]">
            <FileText className="h-4 w-4 text-[#FFBB94]" />
          </Circle>
        </div>
      </div>

      {/* Animated Beams from User to Fona */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={fonaRef}
        duration={3}
        curvature={-20}
      />

      {/* Animated Beams from Fona to Outputs */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fonaRef}
        toRef={output1Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fonaRef}
        toRef={output2Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fonaRef}
        toRef={output3Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fonaRef}
        toRef={output4Ref}
        duration={3}
      />
    </div>
  );
}
