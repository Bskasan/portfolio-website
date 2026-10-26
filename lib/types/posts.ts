import { Tag } from "./blogMeta";

export type Author = {
  name: string;
  role: string;
};

export interface BlogPostMetaData {
  slug: string;
  title: string;
  date: string;
  /** date as YYYY-MM-DD */
  isoDate: string;
  wordCount: number;
  readTime: string;
  excerpt: string;
  tagNames: string[];
  author: Author;
}

export interface BlogPostFrontmatter {
  title: string;
  date: string;
  readTime: string;
  baseImageUrl: string;
  imageFilePath: string;
  alt: string;
  excerpt: string;
  intro: string;
  tags: Tag[];
  author: Author;
}
