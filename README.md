# ITC Freight Portal V1

Premium marketing site and authenticated client portal for **ITC Group USA**, with divisions **ITC International**, **JAV International**, and **Cargo Transport Logistics Inc.**

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 design tokens
- Mock service layer (`src/lib/services/portal.ts`) over `data/*.json`

## Run locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

## Demo login
- Email: `ops@clientco.com` (or `imports@clientco.com`)
- Password: `portal2026`

## Public site map
| Path | Description |
|------|-------------|
| `/` | Short marketing homepage |
| `/services` | Services index |
| `/services/air-freight` | Air freight |
| `/services/ocean-freight` | Ocean / sea freight |
| `/services/customs-clearance` | Customs clearance & brokerage |
| `/services/cfs` | Bonded CFS |
| `/services/drayage` | Drayage / ground distribution |
| `/about` | Company |
| `/facility` | Bonded facility |
| `/industries` | Verticals |
| `/contact` | Contact + quote form |
| `/login` | Client portal authentication |

## Portal routes
| Path | Description |
|------|-------------|
| `/portal` | Operations dashboard |
| `/portal/shipments` | Shipment list + filters |
| `/portal/shipments/[id]` | Milestones, pickup, POD, documents |
| `/portal/documents` | Document vault |
| `/portal/invoices` | Invoice table (PDF download) |
| `/portal/account` | Account placeholder |

## Tracking → login
Homepage tracking submits to `/login?track=…`. After sign-in, matching AWB/container/PRO/shipment ID opens that shipment detail; otherwise the shipments register opens with the query applied.

## Data mode
Set `NEXT_PUBLIC_DATA_MODE=live` when a real API is wired. Default is mock.
