import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { impactStats, testimonials, wins } from "@/mock/organisation";
import { programmes } from "@/mock/programmes";
import { stories } from "@/mock/stories";
import { Section, SectionHeader } from "@/components/ui/section";
import { StoryCard } from "@/components/ui/cards";
import { SloganMarquee } from "@/components/ui/marquee";

export const metadata: Metadata = {
  title: "Impact",
  description: "Twelve years of HerVoice Collective: 2,140 survivors represented, 18,400 helpline calls a year, 57 women elected, 940 micro-grants and 6 laws changed.",
};

export default function ImpactPage() {
  return (
    <>
      <section className="on-dark border-b-[3px] border-plum bg-plum text-cream bg-dots-light">
        <div className="container-x py-14 md:py-20">
          <p className="eyebrow mb-5">Impact</p>
          <h1 className="poster text-[3.6rem] sm:text-8xl lg:text-[8.5rem]">Noise that<br /><span className="text-tangerine">changes things.</span></h1>
          <dl className="mt-14 grid grid-cols-2 border-l-[3px] border-t-[3px] border-cream/25 md:grid-cols-3">
            {impactStats.map((s, i) => (
              <div key={s.label} className="border-b-[3px] border-r-[3px] border-cream/25 p-4 sm:p-5 md:p-8">
                <dt className="sr-only">{s.label}</dt>
                <dd><span className={cn("poster block text-4xl min-[400px]:text-5xl lg:text-6xl xl:text-7xl", i % 2 ? "text-pink-soft" : "text-tangerine")}>{s.value}</span><span className="mt-2 block text-cream/80">{s.label}</span></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <SloganMarquee tone="tangerine" />
      <Section tone="cream">
        <SectionHeader eyebrow="Wins" title="Laws changed. Precedents set." />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {wins.map((w, i) => (
            <li key={w.title} className={cn("card p-6", i % 2 ? "lg:mt-10 bg-blush" : "")}>
              <span className="poster text-5xl text-magenta-strong">{w.year}</span>
              <p className="headline mt-3 text-2xl">{w.title}</p>
              <p className="mt-2 text-sm opacity-85">{w.body}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="sand" bordered>
        <SectionHeader eyebrow="Outcomes by programme" title="What changed in 2025" />
        <div className="grid gap-6 md:grid-cols-2">
          {programmes.map((p) => (
            <Link key={p.slug} href={`/programmes/${p.slug}`} className="card card-hover p-6">
              <p className="headline text-3xl">{p.title}</p>
              <dl className="mt-5 grid grid-cols-3 gap-4">
                {p.stats.map((s) => (
                  <div key={s.label}><dt className="sr-only">{s.label}</dt><dd><span className="poster block text-3xl md:text-4xl">{s.value}</span><span className="text-xs leading-tight">{s.label}</span></dd></div>
                ))}
              </dl>
              <span className="mt-5 inline-flex items-center gap-1.5 font-bold text-magenta-ink">Read more <ArrowRight className="size-4" /></span>
            </Link>
          ))}
        </div>
      </Section>
      <Section tone="cream">
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <blockquote key={i} className={cn("card p-7", i === 1 && "bg-plum text-cream on-dark", i === 2 && "bg-tangerine")}>
              <p className="font-display text-xl font-bold leading-snug">“{t.quote}”</p>
              <footer className="mt-4 text-sm font-semibold">{t.name} · {t.role}</footer>
            </blockquote>
          ))}
        </div>
      </Section>
      <Section tone="paper" bordered>
        <SectionHeader eyebrow="Stories" title="Behind the numbers" action={<Link href="/stories" className="btn btn-outline">All stories</Link>} />
        <div className="grid gap-10 md:grid-cols-3">
          {stories.filter((s) => s.kind === "Survivor story" || s.kind === "Campaign win").slice(0, 3).map((s) => <StoryCard key={s.slug} s={s} />)}
        </div>
      </Section>
    </>
  );
}
