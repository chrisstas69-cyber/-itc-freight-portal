import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Facility",
  description:
    "US Customs Bonded Facility · Bonded CFS at 500 Ocean Avenue, East Rockaway, NY.",
};

export default function FacilityPage() {
  return (
    <article>
      <header className="hero-brand relative min-h-[26rem] overflow-hidden border-b border-white/10 md:min-h-[32rem]">
        <Image
          src="/images/facility-warehouse.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(6,8,12,0.94)_0%,rgba(6,8,12,0.76)_48%,rgba(6,8,12,0.38)_100%)]"
          aria-hidden
        />
        <div className="absolute top-0 left-0 h-full w-1 bg-gold-dim" aria-hidden />
        <div className="relative mx-auto flex min-h-[26rem] max-w-7xl flex-col justify-end px-5 py-16 md:min-h-[32rem] md:justify-center md:px-8 md:py-24 lg:max-w-[40rem]">
          <p className="section-label text-[#c4a86a]">US Customs Bonded Facility</p>
          <h1 className="hero-display mt-5 max-w-[18ch] text-[2.25rem] !text-white md:text-[3rem]">
            Bonded CFS at Ocean Avenue
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
            A working container freight station under bond — staging and release
            coordinated with ITC customs brokerage.
          </p>
        </div>
      </header>

      <section className="border-b border-line bg-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="overflow-hidden border border-line bg-panel">
            <div className="grid lg:grid-cols-12">
              <div className="order-2 p-7 md:p-10 lg:order-1 lg:col-span-5 lg:p-12">
                <p className="text-[15px] leading-relaxed text-fog">
                  Import cargo is received under bond, held in bonded staging when
                  entry or exam status requires it, and released before outbound
                  trucking. Formal entry status and CFS events share the shipment ID
                  visible in the client portal.
                </p>
                <dl className="mt-12 space-y-6">
                  {[
                    ["Address", "500 Ocean Avenue, East Rockaway, NY 11518"],
                    ["Type", "US Customs Bonded Facility · Bonded CFS"],
                    ["Operations", "Bonded staging · cargo release · distribution"],
                    ["Gateways", "JFK · Newark · NY metro"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="meta-label">{k}</dt>
                      <dd className="mt-2 text-[14px] text-snow">{v}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href="/services/cfs"
                  className="mt-12 inline-flex text-[13px] text-steel hover:text-snow focus-ring"
                >
                  CFS service details →
                </Link>
              </div>
              <div className="relative order-1 min-h-[280px] lg:order-2 lg:col-span-7 lg:min-h-[520px]">
                <Image
                  src="/images/ops-warehouse.jpg"
                  alt="Warehouse operations at ITC Bonded CFS"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
