// src/App.tsx
import HeroSplashTall from "./components/HeroSplashTall";
import Section from "./components/Section";
import LinksBar from "./components/LinksBar";
import AboutMini from "./components/AboutMini";
import Services from "./components/Services";
import Studies from "./components/Studies";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import CanvasBackground from "./components/CanvasBackground";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useLanguage } from "./locale/LanguageProvider";

export default function App() {
  const { t, lang } = useLanguage(); // ✅ añadimos 'lang' para forzar actualización

  return (
    <>
      {/* Canvas de fondo */}
      <CanvasBackground />

      {/* Portada */}
      <section id="home">
        <HeroSplashTall />
      </section>

      {/* LinkedIn / GitHub */}
      <Section
        key={`links-${lang}`} // 🔁 se vuelve a renderizar al cambiar idioma
        id="links"
        title={t("title", "links")}
        subtitle={t("subtitle", "links")}
        accent="#00E5FF"
        stickyTitle
        showProgress
      >
        <LinksBar />
      </Section>

      {/* Sobre mí */}
      <Section
        key={`about-${lang}`}
        id="about"
        title={t("title", "about")}
        subtitle={t("subtitle", "about")}
        accent="#5EEAD4"
        stickyTitle
      >
        <AboutMini />
      </Section>

      {/* Servicios */}
      <Section
        key={`services-${lang}`}
        id="services"
        title={t("title", "services")}
        subtitle={t("subtitle", "services")}
        accent="#00E5FF"
        showProgress
      >
        <Services />
      </Section>

      {/* Estudios */}
      <Section
        key={`studies-${lang}`}
        id="studies"
        title={t("title", "studies")}
        subtitle={t("subtitle", "studies")}
        accent="#4DD0E1"
        stickyTitle
      >
        <Studies />
      </Section>

      {/* Certificaciones */}
      <Section
        key={`certifications-${lang}`}
        id="certifications"
        title={t("title", "certifications")}
        subtitle={t("subtitle", "certifications")}
        accent="#22D3EE"
        showProgress
      >
        <Certifications />
      </Section>

      {/* Proyectos */}
      <Section
        key={`projects-${lang}`}
        id="projects"
        title={t("title", "projects")}
        subtitle={t("subtitle", "projects")}
        accent="#00E5FF"
        stickyTitle
      >
        <Projects />
      </Section>

      {/* Contacto */}
      <Section
        key={`contact-${lang}`}
        id="contact"
        title={t("title", "contact")}
        subtitle={t("subtitle", "contact")}
        accent="#5EEAD4"
      >
        <ContactForm />
      </Section>

      <Footer />

      {/* QuickNav flotante */}
      <nav
        aria-label="Navegación rápida"
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
      >
        <a
          href="#home"
          className="rounded-xl border border-white/15 bg-white/10 p-3 text-white/80 backdrop-blur-sm transition hover:-translate-y-0.5 hover:text-white hover:bg-white/15"
          title={t("go_top", "common")}
        >
          <ChevronUp size={20} />
        </a>
        <a
          href="#contact"
          className="rounded-xl border border-white/15 bg-white/10 p-3 text-white/80 backdrop-blur-sm transition hover:translate-y-0.5 hover:text-white hover:bg-white/15"
          title={t("go_contact", "common")}
        >
          <ChevronDown size={20} />
        </a>
      </nav>
    </>
  );
}
