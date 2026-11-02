import type { Metadata } from "next";
import { stories } from "@/mock/stories";
import { Section } from "@/components/ui/section";
import { StoryCard } from "@/components/ui/cards";

export const metadata: Metadata = {
  title: "Stories & news",
  description: "Survivor stories told with consent, campaign wins, field notes and op-eds from HerVoice Collective.",
};

export default function StoriesPage() {
  const sorted = [...stories].sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = sorted;
  return (
    <>
      <section className="border-b-[3px] border-plum bg-cream bg-dots">
        <div className="container-x py-14 md:py-20">
          <p className="eyebrow mb-5">Stories & news</p>
          <h1 className="poster text-[3.6rem] sm:text-8xl lg:text-[8.5rem]">Loud<br /><span className="text-magenta-strong">stories.</span></h1>
          <p className="lede mt-7 max-w-2xl">Survivor stories are shared only with informed consent, names changed where asked, and reviewed by the survivor before publishing.</p>
        </div>
      </section>
      <Section tone="cream">
        <StoryCard s={lead} large className="mx-auto max-w-4xl" />
        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((s) => <StoryCard key={s.slug} s={s} />)}
        </div>
      </Section>
    </>
  );
}
