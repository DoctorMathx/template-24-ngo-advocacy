import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("size-11", className)} aria-hidden="true">
      <path d="M6 8c0-2.2 1.8-4 4-4h28c2.2 0 4 1.8 4 4v22c0 2.2-1.8 4-4 4H22l-9 9v-9h-3c-2.2 0-4-1.8-4-4V8z" fill="#D42A72" stroke="#3D0C3A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M15 12v15M15 19.5h9M24 12v15M29 12l4.5 15L38 12" stroke="#FBF3EA" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label={`${siteConfig.brand.name} — home`}>
      <LogoMark className="-rotate-6 transition-transform group-hover:rotate-0" />
      <span className="leading-none">
        <span className={cn("block font-display text-[1.45rem] font-extrabold tracking-tight", dark ? "text-cream" : "text-plum")} style={{ fontVariationSettings: '"wdth" 80' }}>
          HerVoice
        </span>
        <span className={cn("block text-[0.66rem] font-bold uppercase tracking-[0.3em]", dark ? "text-pink-soft" : "text-magenta-ink")}>Collective</span>
      </span>
    </Link>
  );
}
