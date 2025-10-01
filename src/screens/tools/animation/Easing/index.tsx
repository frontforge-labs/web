import { useState, useEffect, type JSX } from "react";
import { Gauge } from "lucide-react";
import {
  ToolLayout,
  Button,
  Input,
  Select,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import type { TEasingConfig } from "./types";
import {
  defaultEasingConfig,
  easingPresets,
  generateEasingCSS,
  generateBezierCurvePath,
} from "./utils";

export function EasingScreen(): JSX.Element {
  const [config, setConfig] = useState<TEasingConfig>(defaultEasingConfig);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, config.duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, config.duration]);

  const handleReset = () => {
    setConfig(defaultEasingConfig);
    setIsAnimating(false);
  };

  const applyPreset = (presetValue: string, bezier?: [number, number, number, number]) => {
    setConfig({
      ...config,
      easingFunction: presetValue,
      customBezier: bezier
        ? { x1: bezier[0], y1: bezier[1], x2: bezier[2], y2: bezier[3] }
        : config.customBezier,
    });
    setIsAnimating(false);
  };

  const currentEasing =
    config.easingFunction === "custom"
      ? `cubic-bezier(${config.customBezier.x1}, ${config.customBezier.y1}, ${config.customBezier.x2}, ${config.customBezier.y2})`
      : config.easingFunction;

  const bezier = config.easingFunction.startsWith("cubic-bezier")
    ? config.easingFunction
        .match(/cubic-bezier\((.*?)\)/)?.[1]
        .split(",")
        .map((v) => parseFloat(v.trim())) || [0.25, 0.1, 0.25, 1]
    : config.easingFunction === "custom"
    ? [config.customBezier.x1, config.customBezier.y1, config.customBezier.x2, config.customBezier.y2]
    : [0.25, 0.1, 0.25, 1];

  const previewElement = (
    <div className="flex flex-col items-center justify-center gap-8 min-h-[400px]">
      {/* Bezier Curve Visualization */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-auto"
            style={{ maxHeight: "300px" }}
          >
            {/* Grid */}
            <defs>
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#grid)" />

            {/* Axes */}
            <line
              x1="0"
              y1="200"
              x2="200"
              y2="200"
              stroke="#9ca3af"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="200"
              x2="0"
              y2="0"
              stroke="#9ca3af"
              strokeWidth="1"
            />

            {/* Control point lines */}
            <line
              x1="0"
              y1="200"
              x2={bezier[0] * 200}
              y2={200 - bezier[1] * 200}
              stroke="#3b82f6"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.5"
            />
            <line
              x1="200"
              y1="0"
              x2={bezier[2] * 200}
              y2={200 - bezier[3] * 200}
              stroke="#3b82f6"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.5"
            />

            {/* Bezier curve */}
            <path
              d={generateBezierCurvePath(bezier[0], bezier[1], bezier[2], bezier[3], 200, 200)}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Control points */}
            <circle
              cx={bezier[0] * 200}
              cy={200 - bezier[1] * 200}
              r="6"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="2"
            />
            <circle
              cx={bezier[2] * 200}
              cy={200 - bezier[3] * 200}
              r="6"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="2"
            />

            {/* Start and end points */}
            <circle cx="0" cy="200" r="4" fill="#9ca3af" />
            <circle cx="200" cy="0" r="4" fill="#9ca3af" />
          </svg>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 font-mono">
              {currentEasing}
            </p>
          </div>
        </div>
      </div>

      {/* Animation Demo */}
      <div className="w-full max-w-md">
        <div className="bg-gray-100 rounded-lg p-6 h-24 relative overflow-hidden">
          <div
            className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500 rounded-lg shadow-lg"
            style={{
              left: isAnimating ? "calc(100% - 60px)" : "12px",
              transition: isAnimating ? `left ${config.duration}s ${currentEasing}` : "none",
            }}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <Button onClick={() => setIsAnimating(true)} disabled={isAnimating}>
            {isAnimating ? "Animating..." : "Play Animation"}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Easing Curve Visualizer"
      description="Visualize and compare easing functions with interactive bezier curve editor"
      icon={<Gauge size={24} />}
      breadcrumbs={<Breadcrumb />}
      generatedCSS={generateEasingCSS(config)}
      onReset={handleReset}
      showPreview={true}
      previewElement={previewElement}
      controlsTitle="Easing Controls"
      controlsGridCols={2}
      iconBgClassName="bg-gradient-to-r from-yellow-500 to-orange-600"
    >
      {/* Quick Presets */}
      <FullWidthGroup>
        <ControlGroup label="Easing Presets">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
          {easingPresets.map((preset) => (
            <Button
              key={preset.name}
              variant="ghost"
              size="sm"
              onClick={() => applyPreset(preset.value, preset.bezier)}
              className="justify-start text-left"
              title={preset.description}
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{preset.name}</span>
                <span className="text-xs text-gray-500">{preset.description}</span>
              </div>
            </Button>
          ))}
          </div>
        </ControlGroup>
      </FullWidthGroup>

      {/* Animation Settings */}
      <ControlGroup label="Easing Function">
        <Select
          value={config.easingFunction}
          onChange={(e) =>
            setConfig({ ...config, easingFunction: e.target.value })
          }
        >
          <option value="ease">Ease</option>
          <option value="linear">Linear</option>
          <option value="ease-in">Ease In</option>
          <option value="ease-out">Ease Out</option>
          <option value="ease-in-out">Ease In Out</option>
          <option value="custom">Custom Cubic Bezier</option>
        </Select>
      </ControlGroup>

      <ControlGroup label="Duration (s)">
        <Input
          type="number"
          min="0.1"
          step="0.1"
          value={config.duration}
          onChange={(e) =>
            setConfig({ ...config, duration: parseFloat(e.target.value) || 1 })
          }
        />
      </ControlGroup>

      {/* Custom Bezier Controls */}
      {config.easingFunction === "custom" && (
        <>
          <FullWidthGroup>
            <h3 className="text-sm font-semibold mb-3 col-span-2">Custom Cubic Bezier</h3>
            <div className="grid grid-cols-2 gap-3 col-span-2">
              <ControlGroup label="P1 X">
                <Input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={config.customBezier.x1}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      customBezier: {
                        ...config.customBezier,
                        x1: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                />
              </ControlGroup>

              <ControlGroup label="P1 Y">
                <Input
                  type="number"
                  step="0.01"
                  value={config.customBezier.y1}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      customBezier: {
                        ...config.customBezier,
                        y1: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                />
              </ControlGroup>

              <ControlGroup label="P2 X">
                <Input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={config.customBezier.x2}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      customBezier: {
                        ...config.customBezier,
                        x2: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                />
              </ControlGroup>

              <ControlGroup label="P2 Y">
                <Input
                  type="number"
                  step="0.01"
                  value={config.customBezier.y2}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      customBezier: {
                        ...config.customBezier,
                        y2: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                />
              </ControlGroup>
            </div>
          </FullWidthGroup>
        </>
      )}
    </ToolLayout>
  );
}
