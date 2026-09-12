import React from "react";
import Link from "next/link";
import { FOOTER_COLUMNS } from "@/data/siteData";

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="border-t border-white/[0.08] bg-[#080417] pt-16 pb-12 text-zinc-400 select-none">
      <div className="max-w-7xl mx-auto px-6">
        {/* Multi-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 mb-16">
          {/* Column 1: Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 pr-4">
            <Link href="/" className="inline-block mb-4 group select-none">
              <span className="font-display font-extrabold text-white text-base sm:text-lg tracking-[0.14em] uppercase whitespace-nowrap group-hover:text-[#B896FF] transition-colors">
                RYZE WORKS
              </span>
            </Link>

            <p className="text-xs text-zinc-300 leading-relaxed mb-6 max-w-xs">
              An AI-native creative and technology partner helping brands build, grow and scale.
            </p>

            {/* Company Links */}
            <div className="mb-6">
              <h4 className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#B896FF] uppercase mb-4">
                COMPANY
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/about"
                    className="text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-[#7042FF]/30 border border-white/10 hover:border-[#B896FF]/40 flex items-center justify-center text-zinc-300 hover:text-white transition-all text-xs font-bold shadow-sm"
              >
                in
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-[#7042FF]/30 border border-white/10 hover:border-[#B896FF]/40 flex items-center justify-center text-zinc-300 hover:text-white transition-all text-xs font-bold shadow-sm"
              >
                ig
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Dribbble"
                className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-[#7042FF]/30 border border-white/10 hover:border-[#B896FF]/40 flex items-center justify-center text-zinc-300 hover:text-white transition-all text-xs font-bold shadow-sm"
              >
                dr
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-[#7042FF]/30 border border-white/10 hover:border-[#B896FF]/40 flex items-center justify-center text-zinc-300 hover:text-white transition-all text-xs font-bold shadow-sm"
              >
                yt
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 7: Contact Info */}
          <div>
            <h4 className="font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase mb-4">
              CONTACT
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="mailto:hello@ryzeworks.tech"
                className="block text-zinc-400 hover:text-[#B896FF] transition-colors"
              >
                hello@ryzeworks.tech
              </a>
              <p className="text-zinc-500">Bangalore, India</p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Sub-bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>© 2024 Ryze Works. All rights reserved.</div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-zinc-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-200 transition-colors">
              Terms of Use
            </Link>
            <Link href="/cookie-policy" className="hover:text-zinc-200 transition-colors">
              Cookie Policy
            </Link>
            <Link href="/ai-disclosure" className="hover:text-zinc-200 transition-colors">
              AI Disclosure
            </Link>
            <span className="text-zinc-700 select-none text-[10px]" aria-hidden="true">
              •
            </span>
            <Link
              href="/admin"
              className="text-zinc-600 hover:text-zinc-400 transition-colors text-[11px]"
              title="Staff Command Center"
            >
              Staff
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
