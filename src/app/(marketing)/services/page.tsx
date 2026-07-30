import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Air (IATA/TSA IAC), ocean (FMC# 3887), customs brokerage, Bonded CFS, and truck/rail — 100% in-house from East Rockaway.",
};

export default function ServicesIndexPage() {
  return (
    <article>
      <header className="border-b border-line bg-obsidian">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <p className="section-label">Services</p>
          <h1 className="display-title mt-4 text-[2rem] md:text-[2.5rem]">
            Import services
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fog">
            Air, ocean, vessel and aircraft chartering, truck, and rail —
            brokerage and Bonded CFS under one in-house East Rockaway desk. U.S.
            and Europe freight connections.
          </p>
        </div>
      </header>
      <section className="bg-ink">
        <div className="mx-auto max-w-7xl divide-y divide-line border-b border-line px-5 md:px-8">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="grid gap-2 py-7 transition-colors hover:bg-panel/40 focus-ring md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <h2 className="text-[1.125rem] font-medium text-snow md:col-span-4">
                {service.navLabel}
              </h2>
              <p className="text-[14px] leading-relaxed text-fog md:col-span-7">
                {service.teaser}
              </p>
              <span className="text-[12px] text-steel md:col-span-1 md:text-right">
                View
              </span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
