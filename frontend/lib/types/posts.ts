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
