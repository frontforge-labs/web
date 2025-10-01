export type TFlexboxConfig = {
  // Container properties
  flexDirection: "row" | "row-reverse" | "column" | "column-reverse";
  justifyContent: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  alignItems: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  alignContent: "flex-start" | "flex-end" | "center" | "stretch" | "space-between" | "space-around";
  flexWrap: "nowrap" | "wrap" | "wrap-reverse";
  gap: number;
  // Item count
  itemCount: number;
  // Container size
  containerHeight: number;
  // Active item for individual controls
  activeItemIndex: number;
  // Item-specific properties
  itemConfigs: TFlexItemConfig[];
};

export type TFlexItemConfig = {
  id: string;
  flexGrow: number;
  flexShrink: number;
  flexBasis: string;
  alignSelf: "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  order: number;
};
