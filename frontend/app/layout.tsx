import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "../styles/globals.css";
import { ViewTransitions } from "next-view-transitions";
import NavBar from "@/components/navbar/NavBar";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bekir Kasan",
  description: "Bekir Kasan's personal portfolio website.",
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
        </body>
      </html>
    </ViewTransitions>
  );
}
