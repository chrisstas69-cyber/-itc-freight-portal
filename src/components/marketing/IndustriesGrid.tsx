"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import type { IndustryPage } from "@/lib/content/industries";
import { cn } from "@/lib/utils";

type IndustriesGridProps = {
  industries: IndustryPage[];
};

export function IndustriesGrid({ industries }: IndustriesGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const titleId = useId();
  const active = industries.find((i) => i.id === activeId) ?? null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        {industries.map((industry) => (
          <li key={industry.id} className="flex">
            <button
              type="button"
              onClick={() => setActiveId(industry.id)}
              className={cn(
                "group flex h-full w-full flex-col overflow-hidden border bg-panel text-left transition-colors focus-ring",
                industry.featured
                  ? "border-gold/50 hover:border-gold/80"
                  : "border-line hover:border-gold/40",
              )}
            >
              <div className="relative h-52 shrink-0 md:h-56">
                <Image
                  src={industry.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/40 to-black/20" />
                <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
                  {industry.badge ? (
                    <p
                      className={cn(
                        "section-label",
                        industry.featured ? "text-gold" : "text-[#c4a86a]",
                      )}
                    >
                      {industry.badge}
                    </p>
                  ) : null}
                  <h2 className="display-title mt-2 text-[1.35rem] text-white md:text-[1.5rem]">
                    {industry.name}
                  </h2>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-6 py-6 md:py-7">
                <p className="text-[14px] leading-relaxed text-fog md:min-h-[4.5rem]">
                  {industry.teaser}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {industry.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-[13px] leading-snug text-snow/90"
                    >
                      <span
                        className={cn(
                          "mt-1.5 size-1.5 shrink-0 rounded-full",
                          industry.featured ? "bg-gold" : "bg-[#f0c040]/80",
                        )}
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <span
                  className={cn(
                    "mt-6 inline-flex h-10 w-fit items-center border px-4 text-[12px] font-medium tracking-wide uppercase transition-colors",
                    industry.featured
                      ? "border-gold/50 bg-gold/10 text-gold group-hover:border-gold group-hover:bg-gold/15"
                      : "border-line text-fog group-hover:border-gold/50 group-hover:text-gold",
                  )}
                >
                  Open overview
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <IndustryOverviewModal
          industry={active}
          titleId={titleId}
          onClose={() => setActiveId(null)}
        />
      ) : null}
    </>
  );
}

function IndustryOverviewModal({
  industry,
  titleId,
  onClose,
}: {
  industry: IndustryPage;
  titleId: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close overview"
        className="absolute inset-0 bg-obsidian/75 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[92dvh] w-full flex-col border border-line bg-panel shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:max-w-3xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
          <div>
            <p
              className={cn(
                "section-label",
                industry.featured ? "text-gold" : undefined,
              )}
            >
              {industry.badge ?? "Industry overview"}
            </p>
            <h2
              id={titleId}
              className="display-title mt-2 text-[1.5rem] text-snow md:text-[1.75rem]"
            >
              {industry.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-1 inline-flex h-8 w-8 items-center justify-center border border-line text-[16px] text-fog hover:text-snow focus-ring"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 md:px-6 md:py-6">
          <div className="relative mb-6 h-40 overflow-hidden border border-line md:h-48">
            <Image
              src={industry.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 48rem"
              className="object-cover"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-t from-panel/90 to-transparent" />
          </div>

          <p className="text-[14px] leading-relaxed text-fog md:text-[15px]">
            {industry.overview}
          </p>

          <div
            className={cn(
              "mt-6 border px-4 py-4",
              industry.featured
                ? "border-gold/30 bg-gold/5"
                : "border-line bg-ink/30",
            )}
          >
            <p
              className={cn(
                "meta-label",
                industry.featured ? "text-gold" : undefined,
              )}
            >
              Program focus
            </p>
            <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-fog">
              {industry.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="meta-label">What we handle</h3>
              <ul className="mt-3 space-y-2.5">
                {industry.handles.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line pb-2.5 text-[13px] leading-relaxed text-fog last:border-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 md:mt-0">
              <h3 className="meta-label">Key capabilities</h3>
              <ul className="mt-3 space-y-2.5">
                {industry.highlights.map((item) => (
                  <li
                    key={item}
                    className="border border-line bg-ink/30 px-3 py-2.5 text-[13px] leading-relaxed text-snow"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 md:px-6">
          <button
            type="button"
            onClick={onClose}
            className="text-[13px] text-fog hover:text-snow focus-ring"
          >
            Close
          </button>
          <div className="flex flex-wrap gap-2">
            {industry.relatedHref ? (
              <Link
                href={industry.relatedHref}
                className="inline-flex h-10 items-center border border-line px-5 text-[13px] text-fog hover:text-snow focus-ring"
                onClick={onClose}
              >
                {industry.relatedLabel ?? "Related service"}
              </Link>
            ) : null}
            <Link
              href="/contact#quote"
              className="inline-flex h-10 items-center bg-[#f0c040] px-5 text-[13px] font-semibold text-black hover:bg-[#ffd45a] focus-ring"
              onClick={onClose}
            >
              Discuss your program
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
