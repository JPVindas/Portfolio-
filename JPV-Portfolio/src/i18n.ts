// src/i18n.ts
export type Lang = "es" | "en" | "pt";

export const LANGS: Record<Lang, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
};

type Dict = Record<string, string>;

export type Namespaces = {
  common: Dict;
  home: Dict;
  contact: Dict;
  links: Dict;
  about: Dict;
  services: Dict;
  studies: Dict;
  certifications: Dict;
  projects: Dict;
  aboutmini: Dict;
  footer: Dict;
};

export const dict: Record<Lang, Namespaces> = {
  es: {
    common: {
      language: "Idioma",
      change_language: "Cambiar idioma",
      about: "Sobre mí",
      projects: "Proyectos",
      scroll: "Scroll",
      aria_next: "Desplázate a la siguiente sección",
      go_top: "Ir al inicio",
      go_contact: "Ir a contacto",
    },
    home: {
      title: "Hola, soy Juan Pablo",
      subtitle: "Ingeniero en Sistemas y Técnico en Gestión Administrativa",
      cta: "Ver proyectos",
    },
    contact: {
      title: "Hablemos",
      subtitle:
        "Cuéntame brevemente tu idea o necesidad y te responderé lo antes posible.",
      name: "Tu nombre",
      email: "Tu correo electrónico",
      message: "¿En qué te puedo ayudar?",
      send: "Enviar mensaje",
      sending: "Enviando…",
      success: "¡Gracias! Tu mensaje fue enviado correctamente.",
      error: "Ocurrió un problema al enviar. Intenta de nuevo en unos minutos.",
      privacy:
        "Tu información se envía de forma segura mediante Formspree y no se comparte con terceros.",
    },
    links: {
      title: "LinkedIn & GitHub",
      subtitle:
        "Explora mi perfil profesional y contribuciones en código abierto.",
      cta_view_profile: "Ver perfil",
      tip_hover:
        "Tip: pasa el mouse sobre las tarjetas para interactuar 🖱️",
      resume_label: "Currículum",
      resume_badge: "Actualizado",
      resume_handle: "Abrir en Dropbox",
      resume_open: "Ver CV",
      resume_download: "Descargar",
      resume_language: "Idioma",
      lang_es: "ES",
      lang_en: "EN",
      resume_desc_es:
        "Mi currículum en español con experiencia, educación y proyectos más relevantes, orientado a desarrollo Full-Stack, datos y automatización.",
      resume_desc_en:
        "Mi CV en inglés resaltando experiencia, educación y proyectos clave, enfocado en desarrollo Full-Stack, datos y automatización.",
    },
    about: {
      title: "Sobre mí",
      subtitle:
        "Ingeniero en Sistemas: Full-Stack, datos y automatización con enfoque UI/UX.",
    },
    services: {
      title: "Mis Servicios",
      subtitle:
        "Soluciones full-stack con foco en UX, rendimiento y mantenibilidad. Integración de IA y datos cuando aportan valor real al negocio.",
      badge_ready: "Listo para producción",
      cta_more: "Ver más",
      service_1_title: "Desarrollador Junior",
      service_1_desc:
        "Construyo interfaces limpias y accesibles con base sólida en patrones y buenas prácticas.",
      service_1_bullet_1: "React + TypeScript, routing y estado",
      service_1_bullet_2: "ASP.NET Core APIs (REST) limpias",
      service_1_bullet_3: "Testing básico (Jest/xUnit) y linting",
      service_2_title: "Inteligencia Artificial",
      service_2_desc:
        "Integro modelos y flujos de IA para análisis y automatización orientados a resultados.",
      service_2_bullet_1: "RAG / prompts y consumo de APIs",
      service_2_bullet_2: "Análisis y explicación de documentos",
      service_2_bullet_3: "Pipelines con Python para datos",
      service_3_title: "Infraestructura IT",
      service_3_desc:
        "Configuro entornos, seguridad y despliegues con foco en estabilidad y costo-eficiencia.",
      service_3_bullet_1: "CI/CD básico (GitHub Actions)",
      service_3_bullet_2: "Hosting en Azure/AWS, SSL y dominios",
      service_3_bullet_3: "Monitoreo y hardening inicial",
      service_4_title: "Datos y Analítica",
      service_4_desc:
        "Modelo, integro y consulto datos para exponer métricas claras y decisiones más rápidas.",
      service_4_bullet_1: "Modelado SQL/NoSQL y consultas",
      service_4_bullet_2: "ETL / limpieza y normalización",
      service_4_bullet_3: "KPIs y endpoints de datos",
    },
    studies: {
      title: "Estudios",
      subtitle: "Formación académica con enfoque técnico y empresarial.",
      title_suffix: "Académica",
      s1_year: "2023 – 2026",
      s1_title: "Bachillerato en Ingeniería en Sistemas de Computación",
      s1_institution: "Universidad Fidélitas — San José, Costa Rica",
      s1_desc:
        "Egresado en agosto 2025. Titulación oficial prevista: 12 de marzo de 2026. Énfasis en desarrollo full-stack, bases de datos, analítica y automatización.",
      s2_year: "2024 – 2025",
      s2_title: "Técnico en Gestión Empresarial",
      s2_institution: "Universidad Fidélitas — San José, Costa Rica",
      s2_desc:
        "Fundamentos de administración, contabilidad, marketing, talento humano y dirección de proyectos. Complemento de negocio para soluciones tecnológicas.",
      s3_year: "2018 – 2022",
      s3_title: "Diploma Secundaria Bilingüe",
      s3_institution:
        "Complejo Educativo Bilingüe Nueva Esperanza — Heredia, Costa Rica",
      s3_desc:
        "Formación en valores, liderazgo y comunicación. Idiomas: Inglés (B2) y Portugués (A2). Base disciplinaria y académica sólida.",
    },
    certifications: {
      title: "Certificaciones",
      subtitle: "Avales de Cisco, Oracle e IBM en redes, IA y desarrollo.",
      intro:
        "Mi compromiso con el **aprendizaje continuo** se refleja en redes, IA, desarrollo y metodologías ágiles, avalado por instituciones líderes como Cisco, Oracle e IBM.",
      closing:
        "“El aprendizaje continuo es la base de la innovación. Cada certificación refleja mi compromiso con la excelencia y la evolución constante.”",
      cat_ai_cloud: "IA & Cloud",
      cat_sw_dev: "Desarrollo de Software",
      cat_net_infra: "Redes e Infraestructura",
      cat_methodology: "Metodología",
      c1_title:
        "Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate",
      c1_year: "2025",
      c1_issuer: "Oracle Academy",
      c1_desc:
        "Fundamentos de IA y ML con despliegue en Oracle Cloud (OCI): conceptos, casos de uso y buenas prácticas.",
      c2_title: "IBM Artificial Intelligence Fundamentals",
      c2_year: "2025",
      c2_issuer: "IBM SkillsBuild",
      c2_desc:
        "Fundamentos de IA, modelos predictivos, ética y aplicaciones prácticas con Python.",
      c3_title: "Cisco JavaScript Essentials 1",
      c3_year: "2024",
      c3_issuer: "Cisco Networking Academy",
      c3_desc:
        "Bases de JavaScript: control de flujo, funciones, DOM y desarrollo web dinámico.",
      c4_title: "Cisco CCNA v7: Switching, Routing y Wireless Essentials",
      c4_year: "2024",
      c4_issuer: "Cisco Networking Academy",
      c4_desc:
        "Conmutación, enrutamiento, VLANs y Wi-Fi para infraestructuras seguras y escalables.",
      c5_title: "Scrum Fundamentals Certified",
      c5_year: "2023",
      c5_issuer: "SCRUMstudy",
      c5_desc:
        "Principios de Scrum, roles, eventos y artefactos para la gestión ágil de proyectos.",
      c6_title: "Cisco Introduction to IoT",
      c6_year: "2023",
      c6_issuer: "Cisco Networking Academy",
      c6_desc:
        "Introducción al Internet de las Cosas y su impacto en automatización y transformación digital.",
      c7_title: "Cisco CCNA v7: Introduction to Networks",
      c7_year: "2023",
      c7_issuer: "Cisco Networking Academy",
      c7_desc:
        "Modelo TCP/IP, direccionamiento, protocolos y configuración inicial de dispositivos de red.",
    },
    projects: {
      title: "Proyectos",
      subtitle:
        "Casos reales: clínica dental (ASP.NET + MySQL) y app IA con Gemini + Python.",
      intro:
        "Selección de proyectos con enfoque en **calidad técnica**, **valor de negocio** y **experiencia de usuario**.",
      cta_demo: "Demo",
      cta_repo: "Repo",
      bottom_cta:
        "¿Quieres ver más? Puedo compartir una demo guiada o profundizar en arquitectura, decisiones de diseño y pruebas.",
      p1_title: "Analista de Datos con IA (Gemini + Python)",
      p1_subtitle: "Q&A sobre documentos | Estadística descriptiva",
      p1_desc:
        "Aplicación que ingiere PNG, XLSX, PDF y DOCX; corre análisis estadísticos (limpieza, métricas, gráficos base) y usa Gemini para explicar hallazgos y responder preguntas naturales sobre los datos.",
      p1_h1:
        "Parsing multi-formato (imágenes, hojas de cálculo, PDFs y Word)",
      p1_h2: "Estadística descriptiva + outliers + correlaciones básicas",
      p1_h3: "RAG para preguntas contextuales sobre los archivos subidos",
      p2_title: "Clínica Dental San Rafael",
      p2_subtitle: "ASP.NET MVC + MySQL",
      p2_desc:
        "Sistema full-stack de citas, facturación y gestión (roles, inventario, descuentos, financiamiento, notificaciones). Incluye triggers para creación automática de pacientes, hashing de contraseñas y validación de horarios.",
      p2_h1: "Citas con reglas de negocio (capacidad, buffers, horarios)",
      p2_h2: "Financiamiento automático ligado a tratamientos",
      p2_h3: "Email transaccional e informes operativos",
      p3_title: "Guardianes de la Naturaleza",
      p3_subtitle: "ETL + Analítica con formularios",
      p3_desc:
        "Captura y normalización de datos ambientales (eco-retos) con formularios, pipelines ETL y tableros interactivos por región (Liberia, Cañas, Santa Cruz, Nicoya).",
      p3_h1: "Integración de múltiples fuentes con control de calidad",
      p3_h2: "KPIs por zona y comparativas temporales",
      p3_h3: "Automatizaciones de limpieza y consolidación",
    },
    aboutmini: {
      value_title: "Mi Propuesta de Valor",
      intro_prefix: "Soy",
      intro_middle: ", Ingeniero en Sistemas y desarrollador",
      intro_fullstack: "Full-Stack",
      intro_suffix: ". Convierto retos complejos en",
      intro_scalable: "soluciones digitales escalables",
      intro_elegant: "elegantes y optimizadas,",
      intro_quality:
        "cuidando el detalle técnico y la experiencia de usuario.",
      card_frontend_title: "Frontend & UI/UX",
      card_frontend_text:
        "React + TypeScript, Tailwind, diseño centrado en el usuario, accesibilidad y micro-interacciones pulidas.",
      card_backend_title: "Backend Escalable",
      card_backend_text:
        "ASP.NET (C#), Node.js y Go. APIs robustas y seguras con integración a SQL Server / PostgreSQL y MongoDB.",
      card_automation_title: "Automatización & Data",
      card_automation_text:
        "Python para ETL, análisis y ML básico. Scripts y jobs que reducen trabajo manual y errores.",
      card_devops_title: "DevOps & Rendimiento",
      card_devops_text:
        "CI/CD (GitHub Actions), Docker, buenas prácticas de performance (Lighthouse) y arquitectura modular.",
      chip_csharp: "C# / ASP.NET Core",
      chip_go: "Go",
      chip_python: "Python",
      chip_tsreact: "TypeScript / React",
      chip_node: "Node.js",
      chip_sql: "SQL Server / PostgreSQL",
      chip_mongo: "MongoDB",
      chip_docker: "Docker",
      chip_cicd: "CI/CD (GitHub Actions)",
      chip_testing: "Testing (Jest / xUnit)",
      closing_quote:
        "“Diseño para las personas, optimizo para el negocio y escribo código que se mantiene en el tiempo.”",
    },
    footer: {
      name: "Juan Pablo Vindas",
      role: "Ingeniero en Sistemas · Full-Stack & Data Developer",
      linkedin: "LinkedIn",
      github: "GitHub",
      contact: "Contacto",
      portfolio: "Portafolio",
      developed_by: "Desarrollado por",
      stack: "usando React + Tailwind + Vite",
    },
  },

  en: {
    common: {
      language: "Language",
      change_language: "Change language",
      about: "About",
      projects: "Projects",
      scroll: "Scroll",
      aria_next: "Scroll to the next section",
      go_top: "Go to top",
      go_contact: "Go to contact",
    },
    home: {
      title: "Hi, I'm Juan Pablo",
      subtitle:
        "Computer Systems Engineer & Business Management Technician",
      cta: "View projects",
    },
    contact: {
      title: "Let's Talk",
      subtitle:
        "Briefly share your idea or need and I'll get back to you as soon as possible.",
      name: "Your name",
      email: "Your email",
      message: "How can I help you?",
      send: "Send message",
      sending: "Sending…",
      success: "Thanks! Your message was sent successfully.",
      error: "Something went wrong. Please try again in a few minutes.",
      privacy:
        "Your information is securely sent through Formspree and never shared with third parties.",
    },
    links: {
      title: "LinkedIn & GitHub",
      subtitle:
        "Explore my professional profile and open-source contributions.",
      cta_view_profile: "View profile",
      tip_hover: "Tip: hover the cards to interact 🖱️",
      resume_label: "Resume",
      resume_badge: "Updated",
      resume_handle: "Open in Dropbox",
      resume_open: "Open CV",
      resume_download: "Download",
      resume_language: "Language",
      lang_es: "ES",
      lang_en: "EN",
      resume_desc_es:
        "My résumé in Spanish highlighting experience, education, and key projects, focused on Full-Stack development, data, and automation.",
      resume_desc_en:
        "My résumé in English highlighting experience, education, and key projects, focused on Full-Stack development, data, and automation.",
    },
    about: {
      title: "About Me",
      subtitle:
        "Systems Engineer: Full-Stack, data, and automation with a UI/UX focus.",
    },
    services: {
      title: "My Services",
      subtitle:
        "Full-stack solutions focused on UX, performance, and maintainability. Integrating AI and data where they provide real business value.",
      badge_ready: "Production ready",
      cta_more: "View more",
      service_1_title: "Junior Developer",
      service_1_desc:
        "I build clean and accessible interfaces based on solid patterns and best practices.",
      service_1_bullet_1: "React + TypeScript, routing and state",
      service_1_bullet_2: "Clean REST APIs with ASP.NET Core",
      service_1_bullet_3: "Basic testing (Jest/xUnit) and linting",
      service_2_title: "Artificial Intelligence",
      service_2_desc:
        "I integrate AI models and workflows for analytics and automation focused on results.",
      service_2_bullet_1: "RAG / prompts and API usage",
      service_2_bullet_2: "Document analysis and explanation",
      service_2_bullet_3: "Python pipelines for data",
      service_3_title: "IT Infrastructure",
      service_3_desc:
        "I configure environments, security, and deployments with focus on stability and cost efficiency.",
      service_3_bullet_1: "Basic CI/CD (GitHub Actions)",
      service_3_bullet_2: "Hosting on Azure/AWS, SSL, and domains",
      service_3_bullet_3: "Monitoring and initial hardening",
      service_4_title: "Data & Analytics",
      service_4_desc:
        "I model, integrate, and query data to expose clear metrics and enable faster decisions.",
      service_4_bullet_1: "SQL/NoSQL modeling and queries",
      service_4_bullet_2: "ETL / cleaning and normalization",
      service_4_bullet_3: "KPIs and data endpoints",
    },
    studies: {
      title: "Studies",
      subtitle: "Academic background with a technical and business focus.",
      title_suffix: "Academic",
      s1_year: "2023 – 2026",
      s1_title: "B.Sc. in Computer Systems Engineering",
      s1_institution: "Universidad Fidélitas — San José, Costa Rica",
      s1_desc:
        "Graduated Aug 2025. Official degree expected: March 12, 2026. Emphasis on full-stack development, databases, analytics, and automation.",
      s2_year: "2024 – 2025",
      s2_title: "Technical Degree in Business Management",
      s2_institution: "Universidad Fidélitas — San José, Costa Rica",
      s2_desc:
        "Foundations of management, accounting, marketing, HR, and project leadership. Business complement for tech solutions.",
      s3_year: "2018 – 2022",
      s3_title: "Bilingual High School Diploma",
      s3_institution:
        "Complejo Educativo Bilingüe Nueva Esperanza — Heredia, Costa Rica",
      s3_desc:
        "Training in values, leadership, and communication. Languages: English (B2) and Portuguese (A2). Solid academic foundation.",
    },
    certifications: {
      title: "Certifications",
      subtitle:
        "Cisco, Oracle, and IBM credentials in networking, AI, and development.",
      intro:
        "My commitment to **continuous learning** spans networking, AI, software development, and agile methodologies — validated by leading institutions like Cisco, Oracle, and IBM.",
      closing:
        "“Continuous learning is the foundation of innovation. Each certification reflects my commitment to excellence and constant evolution.”",
      cat_ai_cloud: "AI & Cloud",
      cat_sw_dev: "Software Development",
      cat_net_infra: "Networking & Infrastructure",
      cat_methodology: "Methodology",
      c1_title:
        "Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate",
      c1_year: "2025",
      c1_issuer: "Oracle Academy",
      c1_desc:
        "AI and ML fundamentals with deployment on Oracle Cloud (OCI): concepts, use cases, and best practices.",
      c2_title: "IBM Artificial Intelligence Fundamentals",
      c2_year: "2025",
      c2_issuer: "IBM SkillsBuild",
      c2_desc:
        "Fundamentals of AI, predictive models, ethics, and practical Python applications.",
      c3_title: "Cisco JavaScript Essentials 1",
      c3_year: "2024",
      c3_issuer: "Cisco Networking Academy",
      c3_desc:
        "JavaScript basics: control flow, functions, DOM manipulation, and dynamic web development.",
      c4_title: "Cisco CCNA v7: Switching, Routing, and Wireless Essentials",
      c4_year: "2024",
      c4_issuer: "Cisco Networking Academy",
      c4_desc:
        "Switching, routing, VLANs, and Wi-Fi for secure and scalable network infrastructures.",
      c5_title: "Scrum Fundamentals Certified",
      c5_year: "2023",
      c5_issuer: "SCRUMstudy",
      c5_desc:
        "Principles of Scrum: roles, events, and artifacts for agile project management.",
      c6_title: "Cisco Introduction to IoT",
      c6_year: "2023",
      c6_issuer: "Cisco Networking Academy",
      c6_desc:
        "Introduction to the Internet of Things and its impact on automation and digital transformation.",
      c7_title: "Cisco CCNA v7: Introduction to Networks",
      c7_year: "2023",
      c7_issuer: "Cisco Networking Academy",
      c7_desc:
        "TCP/IP model, addressing, protocols, and initial configuration of network devices.",
    },
    projects: {
      title: "Projects",
      subtitle:
        "Real cases: dental clinic system (ASP.NET + MySQL) and AI app with Gemini + Python.",
      intro:
        "A selection of projects focused on **technical quality**, **business value**, and **user experience**.",
      cta_demo: "Demo",
      cta_repo: "Repo",
      bottom_cta:
        "Want to see more? I can share a guided demo or dive into architecture, design decisions, and testing.",
      p1_title: "Data Analyst with AI (Gemini + Python)",
      p1_subtitle: "Document Q&A | Descriptive Statistics",
      p1_desc:
        "An app that ingests PNG, XLSX, PDF, and DOCX; runs statistical analysis (cleaning, metrics, basic charts) and uses Gemini to explain insights and answer natural-language questions about the data.",
      p1_h1: "Multi-format parsing (images, spreadsheets, PDFs, and Word)",
      p1_h2: "Descriptive statistics + outliers + basic correlations",
      p1_h3: "RAG for contextual questions about uploaded files",
      p2_title: "San Rafael Dental Clinic",
      p2_subtitle: "ASP.NET MVC + MySQL",
      p2_desc:
        "Full-stack system for appointments, billing, and management (roles, inventory, discounts, financing, notifications). Includes triggers for automatic patient creation, password hashing, and schedule validation.",
      p2_h1:
        "Appointments with business rules (capacity, buffers, schedules)",
      p2_h2: "Automatic financing linked to treatments",
      p2_h3: "Transactional email and operational reports",
      p3_title: "Guardianes de la Naturaleza",
      p3_subtitle: "ETL + Environmental Data Analytics",
      p3_desc:
        "Capture and normalization of environmental data (eco-challenges) via forms, ETL pipelines, and interactive dashboards by region (Liberia, Cañas, Santa Cruz, Nicoya).",
      p3_h1: "Integration of multiple sources with quality control",
      p3_h2: "Regional KPIs and temporal comparisons",
      p3_h3: "Automations for cleaning and consolidation",
    },
    aboutmini: {
      value_title: "My Value Proposition",
      intro_prefix: "I am",
      intro_middle: ", a Systems Engineer and",
      intro_fullstack: "Full-Stack developer",
      intro_suffix: ". I turn complex challenges into",
      intro_scalable: "scalable digital solutions",
      intro_elegant: "that are elegant and optimized,",
      intro_quality:
        "paying attention to technical detail and user experience.",
      card_frontend_title: "Frontend & UI/UX",
      card_frontend_text:
        "React + TypeScript, Tailwind, user-centered design, accessibility, and polished micro-interactions.",
      card_backend_title: "Scalable Backend",
      card_backend_text:
        "ASP.NET (C#), Node.js, and Go. Robust and secure APIs with SQL Server / PostgreSQL and MongoDB integration.",
      card_automation_title: "Automation & Data",
      card_automation_text:
        "Python for ETL, analytics, and basic ML. Scripts and jobs that reduce manual work and errors.",
      card_devops_title: "DevOps & Performance",
      card_devops_text:
        "CI/CD (GitHub Actions), Docker, performance best practices (Lighthouse), and modular architecture.",
      chip_csharp: "C# / ASP.NET Core",
      chip_go: "Go",
      chip_python: "Python",
      chip_tsreact: "TypeScript / React",
      chip_node: "Node.js",
      chip_sql: "SQL Server / PostgreSQL",
      chip_mongo: "MongoDB",
      chip_docker: "Docker",
      chip_cicd: "CI/CD (GitHub Actions)",
      chip_testing: "Testing (Jest / xUnit)",
      closing_quote:
        "“I design for people, optimize for the business, and write code that stands the test of time.”",
    },
    footer: {
      name: "Juan Pablo Vindas",
      role: "Systems Engineer · Full-Stack & Data Developer",
      linkedin: "LinkedIn",
      github: "GitHub",
      contact: "Contact",
      portfolio: "Portfolio",
      developed_by: "Developed by",
      stack: "using React + Tailwind + Vite",
    },
  },

  pt: {
    common: {
      language: "Idioma",
      change_language: "Mudar idioma",
      about: "Sobre mim",
      projects: "Projetos",
      scroll: "Scroll",
      aria_next: "Role para a próxima seção",
      go_top: "Ir ao início",
      go_contact: "Ir ao contato",
    },
    home: {
      title: "Olá, eu sou Juan Pablo",
      subtitle:
        "Engenheiro de Sistemas & Técnico em Gestão Administrativa",
      cta: "Ver projetos",
    },
    contact: {
      title: "Vamos Conversar",
      subtitle:
        "Compartilhe brevemente sua ideia ou necessidade e responderei o mais rápido possível.",
      name: "Seu nome",
      email: "Seu e-mail",
      message: "Como posso te ajudar?",
      send: "Enviar mensagem",
      sending: "Enviando…",
      success: "Obrigado! Sua mensagem foi enviada com sucesso.",
      error: "Ocorreu um problema ao enviar. Tente novamente em alguns minutos.",
      privacy:
        "Sua informação é enviada de forma segura através do Formspree e nunca é compartilhada com terceiros.",
    },
    links: {
      title: "LinkedIn & GitHub",
      subtitle:
        "Explore meu perfil profissional e contribuições em código aberto.",
      cta_view_profile: "Ver perfil",
      tip_hover: "Dica: passe o mouse sobre os cards para interagir 🖱️",
      resume_label: "Currículo",
      resume_badge: "Atualizado",
      resume_handle: "Abrir no Dropbox",
      resume_open: "Abrir CV",
      resume_download: "Baixar",
      resume_language: "Idioma",
      lang_es: "ES",
      lang_en: "EN",
      resume_desc_es:
        "Meu currículo em espanhol com experiência, educação e projetos relevantes, focado em Full-Stack, dados e automação.",
      resume_desc_en:
        "Meu currículo em inglês destacando experiência, educação e projetos-chave, focado em Full-Stack, dados e automação.",
    },
    about: {
      title: "Sobre mim",
      subtitle:
        "Engenheiro de Sistemas: Full-Stack, dados e automação com foco em UI/UX.",
    },
    services: {
      title: "Meus Serviços",
      subtitle:
        "Soluções full-stack com foco em UX, desempenho e manutenção. Integração de IA e dados quando agregam valor real ao negócio.",
      badge_ready: "Pronto para produção",
      cta_more: "Ver mais",
      service_1_title: "Desenvolvedor Júnior",
      service_1_desc:
        "Crio interfaces limpas e acessíveis com base sólida em padrões e boas práticas.",
      service_1_bullet_1: "React + TypeScript, roteamento e estado",
      service_1_bullet_2: "APIs REST limpas com ASP.NET Core",
      service_1_bullet_3: "Testes básicos (Jest/xUnit) e linting",
      service_2_title: "Inteligência Artificial",
      service_2_desc:
        "Integro modelos e fluxos de IA para análise e automação focados em resultados.",
      service_2_bullet_1: "RAG / prompts e consumo de APIs",
      service_2_bullet_2: "Análise e explicação de documentos",
      service_2_bullet_3: "Pipelines em Python para dados",
      service_3_title: "Infraestrutura de TI",
      service_3_desc:
        "Configuro ambientes, segurança e deploys com foco em estabilidade e custo-benefício.",
      service_3_bullet_1: "CI/CD básico (GitHub Actions)",
      service_3_bullet_2: "Hospedagem em Azure/AWS, SSL e domínios",
      service_3_bullet_3: "Monitoramento e hardening inicial",
      service_4_title: "Dados e Análise",
      service_4_desc:
        "Modelo, integro e consulto dados para expor métricas claras e decisões mais rápidas.",
      service_4_bullet_1: "Modelagem SQL/NoSQL e consultas",
      service_4_bullet_2: "ETL / limpeza e normalização",
      service_4_bullet_3: "KPIs e endpoints de dados",
    },
    studies: {
      title: "Estudos",
      subtitle: "Formação acadêmica com foco técnico e empresarial.",
      title_suffix: "Acadêmica",
      s1_year: "2023 – 2026",
      s1_title: "Bacharelado em Engenharia de Sistemas de Computação",
      s1_institution: "Universidad Fidélitas — San José, Costa Rica",
      s1_desc:
        "Concluído em agosto de 2025. Graduação oficial prevista: 12 de março de 2026. Ênfase em desenvolvimento full-stack, bancos de dados, análise e automação.",
      s2_year: "2024 – 2025",
      s2_title: "Técnico em Gestão Empresarial",
      s2_institution: "Universidad Fidélitas — San José, Costa Rica",
      s2_desc:
        "Fundamentos de administração, contabilidade, marketing, gestão de pessoas e direção de projetos. Complemento empresarial para soluções tecnológicas.",
      s3_year: "2018 – 2022",
      s3_title: "Diploma de Ensino Médio Bilíngue",
      s3_institution:
        "Complejo Educativo Bilingüe Nueva Esperanza — Heredia, Costa Rica",
      s3_desc:
        "Formação em valores, liderança e comunicação. Idiomas: Inglés (B2) e Portugués (A2). Base disciplinar e acadêmica sólida.",
    },
    certifications: {
      title: "Certificações",
      subtitle:
        "Certificados da Cisco, Oracle e IBM em redes, IA e desenvolvimento.",
      intro:
        "Meu compromisso com a **aprendizagem contínua** abrange redes, IA, desenvolvimento de software e metodologias ágeis — validado por instituições líderes como Cisco, Oracle e IBM.",
      closing:
        "“Aprender continuamente é a base da inovação. Cada certificação reflete meu compromisso com a excelência e a evolução constante.”",
      cat_ai_cloud: "IA & Cloud",
      cat_sw_dev: "Desenvolvimento de Software",
      cat_net_infra: "Redes & Infraestrutura",
      cat_methodology: "Metodologia",
      c1_title:
        "Oracle Cloud Infrastructure 2025 Certified AI Foundation Associate",
      c1_year: "2025",
      c1_issuer: "Oracle Academy",
      c1_desc:
        "Fundamentos de IA e ML com deploy no Oracle Cloud (OCI): conceitos, casos de uso e boas práticas.",
      c2_title: "IBM Artificial Intelligence Fundamentals",
      c2_year: "2025",
      c2_issuer: "IBM SkillsBuild",
      c2_desc:
        "Fundamentos de IA, modelos preditivos, ética e aplicações práticas com Python.",
      c3_title: "Cisco JavaScript Essentials 1",
      c3_year: "2024",
      c3_issuer: "Cisco Networking Academy",
      c3_desc:
        "Bases de JavaScript: fluxo de controle, funções, DOM e desenvolvimento web dinâmico.",
      c4_title: "Cisco CCNA v7: Switching, Routing e Wireless Essentials",
      c4_year: "2024",
      c4_issuer: "Cisco Networking Academy",
      c4_desc:
        "Comutação, roteamento, VLANs e Wi-Fi para infraestruturas seguras e escaláveis.",
      c5_title: "Scrum Fundamentals Certified",
      c5_year: "2023",
      c5_issuer: "SCRUMstudy",
      c5_desc:
        "Princípios do Scrum: papéis, eventos e artefatos para gestão ágil de projetos.",
      c6_title: "Cisco Introduction to IoT",
      c6_year: "2023",
      c6_issuer: "Cisco Networking Academy",
      c6_desc:
        "Introdução à Internet das Coisas e seu impacto em automação e transformação digital.",
      c7_title: "Cisco CCNA v7: Introduction to Networks",
      c7_year: "2023",
      c7_issuer: "Cisco Networking Academy",
      c7_desc:
        "Modelo TCP/IP, endereçamento, protocolos e configuração inicial de dispositivos de rede.",
    },
    projects: {
      title: "Projetos",
      subtitle:
        "Casos reais: sistema odontológico (ASP.NET + MySQL) e app de IA com Gemini + Python.",
      intro:
        "Seleção de projetos com foco em **qualidade técnica**, **valor de negócio** e **experiência do usuário**.",
      cta_demo: "Demo",
      cta_repo: "Repo",
      bottom_cta:
        "Quer ver mais? Posso compartilhar uma demo guiada ou detalhar arquitetura, decisões de design e testes.",
      p1_title: "Analista de Dados com IA (Gemini + Python)",
      p1_subtitle: "Q&A de documentos | Estatística descritiva",
      p1_desc:
        "Aplicação que ingere PNG, XLSX, PDF e DOCX; executa análises estatísticas (limpeza, métricas, gráficos básicos) e usa o Gemini para explicar achados e responder perguntas naturais sobre os dados.",
      p1_h1: "Parsing multi-formato (imagens, planilhas, PDFs e Word)",
      p1_h2: "Estatística descritiva + outliers + correlações básicas",
      p1_h3: "RAG para perguntas contextuais sobre os arquivos enviados",
      p2_title: "Clínica Odontológica San Rafael",
      p2_subtitle: "ASP.NET MVC + MySQL",
      p2_desc:
        "Sistema full-stack de agendamentos, faturamento e gestão (papéis, inventário, descontos, financiamento, notificações). Inclui triggers para criação automática de pacientes, hashing de senhas e validação de horários.",
      p2_h1:
        "Agendamentos com regras de negócio (capacidade, buffers, horários)",
      p2_h2: "Financiamento automático vinculado a tratamentos",
      p2_h3: "E-mail transacional e relatórios operacionais",
      p3_title: "Guardianes de la Naturaleza",
      p3_subtitle: "ETL + Análise de dados ambientais",
      p3_desc:
        "Coleta e normalização de dados ambientais (eco-desafios) via formulários, pipelines ETL e dashboards interativos por região (Libéria, Cañas, Santa Cruz, Nicoya).",
      p3_h1: "Integração de múltiplas fontes com controle de qualidade",
      p3_h2: "KPIs regionais e comparações temporais",
      p3_h3: "Automatizações de limpeza e consolidação",
    },
    aboutmini: {
      value_title: "Minha Proposta de Valor",
      intro_prefix: "Eu sou",
      intro_middle: ", Engenheiro de Sistemas e desenvolvedor",
      intro_fullstack: "Full-Stack",
      intro_suffix: ". Eu transformo desafios complexos em",
      intro_scalable: "soluções digitais escaláveis",
      intro_elegant: "elegantes e otimizadas,",
      intro_quality:
        "cuidando do detalhe técnico e da experiência do usuário.",
      card_frontend_title: "Frontend & UI/UX",
      card_frontend_text:
        "React + TypeScript, Tailwind, design centrado no usuário, acessibilidade e micro-interações refinadas.",
      card_backend_title: "Backend Escalável",
      card_backend_text:
        "ASP.NET (C#), Node.js e Go. APIs robustas e seguras com integração a SQL Server / PostgreSQL e MongoDB.",
      card_automation_title: "Automação & Dados",
      card_automation_text:
        "Python para ETL, análise e ML básico. Scripts e jobs que reduzem trabalho manual e erros.",
      card_devops_title: "DevOps & Desempenho",
      card_devops_text:
        "CI/CD (GitHub Actions), Docker, boas práticas de performance (Lighthouse) e arquitetura modular.",
      chip_csharp: "C# / ASP.NET Core",
      chip_go: "Go",
      chip_python: "Python",
      chip_tsreact: "TypeScript / React",
      chip_node: "Node.js",
      chip_sql: "SQL Server / PostgreSQL",
      chip_mongo: "MongoDB",
      chip_docker: "Docker",
      chip_cicd: "CI/CD (GitHub Actions)",
      chip_testing: "Testing (Jest / xUnit)",
      closing_quote:
        "“Eu projeto para as pessoas, otimizo para o negócio e escrevo código que perdura no tempo.”",
    },
    footer: {
      name: "Juan Pablo Vindas",
      role: "Engenheiro de Sistemas · Full-Stack & Data Developer",
      linkedin: "LinkedIn",
      github: "GitHub",
      contact: "Contato",
      portfolio: "Portfólio",
      developed_by: "Desenvolvido por",
      stack: "usando React + Tailwind + Vite",
    },
  },
};
