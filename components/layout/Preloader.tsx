"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if the preloader has already been seen in this session
    const hasSeen = sessionStorage.getItem("ryze_preloader_seen");
    if (hasSeen === "true") {
      setShouldRender(false);
      setIsComplete(true);
      return;
    }

    // Adjust playback rate
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.6;
    }

    // Set fallback timeout in case autoplay is blocked
    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, 6000);

    // Setup skip listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
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
          className="fixed inset-0 z-[100] bg-[#05030A] flex items-center justify-center overflow-hidden pointer-events-auto select-none"
          onClick={handleComplete}
        >
          <video
            ref={videoRef}
            src="/videos/preloader.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleComplete}
            className="w-full h-full object-cover scale-105"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleComplete();
            }}
            className="absolute bottom-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            ESC TO SKIP →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
