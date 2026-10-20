import { ProjectMetaData } from "@/lib/types/project";

export const PROJECTS: ProjectMetaData[] = [
  {
    id: "ronin-text-editor",
    name: "ronin",
    description:
      "A small, fast, Emacs-style code editor for Windows, written in C with no dependencies. Built around three goals in a fixed order: input latency first, a small and simple program second, features third. A keystroke and its frame take about 20 microseconds, and the whole editor is a single executable under half a megabyte. It has projects, a fuzzy file finder, background search, build with jump-to-error, a git changes view, multiple cursors and themes.",
    thumbnail: "/images/projects/ronin-text-editor-thumbnail.png",
    logo: "/images/projects/ronin-text-editor-logo.png",
    liveUrl: "https://bskasan.github.io/ronin-text-editor/",
    githubUrl: "https://github.com/Bskasan/ronin-text-editor",
    techStack: [
      "C",
      "Win32 API",
      "Direct3D 11",
      "DirectWrite",
      "HLSL",
      "Github Actions(CI)",
      "Github Pages",
    ],
    year: "2026",
    status: {
      key: "notready",
      value: "In Progress",
    },
  },
  {
    id: "dymostride",
    name: "DymoStride",
    description:
      "DymoStride is an open-source, full-stack habit tracker and personal growth platform built with React, Fastify, Prisma, and AWS in a TypeScript monorepo. Serving as the successor to Mindbase, it pivots from knowledge management to active habit building by featuring a GitHub-style contribution grid, social feeds, and an AI-powered coach. Beyond helping users achieve consistency, DymoStride is built as a collaborative open-source ecosystem, specifically designed to provide developers of all skill levels with a welcoming environment to gain hands-on, real-world experience in a production-grade codebase.",
    thumbnail: "/images/projects/dymostride-thumbnail.png",
    liveUrl: "https://www.dymostride.com/",
    githubUrl: "https://github.com/DymoStride/dymostride-monorepo",
    techStack: [
      "React",
      "Fastify",
      "Prisma",
      "AWS",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Docker",
      "Supabase",
      "Vitest",
    ],
    year: "2026",
    status: {
      key: "notready",
      value: "In Progress",
    },
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description:
      "The very site you're on. A minimal, fast personal portfolio built to showcase projects and writing without getting in the way. Designed with intention — clean typography, subtle structure, zero clutter.",
    thumbnail: "/images/projects/ronindev-logo.png",
    liveUrl: "https://www.bskasan.dev/",
    githubUrl: "https://github.com/Bskasan/portfolio-website",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Github Actions(CI)", "Husky"],
    year: "2026",
    status: {
      key: "archived",
      value: "Done",
    },
  },
  {
    id: "pomodoro-obs-layer",
    name: "Pomodoro OBS Layer For Streamers",
    description:
      "A sleek, lightweight Pomodoro timer designed as an OBS Browser Source overlay for Twitch/YouTube streamers. Features a modern design, persistent state, and easy customization via URL parameters.",
    thumbnail: "/images/projects/pomodoro-icon-new.png",
    liveUrl: "https://bskasan.github.io/pomodoro-obs-overlay/",
    githubUrl: "https://github.com/Bskasan/pomodoro-obs-overlay",
    techStack: ["JavaScript", "HTML5/CSS", "Github Pages"],
    year: "2026",
    status: {
      key: "archived",
      value: "Done",
    },
  },
];
