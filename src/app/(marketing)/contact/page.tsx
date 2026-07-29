import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ITC Group operations in East Rockaway, NY.",
};

export default function ContactPage() {
  return (
    <article>
      <header className="border-b border-line bg-obsidian">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <p className="section-label">Contact</p>
          <h1 className="display-title mt-4 text-[2rem] md:text-[2.5rem]">
            East Rockaway operations desk
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog">
            Reach the team that runs brokerage, Bonded CFS, and freight for your
            import programs.
          </p>
        </div>
      </header>

      <section className="border-b border-line bg-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-2 md:px-8 md:py-16">
          <div>
            <h2 className="display-title text-[1.25rem]">Headquarters</h2>
            <address className="mt-4 not-italic text-[15px] leading-relaxed text-fog">
              ITC Group Inc.
              <br />
              500 Ocean Avenue
              <br />
              East Rockaway, NY 11518
            </address>
            <p className="mt-6 text-[13px] text-mist">
              For portal access or an active shipment, use{" "}
              <Link href="/login" className="text-steel hover:text-snow focus-ring">
                Client Portal
              </Link>
              .
            </p>
          </div>

          <div id="quote">
            <h2 className="display-title text-[1.25rem]">Request a quote</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-fog">
              Origin, destination, mode, commodity, pieces or weight, and target
              ETA. Quotes can include formal entry, bonded staging, and delivery.
            </p>
            <form className="mt-6 grid gap-3">
              <input
                type="email"
                required
                placeholder="Work email"
                className="h-10 border border-line bg-panel px-3 text-[13px] text-snow placeholder:text-mist/55 focus-ring focus:border-steel"
              />
              <input
                type="text"
                required
                placeholder="Origin → Destination"
                className="h-10 border border-line bg-panel px-3 text-[13px] text-snow placeholder:text-mist/55 focus-ring focus:border-steel"
              />
              <textarea
                required
                rows={4}
                placeholder="Commodity, pieces/weight, Incoterms, target ETA"
                className="border border-line bg-panel px-3 py-2.5 text-[13px] text-snow placeholder:text-mist/55 focus-ring focus:border-steel"
              />
              <Button type="submit" className="mt-1 w-fit" size="md">
                Submit quote request
              </Button>
            </form>
          </div>
        </div>
      </section>
    </article>
  );
}
