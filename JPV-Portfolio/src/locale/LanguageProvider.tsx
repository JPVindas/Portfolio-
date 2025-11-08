import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dict, LANGS, Lang } from "../i18n";

type Namespaces = keyof typeof dict["es"];

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, ns?: Namespaces) => string; // admite "footer.name" O (key, "footer")
  cycle: () => void; // ES -> EN -> PT -> ES
  langs: typeof LANGS;
};

const LanguageContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "jp_lang";

// --- util: resolver rutas con punto (a.b.c) ---
function deepGet(obj: any, path: string) {
  return path.split(".").reduce((acc, k) => (acc != null ? acc[k] : undefined), obj);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Lang | null) || null;
    if (saved && ["es", "en", "pt"].includes(saved)) {
      setLangState(saved);
      return;
    }
    const nav = (typeof navigator !== "undefined" ? navigator.language : "es").toLowerCase();
    if (nav.startsWith("en")) setLangState("en");
    else if (nav.startsWith("pt")) setLangState("pt");
    else setLangState("es");
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const cycle = () => {
    const order: Lang[] = ["es", "en", "pt"];
    const next = order[(order.indexOf(lang) + 1) % order.length];
    setLang(next);
  };

  /**
   * t("footer.name")           -> busca dict[lang].footer.name
   * t("name", "footer")        -> busca dict[lang].footer.name
   * fallback automático: devuelve la key original si no existe
   */
  const t = (key: string, ns?: Namespaces) => {
    // si viene namespace explícito, usamos ese
    if (ns) {
      const val = (dict as any)[lang]?.[ns]?.[key];
      return typeof val === "string" ? val : key;
    }
    // si la key tiene puntos (p.e. "footer.name"), resolvemos profundo
    if (key.includes(".")) {
      const val = deepGet((dict as any)[lang], key);
      return typeof val === "string" ? val : key;
    }
    // sin ns y sin punto: asumimos "common"
    const val = (dict as any)[lang]?.common?.[key];
    return typeof val === "string" ? val : key;
  };

  const value = useMemo(() => ({ lang, setLang, t, cycle, langs: LANGS }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
