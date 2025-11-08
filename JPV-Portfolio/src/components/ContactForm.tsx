import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  User2,
  MessageSquareText,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { dict, Lang } from "../i18n";
import { useLanguage } from "../locale/LanguageProvider";

/* ---------- UI config ---------- */
const NEON = "#00E5FF";
const MAX_MSG = 800;
type Status = "idle" | "sending" | "success" | "error";

const useFadeUp = () => {
  const prefersReduced = useReducedMotion();
  const viewportMargin = prefersReduced ? "0px" : "-120px 0px";
  return (delay = 0, y = 16) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : y },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: prefersReduced ? 0 : 0.45, delay, ease: "easeOut" },
    viewport: { once: true, margin: viewportMargin },
  });
};

/* ---------- IconSlot: chip de icono con glass y halo ---------- */
function IconSlot({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className={[
        "inline-flex h-7 w-7 items-center justify-center rounded-md",
        "border border-white/12 bg-white/[0.04] backdrop-blur",
        "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_0_8px_rgba(0,229,255,0.10)]",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

/* ---------- Componente ---------- */
export default function ContactForm() {
  // Idioma desde tu provider
  const { lang: currentLang } = useLanguage();
  const lang = (currentLang ?? "es") as Lang;
  const t = (key: keyof typeof dict["es"]["contact"]) => dict[lang].contact[key];

  // Asunto por idioma (Formspree)
  const SUBJECTS: Record<Lang, string> = {
    es: "Nuevo mensaje desde el portafolio 🚀",
    en: "New message from portfolio 🚀",
    pt: "Nova mensagem do portfólio 🚀",
  };

  const fadeUp = useFadeUp();
  const prefersReduced = useReducedMotion();

  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);

  const formRef = useRef<HTMLFormElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const FORMSPREE_URL = "https://formspree.io/f/mblpnbqw";
  const emailPattern = useMemo(
    () => /^(?=.{3,254}$)[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    []
  );

  const canSubmit =
    status !== "sending" &&
    nameValid &&
    emailValid &&
    msg.trim().length >= 5 &&
    msg.length <= MAX_MSG;

  // Enfoque accesible cuando aparece banner
  useEffect(() => {
    if (status === "success" || status === "error") bannerRef.current?.focus();
  }, [status]);

  // Auto-ocultar banners < 5s
  useEffect(() => {
    if (status === "success" || status === "error") {
      const hide = setTimeout(() => setStatus("idle"), 3800);
      return () => clearTimeout(hide);
    }
  }, [status]);

  // Auto-resize del textarea
  useEffect(() => {
    if (!textAreaRef.current) return;
    const el = textAreaRef.current;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 480)}px`;
  }, [msg]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    const formData = new FormData(formRef.current);

    // Honeypot
    if ((formData.get("company") as string)?.length) {
      setStatus("success");
      formRef.current.reset();
      setMsg("");
      return;
    }

    formData.set("_language", lang);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (res.ok) {
        setStatus("success");
        formRef.current.reset();
        setMsg("");
      } else setStatus("error");
    } catch {
      clearTimeout(timeout);
      setStatus("error");
    }
  };

  // Placeholder localizable para textarea
  const messagePlaceholder =
    lang === "pt"
      ? "Escreva sua mensagem..."
      : lang === "en"
      ? "Write your message..."
      : "Escribe tu mensaje...";

  return (
    <div className="min-h-screen bg-[#0B1520] flex items-center justify-center p-6 text-white">
      <motion.section
        {...fadeUp(0)}
        aria-labelledby="contact-title"
        className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#0B1520]/80 p-8 backdrop-blur-md shadow-[0_0_22px_rgba(0,229,255,0.14)]"
      >
        {/* fondo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            background:
              "radial-gradient(60rem 60rem at 10% -10%, rgba(0,229,255,.6), transparent 60%), radial-gradient(40rem 40rem at 110% 30%, rgba(0,229,255,.35), transparent 55%)",
          }}
        />

        {/* header */}
        <motion.div {...fadeUp(0.05)} className="relative text-center">
          <h2
            id="contact-title"
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: NEON, textShadow: `0 0 8px ${NEON}60` }}
          >
            {t("title")}
          </h2>
          <p className="mt-2 text-white/70">{t("subtitle")}</p>
        </motion.div>

        {/* form */}
        <motion.form
          {...fadeUp(0.1)}
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="relative mt-8 grid gap-5"
          aria-busy={status === "sending"}
        >
          <input type="hidden" name="_subject" value={SUBJECTS[lang]} />
          <input type="hidden" name="_language" value={lang} />
          <input
            type="text"
            name="company"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* NOMBRE — LABEL ESTÁTICO (no tapa) */}
          <div className="relative">
            <label
              htmlFor="name"
              className="mb-1.5 inline-flex items-center gap-2 text-sm text-white/70"
            >
              <IconSlot>
                <User2 className="h-4 w-4 text-white/75" />
              </IconSlot>
              {t("name")}
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              minLength={2}
              onInput={(e) =>
                setNameValid(
                  (e.target as HTMLInputElement).value.trim().length >= 2
                )
              }
              aria-invalid={!nameValid}
              autoComplete="name"
              placeholder=""
              className={[
                "w-full rounded-lg border bg-black/40 text-white",
                "border-white/12 px-4 py-3 outline-none",
                "transition focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/35",
                "shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]",
              ].join(" ")}
            />
          </div>

          {/* EMAIL — LABEL ESTÁTICO (no tapa) */}
          <div className="relative">
            <label
              htmlFor="email"
              className="mb-1.5 inline-flex items-center gap-2 text-sm text-white/70"
            >
              <IconSlot>
                <Mail className="h-4 w-4 text-white/75" />
              </IconSlot>
              {t("email")}
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              inputMode="email"
              onInput={(e) =>
                setEmailValid(
                  emailPattern.test((e.target as HTMLInputElement).value)
                )
              }
              aria-invalid={!emailValid}
              autoComplete="email"
              placeholder=""
              className={[
                "w-full rounded-lg border bg-black/40 text-white",
                "border-white/12 px-4 py-3 outline-none",
                "transition focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/35",
                "shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]",
              ].join(" ")}
            />
          </div>

          {/* MENSAJE — label ARRIBA (no tapa), con auto-resize */}
          <div className="relative">
            <label
              htmlFor="message"
              className="mb-1.5 inline-flex items-center gap-2 text-sm text-white/70"
            >
              <IconSlot>
                <MessageSquareText className="h-4 w-4 text-white/75" />
              </IconSlot>
              {t("message")}
            </label>

            <textarea
              ref={textAreaRef}
              id="message"
              name="message"
              rows={5}
              required
              maxLength={MAX_MSG}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder={messagePlaceholder}
              className={[
                "w-full resize-y rounded-lg border bg-black/40 text-white",
                "border-white/12 px-4 py-3 outline-none",
                "transition focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/35",
                "min-h-[120px] max-h-[480px]",
                "shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]",
              ].join(" ")}
              aria-describedby="message-help message-count"
            />

            <div className="mt-1 flex justify-between text-xs text-white/45">
              <span id="message-help">⏱ &lt; 24 h</span>
              <span id="message-count">
                {msg.length}/{MAX_MSG}
              </span>
            </div>
          </div>

          {/* BOTÓN */}
          <motion.button
            type="submit"
            disabled={!canSubmit}
            whileHover={prefersReduced ? undefined : { scale: 1.03 }}
            whileTap={prefersReduced ? undefined : { scale: 0.98 }}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-[#00E5FF]/35 bg-[#00E5FF] px-6 py-3 text-base font-bold text-[#0B1520] shadow-[0_0_12px_rgba(0,229,255,0.45)] transition enabled:hover:bg-[#12d9ff] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
            {status === "sending" ? t("sending") : t("send")}
          </motion.button>
        </motion.form>

        {/* ESTADO — aparece y desaparece < 5s */}
        <div
          ref={bannerRef}
          role="status"
          tabIndex={-1}
          aria-live="polite"
          className="mt-4 text-center text-sm min-h-[40px]"
        >
          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mx-auto inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-emerald-300"
              >
                <CheckCircle2 className="h-4 w-4" />
                {t("success")}
              </motion.p>
            )}

            {status === "error" && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mx-auto inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-300"
              >
                <AlertTriangle className="h-4 w-4" />
                {t("error")}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* PRIVACIDAD */}
        <p className="mt-6 text-center text-[11px] leading-relaxed text-white/55">
          {t("privacy")}
        </p>
      </motion.section>
    </div>
  );
}
