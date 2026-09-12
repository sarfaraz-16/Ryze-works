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
    <div className={cn("flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10", className)}>
      <div>
        <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-indigo-400 mb-2">
          {eyebrow}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          {title}
        </h2>
      </div>

      {linkText && (
        <Link
          href={linkHref}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white transition-colors duration-200 group"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200" />
        </Link>
      )}
    </div>
  );
};
