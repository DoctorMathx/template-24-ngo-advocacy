import type { Story } from "@/lib/types";
import { img } from "@/lib/utils";
import { photos } from "./images";

export const stories: Story[] = [
  {
    slug: "i-took-him-to-court-and-won",
    title: "“I took him to court — and I won.”",
    kind: "Survivor story",
    date: "2026-10-09",
    author: "As told to Halima Yusuf",
    image: img(photos.womanCloseup),
    excerpt: "After eleven years of abuse, Grace* walked into a HerVoice legal-aid clinic in a Port Harcourt market. Eighteen months later, she walked out of court with a protection order and her children.",
    body: [
      "The first time I heard about HerVoice was from a woman selling crayfish next to me. She said there were lawyers coming to the market on Saturday, and that they didn't collect money.",
      "I didn't go that Saturday. I went the one after. A lawyer called Barrister Ebi sat with me under the canopy and wrote everything down. She didn't look at me like I had done something wrong.",
      "The case took eighteen months. HerVoice paid for my medical report, my transport, even the photocopies. When the judge read the protection order, I couldn't hear anything else. My children live with me now. I have my own shop.",
      "I'm telling my story so another woman at the market will go the first Saturday, not the second.",
    ],
    pullQuote: "She didn't look at me like I had done something wrong.",
    consentNote: "*Name changed. Shared with Grace's informed consent; identifying details altered.",
  },
  {
    slug: "kaduna-first-vapp-conviction",
    title: "Kaduna secures first 21-year sentence under its VAPP law",
    kind: "Campaign win",
    date: "2026-10-11",
    author: "HerVoice Legal Team",
    image: img(photos.justice),
    excerpt: "A case backed by the Justice Fund ends in a landmark sentence — and a precedent for every court in the state.",
    body: [
      "On Friday the Kaduna State High Court handed down a 21-year sentence in a case of child sexual abuse, the longest yet under the state's domesticated Violence Against Persons (Prohibition) Law.",
      "The survivor, now 16, was represented by HerVoice lawyers from first report to judgment. The Justice Fund covered her medical examination, transport for four witnesses and the cost of court transcripts.",
      "“This judgment tells every perpetrator in Kaduna that the law now has teeth,” said our Kaduna chapter lead, Barr. Rakiya Suleiman.",
    ],
  },
  {
    slug: "why-35-percent-is-not-a-dream",
    title: "Why 35% is not a dream",
    kind: "Op-ed",
    date: "2026-09-21",
    author: "Dr. Amaka Obi-Nwosu, Executive Director",
    image: img(photos.womanMagenta),
    excerpt: "Rwanda did it. Senegal did it. Nigeria's National Gender Policy promised it. Here's how we get to 35% women in public office.",
    body: [
      "In 2006 Nigeria committed to 35% affirmative action for women in public office. Twenty years later, we are at 4%.",
      "The Special Seats Bill is not charity. It's a temporary, constitutional correction — adding seats, not taking them.",
      "When women govern, budgets change: more on maternal health, water and schools. That's not ideology; it's evidence from every country that's tried it.",
    ],
    pullQuote: "Special seats add seats. They don't take anyone's.",
  },
  {
    slug: "safe-girls-clubs-term-report",
    title: "Inside a Safe Girls club in Zaria",
    kind: "Field note",
    date: "2026-08-28",
    author: "Zainab Abdullahi, Programme Officer",
    image: img(photos.classroom),
    excerpt: "Thirty-two girls, one classroom, and a lesson on digital safety that ended in three girls reporting the same predator.",
    body: [
      "Every Wednesday at 2pm, JSS classroom 3B becomes something else. Desks are pushed back, a mat comes out, and thirty-two girls talk about things they've never said out loud.",
      "This term's topic was online safety. By week four, three girls had independently described the same man messaging them on social media. Their facilitator followed our safeguarding protocol, and the account was reported to police within a day.",
    ],
  },
  {
    slug: "micro-grant-restart-amaka",
    title: "₦250,000 and a second chance: Ifeoma's tailoring shop",
    kind: "Survivor story",
    date: "2026-07-14",
    author: "HerVoice Stories Desk",
    image: img(photos.entrepreneur),
    excerpt: "A Women's Micro-grant bought two sewing machines. Two years later, Ifeoma employs three apprentices.",
    body: [
      "Ifeoma left her husband with two children and a nylon bag of clothes. The micro-grant bought two industrial sewing machines and six months' rent on a shop in Onitsha.",
      "Today she employs three apprentices — all young women — and has repaid nothing, because there is nothing to repay. 'That was the point,' she says. 'No new debt. Just a start.'",
    ],
    consentNote: "Shared with Ifeoma's consent.",
  },
  {
    slug: "16-days-2026-launch",
    title: "16 Days of Activism 2026: here's the plan",
    kind: "News",
    date: "2026-10-01",
    author: "HerVoice Campaigns",
    image: img(photos.protestFists),
    excerpt: "Marches in four cities, a ₦45m appeal for two new safe homes, and a petition headed to every governor.",
    body: [
      "From 25 November to 10 December, HerVoice chapters in Lagos, Abuja, Port Harcourt and Kaduna will mark 16 Days of Activism with marches, legal-aid clinics and the Orange the Market campaign.",
      "Our Safe Homes Appeal aims to open two new shelters, and our VAPP petition will be delivered to the Governors' Forum on 10 December — Human Rights Day.",
    ],
  },
];

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);
