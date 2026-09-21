"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export interface UseTilt3DOptions {
  /** Maximum rotation angle in degrees (default: 12) */
  maxTilt?: number;
  /** Scale factor on hover (default: 1.02) */
  scale?: number;
  /** 3D Perspective in px (default: 1000) */
  perspective?: number;
  /** Spring easing curve for pointerleave return (default: "cubic-bezier(0.16, 1, 0.3, 1)") */
  easing?: string;
  /** Return animation duration in ms (default: 400) */
  speed?: number;
}

export function useTilt3D(options: UseTilt3DOptions = {}) {
  const {
    maxTilt = 12,
    scale = 1.02,
    perspective = 1000,
    easing = "cubic-bezier(0.16, 1, 0.3, 1)",
    speed = 400,
  } = options;

  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  // 3. Mobile & Accessibility Safety:
  // Disable tilt tracking on touch devices and respect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(hover: none)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      queueMicrotask(() => setIsEnabled(false));
    }
  }, []);

  const onPointerEnter = useCallback(() => {
    if (!isEnabled) return;
    setIsHovered(true);
  }, [isEnabled]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!isEnabled) return;

      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      // Normalized relative cursor position across the card: -0.5 to 0.5
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        // Calculate rotation angles: rotateX = -y * 12deg, rotateY = x * 12deg
        setRotX(-y * maxTilt);
        setRotY(x * maxTilt);
        // Dynamic glare position (0% to 100%)
        setGlareX((x + 0.5) * 100);
        setGlareY((y + 0.5) * 100);
        setIsHovered(true);
      });
    },
    [isEnabled, maxTilt]
  );

  const onPointerLeave = useCallback(() => {
    if (!isEnabled) return;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    // Smoothly transition back to 0deg with spring easing on leave
    setRotX(0);
    setRotY(0);
    setIsHovered(false);
  }, [isEnabled]);

  // Card Body 3D dynamic inline styles
  const cardStyle: React.CSSProperties = isEnabled
    ? {
        transformStyle: "preserve-3d",
        transform: `perspective(${perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(${isHovered ? scale : 1}, ${isHovered ? scale : 1}, ${isHovered ? scale : 1})`,
        transition: isHovered
          ? "transform 0.08s ease-out, border-color 0.3s ease, box-shadow 0.3s ease"
          : `transform ${speed}ms ${easing}, border-color 0.3s ease, box-shadow 0.3s ease`,
        willChange: "transform",
      }
    : {};

  // Dynamic Glare / Sheen Overlay inline styles
  const glareStyle: React.CSSProperties = isEnabled
    ? {
        background: `radial-gradient(circle at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(255, 255, 255, 0.08), transparent 60%)`,
        opacity: isHovered ? 1 : 0,
        transition: isHovered ? "opacity 0.2s ease" : `opacity ${speed}ms ease`,
        pointerEvents: "none",
      }
    : { display: "none" };

  return {
    cardRef,
    cardStyle,
    glareStyle,
    isHovered,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
    isEnabled,
  };
}
