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

import { pageAnimation } from "@/lib/animations/pageAnimation";
import { isFxLevel, isPhosphor, setFxLevel, setPhosphor } from "@/lib/screenSettings";
import { setShortcutsEnabled, shortcutsEnabled } from "@/lib/keyboardShortcuts";
import { OPEN_ITEM_EVENT } from "@/lib/commandEvents";
import { NAV_LINKS } from "@/constants/navbar";
import type { Cartridge } from "@/lib/cartridges";
import { COPYRIGHT_YEARS, LOCATION_CODE, PROFILE } from "@/constants/profile";

interface StatusBarPost {
  slug: string;
  title: string;
}

interface StatusBarProps {
  posts: StatusBarPost[];
  /** Projects and games the `open` / `ls` commands know about (built on the server). */
  cartridges: Cartridge[];
}

type LogLine = { text: string; echo?: boolean };

const PAGES: Record<string, string> = {
  home: "/",
  about: "/about",
  projects: "/projects",
  games: "/games",
  blog: "/blogs",
  blogs: "/blogs",
  contact: "/contact",
  cv: "/cv",
  resume: "/cv",
};

const HELP = [
  "AVAILABLE COMMANDS",
  "  home | about | projects | games | blog | contact | cv   open a page",
  "  open <name>        load a project or game (try: open ronin)",
  "  ls                 list projects and games",
  "  read               open the latest blog post",
  "  theme green|amber|white   change phosphor colour",
  "  fx off|subtle|full         change screen effects",
  "  keys on|off        turn the single-key shortcuts on or off",
  "  whoami | date | boot | clear",
  "SHORTCUTS: 1-6 switch pages · / focuses this line · ESC closes windows (KEYS OFF disables 1-6 and /)",
];

const bootScript = (cartridges: Cartridge[]) => [
  `RONIN BIOS v2.6  (C) ${COPYRIGHT_YEARS.replace("–", "-")} ${PROFILE.site.toUpperCase()}`,
  `CPU: HUMAN/1 @ ${LOCATION_CODE.replace("/", "-")} ........ OK`,
  "MEMORY TEST: 640K ............. OK",
  `MOUNTING /PROJECTS ............ ${cartridges.filter((c) => c.page === "/projects").length} CARTRIDGES`,
  `MOUNTING /GAMES ............... ${cartridges.filter((c) => c.page === "/games").length} CARTRIDGES`,
  `LOADING PROFILE: ${PROFILE.name.toUpperCase()} .. OK`,
  "STARTING RONIN/OS ...",
];

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

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

