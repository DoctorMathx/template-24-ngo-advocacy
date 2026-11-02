import type { Metadata } from "next";
import { Suspense } from "react";
import { img } from "@/lib/utils";
import { photos } from "@/mock/images";
import { memberBenefits, testimonials } from "@/mock/organisation";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { RoundSticker } from "@/components/ui/sticker";
import { SloganMarquee } from "@/components/ui/marquee";
import { JoinForm } from "./join-form";

export const metadata: Metadata = {
  title: "Join the collective",
  description: "Become a HerVoice member from ₦5,000 a year. Get a vote, organiser training and a crew in your city.",
};

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title={<>Don&apos;t just<br />follow.<br /><span className="text-magenta-strong">Join.</span></>}
        lede="HerVoice is a membership movement. 11,400 members fund our independence, set our priorities at the AGM and show up when it counts."
        image={img(photos.friends)}
        imageAlt="Young women laughing together"
        sticker={<RoundSticker tone="tangerine" size={124}>From<br />₦5k/yr</RoundSticker>}
      />
      <SloganMarquee tone="tangerine" items={["Members vote", "Members organise", "Members fund the fight", "Members show up"]} />
      <Section tone="cream" pad="md">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {memberBenefits.map((b, i) => (
            <div key={b.title} className="card p-6">
              <span className="poster text-5xl text-magenta-strong">0{i + 1}</span>
              <p className="headline mt-2 text-2xl">{b.title}</p>
              <p className="mt-2 text-sm leading-relaxed opacity-85">{b.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="sand" bordered pad="md" id="signup">
        <Suspense fallback={<div className="card h-[600px] animate-pulse bg-paper" aria-label="Loading form" />}>
          <JoinForm />
        </Suspense>
      </Section>
      <Section tone="plum" pad="md">
        <blockquote className="mx-auto max-w-4xl text-center">
          <p className="headline text-3xl md:text-5xl">“{testimonials[0].quote}”</p>
          <footer className="mt-6 font-semibold text-tangerine">{testimonials[0].name} · {testimonials[0].role}</footer>
        </blockquote>
      </Section>
    </>
  );
}
