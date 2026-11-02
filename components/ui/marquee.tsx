import { Asterisk } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SloganMarquee({ tone = "plum", items = siteConfig.slogans, tilt = false }: { tone?: "plum" | "magenta" | "tangerine"; items?: readonly string[]; tilt?: boolean }) {
  const toneCls = {
    plum: "bg-plum text-cream",
    magenta: "bg-magenta-strong text-white",
    tangerine: "bg-tangerine text-plum",
  }[tone];
  const row = [...items, ...items];
  return (
    <div className="w-full max-w-full overflow-hidden">
    <div className={cn("marquee overflow-hidden border-y-[3px] border-plum py-4 md:py-5", toneCls, tilt && "-rotate-1 scale-[1.02]")} aria-label={`Campaign slogans: ${items.join(", ")}`} role="region">
      <div className="marquee-track" aria-hidden="true">
        {row.map((s, i) => (
          <span key={i} className="poster flex items-center gap-6 pr-6 text-3xl md:text-5xl whitespace-nowrap">
            {s}
            <Asterisk className={cn("size-8 md:size-10 shrink-0", tone === "plum" ? "text-tangerine" : tone === "magenta" ? "text-tangerine" : "text-magenta-strong")} strokeWidth={3} />
          </span>
        ))}
      </div>
    </div>
    </div>
  );
}
