"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { isEmail, isPhone } from "@/lib/utils";
import { Field, FormSuccess, aria } from "@/components/forms/field";

const topics = ["General enquiry", "Donations & receipts", "Membership", "Media & press", "Partnerships", "Volunteering", "Safeguarding concern", "Something else"];

export function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", phone: "", topic: "General enquiry", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = "Enter your name.";
    if (!isEmail(f.email)) er.email = "Enter a valid email.";
    if (f.phone && !isPhone(f.phone)) er.phone = "Enter a valid phone number.";
    if (f.message.trim().length < 10) er.message = "Your message is a bit short.";
    setErrors(er);
    if (Object.keys(er).length) return document.getElementById(`c-${Object.keys(er)[0]}`)?.focus();
    setDone(true);
  }

  if (done)
    return (
      <FormSuccess title="Message sent." icon={<Send className="size-10 text-magenta-strong" />}>
        <p>Thanks, {f.name.split(" ")[0]}. We reply within two working days. If you need urgent help, call {siteConfig.help.helpline}.</p>
      </FormSuccess>
    );

  return (
    <form onSubmit={submit} noValidate className="card grid gap-4 p-6 sm:grid-cols-2 md:p-8">
      <Field id="c-name" label="Name" error={errors.name} required>
        <input {...aria("c-name", errors.name)} className="input" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      </Field>
      <Field id="c-email" label="Email" error={errors.email} required>
        <input {...aria("c-email", errors.email)} type="email" className="input" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      </Field>
      <Field id="c-phone" label="Phone (optional)" error={errors.phone}>
        <input {...aria("c-phone", errors.phone)} type="tel" className="input" autoComplete="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
      </Field>
      <Field id="c-topic" label="Topic">
        <select id="c-topic" className="input" value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })}>
          {topics.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      {f.topic === "Safeguarding concern" && (
        <p className="sm:col-span-2 rounded-2xl bg-tangerine-soft p-4 text-sm">Safeguarding reports go straight to our trustee-level safeguarding lead and are handled confidentially.</p>
      )}
      <Field id="c-message" label="Message" error={errors.message} required className="sm:col-span-2">
        <textarea {...aria("c-message", errors.message)} className="input" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
      </Field>
      <button type="submit" className="btn btn-lg btn-magenta sm:col-span-2 sm:justify-self-start">Send message</button>
    </form>
  );
}
