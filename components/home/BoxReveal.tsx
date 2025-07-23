import { AuroraText } from "../magicui/aurora-text";
import { BoxReveal } from "../magicui/box-reveal";

export function BoxRevealSection() {
  return (
    <div className="size-full max-w-4xl items-center justify-start overflow-hidden pt-8">
      <BoxReveal boxColor={"#161616"} duration={0.5}>
        <p className="text-5xl font-bold font-inter leading-tight text-white">
          Creating docs while reading something?
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#161616"} duration={0.5}>
        <p className="text-[2.5rem] font-inter font-bold leading-tight text-red-400 mt-2">
          Total hassle!
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#161616"} duration={0.5}>
        <div className="mt-6">
          <p className="text-gray-300 text-lg font-bold font-inter leading-relaxed">
            Switching tabs, choosing headings, styling text — ugh. <br />
            Breaks your rhythm.
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#161616"} duration={0.5}>
        <h1 className="text-[3rem] font-inter font-bold text-gray-200 mt-8">
          <AuroraText colors={["#FFBB94", "#DC586D", "#FB9590"]} className="font-extrabold text-6xl">Fona</AuroraText> fixes that!
        </h1>
      </BoxReveal>

      <BoxReveal boxColor={"#161616"} duration={0.5}>
        <p className="text-gray-300 text-lg font-bold font-inter mt-4 leading-relaxed">
          Select any page from extension and start making notes without opening any tabs or even Fona!
        </p>
      </BoxReveal>
    </div>
  );
}
