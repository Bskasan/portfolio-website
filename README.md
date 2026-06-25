# Bekir Kasan — Portfolio & Personal Blog

The frontend for my personal portfolio and blog. A minimal, fast, statically-rendered site that showcases my work, experience, and writing — built with clean typography and zero clutter.

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

| Area      | Tools                                                                                                                       |
| --------- | --------------------------------------------------------------------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router)                                                                               |
| Language  | [TypeScript](https://www.typescriptlang.org/)                                                                               |
| UI        | [React 19](https://react.dev/)                                                                                              |
| Styling   | [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/typography`                                                     |
| Animation | [Framer Motion](https://www.framer.com/motion/) + [next-view-transitions](https://github.com/shuding/next-view-transitions) |
| Content   | [MDX](https://mdxjs.com/) (`@next/mdx`, `gray-matter`, `remark-frontmatter`)                                                |
| Icons     | [react-icons](https://react-icons.github.io/react-icons/)                                                                   |
| Analytics | Google Analytics / Tag Manager via `@next/third-parties`                                                                    |
| Font      | Roboto Mono (`next/font`)                                                                                                   |
| Quality   | ESLint, Prettier, Husky + lint-staged (pre-commit hooks)                                                                    |
| Hosting   | Vercel                                                                                                                      |

## Key Features

- **App Router architecture** — every route lives under `app/` as a server component by default.
- **MDX-powered blog** — posts are plain `.mdx` files in `content/`. Frontmatter (title, date, tags, author, read time, excerpt) is parsed with `gray-matter`, and each post is pre-rendered as static HTML at build time via `generateStaticParams`.
- **Project gallery** — a responsive grid of project thumbnails that open detail modals with description, tech stack, status, and live/GitHub links.
- **Smooth navigation** — page transitions and scroll-reveal animations powered by Framer Motion and the View Transitions API.
- **Responsive by design** — laid out to look clean and professional across mobile, iPad, and desktop.
- **Strict quality gates** — linting and format checks run automatically before `dev`, `build`, and on every commit.

## Project Structure

```
frontend/
├── app/                  # App Router routes
│   ├── page.tsx          # Home
│   ├── about/            # About + experience timeline
│   ├── projects/         # Project gallery + modals
│   ├── blogs/            # Blog index
│   │   └── [id]/         # Individual MDX post pages
│   ├── contact/          # Contact / hire / sponsor
│   ├── games/            # (WIP, hidden from nav)
│   └── layout.tsx        # Root layout, fonts, analytics, navbar
├── components/           # Reusable UI (navbar, modals, elements, animations)
├── constants/            # Static data: nav links, skills, projects, socials
├── content/              # Blog posts as .mdx files
├── lib/                  # Helpers (blog loading) and shared types
├── public/images/        # Static images and thumbnails
├── styles/globals.css    # Global styles + Tailwind
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

Add an entry to `MOCK_PROJECTS` in [`constants/projects.ts`](constants/projects.ts) with a name, description, thumbnail, tech stack, status, and optional live/GitHub URLs.

## Connect

- **Website** — [www.bskasan.dev](https://www.bskasan.dev)
- **GitHub** — [@Bskasan](https://github.com/Bskasan)
- **LinkedIn** — [bekirskasan](https://www.linkedin.com/in/bekirskasan/)
- **X** — [@BekirKasan1](https://x.com/BekirKasan1)
- **Twitch** — [ronindevvv](https://www.twitch.tv/ronindevvv)

---

Built and maintained by **Bekir Kasan** — Full-Stack & Game Developer based in Espoo, Finland.
