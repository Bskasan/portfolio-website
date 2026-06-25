import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { BlogPostFrontmatter, BlogPostMetaData } from "./types/posts";
import { Tag } from "./types/blogMeta";

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
        tagNames: fm.tags?.map((tag: Tag) => tag.name) ?? [],
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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getPostFrontmatter(id);
  return { title: post.title, description: post.excerpt };
}

// Pre-render every post at build time as static HTML
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ id: slug }));
}
