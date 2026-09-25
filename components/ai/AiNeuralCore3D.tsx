"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface AiNeuralCore3DProps {
  /** Whether the user has focused the search/chat input */
  isFocused?: boolean;
  /** Whether the user is actively typing */
  isTyping?: boolean;
  /** Length of the current input query (triggers shockwaves on change) */
  queryLength?: number;
  /** Optional extra CSS classes */
  className?: string;
}

export default function AiNeuralCore3D({
  isFocused = false,
  isTyping = false,
  queryLength = 0,
  className = "",
}: AiNeuralCore3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ isFocused, isTyping, queryLength });
  const prevQueryLength = useRef(queryLength);

  // Keep propsRef in sync without triggering useEffect re-runs
  useEffect(() => {
    propsRef.current = { isFocused, isTyping, queryLength };
  }, [isFocused, isTyping, queryLength]);

  // Track queryLength changes to trigger instantaneous shockwave surges
  const shockwaveRef = useRef({ time: 0, intensity: 0 });
  useEffect(() => {
    if (queryLength !== prevQueryLength.current) {
      prevQueryLength.current = queryLength;
      shockwaveRef.current = {
        time: performance.now(),
        intensity: 1.0,
      };
    }
  }, [queryLength]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 13.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const clusterGroup = new THREE.Group();
    scene.add(clusterGroup);

    // 2. Generate 140 Points in a Spherical Neural Cluster
    const nodeCount = 140;
    const basePositions = new Float32Array(nodeCount * 3);
    const currentPositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);
    const phases = new Float32Array(nodeCount);
    const frequencies = new Float32Array(nodeCount);
    const baseRadius = 4.6;

    // Color palette: glowing purple & electric violet with soft lavender highlights
    const colorViolet = new THREE.Color("#C084FC"); // violet-400
    const colorPurple = new THREE.Color("#A855F7"); // purple-500
    const colorLavender = new THREE.Color("#E9D5FF"); // lavender-200
    const colorDeepViolet = new THREE.Color("#9333EA"); // purple-600

    const colorPalette = [colorViolet, colorPurple, colorLavender, colorDeepViolet];

    // Fibonacci sphere distribution for uniform organic spacing
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < nodeCount; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);

      // Subtle random radial dispersion around base radius
      const r = baseRadius * (0.82 + Math.random() * 0.36);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.88; // subtle torus flattening
      const z = r * Math.cos(phi);

      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;

      currentPositions[i * 3] = x;
      currentPositions[i * 3 + 1] = y;
      currentPositions[i * 3 + 2] = z;

      phases[i] = Math.random() * Math.PI * 2;
      frequencies[i] = 0.7 + Math.random() * 0.7;

      const baseColor = colorPalette[i % colorPalette.length];
      nodeColors[i * 3] = baseColor.r;
      nodeColors[i * 3 + 1] = baseColor.g;
      nodeColors[i * 3 + 2] = baseColor.b;
    }

    // Circular particle sprite texture with smooth radial alpha falloff
    const particleCanvas = document.createElement("canvas");
    particleCanvas.width = 64;
    particleCanvas.height = 64;
    const pCtx = particleCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.2, "rgba(233, 213, 255, 0.95)");
      grad.addColorStop(0.5, "rgba(192, 132, 252, 0.65)");
      grad.addColorStop(0.8, "rgba(168, 85, 247, 0.2)");
      grad.addColorStop(1, "rgba(124, 58, 237, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    // Nodes Geometry & Material
    const nodesGeometry = new THREE.BufferGeometry();
    const positionAttribute = new THREE.BufferAttribute(currentPositions, 3);
    const colorAttribute = new THREE.BufferAttribute(nodeColors, 3);
    nodesGeometry.setAttribute("position", positionAttribute);
    nodesGeometry.setAttribute("color", colorAttribute);

    const nodesMaterial = new THREE.PointsMaterial({
      size: 0.32,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });
    const pointsMesh = new THREE.Points(nodesGeometry, nodesMaterial);
    clusterGroup.add(pointsMesh);

    // 3. Dynamic Synapse Lines (Connected nodes within threshold distance)
    const maxLineSegments = 500;
    const linePositions = new Float32Array(maxLineSegments * 2 * 3);
    const lineColors = new Float32Array(maxLineSegments * 2 * 3);

    const linesGeometry = new THREE.BufferGeometry();
    const linePositionAttribute = new THREE.BufferAttribute(linePositions, 3);
    const lineColorAttribute = new THREE.BufferAttribute(lineColors, 3);
    linesGeometry.setAttribute("position", linePositionAttribute);
    linesGeometry.setAttribute("color", lineColorAttribute);

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 1.0,
    });
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    clusterGroup.add(linesMesh);

    // 4. Pointer Interaction with Soft Spring Damping
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;
    };

    const handlePointerLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    window.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    // 5. Responsive Resize Handling
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

    // 6. Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    const startTime = performance.now();
    let currentSpread = 1.0;
    let currentRotSpeed = 0.003;
    let currentPointSize = 0.32;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const t = (now - startTime) / 1000;
      const deltaScale = delta * 60;

      const { isFocused: focused, isTyping: typing } = propsRef.current;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      // Handle Shockwave from query changes
      const shockwaveAge = (performance.now() - shockwaveRef.current.time) * 0.001;
      let shockwaveMultiplier = 0;
      if (shockwaveAge < 0.6) {
        // Shockwave envelope: sharp attack, smooth exponential decay
        shockwaveMultiplier = Math.exp(-shockwaveAge * 5.0) * shockwaveRef.current.intensity;
      }

      // Smoothly interpolate active state parameters
      const targetSpread = focused ? 1.22 : 1.0;
      const targetRotSpeed = focused ? 0.0075 : 0.0028;
      const targetPointSize = (focused ? 0.42 : 0.32) + shockwaveMultiplier * 0.15;

      currentSpread += (targetSpread - currentSpread) * 0.06;
      currentRotSpeed += (targetRotSpeed - currentRotSpeed) * 0.06;
      currentPointSize += (targetPointSize - currentPointSize) * 0.1;
      nodesMaterial.size = currentPointSize;

      // Continuous harmonic cluster breathing
      const breath = Math.sin(t * 1.4) * 0.07;
      const effectiveSpread = currentSpread * (1 + breath);

      // Typing excitation jitter
      const typingJitter = typing ? (Math.random() - 0.5) * 0.06 : 0;

      // Update Node Positions
      const shockwaveRadius = shockwaveAge * 10; // expands outward at speed 10
      for (let i = 0; i < nodeCount; i++) {
        const i3 = i * 3;
        const bx = basePositions[i3];
        const by = basePositions[i3 + 1];
        const bz = basePositions[i3 + 2];

        // Individual node floating oscillation
        const nodeWave = Math.sin(t * frequencies[i] + phases[i]) * 0.12;

        // Shockwave ripple displacement
        const distFromCenter = Math.sqrt(bx * bx + by * by + bz * bz);
        const distToShock = Math.abs(distFromCenter - shockwaveRadius);
        let ripplePush = 0;
        if (shockwaveAge < 0.6 && distToShock < 1.8) {
          ripplePush = Math.sin((1 - distToShock / 1.8) * Math.PI) * shockwaveMultiplier * 0.4;
        }

        const scaleTotal = effectiveSpread + (nodeWave + ripplePush + typingJitter) / baseRadius;

        currentPositions[i3] = bx * scaleTotal;
        currentPositions[i3 + 1] = by * scaleTotal;
        currentPositions[i3 + 2] = bz * scaleTotal;
      }
      positionAttribute.needsUpdate = true;

      // Update Dynamic Synapse Lines
      // Threshold distance for synapses
      const connectionDist = 2.1 * currentSpread;
      const distThresholdSq = connectionDist * connectionDist;
      let lineVertexIndex = 0;

      for (let i = 0; i < nodeCount && lineVertexIndex < maxLineSegments * 2; i++) {
        const i3 = i * 3;
        const xi = currentPositions[i3];
        const yi = currentPositions[i3 + 1];
        const zi = currentPositions[i3 + 2];

        for (let j = i + 1; j < nodeCount && lineVertexIndex < maxLineSegments * 2; j++) {
          const j3 = j * 3;
          const xj = currentPositions[j3];
          const yj = currentPositions[j3 + 1];
          const zj = currentPositions[j3 + 2];

          const dx = xi - xj;
          const dy = yi - yj;
          const dz = zi - zj;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < distThresholdSq) {
            const dist = Math.sqrt(distSq);
            // Proximity alpha factor (1 = touching, 0 = at threshold boundary)
            let proximityAlpha = 1 - dist / connectionDist;
            proximityAlpha = Math.pow(proximityAlpha, 1.4);

            // Boost line brightness on focused & shockwave
            const lineBright =
              proximityAlpha * (focused ? 2.5 : 1.8) + shockwaveMultiplier * 1.0;

            // Vertex 1 (from node i)
            const v1 = lineVertexIndex * 3;
            linePositions[v1] = xi;
            linePositions[v1 + 1] = yi;
            linePositions[v1 + 2] = zi;

            lineColors[v1] = nodeColors[i3] * lineBright;
            lineColors[v1 + 1] = nodeColors[i3 + 1] * lineBright;
            lineColors[v1 + 2] = nodeColors[i3 + 2] * lineBright;

            // Vertex 2 (to node j)
            const v2 = (lineVertexIndex + 1) * 3;
            linePositions[v2] = xj;
            linePositions[v2 + 1] = yj;
            linePositions[v2 + 2] = zj;

            lineColors[v2] = nodeColors[j3] * lineBright;
            lineColors[v2 + 1] = nodeColors[j3 + 1] * lineBright;
            lineColors[v2 + 2] = nodeColors[j3 + 2] * lineBright;

            lineVertexIndex += 2;
          }
        }
      }

      linesGeometry.setDrawRange(0, lineVertexIndex);
      linePositionAttribute.needsUpdate = true;
      lineColorAttribute.needsUpdate = true;

      // Autonomous rotation + soft pointer tilt
      clusterGroup.rotation.y += currentRotSpeed * deltaScale + mouse.x * 0.008;
      clusterGroup.rotation.x =
        -mouse.y * 0.22 + Math.sin(t * 0.5) * 0.05;
      clusterGroup.rotation.z = Math.cos(t * 0.4) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Full Lifecycle Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);

      particleTexture.dispose();
      nodesGeometry.dispose();
      nodesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();

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
      className={`w-full h-full select-none pointer-events-none ${className}`}
      style={{ minWidth: "100%", minHeight: "100%" }}
    />
  );
}
