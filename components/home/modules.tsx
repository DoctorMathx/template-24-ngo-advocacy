import Link from "next/link";
import { ArrowRight, ArrowUpRight, Cake, Building2, Church, Footprints, Heart, LifeBuoy, MessageCircle, Phone, Scale, Sparkles, Ticket, Flower2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn, daysLeft, formatDate, formatNaira, img } from "@/lib/utils";
import { photos } from "@/mock/images";
import { petitions } from "@/mock/petitions";
import { campaigns } from "@/mock/campaigns";
import { programmes } from "@/mock/programmes";
import { fundraisers, fundraiserTypes } from "@/mock/fundraisers";
import { stories } from "@/mock/stories";
import { gala, galaTickets } from "@/mock/events";
import { financials, impactStats, membershipTiers, partners } from "@/mock/organisation";
import { Section, SectionHeader } from "@/components/ui/section";
import { SloganMarquee } from "@/components/ui/marquee";
import { CampaignCard, FundraiserCard, PetitionCard, ProgrammeCard, StoryCard } from "@/components/ui/cards";
import { Photo } from "@/components/ui/photo";
import { RaisedMeter, SignatureMeter } from "@/components/ui/progress";
import { RoundSticker, Sticker } from "@/components/ui/sticker";
import { NewsletterForm } from "@/components/ui/newsletter-form";

export function SloganMarqueeModule() {
  return (
    <div className="relative z-10 -my-2 overflow-hidden py-2">
      <SloganMarquee tone="plum" tilt />
    </div>
  );
}

export function PetitionsModule() {
  const open = petitions.filter((p) => p.status === "open");
  const [lead, ...rest] = open;
  return (
    <Section tone="cream">
      <SectionHeader
        eyebrow="Sign. Share. Win."
        title={<>Your name is <span className="text-magenta-strong">a weapon.</span></>}
        lede="Petitions are how we show decision-makers the size of the movement. We deliver every signature in person — and we keep count until they act."
        action={<Link href="/petitions" className="btn btn-outline">All petitions <ArrowRight className="size-4" /></Link>}
      />
      <article className="card relative grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
        <Photo src={lead.image} alt="" ratio="16/11" duotone={lead.tone} className="border-b-[3px] border-plum lg:border-b-0 lg:border-r-[3px] lg:aspect-auto! lg:h-full" sizes="(min-width:1024px) 55vw, 100vw">
          <div className="absolute left-5 top-5 z-10"><Sticker tone="tangerine">Urgent · {daysLeft(lead.endDate)} days left</Sticker></div>
        </Photo>
        <div className="flex flex-col p-7 md:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-magenta-ink">To: {lead.target.name}</p>
          <h3 className="headline mt-3 text-3xl md:text-[2.6rem]">{lead.title}</h3>
          <p className="mt-4 leading-relaxed opacity-85">{lead.summary}</p>
          <div className="mt-7"><SignatureMeter signatures={lead.signatures} goal={lead.goal} /></div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/petitions/${lead.slug}`} className="btn btn-magenta">Sign the petition <ArrowRight className="size-4" /></Link>
            <Link href={`/petitions/${lead.slug}#share`} className="btn btn-outline">Share</Link>
          </div>
        </div>
      </article>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {rest.slice(0, 3).map((p) => <PetitionCard key={p.slug} p={p} />)}
      </div>
    </Section>
  );
}

