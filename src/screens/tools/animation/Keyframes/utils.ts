import type { TKeyframesConfig } from "./types";

export const defaultKeyframesConfig: TKeyframesConfig = {
  animationName: "myAnimation",
  duration: 2,
  timingFunction: "ease",
  iterationCount: "infinite",
  direction: "normal",
  fillMode: "none",
  playState: "running",
  delay: 0,
  keyframes: [
    {
      id: "1",
      percentage: 0,
      properties: {
        transform: "translateX(0px) scale(1)",
        opacity: 1,
      },
    },
    {
      id: "2",
      percentage: 50,
      properties: {
        transform: "translateX(100px) scale(1.2)",
        opacity: 0.7,
      },
    },
    {
      id: "3",
      percentage: 100,
      properties: {
        transform: "translateX(0px) scale(1)",
        opacity: 1,
      },
    },
  ],
};

export const keyframesPresets: Record<
  string,
  Omit<TKeyframesConfig, "animationName">
> = {
  "Fade In": {
    duration: 1,
    timingFunction: "ease-in",
    iterationCount: "1",
    direction: "normal",
    fillMode: "forwards",
    playState: "running",
    delay: 0,
    keyframes: [
      {
        id: "1",
        percentage: 0,
        properties: { opacity: 0 },
      },
      {
        id: "2",
        percentage: 100,
        properties: { opacity: 1 },
      },
    ],
  },
  Bounce: {
    duration: 1.5,
    timingFunction: "ease",
    iterationCount: "infinite",
    direction: "normal",
    fillMode: "none",
    playState: "running",
    delay: 0,
    keyframes: [
      {
        id: "1",
        percentage: 0,
        properties: { transform: "translateY(0px)" },
      },
      {
        id: "2",
        percentage: 25,
        properties: { transform: "translateY(-30px)" },
      },
      {
        id: "3",
        percentage: 50,
        properties: { transform: "translateY(0px)" },
      },
      {
        id: "4",
        percentage: 75,
        properties: { transform: "translateY(-15px)" },
      },
      {
        id: "5",
        percentage: 100,
        properties: { transform: "translateY(0px)" },
      },
    ],
  },
  Pulse: {
    duration: 2,
    timingFunction: "ease-in-out",
    iterationCount: "infinite",
    direction: "normal",
    fillMode: "none",
    playState: "running",
    delay: 0,
    keyframes: [
      {
        id: "1",
        percentage: 0,
        properties: { transform: "scale(1)", opacity: 1 },
      },
      {
        id: "2",
        percentage: 50,
        properties: { transform: "scale(1.1)", opacity: 0.8 },
      },
      {
        id: "3",
        percentage: 100,
        properties: { transform: "scale(1)", opacity: 1 },
      },
    ],
  },
  Shake: {
    duration: 0.8,
    timingFunction: "ease-in-out",
    iterationCount: "1",
    direction: "normal",
    fillMode: "none",
    playState: "running",
    delay: 0,
    keyframes: [
      {
        id: "1",
        percentage: 0,
        properties: { transform: "translateX(0px)" },
      },
      {
        id: "2",
        percentage: 25,
        properties: { transform: "translateX(-10px)" },
      },
      {
        id: "3",
        percentage: 50,
        properties: { transform: "translateX(10px)" },
      },
      {
        id: "4",
        percentage: 75,
        properties: { transform: "translateX(-10px)" },
      },
      {
        id: "5",
        percentage: 100,
        properties: { transform: "translateX(0px)" },
      },
    ],
  },
  "Slide In": {
    duration: 1,
    timingFunction: "ease-out",
    iterationCount: "1",
    direction: "normal",
    fillMode: "forwards",
    playState: "running",
    delay: 0,
    keyframes: [
      {
        id: "1",
        percentage: 0,
        properties: { transform: "translateX(-100%)", opacity: 0 },
      },
      {
        id: "2",
        percentage: 100,
        properties: { transform: "translateX(0)", opacity: 1 },
      },
    ],
  },
  Rotate: {
    duration: 2,
    timingFunction: "linear",
    iterationCount: "infinite",
    direction: "normal",
    fillMode: "none",
    playState: "running",
    delay: 0,
    keyframes: [
      {
        id: "1",
        percentage: 0,
        properties: { transform: "rotate(0deg)" },
      },
      {
        id: "2",
        percentage: 100,
        properties: { transform: "rotate(360deg)" },
      },
    ],
  },
  "Color Shift": {
    duration: 3,
    timingFunction: "ease-in-out",
    iterationCount: "infinite",
    direction: "alternate",
    fillMode: "none",
    playState: "running",
    delay: 0,
    keyframes: [
      {
        id: "1",
        percentage: 0,
        properties: { backgroundColor: "#3b82f6" },
      },
      {
        id: "2",
        percentage: 33,
        properties: { backgroundColor: "#8b5cf6" },
      },
      {
        id: "3",
        percentage: 66,
        properties: { backgroundColor: "#ec4899" },
      },
      {
        id: "4",
        percentage: 100,
        properties: { backgroundColor: "#3b82f6" },
      },
    ],
  },
  "Morph Shape": {
    duration: 2,
    timingFunction: "ease-in-out",
    iterationCount: "infinite",
    direction: "alternate",
    fillMode: "none",
    playState: "running",
    delay: 0,
    keyframes: [
      {
        id: "1",
        percentage: 0,
        properties: { borderRadius: "0%", transform: "rotate(0deg)" },
      },
      {
        id: "2",
        percentage: 50,
        properties: { borderRadius: "50%", transform: "rotate(180deg)" },
      },
      {
        id: "3",
        percentage: 100,
        properties: { borderRadius: "0%", transform: "rotate(360deg)" },
      },
    ],
  },
};

export const generateKeyframesCSS = (config: TKeyframesConfig): string => {
  const sortedKeyframes = [...config.keyframes].sort(
    (a, b) => a.percentage - b.percentage
  );

  const keyframesRules = sortedKeyframes
    .map((kf) => {
      const props = Object.entries(kf.properties)
        .filter(([, value]) => value !== undefined && value !== "")
        .map(([key, value]) => {
          const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
          return `    ${cssKey}: ${value};`;
        })
        .join("\n");

      return `  ${kf.percentage}% {\n${props}\n  }`;
    })
    .join("\n\n");

  const animation = `
/* Animation Definition */
@keyframes ${config.animationName} {
${keyframesRules}
}

/* Apply Animation */
.${config.animationName} {
  animation-name: ${config.animationName};
  animation-duration: ${config.duration}s;
  animation-timing-function: ${config.timingFunction};
  animation-iteration-count: ${config.iterationCount};
  animation-direction: ${config.direction};
  animation-fill-mode: ${config.fillMode};
  animation-play-state: ${config.playState};
  animation-delay: ${config.delay}s;
}

/* Shorthand */
.${config.animationName}-shorthand {
  animation: ${config.animationName} ${config.duration}s ${config.timingFunction} ${config.delay}s ${config.iterationCount} ${config.direction} ${config.fillMode} ${config.playState};
}`.trim();

  return animation;
};
