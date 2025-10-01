import type { TClipPathConfig } from "./types";

export const defaultConfig: TClipPathConfig = {
  type: "polygon",
  points: [
    { x: 50, y: 0 },
    { x: 100, y: 50 },
    { x: 50, y: 100 },
    { x: 0, y: 50 },
  ],
  circleRadius: 50,
  circleX: 50,
  circleY: 50,
  ellipseRadiusX: 50,
  ellipseRadiusY: 35,
  ellipseX: 50,
  ellipseY: 50,
  insetTop: 10,
  insetRight: 10,
  insetBottom: 10,
  insetLeft: 10,
  insetRound: 0,
  elementWidth: 300,
  elementHeight: 300,
  backgroundColor: "#3b82f6",
};

export const clipPathPresets = [
  {
    name: "Circle",
    config: {
      ...defaultConfig,
      type: "circle" as const,
      circleRadius: 50,
      circleX: 50,
      circleY: 50,
    },
  },
  {
    name: "Triangle",
    config: {
      ...defaultConfig,
      type: "polygon" as const,
      points: [
        { x: 50, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
      ],
    },
  },
  {
    name: "Diamond",
    config: {
      ...defaultConfig,
      type: "polygon" as const,
      points: [
        { x: 50, y: 0 },
        { x: 100, y: 50 },
        { x: 50, y: 100 },
        { x: 0, y: 50 },
      ],
    },
  },
  {
    name: "Pentagon",
    config: {
      ...defaultConfig,
      type: "polygon" as const,
      points: [
        { x: 50, y: 0 },
        { x: 100, y: 38 },
        { x: 82, y: 100 },
        { x: 18, y: 100 },
        { x: 0, y: 38 },
      ],
    },
  },
  {
    name: "Hexagon",
    config: {
      ...defaultConfig,
      type: "polygon" as const,
      points: [
        { x: 25, y: 0 },
        { x: 75, y: 0 },
        { x: 100, y: 50 },
        { x: 75, y: 100 },
        { x: 25, y: 100 },
        { x: 0, y: 50 },
      ],
    },
  },
  {
    name: "Star",
    config: {
      ...defaultConfig,
      type: "polygon" as const,
      points: [
        { x: 50, y: 0 },
        { x: 61, y: 35 },
        { x: 98, y: 35 },
        { x: 68, y: 57 },
        { x: 79, y: 91 },
        { x: 50, y: 70 },
        { x: 21, y: 91 },
        { x: 32, y: 57 },
        { x: 2, y: 35 },
        { x: 39, y: 35 },
      ],
    },
  },
  {
    name: "Arrow Right",
    config: {
      ...defaultConfig,
      type: "polygon" as const,
      points: [
        { x: 0, y: 20 },
        { x: 60, y: 20 },
        { x: 60, y: 0 },
        { x: 100, y: 50 },
        { x: 60, y: 100 },
        { x: 60, y: 80 },
        { x: 0, y: 80 },
      ],
    },
  },
  {
    name: "Chevron",
    config: {
      ...defaultConfig,
      type: "polygon" as const,
      points: [
        { x: 0, y: 0 },
        { x: 75, y: 0 },
        { x: 100, y: 50 },
        { x: 75, y: 100 },
        { x: 0, y: 100 },
        { x: 25, y: 50 },
      ],
    },
  },
  {
    name: "Trapezoid",
    config: {
      ...defaultConfig,
      type: "polygon" as const,
      points: [
        { x: 20, y: 0 },
        { x: 80, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
      ],
    },
  },
  {
    name: "Parallelogram",
    config: {
      ...defaultConfig,
      type: "polygon" as const,
      points: [
        { x: 25, y: 0 },
        { x: 100, y: 0 },
        { x: 75, y: 100 },
        { x: 0, y: 100 },
      ],
    },
  },
  {
    name: "Ellipse",
    config: {
      ...defaultConfig,
      type: "ellipse" as const,
      ellipseRadiusX: 50,
      ellipseRadiusY: 35,
      ellipseX: 50,
      ellipseY: 50,
    },
  },
  {
    name: "Rounded Inset",
    config: {
      ...defaultConfig,
      type: "inset" as const,
      insetTop: 10,
      insetRight: 10,
      insetBottom: 10,
      insetLeft: 10,
      insetRound: 20,
    },
  },
];
