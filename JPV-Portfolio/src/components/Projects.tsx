import { motion } from "framer-motion";
import { Bot, Activity, Building2, Database, Github, Link2 } from "lucide-react";
import { useLanguage } from "../locale/LanguageProvider";

const NEON = "#00E5FF";

type Project = {
  icon: JSX.Element;
  title: string;
  subtitle?: string;
  description: string;
  stack: string[];
  highlights: string[];
  demoUrl?: string;
  repoUrl?: string;
  image?: string;
};

const fadeUp = (delay = 0, y = 16) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" },
  viewport: { once: true, margin: "-80px 0px" },
});

export default function Projects() {
  const { t } = useLanguage();

  const projects: Project[] = [
    {
      icon: <Bot size={22} className="text-white" />,
      title: t("p1_title", "projects"),
      subtitle: t("p1_subtitle", "projects"),
      description: t("p1_desc", "projects"),
      stack: ["Python", "Gemini API", "Pandas", "NumPy", "FastAPI/Flask", "Embeddings/RAG"],
      highlights: [t("p1_h1", "projects"), t("p1_h2", "projects"), t("p1_h3", "projects")],
      // demoUrl: "https://tu-demo.com",
      // repoUrl: "https://github.com/juanpv/tu-repo-gemini-analyst",
    },
    {
      icon: <Building2 size={22} className="text-white" />,
      title: t("p2_title", "projects"),
      subtitle: t("p2_subtitle", "projects"),
      description: t("p2_desc", "projects"),
      stack: ["C#", "ASP.NET MVC", "MySQL", "Entity Framework", "Razor", "X.PagedList"],
      highlights: [t("p2_h1", "projects"), t("p2_h2", "projects"), t("p2_h3", "projects")],
      // demoUrl: "https://clinica-demo.com",
      // repoUrl: "https://github.com/juanpv/clinica-dental",
    },
    {
      icon: <Activity size={22} className="text-white" />,
      title: t("p3_title", "projects"),
      subtitle: t("p3_subtitle", "projects"),
      description: t("p3_desc", "projects"),
      stack: ["Jotform/Forms", "ETL", "Google Sheets", "Dashboards", "Apps Script"],
      highlights: [t("p3_h1", "projects"), t("p3_h2", "projects"), t("p3_h3", "projects")],
      // demoUrl: "https://guardianes-dashboard.com",
      // repoUrl: "https://github.com/juanpv/guardianes-analytics",
    },
  ];

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-24 text-white">
      {/* Title */}
      <motion.h2
        {...fadeUp(0)}
        className="mb-10 text-center text-4xl font-extrabold tracking-tight md:text-5xl"
      >
        <span className="bg-gradient-to-r from-[#00E5FF] via-cyan-300 to-[#00E5FF] bg-clip-text text-transparent">
          {t("title", "projects")}
        </span>
      </motion.h2>

      {/* Optional intro (usa la clave 'intro' si quieres mostrarla) */}
      {/* 
      <motion.p {...fadeUp(0.06)} className="mx-auto mb-8 max-w-3xl text-center text-white/80">
        {t("intro", "projects")}
      </motion.p>
      */}

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, idx) => (
          <motion.article
            key={p.title}
            {...fadeUp(0.1 + idx * 0.08)}
            className="group relative flex flex-col rounded-xl border border-white/10 bg-[#0B1520]/60 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-transparent hover:bg-[#0B1520]/90"
            style={{ boxShadow: `0 0 8px ${NEON}20` }}
          >
            {/* Accent bar */}
            <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-transparent transition-colors duration-300 group-hover:bg-[#00E5FF]" />

            {/* Header */}
            <div className="mb-4 flex items-start gap-3">
              <div
                className="grid h-10 w-10 place-items-center rounded-lg ring-1 ring-white/10"
                style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
              >
                {p.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold leading-tight transition-colors group-hover:text-[#00E5FF]">
                  {p.title}
                </h3>
                {p.subtitle && <p className="text-sm text-white/60">{p.subtitle}</p>}
              </div>
            </div>

            {/* Description */}
            <p className="mb-4 text-sm leading-relaxed text-white/80">{p.description}</p>

            {/* Stack chips */}
            <div className="mb-3 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Highlights */}
            <ul className="mb-5 list-disc space-y-1 pl-5 text-sm text-white/70">
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            {/* Actions */}
            <div className="mt-auto flex gap-3 pt-2">
              {p.demoUrl && (
                <a
                  href={p.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#00E5FF] px-3 py-2 text-sm font-semibold text-[#0B1520] hover:opacity-90"
                >
                  <Link2 size={16} /> {t("cta_demo", "projects")}
                </a>
              )}
              {p.repoUrl && (
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-white/85 hover:bg-white/10"
                >
                  <Github size={16} /> {t("cta_repo", "projects")}
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        {...fadeUp(0.4)}
        className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-sm text-white/70"
      >
        <Database size={16} />
        <span>{t("bottom_cta", "projects")}</span>
      </motion.div>
    </section>
  );
}
