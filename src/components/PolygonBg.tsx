'use client';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadLinksPreset } from 'tsparticles-preset-links';
import type { Engine } from 'tsparticles-engine';

export default function PolygonBg() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadLinksPreset(engine);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-[130vh] min-h-screen z-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          preset: 'links',
          background: { color: 'transparent' },
          particles: {
            color: { value: '#fff' },
            links: {
              color: '#fff',
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: { enable: true, speed: 1.2 },
            number: { value: 80, density: { enable: true, area: 800 } },
            opacity: { value: 0.5 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 4 } },
          },
          fullScreen: { enable: false },
          detectRetina: true,
        }}
      />
    </div>
  );
}
