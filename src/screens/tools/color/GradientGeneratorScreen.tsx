import { useState } from "react";
import { Button, Input, Select } from "@frontenzo/ui";
import { Plus, Trash2, Palette } from "lucide-react";
import { ToolContainer } from "../../../components/ToolContainer";
import { buildGradient } from "../../../lib/css/builders";
import type { GradientConfig, GradientStop } from "../../../lib/types";

const gradientPresets: Array<{ name: string; config: GradientConfig }> = [
  {
    name: "Sunset",
    config: {
      type: "linear",
      angle: 45,
      stops: [
        { color: "#ff7e5f", position: 0 },
        { color: "#feb47b", position: 100 },
      ],
    },
  },
  {
    name: "Ocean",
    config: {
      type: "linear",
      angle: 180,
      stops: [
        { color: "#667eea", position: 0 },
        { color: "#764ba2", position: 100 },
      ],
    },
  },
  {
    name: "Mint Fresh",
    config: {
      type: "linear",
      angle: 90,
      stops: [
        { color: "#00b4db", position: 0 },
        { color: "#0083b0", position: 100 },
      ],
    },
  },
  {
    name: "Lava",
    config: {
      type: "radial",
      angle: 0,
      stops: [
        { color: "#ff416c", position: 0 },
        { color: "#ff4b2b", position: 100 },
      ],
    },
  },
  {
    name: "Purple Haze",
    config: {
      type: "linear",
      angle: 135,
      stops: [
        { color: "#667eea", position: 0 },
        { color: "#764ba2", position: 50 },
        { color: "#f093fb", position: 100 },
      ],
    },
  },
  {
    name: "Rainbow",
    config: {
      type: "linear",
      angle: 90,
      stops: [
        { color: "#ff0000", position: 0 },
        { color: "#ff8000", position: 16.67 },
        { color: "#ffff00", position: 33.33 },
        { color: "#00ff00", position: 50 },
        { color: "#0080ff", position: 66.67 },
        { color: "#8000ff", position: 83.33 },
        { color: "#ff0080", position: 100 },
      ],
    },
  },
];

export function GradientGeneratorScreen() {
  const [config, setConfig] = useState<GradientConfig>({
    type: "linear",
    angle: 45,
    stops: [
      { color: "#3b82f6", position: 0 },
      { color: "#8b5cf6", position: 100 },
    ],
  });

  const updateConfig = (updates: Partial<GradientConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const addStop = () => {
    const newStop: GradientStop = {
      color: "#000000",
      position: 50,
    };
    updateConfig({
      stops: [...config.stops, newStop].sort((a, b) => a.position - b.position),
    });
  };

  const removeStop = (index: number) => {
    if (config.stops.length > 2) {
      const newStops = config.stops.filter((_, i) => i !== index);
      updateConfig({ stops: newStops });
    }
  };

  const updateStop = (index: number, updates: Partial<GradientStop>) => {
    const newStops = config.stops.map((stop, i) =>
      i === index ? { ...stop, ...updates } : stop
    );
    updateConfig({ stops: newStops });
  };

  const applyPreset = (preset: GradientConfig) => {
    setConfig(preset);
  };

  const resetTool = () => {
    setConfig({
      type: "linear",
      angle: 45,
      stops: [
        { color: "#3b82f6", position: 0 },
        { color: "#8b5cf6", position: 100 },
      ],
    });
  };

  const generatedCSS = buildGradient(config);

  const previewElement = (
    <div
      className="w-64 h-40 rounded-lg border border-gray-300 shadow-lg"
      style={{
        background:
          config.type === "linear"
            ? `linear-gradient(${config.angle}deg, ${config.stops
                .sort((a, b) => a.position - b.position)
                .map((stop) => `${stop.color} ${stop.position}%`)
                .join(", ")})`
            : `radial-gradient(circle, ${config.stops
                .sort((a, b) => a.position - b.position)
                .map((stop) => `${stop.color} ${stop.position}%`)
                .join(", ")})`,
      }}
    />
  );

  return (
    <ToolContainer
      title="CSS Gradient Tool"
      description="Create beautiful CSS gradients with real-time preview and easy customization"
      generatedCSS={generatedCSS}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<Palette size={24} />}
    >
      {/* Quick Presets */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Quick Presets</h4>
        <div className="grid grid-cols-2 gap-2">
          {gradientPresets.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              size="sm"
              onClick={() => applyPreset(preset.config)}
              className="text-xs h-8"
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Gradient Type</label>
        <Select
          value={config.type}
          onChange={(e) =>
            updateConfig({ type: e.target.value as "linear" | "radial" })
          }
        >
          <option value="linear">Linear Gradient</option>
          <option value="radial">Radial Gradient</option>
        </Select>
      </div>

      {/* Angle Control (only for linear) */}
      {config.type === "linear" && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Angle: {config.angle}°
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={config.angle}
            onChange={(e) => updateConfig({ angle: parseInt(e.target.value) })}
            className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
            <span>0°</span>
            <span>90°</span>
            <span>180°</span>
            <span>270°</span>
            <span>360°</span>
          </div>
        </div>
      )}

      {/* Color Stops */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium">Color Stops</h4>
          <Button size="sm" variant="outline" onClick={addStop} className="h-8">
            <Plus size={12} className="mr-1" />
            Add
          </Button>
        </div>

        <div className="space-y-3">
          {config.stops.map((stop, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="color"
                value={stop.color}
                onChange={(e) => updateStop(index, { color: e.target.value })}
                className="w-10 h-8 rounded border border-[var(--fe-border)] cursor-pointer"
              />
              <Input
                type="text"
                value={stop.color}
                onChange={(e) => updateStop(index, { color: e.target.value })}
                className="flex-1 text-xs h-8"
                placeholder="#000000"
              />
              <Input
                type="number"
                min="0"
                max="100"
                value={stop.position}
                onChange={(e) =>
                  updateStop(index, { position: parseInt(e.target.value) || 0 })
                }
                className="w-16 text-xs h-8"
              />
              <span className="text-xs text-[var(--fe-text)]/60 w-4">%</span>
              {config.stops.length > 2 && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeStop(index)}
                  className="p-1 h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={12} />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mini Preview in Controls */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Quick Preview</h4>
        <div
          className="w-full h-16 rounded border border-[var(--fe-border)]"
          style={{
            background:
              config.type === "linear"
                ? `linear-gradient(${config.angle}deg, ${config.stops
                    .sort((a, b) => a.position - b.position)
                    .map((stop) => `${stop.color} ${stop.position}%`)
                    .join(", ")})`
                : `radial-gradient(circle, ${config.stops
                    .sort((a, b) => a.position - b.position)
                    .map((stop) => `${stop.color} ${stop.position}%`)
                    .join(", ")})`,
          }}
        />
      </div>
    </ToolContainer>
  );
}
