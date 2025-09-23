import { useState, type JSX } from "react";
import { Button, Input, Select, ColorInput } from "@frontenzo/ui";
import { Palette, Copy, RotateCcw, Plus, Trash2 } from "lucide-react";
import { ToolContainer } from "../../../../components/ToolContainer";
import { copyToClipboard } from "../../../../lib/css/format";
import type { TGradientTextConfig, TGradientStop } from "./types";
import {
  gradientPresets,
  fontFamilies,
  fontWeights,
  generateId,
} from "./utils";

export function GradientTextScreen(): JSX.Element {
  const [config, setConfig] = useState<TGradientTextConfig>({
    text: "Gradient Text Effect",
    fontSize: 48,
    fontWeight: "700",
    fontFamily: "Inter",
    direction: 45,
    gradientType: "linear",
    backgroundClip: true,
    fallbackColor: "#3b82f6",
    stops: [
      { id: generateId(), color: "#667eea", position: 0 },
      { id: generateId(), color: "#764ba2", position: 100 },
    ],
  });

  const updateConfig = (updates: Partial<TGradientTextConfig>): void => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const addGradientStop = (): void => {
    const newPosition =
      config.stops.length > 0
        ? Math.round((config.stops[config.stops.length - 1].position + 100) / 2)
        : 50;

    const newStop: TGradientStop = {
      id: generateId(),
      color: "#3b82f6",
      position: Math.min(newPosition, 100),
    };

    updateConfig({
      stops: [...config.stops, newStop].sort((a, b) => a.position - b.position),
    });
  };

  const removeGradientStop = (id: string): void => {
    updateConfig({
      stops: config.stops.filter((stop) => stop.id !== id),
    });
  };

  const updateGradientStop = (
    id: string,
    updates: Partial<TGradientStop>
  ): void => {
    updateConfig({
      stops: config.stops
        .map((stop) => (stop.id === id ? { ...stop, ...updates } : stop))
        .sort((a, b) => a.position - b.position),
    });
  };

  const applyPreset = (preset: (typeof gradientPresets)[0]): void => {
    const newStops = preset.stops.map((stop) => ({
      id: generateId(),
      color: stop.color,
      position: stop.position,
    }));

    updateConfig({
      stops: newStops,
      direction: preset.direction,
    });
  };

  const resetTool = (): void => {
    setConfig({
      text: "Gradient Text Effect",
      fontSize: 48,
      fontWeight: "700",
      fontFamily: "Inter",
      direction: 45,
      gradientType: "linear",
      backgroundClip: true,
      fallbackColor: "#3b82f6",
      stops: [
        { id: generateId(), color: "#667eea", position: 0 },
        { id: generateId(), color: "#764ba2", position: 100 },
      ],
    });
  };

  const generateGradient = (): string => {
    const sortedStops = [...config.stops].sort(
      (a, b) => a.position - b.position
    );
    const stopStrings = sortedStops.map(
      (stop) => `${stop.color} ${stop.position}%`
    );

    if (config.gradientType === "radial") {
      return `radial-gradient(circle, ${stopStrings.join(", ")})`;
    }

    return `linear-gradient(${config.direction}deg, ${stopStrings.join(", ")})`;
  };

  const generateCSS = (): string => {
    const gradient = generateGradient();

    if (config.backgroundClip) {
      return `/* Gradient Text with Background Clip */
.gradient-text {
  font-family: '${config.fontFamily}', sans-serif;
  font-size: ${config.fontSize}px;
  font-weight: ${config.fontWeight};
  background: ${gradient};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: ${config.fallbackColor}; /* Fallback for unsupported browsers */
  display: inline-block;
}`;
    } else {
      return `/* Gradient Text with Text Shadow */
.gradient-text {
  font-family: '${config.fontFamily}', sans-serif;
  font-size: ${config.fontSize}px;
  font-weight: ${config.fontWeight};
  color: transparent;
  background: ${gradient};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 0 ${config.fallbackColor};
  display: inline-block;
}`;
    }
  };

  const copyGradientOnly = async (): Promise<void> => {
    const gradient = generateGradient();
    await copyToClipboard(`background: ${gradient};`);
  };

  const previewElement = (
    <div className="w-full h-64 rounded-lg border border-border shadow-sm flex items-center justify-center p-8 bg-white">
      <link
        href={`https://fonts.googleapis.com/css2?family=${config.fontFamily.replace(" ", "+")}:wght@${config.fontWeight}&display=swap`}
        rel="stylesheet"
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .gradient-text-element {
            font-family: '${config.fontFamily}', sans-serif;
            font-size: ${Math.min(config.fontSize, 40)}px;
            font-weight: ${config.fontWeight};
            text-align: center;
            line-height: 1.2;
            display: inline-block;
            background: ${generateGradient()};
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: ${config.fallbackColor};
            margin: 0;
            padding: 0;
          }
          
          @supports not (-webkit-background-clip: text) {
            .gradient-text-element {
              color: ${config.fallbackColor};
              -webkit-text-fill-color: unset;
            }
          }
        `,
        }}
      />

      <div className="gradient-text-element">{config.text}</div>
    </div>
  );

  return (
    <ToolContainer
      title="Gradient Text Generator"
      description="Create stunning gradient text effects with CSS background-clip and live preview"
      generatedCSS={generateCSS()}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<Palette size={24} />}
    >
      {/* Quick Actions */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Button
          variant="secondary"
          size="sm"
          onClick={addGradientStop}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Color Stop
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={copyGradientOnly}
          className="flex items-center gap-2"
        >
          <Copy size={16} />
          Copy Gradient
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

      {/* Gradient Presets */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Gradient Presets
        </label>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {gradientPresets.map((preset) => (
            <Button
              key={preset.name}
              variant="secondary"
              size="sm"
              onClick={() => applyPreset(preset)}
              className="text-xs h-12 relative overflow-hidden"
              style={{
                background: `linear-gradient(45deg, ${preset.stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`,
              }}
            >
              <span className="relative z-10 text-white font-medium drop-shadow">
                {preset.name}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Text Settings */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Text Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Text Content
            </label>
            <Input
              value={config.text}
              onChange={(e) => updateConfig({ text: e.target.value })}
              placeholder="Enter your text..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Font Family
            </label>
            <Select
              value={config.fontFamily}
              onChange={(e) => updateConfig({ fontFamily: e.target.value })}
            >
              {fontFamilies.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
          <div>
            <label className="block text-sm font-medium mb-2">
              Font Weight
            </label>
            <Select
              value={config.fontWeight}
              onChange={(e) => updateConfig({ fontWeight: e.target.value })}
            >
              {fontWeights.map((weight) => (
                <option key={weight.value} value={weight.value}>
                  {weight.label}
                </option>
              ))}
            </Select>
          </div>
          <ColorInput
            label="Fallback Color"
            value={config.fallbackColor}
            onChange={(e) => updateConfig({ fallbackColor: e.target.value })}
          />
        </div>
      </div>

      {/* Gradient Settings */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Gradient Settings</h4>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Gradient Type
            </label>
            <Select
              value={config.gradientType}
              onChange={(e) =>
                updateConfig({
                  gradientType: e.target.value as "linear" | "radial",
                })
              }
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </Select>
          </div>
          {config.gradientType === "linear" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Direction (degrees)
              </label>
              <Input
                type="number"
                value={config.direction}
                onChange={(e) =>
                  updateConfig({ direction: parseInt(e.target.value) || 45 })
                }
                min={0}
                max={360}
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="backgroundClip"
              checked={config.backgroundClip}
              onChange={(e) =>
                updateConfig({ backgroundClip: e.target.checked })
              }
              className="rounded"
            />
            <label
              htmlFor="backgroundClip"
              className="text-sm whitespace-nowrap"
            >
              Use background-clip (recommended)
            </label>
          </div>
        </div>
      </div>

      {/* Gradient Stops */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium">Gradient Colors</h4>
          <span className="text-xs text-muted">
            {config.stops.length} color stops
          </span>
        </div>

        {/* Gradient Preview Bar */}
        <div className="mb-4">
          <div
            className="w-full h-8 rounded border border-border relative"
            style={{
              background: generateGradient(),
            }}
          >
            {config.stops.map((stop) => (
              <div
                key={stop.id}
                className="absolute w-3 h-3 bg-white border-2 border-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${stop.position}%`,
                  top: "50%",
                }}
                onClick={() => {
                  // Focus the corresponding input
                  const input = document.querySelector(
                    `input[data-stop-id="${stop.id}"]`
                  ) as HTMLInputElement;
                  if (input) input.focus();
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {config.stops.map((stop, index) => (
            <div
              key={stop.id}
              className="p-3 bg-surface-1 border border-border rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Color Stop {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeGradientStop(stop.id)}
                  className="text-destructive hover:text-destructive"
                  disabled={config.stops.length === 1}
                >
                  <Trash2 size={14} />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) =>
                        updateGradientStop(stop.id, { color: e.target.value })
                      }
                      className="w-8 h-8 rounded border border-border cursor-pointer"
                    />
                    <Input
                      value={stop.color}
                      onChange={(e) =>
                        updateGradientStop(stop.id, { color: e.target.value })
                      }
                      className="flex-1 text-xs font-mono"
                      data-stop-id={stop.id}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Position (%)
                  </label>
                  <Input
                    type="number"
                    value={stop.position}
                    onChange={(e) =>
                      updateGradientStop(stop.id, {
                        position: Math.max(
                          0,
                          Math.min(100, parseInt(e.target.value) || 0)
                        ),
                      })
                    }
                    min={0}
                    max={100}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browser Support Info */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Browser Support</h4>
        <div className="p-3 bg-[var(--fe-bg)] border border-border rounded-lg text-sm">
          <div className="grid grid-cols-1 gap-2">
            <div>
              <strong>Good Support:</strong> Chrome, Firefox, Safari, Edge
            </div>
            <div>
              <strong>Fallback:</strong> Solid color for older browsers
            </div>
          </div>
          <p className="mt-2 text-xs text-muted">
            Always include a fallback color for browsers that don't support
            background-clip: text
          </p>
        </div>
      </div>
    </ToolContainer>
  );
}
