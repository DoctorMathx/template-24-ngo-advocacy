"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import type { MembershipTier } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";
import { cn, formatNaira, isEmail, isPhone } from "@/lib/utils";
import { membershipTiers } from "@/mock/organisation";
import { Field, aria } from "@/components/forms/field";
import { Sticker } from "@/components/ui/sticker";

const interests = ["Campaigning & petitions", "Legal aid volunteering", "Campus organising", "Fundraising", "Digital & content", "Counselling support"];

export function JoinForm() {
  const sp = useSearchParams();
  const router = useRouter();
  const q = sp.get("tier") as MembershipTier["id"] | null;
  const [tier, setTier] = useState<MembershipTier["id"]>(q && membershipTiers.some((t) => t.id === q) ? q : "member");
  const [f, setF] = useState({ name: "", email: "", phone: "", chapter: "Lagos (HQ)", age: "", picked: [] as string[], code: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = membershipTiers.find((x) => x.id === tier)!;

  function toggle(i: string) {
    setF((x) => ({ ...x, picked: x.picked.includes(i) ? x.picked.filter((p) => p !== i) : [...x.picked, i] }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = "Enter your full name.";
    if (!isEmail(f.email)) er.email = "Enter a valid email.";
    if (f.phone && !isPhone(f.phone)) er.phone = "Enter a valid phone number.";
    if (!f.age) er.age = "Select your age group.";
    if (tier === "student" && f.age && !["Under 18", "18–24"].includes(f.age)) er.age = "Student membership is for under-25s — choose Member instead.";
    if (!f.code) er.code = "Please agree to the members' code of conduct.";
    setErrors(er);
    if (Object.keys(er).length) {
      document.getElementById(`j-${Object.keys(er)[0]}`)?.focus();
      return;
    }
    const p = new URLSearchParams({ membership: tier, amount: String(t.price), frequency: "annual", name: f.name.trim(), email: f.email.trim() });
    router.push(`/donate?${p.toString()}`);
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
      <div className="space-y-8">
        <fieldset>
          <legend className="headline mb-5 text-3xl md:text-4xl">1. Choose your tier</legend>
          <div className="grid gap-4 sm:grid-cols-2" role="radiogroup" aria-label="Membership tier">
            {membershipTiers.map((m) => (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={tier === m.id}
                onClick={() => setTier(m.id)}
                className={cn("relative rounded-[22px] border-[3px] border-plum p-6 text-left transition-all", tier === m.id ? "bg-plum text-cream shadow-hard-magenta" : "bg-paper hover:bg-blush")}
              >
                {m.featured && <Sticker tone="tangerine" className="absolute -top-4 right-4">Most popular</Sticker>}
                <span className="headline block text-2xl">{m.name}</span>
                <span className="poster mt-2 block text-5xl">{formatNaira(m.price)}<span className="font-sans text-base font-semibold normal-case tracking-normal opacity-70"> /year</span></span>
                <span className="mt-2 block text-sm opacity-90">{m.blurb}</span>
                <ul className="mt-4 space-y-1.5 text-sm">
                  {m.benefits.map((b) => <li key={b} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-tangerine" strokeWidth={3} />{b}</li>)}
                </ul>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="card p-6 md:p-8">
          <legend className="sr-only">Your details</legend>
          <h2 className="headline text-3xl md:text-4xl">2. Your details</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field id="j-name" label="Full name" error={errors.name} required>
              <input {...aria("j-name", errors.name)} className="input" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
            </Field>
            <Field id="j-email" label="Email" error={errors.email} required>
              <input {...aria("j-email", errors.email)} type="email" className="input" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
            </Field>
            <Field id="j-phone" label="WhatsApp number (optional)" error={errors.phone} hint="For the members' community.">
              <input {...aria("j-phone", errors.phone)} type="tel" className="input" autoComplete="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
            </Field>
            <Field id="j-age" label="Age group" error={errors.age} required>
              <select {...aria("j-age", errors.age)} className="input" value={f.age} onChange={(e) => setF({ ...f, age: e.target.value })}>
                <option value="">Select</option>
                {["Under 18", "18–24", "25–34", "35–49", "50+"].map((a) => <option key={a}>{a}</option>)}
              </select>
            </Field>
            <Field id="j-chapter" label="Nearest chapter" className="sm:col-span-2">
              <select id="j-chapter" className="input" value={f.chapter} onChange={(e) => setF({ ...f, chapter: e.target.value })}>
                {siteConfig.org.chapters.map((c) => <option key={c.city}>{c.city}</option>)}
                <option>Online / diaspora</option>
              </select>
            </Field>
            <fieldset className="sm:col-span-2">
              <legend className="label">I&apos;d like to get involved in (optional)</legend>
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <button key={i} type="button" className="chip" aria-pressed={f.picked.includes(i)} onClick={() => toggle(i)}>{f.picked.includes(i) && <Check className="size-4" />}{i}</button>
                ))}
              </div>
            </fieldset>
            <div className="sm:col-span-2">
              <label className="check">
                <input id="j-code" type="checkbox" checked={f.code} onChange={(e) => setF({ ...f, code: e.target.checked })} aria-invalid={errors.code ? true : undefined} aria-describedby={errors.code ? "j-code-error" : undefined} />
                <span>I agree to the members&apos; code of conduct: respect, non-violence, confidentiality and zero tolerance for harassment.</span>
              </label>
              {errors.code && <p id="j-code-error" className="error-text" role="alert">{errors.code}</p>}
            </div>
          </div>
        </fieldset>
      </div>

      <aside className="lg:sticky lg:top-28" aria-label="Membership summary">
        <div className="card overflow-hidden">
          <div className="bg-magenta-strong p-6 text-white on-dark">
            <p className="eyebrow text-white">Your membership</p>
            <p className="headline mt-3 text-4xl">{t.name}</p>
            <p className="poster mt-2 text-5xl sm:text-6xl">{formatNaira(t.price)}</p>
            <p className="mt-1 font-semibold">per year · renews annually</p>
          </div>
          <ul className="space-y-2 p-6 text-sm">
            {t.benefits.map((b) => <li key={b} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-magenta-strong" strokeWidth={3} />{b}</li>)}
          </ul>
          <div className="px-6 pb-6">
            <button type="submit" className="btn btn-lg btn-plum w-full">Continue to payment <ArrowRight className="size-5" /></button>
            <p className="mt-3 text-xs opacity-75">You&apos;ll pay dues securely on the next step by card, transfer or USSD. Cancel anytime.</p>
          </div>
        </div>
      </aside>
    </form>
  );
}
