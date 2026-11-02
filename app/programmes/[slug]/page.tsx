import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Heart, MapPin } from "lucide-react";
import { getProgramme, programmes } from "@/mock/programmes";
import { campaigns } from "@/mock/campaigns";
import { siteConfig } from "@/lib/site-config";
import { formatNaira } from "@/lib/utils";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { CampaignCard } from "@/components/ui/cards";
import { RoundSticker } from "@/components/ui/sticker";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) return { title: "Programme not found" };
  return { title: p.title, description: p.short, openGraph: { images: [p.image] } };
}

export default async function ProgrammePage({ params }: Props) {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) notFound();
  const related = campaigns.filter((c) => c.programme === p.slug);
  const others = programmes.filter((x) => x.slug !== p.slug);
  return (
    <>
      <PageHero eyebrow={`Programme ${p.number}`} title={p.title} lede={p.headline} image={p.image} duotone={p.tone} sticker={<RoundSticker tone="tangerine" size={120}>{p.stats[0].value}<br /><span className="text-[0.6em]">{p.stats[0].label.split(" ").slice(0, 2).join(" ")}</span></RoundSticker>}>
        <Link href={`/donate?programme=${p.slug}`} className="btn btn-lg btn-magenta"><Heart className="size-5 fill-current" /> Fund {p.title}</Link>
        <Link href="/get-involved" className="btn btn-lg btn-outline">Volunteer</Link>
      </PageHero>
      <Section tone="paper" pad="md">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="prose-hv">{p.description.map((d, i) => <p key={i}>{d}</p>)}</div>
          <div className="space-y-5">
            <dl className="card grid gap-5 p-6">
              {p.stats.map((s) => (
                <div key={s.label}><dt className="sr-only">{s.label}</dt><dd><span className="poster block text-5xl text-magenta-strong">{s.value}</span><span className="text-sm">{s.label}</span></dd></div>
              ))}
            </dl>
            <div className="card bg-blush p-6">
              <p className="flex items-center gap-2 font-display text-lg font-extrabold"><MapPin className="size-5" /> Where we work</p>
              <ul className="mt-3 flex flex-wrap gap-2">{p.locations.map((l) => <li key={l} className="rounded-full border-2 border-plum bg-paper px-3 py-1 text-sm font-semibold">{l}</li>)}</ul>
            </div>
          </div>
        </div>
      </Section>
      <Section tone="cream" bordered>
        <SectionHeader eyebrow="What we do" title="Inside the programme" />
        <div className="grid gap-5 md:grid-cols-2">
          {p.activities.map((a, i) => (
            <div key={a.title} className="card flex gap-5 p-6">
              <span className="poster text-5xl text-tangerine text-outline">0{i + 1}</span>
              <div><p className="headline text-2xl">{a.title}</p><p className="mt-2 opacity-85">{a.body}</p></div>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="plum" pad="md">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <h2 className="headline text-4xl md:text-5xl">Your gift to {p.title}</h2>
          <div className="flex flex-wrap gap-3">
            {siteConfig.donation.presets["one-time"].slice(0, 3).map((x) => (
              <Link key={x.amount} href={`/donate?programme=${p.slug}&amount=${x.amount}`} className="btn btn-cream">{formatNaira(x.amount)}</Link>
            ))}
            <Link href={`/donate?programme=${p.slug}&frequency=monthly&amount=5000`} className="btn btn-tangerine">Monthly</Link>
          </div>
        </div>
      </Section>
      {related.length > 0 && (
        <Section tone="sand" pad="md">
          <h2 className="headline mb-8 text-4xl">Live appeals for {p.title}</h2>
          <div className="grid gap-8 md:grid-cols-2">{related.map((c) => <CampaignCard key={c.slug} c={c} />)}</div>
        </Section>
      )}
      <Section tone="cream" pad="md">
        <h2 className="headline mb-6 text-3xl">Other programmes</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}><Link href={`/programmes/${o.slug}`} className="card card-hover flex items-center justify-between gap-3 p-5 font-display text-xl font-extrabold">{o.title} <ArrowRight className="size-5" /></Link></li>
          ))}
        </ul>
      </Section>
    </>
  );
}
