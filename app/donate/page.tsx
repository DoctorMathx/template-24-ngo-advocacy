import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Building2, HandHeart, Landmark, Users } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { faqs } from "@/mock/organisation";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Section } from "@/components/ui/section";
import { RoundSticker } from "@/components/ui/sticker";
import { DonateClient } from "./donate-client";

export const metadata: Metadata = {
  title: "Donate",
  description: "Give once, monthly or annually to end gender-based violence, fund legal aid for survivors and put women in power. Card, bank transfer or USSD.",
};

export default function DonatePage() {
  const donationFaqs = faqs.filter((f) => ["Donations", "Tax & receipts", "Refunds"].includes(f.category));
  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-plum bg-magenta-strong text-white on-dark">
        <div className="container-x relative py-14 md:py-20">
          <RoundSticker tone="tangerine" size={130} className="absolute right-6 top-8 hidden md:grid">100%<br />audited</RoundSticker>
          <p className="eyebrow mb-4 text-white">Donate</p>
          <h1 className="poster text-[3.4rem] sm:text-7xl lg:text-[7.5rem]">Fund the<br /><span className="text-plum">fight back.</span></h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            Your gift answers helpline calls at 3am, pays survivors&apos; court fees and trains the women who will change the law. Give once, or join the monthly givers who keep us running.
          </p>
        </div>
      </section>

      <Section tone="cream" pad="md" className="pb-28">
        <Suspense fallback={<div className="card h-[600px] animate-pulse bg-paper" aria-label="Loading donation form" />}>
          <DonateClient />
        </Suspense>
      </Section>

      <Section tone="sand" bordered pad="md">
        <h2 className="headline text-4xl md:text-5xl">Other ways to give</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, title: "Become a member", body: "Annual dues from ₦5,000 with a vote and a crew.", href: "/join" },
            { icon: HandHeart, title: "Start a fundraiser", body: "Birthdays, runs, faith groups, offices.", href: "/fundraisers/start" },
            { icon: Building2, title: "Corporate & CSR", body: "Matched giving, sponsorships and grants.", href: "/partner" },
            { icon: Landmark, title: "Give from abroad", body: `USD account: ${siteConfig.donation.bank.dollarAccount}`, href: "/contact" },
          ].map((w) => (
            <Link key={w.title} href={w.href} className="card card-hover p-6">
              <w.icon className="size-7 text-magenta-ink" />
              <span className="headline mt-4 block text-2xl">{w.title}</span>
              <span className="mt-2 block text-sm opacity-85">{w.body}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="cream" pad="md">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <h2 className="headline text-4xl md:text-5xl">Giving questions</h2>
          <FaqAccordion items={donationFaqs} />
        </div>
      </Section>
    </>
  );
}
