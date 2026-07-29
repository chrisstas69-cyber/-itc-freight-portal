import type { Metadata } from "next";
import { ShipmentsModule } from "@/components/portal/ShipmentsModule";
import { PortalPageHeader } from "@/components/portal/PageHeader";

export const metadata: Metadata = {
  title: "Shipments",
};

export default function ShipmentsPage() {
  return (
    <div className="space-y-7">
      <PortalPageHeader
        eyebrow="Visibility · freight register"
        title="Shipments"
        description="Monitor live status, import clearance, and bonded CFS stages. Filter by customs status or exception, then open a row for clearance milestones, cargo release events, and entry documents."
      />
      <ShipmentsModule />
    </div>
  );
}
