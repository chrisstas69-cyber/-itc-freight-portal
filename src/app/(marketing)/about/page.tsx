import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/content/company";

export const metadata: Metadata = {
  title: "About",
  description:
    "ITC Group International — a family-owned worldwide freight logistics company. Customs brokerage, U.S. Customs Bonded facility, and door-to-door freight from East Rockaway since 1984.",
};

const PROFILE_ROWS: [string, string][] = [
  ["Founded", String(COMPANY.founded)],
  ["Ownership", "Family-owned and operated · worldwide logistics"],
  ["Entities", "ITC Group USA · ITC Group International · JAV International · CTL"],
  ["Headquarters", `${COMPANY.hq.line1}, ${COMPANY.hq.city}`],
  ["Footprint", COMPANY.footprint],
  ["Operations", COMPANY.opsModel],
  ["Modes", COMPANY.modes],
];

const LICENSE_ROWS: [string, string][] = [
  ["Air", COMPANY.credentials.iataTsa],
  ["Ocean", COMPANY.credentials.fmc],
  ["Facility", COMPANY.credentials.bonded],
];

export default function AboutPage() {
  return (
    <article>
      <header className="hero-brand relative min-h-[26rem] overflow-hidden border-b border-white/10 md:min-h-[32rem]">
        <Image
          src="/images/about.png"
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
        <div className="absolute top-0 left-0 h-full w-1 bg-gold" aria-hidden />
        <div className="relative mx-auto flex min-h-[26rem] max-w-7xl flex-col justify-end px-5 py-16 md:min-h-[32rem] md:justify-center md:px-8 md:py-24 lg:max-w-[42rem]">
          <p className="section-label text-[#c4a86a]">About</p>
          <h1 className="hero-display mt-5 max-w-[22ch] text-[2rem] !text-white md:text-[2.75rem]">
            <span className="block">ITC Group USA</span>
            <span className="mt-2 block text-[0.92em] font-medium text-white/90 md:mt-2.5">
              ITC Group International
            </span>
            <span className="mt-2 block text-[0.92em] font-medium text-white/90 md:mt-2.5">
              JAV International
            </span>
            <span className="mt-2 block text-[0.92em] font-medium text-white/90 md:mt-2.5">
              Cargo Transport Logistics Inc.
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/70">
            A family-owned worldwide freight logistics company — brokerage,
            bonded facility, and door-to-door movement from East Rockaway through
            the Ports of New York, and to markets across the globe.
          </p>
        </div>
      </header>

      <section className="border-b border-line bg-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="overflow-hidden border border-line bg-panel">
            <div className="grid lg:grid-cols-12">
              <div className="relative min-h-[260px] lg:col-span-5 lg:min-h-full">
                <Image
                  src="/images/about/company.png"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                  aria-hidden
                />
              </div>
              <div className="p-7 md:p-10 lg:col-span-7 lg:p-12">
                <p className="section-label">Company profile</p>
                <h2 className="display-title mt-3 text-[1.375rem]">
                  Family-owned. Worldwide reach.
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-fog">
                  ITC Group International is a family-owned and operated freight
                  logistics company with a major worldwide footprint — moving cargo
                  door to door while keeping clearance, bonded staging, and delivery
                  under one accountable desk. Founded in {COMPANY.founded} and based
                  at {COMPANY.hq.line1} in {COMPANY.hq.city}, we combine licensed U.S.
                  customs brokerage, a U.S. Customs Bonded office and warehouse, and
                  multi-modal forwarding — {COMPANY.opsModel.toLowerCase()}.
                </p>
                <p className="mt-5 text-[15px] leading-relaxed text-fog">
                  From the Ports of New York to partners across {COMPANY.footprint.toLowerCase()},
                  we move cargo by air, ocean, truck, and rail, and support vessel
                  and aircraft chartering when programs require dedicated lift.
                </p>
                <dl className="mt-12 space-y-0 border border-line">
                  {PROFILE_ROWS.map(([k, v], i) => (
                    <div
                      key={k}
                      className={`grid gap-1 px-4 py-4 text-[13px] sm:grid-cols-[8.5rem_1fr] sm:gap-4 ${
                        i > 0 ? "border-t border-line" : ""
                      }`}
                    >
                      <dt className="text-mist">{k}</dt>
                      <dd className="text-snow">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="section-label">Licenses & facility</p>
              <h2 className="display-title mt-3 text-[1.375rem]">
                Credentials that travel with the cargo
              </h2>
              <dl className="mt-10 space-y-0 border border-line">
                {LICENSE_ROWS.map(([k, v], i) => (
                  <div
                    key={k}
                    className={`grid gap-1 px-4 py-4 text-[13px] sm:grid-cols-[5rem_1fr] sm:gap-4 ${
                      i > 0 ? "border-t border-line" : ""
                    }`}
                  >
                    <dt className="text-mist">{k}</dt>
                    <dd className="text-snow">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="section-label">Security</p>
              <h2 className="display-title mt-3 text-[1.375rem]">
                Controlled warehouse. Visible inventory.
              </h2>
              <ul className="mt-10 space-y-4">
                {[
                  COMPANY.security.alarm,
                  COMPANY.security.cctv,
                  COMPANY.security.inventory,
                ].map((item) => (
                  <li
                    key={item}
                    className="border border-line bg-ink/30 px-5 py-4 text-[14px] leading-relaxed text-fog"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="section-label">Government & defense</p>
              <h2 className="display-title mt-3 text-[1.5rem] md:text-[1.75rem]">
                FMS, DoD, and ITAR programs
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-[15px] leading-relaxed text-fog">
                {COMPANY.military.tenure}. Movements are handled with documentation
                discipline and chain-of-custody awareness from gateway through
                release.
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-fog">
                {COMPANY.military.visibility} — so transfer status stays coherent
                against the operational record.
              </p>
              <p className="mt-5 text-[14px] leading-relaxed text-mist">
                Commercial verticals include apparel, food & beverage, medical
                devices, and retail — each run against customer SOPs with the same
                in-house desk.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/industries"
                  className="inline-flex h-10 items-center border border-line px-5 text-[13px] text-fog hover:text-snow focus-ring"
                >
                  Industries
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-10 items-center bg-steel px-5 text-[13px] font-medium text-white hover:bg-steel-bright focus-ring"
                >
                  Contact operations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
