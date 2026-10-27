/*
  The single-key shortcuts (1-6 switch pages, "/" focuses the command line) can be
  turned off with the `keys off` command, as WCAG 2.1.4 (Character Key Shortcuts)
  requires: speech-input users can otherwise trigger them by accident. The choice
  is saved per browser and read at key-press time, so no React state is needed.
*/
const STORAGE_KEY = "keys";

// Holds the choice for this page when localStorage is unavailable (private mode).
let sessionChoice = true;

export function shortcutsEnabled(): boolean {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === null ? sessionChoice : saved !== "off";
  } catch {
    return sessionChoice;
  }
}

export function setShortcutsEnabled(enabled: boolean) {
  sessionChoice = enabled;
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  } catch {
    // Storage blocked: sessionChoice keeps the setting until the page reloads.
  }
}
