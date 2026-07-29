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
      <header className="border-b border-line bg-obsidian">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <p className="section-label">US Customs Bonded Facility</p>
          <h1 className="display-title mt-4 max-w-2xl text-[2rem] md:text-[2.5rem]">
            Bonded CFS at Ocean Avenue
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fog">
            A working container freight station under bond — staging and release
            coordinated with ITC customs brokerage.
          </p>
        </div>
      </header>

      <section className="border-b border-line bg-panel">
        <div className="mx-auto grid max-w-7xl md:grid-cols-12">
          <div className="px-5 py-14 md:col-span-5 md:px-8 md:py-16">
            <p className="text-[15px] leading-relaxed text-fog">
              Import cargo is received under bond, held in bonded staging when entry
              or exam status requires it, and released before outbound trucking.
              Formal entry status and CFS events share the shipment ID visible in
              the client portal.
            </p>
            <dl className="mt-10 space-y-5">
              {[
                ["Address", "500 Ocean Avenue, East Rockaway, NY 11518"],
                ["Type", "US Customs Bonded Facility · Bonded CFS"],
                ["Operations", "Bonded staging · cargo release · distribution"],
                ["Gateways", "JFK · Newark · NY metro"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="meta-label">{k}</dt>
                  <dd className="mt-1.5 text-[14px] text-snow">{v}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/services/cfs"
              className="mt-10 inline-flex text-[13px] text-steel hover:text-snow focus-ring"
            >
              CFS service details →
            </Link>
          </div>
          <div className="relative min-h-[280px] md:col-span-7 md:min-h-[480px]">
            <Image
              src="/images/facility-warehouse.jpg"
              alt="Warehouse operations at ITC Bonded CFS"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </article>
  );
}
