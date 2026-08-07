export type ProjectMetaData = {
  id: number | string;
  name: string;
  description: string;
  thumbnail: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  techStack: string[];
  year: string | null;
  status: ProjectStatus;
};

export type ProjectStatus = {
  key: string;
  value: string;
};
