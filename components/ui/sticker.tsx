import { cn } from "@/lib/utils";

const bg = {
  magenta: "bg-magenta-strong text-white",
  tangerine: "bg-tangerine text-plum",
  plum: "bg-plum text-cream",
  cream: "bg-cream text-plum",
  blush: "bg-blush text-plum",
} as const;

export function Sticker({ children, tone = "tangerine", tilt = "l", className }: { children: React.ReactNode; tone?: keyof typeof bg; tilt?: "l" | "r" | "none"; className?: string }) {
  return <span className={cn("sticker", bg[tone], tilt === "r" && "sticker-r", tilt === "none" && "sticker-flat", className)}>{children}</span>;
}

export function RoundSticker({ children, tone = "tangerine", size = 128, className }: { children: React.ReactNode; tone?: keyof typeof bg; size?: number; className?: string }) {
  return (
    <div className={cn("sticker-round", bg[tone], className)} style={{ width: size, height: size, fontSize: size / 7.5 }} aria-hidden="true">
      {children}
    </div>
  );
}
