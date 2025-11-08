import { useLanguage } from "../locale/LanguageProvider";
import { motion } from "framer-motion";

const FLAG: Record<"es" | "en" | "pt", string> = {
  es: "🇪🇸",
  en: "🇺🇸",
  pt: "🇧🇷",
};

export default function LanguageToggle() {
  const { lang, cycle, langs } = useLanguage();

  return (
    <motion.button
      onClick={cycle}
      className="inline-flex items-center gap-2 rounded-2xl px-3 py-1.5 text-sm font-medium border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur transition"
      whileTap={{ scale: 0.97 }}
      aria-label="Change language"
      title={`${langs[lang]} — click para cambiar`}
    >
      <span className="text-lg">{FLAG[lang]}</span>
      <span className="hidden sm:inline">{langs[lang]}</span>
    </motion.button>
  );
}
