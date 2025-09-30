import type { TShadowLayer } from "./types";

export function generateId(): string {
  return `shadow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export const shadowPresets = [
  {
    name: "Subtle",
    shadows: [
      {
        offsetX: 0,
        offsetY: 1,
        blurRadius: 3,
        spreadRadius: 0,
        color: "#0000001a",
        inset: false,
        enabled: true,
      },
      {
        offsetX: 0,
        offsetY: 1,
        blurRadius: 2,
        spreadRadius: 0,
        color: "#0000000f",
        inset: false,
        enabled: true,
      },
    ] as Omit<TShadowLayer, "id">[],
  },
  {
    name: "Material",
    shadows: [
      {
        offsetX: 0,
        offsetY: 2,
        blurRadius: 4,
        spreadRadius: -1,
        color: "#00000033",
        inset: false,
        enabled: true,
      },
      {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 6,
        spreadRadius: -1,
        color: "#0000001f",
        inset: false,
        enabled: true,
      },
    ] as Omit<TShadowLayer, "id">[],
  },
  {
    name: "Elevated",
    shadows: [
      {
        offsetX: 0,
        offsetY: 10,
        blurRadius: 15,
        spreadRadius: -3,
        color: "#0000001a",
        inset: false,
        enabled: true,
      },
      {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 6,
        spreadRadius: -2,
        color: "#0000000f",
        inset: false,
        enabled: true,
      },
    ] as Omit<TShadowLayer, "id">[],
  },
  {
    name: "Floating",
    shadows: [
      {
        offsetX: 0,
        offsetY: 20,
        blurRadius: 25,
        spreadRadius: -5,
        color: "#00000026",
        inset: false,
        enabled: true,
      },
      {
        offsetX: 0,
        offsetY: 10,
        blurRadius: 10,
        spreadRadius: -5,
        color: "#0000001a",
        inset: false,
        enabled: true,
      },
    ] as Omit<TShadowLayer, "id">[],
  },
  {
    name: "Inset",
    shadows: [
      {
        offsetX: 0,
        offsetY: 2,
        blurRadius: 4,
        spreadRadius: 0,
        color: "#00000026",
        inset: true,
        enabled: true,
      },
    ] as Omit<TShadowLayer, "id">[],
  },
  {
    name: "Glow",
    shadows: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 20,
        spreadRadius: 0,
        color: "#3b82f680",
        inset: false,
        enabled: true,
      },
    ] as Omit<TShadowLayer, "id">[],
  },
  {
    name: "Neon",
    shadows: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 10,
        spreadRadius: 0,
        color: "#8b5cf6",
        inset: false,
        enabled: true,
      },
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 20,
        spreadRadius: 0,
        color: "#8b5cf680",
        inset: false,
        enabled: true,
      },
    ] as Omit<TShadowLayer, "id">[],
  },
  {
    name: "Pressed",
    shadows: [
      {
        offsetX: 0,
        offsetY: 1,
        blurRadius: 2,
        spreadRadius: 0,
        color: "#00000033",
        inset: true,
        enabled: true,
      },
    ] as Omit<TShadowLayer, "id">[],
  },
];
