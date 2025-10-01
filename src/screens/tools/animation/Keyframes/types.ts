export interface TKeyframe {
  id: string;
  percentage: number;
  properties: {
    transform?: string;
    opacity?: number;
    backgroundColor?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
  };
}

export interface TKeyframesConfig {
  animationName: string;
  duration: number;
  timingFunction: string;
  iterationCount: string;
  direction: string;
  fillMode: string;
  playState: string;
  delay: number;
  keyframes: TKeyframe[];
}
