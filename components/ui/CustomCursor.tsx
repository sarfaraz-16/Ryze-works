'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'card'>('default');

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
      className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
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
          width: cursorVariant === 'card' ? 68 : cursorVariant === 'hover' ? 36 : 14,
          height: cursorVariant === 'card' ? 28 : cursorVariant === 'hover' ? 36 : 14,
          borderRadius: '9999px',
          backgroundColor:
            cursorVariant === 'card'
              ? 'rgba(112, 66, 255, 0.9)'
              : cursorVariant === 'hover'
              ? 'rgba(56, 189, 248, 0.25)'
              : 'rgba(255, 255, 255, 0.85)',
          borderColor:
            cursorVariant === 'card'
              ? 'rgba(255, 255, 255, 0.6)'
              : cursorVariant === 'hover'
              ? 'rgba(56, 189, 248, 0.6)'
              : 'transparent',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="fixed top-0 left-0 border flex items-center justify-center backdrop-blur-[2px] shadow-[0_0_16px_rgba(112,66,255,0.4)]"
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
