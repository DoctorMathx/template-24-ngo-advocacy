import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Section } from "@/components/ui/section";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact HerVoice Collective in Lagos, Abuja, Port Harcourt and Kaduna. Phone, WhatsApp, email and office addresses.",
};

export default function ContactPage() {
  const { brand, org, help } = siteConfig;
  return (
    <>
      <section className="border-b-[3px] border-plum bg-cream bg-dots">
        <div className="container-x py-14 md:py-20">
          <p className="eyebrow mb-5">Contact</p>
          <h1 className="poster text-[3.6rem] sm:text-8xl lg:text-[8.5rem]">Holla<br /><span className="text-magenta-strong">at us.</span></h1>
          <p className="mt-7 max-w-2xl rounded-2xl border-[3px] border-plum bg-tangerine-soft p-4 font-semibold">
            Need support after violence? Don&apos;t use this form — call {help.helpline} (free, 24/7) or visit <Link href="/get-help" className="underline">Get help</Link>.
          </p>
        </div>
      </section>
      <Section tone="cream" pad="md">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="card card-hover flex items-center gap-4 p-5"><Phone className="size-6 text-magenta-ink" /><span><span className="block text-xs font-bold uppercase tracking-widest opacity-70">Office</span><span className="font-display text-xl font-extrabold">{brand.phone}</span></span></a>
            <a href={brand.whatsappLink} className="card card-hover flex items-center gap-4 p-5"><MessageCircle className="size-6 text-magenta-ink" /><span><span className="block text-xs font-bold uppercase tracking-widest opacity-70">WhatsApp</span><span className="font-display text-xl font-extrabold">{brand.whatsapp}</span></span></a>
            <a href={`mailto:${brand.email}`} className="card card-hover flex items-center gap-4 p-5"><Mail className="size-6 text-magenta-ink" /><span><span className="block text-xs font-bold uppercase tracking-widest opacity-70">Email</span><span className="font-display text-xl font-extrabold">{brand.email}</span></span></a>
            <p className="text-sm">Press: {brand.pressEmail} · Partnerships: {brand.partnershipsEmail}</p>
          </div>
          <ContactForm />
        </div>
      </Section>
      <Section tone="sand" bordered pad="md">
        <h2 className="headline text-4xl md:text-5xl">Our offices</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] border-[3px] border-plum bg-blush bg-dots" role="img" aria-label={`Map placeholder showing our head office at ${org.hq.line1}, ${org.hq.line2}`}>
            <svg viewBox="0 0 400 250" className="absolute inset-0 size-full" aria-hidden="true">
              <path d="M0 170 C80 150 120 200 200 180 S320 120 400 140" stroke="#FFA6C9" strokeWidth="26" fill="none" />
              <path d="M60 0 L120 250 M260 0 L220 250 M0 80 L400 60" stroke="#FBF3EA" strokeWidth="10" fill="none" />
            </svg>
            <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-full">
              <MapPin className="size-14 fill-magenta-strong text-plum" strokeWidth={2} />
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border-[3px] border-plum bg-paper p-4">
              <p className="font-display text-lg font-extrabold">HerVoice HQ</p>
              <p className="text-sm">{org.hq.line1}, {org.hq.line2}, {org.hq.state}</p>
            </div>
          </div>
          <ul className="grid gap-4">
            {org.chapters.map((c) => (
              <li key={c.city} className="card p-5">
                <p className="font-display text-xl font-extrabold">{c.city}</p>
                <p className="text-sm">{c.address}</p>
                <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="mt-1 inline-block text-sm font-bold text-magenta-ink underline">{c.phone}</a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 text-sm">Office hours: Mon–Fri, 9am–5pm. Helpline open 24/7.</p>
      </Section>
    </>
  );
}
