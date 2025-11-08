// src/components/Certifications.tsx
import { motion } from "framer-motion";
import { Award, Network, Cpu, Brain, Cloud, Code, Calendar } from "lucide-react";
import { useLanguage } from "../locale/LanguageProvider";

const NEON = "#00E5FF";
const SHADOW_BASE = `0 0 6px ${NEON}25`;
const SHADOW_HOVER = `0 0 22px ${NEON}75`;

type Cert = {
  icon: JSX.Element;
  title: string;
  year: string;
  issuer: string;
  desc: string;
  category: string;
  link?: string;
};

const fadeUp = (delay = 0, y = 15) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true, margin: "-100px 0px" },
});

// Renderiza **negritas** desde el texto del diccionario sin usar dangerouslySetInnerHTML
function RichBold({ text }: { text: string }) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return (
    <>
      {parts.map((chunk, i) =>
        chunk.startsWith("**") && chunk.endsWith("**") ? (
          <strong key={i}>{chunk.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{chunk}</span>
        )
      )}
    </>
  );
}

export default function Certifications() {
  const { t } = useLanguage();

  const CERTS: Cert[] = [
    {
      icon: <Cloud size={20} className="text-white" />,
      title: t("c1_title", "certifications"),
      year: t("c1_year", "certifications"),
      issuer: t("c1_issuer", "certifications"),
      desc: t("c1_desc", "certifications"),
      category: t("cat_ai_cloud", "certifications"),
    },
    {
      icon: <Brain size={20} className="text-white" />,
      title: t("c2_title", "certifications"),
      year: t("c2_year", "certifications"),
      issuer: t("c2_issuer", "certifications"),
      desc: t("c2_desc", "certifications"),
      category: t("cat_ai_cloud", "certifications"),
    },
    {
      icon: <Code size={20} className="text-white" />,
      title: t("c3_title", "certifications"),
      year: t("c3_year", "certifications"),
      issuer: t("c3_issuer", "certifications"),
      desc: t("c3_desc", "certifications"),
      category: t("cat_sw_dev", "certifications"),
    },
    {
      icon: <Network size={20} className="text-white" />,
      title: t("c4_title", "certifications"),
      year: t("c4_year", "certifications"),
      issuer: t("c4_issuer", "certifications"),
      desc: t("c4_desc", "certifications"),
      category: t("cat_net_infra", "certifications"),
    },
    {
      icon: <Award size={20} className="text-white" />,
      title: t("c5_title", "certifications"),
      year: t("c5_year", "certifications"),
      issuer: t("c5_issuer", "certifications"),
      desc: t("c5_desc", "certifications"),
      category: t("cat_methodology", "certifications"),
    },
    {
      icon: <Cpu size={20} className="text-white" />,
      title: t("c6_title", "certifications"),
      year: t("c6_year", "certifications"),
      issuer: t("c6_issuer", "certifications"),
      desc: t("c6_desc", "certifications"),
      category: t("cat_net_infra", "certifications"),
    },
    {
      icon: <Network size={20} className="text-white" />,
      title: t("c7_title", "certifications"),
      year: t("c7_year", "certifications"),
      issuer: t("c7_issuer", "certifications"),
      desc: t("c7_desc", "certifications"),
      category: t("cat_net_infra", "certifications"),
    },
  ];

  const hasLonelyLastItem = CERTS.length % 3 === 1 && CERTS.length > 3;
  const cutoff = hasLonelyLastItem ? CERTS.length - 1 : CERTS.length;

  return (
    <section
      id="certifications"
      className="relative mx-auto max-w-6xl px-6 py-24 text-white"
      aria-labelledby="certifications-title"
    >
      {/* Title */}
      <motion.h2
        id="certifications-title"
        {...fadeUp(0)}
        className="mb-12 text-center text-4xl font-extrabold tracking-tight md:text-5xl"
      >
        <span
          className="bg-gradient-to-r from-[#00E5FF] via-cyan-300 to-[#00E5FF] bg-clip-text text-transparent"
          style={{ textShadow: `0 0 8px ${NEON}55` }}
        >
          {t("title", "certifications")}
        </span>
      </motion.h2>

      {/* Intro traducida (usa certifications.intro) */}
      <motion.p
        {...fadeUp(0.08)}
        className="mx-auto mb-14 max-w-3xl text-center text-white/80 leading-relaxed"
      >
        <RichBold text={t("intro", "certifications")} />
      </motion.p>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {CERTS.slice(0, cutoff).map((cert, i) => (
          <CertCard key={`${cert.title}-${i}`} cert={cert} i={i} />
        ))}
      </div>

      {/* Center last if leftover */}
      {hasLonelyLastItem && (
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-sm">
            <CertCard cert={CERTS[CERTS.length - 1]} i={cutoff} />
          </div>
        </div>
      )}

      {/* Closing */}
      <motion.p
        {...fadeUp(0.5, 10)}
        className="mx-auto mt-14 max-w-4xl text-center text-base italic text-white/60"
      >
        {t("closing", "certifications")}
      </motion.p>
    </section>
  );
}

type CertCardProps = { cert: Cert; i: number };

function CertCard({ cert, i }: CertCardProps) {
  return (
    <motion.article
      {...fadeUp(0.1 + i * 0.06)}
      className="group relative flex min-h-[340px] flex-col justify-between rounded-xl border border-white/10 bg-[#0B1520]/60 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-transparent hover:bg-[#0B1520]/90"
      style={{ boxShadow: SHADOW_BASE }}
    >
      {/* Neon side bar */}
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-transparent transition-colors duration-300 group-hover:bg-[#00E5FF]" />

      <header className="mb-4 flex items-start gap-4">
        <div
          className="grid h-10 w-10 place-items-center rounded-lg ring-1 ring-white/10 transition-all duration-300 group-hover:ring-[#00E5FF]"
          style={{ backgroundColor: "rgba(0,0,0,0.45)", boxShadow: SHADOW_BASE }}
          aria-hidden
        >
          {cert.icon}
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#00E5FF]">
            {cert.title}
          </h3>
          <p className="text-sm font-medium text-white/70">{cert.issuer}</p>
        </div>
      </header>

      <div className="flex-1">
        <p className="text-sm leading-relaxed text-white/75">
          <span className="font-semibold">{cert.desc}</span>
        </p>
      </div>

      <footer className="mt-4 flex items-center justify-between border-t border-white/10 pt-2">
        <span className="text-xs font-semibold text-white/50">
          {cert.category}
        </span>
        <span className="flex items-center gap-1 text-xs font-bold text-[#00E5FF]">
          <Calendar size={12} /> {cert.year}
        </span>
      </footer>

      {/* Hover glow */}
      <style>{`.group:hover { box-shadow: ${SHADOW_HOVER}; }`}</style>
    </motion.article>
  );
}
