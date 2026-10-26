"use client";

import { ReactNode, useRef, useState } from "react";

interface CopyButtonProps {
  value: string;
  label: string;
  /** id of the element holding the value, selected as a fallback when copying fails. */
  fallbackTargetId: string;
  /** Extra actions shown next to the button (the status message goes below both). */
  children?: ReactNode;
}

const CopyButton = ({ value, label, fallbackTargetId, children }: CopyButtonProps) => {
  const [message, setMessage] = useState("");
  const timer = useRef<number | undefined>(undefined);

  const flash = (text: string) => {
    setMessage(text);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(""), 4000);
  };

  const selectFallback = () => {
    const target = document.getElementById(fallbackTargetId);
    if (!target) return flash("Copying isn't available here.");
    const range = document.createRange();
    range.selectNodeContents(target);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    flash("Address selected. Press Ctrl+C or Cmd+C to copy.");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      flash(`Copied ${value} to the clipboard.`);
    } catch {
      selectFallback();
    }
  };

  return (
    <>
      <button type="button" className="cmdlink is-solid" onClick={copy}>
        [ {label} ]
      </button>
      {children}
      <p role="status" className="min-h-[1.6em] w-full text-[13px] text-phos-dim">
        {message}
      </p>
    </>
  );
};

export default CopyButton;
