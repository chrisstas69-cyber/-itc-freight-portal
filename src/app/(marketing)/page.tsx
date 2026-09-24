import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GlobalReach } from "@/components/marketing/GlobalReach";
import { HomeServicesSection } from "@/components/marketing/HomeServicesSection";
import { ItcGrpLogo } from "@/components/marketing/ItcGrpLogo";
import {
  COMPANY,
  SECURITY_POINTS,
  TRUST_CREDENTIALS,
} from "@/lib/content/company";
import { SERVICES } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "ITC Group USA | Worldwide Freight Logistics",
  description:
    "ITC Group USA — a complete worldwide freight logistics company since 1984. Customs brokerage, bonded CFS, and door-to-door multi-modal freight. IATA/TSA IAC · FMC# 3887.",
};

export default function HomePage() {
  return (
    <>
      <section className="hero-brand relative overflow-hidden border-b border-white/10 bg-black">
        <Image
          src="/images/hero-port-v6.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_42%] opacity-50"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.86)_52%,rgba(0,0,0,0.94)_100%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 py-20 text-center sm:py-24 md:px-8 md:py-28 lg:py-32">
          <div className="fade-rise relative flex w-full max-w-3xl flex-col items-center">
            {/* Swap ItcGrpLogo src later for transparent PNG/SVG */}
            <ItcGrpLogo
              priority
              alt="ITC GRP"
              className="w-20 sm:w-[95px] md:w-[110px] lg:w-[120px] max-w-[125px]"
            />

            <p className="mt-5 section-label text-[#f0c040] sm:mt-6">
              Trusted Freight Logistics Since 1984
            </p>

            <h1 className="hero-display mt-4 max-w-[22ch] text-[1.85rem] font-semibold tracking-[0.01em] text-white sm:mt-5 sm:text-[2.35rem] md:text-[2.85rem] lg:text-[3.25rem]">
              Worldwide Freight Logistics—With Personal Service Since 1984
            </h1>

            <p className="mt-5 max-w-[42ch] text-[14px] leading-relaxed text-white/90 sm:mt-6 sm:max-w-[48ch] sm:text-[15px] md:text-[16px]">
              When you call, a real person answers—not a call center, not a bot.
              We handle worldwide air, ocean, and ground freight logistics
              personally, door to door.
            </p>
          </div>

          <div className="fade-rise-delay relative z-10 mt-9 flex w-full max-w-xl flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Link href="/contact#quote" className="cta-primary focus-ring">
              Request a Freight Quote
            </Link>
            <Link href="/contact" className="cta-secondary-on-dark focus-ring">
              Speak With a Logistics Specialist
            </Link>
          </div>
        </div>
      </section>


      {/* Portal-oriented shipment access — no public tracking lookup */}
      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
          <div className="grid gap-6 border border-line bg-ink/25 p-6 hairline-top md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:p-8">
            <div className="max-w-2xl">
              <p className="section-label">Client Shipment Tracking</p>
              <h2 className="display-title mt-3 text-[1.25rem] md:text-[1.4rem]">
                Secure access for existing customers
              </h2>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-fog">
                Sign in to the Client Portal to securely review your shipment
                activity. Public shipment lookup is not available on this site.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
              <Link
                href="/login"
                className="inline-flex min-h-11 items-center justify-center border border-line bg-panel px-5 text-[13px] font-medium text-snow transition-colors hover:border-gold/50 hover:text-gold focus-ring"
              >
                Sign In to Client Portal
              </Link>
              <Link
                href="/contact#quote"
                className="inline-flex min-h-11 items-center justify-center px-4 text-[13px] text-mist underline-offset-4 transition-colors hover:text-snow hover:underline focus-ring"
              >
                Need a quote instead?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust credentials — short chips, not paragraphs */}
      <section className="border-b border-line bg-ink" aria-label="Credentials">
        <div className="mx-auto grid max-w-7xl grid-cols-2 border-line sm:grid-cols-3 xl:grid-cols-6">
          {TRUST_CREDENTIALS.map((item) => (
            <div
              key={item.label}
              className="border-b border-line px-5 py-6 odd:border-r sm:border-r sm:[&:nth-child(3)]:border-r-0 xl:border-b-0 xl:[&:nth-child(3)]:border-r xl:[&:nth-child(6)]:border-r-0 md:px-6 md:py-7"
            >
              <p className="meta-label">{item.label}</p>
              <p className="mt-2 text-[14px] font-medium tracking-tight text-snow md:text-[15px]">
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
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-12 md:gap-12 md:px-8 md:py-20 lg:py-24">
          <div className="md:col-span-5">
            <p className="section-label">Company</p>
            <h2 className="display-title mt-3 text-[1.5rem] md:text-[1.75rem]">
              Worldwide freight. One accountable desk.
            </h2>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-fog md:text-[15px]">
              Since {COMPANY.founded}, {COMPANY.parentBrand} has moved cargo
              door-to-door worldwide — brokerage, bonded staging, and forwarding
              under one desk, backed by an agency network.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex min-h-10 items-center text-[13px] text-gold transition-colors hover:text-snow focus-ring"
            >
              Company profile →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-7">
            <div className="border border-line bg-panel px-5 py-6 transition-colors hover:border-line-strong hairline-top md:px-6">
              <p className="meta-label">Licenses</p>
              <ul className="mt-4 space-y-3 text-[13px] leading-relaxed text-fog">
                <li>{COMPANY.credentials.iataTsa}</li>
                <li>{COMPANY.credentials.fmc}</li>
                <li>{COMPANY.credentials.bonded}</li>
              </ul>
            </div>
            <div className="border border-line bg-panel px-5 py-6 transition-colors hover:border-line-strong hairline-top md:px-6">
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
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16 lg:py-20">
          <p className="section-label">Security & control</p>
          <h2 className="display-title mt-3 text-[1.375rem] md:text-[1.5rem]">
            Bonded facility. Controlled cargo.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {SECURITY_POINTS.map((point) => (
              <div
                key={point.title}
                className="border border-line bg-ink/30 px-5 py-6 transition-colors hover:border-line-strong hairline-top md:px-6"
              >
                <h3 className="text-[14px] font-medium text-snow">{point.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-mist md:min-h-[4.5rem]">
                  {point.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final conversion band */}
      <section className="border-b border-line bg-obsidian">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-8 md:py-16">
          <div className="max-w-xl">
            <p className="section-label">Next step</p>
            <h2 className="display-title mt-3 text-[1.35rem] md:text-[1.6rem]">
              Ready to move cargo with ITC Group USA?
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-fog">
              Request a quote for your next program, or speak with the operations
              desk about brokerage, bonded staging, and door-to-door freight.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact#quote"
              className="cta-primary focus-ring"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="cta-secondary focus-ring"
            >
              Contact Operations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
