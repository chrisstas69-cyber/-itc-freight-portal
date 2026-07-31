/** ITC Group USA company profile and entity structure. */

export const COMPANY = {
  /** Parent brand shown in header / primary identity */
  parentBrand: "ITC Group USA",
  legalName: "ITC Group USA",
  founded: 1984,
  positioning: "A complete worldwide freight logistics company since 1984",
  hq: {
    city: "East Rockaway, NY 11518",
  },
  footprint: "Worldwide door-to-door freight logistics",
  opsModel: "One accountable desk with an agency network — 100% in-house operations, no subcontracting",
  /** Kept for footer/legal microcopy only — not used in main narrative */
  legalEntityLine: "Ikaros Transport Corp, dba ITC International",
  credentials: {
    iataTsa: "IATA and TSA Approved Indirect Air Carrier (IAC)",
    fmc: "Licensed and bonded Ocean Freight Forwarder · FMC# 3887",
    bonded: "U.S. Customs Bonded office and warehouse",
    marad:
      "Licensed to contract with any U.S. and foreign flag carriers, maintaining MARAD compliance",
  },
  modes:
    "Air, ocean, vessel chartering, aircraft chartering, truck, and rail",
  military: {
    tenure:
      "Over 25 years of experience with the FMS (Foreign Military Sales) program",
    importExport: "Military cargo import and export expertise",
    itar: "U.S. Department of State license and ITAR regulations compliance",
    visibility:
      "ILCS data transfer for all FMS cargo by TCN and multi-pack TCNs",
    dod: "Department of Defense cargo handling",
  },
  security: {
    staffing: "Office and warehouse operated by ITC employees only — no subcontracting",
    alarm: "Fully alarmed facility, UL standards compliant",
    cctv: "24-hour CCTV monitored warehouse",
    inventory:
      "Fully integrated computerized network providing real-time inventory control for all cargo received, loaded, and shipped",
  },
} as const;

/**
 * Group structure.
 * Logo marks on public/brand/itc-entities-sheet.png (left → right):
 * ITCJAV · ITCGRP · ITCCTL
 */
export const ENTITIES = {
  parent: {
    name: "ITC Group USA",
    role: "Parent brand",
    mark: "ITCGRP",
    logoSrc: "/brand/itc-grp-mark.png",
  },
  divisions: [
    {
      id: "itc-international",
      name: "ITC International",
      role: "Division",
      mark: null,
    },
    {
      id: "jav-international",
      name: "JAV International",
      role: "Division",
      mark: "ITCJAV",
    },
    {
      id: "cargo-transport-logistics",
      name: "Cargo Transport Logistics Inc.",
      role: "Division",
      mark: "ITCCTL",
    },
  ],
} as const;

/** Compact credential chips for trust strips */
export const TRUST_CREDENTIALS = [
  { label: "Since", value: "1984" },
  { label: "Operations", value: "100% in-house" },
  { label: "Air", value: "IATA · TSA IAC" },
  { label: "Ocean", value: "FMC# 3887" },
  { label: "Facility", value: "U.S. Customs Bonded" },
  { label: "Programs", value: "FMS · DoD · ITAR" },
] as const;

export const SECURITY_POINTS = [
  {
    title: "Facility security",
    detail: "Fully alarmed facility, UL standards compliant, with 24-hour CCTV monitored warehouse.",
  },
  {
    title: "Inventory control",
    detail:
      "Fully integrated computerized network providing real-time inventory control for all cargo received, loaded, and shipped.",
  },
  {
    title: "In-house execution",
    detail:
      "Office and warehouse operated by ITC employees only — no subcontracting.",
  },
] as const;
