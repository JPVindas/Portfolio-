import { useEffect, useMemo, useRef } from "react";
import { ensureGsap, gsap } from "../lib/gsapSetup";

const NEON = "#00E5FF";

type Props = {
  title: string;
  as?: keyof JSX.IntrinsicElements;    // h2 por defecto
  className?: string;
};

export default function SectionTitleGSAP({ title, as = "h2", className = "" }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const chars = useMemo(() => title.split(""), [title]);

  useEffect(() => {
    ensureGsap();
    const ctx = gsap.context(() => {
      const el = rootRef.current!;
      const letters = el.querySelectorAll<HTMLElement>("[data-char]");
      const underline = el.querySelector<HTMLElement>("[data-underline]");

      // Línea aparece primero (escala X)
      gsap.fromTo(
        underline,
        { scaleX: 0, transformOrigin: "center" },
        {
          scaleX: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        }
      );

      // Letras entran con stagger tipo “reveal”
      gsap.fromTo(
        letters,
        { yPercent: 140, opacity: 0, rotateX: 30 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.035,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );

      // Shimmer/Glow suave cuando el título queda centrado
      gsap.to(el, {
        "--glow": 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      // Parallax MUY suave del bloque completo
      gsap.fromTo(
        el,
        { y: 10 },
        {
          y: -10,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const Tag = as as any;

  return (
    <div ref={rootRef} className={`relative select-none ${className}`}>
      {/* línea superior sutil */}
      <div
        data-underline
        className="mx-auto mb-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
      />
      <Tag
        className="text-center text-4xl md:text-5xl font-extrabold tracking-tight 
                   [text-shadow:0_0_calc(var(--glow,0)*10px)_#00E5FF]"
        style={{ color: "transparent", backgroundImage: `linear-gradient(90deg, ${NEON}, #b2ffff, ${NEON})`, WebkitBackgroundClip: "text" }}
        aria-label={title}
      >
        {/* Cada carácter envuelto para animarlo */}
        {chars.map((c, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span data-char className="inline-block will-change-transform">
              {c === " " ? "\u00A0" : c}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
