"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [canInteract, setCanInteract] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if the preloader has already been seen in this session
    const hasSeen = sessionStorage.getItem("ryze_preloader_seen");
    if (hasSeen === "true" && process.env.NODE_ENV !== "development") {
      setShouldRender(false);
      setIsComplete(true);
      return;
    }

    // Ignore clicks during the first 1.2 seconds
    const interactionTimer = setTimeout(() => setCanInteract(true), 1200);

    // Set fallback timeout in case autoplay is blocked
    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, 4500);

    // Setup skip listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(interactionTimer);
      clearTimeout(fallbackTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleComplete = () => {
    setIsComplete(true);
    sessionStorage.setItem("ryze_preloader_seen", "true");
  };

  if (!shouldRender) return null;

  return (
    <AnimatePresence onExitComplete={() => setShouldRender(false)}>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-screen h-[100dvh] z-[100] bg-[#05030A] flex items-center justify-center overflow-hidden select-none pointer-events-auto"
        >
          <video
            ref={videoRef}
            src="/videos/preloader.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            webkit-playsinline="true"
            x5-playsinline="true"
            onError={() => setIsComplete(true)}
            onCanPlay={(e) => {
              e.currentTarget.playbackRate = 1.6;
              e.currentTarget.play().catch(() => setIsComplete(true));
            }}
            onEnded={(e) => {
              if (e.currentTarget.currentTime > 1) {
                handleComplete();
              }
            }}
            className="w-full h-full object-cover object-center scale-102 sm:scale-105 pointer-events-none"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (canInteract) handleComplete();
            }}
            className="absolute bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-6 right-5 sm:right-6 z-20 px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-zinc-400 hover:text-white transition-all cursor-pointer active:scale-95"
          >
            ESC TO SKIP →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
