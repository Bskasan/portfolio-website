import localFont from "next/font/local";

/*
  Self-hosted fonts (SIL Open Font License, see app/fonts/*-OFL.txt).
  Loading them locally keeps builds independent of Google Fonts and means
  visitors' browsers never contact a third party just to render text.
*/

// Pixel display face: headings, menus, labels and the command line.
export const vt323 = localFont({
  src: "./fonts/vt323-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-vt323",
  display: "swap",
  fallback: ["Courier New", "monospace"],
});

// Readable terminal face for running text (the blog post is ~3,400 words).
export const plexMono = localFont({
  src: [
    // Only the weights the site uses: 400 for text, 600 for <strong> and emphasis.
    // (No italic or 500: every one of these files is preloaded on every page.)
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});
