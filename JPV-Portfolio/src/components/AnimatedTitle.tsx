import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

type Mode = "chars" | "words" | "lines";

interface AnimatedTitleProps {
  text: string;
  className?: string;
  mode?: Mode;
  delay?: number;
  stagger?: number;
  duration?: number;
}

export default function AnimatedTitle({
  text,
  className = "",
  mode = "chars",
  delay = 0.1,
  stagger = 0.035,
  duration = 0.7,
}: AnimatedTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // SSR / tests guard
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Split sin espacios (o como array) para evitar error de tipos
    const split = new SplitType(el, {
      types: "words,chars,lines",
      tagName: "span",
    });

    const targets =
      mode === "chars" ? split.chars :
      mode === "words" ? split.words :
      split.lines;

    if (!targets || targets.length === 0) {
      // si no hay nada que animar, revert y salir
      split.revert();
      return;
    }

    // Usar gsap.context para aislamiento y safe cleanup en StrictMode
    const ctx = gsap.context(() => {
      gsap.set(targets, {
        willChange: "transform, opacity",
        transformOrigin: "50% 100%",
        display: "inline-block",
      });

      gsap.from(targets, {
        opacity: reduce ? 1 : 0,
        yPercent: reduce ? 0 : 110,
        rotateX: reduce ? 0 : -35,
        ease: "power3.out",
        duration: reduce ? 0.001 : duration,
        stagger: reduce ? 0 : stagger,
        delay: reduce ? 0 : delay,
        clearProps: "transform,opacity",
      });
    }, el); // scope al nodo del título

    // Limpieza robusta
    return () => {
      ctx.revert();   // revierte animaciones/sets dentro del contexto
      split.revert(); // devuelve el DOM a su estado original
    };
  }, [mode, delay, stagger, duration, text]);

  return (
    <h1 ref={ref} className={className}>
      {text}
    </h1>
  );
}
