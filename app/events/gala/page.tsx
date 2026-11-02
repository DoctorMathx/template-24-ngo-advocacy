import type { Metadata } from "next";
import Link from "next/link";
import { Award, CalendarDays, Clock, MapPin, Shirt } from "lucide-react";
import { gala, galaTickets } from "@/mock/events";
import { formatDate, formatNaira } from "@/lib/utils";
import { Photo } from "@/components/ui/photo";
import { RaisedMeter } from "@/components/ui/progress";
import { RoundSticker, Sticker } from "@/components/ui/sticker";
import { Section, SectionHeader } from "@/components/ui/section";
import { SloganMarquee } from "@/components/ui/marquee";
import { TicketCheckout } from "@/components/forms/ticket-checkout";

export const metadata: Metadata = {
  title: "The HerVoice Gala 2026",
  description: `${gala.summary} ${formatDate(gala.date)} at ${gala.venue}, ${gala.city}. Tickets, tables and sponsorship.`,
  openGraph: { images: [gala.image] },
};

export default function GalaPage() {
  return (
    <>
      <section className="on-dark relative overflow-hidden border-b-[3px] border-plum bg-plum text-cream">
        <div className="absolute inset-0 opacity-50" aria-hidden="true">
          <Photo src={gala.image} alt="" ratio="auto" duotone="plum" priority className="absolute! inset-0 h-full w-full" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-plum via-plum/70 to-plum/20" aria-hidden="true" />
        <div className="container-x relative py-20 md:py-28">
          <RoundSticker tone="tangerine" size={150} className="wobble absolute right-6 top-10 hidden md:grid">Black tie<br />+ a splash<br />of pink</RoundSticker>
          <Sticker tone="magenta" className="mb-6">{formatDate(gala.date, { day: "numeric", month: "long", year: "numeric" })} · {gala.city}</Sticker>
          <h1 className="poster text-[2.9rem] min-[400px]:text-[3.4rem] sm:text-8xl lg:text-[10rem]">The HerVoice<br /><span className="text-pink-soft">Gala</span> <span className="text-tangerine">2026</span></h1>
          <p className="mt-6 font-display text-2xl font-bold sm:text-3xl">“{gala.theme}”</p>
          <p className="mt-4 max-w-2xl text-lg text-cream/85">{gala.summary}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="#tickets" className="btn btn-lg btn-tangerine">Buy tickets</Link>
            <Link href="#tables" className="btn btn-lg btn-outline">Tables & sponsorship</Link>
          </div>
        </div>
      </section>
      <SloganMarquee tone="magenta" items={["Unbossed & unbought", "Dress loud", "Bid big", "Fund 600 micro-grants", "Dance for justice"]} />

      <Section tone="cream" pad="md">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: CalendarDays, label: "Date", value: formatDate(gala.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) },
                { icon: Clock, label: "Time", value: gala.time },
                { icon: MapPin, label: "Venue", value: `${gala.venue}, ${gala.city}` },
                { icon: Shirt, label: "Dress code", value: gala.dressCode },
              ].map((x) => (
                <li key={x.label} className="card p-5">
                  <x.icon className="size-6 text-magenta-ink" />
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest opacity-70">{x.label}</p>
                  <p className="font-display text-lg font-extrabold">{x.value}</p>
                </li>
              ))}
            </ul>
            <h2 className="headline mt-12 text-4xl">Run of show</h2>
            <ol className="mt-6 divide-y-2 divide-plum/15 border-y-[3px] border-plum">
              {gala.programme.map((p) => (
                <li key={p.time} className="flex gap-4 py-4 sm:gap-6">
                  <span className="w-20 shrink-0 font-display text-lg font-extrabold text-magenta-ink">{p.time}</span>
                  <span className="font-semibold">{p.item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-6">
            <div className="card p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-magenta-ink">Gala fundraising goal</p>
              <div className="mt-3"><RaisedMeter raised={gala.raised} goal={gala.goal} /></div>
              <Link href="/donate?fund=gala" className="btn btn-plum mt-5 w-full whitespace-normal">Can&apos;t come? Give to the paddle raise</Link>
            </div>
            <div className="card bg-tangerine p-6">
              <p className="headline flex items-center gap-2 text-2xl"><Award className="size-6" /> 2026 Honourees</p>
              <ul className="mt-4 space-y-3">
                {gala.honourees.map((h) => (
                  <li key={h.name}>
                    <p className="font-display text-lg font-extrabold">{h.name}</p>
                    <p className="text-sm">{h.award}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="sand" bordered id="tickets">
        <SectionHeader eyebrow="Tickets, tables & sponsorship" title="Pick your seat." lede="Select quantities, see your total update live, then check out by card, transfer or USSD." />
        <div id="tables" className="scroll-mt-28">
          <TicketCheckout eventSlug="gala" eventTitle={gala.title} options={galaTickets} />
        </div>
        <p className="mt-8 text-sm">Want a bespoke sponsorship or in-kind partnership? <Link href="/partner" className="font-bold underline decoration-magenta decoration-2 underline-offset-4">Talk to our partnerships team</Link>. Starting price {formatNaira(galaTickets[0].price)}.</p>
      </Section>
    </>
  );
}
