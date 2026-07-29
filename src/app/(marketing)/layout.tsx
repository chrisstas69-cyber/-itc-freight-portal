import { MarketingThemeProvider } from "@/components/marketing/MarketingTheme";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteHeader } from "@/components/marketing/SiteHeader";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MarketingThemeProvider>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </MarketingThemeProvider>
  );
}
