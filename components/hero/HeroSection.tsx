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

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let renderW: number;
    let renderH: number;
    let offsetX: number;
    let offsetY: number;

    const isMobilePortrait = width < 768 && height > width;

    if (isMobilePortrait) {
      // Mobile Portrait Hybrid
      renderW = width * 1.25;
      renderH = renderW / imgRatio;
      offsetX = (width - renderW) / 2;
      offsetY = (height - renderH) / 2 + 30; // centered with clearance
    } else if (canvasRatio > imgRatio) {
      // Desktop Wide Viewport:
      renderW = width;
      renderH = width / imgRatio;
      offsetX = 0;
      // Push the image DOWN by adding safe top clearance (e.g. 40px to 60px)
      // so the helmet and visor sit cleanly below the fixed header
      const calculatedOffsetY = (height - renderH) / 2;
      offsetY = Math.max(calculatedOffsetY, 40); 
    } else {
      // Desktop Standard:
      renderH = height;
      renderW = height * imgRatio;
      offsetX = (width - renderW) / 2;
      // Ensure the top never clips behind navbar (min 40px clearance)
      offsetY = 40;
    }

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

  // PHASE 1: Scroll Reveal Phase
  const heroTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.14, 0.35, 0.45],
    [0, 0, 1, 1, 0]
  );

  const heroTextY = useTransform(
    scrollYProgress,
    [0.10, 0.22, 0.38, 0.48],
    [30, 0, 0, -25]
  );

  const heroTextPointerEvents = useTransform(
    scrollYProgress,
    (v) => (v >= 0.15 && v <= 0.45 ? 'auto' : 'none')
  );

  // PHASE 2: End-State Reveal & Persistent Docked CTAs
  const endCardOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.82, 0.98],
    [0, 1, 1]
  );

  const endCardY = useTransform(
    scrollYProgress,
    [0.72, 0.82],
    [25, 0]
  );

  const endCardPointerEvents = useTransform(
    scrollYProgress,
    (v) => (v >= 0.72 ? 'auto' : 'none')
  );

  // Map Scroll Progress to Target Frame (hold last frame from 85% to 100%)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const effectiveProgress = Math.min(1, progress / 0.85);
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
        {/* Mobile-Only Ambient Cosmic Atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden md:hidden z-0">
          {/* Top Nebula Bloom */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-violet-600/20 blur-[100px] animate-pulse" />
          
          {/* Bottom-Right Cyan Dust Bloom */}
          <div className="absolute bottom-8 right-[-10%] w-72 h-72 rounded-full bg-cyan-500/15 blur-[90px]" />
          
          {/* Bottom-Left Violet Deep Glow */}
          <div className="absolute bottom-[-5%] left-[-10%] w-72 h-72 rounded-full bg-indigo-700/20 blur-[100px]" />

          {/* Floating Stars / Space Particles */}
          <div className="absolute inset-0 opacity-70 bg-[radial-gradient(1px_1px_at_20px_30px,#ffffff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_120px_80px,#a78bfa,rgba(0,0,0,0)),radial-gradient(1px_1px_at_220px_160px,#38bdf8,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_320px_240px,#ffffff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_80px_320px,#c084fc,rgba(0,0,0,0)),radial-gradient(1px_1px_at_260px_420px,#38bdf8,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_180px_520px,#ffffff,rgba(0,0,0,0))] bg-[size:400px_600px]" />
        </div>

        {/* Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
        {/* Mobile-only soft edge vignette to eliminate letterbox bars */}
        <div className="absolute inset-0 pointer-events-none md:hidden bg-gradient-to-b from-[#080417] via-transparent to-[#080417] opacity-90" />

        {/* PHASE 1: Initial Text Overlay */}
        <motion.div
          style={{
            opacity: heroTextOpacity,
            y: heroTextY,
            pointerEvents: heroTextPointerEvents as any,
          }}
          className="absolute z-10 w-full max-w-7xl mx-auto px-4 md:px-6 md:inset-0 md:flex md:flex-col md:justify-center max-md:top-20 max-md:inset-x-0 max-md:flex max-md:flex-col max-md:items-center max-md:text-center"
        >
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-widest bg-violet-950/60 border border-violet-500/30 text-violet-300 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span>AI-NATIVE CREATIVE & TECHNOLOGY PARTNER</span>
            </div>

            {/* Headline - Scaled for upper mobile void */}
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-snug mb-2">
              Strategy. Design.<br className="hidden max-md:inline" /> Technology. Content.<br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                Powered by AI.
              </span>
            </h1>

            {/* Subtitle - Compact on mobile */}
            <p className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-lg mx-auto md:mx-0">
              We help ambitious brands build, grow and scale with clarity, creativity and intelligent systems.
            </p>
          </div>
        </motion.div>

        {/* PHASE 2: End-State Reveal & Persistent Docked CTAs */}
        <motion.div
          style={{
            opacity: endCardOpacity,
            y: endCardY,
            pointerEvents: endCardPointerEvents as any,
          }}
          className="absolute bottom-6 md:bottom-12 inset-x-0 mx-auto z-20 flex flex-col items-center justify-center text-center px-4"
        >
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Have a vision? Let&apos;s build it.
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-none justify-center">
            <Link
              href="#work"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              EXPLORE OUR WORK <span>&rarr;</span>
            </Link>
            <Link
              href="#contact"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white transition-all shadow-lg shadow-violet-900/40"
            >
              START A PROJECT
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
