import {
  Palette,
  Type,
  Sparkles,
  Shapes,
  LayoutGrid,
  Zap,
  FileJson,
  FileText
} from 'lucide-react';

export interface Tool {
  name: string;
  path: string;
  status: 'ready' | 'coming-soon' | 'planned';
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
    id: 'color',
    title: 'Color Tools',
    description: 'Generate gradients, pick colors, and build palettes',
    icon: <Palette size={24} />,
    color: 'from-blue-500 to-purple-600',
    tools: [
      { name: 'CSS Gradient', path: '/tools/color/gradient', status: 'ready' },
      { name: 'Color Picker', path: '/tools/color/picker', status: 'coming-soon' },
      { name: 'Palette Builder', path: '/tools/color/palette', status: 'coming-soon' },
      { name: 'Color Converter', path: '/tools/color/converter', status: 'coming-soon' },
    ]
  },
  {
    id: 'typography',
    title: 'Typography',
    description: 'Text effects, font pairing, and typography tools',
    icon: <Type size={24} />,
    color: 'from-green-500 to-teal-600',
    tools: [
      { name: 'Text Shadow', path: '/tools/typography/text-shadow', status: 'coming-soon' },
      { name: 'Font Pairing', path: '/tools/typography/font-pairing', status: 'coming-soon' },
    ]
  },
  {
    id: 'effects',
    title: 'Effects & Filters',
    description: 'Box shadows, CSS filters, and visual effects',
    icon: <Sparkles size={24} />,
    color: 'from-orange-500 to-red-600',
    tools: [
      { name: 'Box Shadow', path: '/tools/effects/box-shadow', status: 'coming-soon' },
      { name: 'CSS Filters', path: '/tools/effects/filters', status: 'coming-soon' },
    ]
  },
  {
    id: 'shapes',
    title: 'Shapes & Layout',
    description: 'Border radius, clip paths, and shape generators',
    icon: <Shapes size={24} />,
    color: 'from-purple-500 to-pink-600',
    tools: [
      { name: 'Border Radius', path: '/tools/shapes/border-radius', status: 'coming-soon' },
      { name: 'Clip Path', path: '/tools/shapes/clip-path', status: 'coming-soon' },
    ]
  },
  {
    id: 'layout',
    title: 'Layout Tools',
    description: 'Flexbox playground, grid generator, and layout helpers',
    icon: <LayoutGrid size={24} />,
    color: 'from-cyan-500 to-blue-600',
    tools: [
      { name: 'Flexbox Playground', path: '/tools/layout/flexbox', status: 'planned' },
      { name: 'Grid Generator', path: '/tools/layout/grid', status: 'planned' },
    ]
  },
  {
    id: 'animation',
    title: 'Animation',
    description: 'Keyframe builder, transitions, and easing visualizer',
    icon: <Zap size={24} />,
    color: 'from-yellow-500 to-orange-600',
    tools: [
      { name: 'Keyframe Builder', path: '/tools/animation/keyframes', status: 'planned' },
      { name: 'Easing Visualizer', path: '/tools/animation/easing', status: 'planned' },
    ]
  },
  {
    id: 'dev-tools',
    title: 'Dev Tools',
    description: 'JSON formatter, text diff, and developer utilities',
    icon: <FileJson size={24} />,
    color: 'from-slate-500 to-gray-600',
    tools: [
      { name: 'JSON Formatter', path: '/tools/dev/json-formatter', status: 'planned' },
      { name: 'Text Diff', path: '/tools/dev/text-diff', status: 'planned' },
    ]
  },
  {
    id: 'text-tools',
    title: 'Text Utilities',
    description: 'Text transformers, encoders, and string utilities',
    icon: <FileText size={24} />,
    color: 'from-indigo-500 to-purple-600',
    tools: [
      { name: 'Text Transformer', path: '/tools/text/transformer', status: 'planned' },
      { name: 'Base64 Encoder', path: '/tools/text/base64', status: 'planned' },
    ]
  },
];