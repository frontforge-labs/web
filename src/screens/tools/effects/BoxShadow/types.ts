export type TShadowLayer = {
  id: string;
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  spreadRadius: number;
  color: string;
  inset: boolean;
  enabled: boolean;
};

export type TBoxShadowConfig = {
  backgroundColor: string;
  borderRadius: number;
  elementWidth: number;
  elementHeight: number;
  shadows: TShadowLayer[];
};
