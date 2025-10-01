import type { TSVGPathConfig } from "./types";

export const defaultConfig: TSVGPathConfig = {
  pathData: "M 10 10 L 90 10 L 90 90 L 10 90 Z",
  viewBoxWidth: 100,
  viewBoxHeight: 100,
  strokeColor: "#3b82f6",
  strokeWidth: 2,
  fillColor: "#3b82f680",
  fillOpacity: 50,
  showPoints: true,
  showGrid: true,
  gridSize: 10,
};

export const pathPresets = [
  {
    name: "Rectangle",
    pathData: "M 10 10 L 90 10 L 90 90 L 10 90 Z",
  },
  {
    name: "Triangle",
    pathData: "M 50 10 L 90 90 L 10 90 Z",
  },
  {
    name: "Star",
    pathData: "M 50 10 L 61 35 L 90 35 L 68 52 L 79 80 L 50 63 L 21 80 L 32 52 L 10 35 L 39 35 Z",
  },
  {
    name: "Heart",
    pathData: "M 50 85 C 20 70, 10 50, 10 35 C 10 20, 20 10, 30 10 C 40 10, 45 15, 50 25 C 55 15, 60 10, 70 10 C 80 10, 90 20, 90 35 C 90 50, 80 70, 50 85 Z",
  },
  {
    name: "Curve",
    pathData: "M 10 50 Q 50 10, 90 50 T 170 50",
  },
  {
    name: "Wave",
    pathData: "M 0 50 Q 25 25, 50 50 T 100 50 T 150 50",
  },
  {
    name: "Arc",
    pathData: "M 10 90 A 40 40 0 0 1 90 90",
  },
  {
    name: "Bezier Curve",
    pathData: "M 10 90 C 30 10, 70 10, 90 90",
  },
  {
    name: "Complex Shape",
    pathData: "M 20 20 L 80 20 Q 90 20, 90 30 L 90 70 Q 90 80, 80 80 L 20 80 Q 10 80, 10 70 L 10 30 Q 10 20, 20 20",
  },
  {
    name: "Arrow",
    pathData: "M 10 50 L 60 50 L 60 30 L 90 60 L 60 90 L 60 70 L 10 70 Z",
  },
];

export function extractPathPoints(pathData: string): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];

  // Simple regex to extract coordinate pairs
  const coordPattern = /(-?\d+\.?\d*)\s+(-?\d+\.?\d*)/g;
  let match;

  while ((match = coordPattern.exec(pathData)) !== null) {
    points.push({
      x: parseFloat(match[1]),
      y: parseFloat(match[2]),
    });
  }

  return points;
}

export function downloadSVG(svg: string, filename: string): void {
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
