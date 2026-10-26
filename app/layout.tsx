import "../styles/globals.css";
import NavBar from "@/components/navbar/NavBar";

import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { plexMono, vt323 } from "./fonts";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Bekir Kasan - Portfolio & Personal Blog",
  description: "Bekir Kasan's personal portfolio website.",
  icons: {
    icon: "/images/ronindev-logo.png",
  },
};

// Runs synchronously before first paint to apply the saved (or OS-preferred)
// theme, preventing a flash of the wrong theme. Stringified because it must
// execute during HTML parse, before React hydrates.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var isDark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${plexMono.variable} ${vt323.variable}`} suppressHydrationWarning>
        <body className="min-h-full flex flex-col font-mono">
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
          <NavBar />
          <main>{children}</main>
          <GoogleAnalytics gaId="G-VP78F2NX1H" />
          <GoogleTagManager gtmId="G-VP78F2NX1H" />
        </body>
      </html>
    </ViewTransitions>
  );
}
