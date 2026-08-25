"use client";

import { useMemo, useRef } from "react";
import { Float, Outlines } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { createToonGradient } from "@/lib/gradientMap";

/**
 * Sketch-styled solid: toon shading + a stepped gradient + an inverted-hull
 * outline in pencil.
 *
 * Deliberately NOT MeshStandardMaterial/MeshPhysicalMaterial with an envMap —
 * glossy PBR is the failure mode that makes WebGL float above the paper. No
 * <Environment> either, which also saves the HDRI download.
 *
 * WebGL `linewidth` is capped at 1px on virtually every platform, so the thick
 * ink line comes from <Outlines thickness>, never from <Edges linewidth>.
 */
export function ToonObject() {
  const gradientMap = useMemo(() => createToonGradient(), []);
  const mesh = useRef<Mesh>(null);

  // Slow, slightly irregular drift. Perfectly linear rotation reads as CGI.
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.25;
    mesh.current.rotation.x += delta * 0.08;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.25, 0]} />
        <meshToonMaterial color="#ff4d4d" gradientMap={gradientMap} />
        {/* Ink every silhouette so it sits on the paper rather than over it. */}
        <Outlines thickness={0.06} color="#2d2d2d" screenspace />
      </mesh>
    </Float>
  );
}
