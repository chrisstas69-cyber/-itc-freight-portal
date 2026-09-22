"use client";

import { useEffect, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { Topology } from "topojson-specification";
import countriesTopologyJson from "world-atlas/countries-110m.json";

type LonLat = [number, number];

type RouteStatus = "traffic" | "transit" | "completed";

type RouteDef = {
  id: string;
  label: string;
  coords: LonLat;
  bulge: number;
  labelDx: number;
  labelDy: number;
  anchor: "start" | "middle" | "end";
  status: RouteStatus;
  durationSec?: number;
  delaySec?: number;
};

type RegionLabel = {
  id: string;
  label: string;
  coords: LonLat;
  dx?: number;
  dy?: number;
  anchor?: "start" | "middle" | "end";
};

const WIDTH = 1100;
const HEIGHT = 560;

/** Hub — Northeast U.S. */
const ORIGIN: LonLat = [-74.0, 40.9];

/**
 * transit = amber hairline + white plane in motion
 * completed = cyan dashed + icy plane near destination
 * traffic = cyan dashed only
 *
 * South America bulges are staggered so arcs fan instead of smearing.
 */
const ROUTES: RouteDef[] = [
  {
    id: "vancouver",
    label: "Vancouver",
    coords: [-123.12, 49.28],
    bulge: -38,
    labelDx: -14,
    labelDy: -18,
    anchor: "end",
    status: "traffic",
  },
  {
    id: "seattle",
    label: "Seattle",
    coords: [-122.33, 47.61],
    bulge: -24,
    labelDx: -14,
    labelDy: 20,
    anchor: "end",
    status: "completed",
    durationSec: 15,
    delaySec: 0.4,
  },
  {
    id: "chicago",
    label: "Chicago",
    coords: [-87.63, 41.88],
    bulge: -14,
    labelDx: -18,
    labelDy: -16,
    anchor: "end",
    status: "traffic",
  },
  {
    id: "miami",
    label: "Miami",
    coords: [-80.19, 25.76],
    bulge: 10,
    labelDx: 16,
    labelDy: 18,
    anchor: "start",
    status: "completed",
    durationSec: 10,
    delaySec: 1.1,
  },
  {
    id: "mexico-city",
    label: "Mexico City",
    coords: [-99.13, 19.43],
    bulge: -20,
    labelDx: -18,
    labelDy: 20,
    anchor: "end",
    status: "traffic",
  },
  {
    id: "bogota",
    label: "Bogotá",
    coords: [-74.07, 4.71],
    bulge: 12,
    labelDx: -18,
    labelDy: 8,
    anchor: "end",
    status: "traffic",
  },
  {
    id: "lima",
    label: "Lima",
    coords: [-77.04, -12.05],
    bulge: 34,
    labelDx: -18,
    labelDy: 4,
    anchor: "end",
    status: "traffic",
  },
  {
    id: "santiago",
    label: "Santiago",
    coords: [-70.67, -33.45],
    bulge: 58,
    labelDx: -18,
    labelDy: 18,
    anchor: "end",
    status: "completed",
    durationSec: 16,
    delaySec: 2.0,
  },
  {
    id: "sao-paulo",
    label: "São Paulo",
    coords: [-46.63, -23.55],
    bulge: -18,
    labelDx: 16,
    labelDy: -10,
    anchor: "start",
    status: "transit",
    durationSec: 14,
    delaySec: 0.2,
  },
  {
    id: "buenos-aires",
    label: "Buenos Aires",
    coords: [-58.38, -34.6],
    bulge: 22,
    labelDx: 16,
    labelDy: 22,
    anchor: "start",
    status: "traffic",
  },
  {
    id: "frankfurt",
    label: "Frankfurt",
    coords: [8.68, 50.11],
    bulge: -46,
    labelDx: 16,
    labelDy: 14,
    anchor: "start",
    status: "transit",
    durationSec: 17,
    delaySec: 0.8,
  },
  {
    id: "johannesburg",
    label: "Johannesburg",
    coords: [28.05, -26.2],
    bulge: 58,
    labelDx: 14,
    labelDy: 16,
    anchor: "start",
    status: "completed",
    durationSec: 18,
    delaySec: 1.6,
  },
  {
    id: "dubai",
    label: "Dubai",
    coords: [55.27, 25.2],
    bulge: -52,
    labelDx: 14,
    labelDy: 18,
    anchor: "start",
    status: "traffic",
  },
  {
    id: "hong-kong",
    label: "Hong Kong",
    coords: [114.17, 22.32],
    bulge: -78,
    labelDx: 12,
    labelDy: 18,
    anchor: "start",
    status: "completed",
    durationSec: 20,
    delaySec: 2.4,
  },
  {
    id: "tokyo",
    label: "Tokyo",
    coords: [139.69, 35.69],
    bulge: -86,
    labelDx: 16,
    labelDy: -14,
    anchor: "start",
    status: "transit",
    durationSec: 21,
    delaySec: 1.3,
  },
  {
    id: "sydney",
    label: "Sydney",
    coords: [151.21, -33.87],
    bulge: 70,
    labelDx: -10,
    labelDy: -14,
    anchor: "end",
    status: "transit",
    durationSec: 22,
    delaySec: 0.5,
  },
  {
    id: "auckland",
    label: "Auckland",
    coords: [174.76, -36.85],
    bulge: 86,
    labelDx: 16,
    labelDy: 22,
    anchor: "start",
    status: "traffic",
  },
];

/** Region labels — spaced well clear of cities and each other */
const REGION_LABELS: RegionLabel[] = [
  {
    id: "canada",
    label: "CANADA",
    coords: [-110, 68],
    dy: -6,
    anchor: "middle",
  },
  {
    id: "europe",
    label: "EUROPE",
    coords: [5, 62],
    dx: -4,
    dy: -10,
    anchor: "middle",
  },
  {
    id: "middle-east",
    label: "MIDDLE EAST",
    coords: [52, 18],
    dx: 10,
    dy: 6,
    anchor: "start",
  },
  {
    id: "asia",
    label: "ASIA",
    coords: [108, 48],
    dx: 0,
    dy: -6,
    anchor: "middle",
  },
  {
    id: "australia",
    label: "AUSTRALIA",
    coords: [128, -18],
    dx: -6,
    dy: -8,
    anchor: "middle",
  },
  {
    id: "new-zealand",
    label: "NEW ZEALAND",
    coords: [178, -48],
    dx: 4,
    dy: 10,
    anchor: "start",
  },
];

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
  /** Path-tangent angle (deg) near destination — for parked planes */
  const t = 0.9;
  const tx = 2 * (1 - t) * (cx - x1) + 2 * t * (x2 - cx);
  const ty = 2 * (1 - t) * (cy - y1) + 2 * t * (y2 - cy);
  const angleDeg = (Math.atan2(ty, tx) * 180) / Math.PI;
  return {
    d: `M ${x1.toFixed(2)} ${y1.toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}`,
    angleDeg,
  };
}

