import type { Metadata } from "next";
import { petitions } from "@/mock/petitions";
import { formatNumber } from "@/lib/utils";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { PetitionCard } from "@/components/ui/cards";
import { RoundSticker } from "@/components/ui/sticker";
import { SloganMarquee } from "@/components/ui/marquee";
import { img } from "@/lib/utils";
import { photos } from "@/mock/images";

export const metadata: Metadata = {
  title: "Petitions",
  description: "Sign HerVoice petitions to pass the VAPP Act in every state, create special seats for women and make survivor justice free.",
};

export default function PetitionsPage() {
  const open = petitions.filter((p) => p.status === "open");
  const wins = petitions.filter((p) => p.status === "victory");
  const total = petitions.reduce((s, p) => s + p.signatures, 0);
  return (
    <>
      <PageHero
        eyebrow="Petitions"
        title={<>Sign it.<br /><span className="text-magenta-strong">Share it.</span><br />Win it.</>}
        lede={`${formatNumber(total)} signatures and counting. We hand-deliver every name to the people with power — and we don't leave until they act.`}
        image={img(photos.signing)}
        imageAlt="A hand signing a document"
        duotone="tangerine"
        sticker={<RoundSticker tone="magenta" size={124}>6 laws<br />changed</RoundSticker>}
      />
      <SloganMarquee tone="magenta" />
      <Section tone="cream">
        <SectionHeader eyebrow={`${open.length} open petitions`} title="Add your name." />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {open.map((p) => <PetitionCard key={p.slug} p={p} />)}
        </div>
      </Section>
      {wins.length > 0 && (
        <Section tone="tangerine" bordered>
          <SectionHeader eyebrow="Victories" title="Proof that signing works." lede="When enough of us show up, decision-makers move. These petitions are closed — because we won." />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {wins.map((p) => <PetitionCard key={p.slug} p={p} />)}
          </div>
        </Section>
      )}
    </>
  );
}
