import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programmes } from "@/mock/programmes";
import { cn } from "@/lib/utils";
import { Photo } from "@/components/ui/photo";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Programmes",
  description: "End GBV, Justice & Legal Aid, Women in Power, and Girls & Economic Power — HerVoice Collective's four programmes.",
};

export default function ProgrammesPage() {
  return (
    <>
      <section className="border-b-[3px] border-plum bg-cream bg-dots">
        <div className="container-x py-14 md:py-20">
          <p className="eyebrow mb-5">Programmes</p>
          <h1 className="poster text-[3.6rem] sm:text-8xl lg:text-[8.5rem]">Four fronts.<br /><span className="text-magenta-strong">One fight.</span></h1>
          <p className="lede mt-7 max-w-2xl">Violence against women is held up by silence, impunity, exclusion from power and economic dependence. We go after all four.</p>
        </div>
      </section>
      {programmes.map((p, i) => (
        <Section key={p.slug} tone={i % 2 ? "sand" : "cream"} bordered={i % 2 === 1}>
          <div className={cn("grid gap-10 lg:grid-cols-2 lg:items-center", i % 2 === 1 && "lg:[&>*:first-child]:order-2")}>
            <div className="relative">
              <Photo src={p.image} alt="" ratio="5/4" duotone={p.tone} cut={i % 2 ? "b" : "a"} sizes="(min-width:1024px) 50vw, 100vw" />
              <span className="poster absolute -bottom-8 left-4 text-[7rem] text-tangerine text-outline" aria-hidden="true">{p.number}</span>
            </div>
            <div>
              <p className="eyebrow mb-4">Programme {p.number}</p>
              <h2 className="headline text-5xl md:text-6xl">{p.title}</h2>
              <p className="mt-4 font-display text-2xl font-bold text-magenta-ink">{p.headline}</p>
              <p className="mt-4 text-[1.05rem] leading-relaxed opacity-90">{p.description[0]}</p>
              <dl className="mt-7 grid grid-cols-3 gap-4 border-y-[3px] border-plum py-5">
                {p.stats.map((s) => (
                  <div key={s.label}><dt className="sr-only">{s.label}</dt><dd><span className="poster block text-4xl">{s.value}</span><span className="text-xs leading-tight">{s.label}</span></dd></div>
                ))}
              </dl>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={`/programmes/${p.slug}`} className="btn btn-plum">Explore {p.title} <ArrowRight className="size-4" /></Link>
                <Link href={`/donate?programme=${p.slug}`} className="btn btn-outline">Fund this</Link>
              </div>
            </div>
          </div>
        </Section>
      ))}
    </>
  );
}
