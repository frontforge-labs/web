import type { TShadowLayer } from "./types";

export const shadowPresets: Array<{ name: string; shadows: Omit<TShadowLayer, 'id'>[] }> = [
  {
    name: "Subtle Drop",
    shadows: [
      { offsetX: 1, offsetY: 1, blurRadius: 2, color: "#00000040", enabled: true }
    ]
  },
  {
    name: "Bold Shadow",
    shadows: [
      { offsetX: 3, offsetY: 3, blurRadius: 0, color: "#000000", enabled: true }
    ]
  },
  {
    name: "Glow Effect",
    shadows: [
      { offsetX: 0, offsetY: 0, blurRadius: 10, color: "#3b82f6", enabled: true }
    ]
  },
  {
    name: "Layered Depth",
    shadows: [
      { offsetX: 1, offsetY: 1, blurRadius: 1, color: "#00000020", enabled: true },
      { offsetX: 2, offsetY: 2, blurRadius: 4, color: "#00000030", enabled: true },
      { offsetX: 4, offsetY: 4, blurRadius: 8, color: "#00000020", enabled: true }
    ]
  },
  {
    name: "Neon Glow",
    shadows: [
      { offsetX: 0, offsetY: 0, blurRadius: 5, color: "#ff00ff", enabled: true },
      { offsetX: 0, offsetY: 0, blurRadius: 10, color: "#ff00ff80", enabled: true },
      { offsetX: 0, offsetY: 0, blurRadius: 15, color: "#ff00ff40", enabled: true }
    ]
  },
  {
    name: "Embossed",
    shadows: [
      { offsetX: 1, offsetY: 1, blurRadius: 0, color: "#ffffff80", enabled: true },
      { offsetX: -1, offsetY: -1, blurRadius: 0, color: "#00000040", enabled: true }
    ]
  }
];

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}