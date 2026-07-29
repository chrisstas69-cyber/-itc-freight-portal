"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type MarketingTheme = "light" | "dark";

type ThemeContextValue = {
  theme: MarketingTheme;
  toggle: () => void;
  setTheme: (theme: MarketingTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "itc-marketing-theme";

export function MarketingThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<MarketingTheme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
    }
    setReady(true);
  }, []);

  const setTheme = useCallback((next: MarketingTheme) => {
    setThemeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "light" ? "dark" : "light";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      <div
        className="marketing-root min-h-dvh bg-ink text-snow antialiased"
        data-theme={theme}
        data-ready={ready ? "true" : "false"}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useMarketingTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useMarketingTheme must be used within MarketingThemeProvider");
  }
  return ctx;
}

export function ThemeToggle({ variant = "marketing" }: { variant?: "marketing" | "hero" }) {
  const { theme, toggle } = useMarketingTheme();
  const isLight = theme === "light";
  const hero = variant === "hero";

  return (
    <button
      type="button"
      onClick={toggle}
      className={
        hero
          ? "inline-flex h-8 items-center gap-2 border border-white/25 px-2.5 text-[10px] font-medium tracking-[0.12em] text-white/75 uppercase transition-colors hover:border-white/45 hover:text-white focus-ring"
          : "inline-flex h-8 items-center gap-2 border border-line px-2.5 text-[10px] font-medium tracking-[0.12em] text-fog uppercase transition-colors hover:border-line-strong hover:text-snow focus-ring"
      }
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Dark mode" : "Light mode"}
    >
      <span className="size-1.5 shrink-0 bg-[#c4a86a]" aria-hidden />
      {isLight ? "Dark" : "Light"}
    </button>
  );
}
