// src/components/AboutMini.tsx
import { motion } from "framer-motion";
import { Code, Database, Sparkles, Layers3 } from "lucide-react";
import { useLanguage } from "../locale/LanguageProvider";

const NEON = "#00E5FF";

const fadeUp = (delay = 0, y = 18) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true, margin: "-100px 0px" },
});

export default function AboutMini() {
  const { t, lang } = useLanguage();

  const CORE_STRENGTHS = [
    {
      icon: <Code size={28} className="text-white group-hover:text-black" />,
      title: t("card_frontend_title", "aboutmini"),
      text: t("card_frontend_text", "aboutmini"),
    },
    {
      icon: <Database size={28} className="text-white group-hover:text-black" />,
      title: t("card_backend_title", "aboutmini"),
      text: t("card_backend_text", "aboutmini"),
    },
    {
      icon: <Sparkles size={28} className="text-white group-hover:text-black" />,
      title: t("card_automation_title", "aboutmini"),
      text: t("card_automation_text", "aboutmini"),
    },
    {
      icon: <Layers3 size={28} className="text-white group-hover:text-black" />,
      title: t("card_devops_title", "aboutmini"),
      text: t("card_devops_text", "aboutmini"),
    },
  ];

  const TECH_CHIPS = [
    t("chip_csharp", "aboutmini"),
    t("chip_go", "aboutmini"),
    t("chip_python", "aboutmini"),
    t("chip_tsreact", "aboutmini"),
    t("chip_node", "aboutmini"),
    t("chip_sql", "aboutmini"),
    t("chip_mongo", "aboutmini"),
    t("chip_docker", "aboutmini"),
    t("chip_cicd", "aboutmini"),
    t("chip_testing", "aboutmini"),
  ];

  return (
    <section
      key={`aboutmini-${lang}`}
      id="about-mini"
      aria-labelledby="about-title"
      className="relative mx-auto max-w-6xl px-6 py-24 text-white"
    >
      {/* Glow decor */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-10 h-48 w-48 rounded-full bg-[#00E5FF]/10 blur-3xl" />
        <div className="absolute right-[8%] top-28 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {/* Title */}
      <motion.h2
        id="about-title"
        {...fadeUp(0)}
        className="text-center text-4xl font-extrabold tracking-tight md:text-5xl"
      >
        <span className="bg-gradient-to-r from-[#00E5FF] via-cyan-300 to-[#00E5FF] bg-clip-text text-transparent">
          {t("value_title", "aboutmini")}
        </span>
      </motion.h2>

      {/* Intro */}
      <motion.p
        {...fadeUp(0.1)}
        className="mx-auto mt-5 max-w-4xl text-center text-xl leading-relaxed text-white/85"
      >
        {t("intro_prefix", "aboutmini")}{" "}
        <span className="font-semibold text-[#00E5FF]">Juan Pablo Vindas</span>
        {t("intro_middle", "aboutmini")}{" "}
        <strong>{t("intro_fullstack", "aboutmini")}</strong>.{" "}
        {t("intro_suffix", "aboutmini")}{" "}
        <strong>{t("intro_scalable", "aboutmini")}</strong>,{" "}
        {t("intro_elegant", "aboutmini")} {t("intro_quality", "aboutmini")}
      </motion.p>

      {/* Tech chips */}
      <motion.div {...fadeUp(0.2)} className="mx-auto mt-8 max-w-4xl">
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm font-medium">
          {TECH_CHIPS.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/75 transition hover:border-[#00E5FF] hover:text-white"
              style={{ boxShadow: `0 0 6px ${NEON}1A` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Feature cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CORE_STRENGTHS.map((item, index) => (
          <motion.article
            key={`${item.title}-${index}`}
            {...fadeUp(0.25 + index * 0.08)}
            className="group relative rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm
                       transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_#00E5FF80] hover:bg-[#00E5FF] hover:text-black"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-black/40 ring-1 ring-white/10 transition group-hover:bg-black/10">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold transition group-hover:text-black">
                {item.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70 transition group-hover:text-black/80">
              {item.text}
            </p>
            <div className="mt-4 h-px w-24 origin-left scale-x-0 bg-gradient-to-r from-black/60 to-transparent opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
          </motion.article>
        ))}
      </div>

      {/* Closing line */}
      <motion.p
        {...fadeUp(0.6, 10)}
        className="mx-auto mt-14 max-w-4xl text-center text-base md:text-lg text-white/55 italic"
      >
        {t("closing_quote", "aboutmini")}
      </motion.p>
    </section>
  );
}
