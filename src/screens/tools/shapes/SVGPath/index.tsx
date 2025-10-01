import { useState, type JSX } from "react";
import {
  Button,
  Input,
  ColorInput,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Pen, RotateCcw, Download } from "lucide-react";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";
import type { TSVGPathConfig } from "./types";
import { defaultConfig, pathPresets, extractPathPoints, downloadSVG } from "./utils";

export function SVGPathScreen(): JSX.Element {
  const [config, setConfig] = useState<TSVGPathConfig>(defaultConfig);

  const updateConfig = (updates: Partial<TSVGPathConfig>): void => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const applyPreset = (preset: (typeof pathPresets)[0]): void => {
    updateConfig({ pathData: preset.pathData });
  };

  const resetTool = (): void => {
    setConfig(defaultConfig);
  };

  const handleDownload = (): void => {
    const svg = generateSVG();
    downloadSVG(svg, "path.svg");
  };

  const generateSVG = (): string => {
    const fillColorWithOpacity = `${config.fillColor}${Math.round((config.fillOpacity / 100) * 255).toString(16).padStart(2, '0')}`;

    return `<svg viewBox="0 0 ${config.viewBoxWidth} ${config.viewBoxHeight}" xmlns="http://www.w3.org/2000/svg">
  <path
    d="${config.pathData}"
    fill="${fillColorWithOpacity}"
    stroke="${config.strokeColor}"
    stroke-width="${config.strokeWidth}"
  />
</svg>`;
  };

  const generateCSS = (): string => {
    const svg = generateSVG();
    const encoded = btoa(svg);

    return `/* SVG Path as Background */
background-image: url('data:image/svg+xml;base64,${encoded}');
background-size: contain;
background-repeat: no-repeat;
background-position: center;

/* Or inline in HTML */
/*
${svg}
*/`;
  };

  const generatedCSS = generateCSS();

  const points = config.showPoints ? extractPathPoints(config.pathData) : [];

  const previewElement = (
    <div className="flex items-center justify-center min-h-[400px] p-8 bg-gray-100">
      <svg
        viewBox={`0 0 ${config.viewBoxWidth} ${config.viewBoxHeight}`}
        className="w-full max-w-md h-auto border-2 border-gray-300 bg-white"
        style={{ aspectRatio: `${config.viewBoxWidth}/${config.viewBoxHeight}` }}
      >
        {/* Grid */}
        {config.showGrid && (
          <g stroke="#e5e7eb" strokeWidth="0.5">
            {Array.from({ length: Math.ceil(config.viewBoxWidth / config.gridSize) + 1 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * config.gridSize}
                y1="0"
                x2={i * config.gridSize}
                y2={config.viewBoxHeight}
              />
            ))}
            {Array.from({ length: Math.ceil(config.viewBoxHeight / config.gridSize) + 1 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * config.gridSize}
                x2={config.viewBoxWidth}
                y2={i * config.gridSize}
              />
            ))}
          </g>
        )}

        {/* Path */}
        <path
          d={config.pathData}
          fill={`${config.fillColor}${Math.round((config.fillOpacity / 100) * 255).toString(16).padStart(2, '0')}`}
          stroke={config.strokeColor}
          strokeWidth={config.strokeWidth}
        />

        {/* Points */}
        {config.showPoints && points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="2"
            fill="#ef4444"
            stroke="#fff"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );

  return (
    <ToolLayout
      title="SVG Path Visualizer"
      description="Preview and tweak custom SVG path commands interactively"
      icon={<Pen size={24} />}
      iconBgClassName="bg-gradient-to-r from-purple-500 to-pink-600"
      breadcrumbs={
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Shapes", href: "/tools/shapes" },
            { label: "SVG Path", href: "/tools/shapes/svg-path" },
          ]}
        />
      }
      generatedCSS={generatedCSS}
      previewElement={previewElement}
    >
      <ProTip content="SVG paths use commands like M (move), L (line), C (cubic bezier), Q (quadratic bezier), and A (arc). Use relative commands (lowercase) for easier path manipulation. The Z command closes the path." />

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleDownload}
          className="flex items-center gap-2"
        >
          <Download size={16} />
          Download SVG
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

      {/* Presets */}
      <FullWidthGroup>
        <ControlGroup label="Quick Presets">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {pathPresets.map((preset) => (
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

      {/* Path Data */}
      <FullWidthGroup>
        <ControlGroup label="SVG Path Data">
          <textarea
            value={config.pathData}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateConfig({ pathData: e.target.value })
            }
            className="w-full h-32 px-3 py-2 text-sm font-mono bg-[var(--fe-bg)] border border-[var(--fe-border)] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--fe-accent)]"
            placeholder="M 10 10 L 90 10 L 90 90 L 10 90 Z"
          />
          <p className="text-xs text-muted mt-2">
            Path commands: M (move), L (line), H (horizontal), V (vertical), C
            (cubic bezier), Q (quadratic bezier), A (arc), Z (close path)
          </p>
        </ControlGroup>
      </FullWidthGroup>

      {/* ViewBox Settings */}
      <ControlGroup label="ViewBox">
        <div>
          <label className="block text-sm font-medium mb-2">Width</label>
          <Input
            type="number"
            value={config.viewBoxWidth}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig({ viewBoxWidth: parseInt(e.target.value) || 100 })
            }
            min={10}
            max={1000}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Height</label>
          <Input
            type="number"
            value={config.viewBoxHeight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig({ viewBoxHeight: parseInt(e.target.value) || 100 })
            }
            min={10}
            max={1000}
          />
        </div>
      </ControlGroup>

      {/* Stroke Settings */}
      <ControlGroup label="Stroke">
        <ColorInput
          label="Color"
          value={config.strokeColor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateConfig({ strokeColor: e.target.value })
          }
        />
        <div>
          <label className="block text-sm font-medium mb-2">
            Width: {config.strokeWidth}px
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={config.strokeWidth}
            onChange={(e) =>
              updateConfig({ strokeWidth: parseFloat(e.target.value) })
            }
            className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </ControlGroup>

      {/* Fill Settings */}
      <ControlGroup label="Fill">
        <ColorInput
          label="Color"
          value={config.fillColor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateConfig({ fillColor: e.target.value })
          }
        />
        <div>
          <label className="block text-sm font-medium mb-2">
            Opacity: {config.fillOpacity}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={config.fillOpacity}
            onChange={(e) =>
              updateConfig({ fillOpacity: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </ControlGroup>

      {/* Display Options */}
      <FullWidthGroup>
        <ControlGroup label="Display Options">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="show-points"
                checked={config.showPoints}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig({ showPoints: e.target.checked })
                }
                className="rounded"
              />
              <label htmlFor="show-points" className="text-sm font-medium">
                Show path points
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="show-grid"
                checked={config.showGrid}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig({ showGrid: e.target.checked })
                }
                className="rounded"
              />
              <label htmlFor="show-grid" className="text-sm font-medium">
                Show grid
              </label>
            </div>

            {config.showGrid && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Grid Size: {config.gridSize}
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={config.gridSize}
                  onChange={(e) =>
                    updateConfig({ gridSize: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
          </div>
        </ControlGroup>
      </FullWidthGroup>

      {/* Path Commands Reference */}
      <FullWidthGroup>
        <ControlGroup label="Path Commands Reference">
          <div className="text-xs text-muted space-y-1">
            <p><code className="bg-muted px-1 rounded">M x y</code> - Move to</p>
            <p><code className="bg-muted px-1 rounded">L x y</code> - Line to</p>
            <p><code className="bg-muted px-1 rounded">H x</code> - Horizontal line</p>
            <p><code className="bg-muted px-1 rounded">V y</code> - Vertical line</p>
            <p><code className="bg-muted px-1 rounded">C x1 y1 x2 y2 x y</code> - Cubic Bezier</p>
            <p><code className="bg-muted px-1 rounded">Q x1 y1 x y</code> - Quadratic Bezier</p>
            <p><code className="bg-muted px-1 rounded">A rx ry rotation large-arc sweep x y</code> - Arc</p>
            <p><code className="bg-muted px-1 rounded">Z</code> - Close path</p>
            <p className="pt-2 italic">Use lowercase for relative coordinates</p>
          </div>
        </ControlGroup>
      </FullWidthGroup>
    </ToolLayout>
  );
}
