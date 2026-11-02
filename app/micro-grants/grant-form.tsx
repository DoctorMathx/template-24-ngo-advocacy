"use client";

import { useState } from "react";
import { Sprout } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { formatNaira, isEmail, isPhone, makeRef } from "@/lib/utils";
import { microGrantFund } from "@/mock/organisation";
import { nigerianStates } from "@/mock/petitions";
import { Field, FormSuccess, aria } from "@/components/forms/field";

const situations = ["Survivor of violence", "Widow", "Single mother", "Household income below ₦100,000/month", "Living with a disability", "Other"];

export function GrantForm() {
  const [f, setF] = useState({ name: "", phone: "", email: "", state: "", age: "", situation: [] as string[], business: "", stage: "", size: String(microGrantFund.sizes[1].amount), use: "", referral: "", coaching: false, truthful: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ref, setRef] = useState("");

  const toggle = (s: string) => setF((x) => ({ ...x, situation: x.situation.includes(s) ? x.situation.filter((y) => y !== s) : [...x.situation, s] }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = "Enter your full name.";
    if (!isPhone(f.phone)) er.phone = "Enter a phone number we can call.";
    if (f.email && !isEmail(f.email)) er.email = "Enter a valid email or leave blank.";
    if (!f.state) er.state = "Choose your state.";
    const age = Number(f.age);
    if (!f.age || !Number.isInteger(age) || age < 18 || age > 100) er.age = "You must be 18 or older.";
    if (!f.situation.length) er.situation = "Choose at least one that applies.";
    if (f.business.trim().length < 3) er.business = "Tell us the trade or business.";
    if (!f.stage) er.stage = "Choose one.";
    if (f.use.trim().length < 30) er.use = "Tell us how you'd use the grant (at least 30 characters).";
    if (!f.coaching) er.coaching = "Coaching sessions are part of the grant.";
    if (!f.truthful) er.truthful = "Please confirm.";
    setErrors(er);
    if (Object.keys(er).length) return document.getElementById(`g-${Object.keys(er)[0]}`)?.focus();
    setRef(makeRef("MG"));
  }

  if (ref)
    return (
      <FormSuccess title="Application received!" icon={<Sprout className="size-10 text-magenta-strong" />}>
        <p>Thank you, {f.name.split(" ")[0]}. A grants officer will call <strong>{f.phone}</strong> within 10 working days to arrange a 20-minute chat. No business plan needed.</p>
        <p>Your application reference: <strong className="font-display text-lg">{ref}</strong></p>
        <p className="text-sm opacity-80">HerVoice never charges a fee to apply or to receive a grant. If anyone asks you for money, report it to {siteConfig.help.helpline}.</p>
      </FormSuccess>
    );

  return (
    <form onSubmit={submit} noValidate className="card grid gap-4 p-6 sm:grid-cols-2 md:p-8">
      <Field id="g-name" label="Full name" error={errors.name} required>
        <input {...aria("g-name", errors.name)} className="input" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      </Field>
      <Field id="g-phone" label="Phone / WhatsApp" error={errors.phone} required>
        <input {...aria("g-phone", errors.phone)} type="tel" className="input" autoComplete="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
      </Field>
      <Field id="g-email" label="Email (optional)" error={errors.email}>
        <input {...aria("g-email", errors.email)} type="email" className="input" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field id="g-state" label="State" error={errors.state} required>
          <select {...aria("g-state", errors.state)} className="input" value={f.state} onChange={(e) => setF({ ...f, state: e.target.value })}>
            <option value="">Select</option>
            {nigerianStates.filter((s) => s !== "Outside Nigeria").map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field id="g-age" label="Age" error={errors.age} required>
          <input {...aria("g-age", errors.age)} inputMode="numeric" className="input" value={f.age} onChange={(e) => setF({ ...f, age: e.target.value.replace(/\D/g, "").slice(0, 3) })} />
        </Field>
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="label">Which apply to you? <span className="text-magenta-ink" aria-hidden="true">*</span></legend>
        <div className="flex flex-wrap gap-2" aria-describedby={errors.situation ? "g-situation-error" : undefined}>
          {situations.map((s, i) => (
            <button key={s} id={i === 0 ? "g-situation" : undefined} type="button" className="chip" aria-pressed={f.situation.includes(s)} onClick={() => toggle(s)}>{s}</button>
          ))}
        </div>
        {errors.situation && <p id="g-situation-error" className="error-text" role="alert">{errors.situation}</p>}
      </fieldset>
      <Field id="g-business" label="Trade or business" error={errors.business} hint="e.g. tailoring, food vending, hair salon, poultry" required>
        <input {...aria("g-business", errors.business)} className="input" value={f.business} onChange={(e) => setF({ ...f, business: e.target.value })} />
      </Field>
      <Field id="g-stage" label="Stage" error={errors.stage} required>
        <select {...aria("g-stage", errors.stage)} className="input" value={f.stage} onChange={(e) => setF({ ...f, stage: e.target.value })}>
          <option value="">Select</option>
          <option>Idea — not started yet</option>
          <option>Stopped — want to restart</option>
          <option>Running — under 1 year</option>
          <option>Running — over 1 year</option>
        </select>
      </Field>
      <fieldset className="sm:col-span-2">
        <legend className="label">Grant size you&apos;re applying for</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {microGrantFund.sizes.map((s) => (
            <label key={s.amount} className="chip h-auto cursor-pointer flex-col items-start rounded-2xl py-3">
              <input type="radio" name="size" value={s.amount} checked={f.size === String(s.amount)} onChange={() => setF({ ...f, size: String(s.amount) })} className="sr-only" />
              <span className="font-display text-xl font-extrabold">{formatNaira(s.amount)}</span>
              <span className="text-xs">{s.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <Field id="g-use" label="How would you use the grant?" error={errors.use} required className="sm:col-span-2">
        <textarea {...aria("g-use", errors.use)} className="input" maxLength={800} value={f.use} onChange={(e) => setF({ ...f, use: e.target.value })} />
      </Field>
      <Field id="g-referral" label="Referred by a HerVoice counsellor, lawyer or partner? (optional)" className="sm:col-span-2">
        <input id="g-referral" className="input" placeholder="Name or reference code" value={f.referral} onChange={(e) => setF({ ...f, referral: e.target.value })} />
      </Field>
      <div className="sm:col-span-2 space-y-2">
        <label className="check">
          <input id="g-coaching" type="checkbox" checked={f.coaching} onChange={(e) => setF({ ...f, coaching: e.target.checked })} aria-invalid={errors.coaching ? true : undefined} />
          <span>I can join 6 short coaching sessions (in person or on WhatsApp).</span>
        </label>
        {errors.coaching && <p className="error-text" role="alert">{errors.coaching}</p>}
        <label className="check">
          <input id="g-truthful" type="checkbox" checked={f.truthful} onChange={(e) => setF({ ...f, truthful: e.target.checked })} aria-invalid={errors.truthful ? true : undefined} />
          <span>The information I&apos;ve given is true. I understand applying is free and grants are not loans.</span>
        </label>
        {errors.truthful && <p className="error-text" role="alert">{errors.truthful}</p>}
      </div>
      <button type="submit" className="btn btn-lg btn-magenta sm:col-span-2 sm:justify-self-start">Submit application</button>
    </form>
  );
}
