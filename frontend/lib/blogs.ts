import fs from "fs";
import path from "path";
import { BlogMeta } from "./types/blogMeta";
import matter from "gray-matter";
import { BlogPostFrontmatter, BlogPostMetaData } from "./types/posts";

const contentDir = path.join(process.cwd(), "content");

export function getAllPosts(): BlogPostMetaData[] {
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(contentDir, f), "utf8"));
      const fm = data as Partial<BlogPostFrontmatter>;
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: fm.title ?? "Untitled",
        date: fm.date ?? "",
        readTime: fm.readTime ?? "",
        excerpt: fm.excerpt ?? "",
        tags: fm.tags ?? [], // ← undefined can't happen now
        author: fm.author ?? { name: "", role: "" },
      };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostFrontmatter(slug: string): BlogPostFrontmatter {
  const raw = fs.readFileSync(path.join(contentDir, `${slug}.mdx`), "utf8");
  const { data } = matter(raw);
  return data as BlogPostFrontmatter;
}
