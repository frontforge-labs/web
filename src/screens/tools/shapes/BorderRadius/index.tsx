import { useState, type JSX } from "react";
import {
  Button,
  Input,
  Select,
  ColorInput,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Circle, RotateCcw } from "lucide-react";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";
import type { TBorderRadiusConfig } from "./types";
import { defaultConfig, borderRadiusPresets } from "./utils";

export function BorderRadiusScreen(): JSX.Element {
  const [config, setConfig] = useState<TBorderRadiusConfig>(defaultConfig);

  const updateConfig = (updates: Partial<TBorderRadiusConfig>): void => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const applyPreset = (preset: (typeof borderRadiusPresets)[0]): void => {
    setConfig({ ...config, ...preset.config });
  };

  const resetTool = (): void => {
    setConfig(defaultConfig);
  };

  const generateCSS = (): string => {
    if (config.useAdvanced) {
      const hasElliptical =
        config.topLeftH !== config.topLeftV ||
        config.topRightH !== config.topRightV ||
        config.bottomRightH !== config.bottomRightV ||
        config.bottomLeftH !== config.bottomLeftV;

      if (hasElliptical) {
        return `/* Advanced Border Radius (Elliptical Corners) */
border-radius: ${config.topLeftH}${config.unit} ${config.topRightH}${config.unit} ${config.bottomRightH}${config.unit} ${config.bottomLeftH}${config.unit} / ${config.topLeftV}${config.unit} ${config.topRightV}${config.unit} ${config.bottomRightV}${config.unit} ${config.bottomLeftV}${config.unit};`;
      }
    }

    const allSame =
      config.topLeft === config.topRight &&
      config.topRight === config.bottomRight &&
      config.bottomRight === config.bottomLeft;

    if (allSame) {
      return `/* Border Radius */
border-radius: ${config.topLeft}${config.unit};`;
    }

    return `/* Border Radius */
border-radius: ${config.topLeft}${config.unit} ${config.topRight}${config.unit} ${config.bottomRight}${config.unit} ${config.bottomLeft}${config.unit};`;
  };

  const generatedCSS = generateCSS();

  const getBorderRadiusStyle = (): string => {
    if (config.useAdvanced) {
      return `${config.topLeftH}${config.unit} ${config.topRightH}${config.unit} ${config.bottomRightH}${config.unit} ${config.bottomLeftH}${config.unit} / ${config.topLeftV}${config.unit} ${config.topRightV}${config.unit} ${config.bottomRightV}${config.unit} ${config.bottomLeftV}${config.unit}`;
    }
    return `${config.topLeft}${config.unit} ${config.topRight}${config.unit} ${config.bottomRight}${config.unit} ${config.bottomLeft}${config.unit}`;
  };

  const previewElement = (
    <div className="flex items-center justify-center min-h-[400px] p-8 bg-gray-100">
      <div
        className="shadow-lg flex items-center justify-center text-white font-semibold text-lg"
        style={{
          width: `${config.elementWidth}px`,
          height: `${config.elementHeight}px`,
          backgroundColor: config.backgroundColor,
          borderRadius: getBorderRadiusStyle(),
        }}
      >
        Preview
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Border Radius Previewer"
      description="Create custom border radius with individual corner control and live preview"
      icon={<Circle size={24} />}
      iconBgClassName="bg-gradient-to-r from-purple-500 to-pink-600"
      breadcrumbs={
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Shapes", href: "/tools/shapes" },
            { label: "Border Radius", href: "/tools/shapes/border-radius" },
          ]}
        />
      }
      generatedCSS={generatedCSS}
      previewElement={previewElement}
    >
      <ProTip content="Use percentage units for responsive rounded shapes. Combine different corner values to create unique organic shapes. The slash notation (horizontal / vertical) enables elliptical corners for advanced effects." />

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
            {borderRadiusPresets.map((preset) => (
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

      {/* Unit Selection */}
      <ControlGroup label="Unit">
        <Select
          value={config.unit}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateConfig({ unit: e.target.value as "px" | "%" | "rem" })
          }
        >
          <option value="px">Pixels (px)</option>
          <option value="%">Percentage (%)</option>
          <option value="rem">Rem (rem)</option>
        </Select>
      </ControlGroup>

      {/* Advanced Mode Toggle */}
      <FullWidthGroup>
        <ControlGroup label="Advanced Mode">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="advanced-mode"
              checked={config.useAdvanced}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateConfig({ useAdvanced: e.target.checked })
              }
              className="rounded"
            />
            <label htmlFor="advanced-mode" className="text-sm font-medium">
              Enable elliptical corners (separate horizontal/vertical radius)
            </label>
          </div>
        </ControlGroup>
      </FullWidthGroup>

      {!config.useAdvanced ? (
        <>
          {/* Simple Mode - Individual Corners */}
          <ControlGroup label={`Top Left: ${config.topLeft}${config.unit}`}>
            <input
              type="range"
              min="0"
              max={config.unit === "%" ? "100" : "200"}
              step="1"
              value={config.topLeft}
              onChange={(e) =>
                updateConfig({ topLeft: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>

          <ControlGroup label={`Top Right: ${config.topRight}${config.unit}`}>
            <input
              type="range"
              min="0"
              max={config.unit === "%" ? "100" : "200"}
              step="1"
              value={config.topRight}
              onChange={(e) =>
                updateConfig({ topRight: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>

          <ControlGroup
            label={`Bottom Right: ${config.bottomRight}${config.unit}`}
          >
            <input
              type="range"
              min="0"
              max={config.unit === "%" ? "100" : "200"}
              step="1"
              value={config.bottomRight}
              onChange={(e) =>
                updateConfig({ bottomRight: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>

          <ControlGroup
            label={`Bottom Left: ${config.bottomLeft}${config.unit}`}
          >
            <input
              type="range"
              min="0"
              max={config.unit === "%" ? "100" : "200"}
              step="1"
              value={config.bottomLeft}
              onChange={(e) =>
                updateConfig({ bottomLeft: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>
        </>
      ) : (
        <>
          {/* Advanced Mode - Elliptical Corners */}
          <FullWidthGroup>
            <ControlGroup label="Top Left Corner">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Horizontal: {config.topLeftH}
                    {config.unit}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={config.unit === "%" ? "100" : "200"}
                    step="1"
                    value={config.topLeftH}
                    onChange={(e) =>
                      updateConfig({ topLeftH: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Vertical: {config.topLeftV}
                    {config.unit}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={config.unit === "%" ? "100" : "200"}
                    step="1"
                    value={config.topLeftV}
                    onChange={(e) =>
                      updateConfig({ topLeftV: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </ControlGroup>
          </FullWidthGroup>

          <FullWidthGroup>
            <ControlGroup label="Top Right Corner">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Horizontal: {config.topRightH}
                    {config.unit}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={config.unit === "%" ? "100" : "200"}
                    step="1"
                    value={config.topRightH}
                    onChange={(e) =>
                      updateConfig({ topRightH: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Vertical: {config.topRightV}
                    {config.unit}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={config.unit === "%" ? "100" : "200"}
                    step="1"
                    value={config.topRightV}
                    onChange={(e) =>
                      updateConfig({ topRightV: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </ControlGroup>
          </FullWidthGroup>

          <FullWidthGroup>
            <ControlGroup label="Bottom Right Corner">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Horizontal: {config.bottomRightH}
                    {config.unit}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={config.unit === "%" ? "100" : "200"}
                    step="1"
                    value={config.bottomRightH}
                    onChange={(e) =>
                      updateConfig({ bottomRightH: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Vertical: {config.bottomRightV}
                    {config.unit}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={config.unit === "%" ? "100" : "200"}
                    step="1"
                    value={config.bottomRightV}
                    onChange={(e) =>
                      updateConfig({ bottomRightV: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </ControlGroup>
          </FullWidthGroup>

          <FullWidthGroup>
            <ControlGroup label="Bottom Left Corner">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Horizontal: {config.bottomLeftH}
                    {config.unit}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={config.unit === "%" ? "100" : "200"}
                    step="1"
                    value={config.bottomLeftH}
                    onChange={(e) =>
                      updateConfig({ bottomLeftH: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Vertical: {config.bottomLeftV}
                    {config.unit}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={config.unit === "%" ? "100" : "200"}
                    step="1"
                    value={config.bottomLeftV}
                    onChange={(e) =>
                      updateConfig({ bottomLeftV: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </ControlGroup>
          </FullWidthGroup>
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
            min={50}
            max={600}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Height (px)</label>
          <Input
            type="number"
            value={config.elementHeight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig({ elementHeight: parseInt(e.target.value) || 200 })
            }
            min={50}
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
