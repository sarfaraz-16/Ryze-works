"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface CosmicHorizon3DProps {
  className?: string;
  gridSpeed?: number;
}

export default function CosmicHorizon3D({
  className = "",
  gridSpeed = 0.008,
}: CosmicHorizon3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(gridSpeed);

  useEffect(() => {
    speedRef.current = gridSpeed;
  }, [gridSpeed]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 1200;
    const height = container.clientHeight || 360;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    // Camera positioned above and slightly back, looking down into the tilted warp plane
    camera.position.set(0, 3.4, 7.8);
    camera.lookAt(0, -0.6, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    // 2. Geometry: PlaneGeometry(30, 20, 40, 40)
    const planeGeo = new THREE.PlaneGeometry(30, 20, 40, 40);

    // Deform vertices in custom vertex logic so grid curves downward into a deep center gravity well (event horizon)
    const posAttr = planeGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);

      // Normalized coordinates: x from -1 to 1, y from 0 (near) to 1 (far horizon)
      const nx = x / 15;
      const ny = (y + 10) / 20;

      // Event horizon center is located toward the far horizon (ny ~ 0.85, nx ~ 0)
      const dx = nx * 1.8;
      const dy = (ny - 0.85) * 2.4;
      const distToHorizonWell = Math.sqrt(dx * dx + dy * dy);

      // Gravity well deep plunge function
      const wellDepth = 5.2 / (1.0 + distToHorizonWell * distToHorizonWell * 5.0);

      // Lateral bowl curvature
      const lateralCurvature = (x * x) * 0.014 + (y * y) * 0.008;

      // Deform Z downward
      posAttr.setZ(i, -(wellDepth + lateralCurvature));
    }
    planeGeo.computeVertexNormals();
    posAttr.needsUpdate = true;

    // 3. Custom Shader Material: Neon-violet gradient (#8B5CF6 to deep indigo #1E1B4B)
    // with continuous forward UV animation, distance fade, and soft additive glow
    const vertexShader = `
      varying vec2 vUv;
      varying float vZ;
      varying float vDist;
      uniform float uTime;

      void main() {
        vUv = uv;
        vec3 pos = position;

        // Subtle organic breathing pulsation inside the gravity well
        float pulse = sin(uTime * 1.6 + length(pos.xy) * 0.3) * 0.12;
        pos.z += pulse;

        vZ = pos.z;
        vDist = (pos.y + 10.0) / 20.0;

        vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * modelViewPosition;
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform float uOffset;
      varying vec2 vUv;
      varying float vZ;
      varying float vDist;

      void main() {
        // Endless smooth forward flight toward the horizon
        // Grid resolution matching the 40x40 plane subdivisions
        vec2 gridUv = vec2(vUv.x * 40.0, fract(vUv.y + uOffset) * 26.0);

        // Anti-aliased procedural wireframe grid lines
        vec2 grid = abs(fract(gridUv - 0.5) - 0.5) / fwidth(gridUv);
        float line = 1.0 - min(min(grid.x, grid.y), 1.0);

        // Neon violet (#8B5CF6) to deep indigo (#1E1B4B) gradient palette
        vec3 colorNeonViolet = vec3(0.545, 0.361, 0.965); // #8B5CF6
        vec3 colorDeepIndigo = vec3(0.118, 0.106, 0.294); // #1E1B4B
        vec3 colorBrightAura = vec3(0.722, 0.588, 1.0);   // #B896FF
        vec3 colorHorizonHot = vec3(0.85, 0.72, 1.0);     // Core luminosity

        // Blend colors along depth distance: vibrant in foreground, mysterious indigo in horizon depth
        vec3 color = mix(colorNeonViolet, colorDeepIndigo, smoothstep(0.1, 0.95, vDist));
        color = mix(color, colorBrightAura, smoothstep(0.0, 0.3, 1.0 - vDist) * 0.25);

        // Soft center event horizon luminescence
        float centerDist = length(vec2((vUv.x - 0.5) * 2.6, (vUv.y - 0.85) * 1.8));
        float horizonGlow = exp(-centerDist * 4.2) * (0.45 + 0.15 * sin(uTime * 2.2));
        color = mix(color, colorHorizonHot, horizonGlow);

        // Opacity falloffs: fade smoothly toward top edges (horizon) and lateral sides
        float fadeTop = smoothstep(0.97, 0.38, vUv.y);
        float fadeSides = smoothstep(0.0, 0.16, vUv.x) * smoothstep(1.0, 0.84, vUv.x);
        float fadeNear = smoothstep(0.0, 0.06, vUv.y);

        float alpha = (line * 0.82 + horizonGlow * 0.35) * fadeTop * fadeSides * fadeNear;

        if (alpha < 0.003) discard;

        gl_FragColor = vec4(color, alpha);
      }
    `;

    const customMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uOffset: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    // 4. Mesh Creation & Tilt Setup
    const warpMesh = new THREE.Mesh(planeGeo, customMaterial);
    // Tilted back ~75° along X-axis (-1.309 rad)
    const baseTiltX = -75 * (Math.PI / 180);
    warpMesh.rotation.x = baseTiltX;
    warpMesh.position.set(0, -0.9, 0);
    scene.add(warpMesh);

    // 5. Pointer Tracking with Soft Spring Damping
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouse.targetX = Math.max(-1, Math.min(1, x));
        mouse.targetY = Math.max(-1, Math.min(1, y));
      }
    };

    const handlePointerLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    window.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    // 6. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH, false);
        }
      }
    });
    resizeObserver.observe(container);

    // 7. Animation Loop
    let animationFrameId: number;
    let offsetAcc = 0;
    let lastTime = performance.now();
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;

      // Endless forward flight offset increment
      offsetAcc += speedRef.current * (delta * 60);
      customMaterial.uniforms.uOffset.value = offsetAcc;
      customMaterial.uniforms.uTime.value = elapsed;

      // Soft spring lerp for mouse tilt interaction
      mouse.x += (mouse.targetX - mouse.x) * 0.035;
      mouse.y += (mouse.targetY - mouse.y) * 0.035;

      // Subtle tilts based on cursor
      warpMesh.rotation.y = mouse.x * 0.09;
      warpMesh.rotation.x = baseTiltX + mouse.y * 0.05;
      warpMesh.rotation.z = -mouse.x * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Lifecycle Cleanup & Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);

      planeGeo.dispose();
      customMaterial.dispose();
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
