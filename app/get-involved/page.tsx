import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, img } from "@/lib/utils";
import { photos } from "@/mock/images";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { RoundSticker } from "@/components/ui/sticker";
import { VolunteerForm } from "./volunteer-form";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Volunteer, fundraise, join, sign, march or partner with HerVoice Collective.",
};

const ways = [
  { t: "Sign & share petitions", b: "Two minutes, real pressure.", href: "/petitions", cls: "bg-cream" },
  { t: "Start a fundraiser", b: "Birthdays, runs, faith groups, offices.", href: "/fundraisers/start", cls: "bg-tangerine" },
  { t: "Become a member", b: "A vote, training and a crew.", href: "/join", cls: "bg-magenta-strong text-white" },
  { t: "Come to an event", b: "Marches, clinics, the Gala.", href: "/events", cls: "bg-blush" },
  { t: "Partner with us", b: "Foundations, CSR, pro-bono.", href: "/partner", cls: "bg-plum text-cream" },
  { t: "Give monthly", b: "Keeps the helpline open 24/7.", href: "/donate?frequency=monthly&amount=5000", cls: "bg-cream" },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title={<>Bring your<br /><span className="text-magenta-strong">whole voice.</span></>}
        lede="Lawyers, students, aunties, okada riders, coders, imams, pastors, nurses — this movement runs on people. Here's where you fit."
        image={img(photos.volunteer)}
        imageAlt="A volunteer in a VOLUNTEER t-shirt at an event"
        sticker={<RoundSticker tone="tangerine" size={124}>2,400<br />volunteers</RoundSticker>}
      />
      <Section tone="cream" pad="md">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ways.map((w) => (
            <Link key={w.t} href={w.href} className={cn("card card-hover group flex min-h-[180px] flex-col justify-between p-6", w.cls)}>
              <span className="headline text-3xl">{w.t}</span>
              <span className="flex items-end justify-between gap-3 font-semibold">{w.b}<ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </Section>
      <Section tone="sand" bordered id="volunteer" className="scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow mb-4">Volunteer</p>
            <h2 className="headline text-4xl md:text-6xl">Join the crew.</h2>
            <p className="lede mt-5">From marshalling marches to mentoring girls, there&apos;s a role for you. Every volunteer gets induction training and a chapter coordinator.</p>
            <ul className="mt-6 space-y-2 font-semibold">
              <li>✓ 2-hour induction (online or in person)</li>
              <li>✓ Flexible — from 2 hours a month</li>
              <li>✓ Certificate & reference letter after 6 months</li>
            </ul>
          </div>
          <VolunteerForm />
        </div>
      </Section>
    </>
  );
}
