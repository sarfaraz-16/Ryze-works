'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion';

import Link from 'next/link';

const TOTAL_FRAMES = 300;

export function IntroSequence() {
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

    let img = imagesRef.current[frameIndex - 1];
    
    // Fallback Frame Drawing: search backwards for nearest loaded frame
    let searchIdx = frameIndex - 1;
    while ((!img || !img.complete) && searchIdx > 0) {
      searchIdx--;
      img = imagesRef.current[searchIdx];
    }
    
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
      // Mobile portrait: Hybrid contain-fit centered
      renderW = width * 1.5;
      renderH = renderW / imgRatio;
      offsetX = (width - renderW) / 2;
      offsetY = (height - renderH) / 2;
    } else if (canvasRatio > imgRatio) {
      // Desktop Wide Viewport: Cover fit
      renderW = width;
      renderH = width / imgRatio;
      offsetX = 0;
      offsetY = Math.max((height - renderH) / 2, 40);
    } else {
      // Desktop Standard:
      renderH = height;
      renderW = height * imgRatio;
      offsetX = (width - renderW) / 2;
      offsetY = 40;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();

    if (frameIndex === 1) {
      // Force canvas context flush to eliminate first-frame flash
      ctx.getImageData(0, 0, 1, 1);
    }
  };

  // 2. Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/intro-frames/ezgif-frame-${frameNum}.png`;
      images.push(img);
      
      // Hardware pre-decode to eliminate scrub stutter
      img.decode().catch(() => {}).then(() => {
        loadedCount++;
        window.dispatchEvent(
          new CustomEvent('ryze:frame-progress', {
            detail: { loaded: loadedCount, total: TOTAL_FRAMES }
          })
        );
        if (loadedCount === 1) {
          renderFrame(1);
        }
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
          window.dispatchEvent(new CustomEvent('ryze:frames-ready'));
        }
      });
    }
    
    imagesRef.current = images;
  }, []);

  // 3. Bind scroll to frame rendering
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Act 1: Intro Headline Fade - starts immediately at 0 and vanishes by 0.03
  const introTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.03],
    [1, 0],
    { clamp: true }
  );

  const introTextY = useTransform(
    scrollYProgress,
    [0, 0.04],
    [0, -30],
    { clamp: true }
  );

  // Hard display switch to completely remove from rendering after 0.035
  const introTextDisplay = useTransform(
    scrollYProgress,
    (v) => (v > 0.035 ? 'none' : 'flex')
  );

  const introPointerEvents = useTransform(
    scrollYProgress,
    (pos) => pos > 0.04 ? 'none' : 'auto'
  );

  // Act 3: End Card CTA
  const ctaOpacity = useTransform(
    scrollYProgress,
    [0.88, 0.94],
    [0, 1]
  );

  const ctaY = useTransform(
    scrollYProgress,
    [0.88, 0.94],
    [25, 0]
  );

  const ctaDisplay = useTransform(
    scrollYProgress,
    (v) => (v >= 0.85 ? 'flex' : 'none')
  );

  const ctaPointerEvents = useTransform(
    scrollYProgress,
    (v) => (v >= 0.88 ? 'auto' : 'none')
  );

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

  useEffect(() => {
    const handleResize = () => renderFrame(Math.round(currentRenderFrameRef.current));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[750vh] bg-[#080417]">
      <div className="sticky top-0 h-screen w-full z-10 overflow-hidden flex items-center justify-center bg-[#080417]">
        {/* Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* Text Choreography */}
        <motion.div
          style={{
            opacity: introTextOpacity,
            y: introTextY,
            display: introTextDisplay,
            pointerEvents: introPointerEvents as any,
          }}
          className="absolute z-10 w-full max-w-7xl mx-auto px-4 md:px-6 md:inset-0 md:flex md:flex-col md:justify-center max-md:top-20 max-md:inset-x-0 max-md:flex max-md:flex-col max-md:items-center max-md:text-center"
        >
          <div className="max-w-3xl md:w-1/2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-widest bg-violet-950/60 border border-violet-500/30 text-violet-300 mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span>{"// RYZE OS // GENESIS"}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight sm:leading-[1.1] mb-6">
              MAKING THE FUTURE OF TECHNOLOGY BEAUTIFUL.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl leading-relaxed mx-auto md:mx-0">
              Where brand architecture meets autonomous intelligence. Scroll to initialize.
            </p>
          </div>
        </motion.div>

        {/* PHASE 3: End-State Reveal & Persistent Docked CTAs */}
        <motion.div
          style={{
            opacity: ctaOpacity,
            y: ctaY,
            display: ctaDisplay,
            pointerEvents: ctaPointerEvents as any,
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

export default IntroSequence;
