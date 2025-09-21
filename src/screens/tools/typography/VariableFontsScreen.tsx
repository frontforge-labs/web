import { useState } from "react";
import { Button, Input } from "@frontenzo/ui";
import { Settings, Copy, RotateCcw, Play, Pause } from "lucide-react";
import { ToolContainer } from "../../../components/ToolContainer";
import { copyToClipboard } from "../../../lib/css/format";

interface VariableAxis {
  tag: string;
  name: string;
  min: number;
  max: number;
  default: number;
  current: number;
}

interface VariableFontConfig {
  selectedFont: string;
  text: string;
  fontSize: number;
  axes: VariableAxis[];
  isAnimating: boolean;
  animationDuration: number;
}

const variableFonts = [
  {
    name: "Inter",
    family: "Inter",
    axes: [
      { tag: "wght", name: "Weight", min: 100, max: 900, default: 400 },
      { tag: "slnt", name: "Slant", min: -10, max: 0, default: 0 }
    ]
  },
  {
    name: "Roboto Flex",
    family: "Roboto Flex",
    axes: [
      { tag: "wght", name: "Weight", min: 100, max: 1000, default: 400 },
      { tag: "wdth", name: "Width", min: 25, max: 151, default: 100 },
      { tag: "opsz", name: "Optical Size", min: 8, max: 144, default: 14 },
      { tag: "GRAD", name: "Grade", min: -200, max: 150, default: 0 },
      { tag: "slnt", name: "Slant", min: -10, max: 0, default: 0 }
    ]
  },
  {
    name: "Oswald",
    family: "Oswald",
    axes: [
      { tag: "wght", name: "Weight", min: 200, max: 700, default: 400 }
    ]
  },
  {
    name: "Source Sans Pro",
    family: "Source Sans Pro",
    axes: [
      { tag: "wght", name: "Weight", min: 200, max: 900, default: 400 },
      { tag: "ital", name: "Italic", min: 0, max: 1, default: 0 }
    ]
  },
  {
    name: "Crimson Pro",
    family: "Crimson Pro",
    axes: [
      { tag: "wght", name: "Weight", min: 200, max: 900, default: 400 },
      { tag: "ital", name: "Italic", min: 0, max: 1, default: 0 }
    ]
  },
  {
    name: "Recursive",
    family: "Recursive",
    axes: [
      { tag: "wght", name: "Weight", min: 300, max: 1000, default: 400 },
      { tag: "slnt", name: "Slant", min: -15, max: 0, default: 0 },
      { tag: "MONO", name: "Monospace", min: 0, max: 1, default: 0 },
      { tag: "CASL", name: "Casual", min: 0, max: 1, default: 0 },
      { tag: "CRSV", name: "Cursive", min: 0, max: 1, default: 0.5 }
    ]
  }
];