const countriesTopology = countriesTopologyJson as unknown as Topology;
const countries = feature(
  countriesTopology,
  countriesTopology.objects.countries,
) as FeatureCollection<Geometry>;

const projection = geoNaturalEarth1().fitExtent(
  [
    [40, 30],
    [WIDTH - 40, HEIGHT - 70],
  ],
  countries,
);

const path = geoPath(projection);
const countryPaths = countries.features
  .map((f) => path(f))
  .filter((d): d is string => Boolean(d));

const originPx = projection(ORIGIN) as [number, number];

const routes = ROUTES.map((dest) => {
  const point = projection(dest.coords) as [number, number];
  const curve = curvedRoute(
    originPx[0],
    originPx[1],
    point[0],
    point[1],
    dest.bulge,
  );
  return {
    ...dest,
    point,
    d: curve.d,
    angleDeg: curve.angleDeg,
  };
});

const regionLabels = REGION_LABELS.map((r) => ({
  ...r,
  point: projection(r.coords) as [number, number],
}));

/**
 * Lucide plane points NE (~45°). rotate="auto" aligns local +X with the path,
 * so we rotate +45° to put the nose on +X — planes fly straight along the arc.
 */
function PlaneGlyph({ tone }: { tone: "transit" | "completed" }) {
  const fill = tone === "transit" ? "#FFFFFF" : "#E0F2FE";
  return (
    <path
      d="M17.8 19.2 16 11l3.5-3.5a1.5 1.5 0 0 0-2.1-2.1L13.9 9 5.8 7.2a1 1 0 0 0-.9 1.5L7 12l-2.5 2.5-2.2-.4a.8.8 0 0 0-.9.8c0 .2.1.4.2.5l2.4 2.4 2.4 2.4c.1.1.3.2.5.2a.8.8 0 0 0 .8-.9l-.4-2.2L12 17l3.3 2.1a1 1 0 0 0 1.5-.9z"
      fill={fill}
    />
  );
}

