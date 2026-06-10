import DivisionLine from "@/components/DivisionLine";
import PageWrapper from "@/components/PageWrapper";
import SocialLinks from "@/components/SocialLinks";
import { MOCK_POSTS } from "@/constants/post";
import Link from "next/link";

const BlogsPage = () => {
  // TODO: Replace MOCK_POSTS with real posts fetched from your API or CMS
  const posts = MOCK_POSTS;

  return (
    <PageWrapper>
      <div className="flex flex-col flex-1 items-center justify-center">
        <main className="flex flex-1 w-full max-w-6xl flex-col items-start py-12 px-8">
          {/* Page Header */}
          <div className="w-full mb-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">Blog</h1>
            <p className="mt-3 text-base text-gray-500 max-w-lg">
              Thoughts on frontend engineering, React, and building great user experiences.
            </p>
          </div>

          <SocialLinks />

          <div className="w-full mt-8 mb-2">
            <DivisionLine />
          </div>

          {/* Post List */}
          {/* TODO: Map over real fetched posts once API is connected */}
          <ul className="w-full flex flex-col">
            {posts.map((post, index) => (
              <li key={post.slug}>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 py-8 w-full transition-colors"
                >
                  {/* Date Column */}
                  <div className="shrink-0 w-32 text-sm text-gray-400 pt-1">{post.date}</div>

                  {/* Content Column */}
                  <div className="flex flex-col flex-1 gap-2">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium tracking-widest uppercase text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Footer Meta */}
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                      <span>{post.author.name}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                      <span className="ml-auto text-gray-900 font-medium group-hover:underline underline-offset-4 text-sm hidden sm:block">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>

                <DivisionLine />
              </li>
            ))}
          </ul>

          {/* Empty State — shown when no posts exist */}
          {/* TODO: Remove once real posts are loading */}
          {posts.length === 0 && (
            <div className="w-full py-20 flex flex-col items-center justify-center text-gray-400 gap-2">
              <p className="text-lg font-medium">No posts yet.</p>
              <p className="text-sm">Check back soon.</p>
            </div>
          )}
        </main>
      </div>
    </PageWrapper>
  );
};

export default BlogsPage;
