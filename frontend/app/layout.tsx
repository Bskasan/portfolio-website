import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',  
  display: 'swap',
})

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
    <html
      lang="en"
      className={`${robotoMono.variable}`}
    >
      <body className="min-h-full flex flex-col font-mono">{children}</body>
    </html>
  );
}
