import { useState, type JSX } from "react";
import {
  Button,
  Input,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Filter, RotateCcw } from "lucide-react";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";
import type { TFilterConfig } from "./types";
import { defaultFilters, filterPresets } from "./utils";

export function CSSFiltersScreen(): JSX.Element {
  const [config, setConfig] = useState<TFilterConfig>(defaultFilters);

  const updateConfig = (updates: Partial<TFilterConfig>): void => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const applyPreset = (preset: (typeof filterPresets)[0]): void => {
    setConfig(preset.config);
  };

  const resetTool = (): void => {
    setConfig(defaultFilters);
  };

  const generateCSS = (): string => {
    const filters: string[] = [];

    if (config.blur > 0) filters.push(`blur(${config.blur}px)`);
    if (config.brightness !== 100)
      filters.push(`brightness(${config.brightness}%)`);
    if (config.contrast !== 100) filters.push(`contrast(${config.contrast}%)`);
    if (config.grayscale > 0) filters.push(`grayscale(${config.grayscale}%)`);
    if (config.hueRotate !== 0)
      filters.push(`hue-rotate(${config.hueRotate}deg)`);
    if (config.invert > 0) filters.push(`invert(${config.invert}%)`);
    if (config.saturate !== 100) filters.push(`saturate(${config.saturate}%)`);
    if (config.sepia > 0) filters.push(`sepia(${config.sepia}%)`);
    if (config.opacity !== 100) filters.push(`opacity(${config.opacity}%)`);
    if (
      config.dropShadowX !== 0 ||
      config.dropShadowY !== 0 ||
      config.dropShadowBlur !== 0
    ) {
      filters.push(
        `drop-shadow(${config.dropShadowX}px ${config.dropShadowY}px ${config.dropShadowBlur}px ${config.dropShadowColor})`
      );
    }

    if (filters.length === 0) {
      return `/* No filters applied */\nfilter: none;`;
    }

    return `/* CSS Filter Effects */\nfilter: ${filters.join("\n  ")};`;
  };

  const generatedCSS = generateCSS();

  const buildFilterStyle = (): string => {
    const filters: string[] = [];

    if (config.blur > 0) filters.push(`blur(${config.blur}px)`);
    if (config.brightness !== 100)
      filters.push(`brightness(${config.brightness}%)`);
    if (config.contrast !== 100) filters.push(`contrast(${config.contrast}%)`);
    if (config.grayscale > 0) filters.push(`grayscale(${config.grayscale}%)`);
    if (config.hueRotate !== 0)
      filters.push(`hue-rotate(${config.hueRotate}deg)`);
    if (config.invert > 0) filters.push(`invert(${config.invert}%)`);
    if (config.saturate !== 100) filters.push(`saturate(${config.saturate}%)`);
    if (config.sepia > 0) filters.push(`sepia(${config.sepia}%)`);
    if (config.opacity !== 100) filters.push(`opacity(${config.opacity}%)`);
    if (
      config.dropShadowX !== 0 ||
      config.dropShadowY !== 0 ||
      config.dropShadowBlur !== 0
    ) {
      filters.push(
        `drop-shadow(${config.dropShadowX}px ${config.dropShadowY}px ${config.dropShadowBlur}px ${config.dropShadowColor})`
      );
    }

    return filters.length > 0 ? filters.join(" ") : "none";
  };

  const previewElement = (
    <div className="flex items-center justify-center min-h-[300px] p-8 bg-gray-100">
      <div
        className="w-64 h-64 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg"
        style={{ filter: buildFilterStyle() }}
      >
        Preview
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="CSS Filter Playground"
      description="Interactive playground for CSS filter effects with real-time preview"
      icon={<Filter size={24} />}
      iconBgClassName="bg-gradient-to-r from-orange-500 to-red-600"
      breadcrumbs={
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Effects", href: "/tools/effects" },
            { label: "CSS Filters", href: "/tools/effects/filters" },
          ]}
        />
      }
      generatedCSS={generatedCSS}
      previewElement={previewElement}
    >
      <ProTip content="CSS filters are GPU-accelerated and work on any element. Combine multiple filters for creative effects, but avoid overdoing it as complex filters can impact performance on mobile devices." />

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="secondary"
          size="sm"
          onClick={resetTool}
          className="flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Reset All
        </Button>
      </div>

      {/* Filter Presets */}
      <FullWidthGroup>
        <ControlGroup label="Quick Presets">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {filterPresets.map((preset) => (
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

      {/* Blur Filter */}
      <ControlGroup label={`Blur: ${config.blur}px`}>
        <input
          type="range"
          min="0"
          max="20"
          step="0.5"
          value={config.blur}
          onChange={(e) => updateConfig({ blur: parseFloat(e.target.value) })}
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>0px</span>
          <span>20px</span>
        </div>
      </ControlGroup>

      {/* Brightness Filter */}
      <ControlGroup label={`Brightness: ${config.brightness}%`}>
        <input
          type="range"
          min="0"
          max="200"
          value={config.brightness}
          onChange={(e) =>
            updateConfig({ brightness: parseInt(e.target.value) })
          }
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>0%</span>
          <span>100%</span>
          <span>200%</span>
        </div>
      </ControlGroup>

      {/* Contrast Filter */}
      <ControlGroup label={`Contrast: ${config.contrast}%`}>
        <input
          type="range"
          min="0"
          max="200"
          value={config.contrast}
          onChange={(e) => updateConfig({ contrast: parseInt(e.target.value) })}
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>0%</span>
          <span>100%</span>
          <span>200%</span>
        </div>
      </ControlGroup>

      {/* Saturation Filter */}
      <ControlGroup label={`Saturate: ${config.saturate}%`}>
        <input
          type="range"
          min="0"
          max="200"
          value={config.saturate}
          onChange={(e) => updateConfig({ saturate: parseInt(e.target.value) })}
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>0%</span>
          <span>100%</span>
          <span>200%</span>
        </div>
      </ControlGroup>

      {/* Grayscale Filter */}
      <ControlGroup label={`Grayscale: ${config.grayscale}%`}>
        <input
          type="range"
          min="0"
          max="100"
          value={config.grayscale}
          onChange={(e) =>
            updateConfig({ grayscale: parseInt(e.target.value) })
          }
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </ControlGroup>

      {/* Sepia Filter */}
      <ControlGroup label={`Sepia: ${config.sepia}%`}>
        <input
          type="range"
          min="0"
          max="100"
          value={config.sepia}
          onChange={(e) => updateConfig({ sepia: parseInt(e.target.value) })}
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </ControlGroup>

      {/* Hue Rotate Filter */}
      <ControlGroup label={`Hue Rotate: ${config.hueRotate}°`}>
        <input
          type="range"
          min="0"
          max="360"
          value={config.hueRotate}
          onChange={(e) =>
            updateConfig({ hueRotate: parseInt(e.target.value) })
          }
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>0°</span>
          <span>180°</span>
          <span>360°</span>
        </div>
      </ControlGroup>

      {/* Invert Filter */}
      <ControlGroup label={`Invert: ${config.invert}%`}>
        <input
          type="range"
          min="0"
          max="100"
          value={config.invert}
          onChange={(e) => updateConfig({ invert: parseInt(e.target.value) })}
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </ControlGroup>

      {/* Opacity Filter */}
      <ControlGroup label={`Opacity: ${config.opacity}%`}>
        <input
          type="range"
          min="0"
          max="100"
          value={config.opacity}
          onChange={(e) => updateConfig({ opacity: parseInt(e.target.value) })}
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </ControlGroup>

      {/* Drop Shadow Settings */}
      <FullWidthGroup>
        <ControlGroup label="Drop Shadow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">
                X Offset
              </label>
              <Input
                type="number"
                value={config.dropShadowX}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig({ dropShadowX: parseInt(e.target.value) || 0 })
                }
                className="text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">
                Y Offset
              </label>
              <Input
                type="number"
                value={config.dropShadowY}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig({ dropShadowY: parseInt(e.target.value) || 0 })
                }
                className="text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Blur</label>
              <Input
                type="number"
                value={config.dropShadowBlur}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig({
                    dropShadowBlur: parseInt(e.target.value) || 0,
                  })
                }
                min={0}
                className="text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Color</label>
              <div className="flex items-center gap-1">
                <input
                  type="color"
                  value={
                    config.dropShadowColor.length === 7
                      ? config.dropShadowColor
                      : "#000000"
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateConfig({ dropShadowColor: e.target.value })
                  }
                  className="w-8 h-8 rounded border border-border cursor-pointer"
                />
                <Input
                  value={config.dropShadowColor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateConfig({ dropShadowColor: e.target.value })
                  }
                  className="flex-1 text-xs font-mono"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
        </ControlGroup>
      </FullWidthGroup>
    </ToolLayout>
  );
}
