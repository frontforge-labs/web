import { useState, type JSX } from "react";
import { Button, Input } from "@frontforge/ui";
import { Settings, Copy, RotateCcw, Play, Pause } from "lucide-react";
import { ToolContainer } from "../../../../components/ToolContainer";
import { copyToClipboard } from "../../../../lib/css/format";
import type { TVariableFontConfig } from "./types";
import { variableFonts } from "./utils";

export function VariableFontsScreen(): JSX.Element {
  const [config, setConfig] = useState<TVariableFontConfig>({
    selectedFont: "Inter",
    text: "Variable Font Playground",
    fontSize: 48,
    isAnimating: false,
    animationDuration: 2000,
    axes: variableFonts[0].axes.map((axis) => ({
      ...axis,
      current: axis.default,
    })),
  });

  const updateConfig = (updates: Partial<TVariableFontConfig>): void => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const selectedFontData = variableFonts.find(
    (font) => font.name === config.selectedFont
  );

  const updateFont = (fontName: string): void => {
    const fontData = variableFonts.find((font) => font.name === fontName);
    if (fontData) {
      updateConfig({
        selectedFont: fontName,
        axes: fontData.axes.map((axis) => ({
          ...axis,
          current: axis.default,
        })),
      });
    }
  };

  const updateAxis = (tag: string, value: number): void => {
    updateConfig({
      axes: config.axes.map((axis) =>
        axis.tag === tag ? { ...axis, current: value } : axis
      ),
    });
  };

  const resetAxes = (): void => {
    updateConfig({
      axes: config.axes.map((axis) => ({ ...axis, current: axis.default })),
    });
  };

  const randomizeAxes = (): void => {
    updateConfig({
      axes: config.axes.map((axis) => ({
        ...axis,
        current: Math.round(Math.random() * (axis.max - axis.min) + axis.min),
      })),
    });
  };

  const toggleAnimation = (): void => {
    updateConfig({ isAnimating: !config.isAnimating });
  };

  const resetTool = (): void => {
    setConfig({
      selectedFont: "Inter",
      text: "Variable Font Playground",
      fontSize: 48,
      isAnimating: false,
      animationDuration: 2000,
      axes: variableFonts[0].axes.map((axis) => ({
        ...axis,
        current: axis.default,
      })),
    });
  };

  const generateFontVariationSettings = (): string => {
    return config.axes
      .map((axis) => `"${axis.tag}" ${axis.current}`)
      .join(", ");
  };

  const generateCSS = (): string => {
    const fontFamily = selectedFontData?.family || config.selectedFont;
    const variationSettings = generateFontVariationSettings();

    let css = `/* Variable Font CSS */
@import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(" ", "+")}:ital,wght@0,100..900;1,100..900&display=swap');

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
  50% { font-variation-settings: ${config.axes.map((axis) => `"${axis.tag}" ${axis.max}`).join(", ")}; }
  100% { font-variation-settings: ${variationSettings}; }
}

.variable-font-animated {
  animation: variableAnimation ${config.animationDuration}ms ease-in-out infinite;
}`;
    }

    return css;
  };

  const copyVariationSettings = async (): Promise<void> => {
    const settings = `font-variation-settings: ${generateFontVariationSettings()};`;
    await copyToClipboard(settings);
  };

  const previewElement = (
    <div className="w-full h-64 rounded-lg border border-border shadow-sm flex items-center justify-center p-8 bg-white overflow-hidden">
      {selectedFontData && (
        <link
          href={`https://fonts.googleapis.com/css2?family=${selectedFontData.family.replace(" ", "+")}:ital,wght@0,100..900;1,100..900&display=swap`}
          rel="stylesheet"
        />
      )}

      <div
        className="text-center break-all"
        style={{
          fontFamily: `'${selectedFontData?.family}', sans-serif`,
          fontSize: `${Math.min(config.fontSize, 40)}px`,
          fontVariationSettings: generateFontVariationSettings(),
          animation: config.isAnimating
            ? `variableAnimation ${config.animationDuration}ms ease-in-out infinite`
            : "none",
        }}
      >
        {config.text}
      </div>

      {config.isAnimating && (
        <style>
          {`
            @keyframes variableAnimation {
              0% { font-variation-settings: ${generateFontVariationSettings()}; }
              50% { font-variation-settings: ${config.axes.map((axis) => `"${axis.tag}" ${Math.round((axis.min + axis.max) / 2)}`).join(", ")}; }
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
          variant="secondary"
          size="sm"
          onClick={toggleAnimation}
          className="flex items-center gap-2 w-full"
        >
          {config.isAnimating ? <Pause size={16} /> : <Play size={16} />}
          {config.isAnimating ? "Stop" : "Animate"}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={randomizeAxes}
          className="flex items-center gap-2 w-full"
        >
          <Settings size={16} />
          Randomize
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={copyVariationSettings}
          className="flex items-center gap-2 w-full"
        >
          <Copy size={16} />
          Copy Settings
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={resetAxes}
          className="flex items-center gap-2 w-full"
        >
          <RotateCcw size={16} />
          Reset Axes
        </Button>
      </div>

      {/* Font Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Font Selection</h4>
        <div className="grid grid-cols-1 gap-2">
          {variableFonts.map((font) => (
            <Button
              key={font.name}
              variant={
                config.selectedFont === font.name ? "default" : "secondary"
              }
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
            <label className="block text-sm font-medium mb-2">
              Sample Text
            </label>
            <Input
              value={config.text}
              onChange={(e) => updateConfig({ text: e.target.value })}
              placeholder="Enter your text..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Font Size (px)
            </label>
            <Input
              type="number"
              value={config.fontSize}
              onChange={(e) =>
                updateConfig({ fontSize: parseInt(e.target.value) || 48 })
              }
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
              <label className="block text-sm font-medium mb-2">
                Duration (ms)
              </label>
              <Input
                type="number"
                value={config.animationDuration}
                onChange={(e) =>
                  updateConfig({
                    animationDuration: parseInt(e.target.value) || 2000,
                  })
                }
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
            <div
              key={axis.tag}
              className="p-4 bg-surface-1 border border-border rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium">{axis.name}</span>
                  <span className="ml-2 text-xs text-muted font-mono">
                    ({axis.tag})
                  </span>
                </div>
                <span className="text-sm font-mono">{axis.current}</span>
              </div>

              <div className="mb-3">
                <input
                  type="range"
                  min={axis.min}
                  max={axis.max}
                  value={axis.current}
                  onChange={(e) =>
                    updateAxis(axis.tag, parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((axis.current - axis.min) / (axis.max - axis.min)) * 100}%, #e5e7eb ${((axis.current - axis.min) / (axis.max - axis.min)) * 100}%, #e5e7eb 100%)`,
                  }}
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Current
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={axis.current}
                      onChange={(e) =>
                        updateAxis(
                          axis.tag,
                          parseInt(e.target.value) || axis.min
                        )
                      }
                      min={axis.min}
                      max={axis.max}
                      className="text-xs"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => updateAxis(axis.tag, axis.default)}
                      className="text-xs w-full"
                    >
                      Default ({axis.default})
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-muted text-center pt-2">
                  <div>
                    Range: {axis.min} - {axis.max}
                  </div>
                  <div>Default: {axis.default}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Settings Display */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">
          Current Font Variation Settings
        </h4>
        <div className="p-3 bg-[color:var(--fe-bg)] border border-border rounded-lg">
          <code className="text-sm font-mono break-all">
            font-variation-settings: {generateFontVariationSettings()};
          </code>
        </div>
      </div>

      {/* Font Information */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Font Information</h4>
        <div className="p-4 bg-[color:var(--fe-bg)] border border-border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted">Font Family:</span>
              <span className="ml-2 font-medium">
                {selectedFontData?.family}
              </span>
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
              <span className="ml-2 font-medium">
                {config.isAnimating ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted">
              <strong>Variable fonts</strong> allow continuous adjustment of
              font properties like weight, width, and slant through axes. Each
              axis has a range of values and can be animated for dynamic
              effects.
            </p>
          </div>
        </div>
      </div>

      {/* Browser Support */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Browser Support</h4>
        <div className="p-3 bg-[color:var(--fe-bg)] border border-border rounded-lg text-sm">
          <div className="grid grid-cols-1 gap-2">
            <div>
              <strong>Excellent Support:</strong> Chrome 62+, Firefox 62+,
              Safari 11+
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
