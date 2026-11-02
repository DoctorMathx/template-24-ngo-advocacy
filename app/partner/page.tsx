import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, FileBarChart, Lock, Users } from "lucide-react";
import { img } from "@/lib/utils";
import { photos } from "@/mock/images";
import { partners, partnershipTiers, testimonials } from "@/mock/organisation";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { RoundSticker } from "@/components/ui/sticker";
import { EnquiryForm } from "./enquiry-form";

export const metadata: Metadata = {
  title: "Partner with us",
  description: "Foundations, bilateral donors and corporates: fund survivor justice, women's leadership and economic power through HerVoice Collective. Audited, restricted-fund reporting.",
};

export default function PartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Funders & partners"
        title={<>Invest in<br /><span className="text-magenta-strong">women&apos;s power.</span></>}
        lede="Twelve years, four chapters, audited every year. We turn grants into outcomes you can measure — convictions, laws passed, women elected, businesses still trading."
        image={img(photos.handshake)}
        imageAlt="A handshake between partners"
        duotone="plum"
        sticker={<RoundSticker tone="tangerine" size={124}>88.5%<br />to<br />programmes</RoundSticker>}
      >
        <Link href="#enquire" className="btn btn-lg btn-magenta">Start a conversation</Link>
        <Link href="/transparency" className="btn btn-lg btn-outline">See our financials</Link>
      </PageHero>

      <Section tone="cream">
        <SectionHeader eyebrow="Why partner with HerVoice" title="Grassroots reach. Institutional rigour." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, t: "Reach", b: "62,000 supporters, 120 communities and 64 schools across 6 states — plus the political access to change laws." },
            { icon: FileBarChart, t: "Evidence", b: "Case-level M&E, independent evaluations and a public results framework updated quarterly." },
            { icon: Lock, t: "Stewardship", b: "Restricted funds ring-fenced in separate ledgers; dedicated grants accountant; annual external audit." },
            { icon: BadgeCheck, t: "Safeguarding", b: "Trustee-level safeguarding lead, survivor-centred protocols, vetted staff and volunteers." },
          ].map((x) => (
            <div key={x.t} className="card p-6">
              <x.icon className="size-8 text-magenta-ink" />
              <p className="headline mt-3 text-2xl">{x.t}</p>
              <p className="mt-2 text-sm leading-relaxed opacity-85">{x.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sand" bordered>
        <SectionHeader eyebrow="Ways to partner" title="Packages that fit your mandate." />
        <div className="grid gap-6 md:grid-cols-2">
          {partnershipTiers.map((t, i) => (
            <div key={t.name} className={i === 1 ? "card bg-plum p-7 text-cream on-dark" : "card p-7"}>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">{t.range}</p>
              <p className="headline mt-2 text-3xl">{t.name}</p>
              <p className="mt-3 leading-relaxed opacity-90">{t.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {t.perks.map((p) => <li key={p} className="rounded-full border-2 border-current px-3 py-1 text-sm font-semibold">{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">How grant funds are managed</p>
            <h2 className="headline text-4xl md:text-5xl">Every naira, traceable.</h2>
            <ol className="mt-8 space-y-5">
              {[
                ["Ring-fenced", "Each grant gets its own cost centre and bank sub-account. No co-mingling."],
                ["Budget vs actuals", "Monthly variance reviews by our Finance & Audit Committee."],
                ["Reporting", "Quarterly narrative + financial reports on your template; annual audited statements."],
                ["Verification", "Site visits on request; beneficiary feedback lines; independent mid-term evaluations for grants over ₦50m."],
              ].map(([t, b], i) => (
                <li key={t} className="flex gap-4">
                  <span className="poster grid size-12 shrink-0 place-items-center rounded-full border-[3px] border-plum bg-tangerine text-2xl">{i + 1}</span>
                  <div><p className="headline text-xl">{t}</p><p className="mt-1 opacity-85">{b}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="eyebrow mb-4">Current funders & partners</p>
            <ul className="grid grid-cols-2 border-l-[3px] border-t-[3px] border-plum">
              {partners.map((p) => (
                <li key={p.name} className="flex min-h-[110px] flex-col justify-center border-b-[3px] border-r-[3px] border-plum p-4">
                  <span className="font-display text-lg font-extrabold leading-tight" style={{ fontVariationSettings: '"wdth" 78' }}>{p.name}</span>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-wider opacity-70">{p.type}</span>
                </li>
              ))}
            </ul>
            <blockquote className="card mt-8 bg-blush p-6">
              <p className="font-display text-xl font-bold">“{testimonials[1].quote}”</p>
              <footer className="mt-3 text-sm font-semibold">{testimonials[1].name}, {testimonials[1].role}</footer>
            </blockquote>
          </div>
        </div>
      </Section>

      <Section tone="paper" bordered id="enquire" className="scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow mb-4">Enquiries & proposals</p>
            <h2 className="headline text-4xl md:text-5xl">Let&apos;s build something together.</h2>
            <p className="lede mt-5">Tell us about your priorities and we&apos;ll come back with a tailored concept note.</p>
            <Link href="/transparency" className="mt-6 inline-flex items-center gap-2 font-bold underline decoration-magenta decoration-2 underline-offset-4">Download audited accounts <ArrowRight className="size-4" /></Link>
          </div>
          <EnquiryForm />
        </div>
      </Section>
    </>
  );
}
