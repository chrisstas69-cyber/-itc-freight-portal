import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-steel text-white border border-steel/80 hover:bg-steel-bright hover:border-steel-bright disabled:opacity-45",
  secondary:
    "bg-transparent text-snow border border-line-strong hover:border-fog/70 hover:bg-panel-elevated",
  ghost:
    "bg-transparent text-fog hover:text-snow hover:bg-panel-hover border border-transparent",
  danger:
    "bg-transparent text-status-exception border border-status-exception/35 hover:bg-status-exception/[0.08]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[12px]",
  md: "h-10 px-4 text-[13px]",
  lg: "h-11 px-5 text-[13px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium tracking-[0.02em] transition-colors duration-150 focus-ring disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
