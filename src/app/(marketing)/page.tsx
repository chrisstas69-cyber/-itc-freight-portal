import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GlobalReach } from "@/components/marketing/GlobalReach";
import { HomeServicesSection } from "@/components/marketing/HomeServicesSection";
import { TrackingBar } from "@/components/marketing/TrackingBar";
import {
  COMPANY,
  SECURITY_POINTS,
  TRUST_CREDENTIALS,
} from "@/lib/content/company";
import { SERVICES } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "ITC Group USA | Freight Forwarding & Logistics",
  description:
    "Family-owned customs brokerage, U.S. Customs Bonded CFS, and multi-modal freight from East Rockaway / Ports of New York since 1984.",
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
          <h1 className="hero-display max-w-[20ch] text-[1.75rem] font-semibold !text-[#c4a86a] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem]">
            ITC Group USA · Est. 1984
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/70 md:mt-5">
            Family-owned since 1984. When you call, a real person picks up — not a
            call center, not a bot. Your freight, handled personally from East
            Rockaway through the Ports of New York — and door to door around the
            world.
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

      {/* Trust credentials — short chips, not paragraphs */}
      <section className="border-b border-line bg-ink">
        <div className="mx-auto grid max-w-7xl grid-cols-2 border-line lg:grid-cols-3 xl:grid-cols-6">
          {TRUST_CREDENTIALS.map((item) => (
            <div
              key={item.label}
              className="border-b border-line px-5 py-7 last:border-b-0 odd:border-r lg:border-r xl:border-b-0 xl:[&:nth-child(6)]:border-r-0 md:px-6 lg:[&:nth-child(3)]:border-r-0 xl:[&:nth-child(3)]:border-r"
            >
              <p className="meta-label">{item.label}</p>
              <p className="mt-2 text-[15px] font-medium tracking-tight text-snow">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <GlobalReach />

      <HomeServicesSection services={SERVICES} />

      {/* Company profile teaser */}
      <section className="border-b border-line bg-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-12 md:gap-12 md:px-8 md:py-20">
          <div className="md:col-span-5">
            <p className="section-label">Company</p>
            <h2 className="display-title mt-3 text-[1.5rem] md:text-[1.75rem]">
              Family-owned. Ports of New York.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-fog">
              Founded in {COMPANY.founded}, {COMPANY.parentBrand} runs brokerage,
              bonded warehouse, and forwarding as a single East Rockaway desk —{" "}
              {COMPANY.opsModel.toLowerCase()}.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex text-[13px] text-steel hover:text-snow focus-ring"
            >
              Company profile →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-7">
            <div className="border border-line bg-panel px-5 py-6 hairline-top">
              <p className="meta-label">Licenses</p>
              <ul className="mt-4 space-y-3 text-[13px] leading-relaxed text-fog">
                <li>{COMPANY.credentials.iataTsa}</li>
                <li>{COMPANY.credentials.fmc}</li>
                <li>{COMPANY.credentials.bonded}</li>
              </ul>
            </div>
            <div className="border border-line bg-panel px-5 py-6 hairline-top">
              <p className="meta-label">Government programs</p>
              <p className="mt-4 text-[13px] leading-relaxed text-fog">
                {COMPANY.military.tenure}. {COMPANY.military.dod}.
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-mist">
                {COMPANY.military.visibility}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security — short blocks */}
      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
          <p className="section-label">Security & control</p>
          <h2 className="display-title mt-3 text-[1.375rem] md:text-[1.5rem]">
            Bonded facility. Controlled cargo.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {SECURITY_POINTS.map((point) => (
              <div
                key={point.title}
                className="border border-line bg-ink/30 px-5 py-6 hairline-top"
              >
                <h3 className="text-[14px] font-medium text-snow">{point.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-mist">
                  {point.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
