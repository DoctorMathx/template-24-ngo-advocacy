import type { Metadata } from "next";
import Link from "next/link";
import { CalendarHeart, HandHeart, PenLine, Users } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { formatNaira, parseAmount } from "@/lib/utils";
import { designationLabel } from "@/mock/navigation";
import { ShareButtons } from "@/components/ui/share-buttons";
import { RoundSticker } from "@/components/ui/sticker";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your donation receipt.",
  robots: { index: false, follow: false },
};

type SP = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

const freqText: Record<string, string> = { "one-time": "One-time", monthly: "Monthly", annual: "Annual" };
const methodText: Record<string, string> = { card: "Card", transfer: "Bank transfer", ussd: "USSD" };

export default async function ThankYouPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const ref = one(sp.ref).replace(/[^A-Z0-9-]/gi, "").slice(0, 24);
  const amount = parseAmount(one(sp.amount));
  const fee = parseAmount(one(sp.fee));
  const total = parseAmount(one(sp.total)) || amount + fee;
  const frequency = freqText[one(sp.frequency)] ? one(sp.frequency) : "one-time";
  const designation = designationLabel(one(sp.designation));
  const method = methodText[one(sp.method)] ?? "Card";
  const name = one(sp.name).slice(0, 80) || "Friend";
  const first = one(sp.first).slice(0, 40);
  const email = one(sp.email).slice(0, 120);
  const tribute = one(sp.tribute);
  const tributeName = one(sp.tributeName).slice(0, 80);
  const dateRaw = one(sp.date);
  const date = !Number.isNaN(Date.parse(dateRaw)) ? new Date(dateRaw) : new Date();
  const pending = one(sp.method) === "transfer" || one(sp.method) === "ussd";

  if (!ref || amount <= 0) {
    return (
      <section className="bg-cream bg-dots border-b-[3px] border-plum">
        <div className="container-x py-24">
          <p className="eyebrow mb-4">Receipt</p>
          <h1 className="poster text-6xl md:text-8xl">No gift found.</h1>
          <p className="lede mt-6 max-w-xl">This receipt link is missing its details. If you&apos;ve just given, check your email for your receipt — or start a new donation.</p>
          <div className="mt-8 flex gap-3"><Link href="/donate" className="btn btn-magenta">Donate</Link><Link href="/contact" className="btn btn-outline">Contact us</Link></div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-plum bg-plum text-cream on-dark bg-dots-light">
        <div className="container-x relative py-16 md:py-24">
          <RoundSticker tone="tangerine" size={140} className="wobble absolute right-6 top-10 hidden md:grid">You&apos;re<br />one of<br />us now</RoundSticker>
          <p className="eyebrow mb-5">{pending ? "Gift pledged" : "Gift received"}</p>
          <h1 className="poster text-[3.6rem] sm:text-8xl lg:text-[8.5rem]">Thank you,<br /><span className="text-tangerine">{first || name.split(" ")[0]}.</span></h1>
          <p className="mt-7 max-w-2xl text-lg text-cream/85">
            {pending
              ? "We'll confirm by email as soon as your transfer lands (usually within minutes). Your reference is below."
              : `Your ${freqText[frequency].toLowerCase()} gift of ${formatNaira(total)} is already at work. A receipt is on its way${email ? ` to ${email}` : ""}.`}
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="card relative overflow-hidden" aria-label="Donation receipt">
            <div className="flex items-center justify-between border-b-[3px] border-dashed border-plum bg-tangerine p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest">Official receipt</p>
                <p className="headline text-2xl">{siteConfig.brand.name}</p>
              </div>
              <PrintButton />
            </div>
            <dl className="grid gap-3 p-6 text-[0.98rem]">
              <Row label="Reference" value={ref} strong />
              <Row label="Date" value={date.toLocaleString("en-NG", { dateStyle: "long", timeStyle: "short" })} />
              <Row label="Donor" value={name} />
              <Row label="Donation" value={formatNaira(amount)} />
              <Row label="Processing fee covered" value={formatNaira(fee)} />
              <Row label="Frequency" value={freqText[frequency]} />
              <Row label="Designation" value={designation} />
              {tribute && tributeName && <Row label={`In ${tribute === "memory" ? "memory" : "honour"} of`} value={tributeName} />}
              <Row label="Payment method" value={`${method}${pending ? " (awaiting confirmation)" : ""}`} />
              <div className="mt-2 flex flex-wrap items-end justify-between gap-x-3 border-t-[3px] border-plum pt-4">
                <dt className="font-display text-xl font-extrabold">Total</dt>
                <dd className="poster text-5xl">{formatNaira(total)}</dd>
              </div>
            </dl>
            <p className="border-t-2 border-plum/15 bg-paper p-6 text-sm leading-relaxed opacity-85">
              {siteConfig.org.legalName}, a registered not-for-profit. {siteConfig.org.taxNote} Keep this reference for refunds or queries within 30 days.
            </p>
          </div>

          <div className="space-y-8">
            <div className="card bg-blush p-6 md:p-8" id="share">
              <h2 className="headline text-3xl">Double your impact: share it.</h2>
              <p className="mt-2">One share brings in an average of ₦4,300 in new gifts. Tell your people why you gave.</p>
              <ShareButtons className="mt-5" path="/donate" text={`I just gave to ${siteConfig.brand.name} to end violence against women in Nigeria. Join me:`} />
            </div>
            <div>
              <h2 className="headline text-3xl">What next?</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: PenLine, label: "Sign the VAPP petition", href: "/petitions/pass-the-vapp-in-every-state" },
                  { icon: HandHeart, label: "Start your own fundraiser", href: "/fundraisers/start" },
                  { icon: Users, label: "Join the collective", href: "/join" },
                  { icon: CalendarHeart, label: "Come to the Gala", href: "/events/gala" },
                ].map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="card card-hover flex min-h-[72px] items-center gap-3 p-4 font-bold">
                      <n.icon className="size-5 shrink-0 text-magenta-ink" /> {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="opacity-75">{label}</dt>
      <dd className={strong ? "font-display text-lg font-extrabold text-magenta-ink" : "text-right font-semibold"}>{value}</dd>
    </div>
  );
}
