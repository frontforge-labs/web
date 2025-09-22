export type TTool =
  | "gradient"
  | "boxShadow"
  | "borderRadius"
  | "textShadow"
  | "transform"
  | "borderOutline"
  | "color";

export type TRule = {
  key: TTool;
  css: string;
  meta?: Record<string, unknown>;
};

export type TCssState = {
  rules: Record<TTool, TRule>;
  activeTool: TTool | null;
  applyRule: (tool: TTool, css: string, meta?: Record<string, unknown>) => void;
  setActiveTool: (tool: TTool) => void;
  resetTool: (tool: TTool) => void;
  resetAll: () => void;
  getComposedCSS: () => string;
};

export type TWorkspaceState = {
  sidebarCollapsed: boolean;
  drawerOpen: boolean;
  theme: "light" | "dark";
  layoutPreset: "generators" | "editor" | "mixed";
  setSidebarCollapsed: (collapsed: boolean) => void;
  setDrawerOpen: (open: boolean) => void;
  setTheme: (theme: "light" | "dark") => void;
  setLayoutPreset: (preset: "generators" | "editor" | "mixed") => void;
};
