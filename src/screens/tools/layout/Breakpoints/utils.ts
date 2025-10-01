import type { TBreakpoint, TBreakpointConfig } from "./types";

export const breakpoints: TBreakpoint[] = [
  {
    name: "Mobile S",
    width: 320,
    height: 568,
    description: "iPhone SE, older smartphones",
  },
  {
    name: "Mobile M",
    width: 375,
    height: 667,
    description: "iPhone 6/7/8, standard mobile",
  },
  {
    name: "Mobile L",
    width: 414,
    height: 896,
    description: "iPhone XR, larger smartphones",
  },
  {
    name: "Tablet",
    width: 768,
    height: 1024,
    description: "iPad, Android tablets",
  },
  {
    name: "Tablet Pro",
    width: 1024,
    height: 1366,
    description: "iPad Pro, large tablets",
  },
  {
    name: "Laptop",
    width: 1366,
    height: 768,
    description: "Standard laptop screens",
  },
  {
    name: "Desktop",
    width: 1920,
    height: 1080,
    description: "Full HD desktop monitors",
  },
  {
    name: "4K",
    width: 2560,
    height: 1440,
    description: "4K/QHD displays",
  },
];

export const defaultConfig: TBreakpointConfig = {
  activeBreakpoint: "Mobile M",
  customWidth: 375,
  customHeight: 667,
  orientation: "portrait",
  showRuler: true,
  contentUrl: "",
};

export function generateMediaQuery(minWidth: number, maxWidth?: number): string {
  if (maxWidth) {
    return `@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px) {
  /* Styles for ${minWidth}px - ${maxWidth}px */
}`;
  }
  return `@media (min-width: ${minWidth}px) {
  /* Styles for ${minWidth}px and up */
}`;
}
