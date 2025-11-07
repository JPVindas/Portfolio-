import { motion } from "framer-motion";
import techGif from "../assets/tech.gif";

export default function HeroSplashTall() {
  return (
    <section
      className="relative min-h-[130svh] overflow-hidden bg-black"
      aria-label="Splash"
      style={{
        backgroundImage: `url(${techGif})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black" />
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 hover:text-white"
        aria-label="Desplazarse a la siguiente sección"
      >
        <div className="flex flex-col items-center text-sm">
          <span>Scroll</span>
          <span className="mt-1 h-6 w-[1px] animate-pulse bg-white/70" />
        </div>
      </motion.a>
    </section>
  );
}
