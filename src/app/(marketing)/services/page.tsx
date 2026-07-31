import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Air, ocean, customs brokerage, Bonded CFS, inland transport, and specialized Military Operations — worldwide freight logistics under one desk.",
};

export default function ServicesIndexPage() {
  const standard = SERVICES.filter((s) => !s.featured);
  const featured = SERVICES.filter((s) => s.featured);

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
            brokerage and Bonded CFS under one accountable desk, with an agency
            network moving cargo door-to-door worldwide — plus a specialized
            Military Operations division.
          </p>
        </div>
      </header>

      {featured.map((service) => (
        <section key={service.slug} className="border-b border-line bg-panel">
          <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
            <Link
              href={`/services/${service.slug}`}
              className="block border border-gold/40 bg-obsidian px-6 py-8 transition-colors hover:border-gold/70 focus-ring hairline-top md:px-8 md:py-10"
            >
              <p className="section-label text-gold">Specialized division</p>
              <h2 className="display-title mt-3 text-[1.5rem] md:text-[1.875rem]">
                {service.title}
              </h2>
              <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-fog">
                {service.teaser}
              </p>
              <span className="mt-6 inline-flex text-[12px] tracking-wide text-steel uppercase">
                View division →
              </span>
            </Link>
          </div>
        </section>
      ))}

      <section className="bg-ink">
        <div className="mx-auto max-w-7xl divide-y divide-line border-b border-line px-5 md:px-8">
          {standard.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="grid gap-2 py-7 transition-colors hover:bg-panel/40 focus-ring md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <h2 className="text-[1.125rem] font-medium text-snow md:col-span-4">
                {service.homeLabel}
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
