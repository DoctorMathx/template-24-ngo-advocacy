import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn, img } from "@/lib/utils";
import { photos } from "@/mock/images";
import { board, history, team, values } from "@/mock/organisation";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Photo } from "@/components/ui/photo";
import { RoundSticker } from "@/components/ui/sticker";

export const metadata: Metadata = {
  title: "About us",
  description: "HerVoice Collective is a Nigerian women's rights movement founded in 2014. Our mission, vision, values, history, team and board.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About · since ${siteConfig.org.founded}`}
        title={<>Started in a<br />living room.<br /><span className="text-magenta-strong">Now a movement.</span></>}
        lede="Five lawyers and two survivors started a WhatsApp group to fund one court case in 2014. Today HerVoice is 62,000 supporters, four chapters and a voice decision-makers can't ignore."
        image={img(photos.handsCircle)}
        imageAlt="Many hands joined together in a circle"
        sticker={<RoundSticker tone="tangerine" size={124}>Est.<br />2014</RoundSticker>}
      />
      <Section tone="plum" pad="md">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Mission</p>
            <p className="headline text-3xl md:text-4xl">To end violence against women and girls in Nigeria and build their power — in homes, courts, parliaments and markets.</p>
          </div>
          <div>
            <p className="eyebrow mb-3">Vision</p>
            <p className="headline text-3xl text-tangerine md:text-4xl">A Nigeria where every woman is safe, heard, and free to lead.</p>
          </div>
        </div>
      </Section>
      <Section tone="cream">
        <SectionHeader eyebrow="Values" title="What we stand on." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={v.title} className={cn("card p-6", i === 1 && "bg-blush", i === 2 && "bg-tangerine-soft")}>
              <span className="poster text-5xl text-magenta-strong">0{i + 1}</span>
              <p className="headline mt-2 text-2xl">{v.title}</p>
              <p className="mt-2 text-sm leading-relaxed opacity-85">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="sand" bordered>
        <SectionHeader eyebrow="Our story" title="Twelve loud years." />
        <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {history.map((h, i) => (
            <li key={h.year} className={cn("card p-6", i % 2 === 1 && "lg:translate-y-8")}>
              <span className="poster text-6xl text-magenta-strong">{h.year}</span>
              <p className="headline mt-2 text-xl">{h.title}</p>
              <p className="mt-2 text-sm opacity-85">{h.body}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="cream" id="team">
        <SectionHeader eyebrow="Team" title="The people on the phones, in the courts and on the streets." />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((t, i) => (
            <li key={t.name}>
              {t.image && <Photo src={t.image} alt={`Portrait representing ${t.name}`} ratio="4/4.4" duotone={i % 3 === 0 ? "magenta" : i % 3 === 1 ? "tangerine" : "plum"} cut={i % 2 ? "b" : "a"} sizes="(min-width:1024px) 30vw, 50vw" />}
              <p className="headline mt-4 text-2xl">{t.name}</p>
              <p className="font-semibold text-magenta-ink">{t.role}</p>
              <p className="mt-2 text-sm opacity-85">{t.bio}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs opacity-60">Portraits are illustrative stock photography.</p>
      </Section>
      <Section tone="paper" bordered>
        <SectionHeader eyebrow="Board of Trustees" title="Governance" action={<Link href="/transparency" className="btn btn-outline">Financials & reports</Link>} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {board.map((b) => (
            <li key={b.name} className="flex gap-4 border-t-[3px] border-plum pt-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-full border-[3px] border-plum bg-blush font-display font-extrabold">{b.initials}</span>
              <div>
                <p className="font-display text-lg font-extrabold leading-tight">{b.name}</p>
                <p className="text-sm font-semibold text-magenta-ink">{b.role}</p>
                <p className="mt-1 text-sm opacity-85">{b.bio}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm font-semibold">{siteConfig.org.legalName} · Registered not-for-profit</p>
      </Section>
    </>
  );
}
