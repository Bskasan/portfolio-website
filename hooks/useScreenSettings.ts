"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  DEFAULT_FX,
  DEFAULT_PHOSPHOR,
  FX_KEY,
  FxLevel,
  PHOS_KEY,
  Phosphor,
  isFxLevel,
  isPhosphor,
  listeners,
  setFxLevel,
  setPhosphor,
} from "@/lib/screenSettings";

/*
  Reads the screen settings, which live outside React as data attributes on <html>
  (set before first paint by the init script in app/layout.tsx), with
  `useSyncExternalStore`: the server snapshot during hydration, then the real DOM
  value. Same pattern the previous light/dark `useTheme` hook used.
*/

function subscribe(callback: () => void) {
  // Cross-tab sync: mirror a change made in another tab into this one.
  const onStorage = (event: StorageEvent) => {
    if (event.key === PHOS_KEY && isPhosphor(event.newValue)) {
      document.documentElement.dataset.phos = event.newValue;
      callback();
    } else if (event.key === FX_KEY && isFxLevel(event.newValue)) {
      document.documentElement.dataset.fx = event.newValue;
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  listeners.add(callback);

  return () => {
    window.removeEventListener("storage", onStorage);
    listeners.delete(callback);
  };
}

// Snapshots must be primitives so React can compare them cheaply.
const getSnapshot = () => {
  const { phos, fx } = document.documentElement.dataset;
  return `${isPhosphor(phos) ? phos : DEFAULT_PHOSPHOR}|${isFxLevel(fx) ? fx : DEFAULT_FX}`;
};
const getServerSnapshot = () => `${DEFAULT_PHOSPHOR}|${DEFAULT_FX}`;

export function useScreenSettings() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [phosphor, fx] = snapshot.split("|") as [Phosphor, FxLevel];

  return {
    phosphor,
    fx,
    setPhosphor: useCallback((value: Phosphor) => setPhosphor(value), []),
    setFxLevel: useCallback((value: FxLevel) => setFxLevel(value), []),
  };
}
