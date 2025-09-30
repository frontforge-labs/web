import { useState, type JSX } from "react";
import {
  Button,
  Input,
  ColorInput,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Sparkles, RotateCcw } from "lucide-react";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";
import type { TGlassmorphismConfig } from "./types";
import { defaultConfig, glassmorphismPresets } from "./utils";

export function GlassmorphismScreen(): JSX.Element {
  const [config, setConfig] = useState<TGlassmorphismConfig>(defaultConfig);

  const updateConfig = (updates: Partial<TGlassmorphismConfig>): void => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const applyPreset = (preset: (typeof glassmorphismPresets)[0]): void => {
    setConfig(preset.config);
  };

  const resetTool = (): void => {
    setConfig(defaultConfig);
  };

  const hexToRGBA = (hex: string, opacity: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

  const generateCSS = (): string => {
    const bgColor = hexToRGBA(
      config.backgroundColor,
      config.backgroundOpacity
    );
    const borderColor = hexToRGBA(config.borderColor, config.borderOpacity);

    let css = `/* Glassmorphism Effect */
background: ${bgColor};
backdrop-filter: blur(${config.backdropBlur}px);
-webkit-backdrop-filter: blur(${config.backdropBlur}px);
border-radius: ${config.borderRadius}px;`;

    if (config.borderWidth > 0) {
      css += `\nborder: ${config.borderWidth}px solid ${borderColor};`;
    }

    if (config.boxShadow) {
      css += `\nbox-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);`;
    }

    return css;
  };

  const generatedCSS = generateCSS();

  const previewElement = (
    <div
      className="flex items-center justify-center min-h-[400px] p-8 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${config.sceneBackgroundColor} 0%, ${config.sceneBackgroundColor}dd 100%)`,
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl" />

      {/* Glassmorphic element */}
      <div
        className="relative z-10 flex items-center justify-center text-white font-semibold p-6"
        style={{
          width: `${config.elementWidth}px`,
          height: `${config.elementHeight}px`,
          background: hexToRGBA(
            config.backgroundColor,
            config.backgroundOpacity
          ),
          backdropFilter: `blur(${config.backdropBlur}px)`,
          WebkitBackdropFilter: `blur(${config.backdropBlur}px)`,
          borderRadius: `${config.borderRadius}px`,
          border:
            config.borderWidth > 0
              ? `${config.borderWidth}px solid ${hexToRGBA(config.borderColor, config.borderOpacity)}`
              : "none",
          boxShadow: config.boxShadow
            ? "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            : "none",
        }}
      >
        Glassmorphism
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Glassmorphism Generator"
      description="Create modern frosted glass effects with backdrop blur and transparency"
      icon={<Sparkles size={24} />}
      iconBgClassName="bg-gradient-to-r from-orange-500 to-red-600"
      breadcrumbs={
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Effects", href: "/tools/effects" },
            { label: "Glassmorphism", href: "/tools/effects/glassmorphism" },
          ]}
        />
      }
      generatedCSS={generatedCSS}
      previewElement={previewElement}
    >
      <ProTip content="Glassmorphism works best over colorful or gradient backgrounds. Use backdrop-filter: blur() with semi-transparent backgrounds for the frosted glass effect. Keep opacity between 10-40% for best results." />

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
            {glassmorphismPresets.map((preset) => (
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

      {/* Backdrop Blur */}
      <ControlGroup label={`Backdrop Blur: ${config.backdropBlur}px`}>
        <input
          type="range"
          min="0"
          max="40"
          step="1"
          value={config.backdropBlur}
          onChange={(e) =>
            updateConfig({ backdropBlur: parseInt(e.target.value) })
          }
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-[var(--fe-text)]/60 mt-1">
          <span>0px</span>
          <span>20px</span>
          <span>40px</span>
        </div>
      </ControlGroup>

      {/* Background Settings */}
      <FullWidthGroup>
        <ControlGroup label="Background">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ColorInput
              label="Background Color"
              value={config.backgroundColor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateConfig({ backgroundColor: e.target.value })
              }
            />
            <div>
              <label className="block text-sm font-medium mb-2">
                Opacity: {config.backgroundOpacity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={config.backgroundOpacity}
                onChange={(e) =>
                  updateConfig({ backgroundOpacity: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </ControlGroup>
      </FullWidthGroup>

      {/* Border Settings */}
      <FullWidthGroup>
        <ControlGroup label="Border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                Width (px)
              </label>
              <Input
                type="number"
                value={config.borderWidth}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig({ borderWidth: parseInt(e.target.value) || 0 })
                }
                min={0}
                max={10}
              />
            </div>
            <ColorInput
              label="Border Color"
              value={config.borderColor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateConfig({ borderColor: e.target.value })
              }
            />
            <div>
              <label className="block text-sm font-medium mb-2">
                Opacity: {config.borderOpacity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={config.borderOpacity}
                onChange={(e) =>
                  updateConfig({ borderOpacity: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </ControlGroup>
      </FullWidthGroup>

      {/* Element Settings */}
      <ControlGroup label="Element Settings">
        <div>
          <label className="block text-sm font-medium mb-2">Width (px)</label>
          <Input
            type="number"
            value={config.elementWidth}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig({ elementWidth: parseInt(e.target.value) || 320 })
            }
            min={100}
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
            min={100}
            max={400}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Border Radius (px)
          </label>
          <Input
            type="number"
            value={config.borderRadius}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig({ borderRadius: parseInt(e.target.value) || 0 })
            }
            min={0}
            max={50}
          />
        </div>
        <ColorInput
          label="Scene Background"
          value={config.sceneBackgroundColor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateConfig({ sceneBackgroundColor: e.target.value })
          }
        />
      </ControlGroup>

      {/* Box Shadow Toggle */}
      <FullWidthGroup>
        <ControlGroup label="Effects">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="box-shadow-toggle"
              checked={config.boxShadow}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateConfig({ boxShadow: e.target.checked })
              }
              className="rounded"
            />
            <label htmlFor="box-shadow-toggle" className="text-sm font-medium">
              Add box shadow for depth
            </label>
          </div>
        </ControlGroup>
      </FullWidthGroup>
    </ToolLayout>
  );
}
