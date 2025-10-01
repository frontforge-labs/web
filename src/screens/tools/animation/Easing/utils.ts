import type { TEasingConfig, TEasingPreset } from "./types";

export const defaultEasingConfig: TEasingConfig = {
  easingFunction: "ease",
  customBezier: {
    x1: 0.25,
    y1: 0.1,
    x2: 0.25,
    y2: 1,
  },
  duration: 2,
  isAnimating: false,
};

export const easingPresets: TEasingPreset[] = [
  {
    name: "Linear",
    value: "linear",
    bezier: [0, 0, 1, 1],
    description: "Constant speed throughout",
  },
  {
    name: "Ease",
    value: "ease",
    bezier: [0.25, 0.1, 0.25, 1],
    description: "Default easing, slow start and end",
  },
  {
    name: "Ease In",
    value: "ease-in",
    bezier: [0.42, 0, 1, 1],
    description: "Slow start, fast end",
  },
  {
    name: "Ease Out",
    value: "ease-out",
    bezier: [0, 0, 0.58, 1],
    description: "Fast start, slow end",
  },
  {
    name: "Ease In Out",
    value: "ease-in-out",
    bezier: [0.42, 0, 0.58, 1],
    description: "Slow start and end",
  },
  {
    name: "Ease In Sine",
    value: "cubic-bezier(0.12, 0, 0.39, 0)",
    bezier: [0.12, 0, 0.39, 0],
    description: "Gentle acceleration",
  },
  {
    name: "Ease Out Sine",
    value: "cubic-bezier(0.61, 1, 0.88, 1)",
    bezier: [0.61, 1, 0.88, 1],
    description: "Gentle deceleration",
  },
  {
    name: "Ease In Quad",
    value: "cubic-bezier(0.11, 0, 0.5, 0)",
    bezier: [0.11, 0, 0.5, 0],
    description: "Quadratic acceleration",
  },
  {
    name: "Ease Out Quad",
    value: "cubic-bezier(0.5, 1, 0.89, 1)",
    bezier: [0.5, 1, 0.89, 1],
    description: "Quadratic deceleration",
  },
  {
    name: "Ease In Cubic",
    value: "cubic-bezier(0.32, 0, 0.67, 0)",
    bezier: [0.32, 0, 0.67, 0],
    description: "Strong acceleration",
  },
  {
    name: "Ease Out Cubic",
    value: "cubic-bezier(0.33, 1, 0.68, 1)",
    bezier: [0.33, 1, 0.68, 1],
    description: "Strong deceleration",
  },
  {
    name: "Ease In Back",
    value: "cubic-bezier(0.36, 0, 0.66, -0.56)",
    bezier: [0.36, 0, 0.66, -0.56],
    description: "Anticipation before moving",
  },
  {
    name: "Ease Out Back",
    value: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    bezier: [0.34, 1.56, 0.64, 1],
    description: "Overshoot and settle",
  },
  {
    name: "Material",
    value: "cubic-bezier(0.4, 0, 0.2, 1)",
    bezier: [0.4, 0, 0.2, 1],
    description: "Material Design standard",
  },
  {
    name: "Material Decelerate",
    value: "cubic-bezier(0, 0, 0.2, 1)",
    bezier: [0, 0, 0.2, 1],
    description: "Material Design decelerate",
  },
  {
    name: "Material Accelerate",
    value: "cubic-bezier(0.4, 0, 1, 1)",
    bezier: [0.4, 0, 1, 1],
    description: "Material Design accelerate",
  },
];

export const generateEasingCSS = (config: TEasingConfig): string => {
  const easingValue =
    config.easingFunction === "custom"
      ? `cubic-bezier(${config.customBezier.x1}, ${config.customBezier.y1}, ${config.customBezier.x2}, ${config.customBezier.y2})`
      : config.easingFunction;

  return `/* Easing Function Usage */

/* In Transitions */
.element {
  transition: all ${config.duration}s ${easingValue};
}

/* In Animations */
.element {
  animation: slideIn ${config.duration}s ${easingValue};
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Custom Cubic Bezier */
/* cubic-bezier(${config.customBezier.x1}, ${config.customBezier.y1}, ${config.customBezier.x2}, ${config.customBezier.y2}) */`;
};

// Helper to generate bezier curve path for SVG
export const generateBezierCurvePath = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  width: number,
  height: number
): string => {
  const startX = 0;
  const startY = height;
  const endX = width;
  const endY = 0;

  const cp1X = x1 * width;
  const cp1Y = height - y1 * height;
  const cp2X = x2 * width;
  const cp2Y = height - y2 * height;

  return `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
};
