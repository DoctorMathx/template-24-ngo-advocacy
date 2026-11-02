import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/mock/organisation";
import type { Faq } from "@/lib/types";
import { Section } from "@/components/ui/section";
import { FaqAccordion } from "@/components/ui/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about donating, tax receipts, refunds, membership, petitions, fundraising and getting support from HerVoice Collective.",
};

export default function FaqPage() {
  const groups = faqs.reduce<Record<string, Faq[]>>((acc, f) => ((acc[f.category] ||= []).push(f), acc), {});
  return (
    <>
      <section className="border-b-[3px] border-plum bg-cream bg-dots">
        <div className="container-x py-14 md:py-20">
          <p className="eyebrow mb-5">FAQ</p>
          <h1 className="poster text-[3.6rem] sm:text-8xl lg:text-[8.5rem]">Ask us<br /><span className="text-magenta-strong">anything.</span></h1>
          <nav aria-label="FAQ categories" className="mt-8 flex flex-wrap gap-2">
            {Object.keys(groups).map((g) => <a key={g} href={`#${g.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="chip">{g}</a>)}
          </nav>
        </div>
      </section>
      <Section tone="cream" pad="md">
        <div className="mx-auto max-w-4xl space-y-14">
          {Object.entries(groups).map(([g, items]) => (
            <div key={g} id={g.toLowerCase().replace(/[^a-z]+/g, "-")} className="scroll-mt-28">
              <h2 className="headline mb-4 text-3xl md:text-4xl">{g}</h2>
              <FaqAccordion items={items} defaultOpen={null} />
            </div>
          ))}
        </div>
        <div className="card mx-auto mt-16 flex max-w-4xl flex-col items-start gap-4 bg-blush p-7 md:flex-row md:items-center md:justify-between">
          <p className="headline text-2xl">Still have a question?</p>
          <Link href="/contact" className="btn btn-plum">Contact us</Link>
        </div>
      </Section>
    </>
  );
}
