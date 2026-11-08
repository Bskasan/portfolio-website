import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { BlogPostFrontmatter, BlogPostMetaData } from "./types/posts";
import { Tag } from "./types/blogMeta";

const contentDir = path.join(process.cwd(), "content");

// Frontmatter date → "YYYY-MM-DD" for the blog's directory listing.
//   "June 23, 2026" parses as local midnight, so the local getters give the same day.
//   "2026-06-23" already is the format and is returned as written: parsing it would
//   give UTC midnight, which the local getters turn into the 22nd west of UTC.
//   An unquoted YAML date (date: 2026-06-23) arrives as a Date at UTC midnight, so
//   it is read in UTC for the same reason.
function toIsoDate(date?: string | Date): string {
  if (!date) return "";
  if (date instanceof Date) {
    return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
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
