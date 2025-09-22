import { CheckCircle, XCircle } from "lucide-react";
import { hexToRgb } from "../../../../lib/css/format";

export const commonPresets = [
  { name: "Black on White", foreground: "#000000", background: "#FFFFFF" },
  { name: "White on Black", foreground: "#FFFFFF", background: "#000000" },
  { name: "Dark on Light", foreground: "#1f2937", background: "#f9fafb" },
  { name: "Blue on White", foreground: "#1e40af", background: "#ffffff" },
  { name: "White on Blue", foreground: "#ffffff", background: "#1e40af" },
  { name: "Gray on Light", foreground: "#6b7280", background: "#f3f4f6" },
  { name: "Dark on Yellow", foreground: "#1f2937", background: "#fef3c7" },
  { name: "Red on Light", foreground: "#dc2626", background: "#fef2f2" },
];

export function calculateLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function calculateContrastRatio(
  foreground: string,
  background: string
): number {
  const lumFg = calculateLuminance(foreground);
  const lumBg = calculateLuminance(background);

  const lighter = Math.max(lumFg, lumBg);
  const darker = Math.min(lumFg, lumBg);

  return (lighter + 0.05) / (darker + 0.05);
}

export type TContrastResult = {
  ratio: number;
  wcagAA: {
    normal: boolean;
    large: boolean;
  };
  wcagAAA: {
    normal: boolean;
    large: boolean;
  };
};

export function getTContrastResult(
  foreground: string,
  background: string
): TContrastResult {
  const ratio = calculateContrastRatio(foreground, background);

  return {
    ratio,
    wcagAA: {
      normal: ratio >= 4.5,
      large: ratio >= 3.0,
    },
    wcagAAA: {
      normal: ratio >= 7.0,
      large: ratio >= 4.5,
    },
  };
}

export function getComplianceIcon(passed: boolean) {
  return passed ? (
    <CheckCircle className="w-4 h-4 text-green-600" />
  ) : (
    <XCircle className="w-4 h-4 text-red-600" />
  );
}

export function getGradeColor(passed: boolean) {
  return passed ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100";
}
