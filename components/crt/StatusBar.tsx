"use client";

import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";

import BootSequence from "@/components/crt/BootSequence";
import Clock from "@/components/crt/Clock";
import { pageAnimation } from "@/lib/animations/pageAnimation";
import type { Cartridge } from "@/lib/cartridges";
import { OPEN_ITEM_EVENT } from "@/lib/commandEvents";
import { CommandEffect, PROMPT, bootScript, runCommand } from "@/lib/commands";
import { setShortcutsEnabled, shortcutsEnabled } from "@/lib/keyboardShortcuts";
import { setFxLevel, setPhosphor } from "@/lib/screenSettings";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { PROFILE } from "@/constants/profile";

interface StatusBarProps {
  /** Newest first; for the `read` command. */
  posts: { slug: string; title: string }[];
  /** Projects and games the `open` / `ls` commands know about (built on the server). */
  cartridges: Cartridge[];
}

type LogLine = { text: string; echo?: boolean };

// Touch screens get a shorter hint (there is no "/" shortcut to press).
const coarsePointer = {
  subscribe: (callback: () => void) => {
    const query = window.matchMedia("(pointer: coarse)");
    query.addEventListener("change", callback);
    return () => query.removeEventListener("change", callback);
  },
  get: () => window.matchMedia("(pointer: coarse)").matches,
  getServer: () => false,
};

/*
  The command line at the bottom of the screen: input with history, the session
  log, and the status readout. Commands are interpreted by lib/commands.ts; this
  component carries out the effects it returns (navigation, settings, boot…).
*/
const StatusBar = ({ posts, cartridges }: StatusBarProps) => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const [log, setLog] = useState<LogLine[]>([]);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [bootRun, setBootRun] = useState<number | null>(null);
  const isTouch = useSyncExternalStore(
    coarsePointer.subscribe,
    coarsePointer.get,
    coarsePointer.getServer,
  );

  const go = useCallback(
    (href: string) => {
      if (href !== pathname) router.push(href, { onTransitionReady: pageAnimation });
    },
    [pathname, router],
  );

  useKeyboardShortcuts(go, inputRef);

  useEffect(() => {
    consoleRef.current?.scrollTo({ top: consoleRef.current.scrollHeight });
  }, [log]);

  const endBoot = useCallback(() => setBootRun(null), []);

  const apply = (effect: CommandEffect) => {
    switch (effect.type) {
      case "navigate":
        return go(effect.href);
      case "openItem":
        if (pathname === effect.page) {
          window.dispatchEvent(new CustomEvent(OPEN_ITEM_EVENT, { detail: effect.id }));
        } else {
          router.push(`${effect.page}?open=${encodeURIComponent(effect.id)}`, {
            onTransitionReady: pageAnimation,
          });
        }
        return;
      case "setPhosphor":
        return setPhosphor(effect.value);
      case "setFx":
        return setFxLevel(effect.value);
      case "setShortcuts":
        return setShortcutsEnabled(effect.enabled);
      case "boot":
        return setBootRun(Date.now());
      case "clear":
        setLog([]);
        setConsoleOpen(false);
        return;
    }
  };

  const run = (raw: string) => {
    const input = raw.trim();
    if (!input) return;
    const result = runCommand(input, {
      pathname,
      posts,
      cartridges,
      shortcutsEnabled: shortcutsEnabled(),
      now: new Date(),
    });
    const isClear = result.effects.some((effect) => effect.type === "clear");
    if (!isClear) {
      setLog((prev) => [
        ...prev,
        { text: `${PROMPT} ${input}`, echo: true },
        ...result.output.map((text) => ({ text })),
      ]);
      setConsoleOpen(true);
    }
    result.effects.forEach(apply);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = inputRef.current?.value ?? "";
    if (value.trim()) {
      setHistory((prev) => [...prev, value]);
      setHistoryIndex(history.length + 1);
    }
    if (inputRef.current) inputRef.current.value = "";
    run(value);
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    if (event.key === "ArrowUp" && history.length) {
      event.preventDefault();
      const next = Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      input.value = history[next];
    } else if (event.key === "ArrowDown" && history.length) {
      event.preventDefault();
      const next = Math.min(history.length, historyIndex + 1);
      setHistoryIndex(next);
      input.value = history[next] ?? "";
    } else if (event.key === "Escape") {
      input.blur();
      setConsoleOpen(false);
    }
  };

  return (
    <>
      <footer className="crt-status">
        {consoleOpen && (
          <div ref={consoleRef} className="crt-console pad">
            <div className="mb-1.5 flex justify-between font-display text-lg tracking-[0.08em] text-phos-dim">
              <span>SESSION LOG</span>
              <button
                type="button"
                className="font-display text-lg text-phos"
                onClick={() => {
                  setConsoleOpen(false);
                  inputRef.current?.focus();
                }}
              >
                [ CLOSE ]
              </button>
            </div>
            <div className="flex flex-col gap-0.5" aria-live="polite">
              {log.map((line, index) => (
                <div key={index} className={line.echo ? "text-phos-dim" : undefined}>
                  {line.text}
                </div>
              ))}
            </div>
          </div>
        )}

        <form className="crt-cmd pad" onSubmit={onSubmit} autoComplete="off">
          <label htmlFor="crt-command" className="whitespace-nowrap">
            C:\<span className="max-xs:hidden">BSKASAN</span>&gt;
          </label>
          <input
            ref={inputRef}
            id="crt-command"
            name="command"
            type="text"
            spellCheck={false}
            autoCapitalize="off"
            placeholder={isTouch ? "type HELP" : "type HELP or press /"}
            aria-label="Command line. Type help for a list of commands."
            onKeyDown={onInputKeyDown}
          />
          <span className="flex gap-[18px] whitespace-nowrap tabular-nums text-phos-dim max-xs:hidden">
            <span className="max-frame:hidden">EXP {PROFILE.experience}</span>
            {PROFILE.openToWork && <span className="max-frame:hidden">OPEN TO WORK</span>}
            <span>
              <Clock /> {PROFILE.city.toUpperCase()}
            </span>
          </span>
        </form>
      </footer>

      {bootRun !== null && (
        <BootSequence key={bootRun} lines={bootScript(cartridges)} onDone={endBoot} />
      )}
    </>
  );
};

export default StatusBar;
