import { useState } from "react";
import "./index.css";
import {
  Button,
  Input,
  Select,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Settings, RotateCcw, Play, Pause } from "lucide-react";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";
import type { TVariableFontConfig } from "./types";
import { variableFonts } from "./utils";

export function VariableFontsScreen() {
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

  const generateFontVariationSettings = (): string => {
    return config.axes
      .map((axis) => `"${axis.tag}" ${axis.current}`)
      .join(", ");
  };

  const resetTool = (): void => {
    const fontData = variableFonts.find(
      (font) => font.name === config.selectedFont
    );
    if (fontData) {
      setConfig({
        selectedFont: config.selectedFont,
        text: "Variable Font Playground",
        fontSize: 48,
        isAnimating: false,
        animationDuration: 2000,
        axes: fontData.axes.map((axis) => ({
          ...axis,
          current: axis.default,
        })),
      });
    }
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

  const generateCSS = (): string => {
    const variationSettings = generateFontVariationSettings();
    const css = `/* Variable Font CSS */
.variable-font-text {
  font-family: '${config.selectedFont}', sans-serif;
  font-size: ${config.fontSize}px;
  font-variation-settings: ${variationSettings};
}

/* Animation (optional) */
${
  config.isAnimating
    ? `
@keyframes variableAnimation {
  0%, 100% { font-variation-settings: ${variationSettings}; }
  50% { 
    font-variation-settings: ${config.axes
      .map((axis) => `"${axis.tag}" ${axis.min + (axis.max - axis.min) * 0.8}`)
      .join(", ")}; 
  }
}

.variable-font-text {
  animation: variableAnimation ${config.animationDuration}ms ease-in-out infinite;
}
`
    : ""
}`;
    return css;
  };

  const generatedCSS = generateCSS();

  const previewElement = (
    <div className="flex items-center justify-center min-h-[200px]">
      <h1
        className="text-center break-words"
        style={{
          fontFamily: config.selectedFont,
          fontSize: `${config.fontSize}px`,
          fontVariationSettings: generateFontVariationSettings(),
          animation: config.isAnimating
            ? `variableAnimation ${config.animationDuration}ms ease-in-out infinite`
            : undefined,
          color: "var(--vf-preview-color, #222)",
        }}
      >
        {config.text}
      </h1>
    </div>
  );

  return (
    <ToolLayout
      title="Variable Font Playground"
      description="Explore and experiment with variable font axes and create dynamic typography"
      icon={<Settings size={24} />}
      iconBgClassName="bg-gradient-to-r from-green-500 to-teal-600"
      breadcrumbs={
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Typography", href: "/tools/typography" },
            {
              label: "Variable Fonts",
              href: "/tools/typography/variable-fonts",
            },
          ]}
        />
      }
      generatedCSS={generatedCSS}
      previewElement={previewElement}
    >
      <FullWidthGroup>
        <ProTip content="Variable fonts allow you to control multiple design variations within a single font file. Adjust weight, width, optical size, and custom axes to create unique typography that adapts to your design needs." />
      </FullWidthGroup>

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="secondary"
          size="sm"
          onClick={toggleAnimation}
          className="flex items-center gap-2"
        >
          {config.isAnimating ? <Pause size={16} /> : <Play size={16} />}
          {config.isAnimating ? "Stop" : "Animate"}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={randomizeAxes}
          className="flex items-center gap-2"
        >
          <Settings size={16} />
          Randomize
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={resetTool}
          className="flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Reset
        </Button>
      </div>

      {/* Font Selection */}
      <ControlGroup label="Font Selection">
        <div>
          <label className="block text-sm font-medium mb-2">
            Variable Font
          </label>
          <Select
            value={config.selectedFont}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              updateFont(e.target.value)
            }
          >
            {variableFonts.map((font) => (
              <option key={font.name} value={font.name}>
                {font.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Sample Text</label>
          <Input
            value={config.text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig({ text: e.target.value })
            }
            placeholder="Enter your text"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Font Size (px)
          </label>
          <Input
            type="number"
            value={config.fontSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig({ fontSize: parseInt(e.target.value) || 48 })
            }
            min={12}
            max={200}
          />
        </div>
      </ControlGroup>

      {/* Variable Font Axes */}
      <FullWidthGroup>
        <ControlGroup label="Variable Font Axes">
          <div className="space-y-4">
            {config.axes.map((axis) => (
              <div key={axis.tag} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-medium">{axis.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({axis.tag})
                    </span>
                  </div>
                  <span className="text-sm font-mono bg-background px-2 py-1 rounded">
                    {axis.current}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {axis.min}
                  </span>
                  <input
                    type="range"
                    min={axis.min}
                    max={axis.max}
                    value={axis.current}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateAxis(axis.tag, parseInt(e.target.value))
                    }
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground">
                    {axis.max}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ControlGroup>
      </FullWidthGroup>

      {/* Animation Settings */}
      {config.isAnimating && (
        <ControlGroup label="Animation Settings">
          <div>
            <label className="block text-sm font-medium mb-2">
              Animation Duration (ms)
            </label>
            <Input
              type="number"
              value={config.animationDuration}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateConfig({
                  animationDuration: parseInt(e.target.value) || 2000,
                })
              }
              min={500}
              max={10000}
              step={100}
            />
          </div>
        </ControlGroup>
      )}

      {/* Browser Support Info */}
      <FullWidthGroup>
        <ControlGroup label="Browser Support">
          <div className="p-3 bg-muted rounded-lg text-sm">
            <div className="grid grid-cols-1 gap-2">
              <div>
                <strong>Excellent Support:</strong> Chrome, Firefox, Safari,
                Edge
              </div>
              <div>
                <strong>Fallback:</strong> Static font weights for older
                browsers
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Always provide fallback font weights for older browsers
            </p>
          </div>
        </ControlGroup>
      </FullWidthGroup>
    </ToolLayout>
  );
}
