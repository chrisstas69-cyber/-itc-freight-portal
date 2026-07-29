"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";
import { listShipments } from "@/lib/services/portal";
import type { Shipment, ShipmentStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STATUSES: Array<ShipmentStatus | "All"> = [
  "All",
  "Booked",
  "In Transit",
  "Customs Clearance",
  "Out for Delivery",
  "Delivered",
  "Exception",
];

const MODES = ["All", "Air", "Ocean", "Truck"];

type ShipmentsModuleProps = {
  compact?: boolean;
  limit?: number;
};

export function ShipmentsModule({ compact = false, limit }: ShipmentsModuleProps) {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ShipmentStatus | "All">("All");
  const [mode, setMode] = useState("All");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  function load(next?: { query?: string; status?: ShipmentStatus | "All"; mode?: string }) {
    setLoading(true);
    setError(null);
    startTransition(async () => {
      try {
        const data = await listShipments({
          query: next?.query ?? query,
          status: next?.status ?? status,
          mode: next?.mode ?? mode,
        });
        setShipments(limit ? data.slice(0, limit) : data);
      } catch {
        setError("Shipment register could not be loaded.");
      } finally {
        setLoading(false);
      }
    });
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showFilters = !compact;
  const rows = useMemo(() => shipments, [shipments]);
  const isCompactTable = compact;

  return (
    <div className="space-y-3">
      {showFilters ? (
        <div className="border border-line bg-panel hairline-top">
          <div className="flex flex-col gap-3 border-b border-line px-4 py-3.5 lg:flex-row lg:items-end">
            <div className="flex-1">
              <label htmlFor="shipment-search" className="portal-eyebrow mb-1.5 block">
                Search
              </label>
              <input
                id="shipment-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") load({ query });
                }}
                placeholder="Shipment ID, AWB, container, customer, or lane"
                className="h-9 w-full border border-line bg-ink px-3 text-[13px] text-snow placeholder:text-mist/50 focus-ring focus:border-steel"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:w-72">
              <FilterSelect
                id="status-filter"
                label="Status"
                value={status}
                onChange={(v) => {
                  const next = v as ShipmentStatus | "All";
                  setStatus(next);
                  load({ status: next });
                }}
                options={STATUSES}
              />
              <FilterSelect
                id="mode-filter"
                label="Mode"
                value={mode}
                onChange={(v) => {
                  setMode(v);
                  load({ mode: v });
                }}
                options={MODES}
              />
            </div>
            <button
              type="button"
              onClick={() => load({ query })}
              className="h-9 shrink-0 border border-line-strong px-3.5 text-[12px] tracking-[0.04em] text-snow uppercase transition-colors hover:bg-panel-hover focus-ring"
            >
              Run filter
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 px-4 py-2.5">
            {STATUSES.filter((s) => s !== "All").map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setStatus(s);
                  load({ status: s });
                }}
                className={cn(
                  "border px-2 py-0.5 text-[10px] tracking-wide transition-colors focus-ring",
                  status === s
                    ? "border-steel/50 bg-steel/10 text-steel-bright"
                    : "border-line/80 text-mist hover:border-line-strong hover:text-fog",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {loading || isPending ? (
        <LoadingState label="Loading shipment register…" compact={isCompactTable} />
      ) : null}

      {error ? <ErrorState description={error} onRetry={() => load()} /> : null}

      {!loading && !error && rows.length === 0 ? (
        <EmptyState
          compact={isCompactTable}
          title="No shipments match this filter"
          description="Clear status or mode, or widen search. The register shows live air, ocean, and truck movements with milestone visibility on this account."
        />
      ) : null}

      {!loading && !error && rows.length > 0 ? (
        <>
          <div className="hidden overflow-x-auto border border-line hairline-top md:block">
            <table className="w-full min-w-[840px] text-left text-[13px]">
              <thead className="sticky top-0 z-10 border-b border-line bg-panel-elevated">
                <tr>
                  {["Shipment", "Lane", "Mode", "Carrier ref.", "ETA", "Status", ""].map(
                    (col) => (
                      <th
                        key={col || "action"}
                        className={cn(
                          "table-head px-3.5 font-medium",
                          isCompactTable ? "py-2.5" : "py-3",
                          col === "" ? "text-right" : "text-left",
                        )}
                      >
                        {col}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((shipment, idx) => (
                  <tr
                    key={shipment.id}
                    className={cn(
                      "group border-b border-line/50 transition-colors hover:bg-panel-hover/80",
                      idx % 2 === 1 ? "bg-ink/30" : "bg-transparent",
                    )}
                  >
                    <td className={cn("px-3.5 align-middle", isCompactTable ? "py-2.5" : "py-3")}>
                      <p className="data-cell-primary">{shipment.id}</p>
                      <p className="mt-0.5 truncate text-[11px] text-mist">
                        {shipment.customer}
                      </p>
                    </td>
                    <td className={cn("px-3.5 align-middle", isCompactTable ? "py-2.5" : "py-3")}>
                      <p className="text-[13px] text-snow">{shipment.origin}</p>
                      <p className="text-[11px] text-mist">→ {shipment.destination}</p>
                    </td>
                    <td
                      className={cn(
                        "px-3.5 align-middle text-[13px] text-fog",
                        isCompactTable ? "py-2.5" : "py-3",
                      )}
                    >
                      {shipment.mode}
                    </td>
                    <td className={cn("px-3.5 align-middle", isCompactTable ? "py-2.5" : "py-3")}>
                      <p className="meta-label">{shipment.referenceType}</p>
                      <p className="data-cell-primary mt-0.5 text-fog">{shipment.reference}</p>
                    </td>
                    <td
                      className={cn(
                        "mono-ref px-3.5 align-middle text-[13px] text-fog",
                        isCompactTable ? "py-2.5" : "py-3",
                      )}
                    >
                      {formatDate(shipment.eta)}
                    </td>
                    <td className={cn("px-3.5 align-middle", isCompactTable ? "py-2.5" : "py-3")}>
                      <StatusBadge status={shipment.status} compact={isCompactTable} />
                    </td>
                    <td
                      className={cn(
                        "px-3.5 align-middle text-right",
                        isCompactTable ? "py-2.5" : "py-3",
                      )}
                    >
                      <Link
                        href={`/portal/shipments/${shipment.id}`}
                        className="text-[12px] tracking-wide text-steel-bright opacity-75 transition-opacity group-hover:opacity-100 hover:text-snow focus-ring"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!isCompactTable ? (
            <p className="hidden text-[11px] text-mist md:block">
              {rows.length} shipment{rows.length === 1 ? "" : "s"} with live status · Open
              Details for milestones, alerts, and documents
            </p>
          ) : null}

          <div className="space-y-2 md:hidden">
            {rows.map((shipment) => (
              <Link
                key={shipment.id}
                href={`/portal/shipments/${shipment.id}`}
                className="block border border-line bg-panel px-4 py-3.5 hairline-top transition-colors hover:bg-panel-hover focus-ring"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="data-cell-primary">{shipment.id}</p>
                    <p className="mt-0.5 truncate text-[11px] text-mist">{shipment.customer}</p>
                  </div>
                  <StatusBadge status={shipment.status} compact />
                </div>
                <p className="mt-2 text-[13px] text-fog">
                  {shipment.origin} → {shipment.destination}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-mist">
                  <span>{shipment.mode}</span>
                  <span className="mono-ref">ETA {formatDate(shipment.eta)}</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className="portal-eyebrow mb-1.5 block">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full border border-line bg-ink px-2 text-[13px] text-snow focus-ring"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
