import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IndustriesGrid } from "@/components/marketing/IndustriesGrid";
import { INDUSTRIES } from "@/lib/content/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Military & government, apparel, food & beverage, medical devices, and retail — import programs with brokerage, bonded CFS, and door-to-door freight.",
};

export default function IndustriesPage() {
  return (
    <article>
      <header className="hero-brand relative min-h-[26rem] overflow-hidden border-b border-white/10 md:min-h-[32rem]">
        <Image
          src="/images/ops-containers.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_48%,rgba(0,0,0,0.4)_100%)]"
          aria-hidden
        />
        <div className="absolute top-0 left-0 h-full w-1 bg-[#f0c040]" aria-hidden />
        <div className="relative mx-auto flex min-h-[26rem] max-w-7xl flex-col justify-end px-5 py-16 md:min-h-[32rem] md:justify-center md:px-8 md:py-24 lg:max-w-[40rem]">
          <p className="section-label text-[#f0c040]">Industries</p>
          <h1 className="hero-display mt-5 max-w-[18ch] text-[2.25rem] !text-white md:text-[3rem]">
            Programs that need brokerage and bonded handling
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
            Customs brokerage, Bonded CFS, and forwarding for commercial and
            government programs — including specialized Military Operations for
            FMS, DoD, and ITAR-regulated cargo.
          </p>
        </div>
      </header>

      <section className="bg-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <IndustriesGrid industries={INDUSTRIES} />
          <div className="mt-16 flex justify-start">
            <Link
              href="/contact#quote"
              className="inline-flex h-11 items-center bg-[#f0c040] px-6 text-[13px] font-semibold text-black hover:bg-[#ffd45a] focus-ring"
            >
              Discuss your program
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
