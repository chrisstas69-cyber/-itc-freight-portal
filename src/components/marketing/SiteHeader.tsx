"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ItcGrpLogo } from "@/components/marketing/ItcGrpLogo";
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
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobilePanelId = useId();
  const servicesMenuId = useId();

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setServicesOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [servicesOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-panel/95 backdrop-blur-md">
      <div className="mx-auto flex h-[3.25rem] max-w-7xl items-center justify-between gap-3 px-5 md:h-14 md:px-8">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2.5 focus-ring sm:gap-3"
        >
          <ItcGrpLogo
            priority
            alt="ITC Group USA"
            className="h-9 w-auto max-h-9 max-w-[150px] object-contain sm:h-10 sm:max-h-10 sm:max-w-[175px] md:h-11 md:max-h-11 md:max-w-[190px]"
          />
          <span className="hidden min-w-0 flex-col leading-none sm:flex">
            <span className="truncate text-[14px] font-semibold tracking-[0.04em] text-snow md:text-[15px]">
              ITC Group <span className="text-gold">USA</span>
            </span>
            <span className="mt-1 text-[10px] tracking-[0.14em] text-mist uppercase">
              Since 1984
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              className={cn(
                "inline-flex min-h-10 items-center gap-1.5 px-3 text-[13px] transition-colors focus-ring",
                servicesOpen || pathname.startsWith("/services")
                  ? "text-snow"
                  : "text-fog hover:text-snow",
              )}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-controls={servicesMenuId}
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <span className="text-[10px] text-mist" aria-hidden>
                ▾
              </span>
            </button>
            {servicesOpen ? (
              <div
                id={servicesMenuId}
                role="menu"
                className="absolute top-full left-0 z-50 mt-1 w-[22rem] border border-line bg-panel py-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
              >
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    role="menuitem"
                    href={`/services/${service.slug}`}
                    onClick={() => setServicesOpen(false)}
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

          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-10 items-center px-3 text-[13px] transition-colors focus-ring",
                  active ? "text-snow" : "text-fog hover:text-snow",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden min-h-10 items-center border border-line px-3.5 text-[12px] font-medium text-fog transition-colors hover:border-line-strong hover:text-snow lg:inline-flex focus-ring"
          >
            Client Login
          </Link>
          <Link
            href="/contact#quote"
            className="hidden min-h-10 items-center bg-gold px-4 text-[12px] font-semibold tracking-[0.04em] text-[#0c1218] transition-colors hover:bg-[#e8b84a] lg:inline-flex focus-ring"
          >
            Request a Quote
          </Link>
          <button
            type="button"
            className="inline-flex min-h-10 min-w-10 items-center justify-center border border-line px-3 text-[12px] font-medium tracking-wide text-fog uppercase transition-colors hover:text-snow lg:hidden focus-ring"
            aria-expanded={mobileOpen}
            aria-controls={mobilePanelId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          id={mobilePanelId}
          aria-label="Mobile"
          className="max-h-[calc(100dvh-3.25rem)] overflow-y-auto border-t border-line bg-panel px-5 py-5 lg:hidden"
        >
          <div className="mb-5 flex flex-col gap-2">
            <Link
              href="/contact#quote"
              onClick={() => setMobileOpen(false)}
              className="cta-primary focus-ring"
            >
              Request a Quote
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="cta-secondary focus-ring"
            >
              Client Login
            </Link>
          </div>

          <p className="meta-label mb-2">Services</p>
          <div className="mb-4 space-y-0.5">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onClick={() => setMobileOpen(false)}
                className="block min-h-11 py-3 text-[14px] text-fog transition-colors hover:text-snow focus-ring"
              >
                {service.navLabel}
              </Link>
            ))}
          </div>
          <div className="space-y-0.5 border-t border-line pt-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block min-h-11 py-3 text-[14px] text-fog transition-colors hover:text-snow focus-ring"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
