import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { Topology } from "topojson-specification";
import countriesTopologyJson from "world-atlas/countries-110m.json";

type LonLat = [number, number];

type Destination = {
  id: string;
  label: string;
  shortLabel: string;
  coords: LonLat;
  /** Arc bulge in px — positive curves “south-east” of chord, negative “north-west” */
  bulge: number;
  labelDx: number;
  labelDy: number;
  anchor: "start" | "middle" | "end";
  /** primary = labeled; secondary = city dots with lighter arcs */
  tier?: "primary" | "secondary";
  showLabel?: boolean;
};

const WIDTH = 980;
const HEIGHT = 500;

/** Hub near Northeast U.S. operations */
const ORIGIN: LonLat = [-74.0, 40.7];

const DESTINATIONS: Destination[] = [
  // —— U.S. main cities ——
  {
    id: "us-la",
    label: "Los Angeles",
    shortLabel: "Los Angeles",
    coords: [-118.24, 34.05],
    bulge: -22,
    labelDx: -10,
    labelDy: 16,
    anchor: "end",
    tier: "secondary",
  },
  {
    id: "us-seattle",
    label: "Seattle",
    shortLabel: "Seattle",
    coords: [-122.33, 47.61],
    bulge: -34,
    labelDx: -10,
    labelDy: -12,
    anchor: "end",
    tier: "secondary",
  },
  {
    id: "us-chicago",
    label: "Chicago",
    shortLabel: "Chicago",
    coords: [-87.63, 41.88],
    bulge: -14,
    labelDx: -8,
    labelDy: -12,
    anchor: "end",
    tier: "secondary",
  },
  {
    id: "us-dallas",
    label: "Dallas",
    shortLabel: "Dallas",
    coords: [-96.8, 32.78],
    bulge: 18,
    labelDx: 10,
    labelDy: 14,
    anchor: "start",
    tier: "secondary",
  },
  {
    id: "us-houston",
    label: "Houston",
    shortLabel: "Houston",
    coords: [-95.37, 29.76],
    bulge: 24,
    labelDx: 10,
    labelDy: 16,
    anchor: "start",
    tier: "secondary",
  },
  {
    id: "us-miami",
    label: "Miami",
    shortLabel: "Miami",
    coords: [-80.19, 25.76],
    bulge: 20,
    labelDx: 12,
    labelDy: 14,
    anchor: "start",
    tier: "secondary",
  },
  {
    id: "us-atlanta",
    label: "Atlanta",
    shortLabel: "Atlanta",
    coords: [-84.39, 33.75],
    bulge: 12,
    labelDx: -8,
    labelDy: 14,
    anchor: "end",
    tier: "secondary",
  },

  // —— North America ——
  {
    id: "canada-toronto",
    label: "Canada",
    shortLabel: "Toronto",
    coords: [-79.38, 43.65],
    bulge: -26,
    labelDx: 0,
    labelDy: -16,
    anchor: "middle",
    tier: "primary",
  },
  {
    id: "canada-vancouver",
    label: "Vancouver",
    shortLabel: "Vancouver",
    coords: [-123.12, 49.28],
    bulge: -40,
    labelDx: -8,
    labelDy: -14,
    anchor: "end",
    tier: "secondary",
  },
  {
    id: "mexico-city",
    label: "Mexico City",
    shortLabel: "Mexico City",
    coords: [-99.13, 19.43],
    bulge: 28,
    labelDx: -10,
    labelDy: 16,
    anchor: "end",
    tier: "secondary",
  },

  // —— South America (expanded) ——
  {
    id: "sa-bogota",
    label: "Bogotá",
    shortLabel: "Bogotá",
    coords: [-74.07, 4.71],
    bulge: 36,
    labelDx: -12,
    labelDy: 4,
    anchor: "end",
    tier: "secondary",
  },
  {
    id: "sa-lima",
    label: "Lima",
    shortLabel: "Lima",
    coords: [-77.04, -12.05],
    bulge: 44,
    labelDx: -12,
    labelDy: 12,
    anchor: "end",
    tier: "secondary",
  },
  {
    id: "sa-santiago",
    label: "Santiago",
    shortLabel: "Santiago",
    coords: [-70.67, -33.45],
    bulge: 52,
    labelDx: -12,
    labelDy: 14,
    anchor: "end",
    tier: "secondary",
  },
  {
    id: "sa-sao-paulo",
    label: "São Paulo",
    shortLabel: "São Paulo",
    coords: [-46.63, -23.55],
    bulge: 48,
    labelDx: 14,
    labelDy: 8,
    anchor: "start",
    tier: "primary",
  },
  {
    id: "sa-rio",
    label: "Rio de Janeiro",
    shortLabel: "Rio de Janeiro",
    coords: [-43.17, -22.91],
    bulge: 42,
    labelDx: 14,
    labelDy: -10,
    anchor: "start",
    tier: "secondary",
  },
  {
    id: "sa-buenos-aires",
    label: "Buenos Aires",
    shortLabel: "Buenos Aires",
    coords: [-58.38, -34.6],
    bulge: 58,
    labelDx: 14,
    labelDy: 16,
    anchor: "start",
    tier: "primary",
  },

  // —— Europe / Middle East / Africa ——
  {
    id: "eu-london",
    label: "Europe",
    shortLabel: "London",
    coords: [-0.13, 51.51],
    bulge: -48,
    labelDx: 0,
    labelDy: -16,
    anchor: "middle",
    tier: "primary",
  },
  {
    id: "eu-frankfurt",
    label: "Frankfurt",
    shortLabel: "Frankfurt",
    coords: [8.68, 50.11],
    bulge: -38,
    labelDx: 12,
    labelDy: 14,
    anchor: "start",
    tier: "secondary",
  },
  {
    id: "eu-milan",
    label: "Milan",
    shortLabel: "Milan",
    coords: [9.19, 45.46],
    bulge: -30,
    labelDx: 12,
    labelDy: 16,
    anchor: "start",
    tier: "secondary",
    showLabel: false,
  },
  {
    id: "me-dubai",
    label: "Middle East",
    shortLabel: "Dubai",
    coords: [55.27, 25.2],
    bulge: -58,
    labelDx: 12,
    labelDy: 18,
    anchor: "start",
    tier: "primary",
  },
  {
    id: "af-johannesburg",
    label: "Johannesburg",
    shortLabel: "Johannesburg",
    coords: [28.05, -26.2],
    bulge: 62,
    labelDx: 12,
    labelDy: 14,
    anchor: "start",
    tier: "secondary",
  },

  // —— Asia / Pacific ——
  {
    id: "as-singapore",
    label: "Asia",
    shortLabel: "Singapore",
    coords: [103.82, 1.35],
    bulge: -70,
    labelDx: 0,
    labelDy: 18,
    anchor: "middle",
    tier: "primary",
  },
  {
    id: "as-hong-kong",
    label: "Hong Kong",
    shortLabel: "Hong Kong",
    coords: [114.17, 22.32],
    bulge: -82,
    labelDx: 10,
    labelDy: -12,
    anchor: "start",
    tier: "secondary",
  },
  {
    id: "as-tokyo",
    label: "Tokyo",
    shortLabel: "Tokyo",
    coords: [139.69, 35.69],
    bulge: -88,
    labelDx: 12,
    labelDy: -10,
    anchor: "start",
    tier: "secondary",
  },
  {
    id: "as-shanghai",
    label: "Shanghai",
    shortLabel: "Shanghai",
    coords: [121.47, 31.23],
    bulge: -76,
    labelDx: 0,
    labelDy: -16,
    anchor: "middle",
    tier: "secondary",
    showLabel: false,
  },
  {
    id: "au-sydney",
    label: "Australia",
    shortLabel: "Sydney",
    coords: [151.21, -33.87],
    bulge: 72,
    labelDx: 12,
    labelDy: 10,
    anchor: "start",
    tier: "primary",
  },
  {
    id: "nz-auckland",
    label: "New Zealand",
    shortLabel: "Auckland",
    coords: [174.76, -36.85],
    bulge: 88,
    labelDx: 12,
    labelDy: 20,
    anchor: "start",
    tier: "primary",
  },
];

