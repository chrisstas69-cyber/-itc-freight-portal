import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Primary ITC Group brand mark (wing emblem).
 * Pair with "ITC Group" wordmark text in the header.
 */
const LOGO_SRC = "/brand/itc-group-mark.png";
const LOGO_WIDTH = 233;
const LOGO_HEIGHT = 140;

type ItcGrpLogoProps = {
  className?: string;
  priority?: boolean;
  alt?: string;
};

export function ItcGrpLogo({
  className,
  priority = false,
  alt = "ITC Group",
}: ItcGrpLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt={alt}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}
