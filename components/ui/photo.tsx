import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Aspect-locked image (no layout shift). `duotone` applies the brand colour treatment;
 * `cut` applies an angled cut-out frame.
 */
export function Photo({
  src,
  alt,
  ratio = "4/5",
  duotone,
  cut,
  className,
  imgClassName,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  children,
}: {
  src: string;
  alt: string;
  ratio?: string;
  duotone?: "magenta" | "tangerine" | "plum";
  cut?: "a" | "b" | "c";
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        !duotone && "bg-cream-2",
        duotone && "duotone",
        duotone === "tangerine" && "duotone-tangerine",
        duotone === "plum" && "duotone-plum",
        cut && `cut-${cut}`,
        className
      )}
      style={{ aspectRatio: ratio }}
    >
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={cn("object-cover", imgClassName)} />
      {children}
    </div>
  );
}
