import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "purple" | "cyan" | "orange" | "neutral";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  icon,
  variant = "purple",
  className
}) => {
  const variantStyles = {
    purple: "bg-purple-950/50 text-purple-300 border-purple-800/40 hover:border-purple-600/60",
    cyan: "bg-sky-950/50 text-sky-300 border-sky-800/40 hover:border-sky-600/60",
    orange: "bg-amber-950/50 text-amber-300 border-amber-800/40 hover:border-amber-600/60",
    neutral: "bg-white/[0.04] text-white/70 border-white/10 hover:border-white/20"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase border backdrop-blur-md transition-all duration-200",
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="shrink-0 text-xs">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
