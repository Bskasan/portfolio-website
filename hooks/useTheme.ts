"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/**
 * The active theme lives outside React — on the <html> class that the anti-FOUC
 * script sets before hydration. `useSyncExternalStore` is the right primitive
 * for reading that kind of external, mutable state: it returns the server value
 * during hydration (avoiding a mismatch) then syncs to the real DOM value.
 */
function subscribe(callback: () => void) {
  // Cross-tab sync: mirror a theme change made in another tab into this one.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      document.documentElement.classList.toggle("dark", event.newValue === "dark");
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  themeListeners.add(callback);

  return () => {
    window.removeEventListener("storage", onStorage);
    themeListeners.delete(callback);
  };
}

// Same-tab notifications: the toggle mutates the DOM directly, so we ping every
// subscriber to re-read the snapshot (the `storage` event never fires locally).
const themeListeners = new Set<() => void>();

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next: Theme = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore write failures (e.g. private mode); the class still updates.
    }
    themeListeners.forEach((notify) => notify());
  }, []);

  return { theme, toggleTheme };
}
