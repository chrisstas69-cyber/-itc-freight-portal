import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
    image: "/images/hero-port-v5.jpg",
  },
  {
    name: "Apparel",
    detail:
      "Seasonal ocean containers and rush air allocations aligned to retail DC windows.",
    image: "/images/ops-containers.jpg",
  },
  {
    name: "Food & Beverage",
    detail:
      "Bonded staging at our Bonded CFS and temperature-aware domestic trucking to DCs.",
    image: "/images/ops-warehouse.jpg",
  },
  {
    name: "Medical Devices",
    detail:
      "Controlled air freight with customs brokerage readiness for regulated classes and POD discipline.",
    image: "/images/hero-port.jpg",
  },
  {
    name: "Retail",
    detail:
      "Replenishment ocean programs, cargo release coordination, and outbound handoffs to regional DCs.",
    image: "/images/ops-truck.jpg",
  },
];

export default function IndustriesPage() {
  return (
    <article>
      <header className="hero-brand relative min-h-[26rem] overflow-hidden border-b border-white/10 md:min-h-[32rem]">
        <Image
          src="/images/ops-containers.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(6,8,12,0.94)_0%,rgba(6,8,12,0.78)_48%,rgba(6,8,12,0.4)_100%)]"
          aria-hidden
        />
        <div className="absolute top-0 left-0 h-full w-1 bg-steel" aria-hidden />
        <div className="relative mx-auto flex min-h-[26rem] max-w-7xl flex-col justify-end px-5 py-16 md:min-h-[32rem] md:justify-center md:px-8 md:py-24 lg:max-w-[40rem]">
          <p className="section-label text-[#c4a86a]">Industries</p>
          <h1 className="hero-display mt-5 max-w-[18ch] text-[2.25rem] !text-white md:text-[3rem]">
            Programs that need brokerage and bonded handling
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
            Customs brokerage, Bonded CFS staging, and forwarding applied against
            customer SOPs — with import clearance visibility in the portal.
          </p>
        </div>
      </header>

      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <ul className="grid gap-6 md:grid-cols-2">
            {INDUSTRIES.map((industry) => (
              <li
                key={industry.name}
                className="overflow-hidden border border-line bg-panel"
              >
                <div className="relative h-40">
                  <Image
                    src={industry.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent" />
                </div>
                <div className="px-6 py-7">
                  <h2 className="text-[1.25rem] font-medium tracking-tight text-snow">
                    {industry.name}
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-fog">
                    {industry.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-16 flex justify-start">
            <Link
              href="/contact#quote"
              className="inline-flex h-11 items-center bg-steel px-6 text-[13px] font-medium text-white hover:bg-steel-bright focus-ring"
            >
              Discuss your program
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
