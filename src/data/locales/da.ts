export const da = {
  // Navigation & General
  nav: {
    projects: "Projekter",
    about: "Om os",
    contact: "Kontakt",
    cta: "Start et projekt",
    home: "Forside",
    openMenu: "Åbn menu",
    closeMenu: "Luk menu",
    ariaHome: "RNS APPS forsiden",
  },
  footer: {
    about: "Skræddersyet software med løbende udvikling og vedligehold — én partner fra start til drift.",
    links: "Links",
    contact: "Kontakt",
    rights: "Alle rettigheder forbeholdes.",
    legal: "Privatlivsvilkår",
  },

  // Homepage Copy
  hero: {
    subtitle: "Løftet:",
    proofLine: "Én teknisk partner — fra idé til drift og videre",
    headlineBefore: "Fuldt ejerskab af jeres ",
    headlineHighlight: "digitale løsninger & AI",
    headlineAfter: " — med løbende drift og videreudvikling.",
    ctaPrimary: "Start et projekt",
    ctaSecondary: "Udforsk projekter",
    scrollHint: "Scroll for at udforske",
  },
  cards: [
    {
      title: "Skræddersyet software",
      body: "Udvikling af minimalistiske, højtydende systemer og AI-løsninger, der løser konkrete workflow-udfordringer — og løbende forbedres, så jeres virksomhed kan fokusere på vækst.",
      icon: "code" as const,
    },
    {
      title: "AI-strategi & rådgivning",
      body: "Et langsigtet teknisk partnerskab frem for kortsigtede engangsleverancer. Strategisk rådgivning og løbende sparring i takt med at forretningen udvikler sig.",
      icon: "sparkles" as const,
    },
    {
      title: "Integration & drift",
      body: "Ansvar for implementering, vedligehold og videreudvikling. Slip for bekymringer om drift, opdateringer og teknisk support med en stabil driftspartner.",
      icon: "shield" as const,
    },
  ],
  services: {
    label: "Ydelser",
    headline: "Tre spor. Ét langsigtet partnerskab.",
    intro:
      "Fokus er på langvarige relationer frem for engangsprojekter. Efter lancering fortsætter samarbejdet med løbende udvikling, vedligehold og optimering, så det tekniske fundament altid er sikret.",
  },
  featuredWork: {
    label: "Udvalgt arbejde",
    headline: "Løsninger i løbende drift",
    intro: "Projekterne slutter ikke ved lancering. De holdes kørende og optimeres løbende i tæt samarbejde med forretningen.",
  },
  about: {
    label: "Om os",
    headline: "To partnere. Én passion.",
    intro:
      "Vi er Luu og Jens. Vi bygger software med det langsigtede mål at blive jeres faste tekniske partner — også efter go-live, når vedligehold og videreudvikling begynder.",
    philosophyTitle: "Vores filosofi",
    philosophy:
      "Vi tror på, at den bedste software skabes i et tæt, langvarigt partnerskab. Derfor lytter vi, forstår og følger med, når jeres forretning vokser — med vedligehold og videreudvikling inkluderet i relationen, så I slipper for at skulle tænke på det selv.",
    teamTitle: "Mød holdet",
    team: [
      {
        name: "Luu Ninh",
        bio: "Medstifter af RNS APPS med fokus på behovsafklaring, brugeroplevelse og projektforløb. Luu sørger for, at jeres idéer og forretningsmål omsættes til et klart visuelt koncept, og leder processen fra designudkast til et færdigt produkt, som jeres brugere vil elske at interagere med.",
      },
      {
        name: "Jens Olsen",
        bio: "Medstifter af RNS APPS med fokus på driftssikkerhed, teknisk levering og stabilitet. Jens sikrer, at løsningerne bygges solidt, kører uden afbrydelser og kan skalere i takt med jeres forretning, så I får en stabil platform, I altid kan stole på.",
      },
    ],
  },
  finale: {
    label: "Næste skridt",
    headline: "Klar til en fast teknisk partner, der sikrer softwarens fremtid?",
    cta: "Tag kontakt",
  },
  contactSection: {
    title: "Start dialogen om jeres næste projekt",
    description:
      "Beskriv projektets behov. Herfra afklares omfang, budget og hvordan et løbende samarbejde om udvikling og drift sikrer en stabil fremtid.",
  },
  projects: [
    {
      title: "Klub-app til padelcenter",
      summary: "Medlemsplatform som progressiv web-app",
      description:
        "En medlemsorienteret app, hvor brugere kan håndtere profil, booking og klubliv fra mobil og desktop. Løsningen er installerbar som PWA og bygget til stabil drift i en travl hverdag.",
      tags: ["PWA", "Medlemsportal", "Booking"],
    },
    {
      title: "Betalingsløsning til facilitet",
      summary: "Self-service på iPad",
      description:
        "En enkel betalingsoplevelse til brug på stedet — designet så gæster kan gennemføre køb uden manuel kassebetjening. Fokus på tydelig brugerflade, hurtig gennemførsel og pålidelig drift.",
      tags: ["iPad", "Self-service", "POS"],
    },
    {
      title: "Digital scorecard til golf",
      summary: "Webløsning til nichegolfbaner",
      description:
        "Et digitalt scorecard, der erstatter papir og gør det nemt for spillere at registrere og følge runder. Bygget til enkel brug på banen og med overblik over resultater over tid.",
      tags: ["Webapp", "Sport", "Scorecard"],
    },
  ],

  // Project Planner
  planner: {
    steps: {
      service: "Service",
      budget: "Omfang & Budget",
      timeline: "Tidsramme",
      contact: "Kontakt",
    },
    step1: {
      title: "Hvad kan vi hjælpe jer med?",
      description: "Vælg den primære ydelse, I har brug for. I kan uddybe detaljerne senere.",
      options: {
        software: {
          title: "Software",
          desc: "Skræddersyede webapplikationer, mobile apps og platformsudvikling.",
        },
        ai: {
          title: "AI Integration",
          desc: "Rådgivning, integration af LLM'er og intelligent automatisering.",
        },
        ops: {
          title: "Integration & drift",
          desc: "Implementering, systemintegration og løbende drift af jeres løsninger.",
        },
      },
    },
    step2: {
      title: "Omfang & Budget",
      description: "Vælg det budgetleje og omfang, der passer bedst til jeres projekt.",
      sizeLabel: "Estimeret projektstørrelse",
      sizes: {
        small: "Lille (MVP)",
        medium: "Mellem",
        large: "Stort",
      },
      budgetLabel: "Investeringsramme (DKK)",
    },
    step3: {
      title: "Hvornår vil I i luften?",
      description: "Vælg jeres foretrukne tidshorisont for levering af projektet.",
      options: {
        asap: "Hurtigst muligt (Under 1 måned)",
        medium: "1 - 3 måneder",
        long: "3 - 6 måneder",
        flexible: "Løbende partnerskab / Fleksibel",
      },
    },
    step4: {
      title: "Fortæl os om jeres projekt",
      description: "Vi har næsten alt, hvad vi skal bruge. Udfyld kontaktinformationerne nedenfor.",
      fields: {
        name: "Navn *",
        email: "Email *",
        company: "Virksomhed",
        phone: "Telefonnummer",
        desc: "Yderligere kommentarer / Projektbeskrivelse *",
        placeholder: "Skriv gerne lidt om jeres vision, teknologi-tanker eller andre ønsker...",
      },
    },
    buttons: {
      prev: "Tilbage",
      next: "Næste trin",
      submit: "Indsend planer",
    },
    emailTemplate: {
      subject: "Projekt Planner",
      intro: "Projekt Planner - RNS APPS",
      serviceLabel: "1. YDELSE",
      scopeLabel: "2. PROJEKTRAMME",
      scopeValue: "Estimeret omfang",
      budgetValue: "Investeringsramme",
      timelineLabel: "3. TIDSHORISONT",
      timelineValue: "Ønsket tidsramme",
      contactLabel: "4. KONTAKTINFORMATION",
      contactName: "Navn",
      contactEmail: "Email",
      contactPhone: "Telefon",
      contactCompany: "Virksomhed",
      descLabel: "5. BESKRIVELSE",
      notSpecified: "Ikke angivet",
    },
  },
  dataSletning: {
    metaTitle: "Anmodning om datasletning",
    title: "Anmodning om ",
    titleHighlight: "Datasletning",
    subtitle: "Her kan du anmode om sletning af din konto og tilknyttede data fra vores apps.",
    howToTitle: "Sådan anmoder du om sletning",
    howToText: "For at anmode om sletning af din konto og dine personlige data, bedes du sende en e-mail til den angivne adresse. Dette link vil automatisk udfylde emnefeltet.",
    btnText: "Send anmodning via e-mail",
    importantTitle: "Vigtig information",
    bullets: [
      "Din anmodning skal tydeligt referere til dit brugernavn eller din e-mailadresse, som er tilknyttet din konto, samt hvilken app anmodningen vedrører.",
      "Følgende data slettes: brugerprofil, aktivitetslog, indlæg og andre personlige oplysninger.",
      "Visse data, som f.eks. transaktionshistorik, kan blive opbevaret i en yderligere periode af juridiske eller bogføringsmæssige årsager."
    ],
    smashText1: "Bruger du ",
    smashText2: "-appen, kan du også anvende ",
    smashLinkText: "den dedikerede sletningsside"
  },
  smashDataSletning: {
    metaTitle: "SMASH Padelcenter - Anmodning om datasletning",
    title: "Anmodning om ",
    titleHighlight: "Datasletning",
    subtitle: "Her kan du anmode om sletning af din konto og tilknyttede data.",
    appInfoTitle: "App Information",
    appNameLabel: "App navn:",
    appIdLabel: "App ID:",
    companyLabel: "Virksomhed:",
    howToTitle: "Sådan anmoder du om sletning",
    howToText: "For at anmode om sletning af din konto og dine personlige data fra <strong class=\"text-white\">SMASH Padelcenter</strong> appen, bedes du sende en e-mail til den angivne adresse. Dette link vil automatisk udfylde emnefeltet.",
    btnText: "Send anmodning via e-mail",
    importantTitle: "Vigtig information",
    bullets: [
      "Din anmodning skal tydeligt referere til dit brugernavn eller din e-mailadresse, som er tilknyttet din konto i <strong class=\"text-gray-300\">SMASH Padelcenter</strong> appen.",
      "Følgende data slettes: brugerprofil, aktivitetslog, indlæg og andre personlige oplysninger.",
      "Visse data, som f.eks. transaktionshistorik, kan blive opbevaret i en yderligere periode af juridiske eller bogføringsmæssige årsager."
    ],
    footerText: "For appen <strong class=\"text-gray-300\">SMASH Padelcenter</strong> (dk.rnsapps.smash)"
  },
} as const;
