"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { isEmail, isPhone, makeRef } from "@/lib/utils";
import { nigerianStates } from "@/mock/petitions";
import { Field, FormSuccess, aria } from "@/components/forms/field";

const issues = ["Domestic / intimate partner violence", "Rape or sexual assault", "Child abuse", "Sexual harassment (work / school)", "Inheritance or widowhood rights", "Divorce, custody or maintenance", "Online abuse", "Something else"];
const channels = ["Phone call", "WhatsApp message", "SMS", "Email", "In person at a chapter office"];

export function LegalAidForm() {
  const [f, setF] = useState({ name: "", channel: "Phone call", contact: "", safeTime: "", voicemail: "no", state: "", issue: "", details: "", forSelf: "self", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ref, setRef] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.contact.trim()) er.contact = "Tell us how to reach you safely.";
    else if (f.channel === "Email" && !isEmail(f.contact)) er.contact = "Enter a valid email address.";
    else if (["Phone call", "WhatsApp message", "SMS"].includes(f.channel) && !isPhone(f.contact)) er.contact = "Enter a valid phone number.";
    if (!f.state) er.state = "Choose your state so we can match a nearby lawyer.";
    if (!f.issue) er.issue = "Choose the closest option — you can explain more later.";
    if (!f.consent) er.consent = "We need your consent to contact you.";
    setErrors(er);
    if (Object.keys(er).length) return document.getElementById(`la-${Object.keys(er)[0]}`)?.focus();
    setRef(makeRef("LA"));
  }

  if (ref)
    return (
      <FormSuccess title="We've got your request." icon={<ShieldCheck className="size-10 text-magenta-strong" />}>
        <p>A HerVoice legal officer will contact you by <strong>{f.channel.toLowerCase()}</strong>{f.safeTime && <> around <strong>{f.safeTime}</strong></>} within one working day. We will {f.voicemail === "yes" ? "" : "not "}leave messages.</p>
        <p>Your confidential reference is <strong className="font-display text-lg">{ref}</strong>. You don&apos;t need to write it down — we can find your request with your contact details.</p>
        <p className="rounded-2xl bg-blush p-4 text-sm">If you are in danger right now, call <strong>{siteConfig.help.emergency}</strong> or our 24/7 helpline <strong>{siteConfig.help.helpline}</strong>.</p>
      </FormSuccess>
    );

  return (
    <form onSubmit={submit} noValidate className="card grid gap-4 p-6 sm:grid-cols-2 md:p-8">
      <div className="sm:col-span-2 rounded-2xl border-[2.5px] border-plum bg-tangerine-soft p-4 text-sm">
        <strong>Your safety first:</strong> only give contact details that are safe for us to use. You can stay anonymous. This form is confidential and is only seen by our legal team.
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="label">This request is for</legend>
        <div className="flex flex-wrap gap-2">
          {[["self", "Me"], ["other", "Someone I'm helping"]].map(([v, l]) => (
            <label key={v} className="chip cursor-pointer">
              <input type="radio" name="forSelf" value={v} checked={f.forSelf === v} onChange={() => setF({ ...f, forSelf: v })} className="sr-only" />
              {l}
            </label>
          ))}
        </div>
      </fieldset>
      <Field id="la-name" label="First name or nickname (optional)">
        <input id="la-name" className="input" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      </Field>
      <Field id="la-channel" label="Safest way to reach you">
        <select id="la-channel" className="input" value={f.channel} onChange={(e) => setF({ ...f, channel: e.target.value })}>
          {channels.map((c) => <option key={c}>{c}</option>)}
        </select>
      </Field>
      <Field id="la-contact" label={f.channel === "Email" ? "Safe email" : f.channel.startsWith("In person") ? "Phone to confirm the appointment" : "Safe phone number"} error={errors.contact} required>
        <input {...aria("la-contact", errors.contact)} className="input" type={f.channel === "Email" ? "email" : "tel"} value={f.contact} onChange={(e) => setF({ ...f, contact: e.target.value })} />
      </Field>
      <Field id="la-safeTime" label="Safe time to contact (optional)" hint="e.g. weekdays 10am–2pm">
        <input id="la-safeTime" className="input" value={f.safeTime} onChange={(e) => setF({ ...f, safeTime: e.target.value })} />
      </Field>
      <fieldset className="sm:col-span-2">
        <legend className="label">Is it safe for us to leave a voicemail or message?</legend>
        <div className="flex flex-wrap gap-2">
          {[["no", "No — don't leave messages"], ["yes", "Yes, that's fine"]].map(([v, l]) => (
            <label key={v} className="chip cursor-pointer">
              <input type="radio" name="voicemail" value={v} checked={f.voicemail === v} onChange={() => setF({ ...f, voicemail: v })} className="sr-only" />
              {l}
            </label>
          ))}
        </div>
      </fieldset>
      <Field id="la-state" label="State" error={errors.state} required>
        <select {...aria("la-state", errors.state)} className="input" value={f.state} onChange={(e) => setF({ ...f, state: e.target.value })}>
          <option value="">Select</option>
          {nigerianStates.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
      <Field id="la-issue" label="What do you need help with?" error={errors.issue} required>
        <select {...aria("la-issue", errors.issue)} className="input" value={f.issue} onChange={(e) => setF({ ...f, issue: e.target.value })}>
          <option value="">Select</option>
          {issues.map((i) => <option key={i}>{i}</option>)}
        </select>
      </Field>
      <Field id="la-details" label="Anything you'd like us to know (optional)" hint="Share only what you're comfortable with. You can tell us more when we talk." className="sm:col-span-2">
        <textarea id="la-details" className="input" maxLength={1200} value={f.details} onChange={(e) => setF({ ...f, details: e.target.value })} />
      </Field>
      <div className="sm:col-span-2">
        <label className="check">
          <input id="la-consent" type="checkbox" checked={f.consent} onChange={(e) => setF({ ...f, consent: e.target.checked })} aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? "la-consent-error" : undefined} />
          <span>I consent to HerVoice storing this information securely and contacting me about legal support. I can withdraw consent anytime.</span>
        </label>
        {errors.consent && <p id="la-consent-error" className="error-text" role="alert">{errors.consent}</p>}
      </div>
      <button type="submit" className="btn btn-lg btn-magenta sm:col-span-2 sm:justify-self-start">Send confidential request</button>
    </form>
  );
}
