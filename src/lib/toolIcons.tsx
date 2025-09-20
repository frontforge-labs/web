import {
  Palette,
  Pipette,
  Layers,
  Eye,
  Sparkles,
  Filter,
  CornerUpLeft,
  Scissors,
  PenTool,
  Grid3X3,
  Columns,
  Zap,
  Gauge,
  FileJson,
  GitCompare,
  CaseSensitive,
  Lock,
  RefreshCw
} from 'lucide-react';

// Icon mapping for individual tools
export const toolIcons: Record<string, React.ReactNode> = {
  // Color Tools
  'CSS Gradient': <Palette size={20} />,
  'Color Picker': <Pipette size={20} />,
  'Palette Builder': <Eye size={20} />,
  'Color Converter': <RefreshCw size={20} />,

  // Typography Tools
  'Text Shadow': <Layers size={20} />,
  'Font Pairing': <CaseSensitive size={20} />,

  // Effects Tools
  'Box Shadow': <Sparkles size={20} />,
  'CSS Filters': <Filter size={20} />,

  // Shapes Tools
  'Border Radius': <CornerUpLeft size={20} />,
  'Clip Path': <Scissors size={20} />,

  // Layout Tools
  'Flexbox Playground': <Columns size={20} />,
  'Grid Generator': <Grid3X3 size={20} />,

  // Animation Tools
  'Keyframe Builder': <Zap size={20} />,
  'Easing Visualizer': <Gauge size={20} />,

  // Dev Tools
  'JSON Formatter': <FileJson size={20} />,
  'Text Diff': <GitCompare size={20} />,

  // Text Tools
  'Text Transformer': <CaseSensitive size={20} />,
  'Base64 Encoder': <Lock size={20} />,
};

// Get icon for a tool by name
export const getToolIcon = (toolName: string) => {
  return toolIcons[toolName] || <PenTool size={20} />; // Default icon
};