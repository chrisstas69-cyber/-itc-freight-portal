export type ShipmentMode = "Air" | "Ocean" | "Truck" | "Rail";

export type ShipmentStatus =
  | "Booked"
  | "In Transit"
  | "Customs Clearance"
  | "Out for Delivery"
  | "Delivered"
  | "Exception";

export type Milestone = {
  label: string;
  at: string | null;
  location: string;
  completed: boolean;
};

export type Shipment = {
  id: string;
  customer: string;
  mode: ShipmentMode;
  origin: string;
  destination: string;
  eta: string;
  status: ShipmentStatus;
  reference: string;
  referenceType: "AWB" | "Container" | "PRO" | "BOL";
  pieces: number;
  weightKg: number;
  commodity: string;
  updatedAt: string;
  milestones: Milestone[];
};

export type InvoiceStatus = "Open" | "Paid" | "Overdue";

export type Invoice = {
  invoiceId: string;
  shipmentId: string;
  customer: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  dueDate: string;
  issuedAt: string;
  pdfUrl: string;
};

export type ShippingDocument = {
  documentId: string;
  shipmentId: string;
  type: string;
  uploadedAt: string;
  fileName: string;
};

export type PortalUser = {
  id: string;
  name: string;
  email: string;
  role: "customer_admin" | "customer_user";
};

export type DashboardSummary = {
  activeShipments: number;
  pendingCustoms: number;
  openInvoices: number;
  recentDocuments: number;
  exceptions: number;
};

export type ActivityItem = {
  id: string;
  timestamp: string;
  title: string;
  detail: string;
  severity: "info" | "warning" | "critical" | "success";
  href?: string;
};
