import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Heart, MapPin, MessageSquareHeart, Users } from "lucide-react";
import { fundraisers, fundraiserTypeLabel, getFundraiser } from "@/mock/fundraisers";
import { daysLeft, formatNaira } from "@/lib/utils";
import { Photo } from "@/components/ui/photo";
import { RaisedMeter } from "@/components/ui/progress";
import { Sticker } from "@/components/ui/sticker";
import { FundraiserCard } from "@/components/ui/cards";
import { Section } from "@/components/ui/section";
import { ShareButtons } from "@/components/ui/share-buttons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return fundraisers.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const f = getFundraiser(slug);
  if (!f) return { title: "Fundraiser not found" };
  return { title: f.title, description: `${f.organiser.name} is raising ${formatNaira(f.goal)} for HerVoice Collective. ${f.story[0]}`, openGraph: { images: [f.image] } };
}

export default async function FundraiserPage({ params }: Props) {
  const { slug } = await params;
  const f = getFundraiser(slug);
  if (!f) notFound();
  const days = daysLeft(f.endDate);
  const donateBase = `/donate?fundraiser=${f.slug}`;
  const amounts = [5000, 10000, 20000, 50000];
  const more = fundraisers.filter((x) => x.slug !== f.slug && x.type === f.type).concat(fundraisers.filter((x) => x.slug !== f.slug && x.type !== f.type)).slice(0, 3);

  return (
    <>
      <section className="border-b-[3px] border-plum bg-cream bg-dots">
        <div className="container-x grid gap-10 py-12 md:py-16 lg:grid-cols-[1fr_400px] lg:items-start">
          <div>
            <div className="mb-6 flex flex-wrap gap-3">
              <Sticker tone="tangerine">{fundraiserTypeLabel(f.type)}</Sticker>
              <Sticker tone="plum" tilt="none">Supporter fundraiser</Sticker>
            </div>
            <h1 className="headline text-[2.6rem] sm:text-6xl lg:text-[4.2rem]">{f.title}</h1>
            <div className="mt-7 flex items-center gap-4">
              <span className="grid size-16 shrink-0 place-items-center rounded-full border-[3px] border-plum bg-magenta-strong font-display text-xl font-extrabold text-white shadow-hard-sm">{f.organiser.initials}</span>
              <div>
                <p className="font-display text-xl font-extrabold">{f.organiser.name} <span className="font-sans text-base font-medium opacity-70">is organising this</span></p>
                <p className="flex flex-wrap items-center gap-x-3 text-sm opacity-80"><span className="inline-flex items-center gap-1"><MapPin className="size-3.5" />{f.organiser.city}</span><span>{f.organiser.tagline}</span></p>
                {f.team && <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold"><Users className="size-4" /> {f.team}</p>}
              </div>
            </div>
            <div className="relative mt-10">
              <div className="absolute inset-0 -rotate-1 rounded-[24px] bg-magenta-strong" aria-hidden="true" />
              <Photo src={f.image} alt="" ratio="16/10" priority className="rotate-1 rounded-[24px] border-[3px] border-plum" sizes="(min-width:1024px) 60vw, 100vw" />
            </div>
            <h2 className="headline mt-12 text-3xl md:text-4xl">{f.organiser.name.split(" ")[0]}&apos;s story</h2>
            <div className="mt-5 space-y-5 text-[1.1rem] leading-relaxed">
              {f.story.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="mt-8 rounded-2xl border-[3px] border-plum bg-tangerine-soft p-5 text-sm">
              Donations go directly to <strong>HerVoice Collective</strong> ({f.designation.label}). The organiser never handles the money, and every donor receives an official receipt.
            </div>

            <h2 className="headline mt-12 flex items-center gap-3 text-3xl md:text-4xl"><MessageSquareHeart className="size-8 text-magenta-strong" /> Words of support</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {f.messages.map((m, i) => (
                <li key={i} className={i % 2 ? "card bg-blush p-5 sm:rotate-1" : "card p-5 sm:-rotate-1"}>
                  <p className="text-[1.02rem] leading-relaxed">“{m.message}”</p>
                  <p className="mt-3 text-sm"><strong>{m.name}</strong>{m.amount ? <> · {formatNaira(m.amount)}</> : null} <span className="opacity-60">· {m.ago}</span></p>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28" aria-label="Support this fundraiser">
            <div className="card p-6">
              <RaisedMeter raised={f.raised} goal={f.goal} donors={f.supporters} donorsLabel="supporters" days={days} />
              <p className="mt-6 font-display text-lg font-extrabold">Support {f.organiser.name.split(" ")[0]}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {amounts.map((a) => <Link key={a} href={`${donateBase}&amount=${a}`} className="btn btn-sm btn-outline">{formatNaira(a)}</Link>)}
              </div>
              <Link href={donateBase} className="btn btn-lg btn-magenta mt-3 w-full"><Heart className="size-5 fill-current" /> Donate to this page</Link>
              <p className="mt-3 text-xs opacity-75">Designated to: {f.designation.label}</p>
            </div>
            <div className="card bg-blush p-6">
              <p className="font-display text-lg font-extrabold">Share {f.organiser.name.split(" ")[0]}&apos;s page</p>
              <ShareButtons className="mt-3" path={`/fundraisers/${f.slug}`} text={`Support ${f.organiser.name}'s fundraiser for HerVoice Collective: ${f.title}`} />
            </div>
            <Link href="/fundraisers/start" className="card card-hover flex items-center justify-between gap-3 bg-tangerine p-6 font-display text-xl font-extrabold">
              Start your own page <ArrowRight className="size-6" />
            </Link>
          </aside>
        </div>
      </section>
      <Section tone="sand" pad="md">
        <h2 className="headline mb-8 text-4xl">More supporter pages</h2>
        <div className="grid gap-8 md:grid-cols-3">{more.map((m) => <FundraiserCard key={m.slug} f={m} />)}</div>
      </Section>
    </>
  );
}
