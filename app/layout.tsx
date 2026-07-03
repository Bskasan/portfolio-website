import "../styles/globals.css";
import NavBar from "@/components/navbar/NavBar";

import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

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
  return (
    <ViewTransitions>
      <html lang="en" className={`${robotoMono.variable}`}>
        <body className="min-h-full flex flex-col font-mono">
          <NavBar />
          <main>{children}</main>
          <GoogleAnalytics gaId="G-VP78F2NX1H" />
          <GoogleTagManager gtmId="G-VP78F2NX1H" />
        </body>
      </html>
    </ViewTransitions>
  );
}
