import { ProjectMetaData } from "@/lib/types/project";

export const PROJECTS: ProjectMetaData[] = [
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
