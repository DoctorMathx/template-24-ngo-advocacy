import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
import { campaigns } from "@/mock/campaigns";
import { petitions } from "@/mock/petitions";
import { fundraisers } from "@/mock/fundraisers";
import { programmes } from "@/mock/programmes";
import { stories } from "@/mock/stories";
import { events } from "@/mock/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "/donate", "/petitions", "/campaigns", "/fundraisers", "/fundraisers/start", "/join", "/events", "/events/gala",
    "/get-help", "/micro-grants", "/partner", "/transparency", "/programmes", "/impact", "/stories", "/get-involved",
    "/about", "/contact", "/faq",
  ];
  const now = new Date();
  return [
    ...staticRoutes.map((r) => ({ url: `${siteUrl}${r}`, lastModified: now, priority: r === "" ? 1 : 0.8 })),
    ...petitions.map((p) => ({ url: `${siteUrl}/petitions/${p.slug}`, lastModified: now, priority: 0.9 })),
    ...campaigns.map((c) => ({ url: `${siteUrl}/campaigns/${c.slug}`, lastModified: now, priority: 0.9 })),
    ...fundraisers.map((f) => ({ url: `${siteUrl}/fundraisers/${f.slug}`, lastModified: now, priority: 0.6 })),
    ...programmes.map((p) => ({ url: `${siteUrl}/programmes/${p.slug}`, lastModified: now, priority: 0.7 })),
    ...stories.map((s) => ({ url: `${siteUrl}/stories/${s.slug}`, lastModified: new Date(s.date), priority: 0.6 })),
    ...events.map((e) => ({ url: `${siteUrl}/events/${e.slug}`, lastModified: now, priority: 0.6 })),
  ];
}
