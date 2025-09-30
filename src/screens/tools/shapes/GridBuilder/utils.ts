import type { TGridConfig } from "./types";

export const defaultConfig: TGridConfig = {
  columns: 3,
  rows: 3,
  columnTemplate: "1fr 1fr 1fr",
  rowTemplate: "100px 100px 100px",
  columnGap: 16,
  rowGap: 16,
  gridItems: 9,
  useTemplateAreas: false,
  templateAreas: [],
};

export const gridPresets = [
  {
    name: "3-Column Layout",
    config: {
      ...defaultConfig,
      columns: 3,
      rows: 1,
      columnTemplate: "1fr 1fr 1fr",
      rowTemplate: "auto",
      gridItems: 3,
    },
  },
  {
    name: "Sidebar Left",
    config: {
      ...defaultConfig,
      columns: 2,
      rows: 1,
      columnTemplate: "250px 1fr",
      rowTemplate: "auto",
      gridItems: 2,
    },
  },
  {
    name: "Sidebar Right",
    config: {
      ...defaultConfig,
      columns: 2,
      rows: 1,
      columnTemplate: "1fr 250px",
      rowTemplate: "auto",
      gridItems: 2,
    },
  },
  {
    name: "Holy Grail",
    config: {
      ...defaultConfig,
      columns: 3,
      rows: 3,
      columnTemplate: "200px 1fr 200px",
      rowTemplate: "auto 1fr auto",
      useTemplateAreas: true,
      templateAreas: [
        "header header header",
        "sidebar content aside",
        "footer footer footer",
      ],
      gridItems: 5,
    },
  },
  {
    name: "Magazine",
    config: {
      ...defaultConfig,
      columns: 4,
      rows: 3,
      columnTemplate: "1fr 1fr 1fr 1fr",
      rowTemplate: "200px 200px 200px",
      gridItems: 6,
    },
  },
  {
    name: "Card Grid",
    config: {
      ...defaultConfig,
      columns: 3,
      rows: 2,
      columnTemplate: "repeat(3, 1fr)",
      rowTemplate: "repeat(2, 250px)",
      gridItems: 6,
      columnGap: 20,
      rowGap: 20,
    },
  },
  {
    name: "Auto-Fill Responsive",
    config: {
      ...defaultConfig,
      columns: 0,
      rows: 1,
      columnTemplate: "repeat(auto-fill, minmax(200px, 1fr))",
      rowTemplate: "auto",
      gridItems: 6,
    },
  },
  {
    name: "12-Column System",
    config: {
      ...defaultConfig,
      columns: 12,
      rows: 1,
      columnTemplate: "repeat(12, 1fr)",
      rowTemplate: "auto",
      gridItems: 12,
      columnGap: 12,
    },
  },
];

export function generateId(): string {
  return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