export function VariableFontsScreen() {
  const [config, setConfig] = useState<VariableFontConfig>({
    selectedFont: "Inter",
    text: "Variable Font Playground",
    fontSize: 48,
    isAnimating: false,
    animationDuration: 2000,
    axes: variableFonts[0].axes.map(axis => ({
      ...axis,
      current: axis.default
    }))
  });

  const selectedFontData = variableFonts.find(font => font.name === config.selectedFont);

  const updateFont = (fontName: string) => {
    const fontData = variableFonts.find(font => font.name === fontName);
    if (fontData) {
      setConfig(prev => ({
        ...prev,
        selectedFont: fontName,
        axes: fontData.axes.map(axis => ({
          ...axis,
          current: axis.default
        }))
      }));
    }
  };

  const updateAxis = (tag: string, value: number) => {
    setConfig(prev => ({
      ...prev,
      axes: prev.axes.map(axis =>
        axis.tag === tag ? { ...axis, current: value } : axis
      )
    }));
  };

  const resetAxes = () => {
    setConfig(prev => ({
      ...prev,
      axes: prev.axes.map(axis => ({ ...axis, current: axis.default }))
    }));
  };

  const randomizeAxes = () => {
    setConfig(prev => ({
      ...prev,
      axes: prev.axes.map(axis => ({
        ...axis,
        current: Math.round(Math.random() * (axis.max - axis.min) + axis.min)
      }))
    }));
  };

  const toggleAnimation = () => {
    setConfig(prev => ({ ...prev, isAnimating: !prev.isAnimating }));
  };

  const resetTool = () => {
    setConfig({
      selectedFont: "Inter",
      text: "Variable Font Playground",
      fontSize: 48,
      isAnimating: false,
      animationDuration: 2000,
      axes: variableFonts[0].axes.map(axis => ({
        ...axis,
        current: axis.default
      }))
    });
  };

  const generateFontVariationSettings = () => {
    return config.axes
      .map(axis => `"${axis.tag}" ${axis.current}`)
      .join(', ');
  };

  const generateCSS = () => {
    const fontFamily = selectedFontData?.family || config.selectedFont;
    const variationSettings = generateFontVariationSettings();

    let css = `/* Variable Font CSS */
@import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:ital,wght@0,100..900;1,100..900&display=swap');

.variable-font {
  font-family: '${fontFamily}', sans-serif;
  font-size: ${config.fontSize}px;
  font-variation-settings: ${variationSettings};
}`;

    if (config.isAnimating) {
      css += `

/* Animation */
@keyframes variableAnimation {
  0% { font-variation-settings: ${variationSettings}; }
  50% { font-variation-settings: ${config.axes.map(axis => `"${axis.tag}" ${axis.max}`).join(', ')}; }
  100% { font-variation-settings: ${variationSettings}; }
}

.variable-font-animated {
  animation: variableAnimation ${config.animationDuration}ms ease-in-out infinite;
}`;
    }

    return css;
  };

  const copyVariationSettings = async () => {
    const settings = `font-variation-settings: ${generateFontVariationSettings()};`;
    await copyToClipboard(settings);
  };

  const previewElement = (
    <div className="w-full h-64 rounded-lg border border-border shadow-sm flex items-center justify-center p-8 bg-white overflow-hidden">
      {selectedFontData && (
        <link
          href={`https://fonts.googleapis.com/css2?family=${selectedFontData.family.replace(' ', '+')}:ital,wght@0,100..900;1,100..900&display=swap`}
          rel="stylesheet"
        />
      )}

      <div
        className="text-center break-all"
        style={{
          fontFamily: `'${selectedFontData?.family}', sans-serif`,
          fontSize: `${Math.min(config.fontSize, 40)}px`,
          fontVariationSettings: generateFontVariationSettings(),
          animation: config.isAnimating ? `variableAnimation ${config.animationDuration}ms ease-in-out infinite` : 'none'
        }}
      >
        {config.text}
      </div>

      {config.isAnimating && (
        <style>
          {`
            @keyframes variableAnimation {
              0% { font-variation-settings: ${generateFontVariationSettings()}; }
              50% { font-variation-settings: ${config.axes.map(axis => `"${axis.tag}" ${Math.round((axis.min + axis.max) / 2)}`).join(', ')}; }
              100% { font-variation-settings: ${generateFontVariationSettings()}; }
            }
          `}
        </style>
      )}
    </div>
  );

  return (
    <ToolContainer
      title="Variable Font Playground"
      description="Explore and experiment with variable font axes and create dynamic typography"
      generatedCSS={generateCSS()}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<Settings size={24} />}
    >
      {/* Quick Actions */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleAnimation}
          className="flex items-center gap-2"
        >
          {config.isAnimating ? <Pause size={16} /> : <Play size={16} />}
          {config.isAnimating ? 'Stop' : 'Animate'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={randomizeAxes}
          className="flex items-center gap-2"
        >
          <Settings size={16} />
          Randomize
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyVariationSettings}
          className="flex items-center gap-2"
        >
          <Copy size={16} />
          Copy Settings
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetAxes}
          className="flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Reset Axes
        </Button>
      </div>

      {/* Font Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Font Selection</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {variableFonts.map((font) => (
            <Button
              key={font.name}
              variant={config.selectedFont === font.name ? "default" : "outline"}
              size="sm"
              onClick={() => updateFont(font.name)}
              className="text-sm"
            >
              {font.name}
              <span className="ml-2 text-xs opacity-70">
                ({font.axes.length} axes)
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Text Settings */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Text Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Sample Text</label>
            <Input
              value={config.text}
              onChange={(e) => setConfig(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Enter your text..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Font Size (px)</label>
            <Input
              type="number"
              value={config.fontSize}
              onChange={(e) => setConfig(prev => ({ ...prev, fontSize: parseInt(e.target.value) || 48 }))}
              min={12}
              max={120}
            />
          </div>
        </div>
      </div>

      {/* Animation Settings */}
      {config.isAnimating && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3">Animation Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Duration (ms)</label>
              <Input
                type="number"
                value={config.animationDuration}
                onChange={(e) => setConfig(prev => ({ ...prev, animationDuration: parseInt(e.target.value) || 2000 }))}
                min={500}
                max={10000}
                step={100}
              />
            </div>
          </div>
        </div>
      )}

      {/* Variable Font Axes */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium">Variable Font Axes</h4>
          <span className="text-xs text-muted">
            {config.axes.length} available axes
          </span>
        </div>

        <div className="space-y-4">
          {config.axes.map((axis) => (
            <div key={axis.tag} className="p-4 bg-surface-1 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium">{axis.name}</span>
                  <span className="ml-2 text-xs text-muted font-mono">({axis.tag})</span>
                </div>
                <span className="text-sm font-mono">
                  {axis.current}
                </span>
              </div>

              <div className="mb-3">
                <input
                  type="range"
                  min={axis.min}
                  max={axis.max}
                  value={axis.current}
                  onChange={(e) => updateAxis(axis.tag, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((axis.current - axis.min) / (axis.max - axis.min)) * 100}%, #e5e7eb ${((axis.current - axis.min) / (axis.max - axis.min)) * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-medium mb-1">Min</label>
                  <Input
                    type="number"
                    value={axis.current}
                    onChange={(e) => updateAxis(axis.tag, parseInt(e.target.value) || axis.min)}
                    min={axis.min}
                    max={axis.max}
                    className="text-xs"
                  />
                </div>
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateAxis(axis.tag, axis.default)}
                    className="text-xs w-full"
                  >
                    Default ({axis.default})
                  </Button>
                </div>
                <div className="text-xs text-muted text-center pt-2">
                  <div>Range: {axis.min} - {axis.max}</div>
                  <div>Default: {axis.default}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Settings Display */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Current Font Variation Settings</h4>
        <div className="p-3 bg-surface-1 border border-border rounded-lg">
          <code className="text-sm font-mono break-all">
            font-variation-settings: {generateFontVariationSettings()};
          </code>
        </div>
      </div>

      {/* Font Information */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Font Information</h4>
        <div className="p-4 bg-surface-1 border border-border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted">Font Family:</span>
              <span className="ml-2 font-medium">{selectedFontData?.family}</span>
            </div>
            <div>
              <span className="text-muted">Available Axes:</span>
              <span className="ml-2 font-medium">{config.axes.length}</span>
            </div>
            <div>
              <span className="text-muted">Current Size:</span>
              <span className="ml-2 font-medium">{config.fontSize}px</span>
            </div>
            <div>
              <span className="text-muted">Animation:</span>
              <span className="ml-2 font-medium">{config.isAnimating ? 'Active' : 'Inactive'}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted">
              <strong>Variable fonts</strong> allow continuous adjustment of font properties like weight, width, and slant through axes.
              Each axis has a range of values and can be animated for dynamic effects.
            </p>
          </div>
        </div>
      </div>

      {/* Browser Support */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Browser Support</h4>
        <div className="p-3 bg-surface-1 border border-border rounded-lg text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <strong>Excellent Support:</strong> Chrome 62+, Firefox 62+, Safari 11+
            </div>
            <div>
              <strong>Partial Support:</strong> Edge 17+ (some limitations)
            </div>
          </div>
          <p className="mt-2 text-xs text-muted">
            Always provide fallback font weights for older browsers
          </p>
        </div>
      </div>
    </ToolContainer>
  );
}