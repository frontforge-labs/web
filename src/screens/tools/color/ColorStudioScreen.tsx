import { useState } from "react";
import { Button, Input, Select } from "@frontenzo/ui";
import { Palette, Copy, Shuffle, Eye, Lightbulb } from "lucide-react";
import { ToolContainer } from "../../../components/ToolContainer";
import { hexToRgb, rgbToHex, copyToClipboard } from "../../../lib/css/format";

interface ColorConfig {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  outputFormat: "hex" | "rgb" | "hsl" | "oklch";
  harmony: "none" | "complementary" | "triadic" | "analogous";
}

const colorPresets = [
  { name: "Primary Blue", hex: "#3b82f6", category: "Brand" },
  { name: "Success Green", hex: "#10b981", category: "Status" },
  { name: "Warning Orange", hex: "#f59e0b", category: "Status" },
  { name: "Error Red", hex: "#ef4444", category: "Status" },
  { name: "Purple", hex: "#8b5cf6", category: "Accent" },
  { name: "Pink", hex: "#ec4899", category: "Accent" },
  { name: "Teal", hex: "#14b8a6", category: "Nature" },
  { name: "Indigo", hex: "#6366f1", category: "Deep" },
];

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const rgb = hexToRgb(hex);
  if (!rgb) return { h: 0, s: 0, l: 0 };

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToHex(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

  return rgbToHex(r, g, b);
}

function generateHarmonyColors(baseHex: string, harmony: string): string[] {
  const hsl = hexToHsl(baseHex);
  const colors = [baseHex];

  switch (harmony) {
    case "complementary":
      colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
      break;
    case "triadic":
      colors.push(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l));
      colors.push(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l));
      break;
    case "analogous":
      colors.push(hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l));
      colors.push(hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l));
      break;
  }

  return colors;
}

export function ColorStudioScreen() {
  const [config, setConfig] = useState<ColorConfig>({
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

  const harmonyColors = config.harmony !== "none"
    ? generateHarmonyColors(config.hex, config.harmony)
    : [config.hex];

  const previewElement = (
    <div className="space-y-4">
      {/* Main Color Preview */}
      <div className="w-full h-32 rounded-lg border border-border shadow-sm flex flex-col overflow-hidden">
        <div
          className="flex-1"
          style={{ backgroundColor: config.hex }}
        />
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
            {config.harmony.charAt(0).toUpperCase() + config.harmony.slice(1)} Harmony
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
      `OKLCH: oklch(${config.hsl.l}% ${config.hsl.s}% ${config.hsl.h})`
    ].join('\n');

    await copyToClipboard(formats);
  };

  return (
    <ToolContainer
      title="Color Studio"
      description="Advanced color picker, converter, and harmony generator with modern CSS support"
      generatedCSS={generateCSS()}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<Palette size={24} />}
    >
      {/* Quick Actions */}
      <div className="flex gap-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={generateRandomColor}
          className="flex items-center gap-2"
        >
          <Shuffle size={16} />
          Random
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyAllFormats}
          className="flex items-center gap-2"
        >
          <Copy size={16} />
          Copy All Formats
        </Button>
      </div>

      {/* Color Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Color Input</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={config.hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="w-12 h-10 rounded border border-border cursor-pointer"
          />
          <Input
            type="text"
            value={config.hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="flex-1 font-mono"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Output Format & Harmony */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Output Format</label>
          <Select
            value={config.outputFormat}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                outputFormat: e.target.value as ColorConfig["outputFormat"],
              }))
            }
          >
            <option value="hex">HEX</option>
            <option value="rgb">RGB</option>
            <option value="hsl">HSL</option>
            <option value="oklch">OKLCH</option>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Color Harmony</label>
          <Select
            value={config.harmony}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                harmony: e.target.value as ColorConfig["harmony"],
              }))
            }
          >
            <option value="none">None</option>
            <option value="complementary">Complementary</option>
            <option value="triadic">Triadic</option>
            <option value="analogous">Analogous</option>
          </Select>
        </div>
      </div>

      {/* Color Presets */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
          <Eye size={16} />
          Quick Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          {colorPresets.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
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
      </div>

      {/* RGB Controls */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">RGB Channels</label>
        <div className="space-y-3">
          {[
            { key: 'r', label: 'Red', color: 'red' },
            { key: 'g', label: 'Green', color: 'green' },
            { key: 'b', label: 'Blue', color: 'blue' }
          ].map(({ key, label, color }) => (
            <div key={key}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium">{label}</span>
                <span className="text-muted">{config.rgb[key as keyof typeof config.rgb]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="255"
                value={config.rgb[key as keyof typeof config.rgb]}
                onChange={(e) =>
                  updateFromRgb({
                    ...config.rgb,
                    [key]: parseInt(e.target.value)
                  })
                }
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-${color}-500`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* HSL Controls */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">HSL Channels</label>
        <div className="space-y-3">
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
                background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
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
                background: "linear-gradient(to right, #000000, #808080, #ffffff)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="p-4 bg-surface-1 border border-border rounded-lg">
        <div className="flex items-start gap-2">
          <Lightbulb size={16} className="text-warning mt-0.5" />
          <div>
            <div className="text-sm font-medium mb-1">Pro Tip</div>
            <div className="text-xs text-muted leading-relaxed">
              Use OKLCH for perceptually uniform color adjustments. It's the future of CSS colors and provides better color manipulation than HSL.
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}