/** Smooth quadratic arc in screen space (airline-map style). */
function curvedRoute(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bulge: number,
) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bulge;
  const cy = my + (dx / len) * bulge;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

const countriesTopology = countriesTopologyJson as unknown as Topology;
const countries = feature(
  countriesTopology,
  countriesTopology.objects.countries,
) as FeatureCollection<Geometry>;

const projection = geoNaturalEarth1().fitExtent(
  [
    [24, 40],
    [WIDTH - 24, HEIGHT - 28],
  ],
  countries,
);

const path = geoPath(projection);
const countryPaths = countries.features
  .map((f) => path(f))
  .filter((d): d is string => Boolean(d));

const originPx = projection(ORIGIN) as [number, number];

const routes = DESTINATIONS.map((dest) => {
  const point = projection(dest.coords) as [number, number];
  return {
    ...dest,
    tier: dest.tier ?? "primary",
    showLabel: dest.showLabel !== false,
    point,
    d: curvedRoute(originPx[0], originPx[1], point[0], point[1], dest.bulge),
  };
});

/** Compact origin badge — below-left of marker */
const ORIGIN_LABEL = {
  width: 132,
  height: 28,
  x: originPx[0] - 146,
  y: originPx[1] + 18,
};

export function GlobalReach() {
  return (
    <section className="border-b border-[#1a1a1a] bg-black">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="display-title text-[1.5rem] tracking-[0.08em] text-white uppercase md:text-[1.875rem]">
            Global Reach
          </h2>
          <div className="mx-auto mt-3 h-1 w-14 bg-[#f0c040]" aria-hidden />
          <p className="mt-5 text-[14px] leading-relaxed text-white/70 md:text-[15px]">
            Door-to-door freight across U.S. gateways, South America, Europe,
            the Middle East, Asia, Australia, and New Zealand.
          </p>
        </div>

        <div className="relative mt-12 md:mt-14">
          <div className="overflow-hidden border border-white/15 bg-black px-2 py-4 md:px-4 md:py-6">
            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              className="mx-auto h-auto w-full max-w-5xl"
              role="img"
              aria-label="World map with freight routes from ITC Group USA to major U.S. cities, South America, Europe, Middle East, Asia, Australia, and New Zealand"
            >
              <rect width={WIDTH} height={HEIGHT} className="fill-black" />

              <g
                className="fill-[#2a2a2a] stroke-[#3a3a3a]"
                strokeWidth={0.35}
              >
                {countryPaths.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>

              {/* Curved route arcs — secondary lighter, primary stronger */}
              <g fill="none" strokeLinecap="round">
                {routes.map((route) => (
                  <path
                    key={`route-${route.id}`}
                    d={route.d}
                    stroke="#f0c040"
                    strokeWidth={route.tier === "primary" ? 1.55 : 1.1}
                    strokeDasharray={
                      route.tier === "primary" ? "5.5 4.5" : "3.5 4"
                    }
                    opacity={route.tier === "primary" ? 0.9 : 0.55}
                  />
                ))}
              </g>

              {/* Destinations */}
              {routes.map((route) => (
                <g key={route.id}>
                  <circle
                    cx={route.point[0]}
                    cy={route.point[1]}
                    r={route.tier === "primary" ? 4.5 : 3.2}
                    className="fill-[#f0c040]"
                    opacity={route.tier === "primary" ? 1 : 0.85}
                  />
                  {route.tier === "primary" ? (
                    <circle
                      cx={route.point[0]}
                      cy={route.point[1]}
                      r={7.5}
                      className="fill-none stroke-[#f0c040]/45"
                      strokeWidth={1.1}
                    />
                  ) : null}
                  {route.showLabel ? (
                    <text
                      x={route.point[0] + route.labelDx}
                      y={route.point[1] + route.labelDy}
                      textAnchor={route.anchor}
                      className={
                        route.tier === "primary"
                          ? "global-reach-label fill-white text-[10px] font-semibold tracking-[0.06em] uppercase"
                          : "global-reach-label fill-white/75 text-[8px] font-medium tracking-[0.04em] uppercase"
                      }
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {route.label}
                    </text>
                  ) : null}
                </g>
              ))}

              {/* Origin marker + badge */}
              <g>
                <circle
                  cx={originPx[0]}
                  cy={originPx[1]}
                  r={15}
                  className="global-reach-pulse fill-none stroke-[#f0c040]"
                  strokeWidth={1.4}
                />
                <circle
                  cx={originPx[0]}
                  cy={originPx[1]}
                  r={9}
                  className="fill-none stroke-[#f0c040]"
                  strokeWidth={2}
                />
                <circle
                  cx={originPx[0]}
                  cy={originPx[1]}
                  r={4.5}
                  className="fill-[#f0c040]"
                />

                <g className="global-reach-origin-label">
                  <path
                    d={`M ${originPx[0] - 6} ${originPx[1] + 8} L ${ORIGIN_LABEL.x + ORIGIN_LABEL.width - 8} ${ORIGIN_LABEL.y}`}
                    fill="none"
                    stroke="#f0c040"
                    strokeWidth={1.1}
                  />
                  <rect
                    x={ORIGIN_LABEL.x}
                    y={ORIGIN_LABEL.y}
                    width={ORIGIN_LABEL.width}
                    height={ORIGIN_LABEL.height}
                    rx={1}
                    className="fill-[#f0c040]"
                  />
                  <text
                    x={ORIGIN_LABEL.x + ORIGIN_LABEL.width / 2}
                    y={ORIGIN_LABEL.y + 18}
                    textAnchor="middle"
                    className="fill-black text-[9px] font-semibold tracking-[0.05em] uppercase"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    ITC Group USA
                  </text>
                </g>
              </g>
            </svg>
          </div>

          <div className="mt-8 space-y-6 md:mt-10">
            <div className="hidden gap-8 md:grid md:grid-cols-3">
              <RouteList
                title="U.S. gateways"
                items={[
                  "New York",
                  "Los Angeles",
                  "Chicago",
                  "Miami",
                  "Houston",
                  "Dallas",
                  "Atlanta",
                  "Seattle",
                ]}
              />
              <RouteList
                title="South America"
                items={[
                  "São Paulo",
                  "Buenos Aires",
                  "Santiago",
                  "Lima",
                  "Bogotá",
                  "Rio de Janeiro",
                ]}
              />
              <RouteList
                title="Worldwide"
                items={[
                  "Toronto · Vancouver",
                  "Mexico City",
                  "London · Frankfurt",
                  "Dubai",
                  "Johannesburg",
                  "Singapore · Hong Kong · Tokyo",
                  "Sydney · Auckland",
                ]}
              />
            </div>

            <div className="md:hidden">
              <p className="inline-flex bg-[#f0c040] px-3 py-1.5 text-[10px] font-semibold tracking-[0.08em] text-black uppercase">
                ITC Group USA
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/15 pt-5">
                {DESTINATIONS.filter((d) => d.showLabel !== false).map(
                  (dest) => (
                    <li
                      key={dest.id}
                      className="flex items-center gap-2 text-[12px] text-white/75"
                    >
                      <span
                        className="size-1.5 shrink-0 rounded-full bg-[#f0c040]"
                        aria-hidden
                      />
                      {dest.shortLabel}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RouteList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.1em] text-[#f0c040] uppercase">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-[12px] text-white/75"
          >
            <span
              className="size-1.5 shrink-0 rounded-full bg-[#f0c040]"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
