import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./glass.css";
import StarsCanvas from "@/components/StarBackground";


// import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Space Portfolio",
  description: "This is my portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body
        className={`${inter.className} bg-black overflow-y-scroll overflow-x-hidden`}
      >

        <StarsCanvas />


        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
