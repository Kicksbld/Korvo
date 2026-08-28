import type { Dictionary } from "@/i18n/types";

const fr: Dictionary = {
  meta: {
    title: "Killian Boularand · Maker et passionné de tech",
    description:
      "Maker en réorientation vers l'ingénierie logicielle embarquée, aéronautique et spatial. Code, impression 3D, hardware. En recherche d'alternance.",
  },
  header: {
    brand: "Korvo",
    menuOpen: "Menu",
    menuClose: "Fermer",
    langAria: "Langue du site",
    indexAria: "Sommaire",
    nav: {
      projets: "Projets",
      maker: "Maker",
      parcours: "Parcours",
      competences: "Compétences",
      photographie: "Photographie",
      contact: "Contact",
    },
    available: "Disponible pour une alternance",
    cvLink: "Mon CV en ligne ↗",
  },
  hero: {
    greeting: "Hey moi c'est Killian 👋",
    available: "Disponible pour une alternance !",
    title: [
      { text: "Maker, " },
      { text: "passionné de tech et d'innovation", accent: true },
      { text: "." },
    ],
    subtitle:
      "20 ans en Haute-Savoie. Design, hardware, impression 3D, logiciel : je maîtrise chaque étape d'un projet.",
    ctaProjects: "Voir mes projets",
    ctaCv: "Mon CV en ligne ↗",
  },
  positionnement: {
    eyebrow: "Positionnement",
    heading: [
      { text: "Être " },
      { text: "polyvalent", accent: true },
      { text: ", pour répondre à n'importe quel " },
      { text: "besoin", accent: true },
      { text: "." },
    ],
    paragraph: {
      before: "Des interfaces ",
      accent1: "digitales",
      betweenAccent1AndAccent2: " au ",
      accent2: "monde physique",
      afterAccent2: " : objets connectés",
      betweenImg2AndImg3: ", impression 3D",
      end: ".",
    },
    capEyebrow: "Le cap",
    capText: [
      { text: "Un diplôme d'ingénieur en " },
      { text: "logiciel embarqué", accent: true },
      { text: ", pour concevoir les systèmes qui font voler les avions." },
    ],
  },
  projets: {
    eyebrow: "Projets phares",
    obrado: {
      eyebrow: "CTO & cofondateur · depuis juin 2025",
      heading: [
        { text: "Obrado", accent: true },
        { text: " remplace le CV par la preuve." },
      ],
      paragraph:
        "Un CV ne montre jamais ce qu'on sait vraiment faire. Obrado le remplace par un profil-portfolio public : projets, compétences, contributions, vérifié par l'école partenaire.",
      meta: "MVP en ligne · ~30 utilisateurs · école partenaire By CCI",
      tech: ["Next.js 15", "React 19", "NestJS (DDD)", "PostgreSQL / Prisma", "AWS S3"],
      link: "Voir Obrado →",
      figureAlt: "Obrado, visuel produit",
      nomination: {
        logoAlt: "Logo Techstars Startup Weekend",
        heading: "Nominé au Techstars Startup Weekend Annecy 2025.",
        paragraph:
          "54 heures pour lancer une entreprise : Obrado pitché sur scène, devant public et jury.",
        imageAlt: "Pitch d'Obrado sur la scène du Startup Weekend Annecy 2025",
      },
    },
    eos: {
      eyebrow: "Projet de fin d'année · DNMADE Numérique",
      heading: [
        { text: "Éos", accent: true },
        { text: " traduit le monde pour la vision qui reste." },
      ],
      paragraph:
        "La DMLA, une maladie de l'œil fréquente après 60 ans, efface le centre de la vision : lire ou reconnaître un visage devient impossible. Éos est un casque qui redessine le monde en formes simples et très contrastées, que la vision restante peut encore lire.",
      role: "Mon rôle : tout le développement technique du prototype.",
      tech: ["Swift / iOS", "ARKit", "LiDAR", "CoreML", "Metal"],
      link: "Le projet en détail →",
      figureAlt: "Démonstration d'Éos : le prototype porté en salle, la scène 3D projetée à l'écran",
      facts: [
        {
          fact: "100 % on-device",
          detail: "Aucune image ne quitte l'iPhone : vie privée par conception.",
        },
        {
          fact: "iPhone 17 Pro",
          detail: "Porté dans un casque : caméra, LiDAR et IA embarquée.",
        },
        {
          fact: "Travail d'équipe",
          detail:
            "Designers et développeur réunis sur le projet de fin d'année de mon DNMADE Numérique.",
        },
      ],
      grammarAlt: "La grammaire visuelle d'Éos : damiers pour les murs, triangle jaune pour le chemin libre",
    },
  },
  maker: {
    sectionLabel: "Maker · Impression 3D & hardware",
    heading: "Une pièce cassée, un besoin précis : je la fabrique.",
    paragraph:
      "Un objet abîmé, un accessoire introuvable, une idée qui n'existe encore nulle part : je fabrique la pièce exacte qui répond au besoin, du croquis à l'objet fini.",
    stepLabel: "Étape",
    steps: [
      {
        title: "Imaginer",
        text: "Partir d'un besoin réel (une pièce cassée, un accessoire introuvable) et poser l'idée sur le papier.",
        alt: "Croquis du loquet de portail à fabriquer",
      },
      {
        title: "Modéliser",
        text: "Passer du croquis au modèle 3D, au millimètre près, prêt à imprimer.",
        alt: "La pièce modélisée en 3D, prête à imprimer",
      },
      {
        title: "Imprimer",
        text: "Imprimer, tester, ajuster, jusqu'à ce que la pièce tienne parfaitement en place.",
        alt: "La pièce imprimée, montée et fonctionnelle sur le portail",
      },
    ],
  },
  parcours: {
    eyebrow: "Parcours",
    tournantEyebrow: "Le tournant",
    heading: "Pourquoi je change de cap",
    paragraph:
      "Le dev m'a ouvert l'entrepreneuriat et le concret de l'entreprise. Je veux maintenant un socle plus solide : un diplôme d'ingénieur, dans le domaine qui me passionne depuis toujours: l'aéronautique.",
    link: "Mon parcours complet & mon CV sur Obrado →",
    timeline: [
      {
        period: "Nov. 2025 → juin 2026",
        title: "ControlResell · Alternance frontend",
        description:
          "Responsable de l'évolution du frontend React Web & React Native : cohérence produit, expérience utilisateur, architecture du code.",
        images: ["ControlResell, interface web", "ControlResell, application mobile"],
      },
      {
        period: "Depuis juin 2025",
        title: "Obrado · CTO & cofondateur",
        description:
          "SaaS dédié à l'alternance. MVP en ligne, ~30 utilisateurs. Nominé Startup Weekend Annecy 2025.",
      },
      {
        period: "Avr. 2025 → juil. 2026",
        title: "Freelance · Dev créatif / fullstack",
        description:
          "Landing pages, back-office et animations web pour des startups, comme Les Ignobles, et des artisans.",
        images: ["ADN Studio by Nelly", "Debatium", "Les Ignobles"],
      },
      {
        period: "Sept. 2024 → juil. 2027",
        title: "DNMADE Numérique · L'École by CCI",
        description:
          "Bac+3 en dev et design web & mobile, en cours. Une formation signée Gobelins Paris, sur son campus d'Annecy : le code et le design enseignés ensemble.",
      },
      {
        period: "2021 → 2024",
        title: "Baccalauréat STI2D · Spé SIN",
        description:
          "Mention très bien. Le socle de ma culture d'ingénierie et de développement durable : concevoir des solutions éthiques pour la planète, en alliant théorie et pratique sur mes premiers projets réels.",
      },
    ],
  },
  competences: {
    sectionLabel: "Compétences",
    cards: [
      {
        title: "Code",
        items: [
          { label: "Web · Next.js, Vue, Supabase" },
          { label: "Mobile & spatial · Swift, ARKit, CoreML" },
          { label: "Motion · GSAP, Three.js" },
          { label: "IA embarquée · LLM on-device" },
          { label: "Python, C / C++" },
        ],
      },
      {
        title: "Hardware / 3D",
        items: [
          { label: "Impression 3D · Bambu Lab A1 + AMS" },
          { label: "CAO · Fusion 360, Blender" },
          { label: "IoT · Arduino, ESP32, Raspberry Pi" },
        ],
      },
      {
        title: "Créatif",
        items: [{ label: "Photo · Lightroom" }, { label: "UI & identités · Figma" }],
      },
      {
        title: "Langues",
        items: [
          { label: "Français", level: "Natif" },
          { label: "Anglais", level: "C1" },
          { label: "Espagnol", level: "B1" },
        ],
      },
    ],
  },
  aviation: {
    sectionLabel: "Aviation & moi",
    heading: "Le fil rouge de toute ma réorientation",
    paragraph1:
      "Le baptême de l'air, puis un vol en parapente au-dessus du lac d'Annecy : à chaque fois, la même évidence. C'est en l'air que je me sens à ma place.",
    paragraph2:
      "Le reste du temps, je simule des vols sur Flight Simulator et je me plonge dans la géographie. Ce qui me porte, c'est une idée simple : l'aviation relie les peuples.",
    parapenteAlt: "Vol en parapente biplace au-dessus du lac d'Annecy",
    batemAlt: "Baptême de l'air sur Pipistrel Velis Electro, piste d'Annecy",
  },
  photographie: {
    sectionLabel: "Photographie & voyages",
    heading: "Capturer l'instant, en faire un souvenir",
    paragraph:
      "En voyage, j'ai toujours l'œil qui traîne. J'aime saisir ces instants et en garder de jolis souvenirs, de Gizeh à Rome, jusqu'à la Côte d'Azur.",
    gallery: [
      "Plateau de Gizeh, Sphinx et pyramide de Khéphren",
      "Ruelle de Nazlet el-Semman ouvrant sur la pyramide",
      "Sarcophage de Toutânkhamon",
      "Approche de nuit au-dessus du Caire",
      "Le Colisée, Rome",
      "Arc de Constantin, Rome",
      "Cannes, France",
      "Portrait en lumière naturelle",
    ],
  },
  contact: {
    sectionLabel: "Contact",
    headingLine1: "Mon profil vous intéresse ?",
    headingLine2: "Écrivons la suite.",
    paragraph: "Alternance en ingénierie logicielle embarquée, disponible dès maintenant.",
    ctaContact: "Me contacter →",
    ctaCv: "Mon CV complet →",
  },
  footer: {
    copyright: "© Killian Boularand · 2026 · Annecy, Haute-Savoie",
    phoneLabel: "Téléphone",
  },
};

export default fr;
