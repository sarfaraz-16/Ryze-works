"use client";

/**
 * RYZE WORKS — "Horizon" preloader
 *
 * Concept: RYZE = rise. A hairline horizon draws across the screen, the wordmark
 * rises out of it letter by letter, then the horizon splits open and the hero
 * rises into view. One idea, one gesture, ~3s total. No WebGL: the preloader no
 * longer competes with HeroOrb3D / CosmicBackground3D for GPU contexts.
 *
 * Drop-in replacement for components/layout/Preloader.tsx
 * Requires: the <head> gate script + 2 CSS rules from INTEGRATION.md
 */

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

const WORDMARK = "RYZE WORKS";
const STORAGE_KEY = "ryze_preloader_seen";
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]; // brand easing

const EXIT_S = 0.95; // split duration

type Phase = "intro" | "exit" | "done";

/* ---- external-store helpers (hydration-safe, no setState-in-effect) ---- */
const noopSubscribe = () => () => { };

function useReducedMotionPref(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

/** true when the <head> gate script marked this session as "already seen" */
function useSkipped(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => document.documentElement.dataset.preloader === "skip",
    () => false
  );
}

export default function Preloader() {
  const reduced = useReducedMotionPref();
  const skipped = useSkipped();
  const [phase, setPhase] = useState<Phase>("intro");
  const phaseRef = useRef<Phase>("intro");
  const telemetryRef = useRef<HTMLSpanElement>(null);
  const horizonLineRef = useRef<HTMLDivElement>(null);
  const quantumCoreRef = useRef<HTMLDivElement>(null);

  /** Start the exit: unlock scroll, tell the hero to begin, open the horizon. */
  const startExit = useCallback(() => {
    if (phaseRef.current !== "intro") return;
    phaseRef.current = "exit";
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* private mode / blocked storage — fine */
    }
    document.documentElement.dataset.preloader = "reveal";
    window.dispatchEvent(new Event("ryze:preloader-reveal"));
    setPhase("exit");
  }, []);

  /* Intro: readiness gate + counter (or a short static hold for reduced motion) */
  useEffect(() => {
    if (skipped) return;
    document.documentElement.dataset.preloader = "intro";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") startExit();
    };
    window.addEventListener("keydown", onKey);

    if (reduced) {
      const id = window.setTimeout(startExit, 700);
      return () => {
        window.clearTimeout(id);
        window.removeEventListener("keydown", onKey);
      };
    }

    // Tracking Variables
    let domReady = false;
    let framesFinished = false;
    let framesProgress = 0; // 0 to 1

    const markDomReady = () => {
      domReady = true;
    };

    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((res) => window.addEventListener("load", () => res(), { once: true }));
    Promise.all([loaded, document.fonts?.ready ?? Promise.resolve()]).then(markDomReady, markDomReady);

    const onFrameProgress = (e: Event) => {
      const ce = e as CustomEvent<{loaded: number, total: number}>;
      if (ce.detail) {
        framesProgress = ce.detail.loaded / ce.detail.total;
      }
    };
    
    const onFramesReady = () => {
      framesFinished = true;
      framesProgress = 1;
    };

    window.addEventListener("ryze:frame-progress", onFrameProgress);
    window.addEventListener("ryze:frames-ready", onFramesReady);

    let raf = 0;
    let holding = false;
    let holdTimer = 0;
    let currentDisplay = 0;
    let lastTickTime = performance.now();

    const tick = (now: number) => {
      const dt = now - lastTickTime;
      const realProgress = (domReady ? 10 : 0) + (framesProgress * 90);
      
      // Strict Gate: clamp to 98% until completely finished
      const targetPercent = (framesFinished && domReady)
        ? 100 
        : Math.min(Math.floor(realProgress), 98);

      if (currentDisplay < targetPercent) {
        const diff = targetPercent - currentDisplay;
        const step = diff > 20 ? 2 : 1;
        const interval = diff > 10 ? 16 : 28;

        if (dt >= interval) {
          currentDisplay += step;
          lastTickTime = now;
        }
      }

      const phase = Math.floor(now / 300) % 4;
      const phases = [
        "// SYSTEM INITIALIZATION :: CALIBRATING OPTICAL SENSORS",
        "// NEURAL TOPOLOGY :: CONNECTING AUTONOMOUS MESH",
        "// VECTOR CAUSTICS :: HARMONIZING ENGINE FREQUENCIES",
        "// RYZE OS ONLINE :: PREPARE FOR GENESIS"
      ];
      
      if (telemetryRef.current) {
         if (framesFinished && domReady && currentDisplay >= 100) {
           telemetryRef.current.textContent = `// RYZE OS ONLINE :: READY [100%]`;
         } else {
           telemetryRef.current.textContent = `${phases[phase]} [${String(currentDisplay).padStart(2, '0')}%]`;
         }
      }

      const visualProgress = currentDisplay / 100;
      
      if (horizonLineRef.current) {
         horizonLineRef.current.style.transform = `scaleX(${visualProgress})`;
         horizonLineRef.current.style.opacity = String(0.5 + visualProgress * 0.5);
      }
      if (quantumCoreRef.current) {
         const coreScale = 0.5 + visualProgress * 0.5;
         quantumCoreRef.current.style.transform = `scale(${coreScale})`;
         quantumCoreRef.current.style.opacity = String(0.2 + visualProgress * 0.8);
      }

      if (currentDisplay >= 100 && framesFinished && domReady && !holding) {
        holding = true;
        if (quantumCoreRef.current) {
           quantumCoreRef.current.classList.add("animate-pulse-exit-core");
        }
        holdTimer = window.setTimeout(startExit, 600); // 600ms hyper-drive detonation
      }

      if (phaseRef.current === "intro") raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(holdTimer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("ryze:frames-ready", onFramesReady);
      window.removeEventListener("ryze:frame-progress", onFrameProgress);
    };
  }, [skipped, reduced, startExit]);

  /* Exit: unmount once the split has finished */
  useEffect(() => {
    if (phase !== "exit") return;
    const id = window.setTimeout(
      () => {
        document.documentElement.dataset.preloader = "done";
        phaseRef.current = "done";
        setPhase("done");
      },
      (reduced ? 0.4 : EXIT_S + 0.05) * 1000
    );
    return () => window.clearTimeout(id);
  }, [phase, reduced]);

  if (skipped || phase === "done") return null;

  const exiting = phase === "exit";
  const panelExit = (dir: 1 | -1) =>
    exiting ? (reduced ? { opacity: 0 } : { y: `${dir * 100}%` }) : { y: "0%", opacity: 1 };
  const panelTransition = { duration: reduced ? 0.35 : EXIT_S, ease: EASE };
  const panelBg = { background: "var(--brand-void, #080417)" };

  return (
    <div
      id="ryze-preloader"
      role="status"
      aria-live="polite"
      aria-label="Loading Ryze Works"
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ pointerEvents: exiting ? "none" : "auto" }}
    >
      <style>{`
        @keyframes preloader-shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-preloader-shimmer {
          background: linear-gradient(90deg, var(--foreground, #f4f4f5) 0%, var(--foreground, #f4f4f5) 40%, #B896FF 50%, #38bdf8 60%, var(--foreground, #f4f4f5) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: preloader-shimmer 4s linear infinite;
        }
        @keyframes pulse-exit-core {
          0% { transform: scale(1); opacity: 1; background-color: transparent; border-color: rgba(139,92,246,0.4); box-shadow: none; }
          40% { transform: scale(1.5); opacity: 1; background-color: rgba(34,211,238,1); border-color: rgba(34,211,238,1); box-shadow: 0 0 40px 10px rgba(34,211,238,0.8); }
          100% { transform: scale(4); opacity: 0; }
        }
        .animate-pulse-exit-core {
          animation: pulse-exit-core 0.4s ease-out forwards;
        }
      `}</style>

      {/* ── TOP HALF: wordmark rises out of the horizon ── */}
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{ ...panelBg, height: "calc(50% + 0.5px)" }}
        initial={{ y: "0%", opacity: 1 }}
        animate={panelExit(-1)}
        transition={panelTransition}
      >
        <div className="absolute inset-x-0 bottom-0 flex justify-center px-6 pb-[60px]" style={{ paddingBottom: "60px" }}>
          <div
            aria-hidden="true"
            className="overflow-hidden leading-none animate-preloader-shimmer"
            style={{
              paddingTop: "0.12em",
              paddingBottom: "0.06em",
              fontFamily: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 7.4vw, 6rem)",
              letterSpacing: "0.2em",
              marginRight: "-0.2em", // cancels trailing tracking so the word is optically centred
            }}
          >
            <div className="flex">
              {[...WORDMARK].map((ch, i) =>
                ch === " " ? (
                  <span key={i} style={{ width: "0.5em" }} />
                ) : (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: "130%" }}
                    animate={{ y: "0%" }}
                    transition={reduced ? { duration: 0 } : { duration: 0.85, ease: EASE, delay: 0.3 + i * 0.05 }}
                  >
                    {ch}
                  </motion.span>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── BOTTOM HALF: Telemetry Ticker + skip ── */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{ ...panelBg, height: "calc(50% + 0.5px)" }}
        initial={{ y: "0%", opacity: 1 }}
        animate={panelExit(1)}
        transition={panelTransition}
      >
        <div
          className="flex flex-col items-center justify-start pt-[60px] text-[9px] sm:text-[11px] w-full px-6"
          style={{ fontFamily: "var(--font-geist-mono, ui-monospace, monospace)", letterSpacing: "0.22em" }}
        >
          {reduced ? (
            <span />
          ) : (
            <span aria-hidden="true" className="text-[#B896FF]/80 text-center uppercase" ref={telemetryRef}>
              {"// SYSTEM INITIALIZATION :: CALIBRATING OPTICAL SENSORS"}
            </span>
          )}
        </div>
        
        <button
          type="button"
          onClick={startExit}
          className="absolute bottom-5 right-6 uppercase text-white/50 transition-colors hover:text-white text-[11px] focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B896FF]"
          style={{ fontFamily: "var(--font-geist-mono, ui-monospace, monospace)", letterSpacing: "0.22em" }}
        >
          Skip
        </button>
      </motion.div>

      {/* ── THE HORIZON ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 z-10"
        style={{
          top: "calc(50% - 30vh)",
          height: "60vh",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(112,66,255,0.26), transparent 70%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: exiting ? 0.6 : 1.4, delay: exiting ? 0 : 0.2 }}
      />
      <div className="absolute inset-x-0 z-20 flex justify-center items-center pointer-events-none" style={{ top: "calc(50% - 0.5px)" }}>
        {/* The stretching line */}
        <div
          ref={horizonLineRef}
          className={`absolute h-px w-full ${exiting ? "transition-opacity duration-400 ease-out opacity-0" : ""}`}
          style={{
            transformOrigin: "50% 50%",
            background: "linear-gradient(90deg, transparent 0%, var(--brand-primary, #7042FF) 18%, var(--brand-light, #B896FF) 50%, #38bdf8 82%, transparent 100%)",
            boxShadow: "0 0 18px 1px rgba(112,66,255,0.6)",
            transform: "scaleX(0)",
            opacity: 0,
          }}
        />
        {/* The Quantum Singularity Core */}
        <div
          ref={quantumCoreRef}
          className="absolute flex items-center justify-center w-32 h-32 rounded-full border border-violet-500/50"
          style={{
             transform: "scale(0)",
             opacity: 0,
             transition: exiting ? "opacity 0.4s ease-out" : "none"
          }}
        >
          {/* Counter-rotating cyan dashed ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/60 animate-[spin_4s_linear_infinite_reverse]" />
          {/* Intensely glowing neon core */}
          <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-400 blur-sm animate-pulse" />
        </div>
      </div>
    </div>
  );
}