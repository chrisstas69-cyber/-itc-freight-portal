import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "ITC Group Inc. — customs brokerage, Bonded CFS, and freight forwarding from East Rockaway since 1984.",
};

export default function AboutPage() {
  return (
    <article>
      <header className="hero-brand relative min-h-[26rem] overflow-hidden border-b border-white/10 md:min-h-[32rem]">
        <Image
          src="/images/hero-port-v6.jpg"
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
        <div className="absolute top-0 left-0 h-full w-1 bg-gold" aria-hidden />
        <div className="relative mx-auto flex min-h-[26rem] max-w-7xl flex-col justify-end px-5 py-16 md:min-h-[32rem] md:justify-center md:px-8 md:py-24 lg:max-w-[42rem]">
          <p className="section-label text-[#c4a86a]">About</p>
          <h1 className="hero-display mt-5 max-w-[20ch] text-[2.25rem] !text-white md:text-[3rem]">
            ITC Group Inc. · Ikaros Transport Corporation
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
            A long-established customs broker and bonded CFS operator supporting
            import programs through the New York gateways.
          </p>
        </div>
      </header>

      <section className="border-b border-line bg-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="overflow-hidden border border-line bg-panel">
            <div className="grid lg:grid-cols-12">
              <div className="relative min-h-[260px] lg:col-span-5 lg:min-h-full">
                <Image
                  src="/images/facility-warehouse.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                  aria-hidden
                />
              </div>
              <div className="p-7 md:p-10 lg:col-span-7 lg:p-12">
                <p className="text-[15px] leading-relaxed text-fog">
                  Founded in 1984 and headquartered at 500 Ocean Avenue in East
                  Rockaway, NY, ITC Group combines licensed U.S. customs brokerage
                  with a US Customs Bonded Facility (Bonded CFS) and multi-modal
                  freight. Entry filing, bonded staging, cargo release, and onward
                  movement share one operations desk — so clearance status and
                  freight status stay on one record.
                </p>
                <p className="mt-6 text-[15px] leading-relaxed text-fog">
                  We serve military, apparel, food & beverage, medical device, and
                  retail programs that need more than a carrier that only moves
                  boxes.
                </p>
                <dl className="mt-12 space-y-0 border border-line">
                  {[
                    ["Founded", "1984"],
                    ["Headquarters", "500 Ocean Avenue, East Rockaway, NY 11518"],
                    ["Core", "Customs brokerage · Bonded CFS · Freight forwarding"],
                    ["Gateways", "JFK · Newark · NY metro"],
                  ].map(([k, v], i) => (
                    <div
                      key={k}
                      className={`grid gap-1 px-4 py-4 text-[13px] sm:grid-cols-[8rem_1fr] sm:gap-4 ${
                        i > 0 ? "border-t border-line" : ""
                      }`}
                    >
                      <dt className="text-mist">{k}</dt>
                      <dd className="text-snow">{v}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href="/contact"
                  className="mt-10 inline-flex text-[13px] text-steel hover:text-snow focus-ring"
                >
                  Contact operations →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
