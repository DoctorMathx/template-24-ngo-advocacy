export type Tone = "magenta" | "tangerine" | "plum";

export type CampaignUpdate = { date: string; title: string; body: string };
export type Donor = { name: string; amount: number; ago: string; message?: string };

export type Campaign = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  tone: Tone;
  goal: number;
  raised: number;
  donors: number;
  endDate: string;
  summary: string;
  story: string[];
  updates: CampaignUpdate[];
  budget: { label: string; pct: number }[];
  recentDonors: Donor[];
  programme?: string;
};

export type Petition = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  image: string;
  tone: Tone;
  target: { name: string; role: string };
  ask: string;
  goal: number;
  signatures: number;
  endDate: string;
  summary: string;
  why: string[];
  demands: string[];
  updates: CampaignUpdate[];
  recentSigners: { name: string; state: string; ago: string }[];
  status: "open" | "victory";
};

export type FundraiserType = "birthday" | "marathon" | "faith" | "office" | "memorial" | "challenge";

export type Fundraiser = {
  slug: string;
  title: string;
  type: FundraiserType;
  organiser: { name: string; city: string; initials: string; tagline: string };
  image: string;
  goal: number;
  raised: number;
  supporters: number;
  endDate: string;
  story: string[];
  designation: { value: string; label: string };
  messages: { name: string; amount?: number; message: string; ago: string }[];
  team?: string;
};

export type Programme = {
  slug: string;
  number: string;
  title: string;
  short: string;
  image: string;
  tone: Tone;
  headline: string;
  description: string[];
  activities: { title: string; body: string }[];
  stats: { value: string; label: string }[];
  locations: string[];
};

export type Story = {
  slug: string;
  title: string;
  kind: "Survivor story" | "News" | "Campaign win" | "Op-ed" | "Field note";
  date: string;
  author: string;
  image: string;
  excerpt: string;
  body: string[];
  pullQuote?: string;
  consentNote?: string;
};

export type EventItem = {
  slug: string;
  title: string;
  kind: "Town hall" | "Workshop" | "March" | "Walk/Run" | "Gala" | "Webinar" | "Clinic";
  date: string;
  time: string;
  venue: string;
  city: string;
  image: string;
  summary: string;
  description: string[];
  price: number; // 0 = free
  capacity: number;
  registered: number;
  tickets?: TicketOption[];
};

export type Person = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  image?: string;
};

export type Faq = { q: string; a: string; category: "Donations" | "Tax & receipts" | "Refunds" | "Membership" | "Petitions" | "Fundraising" | "Support" };

export type MembershipTier = {
  id: "student" | "member" | "champion" | "patron";
  name: string;
  price: number;
  blurb: string;
  benefits: string[];
  featured?: boolean;
};

export type TicketOption = {
  id: string;
  name: string;
  price: number;
  seats: number;
  blurb: string;
  perks: string[];
  kind: "ticket" | "table" | "sponsor";
  remaining: number;
};
