import Image from "next/image";
import Link from "next/link";
import { TrackingBar } from "@/components/marketing/TrackingBar";
import { Button } from "@/components/ui/Button";

const HERO_CREDENTIALS = [
  { label: "Facility", value: "Bonded CFS" },
  { label: "Brokerage", value: "Formal entry" },
  { label: "Gateways", value: "JFK · EWR" },
];

const CORRIDOR_NODES = [
  { code: "Port", note: "Entry" },
  { code: "ERK", note: "Bonded CFS" },
  { code: "Release", note: "Outbound" },
];

export function HomeHero() {
  return (
    <section className="hero-brand relative min-h-[92svh] overflow-hidden border-b border-white/10 md:min-h-[100svh]">
      <Image
        src="/images/hero-port-v6.jpg"
        alt="Ocean container vessel under way — global freight at scale"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_42%]"
      />
      {/* Left-weighted scrim so copy sits on calm water/sky; image opens on the right */}
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,8,12,0.94)_0%,rgba(6,8,12,0.82)_34%,rgba(6,8,12,0.45)_58%,rgba(6,8,12,0.22)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,12,0.45)_0%,transparent_28%,transparent_62%,rgba(6,8,12,0.72)_100%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[92svh] max-w-7xl flex-col md:min-h-[100svh]">
        <div className="flex flex-1 flex-col justify-end px-5 pb-10 pt-28 md:justify-center md:px-8 md:pb-8 md:pt-32 lg:max-w-[34rem]">
          <p className="section-label fade-rise text-[#c4a86a]">
            Ikaros Transport Corporation · Est. 1984
          </p>

          <h1 className="hero-display fade-rise-delay mt-7 max-w-[11ch] text-[3rem] text-white sm:text-[3.75rem] md:text-[4.25rem] lg:text-[4.75rem]">
            Entry. Bond. Release.
          </h1>

          <p className="fade-rise-late mt-6 max-w-[22rem] text-[15px] leading-relaxed text-white/70">
            Licensed customs brokerage and a US Customs Bonded Facility — Bonded CFS
            at East Rockaway — with freight that follows the clearance record.
          </p>

          <div className="fade-rise-late mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/#quote"
              className="inline-flex h-11 items-center bg-[#4a7fa5] px-6 text-[13px] font-medium tracking-[0.02em] text-white transition-colors hover:bg-[#6a9fc0] focus-ring"
            >
              Request a quote
            </Link>
            <Link
              href="/login"
              className="inline-flex h-11 items-center border border-white/25 px-5 text-[13px] text-white/80 transition-colors hover:border-white/45 hover:text-white focus-ring"
            >
              Clearance visibility
            </Link>
          </div>

          <div className="fade-rise-late mt-10 max-w-md">
            <p className="mb-3 text-[10px] tracking-[0.14em] text-white/45 uppercase">
              Track a shipment
            </p>
            <TrackingBar variant="hero" />
          </div>
        </div>

        {/* Bottom edge: credential strip + subtle corridor line — no floating chart box */}
        <div className="fade-rise-late relative z-10 border-t border-white/10 bg-black/25 px-5 py-5 backdrop-blur-[2px] md:px-8 md:py-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <dl className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12">
              {HERO_CREDENTIALS.map((item) => (
                <div key={item.label}>
                  <dt className="text-[10px] tracking-[0.14em] text-white/45 uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-[13px] font-medium tracking-tight text-white sm:text-[14px]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div
              className="hidden items-center gap-0 md:flex"
              aria-label="Clearance corridor"
            >
              {CORRIDOR_NODES.map((node, i) => (
                <div key={node.code} className="flex items-center">
                  <div className="px-1 text-center">
                    <p
                      className={`mono-ref text-[11px] ${
                        i === 1 ? "text-[#c4a86a]" : "text-white/85"
                      }`}
                    >
                      {node.code}
                    </p>
                    <p className="mt-0.5 text-[9px] tracking-[0.1em] text-white/40 uppercase">
                      {node.note}
                    </p>
                  </div>
                  {i < CORRIDOR_NODES.length - 1 ? (
                    <span
                      className="mx-3 h-px w-10 bg-gradient-to-r from-white/35 to-white/10 lg:w-14"
                      aria-hidden
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const items = [
    { value: "1984", label: "Operating since" },
    { value: "Bonded CFS", label: "US Customs Bonded Facility" },
    { value: "Formal entry", label: "Customs brokerage" },
    { value: "JFK · EWR", label: "Primary gateways" },
  ];

  return (
    <section
      className="border-b border-line bg-panel"
      aria-label="Operational credentials"
    >
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row md:items-stretch">
        <div className="flex shrink-0 items-center border-b border-line px-5 py-5 md:w-44 md:border-r md:border-b-0 md:px-8">
          <span className="section-label">Credentials</span>
        </div>
        <div className="grid flex-1 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`border-b border-line px-5 py-7 sm:px-6 lg:border-b-0 ${
                i > 0 ? "lg:border-l lg:border-line" : ""
              } ${i % 2 === 1 ? "sm:border-l sm:border-line" : ""} ${
                i >= 2 ? "sm:border-t sm:border-line lg:border-t-0" : ""
              }`}
            >
              <p className="text-[1.125rem] font-medium tracking-tight text-snow">
                {item.value}
              </p>
              <p className="mt-1.5 text-[11px] tracking-[0.1em] text-mist uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    num: "01",
    title: "Customs brokerage",
    body: "Formal entry, ISF, HTS support, and exam response at U.S. ports.",
    scope: "7501 · ISF · ABI",
    featured: false,
  },
  {
    num: "02",
    title: "US Customs Bonded Facility",
    body: "Bonded CFS at East Rockaway for bonded staging and cargo release against entry status — before outbound dispatch.",
    scope: "Bonded CFS · Staging · Release",
    featured: true,
  },
  {
    num: "03",
    title: "Domestic forwarding",
    body: "Drayage, linehaul, and last-mile after release from bonded staging.",
    scope: "Dray · Linehaul · Last mile",
    featured: false,
  },
  {
    num: "04",
    title: "International forwarding",
    body: "Air and ocean with document control and clearance visibility on one record.",
    scope: "Air · Ocean · Door-to-door",
    featured: false,
  },
];

export function ServicesSection() {
  const featured = SERVICES.find((s) => s.featured)!;
  const others = SERVICES.filter((s) => !s.featured);

  return (
    <section id="services" className="border-b border-line bg-ink">
      <div className="mx-auto max-w-7xl px-5 section-pad md:px-8">
        <div className="grid gap-4 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-5">
            <p className="section-label">Import services</p>
            <h2 className="display-title mt-4 text-[1.875rem] md:text-[2.25rem]">
              Brokerage and bonded CFS — not forwarding alone
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-relaxed text-fog md:col-span-6 md:col-start-7 md:pb-1">
            Entry filing, bonded staging, cargo release, and onward movement share
            one operations desk in East Rockaway.
          </p>
        </div>

        <article className="relative mt-14 overflow-hidden border border-line bg-panel md:mt-16">
          <div className="absolute top-0 left-0 h-full w-[3px] bg-gold" aria-hidden />
          <div className="grid md:grid-cols-12">
            <div className="relative min-h-[200px] border-b border-line md:col-span-5 md:min-h-[280px] md:border-r md:border-b-0">
              <Image
                src="/images/ops-warehouse.jpg"
                alt="Bonded warehouse staging and cargo handling"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="mono-ref text-[12px] text-[#c4a86a]">{featured.num}</p>
                <p className="mt-2 text-[12px] tracking-[0.12em] text-white/70 uppercase">
                  Bonded CFS
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-6 py-8 md:col-span-7 md:px-10 md:py-12">
              <h3 className="text-[1.375rem] font-medium leading-snug tracking-tight text-snow md:text-[1.5rem]">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog">
                {featured.body}
              </p>
              <p className="mt-8 mono-ref text-[12px] text-mist">{featured.scope}</p>
            </div>
          </div>
        </article>

        <div className="mt-8 grid gap-8 border-t border-line pt-10 md:grid-cols-3 md:gap-10">
          {others.map((service) => (
            <article key={service.num} className="min-w-0">
              <p className="mono-ref text-[11px] text-mist">{service.num}</p>
              <h3 className="mt-4 text-[1.0625rem] font-medium tracking-tight text-snow">
                {service.title}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-fog">{service.body}</p>
              <p className="mt-5 text-[11px] tracking-[0.1em] text-mist uppercase">
                {service.scope}
              </p>
            </article>
          ))}
        </div>

        <Link
          href="/#quote"
          className="mt-10 inline-flex text-[13px] text-steel transition-colors hover:text-snow focus-ring"
        >
          Request a quote for your lane →
        </Link>
      </div>
    </section>
  );
}

export function FacilitySection() {
  return (
    <section id="facility" className="border-b border-line bg-panel">
      <div className="mx-auto grid max-w-7xl md:grid-cols-12">
        <div className="flex flex-col justify-center px-5 py-16 md:col-span-5 md:px-8 md:py-20 lg:col-span-5 lg:pr-12">
          <p className="section-label">US Customs Bonded Facility</p>
          <h2 className="display-title mt-4 text-[1.875rem] md:text-[2.25rem]">
            Bonded CFS at Ocean Avenue
          </h2>
          <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-fog">
            A working Bonded CFS — not a sales office. Cargo under bond, staged
            against entry, released before outbound trucking.
          </p>

          <dl className="mt-10 space-y-5">
            {[
              ["Address", "500 Ocean Avenue, East Rockaway, NY 11518"],
              ["Type", "US Customs Bonded Facility · Bonded CFS"],
              ["Gateways", "JFK · Newark · NY metro"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="meta-label">{k}</dt>
                <dd className="mt-1.5 text-[14px] text-snow">{v}</dd>
              </div>
            ))}
          </dl>

          <ol className="mt-12 space-y-0 border-t border-line">
            {[
              { step: "01", title: "Formal entry" },
              { step: "02", title: "Bonded staging" },
              { step: "03", title: "Cargo release" },
            ].map((item, i) => (
              <li
                key={item.step}
                className={`flex items-baseline gap-4 py-3.5 ${
                  i > 0 ? "border-t border-line" : ""
                }`}
              >
                <span className="mono-ref text-[12px] text-gold">{item.step}</span>
                <span className="text-[15px] font-medium tracking-tight text-snow">
                  {item.title}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative min-h-[320px] md:col-span-7 md:min-h-[560px] lg:col-span-7">
          <Image
            src="/images/facility-warehouse.jpg"
            alt="Warehouse floor operations at a bonded container freight station"
            fill
            sizes="(max-width: 768px) 100vw, 58vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent md:from-black/10" />
          <div className="absolute right-5 bottom-5 left-5 border border-white/20 bg-black/55 px-4 py-3 backdrop-blur-sm md:right-8 md:bottom-8 md:left-auto md:max-w-xs">
            <p className="text-[10px] tracking-[0.14em] text-white/55 uppercase">
              East Rockaway, NY
            </p>
            <p className="mt-1 text-[14px] font-medium text-white">
              500 Ocean Avenue · Bonded CFS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OperationsStrip() {
  const shots = [
    {
      src: "/images/ops-containers.jpg",
      label: "Ocean programs",
      caption: "Container control through entry",
    },
    {
      src: "/images/ops-warehouse.jpg",
      label: "Bonded staging",
      caption: "CFS hold against clearance",
    },
    {
      src: "/images/ops-truck.jpg",
      label: "Outbound release",
      caption: "Dray and metro delivery",
    },
  ];

  return (
    <section className="border-b border-line bg-obsidian" aria-label="Operations">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <p className="section-label">On the ground</p>
          <p className="hidden text-[12px] text-mist sm:block">
            Port · Bonded CFS · Outbound
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {shots.map((shot) => (
            <figure key={shot.label} className="group relative aspect-[4/3] overflow-hidden">
              <Image
                src={shot.src}
                alt={shot.caption}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <figcaption className="absolute right-0 bottom-0 left-0 p-4">
                <p className="text-[11px] tracking-[0.12em] text-white/55 uppercase">
                  {shot.label}
                </p>
                <p className="mt-1 text-[14px] font-medium text-white">{shot.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const INDUSTRIES = [
  {
    name: "Military",
    code: "MIL",
    detail: "Priority air with documentation control through U.S. entry.",
  },
  {
    name: "Apparel",
    code: "APR",
    detail: "Seasonal ocean and rush air to retail DC windows.",
  },
  {
    name: "Food & Beverage",
    code: "F&B",
    detail: "Bonded CFS staging and temperature-aware trucking.",
  },
  {
    name: "Medical Devices",
    code: "MED",
    detail: "Controlled air with brokerage readiness for regulated classes.",
  },
  {
    name: "Retail",
    code: "RTL",
    detail: "Replenishment ocean, release coordination, DC handoffs.",
  },
];

export function IndustriesSection() {
  return (
    <section id="industries" className="border-b border-line bg-ink">
      <div className="mx-auto max-w-7xl px-5 section-pad md:px-8">
        <div className="max-w-xl">
          <p className="section-label">Industries served</p>
          <h2 className="display-title mt-4 text-[1.875rem] md:text-[2.25rem]">
            Programs that need brokerage and bonded handling
          </h2>
        </div>

        <div className="mt-14 divide-y divide-line border-y border-line">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.name}
              className="grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-8 md:py-7"
            >
              <p className="mono-ref text-[12px] text-mist md:col-span-1">
                {industry.code}
              </p>
              <h3 className="text-[1.25rem] font-medium tracking-tight text-snow md:col-span-3">
                {industry.name}
              </h3>
              <p className="text-[14px] leading-relaxed text-fog md:col-span-8">
                {industry.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QuoteAndPortalCTA() {
  return (
    <section id="quote" className="bg-panel">
      <div className="mx-auto grid max-w-7xl md:grid-cols-2">
        <div className="border-b border-line px-5 py-16 md:border-r md:border-b-0 md:px-8 md:py-20 lg:py-24">
          <p className="section-label">Request a quote</p>
          <h2 className="display-title mt-4 text-[1.5rem] md:text-[1.75rem]">
            Price brokerage, bonded CFS, and freight together
          </h2>
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-fog">
            Origin, destination, mode, commodity, pieces or weight, and target ETA.
          </p>
          <form className="mt-9 grid max-w-md gap-3">
            <input
              type="email"
              required
              placeholder="Work email"
              className="h-10 border border-line bg-ink px-3 text-[13px] text-snow placeholder:text-mist/55 focus-ring focus:border-steel"
            />
            <input
              type="text"
              required
              placeholder="Origin → Destination"
              className="h-10 border border-line bg-ink px-3 text-[13px] text-snow placeholder:text-mist/55 focus-ring focus:border-steel"
            />
            <textarea
              required
              rows={3}
              placeholder="Commodity, pieces/weight, Incoterms, target ETA"
              className="border border-line bg-ink px-3 py-2.5 text-[13px] text-snow placeholder:text-mist/55 focus-ring focus:border-steel"
            />
            <Button type="submit" className="mt-1 w-fit" size="md">
              Submit quote request
            </Button>
          </form>
        </div>

        <div className="relative overflow-hidden px-5 py-16 md:px-8 md:py-20 lg:py-24">
          <Image
            src="/images/ops-containers.jpg"
            alt=""
            fill
            sizes="50vw"
            className="object-cover opacity-[0.12]"
            aria-hidden
          />
          <div className="relative">
            <p className="section-label">Import clearance visibility</p>
            <h2 className="display-title mt-4 text-[1.5rem] md:text-[1.75rem]">
              Status, documents, and invoices — one record
            </h2>
            <p className="mt-4 max-w-md text-[13px] leading-relaxed text-fog">
              Clearance milestones, bonded CFS events, entry files, and freight
              invoices on the shipment ID your team already tracks.
            </p>
            <dl className="mt-9 space-y-0 border border-line bg-panel/80 hairline-top">
              {[
                ["Clearance", "Entry · exam · hold"],
                ["Bonded CFS", "Staging · release"],
                ["Vault", "Docs · invoices"],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className={`grid grid-cols-[7rem_1fr] gap-3 px-4 py-3.5 text-[13px] ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <dt className="text-mist">{k}</dt>
                  <dd className="text-fog">{v}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/login"
              className="mt-9 inline-flex h-10 items-center bg-steel px-5 text-[13px] font-medium tracking-[0.02em] text-white transition-colors hover:bg-steel-bright focus-ring"
            >
              Request portal access
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
