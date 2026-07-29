import type { Milestone } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

type MilestoneTimelineProps = {
  milestones: Milestone[];
};

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  return (
    <ol className="space-y-0">
      {milestones.map((m, index) => {
        const isLast = index === milestones.length - 1;
        return (
          <li key={`${m.label}-${index}`} className="relative flex gap-4 pb-7 last:pb-0">
            {!isLast ? (
              <span
                className={cn(
                  "absolute top-3 left-[6px] h-[calc(100%-2px)] w-px",
                  m.completed ? "bg-steel/45" : "bg-line",
                )}
                aria-hidden
              />
            ) : null}
            <span
              className={cn(
                "relative z-10 mt-1 size-3 shrink-0 border",
                m.completed
                  ? "border-steel bg-steel"
                  : "border-line-strong bg-ink",
              )}
              aria-hidden
            />
            <div className="min-w-0 flex-1 pt-px">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p
                  className={cn(
                    "text-[13px] font-medium tracking-tight",
                    m.completed ? "text-snow" : "text-mist",
                  )}
                >
                  {m.label}
                </p>
                {m.at ? (
                  <p className="mono-ref text-[11px] text-mist">{formatDateTime(m.at)}</p>
                ) : (
                  <p className="text-[11px] text-mist">Not yet reached</p>
                )}
              </div>
              <p className="mt-1 text-[13px] leading-snug text-fog">{m.location}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
