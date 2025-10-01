import type { TTransitionConfig } from "./types";

export const defaultTransitionConfig: TTransitionConfig = {
  property: "all",
  duration: 0.3,
  timingFunction: "ease",
  delay: 0,
  isHovered: false,
  initialState: {
    width: "100px",
    height: "100px",
    backgroundColor: "#3b82f6",
    transform: "scale(1) rotate(0deg)",
    opacity: 1,
    borderRadius: "8px",
  },
  hoverState: {
    width: "140px",
    height: "140px",
    backgroundColor: "#8b5cf6",
    transform: "scale(1.1) rotate(5deg)",
    opacity: 0.9,
    borderRadius: "20px",
  },
};

export const transitionPresets: Record<
  string,
  Omit<TTransitionConfig, "isHovered">
> = {
  "Button Hover": {
    property: "all",
    duration: 0.2,
    timingFunction: "ease-out",
    delay: 0,
    initialState: {
      width: "120px",
      height: "40px",
      backgroundColor: "#3b82f6",
      transform: "scale(1)",
      opacity: 1,
      borderRadius: "6px",
    },
    hoverState: {
      width: "120px",
      height: "40px",
      backgroundColor: "#2563eb",
      transform: "scale(1.05)",
      opacity: 1,
      borderRadius: "6px",
    },
  },
  "Card Lift": {
    property: "all",
    duration: 0.3,
    timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    delay: 0,
    initialState: {
      width: "200px",
      height: "120px",
      backgroundColor: "#ffffff",
      transform: "translateY(0px)",
      opacity: 1,
      borderRadius: "12px",
    },
    hoverState: {
      width: "200px",
      height: "120px",
      backgroundColor: "#ffffff",
      transform: "translateY(-8px)",
      opacity: 1,
      borderRadius: "12px",
    },
  },
  "Color Fade": {
    property: "background-color",
    duration: 0.5,
    timingFunction: "ease-in-out",
    delay: 0,
    initialState: {
      width: "150px",
      height: "150px",
      backgroundColor: "#3b82f6",
      transform: "scale(1)",
      opacity: 1,
      borderRadius: "50%",
    },
    hoverState: {
      width: "150px",
      height: "150px",
      backgroundColor: "#ec4899",
      transform: "scale(1)",
      opacity: 1,
      borderRadius: "50%",
    },
  },
  "Scale Up": {
    property: "transform",
    duration: 0.4,
    timingFunction: "ease-out",
    delay: 0,
    initialState: {
      width: "100px",
      height: "100px",
      backgroundColor: "#8b5cf6",
      transform: "scale(1)",
      opacity: 1,
      borderRadius: "8px",
    },
    hoverState: {
      width: "100px",
      height: "100px",
      backgroundColor: "#8b5cf6",
      transform: "scale(1.5)",
      opacity: 1,
      borderRadius: "8px",
    },
  },
  "Rotate & Scale": {
    property: "transform",
    duration: 0.6,
    timingFunction: "ease-in-out",
    delay: 0,
    initialState: {
      width: "120px",
      height: "120px",
      backgroundColor: "#f59e0b",
      transform: "scale(1) rotate(0deg)",
      opacity: 1,
      borderRadius: "12px",
    },
    hoverState: {
      width: "120px",
      height: "120px",
      backgroundColor: "#f59e0b",
      transform: "scale(1.2) rotate(180deg)",
      opacity: 1,
      borderRadius: "12px",
    },
  },
  "Fade Out": {
    property: "opacity",
    duration: 0.5,
    timingFunction: "linear",
    delay: 0,
    initialState: {
      width: "140px",
      height: "140px",
      backgroundColor: "#10b981",
      transform: "scale(1)",
      opacity: 1,
      borderRadius: "10px",
    },
    hoverState: {
      width: "140px",
      height: "140px",
      backgroundColor: "#10b981",
      transform: "scale(1)",
      opacity: 0.3,
      borderRadius: "10px",
    },
  },
  "Morph Shape": {
    property: "all",
    duration: 0.8,
    timingFunction: "ease-in-out",
    delay: 0,
    initialState: {
      width: "120px",
      height: "120px",
      backgroundColor: "#ef4444",
      transform: "rotate(0deg)",
      opacity: 1,
      borderRadius: "10px",
    },
    hoverState: {
      width: "120px",
      height: "120px",
      backgroundColor: "#ef4444",
      transform: "rotate(90deg)",
      opacity: 1,
      borderRadius: "50%",
    },
  },
  "Grow & Blur": {
    property: "all",
    duration: 0.4,
    timingFunction: "ease-out",
    delay: 0.1,
    initialState: {
      width: "100px",
      height: "100px",
      backgroundColor: "#06b6d4",
      transform: "scale(1)",
      opacity: 1,
      borderRadius: "8px",
    },
    hoverState: {
      width: "140px",
      height: "140px",
      backgroundColor: "#06b6d4",
      transform: "scale(1)",
      opacity: 0.7,
      borderRadius: "8px",
    },
  },
};

export const generateTransitionCSS = (config: TTransitionConfig): string => {
  const initial = config.initialState;
  const hover = config.hoverState;

  return `/* Transition Example */
.element {
  /* Initial State */
  width: ${initial.width};
  height: ${initial.height};
  background-color: ${initial.backgroundColor};
  transform: ${initial.transform};
  opacity: ${initial.opacity};
  border-radius: ${initial.borderRadius};

  /* Transition Property */
  transition-property: ${config.property};
  transition-duration: ${config.duration}s;
  transition-timing-function: ${config.timingFunction};
  transition-delay: ${config.delay}s;

  /* Shorthand */
  transition: ${config.property} ${config.duration}s ${config.timingFunction} ${config.delay}s;
}

.element:hover {
  /* Hover State */
  width: ${hover.width};
  height: ${hover.height};
  background-color: ${hover.backgroundColor};
  transform: ${hover.transform};
  opacity: ${hover.opacity};
  border-radius: ${hover.borderRadius};
}`;
};
