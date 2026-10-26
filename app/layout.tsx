import "../styles/globals.css";
import NavBar from "@/components/navbar/NavBar";
import CrtFrame from "@/components/crt/CrtFrame";
import StatusBar from "@/components/crt/StatusBar";

import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { plexMono, vt323 } from "./fonts";
import { getAllPosts } from "@/lib/blogs";
import { DEFAULT_FX, DEFAULT_PHOSPHOR, screenSettingsInitScript } from "@/lib/screenSettings";

export const metadata: Metadata = {
  title: "Bekir Kasan - Portfolio & Personal Blog",
  description: "Bekir Kasan's personal portfolio website.",
  icons: {
    icon: "/images/ronindev-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Titles for the command line's `read` command (newest first).
  const posts = getAllPosts().map(({ slug, title }) => ({ slug, title }));

  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${plexMono.variable} ${vt323.variable}`}
        data-phos={DEFAULT_PHOSPHOR}
        data-fx={DEFAULT_FX}
        suppressHydrationWarning
      >
        <body>
          {/* Applies the saved screen settings before first paint (no flash). */}
          <script dangerouslySetInnerHTML={{ __html: screenSettingsInitScript }} />
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <CrtFrame />
          <div className="crt-page">
            <div className="crt-column">
              <NavBar />
              <main id="main" tabIndex={-1} className="outline-none">
                {children}
              </main>
            </div>
          </div>
          <StatusBar posts={posts} />
          <GoogleAnalytics gaId="G-VP78F2NX1H" />
          <GoogleTagManager gtmId="G-VP78F2NX1H" />
        </body>
      </html>
    </ViewTransitions>
  );
}
