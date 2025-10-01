import type { TPositioningConfig } from "./types";

export const defaultConfig: TPositioningConfig = {
  position: "relative",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 0,
  elementWidth: 200,
  elementHeight: 100,
  backgroundColor: "#3b82f6",
  containerHeight: 400,
  showContainer: true,
  showReference: true,
};

export const positioningPresets = [
  {
    name: "Static (Default)",
    config: {
      ...defaultConfig,
      position: "static" as const,
      top: 0,
      left: 0,
    },
  },
  {
    name: "Relative Offset",
    config: {
      ...defaultConfig,
      position: "relative" as const,
      top: 20,
      left: 20,
    },
  },
  {
    name: "Absolute Centered",
    config: {
      ...defaultConfig,
      position: "absolute" as const,
      top: 50,
      left: 50,
    },
  },
  {
    name: "Absolute Top-Right",
    config: {
      ...defaultConfig,
      position: "absolute" as const,
      top: 10,
      right: 10,
      left: 0,
      bottom: 0,
    },
  },
  {
    name: "Fixed Header",
    config: {
      ...defaultConfig,
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      elementHeight: 60,
      elementWidth: 0,
    },
  },
  {
    name: "Sticky Nav",
    config: {
      ...defaultConfig,
      position: "sticky" as const,
      top: 0,
      left: 0,
    },
  },
];
