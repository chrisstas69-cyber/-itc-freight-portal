import Image from "next/image";
import Link from "next/link";
import { COMPANY, ENTITIES } from "@/lib/content/company";
import { SERVICES } from "@/lib/content/services";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-obsidian" id="contact-footer">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-12 md:gap-10 md:px-8 md:py-16">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/itc-grp-mark.png"
              alt="ITC Group USA"
              width={48}
              height={70}
              className="h-12 w-auto"
            />
            <div>
              <p className="text-[14px] font-semibold tracking-[0.04em] text-snow">
                ITC Group <span className="text-gold">USA</span>
              </p>
              <p className="mt-1 text-[12px] text-mist">
                Worldwide logistics · Since {COMPANY.founded}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-fog">
            A complete worldwide freight logistics company since {COMPANY.founded} —
            customs brokerage, U.S. Customs Bonded facility, and door-to-door
            multi-modal forwarding.
          </p>
          <p className="mt-2 max-w-sm text-[11px] leading-relaxed text-mist">
            IATA / TSA Approved IAC · FMC# 3887 · U.S. Customs Bonded
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="meta-label">Divisions</p>
          <ul className="mt-3 space-y-3 text-[13px] text-fog">
            {ENTITIES.divisions.map((division) => (
              <li key={division.id}>
                <p className="text-[12px] font-medium leading-snug text-snow">
                  {division.name}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="meta-label">Company</p>
          <ul className="mt-3 space-y-2 text-[13px] text-fog">
            <li>
              <Link href="/about" className="hover:text-snow focus-ring">
                About
              </Link>
            </li>
            <li>
              <Link href="/facility" className="hover:text-snow focus-ring">
                Facility
              </Link>
            </li>
            <li>
              <Link href="/industries" className="hover:text-snow focus-ring">
                Industries
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-snow focus-ring">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-snow focus-ring">
                Client Portal
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="meta-label">Services</p>
          <ul className="mt-3 space-y-2 text-[13px] text-fog">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="hover:text-snow focus-ring"
                >
                  {s.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="text-[11px] text-mist">
            © {new Date().getFullYear()} {COMPANY.parentBrand}. All rights reserved.
          </p>
          <p className="text-[11px] text-mist">
            {COMPANY.hq.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
