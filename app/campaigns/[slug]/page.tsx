import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Heart } from "lucide-react";
import { campaigns, getCampaign } from "@/mock/campaigns";
import { siteConfig } from "@/lib/site-config";
import { cn, daysLeft, formatDate, formatNaira } from "@/lib/utils";
import { Photo } from "@/components/ui/photo";
import { RaisedMeter } from "@/components/ui/progress";
import { Sticker } from "@/components/ui/sticker";
import { CampaignCard } from "@/components/ui/cards";
import { Section } from "@/components/ui/section";
import { ShareButtons } from "@/components/ui/share-buttons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) return { title: "Campaign not found" };
  return { title: c.title, description: c.summary, openGraph: { title: c.title, description: c.summary, images: [c.image] } };
}

const budgetColors = ["bg-magenta-strong", "bg-plum", "bg-tangerine", "bg-pink-soft"];

export default async function CampaignPage({ params }: Props) {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) notFound();
  const days = daysLeft(c.endDate);
  const presets = siteConfig.donation.presets["one-time"].slice(0, 4);
  const others = campaigns.filter((x) => x.slug !== c.slug).slice(0, 2);

  return (
    <>
      <section className="border-b-[3px] border-plum bg-cream bg-dots">
        <div className="container-x grid gap-10 py-12 md:py-16 lg:grid-cols-[1fr_400px] lg:items-start">
          <div>
            <Sticker tone="plum" tilt="none" className="mb-6">{c.category}</Sticker>
            <h1 className="poster text-[3rem] sm:text-7xl lg:text-[5.6rem]">{c.title}</h1>
            <p className="mt-5 font-display text-2xl font-bold text-magenta-ink">{c.tagline}</p>
            <div className="relative mt-10">
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-tangerine cut-b" aria-hidden="true" />
              <Photo src={c.image} alt="" ratio="16/9" duotone={c.tone} cut="b" priority sizes="(min-width:1024px) 60vw, 100vw" />
            </div>
            <p className="lede mt-10">{c.summary}</p>
            <div className="mt-6 space-y-5 text-[1.08rem] leading-relaxed">
              {c.story.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <h2 className="headline mt-14 text-3xl md:text-4xl">How your money is used</h2>
            <div className="mt-6 flex h-12 overflow-hidden rounded-full border-[3px] border-plum" aria-hidden="true">
              {c.budget.map((b, i) => <div key={b.label} className={cn(budgetColors[i % 4], i > 0 && "border-l-[3px] border-plum")} style={{ width: `${b.pct}%` }} />)}
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {c.budget.map((b, i) => (
                <li key={b.label} className="flex items-center gap-3">
                  <span className={cn("size-5 shrink-0 rounded-full border-2 border-plum", budgetColors[i % 4])} aria-hidden="true" />
                  <span className="font-display text-2xl font-extrabold">{b.pct}%</span>
                  <span className="text-sm">{b.label}</span>
                </li>
              ))}
            </ul>

            <h2 className="headline mt-14 text-3xl md:text-4xl">Campaign updates</h2>
            <ol className="mt-6 border-l-[3px] border-plum pl-6">
              {c.updates.map((u) => (
                <li key={u.title} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[35px] top-1 size-5 rounded-full border-[3px] border-plum bg-magenta-strong" aria-hidden="true" />
                  <time className="text-sm font-bold uppercase tracking-wider text-magenta-ink" dateTime={u.date}>{formatDate(u.date)}</time>
                  <p className="headline mt-1 text-xl">{u.title}</p>
                  <p className="mt-1 opacity-85">{u.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28" aria-label="Donate to this campaign">
            <div className="card p-6">
              <RaisedMeter raised={c.raised} goal={c.goal} donors={c.donors} days={days} />
              <p className="mt-6 font-display text-lg font-extrabold">Choose an amount</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {presets.map((p) => (
                  <Link key={p.amount} href={`/donate?amount=${p.amount}&campaign=${c.slug}`} className="btn btn-sm btn-outline">{formatNaira(p.amount)}</Link>
                ))}
              </div>
              <Link href={`/donate?campaign=${c.slug}`} className="btn btn-lg btn-magenta mt-3 w-full"><Heart className="size-5 fill-current" /> Donate now</Link>
              <Link href={`/donate?campaign=${c.slug}&frequency=monthly&amount=5000`} className="btn btn-plum mt-2 w-full">Give monthly</Link>
              <Link href={`/fundraisers/start?designation=campaign:${c.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold underline decoration-magenta decoration-2 underline-offset-4">
                Fundraise for this appeal <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="card p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-magenta-ink">Recent donors</p>
              <ul className="mt-4 space-y-4">
                {c.recentDonors.map((d, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-plum bg-blush font-display font-extrabold">{d.name.charAt(0)}</span>
                    <div className="text-sm">
                      <p><strong>{d.name}</strong> gave <strong>{formatNaira(d.amount)}</strong> <span className="opacity-60">· {d.ago}</span></p>
                      {d.message && <p className="mt-0.5 italic opacity-85">“{d.message}”</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card bg-blush p-6">
              <p className="font-display text-lg font-extrabold">Share this appeal</p>
              <ShareButtons className="mt-3" path={`/campaigns/${c.slug}`} text={`${c.title}: ${c.tagline}`} />
            </div>
          </aside>
        </div>
      </section>
      {others.length > 0 && (
        <Section tone="sand" pad="md">
          <h2 className="headline mb-8 text-4xl">More appeals</h2>
          <div className="grid gap-8 md:grid-cols-2">{others.map((o) => <CampaignCard key={o.slug} c={o} />)}</div>
        </Section>
      )}
    </>
  );
}
