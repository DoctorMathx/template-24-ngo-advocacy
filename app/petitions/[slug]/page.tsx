import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Target, Trophy } from "lucide-react";
import { getPetition, petitions } from "@/mock/petitions";
import { daysLeft, formatDate } from "@/lib/utils";
import { Photo } from "@/components/ui/photo";
import { Sticker } from "@/components/ui/sticker";
import { PetitionCard } from "@/components/ui/cards";
import { Section } from "@/components/ui/section";
import { SignForm } from "./sign-form";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return petitions.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPetition(slug);
  if (!p) return { title: "Petition not found" };
  return { title: p.shortTitle, description: p.summary, openGraph: { title: p.title, description: p.summary, images: [p.image] } };
}

export default async function PetitionPage({ params }: Props) {
  const { slug } = await params;
  const p = getPetition(slug);
  if (!p) notFound();
  const victory = p.status === "victory";
  const days = daysLeft(p.endDate);
  const others = petitions.filter((x) => x.slug !== p.slug && x.status === "open").slice(0, 3);

  return (
    <>
      <section className="relative border-b-[3px] border-plum bg-cream bg-dots">
        <div className="container-x grid gap-10 py-12 md:py-16 lg:grid-cols-[1fr_420px] lg:items-start">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Sticker tone="plum" tilt="none">{p.category}</Sticker>
              {victory ? <Sticker tone="tangerine"><Trophy className="size-4" /> Victory</Sticker> : <Sticker tone="tangerine" tilt="r">{days} days left</Sticker>}
            </div>
            <h1 className="headline text-[2.6rem] sm:text-6xl lg:text-[4.4rem]">{p.title}</h1>
            <div className="mt-8 card flex items-start gap-4 bg-blush p-5 md:p-6">
              <Target className="mt-1 size-7 shrink-0 text-magenta-ink" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-magenta-ink">The ask · To: {p.target.name} <span className="normal-case tracking-normal opacity-80">{p.target.role}</span></p>
                <p className="mt-2 font-display text-xl font-bold leading-snug md:text-2xl">“{p.ask}”</p>
              </div>
            </div>
            <div className="relative mt-10">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[22px] bg-plum" aria-hidden="true" />
              <Photo src={p.image} alt="" ratio="16/9" duotone={p.tone} priority className="rounded-[22px] border-[3px] border-plum" sizes="(min-width:1024px) 60vw, 100vw" />
            </div>
            <p className="lede mt-10">{p.summary}</p>

            <h2 className="headline mt-12 text-3xl md:text-4xl">Why this matters</h2>
            <div className="mt-5 space-y-4 text-[1.08rem] leading-relaxed">
              {p.why.map((w) => <p key={w}>{w}</p>)}
            </div>

            <h2 className="headline mt-12 text-3xl md:text-4xl">We demand</h2>
            <ol className="mt-5 space-y-3">
              {p.demands.map((d, i) => (
                <li key={d} className="flex items-start gap-4 rounded-2xl border-[3px] border-plum bg-paper p-4">
                  <span className="poster grid size-11 shrink-0 place-items-center rounded-full bg-magenta-strong text-2xl text-white">{i + 1}</span>
                  <span className="pt-2 font-semibold">{d}</span>
                </li>
              ))}
            </ol>

            {p.updates.length > 0 && (
              <>
                <h2 className="headline mt-12 text-3xl md:text-4xl">Updates</h2>
                <ol className="mt-6 border-l-[3px] border-plum pl-6">
                  {p.updates.map((u) => (
                    <li key={u.title} className="relative pb-8 last:pb-0">
                      <span className="absolute -left-[35px] top-1 size-5 rounded-full border-[3px] border-plum bg-tangerine" aria-hidden="true" />
                      <time className="text-sm font-bold uppercase tracking-wider text-magenta-ink" dateTime={u.date}>{formatDate(u.date)}</time>
                      <p className="headline mt-1 text-xl">{u.title}</p>
                      <p className="mt-1 opacity-85">{u.body}</p>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>

          <aside className="lg:sticky lg:top-28" aria-label="Sign this petition">
            {victory ? (
              <div className="card bg-tangerine p-7">
                <Trophy className="size-10" />
                <p className="headline mt-3 text-3xl">We won this one.</p>
                <p className="mt-3">{p.summary}</p>
                <Link href="/petitions" className="btn btn-plum mt-6 w-full">Sign an open petition</Link>
                <Link href="/donate" className="btn btn-cream mt-3 w-full">Fund the next win</Link>
              </div>
            ) : (
              <SignForm petition={{ slug: p.slug, title: p.title, shortTitle: p.shortTitle, signatures: p.signatures, goal: p.goal, target: p.target.name, recentSigners: p.recentSigners }} />
            )}
            <p className="mt-4 flex items-start gap-2 text-sm opacity-80"><CheckCircle2 className="mt-0.5 size-4 shrink-0" /> We never sell your data. Signatures are delivered by name and state only.</p>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <Section tone="sand" pad="md">
          <h2 className="headline mb-8 text-4xl">Keep the momentum going</h2>
          <div className="grid gap-8 md:grid-cols-3">{others.map((o) => <PetitionCard key={o.slug} p={o} />)}</div>
        </Section>
      )}
    </>
  );
}
