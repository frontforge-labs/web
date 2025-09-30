export type TClipPathType = "polygon" | "circle" | "ellipse" | "inset";

export type TPolygonPoint = {
  x: number;
  y: number;
};

export type TClipPathConfig = {
  type: TClipPathType;
  // Polygon
  points: TPolygonPoint[];
  // Circle
  circleRadius: number;
  circleX: number;
  circleY: number;
  // Ellipse
  ellipseRadiusX: number;
  ellipseRadiusY: number;
  ellipseX: number;
  ellipseY: number;
  // Inset
  insetTop: number;
  insetRight: number;
  insetBottom: number;
  insetLeft: number;
  insetRound: number;
  // Element
  elementWidth: number;
  elementHeight: number;
  backgroundColor: string;
};
