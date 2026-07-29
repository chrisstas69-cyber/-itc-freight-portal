export type ServiceSlug =
  | "air-freight"
  | "ocean-freight"
  | "customs-clearance"
  | "cfs"
  | "drayage";

export type ServicePage = {
  slug: ServiceSlug;
  title: string;
  navLabel: string;
  teaser: string;
  heroLine: string;
  overview: string;
  handles: string[];
  credentials: string[];
  process?: { step: string; title: string; detail: string }[];
  /** Placeholder path — swap anytime under /public/images */
  heroImage: string;
  overviewImage: string;
  accent: "steel" | "gold" | "customs" | "facility" | "ground";
  icon: "air" | "ocean" | "customs" | "cfs" | "drayage";
};

export const SERVICES: ServicePage[] = [
  {
    slug: "air-freight",
    title: "Air Freight",
    navLabel: "Air Freight",
    teaser: "Priority and routine air imports through JFK and regional gateways.",
    heroLine: "Time-definite air movement with brokerage and bonded CFS handoffs.",
    overview:
      "ITC Group books and controls air freight for import programs that cannot wait on ocean schedules — medical devices, military support cargo, apparel samples, and other high-value or time-sensitive commodities. Air movements are coordinated with formal entry and, when needed, bonded staging at our East Rockaway CFS.",
    handles: [
      "Airport-to-airport and door-to-door air imports",
      "Priority and standard allocations",
      "Temperature-aware handling where the commodity requires it",
      "Document control for AWB, commercial invoice, and packing list",
      "Handoff into customs brokerage and Bonded CFS release",
    ],
    credentials: [
      "Integrated with ITC customs brokerage",
      "Bonded CFS staging available after arrival",
      "JFK and metro NY gateway coverage",
    ],
    heroImage: "/images/hero-port-v5.jpg",
    overviewImage: "/images/ops-warehouse.jpg",
    accent: "steel",
    icon: "air",
  },
  {
    slug: "ocean-freight",
    title: "Ocean / Sea Freight",
    navLabel: "Ocean / Sea Freight",
    teaser: "Container programs into Newark and U.S. coasts with release coordination.",
    heroLine: "Ocean container control from origin load through U.S. entry and release.",
    overview:
      "We manage ocean import programs — FCL and coordinated container movements — with commercial document control and a clear path into U.S. formal entry. Cargo arriving Newark and other U.S. ports can move into bonded staging at our CFS when entry status requires hold before outbound dispatch.",
    handles: [
      "FCL ocean booking and documentation",
      "ISF timing aligned to sailing and arrival",
      "Port arrival notices and exam coordination support",
      "Bonded CFS receiving after vessel discharge when required",
      "Drayage from port to East Rockaway or consignee",
    ],
    credentials: [
      "Customs brokerage on the same operational record",
      "US Customs Bonded Facility · Bonded CFS",
      "Newark / NY metro and multi-coast lanes",
    ],
    heroImage: "/images/hero-port-v6.jpg",
    overviewImage: "/images/ops-containers.jpg",
    accent: "gold",
    icon: "ocean",
  },
  {
    slug: "customs-clearance",
    title: "Customs Clearance & Brokerage",
    navLabel: "Customs Clearance & Brokerage",
    teaser: "U.S. formal entry, ISF, exam response, and release coordination.",
    heroLine: "Licensed customs brokerage for accurate entry and controlled release.",
    overview:
      "ITC Group is a licensed U.S. customs broker. We prepare and file formal entry, transmit ISF, support HTS classification, and manage clearance through exam or hold — so cargo moves from arrival status to release with a single operations desk accountable for the record. When bonded staging is required, entry status drives release from our Bonded CFS.",
    handles: [
      "Formal entry (7501) preparation and filing",
      "ISF / ABI transmission and timing",
      "HTS classification support against commercial documents",
      "Exam, hold, and CBP inquiry response",
      "Coordination with Bonded CFS staging and cargo release",
      "Entry packets available in the client portal",
    ],
    credentials: [
      "Licensed U.S. customs broker",
      "US Customs Bonded Facility operator · Bonded CFS",
      "Import clearance visibility in the client portal",
      "Operating since 1984 · East Rockaway, NY",
    ],
    process: [
      {
        step: "01",
        title: "Document intake",
        detail:
          "Commercial invoice, packing list, AWB or BOL, and commodity detail are checked before filing.",
      },
      {
        step: "02",
        title: "Entry & ISF",
        detail:
          "Formal entry and ISF are prepared and transmitted to meet CBP timing requirements.",
      },
      {
        step: "03",
        title: "Clearance events",
        detail:
          "Exam, hold, or release status is tracked and communicated against the shipment ID.",
      },
      {
        step: "04",
        title: "Release handoff",
        detail:
          "Released cargo moves to outbound dispatch or remains in bonded staging until authorized.",
      },
    ],
    heroImage: "/images/hero-port.jpg",
    overviewImage: "/images/ops-containers.jpg",
    accent: "customs",
    icon: "customs",
  },
  {
    slug: "cfs",
    title: "CFS — Container Freight Station",
    navLabel: "CFS (Container Freight Station)",
    teaser: "US Customs Bonded Facility for bonded staging and cargo release.",
    heroLine: "Bonded CFS at 500 Ocean Avenue — staging under bond, release by entry status.",
    overview:
      "Our headquarters operates as a US Customs Bonded Facility — a working Bonded CFS, not a sales office. Import cargo can be received under bond, held in bonded staging, and released in coordination with customs brokerage before outbound trucking to consignee docks across the NY metro and beyond.",
    handles: [
      "Bonded receiving and inventory control",
      "Bonded staging pending entry or exam release",
      "Cargo release coordination with brokerage status",
      "Break-bulk and CFS handling for import programs",
      "Outbound dispatch after authorized release",
    ],
    credentials: [
      "US Customs Bonded Facility · Bonded CFS",
      "500 Ocean Avenue, East Rockaway, NY 11518",
      "Same desk as ITC customs brokerage",
      "Gateway support for JFK and Newark",
    ],
    heroImage: "/images/facility-warehouse.jpg",
    overviewImage: "/images/ops-warehouse.jpg",
    accent: "facility",
    icon: "cfs",
  },
  {
    slug: "drayage",
    title: "Drayage / Ground Distribution",
    navLabel: "Drayage / Ground Distribution",
    teaser: "Port and airport dray, linehaul, and metro delivery after release.",
    heroLine: "Ground movement that follows clearance — not a separate, disconnected haul.",
    overview:
      "After cargo clears or releases from bonded staging, ITC Group arranges airport and ocean-port drayage, inland linehaul, and last-mile delivery to consignee receiving docks. Ground moves inherit the same shipment ID used for clearance and CFS events so status stays coherent in the portal.",
    handles: [
      "Airport and ocean terminal drayage",
      "Bonded CFS outbound to regional DCs",
      "Inland linehaul and metro last mile",
      "Temperature-aware trucking when specified",
      "POD capture against the shipment record",
    ],
    credentials: [
      "Integrated with brokerage and Bonded CFS release",
      "NY metro and Northeast coverage",
      "Portal visibility for out-for-delivery and POD",
    ],
    heroImage: "/images/ops-truck.jpg",
    overviewImage: "/images/hero-port-v2.jpg",
    accent: "ground",
    icon: "drayage",
  },
];

export function getService(slug: string): ServicePage | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
