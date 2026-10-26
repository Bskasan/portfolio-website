import { ExperienceEntry } from "@/lib/types/experience";
import {
  CLARUSWAY_LINK,
  ESPOO_GAME_LAB_LINK,
  ETUFILLARI_LINK,
  INTEGRIFY_LINK,
  NORTHFINA_LINK,
  RAIS_GAMES_LINK,
} from "@/constants/links";
import {
  CLARUSWAY,
  ESPOO_GAME_LAB,
  INTEGRIFY_OY,
  NORTHFINA_SKILLS,
  RAIS_GAMES,
} from "@/constants/skills";

// The About page's experience register (previously hand-written in app/about/page.tsx).
export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "A",
    period: "Sep 2024 – Feb 2026",
    role: "Full-Stack Developer",
    organizations: [
      { name: "NorthFina Oy", url: NORTHFINA_LINK.source },
      { name: "Etufillari Oy", url: ETUFILLARI_LINK.source },
    ],
    where: "Espoo",
    description:
      "Designed and developed full-stack applications using Next.js and TypeScript, with serverless backends powered by Azure Functions. Built scalable internal tools and platforms for internal users to improve their efficiency across teams. Worked closely with cross-functional teams, including developers, designers, and product managers, to implement features with best practises.",
    skills: NORTHFINA_SKILLS,
  },
  {
    id: "B",
    period: "Mar 2023 – Sep 2024",
    role: "Software Developer (Game programming)",
    organizations: [{ name: "Espoo Game LAB", url: ESPOO_GAME_LAB_LINK.source }],
    where: "Espoo",
    description:
      "As an Espoo Game LAB program participant, my primary responsibility is game programming. I used Unity and C# to bring our projects to life.",
    skills: ESPOO_GAME_LAB,
  },
  {
    id: "C",
    period: "Mar 2023 – Sep 2024",
    role: "Full-stack Developer Trainee",
    organizations: [{ name: "Integrify Oy", url: INTEGRIFY_LINK.source }],
    where: "Remote",
    description:
      "Joined and was accepted into Integrify Oy's comprehensive full stack training program, where I'll be honing my skills in frontend, backend, DevOps, and Cloud technologies.",
    skills: INTEGRIFY_OY,
  },
  {
    id: "D",
    period: "Mar 2023 – Sep 2024",
    role: "Full-stack Developer Trainee",
    organizations: [{ name: "Clarusway", url: CLARUSWAY_LINK.source }],
    where: "Remote",
    description:
      "Collaborated within a team to successfully design and develop 15+ web projects, ranging from small-scale applications to complex systems. Notably, contributed to two significant projects: Stock app and Fireblog app.",
    skills: CLARUSWAY,
  },
  {
    id: "E",
    period: "Mar 2021 – Feb 2022",
    role: "Junior Game Developer",
    organizations: [{ name: "Rais Games Ltd.", url: RAIS_GAMES_LINK.source }],
    where: "Remote",
    description:
      "Designed and developed 10+ games with many prototypes for IOS and Android platforms. Collaborated with game designers and artists.",
    skills: RAIS_GAMES,
  },
];
