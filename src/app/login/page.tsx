import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoadingState } from "@/components/ui/States";

export const metadata: Metadata = {
  title: "Client Portal Login",
  description:
    "Sign in to ITC Group import clearance visibility — customs status, Bonded CFS milestones, documents, and invoices.",
};

const TRUST_ITEMS = [
  { label: "Clearance", value: "Entry · exam · hold status" },
  { label: "Bonded CFS", value: "Staging & cargo release" },
  { label: "Documents", value: "Entry packets · shipping files" },
];

export default function LoginPage() {
  return (
    <div className="relative min-h-dvh bg-obsidian">
      <div className="pointer-events-none absolute inset-0 grid-atmosphere opacity-[0.14]" />

      <div className="relative mx-auto flex min-h-dvh max-w-[72rem] flex-col lg:flex-row">
        <aside className="flex flex-col border-b border-line px-6 py-10 lg:w-[52%] lg:border-r lg:border-b-0 lg:px-12 lg:py-14">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[13px] text-fog transition-colors hover:text-snow focus-ring"
            >
              <span aria-hidden>←</span>
              Back to website
            </Link>
            <span className="hidden border border-line px-2.5 py-1 text-[10px] tracking-[0.14em] text-mist uppercase sm:inline">
              Authorized access only
            </span>
          </div>

          <div className="mt-16 flex flex-1 flex-col justify-center lg:mt-0 lg:max-w-md">
            <p className="section-label">Import clearance visibility</p>
            <h1 className="display-title mt-4 text-[1.75rem] md:text-[2rem]">
              Sign in for clearance status, bonded CFS events, and documents
            </h1>
            <p className="body-copy mt-5 text-[13px]">
              Your operations console for import clearance visibility, bonded staging
              and cargo release milestones, customs and shipping documents, and
              freight invoices — one record per shipment.
            </p>

            <ul className="mt-10 space-y-0 border border-line hairline-top">
              {TRUST_ITEMS.map((item, i) => (
                <li
                  key={item.label}
                  className={`flex items-baseline justify-between gap-4 px-4 py-3.5 text-[13px] ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <span className="text-mist">{item.label}</span>
                  <span className="text-right text-snow">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-12 text-[11px] leading-relaxed text-mist lg:mt-10">
            ITC Group USA · 500 Ocean Avenue, East Rockaway, NY 11518 · Founded
            1984
          </p>
        </aside>

        <section className="flex flex-1 items-center justify-center bg-ink/40 px-6 py-12 lg:px-12 lg:py-14">
          <div className="w-full max-w-[22rem]">
            <div className="mb-7">
              <h2 className="text-[15px] font-medium tracking-tight text-snow">
                Account sign-in
              </h2>
              <p className="mt-1.5 text-[13px] text-mist">
                Credentials issued by ITC Group to your organization.
              </p>
            </div>

            <div className="border border-line bg-panel p-5 hairline-top md:p-6">
              <Suspense fallback={<LoadingState label="Loading sign-in form…" compact />}>
                <LoginForm />
              </Suspense>
            </div>

            <p className="mt-6 text-center text-[11px] leading-relaxed text-mist">
              Need access?{" "}
              <Link
                href="/contact"
                className="text-steel-bright transition-colors hover:text-snow focus-ring"
              >
                Contact the East Rockaway operations desk
              </Link>
              .
            </p>
            <p className="mt-4 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-[12px] text-fog transition-colors hover:text-snow focus-ring"
              >
                <span aria-hidden>←</span>
                Back to main site
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
