import { useState, type JSX } from "react";
import {
  Button,
  Select,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Smartphone, RotateCcw, RotateCw } from "lucide-react";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";
import type { TBreakpointConfig } from "./types";
import { defaultConfig, breakpoints, generateMediaQuery } from "./utils";

export function BreakpointsScreen(): JSX.Element {
  const [config, setConfig] = useState<TBreakpointConfig>(defaultConfig);

  const updateConfig = (updates: Partial<TBreakpointConfig>): void => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const resetTool = (): void => {
    setConfig(defaultConfig);
  };

  const selectBreakpoint = (name: string): void => {
    const breakpoint = breakpoints.find((bp) => bp.name === name);
    if (breakpoint) {
      updateConfig({
        activeBreakpoint: name,
        customWidth: breakpoint.width,
        customHeight: breakpoint.height,
      });
    }
  };

  const toggleOrientation = (): void => {
    updateConfig({
      orientation: config.orientation === "portrait" ? "landscape" : "portrait",
      customWidth: config.customHeight,
      customHeight: config.customWidth,
    });
  };

  const generateCSS = (): string => {
    const sortedBreakpoints = [...breakpoints].sort((a, b) => a.width - b.width);
    let css = `/* Responsive Media Queries */\n\n`;

    css += `/* Mobile First Approach */\n`;
    css += `/* Base styles (mobile) */\n`;
    css += `/* 0px and up */\n\n`;

    sortedBreakpoints.forEach((bp, index) => {
      if (index < sortedBreakpoints.length - 1) {
        css += `/* ${bp.name} - ${bp.description} */\n`;
        css += generateMediaQuery(bp.width) + "\n\n";
      }
    });

    css += `/* Current Breakpoint: ${config.activeBreakpoint} */\n`;
    css += generateMediaQuery(config.customWidth);

    return css;
  };

  const generatedCSS = generateCSS();

  const activeWidth =
    config.orientation === "portrait" ? config.customWidth : config.customHeight;
  const activeHeight =
    config.orientation === "portrait" ? config.customHeight : config.customWidth;

  const previewElement = (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-8 bg-gray-100">
      {/* Device Info */}
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold">
          {config.activeBreakpoint}
          <span className="ml-2 text-sm text-muted">
            ({config.orientation})
          </span>
        </h3>
        <p className="text-sm text-muted">
          {activeWidth}px × {activeHeight}px
        </p>
      </div>

      {/* Device Frame */}
      <div
        className="relative bg-white border-8 border-gray-800 rounded-lg shadow-2xl overflow-hidden"
        style={{
          width: `${Math.min(activeWidth + 16, 800)}px`,
          height: `${Math.min(activeHeight + 16, 600)}px`,
        }}
      >
        {/* Ruler */}
        {config.showRuler && (
          <>
            <div className="absolute top-0 left-0 right-0 h-4 bg-gray-200 border-b border-gray-300 flex items-center text-[8px] text-gray-600 overflow-hidden">
              {Array.from({ length: Math.ceil(activeWidth / 50) }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-2 border-l border-gray-400"
                  style={{ left: `${i * 50}px` }}
                >
                  <span className="ml-0.5">{i * 50}</span>
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-0 bottom-0 w-4 bg-gray-200 border-r border-gray-300 flex flex-col items-center text-[8px] text-gray-600 overflow-hidden">
              {Array.from({ length: Math.ceil(activeHeight / 50) }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 border-t border-gray-400"
                  style={{ top: `${i * 50}px` }}
                >
                  <span className="mt-0.5 block transform -rotate-90 origin-left whitespace-nowrap ml-1">
                    {i * 50}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Viewport Content */}
        <div
          className={`${config.showRuler ? "ml-4 mt-4" : ""} w-full h-full overflow-auto bg-gradient-to-br from-gray-50 to-gray-100`}
          style={{
            width: config.showRuler ? `calc(100% - 16px)` : "100%",
            height: config.showRuler ? `calc(100% - 16px)` : "100%",
          }}
        >
          {/* Sample Responsive Content */}
          <div className="p-6 space-y-4">
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-bold text-lg mb-2">Responsive Preview</h4>
              <p className="text-sm text-gray-600">
                This viewport is {activeWidth}px wide. Test your responsive
                designs across different breakpoints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-blue-100 p-4 rounded">
                  <div className="font-semibold">Card {i}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Responsive grid item
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm">
                Current breakpoint: <strong>{config.activeBreakpoint}</strong>
              </p>
              <p className="text-xs text-gray-600 mt-2">
                The layout adapts based on the viewport width using CSS media
                queries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Responsive Breakpoint Tester"
      description="Test responsive designs across common device breakpoints with live preview"
      icon={<Smartphone size={24} />}
      iconBgClassName="bg-gradient-to-r from-cyan-500 to-blue-600"
      breadcrumbs={
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Layout", href: "/tools/layout" },
            { label: "Breakpoints", href: "/tools/layout/breakpoints" },
          ]}
        />
      }
      generatedCSS={generatedCSS}
      previewElement={previewElement}
    >
      <ProTip content="Use mobile-first approach: start with base mobile styles, then add min-width media queries for larger screens. Common breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl), 1536px (2xl)." />

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="secondary"
          size="sm"
          onClick={toggleOrientation}
          className="flex items-center gap-2"
        >
          <RotateCw size={16} />
          Rotate
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

      {/* Device Presets */}
      <FullWidthGroup>
        <ControlGroup label="Device Presets">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
            {breakpoints.map((bp) => (
              <Button
                key={bp.name}
                variant={config.activeBreakpoint === bp.name ? "default" : "secondary"}
                size="sm"
                onClick={() => selectBreakpoint(bp.name)}
                className="text-xs"
              >
                <div className="flex flex-col items-start">
                  <span>{bp.name}</span>
                  <span className="text-[10px] opacity-70">{bp.width}×{bp.height}</span>
                </div>
              </Button>
            ))}
          </div>
        </ControlGroup>
      </FullWidthGroup>

      {/* Orientation */}
      <ControlGroup label="Orientation">
        <Select
          value={config.orientation}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateConfig({
              orientation: e.target.value as "portrait" | "landscape",
              customWidth: config.customHeight,
              customHeight: config.customWidth,
            })
          }
        >
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </Select>
      </ControlGroup>

      {/* Custom Dimensions */}
      <ControlGroup label="Custom Dimensions">
        <div>
          <label className="block text-sm font-medium mb-2">
            Width: {config.customWidth}px
          </label>
          <input
            type="range"
            min="320"
            max="2560"
            step="10"
            value={config.customWidth}
            onChange={(e) =>
              updateConfig({ customWidth: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Height: {config.customHeight}px
          </label>
          <input
            type="range"
            min="320"
            max="1440"
            step="10"
            value={config.customHeight}
            onChange={(e) =>
              updateConfig({ customHeight: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </ControlGroup>

      {/* Display Options */}
      <FullWidthGroup>
        <ControlGroup label="Display Options">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-ruler"
              checked={config.showRuler}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateConfig({ showRuler: e.target.checked })
              }
              className="rounded"
            />
            <label htmlFor="show-ruler" className="text-sm font-medium">
              Show rulers (pixel measurements)
            </label>
          </div>
        </ControlGroup>
      </FullWidthGroup>

      {/* Common Breakpoints Reference */}
      <FullWidthGroup>
        <ControlGroup label="Common Breakpoint Values">
          <div className="text-xs text-muted space-y-1">
            <p>
              <strong>Tailwind CSS:</strong> sm: 640px, md: 768px, lg: 1024px, xl:
              1280px, 2xl: 1536px
            </p>
            <p>
              <strong>Bootstrap:</strong> sm: 576px, md: 768px, lg: 992px, xl:
              1200px, xxl: 1400px
            </p>
            <p>
              <strong>Material Design:</strong> xs: 0px, sm: 600px, md: 960px, lg:
              1280px, xl: 1920px
            </p>
          </div>
        </ControlGroup>
      </FullWidthGroup>
    </ToolLayout>
  );
}
