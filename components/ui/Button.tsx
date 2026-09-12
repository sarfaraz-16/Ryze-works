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
    "inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 rounded-full gap-1.5",
    md: "text-xs uppercase tracking-wider px-5 py-2.5 rounded-full gap-2",
    lg: "text-sm tracking-wide px-7 py-3.5 rounded-full gap-2.5"
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:from-[#8257ff] hover:to-[#5022e0] text-white shadow-[0_0_25px_rgba(112,66,255,0.4)] hover:shadow-[0_0_35px_rgba(112,66,255,0.6)] border border-[#B896FF]/30 active:scale-[0.98]",
    secondary:
      "bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 border border-white/10 hover:border-[#B896FF]/30 active:scale-[0.98]",
    outline:
      "bg-transparent hover:bg-white/[0.05] text-zinc-100 border border-white/20 hover:border-[#B896FF]/50 active:scale-[0.98]",
    ghost:
      "bg-transparent hover:bg-white/[0.05] text-zinc-300 hover:text-white",
    gradient:
      "bg-gradient-to-r from-[#7042FF] via-[#5D30DF] to-[#4318D1] hover:from-[#B896FF] hover:to-[#7042FF] text-white shadow-[0_0_30px_rgba(112,66,255,0.5)] active:scale-[0.98]"
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
