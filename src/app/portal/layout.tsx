import { PortalSidebar, PortalTopbar } from "@/components/portal/PortalShell";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh bg-ink">
      <PortalSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <PortalTopbar />
        <main className="flex-1 px-4 py-6 md:px-7 md:py-8">{children}</main>
      </div>
    </div>
  );
}
