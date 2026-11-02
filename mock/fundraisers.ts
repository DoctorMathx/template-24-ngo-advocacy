import type { Fundraiser, FundraiserType } from "@/lib/types";
import { img } from "@/lib/utils";
import { photos } from "./images";

export const fundraiserTypes: { id: FundraiserType; label: string; blurb: string }[] = [
  { id: "birthday", label: "Birthday", blurb: "Swap gifts for impact on your big day." },
  { id: "marathon", label: "Marathon & sport", blurb: "Run, walk, cycle or swim for survivors." },
  { id: "faith", label: "Church & mosque", blurb: "Rally your congregation or jama'a." },
  { id: "office", label: "Office & team", blurb: "Workplace drives, matched by your employer." },
  { id: "memorial", label: "In memory", blurb: "Honour someone you love." },
  { id: "challenge", label: "Challenge", blurb: "Hair shave, 30-day fast, a dare — anything goes." },
];

export const fundraiserTypeLabel = (t: FundraiserType) => fundraiserTypes.find((x) => x.id === t)?.label ?? t;

export const fundraisers: Fundraiser[] = [
  {
    slug: "tobis-30th-for-safe-homes",
    title: "Tobi's 30th: 30 beds for 30 years",
    type: "birthday",
    organiser: { name: "Tobi Adeyemi", city: "Lagos", initials: "TA", tagline: "Product designer, aunty of 4, proud feminist" },
    image: img(photos.womanLaughing),
    goal: 1_500_000,
    raised: 1_128_000,
    supporters: 86,
    endDate: "2026-11-30",
    designation: { value: "campaign:16-days-safe-homes", label: "16 Days: Safe Homes Appeal" },
    story: [
      "I'm turning 30 and honestly I have enough candles. What I don't have is peace knowing that women in my city call for help and there's no bed for them.",
      "So instead of gifts, I'm asking everyone who loves me (and everyone who just likes my Instagram) to help me fund ₦1.5m towards HerVoice's new safe homes. ₦50,000 covers a month of meals for a mum and her kids.",
      "If we hit the goal by my party on 22 November, I'll do the Shaku Shaku in public. You've been warned.",
    ],
    messages: [
      { name: "Kemi", amount: 50_000, message: "Happy birthday sis! Shaku Shaku or nothing 😂", ago: "2 hours ago" },
      { name: "Uche & Dami", amount: 30_000, message: "Proud of you. This is the realest birthday flex.", ago: "yesterday" },
      { name: "Anonymous", amount: 100_000, message: "For the women who are still waiting.", ago: "2 days ago" },
      { name: "Mama Tobi", amount: 20_000, message: "God bless you my daughter.", ago: "3 days ago" },
    ],
  },
  {
    slug: "lagos-city-marathon-team-hervoice",
    title: "Team HerVoice at the Lagos City Marathon",
    type: "marathon",
    organiser: { name: "Ibrahim Danjuma", city: "Lagos", initials: "ID", tagline: "Banker, amateur runner, ally" },
    image: img(photos.marathon),
    goal: 3_000_000,
    raised: 1_742_500,
    supporters: 131,
    endDate: "2027-02-08",
    team: "Team HerVoice — 24 runners",
    designation: { value: "campaign:justice-fund-2026", label: "The Justice Fund" },
    story: [
      "42 kilometres. 24 runners. One fund that keeps survivors' cases alive.",
      "I've never run a marathon. I've also never sat across from a 15-year-old who had to drop her case because her family couldn't pay for a medical report. I did that in March, and I've been training ever since.",
      "Every ₦240,000 we raise funds one survivor's entire case. Sponsor a kilometre — or the whole run.",
    ],
    messages: [
      { name: "Chioma N.", amount: 42_000, message: "₦1k per km. Don't you dare walk 😤", ago: "4 hours ago" },
      { name: "Office 5th floor", amount: 150_000, message: "Run Ibro run!", ago: "2 days ago" },
      { name: "Anonymous", amount: 10_000, message: "Thank you for using your legs for this.", ago: "4 days ago" },
    ],
  },
  {
    slug: "house-of-grace-womens-fellowship",
    title: "House of Grace Women's Fellowship — Girls Back to School",
    type: "faith",
    organiser: { name: "Deaconess Funmi Ojo", city: "Ibadan", initials: "FO", tagline: "Women's Fellowship leader" },
    image: img(photos.classroom),
    goal: 800_000,
    raised: 615_000,
    supporters: 57,
    endDate: "2026-11-30",
    designation: { value: "campaign:back-to-school-girls", label: "Back to School, Girls" },
    story: [
      "Our fellowship has chosen to keep 80 girls in school this term. ₦10,000 per girl covers uniform, pads and exam fees.",
      "We'll present the cheque at Thanksgiving Sunday. Brothers, you are welcome to sow too!",
    ],
    messages: [
      { name: "Bro. Segun", amount: 20_000, message: "Proverbs 31 in action.", ago: "1 day ago" },
      { name: "Sis. Ronke", amount: 10_000, message: "One girl from me.", ago: "2 days ago" },
    ],
  },
  {
    slug: "masjid-nur-ramadan-sadaqah",
    title: "Masjid an-Nur Sisters' Circle — sadaqah for survivors",
    type: "faith",
    organiser: { name: "Hajiya Amina Bello", city: "Kaduna", initials: "AB", tagline: "Sisters' Circle coordinator" },
    image: img(photos.handsHolding),
    goal: 1_000_000,
    raised: 482_000,
    supporters: 64,
    endDate: "2027-03-30",
    designation: { value: "programme:end-gbv", label: "End GBV programme" },
    story: [
      "Our Sisters' Circle is raising sadaqah for the new Kaduna safe space, so that no sister in our city has to choose between danger and the street.",
    ],
    messages: [
      { name: "Anonymous", amount: 50_000, message: "May Allah accept it from all of us.", ago: "3 days ago" },
      { name: "Zainab", amount: 5_000, message: "Small, but from the heart.", ago: "5 days ago" },
    ],
  },
  {
    slug: "brightpath-consulting-16-days",
    title: "BrightPath Consulting: 16 Days Office Drive (matched!)",
    type: "office",
    organiser: { name: "Ngozi Eze", city: "Abuja", initials: "NE", tagline: "HR Lead, BrightPath Consulting" },
    image: img(photos.officeTeam),
    goal: 2_000_000,
    raised: 1_960_000,
    supporters: 72,
    endDate: "2026-12-10",
    team: "BrightPath Consulting — 140 staff",
    designation: { value: "campaign:16-days-safe-homes", label: "16 Days: Safe Homes Appeal" },
    story: [
      "BrightPath is matching every naira staff give during 16 Days of Activism, up to ₦1m. We're nearly there!",
      "We're also hosting a lunchtime session with HerVoice on recognising abuse at work.",
    ],
    messages: [
      { name: "Finance team", amount: 120_000, message: "Beat that, Strategy 👀", ago: "6 hours ago" },
      { name: "Strategy team", amount: 125_000, message: "Done.", ago: "5 hours ago" },
    ],
  },
  {
    slug: "in-memory-of-mama-ronke",
    title: "In loving memory of Mama Ronke Bakare",
    type: "memorial",
    organiser: { name: "The Bakare family", city: "Abeokuta", initials: "RB", tagline: "Remembering a fearless market leader" },
    image: img(photos.market),
    goal: 1_200_000,
    raised: 904_000,
    supporters: 98,
    endDate: "2027-01-20",
    designation: { value: "fund:micro-grants", label: "Women's Micro-grant Fund" },
    story: [
      "Mama Ronke ran the Kuto market women's association for 22 years and lent money to every woman who needed a fresh start. In her honour we're funding six micro-grants for women traders.",
    ],
    messages: [
      { name: "Iya Bose", amount: 20_000, message: "She helped me start my pepper business. Sun re o, Mama.", ago: "1 day ago" },
      { name: "Grandchildren", amount: 60_000, message: "We love you, Mama.", ago: "4 days ago" },
    ],
  },
  {
    slug: "kemis-big-chop-challenge",
    title: "Kemi's Big Chop: shaving my locs for legal aid",
    type: "challenge",
    organiser: { name: "Kemi Ajayi", city: "Port Harcourt", initials: "KA", tagline: "Law student, 9 years of locs" },
    image: img(photos.womanAfroStreet),
    goal: 500_000,
    raised: 218_000,
    supporters: 41,
    endDate: "2026-12-20",
    designation: { value: "campaign:justice-fund-2026", label: "The Justice Fund" },
    story: [
      "Nine years of locs. One live-streamed big chop. If we hit ₦500,000, I shave it all on 20 December.",
    ],
    messages: [{ name: "Jide", amount: 10_000, message: "I need to see this 😭", ago: "3 hours ago" }],
  },
];

export const getFundraiser = (slug: string) => fundraisers.find((f) => f.slug === slug);
