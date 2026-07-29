import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrackingBar } from "@/components/marketing/TrackingBar";
import { SERVICES } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "ITC Group Inc. | Freight Forwarding & Logistics",
};

export default function HomePage() {
  return (
    <>
      <section className="hero-brand relative overflow-hidden border-b border-white/10">
        <Image
          src="/images/hero-port-v6.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_42%]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,8,12,0.94)_0%,rgba(6,8,12,0.78)_48%,rgba(6,8,12,0.4)_100%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:py-32">
          <p className="section-label text-[#c4a86a]">
            Ikaros Transport Corporation · Est. 1984
          </p>
          <h1 className="hero-display mt-5 max-w-[12ch] text-[2.75rem] text-white sm:text-[3.5rem] md:text-[4rem]">
            Entry. Bond. Release.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
            Customs brokerage, Bonded CFS, and freight under one East Rockaway
            operations desk — with clearance visibility in the client portal.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/contact#quote"
              className="inline-flex h-11 items-center bg-[#4a7fa5] px-6 text-[13px] font-medium text-white transition-colors hover:bg-[#6a9fc0] focus-ring"
            >
              Request a quote
            </Link>
            <Link
              href="/login"
              className="inline-flex h-11 items-center border border-white/25 px-5 text-[13px] text-white/85 transition-colors hover:border-white/45 hover:text-white focus-ring"
            >
              Client Portal
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
          <div className="grid gap-6 md:grid-cols-[14rem_1fr] md:items-end">
            <div>
              <p className="section-label">Track a shipment</p>
              <p className="mt-2 text-[13px] text-mist">
                Sign in required for status
              </p>
            </div>
            <div>
              <TrackingBar />
              <p className="mt-2 text-[12px] text-mist">
                AWB, container, PRO, or ITC shipment ID — continues at Client Portal
                login.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-label">Services</p>
              <h2 className="display-title mt-3 text-[1.5rem] md:text-[1.75rem]">
                Capabilities across the import path
              </h2>
            </div>
            <Link
              href="/services/customs-clearance"
              className="text-[13px] text-steel transition-colors hover:text-snow focus-ring"
            >
              View customs clearance →
            </Link>
          </div>
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col bg-panel p-5 transition-colors hover:bg-panel-elevated focus-ring hairline-top"
              >
                <h3 className="text-[14px] font-medium tracking-tight text-snow group-hover:text-gold">
                  {service.navLabel}
                </h3>
                <p className="mt-2 flex-1 text-[12px] leading-relaxed text-mist">
                  {service.teaser}
                </p>
                <span className="mt-4 text-[11px] tracking-wide text-steel uppercase">
                  Details
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-panel">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-3">
          {[
            { label: "Customs brokerage", value: "U.S. formal entry" },
            { label: "US Customs Bonded Facility", value: "Bonded CFS" },
            { label: "Operating since", value: "1984" },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`px-5 py-8 md:px-8 ${i > 0 ? "border-t border-line sm:border-t-0 sm:border-l" : ""}`}
            >
              <p className="meta-label">{item.label}</p>
              <p className="mt-2 text-[1.125rem] font-medium tracking-tight text-snow">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
