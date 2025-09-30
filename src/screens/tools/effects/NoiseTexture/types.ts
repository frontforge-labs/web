export type TNoiseTextureConfig = {
  noiseType: "grain" | "dots" | "lines";
  grainSize: number;
  opacity: number;
  baseColor: string;
  noiseColor: string;
  blendMode: string;
  scale: number;
};
