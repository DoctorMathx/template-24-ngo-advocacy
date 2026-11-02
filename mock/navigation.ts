import { campaigns } from "./campaigns";
import { programmes } from "./programmes";
import { fundraisers } from "./fundraisers";
import { membershipTiers } from "./organisation";

export const primaryNav = [
  { label: "Petitions", href: "/petitions" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Fundraise", href: "/fundraisers" },
  { label: "Programmes", href: "/programmes" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
];

export const menuGroups = [
  {
    title: "Take action",
    links: [
      { label: "Sign a petition", href: "/petitions" },
      { label: "Campaigns & appeals", href: "/campaigns" },
      { label: "Start a fundraiser", href: "/fundraisers/start" },
      { label: "Browse fundraisers", href: "/fundraisers" },
      { label: "Join the collective", href: "/join" },
      { label: "Volunteer & get involved", href: "/get-involved" },
    ],
  },
  {
    title: "Our work",
    links: [
      { label: "Programmes", href: "/programmes" },
      { label: "Impact", href: "/impact" },
      { label: "Stories & news", href: "/stories" },
      { label: "Women's Micro-grant Fund", href: "/micro-grants" },
      { label: "Events & gala", href: "/events" },
    ],
  },
  {
    title: "Who we are",
    links: [
      { label: "About us", href: "/about" },
      { label: "Transparency & financials", href: "/transparency" },
      { label: "Partner with us", href: "/partner" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/** Everything a gift can be designated to — used by the donate flow. */
export type Designation = { value: string; label: string; group: string };

export const designations: Designation[] = [
  { value: "general", label: "Where it's needed most", group: "General" },
  ...programmes.map((p) => ({ value: `programme:${p.slug}`, label: `${p.title} programme`, group: "Programmes" })),
  ...campaigns.map((c) => ({ value: `campaign:${c.slug}`, label: c.title, group: "Campaigns" })),
  { value: "fund:micro-grants", label: "Women's Micro-grant Fund", group: "Funds" },
  { value: "fund:gala", label: "HerVoice Gala 2026 (paddle raise)", group: "Funds" },
  ...membershipTiers.map((t) => ({ value: `membership:${t.id}`, label: `${t.name} membership dues`, group: "Membership" })),
  ...fundraisers.map((f) => ({ value: `fundraiser:${f.slug}`, label: `${f.organiser.name}'s fundraiser`, group: "Supporter fundraisers" })),
];

export const designationLabel = (value: string) => designations.find((d) => d.value === value)?.label ?? "Where it's needed most";
