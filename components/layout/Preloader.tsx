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
  const counterRef = useRef<HTMLSpanElement>(null);

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
    let holdTimer = 0;
    let holding = false;
    
    let currentDisplay = 0;
    let lastTickTime = performance.now();

    const tick = (now: number) => {
      const dt = now - lastTickTime;
      
      const realProgress = (domReady ? 10 : 0) + (framesProgress * 90);
      
      // Calculate target:
      // If frames are not finished, clamp max possible target to 98
      const targetPercent = framesFinished && domReady 
        ? 100 
        : Math.min(Math.floor(realProgress), 98);

      // Smoothly advance currentDisplay toward targetPercent
      // Ensure at least 15-25ms per percentage increment so every number renders cleanly
      if (currentDisplay < targetPercent) {
        // Dynamic step: catch up smoothly without sudden leaps
        const diff = targetPercent - currentDisplay;
        const step = diff > 20 ? 2 : 1;
        const interval = diff > 10 ? 18 : 28; // ms per step

        if (dt >= interval) {
          currentDisplay += step;
          lastTickTime = now;
        }
      }

      if (counterRef.current) {
        counterRef.current.textContent = String(Math.min(100, Math.floor(currentDisplay))).padStart(3, "0");
      }

      // Trigger exit ONLY when currentDisplay reaches 100 and assets are genuinely ready
      if (currentDisplay >= 100 && framesFinished && domReady && !holding) {
        holding = true;
        holdTimer = window.setTimeout(() => {
          startExit();
        }, 200); // 200ms hold at 100%
        return;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(holdTimer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("ryze:frame-progress", onFrameProgress);
      window.removeEventListener("ryze:frames-ready", onFramesReady);
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
      {/* ── TOP HALF: wordmark rises out of the horizon ── */}
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{ ...panelBg, height: "calc(50% + 0.5px)" }}
        initial={{ y: "0%", opacity: 1 }}
        animate={panelExit(-1)}
        transition={panelTransition}
      >
        <div className="absolute inset-x-0 bottom-0 flex justify-center px-6" style={{ paddingBottom: "0.5px" }}>
          <div
            aria-hidden="true"
            className="overflow-hidden leading-none"
            style={{
              paddingTop: "0.12em",
              paddingBottom: "0.06em",
              fontFamily: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 7.4vw, 6rem)",
              letterSpacing: "0.2em",
              marginRight: "-0.2em", // cancels trailing tracking so the word is optically centred
              color: "var(--foreground, #f4f4f5)",
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

      {/* ── BOTTOM HALF: honest counter + skip ── */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{ ...panelBg, height: "calc(50% + 0.5px)" }}
        initial={{ y: "0%", opacity: 1 }}
        animate={panelExit(1)}
        transition={panelTransition}
      >
        <div
          className="flex items-start justify-between px-6 pt-5 text-[11px] md:px-10"
          style={{ fontFamily: "var(--font-geist-mono, ui-monospace, monospace)", letterSpacing: "0.22em" }}
        >
          {reduced ? (
            <span />
          ) : (
            <span aria-hidden="true" className="tabular-nums" style={{ color: "var(--brand-light, #B896FF)" }}>
              <span ref={counterRef}>000</span>
              <span style={{ opacity: 0.45 }}>%</span>
            </span>
          )}
          <button
            type="button"
            onClick={startExit}
            className="uppercase text-white/50 transition-colors hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B896FF]"
          >
            Skip
          </button>
        </div>
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
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 z-20 h-px"
        style={{
          top: "calc(50% - 0.5px)",
          transformOrigin: "50% 50%",
          background:
            "linear-gradient(90deg, transparent 0%, var(--brand-primary, #7042FF) 18%, var(--brand-light, #B896FF) 50%, #38bdf8 82%, transparent 100%)",
          boxShadow: "0 0 18px 1px rgba(112,66,255,0.6)",
        }}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={exiting ? { scaleX: 1, opacity: 0 } : { scaleX: 1, opacity: 1 }}
        transition={
          exiting
            ? { duration: reduced ? 0.3 : 0.5, delay: reduced ? 0 : 0.35 }
            : { duration: reduced ? 0 : 1, ease: EASE }
        }
      />
    </div>
  );
}