import type { Metadata } from "next";
import { caslon, inter, space,lavishly,fleur } from "./fonts";
import "./globals.css";
import "./glass.css";
import StarsCanvas from "@/components/StarBackground";
import Footer from "@/components/Footer";



export const metadata: Metadata = {
  title: "Shyam's Portfolio",
  description: "Ghanashyam's Personal Portfolio Website showcasing work, projects, skills, and contact information.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body
        className={` ${caslon.variable}
          ${inter.variable}
          ${space.variable}
          ${lavishly.variable}
          ${fleur.variable}

          bg-black overflow-y-scroll overflow-x-hidden`}
      >

        <StarsCanvas />


        {children}
       
      
          {/* Dotted Background */}
          <div className="relative dotted-bg flex items-center justify-center">
            <Footer />
          </div>
       
      </body>
    </html>
  );
}
