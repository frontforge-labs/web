// CSS Generator specific types
export type TGradientStop = {
  color: string;
  position: number;
};

export type TGradientConfig = {
  type: "linear" | "radial";
  angle: number;
  stops: TGradientStop[];
};

export type TBoxShadowLayer = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
};

export type TBorderRadiusConfig = {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  locked: boolean;
};
