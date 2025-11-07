// src/components/HeroDots.tsx
import { memo, useMemo } from "react";

type Dot = { x: number; y: number; r: number; d: number };

function HeroDotsBase() {
  // Genera una nube de puntos determinística
  const dots = useMemo<Dot[]>(() => {
    const arr: Dot[] = [];
    const seed = 1234;
    let s = seed;
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;

    const COUNT = 120; // ajusta si quieres más/menos puntos
    for (let i = 0; i < COUNT; i++) {
      arr.push({
        x: rnd() * 100,                // 0–100% en X
        y: rnd() * 100,                // 0–100% en Y
        r: 0.8 + rnd() * 2.4,          // radio (px)
        d: 3 + Math.floor(rnd() * 5),  // duración animación (s)
      });
    }
    return arr;
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,.8) 12%, rgba(0,0,0,.9) 88%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,.8) 12%, rgba(0,0,0,.9) 88%, rgba(0,0,0,0) 100%)",
      }}
    >
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="url(#g)"
            opacity="0.8"
          >
            <animate
              attributeName="cy"
              values={`${d.y}; ${Math.max(0, d.y - 3)}; ${d.y}`}
              dur={`${d.d}s`}
              repeatCount="indefinite"
              begin={`${(i % 10) * 0.15}s`}
            />
          </circle>
        ))}

        {/* Gradiente cian sutil para los puntos */}
        <defs>
          <radialGradient id="g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.15" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

const HeroDots = memo(HeroDotsBase);
export default HeroDots;
