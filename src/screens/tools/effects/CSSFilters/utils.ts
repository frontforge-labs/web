import type { TFilterConfig } from "./types";

export const defaultFilters: TFilterConfig = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  saturate: 100,
  sepia: 0,
  opacity: 100,
  dropShadowX: 0,
  dropShadowY: 0,
  dropShadowBlur: 0,
  dropShadowColor: "#000000",
};

export const filterPresets = [
  {
    name: "None",
    config: defaultFilters,
  },
  {
    name: "Grayscale",
    config: { ...defaultFilters, grayscale: 100 },
  },
  {
    name: "Sepia",
    config: { ...defaultFilters, sepia: 75 },
  },
  {
    name: "Vintage",
    config: {
      ...defaultFilters,
      sepia: 50,
      contrast: 110,
      brightness: 90,
      saturate: 120,
    },
  },
  {
    name: "High Contrast",
    config: { ...defaultFilters, contrast: 150, brightness: 110 },
  },
  {
    name: "Vivid",
    config: { ...defaultFilters, saturate: 150, contrast: 110 },
  },
  {
    name: "Blur",
    config: { ...defaultFilters, blur: 5 },
  },
  {
    name: "Invert",
    config: { ...defaultFilters, invert: 100 },
  },
  {
    name: "Warm",
    config: {
      ...defaultFilters,
      sepia: 30,
      saturate: 120,
      brightness: 105,
      hueRotate: 10,
    },
  },
  {
    name: "Cool",
    config: {
      ...defaultFilters,
      hueRotate: 180,
      saturate: 110,
      brightness: 105,
    },
  },
  {
    name: "Dramatic",
    config: {
      ...defaultFilters,
      contrast: 150,
      brightness: 90,
      saturate: 130,
      dropShadowX: 10,
      dropShadowY: 10,
      dropShadowBlur: 15,
      dropShadowColor: "#00000080",
    },
  },
  {
    name: "Faded",
    config: {
      ...defaultFilters,
      opacity: 70,
      saturate: 80,
      brightness: 110,
    },
  },
];
