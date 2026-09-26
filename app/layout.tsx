import type { Metadata } from "next";
import "./globals.css";
import { StoryShell } from "./story-shell";

export const metadata: Metadata = {
  title: { default: "Мало волшебство — приказни на македонски", template: "%s · Мало волшебство" },
  description: "Мала бесплатна библиотека со детски приказни на македонски. За секое детство, каде и да растеме.",
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Marck+Script&subset=cyrillic&display=swap" rel="stylesheet" />
      </head>
      <body><StoryShell>{children}</StoryShell></body>
    </html>
  );
}
