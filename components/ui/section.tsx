import { cn } from "@/lib/utils";

const tones = {
  cream: "bg-cream text-plum",
  paper: "bg-paper text-plum",
  sand: "bg-cream-2 text-plum",
  blush: "bg-blush text-plum",
  plum: "bg-plum text-cream on-dark",
  magenta: "bg-magenta-strong text-white on-dark",
  tangerine: "bg-tangerine text-plum",
} as const;

export type SectionTone = keyof typeof tones;

export function Section({
  children,
  className,
  tone = "cream",
  pad = "lg",
  id,
  bordered = false,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  tone?: SectionTone;
  pad?: "sm" | "md" | "lg" | "none";
  id?: string;
  bordered?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "id">) {
  const pads = { none: "", sm: "py-12 md:py-14", md: "py-16 md:py-20", lg: "py-20 md:py-28" } as const;
  return (
    <section id={id} className={cn(tones[tone], pads[pad], bordered && "border-y-[3px] border-plum", "relative", className)} {...rest}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  action,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  action?: React.ReactNode;
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={cn("mb-10 md:mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between", center && "md:flex-col md:items-center text-center", className)}>
      <div className={cn("max-w-3xl", center && "mx-auto")}>
        {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
        <h2 className="headline text-[2.4rem] sm:text-5xl lg:text-[4rem]">{title}</h2>
        {lede && <p className={cn("lede mt-5 max-w-2xl", center && "mx-auto")}>{lede}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
