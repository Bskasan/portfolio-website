export type Author = {
  name: string;
  role: string;
};

export type BlogPostMetaData = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  author: Author;
  tags: string[];
  excerpt: string;
};

export type BlogPostSection = {
  heading: string;
  body: string;
};

export type BlogPostContent = {
  title: string;
  date: string;
  readTime: string;
  author: Author;
  tags: string[];
  intro: string;
  sections: BlogPostSection[];
};
