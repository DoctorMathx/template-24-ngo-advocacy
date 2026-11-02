"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Minus, Plus, Ticket } from "lucide-react";
import type { TicketOption } from "@/lib/types";
import { cn, formatNaira, isEmail, isPhone, makeRef } from "@/lib/utils";
import { Field, aria } from "./field";
import { PaymentMethods, emptyCard, payMethodLabel, validateCard, type CardDetails, type PayMethod } from "./payment-methods";

const addOns = [0, 10_000, 25_000, 50_000];

/** Quantity pickers + totals + attendee details + payment → /events/confirmation. */
export function TicketCheckout({ eventSlug, eventTitle, options }: { eventSlug: string; eventTitle: string; options: TicketOption[] }) {
  const router = useRouter();
  const [qty, setQty] = useState<Record<string, number>>({});
  const [gift, setGift] = useState(0);
  const [stage, setStage] = useState<"select" | "details">("select");
  const [f, setF] = useState({ name: "", email: "", phone: "", org: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [method, setMethod] = useState<PayMethod>("card");
  const [card, setCard] = useState<CardDetails>(emptyCard);
  const [cardErrors, setCardErrors] = useState<Partial<Record<keyof CardDetails, string>>>({});
  const [reference, setReference] = useState("");

  const lines = options.filter((o) => (qty[o.id] ?? 0) > 0).map((o) => ({ ...o, q: qty[o.id] }));
  const subtotal = lines.reduce((s, l) => s + l.price * l.q, 0);
  const seats = lines.reduce((s, l) => s + l.seats * l.q, 0);
  const total = subtotal + gift;
  const hasTable = lines.some((l) => l.kind !== "ticket");

  function change(id: string, delta: number, max: number) {
    setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(max, (q[id] ?? 0) + delta)) }));
    setErrors((e) => ({ ...e, tickets: "" }));
  }

  function toDetails() {
    if (!lines.length) {
      setErrors({ tickets: "Choose at least one ticket, table or package." });
      return;
    }
    setStage("details");
    if (!reference) setReference(makeRef("HVT"));
    setTimeout(() => document.getElementById("t-name")?.focus(), 50);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = "Enter the lead attendee's name.";
    if (!isEmail(f.email)) er.email = "Enter a valid email for your tickets.";
    if (!isPhone(f.phone)) er.phone = "Enter a valid phone number.";
    if (hasTable && !f.org.trim()) er.org = "Tables and sponsorships need a company or group name.";
    const ce = method === "card" ? validateCard(card) : {};
    setErrors(er);
    setCardErrors(ce);
    if (Object.keys(er).length) return document.getElementById(`t-${Object.keys(er)[0]}`)?.focus();
    if (Object.keys(ce).length) return document.getElementById("tix-tab-card")?.focus();
    const p = new URLSearchParams({
      ref: reference || makeRef("HVT"),
      event: eventSlug,
      items: lines.map((l) => `${l.id}-${l.q}`).join("."),
      gift: String(gift),
      name: f.name.trim(),
      email: f.email.trim(),
      method,
    });
    if (f.org.trim()) p.set("org", f.org.trim());
    router.push(`/events/confirmation?${p.toString()}`);
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
      <div className="space-y-5">
        {stage === "select" ? (
          <>
            {options.map((o) => {
              const q = qty[o.id] ?? 0;
              const max = Math.min(o.remaining, o.kind === "sponsor" ? 1 : 10);
              return (
                <div key={o.id} className={cn("card flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6", q > 0 && "bg-blush")}>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="headline text-2xl">{o.name}</p>
                      {o.kind !== "ticket" && <span className="rounded-full bg-plum px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-cream">{o.kind === "table" ? `Table · ${o.seats} seats` : "Sponsorship"}</span>}
                    </div>
                    <p className="mt-1 text-sm opacity-85">{o.blurb}</p>
                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold opacity-80">
                      {o.perks.map((p) => <li key={p}>· {p}</li>)}
                    </ul>
                    <p className={cn("mt-2 text-xs font-bold", o.remaining <= 10 ? "text-magenta-ink" : "opacity-60")}>{o.remaining <= 10 ? `Only ${o.remaining} left` : `${o.remaining} available`}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 sm:flex-col sm:flex-nowrap sm:items-end">
                    <p className="poster text-3xl sm:text-4xl">{formatNaira(o.price)}</p>
                    <div className="flex items-center rounded-full border-[3px] border-plum bg-paper" role="group" aria-label={`Quantity for ${o.name}`}>
                      <button type="button" className="grid size-11 place-items-center rounded-full hover:bg-blush disabled:opacity-30" onClick={() => change(o.id, -1, max)} disabled={q === 0} aria-label={`Remove one ${o.name}`}>
                        <Minus className="size-4" strokeWidth={3} />
                      </button>
                      <output className="w-10 text-center font-display text-xl font-extrabold tabular-nums" aria-live="polite" aria-label={`${q} selected`}>{q}</output>
                      <button type="button" className="grid size-11 place-items-center rounded-full hover:bg-blush disabled:opacity-30" onClick={() => change(o.id, 1, max)} disabled={q >= max} aria-label={`Add one ${o.name}`}>
                        <Plus className="size-4" strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="card p-5 md:p-6">
              <p className="headline text-2xl">Add a gift to the cause?</p>
              <p className="mt-1 text-sm opacity-85">Optional — goes to the Women&apos;s Micro-grant Fund.</p>
              <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Add a donation">
                {addOns.map((a) => (
                  <button key={a} type="button" role="radio" aria-checked={gift === a} className="chip" data-active={gift === a} onClick={() => setGift(a)}>
                    {a === 0 ? "No thanks" : `+${formatNaira(a)}`}
                  </button>
                ))}
              </div>
            </div>
            {errors.tickets && <p className="error-text" role="alert">{errors.tickets}</p>}
          </>
        ) : (
          <>
            <button type="button" className="btn btn-sm btn-outline" onClick={() => setStage("select")}>← Change tickets</button>
            <fieldset className="card p-6 md:p-8">
              <legend className="sr-only">Attendee details</legend>
              <p className="headline text-3xl">Lead attendee</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field id="t-name" label="Full name" error={errors.name} required>
                  <input {...aria("t-name", errors.name)} className="input" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
                </Field>
                <Field id="t-email" label="Email (tickets are sent here)" error={errors.email} required>
                  <input {...aria("t-email", errors.email)} type="email" className="input" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
                </Field>
                <Field id="t-phone" label="Phone" error={errors.phone} required>
                  <input {...aria("t-phone", errors.phone)} type="tel" className="input" autoComplete="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
                </Field>
                <Field id="t-org" label={hasTable ? "Company / group name" : "Company / group (optional)"} error={errors.org} required={hasTable}>
                  <input {...aria("t-org", errors.org)} className="input" autoComplete="organization" value={f.org} onChange={(e) => setF({ ...f, org: e.target.value })} />
                </Field>
                <Field id="t-notes" label="Dietary needs, accessibility or guest names (optional)" className="sm:col-span-2">
                  <textarea id="t-notes" className="input" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} />
                </Field>
              </div>
            </fieldset>
            <fieldset className="card p-6 md:p-8">
              <legend className="sr-only">Payment</legend>
              <p className="headline mb-5 text-3xl">Payment</p>
              <PaymentMethods idPrefix="tix" method={method} onMethod={setMethod} card={card} onCard={setCard} errors={cardErrors} reference={reference} amount={total} />
            </fieldset>
          </>
        )}
      </div>

      <aside className="lg:sticky lg:top-28" aria-label="Order summary">
        <div className="card overflow-hidden">
          <div className="flex items-center gap-3 border-b-[3px] border-dashed border-plum bg-tangerine p-5">
            <Ticket className="size-6" />
            <p className="font-display text-lg font-extrabold leading-tight">{eventTitle}</p>
          </div>
          <div className="p-6">
            {lines.length ? (
              <ul className="space-y-2.5 text-sm">
                {lines.map((l) => (
                  <li key={l.id} className="flex justify-between gap-3">
                    <span>{l.q} × {l.name}</span>
                    <span className="font-semibold tabular-nums">{formatNaira(l.price * l.q)}</span>
                  </li>
                ))}
                {gift > 0 && (
                  <li className="flex justify-between gap-3"><span>Gift to Micro-grant Fund</span><span className="font-semibold tabular-nums">{formatNaira(gift)}</span></li>
                )}
              </ul>
            ) : (
              <p className="text-sm opacity-75">No tickets selected yet. Use the + buttons to add tickets or tables.</p>
            )}
            <div className="mt-4 flex justify-between border-t-2 border-plum/15 pt-3 text-sm"><span>Seats</span><span className="font-semibold">{seats}</span></div>
            <div className="mt-3 flex items-end justify-between border-t-[3px] border-plum pt-3">
              <span className="font-display text-xl font-extrabold">Total</span>
              <span className="poster text-4xl tabular-nums" aria-live="polite">{formatNaira(total)}</span>
            </div>
            {stage === "select" ? (
              <button type="button" onClick={toDetails} className="btn btn-lg btn-magenta mt-5 w-full">Continue <ArrowRight className="size-5" /></button>
            ) : (
              <button type="submit" className="btn btn-lg btn-magenta mt-5 w-full">
                {method === "card" ? `Pay ${formatNaira(total)}` : `Confirm ${payMethodLabel[method].toLowerCase()}`}
              </button>
            )}
            <p className="mt-3 text-xs opacity-75">Simulated checkout — nothing is charged. Tickets are emailed instantly in production.</p>
          </div>
        </div>
      </aside>
    </form>
  );
}
