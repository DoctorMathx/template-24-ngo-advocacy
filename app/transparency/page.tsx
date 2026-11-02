import type { Metadata } from "next";
import { Download, FileText, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn, compactNaira, formatNaira } from "@/lib/utils";
import { board, financials } from "@/mock/organisation";
import { Section, SectionHeader } from "@/components/ui/section";
import { RoundSticker } from "@/components/ui/sticker";

export const metadata: Metadata = {
  title: "Transparency & financials",
  description: "Where HerVoice Collective's money comes from and where it goes: audited accounts, income and expense breakdown, annual reports and governance.",
};

const donutColors: Record<string, string> = {
  magenta: "#D42A72",
  plum: "#3D0C3A",
  tangerine: "#FF8A3D",
  pink: "#FFA6C9",
  muted: "#B79AB4",
  muted2: "#E4D3E1",
};

export default function TransparencyPage() {
  const f = financials;
  const maxIncome = Math.max(...f.income.map((i) => i.value));
  const totalExp = f.expenses.reduce((s, e) => s + e.value, 0);
  const programmeShare = Math.round((f.expenses.slice(0, 4).reduce((s, e) => s + e.value, 0) / totalExp) * 1000) / 10;
  // donut geometry
  const R = 80;
  const C = 2 * Math.PI * R;
  const arcs = f.expenses.map((e, i) => ({
    ...e,
    len: (e.value / totalExp) * C,
    offset: (f.expenses.slice(0, i).reduce((s, x) => s + x.value, 0) / totalExp) * C,
  }));

  return (
    <>
      <section className="relative border-b-[3px] border-plum bg-cream bg-dots">
        <div className="container-x relative py-14 md:py-20">
          <RoundSticker tone="tangerine" size={136} className="absolute right-6 top-10 hidden md:grid">Audited<br />every<br />year</RoundSticker>
          <p className="eyebrow mb-5">Transparency · {f.year}</p>
          <h1 className="poster text-[3.4rem] sm:text-8xl lg:text-[8rem]">Follow<br /><span className="text-magenta-strong">the money.</span></h1>
          <p className="lede mt-7 max-w-2xl">We raised {compactNaira(f.totalIncome)} and spent {compactNaira(f.totalExpenditure)} in {f.year}. {programmeShare}% went directly to programmes. Accounts audited by {f.auditor}.</p>
        </div>
      </section>

      <Section tone="plum" pad="md">
        <h2 className="headline text-4xl md:text-5xl">Of every ₦1,000 you give</h2>
        <div className="mt-10 flex h-20 overflow-hidden md:h-24 rounded-[22px] border-[3px] border-cream" aria-hidden="true">
          {f.perThousand.map((p, i) => (
            <div key={p.label} className={cn("flex min-w-0 items-center px-2 sm:px-4", i === 0 ? "bg-magenta-strong" : i === 1 ? "bg-tangerine text-plum" : "bg-pink-soft text-plum", i > 0 && "border-l-[3px] border-cream")} style={{ width: `${p.naira / 10}%` }}>
              {p.naira >= 150 && <span className="poster text-2xl sm:text-3xl md:text-5xl">₦{p.naira}</span>}
            </div>
          ))}
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {f.perThousand.map((p) => (
            <li key={p.label} className="text-cream/90"><strong className="font-display text-2xl text-tangerine">₦{p.naira}</strong> {p.label}</li>
          ))}
        </ul>
      </Section>

      <Section tone="cream">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Income" title={`Where it came from · ${compactNaira(f.totalIncome)}`} className="mb-8! md:mb-8!" />
            <ul className="space-y-5">
              {f.income.map((i) => (
                <li key={i.label}>
                  <div className="mb-1.5 flex justify-between gap-3 text-sm font-semibold"><span>{i.label}</span><span className="tabular-nums">{formatNaira(i.value)}</span></div>
                  <div className="h-7 overflow-hidden rounded-full border-[2.5px] border-plum bg-paper">
                    <div className="flex h-full items-center justify-end bg-tangerine pr-2 text-xs font-extrabold" style={{ width: `${(i.value / maxIncome) * 100}%` }}>
                      {Math.round((i.value / f.totalIncome) * 100)}%
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="Expenditure" title={`Where it went · ${compactNaira(f.totalExpenditure)}`} className="mb-8! md:mb-8!" />
            <div className="grid items-center gap-8 sm:grid-cols-[220px_1fr]">
              <figure className="relative mx-auto size-[220px]">
                <svg viewBox="0 0 200 200" className="size-full -rotate-90" role="img" aria-label={`Expenditure breakdown: ${f.expenses.map((e) => `${e.label} ${Math.round((e.value / totalExp) * 100)}%`).join(", ")}`}>
                  <circle cx="100" cy="100" r={R} fill="none" stroke="#3D0C3A" strokeWidth="40" />
                  {arcs.map((a) => (
                    <circle key={a.label} cx="100" cy="100" r={R} fill="none" stroke={donutColors[a.tone]} strokeWidth="34" strokeDasharray={`${a.len - 1.5} ${C - a.len + 1.5}`} strokeDashoffset={-a.offset} />
                  ))}
                </svg>
                <figcaption className="absolute inset-0 grid place-items-center text-center">
                  <span><span className="poster block text-5xl">{programmeShare}%</span><span className="text-xs font-bold uppercase tracking-wider">programmes</span></span>
                </figcaption>
              </figure>
              <ul className="space-y-2.5 text-sm">
                {f.expenses.map((e) => (
                  <li key={e.label} className="flex items-start gap-3">
                    <span className="mt-0.5 size-4 shrink-0 rounded-full border-2 border-plum" style={{ background: donutColors[e.tone] }} aria-hidden="true" />
                    <span className="flex-1">{e.label}</span>
                    <span className="font-bold tabular-nums">{Math.round((e.value / totalExp) * 100)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="sand" bordered>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="headline text-[2.1rem] sm:text-4xl md:text-5xl">Reports & policies</h2>
            <ul className="mt-8 space-y-3">
              {f.reports.map((r) => (
                <li key={r.title} className="card flex flex-col items-start gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span className="flex min-w-0 items-center gap-3"><FileText className="size-6 shrink-0 text-magenta-ink" /><span><span className="block font-bold">{r.title}</span><span className="text-xs opacity-70">{r.size}</span></span></span>
                  <a href="#" className="btn btn-sm btn-outline" aria-label={`Download ${r.title}`}><Download className="size-4" /> Download</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="headline text-[2.1rem] sm:text-4xl md:text-5xl">Registration & governance</h2>
            <div className="card mt-8 bg-plum p-6 text-cream on-dark">
              <ShieldCheck className="size-8 text-tangerine" />
              <p className="mt-3 font-display text-2xl font-extrabold">{siteConfig.org.legalName}</p>
              <p className="mt-1 font-display text-lg text-tangerine">Registered not-for-profit · Audited annually</p>
              <p className="mt-2 text-sm text-cream/80">{siteConfig.org.registrationNote} Founded {siteConfig.org.founded}. Auditor: {f.auditor}.</p>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {f.governance.map((g) => (
                <li key={g.title} className="rounded-2xl border-[3px] border-plum bg-paper p-4">
                  <p className="font-display text-lg font-extrabold">{g.title}</p>
                  <p className="mt-1 text-sm opacity-85">{g.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="cream" id="board">
        <SectionHeader eyebrow="Board of Trustees" title="Who holds us accountable." lede="Our board is unpaid, meets quarterly and includes a youth trustee elected by members." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {board.map((b) => (
            <li key={b.name} className="card flex gap-4 p-5">
              <span className="grid size-14 shrink-0 place-items-center rounded-full border-[3px] border-plum bg-tangerine font-display font-extrabold">{b.initials}</span>
              <div>
                <p className="font-display text-lg font-extrabold leading-tight">{b.name}</p>
                <p className="text-sm font-semibold text-magenta-ink">{b.role}</p>
                <p className="mt-1 text-sm opacity-85">{b.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
