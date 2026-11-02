import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/donate/thank-you", "/events/gala/confirmation"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
