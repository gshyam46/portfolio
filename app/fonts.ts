import { Libre_Caslon_Text, Inter, Quicksand,Lavishly_Yours,Fleur_De_Leah } from "next/font/google";

export const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caslon",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const space = Quicksand({
  subsets: ["latin"],
  variable: "--font-space",
});
export const lavishly = Lavishly_Yours({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lavishly",
});
export const fleur = Fleur_De_Leah({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fleur",
});
