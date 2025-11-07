// src/components/CanvasBackground.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type Props = {
  /** número de partículas desktop/móvil */
  desktopCount?: number;
  mobileCount?: number;
};

export default function CanvasBackground({
  desktopCount = 200,
  mobileCount = 100,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true })!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let vw = 0, vh = 0;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const COUNT = isMobile ? mobileCount : desktopCount;

    type Dot = { x: number; y: number; r: number; hue: number; seed: number };
    const dots: Dot[] = [];

    function resize() {
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = Math.floor(vw * dpr);
      canvas.height = Math.floor(vh * dpr * 2); // alto extra para scroll
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh * 2}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function rand(n = 1) { return Math.random() * n; }
    function noise(t: number, s: number) {
      // ruido suave barato
      return Math.sin(t * 0.7 + s * 1.3) * 0.5 + Math.sin(t * 0.23 + s * 0.9) * 0.5;
    }

    function initDots() {
      dots.length = 0;
      for (let i = 0; i < COUNT; i++) {
        const seed = rand(1000);
        dots.push({
          x: rand(vw) - vw * 0.5,
          y: rand(vh * 2) - vh * 1.0,
          r: 1.2 + rand(2.4),
          hue: (i * 0.7) % 360,
          seed,
        });
      }
    }

    resize();
    initDots();

    // progreso de scroll para parallax
    let scrollProgress = 0;
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => (scrollProgress = self.progress),
    });

    function draw(t: number) {
      ctx.clearRect(0, 0, vw, vh * 2);

      // gradiente sutil arriba/abajo (equiv. a mask del diseño original)
      const gTop = ctx.createLinearGradient(0, 0, 0, vh * 0.15);
      gTop.addColorStop(0, "rgba(11,21,32,1)");
      gTop.addColorStop(1, "rgba(11,21,32,0)");
      ctx.fillStyle = gTop;
      ctx.fillRect(0, 0, vw, vh * 0.15);

      const gBot = ctx.createLinearGradient(0, vh * 1.85, 0, vh * 2);
      gBot.addColorStop(0, "rgba(11,21,32,0)");
      gBot.addColorStop(1, "rgba(11,21,32,1)");
      ctx.fillStyle = gBot;
      ctx.fillRect(0, vh * 1.85, vw, vh * 0.15);

      // dibuja puntos
      for (const d of dots) {
        const nx = noise(t * 0.0006, d.seed);
        const ny = noise(t * 0.0008 + 10, d.seed);

        const x = vw * 0.5 + d.x + nx * 40;
        const y = vh + d.y + ny * 40 - scrollProgress * vh * 0.6;

        ctx.beginPath();
        ctx.arc(x, y, d.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.shadowColor = `hsla(${d.hue}, 70%, 70%, .4)`;
        ctx.shadowBlur = 6;
        ctx.fillStyle = `hsla(${d.hue}, 70%, 70%, .35)`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => { resize(); initDots(); };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [desktopCount, mobileCount]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 select-none"
      style={{ transform: "translateZ(0)" }}
    >
      {/* alto 200vh para cubrir scroll de varias secciones */}
      <canvas ref={canvasRef} className="w-full h-[200vh]" />
    </div>
  );
}
