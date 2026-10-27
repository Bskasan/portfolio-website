/*
  The command line's interpreter, kept pure: it takes the typed line and some
  context, and returns the text to print plus a list of effects for the caller
  (components/crt/StatusBar.tsx) to carry out. No React, DOM or router here, so
  every command can be tested on its own.
*/
import type { Cartridge } from "@/lib/cartridges";
import { FxLevel, Phosphor, isFxLevel, isPhosphor } from "@/lib/screenSettings";
import { COPYRIGHT_YEARS, LOCATION_CODE, PROFILE } from "@/constants/profile";

interface CommandContext {
  pathname: string;
  /** Newest first. */
  posts: { slug: string; title: string }[];
  cartridges: Cartridge[];
  shortcutsEnabled: boolean;
  now: Date;
}

export type CommandEffect =
  | { type: "navigate"; href: string }
  /** Open a project window; `page` is where that project lives. */
  | { type: "openItem"; id: string; page: Cartridge["page"] }
  | { type: "setPhosphor"; value: Phosphor }
  | { type: "setFx"; value: FxLevel }
  | { type: "setShortcuts"; enabled: boolean }
  | { type: "boot" }
  | { type: "clear" };

interface CommandResult {
  output: string[];
  effects: CommandEffect[];
}

export const PROMPT = "C:\\BSKASAN>";

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

/** Lines of the boot screen shown by the `boot` command. */
export const bootScript = (cartridges: Cartridge[]) => [
  `RONIN BIOS v2.6  (C) ${COPYRIGHT_YEARS.replace("–", "-")} ${PROFILE.site.toUpperCase()}`,
  `CPU: HUMAN/1 @ ${LOCATION_CODE.replace("/", "-")} ........ OK`,
  "MEMORY TEST: 640K ............. OK",
  `MOUNTING /PROJECTS ............ ${cartridges.filter((c) => c.page === "/projects").length} CARTRIDGES`,
  `MOUNTING /GAMES ............... ${cartridges.filter((c) => c.page === "/games").length} CARTRIDGES`,
  `LOADING PROFILE: ${PROFILE.name.toUpperCase()} .. OK`,
  "STARTING RONIN/OS ...",
];

const say = (...output: string[]): CommandResult => ({ output, effects: [] });
const navigate = (href: string, ...output: string[]): CommandResult => ({
  output,
  effects: [{ type: "navigate", href }],
});

export function runCommand(raw: string, ctx: CommandContext): CommandResult {
  const [command, ...args] = raw.trim().toLowerCase().split(/\s+/);
  const arg = args.join(" ");

  if (command === "help" || command === "?") return say(...HELP);

  if (command === "cd" && PAGES[arg])
    return navigate(PAGES[arg], `OK. Opened ${arg.toUpperCase()}.`);
  if (PAGES[command]) return navigate(PAGES[command], `OK. Opened ${command.toUpperCase()}.`);

  if (command === "ls" || command === "dir") {
    return say(
      ...ctx.cartridges.map((item) => `  ${item.id.padEnd(20)} ${item.name}`),
      `${ctx.cartridges.length} cartridges. Type: open <name>`,
    );
  }

  if (command === "open" || command === "load" || command === "run") {
    const hit =
      ctx.cartridges.find((item) => item.id === arg) ??
      ctx.cartridges.find(
        (item) => item.id.startsWith(arg) || item.name.toLowerCase().includes(arg),
      );
    if (!arg || !hit) return say(`No cartridge named "${arg}". Type LS to see them all.`);
    return {
      output: [`Loading ${hit.name}...`],
      effects: [{ type: "openItem", id: hit.id, page: hit.page }],
    };
  }

  if (command === "read" || command === "cat") {
    const latest = ctx.posts[0];
    if (!latest) return say("No posts yet.");
    return navigate(`/blogs/${latest.slug}`, `Opening: ${latest.title}`);
  }

  if (command === "theme" || command === "phosphor") {
    if (!isPhosphor(arg)) return say("Use: theme green, theme amber or theme white.");
    return {
      output: [`Phosphor set to ${arg.toUpperCase()}.`],
      effects: [{ type: "setPhosphor", value: arg }],
    };
  }

  if (command === "fx") {
    if (!isFxLevel(arg)) return say("Use: fx off, fx subtle or fx full.");
    return {
      output: [`Screen effects set to ${arg.toUpperCase()}.`],
      effects: [{ type: "setFx", value: arg }],
    };
  }

  if (command === "keys" || command === "shortcuts") {
    if (arg === "on" || arg === "off") {
      return {
        output: [
          arg === "on"
            ? "Keyboard shortcuts ON: 1-6 switch pages, / focuses this line."
            : "Keyboard shortcuts OFF. Type KEYS ON to turn them back on.",
        ],
        effects: [{ type: "setShortcuts", enabled: arg === "on" }],
      };
    }
    return say(
      `Keyboard shortcuts are ${ctx.shortcutsEnabled ? "ON" : "OFF"}. Use: keys on or keys off.`,
    );
  }

  if (command === "whoami") {
    return say(
      `guest@${PROFILE.site}`,
      `You are visiting ${PROFILE.name}, full-stack and indie game developer in ${PROFILE.city}, Finland.`,
    );
  }

  if (command === "date" || command === "time") {
    const when = ctx.now.toLocaleString("en-GB", {
      timeZone: "Europe/Helsinki",
      dateStyle: "full",
      timeStyle: "short",
    });
    return say(`${when} (${PROFILE.city})`);
  }

  if (command === "boot" || command === "reboot")
    return { output: [], effects: [{ type: "boot" }] };
  if (command === "clear" || command === "cls") return { output: [], effects: [{ type: "clear" }] };

  if (command === "sudo") return navigate("/contact", "Permission granted. Opening CONTACT.");

  return say(`Command not found: "${command}". Type HELP for a list of commands.`);
}
