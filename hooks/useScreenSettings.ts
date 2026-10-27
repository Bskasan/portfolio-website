"use client";

import { useSyncExternalStore } from "react";
import {
  FxLevel,
  Phosphor,
  getScreenSettingsSnapshot,
  getServerScreenSettingsSnapshot,
  setFxLevel,
  setPhosphor,
  subscribeToScreenSettings,
} from "@/lib/screenSettings";

/*
  Reads the screen settings, which live outside React as data attributes on <html>
  (set before first paint by the init script in app/layout.tsx), with
  `useSyncExternalStore`: the server snapshot during hydration, then the real DOM
  value. The store itself lives in lib/screenSettings.ts.
*/
export function useScreenSettings() {
  const snapshot = useSyncExternalStore(
    subscribeToScreenSettings,
    getScreenSettingsSnapshot,
    getServerScreenSettingsSnapshot,
  );
  const [phosphor, fx] = snapshot.split("|") as [Phosphor, FxLevel];

  // The setters are plain module functions, so they're already stable.
  return { phosphor, fx, setPhosphor, setFxLevel };
}
