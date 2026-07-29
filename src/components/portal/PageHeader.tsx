import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PortalPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: ReactNode;
  className?: string;
};

export function PortalPageHeader({
  eyebrow,
  title,
  description,
  meta,
  className,
}: PortalPageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5 border-b border-line pb-7 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0 max-w-3xl">
        {eyebrow ? <p className="section-label">{eyebrow}</p> : null}
        <h1 className="mt-2 display-title text-[1.625rem] sm:text-[1.875rem]">{title}</h1>
        {description ? (
          <p className="mt-2.5 text-[13px] leading-relaxed text-mist sm:text-[14px]">
            {description}
          </p>
        ) : null}
      </div>
      {meta ? <div className="shrink-0 sm:pb-0.5 sm:text-right">{meta}</div> : null}
    </header>
  );
}
