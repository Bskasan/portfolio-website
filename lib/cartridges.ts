import { PROJECTS } from "@/constants/projects";
import { COURSE_GAMES, MY_GAMES } from "@/constants/games";

/*
  The command line only needs each project's id, name and page. The root layout
  (a server component) builds this list and passes it down, so the full project
  data — descriptions included — isn't shipped to every page's JavaScript.
*/
export type Cartridge = { id: string; name: string; page: "/projects" | "/games" };

export function getCartridges(): Cartridge[] {
  return [
    ...PROJECTS.map((item) => ({
      id: String(item.id),
      name: item.name,
      page: "/projects" as const,
    })),
    ...[...MY_GAMES, ...COURSE_GAMES].map((item) => ({
      id: String(item.id),
      name: item.name,
      page: "/games" as const,
    })),
  ];
}
