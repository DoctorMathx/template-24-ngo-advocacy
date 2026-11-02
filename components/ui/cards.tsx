import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, PenLine, Trophy, Users } from "lucide-react";
import type { Campaign, EventItem, Fundraiser, Petition, Programme, Story } from "@/lib/types";
import { cn, daysLeft, formatDate, formatNaira, formatNumber, percent } from "@/lib/utils";
import { fundraiserTypeLabel } from "@/mock/fundraisers";
import { Photo } from "./photo";
import { ProgressBar, RaisedMeter } from "./progress";
import { Sticker } from "./sticker";

export function PetitionCard({ p, className }: { p: Petition; className?: string }) {
  const victory = p.status === "victory";
  return (
    <article className={cn("card card-hover group relative flex flex-col overflow-hidden", className)}>
      <Photo src={p.image} alt="" ratio="16/10" duotone={p.tone} sizes="(min-width: 1024px) 33vw, 100vw" className="border-b-[3px] border-plum">
        <div className="absolute left-4 top-4 z-10">
          {victory ? (
            <Sticker tone="tangerine"><Trophy className="size-3.5" /> Victory</Sticker>
          ) : (
            <Sticker tone="cream" tilt="r">{p.category}</Sticker>
          )}
        </div>
      </Photo>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-magenta-ink">To: {p.target.name}</p>
        <h3 className="headline mt-2 text-2xl md:text-[1.7rem]">
          <Link href={`/petitions/${p.slug}`} className="after:absolute after:inset-0">{p.title}</Link>
        </h3>
        <div className="mt-auto pt-6">
          <div className="mb-2 flex items-baseline justify-between text-sm">
            <span className="headline text-2xl tabular-nums">{formatNumber(p.signatures)}</span>
            <span className="font-semibold">/ {formatNumber(p.goal)} signed</span>
          </div>
          <ProgressBar value={p.signatures} goal={p.goal} label={`${formatNumber(p.signatures)} of ${formatNumber(p.goal)} signatures`} />
          <div className="mt-5 inline-flex items-center gap-2 font-bold">
            <PenLine className="size-4" /> {victory ? "See the win" : "Add your name"}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function CampaignCard({ c, className }: { c: Campaign; className?: string }) {
  return (
    <article className={cn("card card-hover group relative flex flex-col overflow-hidden", className)}>
      <Photo src={c.image} alt="" ratio="16/11" duotone={c.tone} sizes="(min-width: 1024px) 33vw, 100vw" className="border-b-[3px] border-plum">
        <div className="absolute left-4 top-4 z-10"><Sticker tone="cream">{c.category}</Sticker></div>
      </Photo>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="headline text-2xl md:text-[1.75rem]">
          <Link href={`/campaigns/${c.slug}`} className="after:absolute after:inset-0">{c.title}</Link>
        </h3>
        <p className="mt-2 text-[0.98rem] leading-relaxed opacity-85">{c.tagline}</p>
        <div className="mt-auto pt-6">
          <RaisedMeter raised={c.raised} goal={c.goal} donors={c.donors} days={daysLeft(c.endDate)} size="sm" />
        </div>
      </div>
    </article>
  );
}

export function FundraiserCard({ f, className }: { f: Fundraiser; className?: string }) {
  const pct = percent(f.raised, f.goal);
  return (
    <article className={cn("card card-hover group relative flex flex-col overflow-hidden", className)}>
      <Photo src={f.image} alt="" ratio="16/10" sizes="(min-width: 1024px) 33vw, 100vw" className="border-b-[3px] border-plum">
        <div className="absolute left-4 top-4 z-10"><Sticker tone="tangerine" tilt="r">{fundraiserTypeLabel(f.type)}</Sticker></div>
      </Photo>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full border-[2.5px] border-plum bg-blush font-display text-sm font-extrabold">{f.organiser.initials}</span>
          <div className="text-sm leading-tight">
            <div className="font-bold">{f.organiser.name}</div>
            <div className="opacity-75">{f.organiser.city}</div>
          </div>
        </div>
        <h3 className="headline mt-4 text-[1.45rem]">
          <Link href={`/fundraisers/${f.slug}`} className="after:absolute after:inset-0">{f.title}</Link>
        </h3>
        <p className="mt-1.5 text-sm opacity-80">For: {f.designation.label}</p>
        <div className="mt-auto pt-5">
          <ProgressBar value={f.raised} goal={f.goal} />
          <div className="mt-2.5 flex justify-between text-sm">
            <span><strong>{formatNaira(f.raised)}</strong> of {formatNaira(f.goal)}</span>
            <span className="font-bold">{pct}%</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function StoryCard({ s, className, large }: { s: Story; className?: string; large?: boolean }) {
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <Photo src={s.image} alt="" ratio={large ? "16/11" : "4/3"} duotone={s.kind === "Survivor story" ? "plum" : undefined} className="rounded-[20px] border-[3px] border-plum" sizes="(min-width: 1024px) 40vw, 100vw" />
      <div className="mt-5 flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
        <span className="text-magenta-ink">{s.kind}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={s.date}>{formatDate(s.date)}</time>
      </div>
      <h3 className={cn("headline mt-2", large ? "text-3xl md:text-4xl" : "text-2xl")}>
        <Link href={`/stories/${s.slug}`} className="after:absolute after:inset-0 group-hover:underline decoration-magenta decoration-[3px] underline-offset-4">{s.title}</Link>
      </h3>
      <p className="mt-2 leading-relaxed opacity-85">{s.excerpt}</p>
    </article>
  );
}

export function EventCard({ e, href }: { e: EventItem | { slug: string; title: string; kind: string; date: string; time: string; city: string; venue: string; image: string; summary: string; price: number }; href?: string }) {
  const d = new Date(e.date + "T12:00:00");
  return (
    <article className="card card-hover group relative grid overflow-hidden sm:grid-cols-[150px_1fr]">
      <div className="flex flex-row items-center justify-center gap-3 border-b-[3px] border-plum bg-tangerine p-4 text-center sm:flex-col sm:gap-0 sm:border-b-0 sm:border-r-[3px]">
        <div className="poster text-6xl">{d.getDate()}</div>
        <div className="font-display text-lg font-extrabold uppercase tracking-wider">{d.toLocaleDateString("en-NG", { month: "short", year: "numeric" })}</div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest">
          <span className="rounded-full bg-plum px-2.5 py-1 text-cream">{e.kind}</span>
          <span>{e.price === 0 ? "Free" : `From ${formatNaira(e.price)}`}</span>
        </div>
        <h3 className="headline mt-3 text-2xl">
          <Link href={href ?? `/events/${e.slug}`} className="after:absolute after:inset-0">{e.title}</Link>
        </h3>
        <p className="mt-2 opacity-85">{e.summary}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
          <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4" />{e.time}</span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" />{e.city}</span>
        </div>
      </div>
    </article>
  );
}

export function ProgrammeCard({ p, index = 0 }: { p: Programme; index?: number }) {
  return (
    <article className={cn("group relative flex flex-col", index % 2 === 1 && "md:mt-16")}>
      <div className="relative">
        <Photo src={p.image} alt="" ratio="4/4.6" duotone={p.tone} cut={index % 2 ? "b" : "a"} sizes="(min-width: 1024px) 25vw, 50vw" />
        <span className="poster absolute -bottom-6 right-3 text-[5.5rem] text-tangerine text-outline" aria-hidden="true">{p.number}</span>
      </div>
      <h3 className="headline mt-6 text-3xl">
        <Link href={`/programmes/${p.slug}`} className="after:absolute after:inset-0">{p.title}</Link>
      </h3>
      <p className="mt-2 leading-relaxed opacity-85">{p.short}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 font-bold text-magenta-ink">
        Explore <ArrowUpRight className="size-4" />
      </span>
    </article>
  );
}

export function SupporterCount({ n, label }: { n: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold"><Users className="size-4" />{formatNumber(n)} {label}</span>
  );
}
