import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  linkText?: string;
  linkHref?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  linkText,
  linkHref = "#",
  className
}) => {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8", className)}>
      <div>
        <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-2 font-medium">
          {eyebrow}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-snug tracking-[-0.01em] [word-spacing:0.1em]">
          {title}
        </h2>
      </div>

      {linkText && (
        <Link
          href={linkHref}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors duration-200 group shrink-0"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
        </Link>
      )}
    </div>
  );
};
