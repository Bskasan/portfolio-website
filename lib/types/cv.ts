export type CVLink = {
  name: string;
  url?: string;
};

export type CVHeader = {
  name: string;
  title: string;
  stack: string[];
  contacts: CVLink[];
};

export type CVExperience = {
  company: CVLink;
  role: string;
  location: string;
  period: string;
  highlights: string[];
};

export type CVSkillGroup = {
  label: string;
  skills: string[];
};

export type CVEducation = {
  institution: CVLink;
  degree: string;
  location: string;
  details: string[];
};

export type CVOtherItem = {
  label: string;
  value: string;
};
