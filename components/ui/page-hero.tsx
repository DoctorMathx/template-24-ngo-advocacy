import { cn } from "@/lib/utils";
import { Photo } from "./photo";

/** Interior page hero: poster headline, optional duotone cut-out photo and sticker. */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt = "",
  duotone = "magenta",
  sticker,
  tone = "cream",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  duotone?: "magenta" | "tangerine" | "plum";
  sticker?: React.ReactNode;
  tone?: "cream" | "plum" | "blush";
  children?: React.ReactNode;
}) {
  const dark = tone === "plum";
  return (
    <section className={cn("relative overflow-hidden border-b-[3px] border-plum", dark ? "bg-plum text-cream on-dark" : tone === "blush" ? "bg-blush" : "bg-cream bg-dots")}>
      <div className={cn("container-x grid gap-10 py-14 md:py-20", image && "lg:grid-cols-[1.25fr_1fr] lg:items-center")}>
        <div className="relative">
          <div className="eyebrow mb-5">{eyebrow}</div>
          <h1 className="poster text-[3.1rem] sm:text-7xl lg:text-[6.2rem]">{title}</h1>
          {lede && <p className={cn("lede mt-7 max-w-2xl", dark && "text-cream/85")}>{lede}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-0 translate-x-4 translate-y-4 bg-tangerine cut-a" aria-hidden="true" />
            <Photo src={image} alt={imageAlt} ratio="4/4.4" duotone={duotone} cut="a" priority className="border-plum" />
            {sticker && <div className="absolute -left-3 -top-4 md:-left-8">{sticker}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
