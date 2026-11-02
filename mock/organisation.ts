import type { Faq, MembershipTier, Person } from "@/lib/types";
import { img } from "@/lib/utils";
import { photos } from "./images";

/* ---------- People ---------- */
export const team: Person[] = [
  { name: "Dr. Amaka Obi-Nwosu", role: "Executive Director", initials: "AO", image: img(photos.womanMagenta, 600), bio: "Human-rights lawyer and former UN Women adviser. Co-founded HerVoice in 2014 after a decade defending survivors pro bono." },
  { name: "Barr. Rakiya Suleiman", role: "Head of Legal Aid & Kaduna Chapter Lead", initials: "RS", image: img(photos.womanAfroStudio, 600), bio: "Leads our 86-lawyer network and strategic litigation docket." },
  { name: "Halima Yusuf", role: "Director of Campaigns", initials: "HY", image: img(photos.womanPinkWall, 600), bio: "Organiser behind the VAPP petition and Orange the Streets. Formerly digital lead at a pan-African campaign group." },
  { name: "Chinedu Okeke", role: "Director of Finance & Operations", initials: "CO", image: img(photos.manPortrait, 600), bio: "Chartered accountant (ICAN). Runs our audits, grant compliance and restricted-funds tracking." },
  { name: "Zainab Abdullahi", role: "Girls Programmes Manager", initials: "ZA", image: img(photos.womanWhite, 600), bio: "Built Safe Girls clubs from 4 schools to 64." },
  { name: "Ebiere Tonye", role: "Port Harcourt Chapter Lead", initials: "ET", image: img(photos.womanAfroStreet, 600), bio: "Social worker and counsellor; runs our Rivers safe space and market clinics." },
];

export const board: Person[] = [
  { name: "Hon. Justice Folake Adebiyi (rtd.)", role: "Chair, Board of Trustees", initials: "FA", bio: "Retired Justice of the Court of Appeal." },
  { name: "Mrs. Nkechi Balogun", role: "Treasurer", initials: "NB", bio: "Former CFO, pan-African telecoms group. Chairs the Finance & Audit Committee." },
  { name: "Prof. Aishatu Garba", role: "Trustee", initials: "AG", bio: "Professor of Gender Studies, Ahmadu Bello University." },
  { name: "Mr. Olumide Bakare", role: "Trustee", initials: "OB", bio: "Managing Partner at a Lagos law firm; leads our pro-bono partnerships." },
  { name: "Dr. Ijeoma Uche", role: "Trustee & Safeguarding Lead", initials: "IU", bio: "Consultant psychiatrist specialising in trauma." },
  { name: "Ms. Temitope Ade", role: "Trustee (Youth seat)", initials: "TA", bio: "Elected by HerVoice members, aged 24. Student organiser." },
];

export const history = [
  { year: "2014", title: "Born in a living room", body: "Five lawyers and two survivors start a WhatsApp group to fund a single court case in Lagos." },
  { year: "2016", title: "Legal-aid network launches", body: "20 pro-bono lawyers sign up. The first market clinic opens at Oshodi." },
  { year: "2018", title: "Run Sister Run", body: "Our first candidate academy trains 30 women for the 2019 elections — 6 win." },
  { year: "2019", title: "First safe space", body: "A 12-bed safe space opens in Lagos with a toll-free helpline." },
  { year: "2021", title: "Four chapters", body: "Abuja, Port Harcourt and Kaduna chapters launch; Safe Girls clubs reach 20 schools." },
  { year: "2024", title: "Women's Micro-grant Fund", body: "Launched with founding donors to break the economic chains of abuse." },
  { year: "2026", title: "62,000 supporters", body: "Our biggest year yet: two safe homes opening, 83,000+ petition signatures and counting." },
];

export const values = [
  { title: "Survivors lead", body: "Nothing about survivors without survivors. Consent comes first — in services and in stories." },
  { title: "Loud & strategic", body: "We make noise where it moves power, and we do the paperwork that makes wins stick." },
  { title: "Every woman", body: "Rural and urban, Muslim and Christian, disabled, young, old. Intersectional by default." },
  { title: "Radically accountable", body: "Audited accounts, published budgets and restricted funds tracked to the naira." },
];

/* ---------- Membership ---------- */
export const membershipTiers: MembershipTier[] = [
  { id: "student", name: "Student", price: 5_000, blurb: "For students and under-25s organising on campus.", benefits: ["Member card & sticker pack", "Vote at the AGM", "Campus organising toolkit", "Members-only WhatsApp community"] },
  { id: "member", name: "Member", price: 15_000, blurb: "The heart of the collective.", featured: true, benefits: ["Everything in Student", "Quarterly members' briefing", "Early access to gala tickets", "Join a chapter working group"] },
  { id: "champion", name: "Champion", price: 50_000, blurb: "Fuel the movement and lead locally.", benefits: ["Everything in Member", "Champion-only strategy calls", "Name in the Annual Report", "Invite to the Champions' Breakfast"] },
  { id: "patron", name: "Patron", price: 250_000, blurb: "Sustain our legal-aid and safe-home work.", benefits: ["Everything in Champion", "Two gala VIP seats", "Annual site visit to a programme", "Personal impact report from the ED"] },
];

