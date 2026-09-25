'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

const TOTAL_FRAMES = 99;

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentRenderFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const [loaded, setLoaded] = useState(false);

  // 1. Pure Canvas Draw function
  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex - 1];
    if (!img || !img.complete) return;

    // Cap devicePixelRatio to 2 for mobile performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Dynamic math for mobile vs desktop
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    let renderW = width;
    let renderH = height;
    let offsetX = 0;
    let offsetY = 0;

    const isMobile = width < 768;

    if (isMobile) {
      // Hybrid contain/cover logic to prevent helmet cut-off
      if (canvasRatio > imgRatio) {
        renderH = height;
        renderW = height * imgRatio;
        offsetX = (width - renderW) / 2;
        offsetY = 0;
      } else {
        renderW = width;
        renderH = width / imgRatio;
        offsetX = 0;
        offsetY = (height - renderH) / 2;
      }
    } else {
      // Original cover math
      if (canvasRatio > imgRatio) {
        renderW = width;
        renderH = width / imgRatio;
        offsetX = 0;
        offsetY = (height - renderH) / 2;
      } else {
        renderH = height;
        renderW = height * imgRatio;
        offsetX = (width - renderW) / 2;
        offsetY = 0;
      }
    }

    // Safe area top padding so mobile headers never overlap suit helmet
    const navClearance = isMobile ? 80 : 40;
    offsetY = Math.max(navClearance, offsetY + navClearance);

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();
  };

  // 2. Preload all 99 frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/hero-frames/ezgif-frame-${frameNum}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          // Render initial frame immediately
          renderFrame(1);
        }
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // 3. Bind scroll to frame rendering via Framer Motion useScroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // PHASE 1: Initial Hero Intro Block (Visible at 0%, Gone by 18%)
  const introOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.15], [0, -35]);
  const introPointerEvents = useTransform(scrollYProgress, (v) => v > 0.12 ? 'none' : 'auto');

  // PHASE 2: End-State Reveal & Persistent Docked CTAs (Appears 72% to 95%)
  const endOpacity = useTransform(scrollYProgress, [0.72, 0.85, 0.95], [0, 1, 0.9]);
  const endY = useTransform(scrollYProgress, [0.72, 0.85], [30, 0]);
  const endPointerEvents = useTransform(scrollYProgress, (v) => v > 0.7 ? 'auto' : 'none');

  // Map Scroll Progress to Target Frame (hold last frame from 88% to 100%)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const effectiveProgress = Math.min(1, progress / 0.88);
      targetFrameRef.current = 1 + effectiveProgress * (TOTAL_FRAMES - 1);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Smooth Lerping Render Loop
  useEffect(() => {
    if (shouldReduceMotion) {
      renderFrame(TOTAL_FRAMES);
      return;
    }

    let animationFrameId: number;
    let lastRenderedFrame = -1;

    const renderLoop = () => {
      // Smooth lerp towards target with clamped interpolation
      const lerpFactor = 0.09;
      currentRenderFrameRef.current += (targetFrameRef.current - currentRenderFrameRef.current) * lerpFactor;
      
      const frameToDraw = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentRenderFrameRef.current)));
      
      if (frameToDraw !== lastRenderedFrame) {
        renderFrame(frameToDraw);
        lastRenderedFrame = frameToDraw;
      }
      
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [shouldReduceMotion]);

  // Handle window resize to re-render sharp canvas
  useEffect(() => {
    const handleResize = () => renderFrame(Math.round(currentRenderFrameRef.current));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[450vh] bg-[#080417]">
      {/* Sticky viewport uses 100dvh for mobile dynamic address bars */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        {/* Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* PHASE 1: Initial Text Overlay */}
        <motion.div 
          style={{ opacity: introOpacity, y: introY, pointerEvents: introPointerEvents as any }}
          className="absolute inset-0 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center z-10 pt-20 sm:pt-16"
        >
          <div className="max-w-2xl pointer-events-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-violet-950/60 border border-violet-500/30 text-violet-300 mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              AI-NATIVE CREATIVE & TECHNOLOGY PARTNER
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight sm:leading-[1.08] mb-6">
              Strategy. Design.<br />
              Technology. Content.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400">
                Powered by AI.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              We help ambitious brands build, grow and scale with clarity, creativity and intelligent systems.
            </p>
          </div>
        </motion.div>

        {/* PHASE 2: End-State Reveal & Persistent Docked CTAs */}
        <motion.div
          style={{ opacity: endOpacity, y: endY, pointerEvents: endPointerEvents as any }}
          className="absolute bottom-8 sm:bottom-12 inset-x-0 mx-auto z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full"
        >
          {/* Main Punchline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6">
            Have a vision? Let&apos;s build it.
          </h2>

          {/* Action Buttons (Stacked on mobile, row on tablet+) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none mx-auto pointer-events-auto">
            <Link className="flex items-center justify-center w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all duration-300 gap-2" href="#work">
              EXPLORE OUR WORK <span>&rarr;</span>
            </Link>
            <Link className="flex items-center justify-center w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white transition-all duration-300 shadow-lg shadow-violet-900/50" href="#contact">
              START A PROJECT
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
