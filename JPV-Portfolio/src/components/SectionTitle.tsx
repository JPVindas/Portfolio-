import { useMemo, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";               // 👈 Import correcto
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type SectionTitleProps = {
  text: string;
  align?: "center" | "left";
  accent?: string;         // color principal
  idForProgress?: string;  // id de la sección para barra de progreso
};

export default function SectionTitle({
  text,
  align = "center",
  accent = "#00E5FF",
  idForProgress,
}: SectionTitleProps) {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // Construimos spans por carácter (para stagger)
  const chars = useMemo(
    () =>
      text.split("").map((c, i) => (
        <span key={i} className="char inline-block will-change-transform">
          {c === " " ? "\u00A0" : c}
        </span>
      )),
    [text]
  );

  useLayoutEffect(() => {
    if (!titleRef.current) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const el = titleRef.current!;
      const charEls = el.querySelectorAll<HTMLSpanElement>(".char");

      // Línea: estado inicial
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center" });
      }

      // ENTRADA (sin ocultar por defecto; from con immediateRender:false)
      const tlIn = gsap.timeline({ paused: true });
      tlIn
        .from(charEls, {
          opacity: 0,
          y: 22,
          duration: reduce ? 0 : 0.6,
          ease: "power3.out",
          stagger: reduce ? 0 : 0.03,
          immediateRender: false,
        })
        .to(
          lineRef.current,
          { scaleX: 1, duration: reduce ? 0 : 0.45, ease: "power2.out" },
          0.08
        );

      // SALIDA (según dirección)
      const leaveForward = () =>
        gsap.to(charEls, {
          opacity: 0,
          y: -14,
          duration: reduce ? 0 : 0.35,
          ease: "power2.out",
          stagger: reduce ? 0 : -0.015,
        });

      const leaveBack = () =>
        gsap.to(charEls, {
          opacity: 0,
          y: 14,
          duration: reduce ? 0 : 0.35,
          ease: "power2.out",
          stagger: reduce ? 0 : 0.015,
        });

      const stTitle = ScrollTrigger.create({
        trigger: el,
        start: "top 80%",  // aparece
        end: "top 20%",    // se retira
        onEnter: () => tlIn.play(0),
        onEnterBack: () => tlIn.play(0),
        onLeave: leaveForward,
        onLeaveBack: leaveBack,
      });

      // Barra de progreso opcional de toda la sección
      let stProgress: ScrollTrigger | undefined;
      if (idForProgress && progressRef.current) {
        const container = document.getElementById(idForProgress);
        if (container) {
          gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left" });
          stProgress = ScrollTrigger.create({
            trigger: container,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
            onUpdate: (self) => {
              gsap.to(progressRef.current!, {
                scaleX: self.progress,
                duration: 0.1,
                ease: "none",
              });
            },
          });
        }
      }

      ScrollTrigger.refresh();

      return () => {
        stTitle.kill();
        stProgress?.kill();
        tlIn.kill();
        gsap.killTweensOf(charEls);
        gsap.killTweensOf(lineRef.current);
        gsap.killTweensOf(progressRef.current);
      };
    });

    return () => ctx.revert();
  }, [text, idForProgress]);

  const wrapperAlign = align === "center" ? "text-center items-center mx-auto" : "text-left";

  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(90deg, ${accent}, #67e8f9, ${accent})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };

  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : ""}`}>
      {/* Línea decorativa (se anima con GSAP) */}
      <div
        ref={lineRef}
        className={`mb-4 h-[2px] w-24 ${align === "center" ? "mx-auto" : ""}`}
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
      />

      {/* Título con gradiente y chars */}
      <h2
        ref={titleRef}
        className={`text-4xl md:text-5xl font-extrabold tracking-tight ${wrapperAlign}`}
        style={gradientStyle}
      >
        {chars}
      </h2>

      {/* Barra de progreso bajo el título */}
      <div
        className={`mt-4 h-[2px] w-36 ${align === "center" ? "mx-auto" : ""} bg-white/10 overflow-hidden rounded`}
      >
        <div
          ref={progressRef}
          className="h-full w-full"
          style={{
            background: `linear-gradient(90deg, ${accent}, transparent)`,
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