/*
  The command line at the bottom of the screen, plus the global keyboard
  shortcuts (1–6 switch pages, "/" focuses the command line) and the clock.
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
  const [clock, setClock] = useState("--:--");
  const isTouch = useSyncExternalStore(
    coarsePointer.subscribe,
    coarsePointer.get,
    coarsePointer.getServer,
  );
  const [bootLines, setBootLines] = useState<string[] | null>(null);
  const [bootEnding, setBootEnding] = useState(false);

  const go = useCallback(
    (href: string) => {
      if (href !== pathname) router.push(href, { onTransitionReady: pageAnimation });
    },
    [pathname, router],
  );

  /* clock (Espoo time), rendered after mount to avoid a hydration mismatch */
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Europe/Helsinki",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 15000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  /* keyboard shortcuts */
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
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
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go]);

  useEffect(() => {
    consoleRef.current?.scrollTo({ top: consoleRef.current.scrollHeight });
  }, [log]);

  /* boot sequence (only via the `boot` command) */
  useEffect(() => {
    if (!bootLines) return;
    const script = bootScript(cartridges);
    if (bootLines.length < script.length) {
      const id = window.setTimeout(() => setBootLines(script.slice(0, bootLines.length + 1)), 190);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setBootEnding(true), 400);
    return () => window.clearTimeout(id);
  }, [bootLines, cartridges]);

  useEffect(() => {
    if (!bootEnding) return;
    const id = window.setTimeout(() => {
      setBootLines(null);
      setBootEnding(false);
    }, 360);
    return () => window.clearTimeout(id);
  }, [bootEnding]);

  useEffect(() => {
    if (!bootLines) return;
    const skip = () => setBootEnding(true);
    window.addEventListener("keydown", skip, { capture: true, once: true });
    return () => window.removeEventListener("keydown", skip, { capture: true });
  }, [bootLines]);

  const print = (...lines: LogLine[]) => {
    setLog((prev) => [...prev, ...lines]);
    setConsoleOpen(true);
  };
  const out = (...texts: string[]) => print(...texts.map((text) => ({ text })));

  const run = (raw: string) => {
    const input = raw.trim();
    if (!input) return;
    print({ text: `C:\\BSKASAN> ${input}`, echo: true });

    const [command, ...args] = input.toLowerCase().split(/\s+/);
    const arg = args.join(" ");

    if (command === "help" || command === "?") return out(...HELP);
    if (command === "cd" && PAGES[arg]) {
      go(PAGES[arg]);
      return out(`OK. Opened ${arg.toUpperCase()}.`);
    }
    if (PAGES[command]) {
      go(PAGES[command]);
      return out(`OK. Opened ${command.toUpperCase()}.`);
    }
    if (command === "ls" || command === "dir") {
      return out(
        ...cartridges.map((item) => `  ${item.id.padEnd(20)} ${item.name}`),
        `${cartridges.length} cartridges. Type: open <name>`,
      );
    }
    if (command === "open" || command === "load" || command === "run") {
      const hit =
        cartridges.find((item) => item.id === arg) ??
        cartridges.find((item) => item.id.startsWith(arg) || item.name.toLowerCase().includes(arg));
      if (!arg || !hit) return out(`No cartridge named "${arg}". Type LS to see them all.`);
      if (pathname === hit.page) {
        window.dispatchEvent(new CustomEvent(OPEN_ITEM_EVENT, { detail: hit.id }));
      } else {
        router.push(`${hit.page}?open=${encodeURIComponent(hit.id)}`, {
          onTransitionReady: pageAnimation,
        });
      }
      return out(`Loading ${hit.name}...`);
    }
    if (command === "read" || command === "cat") {
      const latest = posts[0];
      if (!latest) return out("No posts yet.");
      go(`/blogs/${latest.slug}`);
      return out(`Opening: ${latest.title}`);
    }
    if (command === "theme" || command === "phosphor") {
      if (!isPhosphor(arg)) return out("Use: theme green, theme amber or theme white.");
      setPhosphor(arg);
      return out(`Phosphor set to ${arg.toUpperCase()}.`);
    }
    if (command === "fx") {
      if (!isFxLevel(arg)) return out("Use: fx off, fx subtle or fx full.");
      setFxLevel(arg);
      return out(`Screen effects set to ${arg.toUpperCase()}.`);
    }
    if (command === "whoami") {
      return out(
        `guest@${PROFILE.site}`,
        `You are visiting ${PROFILE.name}, full-stack and indie game developer in ${PROFILE.city}, Finland.`,
      );
    }
    if (command === "date" || command === "time") {
      return out(
        `${new Date().toLocaleString("en-GB", {
          timeZone: "Europe/Helsinki",
          dateStyle: "full",
          timeStyle: "short",
        })} (${PROFILE.city})`,
      );
    }
    if (command === "boot" || command === "reboot") {
      setBootEnding(false);
      setBootLines([]);
      return;
    }
    if (command === "clear" || command === "cls") {
      setLog([]);
      setConsoleOpen(false);
      return;
    }
    if (command === "keys" || command === "shortcuts") {
      if (arg === "on" || arg === "off") {
        setShortcutsEnabled(arg === "on");
        return out(
          arg === "on"
            ? "Keyboard shortcuts ON: 1-6 switch pages, / focuses this line."
            : "Keyboard shortcuts OFF. Type KEYS ON to turn them back on.",
        );
      }
      return out(
        `Keyboard shortcuts are ${shortcutsEnabled() ? "ON" : "OFF"}. Use: keys on or keys off.`,
      );
    }
    if (command === "sudo") {
      go("/contact");
      return out("Permission granted. Opening CONTACT.");
    }
    out(`Command not found: "${command}". Type HELP for a list of commands.`);
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
              {clock} {PROFILE.city.toUpperCase()}
            </span>
          </span>
        </form>
      </footer>

      {bootLines && (
        <div
          className={`crt-boot ${bootEnding ? "is-out" : ""}`}
          aria-hidden="true"
          onClick={() => setBootEnding(true)}
        >
          {bootLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
          <span className="mt-auto text-phos-dim">PRESS ANY KEY OR CLICK TO SKIP</span>
        </div>
      )}
    </>
  );
};

export default StatusBar;
