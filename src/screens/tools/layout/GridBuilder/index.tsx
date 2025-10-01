import { useState, type JSX } from "react";
import {
  Button,
  Input,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { LayoutGrid, RotateCcw } from "lucide-react";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";
import type { TGridConfig } from "./types";
import { defaultConfig, gridPresets } from "./utils";

export function GridBuilderScreen(): JSX.Element {
  const [config, setConfig] = useState<TGridConfig>(defaultConfig);

  const updateConfig = (updates: Partial<TGridConfig>): void => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const applyPreset = (preset: (typeof gridPresets)[0]): void => {
    setConfig({ ...config, ...preset.config });
  };

  const resetTool = (): void => {
    setConfig(defaultConfig);
  };

  const generateCSS = (): string => {
    let css = `/* CSS Grid Layout */
.grid-container {
  display: grid;
  grid-template-columns: ${config.columnTemplate};
  grid-template-rows: ${config.rowTemplate};
  column-gap: ${config.columnGap}px;
  row-gap: ${config.rowGap}px;
  /* or use shorthand: gap: ${config.rowGap}px ${config.columnGap}px; */`;

    if (config.useTemplateAreas && config.templateAreas.length > 0) {
      css += `\n  grid-template-areas:\n`;
      config.templateAreas.forEach((area) => {
        css += `    "${area}"\n`;
      });
      css = css.trimEnd();
    }

    css += `\n}`;

    if (config.useTemplateAreas) {
      css += `\n\n/* Grid Items with Named Areas */
.grid-item-header {
  grid-area: header;
}

.grid-item-sidebar {
  grid-area: sidebar;
}

.grid-item-content {
  grid-area: content;
}

.grid-item-aside {
  grid-area: aside;
}

.grid-item-footer {
  grid-area: footer;
}`;
    }

    return css;
  };

  const generatedCSS = generateCSS();

  const previewElement = (
    <div className="flex items-center justify-center min-h-[400px] p-8 bg-gray-100">
      <div
        className="w-full max-w-4xl border border-gray-300 bg-white p-4"
        style={{
          display: "grid",
          gridTemplateColumns: config.columnTemplate,
          gridTemplateRows: config.rowTemplate,
          columnGap: `${config.columnGap}px`,
          rowGap: `${config.rowGap}px`,
          gridTemplateAreas: config.useTemplateAreas
            ? config.templateAreas.map((area) => `"${area}"`).join(" ")
            : undefined,
        }}
      >
        {Array.from({ length: config.gridItems }).map((_, index) => {
          let areaName = "";
          if (config.useTemplateAreas) {
            const areaNames = ["header", "sidebar", "content", "aside", "footer"];
            areaName = areaNames[index] || "";
          }

          return (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded p-4 flex items-center justify-center text-white font-semibold"
              style={
                areaName ? { gridArea: areaName } : undefined
              }
            >
              {areaName || index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="CSS Grid Layout Builder"
      description="Visual grid layout builder with column and row configuration for responsive designs"
      icon={<LayoutGrid size={24} />}
      iconBgClassName="bg-gradient-to-r from-purple-500 to-pink-600"
      breadcrumbs={
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Shapes", href: "/tools/shapes" },
            { label: "Grid Builder", href: "/tools/shapes/grid-builder" },
          ]}
        />
      }
      generatedCSS={generatedCSS}
      previewElement={previewElement}
    >
      <ProTip content="CSS Grid excels at two-dimensional layouts. Use fr units for flexible sizing, minmax() for responsive columns, and grid-template-areas for semantic layout definitions. Combine with gap for perfect spacing." />

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {gridPresets.map((preset) => (
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

      {/* Grid Items Count */}
      <ControlGroup label={`Grid Items: ${config.gridItems}`}>
        <input
          type="range"
          min="1"
          max="12"
          step="1"
          value={config.gridItems}
          onChange={(e) =>
            updateConfig({ gridItems: parseInt(e.target.value) })
          }
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>1</span>
          <span>6</span>
          <span>12</span>
        </div>
      </ControlGroup>

      {/* Column Template */}
      <FullWidthGroup>
        <ControlGroup label="Column Template">
          <Input
            value={config.columnTemplate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig({ columnTemplate: e.target.value })
            }
            placeholder="e.g., 1fr 1fr 1fr or repeat(3, 1fr)"
          />
          <p className="text-xs text-muted mt-2">
            Examples: <code className="bg-muted px-1 rounded">1fr 2fr 1fr</code>,{" "}
            <code className="bg-muted px-1 rounded">repeat(3, 1fr)</code>,{" "}
            <code className="bg-muted px-1 rounded">200px auto 1fr</code>,{" "}
            <code className="bg-muted px-1 rounded">
              repeat(auto-fill, minmax(200px, 1fr))
            </code>
          </p>
        </ControlGroup>
      </FullWidthGroup>

      {/* Row Template */}
      <FullWidthGroup>
        <ControlGroup label="Row Template">
          <Input
            value={config.rowTemplate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig({ rowTemplate: e.target.value })
            }
            placeholder="e.g., 100px auto 100px"
          />
          <p className="text-xs text-muted mt-2">
            Examples: <code className="bg-muted px-1 rounded">auto</code>,{" "}
            <code className="bg-muted px-1 rounded">100px 200px</code>,{" "}
            <code className="bg-muted px-1 rounded">repeat(3, 150px)</code>,{" "}
            <code className="bg-muted px-1 rounded">1fr 2fr</code>
          </p>
        </ControlGroup>
      </FullWidthGroup>

      {/* Gap Controls */}
      <ControlGroup label="Gap Settings">
        <div>
          <label className="block text-sm font-medium mb-2">
            Column Gap: {config.columnGap}px
          </label>
          <input
            type="range"
            min="0"
            max="50"
            step="2"
            value={config.columnGap}
            onChange={(e) =>
              updateConfig({ columnGap: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Row Gap: {config.rowGap}px
          </label>
          <input
            type="range"
            min="0"
            max="50"
            step="2"
            value={config.rowGap}
            onChange={(e) =>
              updateConfig({ rowGap: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </ControlGroup>

      {/* Template Areas Toggle */}
      <FullWidthGroup>
        <ControlGroup label="Advanced: Template Areas">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              id="use-template-areas"
              checked={config.useTemplateAreas}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateConfig({ useTemplateAreas: e.target.checked })
              }
              className="rounded"
            />
            <label htmlFor="use-template-areas" className="text-sm font-medium">
              Use grid-template-areas for semantic layout
            </label>
          </div>

          {config.useTemplateAreas && (
            <div className="space-y-2">
              <p className="text-xs text-muted">
                Define layout areas (e.g., "header header header" for first row):
              </p>
              {config.templateAreas.map((area, index) => (
                <Input
                  key={index}
                  value={area}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newAreas = [...config.templateAreas];
                    newAreas[index] = e.target.value;
                    updateConfig({ templateAreas: newAreas });
                  }}
                  placeholder={`Row ${index + 1} areas`}
                  className="text-xs font-mono"
                />
              ))}
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    updateConfig({
                      templateAreas: [...config.templateAreas, ""],
                    });
                  }}
                  className="text-xs"
                >
                  Add Row
                </Button>
                {config.templateAreas.length > 0 && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const newAreas = config.templateAreas.slice(0, -1);
                      updateConfig({ templateAreas: newAreas });
                    }}
                    className="text-xs"
                  >
                    Remove Row
                  </Button>
                )}
              </div>
            </div>
          )}
        </ControlGroup>
      </FullWidthGroup>

      {/* Common Grid Units Reference */}
      <FullWidthGroup>
        <ControlGroup label="Grid Units Reference">
          <div className="text-xs text-muted space-y-2">
            <p>
              <code className="bg-muted px-1 rounded">fr</code> - Fraction of
              available space (flexible)
            </p>
            <p>
              <code className="bg-muted px-1 rounded">px</code> - Fixed pixel
              size
            </p>
            <p>
              <code className="bg-muted px-1 rounded">%</code> - Percentage of
              container
            </p>
            <p>
              <code className="bg-muted px-1 rounded">auto</code> - Size based on
              content
            </p>
            <p>
              <code className="bg-muted px-1 rounded">
                minmax(min, max)
              </code>{" "}
              - Size between min and max
            </p>
            <p>
              <code className="bg-muted px-1 rounded">repeat(count, size)</code> -
              Repeat pattern
            </p>
          </div>
        </ControlGroup>
      </FullWidthGroup>
    </ToolLayout>
  );
}
