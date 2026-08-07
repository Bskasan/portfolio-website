import { ProjectMetaData } from "@/lib/types/project";

export const GAMES: ProjectMetaData[] = [
  {
    id: "chronos-awakening",
    name: "Chronos Awakening",
    description:
      "An action-RPG set in a time-bending universe where players must manipulate past and future events to solve intricate puzzles and defeat ancient deities. Built with a heavy emphasis on community modding, it features real-time ray tracing, procedural world generation, and an innovative AI-driven dynamic dialogue system. The project serves as an open-source sandbox for developers wanting to learn advanced C++ mechanics in a production-grade custom engine.",
    thumbnail: "/images/games/chronos-thumbnail.png",
    liveUrl: "https://www.chronosawakening.com/",
    githubUrl: "https://github.com/MockStudio/chronos-engine",
    techStack: [
      "Unreal Engine 5",
      "C++",
      "FMOD",
      "Blender",
      "AWS GameLift",
      "Python",
      "DirectX 12",
      "Docker",
      "Supabase",
      "Google Test",
    ],
    year: "2026",
    status: {
      key: "notready",
      value: "In Progress",
    },
  },
  {
    id: "neon-drifter",
    name: "Neon Drifter",
    description:
      "A fast-paced, cyberpunk hover-racing game with synthwave aesthetics. Designed with intention — hyper-optimized graphics, zero-gravity drift mechanics, and a globally scalable multiplayer architecture without the usual matchmaking clutter.",
    thumbnail: "/images/games/neon-drifter-logo.png",
    liveUrl: "https://www.neondriftergame.dev/",
    githubUrl: "https://github.com/MockStudio/neon-drifter",
    techStack: ["Unity", "C#", "Photon Fusion", "HLSL", "Jenkins(CI)", "Figma"],
    year: "2026",
    status: {
      key: "archived",
      value: "Done",
    },
  },
  {
    id: "tavern-keeper-overlay",
    name: "Tavern Keeper Twitch Overlay",
    description:
      "A sleek, interactive stream overlay designed as an OBS Browser Source for Twitch streamers playing 'Tavern Keeper'. Allows viewers to spawn patrons and vote on events via chat. Features a modern UI, persistent state, and easy customization via URL parameters.",
    thumbnail: "/images/games/tavern-icon-new.png",
    liveUrl: "https://mockstudio.github.io/tavern-obs-overlay/",
    githubUrl: "https://github.com/MockStudio/tavern-obs-overlay",
    techStack: ["JavaScript", "HTML5/CSS", "Twitch API", "WebSockets"],
    year: "2026",
    status: {
      key: "archived",
      value: "Done",
    },
  },
];
