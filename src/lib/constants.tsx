import {
  Palette,
  Type,
  Sparkles,
  Shapes,
  LayoutGrid,
  Zap,
  FileJson,
  FileText,
} from "lucide-react";

export interface Tool {
  name: string;
  path: string;
  status: "ready" | "coming-soon" | "planned";
}

export interface ToolCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
  {
    id: "color",
    title: "Color Tools",
    description: "Generate gradients, pick colors, and build palettes",
    icon: <Palette size={24} />,
    color: "from-blue-500 to-purple-600",
    tools: [
      { name: "CSS Gradient", path: "/tools/color/gradient", status: "ready" },
      { name: "Color Studio", path: "/tools/color/studio", status: "ready" },
      { name: "Contrast Checker", path: "/tools/color/contrast", status: "ready" },
      {
        name: "Palette Builder",
        path: "/tools/color/palette",
        status: "ready",
      },
    ],
  },
  {
    id: "typography",
    title: "Typography",
    description: "Text effects, font pairing, and typography tools",
    icon: <Type size={24} />,
    color: "from-green-500 to-teal-600",
    tools: [
      {
        name: "Font Pairing Previewer",
        path: "/tools/typography/font-pairing",
        status: "ready",
      },
      {
        name: "Text Shadow Generator",
        path: "/tools/typography/text-shadow",
        status: "ready",
      },
      {
        name: "Gradient Text Generator",
        path: "/tools/typography/gradient-text",
        status: "ready",
      },
      {
        name: "Variable Font Playground",
        path: "/tools/typography/variable-fonts",
        status: "ready",
      },
    ],
  },
  {
    id: "effects",
    title: "Effects & Filters",
    description: "Box shadows, CSS filters, and visual effects",
    icon: <Sparkles size={24} />,
    color: "from-orange-500 to-red-600",
    tools: [
      {
        name: "Box Shadow Generator",
        path: "/tools/effects/box-shadow",
        status: "ready",
      },
      {
        name: "CSS Filter Playground",
        path: "/tools/effects/filters",
        status: "ready",
      },
      {
        name: "Glassmorphism Generator",
        path: "/tools/effects/glassmorphism",
        status: "ready",
      },
      {
        name: "Noise Texture Generator",
        path: "/tools/effects/noise-texture",
        status: "ready",
      },
    ],
  },
  {
    id: "shapes",
    title: "Shapes & Layout",
    description: "Border radius, clip paths, and shape generators",
    icon: <Shapes size={24} />,
    color: "from-purple-500 to-pink-600",
    tools: [
      {
        name: "Border Radius Previewer",
        path: "/tools/shapes/border-radius",
        status: "ready",
      },
      {
        name: "Clip-Path Maker",
        path: "/tools/shapes/clip-path",
        status: "ready",
      },
      {
        name: "Blob Shape Generator",
        path: "/tools/shapes/blob-generator",
        status: "ready",
      },
      {
        name: "SVG Path Visualizer",
        path: "/tools/shapes/svg-path",
        status: "ready",
      },
    ],
  },
  {
    id: "layout",
    title: "Layout Tools",
    description: "Flexbox playground, grid generator, and layout helpers",
    icon: <LayoutGrid size={24} />,
    color: "from-cyan-500 to-blue-600",
    tools: [
      {
        name: "Flexbox Playground",
        path: "/tools/layout/flexbox",
        status: "ready",
      },
      {
        name: "Grid Generator",
        path: "/tools/layout/grid",
        status: "ready",
      },
      {
        name: "CSS Positioning Playground",
        path: "/tools/layout/positioning",
        status: "ready",
      },
      {
        name: "Responsive Breakpoint Tester",
        path: "/tools/layout/breakpoints",
        status: "ready",
      },
    ],
  },
  {
    id: "animation",
    title: "Animation",
    description: "Keyframe builder, transitions, and easing visualizer",
    icon: <Zap size={24} />,
    color: "from-yellow-500 to-orange-600",
    tools: [
      {
        name: "Keyframes Generator",
        path: "/tools/animation/keyframes",
        status: "ready",
      },
      {
        name: "Transition Playground",
        path: "/tools/animation/transitions",
        status: "ready",
      },
      {
        name: "Easing Curve Visualizer",
        path: "/tools/animation/easing",
        status: "ready",
      },
      {
        name: "Scroll Animation Builder",
        path: "/tools/animation/scroll-animations",
        status: "ready",
      },
    ],
  },
  {
    id: "dev-tools",
    title: "Dev Tools",
    description: "JSON formatter, text diff, and developer utilities",
    icon: <FileJson size={24} />,
    color: "from-slate-500 to-gray-600",
    tools: [
      {
        name: "JSON Formatter & Validator",
        path: "/tools/dev/json-formatter",
        status: "ready",
      },
      {
        name: "RegEx Tester",
        path: "/tools/dev/regex-tester",
        status: "ready",
      },
      {
        name: "Minifier/Beautifier",
        path: "/tools/dev/minifier",
        status: "ready",
      },
      {
        name: "Diff Viewer",
        path: "/tools/dev/diff-viewer",
        status: "ready",
      },
    ],
  },
  {
    id: "text-tools",
    title: "Text Utilities",
    description: "Text transformers, encoders, and string utilities",
    icon: <FileText size={24} />,
    color: "from-indigo-500 to-purple-600",
    tools: [
      {
        name: "Case Converter",
        path: "/tools/text/case-converter",
        status: "ready",
      },
      {
        name: "Lorem Ipsum Generator",
        path: "/tools/text/lorem-ipsum",
        status: "ready",
      },
      {
        name: "Slugify Tool",
        path: "/tools/text/slugify",
        status: "ready",
      },
      {
        name: "Base64 Encoder/Decoder",
        path: "/tools/text/base64",
        status: "ready",
      },
    ],
  },
];