export const memberBenefits = [
  { title: "A real vote", body: "Members elect the youth trustee and vote on our campaign priorities at the AGM." },
  { title: "Training", body: "Free organiser training: petitions, protests, media, digital safety." },
  { title: "Community", body: "Chapter meet-ups, reading circles and a members-only WhatsApp space." },
  { title: "Visibility", body: "Wear the badge. Rep the movement on campus, at work and online." },
];

/* ---------- Partners & funders ---------- */
export const partners = [
  { name: "Meridian Bank Foundation", type: "Corporate · Matched giving" },
  { name: "Amani Women's Fund", type: "Foundation" },
  { name: "Nordic Rights Trust", type: "Bilateral grant" },
  { name: "Lagos Bar Women's Forum", type: "Pro-bono partner" },
  { name: "Kora Telecoms", type: "Corporate · Toll-free helpline" },
  { name: "Sahel Futures Foundation", type: "Foundation" },
  { name: "Ivory & Gold Law LLP", type: "Pro-bono partner" },
  { name: "Ubuntu Collective Fund", type: "Pooled fund" },
];

export const partnershipTiers = [
  { name: "Programme Partner", range: "₦5m – ₦25m / yr", body: "Fund a defined programme line (e.g. a legal-aid clinic, a Safe Girls cohort) with quarterly reporting.", perks: ["Quarterly narrative & financial reports", "Site visit", "Co-branded impact story"] },
  { name: "Strategic Partner", range: "₦25m – ₦100m / yr", body: "Multi-year, flexible or core funding that lets us respond fast and litigate strategically.", perks: ["Annual audited statements", "Seat on our Partners' Advisory Circle", "Gala Gold table", "Joint advocacy moments"] },
  { name: "Employee Giving & CSR", range: "Any size", body: "Payroll giving, matched donations, staff volunteering and workplace GBV-policy training.", perks: ["Matched-giving dashboard", "Workplace safety training", "Staff fundraising pages"] },
  { name: "In-kind & Pro-bono", range: "Services", body: "Legal, telecoms, transport, media and tech. Our helpline runs on a donated toll-free line.", perks: ["Recognition in Annual Report", "Impact data on your contribution"] },
];

/* ---------- Financials (FY2025, audited) ---------- */
export const financials = {
  year: "FY 2025",
  totalIncome: 1_284_000_000,
  totalExpenditure: 1_196_000_000,
  auditor: "Adekunle, Hassan & Co. (Chartered Accountants)",
  income: [
    { label: "Foundations & bilateral grants", value: 548_000_000 },
    { label: "Individual donors (one-off & monthly)", value: 312_000_000 },
    { label: "Corporate partners & CSR", value: 186_000_000 },
    { label: "Gala & events", value: 128_000_000 },
    { label: "Membership dues", value: 64_000_000 },
    { label: "Peer-to-peer fundraisers", value: 46_000_000 },
  ],
  expenses: [
    { label: "End GBV (helpline, safe spaces, responders)", value: 412_000_000, tone: "magenta" as const },
    { label: "Justice & Legal Aid", value: 287_000_000, tone: "plum" as const },
    { label: "Women in Power", value: 168_000_000, tone: "tangerine" as const },
    { label: "Girls & Economic Power", value: 191_000_000, tone: "pink" as const },
    { label: "Fundraising", value: 72_000_000, tone: "muted" as const },
    { label: "Administration & governance", value: 66_000_000, tone: "muted2" as const },
  ],
  perThousand: [
    { naira: 885, label: "goes straight to programmes for women and girls" },
    { naira: 60, label: "raises the next ₦1,000 (fundraising)" },
    { naira: 55, label: "keeps the lights on, audited and accountable" },
  ],
  reports: [
    { title: "Annual Report 2025", size: "PDF · 6.2 MB" },
    { title: "Audited Financial Statements 2025", size: "PDF · 1.4 MB" },
    { title: "Annual Report 2024", size: "PDF · 5.8 MB" },
    { title: "Audited Financial Statements 2024", size: "PDF · 1.3 MB" },
    { title: "Safeguarding Policy (rev. 2026)", size: "PDF · 420 KB" },
    { title: "Anti-fraud & Whistleblowing Policy", size: "PDF · 310 KB" },
  ],
  governance: [
    { title: "Registered", body: "Incorporated trustee with the Corporate Affairs Commission." },
    { title: "Audited annually", body: "Independent external audit; statements filed with CAC and SCUML." },
    { title: "Restricted funds", body: "Campaign and grant money is ring-fenced and reported line by line." },
    { title: "Safeguarding", body: "Trustee-level safeguarding lead; every staffer and volunteer is vetted and trained." },
  ],
};

/* ---------- Impact ---------- */
export const impactStats = [
  { value: "62,000+", label: "supporters in the movement" },
  { value: "18,400", label: "helpline calls answered last year" },
  { value: "2,140", label: "survivors given a free lawyer" },
  { value: "57", label: "alumnae now in elected office" },
  { value: "940", label: "micro-grants to women" },
  { value: "6", label: "laws changed or passed since 2014" },
];

