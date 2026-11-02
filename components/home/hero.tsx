import Link from "next/link";
import { ArrowRight, Heart, PenLine } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { img } from "@/lib/utils";
import { photos } from "@/mock/images";
import { getPetition } from "@/mock/petitions";
import { Photo } from "@/components/ui/photo";
import { RoundSticker, Sticker } from "@/components/ui/sticker";
import { SignatureMeter } from "@/components/ui/progress";

export function HeroSection() {
  const { hero } = siteConfig.home;
  const featured = getPetition("pass-the-vapp-in-every-state");
  return (
    <section className="relative overflow-hidden border-b-[3px] border-plum bg-cream">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-70" aria-hidden="true" />
      <div className="container-x relative grid gap-12 pb-16 pt-10 md:pt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:pb-24">
        <div className="relative z-10">
          <Sticker tone="plum" className="mb-7">{hero.kicker}</Sticker>
          <h1 className="poster text-[4.6rem] leading-[0.82] sm:text-[7rem] lg:text-[9.2rem] xl:text-[10.5rem]">
            <span className="block">{hero.title[0]}</span>
            <span className="block text-magenta-strong">{hero.title[1]}</span>
            <span className="block"><span className="mark">{hero.title[2]}</span></span>
          </h1>
          <p className="lede mt-8 max-w-xl">{hero.lede}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={hero.primary.href} className="btn btn-lg btn-magenta"><PenLine className="size-5" /> {hero.primary.label}</Link>
            <Link href={hero.secondary.href} className="btn btn-lg btn-plum"><Heart className="size-5 fill-current" /> {hero.secondary.label}</Link>
            <Link href="/join" className="btn btn-lg btn-outline">Join us <ArrowRight className="size-5" /></Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] lg:mt-6">
          {/* layered cut-out photo collage */}
          <div className="absolute -right-2 top-0 w-[58%] rotate-3">
            <Photo src={img(photos.protestFists, 900)} alt="Raised fists at a rally" ratio="4/5" duotone="tangerine" cut="b" sizes="30vw" />
          </div>
          <div className="relative w-[78%] pt-10">
            <div className="absolute inset-0 top-10 translate-x-3 translate-y-3 bg-plum cut-a" aria-hidden="true" />
            <Photo src={img(photos.womanMagenta, 1100)} alt="A smiling young Nigerian woman in a magenta top" ratio="4/5.2" duotone="magenta" cut="a" priority sizes="(min-width:1024px) 34vw, 80vw" />
          </div>
          <RoundSticker tone="tangerine" size={136} className="wobble absolute -left-4 top-2 z-10 sm:-left-10">
            62k<br />strong
          </RoundSticker>

          {featured && (
            <div className="card relative z-10 -mt-24 ml-auto w-[88%] p-5 sm:w-[76%] sm:p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-magenta-ink">Live petition</p>
              <p className="headline mt-1.5 text-xl leading-tight">{featured.shortTitle}</p>
              <div className="mt-4"><SignatureMeter signatures={featured.signatures} goal={featured.goal} size="sm" /></div>
              <Link href={`/petitions/${featured.slug}`} className="btn btn-sm btn-magenta mt-4 w-full">Add your name <ArrowRight className="size-4" /></Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
