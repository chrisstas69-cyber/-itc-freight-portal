"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import type { ServicePage } from "@/lib/content/services";
import { cn } from "@/lib/utils";

type HomeServicesSectionProps = {
  services: ServicePage[];
};

export function HomeServicesSection({ services }: HomeServicesSectionProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const titleId = useId();
  const active = services.find((s) => s.slug === activeSlug) ?? null;
  const standard = services.filter((s) => !s.featured);
  const featured = services.filter((s) => s.featured);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveSlug(null);
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
    <section className="border-b border-line bg-panel">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-label">Services</p>
            <h2 className="display-title mt-3 text-[1.5rem] md:text-[1.75rem]">
              Capabilities across the import path
            </h2>
            <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-mist">
              Air, ocean, customs, CFS, inland transport, and specialized military
              operations — door-to-door worldwide under one desk.
            </p>
          </div>
          <Link
            href="/services"
            className="text-[13px] text-steel transition-colors hover:text-snow focus-ring"
          >
            All services →
          </Link>
        </div>

        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {standard.map((service) => (
            <button
              key={service.slug}
              type="button"
              onClick={() => setActiveSlug(service.slug)}
              className="group flex flex-col bg-panel p-5 text-left transition-colors hover:bg-panel-elevated focus-ring hairline-top"
            >
              <h3 className="text-[14px] font-medium tracking-tight text-snow group-hover:text-gold">
                {service.homeLabel}
              </h3>
              <p className="mt-2 flex-1 text-[12px] leading-relaxed text-mist">
                {service.teaser}
              </p>
              <span className="mt-4 text-[11px] tracking-wide text-steel uppercase">
                Overview
              </span>
            </button>
          ))}
        </div>

        {featured.map((service) => (
          <button
            key={service.slug}
            type="button"
            onClick={() => setActiveSlug(service.slug)}
            className="mt-px flex w-full flex-col gap-4 border border-t-0 border-line bg-obsidian px-6 py-8 text-left transition-colors hover:bg-panel focus-ring hairline-top md:flex-row md:items-end md:justify-between md:px-8 md:py-10"
          >
            <div className="max-w-3xl">
              <p className="section-label text-gold">Specialized division</p>
              <h3 className="display-title mt-3 text-[1.5rem] md:text-[1.875rem]">
                {service.homeLabel}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-fog md:text-[15px]">
                {service.teaser}
              </p>
            </div>
            <span className="inline-flex h-10 shrink-0 items-center border border-gold/50 bg-gold/10 px-5 text-[12px] font-medium tracking-wide text-gold uppercase">
              Open overview
            </span>
          </button>
        ))}
      </div>

      {active ? (
        <ServiceOverviewModal
          service={active}
          titleId={titleId}
          expanded={Boolean(active.featured)}
          onClose={() => setActiveSlug(null)}
        />
      ) : null}
    </section>
  );
}

function ServiceOverviewModal({
  service,
  titleId,
  expanded,
  onClose,
}: {
  service: ServicePage;
  titleId: string;
  expanded: boolean;
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
        className={cn(
          "relative z-10 flex max-h-[92dvh] w-full flex-col border border-line bg-panel shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
          expanded ? "sm:max-w-3xl" : "sm:max-w-xl",
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
          <div>
            {service.featured ? (
              <p className="section-label">Specialized division</p>
            ) : (
              <p className="section-label">Service overview</p>
            )}
            <h2
              id={titleId}
              className={cn(
                "display-title mt-2 text-snow",
                expanded ? "text-[1.5rem] md:text-[1.75rem]" : "text-[1.25rem]",
              )}
            >
              {service.title}
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
          <p className="text-[14px] leading-relaxed text-fog md:text-[15px]">
            {service.overview}
          </p>

          {service.featured ? (
            <div className="mt-6 border border-gold/30 bg-gold/5 px-4 py-4">
              <p className="meta-label text-gold">Program focus</p>
              <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-fog">
                <li>FMS (Foreign Military Sales) program</li>
                <li>Department of Defense cargo handling</li>
                <li>U.S. Department of State license and ITAR regulations compliance</li>
                <li>ILCS data transfer by TCN and multi-pack TCNs</li>
              </ul>
            </div>
          ) : null}

          <div className={cn("mt-6", expanded && "md:grid md:grid-cols-2 md:gap-8")}>
            <div>
              <h3 className="meta-label">What we handle</h3>
              <ul className="mt-3 space-y-2.5">
                {service.handles.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line pb-2.5 text-[13px] leading-relaxed text-fog last:border-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={cn(expanded ? "mt-6 md:mt-0" : "mt-6")}>
              <h3 className="meta-label">Credentials</h3>
              <ul className="mt-3 space-y-2.5">
                {service.credentials.map((item) => (
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
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex h-10 items-center bg-steel px-5 text-[13px] font-medium text-white hover:bg-steel-bright focus-ring"
            onClick={onClose}
          >
            View full page
          </Link>
        </div>
      </div>
    </div>
  );
}
