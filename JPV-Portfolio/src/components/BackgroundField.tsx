// src/components/BackgroundField.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createNoise2D } from "simplex-noise"; // ✅ import correcto (ESM)

gsap.registerPlugin(ScrollTrigger);

// Crea funciones de ruido (semillas internas aleatorias)
const noiseA = createNoise2D();
const noiseB = createNoise2D();

type BackgroundFieldProps = {
  /** cantidad de partículas (600–1200 recomendado) */
  count?: number;
  /** dispersión horizontal/vertical */
  spread?: number;
  /** escala base de cada partícula */
  baseScale?: number;
};

export default function BackgroundField({
  count = 900,
  spread = 220,
  baseScale = 3,
}: BackgroundFieldProps) {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    // limpia si se re-monta
    layer.innerHTML = "";

    const circles: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className =
        "circle pointer-events-none absolute rounded-[40%] opacity-0 will-change-transform";

      // ✅ Usa las funciones de ruido
      const n1 = noiseA(i * 0.003, i * 0.0033);
      const n2 = noiseB(i * 0.002, i * 0.001);

      const x = n2 * spread;
      const y = n1 * spread;
      const hue = Math.floor(i * 0.3) % 360;
      const scaleX = baseScale + n1 * 2;
      const scaleY = baseScale + n2 * 2;

      Object.assign(el.style, {
        width: "20px",
        height: "20px",
        left: "50%",
        top: "50%",
        transform: `translate(${x}px, ${y}px) rotate(${n2 * 270}deg) scale(${scaleX}, ${scaleY})`,
        boxShadow: `0 0 0 .8px hsla(${hue}, 70%, 70%, .55)`,
        transition: "transform 1s cubic-bezier(0.14, 0.15, 0.13, 0.99)",
      } as CSSStyleDeclaration);

      circles.push(el);
      layer.appendChild(el);
    }

    // Animación con ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });

    tl.to(circles, { opacity: 1, duration: 1.2, ease: "none", stagger: 0.001 }, 0)
      .to(
        circles,
        {
          yPercent: -5,
          duration: 1,
          ease: "none",
        },
        0
      );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      layer.innerHTML = "";
    };
  }, [count, spread, baseScale]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.9) 2%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.9) 98%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.9) 2%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.9) 98%)",
      }}
    >
      {/* Capa donde se inyectan los círculos */}
      <div
        ref={layerRef}
        className="absolute left-1/2 top-1/2 h-[200vh] w-[200vw] -translate-x-1/2 -translate-y-1/2"
      />
      {/* Indicador scroll */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <div className="flex flex-col items-center text-[11px] tracking-[0.2em] text-white/70">
          <span>SCROLL</span>
          <svg
            viewBox="0 0 24 24"
            className="mt-2 h-5 w-5"
            style={{
              fill: "none",
              stroke: "#ffffffcc",
              strokeLinecap: "round",
              strokeMiterlimit: 10,
              strokeWidth: 1,
              animation: "jp-scroll 0.95s ease-in-out alternate infinite",
            }}
          >
            <line x1="12" y1="1" x2="12" y2="22.5" />
            <line x1="12.1" y1="22.4" x2="18.9" y2="15.6" />
            <line x1="11.9" y1="22.4" x2="5.1" y2="15.6" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes jp-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
      `}</style>
    </div>
  );
}
