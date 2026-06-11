import DivisionLine from "@/components/DivisionLine";
import PageWrapper from "@/components/PageWrapper";
import { getAllSlugs, getPostFrontmatter } from "@/lib/blogs";

// Pre-render every post at build time as static HTML
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ id: slug }));
}

// Any /blogs/[id] not in the list above returns 404
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
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
      <div className="flex flex-col flex-1 items-center justify-center">
        <main className="flex flex-1 w-full max-w-6xl flex-col items-start py-32 px-4 sm:px-6">
          {/* Post Header */}
          <header className="w-full mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium tracking-widest uppercase text-gray-500 border border-gray-300 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-500">
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
          <p className="w-full mt-10 mb-10 text-lg sm:text-xl text-gray-600 leading-relaxed font-light max-w-3xl">
            {post.intro}
          </p>

          <DivisionLine />

          {/* MDX body — replaces your manual sections.map */}
          <article className="prose prose-lg prose-gray w-full mt-10 max-w-3xl">
            <Content />
          </article>

          <div className="w-full max-w-3xl mt-16">
            <DivisionLine />
          </div>

          {/* Author Footer */}
          <footer className="w-full max-w-3xl mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
