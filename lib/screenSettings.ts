/*
  Screen settings shared by the root layout (server) and the client hook/components:
  which phosphor colour the "tube" glows in, and how strong the CRT effects are.
  Kept out of the "use client" hook module so the server layout can import the
  init script as a plain string.
*/

export const PHOSPHORS = ["green", "amber", "white"] as const;
export const FX_LEVELS = ["off", "subtle", "full"] as const;

export type Phosphor = (typeof PHOSPHORS)[number];
export type FxLevel = (typeof FX_LEVELS)[number];

export const DEFAULT_PHOSPHOR: Phosphor = "green";
export const DEFAULT_FX: FxLevel = "subtle";

export const PHOS_KEY = "phos";
export const FX_KEY = "fx";

export const isPhosphor = (value: unknown): value is Phosphor =>
  PHOSPHORS.includes(value as Phosphor);
export const isFxLevel = (value: unknown): value is FxLevel => FX_LEVELS.includes(value as FxLevel);

/*
  Runs synchronously before first paint (stringified into the root layout) to apply
  the saved settings and prevent a flash of the default screen. Visitors who had
  picked the old light theme start on the white phosphor.
*/
export const screenSettingsInitScript = `
(function () {
  try {
    var root = document.documentElement;
    var phos = localStorage.getItem("${PHOS_KEY}");
    var fx = localStorage.getItem("${FX_KEY}");
    if (!phos && localStorage.getItem("theme") === "light") phos = "white";
    if (${JSON.stringify(PHOSPHORS)}.indexOf(phos) === -1) phos = "${DEFAULT_PHOSPHOR}";
    if (${JSON.stringify(FX_LEVELS)}.indexOf(fx) === -1) fx = "${DEFAULT_FX}";
    root.dataset.phos = phos;
    root.dataset.fx = fx;
  } catch (e) {}
})();
`;

// Same-tab notifications: setters mutate the DOM directly, so every subscriber
// is pinged to re-read the snapshot (the `storage` event never fires locally).
export const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore write failures (e.g. private mode); the attribute still updates.
  }
}

export function setPhosphor(value: Phosphor) {
  document.documentElement.dataset.phos = value;
  save(PHOS_KEY, value);
  notify();
}

export function setFxLevel(value: FxLevel) {
  document.documentElement.dataset.fx = value;
  save(FX_KEY, value);
  notify();
}
