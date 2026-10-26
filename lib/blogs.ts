import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { BlogPostFrontmatter, BlogPostMetaData } from "./types/posts";
import { Tag } from "./types/blogMeta";

const contentDir = path.join(process.cwd(), "content");

// "June 23, 2026" → "2026-06-23" for the blog's directory listing.
function toIsoDate(date?: string): string {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${parsed.getFullYear()}-${month}-${day}`;
}

// Words of prose in an MDX body, ignoring import lines and JSX/HTML tags.
function countWords(content: string): number {
  return content
    .replace(/^import .*$/gm, "")
    .replace(/<[^>]*>/g, " ")
    .split(/\s+/)
    .filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
}

export function getAllPosts(): BlogPostMetaData[] {
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(contentDir, f), "utf8"));
      const fm = data as Partial<BlogPostFrontmatter>;
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: fm.title ?? "Untitled",
        date: fm.date ?? "",
        isoDate: toIsoDate(fm.date),
        wordCount: countWords(content),
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
