// src/components/Studies.tsx
import { motion } from "framer-motion";
import { GraduationCap, Building2, BookOpen } from "lucide-react";
import { useLanguage } from "../locale/LanguageProvider";

type Item = {
  year: string;
  title: string;
  institution: string;
  description: string;
  icon: JSX.Element;
};

export default function Studies() {
  const { t } = useLanguage();

  const items: Item[] = [
    {
      year: t("s1_year", "studies"),
      title: t("s1_title", "studies"),
      institution: t("s1_institution", "studies"),
      description: t("s1_desc", "studies"),
      icon: <GraduationCap size={28} className="text-[#00E5FF]" />,
    },
    {
      year: t("s2_year", "studies"),
      title: t("s2_title", "studies"),
      institution: t("s2_institution", "studies"),
      description: t("s2_desc", "studies"),
      icon: <Building2 size={28} className="text-[#00E5FF]" />,
    },
    {
      year: t("s3_year", "studies"),
      title: t("s3_title", "studies"),
      institution: t("s3_institution", "studies"),
      description: t("s3_desc", "studies"),
      icon: <BookOpen size={28} className="text-[#00E5FF]" />,
    },
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 text-white">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-4xl font-extrabold tracking-tight"
      >
        <span className="text-[#00E5FF]">{t("title", "studies")}</span>{" "}
      {t("title_suffix", "studies")}



      </motion.h2>

      {/* rail lateral */}
      <div className="relative mt-10">
        <div className="pointer-events-none absolute left-6 top-0 hidden h-full w-px bg-white/10 md:block" />

        <ul className="space-y-6">
          {items.map((it, i) => (
            <motion.li
              key={`${it.title}-${i}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="group relative grid gap-3 rounded-2xl border border-white/10 bg-[#0B1520] px-5 py-6 md:grid-cols-[48px_1fr] md:gap-5 md:pl-6"
            >
              {/* punto + ícono */}
              <div className="relative hidden md:block">
                <div className="absolute left-[-30px] top-2 h-4 w-4 rounded-full border-2 border-[#00E5FF] bg-[#061019] shadow-[0_0_12px_#00E5FF55]" />
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-black/40 ring-1 ring-white/10">
                  {it.icon}
                </div>
              </div>

              {/* contenido */}
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold leading-tight">
                    {it.title}
                  </h3>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-[#00E5FF] ring-1 ring-[#00E5FF]/25">
                    {it.year}
                  </span>
                </div>

                <p className="mt-1 text-sm text-white/60">{it.institution}</p>

                <p className="mt-3 leading-relaxed text-white/80">
                  {it.description}
                </p>

                {/* efecto hover sutil */}
                <div className="pointer-events-none mt-4 h-px w-28 origin-left scale-x-0 bg-gradient-to-r from-[#00E5FF] to-transparent opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
