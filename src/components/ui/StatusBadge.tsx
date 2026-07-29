import { cn } from "@/lib/utils";
import type { ShipmentStatus } from "@/lib/types";

const STATUS_STYLES: Record<
  ShipmentStatus,
  { border: string; bg: string; text: string; dot: string }
> = {
  Booked: {
    border: "border-line-strong",
    bg: "bg-transparent",
    text: "text-fog",
    dot: "bg-status-booked",
  },
  "In Transit": {
    border: "border-status-transit/40",
    bg: "bg-status-transit/[0.08]",
    text: "text-steel-bright",
    dot: "bg-status-transit",
  },
  "Customs Clearance": {
    border: "border-status-customs/40",
    bg: "bg-status-customs/[0.08]",
    text: "text-status-customs",
    dot: "bg-status-customs",
  },
  "Out for Delivery": {
    border: "border-status-delivery/40",
    bg: "bg-status-delivery/[0.08]",
    text: "text-status-delivery",
    dot: "bg-status-delivery",
  },
  Delivered: {
    border: "border-status-delivered/40",
    bg: "bg-status-delivered/[0.08]",
    text: "text-status-delivered",
    dot: "bg-status-delivered",
  },
  Exception: {
    border: "border-status-exception/40",
    bg: "bg-status-exception/[0.08]",
    text: "text-status-exception",
    dot: "bg-status-exception",
  },
};

type StatusBadgeProps = {
  status: ShipmentStatus;
  className?: string;
  compact?: boolean;
};

export function StatusBadge({ status, className, compact = false }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 border font-medium whitespace-nowrap",
        compact ? "h-5 px-1.5 text-[10px]" : "h-6 px-2 text-[10px]",
        style.border,
        style.bg,
        style.text,
        className,
      )}
    >
      <span className={cn("size-1.5 shrink-0", style.dot)} aria-hidden />
      <span className="truncate tracking-[0.06em] uppercase">{status}</span>
    </span>
  );
}

type InvoiceStatusBadgeProps = {
  status: "Open" | "Paid" | "Overdue";
  className?: string;
};

export function InvoiceStatusBadge({ status, className }: InvoiceStatusBadgeProps) {
  const map = {
    Open: "border-status-customs/40 bg-status-customs/[0.08] text-status-customs",
    Paid: "border-status-delivered/40 bg-status-delivered/[0.08] text-status-delivered",
    Overdue: "border-status-exception/40 bg-status-exception/[0.08] text-status-exception",
  };

  return (
    <span
      className={cn(
        "inline-flex h-5 items-center border px-2 text-[10px] font-medium tracking-[0.06em] uppercase",
        map[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
