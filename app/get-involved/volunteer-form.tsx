"use client";

import { useState } from "react";
import { Megaphone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { isEmail, isPhone } from "@/lib/utils";
import { Field, FormSuccess, aria } from "@/components/forms/field";

const roles = ["Campaign & event volunteer", "Pro-bono lawyer", "Counsellor / social worker", "Safe Girls club mentor", "Digital & design", "Translator / interpreter", "Driver / logistics"];
const availability = ["Weekday mornings", "Weekday evenings", "Weekends", "Remote only", "Events only"];

export function VolunteerForm() {
  const [f, setF] = useState({ name: "", email: "", phone: "", chapter: "", roles: [] as string[], times: [] as string[], skills: "", why: "", safeguarding: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const toggle = (k: "roles" | "times", v: string) => setF((x) => ({ ...x, [k]: x[k].includes(v) ? x[k].filter((y) => y !== v) : [...x[k], v] }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = "Enter your full name.";
    if (!isEmail(f.email)) er.email = "Enter a valid email.";
    if (!isPhone(f.phone)) er.phone = "Enter a valid phone number.";
    if (!f.chapter) er.chapter = "Choose a chapter.";
    if (!f.roles.length) er.roles = "Pick at least one role.";
    if (f.why.trim().length < 20) er.why = "Tell us a little more (20+ characters).";
    if (!f.safeguarding) er.safeguarding = "All volunteers must agree to safeguarding checks.";
    setErrors(er);
    if (Object.keys(er).length) return document.getElementById(`v-${Object.keys(er)[0]}`)?.focus();
    setDone(true);
  }

  if (done)
    return (
      <FormSuccess title={`Welcome to the crew, ${f.name.split(" ")[0]}!`} icon={<Megaphone className="size-10 text-magenta-strong" />}>
        <p>Your {f.chapter} chapter coordinator will reach out within 5 working days to set up a short call and our 2-hour induction.</p>
        <p className="text-sm opacity-80">Questions? WhatsApp us on {siteConfig.brand.whatsapp}.</p>
      </FormSuccess>
    );

  return (
    <form onSubmit={submit} noValidate className="card grid gap-4 p-6 sm:grid-cols-2 md:p-8">
      <Field id="v-name" label="Full name" error={errors.name} required>
        <input {...aria("v-name", errors.name)} className="input" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      </Field>
      <Field id="v-email" label="Email" error={errors.email} required>
        <input {...aria("v-email", errors.email)} type="email" className="input" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      </Field>
      <Field id="v-phone" label="Phone / WhatsApp" error={errors.phone} required>
        <input {...aria("v-phone", errors.phone)} type="tel" className="input" autoComplete="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
      </Field>
      <Field id="v-chapter" label="Chapter" error={errors.chapter} required>
        <select {...aria("v-chapter", errors.chapter)} className="input" value={f.chapter} onChange={(e) => setF({ ...f, chapter: e.target.value })}>
          <option value="">Select</option>
          {siteConfig.org.chapters.map((c) => <option key={c.city}>{c.city}</option>)}
          <option>Remote</option>
        </select>
      </Field>
      <fieldset className="sm:col-span-2">
        <legend className="label">Roles you&apos;re interested in <span className="text-magenta-ink" aria-hidden="true">*</span></legend>
        <div className="flex flex-wrap gap-2">
          {roles.map((r, i) => <button key={r} id={i === 0 ? "v-roles" : undefined} type="button" className="chip" aria-pressed={f.roles.includes(r)} onClick={() => toggle("roles", r)}>{r}</button>)}
        </div>
        {errors.roles && <p className="error-text" role="alert">{errors.roles}</p>}
      </fieldset>
      <fieldset className="sm:col-span-2">
        <legend className="label">Availability</legend>
        <div className="flex flex-wrap gap-2">
          {availability.map((a) => <button key={a} type="button" className="chip" aria-pressed={f.times.includes(a)} onClick={() => toggle("times", a)}>{a}</button>)}
        </div>
      </fieldset>
      <Field id="v-skills" label="Skills, languages or qualifications (optional)" className="sm:col-span-2">
        <input id="v-skills" className="input" placeholder="e.g. Called to the Bar 2019, fluent Hausa, Canva" value={f.skills} onChange={(e) => setF({ ...f, skills: e.target.value })} />
      </Field>
      <Field id="v-why" label="Why HerVoice?" error={errors.why} required className="sm:col-span-2">
        <textarea {...aria("v-why", errors.why)} className="input" value={f.why} onChange={(e) => setF({ ...f, why: e.target.value })} />
      </Field>
      <div className="sm:col-span-2">
        <label className="check">
          <input id="v-safeguarding" type="checkbox" checked={f.safeguarding} onChange={(e) => setF({ ...f, safeguarding: e.target.checked })} aria-invalid={errors.safeguarding ? true : undefined} />
          <span>I agree to reference and safeguarding checks and to complete induction training before working with survivors or children.</span>
        </label>
        {errors.safeguarding && <p className="error-text" role="alert">{errors.safeguarding}</p>}
      </div>
      <button type="submit" className="btn btn-lg btn-magenta sm:col-span-2 sm:justify-self-start">Apply to volunteer</button>
    </form>
  );
}
