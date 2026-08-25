"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from "@react-three/drei";
import { ToonObject } from "./ToonObject";

/**
 * FRAMELOOP NOTE (deviation from §5, deliberate).
 *
 * §5 asks for frameloop="demand" together with <Float>. Those two cannot both
 * hold: "demand" only renders when something calls invalidate(), while Float
 * and the idle rotation are useFrame-driven, so under "demand" the object would
 * simply sit still. Driving invalidate() every frame would reinstate the cost
 * that "demand" exists to avoid.
 *
 * The performance intent — never render a canvas nobody is looking at — is met
 * instead by gating the loop on viewport visibility: "always" while on screen,
 * "never" the moment it leaves. Offscreen cost is zero either way, and the
 * object actually moves while visible.
 */
export default function Scene() {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reduced motion: render a single static frame, then stop entirely.
  const frameloop = reduced ? "demand" : visible ? "always" : "never";

  return (
    /*
     * No grain overlay here on purpose. alpha:true already lets the body's
     * paper texture show through the canvas, so the 3D shares the page's
     * tooth for free. Layering a second, denser grain on top produced a
     * visible rectangle — the exact "WebGL window" §5 warns about.
     */
    <div ref={host} className="h-full w-full">
      <Canvas
        // An uncapped mobile DPR (3–4x) quadruples fragment work for no visible gain.
        dpr={[1, dpr]}
        frameloop={frameloop}
        performance={{ min: 0.5 }}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          alpha: true, // paper shows through — no rectangular WebGL "window"
          stencil: false,
        }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(2)}
        />
        <ambientLight intensity={1.6} />
        <directionalLight position={[3, 4, 5]} intensity={2.4} />
        <Suspense fallback={null}>
          <ToonObject />
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
