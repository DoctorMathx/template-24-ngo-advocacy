import type { Petition } from "@/lib/types";
import { img } from "@/lib/utils";
import { photos } from "./images";

export const petitions: Petition[] = [
  {
    slug: "pass-the-vapp-in-every-state",
    title: "Domesticate the VAPP Act in every Nigerian state — now",
    shortTitle: "VAPP Act in every state",
    category: "Law reform",
    image: img(photos.protestFists),
    tone: "magenta",
    target: { name: "State Houses of Assembly & Governors", role: "of the remaining states yet to domesticate" },
    ask: "Pass and fund the Violence Against Persons (Prohibition) Act in your state before International Women's Day 2027.",
    goal: 100_000,
    signatures: 83_412,
    endDate: "2027-03-08",
    summary:
      "The VAPP Act protects women and girls from rape, FGM, spousal battery and economic abuse. Ten years after it became federal law, survivors in several states still can't use it. Your signature tells governors: no more waiting.",
    why: [
      "The VAPP Act became federal law in 2015. It only applies to the FCT unless each state passes its own version — and a handful still haven't.",
      "In states without it, marital rape, harmful widowhood practices and forced isolation from family are not crimes at all. Survivors have nowhere to turn.",
      "Where states have passed it, many have not funded it: no sexual assault referral centres, no trained judges, no shelters.",
    ],
    demands: [
      "Pass the VAPP Act in every remaining state by 8 March 2027.",
      "Fund at least one Sexual Assault Referral Centre (SARC) per senatorial district.",
      "Publish an annual GBV data report, including conviction rates.",
    ],
    updates: [
      { date: "2026-10-14", title: "80,000 signatures!", body: "We delivered an interim copy to the Nigeria Governors' Forum secretariat in Abuja." },
      { date: "2026-07-22", title: "Breakthrough in one more state", body: "A bill passed second reading after 2,000 of you called your representatives." },
    ],
    recentSigners: [
      { name: "Blessing O.", state: "Delta", ago: "just now" },
      { name: "Musa K.", state: "Kano", ago: "1 min ago" },
      { name: "Chidinma E.", state: "Enugu", ago: "2 min ago" },
      { name: "Tolu A.", state: "Lagos", ago: "4 min ago" },
      { name: "Fatima S.", state: "Sokoto", ago: "7 min ago" },
    ],
    status: "open",
  },
  {
    slug: "special-seats-for-women",
    title: "Pass the Special Seats Bill for women in parliament",
    shortTitle: "Special Seats for women",
    category: "Political participation",
    image: img(photos.womanMagenta),
    tone: "tangerine",
    target: { name: "The National Assembly", role: "Senate & House of Representatives" },
    ask: "Vote YES to create additional reserved seats for women in the National and State Assemblies.",
    goal: 150_000,
    signatures: 97_208,
    endDate: "2027-02-14",
    summary:
      "Nigeria ranks among the lowest in the world for women in parliament. Reserved seats have transformed representation in Rwanda, Uganda and Senegal. It's our turn.",
    why: [
      "Women hold fewer than 5% of seats in Nigeria's National Assembly.",
      "Special seats are temporary, constitutional and proven: they don't take seats from anyone, they add them.",
    ],
    demands: [
      "Pass the Special Seats Bill at the next constitution amendment vote.",
      "Publish how every legislator voted.",
    ],
    updates: [
      { date: "2026-09-30", title: "Public hearing confirmed", body: "HerVoice will testify alongside 40 women's groups." },
    ],
    recentSigners: [
      { name: "Ngozi U.", state: "Anambra", ago: "just now" },
      { name: "Abubakar I.", state: "Niger", ago: "3 min ago" },
      { name: "Yetunde B.", state: "Oyo", ago: "6 min ago" },
    ],
    status: "open",
  },
  {
    slug: "free-medical-reports-for-survivors",
    title: "Make medical reports free for every rape survivor",
    shortTitle: "Free medical reports",
    category: "Survivor justice",
    image: img(photos.silhouette),
    tone: "plum",
    target: { name: "Federal Ministry of Health", role: "& State Commissioners for Health" },
    ask: "Issue a directive making forensic medical examinations and reports free in all public hospitals.",
    goal: 50_000,
    signatures: 31_066,
    endDate: "2027-01-15",
    summary:
      "Survivors are charged up to ₦25,000 for the medical report police and courts demand. Many cases die right there.",
    why: [
      "Without a medical report, police often refuse to charge and prosecutors cannot proceed.",
      "Fees are informal, unpredictable and fall on survivors at their most vulnerable.",
    ],
    demands: ["A federal directive abolishing fees for forensic exams and reports.", "Trained examiners in every general hospital."],
    updates: [],
    recentSigners: [
      { name: "Esther J.", state: "Plateau", ago: "2 min ago" },
      { name: "Kemi O.", state: "Ogun", ago: "9 min ago" },
    ],
    status: "open",
  },
  {
    slug: "sexual-harassment-policy-universities",
    title: "Every university needs a sexual harassment policy that works",
    shortTitle: "Harassment-free campuses",
    category: "Education",
    image: img(photos.classroom),
    tone: "magenta",
    target: { name: "National Universities Commission", role: "& Vice-Chancellors" },
    ask: "Make an independent, survivor-centred sexual harassment policy a condition of accreditation.",
    goal: 75_000,
    signatures: 44_890,
    endDate: "2027-04-30",
    summary: "'Sex-for-grades' is still an open secret on too many campuses. Students deserve a safe, confidential way to report.",
    why: ["Students fear retaliation from the very lecturers who grade them.", "Most institutions have no independent reporting channel."],
    demands: ["Independent reporting units on every campus.", "Annual public reporting of cases and outcomes."],
    updates: [],
    recentSigners: [
      { name: "Halima G.", state: "Kaduna", ago: "1 min ago" },
      { name: "David O.", state: "Edo", ago: "5 min ago" },
    ],
    status: "open",
  },
  {
    slug: "end-child-marriage-lagos-act",
    title: "Victory: Child Rights Law amendment signed",
    shortTitle: "Child Rights Law win",
    category: "Girls' rights",
    image: img(photos.womanLaughing),
    tone: "tangerine",
    target: { name: "State Governor", role: "Executive Council" },
    ask: "Sign the amended Child Rights Law setting 18 as the minimum age of marriage.",
    goal: 60_000,
    signatures: 68_530,
    endDate: "2026-06-12",
    summary: "68,530 of you signed. On 12 June the governor signed. Girls in the state are now protected until 18.",
    why: ["Child marriage ends girls' education and endangers their health."],
    demands: ["Sign the amendment into law."],
    updates: [{ date: "2026-06-12", title: "SIGNED INTO LAW", body: "Thank you. This is what collective power looks like." }],
    recentSigners: [],
    status: "victory",
  },
];

export const getPetition = (slug: string) => petitions.find((p) => p.slug === slug);

export const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta",
  "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "Outside Nigeria",
];
