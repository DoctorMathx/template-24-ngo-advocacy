"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Heart, PartyPopper, PenLine } from "lucide-react";
import { formatNaira, isEmail } from "@/lib/utils";
import { nigerianStates } from "@/mock/petitions";
import { SignatureMeter } from "@/components/ui/progress";
import { ShareButtons } from "@/components/ui/share-buttons";
import { Field, aria } from "@/components/forms/field";

type Props = {
  petition: {
    slug: string;
    title: string;
    shortTitle: string;
    signatures: number;
    goal: number;
    target: string;
    recentSigners: { name: string; state: string; ago: string }[];
  };
};

export function SignForm({ petition }: Props) {
  const [form, setForm] = useState({ name: "", email: "", state: "", optIn: true, showName: true });
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "state", string>>>({});
  const [signed, setSigned] = useState<null | { first: string; state: string }>(null);

  const count = petition.signatures + (signed ? 1 : 0);
  const signers = signed
    ? [{ name: form.showName ? `${signed.first} (you)` : "You", state: signed.state, ago: "just now" }, ...petition.recentSigners]
    : petition.recentSigners;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: typeof errors = {};
    if (form.name.trim().length < 2) er.name = "Enter your name.";
    if (!isEmail(form.email)) er.email = "Enter a valid email address.";
    if (!form.state) er.state = "Choose your state — decision-makers want to know where you vote.";
    setErrors(er);
    if (Object.keys(er).length) {
      document.getElementById(`sign-${Object.keys(er)[0]}`)?.focus();
      return;
    }
    setSigned({ first: form.name.trim().split(" ")[0], state: form.state });
  }

  return (
    <div className="card overflow-hidden">
      <div className="p-6">
        <SignatureMeter signatures={count} goal={petition.goal} />
      </div>

      {signed ? (
        <div className="border-t-[3px] border-plum bg-plum p-6 text-cream on-dark" role="status" aria-live="polite">
          <PartyPopper className="size-9 text-tangerine" />
          <p className="headline mt-3 text-3xl">You signed, {signed.first}!</p>
          <p className="mt-2 text-cream/85">You&apos;re signature #{count.toLocaleString("en-NG")}. Petitions shared on WhatsApp get 4× more signatures — send it to three people now.</p>
          <ShareButtons className="mt-5" dark path={`/petitions/${petition.slug}`} text={`I just signed: "${petition.title}". Add your name 👇`} />
          <div className="mt-6 rounded-2xl border-[3px] border-cream/30 bg-plum-2 p-5">
            <p className="font-display text-xl font-extrabold">Can you chip in to win this?</p>
            <p className="mt-1 text-sm text-cream/80">Delivering signatures, lobbying and legal drafting costs money. Every naira keeps the pressure on.</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[2000, 5000, 10000].map((a) => (
                <Link key={a} href={`/donate?amount=${a}&programme=legal-aid`} className="btn btn-sm btn-cream px-2">{formatNaira(a)}</Link>
              ))}
            </div>
            <Link href="/donate?amount=2000&frequency=monthly" className="btn btn-tangerine mt-3 w-full"><Heart className="size-4 fill-current" /> Give ₦2,000 monthly</Link>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="space-y-4 border-t-[3px] border-plum bg-blush p-6">
          <p className="font-display text-xl font-extrabold">Add your name to tell {petition.target}:</p>
          <Field id="sign-name" label="Full name" error={errors.name} required>
            <input {...aria("sign-name", errors.name)} className="input" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field id="sign-email" label="Email" error={errors.email} required>
            <input {...aria("sign-email", errors.email)} type="email" className="input" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>
          <Field id="sign-state" label="State" error={errors.state} required>
            <select {...aria("sign-state", errors.state)} className="input" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}>
              <option value="">Select your state</option>
              {nigerianStates.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <label className="check">
            <input type="checkbox" checked={form.optIn} onChange={(e) => setForm({ ...form, optIn: e.target.checked })} />
            <span className="text-sm">Keep me updated on this petition and other HerVoice campaigns. Unsubscribe anytime.</span>
          </label>
          <label className="check">
            <input type="checkbox" checked={form.showName} onChange={(e) => setForm({ ...form, showName: e.target.checked })} />
            <span className="text-sm">Show my first name in the recent signers list.</span>
          </label>
          <button type="submit" className="btn btn-lg btn-magenta w-full"><PenLine className="size-5" /> Sign the petition <ArrowRight className="size-5" /></button>
        </form>
      )}

      {signers.length > 0 && (
        <div className="border-t-[3px] border-plum p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-magenta-ink">Recent signatures</p>
          <ul className="mt-3 space-y-2.5 text-sm">
            {signers.slice(0, 5).map((s, i) => (
              <li key={`${s.name}-${i}`} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5">
                  <span className="grid size-8 place-items-center rounded-full border-2 border-plum bg-tangerine-soft text-xs font-extrabold">{s.name.charAt(0)}</span>
                  <span><strong>{s.name}</strong> · {s.state}</span>
                </span>
                <span className="opacity-70">{s.ago}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
