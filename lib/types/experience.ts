import { CVLink } from "./cv";

export type ExperienceEntry = {
  /** Register letter shown in the first column (A, B, C…). */
  id: string;
  period: string;
  role: string;
  /** One or more organisations, e.g. NorthFina Oy (Etufillari Oy). */
  organizations: CVLink[];
  /** "Espoo", "Remote"… */
  where: string;
  description: string;
  skills: { name: string }[];
};
