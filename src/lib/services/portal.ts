import type {
  ActivityItem,
  DashboardSummary,
  Invoice,
  PortalUser,
  ShippingDocument,
  Shipment,
  ShipmentStatus,
} from "@/lib/types";

import mockShipments from "../../../data/mock-shipments.json";
import mockInvoices from "../../../data/mock-invoices.json";
import mockDocuments from "../../../data/mock-documents.json";
import mockUsers from "../../../data/mock-users.json";

const USE_MOCK = process.env.NEXT_PUBLIC_DATA_MODE !== "live";

function delay(ms = 180) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function asShipments(): Shipment[] {
  return mockShipments as Shipment[];
}

function asInvoices(): Invoice[] {
  return mockInvoices as Invoice[];
}

function asDocuments(): ShippingDocument[] {
  return mockDocuments as ShippingDocument[];
}

function asUsers(): PortalUser[] {
  return mockUsers as PortalUser[];
}

export async function listShipments(filters?: {
  query?: string;
  status?: ShipmentStatus | "All";
  mode?: string;
}): Promise<Shipment[]> {
  if (!USE_MOCK) {
    throw new Error("Live shipment API is not configured.");
  }

  await delay();
  let results = asShipments();

  if (filters?.status && filters.status !== "All") {
    results = results.filter((s) => s.status === filters.status);
  }

  if (filters?.mode && filters.mode !== "All") {
    results = results.filter((s) => s.mode === filters.mode);
  }

  if (filters?.query?.trim()) {
    const q = filters.query.trim().toLowerCase();
    results = results.filter(
      (s) =>
        s.id.toLowerCase().includes(q) ||
        s.customer.toLowerCase().includes(q) ||
        s.origin.toLowerCase().includes(q) ||
        s.destination.toLowerCase().includes(q) ||
        s.reference.toLowerCase().includes(q) ||
        s.commodity.toLowerCase().includes(q),
    );
  }

  return results.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function getShipment(id: string): Promise<Shipment | null> {
  if (!USE_MOCK) {
    throw new Error("Live shipment API is not configured.");
  }
  await delay();
  return asShipments().find((s) => s.id === id) ?? null;
}

export async function findShipmentByTrack(track: string): Promise<Shipment | null> {
  if (!USE_MOCK) {
    throw new Error("Live shipment API is not configured.");
  }
  await delay(80);
  const raw = track.trim().toLowerCase();
  const compact = raw.replace(/[\s-]/g, "");
  if (!raw) return null;

  return (
    asShipments().find((s) => {
      const id = s.id.toLowerCase();
      const ref = s.reference.toLowerCase();
      return (
        id === raw ||
        ref === raw ||
        id.replace(/[\s-]/g, "") === compact ||
        ref.replace(/[\s-]/g, "") === compact
      );
    }) ?? null
  );
}

export async function listInvoices(): Promise<Invoice[]> {
  if (!USE_MOCK) {
    throw new Error("Live invoice API is not configured.");
  }
  await delay();
  return asInvoices();
}

export async function listDocuments(shipmentId?: string): Promise<ShippingDocument[]> {
  if (!USE_MOCK) {
    throw new Error("Live document API is not configured.");
  }
  await delay();
  const docs = asDocuments();
  return shipmentId ? docs.filter((d) => d.shipmentId === shipmentId) : docs;
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  await delay();
  const shipments = asShipments();
  const invoices = asInvoices();
  const documents = asDocuments();

  return {
    activeShipments: shipments.filter((s) => s.status !== "Delivered").length,
    pendingCustoms: shipments.filter((s) => s.status === "Customs Clearance").length,
    openInvoices: invoices.filter((i) => i.status === "Open").length,
    recentDocuments: documents.length,
    exceptions: shipments.filter((s) => s.status === "Exception").length,
  };
}

export async function getActivityFeed(): Promise<ActivityItem[]> {
  await delay();
  const shipments = asShipments();

  return [
    {
      id: "act-1",
      timestamp: "2026-07-28T14:22:00Z",
      title: "Customs clearance underway",
      detail: `${shipments[0]?.id} · MedAxis Devices · JFK entry`,
      severity: "warning",
      href: "/portal/shipments/SHP-2026-001",
    },
    {
      id: "act-2",
      timestamp: "2026-07-28T09:05:00Z",
      title: "Documentation hold",
      detail: `${shipments[4]?.id} · Atlas Defense · Dover AFB`,
      severity: "critical",
      href: "/portal/shipments/SHP-2026-005",
    },
    {
      id: "act-3",
      timestamp: "2026-07-29T07:15:00Z",
      title: "Out for delivery",
      detail: `${shipments[5]?.id} · Coastal Beverage · Boston metro`,
      severity: "info",
      href: "/portal/shipments/SHP-2026-006",
    },
    {
      id: "act-4",
      timestamp: "2026-07-25T17:40:00Z",
      title: "Delivered — POD on file",
      detail: `${shipments[3]?.id} · MedAxis Devices · East Rockaway DC`,
      severity: "success",
      href: "/portal/shipments/SHP-2026-004",
    },
    {
      id: "act-5",
      timestamp: "2026-07-27T22:00:00Z",
      title: "Vessel arrived destination port",
      detail: `${shipments[7]?.id} · Harbor Retail · Newark`,
      severity: "info",
      href: "/portal/shipments/SHP-2026-008",
    },
  ];
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<PortalUser | null> {
  await delay(320);
  const user = asUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
  // Demo credentials: any listed email + password "portal2026"
  if (!user || password !== "portal2026") {
    return null;
  }
  return user;
}

export function getDemoCredentials() {
  return {
    email: asUsers()[0]?.email ?? "ops@clientco.com",
    password: "portal2026",
  };
}
