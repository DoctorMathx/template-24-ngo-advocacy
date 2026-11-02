import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { events, getEvent } from "@/mock/events";
import { formatDate, formatNaira, formatNumber } from "@/lib/utils";
import { Photo } from "@/components/ui/photo";
import { ProgressBar } from "@/components/ui/progress";
import { Sticker } from "@/components/ui/sticker";
import { Section } from "@/components/ui/section";
import { TicketCheckout } from "@/components/forms/ticket-checkout";
import { RsvpForm } from "./rsvp-form";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return { title: "Event not found" };
  return { title: e.title, description: e.summary, openGraph: { images: [e.image] } };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) notFound();
  return (
    <>
      <section className="border-b-[3px] border-plum bg-cream bg-dots">
        <div className="container-x grid gap-10 py-12 md:py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <div className="mb-6 flex flex-wrap gap-3">
              <Sticker tone="plum" tilt="none">{e.kind}</Sticker>
              <Sticker tone="tangerine">{e.price === 0 ? "Free" : `From ${formatNaira(e.price)}`}</Sticker>
            </div>
            <h1 className="poster text-[3rem] sm:text-7xl lg:text-[5.4rem]">{e.title}</h1>
            <p className="lede mt-6">{e.summary}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              <li className="flex items-center gap-3 font-semibold"><CalendarDays className="size-5 text-magenta-ink" />{formatDate(e.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</li>
              <li className="flex items-center gap-3 font-semibold"><Clock className="size-5 text-magenta-ink" />{e.time}</li>
              <li className="flex items-center gap-3 font-semibold sm:col-span-2"><MapPin className="size-5 shrink-0 text-magenta-ink" />{e.venue}, {e.city}</li>
            </ul>
            <div className="mt-8 max-w-md">
              <div className="mb-2 flex justify-between text-sm font-semibold"><span className="inline-flex items-center gap-1.5"><Users className="size-4" />{formatNumber(e.registered)} registered</span><span>{formatNumber(e.capacity - e.registered)} places left</span></div>
              <ProgressBar value={e.registered} goal={e.capacity} tone="tangerine" label={`${e.registered} of ${e.capacity} places taken`} />
            </div>
          </div>
          <Photo src={e.image} alt="" ratio="4/3.4" duotone="magenta" cut="a" priority sizes="(min-width:1024px) 40vw, 100vw" />
        </div>
      </section>
      <Section tone="paper" pad="md">
        <div className="mx-auto max-w-3xl space-y-4 text-[1.1rem] leading-relaxed">
          {e.description.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </Section>
      <Section tone="sand" bordered pad="md" id="register">
        <h2 className="headline mb-8 text-4xl md:text-5xl">{e.tickets ? "Get your entry" : "Reserve your place"}</h2>
        {e.tickets ? <TicketCheckout eventSlug={e.slug} eventTitle={e.title} options={e.tickets} /> : <RsvpForm eventTitle={e.title} online={e.city === "Online"} />}
      </Section>
    </>
  );
}
