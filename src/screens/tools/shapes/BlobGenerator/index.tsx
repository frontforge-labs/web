import { useState, type JSX } from "react";
import {
  Button,
  Select,
  ColorInput,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Sparkles, RotateCcw, Download, Shuffle } from "lucide-react";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";
import type { TBlobConfig } from "./types";
import { defaultConfig, generateBlobSVG, downloadSVG } from "./utils";

export function BlobGeneratorScreen(): JSX.Element {
  const [config, setConfig] = useState<TBlobConfig>(defaultConfig);

  const updateConfig = (updates: Partial<TBlobConfig>): void => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const resetTool = (): void => {
    setConfig(defaultConfig);
  };

  const randomize = (): void => {
    updateConfig({
      seed: Math.floor(Math.random() * 10000),
      complexity: Math.floor(Math.random() * 8) + 5,
      contrast: Math.random() * 0.6 + 0.3,
    });
  };

  const handleDownload = (): void => {
    const svg = generateBlobSVG(config);
    downloadSVG(svg, `blob-${config.seed}.svg`);
  };

  const generateCSS = (): string => {
    const svg = generateBlobSVG(config);
    const encoded = btoa(svg);

    return `/* Blob Shape as Background */
background-image: url('data:image/svg+xml;base64,${encoded}');
background-size: contain;
background-repeat: no-repeat;
background-position: center;

/* Or use as mask */
mask-image: url('data:image/svg+xml;base64,${encoded}');
mask-size: contain;
mask-repeat: no-repeat;
mask-position: center;`;
  };

  const generatedCSS = generateCSS();

  const previewElement = (
    <div className="flex items-center justify-center min-h-[400px] p-8 bg-gray-100">
      <div
        style={{
          width: `${config.size}px`,
          height: `${config.size}px`,
        }}
        dangerouslySetInnerHTML={{ __html: generateBlobSVG(config) }}
      />
    </div>
  );

  return (
    <ToolLayout
      title="Blob Shape Generator"
      description="Generate organic blob shapes with randomization for unique design elements"
      icon={<Sparkles size={24} />}
      iconBgClassName="bg-gradient-to-r from-purple-500 to-pink-600"
      breadcrumbs={
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Shapes", href: "/tools/shapes" },
            { label: "Blob Generator", href: "/tools/shapes/blob-generator" },
          ]}
        />
      }
      generatedCSS={generatedCSS}
      previewElement={previewElement}
    >
      <ProTip content="Blob shapes add organic, playful elements to modern designs. Use them as backgrounds, decorative elements, or section dividers. Each seed creates a unique shape - perfect for distinctive branding." />

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="secondary"
          size="sm"
          onClick={randomize}
          className="flex items-center gap-2"
        >
          <Shuffle size={16} />
          Randomize
        </Button>
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

      {/* Seed Control */}
      <FullWidthGroup>
        <ControlGroup label={`Seed: ${config.seed}`}>
          <input
            type="range"
            min="1"
            max="10000"
            step="1"
            value={config.seed}
            onChange={(e) => updateConfig({ seed: parseInt(e.target.value) })}
            className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-muted mt-2">
            Change the seed to generate different blob variations
          </p>
        </ControlGroup>
      </FullWidthGroup>

      {/* Complexity */}
      <ControlGroup label={`Complexity: ${config.complexity} points`}>
        <input
          type="range"
          min="3"
          max="12"
          step="1"
          value={config.complexity}
          onChange={(e) =>
            updateConfig({ complexity: parseInt(e.target.value) })
          }
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>Simple (3)</span>
          <span>Medium (7)</span>
          <span>Complex (12)</span>
        </div>
      </ControlGroup>

      {/* Contrast */}
      <ControlGroup label={`Contrast: ${config.contrast.toFixed(2)}`}>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={config.contrast}
          onChange={(e) =>
            updateConfig({ contrast: parseFloat(e.target.value) })
          }
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>Smooth</span>
          <span>Balanced</span>
          <span>Irregular</span>
        </div>
      </ControlGroup>

      {/* Size */}
      <ControlGroup label={`Size: ${config.size}px`}>
        <input
          type="range"
          min="100"
          max="600"
          step="10"
          value={config.size}
          onChange={(e) => updateConfig({ size: parseInt(e.target.value) })}
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>100px</span>
          <span>350px</span>
          <span>600px</span>
        </div>
      </ControlGroup>

      {/* Gradient Settings */}
      <FullWidthGroup>
        <ControlGroup label="Gradient">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ColorInput
              label="Color 1"
              value={config.color1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateConfig({ color1: e.target.value })
              }
            />
            <ColorInput
              label="Color 2"
              value={config.color2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateConfig({ color2: e.target.value })
              }
            />
          </div>
        </ControlGroup>
      </FullWidthGroup>

      {/* Gradient Type */}
      <ControlGroup label="Gradient Type">
        <Select
          value={config.gradientType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateConfig({
              gradientType: e.target.value as "linear" | "radial",
            })
          }
        >
          <option value="linear">Linear Gradient</option>
          <option value="radial">Radial Gradient</option>
        </Select>
      </ControlGroup>

      {/* Gradient Angle (only for linear) */}
      {config.gradientType === "linear" && (
        <ControlGroup label={`Gradient Angle: ${config.gradientAngle}°`}>
          <input
            type="range"
            min="0"
            max="360"
            step="5"
            value={config.gradientAngle}
            onChange={(e) =>
              updateConfig({ gradientAngle: parseInt(e.target.value) })
            }
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

      {/* Usage Tips */}
      <FullWidthGroup>
        <ControlGroup label="Usage Tips">
          <div className="text-xs text-muted space-y-2">
            <p>
              • Download the SVG and use it directly in your HTML with{" "}
              <code className="bg-muted px-1 rounded">&lt;img&gt;</code> or{" "}
              <code className="bg-muted px-1 rounded">&lt;svg&gt;</code> tags
            </p>
            <p>
              • Use as a background image with the generated CSS code
            </p>
            <p>
              • Apply as a mask to create interesting cutout effects on images
            </p>
            <p>
              • Combine with CSS animations for morphing effects
            </p>
          </div>
        </ControlGroup>
      </FullWidthGroup>
    </ToolLayout>
  );
}
