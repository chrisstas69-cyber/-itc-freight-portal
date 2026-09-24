import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Primary ITC GRP brand mark for marketing surfaces.
 * Swap `LOGO_SRC` later for a transparent PNG/SVG without touching call sites.
 */
const LOGO_SRC = "/brand/itc-grp-logo.png";
const LOGO_WIDTH = 306;
const LOGO_HEIGHT = 306;

type ItcGrpLogoProps = {
  className?: string;
  priority?: boolean;
  alt?: string;
};

export function ItcGrpLogo({
  className,
  priority = false,
  alt = "ITC GRP",
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
