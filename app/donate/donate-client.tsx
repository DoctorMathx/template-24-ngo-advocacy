"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, ArrowRight, Gift, Heart, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { siteConfig, type Frequency } from "@/lib/site-config";
import { cn, formatNaira, isEmail, isPhone, makeRef, parseAmount } from "@/lib/utils";
import { designations, designationLabel } from "@/mock/navigation";
import { nigerianStates } from "@/mock/petitions";
import { Field, aria } from "@/components/forms/field";
import { PaymentMethods, emptyCard, payMethodLabel, validateCard, type CardDetails, type PayMethod } from "@/components/forms/payment-methods";

const freqLabel: Record<Frequency, string> = { "one-time": "One-time", monthly: "Monthly", annual: "Annual" };
const freqSuffix: Record<Frequency, string> = { "one-time": "", monthly: "/month", annual: "/year" };

type Errors = Partial<Record<"amount" | "firstName" | "lastName" | "email" | "phone" | "tributeName" | "tributeEmail" | "card", string>>;

function resolveDesignation(sp: URLSearchParams) {
  const direct = sp.get("designation");
  if (direct && designations.some((d) => d.value === direct)) return direct;
  const keys: [string, string][] = [
    ["campaign", "campaign"],
    ["programme", "programme"],
    ["fundraiser", "fundraiser"],
    ["fund", "fund"],
    ["membership", "membership"],
  ];
  for (const [param, prefix] of keys) {
    const v = sp.get(param);
    if (v && designations.some((d) => d.value === `${prefix}:${v}`)) return `${prefix}:${v}`;
  }
  return "general";
}

