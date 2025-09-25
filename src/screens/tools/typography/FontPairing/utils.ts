import type { TFontPair, TFontWeight } from "./types";

export const popularFonts: string[] = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Source Sans Pro",
  "Oswald",
  "Raleway",
  "Nunito",
  "Poppins",
  "Playfair Display",
  "Merriweather",
  "PT Serif",
  "Crimson Text",
  "Libre Baskerville",
  "Cormorant Garamond",
  "Dancing Script",
  "Pacifico",
  "Righteous",
  "Fredoka One",
];

export const fontPairings: TFontPair[] = [
  {
    name: "Modern Professional",
    heading: "Inter",
    body: "Source Sans Pro",
    display: "Clean and readable for corporate sites",
  },

  {
    name: "Creative Display",
    heading: "Righteous",
    body: "Open Sans",
    display: "Eye-catching for creative projects",
  },
  {
    name: "Tech Startup",
    heading: "Montserrat",
    body: "Open Sans",
    display: "Modern and approachable",
  },
  {
    name: "Elegant Serif",
    heading: "Crimson Text",
    body: "Lato",
    display: "Sophisticated with great readability",
  },
  {
    name: "Bold Impact",
    heading: "Oswald",
    body: "Nunito",
    display: "Strong headlines with friendly body",
  },
  {
    name: "Minimal Clean",
    heading: "Roboto",
    body: "Roboto",
    display: "Consistent Google font family",
  },
  {
    name: "Editorial Classic",
    heading: "Playfair Display",
    body: "Source Sans Pro",
    display: "Perfect for magazines and blogs",
  },
  {
    name: "Classic Readable",
    heading: "Merriweather",
    body: "Merriweather",
    display: "Excellent for long-form reading",
  },
];

export const fontWeights: TFontWeight[] = [
  { value: "300", label: "Light" },
  { value: "400", label: "Regular" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semi Bold" },
  { value: "700", label: "Bold" },
  { value: "800", label: "Extra Bold" },
  { value: "900", label: "Black" },
];
