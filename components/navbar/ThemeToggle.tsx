"use client";

import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  // Server/hydration renders "light" (the moon), then syncs to the real theme
  // after hydration — no mismatch thanks to useSyncExternalStore.
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className="inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-zinc-700 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:text-zinc-300 dark:hover:bg-surface-2 dark:focus-visible:outline-zinc-100"
    >
      {isDark ? (
        <LuSun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <LuMoon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
