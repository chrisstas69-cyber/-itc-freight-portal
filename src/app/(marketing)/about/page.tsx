import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { COMPANY, ENTITIES } from "@/lib/content/company";

export const metadata: Metadata = {
  title: "About",
  description:
    "ITC Group USA — a complete worldwide freight logistics company since 1984. One accountable desk and an agency network moving cargo door-to-door worldwide.",
};

const PROFILE_ROWS: [string, string][] = [
  ["Founded", String(COMPANY.founded)],
  ["Parent", ENTITIES.parent.name],
  [
    "Divisions",
    ENTITIES.divisions.map((d) => d.name).join(" · "),
  ],
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
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_48%,rgba(0,0,0,0.4)_100%)]"
          aria-hidden
        />
        <div className="absolute top-0 left-0 h-full w-1 bg-[#f0c040]" aria-hidden />
        <div className="relative mx-auto flex min-h-[26rem] max-w-7xl flex-col justify-end px-5 py-16 md:min-h-[32rem] md:justify-center md:px-8 md:py-24 lg:max-w-[42rem]">
          <p className="section-label text-[#f0c040]">About</p>
          <h1 className="hero-display mt-5 max-w-[18ch] text-[2.25rem] !text-white md:text-[3rem]">
            {ENTITIES.parent.name}
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/70">
            A complete worldwide freight logistics company since {COMPANY.founded} —
            one accountable desk and an agency network moving cargo door-to-door
            around the world.
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
                  Worldwide logistics. One desk.
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-fog">
                  {ENTITIES.parent.name} is a worldwide freight logistics provider
                  with one accountable desk and an agency network moving cargo
                  door-to-door around the world. Since {COMPANY.founded}, we have
                  combined licensed U.S. customs brokerage, a U.S. Customs Bonded
                  office and warehouse, and multi-modal forwarding — keeping
                  clearance, bonded staging, and delivery coordinated under a single
                  operational record.
                </p>
                <p className="mt-5 text-[15px] leading-relaxed text-fog">
                  We move cargo by air, ocean, truck, and rail worldwide, and
                  support vessel and aircraft chartering when programs require
                  dedicated lift. {COMPANY.opsModel}.
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
          <p className="section-label">Group structure</p>
          <h2 className="display-title mt-3 max-w-2xl text-[1.5rem] md:text-[1.75rem]">
            One parent. Three operating divisions.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fog">
            {ENTITIES.parent.name} is the lead public brand. Under it,{" "}
            {ENTITIES.divisions
              .map((d) => d.name)
              .join(", ")
              .replace(/, ([^,]*)$/, ", and $1")}{" "}
            operate as separate divisions — sharing the same in-house desk, bonded
            facility, and execution model.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="border border-gold/40 bg-obsidian px-5 py-7 hairline-top md:px-6 sm:col-span-2 xl:col-span-1">
              <p className="meta-label text-gold">Parent brand</p>
              <div className="mt-4 flex items-center gap-3">
                <Image
                  src="/brand/itc-grp-mark.png"
                  alt=""
                  width={40}
                  height={58}
                  className="h-12 w-auto"
                />
                <div>
                  <p className="text-[15px] font-medium text-snow">
                    {ENTITIES.parent.name}
                  </p>
                </div>
              </div>
            </div>

            {ENTITIES.divisions.map((division) => (
              <div
                key={division.id}
                className="border border-line bg-ink/30 px-5 py-7 hairline-top md:px-6"
              >
                <p className="meta-label">Division</p>
                <p className="mt-4 text-[14px] font-medium leading-snug text-snow">
                  {division.name}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 border border-line bg-ink/20 px-5 py-5 md:px-6">
            <p className="meta-label">Entity marks</p>
            <Image
              src="/brand/itc-entities-sheet.png"
              alt="ITC entity marks"
              width={216}
              height={104}
              className="mt-4 h-14 w-auto opacity-90"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink">
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

      <section className="border-b border-line bg-panel">
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
                {COMPANY.military.tenure}. {COMPANY.military.importExport}.{" "}
                {COMPANY.military.itar}.
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-fog">
                {COMPANY.military.visibility}. {COMPANY.military.dod} —
                coordinated with licensed customs brokerage and bonded CFS staging.
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
                  className="inline-flex h-10 items-center bg-[#f0c040] px-5 text-[13px] font-semibold text-black hover:bg-[#ffd45a] focus-ring"
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
