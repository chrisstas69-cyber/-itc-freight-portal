import type { Metadata } from "next";
import { PortalPageHeader } from "@/components/portal/PageHeader";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <div className="space-y-7">
      <PortalPageHeader
        eyebrow="Profile"
        title="Account"
        description="Organization profile and portal access settings for your ITC Group client account."
      />

      <section className="max-w-xl border border-line bg-panel p-5 hairline-top md:p-6">
        <h2 className="meta-label text-fog">Session</h2>
        <p className="mt-3.5 text-[13px] leading-relaxed text-mist">
          User invites, notification preferences, and billing contacts will connect
          to the live identity provider in a later release. This demo uses mock
          client users from the local data layer.
        </p>
        <dl className="mt-6 space-y-0 border border-line">
          {[
            ["Company", "Client account (demo)"],
            ["Role model", "customer_admin · customer_user"],
            ["Data mode", "Mock service layer"],
          ].map(([k, v], i) => (
            <div
              key={k}
              className={`grid grid-cols-[7rem_1fr] gap-2 px-4 py-3.5 text-[13px] ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <dt className="text-mist">{k}</dt>
              <dd className="text-snow">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
