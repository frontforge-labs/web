import { useState, type JSX } from "react";
import { Zap } from "lucide-react";
import {
  ToolLayout,
  Button,
  Input,
  Select,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import type { TTransitionConfig } from "./types";
import {
  defaultTransitionConfig,
  transitionPresets,
  generateTransitionCSS,
} from "./utils";

export function TransitionsScreen(): JSX.Element {
  const [config, setConfig] = useState<TTransitionConfig>(
    defaultTransitionConfig
  );
  const [activeState, setActiveState] = useState<"initial" | "hover">(
    "initial"
  );

  const handleReset = () => {
    setConfig(defaultTransitionConfig);
    setActiveState("initial");
  };

  const applyPreset = (presetName: string) => {
    const preset = transitionPresets[presetName];
    if (preset) {
      setConfig({
        ...preset,
        isHovered: false,
      });
      setActiveState("initial");
    }
  };

  const currentStyle =
    activeState === "hover" ? config.hoverState : config.initialState;

  const previewElement = (
    <div className="flex flex-col items-center justify-center gap-8 min-h-[400px]">
      {/* Preview Element */}
      <div
        className="cursor-pointer shadow-lg"
        style={{
          width: currentStyle.width,
          height: currentStyle.height,
          backgroundColor: currentStyle.backgroundColor,
          transform: currentStyle.transform,
          opacity: currentStyle.opacity,
          borderRadius: currentStyle.borderRadius,
          transition: `${config.property} ${config.duration}s ${config.timingFunction} ${config.delay}s`,
        }}
        onMouseEnter={() => setActiveState("hover")}
        onMouseLeave={() => setActiveState("initial")}
      />

      {/* State Info */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">
          Current State:{" "}
          <span className="font-semibold text-blue-600">
            {activeState === "initial" ? "Initial" : "Hover"}
          </span>
        </p>
        <p className="text-xs text-gray-500">
          Hover over the element to see the transition
        </p>
      </div>

      {/* Manual Toggle */}
      <div className="flex gap-2">
        <Button
          variant={activeState === "initial" ? "default" : "secondary"}
          size="sm"
          onClick={() => setActiveState("initial")}
        >
          Initial State
        </Button>
        <Button
          variant={activeState === "hover" ? "default" : "secondary"}
          size="sm"
          onClick={() => setActiveState("hover")}
        >
          Hover State
        </Button>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Transition Playground"
      description="Experiment with CSS transitions and timing functions for smooth property changes"
      icon={<Zap size={24} />}
      breadcrumbs={<Breadcrumb />}
      generatedCSS={generateTransitionCSS(config)}
      onReset={handleReset}
      showPreview={true}
      previewElement={previewElement}
      controlsTitle="Transition Controls"
      controlsGridCols={2}
      iconBgClassName="bg-gradient-to-r from-yellow-500 to-orange-600"
    >
      {/* Quick Presets */}
      <FullWidthGroup>
        <ControlGroup label="Quick Presets">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.keys(transitionPresets).map((preset) => (
            <Button
              key={preset}
              variant="ghost"
              size="sm"
              onClick={() => applyPreset(preset)}
            >
              {preset}
            </Button>
          ))}
          </div>
        </ControlGroup>
      </FullWidthGroup>

      {/* Transition Settings */}
      <ControlGroup label="Property">
        <Select
          value={config.property}
          onChange={(e) => setConfig({ ...config, property: e.target.value })}
        >
          <option value="all">All</option>
          <option value="transform">Transform</option>
          <option value="opacity">Opacity</option>
          <option value="background-color">Background Color</option>
          <option value="width">Width</option>
          <option value="height">Height</option>
          <option value="border-radius">Border Radius</option>
        </Select>
      </ControlGroup>

      <ControlGroup label="Duration (s)">
        <Input
          type="number"
          min="0"
          step="0.1"
          value={config.duration}
          onChange={(e) =>
            setConfig({ ...config, duration: parseFloat(e.target.value) || 0 })
          }
        />
      </ControlGroup>

      <ControlGroup label="Timing Function">
        <Select
          value={config.timingFunction}
          onChange={(e) =>
            setConfig({ ...config, timingFunction: e.target.value })
          }
        >
          <option value="ease">Ease</option>
          <option value="linear">Linear</option>
          <option value="ease-in">Ease In</option>
          <option value="ease-out">Ease Out</option>
          <option value="ease-in-out">Ease In Out</option>
          <option value="cubic-bezier(0.4, 0, 0.2, 1)">
            Cubic Bezier (Material)
          </option>
          <option value="cubic-bezier(0.68, -0.55, 0.27, 1.55)">
            Cubic Bezier (Bounce)
          </option>
        </Select>
      </ControlGroup>

      <ControlGroup label="Delay (s)">
        <Input
          type="number"
          min="0"
          step="0.1"
          value={config.delay}
          onChange={(e) =>
            setConfig({ ...config, delay: parseFloat(e.target.value) || 0 })
          }
        />
      </ControlGroup>

      {/* Initial State */}
      <FullWidthGroup>
        <h3 className="text-sm font-semibold mb-3 col-span-2">Initial State</h3>
        <div className="grid grid-cols-2 gap-3 col-span-2">
          <ControlGroup label="Width">
            <Input
              value={config.initialState.width}
              onChange={(e) =>
                setConfig({
                  ...config,
                  initialState: {
                    ...config.initialState,
                    width: e.target.value,
                  },
                })
              }
            />
          </ControlGroup>

          <ControlGroup label="Height">
            <Input
              value={config.initialState.height}
              onChange={(e) =>
                setConfig({
                  ...config,
                  initialState: {
                    ...config.initialState,
                    height: e.target.value,
                  },
                })
              }
            />
          </ControlGroup>

          <ControlGroup label="Background">
            <Input
              type="color"
              value={config.initialState.backgroundColor}
              onChange={(e) =>
                setConfig({
                  ...config,
                  initialState: {
                    ...config.initialState,
                    backgroundColor: e.target.value,
                  },
                })
              }
            />
          </ControlGroup>

          <ControlGroup label="Opacity">
            <Input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={config.initialState.opacity}
              onChange={(e) =>
                setConfig({
                  ...config,
                  initialState: {
                    ...config.initialState,
                    opacity: parseFloat(e.target.value) || 0,
                  },
                })
              }
            />
          </ControlGroup>

          <ControlGroup label="Transform">
            <Input
              value={config.initialState.transform}
              onChange={(e) =>
                setConfig({
                  ...config,
                  initialState: {
                    ...config.initialState,
                    transform: e.target.value,
                  },
                })
              }
              placeholder="scale(1) rotate(0deg)"
            />
          </ControlGroup>

          <ControlGroup label="Border Radius">
            <Input
              value={config.initialState.borderRadius}
              onChange={(e) =>
                setConfig({
                  ...config,
                  initialState: {
                    ...config.initialState,
                    borderRadius: e.target.value,
                  },
                })
              }
            />
          </ControlGroup>
        </div>
      </FullWidthGroup>

      {/* Hover State */}
      <FullWidthGroup>
        <h3 className="text-sm font-semibold mb-3 col-span-2">Hover State</h3>
        <div className="grid grid-cols-2 gap-3 col-span-2">
          <ControlGroup label="Width">
            <Input
              value={config.hoverState.width}
              onChange={(e) =>
                setConfig({
                  ...config,
                  hoverState: {
                    ...config.hoverState,
                    width: e.target.value,
                  },
                })
              }
            />
          </ControlGroup>

          <ControlGroup label="Height">
            <Input
              value={config.hoverState.height}
              onChange={(e) =>
                setConfig({
                  ...config,
                  hoverState: {
                    ...config.hoverState,
                    height: e.target.value,
                  },
                })
              }
            />
          </ControlGroup>

          <ControlGroup label="Background">
            <Input
              type="color"
              value={config.hoverState.backgroundColor}
              onChange={(e) =>
                setConfig({
                  ...config,
                  hoverState: {
                    ...config.hoverState,
                    backgroundColor: e.target.value,
                  },
                })
              }
            />
          </ControlGroup>

          <ControlGroup label="Opacity">
            <Input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={config.hoverState.opacity}
              onChange={(e) =>
                setConfig({
                  ...config,
                  hoverState: {
                    ...config.hoverState,
                    opacity: parseFloat(e.target.value) || 0,
                  },
                })
              }
            />
          </ControlGroup>

          <ControlGroup label="Transform">
            <Input
              value={config.hoverState.transform}
              onChange={(e) =>
                setConfig({
                  ...config,
                  hoverState: {
                    ...config.hoverState,
                    transform: e.target.value,
                  },
                })
              }
              placeholder="scale(1.1) rotate(5deg)"
            />
          </ControlGroup>

          <ControlGroup label="Border Radius">
            <Input
              value={config.hoverState.borderRadius}
              onChange={(e) =>
                setConfig({
                  ...config,
                  hoverState: {
                    ...config.hoverState,
                    borderRadius: e.target.value,
                  },
                })
              }
            />
          </ControlGroup>
        </div>
      </FullWidthGroup>
    </ToolLayout>
  );
}
