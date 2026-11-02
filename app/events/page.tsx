import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Ticket } from "lucide-react";
import { events, gala, galaTickets } from "@/mock/events";
import { formatDate, formatNaira } from "@/lib/utils";
import { EventCard } from "@/components/ui/cards";
import { Photo } from "@/components/ui/photo";
import { Section, SectionHeader } from "@/components/ui/section";
import { RoundSticker } from "@/components/ui/sticker";

export const metadata: Metadata = {
  title: "Events",
  description: "Marches, legal clinics, town halls, webinars, the HerRun 5K and the annual HerVoice Gala. Come through.",
};

export default function EventsPage() {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <>
      <section className="border-b-[3px] border-plum bg-cream bg-dots">
        <div className="container-x py-14 md:py-20">
          <p className="eyebrow mb-5">Events</p>
          <h1 className="poster text-[3.6rem] sm:text-8xl lg:text-[8.5rem]">Show <span className="text-magenta-strong">up.</span><br />Speak <span className="mark">up.</span></h1>
        </div>
      </section>

      <section className="on-dark relative overflow-hidden border-b-[3px] border-plum bg-plum text-cream">
        <div className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative">
            <Photo src={gala.image} alt="Guests raising glasses at a gala dinner" ratio="4/3" duotone="magenta" cut="c" sizes="(min-width:1024px) 45vw, 100vw" />
            <RoundSticker tone="tangerine" size={130} className="absolute -left-3 -top-6">Annual<br />Gala</RoundSticker>
          </div>
          <div>
            <p className="eyebrow mb-4">{formatDate(gala.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
            <h2 className="poster text-6xl md:text-7xl">{gala.title}</h2>
            <p className="mt-3 font-display text-2xl font-bold text-tangerine">“{gala.theme}” · {gala.venue}</p>
            <p className="mt-5 text-lg text-cream/85">{gala.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/events/gala" className="btn btn-lg btn-tangerine"><Ticket className="size-5" /> Tickets from {formatNaira(Math.min(...galaTickets.map((t) => t.price)))}</Link>
              <Link href="/events/gala#tables" className="btn btn-lg btn-outline">Tables & sponsorship</Link>
            </div>
          </div>
        </div>
      </section>

      <Section tone="cream">
        <SectionHeader eyebrow="Upcoming" title="On the calendar" action={<Link href="/get-involved" className="btn btn-outline">Host an event <ArrowRight className="size-4" /></Link>} />
        <div className="grid gap-6 lg:grid-cols-2">
          {sorted.map((e) => <EventCard key={e.slug} e={e} />)}
        </div>
      </Section>
    </>
  );
}
