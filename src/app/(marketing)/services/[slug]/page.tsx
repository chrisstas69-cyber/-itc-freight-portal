import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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

  return (
    <article>
      <header className="border-b border-line bg-obsidian">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <p className="section-label">Services</p>
          <h1 className="display-title mt-4 max-w-3xl text-[2rem] md:text-[2.5rem]">
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fog">
            {service.heroLine}
          </p>
          <Link
            href="/contact#quote"
            className="mt-8 inline-flex h-10 items-center bg-steel px-5 text-[13px] font-medium text-white transition-colors hover:bg-steel-bright focus-ring"
          >
            Request a quote
          </Link>
        </div>
      </header>

      <section className="border-b border-line bg-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-12 md:gap-12 md:px-8 md:py-16">
          <div className="md:col-span-7">
            <h2 className="display-title text-[1.375rem]">Overview</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fog">{service.overview}</p>
          </div>
          <aside className="border border-line bg-panel p-5 hairline-top md:col-span-5 md:p-6">
            <h2 className="meta-label text-fog">Credentials</h2>
            <ul className="mt-4 space-y-3">
              {service.credentials.map((item) => (
                <li
                  key={item}
                  className="border-b border-line pb-3 text-[13px] leading-relaxed text-snow last:border-0 last:pb-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
          <h2 className="display-title text-[1.375rem]">What we handle</h2>
          <ul className="mt-8 grid gap-0 border-t border-line md:grid-cols-2">
            {service.handles.map((item) => (
              <li
                key={item}
                className="border-b border-line py-4 pr-6 text-[14px] leading-relaxed text-fog md:odd:border-r"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {service.process ? (
        <section className="border-b border-line bg-ink">
          <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
            <h2 className="display-title text-[1.375rem]">How clearance moves</h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-mist">
              A clear path from documents to release — coordinated with bonded
              staging when entry status requires it.
            </p>
            <ol className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step) => (
                <li key={step.step} className="bg-panel p-5 hairline-top md:p-6">
                  <p className="mono-ref text-[12px] text-gold">{step.step}</p>
                  <h3 className="mt-3 text-[15px] font-medium tracking-tight text-snow">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-mist">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <section className="bg-obsidian">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-8 md:py-16">
          <div>
            <p className="section-label">Next step</p>
            <h2 className="display-title mt-3 text-[1.375rem]">
              Price this service with your lane
            </h2>
            <p className="mt-2 max-w-md text-[13px] text-fog">
              Include origin, destination, mode, commodity, and target ETA. Quotes
              can combine brokerage, Bonded CFS, and freight.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact#quote"
              className="inline-flex h-10 items-center bg-steel px-5 text-[13px] font-medium text-white hover:bg-steel-bright focus-ring"
            >
              Request a quote
            </Link>
            <Link
              href="/services"
              className="inline-flex h-10 items-center border border-line px-5 text-[13px] text-fog hover:text-snow focus-ring"
            >
              All services
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
