"use client";

import dynamic from "next/dynamic";

const CosmicBackground3D = dynamic(
  () => import("./CosmicBackground3D"),
  {
    ssr: false,
    loading: () => null,
  }
);

export function CosmicBackground() {
  return <CosmicBackground3D />;
}

export default CosmicBackground;
