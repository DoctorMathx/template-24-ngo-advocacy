"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Building2, Cake, Check, Church, Flower2, Footprints, PartyPopper, Sparkles } from "lucide-react";
import type { FundraiserType } from "@/lib/types";
import { cn, formatNaira, img, isEmail, isPhone, parseAmount } from "@/lib/utils";
import { photos } from "@/mock/images";
import { fundraiserTypes } from "@/mock/fundraisers";
import { designations, designationLabel } from "@/mock/navigation";
import { Field, aria } from "@/components/forms/field";
import { ProgressBar } from "@/components/ui/progress";
import { ShareButtons } from "@/components/ui/share-buttons";

const icons = { birthday: Cake, marathon: Footprints, faith: Church, office: Building2, memorial: Flower2, challenge: Sparkles } as const;
const covers = [
  { id: "celebrate", src: img(photos.womanLaughing, 600), alt: "Woman laughing" },
  { id: "run", src: img(photos.marathon, 600), alt: "Marathon runners" },
  { id: "together", src: img(photos.handsCircle, 600), alt: "Hands joined in a circle" },
  { id: "power", src: img(photos.protestFists, 600), alt: "Raised fists" },
  { id: "team", src: img(photos.officeTeam, 600), alt: "Office team" },
  { id: "girls", src: img(photos.classroom, 600), alt: "Girls in a classroom" },
];
const goals = [250_000, 500_000, 1_000_000, 2_000_000];
const steps = ["Occasion", "Cause & goal", "Your story", "About you", "Review"];
const causeOptions = designations.filter((d) => ["General", "Programmes", "Campaigns", "Funds"].includes(d.group));

type Data = {
  type: FundraiserType | "";
  title: string;
  designation: string;
  goalPreset: number | null;
  goalCustom: string;
  endDate: string;
  story: string;
  cover: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  team: string;
  terms: boolean;
};

