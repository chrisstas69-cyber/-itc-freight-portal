"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearSession, getSession } from "@/lib/auth/session";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { PortalUser } from "@/lib/types";

const NAV = [
  { href: "/portal", label: "Visibility", exact: true },
  { href: "/portal/shipments", label: "Shipments" },
  { href: "/portal/documents", label: "Documents" },
  { href: "/portal/invoices", label: "Invoices" },
  { href: "/portal/account", label: "Account" },
];

export function PortalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[15rem] shrink-0 flex-col border-r border-line bg-obsidian lg:flex">
      <div className="flex h-14 items-center border-b border-line px-5">
        <Link href="/portal" className="focus-ring">
          <span className="text-[12px] font-semibold tracking-[0.14em] text-snow uppercase">
            ITC Visibility
          </span>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-3" aria-label="Portal">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2.5 text-[13px] transition-colors focus-ring",
                active
                  ? "border-l-2 border-steel bg-panel text-snow"
                  : "border-l-2 border-transparent text-fog hover:bg-panel/50 hover:text-snow",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-line p-5">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-fog transition-colors hover:text-snow focus-ring"
        >
          <span aria-hidden>←</span>
          Back to website
        </Link>
        <p className="meta-label">Operations desk</p>
        <p className="mt-2 text-[12px] leading-relaxed text-fog">
          Clearance · Bonded CFS · Documents
        </p>
        <a
          href="mailto:operations@itcgroup.example"
          className="mt-3 inline-block text-[12px] text-steel-bright hover:text-snow focus-ring"
        >
          Contact operations
        </a>
      </div>
    </aside>
  );
}

export function PortalTopbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<PortalUser | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    setUser(session);
  }, [router]);

  function logout() {
    clearSession();
    router.replace("/login");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink/95 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-4 px-4 md:px-7">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="border border-line px-2.5 py-1.5 text-[11px] tracking-wide text-fog uppercase lg:hidden focus-ring"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
          >
            Menu
          </button>
          <Link
            href="/portal"
            className="text-[12px] font-semibold tracking-[0.14em] text-snow uppercase lg:hidden focus-ring"
          >
            ITC Visibility
          </Link>
          <p className="hidden text-[13px] text-mist md:block">
            Control tower ·{" "}
            <span className="text-fog">
              {pathname === "/portal"
                ? "Shipment control"
                : pathname.split("/").filter(Boolean).slice(1).join(" / ")}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="hidden text-[12px] text-fog transition-colors hover:text-snow sm:inline focus-ring"
          >
            ← Website
          </Link>
          {user ? (
            <div className="hidden text-right sm:block">
              <p className="text-[13px] text-snow">{user.name}</p>
              <p className="mono-ref text-[11px] text-mist">{user.email}</p>
            </div>
          ) : null}
          <button
            type="button"
            onClick={logout}
            className="h-8 border border-line px-3 text-[11px] tracking-wide text-fog uppercase transition-colors hover:border-fog/50 hover:text-snow focus-ring"
          >
            Sign out
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav className="flex flex-col border-t border-line bg-panel p-2 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-[13px] text-fog hover:text-snow focus-ring"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2.5 text-[13px] text-steel-bright hover:text-snow focus-ring"
          >
            ← Back to website
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
