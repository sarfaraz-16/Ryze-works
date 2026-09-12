import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  icon,
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 rounded-full gap-1.5",
    md: "text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full gap-2",
    lg: "text-sm font-semibold tracking-wide px-7 py-3.5 rounded-full gap-2.5"
  };

  const variantStyles = {
    primary:
      "bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-[0_0_20px_-3px_rgba(99,102,241,0.5)] active:scale-[0.98]",
    secondary:
      "bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 hover:border-white/20 active:scale-[0.98]",
    outline:
      "bg-transparent hover:bg-white/[0.05] text-white/90 border border-white/20 hover:border-white/40 active:scale-[0.98]",
    ghost:
      "bg-transparent hover:bg-white/[0.05] text-white/80 hover:text-white",
    gradient:
      "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_25px_-5px_rgba(168,85,247,0.5)] active:scale-[0.98]"
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