export function StartFundraiserForm() {
  const sp = useSearchParams();
  const pre = sp.get("designation");
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [d, setD] = useState<Data>({
    type: "",
    title: "",
    designation: pre && causeOptions.some((c) => c.value === pre) ? pre : "general",
    goalPreset: 500_000,
    goalCustom: "",
    endDate: "",
    story: "",
    cover: covers[0].id,
    name: "",
    email: "",
    phone: "",
    city: "",
    team: "",
    terms: false,
  });
  const set = <K extends keyof Data>(k: K, v: Data[K]) => setD((x) => ({ ...x, [k]: v }));
  const goal = d.goalPreset ?? parseAmount(d.goalCustom);
  const cover = covers.find((c) => c.id === d.cover) ?? covers[0];
  const slug = (d.title || "my-fundraiser").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 48);

  function validate(s: number) {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!d.type) e.type = "Pick the kind of fundraiser.";
      if (d.title.trim().length < 6) e.title = "Give your page a title (at least 6 characters).";
    }
    if (s === 1) {
      if (d.goalPreset === null && (!/^\d+$/.test(d.goalCustom.trim()) || parseAmount(d.goalCustom) < 10_000)) e.goal = "Enter a whole-naira goal of at least ₦10,000.";
      if (!d.endDate) e.endDate = "Choose an end date.";
      else if (new Date(d.endDate) <= new Date()) e.endDate = "End date must be in the future.";
    }
    if (s === 2 && d.story.trim().length < 60) e.story = `Tell people why this matters to you — at least 60 characters (${d.story.trim().length}/60).`;
    if (s === 3) {
      if (d.name.trim().length < 2) e.name = "Enter your name.";
      if (!isEmail(d.email)) e.email = "Enter a valid email.";
      if (d.phone && !isPhone(d.phone)) e.phone = "Enter a valid phone number.";
      if (!d.city.trim()) e.city = "Enter your city.";
      if (!d.terms) e.terms = "Please accept the fundraiser terms.";
    }
    return e;
  }

  function next() {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`sf-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    if (step === steps.length - 1) {
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setStep(step + 1);
    document.getElementById("sf-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (done) {
    return (
      <div className="grid gap-10 lg:grid-cols-[1fr_400px]" role="status" aria-live="polite">
        <div>
          <PartyPopper className="size-12 text-magenta-strong" />
          <h2 className="poster mt-4 text-6xl md:text-7xl">You&apos;re live, {d.name.split(" ")[0]}!</h2>
          <p className="lede mt-5">Your page is ready to share. Fundraisers who share in the first hour raise 3× more — start with your family WhatsApp group.</p>
          <div className="mt-6 rounded-2xl border-[3px] border-plum bg-paper p-4 font-mono text-sm break-all">hervoice.ng/fundraisers/{slug}</div>
          <ShareButtons className="mt-5" path={`/fundraisers/${slug}`} text={`I'm raising ${formatNaira(goal)} for HerVoice Collective — ${d.title}. Please support me!`} />
          <ul className="mt-8 space-y-3">
            {["Donate first — pages with a first gift from the organiser raise 2× more.", "Post an update every week with a photo.", "Thank every supporter personally."].map((t) => (
              <li key={t} className="flex items-start gap-3"><Check className="mt-0.5 size-5 shrink-0 text-magenta-strong" strokeWidth={3} /> {t}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/donate?designation=${encodeURIComponent(d.designation)}&amount=10000`} className="btn btn-magenta">Make the first gift</Link>
            <Link href="/fundraisers" className="btn btn-outline">Browse other pages</Link>
          </div>
          <p className="mt-6 text-sm opacity-70">Demo: in production this would create the page and email you a dashboard link.</p>
        </div>
        <PreviewCard d={d} goal={goal} cover={cover} />
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start" id="sf-top">
      <div>
        <ol className="mb-8 flex flex-wrap gap-2" aria-label="Progress">
          {steps.map((s, i) => (
            <li key={s} aria-current={i === step ? "step" : undefined} className={cn("inline-flex items-center gap-2 rounded-full border-[2.5px] border-plum px-3 py-1.5 text-sm font-bold", i === step ? "bg-plum text-cream" : i < step ? "bg-tangerine" : "bg-paper opacity-70")}>
              <span className="grid size-6 place-items-center rounded-full bg-cream text-xs text-plum">{i < step ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}</span>
              {s}
            </li>
          ))}
        </ol>

        <div className="card p-6 md:p-8">
          <h2 className="headline text-3xl md:text-4xl">{["What are you fundraising for?", "Choose a cause and a goal", "Tell your story", "About you", "Check it over"][step]}</h2>

          {step === 0 && (
            <div className="mt-6 space-y-6">
              <fieldset>
                <legend className="label">Type of fundraiser</legend>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="radiogroup" aria-describedby={errors.type ? "sf-type-error" : undefined}>
                  {fundraiserTypes.map((t, i) => {
                    const I = icons[t.id];
                    return (
                      <button
                        key={t.id}
                        id={i === 0 ? "sf-type" : undefined}
                        type="button"
                        role="radio"
                        aria-checked={d.type === t.id}
                        onClick={() => set("type", t.id)}
                        className={cn("rounded-2xl border-[3px] border-plum p-4 text-left transition-colors", d.type === t.id ? "bg-magenta-strong text-white" : "bg-paper hover:bg-blush")}
                      >
                        <I className="size-6" />
                        <span className="mt-2 block font-display text-lg font-extrabold">{t.label}</span>
                        <span className="block text-sm opacity-85">{t.blurb}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.type && <p id="sf-type-error" className="error-text" role="alert">{errors.type}</p>}
              </fieldset>
              <Field id="sf-title" label="Page title" error={errors.title} hint="e.g. “Tobi's 30th: 30 beds for 30 years”" required>
                <input {...aria("sf-title", errors.title)} className="input" maxLength={80} value={d.title} onChange={(e) => set("title", e.target.value)} />
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="mt-6 space-y-6">
              <Field id="sf-designation" label="What will you raise money for?">
                <select id="sf-designation" className="input" value={d.designation} onChange={(e) => set("designation", e.target.value)}>
                  {causeOptions.map((c) => <option key={c.value} value={c.value}>{c.group === "General" ? c.label : `${c.group.replace(/s$/, "")}: ${c.label}`}</option>)}
                </select>
              </Field>
              <fieldset>
                <legend className="label">Fundraising goal</legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup">
                  {goals.map((g, i) => (
                    <button key={g} id={i === 0 ? "sf-goal" : undefined} type="button" role="radio" aria-checked={d.goalPreset === g} onClick={() => { set("goalPreset", g); set("goalCustom", ""); }} className={cn("min-h-[52px] rounded-2xl border-[3px] border-plum font-display text-lg font-extrabold", d.goalPreset === g ? "bg-plum text-cream" : "bg-paper hover:bg-blush")}>
                      {formatNaira(g)}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <label htmlFor="sf-goal-custom" className="sr-only">Custom goal</label>
                  <input id="sf-goal-custom" inputMode="numeric" className="input" placeholder="Or type a custom goal, e.g. 750000" aria-invalid={errors.goal ? true : undefined} aria-describedby={errors.goal ? "sf-goal-error" : undefined} value={d.goalCustom} onChange={(e) => { set("goalPreset", null); set("goalCustom", e.target.value.replace(/\D/g, "")); }} />
                </div>
                {errors.goal && <p id="sf-goal-error" className="error-text" role="alert">{errors.goal}</p>}
              </fieldset>
              <Field id="sf-endDate" label="End date" error={errors.endDate} hint="Most pages run 2–6 weeks." required>
                <input {...aria("sf-endDate", errors.endDate)} type="date" className="input" value={d.endDate} onChange={(e) => set("endDate", e.target.value)} />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="mt-6 space-y-6">
              <Field id="sf-story" label="Why are you doing this?" error={errors.story} hint="Personal beats perfect. Who are you doing it for? What will the money do?" required>
                <textarea {...aria("sf-story", errors.story)} className="input min-h-[180px]" maxLength={1500} value={d.story} onChange={(e) => set("story", e.target.value)} />
              </Field>
              <fieldset>
                <legend className="label">Cover photo</legend>
                <div className="grid grid-cols-3 gap-3" role="radiogroup">
                  {covers.map((c) => (
                    <button key={c.id} type="button" role="radio" aria-checked={d.cover === c.id} aria-label={c.alt} onClick={() => set("cover", c.id)} className={cn("relative aspect-[4/3] overflow-hidden rounded-2xl border-[3px]", d.cover === c.id ? "border-magenta-strong ring-4 ring-magenta/40" : "border-plum")}>
                      <Image src={c.src} alt="" fill sizes="160px" className="object-cover" />
                      {d.cover === c.id && <span className="absolute right-1.5 top-1.5 grid size-7 place-items-center rounded-full bg-magenta-strong text-white"><Check className="size-4" strokeWidth={3} /></span>}
                    </button>
                  ))}
                </div>
                <p className="hint">You can upload your own photo after publishing.</p>
              </fieldset>
            </div>
          )}

          {step === 3 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field id="sf-name" label="Your name" error={errors.name} required>
                <input {...aria("sf-name", errors.name)} className="input" autoComplete="name" value={d.name} onChange={(e) => set("name", e.target.value)} />
              </Field>
              <Field id="sf-email" label="Email" error={errors.email} required>
                <input {...aria("sf-email", errors.email)} type="email" className="input" autoComplete="email" value={d.email} onChange={(e) => set("email", e.target.value)} />
              </Field>
              <Field id="sf-phone" label="WhatsApp number (optional)" error={errors.phone}>
                <input {...aria("sf-phone", errors.phone)} type="tel" className="input" autoComplete="tel" value={d.phone} onChange={(e) => set("phone", e.target.value)} />
              </Field>
              <Field id="sf-city" label="City" error={errors.city} required>
                <input {...aria("sf-city", errors.city)} className="input" autoComplete="address-level2" value={d.city} onChange={(e) => set("city", e.target.value)} />
              </Field>
              <Field id="sf-team" label="Team, church, mosque or company (optional)" className="sm:col-span-2">
                <input id="sf-team" className="input" value={d.team} onChange={(e) => set("team", e.target.value)} />
              </Field>
              <div className="sm:col-span-2">
                <label className="check">
                  <input id="sf-terms" type="checkbox" checked={d.terms} onChange={(e) => set("terms", e.target.checked)} aria-invalid={errors.terms ? true : undefined} aria-describedby={errors.terms ? "sf-terms-error" : undefined} />
                  <span>I understand donations go directly to HerVoice Collective, I won&apos;t collect cash on its behalf, and I&apos;ll follow the fundraiser guidelines.</span>
                </label>
                {errors.terms && <p id="sf-terms-error" className="error-text" role="alert">{errors.terms}</p>}
              </div>
            </div>
          )}

          {step === 4 && (
            <dl className="mt-6 grid gap-3 text-[0.98rem]">
              {[
                ["Type", fundraiserTypes.find((t) => t.id === d.type)?.label ?? "—"],
                ["Title", d.title],
                ["Raising for", designationLabel(d.designation)],
                ["Goal", formatNaira(goal)],
                ["Ends", d.endDate ? new Date(d.endDate).toLocaleDateString("en-NG", { dateStyle: "long" }) : "—"],
                ["Organiser", `${d.name} · ${d.city}`],
                ["Team", d.team || "—"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b-2 border-plum/10 pb-2">
                  <dt className="opacity-75">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
              <div>
                <dt className="opacity-75">Story</dt>
                <dd className="mt-1 whitespace-pre-line">{d.story}</dd>
              </div>
            </dl>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t-[3px] border-plum pt-6">
            <button type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="btn btn-outline">
              <ArrowLeft className="size-4" /> Back
            </button>
            <button type="button" onClick={next} className="btn btn-magenta">
              {step === steps.length - 1 ? "Publish my page" : "Continue"} <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-28">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-magenta-ink">Live preview</p>
        <PreviewCard d={d} goal={goal} cover={cover} />
      </div>
    </div>
  );
}

function PreviewCard({ d, goal, cover }: { d: Data; goal: number; cover: (typeof covers)[number] }) {
  const initials = d.name.trim().split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase() || "YOU";
  return (
    <div className="card overflow-hidden" aria-label="Preview of your fundraiser page">
      <div className="relative aspect-[16/10] border-b-[3px] border-plum">
        <Image src={cover.src} alt="" fill sizes="380px" className="object-cover" />
        {d.type && <span className="sticker absolute left-4 top-4 bg-tangerine">{fundraiserTypes.find((t) => t.id === d.type)?.label}</span>}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full border-[2.5px] border-plum bg-blush font-display text-sm font-extrabold">{initials}</span>
          <span className="text-sm font-bold">{d.name || "Your name"}{d.city && <span className="font-normal opacity-70"> · {d.city}</span>}</span>
        </div>
        <p className="headline mt-4 text-2xl">{d.title || "Your fundraiser title"}</p>
        <p className="mt-1 text-sm opacity-80">For: {designationLabel(d.designation)}</p>
        <div className="mt-5"><ProgressBar value={0} goal={goal || 1} /></div>
        <p className="mt-2 text-sm"><strong>₦0</strong> of {goal ? formatNaira(goal) : "your goal"}</p>
      </div>
    </div>
  );
}
