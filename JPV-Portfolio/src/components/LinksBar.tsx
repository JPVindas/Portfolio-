// src/components/LinksBar.tsx
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, ArrowUpRight, FileText } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useLanguage } from "../locale/LanguageProvider";

// --- Constantes y estilos ---
const NEON = "#00E5FF";
const GLOW_BASE = `0 0 10px ${NEON}24`;
const GLOW_HOVER = `0 0 34px ${NEON}90`;

// --- Animaciones ---
const container = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (reduced: boolean) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: reduced ? 0 : 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: reduced ? 0 : 0.12,
    },
  }),
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: (reduced: boolean) => ({
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0 : 0.5, ease: "easeOut" },
  }),
};

// Normaliza dropbox ?dl=0/1
function normalizeDropboxUrl(base: string, dl: "0" | "1"): string {
  try {
    const u = new URL(base);
    u.searchParams.set("dl", dl);
    return u.toString();
  } catch {
    const baseNoDl = base
      .replace(/([?&])dl=\d(&?)/g, (_m, prefix, suffix) => (suffix ? prefix : ""))
      .replace(/[?&]$/, "");
    const sep = baseNoDl.includes("?") ? "&" : "?";
    return `${baseNoDl}${sep}dl=${dl}`;
  }
}

/* ---------------------------- Componente principal ---------------------------- */
export default function LinksBar() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const R = !!reduced;

  // Enlace del CV (Dropbox)
  const DROPBOX_CV =
    "https://www.dropbox.com/scl/fi/4cf3h8m8lme1kt0sg3hps/CV-I2025.JUANPABLOVINDASSUAREZ.pdf?rlkey=1mw09iuhqexvkavwc7uqrhnc7&st=fl1eesdl&dl=0";

  const openCv = useMemo(() => normalizeDropboxUrl(DROPBOX_CV, "0"), [DROPBOX_CV]);

  return (
    <section
      aria-labelledby="links-title"
      className="relative mx-auto flex min-h-[68vh] w-full items-center justify-center px-6 py-20"
    >
      {/* Decoración sutil */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-[8%] top-16 h-44 w-44 rounded-full blur-3xl"
          style={{ backgroundColor: `${NEON}22` }}
        />
        <div className="absolute right-[12%] bottom-8 h-36 w-36 rounded-full bg-cyan-300/14 blur-3xl" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <motion.div
        variants={container}
        custom={R}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.55 }}
        className="mx-auto w-full max-w-6xl text-center"
      >
        {/* Título */}
        <motion.h2
          id="links-title"
          variants={item}
          custom={R}
          className="text-4xl font-extrabold tracking-tight md:text-5xl"
        >
          <span
            className="bg-gradient-to-r from-[#00E5FF] via-cyan-300 to-[#00E5FF] bg-clip-text text-transparent"
            style={{ textShadow: `0 0 12px ${NEON}70` }}
          >
            {t("title", "links")}
          </span>
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          variants={item}
          custom={R}
          className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/75"
        >
          {t("subtitle", "links")}
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={item}
          custom={R}
          className="mx-auto mt-6 h-[2px] w-28 rounded-full opacity-70"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,229,255,1), transparent)",
          }}
        />

        {/* Grid */}
        <motion.div
          variants={item}
          custom={R}
          className="mx-auto mt-12 grid w-full max-w-5xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {/* LinkedIn */}
          <CardLink
            href="https://www.linkedin.com/in/juan-pablo-vindas-suarez-00b857277/"
            label="LinkedIn"
            handle="@juanpablo-vindassuarez"
            icon={
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10">
                <Linkedin size={22} className="text-[#0A66C2]" />
              </div>
            }
            ctaText={t("cta_view_profile", "links")}
            reduced={R}
          />

          {/* GitHub */}
          <CardLink
            href="https://github.com/JPVindas"
            label="GitHub"
            handle="@JPVindas"
            icon={
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10">
                <Github size={22} className="text-white" />
              </div>
            }
            ctaText={t("cta_view_profile", "links")}
            reduced={R}
          />

          {/* Currículum (traducido) */}
          <CardLink
            href={openCv}
            label={t("resume_label", "links")}         // "Currículum" / "Résumé" / "Currículo"
            handle={t("resume_handle", "links")}       // "Abrir en Dropbox" / "Open in Dropbox" / "Abrir no Dropbox"
            icon={
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10">
                <FileText size={22} className="text-[#00E5FF]" />
              </div>
            }
            ctaText={t("resume_open", "links")}        // "Ver CV" / "Open CV" / "Abrir CV"
            reduced={R}
          />
        </motion.div>

        {/* Hint */}
        <motion.span
          variants={item}
          custom={R}
          className="mt-12 block text-base italic text-white/50"
        >
          {t("tip_hover", "links")}
        </motion.span>
      </motion.div>
    </section>
  );
}

/* ---------------------------- Efecto de borde/ripple ---------------------------- */
function NeonFrame({
  hover,
  pos,
}: {
  hover: boolean;
  pos: { x: number; y: number };
}) {
  return (
    <>
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-30"
        style={{
          border: "1px solid transparent",
          background:
            "linear-gradient(#0b1420,#0b1420) padding-box, linear-gradient(90deg, transparent, rgba(0,229,255,.7), transparent) border-box",
          mask: "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor" as any,
          maskComposite: "exclude" as any,
        }}
      />
      <span
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          width: 240,
          height: 240,
          background: `radial-gradient(closest-side, ${NEON}22, transparent 70%)`,
          opacity: hover ? 1 : 0,
          transition: "opacity .2s ease, transform .5s ease",
        }}
      />
    </>
  );
}

/* ---------------------------- Card genérica ---------------------------- */
type CardLinkProps = {
  href: string;
  label: string;
  handle?: string;
  icon: React.ReactNode;
  ctaText?: string;
  reduced: boolean;
};

function CardLink({
  href,
  label,
  handle,
  icon,
  ctaText,
  reduced,
}: CardLinkProps) {
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  return (
    <motion.a
      role="listitem"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={`${label}${handle ? ` — ${handle}` : ""}`}
      whileTap={reduced ? {} : { scale: 0.98 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLAnchorElement).getBoundingClientRect();
        setPos({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      }}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-left backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/60"
      style={{
        boxShadow: hover ? GLOW_HOVER : GLOW_BASE,
        transform: hover && !reduced ? "translateY(-6px)" : "translateY(0px)",
        transition: "box-shadow .35s ease, transform .35s ease",
      }}
      aria-label={`${label} ${handle ?? ""}`}
    >
      <NeonFrame hover={hover} pos={pos} />

      <div className="flex items-center gap-4">
        {icon}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#00E5FF]">
              {label}
            </h3>
            <ArrowUpRight
              size={20}
              className="text-white/60 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#00E5FF]"
              aria-hidden
            />
          </div>
          {handle && (
            <p className="mt-0.5 truncate text-sm text-white/55">{handle}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-white/45">
        <span className="font-semibold transition-colors duration-300 group-hover:text-[#00E5FF]">
          {ctaText}
        </span>
        <span
          className="h-[1px] w-16"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,229,255,1), transparent)",
          }}
          aria-hidden
        />
      </div>
    </motion.a>
  );
}
