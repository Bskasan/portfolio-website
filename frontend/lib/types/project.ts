export type ProjectMetaData = {
  id: number | string;
  name: string;
  description: string;
  thumbnail: string | null;
  liveUrl: string;
  githubUrl: string | null;
  techStack: string[];
  year: string;
  status: string;
};
