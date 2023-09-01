import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Movie Search App",
  description:
    "Single page application that allows a user to search the  OMDb database (OMDb API - The Open Movie Database) for a movie, series or episode and display the results in a presentable format",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
