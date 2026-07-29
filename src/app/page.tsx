import type { Metadata } from "next";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { MarketingThemeProvider } from "@/components/marketing/MarketingTheme";
import {
  FacilitySection,
  HomeHero,
  IndustriesSection,
  OperationsStrip,
  QuoteAndPortalCTA,
  ServicesSection,
  TrustStrip,
} from "@/components/marketing/HomeSections";

export const metadata: Metadata = {
  title: "ITC Group Inc. | Freight Forwarding & Logistics",
};

export default function HomePage() {
  return (
    <MarketingThemeProvider>
      <SiteHeader />
      <main>
        <HomeHero />
        <TrustStrip />
        <ServicesSection />
        <FacilitySection />
        <OperationsStrip />
        <IndustriesSection />
        <QuoteAndPortalCTA />
      </main>
      <SiteFooter />
    </MarketingThemeProvider>
  );
}
