import PageWrapper from "@/components/animated/PageWrapper";
import Tag from "@/components/elements/Tag";
import TransitionLink from "@/components/elements/TransitionLink";

import type { Metadata } from "next";
import { getAllSlugs, getPostFrontmatter } from "@/lib/blogs";
import type { Tag as PostTag } from "@/lib/types/blogMeta";

// Pre-render every post at build time as static HTML
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ id: slug }));
}

// Any /blogs/[id] not in the list above returns 404
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = getPostFrontmatter(id);
  return { title: post.title, description: post.excerpt };
}

const BlogContentPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = getPostFrontmatter(id);

  // The MDX body (your sections) is imported and rendered as a component
  const { default: Content } = await import(`@/content/${id}.mdx`);

  return (
    <PageWrapper>
      {/* reading-mode calms the screen effects for long-form text (styles/globals.css) */}
      <article className="reading-mode mx-auto max-w-[70ch]" aria-labelledby="post-title">
        <TransitionLink href="/blogs" className="cmdlink">
          &lt; C:\BLOG
        </TransitionLink>

        {/* Post Header */}
        <header>
          <div className="mt-4 flex flex-wrap gap-x-3.5 gap-y-1.5 text-[13px] text-phos-dim">
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>
              {post.author.name}, {post.author.role}
            </span>
          </div>

          <h1 id="post-title" className="mt-[18px] text-[clamp(40px,6vw,64px)] uppercase">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag: PostTag) => (
              <Tag key={tag.key} name={tag.name} />
            ))}
          </div>

          {/* Intro (from frontmatter, keeps its distinct lead styling) */}
          <p className="mt-[18px] border-l-2 border-phos-faint pl-4 text-[17px]">{post.intro}</p>
        </header>

        <div className="article mt-[30px]">
          <Content />
        </div>

        {/* Author footer */}
        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-phos-faint pt-3.5">
          <div className="flex items-center gap-3">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center bg-phos font-display text-3xl text-glass [text-shadow:none]"
              aria-hidden="true"
            >
              {post.author.name.charAt(0)}
            </span>
            <span className="flex flex-col">
              <span className="font-semibold">{post.author.name}</span>
              <span className="text-sm text-phos-dim">{post.author.role}</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <TransitionLink href="/blogs" className="cmdlink">
              &lt; BACK TO BLOG
            </TransitionLink>
            <TransitionLink href="/about" className="cmdlink">
              ABOUT THE AUTHOR &gt;
            </TransitionLink>
          </div>
        </footer>
      </article>
    </PageWrapper>
  );
};

export default BlogContentPage;
