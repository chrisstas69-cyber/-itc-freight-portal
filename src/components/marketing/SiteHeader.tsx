"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/marketing/MarketingTheme";
import { SERVICES } from "@/lib/content/services";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/facility", label: "Facility" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-panel/95 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3 focus-ring">
          <Image
            src="/brand/itc-grp-mark.png"
            alt="ITC Group USA"
            width={56}
            height={80}
            className="h-11 w-auto"
            priority
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-[15px] font-semibold tracking-[0.04em] text-snow">
              ITC Group <span className="text-gold">USA</span>
            </span>
            <span className="mt-1 text-[10px] tracking-[0.14em] text-mist uppercase">
              Since 1984
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              className={cn(
                "inline-flex h-9 items-center gap-1.5 px-3 text-[13px] transition-colors focus-ring",
                open ? "text-snow" : "text-fog hover:text-snow",
              )}
              aria-expanded={open}
              aria-haspopup="true"
              onClick={() => setOpen((v) => !v)}
            >
              Services
              <span className="text-[10px] text-mist" aria-hidden>
                ▾
              </span>
            </button>
            {open ? (
              <div className="absolute top-full left-0 z-50 mt-1 w-[22rem] border border-line bg-panel py-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 transition-colors hover:bg-panel-hover focus-ring"
                  >
                    <span className="block text-[13px] font-medium text-snow">
                      {service.navLabel}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-mist">
                      {service.teaser}
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-[13px] text-fog transition-colors hover:text-snow focus-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden h-9 items-center border border-gold/70 bg-gold px-3.5 text-[11px] font-semibold tracking-[0.08em] text-[#0c1218] uppercase transition-colors hover:bg-[#e8b84a] sm:inline-flex focus-ring"
          >
            Client Portal
          </Link>
          <button
            type="button"
            className="inline-flex h-9 items-center border border-line px-2.5 text-[11px] tracking-wide text-fog uppercase lg:hidden focus-ring"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-line bg-panel px-5 py-4 lg:hidden">
          <p className="meta-label mb-2">Services</p>
          <div className="mb-4 space-y-1">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-[13px] text-fog hover:text-snow focus-ring"
              >
                {service.navLabel}
              </Link>
            ))}
          </div>
          <div className="space-y-1 border-t border-line pt-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-[13px] text-fog hover:text-snow focus-ring"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex h-9 items-center bg-gold px-3.5 text-[11px] font-semibold tracking-[0.08em] text-[#0c1218] uppercase focus-ring"
            >
              Client Portal
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
