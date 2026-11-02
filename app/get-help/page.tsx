import type { Metadata } from "next";
import Link from "next/link";
import { EyeOff, HeartHandshake, Home, LogOut, MessageCircle, Phone, Scale, ShieldAlert, Smartphone, Stethoscope } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { faqs } from "@/mock/organisation";
import { Section } from "@/components/ui/section";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { LegalAidForm } from "./legal-aid-form";

export const metadata: Metadata = {
  title: "Get help",
  description: "Free, confidential support for women and girls facing violence in Nigeria: 24/7 helpline, WhatsApp chat, safe spaces and free legal aid.",
};

export default function GetHelpPage() {
  const { help, org, brand } = siteConfig;
  const supportFaqs = faqs.filter((f) => f.category === "Support");
  return (
    <>
      <section className="on-dark border-b-[3px] border-plum bg-plum text-cream">
        <div className="container-x py-12 md:py-16">
          <div className="mb-8 flex flex-col gap-4 rounded-[22px] border-[3px] border-tangerine bg-plum-2 p-5 md:flex-row md:items-center md:justify-between">
            <p className="flex items-start gap-3 text-lg font-semibold">
              <ShieldAlert className="mt-1 size-6 shrink-0 text-tangerine" />
              <span>In immediate danger? Call <a href={`tel:${help.emergency}`} className="font-display text-2xl font-extrabold text-tangerine underline">{help.emergency}</a> now.</span>
            </p>
            <p className="flex items-center gap-2 text-sm text-cream/80"><LogOut className="size-4" /> Use <strong className="text-tangerine">Quick exit</strong> (bottom right) or press <kbd className="rounded border border-cream/40 px-1.5">Esc</kbd> twice to leave this site fast.</p>
          </div>
          <p className="eyebrow mb-5">Get help · free · confidential</p>
          <h1 className="poster text-[3.4rem] sm:text-8xl lg:text-[8rem]">You are<br /><span className="text-tangerine">not alone.</span></h1>
          <p className="mt-6 max-w-2xl text-lg text-cream/85">
            Whatever happened, it&apos;s not your fault. You don&apos;t have to give your name, and you don&apos;t have to go to the police to get support. Reach us in the way that feels safest.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <a href={`tel:${help.helpline.replace(/\s/g, "")}`} className="group rounded-[22px] border-[3px] border-cream bg-magenta-strong p-6 text-white transition-transform hover:-translate-y-1">
              <Phone className="size-8" />
              <p className="mt-3 text-sm font-bold uppercase tracking-widest">{help.helplineLabel}</p>
              <p className="poster mt-1 text-5xl">{help.helpline}</p>
              <p className="mt-2 text-sm">English · Pidgin · Yoruba · Hausa · Igbo</p>
            </a>
            <a href={brand.whatsappLink} className="rounded-[22px] border-[3px] border-cream bg-cream p-6 text-plum transition-transform hover:-translate-y-1">
              <MessageCircle className="size-8 text-magenta-ink" />
              <p className="mt-3 text-sm font-bold uppercase tracking-widest">WhatsApp chat (8am–10pm)</p>
              <p className="poster mt-1 text-4xl">{help.whatsappSupport}</p>
              <p className="mt-2 text-sm">Messages are read only by trained counsellors.</p>
            </a>
            <div className="rounded-[22px] border-[3px] border-cream bg-tangerine p-6 text-plum">
              <Smartphone className="size-8" />
              <p className="mt-3 text-sm font-bold uppercase tracking-widest">No data? No airtime?</p>
              <p className="poster mt-1 text-4xl">{help.sms}</p>
              <p className="mt-2 text-sm">Free. We&apos;ll call you back.</p>
            </div>
          </div>
        </div>
      </section>

      <Section tone="cream" pad="md">
        <h2 className="headline text-4xl md:text-5xl">What we can help with</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: HeartHandshake, t: "Counselling", b: "Talk to a trained counsellor, once or every week, by phone or in person." },
            { icon: Home, t: "Safe spaces", b: "Emergency shelter for you and your children for up to 90 days — confidential locations." },
            { icon: Scale, t: "Free legal aid", b: "A lawyer for protection orders, court cases, custody, inheritance and more." },
            { icon: Stethoscope, t: "Medical referral", b: "Free referral to a sexual assault referral centre (SARC) within 72 hours." },
          ].map((s) => (
            <div key={s.t} className="card p-6">
              <s.icon className="size-8 text-magenta-ink" />
              <p className="headline mt-3 text-2xl">{s.t}</p>
              <p className="mt-2 text-sm leading-relaxed opacity-85">{s.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="blush" bordered pad="md">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="headline text-4xl md:text-5xl">Safe spaces</h2>
            <p className="lede mt-4">Our safe spaces are at confidential addresses. Call the helpline and a counsellor will arrange safe transport. Walk-in support is available at our chapter offices:</p>
            <ul className="mt-6 space-y-3">
              {org.chapters.map((c) => (
                <li key={c.city} className="card flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-display text-lg font-extrabold">{c.city}</p>
                    <p className="text-sm opacity-85">{c.address}</p>
                  </div>
                  <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="btn btn-sm btn-outline"><Phone className="size-4" /> {c.phone}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="headline flex items-center gap-3 text-4xl md:text-5xl"><EyeOff className="size-9 text-magenta-strong" /> Browse safely</h2>
            <ul className="mt-6 space-y-4 text-[1.05rem]">
              {[
                "Use a private / incognito window so this visit isn't saved in your history.",
                "If someone checks your phone, clear your browser history — or delete only this site's entries.",
                "The Quick exit button replaces this page with Google, so pressing Back won't return here.",
                "Use a friend's phone or a phone at work, school or a library if yours may be monitored.",
                "Check for unknown apps on your phone — stalkerware is real. Our digital safety team can help.",
              ].map((t, i) => (
                <li key={i} className="flex gap-4"><span className="poster grid size-9 shrink-0 place-items-center rounded-full border-[2.5px] border-plum bg-tangerine text-lg">{i + 1}</span><span className="pt-1">{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="cream" id="legal-aid" className="scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow mb-4">Free legal aid</p>
            <h2 className="headline text-4xl md:text-6xl">Request a lawyer.</h2>
            <p className="lede mt-5">Our network of 86 lawyers represents survivors for free — from protection orders to full trials. 71% of our concluded cases end in the survivor&apos;s favour.</p>
            <ul className="mt-6 space-y-2 font-semibold">
              <li>✓ Free from first meeting to judgment</li>
              <li>✓ We cover court fees, medical reports & transport</li>
              <li>✓ Women lawyers available on request</li>
            </ul>
          </div>
          <LegalAidForm />
        </div>
      </Section>

      <Section tone="sand" bordered pad="md">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="headline text-4xl">Questions</h2>
            <p className="mt-4">Want to support survivors instead? <Link href="/donate?programme=end-gbv" className="font-bold underline decoration-magenta decoration-2 underline-offset-4">Fund the helpline</Link> or <Link href="/micro-grants" className="font-bold underline decoration-magenta decoration-2 underline-offset-4">the Micro-grant Fund</Link>.</p>
          </div>
          <FaqAccordion items={supportFaqs} />
        </div>
      </Section>
    </>
  );
}
