"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "WORK", href: "/projects" },
    { label: "SERVICES", href: "/services" },
    { label: "INSIGHTS", href: "/insights" },
    { label: "TESTIMONIALS", href: "/testimonials" },
    { label: "AI", href: "/ai" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" }
  ];

  return (
    <>
      <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center items-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-between gap-4 sm:gap-8 px-5 sm:px-7 py-3 rounded-full bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(139,92,246,0.15)] transition-all duration-300 max-w-6xl w-full relative">
          {/* Inner ambient top highlight */}
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 text-white font-extrabold tracking-tight text-sm sm:text-base group select-none">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 p-[1px] shadow-[0_0_12px_rgba(139,92,246,0.5)] group-hover:shadow-[0_0_18px_rgba(139,92,246,0.8)] transition-all shrink-0">
              <div className="w-full h-full bg-[#0B0813] rounded-[7px] flex items-center justify-center">
                <span className="font-mono text-[10px] font-bold text-violet-300">R</span>
              </div>
            </div>
            <span>RYZE <span className="text-zinc-400 font-medium">WORKS</span></span>
          </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 lg:gap-2 px-2 py-1 rounded-full bg-white/[0.02] border border-white/5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                  isActive
                    ? "text-white font-semibold bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-3 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent rounded-full shadow-[0_0_8px_rgba(167,139,250,1)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/start-a-project"
            className="relative group overflow-hidden px-5 py-2.5 rounded-full text-xs font-bold text-white tracking-wide bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-[length:200%_auto] hover:bg-right shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all duration-500 flex items-center gap-2"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>START A PROJECT</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#080417]/95 backdrop-blur-xl border-b border-white/10 px-6 pt-24 pb-6 animate-in fade-in duration-200 lg:hidden overflow-y-auto">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs font-mono tracking-widest py-2 transition-colors flex items-center gap-3 relative ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)] shrink-0" />
                  ) : (
                    <span className="w-1.5 h-1.5 shrink-0" />
                  )}
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 mt-4 border-t border-white/10">
              <Link href="/start-a-project" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full relative overflow-hidden group bg-gradient-to-r from-violet-600 to-indigo-600">
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    START A PROJECT
                  </span>
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
