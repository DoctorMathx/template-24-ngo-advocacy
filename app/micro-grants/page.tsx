import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";
import { formatDate, formatNaira, img } from "@/lib/utils";
import { photos } from "@/mock/images";
import { microGrantFund } from "@/mock/organisation";
import { stories } from "@/mock/stories";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { RaisedMeter } from "@/components/ui/progress";
import { RoundSticker } from "@/components/ui/sticker";
import { StoryCard } from "@/components/ui/cards";
import { GrantForm } from "./grant-form";

export const metadata: Metadata = {
  title: "Women's Micro-grant Fund",
  description: "Non-repayable grants of ₦100,000–₦500,000 plus coaching for survivors and low-income women in Nigeria. Apply, or donate to the fund.",
};

export default function MicroGrantsPage() {
  const m = microGrantFund;
  const story = stories.find((s) => s.slug === "micro-grant-restart-amaka");
  return (
    <>
      <PageHero
        eyebrow="Women's Micro-grant Fund"
        title={<>Money is a<br /><span className="text-magenta-strong">safety plan.</span></>}
        lede="Economic dependence keeps women in abusive homes. Our grants — not loans — help survivors and low-income women start or restart a livelihood, with coaching to make it last."
        image={img(photos.entrepreneur)}
        imageAlt="A smiling woman entrepreneur holding a tablet"
        duotone="tangerine"
        sticker={<RoundSticker tone="magenta" size={124}>Nothing<br />to<br />repay</RoundSticker>}
      >
        <Link href="#apply" className="btn btn-lg btn-magenta">Apply for a grant</Link>
        <Link href="#give" className="btn btn-lg btn-plum"><Heart className="size-5 fill-current" /> Donate to the fund</Link>
      </PageHero>

      <Section tone="plum" pad="md">
        <dl className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 lg:gap-8">
          {[
            [String(m.grantsAwarded), "grants awarded"],
            [formatNaira(m.averageGrant), "average grant"],
            [m.stillTrading, "still trading after 2 years"],
            [formatDate(m.nextRoundCloses, { day: "numeric", month: "short" }), "next round closes"],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="sr-only">{l}</dt>
              <dd><span className="poster block text-4xl text-tangerine min-[400px]:text-5xl lg:text-6xl">{v}</span><span className="mt-1 block text-cream/80">{l}</span></dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="cream" pad="md">
        <div className="grid gap-6 md:grid-cols-3">
          {m.sizes.map((s, i) => (
            <div key={s.amount} className={i === 1 ? "card bg-tangerine p-7" : "card p-7"}>
              <p className="text-xs font-bold uppercase tracking-widest">{s.label}</p>
              <p className="poster mt-2 text-5xl md:text-4xl lg:text-5xl xl:text-6xl">{formatNaira(s.amount)}</p>
              <p className="mt-3">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="headline text-4xl">Who can apply</h2>
            <ul className="mt-5 space-y-3">
              {m.eligibility.map((e) => <li key={e} className="flex gap-3 text-[1.05rem]"><span className="mt-2 size-3 shrink-0 rounded-full bg-magenta-strong" />{e}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="headline text-4xl">How it works</h2>
            <ol className="mt-5 grid gap-4 sm:grid-cols-2">
              {m.steps.map((s, i) => (
                <li key={s.title} className="card p-5">
                  <span className="poster text-4xl text-magenta-strong">0{i + 1}</span>
                  <p className="headline mt-1 text-xl">{s.title}</p>
                  <p className="mt-1 text-sm opacity-85">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section tone="sand" bordered id="apply" className="scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow mb-4">Applications open</p>
            <h2 className="headline text-4xl md:text-6xl">Apply for a grant.</h2>
            <p className="lede mt-5">Takes about 8 minutes. Prefer to talk? Send a WhatsApp voice note to our grants line or visit any chapter office.</p>
            <p className="mt-6 rounded-2xl border-[3px] border-plum bg-paper p-4 text-sm"><strong>Applying is always free.</strong> HerVoice will never ask you to pay a fee or share your bank PIN.</p>
          </div>
          <GrantForm />
        </div>
      </Section>

      <Section tone="magenta" id="give" className="scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow mb-4 text-white">Give to the fund</p>
            <h2 className="poster text-5xl sm:text-6xl md:text-7xl">₦100,000<br /><span className="text-plum">restarts a life.</span></h2>
            <p className="mt-5 max-w-lg text-lg text-white/90">Every naira you give to the fund goes out as grants. Coaching and admin are covered by our core funders.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[25_000, 100_000, 250_000].map((a) => <Link key={a} href={`/donate?fund=micro-grants&amount=${a}`} className="btn btn-cream">{formatNaira(a)}</Link>)}
              <Link href="/donate?fund=micro-grants" className="btn btn-plum">Other amount</Link>
            </div>
          </div>
          <div className="card bg-cream p-7 text-plum">
            <RaisedMeter raised={m.raised} goal={m.goal} donors={1_284} />
            <p className="mt-4 text-sm">Fund target for 2026–27: 570 new grants.</p>
          </div>
        </div>
      </Section>

      {story && (
        <Section tone="cream" pad="md">
          <div className="mx-auto max-w-3xl"><StoryCard s={story} large /></div>
        </Section>
      )}
    </>
  );
}
