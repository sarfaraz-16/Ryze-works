"use client";

import dynamic from "next/dynamic";
import { usePreloaderReveal } from "@/hooks/usePreloaderReveal";

const CosmicBackground3D = dynamic(
  () => import("./CosmicBackground3D"),
  {
    ssr: false,
    loading: () => null,
  }
);

export function CosmicBackground() {
  const revealed = usePreloaderReveal();
  return revealed ? <CosmicBackground3D /> : null;
}

export default CosmicBackground;
