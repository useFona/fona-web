import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Calendar } from "lucide-react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };
  return (
    <div
      className={cn(
        // Updated grid with better spacing and responsive columns
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-6 gap-6",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="relative group block p-0.5 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full block rounded-2xl"
                layoutId="hoverBackground"
                style={{
                  background: "linear-gradient(135deg, #FFBB94, #DC586D, #A33757)",
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.5 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <hr className="my-2 border-t border-gray-700 opacity-50 mx-auto w-[90%] fading-line" />
            <CardDescription>{formatDate(item.description)}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-6 overflow-hidden relative z-20 min-h-[200px]",
        "bg-gradient-to-br from-[#161616] via-[#121212] to-black backdrop-blur-lg",
        "border border-white/5 shadow-lg transition-all duration-300",
        "hover:bg-black hover:border-white/10 shadow-2xl shadow-black",
        className
      )}
    >
      <div className="relative z-50">
        <div className="py-4 px-2">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-2xl text-gray-200 font-bold p-2 tracking-wide line-clamp-2", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mt-4 text-gray-300/90 tracking-wide leading-relaxed text-sm line-clamp-3",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-400" />
        {children}
      </div>
    </div>
  );
};
