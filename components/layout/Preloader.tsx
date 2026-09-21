"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [phase, setPhase] = useState<"idle" | "warp">("idle");

  useEffect(() => {
    // Session check for production (bypass in dev mode)
    if (process.env.NODE_ENV === "production") {
      if (sessionStorage.getItem("ryze_preloader_seen") === "true") {
        setIsComplete(true);
        return;
      }
    }

    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05030a);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    // Responsive camera Z distance (pull back on mobile)
    const updateCameraPos = () => {
      camera.position.z = window.innerWidth < 640 ? 8.5 : 6.2;
      camera.position.y = 0.2;
    };
    updateCameraPos();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Lighting (Crucial for sphere visibility)
    const ambientLight = new THREE.AmbientLight(0x1a102f, 1.8);
    scene.add(ambientLight);

    const violetLight = new THREE.PointLight(0xa855f7, 8, 25);
    violetLight.position.set(4, 3, 3);
    scene.add(violetLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 6, 25);
    cyanLight.position.set(-4, -2.5, 3);
    scene.add(cyanLight);

    const topRimLight = new THREE.DirectionalLight(0xffffff, 1.5);
    topRimLight.position.set(0, 5, 2);
    scene.add(topRimLight);

    // 3. Central Sphere (Glossy Obsidian)
    const sphereGeo = new THREE.SphereGeometry(1.05, 64, 64);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x07040d,
      roughness: 0.12,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // 4. Orbital Concentric Rings
    const ringGroup = new THREE.Group();

    // Main Outer Ring
    const outerRingGeo = new THREE.TorusGeometry(1.75, 0.04, 24, 120);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x9333ea,
      emissive: 0x6b21a8,
      emissiveIntensity: 0.9,
      roughness: 0.25,
      metalness: 0.8,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, ringMat);
    ringGroup.add(outerRing);

    // Secondary Inner Ring
    const innerRingGeo = new THREE.TorusGeometry(1.5, 0.025, 20, 100);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.9,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    ringGroup.add(innerRing);

    // Tilt the rings naturally
    ringGroup.rotation.x = Math.PI * 0.38;
    ringGroup.rotation.y = Math.PI * 0.08;
    scene.add(ringGroup);

    // 5. Cosmic Stardust Field
    const particleCount = 700;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: number[] = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 24;
      particlePositions[i + 1] = (Math.random() - 0.5) * 24;
      particlePositions[i + 2] = (Math.random() - 0.5) * 30;
      particleVelocities.push(0.015 + Math.random() * 0.03);
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xddd6fe,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Animation Timeline (requestAnimationFrame)
    let animationFrameId: number;
    const startTime = performance.now();
    let isWarping = false;

    const animate = (time: number) => {
      const elapsed = (time - startTime) / 1000;

      // Ambient idle rotations
      sphere.rotation.y += 0.005;
      ringGroup.rotation.z += 0.008;

      // Particle update
      const positions = particleGeo.attributes.position.array as Float32Array;
      const speedMultiplier = isWarping ? 12 : 1;

      for (let i = 0; i < particleCount; i++) {
        const zIndex = i * 3 + 2;
        positions[zIndex] += particleVelocities[i] * speedMultiplier;
        if (positions[zIndex] > 8) {
          positions[zIndex] = -22;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Warp trigger at 1.4s
      if (elapsed > 1.4 && !isWarping) {
        isWarping = true;
        setPhase("warp");
      }

      // Smooth camera fly-through during warp
      if (isWarping && elapsed < 2.5) {
        const warpProgress = (elapsed - 1.4) / 1.1;
        const targetZ = window.innerWidth < 640 ? -2.5 : -1.8;
        camera.position.z = THREE.MathUtils.lerp(
          camera.position.z,
          targetZ,
          0.065
        );
        particleMat.size = THREE.MathUtils.lerp(particleMat.size, 0.09, 0.05);
      }

      // Finish at 2.6s
      if (elapsed >= 2.6) {
        handleDismiss();
        return;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Handle Resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      updateCameraPos();
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const handleDismiss = () => {
      sessionStorage.setItem("ryze_preloader_seen", "true");
      setIsComplete(true);
    };

    // ESC to Skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      outerRingGeo.dispose();
      ringMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  const handleSkip = () => {
    sessionStorage.setItem("ryze_preloader_seen", "true");
    setIsComplete(true);
  };

  if (isComplete) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.65, ease: "easeOut" } }}
          className="fixed inset-0 w-screen h-[100dvh] z-[100] bg-[#05030A] flex items-center justify-center overflow-hidden select-none pointer-events-auto"
        >
          {/* Three.js Canvas Container */}
          <div ref={containerRef} className="absolute inset-0 w-full h-full" />

          {/* Typography Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: phase === "warp" ? 0 : 1,
              scale: phase === "warp" ? 1.25 : 1,
              filter: phase === "warp" ? "blur(10px)" : "blur(0px)",
              y: 0,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4"
          >
            <div className="mt-48 sm:mt-56 text-center">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-[0.24em] font-sans drop-shadow-[0_0_28px_rgba(168,85,247,0.7)]">
                RYZE WORKS
              </h1>
              <div className="inline-flex items-center gap-2 mt-3 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-mono text-violet-300 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                <span>CREATIVE ENGINEERING</span>
              </div>
            </div>
          </motion.div>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute bottom-[calc(1.2rem+env(safe-area-inset-bottom))] sm:bottom-6 right-5 sm:right-6 z-30 px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-zinc-400 hover:text-white transition-all cursor-pointer active:scale-95"
          >
            ESC TO SKIP →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
