import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  id: string;
};

export function TextInput({
  label,
  hint,
  error,
  className,
  id,
  ...props
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="portal-eyebrow">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "h-10 w-full border bg-ink px-3 text-[13px] text-snow placeholder:text-mist/55 focus-ring",
          error ? "border-status-exception" : "border-line focus:border-steel",
        )}
        {...props}
      />
      {hint && !error ? <p className="text-[11px] text-mist">{hint}</p> : null}
      {error ? <p className="text-[11px] text-status-exception">{error}</p> : null}
    </div>
  );
}

export function SelectInput({
  label,
  hint,
  error,
  className,
  id,
  children,
  ...props
}: FieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="portal-eyebrow">
        {label}
      </label>
      <select
        id={id}
        className={cn(
          "h-10 w-full border bg-ink px-2.5 text-[13px] text-snow focus-ring",
          error ? "border-status-exception" : "border-line focus:border-steel",
        )}
        {...props}
      >
        {children}
      </select>
      {hint && !error ? <p className="text-[11px] text-mist">{hint}</p> : null}
      {error ? <p className="text-[11px] text-status-exception">{error}</p> : null}
    </div>
  );
}

export function TextArea({
  label,
  hint,
  error,
  className,
  id,
  ...props
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="portal-eyebrow">
        {label}
      </label>
      <textarea
        id={id}
        className={cn(
          "min-h-28 w-full border bg-ink px-3 py-2.5 text-[13px] text-snow placeholder:text-mist/55 focus-ring",
          error ? "border-status-exception" : "border-line focus:border-steel",
        )}
        {...props}
      />
      {hint && !error ? <p className="text-[11px] text-mist">{hint}</p> : null}
      {error ? <p className="text-[11px] text-status-exception">{error}</p> : null}
    </div>
  );
}
