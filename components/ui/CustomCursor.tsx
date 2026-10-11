'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'card' | 'nav'>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('[data-cursor], a, button');
      if (interactiveEl) {
        const customText = interactiveEl.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText);
          setCursorVariant('card');
        } else if (target.closest('header, footer')) {
          setCursorText('');
          setCursorVariant('nav');
        } else {
          setCursorText('');
          setCursorVariant('hover');
        }
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted || shouldReduceMotion) return null;

  return (
    <div
      className="hidden lg:block pointer-events-none fixed inset-0 z-[90] overflow-hidden select-none"
      aria-hidden="true"
    >
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorVariant === 'card' ? 1 : cursorVariant === 'hover' ? 1.5 : 1,
          width: cursorVariant === 'card' ? 68 : cursorVariant === 'hover' ? 36 : cursorVariant === 'nav' ? 22 : 14,
          height: cursorVariant === 'card' ? 28 : cursorVariant === 'hover' ? 36 : cursorVariant === 'nav' ? 22 : 14,
          borderRadius: '9999px',
          backgroundColor:
            cursorVariant === 'card'
              ? 'rgba(112, 66, 255, 0.9)'
              : cursorVariant === 'hover'
              ? 'rgba(56, 189, 248, 0.25)'
              : cursorVariant === 'nav'
              ? 'rgba(112, 66, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.85)',
          borderColor:
            cursorVariant === 'card'
              ? 'rgba(255, 255, 255, 0.6)'
              : cursorVariant === 'hover'
              ? 'rgba(56, 189, 248, 0.6)'
              : cursorVariant === 'nav'
              ? 'rgba(184, 150, 255, 0.75)'
              : 'rgba(255, 255, 255, 0)',
          backdropFilter:
            cursorVariant === 'nav' ? 'blur(0px)' : cursorVariant === 'hover' ? 'blur(2px)' : 'none',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="fixed top-0 left-0 border flex items-center justify-center shadow-[0_0_16px_rgba(112,66,255,0.3)]"
      >
        {cursorText && (
          <span className="text-[10px] font-bold tracking-wider uppercase text-white leading-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}

export default CustomCursor;