export function ImpactStatsModule() {
  return (
    <Section tone="plum" pad="md" className="bg-dots-light">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
        <div>
          <p className="eyebrow mb-4">Twelve years of noise</p>
          <h2 className="headline text-5xl md:text-6xl">Wins you can <span className="text-tangerine">count.</span></h2>
          <Link href="/impact" className="btn btn-cream mt-8">See our impact <ArrowRight className="size-4" /></Link>
        </div>
        <dl className="grid grid-cols-2 border-l-[3px] border-t-[3px] border-cream/25 md:grid-cols-3">
          {impactStats.map((s, i) => (
            <div key={s.label} className="border-b-[3px] border-r-[3px] border-cream/25 p-5 md:p-7">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className={cn("poster block text-5xl md:text-6xl", i % 3 === 0 ? "text-tangerine" : i % 3 === 1 ? "text-pink-soft" : "text-cream")}>{s.value}</span>
                <span className="mt-2 block text-sm text-cream/80">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

export function CampaignsModule() {
  return (
    <Section tone="sand" bordered>
      <SectionHeader
        eyebrow="Urgent appeals"
        title="Put your money where the movement is."
        action={<Link href="/campaigns" className="btn btn-outline">All campaigns <ArrowRight className="size-4" /></Link>}
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.slice(0, 3).map((c) => <CampaignCard key={c.slug} c={c} />)}
      </div>
    </Section>
  );
}

export function ProgrammesModule() {
  return (
    <Section tone="cream">
      <SectionHeader
        eyebrow="What we do"
        title={<>Four fronts. <span className="mark">One fight.</span></>}
        lede="From the helpline to the ballot box, our programmes tackle violence and the inequality that feeds it."
        action={<Link href="/programmes" className="btn btn-outline">Our programmes <ArrowRight className="size-4" /></Link>}
      />
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {programmes.map((p, i) => <ProgrammeCard key={p.slug} p={p} index={i} />)}
      </div>
    </Section>
  );
}

const typeIcons = { birthday: Cake, marathon: Footprints, faith: Church, office: Building2, memorial: Flower2, challenge: Sparkles } as const;

export function PeerFundraisingModule() {
  return (
    <Section tone="tangerine" bordered className="overflow-hidden">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow mb-4 text-plum">Fundraise for us</p>
          <h2 className="poster text-6xl md:text-7xl lg:text-8xl">Make it<br />your<br /><span className="text-cream text-outline">cause.</span></h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed">
            Birthdays, marathons, church harvests, Ramadan, office drives — set up a page in 3 minutes, share it on WhatsApp, and every naira goes straight to HerVoice.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {fundraiserTypes.map((t) => {
              const I = typeIcons[t.id];
              return (
                <li key={t.id} className="inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-plum bg-cream px-3.5 py-2 text-sm font-bold">
                  <I className="size-4" /> {t.label}
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/fundraisers/start" className="btn btn-lg btn-plum">Start a fundraiser <ArrowRight className="size-5" /></Link>
            <Link href="/fundraisers" className="btn btn-lg btn-cream">Browse pages</Link>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {fundraisers.slice(0, 4).map((f, i) => (
            <FundraiserCard key={f.slug} f={f} className={cn(i % 2 === 1 && "sm:mt-12")} />
          ))}
        </div>
      </div>
    </Section>
  );
}

export function GetHelpBandModule() {
  const { help } = siteConfig;
  return (
    <section className="on-dark relative overflow-hidden border-y-[3px] border-plum bg-plum text-cream">
      <div className="container-x grid gap-10 py-16 md:py-20 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <Photo src={img(photos.silhouette, 900)} alt="Silhouette of a woman in profile" ratio="5/4" duotone="plum" cut="c" sizes="(min-width:1024px) 40vw, 90vw" />
          <RoundSticker tone="magenta" size={120} className="absolute -right-2 -top-5">You are<br />not alone</RoundSticker>
        </div>
        <div>
          <p className="eyebrow mb-4">Get help · confidential · free</p>
          <h2 className="headline text-4xl md:text-6xl">If you&apos;re not safe, <span className="text-tangerine">we&apos;re here.</span></h2>
          <p className="mt-5 max-w-xl text-lg text-cream/85">
            Talk to a trained counsellor any time, day or night. You don&apos;t have to give your name, and you don&apos;t have to report to the police to get help.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <a href={`tel:${help.helpline.replace(/\s/g, "")}`} className="rounded-2xl border-[3px] border-cream/30 p-4 hover:border-tangerine">
              <Phone className="size-5 text-tangerine" />
              <span className="mt-2 block text-xs uppercase tracking-widest text-cream/70">Helpline 24/7</span>
              <span className="font-display text-xl font-extrabold">{help.helpline}</span>
            </a>
            <a href={siteConfig.brand.whatsappLink} className="rounded-2xl border-[3px] border-cream/30 p-4 hover:border-tangerine">
              <MessageCircle className="size-5 text-tangerine" />
              <span className="mt-2 block text-xs uppercase tracking-widest text-cream/70">WhatsApp chat</span>
              <span className="font-display text-xl font-extrabold">{help.whatsappSupport}</span>
            </a>
            <a href={`tel:${help.emergency}`} className="rounded-2xl border-[3px] border-cream/30 p-4 hover:border-tangerine">
              <LifeBuoy className="size-5 text-tangerine" />
              <span className="mt-2 block text-xs uppercase tracking-widest text-cream/70">Emergency</span>
              <span className="font-display text-xl font-extrabold">{help.emergency}</span>
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/get-help" className="btn btn-tangerine">Get help now</Link>
            <Link href="/get-help#legal-aid" className="btn btn-outline"><Scale className="size-4" /> Request legal aid</Link>
          </div>
          <p className="mt-5 text-sm text-cream/70">Browsing on a shared phone? Tap <strong className="text-tangerine">Quick exit</strong> or press Esc twice to leave instantly.</p>
        </div>
      </div>
    </section>
  );
}

export function MembershipModule() {
  return (
    <Section tone="blush" bordered>
      <SectionHeader
        eyebrow="Join the collective"
        title={<>Not a follower. <span className="text-magenta-strong">A member.</span></>}
        lede="Annual dues fund the movement and give you a vote, training and a crew in your city."
        action={<Link href="/join" className="btn btn-magenta">Become a member <ArrowRight className="size-4" /></Link>}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {membershipTiers.map((t, i) => (
          <Link
            key={t.id}
            href={`/join?tier=${t.id}`}
            className={cn("card card-hover relative flex flex-col p-6", t.featured && "bg-plum text-cream on-dark")}
          >
            {t.featured && <Sticker tone="tangerine" className="absolute -top-4 right-4">Most popular</Sticker>}
            <span className="font-display text-sm font-bold uppercase tracking-widest opacity-80">0{i + 1}</span>
            <span className="headline mt-2 text-3xl">{t.name}</span>
            <span className="poster mt-4 text-5xl">{formatNaira(t.price)}</span>
            <span className="mt-1 text-sm opacity-80">per year</span>
            <span className="mt-4 text-sm leading-relaxed opacity-90">{t.blurb}</span>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-bold">Join as {t.name} <ArrowUpRight className="size-4" /></span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function GalaModule() {
  const from = Math.min(...galaTickets.map((t) => t.price));
  return (
    <section className="on-dark relative overflow-hidden bg-plum text-cream">
      <div className="absolute inset-0 opacity-60" aria-hidden="true">
        <Photo src={gala.image} alt="" ratio="auto" duotone="plum" className="absolute! inset-0 h-full w-full" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-plum via-plum/85 to-plum/30" aria-hidden="true" />
      <div className="container-x relative grid gap-10 py-20 md:py-28 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <Sticker tone="tangerine" className="mb-6"><Ticket className="size-4" /> {formatDate(gala.date, { day: "numeric", month: "long", year: "numeric" })} · {gala.city}</Sticker>
          <h2 className="poster text-6xl sm:text-7xl lg:text-[7.5rem]">The HerVoice<br /><span className="text-pink-soft">Gala</span> 2026</h2>
          <p className="mt-4 font-display text-2xl font-bold text-tangerine">“{gala.theme}”</p>
          <p className="mt-5 max-w-xl text-lg text-cream/85">{gala.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events/gala" className="btn btn-lg btn-tangerine">Get tickets from {formatNaira(from)}</Link>
            <Link href="/events/gala#tables" className="btn btn-lg btn-outline">Sponsor a table</Link>
          </div>
        </div>
        <div className="card bg-cream p-6 text-plum">
          <p className="text-xs font-bold uppercase tracking-widest text-magenta-ink">Gala fundraising goal</p>
          <div className="mt-3"><RaisedMeter raised={gala.raised} goal={gala.goal} size="sm" tone="tangerine" /></div>
          <p className="mt-4 text-sm">Every ticket, table and paddle raised funds the Women&apos;s Micro-grant Fund and our safe homes.</p>
        </div>
      </div>
    </section>
  );
}

export function StoriesModule() {
  const [lead, ...rest] = stories;
  return (
    <Section tone="cream">
      <SectionHeader
        eyebrow="Stories, told with consent"
        title="Loud stories. Real women."
        action={<Link href="/stories" className="btn btn-outline">All stories <ArrowRight className="size-4" /></Link>}
      />
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <StoryCard s={lead} large />
        <div className="grid gap-10">
          {rest.slice(0, 2).map((s) => <StoryCard key={s.slug} s={s} />)}
        </div>
      </div>
    </Section>
  );
}

export function TransparencyModule() {
  return (
    <Section tone="paper" bordered>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="eyebrow mb-4">Radical accountability</p>
          <h2 className="headline text-4xl md:text-6xl">Of every <span className="mark">₦1,000</span> you give…</h2>
          <p className="lede mt-5">Audited annually by independent chartered accountants. Restricted gifts tracked to the naira. Read it all.</p>
          <Link href="/transparency" className="btn btn-plum mt-8">See our financials <ArrowRight className="size-4" /></Link>
        </div>
        <div className="space-y-5">
          {financials.perThousand.map((r, i) => (
            <div key={r.label} className="card p-5">
              <div className="flex items-center gap-5">
                <span className={cn("poster w-36 shrink-0 text-5xl md:text-6xl", i === 0 ? "text-magenta-strong" : "text-plum")}>₦{r.naira}</span>
                <span className="font-semibold">{r.label}</span>
              </div>
              <div className="mt-4 h-4 overflow-hidden rounded-full border-[2.5px] border-plum bg-cream">
                <div className={cn("h-full", i === 0 ? "bg-magenta-strong" : i === 1 ? "bg-tangerine" : "bg-plum-3")} style={{ width: `${r.naira / 10}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function PartnersModule() {
  return (
    <Section tone="cream" pad="md">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow mb-3">In good company</p>
          <h2 className="headline text-3xl md:text-4xl">Backed by funders who demand results.</h2>
        </div>
        <Link href="/partner" className="btn btn-outline">Partner with us <ArrowRight className="size-4" /></Link>
      </div>
      <ul className="mt-10 grid grid-cols-2 border-l-[3px] border-t-[3px] border-plum md:grid-cols-4">
        {partners.map((p) => (
          <li key={p.name} className="flex min-h-[120px] flex-col justify-center border-b-[3px] border-r-[3px] border-plum p-5">
            <span className="font-display text-lg font-extrabold leading-tight" style={{ fontVariationSettings: '"wdth" 78' }}>{p.name}</span>
            <span className="mt-1 text-xs font-semibold uppercase tracking-wider opacity-70">{p.type}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function NewsletterModule() {
  return (
    <Section tone="magenta" pad="md">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <h2 className="poster text-5xl md:text-7xl">{siteConfig.newsletter.title}</h2>
        <div>
          <p className="mb-5 text-lg text-white/90">{siteConfig.newsletter.lede}</p>
          <NewsletterForm />
        </div>
      </div>
    </Section>
  );
}

export function FinalCtaModule() {
  const actions = [
    { verb: "Sign", body: "Add your name to the VAPP petition.", href: "/petitions", cls: "bg-cream" },
    { verb: "Give", body: "₦5,000 gets a survivor to court.", href: "/donate", cls: "bg-magenta-strong text-white" },
    { verb: "Join", body: "Become a member from ₦5,000/yr.", href: "/join", cls: "bg-tangerine" },
    { verb: "Raise", body: "Turn your birthday into beds.", href: "/fundraisers/start", cls: "bg-blush" },
  ];
  return (
    <Section tone="cream" pad="md">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((a, i) => (
          <Link key={a.verb} href={a.href} className={cn("card card-hover group flex min-h-[240px] flex-col justify-between p-7", a.cls, i % 2 ? "lg:mt-8" : "")}>
            <span className="poster text-7xl">{a.verb}.</span>
            <span className="flex items-end justify-between gap-3 font-semibold">
              {a.body}
              <ArrowUpRight className="size-7 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm font-semibold">
        <Heart className="size-4 fill-magenta-strong text-magenta-strong" /> {siteConfig.org.legalName} · Registered not-for-profit
      </p>
    </Section>
  );
}
