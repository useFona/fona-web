"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const BreathingBlobBackground = ({
  children,
  className,
  containerClassName,
  colors,
  backgroundFill,
  blur = 40,
  speed = "fast",
  blobOpacity = 0.7,
  blobCount = 3,
  fadeHeight = 200, // Height of the fade effect in pixels
  fadeOpacity = 0.9, // How strong the fade should be (0-1)
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  blobOpacity?: number;
  blobCount?: number;
  fadeHeight?: number;
  fadeOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  let w: number, h: number, nt: number, ctx: any, canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSafari, setIsSafari] = useState(false);
  let animationId: number;

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.003;
      default:
        return 0.002;
    }
  };

  const blobColors = colors ?? [
    "#1e3a8a", // deep blue (outer) - night sky
    "#3b82f6", // bright blue - city lights
    "#06b6d4", // cyan - neon glow
    "#eab308", // golden yellow - street lights
    "#f59e0b", // amber gold (center nucleus) - warm city core
  ];

  // Single blob configuration - positioned more towards center and smaller
  const blobs = [
    { x: 0.65, y: 0.25, size: 0.5, layers: 5, offset: 0 },
  ];

  const drawBreathingBlob = (blob: any, index: number) => {
    const centerX = blob.x * w;
    const centerY = blob.y * h;
    const baseRadius = Math.min(w, h) * blob.size;

    // Draw multiple layers for gradient effect
    for (let layer = blob.layers; layer >= 1; layer--) {
      ctx.beginPath();
      
      // Create organic blob shape using noise
      const points = 32;
      const vertices = [];
      
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        
        // Multiple noise layers for organic movement
        const radiusNoise = 
          noise(
            Math.cos(angle) * 0.5, 
            Math.sin(angle) * 0.5, 
            nt * 0.5 + blob.offset
          ) * 0.3 +
          noise(
            Math.cos(angle) * 1.2, 
            Math.sin(angle) * 1.2, 
            nt * 0.3 + blob.offset + 50
          ) * 0.2 +
          noise(
            centerX * 0.001, 
            centerY * 0.001, 
            nt + blob.offset + layer * 30
          ) * 0.4;

        // Breathing effect - larger base size with subtle expansion
        const breathingScale = 1.15 + Math.sin(nt * 2 + layer * 0.5 + blob.offset * 0.01) * 0.2;
        
        const radius = baseRadius * (layer / blob.layers) * (0.6 + radiusNoise * 0.4) * breathingScale;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        vertices.push({ x, y });
      }

      // Create smooth path through vertices
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length - 1; i++) {
        const curr = vertices[i];
        const next = vertices[i + 1];
        const cpx = (curr.x + next.x) / 2;
        const cpy = (curr.y + next.y) / 2;
        ctx.quadraticCurveTo(curr.x, curr.y, cpx, cpy);
      }
      ctx.closePath();

      // Color progression from outer to inner with contrasting nucleus
      let colorIndex;
      if (layer === 1) {
        // Center nucleus - bright contrasting color (amber/orange)
        colorIndex = 4; 
      } else {
        // Outer layers progress through the pink/purple gradient
        colorIndex = (blob.layers - layer) % 4;
      }
      
      const alpha = (blobOpacity * layer * layer) / (blob.layers * blob.layers);
      
      // Convert hex to rgba
      const hex = blobColors[colorIndex];
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();
    }
  };

  const drawBottomFade = () => {
    // Create a gradient that fades from transparent to background color at the bottom
    const gradient = ctx.createLinearGradient(0, h - fadeHeight, 0, h);
    const bgColor = backgroundFill || "#0a0a0a";
    
    // Convert hex to rgb for gradient
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${fadeOpacity})`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, h - fadeHeight, w, fadeHeight);
  };

  const init = () => {
    canvas = canvasRef.current;
    if (!canvas) return;
    
    ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const { width, height } = container.getBoundingClientRect();
      w = canvas.width = width * window.devicePixelRatio;
      h = canvas.height = height * window.devicePixelRatio;
      
      // Scale the canvas with CSS
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      // Scale the context to ensure proper rendering on high DPI displays
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      if (!isSafari) {
        ctx.filter = `blur(${blur}px)`;
      }
    };
    
    updateCanvasSize();
    nt = 0;
    
    const handleResize = () => {
      updateCanvasSize();
      render();
    };
    
    window.addEventListener('resize', handleResize);
    render();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  const render = () => {
    // Clear canvas with dark background
    ctx.fillStyle = backgroundFill || "#0a0a0a";
    ctx.fillRect(0, 0, w, h);
    
    nt += getSpeed();
    
    // Draw only the single blob
    drawBreathingBlob(blobs[0], 0);
    
    // Draw the bottom fade effect
    drawBottomFade();
    
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    const cleanup = init();
    return () => {
      cancelAnimationFrame(animationId);
      if (cleanup) cleanup();
    };
  }, [isSafari]);

  // Set up Safari detection
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome")
    );
  }, []);

  // Initialize and clean up canvas
  useEffect(() => {
    // Only initialize if we have the canvas ref and Safari detection is complete
    if (canvasRef.current) {
      const cleanup = init();
      return () => {
        cancelAnimationFrame(animationId);
        if (cleanup) cleanup();
      };
    }
  }, [isSafari]);

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative h-[85vh] w-full flex flex-col items-center justify-center",
          containerClassName
        )}
      >
        <canvas
          className="absolute inset-0 z-0 w-full h-full"
          ref={canvasRef}
          id="canvas"
          style={{
            ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
          }}
        />
        <div className={cn("relative z-10 w-full", className)} {...props}>
          {children}
        </div>
      </div>
    </div>
  );
};