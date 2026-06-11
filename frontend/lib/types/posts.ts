export type Author = {
  name: string;
  role: string;
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

export interface BlogPostMetaData {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  author: Author;
}

export interface BlogPostFrontmatter {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  intro: string;
  tags: string[];
  author: Author;
}
