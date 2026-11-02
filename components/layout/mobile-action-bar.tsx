"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, PenLine } from "lucide-react";

/** Sticky mobile CTA bar. Hidden on the donate flow itself. */
export function MobileActionBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/donate")) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-plum bg-cream/95 p-2.5 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2.5">
        <Link href="/petitions" className="btn btn-sm btn-outline w-full"><PenLine className="size-4" /> Sign</Link>
        <Link href="/donate" className="btn btn-sm btn-magenta w-full"><Heart className="size-4 fill-current" /> Donate</Link>
      </div>
    </div>
  );
}
