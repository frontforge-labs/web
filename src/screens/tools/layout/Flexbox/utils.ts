import type { TFlexboxConfig, TFlexItemConfig } from "./types";

export function generateItemId(): string {
  return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function createDefaultItem(): TFlexItemConfig {
  return {
    id: generateItemId(),
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    alignSelf: "auto",
    order: 0,
  };
}

export const defaultConfig: TFlexboxConfig = {
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "stretch",
  alignContent: "stretch",
  flexWrap: "nowrap",
  gap: 8,
  itemCount: 3,
  containerHeight: 300,
  activeItemIndex: 0,
  itemConfigs: [
    createDefaultItem(),
    createDefaultItem(),
    createDefaultItem(),
  ],
};

export const flexboxPresets = [
  {
    name: "Centered",
    config: {
      ...defaultConfig,
      justifyContent: "center" as const,
      alignItems: "center" as const,
    },
  },
  {
    name: "Space Between",
    config: {
      ...defaultConfig,
      justifyContent: "space-between" as const,
      alignItems: "center" as const,
    },
  },
  {
    name: "Navigation Bar",
    config: {
      ...defaultConfig,
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      alignItems: "center" as const,
    },
  },
  {
    name: "Card Layout",
    config: {
      ...defaultConfig,
      flexDirection: "row" as const,
      flexWrap: "wrap" as const,
      gap: 16,
      itemCount: 6,
    },
  },
  {
    name: "Column Stack",
    config: {
      ...defaultConfig,
      flexDirection: "column" as const,
      alignItems: "stretch" as const,
    },
  },
  {
    name: "Holy Grail",
    config: {
      ...defaultConfig,
      flexDirection: "column" as const,
      itemCount: 3,
      itemConfigs: [
        { ...createDefaultItem(), flexGrow: 0 },
        { ...createDefaultItem(), flexGrow: 1 },
        { ...createDefaultItem(), flexGrow: 0 },
      ],
    },
  },
];
