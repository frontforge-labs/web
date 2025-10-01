export type TPositionType = "static" | "relative" | "absolute" | "fixed" | "sticky";

export type TPositioningConfig = {
  position: TPositionType;
  top: number;
  right: number;
  bottom: number;
  left: number;
  zIndex: number;
  // Element properties
  elementWidth: number;
  elementHeight: number;
  backgroundColor: string;
  // Container
  containerHeight: number;
  showContainer: boolean;
  // Reference elements
  showReference: boolean;
};
