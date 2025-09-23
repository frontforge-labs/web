// Variable Fonts Tool types
export type TVariableAxis = {
  tag: string;
  name: string;
  min: number;
  max: number;
  default: number;
  current: number;
};

export type TVariableFontConfig = {
  selectedFont: string;
  text: string;
  fontSize: number;
  axes: TVariableAxis[];
  isAnimating: boolean;
  animationDuration: number;
};