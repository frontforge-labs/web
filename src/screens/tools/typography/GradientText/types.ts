// Gradient Text Tool types
export type TGradientStop = {
  id: string;
  color: string;
  position: number;
};

export type TGradientTextConfig = {
  text: string;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  direction: number;
  gradientType: 'linear' | 'radial';
  stops: TGradientStop[];
  backgroundClip: boolean;
  fallbackColor: string;
};