/** Centers glyph and aligns nose to local +X for path-following */
function PlaneMarker({
  tone,
  scale = 0.78,
}: {
  tone: "transit" | "completed";
  scale?: number;
}) {
  return (
    <g className="global-reach-plane" transform={`scale(${scale})`}>
      {/* Lucide nose points NE; +45° puts nose on +X for rotate="auto" */}
      <g transform="translate(-10 -11) rotate(45 10 11)">
        <PlaneGlyph tone={tone} />
      </g>
    </g>
  );
}

/** Razor-thin arc: soft under-glow + hairline core. No Gaussian blur. */
function HairlineRoute({
  d,
  color,
  dashed,
}: {
  d: string;
  color: "#FBBF24" | "#38BDF8";
  dashed?: boolean;
}) {
  const glowClass =
    color === "#FBBF24"
      ? "global-reach-hairline-amber"
      : "global-reach-hairline-cyan";

  return (
    <g fill="none" strokeLinecap="round">
      <path
        d={d}
        stroke={color}
        strokeWidth={3.5}
        opacity={0.25}
        className={glowClass}
        strokeDasharray={dashed ? "4 6" : undefined}
      />
      <path
        d={d}
        stroke={color}
        strokeWidth={1.25}
        opacity={dashed ? 0.45 : 0.85}
        strokeDasharray={dashed ? "4 6" : undefined}
      />
    </g>
  );
}

