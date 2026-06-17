export const en = {
  // Navigation & General
  nav: {
    projects: "Projects",
    about: "About us",
    contact: "Contact",
    cta: "Start a project",
    home: "Home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    ariaHome: "RNS APPS homepage",
  },
  footer: {
    about: "Custom software with ongoing development and maintenance — one partner from start to operation.",
    links: "Links",
    contact: "Contact",
    rights: "All rights reserved.",
    legal: "Privacy Policy",
  },

  // Homepage Copy
  hero: {
    subtitle: "The Promise:",
    proofLine: "One technical partner — from idea to operation and beyond",
    headlineBefore: "Full ownership of your ",
    headlineHighlight: "digital solutions & AI",
    headlineAfter: " — with continuous operations and further development.",
    ctaPrimary: "Start a project",
    ctaSecondary: "Explore projects",
    scrollHint: "Scroll to explore",
  },
  cards: [
    {
      title: "Custom software",
      body: "Development of minimalist, high-performance systems and AI solutions solving concrete workflow challenges — continuously improved, allowing your business to focus on growth.",
      icon: "code" as const,
    },
    {
      title: "AI strategy & consulting",
      body: "A long-term technical partnership instead of short-term one-off deliveries. Strategic consulting and ongoing sparring as your business evolves.",
      icon: "sparkles" as const,
    },
    {
      title: "Integration & operations",
      body: "Responsibility for implementation, maintenance, and further development. Free your business from operational worries, updates, and technical support with a stable operations partner.",
      icon: "shield" as const,
    },
  ],
  services: {
    label: "Services",
    headline: "Three tracks. One long-term partnership.",
    intro:
      "Our focus is on long-term relationships rather than one-off projects. After launch, the partnership continues with ongoing development, maintenance, and optimization, ensuring your technical foundation is always secure.",
  },
  featuredWork: {
    label: "Featured work",
    headline: "Solutions in active operation",
    intro: "Projects do not end at launch. They are kept running and optimized continuously in close collaboration with the business.",
  },
  about: {
    label: "About us",
    headline: "Two partners. One passion.",
    intro:
      "We are Luu and Jens. We build software with the long-term goal of becoming your dedicated technical partner — also after go-live, when maintenance and further development begin.",
    philosophyTitle: "Our philosophy",
    philosophy:
      "We believe that the best software is created in a close, long-term partnership. That is why we listen, understand, and evolve alongside your business — with maintenance and further development included in the relationship, freeing you from having to think about it yourself.",
    teamTitle: "Meet the team",
    team: [
      {
        name: "Luu Ninh",
        bio: "Co-founder of RNS APPS with a focus on requirements scoping, user experience, and project workflows. Luu ensures that your ideas and business goals are translated into a clear visual concept, leading the process from design drafts to a finished product that your users will love interacting with.",
      },
      {
        name: "Jens Olsen",
        bio: "Co-founder of RNS APPS with a focus on reliability, technical delivery, and stability. Jens ensures that solutions are built soundly, run without interruptions, and scale alongside your business, providing a stable platform you can always rely on.",
      },
    ],
  },
  finale: {
    label: "Next step",
    headline: "Ready for a permanent technical partner that secures the future of your software?",
    cta: "Get in touch",
  },
  contactSection: {
    title: "Start the dialogue about your next project",
    description:
      "Describe your project's needs. From here we align on scope, budget, and how a long-term collaboration on development and operations can free you from technical worries in the future.",
  },
  projects: [
    {
      title: "Club app for padel center",
      summary: "Membership platform as progressive web app",
      description:
        "A member-oriented app where users can manage their profile, bookings, and club activity from mobile and desktop. The solution is installable as a PWA and built for reliable operation in a busy daily environment.",
      tags: ["PWA", "Member Portal", "Booking"],
    },
    {
      title: "Facility payment solution",
      summary: "Self-service on iPad",
      description:
        "A simple on-site payment experience designed for guests to complete purchases without manual checkout. Focused on a clear interface, fast completion, and reliable operation.",
      tags: ["iPad", "Self-service", "POS"],
    },
    {
      title: "Digital scorecard for golf",
      summary: "Web solution for niche golf courses",
      description:
        "A digital scorecard replacing paper, making it easy for players to register and track rounds. Built for simple use on the course with historical results overview.",
      tags: ["Webapp", "Sport", "Scorecard"],
    },
  ],

  // Project Planner
  planner: {
    steps: {
      service: "Service",
      budget: "Scope & Budget",
      timeline: "Timeline",
      contact: "Contact",
    },
    step1: {
      title: "How can we help you?",
      description: "Choose the primary service you need. You can elaborate on the details later.",
      options: {
        software: {
          title: "Software",
          desc: "Tailored web applications, mobile apps, and platform development.",
        },
        ai: {
          title: "AI Integration",
          desc: "Consulting, integration of LLMs, and intelligent automation.",
        },
        ops: {
          title: "Integration & operations",
          desc: "Implementation, systems integration, and ongoing operation of your solutions.",
        },
      },
    },
    step2: {
      title: "Scope & Budget",
      description: "Choose the budget level and scope that best fits your project.",
      sizeLabel: "Estimated project size",
      sizes: {
        small: "Small (MVP)",
        medium: "Medium",
        large: "Large",
      },
      budgetLabel: "Investment Range (DKK)",
    },
    step3: {
      title: "When do you want to launch?",
      description: "Choose your preferred timeline for project delivery.",
      options: {
        asap: "As soon as possible (Under 1 month)",
        medium: "1 - 3 months",
        long: "3 - 6 months",
        flexible: "Ongoing partnership / Flexible",
      },
    },
    step4: {
      title: "Tell us about your project",
      description: "We have almost everything we need. Fill in the contact details below.",
      fields: {
        name: "Name *",
        email: "Email *",
        company: "Company",
        phone: "Phone Number",
        desc: "Additional comments / Project description *",
        placeholder: "Feel free to write a bit about your vision, technology thoughts, or other requests...",
      },
    },
    buttons: {
      prev: "Back",
      next: "Next step",
      submit: "Submit plans",
    },
    emailTemplate: {
      subject: "Project Planner",
      intro: "Project Planner - RNS APPS",
      serviceLabel: "1. SERVICE",
      scopeLabel: "2. PROJECT SCOPE",
      scopeValue: "Estimated scope",
      budgetValue: "Investment range",
      timelineLabel: "3. TIMELINE",
      timelineValue: "Desired timeline",
      contactLabel: "4. CONTACT INFORMATION",
      contactName: "Name",
      contactEmail: "Email",
      contactPhone: "Phone",
      contactCompany: "Company",
      descLabel: "5. DESCRIPTION",
      notSpecified: "Not specified",
    },
  },
  dataSletning: {
    metaTitle: "Data Deletion Request",
    title: "Request for ",
    titleHighlight: "Data Deletion",
    subtitle: "Here you can request the deletion of your account and associated data from our apps.",
    howToTitle: "How to request deletion",
    howToText: "To request deletion of your account and personal data, please send an email to the address below. This link will automatically pre-fill the subject line.",
    btnText: "Send request via email",
    importantTitle: "Important information",
    bullets: [
      "Your request must clearly refer to your username or email address associated with your account, and state which app the request concerns.",
      "The following data will be deleted: user profile, activity log, posts, and other personal information.",
      "Certain data, such as transaction history, may be retained for an additional period for legal or accounting reasons."
    ],
    smashText1: "If you use the ",
    smashText2: " app, you can also use ",
    smashLinkText: "the dedicated deletion page"
  },
  smashDataSletning: {
    metaTitle: "SMASH Padelcenter - Data Deletion Request",
    title: "Request for ",
    titleHighlight: "Data Deletion",
    subtitle: "Here you can request the deletion of your account and associated data.",
    appInfoTitle: "App Information",
    appNameLabel: "App Name:",
    appIdLabel: "App ID:",
    companyLabel: "Company:",
    howToTitle: "How to request deletion",
    howToText: "To request deletion of your account and personal data from the <strong class=\"text-white\">SMASH Padelcenter</strong> app, please send an email to the address below. This link will automatically pre-fill the subject line.",
    btnText: "Send request via email",
    importantTitle: "Important information",
    bullets: [
      "Your request must clearly refer to your username or email address associated with your account in the <strong class=\"text-gray-300\">SMASH Padelcenter</strong> app.",
      "The following data will be deleted: user profile, activity log, posts, and other personal information.",
      "Certain data, such as transaction history, may be retained for an additional period for legal or accounting reasons."
    ],
    footerText: "For the app <strong class=\"text-gray-300\">SMASH Padelcenter</strong> (dk.rnsapps.smash)"
  },
} as const;
