export interface TEasingConfig {
  easingFunction: string;
  customBezier: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
  duration: number;
  isAnimating: boolean;
}

export interface TEasingPreset {
  name: string;
  value: string;
  bezier?: [number, number, number, number];
  description: string;
}
