/** Verified ITC Group company profile — use across marketing copy. */

export const COMPANY = {
  legalName: "ITC Group Inc.",
  dba: "Ikaros Transport Corporation",
  founded: 1984,
  ownership: "Family-owned and operated",
  hq: {
    line1: "500 Ocean Avenue",
    city: "East Rockaway, NY 11518",
    region: "East Rockaway, NY · Ports of New York",
  },
  footprint: "U.S. and Europe freight connections",
  opsModel: "100% in-house operations — no subcontracting",
  credentials: {
    iataTsa: "IATA and TSA Approved Indirect Air Carrier (IAC)",
    fmc: "Licensed and bonded Ocean Freight Forwarder · FMC# 3887",
    bonded: "U.S. Customs Bonded office and warehouse",
  },
  modes:
    "Air, ocean, vessel chartering, aircraft chartering, truck, and rail",
  military: {
    tenure: "25+ years supporting Foreign Military Sales (FMS), DoD cargo, and ITAR-regulated programs",
    visibility: "ILCS transfer capability with TCN / Multi-Pack TCN visibility",
  },
  security: {
    alarm: "UL-compliant alarm system",
    cctv: "24-hour CCTV",
    inventory: "Integrated real-time office and warehouse inventory tracking",
  },
} as const;

/** Compact credential chips for trust strips */
export const TRUST_CREDENTIALS = [
  { label: "Established", value: "1984" },
  { label: "Operations", value: "100% in-house" },
  { label: "Air", value: "IATA · TSA IAC" },
  { label: "Ocean", value: "FMC# 3887" },
  { label: "Facility", value: "U.S. Customs Bonded" },
  { label: "Programs", value: "FMS · DoD · ITAR" },
] as const;

export const SECURITY_POINTS = [
  {
    title: "Facility security",
    detail: "UL-compliant alarm system with 24-hour CCTV coverage.",
  },
  {
    title: "Inventory control",
    detail: "Integrated real-time tracking across office and warehouse inventory.",
  },
  {
    title: "In-house execution",
    detail: "Family-owned operations desk — no subcontracted handoffs.",
  },
] as const;
