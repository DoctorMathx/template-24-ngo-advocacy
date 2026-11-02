"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function leave() {
  // Replace the current history entry so "Back" doesn't return here, then go somewhere neutral.
  try {
    document.title = "Google";
    document.body.style.visibility = "hidden";
  } catch {
    /* noop */
  }
  window.location.replace(siteConfig.help.quickExitUrl);
}

/** Fixed "Quick exit" for survivors browsing on a shared or monitored device. Press Esc twice to trigger. */
export function QuickExit() {
  const last = useRef(0);
  const pathname = usePathname();
  const onDonate = pathname.startsWith("/donate");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const now = Date.now();
      if (now - last.current < 700) leave();
      last.current = now;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <button
      type="button"
      onClick={leave}
      className={cn(
        "fixed right-3 z-[70] inline-flex min-h-[48px] items-center gap-2 rounded-full border-[3px] border-plum bg-tangerine px-4 font-display text-[0.95rem] font-extrabold uppercase tracking-wide text-plum shadow-hard-sm transition-transform hover:-translate-y-0.5 md:right-5 md:bottom-5",
        onDonate ? "bottom-4" : "bottom-[84px]"
      )}
      aria-label="Quick exit: leave this site immediately (or press Escape twice)"
      title="Leave this site now (Esc Esc)"
    >
      <LogOut className="size-4" strokeWidth={3} aria-hidden="true" />
      Quick exit
    </button>
  );
}
