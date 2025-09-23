// Text Shadow Tool types
export type TShadowLayer = {
  id: string;
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  color: string;
  enabled: boolean;
};

export type TTextShadowConfig = {
  text: string;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  textColor: string;
  backgroundColor: string;
  shadows: TShadowLayer[];
};