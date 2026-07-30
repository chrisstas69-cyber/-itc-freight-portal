import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ITC Group operations in East Rockaway, NY.",
};

export default function ContactPage() {
  return (
    <article>
      <header className="hero-brand relative min-h-[24rem] overflow-hidden border-b border-white/10 md:min-h-[28rem]">
        <Image
          src="/images/hero-port-v2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(6,8,12,0.94)_0%,rgba(6,8,12,0.8)_50%,rgba(6,8,12,0.45)_100%)]"
          aria-hidden
        />
        <div className="absolute top-0 left-0 h-full w-1 bg-steel" aria-hidden />
        <div className="relative mx-auto flex min-h-[24rem] max-w-7xl flex-col justify-end px-5 py-16 md:min-h-[28rem] md:justify-center md:px-8 md:py-20 lg:max-w-[38rem]">
          <p className="section-label text-[#c4a86a]">Contact</p>
          <h1 className="hero-display mt-5 text-[2.25rem] !text-white md:text-[3rem]">
            East Rockaway operations desk
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
            Reach the team that runs brokerage, Bonded CFS, and freight for your
            import programs.
          </p>
        </div>
      </header>

      <section className="border-b border-line bg-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
          <div className="border border-line bg-panel p-7 md:p-10">
            <h2 className="display-title text-[1.375rem]">Headquarters</h2>
            <address className="mt-5 not-italic text-[15px] leading-relaxed text-fog">
              ITC Group USA
              <br />
              500 Ocean Avenue
              <br />
              East Rockaway, NY 11518
            </address>
            <div className="relative mt-10 h-44 overflow-hidden border border-line">
              <Image
                src="/images/facility-warehouse.jpg"
                alt="ITC Bonded CFS facility"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <p className="mt-8 text-[13px] leading-relaxed text-mist">
              For portal access or an active shipment, use{" "}
              <Link href="/login" className="text-steel hover:text-snow focus-ring">
                Client Portal
              </Link>
              .
            </p>
          </div>

          <div id="quote" className="border border-line bg-panel p-7 md:p-10">
            <h2 className="display-title text-[1.375rem]">Request a quote</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-fog">
              Origin, destination, mode, commodity, pieces or weight, and target
              ETA. Quotes can include formal entry, bonded staging, and delivery.
            </p>
            <form className="mt-8 grid gap-4">
              <input
                type="email"
                required
                placeholder="Work email"
                className="h-11 border border-line bg-ink/40 px-3 text-[13px] text-snow placeholder:text-mist/55 focus-ring focus:border-steel"
              />
              <input
                type="text"
                required
                placeholder="Origin → Destination"
                className="h-11 border border-line bg-ink/40 px-3 text-[13px] text-snow placeholder:text-mist/55 focus-ring focus:border-steel"
              />
              <textarea
                required
                rows={5}
                placeholder="Commodity, pieces/weight, Incoterms, target ETA"
                className="border border-line bg-ink/40 px-3 py-3 text-[13px] text-snow placeholder:text-mist/55 focus-ring focus:border-steel"
              />
              <Button type="submit" className="mt-2 w-fit" size="md">
                Submit quote request
              </Button>
            </form>
          </div>
        </div>
      </section>
    </article>
  );
}
