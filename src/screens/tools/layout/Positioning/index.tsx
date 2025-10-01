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
import { Move, RotateCcw } from "lucide-react";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";
import type { TPositioningConfig } from "./types";
import { defaultConfig, positioningPresets } from "./utils";

export function PositioningScreen(): JSX.Element {
  const [config, setConfig] = useState<TPositioningConfig>(defaultConfig);

  const updateConfig = (updates: Partial<TPositioningConfig>): void => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const applyPreset = (preset: (typeof positioningPresets)[0]): void => {
    setConfig({ ...config, ...preset.config });
  };

  const resetTool = (): void => {
    setConfig(defaultConfig);
  };

  const generateCSS = (): string => {
    let css = `/* CSS Positioning */
.positioned-element {
  position: ${config.position};`;

    if (config.position !== "static") {
      if (config.top !== 0 || config.position === "sticky" || config.position === "fixed") {
        css += `\n  top: ${config.top}${config.position === "absolute" || config.position === "fixed" ? "%" : "px"};`;
      }
      if (config.right !== 0) {
        css += `\n  right: ${config.right}${config.position === "absolute" || config.position === "fixed" ? "%" : "px"};`;
      }
      if (config.bottom !== 0) {
        css += `\n  bottom: ${config.bottom}${config.position === "absolute" || config.position === "fixed" ? "%" : "px"};`;
      }
      if (config.left !== 0) {
        css += `\n  left: ${config.left}${config.position === "absolute" || config.position === "fixed" ? "%" : "px"};`;
      }
      if (config.zIndex !== 0) {
        css += `\n  z-index: ${config.zIndex};`;
      }
    }

    css += `\n}`;

    if (config.position === "absolute" || config.position === "fixed") {
      css += `\n\n/* Container needs position: relative for absolute children */
.container {
  position: relative;
}`;
    }

    return css;
  };

  const generatedCSS = generateCSS();

  const getPositionStyles = () => {
    const styles: React.CSSProperties = {
      position: config.position,
      width: config.elementWidth > 0 ? `${config.elementWidth}px` : undefined,
      height: `${config.elementHeight}px`,
      backgroundColor: config.backgroundColor,
    };

    if (config.position !== "static") {
      if (config.position === "absolute" || config.position === "fixed") {
        if (config.top !== 0) styles.top = `${config.top}%`;
        if (config.right !== 0) styles.right = `${config.right}%`;
        if (config.bottom !== 0) styles.bottom = `${config.bottom}%`;
        if (config.left !== 0) styles.left = `${config.left}%`;
      } else {
        if (config.top !== 0) styles.top = `${config.top}px`;
        if (config.right !== 0) styles.right = `${config.right}px`;
        if (config.bottom !== 0) styles.bottom = `${config.bottom}px`;
        if (config.left !== 0) styles.left = `${config.left}px`;
      }
      if (config.zIndex !== 0) styles.zIndex = config.zIndex;
    }

    return styles;
  };

  const previewElement = (
    <div
      className="relative bg-gray-100 overflow-auto"
      style={{
        height: `${config.position === "sticky" ? "600px" : "400px"}`,
      }}
    >
      {config.position === "sticky" && (
        <div className="h-[200px] bg-gray-200 border-b-2 border-gray-300 flex items-center justify-center text-gray-600">
          Scroll down to see sticky behavior →
        </div>
      )}

      <div
        className={`${config.showContainer ? "border-2 border-dashed border-gray-400 bg-white" : ""} p-8`}
        style={{
          position: config.position === "absolute" ? "relative" : undefined,
          height: `${config.containerHeight}px`,
        }}
      >
        {config.showReference && config.position !== "fixed" && (
          <div className="absolute top-0 left-0 w-32 h-20 bg-gray-300 border-2 border-gray-400 flex items-center justify-center text-xs text-gray-600">
            Reference
          </div>
        )}

        <div
          className="rounded shadow-lg flex items-center justify-center text-white font-semibold"
          style={getPositionStyles()}
        >
          {config.position}
        </div>

        {config.position === "sticky" && (
          <div className="mt-8 p-4 bg-gray-200 rounded">
            <p className="text-sm text-gray-700">
              Scroll to see sticky positioning in action. The element will
              "stick" when it reaches the top offset.
            </p>
          </div>
        )}
      </div>

      {config.position === "sticky" && (
        <div className="h-[400px] bg-gray-200 border-t-2 border-gray-300 flex items-center justify-center text-gray-600">
          More content below
        </div>
      )}
    </div>
  );

  const unit = config.position === "absolute" || config.position === "fixed" ? "%" : "px";
  const maxValue = config.position === "absolute" || config.position === "fixed" ? 100 : 200;

  return (
    <ToolLayout
      title="CSS Positioning Playground"
      description="Experiment with CSS positioning properties including static, relative, absolute, fixed, and sticky"
      icon={<Move size={24} />}
      iconBgClassName="bg-gradient-to-r from-cyan-500 to-blue-600"
      breadcrumbs={
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Layout", href: "/tools/layout" },
            { label: "Positioning", href: "/tools/layout/positioning" },
          ]}
        />
      }
      generatedCSS={generatedCSS}
      previewElement={previewElement}
    >
      <ProTip content="Static is the default position. Relative offsets from normal position. Absolute positions relative to nearest positioned ancestor. Fixed positions relative to viewport. Sticky combines relative and fixed based on scroll." />

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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {positioningPresets.map((preset) => (
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

      {/* Position Type */}
      <ControlGroup label="Position Type">
        <Select
          value={config.position}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateConfig({ position: e.target.value as TPositioningConfig["position"] })
          }
        >
          <option value="static">Static (Default)</option>
          <option value="relative">Relative</option>
          <option value="absolute">Absolute</option>
          <option value="fixed">Fixed</option>
          <option value="sticky">Sticky</option>
        </Select>
      </ControlGroup>

      {/* Offset Controls */}
      {config.position !== "static" && (
        <>
          <ControlGroup label={`Top: ${config.top}${unit}`}>
            <input
              type="range"
              min="0"
              max={maxValue}
              step={unit === "%" ? "5" : "10"}
              value={config.top}
              onChange={(e) => updateConfig({ top: parseInt(e.target.value) })}
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>

          <ControlGroup label={`Right: ${config.right}${unit}`}>
            <input
              type="range"
              min="0"
              max={maxValue}
              step={unit === "%" ? "5" : "10"}
              value={config.right}
              onChange={(e) =>
                updateConfig({ right: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>

          <ControlGroup label={`Bottom: ${config.bottom}${unit}`}>
            <input
              type="range"
              min="0"
              max={maxValue}
              step={unit === "%" ? "5" : "10"}
              value={config.bottom}
              onChange={(e) =>
                updateConfig({ bottom: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>

          <ControlGroup label={`Left: ${config.left}${unit}`}>
            <input
              type="range"
              min="0"
              max={maxValue}
              step={unit === "%" ? "5" : "10"}
              value={config.left}
              onChange={(e) => updateConfig({ left: parseInt(e.target.value) })}
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>

          <ControlGroup label={`Z-Index: ${config.zIndex}`}>
            <input
              type="range"
              min="-5"
              max="10"
              step="1"
              value={config.zIndex}
              onChange={(e) =>
                updateConfig({ zIndex: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>
        </>
      )}

      {/* Element Settings */}
      <ControlGroup label="Element Settings">
        <div>
          <label className="block text-sm font-medium mb-2">
            Width (px) {config.elementWidth === 0 && "(auto)"}
          </label>
          <Input
            type="number"
            value={config.elementWidth}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig({ elementWidth: parseInt(e.target.value) || 0 })
            }
            min={0}
            max={600}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Height (px)</label>
          <Input
            type="number"
            value={config.elementHeight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig({ elementHeight: parseInt(e.target.value) || 100 })
            }
            min={50}
            max={400}
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

      {/* Display Options */}
      <FullWidthGroup>
        <ControlGroup label="Display Options">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="show-container"
                checked={config.showContainer}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig({ showContainer: e.target.checked })
                }
                className="rounded"
              />
              <label htmlFor="show-container" className="text-sm font-medium">
                Show container boundary
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="show-reference"
                checked={config.showReference}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig({ showReference: e.target.checked })
                }
                className="rounded"
              />
              <label htmlFor="show-reference" className="text-sm font-medium">
                Show reference element
              </label>
            </div>
          </div>
        </ControlGroup>
      </FullWidthGroup>

      {/* Position Types Reference */}
      <FullWidthGroup>
        <ControlGroup label="Position Types Reference">
          <div className="text-xs text-muted space-y-2">
            <p>
              <strong>Static:</strong> Default flow, ignores offset properties
            </p>
            <p>
              <strong>Relative:</strong> Offset from normal position, preserves
              space
            </p>
            <p>
              <strong>Absolute:</strong> Removed from flow, positioned relative
              to nearest positioned ancestor
            </p>
            <p>
              <strong>Fixed:</strong> Removed from flow, positioned relative to
              viewport
            </p>
            <p>
              <strong>Sticky:</strong> Hybrid of relative and fixed based on
              scroll position
            </p>
          </div>
        </ControlGroup>
      </FullWidthGroup>
    </ToolLayout>
  );
}
