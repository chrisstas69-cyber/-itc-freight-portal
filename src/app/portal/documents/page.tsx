import type { Metadata } from "next";
import { listDocuments } from "@/lib/services/portal";
import { formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/ui/States";
import { PortalPageHeader } from "@/components/portal/PageHeader";

export const metadata: Metadata = {
  title: "Documents",
};

export default async function DocumentsPage() {
  const documents = await listDocuments();

  return (
    <div className="space-y-7">
      <PortalPageHeader
        eyebrow="Entry filings · shipping files"
        title="Document vault"
        description="Centralized access to AWBs, bills of lading, packing lists, commercial invoices, arrival notices, and customs entry packets — tied to the same shipment IDs used for clearance and bonded CFS milestones."
        meta={
          documents.length > 0 ? (
            <div className="text-right">
              <p className="portal-eyebrow">Files on record</p>
              <p className="mono-ref mt-1.5 text-[13px] text-snow">{documents.length}</p>
            </div>
          ) : undefined
        }
      />

      {documents.length === 0 ? (
        <EmptyState
          title="No customs or shipping documents yet"
          description="When ITC Group posts entry filings, commercial documents, or carrier paperwork against a shipment, they appear here for authorized download — alongside clearance and bonded staging status."
        />
      ) : (
        <>
          <p className="text-[12px] leading-relaxed text-mist">
            Use this vault for customs response, CFS release support, and receiving
            audits — every file inherits its shipment ID.
          </p>
          <div className="overflow-x-auto border border-line hairline-top">
            <table className="w-full min-w-[720px] text-left text-[13px]">
              <thead className="border-b border-line bg-panel-elevated">
                <tr>
                  {["File name", "Type", "Shipment", "Posted", ""].map((col) => (
                    <th
                      key={col || "action"}
                      className={`table-head px-3.5 py-3 font-medium ${col === "" ? "text-right" : "text-left"}`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, idx) => (
                  <tr
                    key={doc.documentId}
                    className={`group border-b border-line/50 transition-colors hover:bg-panel-hover/80 ${
                      idx % 2 === 1 ? "bg-ink/30" : ""
                    }`}
                  >
                    <td className="px-3.5 py-3 data-cell-primary">{doc.fileName}</td>
                    <td className="px-3.5 py-3 text-fog">{doc.type}</td>
                    <td className="px-3.5 py-3 data-cell-primary text-fog">
                      {doc.shipmentId}
                    </td>
                    <td className="mono-ref px-3.5 py-3 text-[13px] text-mist">
                      {formatDate(doc.uploadedAt)}
                    </td>
                    <td className="px-3.5 py-3 text-right">
                      <button
                        type="button"
                        className="text-[12px] tracking-wide text-steel-bright opacity-80 transition-opacity group-hover:opacity-100 hover:text-snow focus-ring"
                      >
                        Download
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
