import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-obsidian" id="contact">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:gap-10 md:px-8 md:py-20">
        <div className="md:col-span-5">
          <p className="text-[15px] font-semibold tracking-[0.12em] text-snow uppercase">
            ITC Group Inc.
          </p>
          <p className="mt-2 text-[13px] text-mist">
            Operating as Ikaros Transport Corporation
          </p>
          <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-fog">
            Customs brokerage, US Customs Bonded Facility (Bonded CFS), and
            multi-modal forwarding from East Rockaway — with import clearance
            visibility for status, documents, and invoices since 1984.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="meta-label">Headquarters</p>
          <address className="mt-3 not-italic text-[13px] leading-relaxed text-fog">
            500 Ocean Avenue
            <br />
            East Rockaway, NY 11518
          </address>
        </div>

        <div className="md:col-span-2">
          <p className="meta-label">Navigate</p>
          <ul className="mt-3 space-y-2.5 text-[13px] text-fog">
            <li>
              <Link href="/#services" className="transition-colors hover:text-snow focus-ring">
                Services
              </Link>
            </li>
            <li>
              <Link href="/#facility" className="transition-colors hover:text-snow focus-ring">
                Facility
              </Link>
            </li>
            <li>
              <Link href="/#industries" className="transition-colors hover:text-snow focus-ring">
                Industries
              </Link>
            </li>
            <li>
              <Link href="/login" className="transition-colors hover:text-snow focus-ring">
                Client Portal
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="meta-label">Operations</p>
          <ul className="mt-3 space-y-2.5 text-[13px] text-fog">
            <li>Customs brokerage</li>
            <li>Bonded CFS</li>
            <li>Cargo release</li>
            <li>Freight forwarding</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-[11px] text-mist md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} ITC Group Inc. All rights reserved.</p>
          <p className="mono-ref tracking-tight">
            US Customs Bonded Facility · Bonded CFS · JFK / EWR
          </p>
        </div>
      </div>
    </footer>
  );
}
