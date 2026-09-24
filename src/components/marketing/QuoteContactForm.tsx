"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/content/company";

export function QuoteContactForm() {
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const lane = String(data.get("lane") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();

    const subject = encodeURIComponent(`Freight quote request — ${lane || "ITC Group USA"}`);
    const body = encodeURIComponent(
      [
        "Hello ITC Group USA,",
        "",
        "I would like a freight quote.",
        "",
        `From (work email): ${email}`,
        `Lane: ${lane}`,
        "",
        "Shipment details:",
        details,
        "",
        "Thank you.",
      ].join("\n"),
    );

    window.location.href = `mailto:${COMPANY.contact.email}?subject=${subject}&body=${body}`;
    setStatus("opened");
  }

  return (
    <form className="mt-8 grid gap-4" noValidate onSubmit={onSubmit}>
      <div>
        <label htmlFor="quote-email" className="meta-label">
          Work email
        </label>
        <input
          id="quote-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="name@company.com"
          className="mt-2 h-11 w-full border border-line bg-ink/40 px-3 text-[13px] text-snow placeholder:text-mist/55 focus-ring focus:border-gold"
        />
      </div>
      <div>
        <label htmlFor="quote-lane" className="meta-label">
          Origin → Destination
        </label>
        <input
          id="quote-lane"
          name="lane"
          type="text"
          required
          placeholder="Origin → Destination"
          className="mt-2 h-11 w-full border border-line bg-ink/40 px-3 text-[13px] text-snow placeholder:text-mist/55 focus-ring focus:border-gold"
        />
      </div>
      <div>
        <label htmlFor="quote-details" className="meta-label">
          Shipment details
        </label>
        <textarea
          id="quote-details"
          name="details"
          required
          rows={5}
          placeholder="Commodity, pieces/weight, Incoterms, target ETA"
          className="mt-2 w-full border border-line bg-ink/40 px-3 py-3 text-[13px] text-snow placeholder:text-mist/55 focus-ring focus:border-gold"
        />
      </div>
      <Button type="submit" variant="quote" className="mt-2 w-fit" size="md">
        Email quote request
      </Button>
      <p className="text-[12px] leading-relaxed text-mist">
        Opens your email app with a message addressed to{" "}
        <a
          href={`mailto:${COMPANY.contact.email}`}
          className="text-gold underline-offset-2 hover:underline focus-ring"
        >
          {COMPANY.contact.email}
        </a>
        . Nothing is stored on this site.
        {status === "opened" ? " If nothing opened, email that address directly." : null}
      </p>
    </form>
  );
}
