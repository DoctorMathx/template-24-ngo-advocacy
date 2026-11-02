import type { Campaign } from "@/lib/types";
import { img } from "@/lib/utils";
import { photos } from "./images";

export const campaigns: Campaign[] = [
  {
    slug: "16-days-safe-homes",
    title: "16 Days: Safe Homes Appeal",
    tagline: "Open two new safe spaces before the year ends.",
    category: "End GBV",
    image: img(photos.womanAfroStudio),
    tone: "magenta",
    goal: 45_000_000,
    raised: 31_640_000,
    donors: 2_184,
    endDate: "2026-12-10",
    programme: "end-gbv",
    summary:
      "Every night our Lagos and Abuja safe spaces turn women away for lack of beds. This 16 Days of Activism we're raising ₦45m to open two new safe homes in Port Harcourt and Kaduna.",
    story: [
      "Between 25 November and 10 December, the world marks 16 Days of Activism against Gender-Based Violence. This year we want to mark it with something concrete: 40 more beds.",
      "In 2025 our helpline counsellors referred 612 women to emergency shelter. We could place 388. The rest were sent to relatives, churches, police stations — or back home. Each of those calls is a woman who asked for help at the most dangerous moment of her life.",
      "The two new homes in Port Harcourt and Kaduna will each house 20 women and their children for up to 90 days, with a nurse, a counsellor, a lawyer on call and a childcare worker. Rent, furnishing and the first year of running costs come to ₦45m.",
    ],
    updates: [
      { date: "2026-10-20", title: "Kaduna building secured", body: "We've signed a two-year lease on a discreet compound in Kaduna — thank you to the 400 donors who gave in the first week." },
      { date: "2026-10-02", title: "Matched giving unlocked", body: "Our partners at Meridian Bank Foundation will match every gift up to ₦10m until 25 November." },
      { date: "2026-09-15", title: "Appeal launched", body: "Survivors, staff and supporters launched the appeal at our Lagos office." },
    ],
    budget: [
      { label: "Rent & safe-home set-up", pct: 34 },
      { label: "Counsellors, nurse & childcare staff", pct: 38 },
      { label: "Food, hygiene & children's needs", pct: 18 },
      { label: "Security & transport", pct: 10 },
    ],
    recentDonors: [
      { name: "Adaeze O.", amount: 25_000, ago: "12 minutes ago", message: "For every woman who called and couldn't be placed." },
      { name: "Anonymous", amount: 100_000, ago: "1 hour ago" },
      { name: "Tunde & Bisi A.", amount: 50_000, ago: "3 hours ago", message: "In memory of Aunty Rose." },
      { name: "Hauwa M.", amount: 10_000, ago: "5 hours ago" },
      { name: "Lekki Rotaract Club", amount: 250_000, ago: "yesterday" },
    ],
  },
  {
    slug: "justice-fund-2026",
    title: "The Justice Fund",
    tagline: "No survivor drops her case because she's broke.",
    category: "Legal Aid",
    image: img(photos.justice),
    tone: "plum",
    goal: 30_000_000,
    raised: 12_870_000,
    donors: 963,
    endDate: "2027-03-08",
    programme: "legal-aid",
    summary:
      "Court fees, medical reports, transport for witnesses, transcripts. A single GBV case costs ₦240,000 on average. The Justice Fund pays for 125 survivors' cases this year.",
    story: [
      "When Chiamaka reported her stepfather, the police asked her mother for ₦35,000 'to move the case'. The hospital wanted ₦18,000 for the medical report. Two weeks later the family withdrew.",
      "That story repeats thousands of times a year. Survivors aren't losing in court — they never get there. The Justice Fund covers every out-of-pocket cost of a case so that the only thing a survivor has to bring is her truth.",
      "Every naira is ring-fenced, tracked case by case and reported to donors quarterly.",
    ],
    updates: [
      { date: "2026-10-11", title: "Landmark conviction in Kaduna", body: "A case funded by the Justice Fund ended in a 21-year sentence — the first under Kaduna's domesticated VAPP law." },
      { date: "2026-08-30", title: "48 cases funded so far", body: "Including 11 cases of child sexual abuse and 6 workplace harassment suits." },
    ],
    budget: [
      { label: "Court & filing fees", pct: 28 },
      { label: "Medical & forensic reports", pct: 22 },
      { label: "Witness & survivor transport", pct: 18 },
      { label: "Lawyer stipends & case management", pct: 32 },
    ],
    recentDonors: [
      { name: "Ifeoma N.", amount: 20_000, ago: "40 minutes ago", message: "Lawyer here. Proud to support." },
      { name: "Anonymous", amount: 5_000, ago: "2 hours ago" },
      { name: "Kunle D.", amount: 15_000, ago: "6 hours ago" },
      { name: "Aisha B.", amount: 30_000, ago: "yesterday", message: "For Chiamaka and every girl like her." },
    ],
  },
  {
    slug: "run-sister-run-2027",
    title: "Run Sister Run 2027",
    tagline: "Train and protect 150 women candidates for the 2027 elections.",
    category: "Women in Power",
    image: img(photos.microphone),
    tone: "tangerine",
    goal: 60_000_000,
    raised: 22_300_000,
    donors: 1_406,
    endDate: "2027-01-31",
    programme: "women-in-power",
    summary:
      "The 2027 general elections are our best shot in a generation at doubling women's representation. We're training 150 candidates and funding a safety net for women who face threats on the trail.",
    story: [
      "In 2023, 92% of women who contested for the House of Representatives lost — many in party primaries where the 'nomination fee' alone was ₦10m and violence was common.",
      "Run Sister Run 2027 gives 150 women from all 36 states and the FCT twelve weeks of training, a mentor who has won, a media kit and access to our Candidate Safety Fund.",
    ],
    updates: [
      { date: "2026-10-05", title: "Applications closed: 1,920 women applied", body: "Selection panels are meeting in each geopolitical zone." },
    ],
    budget: [
      { label: "Bootcamps & mentoring", pct: 45 },
      { label: "Candidate Safety Fund", pct: 30 },
      { label: "Media & digital training", pct: 15 },
      { label: "Monitoring of primaries", pct: 10 },
    ],
    recentDonors: [
      { name: "Grace E.", amount: 50_000, ago: "2 hours ago", message: "From one politician's daughter to the next generation." },
      { name: "Anonymous", amount: 20_000, ago: "5 hours ago" },
      { name: "Zainab Y.", amount: 10_000, ago: "yesterday" },
    ],
  },
  {
    slug: "back-to-school-girls",
    title: "Back to School, Girls",
    tagline: "Keep 2,000 girls in class this term.",
    category: "Girls & Economic Power",
    image: img(photos.classroom),
    tone: "magenta",
    goal: 20_000_000,
    raised: 17_150_000,
    donors: 1_822,
    endDate: "2026-11-30",
    programme: "girls-and-economic-power",
    summary:
      "₦10,000 covers a girl's uniform, sandals, sanitary pads and exam fees for a term. We're 86% of the way to keeping 2,000 girls in school.",
    story: [
      "When money is tight, girls are the first pulled from school — to trade, to babysit, to marry. Our bursaries keep them in class, and our Safe Girls clubs keep them safe while they're there.",
    ],
    updates: [
      { date: "2026-10-18", title: "1,700 girls kitted out", body: "Uniforms and pad packs delivered to 41 schools in Kaduna and Kano." },
    ],
    budget: [
      { label: "Exam & PTA fees", pct: 40 },
      { label: "Uniforms & sandals", pct: 30 },
      { label: "Sanitary pad packs", pct: 20 },
      { label: "Distribution & monitoring", pct: 10 },
    ],
    recentDonors: [
      { name: "Mrs. Okafor's JSS2 class", amount: 36_500, ago: "1 hour ago", message: "We saved our lunch money!" },
      { name: "Femi A.", amount: 10_000, ago: "4 hours ago" },
      { name: "Anonymous", amount: 200_000, ago: "yesterday" },
    ],
  },
];

export const getCampaign = (slug: string) => campaigns.find((c) => c.slug === slug);
