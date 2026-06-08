import DivisionLine from "@/components/DivisionLine";
import { MOCK_BLOG_POST_CONTENT } from "@/constants/post";

const BlogContentPage = () => {
  // TODO: Replace MOCK_BLOG_POST_CONTENT with real data fetched from your API or CMS
  const post = MOCK_BLOG_POST_CONTENT;

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 w-full max-w-6xl flex-col items-start py-32 px-4 sm:px-6">
        {/* Post Header */}
        <header className="w-full mb-8">
          {/* Tags */}
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

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
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

        {/* Intro */}
        <p className="w-full mt-10 mb-10 text-lg sm:text-xl text-gray-600 leading-relaxed font-light max-w-3xl">
          {post.intro}
        </p>

        <DivisionLine />

        {/* Sections */}
        {/* TODO: Replace with dynamically rendered rich text / MDX from your CMS */}
        <article className="w-full mt-10 max-w-3xl flex flex-col gap-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                {section.heading}
              </h2>
              {section.body.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base sm:text-lg text-gray-600 leading-relaxed mb-3 whitespace-pre-line"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>

        <div className="w-full max-w-3xl mt-16">
          <DivisionLine />
        </div>

        {/* Author Footer */}
        {/* TODO: Fetch full author profile (bio, avatar, links) from your user/author API */}
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
  );
};

export default BlogContentPage;
