import { useState } from "react";
import {
  Button,
  Select,
  ColorInput,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Palette, Copy, Shuffle } from "lucide-react";
import {
  hexToRgb,
  rgbToHex,
  copyToClipboard,
} from "../../../../lib/css/format";
import {
  colorPresets,
  generateHarmonyColors,
  hexToHsl,
  hslToHex,
} from "./utils";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";

type TColorConfig = {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  outputFormat: "hex" | "rgb" | "hsl" | "oklch";
  harmony: "none" | "complementary" | "triadic" | "analogous";
};

export function ColorStudioScreen() {
  const [config, setConfig] = useState<TColorConfig>({
    hex: "#3b82f6",
    rgb: { r: 59, g: 130, b: 246 },
    hsl: { h: 221, s: 83, l: 60 },
    outputFormat: "hex",
    harmony: "none",
  });

  const updateFromHex = (hex: string) => {
    if (!/^#[0-9A-F]{6}$/i.test(hex)) return;

    const rgb = hexToRgb(hex);
    const hsl = hexToHsl(hex);
    if (rgb) {
      setConfig((prev) => ({
        ...prev,
        hex,
        rgb,
        hsl,
      }));
    }
  };

  const updateFromRgb = (rgb: { r: number; g: number; b: number }) => {
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const hsl = hexToHsl(hex);
    setConfig((prev) => ({
      ...prev,
      hex,
      rgb,
      hsl,
    }));
  };

  const updateFromHsl = (hsl: { h: number; s: number; l: number }) => {
    const hex = hslToHex(hsl.h, hsl.s, hsl.l);
    const rgb = hexToRgb(hex);
    if (rgb) {
      setConfig((prev) => ({
        ...prev,
        hex,
        rgb,
        hsl,
      }));
    }
  };

  const generateRandomColor = () => {
    const randomHex =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase();
    updateFromHex(randomHex);
  };

  const resetTool = () => {
    updateFromHex("#3b82f6");
    setConfig((prev) => ({ ...prev, outputFormat: "hex", harmony: "none" }));
  };

  const generateCSS = () => {
    const baseColor = (() => {
      switch (config.outputFormat) {
        case "hex":
          return config.hex;
        case "rgb":
          return `rgb(${config.rgb.r}, ${config.rgb.g}, ${config.rgb.b})`;
        case "hsl":
          return `hsl(${config.hsl.h}, ${config.hsl.s}%, ${config.hsl.l}%)`;
        case "oklch":
          return `oklch(${config.hsl.l}% ${config.hsl.s}% ${config.hsl.h})`;
        default:
          return config.hex;
      }
    })();

    if (config.harmony === "none") {
      return `/* Primary Color */\ncolor: ${baseColor};`;
    }

    const harmonyColors = generateHarmonyColors(config.hex, config.harmony);
    let css = `/* ${config.harmony.charAt(0).toUpperCase() + config.harmony.slice(1)} Color Harmony */\n`;
    css += `--color-primary: ${baseColor};\n`;

    harmonyColors.slice(1).forEach((color, index) => {
      css += `--color-${config.harmony}-${index + 1}: ${color};\n`;
    });

    return css;
  };

  const harmonyColors =
    config.harmony !== "none"
      ? generateHarmonyColors(config.hex, config.harmony)
      : [config.hex];

  const previewElement = (
    <div className="space-y-4">
      {/* Main Color Preview */}
      <div className="w-full h-32 rounded-lg border border-border shadow-sm flex flex-col overflow-hidden">
        <div className="flex-1" style={{ backgroundColor: config.hex }} />
        <div className="p-3 bg-surface-1">
          <div className="text-sm font-medium">Primary Color</div>
          <div className="text-xs text-muted font-mono mt-1">
            {config.outputFormat === "hex" && config.hex}
            {config.outputFormat === "rgb" &&
              `rgb(${config.rgb.r}, ${config.rgb.g}, ${config.rgb.b})`}
            {config.outputFormat === "hsl" &&
              `hsl(${config.hsl.h}, ${config.hsl.s}%, ${config.hsl.l}%)`}
            {config.outputFormat === "oklch" &&
              `oklch(${config.hsl.l}% ${config.hsl.s}% ${config.hsl.h})`}
          </div>
        </div>
      </div>

      {/* Harmony Colors */}
      {config.harmony !== "none" && (
        <div>
          <div className="text-sm font-medium mb-2 flex items-center gap-2">
            <Palette size={16} />
            {config.harmony.charAt(0).toUpperCase() +
              config.harmony.slice(1)}{" "}
            Harmony
          </div>
          <div className="grid grid-cols-3 gap-2">
            {harmonyColors.map((color, index) => (
              <div
                key={index}
                className="h-12 rounded border border-border"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const copyAllFormats = async () => {
    const formats = [
      `HEX: ${config.hex}`,
      `RGB: rgb(${config.rgb.r}, ${config.rgb.g}, ${config.rgb.b})`,
      `HSL: hsl(${config.hsl.h}, ${config.hsl.s}%, ${config.hsl.l}%)`,
      `OKLCH: oklch(${config.hsl.l}% ${config.hsl.s}% ${config.hsl.h})`,
    ].join("\n");

    await copyToClipboard(formats);
  };

  return (
    <ToolLayout
      title="Color Studio"
      description="Advanced color picker, converter, and harmony generator with modern CSS support"
      generatedCSS={generateCSS()}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<Palette size={24} />}
      breadcrumbs={<Breadcrumb />}
      controlsGridCols={2}
      allowCSSEditing={true}
    >
      <FullWidthGroup>
        <ControlGroup label="Quick Actions" orientation="horizontal">
          <Button
            variant="secondary"
            size="sm"
            onClick={generateRandomColor}
            className="flex items-center gap-2"
          >
            <Shuffle size={16} />
            Random
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={copyAllFormats}
            className="flex items-center gap-2"
          >
            <Copy size={16} />
            Copy All
          </Button>
        </ControlGroup>
      </FullWidthGroup>

      <ControlGroup label="Color Input">
        <ColorInput
          value={config.hex}
          label=""
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFromHex(e.target.value)
          }
        />
      </ControlGroup>

      <ControlGroup label="Output Format">
        <Select
          value={config.outputFormat}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setConfig((prev) => ({
              ...prev,
              outputFormat: e.target.value as TColorConfig["outputFormat"],
            }))
          }
        >
          <option value="hex">HEX</option>
          <option value="rgb">RGB</option>
          <option value="hsl">HSL</option>
          <option value="oklch">OKLCH</option>
        </Select>
      </ControlGroup>

      <ControlGroup label="Color Harmony">
        <Select
          value={config.harmony}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setConfig((prev) => ({
              ...prev,
              harmony: e.target.value as TColorConfig["harmony"],
            }))
          }
        >
          <option value="none">None</option>
          <option value="complementary">Complementary</option>
          <option value="triadic">Triadic</option>
          <option value="analogous">Analogous</option>
        </Select>
      </ControlGroup>

      <FullWidthGroup>
        <ControlGroup label="Quick Presets">
          <div className="grid grid-cols-2 gap-2">
            {colorPresets.map((preset) => (
              <Button
                key={preset.name}
                variant="secondary"
                size="sm"
                onClick={() => updateFromHex(preset.hex)}
                className="text-left justify-start"
              >
                <div
                  className="w-3 h-3 rounded-full mr-2 border border-border"
                  style={{ backgroundColor: preset.hex }}
                />
                <span className="text-xs">{preset.name}</span>
              </Button>
            ))}
          </div>
        </ControlGroup>
      </FullWidthGroup>

      <ControlGroup label="RGB Channels">
        {[
          { key: "r", label: "Red", color: "red" },
          { key: "g", label: "Green", color: "green" },
          { key: "b", label: "Blue", color: "blue" },
        ].map(({ key, label, color }) => (
          <div key={key}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">{label}</span>
              <span className="text-muted">
                {config.rgb[key as keyof typeof config.rgb]}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="255"
              value={config.rgb[key as keyof typeof config.rgb]}
              onChange={(e) =>
                updateFromRgb({
                  ...config.rgb,
                  [key]: parseInt(e.target.value),
                })
              }
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-${color}-500`}
            />
          </div>
        ))}
      </ControlGroup>

      <ControlGroup label="HSL Channels">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium">Hue</span>
            <span className="text-muted">{config.hsl.h}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={config.hsl.h}
            onChange={(e) =>
              updateFromHsl({ ...config.hsl, h: parseInt(e.target.value) })
            }
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background:
                "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
            }}
          />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium">Saturation</span>
            <span className="text-muted">{config.hsl.s}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={config.hsl.s}
            onChange={(e) =>
              updateFromHsl({ ...config.hsl, s: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium">Lightness</span>
            <span className="text-muted">{config.hsl.l}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={config.hsl.l}
            onChange={(e) =>
              updateFromHsl({ ...config.hsl, l: parseInt(e.target.value) })
            }
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background:
                "linear-gradient(to right, #000000, #808080, #ffffff)",
            }}
          />
        </div>
      </ControlGroup>

      <FullWidthGroup>
        <ProTip content="Use OKLCH for perceptually uniform color adjustments. It's the future of CSS colors and provides better color manipulation than HSL." />
      </FullWidthGroup>
    </ToolLayout>
  );
}
