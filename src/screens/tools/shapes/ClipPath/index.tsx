import { useState, type JSX } from "react";
import {
  Button,
  Select,
  ColorInput,
  Input,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Scissors, RotateCcw, Plus, Trash2 } from "lucide-react";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";
import type { TClipPathConfig, TPolygonPoint } from "./types";
import { defaultConfig, clipPathPresets } from "./utils";

export function ClipPathScreen(): JSX.Element {
  const [config, setConfig] = useState<TClipPathConfig>(defaultConfig);

  const updateConfig = (updates: Partial<TClipPathConfig>): void => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const applyPreset = (preset: (typeof clipPathPresets)[0]): void => {
    setConfig({ ...config, ...preset.config });
  };

  const resetTool = (): void => {
    setConfig(defaultConfig);
  };

  const addPoint = (): void => {
    updateConfig({
      points: [...config.points, { x: 50, y: 50 }],
    });
  };

  const removePoint = (index: number): void => {
    if (config.points.length > 3) {
      updateConfig({
        points: config.points.filter((_, i) => i !== index),
      });
    }
  };

  const updatePoint = (
    index: number,
    updates: Partial<TPolygonPoint>
  ): void => {
    updateConfig({
      points: config.points.map((point, i) =>
        i === index ? { ...point, ...updates } : point
      ),
    });
  };

  const generateCSS = (): string => {
    let clipPath = "";

    switch (config.type) {
      case "polygon": {
        const points = config.points
          .map((p) => `${p.x}% ${p.y}%`)
          .join(", ");
        clipPath = `polygon(${points})`;
        break;
      }
      case "circle":
        clipPath = `circle(${config.circleRadius}% at ${config.circleX}% ${config.circleY}%)`;
        break;
      case "ellipse":
        clipPath = `ellipse(${config.ellipseRadiusX}% ${config.ellipseRadiusY}% at ${config.ellipseX}% ${config.ellipseY}%)`;
        break;
      case "inset": {
        const round = config.insetRound > 0 ? ` round ${config.insetRound}%` : "";
        clipPath = `inset(${config.insetTop}% ${config.insetRight}% ${config.insetBottom}% ${config.insetLeft}%${round})`;
        break;
      }
    }

    return `/* Clip-Path Shape */
clip-path: ${clipPath};`;
  };

  const generatedCSS = generateCSS();

  const getClipPathValue = (): string => {
    switch (config.type) {
      case "polygon":
        return `polygon(${config.points.map((p) => `${p.x}% ${p.y}%`).join(", ")})`;
      case "circle":
        return `circle(${config.circleRadius}% at ${config.circleX}% ${config.circleY}%)`;
      case "ellipse":
        return `ellipse(${config.ellipseRadiusX}% ${config.ellipseRadiusY}% at ${config.ellipseX}% ${config.ellipseY}%)`;
      case "inset": {
        const round = config.insetRound > 0 ? ` round ${config.insetRound}%` : "";
        return `inset(${config.insetTop}% ${config.insetRight}% ${config.insetBottom}% ${config.insetLeft}%${round})`;
      }
      default:
        return "none";
    }
  };

  const previewElement = (
    <div className="flex items-center justify-center min-h-[400px] p-8 bg-gray-100">
      <div
        className="shadow-lg"
        style={{
          width: `${config.elementWidth}px`,
          height: `${config.elementHeight}px`,
          backgroundColor: config.backgroundColor,
          clipPath: getClipPathValue(),
        }}
      />
    </div>
  );

  return (
    <ToolLayout
      title="Clip-Path Maker"
      description="Interactive tool for creating CSS clip-path shapes with multiple shape types"
      icon={<Scissors size={24} />}
      iconBgClassName="bg-gradient-to-r from-purple-500 to-pink-600"
      breadcrumbs={
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Shapes", href: "/tools/shapes" },
            { label: "Clip-Path", href: "/tools/shapes/clip-path" },
          ]}
        />
      }
      generatedCSS={generatedCSS}
      previewElement={previewElement}
    >
      <ProTip content="Clip-path is GPU-accelerated and perfect for creating custom shapes. Use percentage values for responsive designs. Combine with transitions for smooth shape morphing effects." />

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
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

      {/* Presets */}
      <FullWidthGroup>
        <ControlGroup label="Quick Presets">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {clipPathPresets.map((preset) => (
              <Button
                key={preset.name}
                variant="secondary"
                size="sm"
                onClick={() => applyPreset(preset)}
                className="text-xs"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </ControlGroup>
      </FullWidthGroup>

      {/* Shape Type */}
      <ControlGroup label="Shape Type">
        <Select
          value={config.type}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateConfig({
              type: e.target.value as "polygon" | "circle" | "ellipse" | "inset",
            })
          }
        >
          <option value="polygon">Polygon</option>
          <option value="circle">Circle</option>
          <option value="ellipse">Ellipse</option>
          <option value="inset">Inset (Rectangle)</option>
        </Select>
      </ControlGroup>

      {/* Polygon Controls */}
      {config.type === "polygon" && (
        <FullWidthGroup>
          <ControlGroup
            label={
              <div className="flex items-center justify-between w-full">
                <span>Polygon Points ({config.points.length})</span>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={addPoint}
                  className="h-8"
                >
                  <Plus size={12} className="mr-1" />
                  Add Point
                </Button>
              </div>
            }
          >
            <div className="space-y-3">
              {config.points.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs font-medium w-8">#{index + 1}</span>
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs mb-1">X: {point.x}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={point.x}
                        onChange={(e) =>
                          updatePoint(index, { x: parseInt(e.target.value) })
                        }
                        className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Y: {point.y}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={point.y}
                        onChange={(e) =>
                          updatePoint(index, { y: parseInt(e.target.value) })
                        }
                        className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                  {config.points.length > 3 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removePoint(index)}
                      className="p-1 h-8 w-8 text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={12} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ControlGroup>
        </FullWidthGroup>
      )}

      {/* Circle Controls */}
      {config.type === "circle" && (
        <>
          <ControlGroup label={`Radius: ${config.circleRadius}%`}>
            <input
              type="range"
              min="0"
              max="100"
              value={config.circleRadius}
              onChange={(e) =>
                updateConfig({ circleRadius: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>
          <ControlGroup label={`Center X: ${config.circleX}%`}>
            <input
              type="range"
              min="0"
              max="100"
              value={config.circleX}
              onChange={(e) =>
                updateConfig({ circleX: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>
          <ControlGroup label={`Center Y: ${config.circleY}%`}>
            <input
              type="range"
              min="0"
              max="100"
              value={config.circleY}
              onChange={(e) =>
                updateConfig({ circleY: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>
        </>
      )}

      {/* Ellipse Controls */}
      {config.type === "ellipse" && (
        <>
          <ControlGroup label={`Radius X: ${config.ellipseRadiusX}%`}>
            <input
              type="range"
              min="0"
              max="100"
              value={config.ellipseRadiusX}
              onChange={(e) =>
                updateConfig({ ellipseRadiusX: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>
          <ControlGroup label={`Radius Y: ${config.ellipseRadiusY}%`}>
            <input
              type="range"
              min="0"
              max="100"
              value={config.ellipseRadiusY}
              onChange={(e) =>
                updateConfig({ ellipseRadiusY: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>
          <ControlGroup label={`Center X: ${config.ellipseX}%`}>
            <input
              type="range"
              min="0"
              max="100"
              value={config.ellipseX}
              onChange={(e) =>
                updateConfig({ ellipseX: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>
          <ControlGroup label={`Center Y: ${config.ellipseY}%`}>
            <input
              type="range"
              min="0"
              max="100"
              value={config.ellipseY}
              onChange={(e) =>
                updateConfig({ ellipseY: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>
        </>
      )}

      {/* Inset Controls */}
      {config.type === "inset" && (
        <>
          <ControlGroup label={`Top: ${config.insetTop}%`}>
            <input
              type="range"
              min="0"
              max="50"
              value={config.insetTop}
              onChange={(e) =>
                updateConfig({ insetTop: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>
          <ControlGroup label={`Right: ${config.insetRight}%`}>
            <input
              type="range"
              min="0"
              max="50"
              value={config.insetRight}
              onChange={(e) =>
                updateConfig({ insetRight: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>
          <ControlGroup label={`Bottom: ${config.insetBottom}%`}>
            <input
              type="range"
              min="0"
              max="50"
              value={config.insetBottom}
              onChange={(e) =>
                updateConfig({ insetBottom: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>
          <ControlGroup label={`Left: ${config.insetLeft}%`}>
            <input
              type="range"
              min="0"
              max="50"
              value={config.insetLeft}
              onChange={(e) =>
                updateConfig({ insetLeft: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>
          <ControlGroup label={`Border Radius: ${config.insetRound}%`}>
            <input
              type="range"
              min="0"
              max="50"
              value={config.insetRound}
              onChange={(e) =>
                updateConfig({ insetRound: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>
        </>
      )}

      {/* Element Settings */}
      <ControlGroup label="Element Settings">
        <div>
          <label className="block text-sm font-medium mb-2">Width (px)</label>
          <Input
            type="number"
            value={config.elementWidth}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig({ elementWidth: parseInt(e.target.value) || 300 })
            }
            min={100}
            max={600}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Height (px)</label>
          <Input
            type="number"
            value={config.elementHeight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig({ elementHeight: parseInt(e.target.value) || 300 })
            }
            min={100}
            max={600}
          />
        </div>
        <ColorInput
          label="Background Color"
          value={config.backgroundColor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateConfig({ backgroundColor: e.target.value })
          }
        />
      </ControlGroup>
    </ToolLayout>
  );
}
