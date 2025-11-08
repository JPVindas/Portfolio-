import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function Reveal({ children, y = 16, delay = 0 }: { children: React.ReactNode; y?: number; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px 0px -100px 0px", once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default function NextSection() {
  return (
    <section id="about" className="bg-[#0D1B2A] py-24 text-[#E6EDF3]">
      <div className="container mx-auto max-w-5xl px-6">
        <Reveal><h2 className="text-3xl font-bold">Lo que hago</h2></Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 max-w-3xl text-white/80">
            Desarrollo aplicaciones web con foco en performance, DX y mantenibilidad: patrones limpios, tests,
            CI/CD y analítica. Diseño sistemas confiables y escalables.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { t: "Frontend", d: "React + TS, UI con Tailwind, accesible y responsive." },
            { t: "Backend", d: "ASP.NET / Node, APIs, autenticación y bases de datos." },
            { t: "Datos", d: "SQL/NoSQL, ETL, dashboards con Power BI / Looker Studio." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={0.15 + i * 0.05}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-[#64FFDA]">{c.t}</h3>
                <p className="mt-2 text-white/80">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
  
}
