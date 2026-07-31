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
          className="object-cover object-[72%_42%] opacity-55"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.82)_55%,rgba(0,0,0,0.92)_100%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 py-24 text-center md:px-8 md:py-32 lg:py-36">
          <div className="relative flex w-full max-w-3xl flex-col items-center">
            <Image
              src="/brand/itc-grp-mark.png"
              alt=""
              width={72}
              height={104}
              className="h-16 w-auto opacity-90 drop-shadow-[0_12px_28px_rgba(0,0,0,0.7)]"
              priority
            />

            <h1 className="hero-display mt-6 max-w-[14ch] text-[2.35rem] font-semibold tracking-[0.02em] text-white sm:text-[3rem] md:text-[3.75rem] lg:text-[4.25rem]">
              ITC Group{" "}
              <span className="text-[#f0c040}">USA</span>
            </h1>

            <p className="mt-6 max-w-2xl text-[1.05rem] font-medium leading-snug text-white sm:text-[1.25rem] md:text-[1.4rem]">
              A complete worldwide freight logistics company since 1984.
            </p>

            <p className="mt-6 max-w-2xl border-t border-[#f0c040]/35 pt-6 text-[14px] leading-relaxed text-[#f0c040] sm:text-[15px] md:text-[16px]">
              When you call, a real person answers — not a call center, not a
              bot. Ready to handle your freight logistics needs personally,
              door-to-door, around the world.
            </p>
          </div>

          <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact#quote"
              className="inline-flex h-11 items-center bg-[#f0c040] px-6 text-[13px] font-semibold text-black transition-colors hover:bg-[#ffd45a] focus-ring"
            >
              Request a quote
            </Link>
            <Link
              href="/login"
              className="inline-flex h-11 items-center border border-white/40 px-5 text-[13px] text-white transition-colors hover:border-white hover:bg-white/5 focus-ring"
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
              Worldwide freight. One accountable desk.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-fog">
              Since {COMPANY.founded}, {COMPANY.parentBrand} has moved cargo
              door-to-door worldwide — brokerage, bonded staging, and forwarding
              under one desk, backed by an agency network.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex text-[13px] text-gold hover:text-snow focus-ring"
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
