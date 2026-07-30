import Image from "next/image";
import Link from "next/link";
import type { ServicePage } from "@/lib/content/services";
import { cn } from "@/lib/utils";

const ACCENT_RAIL: Record<ServicePage["accent"], string> = {
  steel: "bg-steel",
  gold: "bg-gold",
  customs: "bg-status-customs",
  facility: "bg-gold-dim",
  ground: "bg-status-delivery",
  military: "bg-gold",
};

const ACCENT_ICON: Record<ServicePage["accent"], string> = {
  steel: "border-steel/40 text-steel-bright",
  gold: "border-gold/40 text-gold",
  customs: "border-status-customs/40 text-status-customs",
  facility: "border-gold-dim/50 text-gold",
  ground: "border-status-delivery/40 text-status-delivery",
  military: "border-gold/50 text-gold",
};

function ServiceGlyph({ icon }: { icon: ServicePage["icon"] }) {
  const common = "h-4 w-4";
  switch (icon) {
    case "air":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M3 12h18M14 6l7 6-7 6M10 9l-7 3 7 3" />
        </svg>
      );
    case "ocean":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M3 16c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0M4 12h16l-2-5H6l-2 5Z" />
        </svg>
      );
    case "customs":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M7 4h10v16H7zM10 8h4M10 12h4M10 16h3" />
        </svg>
      );
    case "cfs":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M3 10 12 4l9 6v10H3V10Z" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    case "drayage":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M3 15h11V8H3v7Zm11 0h4l3 3v-5h-7v2ZM6 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </svg>
      );
    case "military":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M12 3 4 7v4c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4Z" />
          <path d="M12 11v4M10 13h4" />
        </svg>
      );
  }
}

export function ServicePageView({ service }: { service: ServicePage }) {
  return (
    <article>
      {/* Hero — image + overlay, left copy */}
      <header className="hero-brand relative min-h-[28rem] overflow-hidden border-b border-white/10 md:min-h-[34rem]">
        <Image
          src={service.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,8,12,0.94)_0%,rgba(6,8,12,0.78)_48%,rgba(6,8,12,0.4)_100%)]"
          aria-hidden
        />
        <div className={cn("absolute top-0 left-0 h-full w-1", ACCENT_RAIL[service.accent])} aria-hidden />
        <div className="relative mx-auto flex min-h-[28rem] max-w-7xl flex-col justify-end px-5 py-16 md:min-h-[34rem] md:px-8 md:py-24 lg:max-w-[40rem] lg:justify-center">
          <p className="section-label text-[#c4a86a]">Services</p>
          <h1 className="hero-display mt-5 max-w-[18ch] text-[2.25rem] !text-white md:text-[3rem]">
            {service.title}
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
            {service.heroLine}
          </p>
          <div className="mt-10">
            <Link
              href="/contact#quote"
              className="inline-flex h-11 items-center bg-[#4a7fa5] px-6 text-[13px] font-medium text-white transition-colors hover:bg-[#6a9fc0] focus-ring"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </header>

      {/* Overview + credentials as one connected panel */}
      <section className="border-b border-line bg-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="overflow-hidden border border-line bg-panel">
            <div className="grid lg:grid-cols-12">
              <div className="relative min-h-[240px] lg:col-span-5 lg:min-h-full">
                <Image
                  src={service.overviewImage}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r" />
              </div>
              <div className="flex flex-col justify-between gap-10 p-7 md:p-10 lg:col-span-7 lg:p-12">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex size-9 items-center justify-center border",
                        ACCENT_ICON[service.accent],
                      )}
                    >
                      <ServiceGlyph icon={service.icon} />
                    </span>
                    <h2 className="display-title text-[1.375rem]">Overview</h2>
                  </div>
                  <p className="mt-5 text-[15px] leading-relaxed text-fog">
                    {service.overview}
                  </p>
                </div>
                <div className="border-t border-line pt-8">
                  <h3 className="meta-label text-fog">Credentials</h3>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {service.credentials.map((item) => (
                      <li
                        key={item}
                        className="border border-line bg-ink/40 px-4 py-3.5 text-[13px] leading-relaxed text-snow"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we handle — card grid */}
      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <h2 className="display-title text-[1.5rem] md:text-[1.75rem]">What we handle</h2>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-mist">
            Operational scope for this service line — applied against your SOPs.
          </p>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {service.handles.map((item, i) => (
              <li
                key={item}
                className="flex gap-4 border border-line bg-ink/30 px-5 py-6 hairline-top"
              >
                <span
                  className={cn(
                    "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center border",
                    ACCENT_ICON[service.accent],
                  )}
                >
                  <span className="mono-ref text-[11px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <p className="text-[14px] leading-relaxed text-fog">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {service.process ? (
        <section className="border-b border-line bg-ink">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
            <h2 className="display-title text-[1.5rem] md:text-[1.75rem]">
              How clearance moves
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-mist">
              A clear path from documents to release — coordinated with bonded
              staging when entry status requires it.
            </p>
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step) => (
                <li
                  key={step.step}
                  className="border border-line bg-panel px-5 py-7 hairline-top"
                >
                  <p className="mono-ref text-[12px] text-gold">{step.step}</p>
                  <h3 className="mt-4 text-[15px] font-medium tracking-tight text-snow">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-mist">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* Next step */}
      <section className="relative overflow-hidden bg-obsidian">
        <div
          className={cn("absolute top-0 left-0 h-full w-1", ACCENT_RAIL[service.accent])}
          aria-hidden
        />
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-8 md:py-28">
          <div>
            <p className="section-label">Next step</p>
            <h2 className="display-title mt-4 text-[1.5rem] md:text-[1.75rem]">
              Price this service with your lane
            </h2>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-fog">
              Include origin, destination, mode, commodity, and target ETA. Quotes
              can combine brokerage, Bonded CFS, and freight.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact#quote"
              className="inline-flex h-11 items-center bg-steel px-6 text-[13px] font-medium text-white hover:bg-steel-bright focus-ring"
            >
              Request a quote
            </Link>
            <Link
              href="/services"
              className="inline-flex h-11 items-center border border-line px-5 text-[13px] text-fog hover:text-snow focus-ring"
            >
              All services
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
