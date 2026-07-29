import type { Metadata } from "next";
import { listInvoices } from "@/lib/services/portal";
import { formatCurrency, formatDate } from "@/lib/utils";
import { InvoiceStatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/States";
import { PortalPageHeader } from "@/components/portal/PageHeader";

export const metadata: Metadata = {
  title: "Invoices",
};

export default async function InvoicesPage() {
  const invoices = await listInvoices();
  const openCount = invoices.filter((i) => i.status === "Open").length;

  return (
    <div className="space-y-7">
      <PortalPageHeader
        eyebrow="Freight · brokerage · Bonded CFS"
        title="Invoices"
        description="Invoices for freight, customs brokerage, and Bonded CFS handling — PDFs linked to the same shipment IDs you track for import clearance and cargo release."
        meta={
          invoices.length > 0 ? (
            <div className="text-right">
              <p className="portal-eyebrow">Attention</p>
              <p className="mt-1.5 text-[13px] text-snow">
                <span className="mono-ref">{openCount}</span>
                <span className="ml-1.5 text-mist">open / unpaid</span>
              </p>
            </div>
          ) : undefined
        }
      />

      {invoices.length === 0 ? (
        <EmptyState
          title="No invoices on this account"
          description="When ITC Group bills freight, customs brokerage, or Bonded CFS charges against your shipments, invoice PDFs list here with due dates — on the same record as clearance milestones and documents."
        />
      ) : (
        <>
          <p className="text-[12px] leading-relaxed text-mist">
            Open invoices also appear on the clearance visibility console. Download
            the PDF for line detail and remittance instructions.
          </p>
          <div className="overflow-x-auto border border-line hairline-top">
            <table className="w-full min-w-[720px] text-left text-[13px]">
              <thead className="border-b border-line bg-panel-elevated">
                <tr>
                  {["Invoice", "Shipment", "Amount", "Due date", "Status", ""].map(
                    (col) => (
                      <th
                        key={col || "action"}
                        className={`table-head px-3.5 py-3 font-medium ${col === "" ? "text-right" : "text-left"}`}
                      >
                        {col}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, idx) => (
                  <tr
                    key={inv.invoiceId}
                    className={`group border-b border-line/50 transition-colors hover:bg-panel-hover/80 ${
                      idx % 2 === 1 ? "bg-ink/30" : ""
                    }`}
                  >
                    <td className="px-3.5 py-3">
                      <p className="data-cell-primary">{inv.invoiceId}</p>
                      <p className="mt-0.5 text-[11px] text-mist">{inv.customer}</p>
                    </td>
                    <td className="px-3.5 py-3 data-cell-primary text-fog">
                      {inv.shipmentId}
                    </td>
                    <td className="mono-ref px-3.5 py-3 text-[13px] text-snow">
                      {formatCurrency(inv.amount, inv.currency)}
                    </td>
                    <td className="mono-ref px-3.5 py-3 text-[13px] text-mist">
                      {formatDate(inv.dueDate)}
                    </td>
                    <td className="px-3.5 py-3">
                      <InvoiceStatusBadge status={inv.status} />
                    </td>
                    <td className="px-3.5 py-3 text-right">
                      <button
                        type="button"
                        className="text-[12px] tracking-wide text-steel-bright opacity-80 transition-opacity group-hover:opacity-100 hover:text-snow focus-ring"
                      >
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
