import React from "react";
import Link from "next/link";
import { FOOTER_COLUMNS } from "@/data/siteData";

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="border-t border-white/[0.08] bg-[#050508] pt-16 pb-12 text-white/60">
      <div className="max-w-7xl mx-auto px-6">
        {/* Multi-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 mb-16">
          {/* Column 1: Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 pr-4">
            <Link href="/" className="inline-block mb-4 group">
              <span className="text-sm font-black tracking-[0.25em] text-white block">
                RYZE
              </span>
              <span className="text-sm font-black tracking-[0.25em] text-white block">
                WORKS
              </span>
            </Link>

            <p className="text-xs text-white/50 leading-relaxed mb-6 max-w-xs">
              An AI-native creative and technology partner helping brands build, grow and scale.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors text-xs font-bold"
              >
                in
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors text-xs font-bold"
              >
                ig
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Dribbble"
                className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors text-xs font-bold"
              >
                dr
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors text-xs font-bold"
              >
                yt
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-bold tracking-[0.2em] text-white uppercase mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-white/50 hover:text-white transition-colors"
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
            <h4 className="text-[11px] font-bold tracking-[0.2em] text-white uppercase mb-4">
              CONTACT
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="mailto:hello@ryzeworks.tech"
                className="block text-white/50 hover:text-purple-300 transition-colors"
              >
                hello@ryzeworks.tech
              </a>
              <p className="text-white/40">Bangalore, India</p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Sub-bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <div>© 2024 Ryze Works. All rights reserved.</div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link href="/ai-disclosure" className="hover:text-white transition-colors">
              AI Disclosure
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
