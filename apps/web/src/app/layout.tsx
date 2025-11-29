import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AnnaApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
