import { motion } from "framer-motion";
import techGif from "../assets/tech.gif";

/**
 * Portada centrada: el GIF se mantiene completo (contain),
 * se centra con fondo negro y no se estira.
 */
export default function HeroSplashCentered() {
  return (
    <section
      className="relative h-[100svh] md:h-[120svh] w-full overflow-hidden bg-black text-white"
      aria-label="Splash"
    >
      {/* Contenedor flex para centrar el GIF sin recortarlo */}
      <div className="absolute inset-0 grid place-items-center">
        <img
          src={techGif}
          alt="Fondo tecnológico animado"
          className="max-h-[120svh] max-w-[100vw] object-contain"
        />
      </div>

      {/* Sutil degradado para texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/60" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold md:text-6xl"
        >
          <span className="text-[#00E5FF]">Juan Pablo Vindas</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 max-w-2xl text-base text-white/85 md:text-lg"
        >
          Software Engineer · Full-Stack · Datos · Automatización
        </motion.p>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/75 hover:text-white"
      >
        <div className="flex flex-col items-center text-xs md:text-sm">
          <span>Scroll</span>
          <span className="mt-1 h-6 w-[1px] animate-pulse bg-white/70" />
        </div>
      </motion.a>
    </section>
  );
}
