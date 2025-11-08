// src/components/Section.tsx
import React, { ReactNode, useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionProps = {
  id?: string;
  /** Puede ser string (con animación por letra) o ReactNode (sin split) */
  title?: string | ReactNode;
  /** Subtítulo opcional; acepta string o ReactNode */
  subtitle?: string | ReactNode;
  /** Color de acento para gradiente/indicadores */
  accent?: string;
  /** Fijar el bloque de título durante el scroll */
  stickyTitle?: boolean;
  /** Mostrar barra de progreso de lectura de la sección */
  showProgress?: boolean;
  /** Nivel semántico del heading (por accesibilidad/SEO) */
  headingLevel?: "h1" | "h2" | "h3";
  /** Clases extras para el <section> contenedor */
  className?: string;
  children?: ReactNode;
};

export default function Section({
  id,
  title,
  subtitle,
  accent = "#00E5FF",
  stickyTitle = false,
  showProgress = true,
  headingLevel = "h2",
  className = "",
  children,
}: SectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingWrapRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  // Si el título es string, lo segmentamos en grafemas; si es ReactNode, no hay split/animación per-char.
  const isTitleString = typeof title === "string";

  // Segmentación segura para acentos/emojis
  const letters = useMemo(() => {
    if (!isTitleString || !title) return [];
    try {
      // Grapheme aware split (si el navegador soporta)
      // @ts-expect-error: Intl.Segmenter puede no existir en tipos antiguos
      const seg = typeof Intl !== "undefined" && Intl.Segmenter ? new Intl.Segmenter(undefined, { granularity: "grapheme" }) : null;
      if (seg) {
        
        return Array.from(seg.segment(title as string), (s: any) => s.segment as string);
      }
    } catch {}
    // Fallback
    return (title as string).split("");
  }, [title, isTitleString]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return; // SSR safe
    if (!titleRef.current || !sectionRef.current) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // Si reduce está activado o el título NO es string (ReactNode), no iniciamos animación per-char
    if (reduce || !isTitleString) {
      // Aún así inicializamos la línea/progreso para que se vean
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 1, transformOrigin: "center" });
      }
      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left" });
        if (showProgress) {
          ScrollTrigger.create({
            trigger: sectionRef.current!,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
            onUpdate: (self) => {
              gsap.to(progressRef.current!, { scaleX: self.progress, duration: 0.1, ease: "none" });
            },
          });
        }
      }
      // Parallax suave del glow
      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { y: 20, opacity: 0.7 },
          {
            y: -15,
            opacity: 0.9,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
      // Sticky opcional
      if (stickyTitle && headingWrapRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current!,
          start: "top top+=80",
          end: "bottom top+=120",
          pin: headingWrapRef.current,
          pinSpacing: true,
        });
      }
      return;
    }

    // Animación completa (no reduced motion y título string)
    const ctx = gsap.context(() => {
      const el = titleRef.current!;
      const sec = sectionRef.current!;
      const chars = el.querySelectorAll<HTMLSpanElement>(".char");
      const charsBase = el.querySelectorAll<HTMLSpanElement>(".char-base");

      // Línea decorativa
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center" });
      }

      // Entrada del título
      const tlIn = gsap.timeline({ paused: true });
      tlIn
        .from(chars, {
          opacity: 0,
          y: 22,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.03,
          immediateRender: false,
        })
        .from(
          charsBase,
          {
            opacity: 0.35,
            duration: 0.6,
            ease: "power1.out",
            immediateRender: false,
          },
          0
        )
        .to(
          lineRef.current,
          { scaleX: 1, duration: 0.45, ease: "power2.out" },
          0.08
        );

      // Salida al dejar viewport
      const leaveForward = () =>
        gsap.to([chars, charsBase], {
          opacity: 0,
          y: -14,
          duration: 0.35,
          ease: "power2.out",
          stagger: -0.015,
        });
      const leaveBack = () =>
        gsap.to([chars, charsBase], {
          opacity: 0,
          y: 14,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.015,
        });

      // Trigger del título
      const stTitle = ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        end: "top 20%",
        onEnter: () => tlIn.play(0),
        onEnterBack: () => tlIn.play(0),
        onLeave: leaveForward,
        onLeaveBack: leaveBack,
      });

      // Gradiente vivo sobre el título
      const gradTarget = el.querySelector<HTMLSpanElement>(".title-gradient");
      if (gradTarget) {
        gsap.set(gradTarget, { backgroundSize: "200% 100%" });
        ScrollTrigger.create({
          trigger: sec,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const pos = 50 + (self.progress - 0.5) * 60; // -10% a 110% aprox.
            gsap.to(gradTarget, { backgroundPosition: `${pos}% 50%`, duration: 0.1, ease: "none" });
          },
        });
      }

      // Progreso
      let stProgress: ScrollTrigger | null = null;
      if (showProgress && progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left" });
        stProgress = ScrollTrigger.create({
          trigger: sec,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
          onUpdate: (self) => {
            gsap.to(progressRef.current!, { scaleX: self.progress, duration: 0.1, ease: "none" });
          },
        });
      }

      // Glow parallax
      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { y: 30, opacity: 0.6 },
          {
            y: -20,
            opacity: 0.9,
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Sticky
      let stSticky: ScrollTrigger | null = null;
      if (stickyTitle && headingWrapRef.current) {
        stSticky = ScrollTrigger.create({
          trigger: sec,
          start: "top top+=80",
          end: "bottom top+=120",
          pin: headingWrapRef.current,
          pinSpacing: true,
        });
      }

      ScrollTrigger.refresh();

      return () => {
        stTitle.kill();
        stProgress?.kill();
        stSticky?.kill();
        tlIn.kill();
        gsap.killTweensOf([
          chars,
          charsBase,
          lineRef.current,
          progressRef.current,
          glowRef.current,
        ]);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [accent, isTitleString, letters.length, showProgress, stickyTitle, title]);

  // Render del heading con doble capa SOLO si title es string; si es ReactNode lo rendereamos tal cual.
  const HeadingTag = headingLevel;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative overflow-hidden bg-[#0B1520] py-24 text-white ${className}`}
    >
      {/* Glow decorativo de fondo con parallax */}
      <div ref={glowRef} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#00E5FF]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {(title || subtitle) && (
          <div
            ref={headingWrapRef}
            className={`mb-12 ${stickyTitle ? "md:backdrop-blur-sm" : ""}`}
          >
            {/* Línea decorativa (animada) */}
            <div
              ref={lineRef}
              className="mx-auto mb-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"
            />

            {/* Título */}
            {title && (
              <HeadingTag
                ref={titleRef as React.RefObject<HTMLHeadingElement>}
                className="relative inline-block text-4xl font-extrabold tracking-tight md:text-5xl"
              >
                {isTitleString ? (
                  <>
                    {/* Capa base blanca siempre visible */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 select-none text-white/90"
                    >
                      {letters.map((c, i) => (
                        <span key={`base-${i}`} className="char-base inline-block">
                          {c === " " ? "\u00A0" : c}
                        </span>
                      ))}
                    </span>

                    {/* Capa superior con gradiente */}
                    <span
                      className="title-gradient bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${accent}, #7be3ff, ${accent})`,
                        backgroundSize: "200% 100%",
                        backgroundPosition: "50% 50%",
                      }}
                    >
                      {letters.map((c, i) => (
                        <span key={`fg-${i}`} className="char inline-block will-change-transform">
                          {c === " " ? "\u00A0" : c}
                        </span>
                      ))}
                    </span>
                  </>
                ) : (
                  // Si title es ReactNode, lo pintamos sin split
                  <>{title}</>
                )}
              </HeadingTag>
            )}

            {/* Subtítulo (string o ReactNode) */}
            {subtitle && (
              <div className="mt-3 text-white/70 text-base md:text-lg">
                {typeof subtitle === "string" ? <p>{subtitle}</p> : subtitle}
              </div>
            )}

            {/* Barra de progreso (opcional) */}
            {showProgress && (
              <div className="mx-auto mt-5 h-[2px] w-36 overflow-hidden rounded bg-white/10">
                <div
                  ref={progressRef}
                  className="h-full w-full"
                  style={{
                    background: `linear-gradient(90deg, ${accent}, transparent)`,
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Contenido */}
        <div>{children}</div>
      </div>
    </section>
  );
}
