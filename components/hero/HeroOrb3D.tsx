"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroOrb3DProps {
  className?: string;
}

export default function HeroOrb3D({ className = "" }: HeroOrb3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Renderer Setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 620;
    const height = container.clientHeight || 620;

    // Camera setup - positioned to capture the wider Saturn orbit comfortably without boundary clipping
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    // Root groups for transform hierarchy
    const rootGroup = new THREE.Group();
    rootGroup.scale.set(0.85, 0.85, 0.85);
    const interactiveGroup = new THREE.Group();
    rootGroup.add(interactiveGroup);
    scene.add(rootGroup);

    // 4. Volumetric Violet Nebula Backing (Sprite + Point Light)
    // Create cosmic nebula texture on dynamic canvas
    const nebulaCanvas = document.createElement("canvas");
    nebulaCanvas.width = 512;
    nebulaCanvas.height = 512;
    const nebCtx = nebulaCanvas.getContext("2d");
    if (nebCtx) {
      const grad = nebCtx.createRadialGradient(256, 256, 10, 256, 256, 256);
      grad.addColorStop(0, "rgba(124, 58, 237, 0.55)"); // #7C3AED
      grad.addColorStop(0.35, "rgba(109, 40, 217, 0.3)");
      grad.addColorStop(0.65, "rgba(76, 29, 149, 0.12)");
      grad.addColorStop(1, "rgba(3, 0, 20, 0)");
      nebCtx.fillStyle = grad;
      nebCtx.fillRect(0, 0, 512, 512);
    }
    const nebulaTexture = new THREE.CanvasTexture(nebulaCanvas);
    const nebulaSpriteMat = new THREE.SpriteMaterial({
      map: nebulaTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.9,
    });
    const nebulaSprite = new THREE.Sprite(nebulaSpriteMat);
    nebulaSprite.scale.set(7.5, 7.5, 1);
    nebulaSprite.position.set(0, 0, -2.2);
    rootGroup.add(nebulaSprite);

    // Nebula point light directly behind sphere cluster: color #7C3AED, intensity 4.0, distance 10
    const nebulaLight = new THREE.PointLight("#7C3AED", 4.0, 10, 1.2);
    nebulaLight.position.set(0, 0, -2.0);
    scene.add(nebulaLight);

    // 2. Core Color & Radial Dispersion:
    // Asymmetric gradient texture: Deep plum/obsidian perimeter (#1A0736),
    // Electric violet epicenter (#9333EA / #A855F7),
    // Warm magenta/rose sunset backlight (#E11D48 / #F43F5E) bleeding through bottom-left quadrant.
    const coreCanvas = document.createElement("canvas");
    coreCanvas.width = 1024;
    coreCanvas.height = 1024;
    const coreCtx = coreCanvas.getContext("2d");
    if (coreCtx) {
      // Base dark obsidian / deep plum perimeter
      coreCtx.fillStyle = "#120424";
      coreCtx.fillRect(0, 0, 1024, 1024);

      // Deep plum outer ring
      const baseGrad = coreCtx.createRadialGradient(512, 512, 100, 512, 512, 512);
      baseGrad.addColorStop(0, "rgba(49, 14, 82, 0.9)");
      baseGrad.addColorStop(0.7, "#1a0736");
      baseGrad.addColorStop(1, "#0d0218");
      coreCtx.fillStyle = baseGrad;
      coreCtx.fillRect(0, 0, 1024, 1024);

      // High-vibrancy electric violet epicenter (slightly upper center)
      const violetGrad = coreCtx.createRadialGradient(520, 480, 10, 520, 480, 360);
      violetGrad.addColorStop(0, "#d8b4fe"); // intense highlight center
      violetGrad.addColorStop(0.2, "#a855f7"); // electric violet
      violetGrad.addColorStop(0.55, "#7e22ce"); // rich purple
      violetGrad.addColorStop(1, "rgba(26, 7, 54, 0)");
      coreCtx.fillStyle = violetGrad;
      coreCtx.fillRect(0, 0, 1024, 1024);

      // Warm magenta/rose sunset backlight bleeding into bottom-left quadrant
      const sunsetGrad = coreCtx.createRadialGradient(380, 680, 20, 380, 680, 380);
      sunsetGrad.addColorStop(0, "#fb7185"); // rose-400
      sunsetGrad.addColorStop(0.3, "#f43f5e"); // rose-500
      sunsetGrad.addColorStop(0.65, "#be123c"); // rose-700
      sunsetGrad.addColorStop(1, "rgba(225, 29, 72, 0)");
      coreCtx.fillStyle = sunsetGrad;
      coreCtx.fillRect(0, 0, 1024, 1024);
    }

    const coreTexture = new THREE.CanvasTexture(coreCanvas);
    coreTexture.wrapS = THREE.ClampToEdgeWrapping;
    coreTexture.wrapT = THREE.ClampToEdgeWrapping;

    const coreGeometry = new THREE.SphereGeometry(1.52, 64, 64);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      map: coreTexture,
      emissiveMap: coreTexture,
      emissive: new THREE.Color("#ffffff"),
      emissiveIntensity: 0.65,
      roughness: 0.28,
      metalness: 0.15,
      clearcoat: 0.35,
      clearcoatRoughness: 0.15,
    });
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    interactiveGroup.add(coreSphere);

    // Internal point lights to drive transmission through the outer bubble
    // Rose / magenta sunset backlight bleeding through bottom-left
    const sunsetLight = new THREE.PointLight("#f43f5e", 3.2, 7, 1.4);
    sunsetLight.position.set(-0.9, -0.8, 0.5);
    interactiveGroup.add(sunsetLight);

    // Electric violet core fill light
    const coreVioletLight = new THREE.PointLight("#a855f7", 3.5, 8, 1.2);
    coreVioletLight.position.set(0.2, 0.3, 0.8);
    interactiveGroup.add(coreVioletLight);

    // 1. Dual Glowing Orbital Rings
    // -------------------------------------------------------------
    // Ring 1 (Front Inner Collar):
    // Neon-violet circular torus directly around the dark inner core.
    // Emissive #D8B4FE / #A855F7 with intense bloom/glow and additive blending.
    const collarGroup = new THREE.Group();
    interactiveGroup.add(collarGroup);

    const innerCollarGeo = new THREE.TorusGeometry(1.58, 0.034, 32, 120);
    const innerCollarMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#d8b4fe"),
      transparent: true,
      opacity: 0.98,
      blending: THREE.AdditiveBlending,
    });
    const innerCollarMesh = new THREE.Mesh(innerCollarGeo, innerCollarMat);

    // Soft outer bloom sheath for Ring 1
    const collarGlowGeo = new THREE.TorusGeometry(1.58, 0.075, 32, 120);
    const collarGlowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#a855f7"),
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const collarGlowMesh = new THREE.Mesh(collarGlowGeo, collarGlowMat);

    collarGroup.add(innerCollarMesh);
    collarGroup.add(collarGlowMesh);
    // Slight forward collar tilt encircling the core cavity as in generated.jpeg
    collarGroup.rotation.x = THREE.MathUtils.degToRad(12);
    collarGroup.rotation.y = THREE.MathUtils.degToRad(8);

    // -------------------------------------------------------------
    // Ring 2 (Planetary Saturn Orbit):
    // Inclined, wider elliptical ring (~25° tilt along X/Z plane) cutting clean through
    // the outer glass bubble and extending into 3D space, glowing pure luminous lavender-white (#E9D5FF).
    const saturnRingGroup = new THREE.Group();
    interactiveGroup.add(saturnRingGroup);

    // Main sharp lavender-white beam ring
    const saturnRadius = 2.62;
    const saturnRingGeo = new THREE.TorusGeometry(saturnRadius, 0.024, 32, 180);
    const saturnRingMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ffffff"),
      transparent: true,
      opacity: 0.98,
      blending: THREE.AdditiveBlending,
    });
    const saturnRingMesh = new THREE.Mesh(saturnRingGeo, saturnRingMat);

    // Lavender additive glow sheath extending into space
    const saturnGlowGeo = new THREE.TorusGeometry(saturnRadius, 0.065, 32, 180);
    const saturnGlowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#e9d5ff"),
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const saturnGlowMesh = new THREE.Mesh(saturnGlowGeo, saturnGlowMat);

    // Wide atmospheric purple falloff ring
    const saturnWideGeo = new THREE.TorusGeometry(saturnRadius, 0.12, 32, 180);
    const saturnWideMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#c084fc"),
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const saturnWideMesh = new THREE.Mesh(saturnWideGeo, saturnWideMat);

    saturnRingGroup.add(saturnRingMesh);
    saturnRingGroup.add(saturnGlowMesh);
    saturnRingGroup.add(saturnWideMesh);

    // Base inclination matching generated.jpeg: ~25° tilt across X and Z plane
    const baseSaturnRotX = THREE.MathUtils.degToRad(58);
    const baseSaturnRotY = THREE.MathUtils.degToRad(-14);
    const baseSaturnRotZ = THREE.MathUtils.degToRad(-26);
    saturnRingGroup.rotation.set(baseSaturnRotX, baseSaturnRotY, baseSaturnRotZ);

    // 3. Soap-Bubble / CD Iridescence on the Glass Shell:
    // Outer shell: MeshPhysicalMaterial with roughness: 0.02, transmission: 0.98, ior: 1.52,
    // thickness: 1.6, clearcoat: 1.0, clearcoatRoughness: 0.04, iridescence: 1.0
    const shellGeometry = new THREE.SphereGeometry(1.82, 64, 64);
    const shellMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#f5f3ff"),
      transmission: 0.98,
      opacity: 1.0,
      transparent: true,
      roughness: 0.02,
      ior: 1.52,
      thickness: 1.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      iridescence: 1.0,
      iridescenceIOR: 1.62,
      iridescenceThicknessRange: [120, 520],
      attenuationColor: new THREE.Color("#e9d5ff"),
      attenuationDistance: 2.8,
      specularIntensity: 1.0,
      specularColor: new THREE.Color("#ffffff"),
    });
    const shellMesh = new THREE.Mesh(shellGeometry, shellMaterial);
    interactiveGroup.add(shellMesh);

    // Iridescent chromatic rim fringe: subtle chromatic dispersion shifting through
    // lime-cyan, lavender, and gold along the curvature edge (sampling generated.jpeg)
    const rimFringeGeo = new THREE.SphereGeometry(1.825, 64, 64);
    const rimFringeMat = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = 1.0 - max(dot(viewDir, vNormal), 0.0);
          fresnel = pow(fresnel, 2.6);

          // Chromatic dispersion rainbow along curvature: cyan, lavender, gold
          float angle = atan(vNormal.y, vNormal.x);
          float wave = sin(angle * 2.0 + uTime * 0.5) * 0.5 + 0.5;

          vec3 colorCyan = vec3(0.35, 0.95, 0.85);     // lime-cyan
          vec3 colorLavender = vec3(0.85, 0.65, 1.0);   // lavender
          vec3 colorGold = vec3(1.0, 0.82, 0.38);       // gold

          vec3 rainbowColor = mix(colorCyan, colorLavender, wave);
          rainbowColor = mix(rainbowColor, colorGold, sin(angle + uTime * 0.3) * 0.5 + 0.5);

          gl_FragColor = vec4(rainbowColor, fresnel * 0.45);
        }
      `,
    });
    const rimFringeMesh = new THREE.Mesh(rimFringeGeo, rimFringeMat);
    interactiveGroup.add(rimFringeMesh);

    // Lighting & Ambience
    const ambientLight = new THREE.AmbientLight("#1c0a35", 1.4);
    scene.add(ambientLight);

    // Key light (top-right brilliant specular)
    const keyLight = new THREE.DirectionalLight("#ffffff", 3.0);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Bottom-left cyan/blue rim accent light
    const coolRimLight = new THREE.PointLight("#67e8f9", 2.0, 12, 1.5);
    coolRimLight.position.set(-3.5, 2.5, 2.5);
    scene.add(coolRimLight);

    // 5. Motion & Physics (Directional Momentum & Perpetual Ambient Drift)
    const BASE_SPEED = 0.003;
    const velocity = { x: 0, y: BASE_SPEED };
    let isDragging = false;
    let lastPointerPosition = { x: 0, y: 0 };

    container.style.cursor = "grab";

    const handlePointerDown = (e: PointerEvent) => {
      // Only handle primary pointer button (left mouse click or touch)
      if (e.button !== 0 && e.pointerType === "mouse") return;
      isDragging = true;
      lastPointerPosition = { x: e.clientX, y: e.clientY };
      velocity.x = 0;
      velocity.y = 0;
      container.style.cursor = "grabbing";

      try {
        container.setPointerCapture(e.pointerId);
      } catch {
        // Fallback for environments where pointer capture isn't supported
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - lastPointerPosition.x;
      const deltaY = e.clientY - lastPointerPosition.y;

      velocity.y = deltaX * 0.003;
      velocity.x = deltaY * 0.003;

      interactiveGroup.rotation.y += velocity.y;
      interactiveGroup.rotation.x += velocity.x;
      interactiveGroup.rotation.x = Math.max(-1.1, Math.min(1.1, interactiveGroup.rotation.x));

      lastPointerPosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      container.style.cursor = "grab";

      // If released with near zero velocity, sustain ambient drift
      if (Math.abs(velocity.y) < 0.0005) {
        velocity.y = BASE_SPEED;
      }

      try {
        if (container.hasPointerCapture(e.pointerId)) {
          container.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Fallback
      }
    };

    const handlePointerLeave = (e: PointerEvent) => {
      if (isDragging) {
        try {
          if (!container.hasPointerCapture(e.pointerId)) {
            isDragging = false;
            container.style.cursor = "grab";
          }
        } catch {
          isDragging = false;
          container.style.cursor = "grab";
        }
      }
    };

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointercancel", handlePointerUp);
    container.addEventListener("pointerleave", handlePointerLeave);

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight, false);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation loop setup with performance.now() for frame-rate independence
    let animationFrameId: number;
    let lastTime = performance.now();
    const startTime = performance.now();
    let ringSpinZ = 0;
    const BASE_SCALE = 0.85;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const t = (now - startTime) / 1000;
      const deltaScale = delta * 60; // normalized to 60fps

      // 3. Coasting & Perpetual Directional Drift:
      if (!isDragging) {
        // Apply friction/damping to fast spins
        const friction = Math.pow(0.96, deltaScale);
        velocity.x *= friction;
        velocity.y *= friction;

        // Retain sign (direction) of the last drag and preserve minimum ambient BASE_SPEED
        const signY = velocity.y >= 0 ? 1 : -1;
        if (Math.abs(velocity.y) < BASE_SPEED) {
          velocity.y = signY * BASE_SPEED;
        }

        // Apply dampening to vertical tilt and ease back toward level horizontal rotation
        if (Math.abs(velocity.x) < 0.0005) {
          velocity.x = 0;
          if (Math.abs(interactiveGroup.rotation.x) > 0.001) {
            interactiveGroup.rotation.x *= Math.pow(0.985, deltaScale);
          }
        }

        // Continuous directional rotation
        interactiveGroup.rotation.y += velocity.y * deltaScale;
        interactiveGroup.rotation.x += velocity.x * deltaScale;
        interactiveGroup.rotation.x = Math.max(-1.1, Math.min(1.1, interactiveGroup.rotation.x));
      }

      // Subtle zero-G floating bob
      rootGroup.position.y = Math.sin(t * 1.2) * 0.08;
      rootGroup.position.x = Math.cos(t * 0.8) * 0.02;

      const breathingPulse = 1 + Math.sin(t * 1.8) * 0.015;
      const currentScale = BASE_SCALE * breathingPulse;
      rootGroup.scale.set(currentScale, currentScale, currentScale);

      // Idle subtle roll on z-axis
      interactiveGroup.rotation.z = Math.sin(t * 0.5) * 0.03;

      // Interior core slow celestial rotation
      coreSphere.rotation.y += 0.002 * deltaScale;

      // Ring dynamic parallax (autonomous offset lag)
      ringSpinZ += 0.003 * deltaScale;

      const wobbleX = Math.sin(t * 0.7) * 0.035;
      const wobbleZ = Math.cos(t * 0.9) * 0.04;
      saturnRingGroup.rotation.x = baseSaturnRotX + wobbleX;
      saturnRingGroup.rotation.y = baseSaturnRotY + Math.sin(t * 0.5) * 0.02;
      saturnRingGroup.rotation.z = baseSaturnRotZ + wobbleZ + ringSpinZ;

      // Soft luminous pulse on orbital glow sheaths
      saturnGlowMat.opacity = 0.6 + Math.sin(t * 2.2) * 0.12;
      collarGlowMat.opacity = 0.5 + Math.cos(t * 2.0) * 0.1;

      // Update chromatic rim shader time
      rimFringeMat.uniforms.uTime.value = t;

      renderer.render(scene, camera);
    };

    animate();

    // Resource disposal on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointercancel", handlePointerUp);
      container.removeEventListener("pointerleave", handlePointerLeave);

      // Dispose textures
      nebulaTexture.dispose();
      coreTexture.dispose();

      // Traverse & dispose geometries, materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Sprite) {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });

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
      className={`relative w-full h-full select-none cursor-grab active:cursor-grabbing touch-none ${className}`}
      style={{ minWidth: "100%", minHeight: "100%", touchAction: "none" }}
    />
  );
}
