# ITC Freight Portal V1

Premium marketing site and authenticated client portal for **ITC Group Inc.** (Ikaros Transport Corporation).

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

## Routes
| Path | Description |
|------|-------------|
| `/` | Public marketing homepage |
| `/login` | Client portal authentication |
| `/portal` | Operations dashboard |
| `/portal/shipments` | Shipment list + filters |
| `/portal/shipments/[id]` | Milestone timeline + documents |
| `/portal/documents` | Document vault |
| `/portal/invoices` | Invoice table |
| `/portal/account` | Account placeholder |

## Data mode
Set `NEXT_PUBLIC_DATA_MODE=live` when a real API is wired. Default is mock.
