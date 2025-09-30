import type { TBlobConfig } from "./types";

export const defaultConfig: TBlobConfig = {
  complexity: 8,
  contrast: 0.6,
  seed: 1,
  color1: "#3b82f6",
  color2: "#8b5cf6",
  gradientType: "linear",
  gradientAngle: 45,
  size: 300,
};

// Simple seeded random number generator
function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

export function generateBlobPath(
  complexity: number,
  contrast: number,
  seed: number
): string {
  const random = seededRandom(seed);
  const points = complexity;
  const angleStep = (Math.PI * 2) / points;

  const radii: number[] = [];
  for (let i = 0; i < points; i++) {
    const baseRadius = 0.5;
    const variation = contrast * 0.3;
    radii.push(baseRadius + (random() - 0.5) * variation);
  }

  let path = "";

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const nextAngle = ((i + 1) % points) * angleStep - Math.PI / 2;

    const x = 50 + radii[i] * 50 * Math.cos(angle);
    const y = 50 + radii[i] * 50 * Math.sin(angle);

    const nextRadius = radii[(i + 1) % points];
    const nextX = 50 + nextRadius * 50 * Math.cos(nextAngle);
    const nextY = 50 + nextRadius * 50 * Math.sin(nextAngle);

    const cpAngle = angle + angleStep / 2;
    const cpRadius = (radii[i] + nextRadius) / 2;
    const cpX = 50 + cpRadius * 55 * Math.cos(cpAngle);
    const cpY = 50 + cpRadius * 55 * Math.sin(cpAngle);

    if (i === 0) {
      path += `M ${x} ${y} `;
    }

    path += `Q ${cpX} ${cpY}, ${nextX} ${nextY} `;
  }

  path += "Z";
  return path;
}

export function generateBlobSVG(config: TBlobConfig): string {
  const path = generateBlobPath(config.complexity, config.contrast, config.seed);

  let gradientDef = "";
  if (config.gradientType === "linear") {
    const rad = (config.gradientAngle * Math.PI) / 180;
    const x2 = 50 + 50 * Math.cos(rad);
    const y2 = 50 + 50 * Math.sin(rad);
    const x1 = 50 - 50 * Math.cos(rad);
    const y1 = 50 - 50 * Math.sin(rad);

    gradientDef = `
      <defs>
        <linearGradient id="blobGradient" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
          <stop offset="0%" stop-color="${config.color1}" />
          <stop offset="100%" stop-color="${config.color2}" />
        </linearGradient>
      </defs>`;
  } else {
    gradientDef = `
      <defs>
        <radialGradient id="blobGradient">
          <stop offset="0%" stop-color="${config.color1}" />
          <stop offset="100%" stop-color="${config.color2}" />
        </radialGradient>
      </defs>`;
  }

  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  ${gradientDef}
  <path d="${path}" fill="url(#blobGradient)" />
</svg>`;
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
