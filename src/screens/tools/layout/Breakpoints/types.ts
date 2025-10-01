export type TBreakpoint = {
  name: string;
  width: number;
  height: number;
  description: string;
};

export type TBreakpointConfig = {
  activeBreakpoint: string;
  customWidth: number;
  customHeight: number;
  orientation: "portrait" | "landscape";
  showRuler: boolean;
  contentUrl: string;
};
