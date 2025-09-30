export type TGridItem = {
  id: string;
  area: string;
};

export type TGridConfig = {
  columns: number;
  rows: number;
  columnTemplate: string;
  rowTemplate: string;
  columnGap: number;
  rowGap: number;
  gridItems: number;
  useTemplateAreas: boolean;
  templateAreas: string[];
};
