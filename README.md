# Bekir Kasan — Portfolio & Personal Blog

The frontend for my personal portfolio and blog. A fast, statically-rendered site that showcases my work, experience, and writing, presented as **Phosphor OS**: a retro CRT terminal with scanlines, a phosphor glow and a working command line.

🌐 **Live:** [www.bskasan.dev](https://www.bskasan.dev)

---

## About

This is the web frontend of my personal site. It serves as a home for:

- **About** — my background, experience, and tech stack.
- **Projects** — things I've built, shown as a gallery with detail modals (live + GitHub links).
- **Blog** — long-form writing on full-stack engineering and game development, authored in MDX.
- **Contact** — ways to get in touch, hire me, or sponsor my open-source work.

It's designed to load fast, look clean on mobile, tablet, and desktop, and stay easy to extend as I add new projects and posts.

## Tech Stack

| Area      | Tools                                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router)                                                                                   |
| Language  | [TypeScript](https://www.typescriptlang.org/)                                                                                   |
| UI        | [React 19](https://react.dev/)                                                                                                  |
| Styling   | [Tailwind CSS v4](https://tailwindcss.com/) + CRT styles in `styles/crt/` (frame, components, pages)                            |
| Theming   | Phosphor colour + screen-effect settings via a custom `useScreenSettings` hook (`useSyncExternalStore`) — no extra dependencies |
| Animation | [Framer Motion](https://www.framer.com/motion/) + [next-view-transitions](https://github.com/shuding/next-view-transitions)     |
| Content   | [MDX](https://mdxjs.com/) (`@next/mdx`, `gray-matter`, `remark-frontmatter`)                                                    |
| Analytics | Google Analytics / Tag Manager via `@next/third-parties`                                                                        |
| Fonts     | VT323 + IBM Plex Mono, self-hosted (`next/font/local`)                                                                          |
| Quality   | ESLint, Prettier, Husky + lint-staged (pre-commit hooks)                                                                        |
| Hosting   | Vercel                                                                                                                          |

## Key Features

- **App Router architecture** — every route lives under `app/` as a server component by default.
- **MDX-powered blog** — posts are plain `.mdx` files in `content/`. Frontmatter (title, date, tags, author, read time, excerpt) is parsed with `gray-matter`, and each post is pre-rendered as static HTML at build time via `generateStaticParams`.
- **Project gallery** — a responsive grid of project thumbnails that open detail modals with description, tech stack, status, and live/GitHub links.
- **Smooth navigation** — page transitions and scroll-reveal animations powered by Framer Motion and the View Transitions API.
- **Screen settings** — a PHOSPHOR (green / amber / white) and FX (off / subtle / full) control in the top-right of the screen (inside the menu on phones), with no-flash initialization, `localStorage` persistence and cross-tab sync — built with a small custom hook, no extra dependencies.
- **Command line** — type `help` at the bottom of the screen: open pages, `open <project>`, `theme amber`, `fx off`, `read`… Keys `1`–`6` switch pages and `/` focuses the command line; `keys off` turns these single-key shortcuts off (saved per browser).
- **Responsive by design** — on desktop and tablet the site sits inside a CRT monitor; on phones the bezel drops away and the screen runs edge to edge, with a MENU dropdown that holds the links and the screen settings.
- **Accessible effects** — effects can be turned off, `prefers-reduced-motion` disables flicker and animations, and long blog posts switch to a calmer reading mode.
- **Strict quality gates** — linting and format checks run automatically before `dev`, `build`, and on every commit.

## Project Structure

```
.
├── app/                  # App Router routes
│   ├── page.tsx          # Home
│   ├── about/            # About + experience timeline
│   ├── projects/         # Project gallery + modals
│   ├── blogs/            # Blog index
│   │   └── [id]/         # Individual MDX post pages
│   ├── contact/          # Contact / hire / sponsor
│   ├── games/            # (WIP, hidden from nav)
│   └── layout.tsx        # Root layout, fonts, analytics, navbar, theme init
├── components/           # Reusable UI (navbar + mobile menu + theme toggle, modals, elements, animations)
├── constants/            # Static data: nav links, skills, projects, socials
├── content/              # Blog posts as .mdx files
├── hooks/                # Custom React hooks (useTheme, useScrollReveal)
├── lib/                  # Helpers (blog loading) and shared types
├── public/images/        # Static images and thumbnails
├── styles/globals.css    # Global styles, theme tokens + Tailwind
└── mdx-components.tsx     # MDX component overrides
```

The `@/*` path alias maps to the project root (e.g. `@/components/...`), configured in `tsconfig.json`.

## Getting Started

> Requires **Node.js 20+** (developed on Node 24).

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Script                 | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Start the dev server (runs lint + format check first) |
| `npm run build`        | Production build (runs lint + format check first)     |
| `npm run start`        | Serve the production build                            |
| `npm run lint`         | Run ESLint                                            |
| `npm run format`       | Format all files with Prettier                        |
| `npm run format:check` | Check formatting without writing                      |

## Adding a Blog Post

1. Create a new `.mdx` file in `content/`, e.g. `content/my-new-post.mdx`.
2. Add frontmatter at the top:

   ```mdx
   ---
   title: My New Post
   date: 2026-06-25
   readTime: 5 min read
   excerpt: A short summary shown on the blog index.
   intro: A longer lead-in displayed at the top of the post.
   tags:
     - key: webdev
       name: Web Development
   author:
     name: Bekir Kasan
     role: Software Developer
   ---

   Your content here...
   ```

3. The post is automatically picked up, listed on `/blogs`, and rendered at `/blogs/my-new-post`.

## Adding a Project

Add an entry to `PROJECTS` in [`constants/projects.ts`](constants/projects.ts) with a name, description, thumbnail, tech stack, status, and optional live/GitHub URLs. An optional `logo` replaces the thumbnail on the Projects page card only; the project modal keeps showing the thumbnail.

## Theming (Phosphor OS)

The screen has two visitor settings, stored as data attributes on `<html>`:

| Attribute   | Values                              | What it changes                                      |
| ----------- | ----------------------------------- | ---------------------------------------------------- |
| `data-phos` | `green` (default), `amber`, `white` | The phosphor colour the whole screen glows in        |
| `data-fx`   | `off`, `subtle` (default), `full`   | Scanline strength, glow, flicker and the rolling bar |

- A tiny inline script in the root layout applies the saved settings **before first paint**, so there's no flash of the default screen. Visitors who had chosen the old light theme start on the white phosphor.
- [`hooks/useScreenSettings.ts`](hooks/useScreenSettings.ts) reads the settings via `useSyncExternalStore`, persists changes to `localStorage` and syncs them across tabs. The shared constants and setters live in [`lib/screenSettings.ts`](lib/screenSettings.ts) so the server layout and the command line can use them too.
- Colours come from tokens in [`styles/globals.css`](styles/globals.css) — `--phos`, `--phos-dim`, `--phos-faint`, `--glass`, `--glass-2` plus the warm accent `--warm-1..3` (used only for the logo stripes and "in progress" status). They are exposed to Tailwind, so markup uses `text-phos`, `border-phos-faint`, `bg-glass`… and never needs to know which phosphor is active.
- The CRT frame (glass, scanlines, vignette, bezel) is fixed on top of a normally scrolling page; its geometry is in [`styles/crt/frame.css`](styles/crt/frame.css), the shared visual pieces (`.cmdlink`, `.hbar`, `.tint`, `.chip`…) in [`styles/crt/components.css`](styles/crt/components.css) and page-specific styles in [`styles/crt/pages.css`](styles/crt/pages.css). Font sizes come from the type scale and breakpoints from the named breakpoints in `styles/globals.css`.

## Connect

- **Website** — [www.bskasan.dev](https://www.bskasan.dev)
- **GitHub** — [@Bskasan](https://github.com/Bskasan)
- **LinkedIn** — [bekirskasan](https://www.linkedin.com/in/bekirskasan/)
- **X** — [@BekirKasan1](https://x.com/BekirKasan1)
- **Twitch** — [ronindevvv](https://www.twitch.tv/ronindevvv)

---

Built and maintained by **Bekir Kasan** — Full-Stack & Game Developer based in Espoo, Finland.
