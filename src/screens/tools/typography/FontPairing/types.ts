// Font Pairing Tool types
export type TFontPair = {
  name: string;
  heading: string;
  body: string;
  display: string;
};

export type TFontWeight = {
  value: string;
  label: string;
};

export type TFontPairingConfig = {
  headingFont: string;
  bodyFont: string;
  headingSize: number;
  bodySize: number;
  headingWeight: string;
  bodyWeight: string;
  lineHeight: number;
  letterSpacing: number;
  headingText: string;
  bodyText: string;
  currentPair: TFontPair;
};