"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Heart, LifeBuoy, Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { menuGroups, primaryNav } from "@/mock/navigation";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <div className="bg-plum text-cream on-dark">
        <div className="container-x flex min-h-[40px] items-center justify-between gap-4 py-1.5 text-[0.82rem]">
          <p className="flex items-center gap-2">
            <Phone className="size-3.5 text-tangerine" aria-hidden="true" />
            <span className="hidden sm:inline">Need help now? Free, confidential, 24/7:</span>
            <a href={`tel:${siteConfig.help.helpline.replace(/\s/g, "")}`} className="font-bold underline decoration-tangerine decoration-2 underline-offset-2">
              {siteConfig.help.helpline}
            </a>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/get-help" className="font-semibold hover:text-tangerine">Get help</Link>
            <Link href="/partner" className="hidden font-semibold hover:text-tangerine md:inline">For funders</Link>
            <Link href="/transparency" className="hidden font-semibold hover:text-tangerine md:inline">Financials</Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b-[3px] border-plum bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85">
        <div className="container-x flex h-[76px] items-center justify-between gap-3 sm:gap-6">
          <Logo />
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-[44px] items-center rounded-full px-3.5 font-semibold transition-colors hover:bg-blush",
                      isActive(n.href) && "bg-plum text-cream hover:bg-plum"
                    )}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link href="/get-help" className="btn btn-sm btn-outline hidden 2xl:inline-flex"><LifeBuoy className="size-4" /> Get help</Link>
            <Link href="/join" className="btn btn-sm btn-tangerine hidden md:inline-flex">Join</Link>
            <Link href="/donate" className="btn btn-sm btn-magenta hidden sm:inline-flex"><Heart className="size-4 fill-current" /> Donate</Link>
            <button
              type="button"
              className="btn btn-sm btn-plum xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
              <span>{open ? "Close" : "Menu"}</span>
            </button>
            <button
              type="button"
              className="btn btn-sm btn-plum hidden xl:inline-flex"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close full menu" : "Open full menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

      </header>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu" className="fixed inset-0 z-[60] overflow-y-auto bg-plum text-cream on-dark bg-dots-light">
          <div className="container-x flex h-[76px] items-center justify-between border-b-[3px] border-cream/20">
            <Logo dark />
            <button ref={closeRef} type="button" className="btn btn-sm btn-cream" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="size-5" /> Close
            </button>
          </div>
          <div className="container-x py-10">
            <div className="grid gap-10 md:grid-cols-3">
              {menuGroups.map((g) => (
                <div key={g.title}>
                  <p className="eyebrow mb-4">{g.title}</p>
                  <ul className="space-y-1">
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} onClick={() => setOpen(false)} className="headline block py-1.5 text-[1.7rem] hover:text-tangerine sm:text-3xl md:text-[2rem]">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-3 pb-24">
              <Link href="/donate" onClick={() => setOpen(false)} className="btn btn-lg btn-magenta"><Heart className="size-5 fill-current" /> Donate</Link>
              <Link href="/join" onClick={() => setOpen(false)} className="btn btn-lg btn-tangerine">Join the collective</Link>
              <Link href="/get-help" onClick={() => setOpen(false)} className="btn btn-lg btn-outline"><LifeBuoy className="size-5" /> Get help</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
