import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { menuGroups } from "@/mock/navigation";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { Logo } from "./logo";

const socials = [
  { label: "Instagram", href: siteConfig.brand.social.instagram, short: "IG" },
  { label: "X (Twitter)", href: siteConfig.brand.social.x, short: "X" },
  { label: "TikTok", href: siteConfig.brand.social.tiktok, short: "TT" },
  { label: "Facebook", href: siteConfig.brand.social.facebook, short: "FB" },
  { label: "LinkedIn", href: siteConfig.brand.social.linkedin, short: "IN" },
  { label: "YouTube", href: siteConfig.brand.social.youtube, short: "YT" },
];

export function SiteFooter() {
  const { org, brand, donation, help } = siteConfig;
  return (
    <footer className="on-dark relative overflow-hidden bg-plum pb-28 text-cream md:pb-10">
      <div className="border-b-[3px] border-cream/15">
        <div className="container-x grid gap-10 py-16 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <p className="poster text-[3.4rem] sm:text-7xl lg:text-[7rem]">
            Loud for <span className="text-tangerine">every</span> <span className="text-pink-soft">woman.</span>
          </p>
          <div>
            <p className="font-display text-2xl font-bold">{siteConfig.newsletter.title}</p>
            <p className="mt-2 mb-5 text-cream/80">{siteConfig.newsletter.lede}</p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="container-x grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo dark />
          <p className="mt-5 max-w-sm text-cream/80">{brand.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Social media">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid size-11 place-items-center rounded-full border-2 border-cream/40 font-display text-xs font-extrabold hover:border-tangerine hover:bg-tangerine hover:text-plum">
                  {s.short}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {menuGroups.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <p className="eyebrow mb-4">{g.title}</p>
            <ul className="space-y-1">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-[36px] items-center text-cream/85 hover:text-tangerine">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container-x grid gap-6 border-t-[3px] border-cream/15 py-10 text-sm md:grid-cols-3">
        <div>
          <p className="font-bold text-tangerine">Chapters</p>
          <p className="mt-2 text-cream/80">{org.chapters.map((c) => c.city).join(" · ")}</p>
          <p className="mt-1 text-cream/80">{org.hq.line1}, {org.hq.line2}</p>
        </div>
        <div>
          <p className="font-bold text-tangerine">Give by transfer</p>
          <p className="mt-2 text-cream/80">{donation.bank.bankName} · {donation.bank.accountName}</p>
          <p className="mt-1 font-display text-lg font-extrabold tracking-wider">{donation.bank.accountNumber}</p>
        </div>
        <div>
          <p className="font-bold text-tangerine">Helpline (free, 24/7)</p>
          <p className="mt-2 font-display text-lg font-extrabold">{help.helpline}</p>
          <p className="mt-1 text-cream/80">Emergency: {help.emergency} · {help.sms}</p>
        </div>
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-cream/15 pt-6 text-xs text-cream/70 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {org.legalName}. {org.registrationNote}
        </p>
        <p className="flex gap-4">
          <Link href="/transparency" className="hover:text-tangerine">Financials</Link>
          <Link href="/faq" className="hover:text-tangerine">Privacy & FAQ</Link>
          <a href="https://finstore.africa" className="hover:text-tangerine">Built on FinStore</a>
        </p>
      </div>
    </footer>
  );
}
