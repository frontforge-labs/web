export type TTool =
  | "gradient"
  | "boxShadow"
  | "borderRadius"
  | "textShadow"
  | "transform"
  | "borderOutline"
  | "color";

export interface TRule {
  key: TTool;
  css: string;
  meta?: Record<string, unknown>;
}

export interface CssState {
  rules: Record<TTool, TRule>;
  activeTool: TTool | null;
  applyRule: (tool: TTool, css: string, meta?: Record<string, unknown>) => void;
  setActiveTool: (tool: TTool) => void;
  resetTool: (tool: TTool) => void;
  resetAll: () => void;
  getComposedCSS: () => string;
}

export interface WorkspaceState {
  sidebarCollapsed: boolean;
  drawerOpen: boolean;
  theme: "light" | "dark";
  layoutPreset: "generators" | "editor" | "mixed";
  setSidebarCollapsed: (collapsed: boolean) => void;
  setDrawerOpen: (open: boolean) => void;
  setTheme: (theme: "light" | "dark") => void;
  setLayoutPreset: (preset: "generators" | "editor" | "mixed") => void;
}

// CSS Generator specific types
export interface GradientStop {
  color: string;
  position: number;
}

export interface GradientConfig {
  type: "linear" | "radial";
  angle: number;
  stops: GradientStop[];
}

export interface BoxShadowLayer {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

export interface BorderRadiusConfig {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  locked: boolean;
}