import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/marketing/ServicePageView";
import { getService, SERVICE_SLUGS } from "@/lib/content/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Services" };
  return {
    title: service.title,
    description: service.heroLine,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServicePageView service={service} />;
}
