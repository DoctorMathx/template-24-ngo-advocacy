import { cn, compactNaira, formatNaira, formatNumber, percent } from "@/lib/utils";

export function ProgressBar({ value, goal, tone = "magenta", label, className }: { value: number; goal: number; tone?: "magenta" | "tangerine"; label?: string; className?: string }) {
  const pct = percent(value, goal);
  return (
    <div
      className={cn("progress", tone === "tangerine" && "progress-tangerine", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={label ?? `${pct}% of goal reached`}
    >
      <span style={{ width: `${Math.max(pct, 3)}%` }} />
    </div>
  );
}

/** Raised vs goal meter used on campaigns, fundraisers and funds. */
export function RaisedMeter({
  raised,
  goal,
  donors,
  days,
  size = "md",
  donorsLabel = "donors",
  tone,
}: {
  raised: number;
  goal: number;
  donors?: number;
  days?: number;
  size?: "sm" | "md" | "lg";
  donorsLabel?: string;
  tone?: "magenta" | "tangerine";
}) {
  const pct = percent(raised, goal);
  return (
    <div>
      <div className="flex items-end justify-between gap-3 mb-2.5">
        <div>
          <div className={cn("headline", size === "lg" ? "text-5xl" : size === "md" ? "text-3xl" : "text-2xl")}>
            {size === "sm" ? compactNaira(raised) : formatNaira(raised)}
          </div>
          <div className="text-sm opacity-80 mt-1">raised of {formatNaira(goal)} goal</div>
        </div>
        <div className="sticker sticker-flat bg-tangerine text-plum shadow-none text-sm">{pct}%</div>
      </div>
      <ProgressBar value={raised} goal={goal} tone={tone} />
      {(donors !== undefined || days !== undefined) && (
        <div className="mt-3 flex justify-between text-sm font-semibold">
          {donors !== undefined && <span>{formatNumber(donors)} {donorsLabel}</span>}
          {days !== undefined && <span>{days > 0 ? `${days} days left` : "Closed"}</span>}
        </div>
      )}
    </div>
  );
}

/** Signature counter for petitions. */
export function SignatureMeter({ signatures, goal, size = "md" }: { signatures: number; goal: number; size?: "sm" | "md" | "lg" }) {
  const pct = percent(signatures, goal);
  const remaining = Math.max(0, goal - signatures);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 mb-2.5">
        <div className={cn("headline tabular-nums", size === "lg" ? "text-6xl" : size === "md" ? "text-4xl" : "text-2xl")}>
          {formatNumber(signatures)}
        </div>
        <div className="text-sm font-semibold text-right">of {formatNumber(goal)} signatures</div>
      </div>
      <ProgressBar value={signatures} goal={goal} label={`${formatNumber(signatures)} of ${formatNumber(goal)} signatures`} />
      <div className="mt-2.5 text-sm">
        {remaining > 0 ? (
          <><strong>{formatNumber(remaining)}</strong> more needed to reach the goal</>
        ) : (
          <strong>Goal reached — {pct}%!</strong>
        )}
      </div>
    </div>
  );
}
