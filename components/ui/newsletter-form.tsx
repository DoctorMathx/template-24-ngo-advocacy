"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { isEmail } from "@/lib/utils";

export function NewsletterForm({ dark = true }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmail(email)) return setError("Enter a valid email address.");
    setError("");
    setDone(true);
  }

  if (done)
    return (
      <p className="flex items-center gap-3 font-display text-xl font-bold" role="status">
        <span className="grid size-10 place-items-center rounded-full bg-tangerine text-plum border-[2.5px] border-plum"><Check className="size-5" /></span>
        You&apos;re in. See you Friday.
      </p>
    );

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="nl-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "nl-error" : undefined}
          className="input flex-1 rounded-full"
        />
        <button type="submit" className={dark ? "btn btn-tangerine" : "btn btn-magenta"}>
          Subscribe <ArrowRight className="size-4" />
        </button>
      </div>
      {error && <p id="nl-error" className={dark ? "mt-2 text-sm font-semibold text-pink-soft" : "error-text"} role="alert">{error}</p>}
    </form>
  );
}
