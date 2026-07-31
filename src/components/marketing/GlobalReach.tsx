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
};

const WIDTH = 980;
const HEIGHT = 500;

/** United States origin for worldwide route map */
const ORIGIN: LonLat = [-95.7, 37.1];

const DESTINATIONS: Destination[] = [
  {
    id: "canada",
    label: "Canada",
    shortLabel: "Canada",
    coords: [-79.38, 43.65],
    bulge: -28,
    labelDx: 0,
    labelDy: -18,
    anchor: "middle",
  },
  {
    id: "sa",
    label: "South America",
    shortLabel: "South America",
    coords: [-46.63, -23.55],
    bulge: 48,
    labelDx: 14,
    labelDy: 20,
    anchor: "start",
  },
  {
    id: "eu",
    label: "Europe",
    shortLabel: "Europe",
    coords: [2.35, 48.86],
    bulge: -42,
    labelDx: 14,
    labelDy: -18,
    anchor: "start",
  },
  {
    id: "me",
    label: "Middle East",
    shortLabel: "Middle East",
    coords: [55.27, 25.2],
    bulge: -55,
    labelDx: 12,
    labelDy: 22,
    anchor: "start",
  },
  {
    id: "as",
    label: "Asia",
    shortLabel: "Asia",
    coords: [121.47, 31.23],
    bulge: -78,
    labelDx: 0,
    labelDy: -18,
    anchor: "middle",
  },
  {
    id: "au",
    label: "Australia",
    shortLabel: "Australia",
    coords: [151.21, -33.87],
    bulge: 72,
    labelDx: 14,
    labelDy: 8,
    anchor: "start",
  },
  {
    id: "nz",
    label: "New Zealand",
    shortLabel: "New Zealand",
    coords: [174.76, -36.85],
    bulge: 88,
    labelDx: 12,
    labelDy: 22,
    anchor: "start",
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
            Door-to-door freight logistics across Australia, New Zealand, Asia,
            Europe, the Middle East, Canada, and South America.
          </p>
        </div>

        <div className="relative mt-12 md:mt-14">
          <div className="overflow-hidden border border-white/15 bg-black px-2 py-4 md:px-4 md:py-6">
            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              className="mx-auto h-auto w-full max-w-5xl"
              role="img"
              aria-label="World map with freight routes from the United States to Canada, South America, Europe, Middle East, Asia, Australia, and New Zealand"
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

              {/* Curved route arcs */}
              <g
                fill="none"
                stroke="#f0c040"
                strokeWidth={1.55}
                strokeDasharray="5.5 4.5"
                strokeLinecap="round"
                opacity={0.9}
              >
                {routes.map((route) => (
                  <path key={`route-${route.id}`} d={route.d} />
                ))}
              </g>

              {/* Destinations */}
              {routes.map((route) => (
                <g key={route.id}>
                  <circle
                    cx={route.point[0]}
                    cy={route.point[1]}
                    r={4.5}
                    className="fill-[#f0c040]"
                  />
                  <circle
                    cx={route.point[0]}
                    cy={route.point[1]}
                    r={7.5}
                    className="fill-none stroke-[#f0c040]/45"
                    strokeWidth={1.1}
                  />
                  <text
                    x={route.point[0] + route.labelDx}
                    y={route.point[1] + route.labelDy}
                    textAnchor={route.anchor}
                    className="global-reach-label fill-white text-[10px] font-semibold tracking-[0.06em] uppercase"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {route.label}
                  </text>
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

          <div className="mt-8 md:hidden">
            <p className="inline-flex bg-[#f0c040] px-3 py-1.5 text-[10px] font-semibold tracking-[0.08em] text-black uppercase">
              ITC Group USA
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/15 pt-5">
              {DESTINATIONS.map((dest) => (
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
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
