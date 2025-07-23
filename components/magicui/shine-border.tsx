"use client";

import * as React from "react";

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Duration of the animation in seconds
   * @default 14
   */
  duration?: number;
  /**
   * Color of the shine, can be a single color or an array of colors
   * @default "#000000"
   */
  shineColor?: string | string[];
}

/**
 * Shine Border
 *
 * An animated shine effect component with configurable properties.
 */
export function ShineBorder({
  duration = 14,
  shineColor = "#000000",
  className,
  style,
  ...props
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--duration": `${duration}s`,
          backgroundImage: `linear-gradient(90deg, transparent, ${shineColor}, transparent)`,
          backgroundSize: "300% 300%",
          ...style,
        } as React.CSSProperties
      }
      className={`
        relative overflow-hidden
        bg-black/50 backdrop-blur-sm
        rounded-lg
        border-[1px] border-[rgba(255,255,255,0.1)]
        will-change-[background-position]
        motion-safe:animate-shine
        ${className || ''}
      `}
      {...props}
    >
      {props.children}
    </div>
  );
}
