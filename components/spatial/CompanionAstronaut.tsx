'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useReducedMotion, AnimatePresence } from 'framer-motion';

const ASTRONAUT_QUOTES = [
  "Exploring the Ryze universe 🌌",
  "AI systems nominal ⚡",
  "Ready to launch your project? 🚀",
  "Sensors detecting high performance!",
  "Powered by Ryze AI core ✦",
];

export function CompanionAstronaut() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [isSuppressed, setIsSuppressed] = useState(false);

  // Position physics
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 22, stiffness: 85, mass: 0.8 };
  const posX = useSpring(mouseX, springConfig);
  const posY = useSpring(mouseY, springConfig);

  // Rotation physics based on delta velocity
  const [rotation, setRotation] = useState(0);
  const prevPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Ambient speech bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % ASTRONAUT_QUOTES.length);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 2600);
    }, 18000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset so the companion hovers gracefully beside the pointer
      mouseX.set(e.clientX + 22);
      mouseY.set(e.clientY + 18);

      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        setRotation(Math.max(-25, Math.min(25, angle * 0.15)));
      }

      prevPos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      // Zero-occlusion zone: suppress completely in header (or top 80px) and footer
      const inHeader = e.clientY <= 80 || !!target?.closest('header');
      const inFooter = !!target?.closest('footer');
      setIsSuppressed(inHeader || inFooter);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted || shouldReduceMotion) return null;

  return (
    <div
      className="hidden lg:block fixed inset-0 pointer-events-none z-[100] overflow-hidden select-none"
      aria-hidden="true"
    >
      <motion.div
        style={{
          x: posX,
          y: posY,
          translateX: '-50%',
          translateY: '-50%',
          rotate: rotation,
        }}
        animate={{
          opacity: isSuppressed ? 0 : 1,
          scale: isSuppressed ? 0.6 : 1,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 0.2, ease: 'easeOut' },
        }}
        className="fixed top-0 left-0 pointer-events-none"
      >
        {/* Thought Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: -42, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full bg-[#0a071b]/95 border border-[#7042FF]/50 backdrop-blur-md shadow-[0_0_20px_rgba(112,66,255,0.4)] pointer-events-none"
            >
              <p className="text-[11px] font-medium text-white tracking-wide">
                {ASTRONAUT_QUOTES[quoteIndex]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Astronaut Body */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-14 h-14 pointer-events-none group"
        >
          {/* Subtle Thruster Glow */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#38bdf8]/40 blur-md rounded-full group-hover:bg-[#7042FF]/60 transition-colors" />

          {/* Astronaut SVG */}
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
            {/* Backpack */}
            <rect x="18" y="20" width="28" height="30" rx="6" fill="#1e183a" stroke="#7042FF" strokeWidth="1.5" />
            {/* Suit Body */}
            <ellipse cx="32" cy="38" rx="14" ry="16" fill="#e2e8f0" />
            {/* Helmet */}
            <circle cx="32" cy="22" r="13" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Visor */}
            <ellipse cx="32" cy="22" rx="9" ry="6.5" fill="url(#companionVisorGrad)" />
            {/* Thruster Boots */}
            <rect x="23" y="50" width="6" height="5" rx="2" fill="#7042FF" />
            <rect x="35" y="50" width="6" height="5" rx="2" fill="#7042FF" />
            
            <defs>
              <linearGradient id="companionVisorGrad" x1="23" y1="16" x2="41" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" />
                <stop offset="0.6" stopColor="#7042FF" />
                <stop offset="1" stopColor="#080417" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CompanionAstronaut;
