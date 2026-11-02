import type { Metadata } from "next";
import Link from "next/link";
import { CalendarPlus, CheckCircle2 } from "lucide-react";
import { events, gala, galaTickets } from "@/mock/events";
import { siteConfig } from "@/lib/site-config";
import { formatDate, formatNaira, parseAmount } from "@/lib/utils";
import { ShareButtons } from "@/components/ui/share-buttons";
import { PrintButton } from "@/app/donate/thank-you/print-button";

export const metadata: Metadata = { title: "Ticket confirmation", robots: { index: false, follow: false } };

type SP = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const methodText: Record<string, string> = { card: "Card", transfer: "Bank transfer (awaiting confirmation)", ussd: "USSD (awaiting confirmation)" };

export default async function TicketConfirmationPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const slug = one(sp.event);
  const isGala = slug === "gala";
  const ev = isGala ? null : events.find((e) => e.slug === slug);
  const options = isGala ? galaTickets : ev?.tickets ?? [];
  const title = isGala ? gala.title : ev?.title;
  const date = isGala ? gala.date : ev?.date;
  const venue = isGala ? `${gala.venue}, ${gala.city}` : ev ? `${ev.venue}, ${ev.city}` : "";

  // Recompute totals server-side from item ids — never trust a client total.
  const lines = one(sp.items)
    .split(".")
    .map((pair) => {
      const i = pair.lastIndexOf("-");
      const opt = options.find((o) => o.id === pair.slice(0, i));
      const q = Math.min(20, parseAmount(pair.slice(i + 1)));
      return opt && q > 0 ? { ...opt, q } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
  const gift = parseAmount(one(sp.gift));
  const total = lines.reduce((s, l) => s + l.price * l.q, 0) + gift;
  const seats = lines.reduce((s, l) => s + l.seats * l.q, 0);
  const ref = one(sp.ref).replace(/[^A-Z0-9-]/gi, "").slice(0, 24);
  const name = one(sp.name).slice(0, 80);
  const org = one(sp.org).slice(0, 80);

  if (!title || !lines.length || !ref) {
    return (
      <section className="border-b-[3px] border-plum bg-cream bg-dots">
        <div className="container-x py-24">
          <h1 className="poster text-6xl md:text-8xl">No order found.</h1>
          <p className="lede mt-6 max-w-xl">This confirmation link is incomplete. Check your email for your tickets, or browse events.</p>
          <Link href="/events" className="btn btn-magenta mt-8">See events</Link>
        </div>
      </section>
    );
  }

  const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${date!.replace(/-/g, "")}/${date!.replace(/-/g, "")}&location=${encodeURIComponent(venue)}`;

  return (
    <section className="bg-cream bg-dots py-14 md:py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div>
          <CheckCircle2 className="size-12 text-magenta-strong" />
          <p className="eyebrow mt-4">Order confirmed</p>
          <h1 className="poster mt-3 text-6xl md:text-8xl">You&apos;re <span className="text-magenta-strong">in{name ? `, ${name.split(" ")[0]}` : ""}.</span></h1>
          <p className="lede mt-6">Your {seats} {seats === 1 ? "seat is" : "seats are"} confirmed for <strong>{title}</strong>. E-tickets and a VAT receipt go to {one(sp.email) || "your email"}.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={gcal} target="_blank" rel="noopener noreferrer" className="btn btn-plum"><CalendarPlus className="size-4" /> Add to calendar</a>
            <PrintButton />
          </div>
          <div className="mt-10">
            <p className="font-display text-xl font-extrabold">Bring your crew</p>
            <ShareButtons className="mt-3" path={isGala ? "/events/gala" : `/events/${slug}`} text={`I'm going to ${title}! Get your ticket:`} />
          </div>
        </div>

        <article className="card overflow-hidden" aria-label="Your tickets">
          <div className="bg-plum p-6 text-cream on-dark">
            <p className="eyebrow">{siteConfig.brand.name}</p>
            <p className="headline mt-2 text-3xl">{title}</p>
            <p className="mt-2 text-sm text-cream/80">{formatDate(date!, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · {venue}</p>
          </div>
          <div className="relative border-y-[3px] border-dashed border-plum bg-tangerine px-6 py-4">
            <p className="text-xs font-bold uppercase tracking-widest">Order reference</p>
            <p className="font-display text-2xl font-extrabold tracking-wider">{ref}</p>
          </div>
          <dl className="space-y-2.5 p-6 text-[0.98rem]">
            {lines.map((l) => (
              <div key={l.id} className="flex justify-between gap-3"><dt>{l.q} × {l.name}</dt><dd className="font-semibold">{formatNaira(l.price * l.q)}</dd></div>
            ))}
            {gift > 0 && <div className="flex justify-between gap-3"><dt>Gift to Micro-grant Fund</dt><dd className="font-semibold">{formatNaira(gift)}</dd></div>}
            {name && <div className="flex justify-between gap-3 border-t-2 border-plum/15 pt-2.5"><dt className="opacity-75">Lead attendee</dt><dd className="font-semibold">{name}{org ? ` · ${org}` : ""}</dd></div>}
            <div className="flex justify-between gap-3"><dt className="opacity-75">Payment</dt><dd className="font-semibold">{methodText[one(sp.method)] ?? "Card"}</dd></div>
            <div className="flex flex-wrap items-end justify-between gap-x-3 border-t-[3px] border-plum pt-3">
              <dt className="font-display text-xl font-extrabold">Total</dt>
              <dd className="poster text-5xl">{formatNaira(total)}</dd>
            </div>
          </dl>
          <div className="flex items-center gap-4 border-t-[3px] border-plum bg-paper p-6">
            <div className="grid size-20 shrink-0 grid-cols-5 gap-0.5 rounded-lg border-2 border-plum bg-cream p-1.5" aria-hidden="true">
              {Array.from({ length: 25 }).map((_, i) => <span key={i} className={(ref.charCodeAt(i % ref.length) + i) % 3 ? "bg-plum" : "bg-transparent"} />)}
            </div>
            <p className="text-sm opacity-85">Show this code or your reference at the door.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
