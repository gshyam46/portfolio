// import {
//   Libre_Caslon_Text,
//   Inter,
//   Space_Grotesk,
//   Playfair_Display,
// } from "next/font/google";


// export const caslon = Libre_Caslon_Text({
//   subsets: ["latin"],
//   weight: ["400", "700"],
//   variable: "--font-caslon",
// });

// export const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// });

// export const space = Space_Grotesk({
//   subsets: ["latin"],
//   weight: ["400", "500", "600"],
//   variable: "--font-space",
// });

// export const playfair = Playfair_Display({
//   subsets: ["latin"],
//   weight: ["500", "600", "700"],
//   variable: "--font-playfair",
// });
import {
  EB_Garamond,
  IBM_Plex_Sans,
  DM_Sans,
} from "next/font/google";

export const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-garamond",
});

export const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm",
});
