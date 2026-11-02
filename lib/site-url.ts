export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://template-24-ngo-advocacy.vercel.app").replace(/\/$/, "");
export const absoluteUrl = (path: string) => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
