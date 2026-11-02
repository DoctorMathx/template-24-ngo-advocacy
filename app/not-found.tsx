import Link from "next/link";
import { RoundSticker } from "@/components/ui/sticker";

export default function NotFound() {
  return (
    <section className="bg-cream bg-dots border-b-[3px] border-plum">
      <div className="container-x relative py-24 md:py-32">
        <RoundSticker tone="tangerine" size={140} className="absolute right-6 top-10 hidden md:grid">Lost?<br />We&apos;ve got you</RoundSticker>
        <p className="eyebrow mb-5">Error 404</p>
        <h1 className="poster text-[4rem] sm:text-8xl lg:text-[9rem]">This page<br /><span className="text-magenta-strong">went quiet.</span></h1>
        <p className="lede mt-8 max-w-xl">The page you&apos;re looking for has moved or never existed. Our voices haven&apos;t — pick up where you left off.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-plum">Back home</Link>
          <Link href="/petitions" className="btn btn-outline">Sign a petition</Link>
          <Link href="/get-help" className="btn btn-tangerine">Get help</Link>
        </div>
      </div>
    </section>
  );
}
