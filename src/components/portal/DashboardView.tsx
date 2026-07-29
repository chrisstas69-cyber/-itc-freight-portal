"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import {
  getActivityFeed,
  getDashboardSummary,
  listDocuments,
  listInvoices,
} from "@/lib/services/portal";
import type { ActivityItem, DashboardSummary, Invoice, ShippingDocument } from "@/lib/types";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";
import { InvoiceStatusBadge } from "@/components/ui/StatusBadge";
import { LoadingState, ErrorState, PanelEmpty } from "@/components/ui/States";
import { ShipmentsModule } from "@/components/portal/ShipmentsModule";
import { PortalPageHeader } from "@/components/portal/PageHeader";
import { cn } from "@/lib/utils";

export function DashboardView() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [documents, setDocuments] = useState<ShippingDocument[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [asOf] = useState(() => new Date().toISOString());

  useEffect(() => {
    async function load() {
      try {
        const [s, a, inv, docs] = await Promise.all([
          getDashboardSummary(),
          getActivityFeed(),
          listInvoices(),
          listDocuments(),
        ]);
        setSummary(s);
        setActivity(a);
        setInvoices(inv.filter((i) => i.status === "Open").slice(0, 3));
        setDocuments(docs.slice(0, 4));
      } catch {
        setError("Operations summary could not be loaded.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <LoadingState label="Loading clearance visibility…" />;
  if (error || !summary) {
    return <ErrorState description={error ?? "Unable to load visibility console."} />;
  }

  const kpis = [
    {
      label: "Active shipments",
      value: summary.activeShipments,
      href: "/portal/shipments",
      note: "Live status across modes",
      accent: "border-l-steel",
    },
    {
      label: "Import clearance",
      value: summary.pendingCustoms,
      href: "/portal/shipments?status=Customs%20Clearance",
      note: "Entry / exam / bonded hold",
      accent: "border-l-status-customs",
    },
    {
      label: "Open invoices",
      value: summary.openInvoices,
      href: "/portal/invoices",
      note: "Freight · brokerage · CFS",
      accent: "border-l-status-customs",
    },
    {
      label: "Exception alerts",
      value: summary.exceptions,
      href: "/portal/shipments?status=Exception",
      note: "Release holds needing action",
      accent: "border-l-status-exception",
    },
  ];

  return (
    <div className="space-y-8">
      <PortalPageHeader
        eyebrow="Import clearance visibility"
        title="Shipment control"
        description="Track customs clearance, bonded CFS staging, cargo release events, documents, and invoices — one record from entry through delivery."
        meta={
          <div>
            <p className="portal-eyebrow">Status as of</p>
            <p className="mono-ref mt-1.5 text-[12px] text-mist">
              {formatDateTime(asOf)}
            </p>
          </div>
        }
      />

      <div className="grid grid-cols-2 border border-line lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className={cn(
              "group border-l-2 bg-panel px-4 py-5 transition-colors hover:bg-panel-hover focus-ring sm:px-5 sm:py-6 hairline-top",
              kpi.accent,
              i % 2 === 1 && "border-r border-line lg:border-r-0",
              i >= 2 && "border-t border-line lg:border-t-0",
              i >= 1 && "lg:border-l lg:border-line lg:!border-l-2",
            )}
          >
            <p className="meta-label">{kpi.label}</p>
            <p className="kpi-value mt-3">{kpi.value}</p>
            <p className="mt-3 text-[11px] leading-snug text-mist group-hover:text-fog">
              {kpi.note}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_19rem] xl:gap-7">
        <div className="min-w-0 space-y-3">
          <PanelHeading
            title="Live status & clearance"
            href="/portal/shipments"
            linkLabel="Full register"
          />
          <ShipmentsModule compact limit={5} />
        </div>

        <div className="space-y-5">
          <SidePanel title="Alerts · clearance & release" count={activity.length}>
            {activity.length === 0 ? (
              <PanelEmpty message="No clearance or release alerts in this window." />
            ) : (
              <ul className="divide-y divide-line">
                {activity.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href ?? "/portal"}
                      className="block px-4 py-3 transition-colors hover:bg-panel-hover focus-ring"
                    >
                      <div className="flex items-start gap-2">
                        <SeverityDot severity={item.severity} />
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] leading-snug text-snow">
                            {item.title}
                          </p>
                          <p className="mt-1 text-[11px] leading-relaxed text-mist">
                            {item.detail}
                          </p>
                          <p className="mono-ref mt-1.5 text-[10px] text-mist/80">
                            {formatDate(item.timestamp, {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </SidePanel>

          <SidePanel
            title="Open invoices"
            href="/portal/invoices"
            linkLabel="All"
            count={invoices.length}
          >
            {invoices.length === 0 ? (
              <PanelEmpty message="No unpaid invoices on this account." />
            ) : (
              <ul className="divide-y divide-line">
                {invoices.map((inv) => (
                  <li
                    key={inv.invoiceId}
                    className="flex items-start justify-between gap-3 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="mono-ref text-[13px] text-snow">{inv.invoiceId}</p>
                      <p className="mt-0.5 text-[11px] text-mist">
                        Due {formatDate(inv.dueDate)}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="mono-ref text-[13px] text-snow">
                        {formatCurrency(inv.amount, inv.currency)}
                      </p>
                      <InvoiceStatusBadge status={inv.status} className="mt-1" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </SidePanel>

          <SidePanel
            title="Customs & shipping docs"
            href="/portal/documents"
            linkLabel="Open"
            count={documents.length}
          >
            {documents.length === 0 ? (
              <PanelEmpty message="No entry or shipping files centralized yet." />
            ) : (
              <ul className="divide-y divide-line">
                {documents.map((doc) => (
                  <li key={doc.documentId} className="px-4 py-3">
                    <p className="text-[13px] text-snow">{doc.type}</p>
                    <p className="mono-ref mt-0.5 truncate text-[11px] text-mist">
                      {doc.shipmentId} · {doc.fileName}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </SidePanel>
        </div>
      </div>
    </div>
  );
}

function PanelHeading({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line pb-2.5">
      <h2 className="meta-label text-fog">{title}</h2>
      <Link
        href={href}
        className="text-[12px] text-steel-bright transition-colors hover:text-snow focus-ring"
      >
        {linkLabel}
      </Link>
    </div>
  );
}

function SidePanel({
  title,
  href,
  linkLabel,
  count,
  children,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  count?: number;
  children: ReactNode;
}) {
  return (
    <section className="border border-line bg-panel hairline-top">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <h2 className="meta-label text-fog">
          {title}
          {count !== undefined ? (
            <span className="ml-2 font-normal text-mist">({count})</span>
          ) : null}
        </h2>
        {href && linkLabel ? (
          <Link
            href={href}
            className="text-[11px] text-steel-bright transition-colors hover:text-snow focus-ring"
          >
            {linkLabel}
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function SeverityDot({ severity }: { severity: ActivityItem["severity"] }) {
  const colors = {
    info: "bg-status-transit",
    warning: "bg-status-customs",
    critical: "bg-status-exception",
    success: "bg-status-delivered",
  };
  return (
      <span
      className={cn("mt-1.5 size-1.5 shrink-0", colors[severity])}
      aria-hidden
    />
  );
}
