// Central config — change these values and the whole template rebrands.
// Content lives in /mock/*.ts; design tokens live in app/globals.css.

export type HomeModule =
  | "hero"
  | "sloganMarquee"
  | "impactStats"
  | "petitions"
  | "campaigns"
  | "programmes"
  | "peerFundraising"
  | "getHelpBand"
  | "membership"
  | "gala"
  | "stories"
  | "partners"
  | "transparency"
  | "newsletter"
  | "finalCta";

export type Frequency = "one-time" | "monthly" | "annual";

export const siteConfig = {
  brand: {
    name: "HerVoice Collective",
    shortName: "HerVoice",
    tagline: "Loud for every woman. Safe for every girl.",
    description:
      "HerVoice Collective is a Nigerian women's rights movement ending gender-based violence, delivering free legal aid to survivors, getting women elected and backing girls and women to earn on their own terms.",
    domain: "hervoice.ng",
    email: "hello@hervoice.ng",
    partnershipsEmail: "partners@hervoice.ng",
    pressEmail: "press@hervoice.ng",
    phone: "+234 1 700 4300",
    whatsapp: "+234 809 437 8642",
    whatsappLink: "https://wa.me/2348094378642",
    social: {
      instagram: "https://instagram.com/hervoicecollective",
      x: "https://x.com/hervoice_ng",
      tiktok: "https://tiktok.com/@hervoice.ng",
      facebook: "https://facebook.com/hervoicecollective",
      linkedin: "https://linkedin.com/company/hervoice-collective",
      youtube: "https://youtube.com/@hervoicecollective",
    },
  },

  org: {
    legalName: "HerVoice Collective Initiative",
    registrationNote: "Registered with the Corporate Affairs Commission as an incorporated trustee (Part F, CAMA 2020).",
    taxNote: "Donations support a registered non-profit. Request an official receipt for your employer's matching or CSR records.",
    founded: 2014,
    hq: {
      line1: "14B Adeola Hopewell Street",
      line2: "Victoria Island, Lagos",
      state: "Lagos State, Nigeria",
    },
    chapters: [
      { city: "Lagos (HQ)", address: "14B Adeola Hopewell St, Victoria Island", phone: "+234 1 700 4300" },
      { city: "Abuja", address: "Plot 22, Aminu Kano Crescent, Wuse 2", phone: "+234 9 290 1185" },
      { city: "Port Harcourt", address: "7 Evo Road, GRA Phase 2", phone: "+234 84 461 220" },
      { city: "Kaduna", address: "31 Ali Akilu Road, Unguwan Rimi", phone: "+234 62 245 917" },
    ],
  },

  /** Survivor support — keep numbers verified and current. */
  help: {
    quickExitUrl: "https://www.google.com",
    helpline: "0800 437 8642",
    helplineLabel: "HerVoice Helpline (toll-free, 24/7)",
    emergency: "112",
    whatsappSupport: "+234 809 437 8642",
    sms: "Text HELP to 34210",
  },

  donation: {
    currency: "₦",
    referencePrefix: "HV",
    processingFeeRate: 0.015,
    defaultFrequency: "one-time" as Frequency,
    frequencies: ["one-time", "monthly", "annual"] as Frequency[],
    presets: {
      "one-time": [
        { amount: 5000, impact: "pays for a survivor's transport to a safe space and back to court" },
        { amount: 10000, impact: "funds one hour of a pro-bono lawyer preparing a survivor's case" },
        { amount: 25000, impact: "trains 5 community GBV first-responders in a ward" },
        { amount: 50000, impact: "covers a month of safe-house meals for a mother and two children" },
        { amount: 100000, impact: "seeds a micro-grant that restarts a survivor's small business" },
      ],
      monthly: [
        { amount: 2000, impact: "keeps the 24/7 helpline answered for an hour every month" },
        { amount: 5000, impact: "provides monthly counselling for one survivor" },
        { amount: 10000, impact: "sponsors a girl in our Girls Lead club all year" },
        { amount: 25000, impact: "funds a legal-aid clinic day every month in one state" },
      ],
      annual: [
        { amount: 15000, impact: "is a full HerVoice Member's dues for a year" },
        { amount: 50000, impact: "trains a woman candidate through our Run Sister Run academy" },
        { amount: 120000, impact: "runs a school's Safe Girls club for a full session" },
        { amount: 250000, impact: "funds a full legal case from first report to judgment" },
      ],
    } as Record<Frequency, { amount: number; impact: string }[]>,
    minimum: 500,
    bank: {
      bankName: "Zenith Bank Plc",
      accountName: "HerVoice Collective Initiative",
      accountNumber: "1017 482 936",
      sortCode: "057150013",
      dollarAccount: "5071 228 409 (USD domiciliary, Zenith Bank)",
    },
    ussd: {
      code: "*966*000*1017482936#",
      note: "Dial from any Zenith-linked line, or use your bank's USSD transfer to the account above.",
      banks: [
        { bank: "GTBank", code: "*737*2*AMOUNT*1017482936#" },
        { bank: "Access", code: "*901*AMOUNT*1017482936#" },
        { bank: "First Bank", code: "*894*AMOUNT*1017482936#" },
      ],
    },
  },

  home: {
    // Reorder or remove keys to reshape the homepage.
    modules: [
      "hero",
      "sloganMarquee",
      "petitions",
      "impactStats",
      "campaigns",
      "programmes",
      "peerFundraising",
      "getHelpBand",
      "membership",
      "gala",
      "stories",
      "transparency",
      "partners",
      // "newsletter" — optional; the footer already carries a signup form.
      "finalCta",
    ] as HomeModule[],
    hero: {
      kicker: "Nigeria's women's rights movement",
      title: ["Loud", "for every", "woman."],
      lede: "We end gender-based violence, defend survivors in court, put women on the ballot and back girls to build their own futures. 62,000 supporters strong — and counting.",
      primary: { label: "Sign the petition", href: "/petitions/pass-the-vapp-in-every-state" },
      secondary: { label: "Donate", href: "/donate" },
    },
  },

  slogans: [
    "Her body, her voice",
    "Believe survivors",
    "Pass the VAPP Act in every state",
    "35% of seats, not 4%",
    "Girls belong in school",
    "No justice, no silence",
    "Run Sister Run",
    "Safe streets, safe homes",
  ],

  newsletter: {
    title: "Get the Friday Rally",
    lede: "One email a week: a petition to sign, a win to celebrate, a survivor's story told with consent. No spam, unsubscribe anytime.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
