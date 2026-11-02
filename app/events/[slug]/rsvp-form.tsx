"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { isEmail, isPhone } from "@/lib/utils";
import { Field, FormSuccess, aria } from "@/components/forms/field";
import { ShareButtons } from "@/components/ui/share-buttons";

export function RsvpForm({ eventTitle, online }: { eventTitle: string; online?: boolean }) {
  const [f, setF] = useState({ name: "", email: "", phone: "", guests: "1", access: "", reminders: true });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = "Enter your name.";
    if (!isEmail(f.email)) er.email = "Enter a valid email.";
    if (f.phone && !isPhone(f.phone)) er.phone = "Enter a valid phone number.";
    setErrors(er);
    if (Object.keys(er).length) return document.getElementById(`r-${Object.keys(er)[0]}`)?.focus();
    setDone(true);
  }

  if (done)
    return (
      <FormSuccess title={`See you there, ${f.name.split(" ")[0]}!`} icon={<CalendarCheck className="size-10 text-magenta-strong" />}>
        <p>Your {f.guests === "1" ? "place is" : `${f.guests} places are`} reserved for <strong>{eventTitle}</strong>. {online ? "Your joining link is on its way to " : "Confirmation sent to "}<strong>{f.email}</strong>.</p>
        <ShareButtons path="/events" text={`I'm going to ${eventTitle} with HerVoice Collective. Come with me!`} />
      </FormSuccess>
    );

  return (
    <form onSubmit={submit} noValidate className="card grid max-w-3xl gap-4 p-6 sm:grid-cols-2 md:p-8">
      <Field id="r-name" label="Full name" error={errors.name} required>
        <input {...aria("r-name", errors.name)} className="input" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      </Field>
      <Field id="r-email" label="Email" error={errors.email} required>
        <input {...aria("r-email", errors.email)} type="email" className="input" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      </Field>
      <Field id="r-phone" label="Phone (optional)" error={errors.phone}>
        <input {...aria("r-phone", errors.phone)} type="tel" className="input" autoComplete="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
      </Field>
      <Field id="r-guests" label="Number of people">
        <select id="r-guests" className="input" value={f.guests} onChange={(e) => setF({ ...f, guests: e.target.value })}>
          {["1", "2", "3", "4", "5"].map((n) => <option key={n}>{n}</option>)}
        </select>
      </Field>
      <Field id="r-access" label="Accessibility or interpretation needs (optional)" className="sm:col-span-2">
        <textarea id="r-access" className="input" value={f.access} onChange={(e) => setF({ ...f, access: e.target.value })} />
      </Field>
      <label className="check sm:col-span-2">
        <input type="checkbox" checked={f.reminders} onChange={(e) => setF({ ...f, reminders: e.target.checked })} />
        <span>Send me a reminder the day before by email and WhatsApp.</span>
      </label>
      <button type="submit" className="btn btn-lg btn-magenta sm:col-span-2 sm:justify-self-start">Reserve my place — free</button>
    </form>
  );
}
