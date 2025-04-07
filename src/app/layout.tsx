import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plant Care",
  description: "Plant Care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
