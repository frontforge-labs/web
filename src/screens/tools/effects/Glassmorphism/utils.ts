import type { TGlassmorphismConfig } from "./types";

export const defaultConfig: TGlassmorphismConfig = {
  backdropBlur: 10,
  backgroundColor: "#ffffff",
  backgroundOpacity: 20,
  borderWidth: 1,
  borderColor: "#ffffff",
  borderOpacity: 30,
  borderRadius: 16,
  boxShadow: true,
  elementWidth: 320,
  elementHeight: 200,
  sceneBackgroundColor: "#3b82f6",
};

export const glassmorphismPresets = [
  {
    name: "Default",
    config: defaultConfig,
  },
  {
    name: "Subtle Glass",
    config: {
      ...defaultConfig,
      backdropBlur: 8,
      backgroundOpacity: 15,
      borderOpacity: 20,
    },
  },
  {
    name: "Frosted",
    config: {
      ...defaultConfig,
      backdropBlur: 20,
      backgroundOpacity: 30,
      borderOpacity: 40,
    },
  },
  {
    name: "Heavy Frost",
    config: {
      ...defaultConfig,
      backdropBlur: 30,
      backgroundOpacity: 40,
      borderWidth: 2,
      borderOpacity: 50,
    },
  },
  {
    name: "Dark Glass",
    config: {
      ...defaultConfig,
      backgroundColor: "#000000",
      backgroundOpacity: 40,
      borderColor: "#ffffff",
      borderOpacity: 20,
      backdropBlur: 12,
    },
  },
  {
    name: "Vibrant",
    config: {
      ...defaultConfig,
      backdropBlur: 15,
      backgroundOpacity: 25,
      borderColor: "#8b5cf6",
      borderOpacity: 50,
      borderWidth: 2,
    },
  },
  {
    name: "Minimal",
    config: {
      ...defaultConfig,
      backdropBlur: 5,
      backgroundOpacity: 10,
      borderWidth: 0,
      borderOpacity: 0,
      boxShadow: false,
    },
  },
  {
    name: "Card",
    config: {
      ...defaultConfig,
      backdropBlur: 12,
      backgroundOpacity: 25,
      borderRadius: 12,
      boxShadow: true,
    },
  },
];
