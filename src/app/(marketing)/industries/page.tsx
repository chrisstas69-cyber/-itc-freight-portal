import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Import programs that need customs brokerage and bonded CFS handling.",
};

const INDUSTRIES = [
  {
    name: "Military",
    detail:
      "Priority air imports with documentation control and chain-of-custody awareness through U.S. entry.",
  },
  {
    name: "Apparel",
    detail:
      "Seasonal ocean containers and rush air allocations aligned to retail DC windows.",
  },
  {
    name: "Food & Beverage",
    detail:
      "Bonded staging at our Bonded CFS and temperature-aware domestic trucking to DCs.",
  },
  {
    name: "Medical Devices",
    detail:
      "Controlled air freight with customs brokerage readiness for regulated classes and POD discipline.",
  },
  {
    name: "Retail",
    detail:
      "Replenishment ocean programs, cargo release coordination, and outbound handoffs to regional DCs.",
  },
];

export default function IndustriesPage() {
  return (
    <article>
      <header className="border-b border-line bg-obsidian">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <p className="section-label">Industries</p>
          <h1 className="display-title mt-4 max-w-2xl text-[2rem] md:text-[2.5rem]">
            Programs that need brokerage and bonded handling
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fog">
            Customs brokerage, Bonded CFS staging, and forwarding applied against
            customer SOPs — with import clearance visibility in the portal.
          </p>
        </div>
      </header>

      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
          <div className="divide-y divide-line border-y border-line">
            {INDUSTRIES.map((industry) => (
              <div
                key={industry.name}
                className="grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-8 md:py-7"
              >
                <h2 className="text-[1.25rem] font-medium tracking-tight text-snow md:col-span-3">
                  {industry.name}
                </h2>
                <p className="text-[14px] leading-relaxed text-fog md:col-span-9">
                  {industry.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
