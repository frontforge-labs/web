import {
  copyToClipboard as clipboardCopy,
  formatCSS as formatCSSUtil,
  hexToRgb as hexToRgbUtil,
  rgbToHex as rgbToHexUtil,
} from "@frontforge/ui";

// Re-export utilities for backward compatibility
export const copyToClipboard = clipboardCopy;
export const formatCSS = formatCSSUtil;
export const hexToRgb = hexToRgbUtil;
export const rgbToHex = rgbToHexUtil;
