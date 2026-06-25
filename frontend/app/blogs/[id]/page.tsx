import DivisionLine from "@/components/elements/DivisionLine";
import PageWrapper from "@/components/animated/PageWrapper";
import TagElement from "@/components/elements/Tag";

import { getPostFrontmatter } from "@/lib/blogs";
import { Tag } from "@/lib/types/blogMeta";

// Any /blogs/[id] not in the list above returns 404
export const dynamicParams = false;

const BlogContentPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = getPostFrontmatter(id);

  // The MDX body (your sections) is imported and rendered as a component
  const { default: Content } = await import(`@/content/${id}.mdx`);

  return (
    <PageWrapper>
      <div className="flex flex-col flex-1 items-center justify-center">
        <main className="flex flex-1 w-full max-w-6xl flex-col items-start py-20 px-4 sm:px-6 lg:py-32">
          {/* Post Header */}
          <header className="w-full mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag: Tag) => (
                <TagElement key={tag.key} name={tag.name} />
              ))}
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
              <span className="font-medium text-gray-700">{post.author.name}</span>
              <span>·</span>
              <span>{post.author.role}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <DivisionLine />

          {/* Intro (from frontmatter, keeps your distinct lead styling) */}
          <p className="flex flex-col mx-auto w-full mt-10 mb-10 text-sm sm:text-base italic text-gray-600 leading-relaxed  max-w-4xl">
            &quot;{post.intro}&quot;
          </p>

          <DivisionLine />

          <article className="prose prose-lg text-base prose-gray w-full mt-10 max-w-4xl flex flex-col mx-auto leading leading-relaxed">
            <Content />
          </article>

          <div className="w-full max-w-4xl mt-16 mx-auto">
            <DivisionLine />
          </div>

          {/* Author Footer */}
          <footer className="w-full mx-auto max-w-4xl mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white font-bold text-lg shrink-0">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{post.author.name}</p>
              <p className="text-sm text-gray-500">{post.author.role}</p>
            </div>
          </footer>
        </main>
      </div>
    </PageWrapper>
  );
};

export default BlogContentPage;
