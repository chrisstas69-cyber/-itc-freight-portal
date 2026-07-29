"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/marketing/MarketingTheme";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#facility", label: "Facility" },
  { href: "/#industries", label: "Industries" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-white/15 bg-[#06080c]/45 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="group flex items-baseline gap-2.5 focus-ring">
          <span className="text-[15px] font-semibold tracking-[0.12em] text-white uppercase">
            ITC Group
          </span>
          <span className="hidden text-[10px] tracking-[0.18em] text-[#c4a86a] uppercase sm:inline">
            Est. 1984
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] text-white/70 transition-colors hover:text-white focus-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle variant="hero" />
          <Link
            href="/login"
            className={cn(
              "hidden text-[13px] text-white/70 transition-colors hover:text-white sm:inline focus-ring",
            )}
          >
            Client Login
          </Link>
          <Link
            href="/#quote"
            className="inline-flex h-9 items-center border border-white/25 bg-white/10 px-3.5 text-[11px] font-medium tracking-[0.08em] text-white uppercase transition-colors hover:bg-white/15 focus-ring"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
