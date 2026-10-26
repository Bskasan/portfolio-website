import { CVLink } from "@/lib/types/cv";
import {
  CLARUSWAY_LINK,
  ESPOO_GAME_LAB_LINK,
  ETUFILLARI_LINK,
  INTEGRIFY_LINK,
  NORTHFINA_LINK,
  RAIS_GAMES_LINK,
} from "@/constants/links";

/*
  Single source for the facts about each employer: name, link, period and
  location. The CV (constants/cv.ts) and the About page's experience register
  (constants/experience.ts) both read from here, so dates and names can't drift
  apart again. How each page *describes* the role stays in those files.
*/
export type Employer = CVLink & {
  /** e.g. "Sep 2024 – Feb 2026" */
  period?: string;
  /** e.g. "Espoo, Finland" */
  location?: string;
};

export const EMPLOYERS = {
  northfina: {
    name: "Northfina Oy",
    url: NORTHFINA_LINK.source,
    period: "Sep 2024 – Feb 2026",
    location: "Espoo, Finland",
  },
  // Northfina's bike-benefit brand; shown next to Northfina, no separate period.
  etufillari: { name: "Etufillari Oy", url: ETUFILLARI_LINK.source },
  espooGameLab: {
    name: "Espoo Game LAB",
    url: ESPOO_GAME_LAB_LINK.source,
    period: "Mar 2024 – Sep 2024",
    location: "Espoo, Finland",
  },
  integrify: {
    name: "Integrify Oy",
    url: INTEGRIFY_LINK.source,
    period: "Jan 2024 – Jun 2024",
    location: "Helsinki, Finland",
  },
  clarusway: {
    name: "Clarusway",
    url: CLARUSWAY_LINK.source,
    period: "Nov 2022 – Jul 2023",
    location: "Virginia, USA",
  },
  starDunnage: {
    // No public link for this employer, so the name renders as plain text.
    name: "Star Dunnage Oy",
    period: "Aug 2022 – Jan 2023",
    location: "Vantaa, Finland",
  },
  raisGames: {
    name: "Rais Games Ltd.",
    url: RAIS_GAMES_LINK.source,
    period: "Mar 2021 – Feb 2022",
  },
} satisfies Record<string, Employer>;

/** Name + link only, for places that render a company link (CVLink). */
export const companyLink = ({ name, url }: Employer): CVLink => (url ? { name, url } : { name });