export function DonateClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const { donation } = siteConfig;

  const initialDesignation = resolveDesignation(sp);
  const isMembershipInit = initialDesignation.startsWith("membership:");
  const qFreq = sp.get("frequency") as Frequency | null;
  const initialFreq: Frequency = isMembershipInit ? "annual" : qFreq && donation.frequencies.includes(qFreq) ? qFreq : donation.defaultFrequency;
  const qAmount = parseAmount(sp.get("amount"));
  const initialPresets = donation.presets[initialFreq];
  const qIsPreset = initialPresets.some((p) => p.amount === qAmount);

  const [frequency, setFrequency] = useState<Frequency>(initialFreq);
  const [preset, setPreset] = useState<number | null>(qAmount ? (qIsPreset ? qAmount : null) : initialPresets[1]?.amount ?? null);
  const [custom, setCustom] = useState(qAmount && !qIsPreset ? String(qAmount) : "");
  const [designation, setDesignation] = useState(initialDesignation);
  const [coverFees, setCoverFees] = useState(true);
  const [tributeOn, setTributeOn] = useState(false);
  const [tributeType, setTributeType] = useState<"honour" | "memory">("honour");
  const [tributeName, setTributeName] = useState("");
  const [tributeEmail, setTributeEmail] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [donor, setDonor] = useState({ firstName: sp.get("name")?.split(" ")[0] ?? "", lastName: sp.get("name")?.split(" ").slice(1).join(" ") ?? "", email: sp.get("email") ?? "", phone: "", state: "Lagos", updates: true, message: "" });
  const [method, setMethod] = useState<PayMethod>("card");
  const [card, setCard] = useState<CardDetails>(emptyCard);
  const [cardErrors, setCardErrors] = useState<Partial<Record<keyof CardDetails, string>>>({});
  const [reference, setReference] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const isMembership = designation.startsWith("membership:");
  const isFundraiser = designation.startsWith("fundraiser:");
  const presets = donation.presets[frequency];
  const amount = preset ?? parseAmount(custom);
  const fee = coverFees ? Math.round(amount * donation.processingFeeRate) : 0;
  const total = amount + fee;
  const impact = presets.find((p) => p.amount === amount)?.impact;

  const grouped = useMemo(() => {
    const g: Record<string, typeof designations> = {};
    designations.forEach((d) => (g[d.group] ||= []).push(d));
    return g;
  }, []);

  function changeFrequency(f: Frequency) {
    setFrequency(f);
    if (preset !== null) setPreset(donation.presets[f][1]?.amount ?? donation.presets[f][0].amount);
  }

  function changeMethod(m: PayMethod) {
    setMethod(m);
    if (!reference) setReference(makeRef());
  }

  function changeDesignation(v: string) {
    setDesignation(v);
    if (v.startsWith("membership:")) setFrequency("annual");
  }

  function validate(): Errors {
    const e: Errors = {};
    const rawCustom = custom.trim();
    if (preset === null) {
      if (!rawCustom) e.amount = "Choose an amount or enter your own.";
      else if (!/^\d+$/.test(rawCustom.replace(/,/g, ""))) e.amount = "Enter a whole number of naira (no decimals or symbols).";
      else if (amount < donation.minimum) e.amount = `The minimum gift is ${formatNaira(donation.minimum)}.`;
    }
    if (!donor.firstName.trim()) e.firstName = "Enter your first name.";
    if (!donor.lastName.trim()) e.lastName = "Enter your last name.";
    if (!isEmail(donor.email)) e.email = "Enter a valid email so we can send your receipt.";
    if (donor.phone && !isPhone(donor.phone)) e.phone = "Enter a valid phone number, e.g. +234 803 000 0000.";
    if (tributeOn && !tributeName.trim()) e.tributeName = "Who is this gift for?";
    if (tributeOn && tributeEmail && !isEmail(tributeEmail)) e.tributeEmail = "Enter a valid email or leave blank.";
    return e;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    const ce = method === "card" ? validateCard(card) : {};
    setErrors(e);
    setCardErrors(ce);
    const firstKey = Object.keys(e)[0] ?? (Object.keys(ce).length ? "card" : null);
    if (firstKey) {
      const target = firstKey === "card" ? document.getElementById("pay-tab-card") : firstKey === "amount" ? document.getElementById("custom-amount") : document.getElementById(`d-${firstKey}`);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      (target as HTMLElement | null)?.focus({ preventScroll: true });
      return;
    }
    setSubmitting(true);
    const ref = reference || makeRef();
    const params = new URLSearchParams({
      ref,
      amount: String(amount),
      fee: String(fee),
      total: String(total),
      frequency,
      designation,
      method,
      name: anonymous ? "Anonymous" : `${donor.firstName.trim()} ${donor.lastName.trim()}`,
      first: donor.firstName.trim(),
      email: donor.email.trim(),
      date: new Date().toISOString(),
    });
    if (tributeOn) {
      params.set("tribute", tributeType);
      params.set("tributeName", tributeName.trim());
    }
    router.push(`/donate/thank-you?${params.toString()}`);
  }

  const errorCount = Object.keys(errors).length + Object.keys(cardErrors).length;

  return (
    <form onSubmit={submit} noValidate className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
      <div className="space-y-8">
        {errorCount > 0 && (
          <div className="flex items-start gap-3 rounded-2xl border-[3px] border-danger bg-[#FFF1F0] p-4 text-danger" role="alert">
            <AlertCircle className="mt-0.5 size-5 shrink-0" />
            <p className="font-semibold">Please fix {errorCount} {errorCount === 1 ? "thing" : "things"} below before we can process your gift.</p>
          </div>
        )}

        {isFundraiser && (
          <div className="card flex items-center gap-4 bg-tangerine-soft p-5">
            <Sparkles className="size-6 shrink-0 text-magenta-ink" />
            <p>You&apos;re giving through <strong>{designationLabel(designation)}</strong>. Your gift goes directly to HerVoice and counts towards their goal.</p>
          </div>
        )}

        {/* 1. Amount */}
        <fieldset className="card p-6 md:p-8">
          <legend className="sr-only">Gift amount and frequency</legend>
          <StepTitle n={1} title="Your gift" />
          <div role="radiogroup" aria-label="How often" className="mt-5 grid grid-cols-3 gap-2 rounded-full border-[3px] border-plum bg-cream p-1.5">
            {donation.frequencies.map((f) => {
              const disabled = isMembership && f !== "annual";
              return (
                <button
                  key={f}
                  type="button"
                  role="radio"
                  aria-checked={frequency === f}
                  disabled={disabled}
                  onClick={() => changeFrequency(f)}
                  className={cn("min-h-[46px] rounded-full font-bold transition-colors disabled:opacity-40", frequency === f ? "bg-magenta-strong text-white" : "hover:bg-blush")}
                >
                  {freqLabel[f]}
                </button>
              );
            })}
          </div>
          {isMembership && <p className="hint mt-2">Membership dues are paid annually.</p>}
          {frequency === "monthly" && <p className="mt-3 text-sm font-semibold text-magenta-ink">Monthly givers keep the helpline open 24/7. Cancel anytime.</p>}

          <div role="radiogroup" aria-label="Amount" className="mt-6 grid gap-3 sm:grid-cols-2">
            {presets.map((p) => (
              <button
                key={p.amount}
                type="button"
                role="radio"
                aria-checked={preset === p.amount}
                onClick={() => { setPreset(p.amount); setCustom(""); setErrors((x) => ({ ...x, amount: undefined })); }}
                className={cn(
                  "rounded-2xl border-[3px] border-plum p-4 text-left transition-all",
                  preset === p.amount ? "bg-plum text-cream shadow-hard-magenta" : "bg-paper hover:bg-blush"
                )}
              >
                <span className="headline block text-3xl">{formatNaira(p.amount)}<span className="text-base font-semibold opacity-70">{freqSuffix[frequency]}</span></span>
                <span className="mt-1 block text-sm leading-snug opacity-90">{p.impact}</span>
              </button>
            ))}
          </div>
          <Field id="custom-amount" label="Or enter your own amount" error={errors.amount} hint={`Whole naira, minimum ${formatNaira(donation.minimum)}.`} className="mt-5">
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-display text-xl font-extrabold">₦</span>
              <input
                {...aria("custom-amount", errors.amount)}
                inputMode="numeric"
                className="input pl-10 font-display text-xl font-bold"
                placeholder="e.g. 15000"
                value={custom}
                onFocus={() => setPreset(null)}
                onChange={(e) => { setPreset(null); setCustom(e.target.value.replace(/[^\d,]/g, "")); }}
              />
            </div>
          </Field>

          <Field id="designation" label="Where should it go?" className="mt-5">
            <select id="designation" className="input" value={designation} onChange={(e) => changeDesignation(e.target.value)}>
              {Object.entries(grouped).map(([group, items]) => (
                <optgroup key={group} label={group}>
                  {items.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                </optgroup>
              ))}
            </select>
          </Field>

          <label className="check mt-5 rounded-2xl border-[2.5px] border-plum bg-tangerine-soft p-4">
            <input type="checkbox" checked={coverFees} onChange={(e) => setCoverFees(e.target.checked)} />
            <span>
              <strong>Cover the {(donation.processingFeeRate * 100).toFixed(1)}% processing fee</strong> {amount > 0 && <>(+{formatNaira(Math.round(amount * donation.processingFeeRate))})</>}
              <span className="block text-sm opacity-80">So 100% of your gift reaches women and girls.</span>
            </span>
          </label>
        </fieldset>

        {/* 2. Tribute */}
        <fieldset className="card p-6 md:p-8">
          <legend className="sr-only">Dedication</legend>
          <StepTitle n={2} title="Dedicate your gift" optional />
          <label className="check mt-5">
            <input type="checkbox" checked={tributeOn} onChange={(e) => setTributeOn(e.target.checked)} />
            <span>Give in honour or in memory of someone special</span>
          </label>
          {tributeOn && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Tribute type">
                {(["honour", "memory"] as const).map((t) => (
                  <button key={t} type="button" role="radio" aria-checked={tributeType === t} onClick={() => setTributeType(t)} className="chip" data-active={tributeType === t}>
                    {t === "honour" ? <Gift className="size-4" /> : <Heart className="size-4" />} In {t} of
                  </button>
                ))}
              </div>
              <Field id="d-tributeName" label="Their name" error={errors.tributeName} required>
                <input {...aria("d-tributeName", errors.tributeName)} className="input" value={tributeName} onChange={(e) => setTributeName(e.target.value)} />
              </Field>
              <Field id="d-tributeEmail" label="Notify by email (optional)" error={errors.tributeEmail} hint="We'll send a card — never the amount.">
                <input {...aria("d-tributeEmail", errors.tributeEmail)} type="email" className="input" value={tributeEmail} onChange={(e) => setTributeEmail(e.target.value)} />
              </Field>
            </div>
          )}
        </fieldset>

        {/* 3. Details */}
        <fieldset className="card p-6 md:p-8">
          <legend className="sr-only">Your details</legend>
          <StepTitle n={3} title="Your details" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field id="d-firstName" label="First name" error={errors.firstName} required>
              <input {...aria("d-firstName", errors.firstName)} className="input" autoComplete="given-name" value={donor.firstName} onChange={(e) => setDonor({ ...donor, firstName: e.target.value })} />
            </Field>
            <Field id="d-lastName" label="Last name" error={errors.lastName} required>
              <input {...aria("d-lastName", errors.lastName)} className="input" autoComplete="family-name" value={donor.lastName} onChange={(e) => setDonor({ ...donor, lastName: e.target.value })} />
            </Field>
            <Field id="d-email" label="Email (for your receipt)" error={errors.email} required>
              <input {...aria("d-email", errors.email)} type="email" className="input" autoComplete="email" value={donor.email} onChange={(e) => setDonor({ ...donor, email: e.target.value })} />
            </Field>
            <Field id="d-phone" label="Phone / WhatsApp (optional)" error={errors.phone}>
              <input {...aria("d-phone", errors.phone)} type="tel" className="input" autoComplete="tel" placeholder="+234" value={donor.phone} onChange={(e) => setDonor({ ...donor, phone: e.target.value })} />
            </Field>
            <Field id="d-state" label="State">
              <select id="d-state" className="input" value={donor.state} onChange={(e) => setDonor({ ...donor, state: e.target.value })}>
                {nigerianStates.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            {isFundraiser && (
              <Field id="d-message" label="Message for the organiser (optional)" className="sm:col-span-2">
                <textarea id="d-message" className="input" maxLength={200} value={donor.message} onChange={(e) => setDonor({ ...donor, message: e.target.value })} placeholder="Shown on their page with your name (or as Anonymous)." />
              </Field>
            )}
            <label className="check sm:col-span-2">
              <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
              <span><strong>Give anonymously</strong> — hide my name from public donor lists. We still need your email for the receipt.</span>
            </label>
            <label className="check sm:col-span-2">
              <input type="checkbox" checked={donor.updates} onChange={(e) => setDonor({ ...donor, updates: e.target.checked })} />
              <span>Send me campaign updates and the Friday Rally email. Unsubscribe anytime.</span>
            </label>
          </div>
        </fieldset>

        {/* 4. Payment */}
        <fieldset className="card p-6 md:p-8">
          <legend className="sr-only">Payment</legend>
          <StepTitle n={4} title="Payment" />
          <div className="mt-5">
            <PaymentMethods method={method} onMethod={changeMethod} card={card} onCard={setCard} errors={cardErrors} reference={reference || "Select a method to generate"} amount={total} />
          </div>
        </fieldset>
      </div>

      {/* Sticky summary */}
      <aside className="lg:sticky lg:top-28" ref={summaryRef} aria-label="Donation summary">
        <div className="card overflow-hidden">
          <div className="bg-plum p-6 text-cream on-dark">
            <p className="eyebrow">Your gift</p>
            <p className="poster mt-3 text-5xl tabular-nums break-words sm:text-6xl" aria-live="polite">{amount > 0 ? formatNaira(total) : "₦—"}</p>
            <p className="mt-1 font-semibold text-tangerine">{freqLabel[frequency]}{frequency !== "one-time" && " · renews automatically"}</p>
          </div>
          <dl className="space-y-3 p-6 text-[0.95rem]">
            <SummaryRow label="Donation" value={amount > 0 ? `${formatNaira(amount)}${freqSuffix[frequency]}` : "—"} />
            <SummaryRow label="Processing fee" value={coverFees ? formatNaira(fee) : "Not covered"} />
            <SummaryRow label="Designation" value={designationLabel(designation)} />
            <SummaryRow label="Payment" value={payMethodLabel[method]} />
            {tributeOn && tributeName && <SummaryRow label={`In ${tributeType} of`} value={tributeName} />}
            {anonymous && <SummaryRow label="Display" value="Anonymous" />}
            <div className="flex justify-between gap-3 border-t-[3px] border-plum pt-3 font-display text-xl font-extrabold">
              <dt>Total{freqSuffix[frequency]}</dt>
              <dd className="tabular-nums">{amount > 0 ? formatNaira(total) : "—"}</dd>
            </div>
          </dl>
          {impact && <p className="mx-6 mb-5 rounded-2xl bg-blush p-4 text-sm"><strong>{formatNaira(amount)}</strong> {impact}.</p>}
          <div className="px-6 pb-6">
            <button type="submit" disabled={submitting} className="btn btn-lg btn-magenta w-full">
              {submitting ? "Processing…" : method === "card" ? <>Give {amount > 0 ? formatNaira(total) : ""} <ArrowRight className="size-5" /></> : method === "transfer" ? "I've made the transfer" : "I've dialled the code"}
            </button>
            <p className="mt-4 flex items-center gap-2 text-xs opacity-80"><Lock className="size-3.5" /> Secure, simulated checkout. Nothing is charged.</p>
            <p className="mt-2 flex items-center gap-2 text-xs opacity-80"><ShieldCheck className="size-3.5" /> Registered not-for-profit · audited annually</p>
          </div>
        </div>
      </aside>
    </form>
  );
}

function StepTitle({ n, title, optional }: { n: number; title: string; optional?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-full border-[3px] border-plum bg-tangerine font-display font-extrabold">{n}</span>
      <h2 className="headline text-2xl md:text-3xl">{title}</h2>
      {optional && <span className="text-sm font-semibold opacity-60">(optional)</span>}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="opacity-75">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}
