import type { Metadata } from "next";
import { dmSans,plex,garamond } from "./fonts";
import "./globals.css";
import "./glass.css";

import ClientLayout from "@/components/ClientLayout";
import CursorTrail from "@/components/ui/CursorTrail";

export const metadata: Metadata = {
  title: "Shyam's Portfolio",
  description:
    "Ghanashyam's Personal Portfolio Website showcasing work, projects, skills, and contact information.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${plex.variable} ${garamond.variable}
        bg-black overflow-x-hidden`}
      >
          <CursorTrail />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
