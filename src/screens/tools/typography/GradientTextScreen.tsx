import { useState } from "react";
import { Button, Input } from "@frontforge/ui";
import { Palette, Copy, RotateCcw, Plus, Trash2 } from "lucide-react";
import { ToolContainer } from "../../../components/ToolContainer";
import { copyToClipboard } from "../../../lib/css/format";

interface GradientStop {
  id: string;
  color: string;
  position: number;
}

interface GradientTextConfig {
  text: string;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  direction: number;
  gradientType: "linear" | "radial";
  stops: GradientStop[];
  backgroundClip: boolean;
  fallbackColor: string;
}

const gradientPresets = [
  {
    name: "Sunset",
    stops: [
      { color: "#ff7e5f", position: 0 },
      { color: "#feb47b", position: 100 },
    ],
    direction: 45,
  },
  {
    name: "Ocean",
    stops: [
      { color: "#667eea", position: 0 },
      { color: "#764ba2", position: 100 },
    ],
    direction: 90,
  },
  {
    name: "Aurora",
    stops: [
      { color: "#a8edea", position: 0 },
      { color: "#fed6e3", position: 50 },
      { color: "#d299c2", position: 100 },
    ],
    direction: 135,
  },
  {
    name: "Fire",
    stops: [
      { color: "#ff9a9e", position: 0 },
      { color: "#fecfef", position: 50 },
      { color: "#fecfef", position: 100 },
    ],
    direction: 0,
  },
  {
    name: "Cosmic",
    stops: [
      { color: "#667eea", position: 0 },
      { color: "#764ba2", position: 25 },
      { color: "#f093fb", position: 75 },
      { color: "#f5576c", position: 100 },
    ],
    direction: 225,
  },
  {
    name: "Emerald",
    stops: [
      { color: "#11998e", position: 0 },
      { color: "#38ef7d", position: 100 },
    ],
    direction: 180,
  },
];

const fontFamilies = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Montserrat",
  "Poppins",
  "Playfair Display",
  "Oswald",
  "Raleway",
  "Merriweather",
  "Dancing Script",
];

const fontWeights = [
  { value: "300", label: "Light" },
  { value: "400", label: "Regular" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semi Bold" },
  { value: "700", label: "Bold" },
  { value: "800", label: "Extra Bold" },
  { value: "900", label: "Black" },
];

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function GradientTextScreen() {
  const [config, setConfig] = useState<GradientTextConfig>({
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

  const addGradientStop = () => {
    const newPosition =
      config.stops.length > 0
        ? Math.round((config.stops[config.stops.length - 1].position + 100) / 2)
        : 50;

    const newStop: GradientStop = {
      id: generateId(),
      color: "#3b82f6",
      position: Math.min(newPosition, 100),
    };

    setConfig((prev) => ({
      ...prev,
      stops: [...prev.stops, newStop].sort((a, b) => a.position - b.position),
    }));
  };

  const removeGradientStop = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      stops: prev.stops.filter((stop) => stop.id !== id),
    }));
  };

  const updateGradientStop = (id: string, updates: Partial<GradientStop>) => {
    setConfig((prev) => ({
      ...prev,
      stops: prev.stops
        .map((stop) => (stop.id === id ? { ...stop, ...updates } : stop))
        .sort((a, b) => a.position - b.position),
    }));
  };

  const applyPreset = (preset: (typeof gradientPresets)[0]) => {
    const newStops = preset.stops.map((stop) => ({
      id: generateId(),
      color: stop.color,
      position: stop.position,
    }));

    setConfig((prev) => ({
      ...prev,
      stops: newStops,
      direction: preset.direction,
    }));
  };

  const resetTool = () => {
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

  const generateGradient = () => {
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

  const generateCSS = () => {
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
  text-shadow: 0 0 0 ${config.fallbackColor};
}`;
    }
  };

  const copyGradientOnly = async () => {
    const gradient = generateGradient();
    await copyToClipboard(`background: ${gradient};`);
  };

  const previewElement = (
    <div className="w-full h-64 rounded-lg border border-border shadow-sm flex items-center justify-center p-8 bg-white">
      <link
        href={`https://fonts.googleapis.com/css2?family=${config.fontFamily.replace(" ", "+")}:wght@${config.fontWeight}&display=swap`}
        rel="stylesheet"
      />

      <div
        className="text-center"
        style={{
          fontFamily: `'${config.fontFamily}', sans-serif`,
          fontSize: `${Math.min(config.fontSize, 40)}px`, // Scale down for preview
          fontWeight: config.fontWeight,
          background: generateGradient(),
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: config.fallbackColor,
        }}
      >
        {config.text}
      </div>
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
          variant="outline"
          size="sm"
          onClick={addGradientStop}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Color Stop
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyGradientOnly}
          className="flex items-center gap-2"
        >
          <Copy size={16} />
          Copy Gradient
        </Button>
        <Button
          variant="outline"
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
              variant="outline"
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
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, text: e.target.value }))
              }
              placeholder="Enter your text..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Font Family
            </label>
            <select
              value={config.fontFamily}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, fontFamily: e.target.value }))
              }
              className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {fontFamilies.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
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
                setConfig((prev) => ({
                  ...prev,
                  fontSize: parseInt(e.target.value) || 48,
                }))
              }
              min={12}
              max={120}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Font Weight
            </label>
            <select
              value={config.fontWeight}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, fontWeight: e.target.value }))
              }
              className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {fontWeights.map((weight) => (
                <option key={weight.value} value={weight.value}>
                  {weight.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Fallback Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.fallbackColor}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    fallbackColor: e.target.value,
                  }))
                }
                className="w-10 h-10 rounded border border-border cursor-pointer"
              />
              <Input
                value={config.fallbackColor}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    fallbackColor: e.target.value,
                  }))
                }
                className="flex-1 font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Settings */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Gradient Settings</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Gradient Type
            </label>
            <select
              value={config.gradientType}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  gradientType: e.target.value as "linear" | "radial",
                }))
              }
              className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
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
                  setConfig((prev) => ({
                    ...prev,
                    direction: parseInt(e.target.value) || 45,
                  }))
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
                setConfig((prev) => ({
                  ...prev,
                  backgroundClip: e.target.checked,
                }))
              }
              className="rounded"
            />
            <label htmlFor="backgroundClip" className="text-sm">
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
        <div className="p-3 bg-surface-1 border border-border rounded-lg text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
