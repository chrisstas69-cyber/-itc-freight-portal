import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
  compact?: boolean;
};

export function EmptyState({
  title,
  description,
  action,
  className,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2 border border-dashed border-line bg-panel/40 hairline-top",
        compact ? "px-5 py-9" : "px-6 py-12",
        className,
      )}
    >
      <p className="portal-eyebrow">Empty</p>
      <h3 className="text-[15px] font-medium tracking-tight text-snow">{title}</h3>
      <p className="max-w-md text-[13px] leading-relaxed text-mist">{description}</p>
      {action}
    </div>
  );
}

export function LoadingState({
  label = "Loading…",
  compact = false,
}: {
  label?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border border-line bg-panel text-[13px] text-mist hairline-top",
        compact ? "px-4 py-5" : "px-5 py-8",
      )}
      role="status"
      aria-live="polite"
    >
      <span
        className="size-3.5 shrink-0 animate-spin border border-line-strong border-t-steel"
        aria-hidden
      />
      {label}
    </div>
  );
}

export function ErrorState({
  title = "Unable to load",
  description,
  onRetry,
}: {
  title?: string;
  description: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-start gap-2.5 border border-status-exception/30 bg-status-exception/[0.03] px-5 py-5 hairline-top">
      <p className="portal-eyebrow text-status-exception/70">System</p>
      <h3 className="text-[15px] font-medium text-status-exception">{title}</h3>
      <p className="text-[13px] leading-relaxed text-mist">{description}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 text-[13px] text-steel-bright underline-offset-4 hover:underline focus-ring"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}

export function PanelEmpty({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <p className={cn("px-4 py-7 text-[13px] leading-relaxed text-mist", className)}>
      {message}
    </p>
  );
}
