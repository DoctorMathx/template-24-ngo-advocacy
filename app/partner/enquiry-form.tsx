"use client";

import { useState } from "react";
import { Handshake } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { isEmail, isPhone } from "@/lib/utils";
import { Field, FormSuccess, aria } from "@/components/forms/field";

const types = ["Foundation / trust", "Bilateral / multilateral donor", "Corporate CSR", "Employee giving / matched gifts", "Gala sponsorship", "In-kind / pro-bono"];
const budgets = ["Under ₦5m", "₦5m – ₦25m", "₦25m – ₦100m", "Over ₦100m", "Not sure yet"];
const areas = ["End GBV", "Justice & Legal Aid", "Women in Power", "Girls & Economic Power", "Core / unrestricted"];

export function EnquiryForm() {
  const [f, setF] = useState({ org: "", name: "", role: "", email: "", phone: "", type: "", budget: "", areas: [] as string[], message: "", proposal: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const toggle = (a: string) => setF((x) => ({ ...x, areas: x.areas.includes(a) ? x.areas.filter((y) => y !== a) : [...x.areas, a] }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.org.trim().length < 2) er.org = "Enter your organisation's name.";
    if (f.name.trim().length < 2) er.name = "Enter your name.";
    if (!isEmail(f.email)) er.email = "Enter a valid work email.";
    if (f.phone && !isPhone(f.phone)) er.phone = "Enter a valid phone number.";
    if (!f.type) er.type = "Choose a partnership type.";
    if (f.message.trim().length < 20) er.message = "Tell us a little about what you have in mind (20+ characters).";
    setErrors(er);
    if (Object.keys(er).length) return document.getElementById(`p-${Object.keys(er)[0]}`)?.focus();
    setDone(true);
  }

  if (done)
    return (
      <FormSuccess title="Thank you — let's talk." icon={<Handshake className="size-10 text-magenta-strong" />}>
        <p>Our partnerships lead will reply to <strong>{f.email}</strong> within two working days{f.proposal ? " with our latest proposal pack, audited accounts and logframe" : ""}.</p>
        <p className="text-sm opacity-80">Prefer email? Write to {siteConfig.brand.partnershipsEmail}.</p>
      </FormSuccess>
    );

  return (
    <form onSubmit={submit} noValidate className="card grid gap-4 p-6 sm:grid-cols-2 md:p-8">
      <Field id="p-org" label="Organisation" error={errors.org} required>
        <input {...aria("p-org", errors.org)} className="input" autoComplete="organization" value={f.org} onChange={(e) => setF({ ...f, org: e.target.value })} />
      </Field>
      <Field id="p-name" label="Your name" error={errors.name} required>
        <input {...aria("p-name", errors.name)} className="input" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      </Field>
      <Field id="p-role" label="Role (optional)">
        <input id="p-role" className="input" autoComplete="organization-title" value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} />
      </Field>
      <Field id="p-email" label="Work email" error={errors.email} required>
        <input {...aria("p-email", errors.email)} type="email" className="input" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      </Field>
      <Field id="p-phone" label="Phone (optional)" error={errors.phone}>
        <input {...aria("p-phone", errors.phone)} type="tel" className="input" autoComplete="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
      </Field>
      <Field id="p-type" label="Partnership type" error={errors.type} required>
        <select {...aria("p-type", errors.type)} className="input" value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>
          <option value="">Select</option>
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field id="p-budget" label="Indicative budget (optional)" className="sm:col-span-2">
        <select id="p-budget" className="input" value={f.budget} onChange={(e) => setF({ ...f, budget: e.target.value })}>
          <option value="">Select</option>
          {budgets.map((b) => <option key={b}>{b}</option>)}
        </select>
      </Field>
      <fieldset className="sm:col-span-2">
        <legend className="label">Areas of interest</legend>
        <div className="flex flex-wrap gap-2">
          {areas.map((a) => <button key={a} type="button" className="chip" aria-pressed={f.areas.includes(a)} onClick={() => toggle(a)}>{a}</button>)}
        </div>
      </fieldset>
      <Field id="p-message" label="What do you have in mind?" error={errors.message} required className="sm:col-span-2">
        <textarea {...aria("p-message", errors.message)} className="input" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
      </Field>
      <label className="check sm:col-span-2">
        <input type="checkbox" checked={f.proposal} onChange={(e) => setF({ ...f, proposal: e.target.checked })} />
        <span>Send me the proposal pack (capability statement, audited accounts, safeguarding policy, logframe).</span>
      </label>
      <button type="submit" className="btn btn-lg btn-plum sm:col-span-2 sm:justify-self-start">Send enquiry</button>
    </form>
  );
}
