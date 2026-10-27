"use client";

import { RefObject, useEffect } from "react";

import { NAV_LINKS } from "@/constants/navbar";
import { shortcutsEnabled } from "@/lib/keyboardShortcuts";

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

/*
  Global single-key shortcuts: 1–6 open the visible nav pages in order, "/"
  focuses the command line. Ignored while typing, with a modifier held, while a
  dialog is open, or after the visitor turned them off (`keys off`).
*/
export function useKeyboardShortcuts(
  go: (href: string) => void,
  commandInput: RefObject<HTMLInputElement | null>,
) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTyping(event.target) || event.metaKey || event.ctrlKey || event.altKey) return;
      if (!shortcutsEnabled()) return;
      if (document.querySelector("dialog[open]")) return;

      const links = NAV_LINKS.filter((link) => link.isVisible);
      const index = Number(event.key) - 1;
      if (Number.isInteger(index) && index >= 0 && index < links.length) {
        event.preventDefault();
        go(links[index].href);
      } else if (event.key === "/") {
        event.preventDefault();
        commandInput.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go, commandInput]);
}