export function GlobalReach() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const animate = !reduceMotion;

  return (
    <section className="border-b border-white/10 bg-[#0B0F17]">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="display-title text-[1.5rem] tracking-[0.08em] text-white uppercase md:text-[1.875rem]">
            Global Reach
          </h2>
          <div className="mx-auto mt-3 h-1 w-14 bg-[#F59E0B]" aria-hidden />
          <p className="mt-5 text-[14px] leading-relaxed text-white/70 md:text-[15px]">
            Door-to-door freight across U.S. gateways, South America, Europe,
            the Middle East, Asia, Australia, and New Zealand.
          </p>
        </div>

        <div className="relative mt-10 md:mt-12">
          <div className="overflow-hidden border border-white/12 bg-[#080C14]">
            <div className="relative mx-auto w-full max-w-6xl aspect-[1100/560]">
              <svg
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="Global logistics map showing current traffic, in-transit, and completed routes from ITC Group USA"
              >
                <defs>
                  <radialGradient id="hub-halo" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                    <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width={WIDTH} height={HEIGHT} fill="#0B0F17" />

                <g fill="#1A2230" stroke="none">
                  {countryPaths.map((d, i) => (
                    <path key={i} d={d} />
                  ))}
                </g>

                <g
                  fill="none"
                  stroke="#2E3A4F"
                  strokeWidth={0.3}
                  opacity={0.45}
                >
                  {countryPaths.map((d, i) => (
                    <path key={`edge-${i}`} d={d} />
                  ))}
                </g>

                <circle
                  cx={originPx[0]}
                  cy={originPx[1]}
                  r={90}
                  fill="url(#hub-halo)"
                />

                {/* Secondary / completed — cyan dashed hairlines */}
                {routes
                  .filter((r) => r.status !== "transit")
                  .map((route) => (
                    <HairlineRoute
                      key={`traffic-${route.id}`}
                      d={route.d}
                      color="#38BDF8"
                      dashed
                    />
                  ))}

                {/* In-transit — amber hairlines */}
                {routes
                  .filter((r) => r.status === "transit")
                  .map((route) => (
                    <g key={`transit-${route.id}`}>
                      <HairlineRoute d={route.d} color="#FBBF24" />
                      {animate ? (
                        <path
                          d={route.d}
                          fill="none"
                          stroke="#FDE68A"
                          strokeWidth={1.25}
                          strokeDasharray="10 28"
                          strokeLinecap="round"
                          opacity={0.65}
                          className="global-reach-flow"
                          style={{
                            animationDuration: `${route.durationSec ?? 16}s`,
                            animationDelay: `${route.delaySec ?? 0}s`,
                          }}
                        />
                      ) : null}
                    </g>
                  ))}

                {regionLabels.map((region) => (
                  <text
                    key={region.id}
                    x={(region.point[0] ?? 0) + (region.dx ?? 0)}
                    y={(region.point[1] ?? 0) + (region.dy ?? 0)}
                    textAnchor={region.anchor ?? "middle"}
                    className="global-reach-label fill-white/55 text-[9px] font-semibold tracking-[0.14em]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {region.label}
                  </text>
                ))}

                {/* Destination hubs — pinpoint + gentle ping */}
                {routes.map((route) => {
                  const isTransit = route.status === "transit";
                  const isCompleted = route.status === "completed";
                  const fill = isCompleted ? "#38BDF8" : "#FBBF24";
                  const r = isTransit ? 3 : 2.25;
                  return (
                    <g key={`node-${route.id}`}>
                      {animate ? (
                        <circle
                          cx={route.point[0]}
                          cy={route.point[1]}
                          r={r}
                          fill={fill}
                          opacity={0.5}
                          className="global-reach-ping"
                        />
                      ) : null}
                      <circle
                        cx={route.point[0]}
                        cy={route.point[1]}
                        r={r}
                        fill={fill}
                      />
                      <text
                        x={route.point[0] + route.labelDx}
                        y={route.point[1] + route.labelDy}
                        textAnchor={route.anchor}
                        className="global-reach-label fill-white text-[9px] font-medium tracking-[0.04em]"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {route.label}
                      </text>
                    </g>
                  );
                })}

                {/* Origin hub */}
                <g>
                  {animate ? (
                    <>
                      <circle
                        cx={originPx[0]}
                        cy={originPx[1]}
                        r={14}
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth={1}
                        className="global-reach-radar"
                      />
                      <circle
                        cx={originPx[0]}
                        cy={originPx[1]}
                        r={14}
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth={0.9}
                        className="global-reach-radar global-reach-radar-delay"
                      />
                    </>
                  ) : null}
                  <image
                    href="/brand/itc-grp-mark.png"
                    x={originPx[0] - 34}
                    y={originPx[1] - 48}
                    width={28}
                    height={40}
                  />
                  <circle
                    cx={originPx[0]}
                    cy={originPx[1]}
                    r={9}
                    fill="#0B0F17"
                    stroke="#F59E0B"
                    strokeWidth={1.75}
                  />
                  <circle
                    cx={originPx[0]}
                    cy={originPx[1]}
                    r={3.5}
                    fill="#F59E0B"
                  />
                  <rect
                    x={originPx[0] + 14}
                    y={originPx[1] - 13}
                    width={128}
                    height={26}
                    rx={2}
                    fill="#F59E0B"
                  />
                  <text
                    x={originPx[0] + 78}
                    y={originPx[1] + 4}
                    textAnchor="middle"
                    className="fill-[#0B0F17] text-[10px] font-bold tracking-[0.07em]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    ITC GROUP USA
                  </text>
                </g>

                {/* In-transit planes — rotate="auto" keeps nose along the arc */}
                {animate
                  ? routes
                      .filter((r) => r.status === "transit")
                      .map((route) => (
                        <g key={`plane-transit-${route.id}`}>
                          <animateMotion
                            dur={`${route.durationSec ?? 16}s`}
                            begin={`${route.delaySec ?? 0}s`}
                            repeatCount="indefinite"
                            rotate="auto"
                            path={route.d}
                          />
                          <PlaneMarker tone="transit" scale={0.78} />
                        </g>
                      ))
                  : null}

                {/* Just-completed planes — oriented to final approach tangent */}
                {routes
                  .filter((r) => r.status === "completed")
                  .map((route) => (
                    <g
                      key={`plane-done-${route.id}`}
                      transform={`translate(${route.point[0]} ${route.point[1]}) rotate(${route.angleDeg})`}
                    >
                      <g transform="translate(-14 -10)">
                        <PlaneMarker tone="completed" scale={0.72} />
                      </g>
                    </g>
                  ))}

                {/* Legend */}
                <g transform={`translate(40 ${HEIGHT - 42})`}>
                  <g>
                    <circle cx={6} cy={6} r={3.5} fill="#F59E0B" />
                    <text
                      x={16}
                      y={10}
                      className="fill-white/75 text-[10px]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      ITC Group USA
                    </text>
                  </g>
                  <g transform="translate(150 0)">
                    <path
                      d="M0 6 H28"
                      stroke="#38BDF8"
                      strokeWidth={1.25}
                      strokeDasharray="4 6"
                      fill="none"
                      opacity={0.7}
                    />
                    <text
                      x={36}
                      y={10}
                      className="fill-white/75 text-[10px]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      current traffic
                    </text>
                  </g>
                  <g transform="translate(340 0)">
                    <path
                      d="M0 6 H22"
                      stroke="#FBBF24"
                      strokeWidth={1.25}
                      fill="none"
                      opacity={0.9}
                    />
                    <g transform="translate(8 0) rotate(-20)">
                      <PlaneMarker tone="transit" scale={0.55} />
                    </g>
                    <text
                      x={36}
                      y={10}
                      className="fill-white/75 text-[10px]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      in transit
                    </text>
                  </g>
                  <g transform="translate(490 0)">
                    <g transform="translate(4 0) rotate(-20)">
                      <PlaneMarker tone="completed" scale={0.55} />
                    </g>
                    <text
                      x={28}
                      y={10}
                      className="fill-white/75 text-[10px]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      just completed
                    </text>
                  </g>
                </g>
              </svg>
            </div>
          </div>

          <div className="mt-8 space-y-6 md:mt-10">
            <div className="hidden gap-8 border border-white/10 bg-white/[0.02] px-6 py-6 md:grid md:grid-cols-3 md:px-8">
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
              <p className="inline-flex bg-[#F59E0B] px-3 py-1.5 text-[10px] font-semibold tracking-[0.08em] text-[#0B0F17] uppercase">
                ITC Group USA
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/15 pt-5">
                {[
                  "Chicago",
                  "Miami",
                  "São Paulo",
                  "Frankfurt",
                  "Tokyo",
                  "Sydney",
                  "Hong Kong",
                  "Johannesburg",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-[12px] text-white/75"
                  >
                    <span
                      className="size-1.5 shrink-0 rounded-full bg-[#F59E0B]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
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
      <p className="text-[11px] font-semibold tracking-[0.1em] text-[#F59E0B] uppercase">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-[12px] text-white/75"
          >
            <span
              className="size-1.5 shrink-0 rounded-full bg-[#F59E0B]"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
