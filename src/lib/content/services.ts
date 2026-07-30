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
    teaser:
      "IATA / TSA Approved IAC — priority and routine air through JFK and regional gateways.",
    heroLine:
      "IATA and TSA Approved IAC air movement with brokerage and bonded CFS handoffs.",
    overview:
      "As an IATA and TSA Approved Indirect Air Carrier (IAC), ITC Group books and controls air freight for programs that cannot wait on ocean schedules — medical devices, military support cargo, apparel samples, and other high-value or time-sensitive commodities. Aircraft chartering is available when dedicated lift is required. Air movements stay in-house and coordinate with formal entry and, when needed, bonded staging at our East Rockaway facility.",
    handles: [
      "Airport-to-airport and door-to-door air imports",
      "Priority and standard allocations",
      "Aircraft chartering for dedicated lift",
      "Temperature-aware handling where the commodity requires it",
      "Document control for AWB, commercial invoice, and packing list",
      "Handoff into customs brokerage and Bonded CFS release",
    ],
    credentials: [
      "IATA and TSA Approved Indirect Air Carrier (IAC)",
      "100% in-house operations — no subcontracting",
      "Bonded CFS staging available after arrival",
      "JFK and metro NY gateway coverage",
    ],
    heroImage: "/images/services/air-freight.png",
    overviewImage: "/images/ops-warehouse.jpg",
    accent: "steel",
    icon: "air",
  },
  {
    slug: "ocean-freight",
    title: "Ocean / Sea Freight",
    navLabel: "Ocean / Sea Freight",
    teaser:
      "Licensed ocean forwarder · FMC# 3887 — U.S. and Europe container programs.",
    heroLine:
      "Licensed and bonded ocean freight (FMC# 3887) from origin load through U.S. entry.",
    overview:
      "As a licensed and bonded Ocean Freight Forwarder (FMC# 3887), we manage ocean import programs — FCL and coordinated container movements — across U.S. and Europe freight connections. Vessel chartering is available when programs require dedicated capacity. Cargo arriving Newark and other U.S. ports can move into bonded staging at our CFS when entry status requires hold before outbound dispatch.",
    handles: [
      "FCL ocean booking and documentation",
      "U.S. and Europe freight connections",
      "Vessel chartering for dedicated capacity",
      "ISF timing aligned to sailing and arrival",
      "Port arrival notices and exam coordination support",
      "Bonded CFS receiving after vessel discharge when required",
      "Drayage from port to East Rockaway or consignee",
    ],
    credentials: [
      "Licensed and bonded Ocean Freight Forwarder · FMC# 3887",
      "Customs brokerage on the same operational record",
      "US Customs Bonded Facility · Bonded CFS",
      "100% in-house operations — no subcontracting",
    ],
    heroImage: "/images/services/ocean-freight.png",
    overviewImage: "/images/ops-containers.jpg",
    accent: "gold",
    icon: "ocean",
  },
  {
    slug: "customs-clearance",
    title: "Customs Clearance & Brokerage",
    navLabel: "Customs Clearance & Brokerage",
    teaser:
      "U.S. formal entry, ISF, exam response — including ITAR-aware government programs.",
    heroLine:
      "Licensed customs brokerage for accurate entry, controlled release, and regulated cargo.",
    overview:
      "ITC Group is a licensed U.S. customs broker operating from a U.S. Customs Bonded office and warehouse. We prepare and file formal entry, transmit ISF, support HTS classification, and manage clearance through exam or hold — including documentation discipline for ITAR-regulated and Foreign Military Sales programs. When bonded staging is required, entry status drives release from our Bonded CFS. Execution stays 100% in-house.",
    handles: [
      "Formal entry (7501) preparation and filing",
      "ISF / ABI transmission and timing",
      "HTS classification support against commercial documents",
      "Exam, hold, and CBP inquiry response",
      "ITAR-aware handling for regulated government cargo",
      "Coordination with Bonded CFS staging and cargo release",
      "Entry packets available in the client portal",
    ],
    credentials: [
      "Licensed U.S. customs broker",
      "U.S. Customs Bonded office and warehouse",
      "25+ years supporting FMS, DoD, and ITAR programs",
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
    heroImage: "/images/services/customs-clearance.png",
    overviewImage: "/images/ops-containers.jpg",
    accent: "customs",
    icon: "customs",
  },
  {
    slug: "cfs",
    title: "CFS — Container Freight Station",
    navLabel: "CFS (Container Freight Station)",
    teaser:
      "U.S. Customs Bonded office and warehouse — UL alarm, 24-hour CCTV, live inventory.",
    heroLine:
      "Bonded CFS at 500 Ocean Avenue — secured staging, release by entry status.",
    overview:
      "Our headquarters operates as a U.S. Customs Bonded office and warehouse — a working Bonded CFS, not a sales office. The facility is protected by a UL-compliant alarm system and 24-hour CCTV, with integrated real-time office and warehouse inventory tracking. Import cargo can be received under bond, held in bonded staging, and released in coordination with customs brokerage. ILCS transfer capability with TCN / Multi-Pack TCN visibility supports government program handoffs.",
    handles: [
      "Bonded receiving and inventory control",
      "Bonded staging pending entry or exam release",
      "ILCS transfer with TCN / Multi-Pack TCN visibility",
      "Cargo release coordination with brokerage status",
      "Break-bulk and CFS handling for import programs",
      "Outbound dispatch after authorized release",
    ],
    credentials: [
      "U.S. Customs Bonded office and warehouse",
      "UL-compliant alarm · 24-hour CCTV",
      "Real-time office and warehouse inventory tracking",
      "500 Ocean Avenue, East Rockaway, NY 11518",
      "Same desk as ITC customs brokerage",
    ],
    heroImage: "/images/services/cfs.png",
    overviewImage: "/images/ops-warehouse.jpg",
    accent: "facility",
    icon: "cfs",
  },
  {
    slug: "drayage",
    title: "Drayage / Ground Distribution",
    navLabel: "Drayage / Ground Distribution",
    teaser:
      "Truck and rail after release — port, airport, and metro delivery under one desk.",
    heroLine:
      "Truck and rail movement that follows clearance — not a disconnected haul.",
    overview:
      "After cargo clears or releases from bonded staging, ITC Group arranges airport and ocean-port drayage, inland truck and rail, and last-mile delivery to consignee receiving docks. Ground moves inherit the same shipment ID used for clearance and CFS events so status stays coherent in the portal — executed in-house from East Rockaway / Ports of New York.",
    handles: [
      "Airport and ocean terminal drayage",
      "Truck and rail inland movement",
      "Bonded CFS outbound to regional DCs",
      "Inland linehaul and metro last mile",
      "Temperature-aware trucking when specified",
      "POD capture against the shipment record",
    ],
    credentials: [
      "Integrated with brokerage and Bonded CFS release",
      "100% in-house operations — no subcontracting",
      "NY metro and Northeast coverage",
      "Portal visibility for out-for-delivery and POD",
    ],
    heroImage: "/images/services/drayage.png",
    overviewImage: "/images/hero-port-v2.jpg",
    accent: "ground",
    icon: "drayage",
  },
];

export function getService(slug: string): ServicePage | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
