import type { Programme } from "@/lib/types";
import { img } from "@/lib/utils";
import { photos } from "./images";

export const programmes: Programme[] = [
  {
    slug: "end-gbv",
    number: "01",
    title: "End GBV",
    short: "Prevention, first response and safe spaces in 120 communities.",
    image: img(photos.womanDark),
    tone: "magenta",
    headline: "Violence is not culture. It is a crime — and it is preventable.",
    description: [
      "One in three Nigerian women will experience physical or sexual violence in her lifetime. End GBV attacks the problem from both ends: changing the norms that excuse violence, and making sure every survivor has somewhere safe to go the same night.",
      "We train community first-responders — market leaders, okada unions, imams, pastors, nurses — to recognise abuse, refer safely and preserve evidence. We run four safe spaces and a 24/7 toll-free helpline staffed by trained counsellors.",
    ],
    activities: [
      { title: "24/7 helpline", body: "Toll-free counselling, safety planning and referrals in English, Pidgin, Yoruba, Hausa and Igbo." },
      { title: "Safe spaces", body: "Four confidential shelters with medical, psychosocial and childcare support for up to 90 days." },
      { title: "Community first-responders", body: "2,400 trusted locals trained to respond, refer and keep survivors safe." },
      { title: "Men as allies", body: "Barbershop and viewing-centre dialogues with 9,000 young men on consent and respect." },
    ],
    stats: [
      { value: "18,400", label: "helpline calls answered in 2025" },
      { value: "1,230", label: "survivors sheltered since 2019" },
      { value: "120", label: "communities with trained responders" },
    ],
    locations: ["Lagos", "FCT", "Rivers", "Kaduna", "Oyo", "Enugu"],
  },
  {
    slug: "legal-aid",
    number: "02",
    title: "Justice & Legal Aid",
    short: "Free lawyers for survivors, from first report to final judgment.",
    image: img(photos.justice),
    tone: "plum",
    headline: "A survivor should never lose a case because she could not afford a lawyer.",
    description: [
      "Most GBV cases in Nigeria collapse before trial — evidence is lost, families are pressured, filing fees go unpaid. Our network of 86 pro-bono and staff lawyers walks with survivors through police, court and appeal.",
      "We also litigate strategically: test cases that set precedent on marital rape, workplace harassment and the domestication of the Violence Against Persons (Prohibition) Act.",
    ],
    activities: [
      { title: "Case representation", body: "Free legal counsel, court fees and witness support for survivors of violence." },
      { title: "Legal-aid clinics", body: "Monthly walk-in clinics in markets and motor parks across our four chapters." },
      { title: "Police desk training", body: "Gender desk officers trained in survivor-centred statements and evidence handling." },
      { title: "Strategic litigation", body: "Public-interest cases that change the law for every woman, not just one." },
    ],
    stats: [
      { value: "2,140", label: "cases taken on since 2016" },
      { value: "71%", label: "of concluded cases won or settled for the survivor" },
      { value: "86", label: "lawyers in our pro-bono network" },
    ],
    locations: ["Lagos", "FCT", "Rivers", "Kaduna"],
  },
  {
    slug: "women-in-power",
    number: "03",
    title: "Women in Power",
    short: "Training, funding and protecting women who run for office.",
    image: img(photos.microphone),
    tone: "tangerine",
    headline: "4% of Nigeria's lawmakers are women. We are coming for the other 31%.",
    description: [
      "Women make up half of Nigeria's voters but hold fewer than 1 in 20 seats in the National Assembly. Our Run Sister Run academy trains first-time candidates in campaign finance, media, security and party politics.",
      "Between elections we push for the Special Seats Bill, track party primaries for violence against women candidates, and register young women voters on campuses.",
    ],
    activities: [
      { title: "Run Sister Run academy", body: "A 12-week candidate bootcamp with mentors who have won." },
      { title: "Candidate safety fund", body: "Security, legal and digital-safety support for women facing threats." },
      { title: "Special Seats advocacy", body: "Lobbying, coalition-building and public pressure for reserved seats." },
      { title: "Campus voter drives", body: "First-time women voters registered across 40 tertiary institutions." },
    ],
    stats: [
      { value: "412", label: "women trained to run since 2018" },
      { value: "57", label: "alumnae now hold elected office" },
      { value: "38,000", label: "young women registered to vote" },
    ],
    locations: ["National", "Lagos", "FCT", "Kaduna", "Rivers", "Kano"],
  },
  {
    slug: "girls-and-economic-power",
    number: "04",
    title: "Girls & Economic Power",
    short: "Safe Girls clubs, school retention and micro-grants for women.",
    image: img(photos.entrepreneur),
    tone: "magenta",
    headline: "Money is a safety plan. School is a safety plan.",
    description: [
      "Economic dependence is the number-one reason survivors give for returning to abusive homes. Girls who leave school early are three times more likely to be married as children. So we fund both: classrooms and cash.",
      "Safe Girls clubs meet weekly in 64 schools for life skills, mentoring and reporting. The Women's Micro-grant Fund gives survivors and low-income women non-repayable grants plus business coaching.",
    ],
    activities: [
      { title: "Safe Girls clubs", body: "Weekly clubs teaching bodily autonomy, digital safety and leadership." },
      { title: "Back-to-school bursaries", body: "Fees, uniforms and sanitary pads so girls stay in school." },
      { title: "Women's Micro-grant Fund", body: "₦100k–₦500k grants for women restarting their livelihoods." },
      { title: "Money & business coaching", body: "Bookkeeping, savings groups and digital payments training." },
    ],
    stats: [
      { value: "6,800", label: "girls in Safe Girls clubs" },
      { value: "940", label: "micro-grants awarded" },
      { value: "83%", label: "of grantees still trading after 2 years" },
    ],
    locations: ["Lagos", "Kaduna", "Rivers", "Kano", "Ogun"],
  },
];

export const getProgramme = (slug: string) => programmes.find((p) => p.slug === slug);