export const wins = [
  { year: "2026", title: "Child Rights Law amended", body: "Minimum age of marriage set at 18 after 68,530 signatures." },
  { year: "2025", title: "Free SARC services", body: "Two states abolish fees at sexual assault referral centres." },
  { year: "2024", title: "Workplace harassment precedent", body: "National Industrial Court ruling in a HerVoice-backed case." },
  { year: "2023", title: "VAPP domesticated", body: "Three states pass the VAPP law after coordinated campaigns." },
];

export const testimonials = [
  { quote: "I signed one petition in 2022. Now I run the campus chapter at UNILAG. HerVoice taught me that anger is a skill you can organise.", name: "Oluwaseun, 21", role: "Member, Lagos" },
  { quote: "We give to HerVoice because their reporting is the best we see from any partner — restricted funds tracked case by case.", name: "Programme Officer", role: "Amani Women's Fund" },
  { quote: "The helpline counsellor stayed on the phone until the police arrived. I didn't know strangers could care like that.", name: "Survivor, Abuja", role: "Shared with consent" },
];

/* ---------- Micro-grant fund ---------- */
export const microGrantFund = {
  raised: 74_600_000,
  goal: 120_000_000,
  grantsAwarded: 940,
  averageGrant: 210_000,
  stillTrading: "83%",
  nextRoundCloses: "2027-01-31",
  sizes: [
    { amount: 100_000, label: "Starter grant", body: "Stock, tools or a market stall for a new trade." },
    { amount: 250_000, label: "Restart grant", body: "Equipment and three months' rent to re-open a business." },
    { amount: 500_000, label: "Growth grant", body: "For existing businesses ready to hire other women." },
  ],
  eligibility: [
    "Woman aged 18+, living in Nigeria",
    "Survivor of violence, widow, or household income below ₦100,000/month",
    "Running, or ready to start, a small business or trade",
    "Willing to join 6 coaching sessions (in person or WhatsApp)",
  ],
  steps: [
    { title: "Apply", body: "Online, by WhatsApp voice note, or at any chapter office." },
    { title: "Chat", body: "A 20-minute call with a grants officer — no business plan needed." },
    { title: "Coaching", body: "Six short sessions on costing, savings and digital payments." },
    { title: "Grant", body: "Funds paid straight to suppliers or your account. Nothing to repay." },
  ],
};

/* ---------- FAQs ---------- */
export const faqs: Faq[] = [
  { category: "Donations", q: "Is my donation secure?", a: "This template simulates payments. In production, card payments are processed by a PCI-DSS compliant gateway (e.g. Paystack or Flutterwave) — HerVoice never sees or stores your card number." },
  { category: "Donations", q: "Can I choose where my money goes?", a: "Yes. Pick a programme, a campaign, the Women's Micro-grant Fund or a supporter's fundraiser in the designation menu. Restricted gifts are ring-fenced. Unrestricted gifts go where the need is greatest — usually the helpline and safe spaces." },
  { category: "Donations", q: "How do I give by bank transfer or USSD?", a: "Choose 'Bank transfer' or 'USSD' on the donate page. You'll see our Zenith Bank account details and a reference code — include it so we can match your gift and send a receipt." },
  { category: "Donations", q: "Can I cancel or change a monthly gift?", a: "Anytime. Reply to any receipt email or WhatsApp us and we'll update or cancel within 2 working days." },
  { category: "Tax & receipts", q: "Will I get a receipt?", a: "Yes, instantly by email, and an annual giving statement every January. Companies can request an official receipt on letterhead for CSR and matched-giving records." },
  { category: "Tax & receipts", q: "Are donations tax-deductible in Nigeria?", a: "Companies may deduct donations to approved institutions under the Companies Income Tax Act, subject to its limits. Please consult your tax adviser; we provide whatever documentation you need." },
  { category: "Refunds", q: "I made a mistake with my donation. Can I get a refund?", a: "Yes. Contact us within 30 days with your reference number and we'll refund errors in full, usually within 7 working days." },
  { category: "Membership", q: "What's the difference between a member and a donor?", a: "Members pay annual dues, get a vote at the AGM and join chapter working groups. Donors give to the work. Many people are both!" },
  { category: "Petitions", q: "What happens after I sign a petition?", a: "We deliver signatures in person, by name and state, to the decision-maker. We'll email you updates, and you can opt out anytime. We never sell your data." },
  { category: "Fundraising", q: "How do supporter fundraisers work?", a: "Start a page in minutes for a birthday, run, faith group or office. Donations go directly to HerVoice, designated to the cause you pick — you never handle the money." },
  { category: "Support", q: "Is the helpline confidential?", a: "Yes. We won't share anything without your consent unless a child or someone's life is at immediate risk. You don't have to give your name." },
  { category: "Support", q: "Do I have to report to the police to get help?", a: "No. You can get counselling, shelter and legal advice without making a police report. If you choose to report, we can go with you." },
];
