# Project: Bekir Kasan — Portfolio & Blog

A minimal, fast, statically-rendered personal portfolio + MDX blog. **Single-package, flat repo at the root** (it is _not_ a monorepo — do not reintroduce a `frontend/` wrapper). A backend may be added later; keep the frontend self-contained until then.

## Tech stack (versions are pinned — respect them)

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first config via `@theme` in `styles/globals.css`) + `@tailwindcss/typography`
- **Framer Motion** + **next-view-transitions** for animation
- **MDX** blog (`@next/mdx`, `gray-matter`, `remark-frontmatter`)
- **react-icons** (icon sets like `lu`, `fi`) · **@next/third-parties** (GA/GTM)
- Hosted on **Vercel**; quality gates via **ESLint + Prettier + Husky + lint-staged**

Before adding a dependency, check whether the stack already covers it. Prefer built-in Next/React features over new packages; justify any new dependency.

## Commands

```bash
npm run dev          # dev server (runs lint + format:check first via predev)
npm run build        # production build (runs lint + format:check first via prebuild)
npm run lint         # eslint
npm run format       # prettier --write .
npm run format:check # prettier --check .   (this is what CI + the hook enforce)
```

- **Pre-commit** hook runs `lint-staged`; **pre-push** hook runs `next build`. Don't bypass with `--no-verify`.
- **CI** (`.github/workflows/ci.yml`) runs at the repo root: `npm ci` → lint → `prettier --check .` → build. Keep all four green.
- Paths are couplings: if you touch the layout, keep `ci.yml`, the `.husky/*` hooks, and `package.json` scripts consistent so nothing runs from a stale directory.

## Where things go

| Folder               | Contents                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| `app/`               | Routes (App Router). Each route is a folder with `page.tsx`; `layout.tsx` is the root shell.      |
| `components/`        | Reusable UI, grouped by kind: `animated/`, `elements/`, `icons/`, `modals/`, `navbar/`, `pages/`. |
| `constants/`         | Static data as typed `SCREAMING_SNAKE_CASE` exports (`NAV_LINKS`, `PROJECTS`, `STATUS_STYLES`).   |
| `content/`           | Blog posts as `.mdx` files (filename = slug).                                                     |
| `hooks/`             | Custom React hooks (`useXxx`).                                                                    |
| `lib/`               | Non-UI logic: helpers (`blogs.ts`), `lib/animations/`, and all shared types under `lib/types/`.   |
| `public/images/`     | Static assets referenced by `next/image`.                                                         |
| `styles/globals.css` | Global styles + Tailwind theme tokens.                                                            |
| `docs/`              | Personal notes (git-ignored) — not shipped, not imported.                                         |

Use the `@/*` path alias (maps to repo root) for cross-folder imports, e.g. `@/components/...`, `@/lib/...`. Use relative imports only for close siblings.

## Naming conventions (match the existing code)

- **Components:** PascalCase file and export (`NavBar.tsx`, `ProjectModal.tsx`). Name page components descriptively — `HomePage`, `AboutMePage`, `BlogContentPage` — not `Page`.
- **Hooks:** camelCase `useXxx`.
- **Constants:** `SCREAMING_SNAKE_CASE`; suffix single links with `_LINK`.
- **Types:** PascalCase in `lib/types/*.ts`. Use `interface XxxProps` for component props; `type` for data models.

## Component conventions

- **Default to Server Components.** Add `"use client"` **only** when you need state, effects, refs, browser APIs, or Framer Motion — and add a short comment saying why (as in `ProjectModal.tsx`). Every `"use client"` ships JS to the browser; keep client components small and push them to the leaves.
- Prefer the dominant style: `const X = (props) => { ... }` with `export default X` at the bottom. Type props with an `interface XxxProps` declared directly above.
- Icons are inline SVG components that accept `SVGProps<SVGSVGElement>`, spread `{...props}`, and set `aria-hidden="true"` when decorative.
- Don't redefine shared shapes inline or shadow a component name with a local `interface` (there's an existing `SkillTag` collision in `app/about/page.tsx` — don't copy that). Import the type from `lib/types`.

## Data, rendering & Next 16 specifics

- Dynamic route params are async: type as `params: Promise<{ id: string }>` and `await params`.
- Static-generate everything possible: use `generateStaticParams` + `dynamicParams = false` (see the blog routes). This is a static site — prefer build-time work over runtime.
- Filesystem/content access (`fs`, `path`, `process.cwd()`, `gray-matter`) lives in `lib/` and runs in Server Components only — never in a `"use client"` file.
- Be defensive with external/parsed data: nullish-coalescing defaults (`fm.title ?? "Untitled"`), optional chaining, and fallback lookups (`STATUS_STYLES[key] ?? "…"`).
- Static data (projects, nav, skills) lives in `constants/`, typed against `lib/types`. When mock data is later swapped for an API, keep the same types so components don't change.

