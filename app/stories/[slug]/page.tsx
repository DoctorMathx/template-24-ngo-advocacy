import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStory, stories } from "@/mock/stories";
import { formatDate } from "@/lib/utils";
import { Photo } from "@/components/ui/photo";
import { Section } from "@/components/ui/section";
import { StoryCard } from "@/components/ui/cards";
import { ShareButtons } from "@/components/ui/share-buttons";
import { Sticker } from "@/components/ui/sticker";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) return { title: "Story not found" };
  return { title: s.title.replace(/[“”]/g, ""), description: s.excerpt, openGraph: { type: "article", images: [s.image] } };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) notFound();
  const more = stories.filter((x) => x.slug !== s.slug).slice(0, 3);
  return (
    <>
      <article>
        <header className="border-b-[3px] border-plum bg-cream bg-dots">
          <div className="container-x max-w-5xl py-14 md:py-20">
            <div className="flex flex-wrap items-center gap-3 text-sm font-bold uppercase tracking-widest">
              <Sticker tone="tangerine">{s.kind}</Sticker>
              <time dateTime={s.date}>{formatDate(s.date, { day: "numeric", month: "long", year: "numeric" })}</time>
            </div>
            <h1 className="headline mt-6 text-[2.8rem] sm:text-6xl lg:text-7xl">{s.title}</h1>
            <p className="lede mt-6">{s.excerpt}</p>
            <p className="mt-6 font-semibold">By {s.author}</p>
          </div>
        </header>
        <div className="container-x max-w-5xl -mt-0 pt-12">
          <Photo src={s.image} alt="" ratio="16/9" duotone={s.kind === "Survivor story" ? "plum" : undefined} priority className="rounded-[24px] border-[3px] border-plum" sizes="(min-width:1024px) 960px, 100vw" />
        </div>
        <Section tone="cream" pad="md">
          <div className="mx-auto max-w-3xl">
            <div className="prose-hv">
              {s.body.map((p, i) => (
                <Fragment key={i}>
                  <p>{p}</p>
                  {i === 1 && s.pullQuote && (
                    <blockquote className="my-10 border-l-8 border-magenta-strong pl-6">
                      <p className="headline text-3xl! md:text-4xl!">“{s.pullQuote}”</p>
                    </blockquote>
                  )}
                </Fragment>
              ))}
            </div>
            {s.consentNote && <p className="mt-8 rounded-2xl bg-blush p-4 text-sm">{s.consentNote}</p>}
            <div className="mt-10 border-t-[3px] border-plum pt-8">
              <p className="font-display text-xl font-extrabold">Share this story</p>
              <ShareButtons className="mt-3" path={`/stories/${s.slug}`} text={s.title} />
            </div>
            <div className="card mt-10 flex flex-col items-start gap-4 bg-tangerine p-7 md:flex-row md:items-center md:justify-between">
              <p className="headline text-2xl">Stories like this need funding.</p>
              <Link href="/donate" className="btn btn-plum">Donate</Link>
            </div>
          </div>
        </Section>
      </article>
      <Section tone="sand" bordered pad="md">
        <h2 className="headline mb-8 text-4xl">More stories</h2>
        <div className="grid gap-10 md:grid-cols-3">{more.map((m) => <StoryCard key={m.slug} s={m} />)}</div>
      </Section>
    </>
  );
}
