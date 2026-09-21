"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

export const Preloader: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("ryze_preloader_seen");
    if (hasSeen === "true" && process.env.NODE_ENV !== "development") {
      setShouldRender(false);
      setIsComplete(true);
      return;
    }

    const handleSkip = () => {
      setIsComplete(true);
      sessionStorage.setItem("ryze_preloader_seen", "true");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleSkip();
    };
    window.addEventListener("keydown", handleKeyDown);

    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    let currentZ = window.innerWidth < 640 ? 9.2 : 6.8;
    camera.position.z = currentZ;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Geometry & Materials
    const sphereGeo = new THREE.SphereGeometry(1.05, 64, 64);
    const sphereMat = new THREE.MeshPhysicalMaterial({ 
      color: 0x05030a, 
      roughness: 0.1, 
      metalness: 0.95, 
      clearcoat: 1.0, 
      clearcoatRoughness: 0.1 
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    const ringMat = new THREE.MeshStandardMaterial({ 
      color: 0xa855f7, 
      emissive: 0x6d28d9, 
      emissiveIntensity: 0.8, 
      metalness: 0.9, 
      roughness: 0.2 
    });
    
    const ringGroup = new THREE.Group();
    const innerRingGeo = new THREE.TorusGeometry(1.7, 0.035, 16, 100);
    const innerRing = new THREE.Mesh(innerRingGeo, ringMat);
    
    const outerRingGeo = new THREE.TorusGeometry(1.95, 0.035, 16, 100);
    const outerRing = new THREE.Mesh(outerRingGeo, ringMat);
    
    ringGroup.add(innerRing);
    ringGroup.add(outerRing);
    ringGroup.rotation.x = 26 * (Math.PI / 180);
    ringGroup.rotation.z = 26 * (Math.PI / 180);
    scene.add(ringGroup);

    // Lights
    const violetLight = new THREE.PointLight(0x8b5cf6, 4, 10);
    violetLight.position.set(3.5, 2.5, 3.5);
    scene.add(violetLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 3, 10);
    cyanLight.position.set(-3.5, -2, 2.5);
    scene.add(cyanLight);
    
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    // Core Glow Sprite
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: texture, color: 0xffffff, blending: THREE.AdditiveBlending });
    const glowSprite = new THREE.Sprite(spriteMat);
    glowSprite.scale.set(4.5, 4.5, 1.0);
    glowSprite.position.z = -1; // behind the sphere
    scene.add(glowSprite);

    // Particles
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 800;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    
    // Touch oscillation fallback for mobile
    let isMobile = window.innerWidth < 640;

    // Animation Loop
    let reqId: number;
    const startTime = performance.now();

    const animate = () => {
      const time = (performance.now() - startTime) / 1000;
      
      // Parallax / Oscillation
      let targetRotX = 0;
      let targetRotY = 0;
      
      if (isMobile) {
        targetRotX = Math.sin(time) * 0.03;
        targetRotY = Math.cos(time * 0.8) * 0.03;
      } else {
        targetRotX = mouseY * 0.05;
        targetRotY = mouseX * 0.05;
      }
      
      scene.rotation.x += (targetRotX - scene.rotation.x) * 0.05;
      scene.rotation.y += (targetRotY - scene.rotation.y) * 0.05;

      // Orbit
      ringGroup.rotation.y = time * 0.5;

      // Particle update & Sequence phases
      const positions = particleSystem.geometry.attributes.position.array;
      let particleSpeed = 0.025;

      if (time >= 2.2) {
        handleSkip();
      } else if (time >= 1.3) {
        // Phase 2: Warp surge
        particleSpeed = 0.025 * 8; // 8x multiplier
        const targetZ = -1.5;
        // Ease camera z forward
        currentZ += (targetZ - currentZ) * 0.08;
        camera.position.z = currentZ;
      }

      for (let i = 2; i < particleCount * 3; i += 3) {
        positions[i] += particleSpeed;
        if (positions[i] > 10) {
           positions[i] = -10;
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };
    
    animate();

    const handleResize = () => {
      isMobile = window.innerWidth < 640;
      camera.aspect = window.innerWidth / window.innerHeight;
      
      // Only reset base Z if we are still in phase 1
      const time = (performance.now() - startTime) / 1000;
      if (time < 1.3) {
         currentZ = isMobile ? 9.2 : 6.8;
         camera.position.z = currentZ;
      }
      
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      sphereGeo.dispose();
      sphereMat.dispose();
      innerRingGeo.dispose();
      outerRingGeo.dispose();
      ringMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      texture.dispose();
      spriteMat.dispose();
      renderer.dispose();
    };
  }, []);

  const handleSkip = () => {
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
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-screen h-[100dvh] z-[100] bg-[#05030A] flex items-center justify-center overflow-hidden select-none pointer-events-auto"
        >
          {/* ThreeJS Container */}
          <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />

          {/* Typography overlay */}
          <div className="absolute inset-x-0 bottom-1/4 sm:bottom-[30%] flex flex-col items-center justify-center z-10 pointer-events-none">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-[0.28em] drop-shadow-[0_0_15px_rgba(139,92,246,0.5)] mb-4 ml-[0.28em]">
              RYZE WORKS
            </h1>
            <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] font-mono tracking-widest text-violet-300">
                CREATIVE ENGINEERING // NEXT-GEN DIGITAL SYSTEMS
              </span>
            </div>
          </div>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-6 right-5 sm:right-6 z-30 px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-zinc-400 hover:text-white transition-all cursor-pointer active:scale-95"
          >
            ESC TO SKIP →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
