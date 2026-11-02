import { siteConfig } from "@/lib/site-config";
import { HeroSection } from "@/components/home/hero";
import {
  CampaignsModule,
  FinalCtaModule,
  GalaModule,
  GetHelpBandModule,
  ImpactStatsModule,
  MembershipModule,
  NewsletterModule,
  PartnersModule,
  PeerFundraisingModule,
  PetitionsModule,
  ProgrammesModule,
  SloganMarqueeModule,
  StoriesModule,
  TransparencyModule,
} from "@/components/home/modules";

// The homepage is data-driven — reorder or remove keys in `siteConfig.home.modules`.
const MODULE_MAP = {
  hero: HeroSection,
  sloganMarquee: SloganMarqueeModule,
  impactStats: ImpactStatsModule,
  petitions: PetitionsModule,
  campaigns: CampaignsModule,
  programmes: ProgrammesModule,
  peerFundraising: PeerFundraisingModule,
  getHelpBand: GetHelpBandModule,
  membership: MembershipModule,
  gala: GalaModule,
  stories: StoriesModule,
  partners: PartnersModule,
  transparency: TransparencyModule,
  newsletter: NewsletterModule,
  finalCta: FinalCtaModule,
} as const;

export default function HomePage() {
  return (
    <>
      {siteConfig.home.modules.map((key) => {
        const C = MODULE_MAP[key];
        return C ? <C key={key} /> : null;
      })}
    </>
  );
}
