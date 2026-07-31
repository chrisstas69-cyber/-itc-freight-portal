export type ServiceSlug =
  | "air-freight"
  | "ocean-freight"
  | "customs-clearance"
  | "cfs"
  | "drayage"
  | "military-operations";

export type ServicePage = {
  slug: ServiceSlug;
  title: string;
  navLabel: string;
  /** Short label for homepage grid */
  homeLabel: string;
  teaser: string;
  heroLine: string;
  overview: string;
  handles: string[];
  credentials: string[];
  process?: { step: string; title: string; detail: string }[];
  /** Placeholder path — swap anytime under /public/images */
  heroImage: string;
  overviewImage: string;
  accent: "steel" | "gold" | "customs" | "facility" | "ground" | "military";
  icon: "air" | "ocean" | "customs" | "cfs" | "drayage" | "military";
  featured?: boolean;
};

export const SERVICES: ServicePage[] = [
  {
    slug: "air-freight",
    title: "Air Freight",
    navLabel: "Air Freight",
    homeLabel: "Air Freight",
    teaser:
      "IATA and TSA approved air freight — any airport or port in the U.S. or worldwide.",
    heroLine:
      "Air freight to any airport or port in the United States or worldwide — with sea/air flexibility and aircraft chartering.",
    overview:
      "As an IATA and TSA approved air freight forwarder, ITC Group USA books and controls air freight for programs that cannot wait on ocean schedules — medical devices, military support cargo, apparel samples, and other high-value or time-sensitive commodities. We move cargo through any airport or port in the U.S. or worldwide. We can switch shipping method from sea to air (or vice versa) immediately, without delay or additional fee. Aircraft chartering is available when dedicated lift is required. Air movements stay in-house and coordinate with formal entry and, when needed, bonded CFS staging.",
    handles: [
      "Airport-to-airport and door-to-door air imports",
      "Any airport or port in the U.S. or worldwide",
      "Immediate sea-to-air or air-to-sea method switching — without delay or additional fee",
      "Aircraft chartering available",
      "Priority and standard allocations",
      "Temperature-aware handling where the commodity requires it",
      "Document control for AWB, commercial invoice, and packing list",
      "Handoff into customs brokerage and Bonded CFS release",
    ],
    credentials: [
      "IATA air and TSA approved air freight forwarder",
      "Any airport or port in the U.S. or worldwide",
      "Sea/air switch without delay or additional fee",
      "Aircraft chartering available",
      "100% in-house operations — no subcontracting",
      "Bonded CFS staging available after arrival",
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
    homeLabel: "Ocean Freight",
    teaser:
      "Worldwide ocean operations under FMC license number 3887 — U.S. and foreign flag carriers, MARAD compliance, vessel chartering.",
    heroLine:
      "Worldwide ocean freight under FMC license number 3887 — from origin load through U.S. entry and release.",
    overview:
      "As a licensed and bonded Ocean Freight Forwarder (FMC license number 3887), ITC Group USA manages worldwide ocean import and export programs — FCL and coordinated container movements. We are licensed to contract with any U.S. and foreign flag carriers, maintaining MARAD compliance. Vessel chartering is available when programs require dedicated capacity. Cargo arriving at U.S. ports can move into bonded staging at our CFS when entry status requires hold before outbound dispatch.",
    handles: [
      "Worldwide ocean booking and documentation",
      "FCL and coordinated container programs",
      "FMC license number 3887",
      "Contracting with any U.S. and foreign flag carriers — MARAD compliance",
      "Vessel chartering available",
      "ISF timing aligned to sailing and arrival",
      "Port arrival notices and exam coordination support",
      "Bonded CFS receiving after vessel discharge when required",
      "Drayage from port to bonded facility or consignee",
    ],
    credentials: [
      "FMC license number 3887",
      "Worldwide ocean operations",
      "Licensed to contract with any U.S. and foreign flag carriers, maintaining MARAD compliance",
      "Vessel chartering available",
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
    homeLabel: "Customs Clearance",
    teaser:
      "JAV International — licensed U.S. customs broker with remote location filing for shipments arriving anywhere in the United States.",
    heroLine:
      "Licensed U.S. customs brokerage with remote location filing — clearing shipments arriving anywhere in the United States.",
    overview:
      "JAV International is a licensed U.S. customs broker with remote location filing capability, clearing shipments arriving anywhere in the United States. We file entries, transmit ISF, work ACS systems, and deliver seamless clearance through to door — coordinated with bonded CFS staging when hold or exam status requires it. Execution stays under one accountable ITC Group USA desk.",
    handles: [
      "File entries (formal entry / 7501) preparation and filing",
      "ISF / ABI transmission and timing",
      "ACS system coordination",
      "Remote location filing for arrivals anywhere in the United States",
      "HTS classification support against commercial documents",
      "Exam, hold, and CBP inquiry response",
      "Seamless clearance through to door",
      "Coordination with Bonded CFS staging and cargo release",
      "Entry packets available in the client portal",
    ],
    credentials: [
      "JAV International — licensed U.S. customs broker",
      "Remote location filing capability",
      "Clearance for shipments arriving anywhere in the United States",
      "File entries · ISF · ACS",
      "U.S. Customs Bonded office and warehouse",
      "Seamless clearance to door",
      "Operating since 1984",
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
          "Formal entry and ISF are prepared and transmitted via ACS to meet CBP timing requirements.",
      },
      {
        step: "03",
        title: "Clearance events",
        detail:
          "Exam, hold, or release status is tracked and communicated against the shipment ID.",
      },
      {
        step: "04",
        title: "Release to door",
        detail:
          "Released cargo moves to outbound dispatch or remains in bonded staging until authorized — then seamless delivery to door.",
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
    homeLabel: "CFS",
    teaser:
      "U.S. Customs Bonded office and warehouse — UL alarm, 24-hour CCTV, live inventory.",
    heroLine:
      "Bonded CFS — secured staging and release by entry status.",
    overview:
      "ITC Group USA operates a U.S. Customs Bonded office and warehouse — a working Bonded CFS, not a sales office. The facility is protected by a UL-compliant alarm system and 24-hour CCTV, with integrated real-time office and warehouse inventory tracking. Import cargo can be received under bond, held in bonded staging, and released in coordination with customs brokerage.",
    handles: [
      "Bonded receiving and inventory control",
      "Bonded staging pending entry or exam release",
      "Cargo release coordination with brokerage status",
      "Break-bulk and CFS handling for import programs",
      "Outbound dispatch after authorized release",
    ],
    credentials: [
      "U.S. Customs Bonded office and warehouse",
      "UL-compliant alarm · 24-hour CCTV",
      "Real-time office and warehouse inventory tracking",
      "Same desk as ITC customs brokerage",
    ],
    heroImage: "/images/services/cfs.png",
    overviewImage: "/images/ops-warehouse.jpg",
    accent: "facility",
    icon: "cfs",
  },
  {
    slug: "drayage",
    title: "Cargo Release / Inland Transport",
    navLabel: "Cargo Release / Inland Transport",
    homeLabel: "Inland Transport",
    teaser:
      "After customs release — pickup, trucking, rail, line haul, and last-mile delivery to dock or door nationwide.",
    heroLine:
      "After customs release from a bonded facility or any U.S. port — nationwide inland transport to dock or door.",
    overview:
      "After customs release from a bonded facility or any U.S. port, ITC Group USA arranges pickup, trucking, rail, line haul, and last-mile delivery to dock or door nationwide. Ground moves inherit the same shipment ID used for clearance and CFS events so status stays coherent in the portal.",
    handles: [
      "Pickup after customs release from bonded facility or any U.S. port",
      "Domestic trucking and rail",
      "Line haul to regional and national destinations",
      "Last-mile delivery to dock or door nationwide",
      "Airport and ocean terminal drayage",
      "Temperature-aware trucking when specified",
      "POD capture against the shipment record",
    ],
    credentials: [
      "Nationwide inland transport after customs release",
      "Pickup · trucking · rail · line haul · last mile",
      "Integrated with brokerage and Bonded CFS release",
      "100% in-house operations — no subcontracting",
      "Portal visibility for out-for-delivery and POD",
    ],
    heroImage: "/images/services/drayage.png",
    overviewImage: "/images/hero-port-v2.jpg",
    accent: "ground",
    icon: "drayage",
  },
  {
    slug: "military-operations",
    title: "Military Operations",
    navLabel: "Military Operations",
    homeLabel: "Military Operations",
    teaser:
      "Over 25 years with the FMS program — military import/export, DoD cargo, and ITAR compliance.",
    heroLine:
      "Specialized Military Operations for Foreign Military Sales, Department of Defense cargo, and ITAR-regulated movements.",
    overview:
      "ITC Group USA's Specialized Military Operations division brings over 25 years of experience with the FMS (Foreign Military Sales) program. We provide military cargo import and export expertise, U.S. Department of State license and ITAR regulations compliance, ILCS data transfer for all FMS cargo by TCN and multi-pack TCNs, and Department of Defense cargo handling — coordinated with licensed customs brokerage and bonded CFS staging under one in-house desk.",
    handles: [
      "Over 25 years of experience with the FMS (Foreign Military Sales) program",
      "Military cargo import and export expertise",
      "U.S. Department of State license and ITAR regulations compliance",
      "ILCS data transfer for all FMS cargo by TCN and multi-pack TCNs",
      "Department of Defense cargo handling",
      "Coordination with customs brokerage and Bonded CFS release",
    ],
    credentials: [
      "Over 25 years of experience with the FMS (Foreign Military Sales) program",
      "U.S. Department of State license and ITAR regulations compliance",
      "ILCS data transfer for all FMS cargo by TCN and multi-pack TCNs",
      "Department of Defense cargo handling",
      "Licensed U.S. customs brokerage · Bonded CFS",
    ],
    heroImage: "/images/services/air-freight.png",
    overviewImage: "/images/ops-containers.jpg",
    accent: "military",
    icon: "military",
    featured: true,
  },
];

export function getService(slug: string): ServicePage | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
