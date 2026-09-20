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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#080417]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3.5"
          : "bg-[#080417]/60 backdrop-blur-md border-b border-white/[0.04] py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group select-none">
          <span className="font-display font-extrabold text-white text-base sm:text-lg tracking-[0.14em] uppercase whitespace-nowrap group-hover:text-violet-300 transition-colors">
            RYZE WORKS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 lg:gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[11px] lg:text-xs font-mono tracking-wider px-2 py-1 relative transition-colors duration-200 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center">
          <Link
            href="/start-a-project"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full px-5 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:brightness-110 transition-all"
          >
            START A PROJECT
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

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080417] border-b border-white/10 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
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
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                  ) : (
                    <span className="w-1.5 h-1.5" />
                  )}
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-white/10">
              <Link href="/start-a-project" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full">
                  START A PROJECT
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
