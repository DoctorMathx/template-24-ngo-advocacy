import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fundraisers } from "@/mock/fundraisers";
import { compactNaira, img } from "@/lib/utils";
import { photos } from "@/mock/images";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { RoundSticker } from "@/components/ui/sticker";
import { FundraiserBrowser } from "./fundraiser-browser";

export const metadata: Metadata = {
  title: "Supporter fundraisers",
  description: "Birthdays, marathons, church and mosque groups, office drives — browse supporter fundraisers for HerVoice Collective or start your own.",
};

export default function FundraisersPage() {
  const total = fundraisers.reduce((s, f) => s + f.raised, 0);
  return (
    <>
      <PageHero
        eyebrow="Peer-to-peer fundraising"
        title={<>Your people.<br /><span className="text-magenta-strong">Your page.</span><br />Our fight.</>}
        lede={`Supporters have raised ${compactNaira(total)} on these pages alone — by turning birthdays, races, faith groups and offices into fundraising crews.`}
        image={img(photos.marathon)}
        imageAlt="Runners in a city marathon"
        duotone="tangerine"
        sticker={<RoundSticker tone="magenta" size={124}>3 min<br />setup</RoundSticker>}
      >
        <Link href="/fundraisers/start" className="btn btn-lg btn-magenta">Start a fundraiser <ArrowRight className="size-5" /></Link>
      </PageHero>
      <Section tone="cream">
        <FundraiserBrowser />
      </Section>
      <Section tone="plum" pad="md">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { n: "01", t: "Pick your moment", b: "A birthday, a race, Ramadan, a harvest, a team challenge." },
            { n: "02", t: "Set a goal & story", b: "Choose what you're raising for and tell people why it matters to you." },
            { n: "03", t: "Share on WhatsApp", b: "Most pages hit their goal from 10–20 shares. We'll send you tips." },
          ].map((s) => (
            <div key={s.n}>
              <span className="poster text-7xl text-tangerine">{s.n}</span>
              <p className="headline mt-2 text-2xl">{s.t}</p>
              <p className="mt-2 text-cream/80">{s.b}</p>
            </div>
          ))}
        </div>
        <Link href="/fundraisers/start" className="btn btn-lg btn-tangerine mt-10">Start yours now <ArrowRight className="size-5" /></Link>
      </Section>
    </>
  );
}
