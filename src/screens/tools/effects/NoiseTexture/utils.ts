import type { TNoiseTextureConfig } from "./types";

export const defaultConfig: TNoiseTextureConfig = {
  noiseType: "grain",
  grainSize: 200,
  opacity: 10,
  baseColor: "#3b82f6",
  noiseColor: "#000000",
  blendMode: "overlay",
  scale: 100,
};

export const noisePresets = [
  {
    name: "Subtle Grain",
    config: {
      ...defaultConfig,
      grainSize: 200,
      opacity: 5,
      blendMode: "overlay",
    },
  },
  {
    name: "Film Grain",
    config: {
      ...defaultConfig,
      grainSize: 150,
      opacity: 15,
      blendMode: "overlay",
    },
  },
  {
    name: "Heavy Grain",
    config: {
      ...defaultConfig,
      grainSize: 100,
      opacity: 25,
      blendMode: "multiply",
    },
  },
  {
    name: "Dots Pattern",
    config: {
      ...defaultConfig,
      noiseType: "dots" as const,
      grainSize: 300,
      opacity: 20,
    },
  },
  {
    name: "Lines Texture",
    config: {
      ...defaultConfig,
      noiseType: "lines" as const,
      grainSize: 250,
      opacity: 15,
    },
  },
  {
    name: "Vintage",
    config: {
      ...defaultConfig,
      grainSize: 120,
      opacity: 30,
      blendMode: "multiply",
      noiseColor: "#8b7355",
    },
  },
  {
    name: "Paper Texture",
    config: {
      ...defaultConfig,
      grainSize: 180,
      opacity: 8,
      blendMode: "soft-light",
      baseColor: "#f5f5dc",
    },
  },
  {
    name: "Minimal",
    config: {
      ...defaultConfig,
      grainSize: 300,
      opacity: 3,
      blendMode: "overlay",
    },
  },
];

export const generateGrainSVG = (size: number): string => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
    </svg>
  `)}`;
};

export const generateDotsSVG = (size: number): string => {
  const dotSize = size / 50;
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <pattern id="dots" x="0" y="0" width="${size / 10}" height="${size / 10}" patternUnits="userSpaceOnUse">
        <circle cx="${size / 20}" cy="${size / 20}" r="${dotSize}" fill="black" opacity="0.5"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#dots)"/>
    </svg>
  `)}`;
};

export const generateLinesSVG = (size: number): string => {
  const lineWidth = size / 200;
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <pattern id="lines" x="0" y="0" width="${size / 10}" height="${size / 10}" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="${size / 10}" stroke="black" stroke-width="${lineWidth}" opacity="0.5"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#lines)"/>
    </svg>
  `)}`;
};
