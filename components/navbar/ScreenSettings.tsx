"use client";

import { useScreenSettings } from "@/hooks/useScreenSettings";
import { FX_LEVELS, FxLevel, PHOSPHORS, Phosphor } from "@/lib/screenSettings";

const PHOSPHOR_LABELS: Record<Phosphor, string> = { green: "GRN", amber: "AMB", white: "WHT" };
const PHOSPHOR_NAMES: Record<Phosphor, string> = { green: "Green", amber: "Amber", white: "White" };
const FX_LABELS: Record<FxLevel, string> = { off: "OFF", subtle: "SUB", full: "FULL" };
const FX_NAMES: Record<FxLevel, string> = { off: "Off", subtle: "Subtle", full: "Full" };

interface ScreenSettingsProps {
  /** "bar": inline in the desktop system bar. "menu": stacked inside the mobile menu. */
  variant?: "bar" | "menu";
}

/*
  The customization control: phosphor colour (green / amber / white) and screen
  effects (off / subtle / full). Replaces the old light/dark ThemeToggle.
*/
const ScreenSettings = ({ variant = "bar" }: ScreenSettingsProps) => {
  const { phosphor, fx, setPhosphor, setFxLevel } = useScreenSettings();

  return (
    <div className={variant === "bar" ? "flex items-center gap-[18px]" : "flex flex-col gap-2.5"}>
      <div className="seg" role="group" aria-label="Phosphor colour">
        <span className="seg-label" aria-hidden="true">
          PHOSPHOR
        </span>
        {PHOSPHORS.map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={phosphor === value}
            aria-label={`${PHOSPHOR_NAMES[value]} phosphor`}
            onClick={() => setPhosphor(value)}
          >
            {PHOSPHOR_LABELS[value]}
          </button>
        ))}
      </div>

      <div className="seg" role="group" aria-label="Screen effects">
        <span className="seg-label" aria-hidden="true">
          FX
        </span>
        {FX_LEVELS.map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={fx === value}
            aria-label={`${FX_NAMES[value]} screen effects`}
            onClick={() => setFxLevel(value)}
          >
            {FX_LABELS[value]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScreenSettings;
