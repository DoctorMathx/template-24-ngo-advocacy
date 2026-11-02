import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/ui/section";
import { RoundSticker } from "@/components/ui/sticker";
import { StartFundraiserForm } from "./start-form";

export const metadata: Metadata = {
  title: "Start a fundraiser",
  description: "Turn your birthday, race, faith group or office into a fundraiser for HerVoice Collective. Set up your page in three minutes.",
};

export default function StartFundraiserPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-plum bg-tangerine">
        <div className="container-x relative py-14 md:py-20">
          <RoundSticker tone="magenta" size={130} className="absolute right-6 top-8 hidden md:grid">Free<br />to set<br />up</RoundSticker>
          <p className="eyebrow mb-4 text-plum">Start a fundraiser</p>
          <h1 className="poster text-[3.4rem] sm:text-7xl lg:text-[7rem]">Rally your<br /><span className="text-cream text-outline">people.</span></h1>
          <p className="mt-6 max-w-2xl text-lg">Five quick steps. No paperwork. Donations go straight to HerVoice and you get a page to share everywhere.</p>
        </div>
      </section>
      <Section tone="cream" pad="md">
        <Suspense fallback={<div className="card h-[520px] animate-pulse bg-paper" aria-label="Loading form" />}>
          <StartFundraiserForm />
        </Suspense>
      </Section>
    </>
  );
}
