import type { TGradientConfig } from "./types";

export const gradientPresets: Array<{ name: string; config: TGradientConfig }> =
  [
    {
      name: "Sunset",
      config: {
        type: "linear",
        angle: 45,
        stops: [
          { color: "#ff7e5f", position: 0 },
          { color: "#feb47b", position: 100 },
        ],
      },
    },
    {
      name: "Ocean",
      config: {
        type: "linear",
        angle: 180,
        stops: [
          { color: "#667eea", position: 0 },
          { color: "#764ba2", position: 100 },
        ],
      },
    },
    {
      name: "Mint Fresh",
      config: {
        type: "linear",
        angle: 90,
        stops: [
          { color: "#00b4db", position: 0 },
          { color: "#0083b0", position: 100 },
        ],
      },
    },
    {
      name: "Lava",
      config: {
        type: "radial",
        angle: 0,
        stops: [
          { color: "#ff416c", position: 0 },
          { color: "#ff4b2b", position: 100 },
        ],
      },
    },
    {
      name: "Purple Haze",
      config: {
        type: "linear",
        angle: 135,
        stops: [
          { color: "#667eea", position: 0 },
          { color: "#764ba2", position: 50 },
          { color: "#f093fb", position: 100 },
        ],
      },
    },
    {
      name: "Rainbow",
      config: {
        type: "linear",
        angle: 90,
        stops: [
          { color: "#ff0000", position: 0 },
          { color: "#ff8000", position: 16.67 },
          { color: "#ffff00", position: 33.33 },
          { color: "#00ff00", position: 50 },
          { color: "#0080ff", position: 66.67 },
          { color: "#8000ff", position: 83.33 },
          { color: "#ff0080", position: 100 },
        ],
      },
    },
  ];
