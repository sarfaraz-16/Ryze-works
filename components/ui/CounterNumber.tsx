'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, motion, useReducedMotion } from 'framer-motion';

interface CounterNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CounterNumber({
  value,
  duration = 0.7,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: CounterNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();

  const count = useMotionValue(shouldReduceMotion ? value : 0);
  const rounded = useTransform(count, (latest) => {
    return `${prefix}${latest.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    // Use framer-motion dynamic animate on the motion value
    const controls = count.set(0);
    const animation = import('framer-motion').then(({ animate }) => {
      return animate(count, value, {
        duration,
        ease: [0.16, 1, 0.3, 1], // snappy cubic-bezier ease out
      });
    });

    return () => {
      animation.then((anim) => anim?.stop());
    };
  }, [isInView, value, duration, shouldReduceMotion, count]);

  if (shouldReduceMotion) {
    return <span className={className}>{prefix}{value.toFixed(decimals)}{suffix}</span>;
  }

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
    </span>
  );
}

export default CounterNumber;
