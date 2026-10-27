import { ExperienceEntry } from "@/lib/types/experience";
import { EMPLOYERS, companyLink } from "@/constants/employers";
import {
  CLARUSWAY,
  ESPOO_GAME_LAB,
  INTEGRIFY_OY,
  NORTHFINA_SKILLS,
  RAIS_GAMES,
} from "@/constants/skills";

// The About page's experience register. Employer names, links and periods come from
// constants/employers.ts (shared with the CV); the summaries here are About-only.
export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "A",
    period: EMPLOYERS.northfina.period,
    role: "Full-Stack Developer",
    organizations: [companyLink(EMPLOYERS.northfina), companyLink(EMPLOYERS.etufillari)],
    where: "Espoo",
    description:
      "Designed and developed full-stack applications using Next.js and TypeScript, with serverless backends powered by Azure Functions. Built scalable internal tools and platforms for internal users to improve their efficiency across teams. Worked closely with cross-functional teams, including developers, designers, and product managers, to implement features with best practises.",
    skills: NORTHFINA_SKILLS,
  },
  {
    id: "B",
    period: EMPLOYERS.espooGameLab.period,
    role: "Software Developer (Game programming)",
    organizations: [companyLink(EMPLOYERS.espooGameLab)],
    where: "Espoo",
    description:
      "As an Espoo Game LAB program participant, my primary responsibility is game programming. I used Unity and C# to bring our projects to life.",
    skills: ESPOO_GAME_LAB,
  },
  {
    id: "C",
    period: EMPLOYERS.integrify.period,
    role: "Full-stack Developer Trainee",
    organizations: [companyLink(EMPLOYERS.integrify)],
    where: "Remote",
    description:
      "Joined and was accepted into Integrify Oy's comprehensive full stack training program, where I'll be honing my skills in frontend, backend, DevOps, and Cloud technologies.",
    skills: INTEGRIFY_OY,
  },
  {
    id: "D",
    period: EMPLOYERS.clarusway.period,
    role: "Full-stack Developer Trainee",
    organizations: [companyLink(EMPLOYERS.clarusway)],
    where: "Remote",
    description:
      "Collaborated within a team to successfully design and develop 15+ web projects, ranging from small-scale applications to complex systems. Notably, contributed to two significant projects: Stock app and Fireblog app.",
    skills: CLARUSWAY,
  },
  {
    id: "E",
    period: EMPLOYERS.raisGames.period,
    role: "Junior Game Developer",
    organizations: [companyLink(EMPLOYERS.raisGames)],
    where: "Remote",
    description:
      "Designed and developed 10+ games with many prototypes for IOS and Android platforms. Collaborated with game designers and artists.",
    skills: RAIS_GAMES,
  },
];
