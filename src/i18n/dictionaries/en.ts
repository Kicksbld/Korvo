import type { Dictionary } from "@/i18n/types";

/* Draft translation — first pass, ready to review/refine before shipping. */
const en: Dictionary = {
  meta: {
    title: "Killian Boularand · Maker & tech enthusiast",
    description:
      "Maker transitioning into embedded software engineering, aerospace and aeronautics. Code, 3D printing, hardware. Currently looking for an apprenticeship.",
    tagline: "Maker, passionate about tech and innovation",
    jobTitle: "Maker",
  },
  header: {
    brand: "Korvo",
    menuOpen: "Menu",
    menuClose: "Close",
    langAria: "Site language",
    indexAria: "Table of contents",
    nav: {
      projets: "Projects",
      maker: "Maker",
      parcours: "Journey",
      competences: "Skills",
      photographie: "Photography",
      contact: "Contact",
    },
    available: "Open to an apprenticeship",
    cvLink: "My résumé online ↗",
  },
  hero: {
    greeting: "Hey, I'm Killian 👋",
    available: "Open to an apprenticeship!",
    title: [
      { text: "Maker, " },
      { text: "passionate about tech and innovation", accent: true },
      { text: "." },
    ],
    subtitle:
      "20 years old, based in Haute-Savoie, France. Design, hardware, 3D printing, software: I handle every step of a project myself.",
    ctaProjects: "See my projects",
    ctaCv: "My résumé online ↗",
  },
  positionnement: {
    eyebrow: "Positioning",
    heading: [
      { text: "Being " },
      { text: "versatile", accent: true },
      { text: ", to meet any " },
      { text: "need", accent: true },
      { text: "." },
    ],
    paragraph: {
      before: "From ",
      accent1: "digital",
      betweenAccent1AndAccent2: " interfaces to the ",
      accent2: "physical world",
      afterAccent2: ": connected objects",
      betweenImg2AndImg3: ", 3D printing",
      end: ".",
    },
    capEyebrow: "The heading",
    capText: [
      { text: "An engineering degree in " },
      { text: "embedded software", accent: true },
      { text: ", to design the systems that keep aircraft flying." },
    ],
  },
  projets: {
    eyebrow: "Featured projects",
    obrado: {
      eyebrow: "CTO & co-founder · since June 2025",
      heading: [
        { text: "Obrado", accent: true },
        { text: " replaces the résumé with proof." },
      ],
      paragraph:
        "A résumé never shows what someone can actually do. Obrado replaces it with a public portfolio-profile: projects, skills, contributions, verified by the partner school.",
      meta: "MVP live · ~30 users · partner school By CCI",
      tech: ["Next.js 15", "React 19", "NestJS (DDD)", "PostgreSQL / Prisma", "AWS S3"],
      link: "View Obrado →",
      figureAlt: "Obrado, product visual",
      nomination: {
        logoAlt: "Techstars Startup Weekend logo",
        heading: "Shortlisted at Techstars Startup Weekend Annecy 2025.",
        paragraph:
          "54 hours to launch a company: Obrado pitched on stage, in front of an audience and a jury.",
        imageAlt: "Obrado's pitch on stage at Startup Weekend Annecy 2025",
      },
    },
    eos: {
      eyebrow: "Final-year project · DNMADE Digital",
      heading: [
        { text: "Éos", accent: true },
        { text: " translates the world for the vision that remains." },
      ],
      paragraph:
        "AMD, an eye condition common after age 60, erases the center of vision: reading or recognizing a face becomes impossible. Éos is a headset that redraws the world in simple, high-contrast shapes that remaining vision can still read.",
      role: "My role: all of the prototype's technical development.",
      tech: ["Swift / iOS", "ARKit", "LiDAR", "CoreML", "Metal"],
      link: "The project in detail →",
      figureAlt: "Éos demo: the prototype worn in a room, the 3D scene projected on screen",
      facts: [
        {
          fact: "100% on-device",
          detail: "No image ever leaves the iPhone: privacy by design.",
        },
        {
          fact: "iPhone 17 Pro",
          detail: "Worn inside a headset: camera, LiDAR and on-device AI.",
        },
        {
          fact: "Teamwork",
          detail: "Designers and a developer, together, on my DNMADE Digital final-year project.",
        },
      ],
      grammarAlt: "Éos's visual grammar: checkerboards for walls, a yellow triangle for the clear path",
    },
  },
  maker: {
    sectionLabel: "Maker · 3D printing & hardware",
    heading: "A broken part, a specific need: I make it.",
    paragraph:
      "A damaged object, a part you can't find anywhere, an idea that doesn't exist yet: I make the exact piece that solves the problem, from sketch to finished object.",
    stepLabel: "Step",
    steps: [
      {
        title: "Imagine",
        text: "Start from a real need (a broken part, a part you can't find) and put the idea on paper.",
        alt: "Sketch of the gate latch to be made",
      },
      {
        title: "Model",
        text: "Turn the sketch into a 3D model, accurate to the millimeter, ready to print.",
        alt: "The part modeled in 3D, ready to print",
      },
      {
        title: "Print",
        text: "Print, test, adjust, until the part fits perfectly in place.",
        alt: "The printed part, mounted and working on the gate",
      },
    ],
  },
  parcours: {
    eyebrow: "Journey",
    tournantEyebrow: "The turning point",
    heading: "Why I'm changing course",
    paragraph:
      "Dev work opened the door to entrepreneurship and the reality of running a company. Now I want a stronger foundation: an engineering degree, in the field I've always been passionate about — aeronautics.",
    link: "My full journey & résumé on Obrado →",
    timeline: [
      {
        period: "Nov 2025 → Jun 2026",
        title: "ControlResell · Frontend apprenticeship",
        description:
          "Responsible for the evolution of the React Web & React Native frontend: product consistency, user experience, code architecture.",
        images: ["ControlResell, web interface", "ControlResell, mobile app"],
      },
      {
        period: "Since June 2025",
        title: "Obrado · CTO & co-founder",
        description:
          "SaaS platform dedicated to apprenticeships. MVP live, ~30 users. Shortlisted at Startup Weekend Annecy 2025.",
      },
      {
        period: "Apr 2025 → Jul 2026",
        title: "Freelance · Creative / full-stack dev",
        description:
          "Landing pages, back-offices and web animations for startups, such as Les Ignobles, and craftspeople.",
        images: ["ADN Studio by Nelly", "Debatium", "Les Ignobles"],
      },
      {
        period: "Sep 2024 → Jul 2027",
        title: "DNMADE Digital · L'École by CCI",
        description:
          "Bachelor's-level degree in web & mobile dev and design, in progress. A program by Gobelins Paris, on its Annecy campus: code and design taught together.",
      },
      {
        period: "2021 → 2024",
        title: "STI2D High School Diploma · SIN track",
        description:
          "Highest honors. The foundation of my engineering and sustainable-development mindset: designing ethical solutions for the planet, blending theory and practice on my first real projects.",
      },
    ],
  },
  competences: {
    sectionLabel: "Skills",
    cards: [
      {
        title: "Code",
        items: [
          { label: "Web · Next.js, Vue, Supabase" },
          { label: "Mobile & spatial · Swift, ARKit, CoreML" },
          { label: "Motion · GSAP, Three.js" },
          { label: "Embedded AI · on-device LLMs" },
          { label: "Python, C / C++" },
        ],
      },
      {
        title: "Hardware / 3D",
        items: [
          { label: "3D printing · Bambu Lab A1 + AMS" },
          { label: "CAD · Fusion 360, Blender" },
          { label: "IoT · Arduino, ESP32, Raspberry Pi" },
        ],
      },
      {
        title: "Creative",
        items: [{ label: "Photo · Lightroom" }, { label: "UI & branding · Figma" }],
      },
      {
        title: "Languages",
        items: [
          { label: "French", level: "Native" },
          { label: "English", level: "C1" },
          { label: "Spanish", level: "B1" },
        ],
      },
    ],
  },
  aviation: {
    sectionLabel: "Aviation & me",
    heading: "The common thread through my whole career change",
    paragraph1:
      "A first flight, then paragliding over Lake Annecy: every time, the same certainty. I feel like I belong in the air.",
    paragraph2:
      "The rest of the time, I fly on Flight Simulator and lose myself in geography. What drives me is a simple idea: aviation connects people.",
    parapenteAlt: "Tandem paragliding flight over Lake Annecy",
    batemAlt: "First flight aboard a Pipistrel Velis Electro, Annecy airfield",
  },
  photographie: {
    sectionLabel: "Photography & travel",
    heading: "Capturing the moment, keeping the memory",
    paragraph:
      "When I travel, my eye always wanders. I love catching these moments and keeping beautiful memories of them, from Giza to Rome, all the way to the French Riviera.",
    gallery: [
      "Giza plateau, Sphinx and pyramid of Khafre",
      "Alley in Nazlet el-Semman opening onto the pyramid",
      "Sarcophagus of Tutankhamun",
      "Night approach over Cairo",
      "The Colosseum, Rome",
      "Arch of Constantine, Rome",
      "Cannes, France",
      "Portrait in natural light",
    ],
  },
  contact: {
    sectionLabel: "Contact",
    headingLine1: "Interested in my profile?",
    headingLine2: "Let's write what's next.",
    paragraph: "Apprenticeship in embedded software engineering, available now.",
    ctaContact: "Get in touch →",
    ctaCv: "My full résumé →",
  },
  footer: {
    copyright: "© Killian Boularand · 2026 · Annecy, Haute-Savoie, France",
    phoneLabel: "Phone",
  },
};

export default en;
