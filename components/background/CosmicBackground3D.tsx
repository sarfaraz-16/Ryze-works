"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface CosmicBackground3DProps {
  className?: string;
}

export default function CosmicBackground3D({
  className = "",
}: CosmicBackground3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      antialias: false, // Particles do not require heavy MSAA
      alpha: true,
      powerPreference: "low-power",
    });
    // Cap pixel ratio to 1.5 max for exceptional battery and GPU efficiency
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    // 2. Generate 200 Stardust Particles Across a Deep 3D Volume
    const particleCount = 200;
    const basePositions = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount * 3);
    const frequencies = new Float32Array(particleCount * 3);

    // Curated cosmic obsidian hues: soft violet, icy lavender, faint sapphire
    const colorViolet = new THREE.Color("#C084FC");
    const colorLavender = new THREE.Color("#E9D5FF");
    const colorSapphire = new THREE.Color("#38BDF8");
    const colorPalette = [colorViolet, colorLavender, colorSapphire];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spread across wide viewport volume
      const x = (Math.random() - 0.5) * 36;
      const y = (Math.random() - 0.5) * 44;
      const z = (Math.random() - 0.5) * 28 - 2;

      basePositions[i3] = x;
      basePositions[i3 + 1] = y;
      basePositions[i3 + 2] = z;

      currentPositions[i3] = x;
      currentPositions[i3 + 1] = y;
      currentPositions[i3 + 2] = z;

      // Unique drift frequencies and phases
      phases[i3] = Math.random() * Math.PI * 2;
      phases[i3 + 1] = Math.random() * Math.PI * 2;
      phases[i3 + 2] = Math.random() * Math.PI * 2;

      frequencies[i3] = 0.3 + Math.random() * 0.5;
      frequencies[i3 + 1] = 0.25 + Math.random() * 0.45;
      frequencies[i3 + 2] = 0.2 + Math.random() * 0.4;

      const baseCol = colorPalette[i % colorPalette.length];
      // Subtle brightness variation with low overall alpha
      const lum = 0.65 + Math.random() * 0.35;
      colors[i3] = baseCol.r * lum;
      colors[i3 + 1] = baseCol.g * lum;
      colors[i3 + 2] = baseCol.b * lum;
    }

    // 3. Circular Alpha Gradient Particle Texture
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      grad.addColorStop(0.2, "rgba(233, 213, 255, 0.6)");
      grad.addColorStop(0.5, "rgba(192, 132, 252, 0.22)");
      grad.addColorStop(0.8, "rgba(56, 189, 248, 0.08)");
      grad.addColorStop(1, "rgba(8, 4, 23, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    // 4. Particle Geometry & Material (Low Alpha, Non-Distracting)
    const geometry = new THREE.BufferGeometry();
    const positionAttr = new THREE.BufferAttribute(currentPositions, 3);
    const colorAttr = new THREE.BufferAttribute(colors, 3);
    geometry.setAttribute("position", positionAttr);
    geometry.setAttribute("color", colorAttr);

    const material = new THREE.PointsMaterial({
      size: 0.55,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      opacity: 0.35, // Low alpha so typography stays 100% crisp and readable
    });

    const particles = new THREE.Points(geometry, material);
    particleGroup.add(particles);

    // 5. Passive Scroll & Mouse Interaction Tracking
    let targetScrollY = window.scrollY || 0;
    let lerpedScrollY = targetScrollY;

    const handleScroll = () => {
      targetScrollY = window.scrollY || 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // 6. Viewport Resize Handling
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // 7. Tab Visibility Lifecycle: Auto-pause rendering when inactive
    let isTabVisible = !document.hidden;
    let animationFrameId: number | null = null;
    let lastTime = performance.now();
    const startTime = performance.now();

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !animationFrameId) {
        lastTime = performance.now(); // flush delta spike
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 8. High-Performance Render Loop

    const animate = () => {
      if (!isTabVisible) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const _delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const t = (now - startTime) / 1000;

      // Smooth scroll parallax lerp
      lerpedScrollY += (targetScrollY - lerpedScrollY) * 0.05;
      particleGroup.position.y = lerpedScrollY * 0.003;

      // Soft pointer parallax lerp with high damping
      mouse.x += (mouse.targetX - mouse.x) * 0.025;
      mouse.y += (mouse.targetY - mouse.y) * 0.025;
      particleGroup.rotation.y = mouse.x * 0.06;
      particleGroup.rotation.x = -mouse.y * 0.05;

      // Autonomous harmonic drift per particle
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const bx = basePositions[i3];
        const by = basePositions[i3 + 1];
        const bz = basePositions[i3 + 2];

        currentPositions[i3] = bx + Math.sin(t * frequencies[i3] + phases[i3]) * 0.35;
        currentPositions[i3 + 1] = by + Math.cos(t * frequencies[i3 + 1] + phases[i3 + 1]) * 0.35;
        currentPositions[i3 + 2] = bz + Math.sin(t * frequencies[i3 + 2] + phases[i3 + 2]) * 0.25;
      }
      positionAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Full Disposal on Unmount
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
      renderer.forceContextLoss();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none ${className}`}
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
