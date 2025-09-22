import { hexToRgb, rgbToHex } from "../../../../lib/css/format";

export const colorPresets = [
  { name: "Primary Blue", hex: "#3b82f6", category: "Brand" },
  { name: "Success Green", hex: "#10b981", category: "Status" },
  { name: "Warning Orange", hex: "#f59e0b", category: "Status" },
  { name: "Error Red", hex: "#ef4444", category: "Status" },
  { name: "Purple", hex: "#8b5cf6", category: "Accent" },
  { name: "Pink", hex: "#ec4899", category: "Accent" },
  { name: "Teal", hex: "#14b8a6", category: "Nature" },
  { name: "Indigo", hex: "#6366f1", category: "Deep" },
] as const;

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const rgb = hexToRgb(hex);
  if (!rgb) return { h: 0, s: 0, l: 0 };

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

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
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

export function generateHarmonyColors(
  baseHex: string,
  harmony: string
): string[] {
  const hsl = hexToHsl(baseHex);
  const colors = [baseHex];

  switch (harmony) {
    case "complementary":
      colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
      break;
    case "triadic":
      colors.push(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l));
      colors.push(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l));
      break;
    case "analogous":
      colors.push(hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l));
      colors.push(hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l));
      break;
  }

  return colors;
}
