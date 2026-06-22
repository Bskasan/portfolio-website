import { ProjectMetaData } from "@/lib/types/project";

// TODO: Fetch real projects from your CMS or API
// Example: const projects = await fetchAllProjects()
export const MOCK_PROJECTS: ProjectMetaData[] = [
  {
    id: "mindbase",
    name: "MindBase",
    description:
      "Personal content management app that helps you save, organize, and schedule the articles, podcasts, and other resources you want to consume later. Built for the kind of people who bookmark everything and read nothing — until now.",
    thumbnail: "/images/mind-base-thumbnail.png", // TODO: Replace with a real screenshot
    liveUrl: "https://mindbase-ten.vercel.app/",
    githubUrl: null, // TODO: Add GitHub repo URL when ready
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
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
    thumbnail: "/images/ronindev-logo.png", // TODO: Add a real screenshot of your portfolio
    liveUrl: "/", // TODO: Replace with your actual portfolio URL when deployed
    githubUrl: null, // TODO: Add GitHub repo URL when ready
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
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
    thumbnail: "/images/pomodoro-icon-new.png",
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
