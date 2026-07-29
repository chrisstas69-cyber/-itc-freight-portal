import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "ITC Group Inc. — customs brokerage, Bonded CFS, and freight forwarding from East Rockaway since 1984.",
};

export default function AboutPage() {
  return (
    <article>
      <header className="border-b border-line bg-obsidian">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <p className="section-label">About</p>
          <h1 className="display-title mt-4 max-w-2xl text-[2rem] md:text-[2.5rem]">
            ITC Group Inc. · Ikaros Transport Corporation
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fog">
            A long-established customs broker and bonded CFS operator supporting
            import programs through the New York gateways.
          </p>
        </div>
      </header>

      <section className="border-b border-line bg-ink">
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-16">
          <p className="text-[15px] leading-relaxed text-fog">
            Founded in 1984 and headquartered at 500 Ocean Avenue in East Rockaway,
            NY, ITC Group combines licensed U.S. customs brokerage with a US Customs
            Bonded Facility (Bonded CFS) and multi-modal freight. Entry filing,
            bonded staging, cargo release, and onward movement share one operations
            desk — so clearance status and freight status stay on one record.
          </p>
          <p className="mt-6 text-[15px] leading-relaxed text-fog">
            We serve military, apparel, food & beverage, medical device, and retail
            programs that need more than a carrier that only moves boxes.
          </p>
          <dl className="mt-10 space-y-0 border border-line">
            {[
              ["Founded", "1984"],
              ["Headquarters", "500 Ocean Avenue, East Rockaway, NY 11518"],
              ["Core", "Customs brokerage · Bonded CFS · Freight forwarding"],
              ["Gateways", "JFK · Newark · NY metro"],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`grid gap-1 px-4 py-3.5 text-[13px] sm:grid-cols-[8rem_1fr] sm:gap-4 ${
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
      </section>
    </article>
  );
}
