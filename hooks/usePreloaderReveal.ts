"use client";

import { useSyncExternalStore } from "react";

/**
 * Returns true once the preloader has started opening (or was skipped).
 * Use it to start the hero's entrance at the exact moment the horizon splits,
 * so the preloader and hero read as one continuous motion.
 *
 *   const revealed = usePreloaderReveal();
 *   <motion.div initial="hidden" animate={revealed ? "show" : "hidden"} ... />
 */
function subscribe(cb: () => void) {
  window.addEventListener("ryze:preloader-reveal", cb);
  return () => window.removeEventListener("ryze:preloader-reveal", cb);
}

export function usePreloaderReveal(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.preloader !== "intro",
    () => false
  );
}
