"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Brain, PenTool, Code2, TrendingUp, Zap, Sparkles } from "lucide-react";

export interface IconShield3DProps {
  /** Icon name ("Brain", "PenTool", etc.) or custom React node */
  icon?: string | React.ReactNode;
  children?: React.ReactNode;
  /** Optional custom CSS class for outer wrapper */
  className?: string;
  /** Optional custom glow accent color */
  accentColor?: string;
}

export const IconShield3D: React.FC<IconShield3DProps> = ({
  icon,
  children,
  className = "",
  accentColor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }
    return true;
  });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!canHover) return;
      const el = containerRef.current;
      if (!el) return;

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Gyroscopic tilt following cursor coordinates: rotateX(-y * 20deg) rotateY(x * 20deg)
        const rotX = -y * 24;
        const rotY = x * 24;

        setTransformStyle({
          transform: `perspective(600px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(24px)`,
          transition: "transform 0.08s ease-out",
        });
      });
    },
    [canHover]
  );

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    if (rafId.current) cancelAnimationFrame(rafId.current);
    // Smooth reset back with spring easing
    setTransformStyle({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    });
  }, []);

  const renderIconContent = () => {
    if (children) return children;
    if (React.isValidElement(icon)) return icon;

    const iconStr = typeof icon === "string" ? icon : "";
    switch (iconStr) {
      case "Brain":
        return <Brain className="w-6 h-6 text-[#B896FF]" />;
      case "PenTool":
        return <PenTool className="w-6 h-6 text-[#B896FF]" />;
      case "Code2":
        return <Code2 className="w-6 h-6 text-cyan-300" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-amber-300" />;
      case "Zap":
        return <Zap className="w-6 h-6 text-[#B896FF]" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-[#B896FF]" />;
      default:
        return <Brain className="w-6 h-6 text-[#B896FF]" />;
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative [perspective:600px] w-12 h-12 mb-6 select-none group/shield cursor-pointer ${className}`}
    >
      {/* 3D Glass Medallion Plate */}
      <div
        style={isHovered ? transformStyle : undefined}
        className="w-full h-full rounded-xl bg-violet-950/30 border border-violet-500/20 backdrop-blur-md flex items-center justify-center relative overflow-hidden [transform-style:preserve-3d] transition-all duration-300 ease-out shadow-[0_0_15px_rgba(139,92,246,0.15)] group-hover:border-violet-400/50 group-hover:shadow-[0_0_24px_rgba(168,85,247,0.35)] group-hover:[transform:perspective(600px)_translateZ(24px)]"
      >
        {/* Dynamic Specular Reflection Line / Light Sweep */}
        <div className="absolute -inset-full pointer-events-none rounded-xl bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.25)_50%,transparent_60%)] -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full group-hover/shield:translate-x-full" />

        {/* Ambient plate back-glow */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-transparent to-[#B896FF]/10 pointer-events-none"
          style={accentColor ? { backgroundColor: `${accentColor}15` } : undefined}
        />

        {/* Core Icon floating above plate at translateZ(12px) with intense violet neon drop-shadow */}
        <div className="relative z-10 [transform:translateZ(12px)] drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
          {renderIconContent()}
        </div>
      </div>
    </div>
  );
};

export default IconShield3D;
