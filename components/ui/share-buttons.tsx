"use client";

import { useState } from "react";
import { Check, Link2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { absoluteUrl } from "@/lib/site-url";

/** WhatsApp / X / copy-link share row. `path` is resolved against NEXT_PUBLIC_SITE_URL. */
export function ShareButtons({ path, text, className, dark }: { path: string; text: string; className?: string; dark?: boolean }) {
  const url = absoluteUrl(path);
  const [copied, setCopied] = useState(false);

  const wa = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
  const x = `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

  async function copy() {
    try { await navigator.clipboard.writeText(url); } catch { /* ignore */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  const cls = cn("btn btn-sm", dark ? "btn-cream" : "btn-outline");
  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      <a href={wa} target="_blank" rel="noopener noreferrer" className={cn("btn btn-sm bg-[#1FA855] text-white")}>
        <MessageCircle className="size-4" /> WhatsApp
      </a>
      <a href={x} target="_blank" rel="noopener noreferrer" className={cn("btn btn-sm btn-plum")}>
        <span aria-hidden="true" className="font-display font-black">𝕏</span> Post on X
      </a>
      <button type="button" onClick={copy} className={cls} aria-live="polite">
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />} {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}
