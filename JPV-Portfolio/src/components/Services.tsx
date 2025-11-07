// src/components/Services.tsx
import { motion } from "framer-motion";
import {
  Code, Cpu, Network, Database,
  Sparkles, ShieldCheck, Gauge, ArrowRight
} from "lucide-react";
import { useLanguage } from "../locale/LanguageProvider";

const fadeUp = (delay = 0, y = 18) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" },
  viewport: { once: true, margin: "-120px 0px" },
});

export default function Services() {
  const { t, lang } = useLanguage();

  const services = [
    {
      icon: <Code size={28} />,
      title: t("service_1_title", "services"),
      desc: t("service_1_desc", "services"),
      bullets: [
        t("service_1_bullet_1", "services"),
        t("service_1_bullet_2", "services"),
        t("service_1_bullet_3", "services"),
      ],
      chips: ["React", "TypeScript", "ASP.NET Core", "Tailwind", "Vite"],
      anchor: "#projects",
    },
    {
      icon: <Cpu size={28} />,
      title: t("service_2_title", "services"),
      desc: t("service_2_desc", "services"),
      bullets: [
        t("service_2_bullet_1", "services"),
        t("service_2_bullet_2", "services"),
        t("service_2_bullet_3", "services"),
      ],
      chips: ["Gemini API", "Python", "FastAPI", "ETL", "LLM Ops (basic)"],
      anchor: "#projects",
    },
    {
      icon: <Network size={28} />,
      title: t("service_3_title", "services"),
      desc: t("service_3_desc", "services"),
      bullets: [
        t("service_3_bullet_1", "services"),
        t("service_3_bullet_2", "services"),
        t("service_3_bullet_3", "services"),
      ],
      chips: ["Azure", "AWS", "Docker (basic)", "Nginx", "GitHub Actions"],
      anchor: "#contact",
    },
    {
      icon: <Database size={28} />,
      title: t("service_4_title", "services"),
      desc: t("service_4_desc", "services"),
      bullets: [
        t("service_4_bullet_1", "services"),
        t("service_4_bullet_2", "services"),
        t("service_4_bullet_3", "services"),
      ],
      chips: ["PostgreSQL", "MySQL", "MongoDB", "Pandas", "Power BI"],
      anchor: "#projects",
    },
  ];

  return (
    <section
      key={`services-${lang}`}
      id="services"
      aria-labelledby="services-title"
      className="relative mx-auto max-w-6xl px-6 py-24 text-white"
    >
      {/* Glow decorativo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-6 h-40 w-40 rounded-full bg-[#00E5FF]/10 blur-3xl" />
        <div className="absolute right-[10%] top-24 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {/* Header */}
      <motion.div {...fadeUp(0)} className="mx-auto mb-12 max-w-3xl text-center">
        <h2
          id="services-title"
          className="text-4xl font-extrabold tracking-tight md:text-5xl"
        >
          <span className="bg-gradient-to-r from-[#00E5FF] via-cyan-300 to-[#00E5FF] bg-clip-text text-transparent">
            {t("title", "services")}
          </span>
        </h2>
        <p className="mt-4 text-white/80">
          {t("subtitle", "services")}
        </p>
      </motion.div>

      {/* Grid con tarjetas uniformes */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <motion.article
            key={s.title}
            {...fadeUp(0.12 + i * 0.06)}
            className="
              group relative flex h-full min-h-[520px] flex-col rounded-2xl
              border border-white/10 bg-[#0B1520]/60 p-6 backdrop-blur-sm
              transition-all duration-300 hover:-translate-y-1
              hover:border-[#00E5FF]/40 hover:bg-[#0B1520]/80
              hover:shadow-[0_0_24px_rgba(0,229,255,0.35)]
            "
          >
            <div className="flex flex-1 flex-col">
              {/* Badge */}
              <div className="mb-4 flex items-center gap-2 text-xs text-white/50">
                <Gauge size={14} />
                <span>{t("badge_ready", "services")}</span>
              </div>

              {/* Icono + título */}
              <div className="mb-3 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#00E5FF]/15 ring-1 ring-[#00E5FF]/30 transition-colors group-hover:bg-[#00E5FF]/25">
                  <span className="text-[#00E5FF]">{s.icon}</span>
                </div>
                <h3 className="text-lg font-bold">{s.title}</h3>
              </div>

              {/* Descripción */}
              <p className="text-sm leading-relaxed text-white/75">{s.desc}</p>

              {/* Bullets */}
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <ShieldCheck
                      size={16}
                      className="mt-0.5 shrink-0 text-[#00E5FF]"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Chips */}
              <div className="mt-5 flex flex-wrap gap-2">
                {s.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75 transition group-hover:border-[#00E5FF]/40"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6" />
            </div>

            {/* CTA */}
            <a
              href={s.anchor}
              className="
                inline-flex w-full items-center justify-center gap-2
                rounded-lg border border-[#00E5FF]/40 bg-[#00E5FF]
                px-4 py-2.5 text-sm font-semibold text-[#0D1B2A]
                transition hover:border-[#00E5FF] hover:bg-[#1bdfff]
                focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/60
              "
            >
              {t("cta_more", "services")}
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#0D1B2A] text-[#00E5FF]">
                <ArrowRight size={14} />
              </span>
            </a>

            <Sparkles
              size={18}
              className="pointer-events-none absolute right-4 top-4 text-[#00E5FF]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
