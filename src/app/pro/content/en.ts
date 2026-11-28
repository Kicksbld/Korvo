import type { ProContent } from "./types";

/* Traduction anglaise — écrite en phase 2, À VALIDER par Killian avant le
   merge. Mêmes règles de discours qu'en français. */

const en: ProContent = {
  meta: {
    title: "Korvo — Your business, in the age of AI",
    description:
      "Websites, automations and AI assistants for tradespeople, freelancers and small businesses from Annecy to Geneva. Less paperwork, more clients.",
  },
  header: {
    homeLabel: "Korvo, back to top",
    langLabel: "Language",
    langNames: { fr: "Français", en: "English" },
    portfolio: {
      label: "My background & projects",
      labelShort: "My background",
      external: "(opens korvo-studio.fr)",
    },
    bookCall: "Book a call",
  },
  hero: {
    kicker: "Independent developer & designer · Annecy - Geneva",
    kickerShort: "Independent · Annecy - Geneva",
    title: ["Your business,", "in the age of AI"],
    subtitle:
      "Websites, automations and AI assistants for tradespeople, freelancers and small businesses from Annecy to Geneva. Less paperwork, more clients.",
    ctaPrimary: "Book a 20-min call",
    ctaSecondary: "See the offers",
    photoAlt: "Killian, independent developer and designer, smiling, in a white polo shirt",
    problemsTitle: "Sound familiar?",
    problems: [
      { title: "People can't find you on Google.", text: "A clear website, built to be found by people near you." },
      { title: "Your website looks dated, or breaks on phones.", text: "A new website, sharp on every screen." },
      { title: "You miss calls while out on a job.", text: "An assistant answers and notes every request, day and night." },
      { title: "Your evenings go into quotes and follow-ups.", text: "Follow-ups and appointments take care of themselves." },
    ],
  },
  offers: {
    title: "Where shall we start?",
    subtitle: "Pick what you need: I'll show you the offers that fit.",
    tabsLabel: "What you need",
    tabs: { site: "I need a website", temps: "I want to save time" },
    currencyLabel: "Show prices for",
    currencies: { eur: "Annecy · €", chf: "Geneva · CHF" },
    from: "from",
    groups: {
      // ⚠️ TO VALIDATE: the "website" tab is not drawn in the v2 mockup.
      site: [
        {
          name: "Essential",
          description: "A professional, credible presence, with enquiries coming in without touching the site.",
          benefits: [
            "A clear website, sharp on every screen",
            "Built to be found by people near you",
            "Your clients' enquiries come straight to you",
            "Live in 2 weeks or more",
          ],
          price: { eur: "€1,400", chf: "CHF\u00a02,000" },
        },
        {
          name: "Independent",
          description: "You edit your own text, photos, projects and prices.",
          benefits: [
            "Everything in Essential",
            "Text, photos, projects and prices you can edit yourself",
            "A short training session so you feel at ease",
            "Live in 3 to 4 weeks",
          ],
          price: { eur: "€2,200", chf: "CHF\u00a03,000" },
        },
      ],
      temps: [
        {
          name: "Automation",
          description: "Less paperwork: enquiries, quotes, follow-ups, appointments and email sorting.",
          benefits: [
            "Your enquiries sorted and summarised for you",
            "Quotes and follow-ups sent on time",
            "Appointments booked online, no phone call needed",
            "Your emails filed automatically",
          ],
          price: { eur: "€1,500", chf: "CHF\u00a02,200" },
        },
        {
          name: "24/7 assistant",
          description: "It answers your clients, understands what they need and sends you a summary.",
          benefits: [
            "Answers common questions, day and night",
            "Collects the request and contact details",
            "A summary sent straight to the owner",
            "On your current website or a new one",
          ],
          price: { eur: "€900", chf: "CHF\u00a01,300" },
          priceNote: { eur: "or from +€500 on a new website", chf: "or from +CHF\u00a0700 on a new website" },
        },
      ],
    },
    serenity: {
      name: "Peace of mind",
      text: "Updates, backups, monitoring of your website and assistant, and 30 min to 1 hour of changes included every month.",
      price: { eur: "from €70 / month", chf: "from CHF\u00a0100 / month" },
      note: "no commitment",
    },
    legal: "VAT not applicable, art. 293 B of the French tax code. The exact price is set in the quote, before we start.",
  },
  work: {
    title: "My work.",
    intro: ["Two clients near Annecy, three projects.", "Scroll to explore them."],
    trackLabel: "Projects",
    prev: "Previous project",
    next: "Next project",
    external: "(new tab)",
    projects: [
      {
        id: "debatium",
        visual: "debatium",
        name: "Debatium",
        meta: "Les Ignobles · Annecy · internal tool with AI",
        text: "Les Ignobles, an app studio in Annecy, needed a tool to manage the questions and content packs of their Debatium app. I built this back office and added AI to it: it translates the content into several languages and writes new questions in seconds. What used to take hours now takes a few clicks.",
        alt: "The Debatium admin tool, showing the app's list of questions.",
        note: "Internal tool: not open to the public.",
      },
      {
        id: "les-ignobles",
        visual: "ignobles",
        name: "Les Ignobles",
        meta: "App studio · Annecy · homepage",
        text: "For the redesign of their homepage, their designers drew the mockups; I built them and brought them to life with animation. The result: a smooth page, true to the design, that looks just as good on a computer as on a phone.",
        alt: "The lesignobles.com homepage, on a computer and on a phone.",
        domain: "lesignobles.com",
        link: { href: "https://www.lesignobles.com/", label: "lesignobles.com" },
      },
      {
        id: "adn-studio",
        visual: "adn",
        name: "ADN Studio by Nelly",
        meta: "Hair salon · Haute-Savoie · website and booking",
        text: "A hair salon that wanted a website that looks like them and an easy way to book appointments. I built the site and set up online booking: clients pick their own time slot, 24/7, without calling the salon.",
        alt: "The ADN Studio by Nelly homepage.",
        domain: "adn-studio-by-nelly.fr",
        link: { href: "https://www.adn-studio-by-nelly.fr/", label: "adn-studio-by-nelly.fr" },
      },
    ],
  },
  demo: {
    title: "Now, give it a try.",
    intro: "This is the assistant I can add to your website. Ask it a real question about my offers.",
    figureLabel: "Preview of the assistant: an example conversation.",
    featuresTitle: "What it does",
    features: [
      "Answers questions on offers, timelines and areas",
      "Collects your needs and contact details",
      "Sends me a summary, even in the evening",
      "Never promises anything outside the price list",
    ],
    phone: {
      time: "21:47",
      brand: "KORVO",
      title: "Your business, in the age of AI.",
      text: "Websites, automations and AI assistants for tradespeople, freelancers and small businesses.",
    },
    assistant: {
      name: "Korvo assistant",
      badge: "Demo · AI assistant, answering on Killian's behalf",
      close: "Close",
      question: "Hello, how much is a website for my landscaping business?",
      answer: "Hello! For a showcase website, that's the Essential offer. The exact price is set in the quote, after a 20-minute call.",
      offer: { name: "Essential website", delay: "Live in 2 weeks or more", price: "from €1,400", priceAlt: "CHF\u00a02,000 in Geneva" },
      followUp: "Shall I suggest a time slot to talk it over with Killian?",
      actions: ["Book 20 min", "Leave my number"],
      placeholder: "Write a message…",
      examples: ["How much is a website?", "Do you work in Geneva?", "How long until it's online?"],
      send: "Send",
    },
  },
  keys: {
    title: "The keys stay in your pocket.",
    text: "Domain name, hosting, email addresses, assistant account: everything is set up in your name. I work with access you give me, and that you can take back whenever you like.",
    aside: "If we stop working together, nothing is locked. And your data stays on your accounts.",
    tags: ["Domain name", "Hosting", "Business email", "AI assistant account"],
    tagNote: "in your name",
    commitments: {
      title: "My commitments",
      text: "The automation and the assistant run on your own accounts: your data stays with you.",
      items: [
        { title: "You see your website before you sign", text: "A mockup and a prototype come with the quote." },
        { title: "A fixed price", text: "Set in the quote, it doesn't change." },
        { title: "Extra costs, made clear", text: "Shown before launch, paid directly by you." },
        { title: "A getting-started guide", text: "So you're independent from day one." },
        { title: "Ongoing support, no commitment", text: "Stop whenever you like." },
      ],
    },
  },
  process: {
    title: "From the first call to going live.",
    steps: [
      { title: "Discovery call", text: "20 minutes, booked online. You tell me about your business and what eats up your time." },
      { title: "Understanding your needs", text: "I come back to you with specific questions, and a second call if anything needs clarifying." },
      { title: "Quote + first mockup", text: "A fixed price, and a free prototype so you can see your website before you sign." },
      { title: "Setting up", text: "I walk you through hosting and extra costs. Accounts are created in your name." },
      { title: "Building", text: "Essential: 2 weeks or more. Independent: 3 to 4 weeks." },
      { title: "Launch + guide", text: "Your website goes live, with a getting-started guide so you're independent." },
    ],
    highlightTag: { short: "Free mockup", long: "Free mockup and prototype" },
    ctaNote: "Step 1 takes 20 minutes.",
    cta: "Book the discovery call",
  },
  about: {
    title: ["One point of contact,", "from the first call to ongoing support."],
    portraitAlt: "Killian, by a river, in a green T-shirt, smiling",
    photoCaption: "Killian, between Annecy and Geneva",
    milestones: [
      { title: "Since 2021", text: "I design and build websites and tools." },
      { title: "Obrado", text: "Co-founder and technical lead of this online software." },
      { title: "Startup Weekend", text: "Nominated at the 2025 Annecy edition." },
      { title: "Digital team", text: "At a communication agency in Haute-Savoie: websites and AI automation." },
    ],
    bio: "A developer first, with a real eye for design: I draw the mockups and build what's behind them. Based between Annecy and Geneva, I'm the one you talk to, from the first call to ongoing support.",
    cta: "Book a call with me",
  },
  faq: {
    title: ["Your questions,", "my answers."],
    intro: "Another question? Ask the assistant on this page, or let's talk it through.",
    cta: "Book a call",
    // ⚠️ TO VALIDATE: only the first answer is in the v2 mockup.
    items: [
      {
        question: "How long until my website is ready?",
        answer: "Allow 2 weeks or more for an Essential website, and 3 to 4 weeks for an Independent one. The exact timeline is written in the quote.",
      },
      {
        question: "What do hosting and subscriptions really cost?",
        answer: "You pay them directly, in your name. I give you an estimate before launch, so nothing takes you by surprise.",
      },
      {
        question: "I'm in Switzerland: how does invoicing work?",
        answer: "I invoice in Swiss francs or in euros, whichever you prefer. VAT does not apply: the price in the quote is the price you pay.",
      },
      {
        question: "What if we stop working together?",
        answer: "Nothing is locked. The domain name, hosting, email addresses and assistant account are in your name: you keep everything, and you take back the access you gave me.",
      },
      {
        question: "I'm not comfortable with computers. Is that a problem?",
        answer: "Not at all. I handle the technical side, explain everything in plain words, and you get a getting-started guide at launch. You have one point of contact, from the first call to ongoing support.",
      },
      {
        question: "What does AI actually do for me?",
        answer: "It saves you time on paperwork: your enquiries are sorted and summarised for you, quotes and follow-ups go out on time, and an assistant answers your clients day and night, then sends you a summary.",
      },
    ],
  },
  contact: {
    title: "Let's talk about your business.",
    text: "Pick a 20-minute slot, at lunchtime or in the evening. We'll go over what you need, no jargon.",
    textShort: "A 20-minute slot, at lunchtime or in the evening.",
    otherLabel: "Or, if you prefer:",
    whatsapp: "Message on WhatsApp",
    email: "Send an email",
    calendar: {
      title: "Discovery call",
      meta: "20 min · with Killian",
      placeholder: "The booking calendar will appear here.",
    },
  },
  footer: {
    zonesLabel: "Areas covered",
    zones: "Annecy · Greater Annecy · Haute-Savoie · Geneva · Lake Geneva region",
    tagline: "Independent developer & designer",
    cta: "Book a call",
    siret: "SIRET: 94325886300027",
    vat: "VAT not applicable, art. 293 B of the French tax code",
    legal: "Legal notice",
    copyright: "© 2026 Korvo · Killian Boularand",
  },
  mobileBar: {
    label: "Get in touch",
    book: "Book 20 min",
    whatsapp: "WhatsApp",
  },
};

export default en;
