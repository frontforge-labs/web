import type { TBorderRadiusConfig } from "./types";

export const defaultConfig: TBorderRadiusConfig = {
  topLeft: 8,
  topRight: 8,
  bottomRight: 8,
  bottomLeft: 8,
  unit: "px",
  elementWidth: 300,
  elementHeight: 200,
  backgroundColor: "#3b82f6",
  useAdvanced: false,
  topLeftH: 8,
  topLeftV: 8,
  topRightH: 8,
  topRightV: 8,
  bottomRightH: 8,
  bottomRightV: 8,
  bottomLeftH: 8,
  bottomLeftV: 8,
};

export const borderRadiusPresets = [
  {
    name: "None",
    config: {
      ...defaultConfig,
      topLeft: 0,
      topRight: 0,
      bottomRight: 0,
      bottomLeft: 0,
    },
  },
  {
    name: "Small",
    config: {
      ...defaultConfig,
      topLeft: 4,
      topRight: 4,
      bottomRight: 4,
      bottomLeft: 4,
    },
  },
  {
    name: "Medium",
    config: {
      ...defaultConfig,
      topLeft: 8,
      topRight: 8,
      bottomRight: 8,
      bottomLeft: 8,
    },
  },
  {
    name: "Large",
    config: {
      ...defaultConfig,
      topLeft: 16,
      topRight: 16,
      bottomRight: 16,
      bottomLeft: 16,
    },
  },
  {
    name: "XL",
    config: {
      ...defaultConfig,
      topLeft: 24,
      topRight: 24,
      bottomRight: 24,
      bottomLeft: 24,
    },
  },
  {
    name: "Pill",
    config: {
      ...defaultConfig,
      topLeft: 999,
      topRight: 999,
      bottomRight: 999,
      bottomLeft: 999,
      unit: "px" as const,
    },
  },
  {
    name: "Circle",
    config: {
      ...defaultConfig,
      topLeft: 50,
      topRight: 50,
      bottomRight: 50,
      bottomLeft: 50,
      unit: "%" as const,
      elementWidth: 200,
      elementHeight: 200,
    },
  },
  {
    name: "Squircle",
    config: {
      ...defaultConfig,
      topLeft: 30,
      topRight: 30,
      bottomRight: 30,
      bottomLeft: 30,
      unit: "%" as const,
    },
  },
  {
    name: "Leaf",
    config: {
      ...defaultConfig,
      topLeft: 0,
      topRight: 50,
      bottomRight: 50,
      bottomLeft: 0,
      unit: "%" as const,
    },
  },
  {
    name: "Speech Bubble",
    config: {
      ...defaultConfig,
      topLeft: 16,
      topRight: 16,
      bottomRight: 16,
      bottomLeft: 0,
    },
  },
  {
    name: "Organic",
    config: {
      ...defaultConfig,
      topLeft: 60,
      topRight: 25,
      bottomRight: 70,
      bottomLeft: 35,
      unit: "%" as const,
    },
  },
  {
    name: "Asymmetric",
    config: {
      ...defaultConfig,
      topLeft: 50,
      topRight: 10,
      bottomRight: 50,
      bottomLeft: 10,
    },
  },
];
