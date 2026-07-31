export type IndustryId =
  | "military-government"
  | "apparel"
  | "food-beverage"
  | "medical-devices"
  | "retail";

export type IndustryPage = {
  id: IndustryId;
  name: string;
  /** Short label shown above the title on featured cards */
  badge?: string;
  /** Card summary — substantial enough to match Military weight */
  teaser: string;
  /** Modal overview */
  overview: string;
  /** Bullets visible on the card */
  highlights: string[];
  /** Expanded “program focus” in the modal */
  focus: string[];
  /** What we handle */
  handles: string[];
  image: string;
  /** Visual prominence flag — Military keeps gold treatment */
  featured?: boolean;
  /** Optional deep-link from modal */
  relatedHref?: string;
  relatedLabel?: string;
};

export const INDUSTRIES: IndustryPage[] = [
  {
    id: "military-government",
    name: "Military & Government",
    badge: "Specialized programs",
    teaser:
      "25+ years supporting Foreign Military Sales (FMS), DoD cargo, and ITAR-regulated programs — with ILCS transfer capability and TCN / Multi-Pack TCN visibility.",
    overview:
      "ITC Group USA’s Specialized Military Operations division brings over 25 years of experience with the FMS (Foreign Military Sales) program. We provide military cargo import and export expertise, U.S. Department of State license and ITAR regulations compliance, ILCS data transfer for all FMS cargo by TCN and multi-pack TCNs, and Department of Defense cargo handling — coordinated with licensed customs brokerage and bonded CFS staging under one in-house desk.",
    highlights: [
      "FMS (Foreign Military Sales) program experience",
      "DoD cargo handling and ITAR compliance",
      "ILCS transfer by TCN and multi-pack TCNs",
      "Brokerage and Bonded CFS under one desk",
    ],
    focus: [
      "FMS (Foreign Military Sales) program",
      "Department of Defense cargo handling",
      "U.S. Department of State license and ITAR regulations compliance",
      "ILCS data transfer by TCN and multi-pack TCNs",
    ],
    handles: [
      "Military cargo import and export expertise",
      "ITAR-regulated documentation and compliance",
      "ILCS data transfer for FMS cargo by TCN",
      "Multi-pack TCN visibility and tracking",
      "Coordination with customs brokerage and Bonded CFS release",
      "Controlled handoff into inland transport after release",
    ],
    image: "/images/hero-port-v5.jpg",
    featured: true,
    relatedHref: "/services/military-operations",
    relatedLabel: "Military Operations",
  },
  {
    id: "apparel",
    name: "Apparel",
    badge: "Commercial vertical",
    teaser:
      "Seasonal volume programs that absorb peak ocean containers and rush air allocations — with retail compliance, labeling, and ticketing requirements built into clearance and outbound dispatch.",
    overview:
      "Apparel importers live and die by calendar windows. ITC Group USA runs seasonal volume handling for peak and shoulder seasons, coordinates ocean FCL and priority air when styles or replenishment cannot wait, and aligns release timing to retail DC appointment slots. Labeling and ticketing requirements are treated as operational constraints — not afterthoughts — so cartons move from bonded staging to outbound trucking with compliance paperwork intact.",
    highlights: [
      "Seasonal volume and peak-season container handling",
      "Retail compliance for DC appointment windows",
      "Labeling and ticketing requirement support",
      "Ocean + rush air allocations on the same program",
    ],
    focus: [
      "Seasonal volume planning across ocean and air",
      "Retail DC compliance and appointment alignment",
      "Labeling / ticketing and carton-mark requirements",
      "Rush air when styles or replenishment cannot wait",
    ],
    handles: [
      "Peak-season ocean container programs",
      "Priority air allocations for samples and hot SKUs",
      "Retail compliance documentation with entry packets",
      "Labeling and ticketing requirement coordination",
      "Bonded CFS staging until release is authorized",
      "Outbound dispatch timed to consignee receiving docks",
    ],
    image: "/images/ops-containers.jpg",
    relatedHref: "/services/ocean-freight",
    relatedLabel: "Ocean Freight",
  },
  {
    id: "food-beverage",
    name: "Food & Beverage",
    badge: "Commercial vertical",
    teaser:
      "Perishable-aware import programs with cold-chain handling, temperature-controlled trucking when required, and FDA-related documentation coordinated through formal entry and bonded staging.",
    overview:
      "Food and beverage programs demand documentation discipline and temperature awareness from arrival through last mile. ITC Group USA coordinates FDA-related documentation with formal entry, stages product in bonded CFS when hold or exam status requires it, and arranges temperature-aware domestic trucking to distribution centers. Cold-chain requirements are captured against the shipment record so brokerage, warehouse, and ground moves stay on one operational timeline.",
    highlights: [
      "Cold-chain awareness and perishable handling",
      "FDA-related documentation with formal entry",
      "Bonded CFS staging for hold or exam events",
      "Temperature-aware trucking to DCs",
    ],
    focus: [
      "Cold-chain awareness across warehouse and trucking",
      "Perishable handling with timed release",
      "FDA-related documentation support",
      "Temperature-aware last-mile to distribution centers",
    ],
    handles: [
      "Perishable and temperature-sensitive commodity programs",
      "FDA-related document intake with entry filing",
      "Bonded CFS receiving and inventory control",
      "Exam / hold coordination without losing product clock",
      "Temperature-aware domestic trucking when specified",
      "POD capture against the shipment ID",
    ],
    image: "/images/ops-warehouse.jpg",
    relatedHref: "/services/cfs",
    relatedLabel: "Bonded CFS",
  },
  {
    id: "medical-devices",
    name: "Medical Devices",
    badge: "Commercial vertical",
    teaser:
      "Time-critical and sensitive device movements with controlled air freight, documentation-ready customs brokerage, and POD discipline from arrival through dock delivery.",
    overview:
      "Medical device programs require sensitive handling, tight timelines, and clean documentation. ITC Group USA books controlled air freight for time-critical shipments, prepares brokerage packets against commercial invoices and packing lists before arrival, and maintains POD discipline through inland delivery. When bonded staging is required, entry status drives release — keeping regulated classes visible under one shipment ID from gateway to consignee dock.",
    highlights: [
      "Time-critical and sensitive cargo handling",
      "Documentation and compliance readiness pre-arrival",
      "Controlled air freight with brokerage handoff",
      "POD discipline to receiving dock",
    ],
    focus: [
      "Time-critical air allocations for device programs",
      "Sensitive cargo handling and chain-of-custody habits",
      "Documentation and compliance packet readiness",
      "POD discipline through last-mile delivery",
    ],
    handles: [
      "Priority and controlled air freight bookings",
      "Pre-arrival document review for formal entry",
      "Customs brokerage for regulated device classes",
      "Bonded CFS staging when entry status requires hold",
      "Temperature-aware trucking when commodity requires it",
      "Dock delivery with POD against the shipment record",
    ],
    image: "/images/hero-port.jpg",
    relatedHref: "/services/air-freight",
    relatedLabel: "Air Freight",
  },
  {
    id: "retail",
    name: "Retail",
    badge: "Commercial vertical",
    teaser:
      "Big-box and regional DC replenishment logistics — ocean programs, cargo release coordination, and outbound handoffs that meet distribution-center compliance windows.",
    overview:
      "Retail replenishment is a cadence business. ITC Group USA runs ocean import programs sized to store and DC demand, clears and releases cargo in step with appointment calendars, and hands off to line haul and last-mile teams that understand big-box and distribution-center compliance — ASN timing, dock rules, and carton standards. Status stays coherent in the portal from vessel notice through POD.",
    highlights: [
      "Big-box and distribution-center compliance",
      "Replenishment ocean and air programs",
      "Cargo release timed to DC appointments",
      "Outbound line haul and last-mile handoffs",
    ],
    focus: [
      "Big-box / DC compliance and appointment discipline",
      "Replenishment logistics across ocean and inland",
      "Cargo release coordination after formal entry",
      "Outbound handoffs to regional distribution centers",
    ],
    handles: [
      "Replenishment ocean FCL programs",
      "Rush air when DC stockouts require lift",
      "Formal entry and cargo release coordination",
      "Bonded CFS staging until outbound is authorized",
      "Line haul and metro last-mile to retail DCs",
      "POD and exception visibility in the client portal",
    ],
    image: "/images/ops-truck.jpg",
    relatedHref: "/services/drayage",
    relatedLabel: "Inland Transport",
  },
];

export function getIndustry(id: string): IndustryPage | undefined {
  return INDUSTRIES.find((i) => i.id === id);
}
