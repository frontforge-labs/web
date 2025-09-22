import { hexToRgb, rgbToHex } from "../../../../lib/css/format";
import type { TPaletteColor } from "./types";

export const harmonyTypes = [
  { value: "complementary", label: "Complementary" },
  { value: "triadic", label: "Triadic" },
  { value: "analogous", label: "Analogous" },
  { value: "split-complementary", label: "Split Complementary" },
  { value: "tetradic", label: "Tetradic" },
  { value: "monochromatic", label: "Monochromatic" },
];

export const palettePresets = [
  {
    name: "Ocean Breeze",
    colors: [
      { id: "1", hex: "#0077be", name: "Deep Blue" },
      { id: "2", hex: "#4da6d9", name: "Sky Blue" },
      { id: "3", hex: "#87ceeb", name: "Light Blue" },
      { id: "4", hex: "#b0e0e6", name: "Powder Blue" },
      { id: "5", hex: "#e0f6ff", name: "Ice Blue" },
    ],
  },
  {
    name: "Sunset Glow",
    colors: [
      { id: "1", hex: "#ff6b35", name: "Coral" },
      { id: "2", hex: "#f7931e", name: "Orange" },
      { id: "3", hex: "#ffd23f", name: "Golden" },
      { id: "4", hex: "#ffe66d", name: "Light Yellow" },
      { id: "5", hex: "#fff3a0", name: "Cream" },
    ],
  },
  {
    name: "Forest Path",
    colors: [
      { id: "1", hex: "#2d5016", name: "Dark Green" },
      { id: "2", hex: "#3d7c47", name: "Forest Green" },
      { id: "3", hex: "#7fb069", name: "Sage Green" },
      { id: "4", hex: "#bfd5a7", name: "Light Green" },
      { id: "5", hex: "#e8f5e8", name: "Mint" },
    ],
  },
  {
    name: "Royal Purple",
    colors: [
      { id: "1", hex: "#4c1d95", name: "Deep Purple" },
      { id: "2", hex: "#7c3aed", name: "Violet" },
      { id: "3", hex: "#a78bfa", name: "Light Purple" },
      { id: "4", hex: "#c4b5fd", name: "Lavender" },
      { id: "5", hex: "#ede9fe", name: "Pale Purple" },
    ],
  },
  {
    name: "Autumn Warmth",
    colors: [
      { id: "1", hex: "#7c2d12", name: "Dark Brown" },
      { id: "2", hex: "#dc2626", name: "Red" },
      { id: "3", hex: "#ea580c", name: "Orange Red" },
      { id: "4", hex: "#facc15", name: "Amber" },
      { id: "5", hex: "#fef3c7", name: "Light Amber" },
    ],
  },
  {
    name: "Monochrome",
    colors: [
      { id: "1", hex: "#000000", name: "Black" },
      { id: "2", hex: "#374151", name: "Dark Gray" },
      { id: "3", hex: "#6b7280", name: "Gray" },
      { id: "4", hex: "#d1d5db", name: "Light Gray" },
      { id: "5", hex: "#ffffff", name: "White" },
    ],
  },
];

export function generateHarmonyColors(
  baseHex: string,
  harmonyType: string
): TPaletteColor[] {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return [];

  // Convert RGB to HSL for easier color manipulation
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  const baseHue = h * 360;
  const baseSat = s * 100;
  const baseLum = l * 100;

  const colors: TPaletteColor[] = [];

  switch (harmonyType) {
    case "complementary":
      colors.push(
        { id: "1", hex: baseHex, name: "Base" },
        {
          id: "2",
          hex: hslToHex((baseHue + 180) % 360, baseSat, baseLum),
          name: "Complement",
        }
      );
      break;

    case "triadic":
      colors.push(
        { id: "1", hex: baseHex, name: "Base" },
        {
          id: "2",
          hex: hslToHex((baseHue + 120) % 360, baseSat, baseLum),
          name: "Triadic 1",
        },
        {
          id: "3",
          hex: hslToHex((baseHue + 240) % 360, baseSat, baseLum),
          name: "Triadic 2",
        }
      );
      break;

    case "analogous":
      colors.push(
        {
          id: "1",
          hex: hslToHex((baseHue - 30 + 360) % 360, baseSat, baseLum),
          name: "Analogous -30°",
        },
        { id: "2", hex: baseHex, name: "Base" },
        {
          id: "3",
          hex: hslToHex((baseHue + 30) % 360, baseSat, baseLum),
          name: "Analogous +30°",
        }
      );
      break;

    case "monochromatic":
      colors.push(
        {
          id: "1",
          hex: hslToHex(baseHue, baseSat, Math.max(10, baseLum - 40)),
          name: "Dark",
        },
        {
          id: "2",
          hex: hslToHex(baseHue, baseSat, Math.max(10, baseLum - 20)),
          name: "Medium Dark",
        },
        { id: "3", hex: baseHex, name: "Base" },
        {
          id: "4",
          hex: hslToHex(baseHue, baseSat, Math.min(90, baseLum + 20)),
          name: "Medium Light",
        },
        {
          id: "5",
          hex: hslToHex(baseHue, baseSat, Math.min(95, baseLum + 40)),
          name: "Light",
        }
      );
      break;

    default:
      colors.push({ id: "1", hex: baseHex, name: "Base" });
  }

  return colors;
}

export function hslToHex(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

  return rgbToHex(r, g, b);
}
