"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type TrackingBarProps = {
  variant?: "default" | "hero";
};

export function TrackingBar({ variant = "default" }: TrackingBarProps) {
  const router = useRouter();
  const [ref, setRef] = useState("");
  const hero = variant === "hero";

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = ref.trim();
    if (!q) return;
    router.push(`/login?track=${encodeURIComponent(q)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-2 sm:flex-row sm:items-stretch"
    >
      <label className="sr-only" htmlFor="public-track">
        Shipment reference
      </label>
      <input
        id="public-track"
        value={ref}
        onChange={(e) => setRef(e.target.value)}
        placeholder="AWB, container, PRO, or shipment ID"
        className={cn(
          "h-10 flex-1 px-3 text-[13px] focus-ring",
          hero
            ? "border border-white/25 bg-black/40 text-white placeholder:text-white/40 focus:border-white/50"
            : "border border-line bg-ink text-snow placeholder:text-mist/50 focus:border-steel",
        )}
      />
      <Button
        type="submit"
        size="md"
        className={cn(
          "sm:w-auto sm:shrink-0",
          hero && "border-[#4a7fa5] bg-[#4a7fa5] hover:border-[#6a9fc0] hover:bg-[#6a9fc0]",
        )}
      >
        Track status
      </Button>
    </form>
  );
}
