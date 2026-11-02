"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { FundraiserType } from "@/lib/types";
import { fundraisers, fundraiserTypes } from "@/mock/fundraisers";
import { FundraiserCard } from "@/components/ui/cards";

type Sort = "trending" | "closest" | "newest";

export function FundraiserBrowser() {
  const [type, setType] = useState<FundraiserType | "all">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("trending");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const filtered = fundraisers.filter(
      (f) =>
        (type === "all" || f.type === type) &&
        (!term || `${f.title} ${f.organiser.name} ${f.organiser.city}`.toLowerCase().includes(term))
    );
    return [...filtered].sort((a, b) =>
      sort === "closest" ? b.raised / b.goal - a.raised / a.goal : sort === "newest" ? b.endDate.localeCompare(a.endDate) : b.supporters - a.supporters
    );
  }, [type, q, sort]);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
          <button type="button" className="chip" aria-pressed={type === "all"} onClick={() => setType("all")}>All</button>
          {fundraiserTypes.map((t) => (
            <button key={t.id} type="button" className="chip" aria-pressed={type === t.id} onClick={() => setType(t.id)}>{t.label}</button>
          ))}
        </div>
        <div className="flex gap-3">
          <label className="relative flex-1">
            <span className="sr-only">Search fundraisers</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2" aria-hidden="true" />
            <input className="input rounded-full pl-10" placeholder="Search name or city" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <label>
            <span className="sr-only">Sort</span>
            <select className="input rounded-full" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="trending">Most supporters</option>
              <option value="closest">Closest to goal</option>
              <option value="newest">Ending latest</option>
            </select>
          </label>
        </div>
      </div>
      <p className="mt-6 text-sm font-semibold" aria-live="polite">{list.length} fundraiser{list.length === 1 ? "" : "s"}</p>
      {list.length ? (
        <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {list.map((f) => <FundraiserCard key={f.slug} f={f} />)}
        </div>
      ) : (
        <div className="card mt-6 p-10 text-center">
          <p className="headline text-3xl">No pages match that yet.</p>
          <p className="mt-2">Be the first — it takes three minutes.</p>
          <Link href="/fundraisers/start" className="btn btn-magenta mt-6">Start a fundraiser</Link>
        </div>
      )}
    </div>
  );
}
