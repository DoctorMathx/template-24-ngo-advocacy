import type { Metadata } from "next";
import { campaigns } from "@/mock/campaigns";
import { compactNaira, img } from "@/lib/utils";
import { photos } from "@/mock/images";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { CampaignCard } from "@/components/ui/cards";
import { RoundSticker } from "@/components/ui/sticker";

export const metadata: Metadata = {
  title: "Campaigns & appeals",
  description: "Fund HerVoice's urgent appeals: new safe homes, the Justice Fund, Run Sister Run 2027 and Back to School, Girls.",
};

export default function CampaignsPage() {
  const raised = campaigns.reduce((s, c) => s + c.raised, 0);
  return (
    <>
      <PageHero
        eyebrow="Campaigns & appeals"
        title={<>Money is<br /><span className="text-magenta-strong">a megaphone.</span></>}
        lede={`${compactNaira(raised)} raised so far across ${campaigns.length} live appeals. Every campaign has a budget, a deadline and a public update log.`}
        image={img(photos.womanAfroStudio)}
        imageAlt="A confident young woman"
        sticker={<RoundSticker tone="tangerine" size={124}>Gifts<br />matched<br />to ₦10m</RoundSticker>}
      />
      <Section tone="cream">
        <div className="grid gap-8 md:grid-cols-2">
          {campaigns.map((c) => <CampaignCard key={c.slug} c={c} />)}
        </div>
      </Section>
    </>
  );
}
