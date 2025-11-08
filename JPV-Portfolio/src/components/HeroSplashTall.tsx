import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import techGif from "../assets/tech.gif";
import AnimatedTitle from "./AnimatedTitle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "../locale/LanguageProvider";

export default function HeroSplashTall() {
  const { t, /* opcional: lang */ } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1, 1.06]);
  const bgBlur  = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0px","0px"] : ["0px","6px"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.85], [1, prefersReduced ? 1 : 0]);
  const titleY  = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, -50]);
  const subY    = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, -30]);

  return (
    <section ref={sectionRef} className="relative h-screen w-screen overflow-hidden bg-black text-white" aria-label="Portada">
      {/* Botón idioma */}
      <div className="absolute top-6 right-6 z-50">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.4 }}>
          <LanguageToggle />
        </motion.div>
      </div>

      {/* Fondo */}
      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ scale: bgScale, filter: bgBlur, opacity: fadeOut }}>
        <img src={techGif} alt="Fondo tecnológico animado" className="max-h-[85vh] w-auto object-contain object-center" decoding="async" loading="eager" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80" />

      {/* Contenido */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div style={{ y: titleY, opacity: fadeOut }}>
          {/* 👇 El key fuerza que AnimatedTitle se remonte cuando cambia el texto */}
          <AnimatedTitle
            key={t("title","home")}
            text={t("title","home")}
            className="text-5xl font-extrabold leading-tight text-[#00E5FF] md:text-7xl"
          />
        </motion.div>

        <motion.p
          style={{ y: subY, opacity: fadeOut }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 max-w-2xl text-lg text-white/85 md:text-xl"
        >
          {t("subtitle","home")}
        </motion.p>

        <motion.div
          style={{ opacity: fadeOut }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
          aria-label="Acciones principales"
        >
          <a
            href="#about"
            className="rounded-2xl bg-[#00E5FF] px-6 py-3 font-semibold text-[#0D1B2A] shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70"
          >
            {t("about","common")}
          </a>
          <a
            href="#projects"
            className="rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white/90 backdrop-blur-sm transition hover:bg白/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {t("projects","common")}
          </a>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.95, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/75 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/60"
        aria-label={t("aria_next","common")}
      >
        <div className="flex flex-col items-center text-xs md:text-sm">
          <span>{t("scroll","common")}</span>
          <motion.span
            className="mt-1 h-7 w-[1px] bg-white/70"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ repeat: Infinity, repeatDelay: 0.6, duration: 0.8, ease: "easeInOut" }}
            style={{ originY: 0 }}
          />
        </div>
      </motion.a>
    </section>
  );
}
