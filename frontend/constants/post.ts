// TODO: Fetch real blog posts from your CMS or API (e.g. Sanity, Contentful, or a custom endpoint)

import { BlogPostContent, BlogPostMetaData } from "@/lib/types/posts";

// Example: const posts = await fetchAllPosts()
export const MOCK_POSTS: BlogPostMetaData[] = [
  {
    slug: "understanding-react-server-components",
    title: "Understanding React Server Components: A Deep Dive",
    date: "June 5, 2026",
    readTime: "8 min read",
    author: {
      name: "Bekir Kasan",
      role: "Fullstack Developer",
    },
    tags: ["React", "Next.js", "Performance"],
    excerpt:
      "React Server Components have fundamentally changed how we think about rendering in React applications. We break down what they are, how they work under the hood, and when you should — and shouldn't — reach for them.",
  },
  {
    slug: "understanding-react-components",
    title: "Understanding React Server Components: A Deep Dive",
    date: "June 5, 2026",
    readTime: "8 min read",
    author: {
      name: "Bekir Kasan",
      role: "Fullstack Developer",
    },
    tags: ["React", "Next.js", "Performance"],
    excerpt:
      "React Server Components have fundamentally changed how we think about rendering in React applications. We break down what they are, how they work under the hood, and when you should — and shouldn't — reach for them.",
  },
];

// TODO: Fetch real blog content from your CMS or API (e.g. Sanity, Contentful, or a custom endpoint)
// Example: const post = await fetchPostBySlug(params.slug)
export const MOCK_BLOG_POST_CONTENT: BlogPostContent = {
  title: "Understanding React Server Components: A Deep Dive",
  date: "June 5, 2026",
  readTime: "8 min read",
  author: {
    name: "Bekir Kasan",
    role: "Fullstack Developer",
  },
  tags: ["React", "Next.js", "Performance"],
  intro:
    "React Server Components (RSCs) have fundamentally changed how we think about rendering in React applications. In this post, we'll break down what they are, how they work under the hood, and when you should — and shouldn't — reach for them.",
  sections: [
    {
      heading: "What Are Server Components?",
      body: `Server Components are React components that render exclusively on the server. Unlike traditional Server-Side Rendering (SSR), they don't ship any JavaScript to the client — not even for hydration. The result is a leaner bundle and faster Time to Interactive (TTI).

The mental model shift here is significant: instead of thinking of your entire component tree as "React that runs everywhere", you start to separate concerns. Server Components handle data fetching and heavy logic; Client Components handle interactivity.`,
    },
    {
      heading: "The Rendering Model",
      body: `When a request hits your Next.js app, the server renders your Server Components into a special serialized format — not HTML, but a React-specific payload. This payload is streamed to the client, where the React runtime reconciles it with any Client Components.

This streaming architecture is what enables features like Suspense boundaries to work seamlessly across the server/client boundary, progressively revealing UI as data resolves.`,
    },
    {
      heading: "When to Use Them",
      body: `Server Components shine when you need to:

• Fetch data close to the source (database, internal APIs) without exposing secrets to the client
• Render large dependency trees (e.g. markdown parsers, syntax highlighters) without bloating the bundle
• Improve Core Web Vitals by reducing JavaScript parse and execution time

They are NOT a good fit for anything that requires browser APIs, event listeners, or stateful logic — those remain in Client Components marked with "use client".`,
    },
    {
      heading: "A Practical Example",
      body: `Consider a blog post page (like this one). The post content, author details, and metadata can all be fetched and rendered in a Server Component. The "Like" button or comment form, however, needs interactivity — so it lives in a Client Component.

This co-location of server and client logic in the same component tree, without prop-drilling or context hacks, is the real power of the RSC model.`,
    },
    {
      heading: "What's Next?",
      body: `The React team is actively working on improving the developer experience around RSCs — better error messages, improved tooling, and tighter integration with the ecosystem. Frameworks like Next.js 15+ and Remix are already building on this foundation.

If you haven't explored Server Components yet, now is a great time to start. The learning curve is real, but the performance and architectural benefits are worth it.`,
    },
  ],
};