## Styling

- **Tailwind utility-first**, inline in `className`. Use template-literal class strings for conditional/active states (see `NavLink.tsx`).
- **Mobile-first and responsive is a hard requirement** — the site must look clean and professional on mobile, iPad, and desktop. Layer `sm:` / `md:` / `lg:` up from the base; verify narrow widths.
- **Light-only for now.** The UI uses the light palette (`white` / `gray` / `slate` / `zinc` / `neutral`) with the Roboto Mono monospace font. The `prefers-color-scheme: dark` tokens in `globals.css` are currently dormant and **not** wired up — don't assume dark mode works; either fully implement it or leave the light palette consistent. _(Revisit if dark mode becomes a goal.)_
- Tailwind v4 theme tokens go in the `@theme` block in `globals.css`; register plugins with `@plugin`. Reach for component-scoped CSS (e.g. `ProjectModal.css`) only for things utilities can't express (e.g. `::backdrop`, view-transition pseudo-elements).

## Accessibility (keep the bar the code already sets)

- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, native `<dialog>`, `<button type="button">`, `<ul>/<li>`.
- Every interactive/ambiguous element gets a label: `aria-label`, `aria-labelledby`, `aria-describedby`; decorative elements get `aria-hidden`.
- **All** external links: `target="_blank"` **and** `rel="noopener noreferrer"`.
- Provide `:focus-visible` styles on interactive elements; one `<h1>` per page with sensible heading order.
- Escape apostrophes/quotes in JSX text with `&apos;` / `&quot;` to satisfy `react/no-unescaped-entities`.

## Content / MDX blog

- A post is a single `.mdx` file in `content/`; the filename is the slug. Frontmatter (title, date, readTime, excerpt, intro, tags, author) is parsed by `gray-matter` and typed by `BlogPostFrontmatter`.
- Add fields to the type in `lib/types/posts.ts` before using them; provide safe defaults in `lib/blogs.ts`.
- Posts sort newest-first by `date`. Keep the empty-state UI (`No posts yet`) working.

## Performance & optimization

- Favor Server Components and static generation to ship minimal client JS.
- Always use `next/image` with explicit `width`/`height` and descriptive `alt`; pick `loading` deliberately (`eager` only above the fold).
- Lazy-load heavy client-only widgets with `next/dynamic` when they aren't needed for first paint.
- Clean up side effects: disconnect observers / remove listeners in `useEffect` cleanups (see `useScrollReveal` and `ProjectModal`). Animate-once patterns should disconnect after firing.
- Don't reach for `useMemo`/`useCallback`/`memo` reflexively — add them only for a measured cost.

## TypeScript & quality

- `strict` is on. **No `any`** — model real types in `lib/types`. No unused vars/imports (ESLint will fail the build).
- Prettier is the formatter (`semi: true`, `printWidth: 100`, `tabWidth: 2`) — never hand-format against it; run `npm run format`.
- Comments explain **why**, not what (the modal backdrop rationale, scroll-lock, "animate once" are good examples). Use `{/* Section */}` markers to structure long JSX. Leave a `TODO:` for deferred work.
- Keep components focused; extract repeated markup into `components/elements/`. Follow the existing "refactor toward small, reusable pieces" direction noted in `docs/`.

## Testing (planned — not yet set up)

Recommended stack when introduced: **Vitest + React Testing Library** for unit/component tests and **Playwright** for a few E2E flows. What matters more than the tool is _what_ to test (per `docs/tests-checklist.md`):

- **Test what computes or decides:** date formatting, sort/filter order, derived values, conditional (`&&`/ternary) branches, correct link URLs/slugs, list counts, empty states, and graceful handling of missing optional fields.
- **Skip** static markup, Tailwind classes, colors, and decorative elements; verify layout/animation by eye or E2E, not unit tests.
- Query by role (`getByRole`) to enforce accessibility for free.

## Git

- Work on a feature branch off `dev`; open PRs into `main`. Only commit/push when asked.
- Keep commits focused; make sure lint + `prettier --check .` + `build` pass locally first (the hooks enforce this).
- Note: `core.autocrlf=true` with no `.gitattributes`, so git may report CRLF↔LF normalization on some files — that's expected, not a real change.

## Quick don'ts

- ❌ Reintroduce a `frontend/` folder or assume a monorepo.
- ❌ Add `"use client"` when a Server Component would do.
- ❌ Rely on training-data Next.js APIs without checking `node_modules/next/dist/docs/`.
- ❌ Hardcode data in components — put it in `constants/`, typed via `lib/types`.
- ❌ Ship an external link without `rel="noopener noreferrer"`, or an image without `alt` + dimensions.
- ❌ Bypass the hooks/CI or hand-format against Prettier.
