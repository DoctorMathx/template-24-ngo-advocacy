"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  return (
    <div className="divide-y-[3px] divide-plum border-y-[3px] border-plum">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b-${i}`;
        const panelId = `${base}-p-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full min-h-[64px] items-center justify-between gap-6 py-5 text-left font-display text-lg font-bold md:text-xl"
              >
                {item.q}
                <span className={cn("grid size-10 shrink-0 place-items-center rounded-full border-[2.5px] border-plum transition-all", isOpen ? "rotate-45 bg-magenta-strong text-white" : "bg-paper")}>
                  <Plus className="size-5" strokeWidth={3} />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className="pb-6 pr-14 text-[1.05rem] leading-relaxed opacity-90">
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
