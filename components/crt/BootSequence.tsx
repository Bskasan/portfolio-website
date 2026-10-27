"use client";

import { useEffect, useState } from "react";

interface BootSequenceProps {
  lines: string[];
  /** Called once the screen has faded out. */
  onDone: () => void;
}

/*
  The boot screen shown by the `boot` command: types out `lines`, then fades out.
  Any key or a click skips to the fade. Mount it with a new `key` to replay.
*/
const BootSequence = ({ lines, onDone }: BootSequenceProps) => {
  const [shown, setShown] = useState(0);
  const [ending, setEnding] = useState(false);

  useEffect(() => {
    if (ending) {
      const id = window.setTimeout(onDone, 360); // matches .crt-boot.is-out
      return () => window.clearTimeout(id);
    }
    const id =
      shown < lines.length
        ? window.setTimeout(() => setShown((n) => n + 1), 190)
        : window.setTimeout(() => setEnding(true), 400);
    return () => window.clearTimeout(id);
  }, [shown, ending, lines.length, onDone]);

  useEffect(() => {
    const skip = () => setEnding(true);
    window.addEventListener("keydown", skip, { capture: true, once: true });
    return () => window.removeEventListener("keydown", skip, { capture: true });
  }, []);

  return (
    <div
      className={`crt-boot ${ending ? "is-out" : ""}`}
      aria-hidden="true"
      onClick={() => setEnding(true)}
    >
      {lines.slice(0, shown).map((line) => (
        <span key={line}>{line}</span>
      ))}
      <span className="mt-auto text-phos-dim">PRESS ANY KEY OR CLICK TO SKIP</span>
    </div>
  );
};

export default BootSequence;
