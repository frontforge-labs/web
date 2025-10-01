import { useState, type JSX } from "react";
import {
  Button,
  Select,
  ColorInput,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Sparkles, RotateCcw } from "lucide-react";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";
import type { TNoiseTextureConfig } from "./types";
import {
  defaultConfig,
  noisePresets,
  generateGrainSVG,
  generateDotsSVG,
  generateLinesSVG,
} from "./utils";

export function NoiseTextureScreen(): JSX.Element {
  const [config, setConfig] = useState<TNoiseTextureConfig>(defaultConfig);

  const updateConfig = (updates: Partial<TNoiseTextureConfig>): void => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const applyPreset = (preset: (typeof noisePresets)[0]): void => {
    setConfig(preset.config);
  };

  const resetTool = (): void => {
    setConfig(defaultConfig);
  };

  const getNoiseDataURL = (): string => {
    switch (config.noiseType) {
      case "grain":
        return generateGrainSVG(config.grainSize);
      case "dots":
        return generateDotsSVG(config.grainSize);
      case "lines":
        return generateLinesSVG(config.grainSize);
      default:
        return generateGrainSVG(config.grainSize);
    }
  };

  const generateCSS = (): string => {
    const noiseDataURL = getNoiseDataURL();

    return `/* Noise Texture Effect */
background-color: ${config.baseColor};
background-image: url("${noiseDataURL}");
background-blend-mode: ${config.blendMode};
background-size: ${config.scale}%;
opacity: ${config.opacity / 100};

/* Alternative using ::before pseudo-element */
/*
position: relative;

&::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("${noiseDataURL}");
  background-size: ${config.scale}%;
  mix-blend-mode: ${config.blendMode};
  opacity: ${config.opacity / 100};
  pointer-events: none;
}
*/`;
  };

  const generatedCSS = generateCSS();

  const previewElement = (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div
        className="w-full h-64 rounded-lg flex items-center justify-center text-white text-2xl font-bold relative overflow-hidden"
        style={{
          backgroundColor: config.baseColor,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${getNoiseDataURL()}")`,
            backgroundSize: `${config.scale}%`,
            opacity: config.opacity / 100,
            mixBlendMode: config.blendMode as React.CSSProperties["mixBlendMode"],
          }}
        />
        <span className="relative z-10">Noise Texture</span>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Noise Texture Generator"
      description="Generate CSS noise textures and grain effects for subtle background patterns"
      icon={<Sparkles size={24} />}
      iconBgClassName="bg-gradient-to-r from-orange-500 to-red-600"
      breadcrumbs={
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Effects", href: "/tools/effects" },
            { label: "Noise Texture", href: "/tools/effects/noise-texture" },
          ]}
        />
      }
      generatedCSS={generatedCSS}
      previewElement={previewElement}
    >
      <ProTip content="Noise textures add organic, analog warmth to digital designs. Use subtle opacity (5-15%) to reduce color banding in gradients. SVG-based patterns scale infinitely and have minimal performance impact." />

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
            {noisePresets.map((preset) => (
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

      {/* Noise Type */}
      <ControlGroup label="Noise Type">
        <Select
          value={config.noiseType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateConfig({
              noiseType: e.target.value as "grain" | "dots" | "lines",
            })
          }
        >
          <option value="grain">Grain (Fractal Noise)</option>
          <option value="dots">Dots Pattern</option>
          <option value="lines">Lines Texture</option>
        </Select>
      </ControlGroup>

      {/* Grain Size */}
      <ControlGroup label={`Grain Size: ${config.grainSize}px`}>
        <input
          type="range"
          min="50"
          max="500"
          step="10"
          value={config.grainSize}
          onChange={(e) =>
            updateConfig({ grainSize: parseInt(e.target.value) })
          }
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>Fine (50px)</span>
          <span>Medium (250px)</span>
          <span>Coarse (500px)</span>
        </div>
      </ControlGroup>

      {/* Opacity */}
      <ControlGroup label={`Opacity: ${config.opacity}%`}>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={config.opacity}
          onChange={(e) => updateConfig({ opacity: parseInt(e.target.value) })}
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </ControlGroup>

      {/* Scale */}
      <ControlGroup label={`Scale: ${config.scale}%`}>
        <input
          type="range"
          min="25"
          max="400"
          step="5"
          value={config.scale}
          onChange={(e) => updateConfig({ scale: parseInt(e.target.value) })}
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>25%</span>
          <span>100%</span>
          <span>400%</span>
        </div>
      </ControlGroup>

      {/* Colors */}
      <ControlGroup label="Colors">
        <ColorInput
          label="Base Color"
          value={config.baseColor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateConfig({ baseColor: e.target.value })
          }
        />
        <ColorInput
          label="Noise Color"
          value={config.noiseColor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateConfig({ noiseColor: e.target.value })
          }
        />
      </ControlGroup>

      {/* Blend Mode */}
      <FullWidthGroup>
        <ControlGroup label="Blend Mode">
          <Select
            value={config.blendMode}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              updateConfig({ blendMode: e.target.value })
            }
          >
            <option value="normal">Normal</option>
            <option value="multiply">Multiply</option>
            <option value="screen">Screen</option>
            <option value="overlay">Overlay</option>
            <option value="darken">Darken</option>
            <option value="lighten">Lighten</option>
            <option value="color-dodge">Color Dodge</option>
            <option value="color-burn">Color Burn</option>
            <option value="hard-light">Hard Light</option>
            <option value="soft-light">Soft Light</option>
            <option value="difference">Difference</option>
            <option value="exclusion">Exclusion</option>
          </Select>
          <p className="text-xs text-muted mt-2">
            Blend mode controls how the noise texture interacts with the base
            color. Try 'overlay' for subtle effects or 'multiply' for darker
            textures.
          </p>
        </ControlGroup>
      </FullWidthGroup>
    </ToolLayout>
  );
}
