import PageWrapper from "@/components/animated/PageWrapper";
import PageHead from "@/components/pages/PageHead";
import TransitionLink from "@/components/elements/TransitionLink";
import Tag from "@/components/elements/Tag";

import { getAllPosts } from "@/lib/blogs";
import { BlogPostMetaData } from "@/lib/types/posts";

const formatNumber = (value: number) => value.toLocaleString("en-US");

const BlogsPage = () => {
  const posts = getAllPosts();
  const totalWords = posts.reduce((sum, post) => sum + post.wordCount, 0);

  return (
    <PageWrapper>
      <PageHead eyebrow="Transmissions" title="Blog">
        Thoughts on full-stack engineering, indie game development, and the solutions found along
        the way.
      </PageHead>

      <div className="text-sm">
        <p className="mb-3.5 font-display text-[26px]">C:\BSKASAN\BLOG&gt; DIR</p>
        <div className="dir-cols" aria-hidden="true">
          <span>DATE</span>
          <span>SIZE</span>
          <span>NAME</span>
        </div>

        {/* Post List */}
        <ul>
          {posts.map((post: BlogPostMetaData) => (
            <li key={post.slug} className="dir-row">
              <TransitionLink href={`/blogs/${post.slug}`}>
                <span className="text-phos-dim tabular-nums">{post.isoDate}</span>
                <span className="dir-size text-phos-dim tabular-nums">
                  {formatNumber(post.wordCount)} W
                  <br />
                  {post.readTime.toUpperCase()}
                </span>
                <span className="flex flex-col gap-2">
                  <span className="flex flex-wrap gap-1.5">
                    {post.tagNames.map((tagName: string) => (
                      <Tag key={tagName} name={tagName} />
                    ))}
                  </span>
                  <span className="dir-title">{post.title}</span>
                  <span className="max-w-[70ch] text-phos-dim">{post.excerpt}</span>
                  <span className="text-[13px] text-phos-dim">
                    {post.author.name} · {post.readTime}
                  </span>
                </span>
              </TransitionLink>
            </li>
          ))}
        </ul>

        <p className="p-2.5 font-display text-xl tracking-[0.06em] text-phos-dim">
          {posts.length} FILE(S) · {formatNumber(totalWords)} WORDS
        </p>

        {/* Empty State — shown when no posts exist */}
        {posts.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-20 text-phos-dim">
            <p className="font-display text-2xl">NO POSTS YET.</p>
            <p>Check back soon.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default BlogsPage;
