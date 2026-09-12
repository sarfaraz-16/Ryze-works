import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "purple" | "cyan" | "orange" | "neutral" | "brand";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  icon,
  variant = "purple",
  className
}) => {
  const variantStyles = {
    purple: "bg-[#1E085A]/60 text-[#B896FF] border-[#7042FF]/40 hover:border-[#B896FF]/60 shadow-[0_0_15px_rgba(112,66,255,0.2)]",
    brand: "bg-gradient-to-r from-[#7042FF]/20 to-[#4318D1]/20 text-[#B896FF] border-[#7042FF]/50 hover:border-[#B896FF]/70 shadow-[0_0_20px_rgba(112,66,255,0.25)]",
    cyan: "bg-sky-950/60 text-sky-300 border-sky-800/40 hover:border-sky-500/60 shadow-[0_0_15px_rgba(56,189,248,0.2)]",
    orange: "bg-amber-950/60 text-amber-300 border-amber-800/40 hover:border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
    neutral: "bg-[#080417]/80 text-zinc-300 border-white/10 hover:border-white/20"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase border backdrop-blur-md transition-all duration-200",
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="shrink-0 text-xs">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
