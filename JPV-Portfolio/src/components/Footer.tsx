// src/components/Footer.tsx
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Globe } from "lucide-react";
import { useLanguage } from "../locale/LanguageProvider";

const NEON = "#00E5FF";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-white/10 bg-[#050B12]/95 backdrop-blur-md">
      {/* --- Fondo decorativo con brillo --- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-24 w-24 rounded-full bg-[#00E5FF]/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-20 w-20 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {/* --- Contenido principal --- */}
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-center text-white/70 md:flex-row md:gap-8 md:text-left">
        {/* Marca personal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center md:items-start"
        >
          <h3
            className="text-base font-bold tracking-tight text-white"
            style={{ textShadow: `0 0 6px ${NEON}50` }}
          >
            {t("footer.name")}
          </h3>
          <p className="text-xs text-white/60">{t("footer.role")}</p>
        </motion.div>

        {/* Enlaces sociales */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-white/70"
        >
          <a
            href="https://www.linkedin.com/in/juan-pablo-vindas-suarez-00b857277/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 transition hover:text-[#00E5FF]"
            aria-label={t("footer.linkedin")}
            title={t("footer.linkedin")}
          >
            <Linkedin size={15} />
            {t("footer.linkedin")}
          </a>
          <a
            href="https://github.com/JPVindas"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 transition hover:text-[#00E5FF]"
            aria-label={t("footer.github")}
            title={t("footer.github")}
          >
            <Github size={15} />
            {t("footer.github")}
          </a>
          <a
            href="mailto:juanpablo.vindass@gmail.com"
            className="flex items-center gap-2 transition hover:text-[#00E5FF]"
            aria-label={t("footer.contact")}
            title={t("footer.contact")}
          >
            <Mail size={15} />
            {t("footer.contact")}
          </a>
          <a
            href="https://juanpablo-vindas.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 transition hover:text-[#00E5FF]"
            aria-label={t("footer.portfolio")}
            title={t("footer.portfolio")}
          >
            <Globe size={15} />
            {t("footer.portfolio")}
          </a>
        </motion.div>

        {/* Créditos */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[11px] text-white/50"
        >
          © {new Date().getFullYear()} · {t("footer.developed_by")}{" "}
          <span className="font-semibold text-[#00E5FF]">JPV</span>{" "}
          {t("footer.stack")}.
        </motion.div>
      </div>

      {/* Línea decorativa inferior */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mx-auto h-[1px] w-1/4 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"
      />
    </footer>
  );
}
