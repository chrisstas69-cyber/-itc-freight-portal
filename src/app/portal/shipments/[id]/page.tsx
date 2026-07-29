import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MilestoneTimeline } from "@/components/portal/MilestoneTimeline";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { listDocuments, getShipment } from "@/lib/services/portal";
import { formatDate, formatDateTime, formatWeight } from "@/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: id };
}

export default async function ShipmentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const shipment = await getShipment(id);
  if (!shipment) notFound();

  const documents = await listDocuments(shipment.id);
  const completed = shipment.milestones.filter((m) => m.completed).length;
  const currentMilestone =
    [...shipment.milestones].reverse().find((m) => m.completed)?.label ??
    shipment.status;

  const pickup = shipment.milestones.find(
    (m) => m.label === "Picked Up" || m.label === "Loaded at Origin",
  );
  const delivered = shipment.milestones.find((m) => m.label === "Delivered");
  const outForDelivery = shipment.milestones.find(
    (m) => m.label === "Out for Delivery",
  );

  const pickupStatus = !pickup
    ? "Not scheduled"
    : pickup.completed && pickup.at
      ? `Picked up · ${formatDateTime(pickup.at)}`
      : "Awaiting pickup";

  const podStatus =
    delivered?.completed && delivered.at
      ? "POD on file"
      : outForDelivery?.completed
        ? "Pending delivery / POD"
        : "Not yet delivered";

  return (
    <div className="space-y-7">
      <header className="border-b border-line pb-7">
        <Link
          href="/portal/shipments"
          className="text-[11px] tracking-wide text-mist transition-colors hover:text-fog focus-ring"
        >
          ← Live shipment register
        </Link>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-5">
          <div className="min-w-0">
            <p className="portal-eyebrow">Shipment control</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="mono-ref text-[1.375rem] font-semibold tracking-tight text-snow sm:text-[1.625rem]">
                {shipment.id}
              </h1>
              <StatusBadge status={shipment.status} />
            </div>
            <p className="mt-2.5 text-[13px] text-fog">
              {shipment.customer}
              <span className="mx-2 text-line-strong">·</span>
              <span className="text-mist">{shipment.commodity}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-4 sm:text-right">
            <div>
              <p className="meta-label">Clearance / release stage</p>
              <p className="mt-1.5 text-[13px] text-snow">{currentMilestone}</p>
            </div>
            <div>
              <p className="meta-label">Last status update</p>
              <p className="mono-ref mt-1.5 text-[12px] text-fog">
                {formatDateTime(shipment.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Lane / route",
            value: `${shipment.origin} → ${shipment.destination}`,
            mono: false,
          },
          { label: "Mode", value: shipment.mode, mono: false },
          { label: "ETA", value: formatDate(shipment.eta), mono: true },
          {
            label: shipment.referenceType,
            value: shipment.reference,
            mono: true,
          },
        ].map((item) => (
          <div key={item.label} className="bg-panel px-4 py-4 hairline-top">
            <p className="meta-label">{item.label}</p>
            <p
              className={`mt-2 text-[13px] text-snow ${item.mono ? "mono-ref" : ""}`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
        <div className="bg-panel px-4 py-4 hairline-top">
          <p className="meta-label">Pickup status</p>
          <p className="mt-2 text-[13px] text-snow">{pickupStatus}</p>
          {pickup?.location ? (
            <p className="mt-1 text-[12px] text-mist">{pickup.location}</p>
          ) : null}
        </div>
        <div className="bg-panel px-4 py-4 hairline-top">
          <p className="meta-label">POD — proof of delivery</p>
          <p className="mt-2 text-[13px] text-snow">{podStatus}</p>
          {delivered?.completed && delivered.at ? (
            <p className="mt-1 text-[12px] text-mist">
              Delivered {formatDateTime(delivered.at)}
              {delivered.location ? ` · ${delivered.location}` : ""}
            </p>
          ) : (
            <p className="mt-1 text-[12px] text-mist">
              POD posts when delivery is confirmed against this shipment ID.
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="border border-line bg-panel p-5 hairline-top md:p-6 lg:col-span-3">
          <div className="mb-6 flex items-baseline justify-between gap-3 border-b border-line pb-3.5">
            <div>
              <h2 className="meta-label text-fog">Clearance & bonded milestones</h2>
              <p className="mt-1.5 text-[12px] leading-relaxed text-mist">
                Import clearance, bonded staging, pickup, release, and delivery
                events — source of truth for this shipment
              </p>
            </div>
            <p className="mono-ref shrink-0 text-[12px] text-mist">
              {completed}/{shipment.milestones.length} complete
            </p>
          </div>
          <MilestoneTimeline milestones={shipment.milestones} />
        </section>

        <div className="space-y-6 lg:col-span-2">
          <section className="border border-line bg-panel p-5 hairline-top">
            <h2 className="meta-label text-fog">Cargo</h2>
            <dl className="mt-4 space-y-0 border border-line">
              {[
                ["Commodity", shipment.commodity],
                ["Pieces", String(shipment.pieces)],
                ["Weight", formatWeight(shipment.weightKg)],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className={`grid grid-cols-[5.5rem_1fr] gap-2 px-3.5 py-3 text-[13px] ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <dt className="text-mist">{k}</dt>
                  <dd className="text-snow">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="border border-line bg-panel p-5 hairline-top">
            <div className="flex items-center justify-between gap-3">
              <h2 className="meta-label text-fog">Entry & shipping documents</h2>
              <Link
                href="/portal/documents"
                className="text-[11px] text-steel-bright transition-colors hover:text-snow focus-ring"
              >
                Full vault
              </Link>
            </div>
            {documents.length === 0 ? (
              <p className="mt-4 border border-dashed border-line/80 px-3.5 py-6 text-[13px] leading-relaxed text-mist">
                No entry filings or shipping documents posted yet.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-line border border-line">
                {documents.map((doc) => (
                  <li
                    key={doc.documentId}
                    className="flex items-center justify-between gap-3 px-3.5 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-[13px] text-snow">{doc.type}</p>
                      <p className="mono-ref truncate text-[11px] text-mist">
                        {doc.fileName}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 text-[12px] text-steel-bright transition-colors hover:text-snow focus-ring"
                    >
                      Download
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
