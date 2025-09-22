export type TPaletteColor = {
  id: string;
  hex: string;
  name: string;
};

export type TPaletteConfig = {
  name: string;
  colors: TPaletteColor[];
  harmonyType:
    | "complementary"
    | "triadic"
    | "analogous"
    | "split-complementary"
    | "tetradic"
    | "monochromatic";
  baseColor: string;
};
