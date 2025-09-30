import { useState } from "react";
import {
  Button,
  Input,
  Select,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Plus, Trash2, Palette } from "lucide-react";
import { buildGradient } from "../../../../lib/css/builders";
import type { TGradientConfig, TGradientStop } from "./types";
import { gradientPresets } from "./utils";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";

export function GradientGeneratorScreen() {
  const [config, setConfig] = useState<TGradientConfig>({
    type: "linear",
    angle: 45,
    stops: [
      { color: "#3b82f6", position: 0 },
      { color: "#8b5cf6", position: 100 },
    ],
  });

  const updateConfig = (updates: Partial<TGradientConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const addStop = () => {
    const newStop: TGradientStop = {
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

  const updateStop = (index: number, updates: Partial<TGradientStop>) => {
    const newStops = config.stops.map((stop, i) =>
      i === index ? { ...stop, ...updates } : stop
    );
    updateConfig({ stops: newStops });
  };

  const applyPreset = (preset: TGradientConfig) => {
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
    <ToolLayout
      title="CSS Gradient Tool"
      description="Create beautiful CSS gradients with real-time preview and easy customization"
      generatedCSS={generatedCSS}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<Palette size={24} />}
      breadcrumbs={<Breadcrumb />}
      controlsGridCols={2}
    >
      <FullWidthGroup>
        <ControlGroup label="Quick Presets">
          <div className="grid grid-cols-2 gap-2">
            {gradientPresets.map((preset) => (
              <Button
                key={preset.name}
                variant="secondary"
                size="sm"
                onClick={() => applyPreset(preset.config)}
                className="text-xs h-8"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </ControlGroup>
      </FullWidthGroup>

      <ControlGroup label="Gradient Type">
        <Select
          value={config.type}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateConfig({ type: e.target.value as "linear" | "radial" })
          }
        >
          <option value="linear">Linear Gradient</option>
          <option value="radial">Radial Gradient</option>
        </Select>
      </ControlGroup>

      {config.type === "linear" && (
        <ControlGroup label={`Angle: ${config.angle}°`}>
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
        </ControlGroup>
      )}

      <FullWidthGroup>
        <ControlGroup
          label={
            <div className="flex items-center justify-between w-full">
              <span>Color Stops</span>
              <Button
                size="sm"
                variant="secondary"
                onClick={addStop}
                className="h-8"
              >
                <Plus size={12} className="mr-1" />
                Add
              </Button>
            </div>
          }
        >
          <div className="space-y-3">
            {config.stops.map((stop, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateStop(index, { color: e.target.value })
                  }
                  className="w-10 h-8 rounded border border-[var(--fe-border)] cursor-pointer"
                />
                <Input
                  type="text"
                  value={stop.color}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateStop(index, { color: e.target.value })
                  }
                  className="flex-1 text-xs h-8"
                  placeholder="#000000"
                />
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={stop.position}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateStop(index, {
                      position: parseInt(e.target.value) || 0,
                    })
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
        </ControlGroup>
      </FullWidthGroup>

      <FullWidthGroup>
        <ControlGroup label="Quick Preview">
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
        </ControlGroup>
      </FullWidthGroup>

      <FullWidthGroup>
        <ProTip content="Linear gradients work great for backgrounds and overlays. Try different angles and multiple color stops to create unique effects. Radial gradients are perfect for buttons and spotlight effects." />
      </FullWidthGroup>
    </ToolLayout>
  );
}
