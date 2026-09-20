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
          <span className="font-display font-extrabold text-white text-base sm:text-lg tracking-[0.14em] uppercase whitespace-nowrap group-hover:text-[#B896FF] transition-colors">
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
                className={`text-[11px] lg:text-xs font-mono tracking-wider transition-colors duration-150 py-1.5 px-3 rounded-lg flex items-center ${
                  isActive
                    ? "bg-violet-500/20 text-white border border-violet-500/30"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center">
          <Link href="/start-a-project">
            <Button
              variant="primary"
              size="md"
              className="text-[11px] font-bold tracking-[0.14em] px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(112,66,255,0.4)]"
            >
              START A PROJECT
            </Button>
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
                  className={`text-xs font-mono tracking-widest py-2 px-4 rounded-lg transition-colors ${
                    isActive
                      ? "bg-violet-500/20 text-white border border-violet-500/30"
                      : "text-zinc-200 hover:text-white"
                  }`}
                >
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
