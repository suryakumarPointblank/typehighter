import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Typhighter – Monsoon Precaution Tips Poster Competition",
  description:
    "Be a part of a movement that promotes awareness, encourages conversations, and inspires action against typhoid.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
