"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ value, label = "Copy", className }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* clipboard may be unavailable (http, old browsers) — still show feedback */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
  return (
    <button type="button" onClick={copy} className={cn("btn btn-sm btn-cream", className)} aria-live="polite">
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? "Copied!" : label}
    </button>
  );
}
