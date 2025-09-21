import { useState } from "react";
import { Button, Input, Select } from "@frontenzo/ui";
import { Palette, Plus, Trash2, RefreshCw, Copy } from "lucide-react";
import { ToolContainer } from "../../../components/ToolContainer";
import { hexToRgb, rgbToHex, copyToClipboard } from "../../../lib/css/format";

interface PaletteColor {
  id: string;
  hex: string;
  name: string;
}

interface PaletteConfig {
  name: string;
  colors: PaletteColor[];
  harmonyType:
    | "complementary"
    | "triadic"
    | "analogous"
    | "split-complementary"
    | "tetradic"
    | "monochromatic";
  baseColor: string;
}

const harmonyTypes = [
  { value: "complementary", label: "Complementary" },
  { value: "triadic", label: "Triadic" },
  { value: "analogous", label: "Analogous" },
  { value: "split-complementary", label: "Split Complementary" },
  { value: "tetradic", label: "Tetradic" },
  { value: "monochromatic", label: "Monochromatic" },
];

const palettePresets = [
  {
    name: "Ocean Breeze",
    colors: [
      { id: "1", hex: "#0077be", name: "Deep Blue" },
      { id: "2", hex: "#4da6d9", name: "Sky Blue" },
      { id: "3", hex: "#87ceeb", name: "Light Blue" },
      { id: "4", hex: "#b0e0e6", name: "Powder Blue" },
      { id: "5", hex: "#e0f6ff", name: "Ice Blue" },
    ],
  },
  {
    name: "Sunset Glow",
    colors: [
      { id: "1", hex: "#ff6b35", name: "Coral" },
      { id: "2", hex: "#f7931e", name: "Orange" },
      { id: "3", hex: "#ffd23f", name: "Golden" },
      { id: "4", hex: "#ffe66d", name: "Light Yellow" },
      { id: "5", hex: "#fff3a0", name: "Cream" },
    ],
  },
  {
    name: "Forest Path",
    colors: [
      { id: "1", hex: "#2d5016", name: "Dark Green" },
      { id: "2", hex: "#3d7c47", name: "Forest Green" },
      { id: "3", hex: "#7fb069", name: "Sage Green" },
      { id: "4", hex: "#bfd5a7", name: "Light Green" },
      { id: "5", hex: "#e8f5e8", name: "Mint" },
    ],
  },
];

function generateHarmonyColors(
  baseHex: string,
  harmonyType: string
): PaletteColor[] {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return [];

  // Convert RGB to HSL for easier color manipulation
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

  const baseHue = h * 360;
  const baseSat = s * 100;
  const baseLum = l * 100;

  const colors: PaletteColor[] = [];

  switch (harmonyType) {
    case "complementary":
      colors.push(
        { id: "1", hex: baseHex, name: "Base" },
        {
          id: "2",
          hex: hslToHex((baseHue + 180) % 360, baseSat, baseLum),
          name: "Complement",
        }
      );
      break;

    case "triadic":
      colors.push(
        { id: "1", hex: baseHex, name: "Base" },
        {
          id: "2",
          hex: hslToHex((baseHue + 120) % 360, baseSat, baseLum),
          name: "Triadic 1",
        },
        {
          id: "3",
          hex: hslToHex((baseHue + 240) % 360, baseSat, baseLum),
          name: "Triadic 2",
        }
      );
      break;

    case "analogous":
      colors.push(
        {
          id: "1",
          hex: hslToHex((baseHue - 30 + 360) % 360, baseSat, baseLum),
          name: "Analogous -30°",
        },
        { id: "2", hex: baseHex, name: "Base" },
        {
          id: "3",
          hex: hslToHex((baseHue + 30) % 360, baseSat, baseLum),
          name: "Analogous +30°",
        }
      );
      break;

    case "monochromatic":
      colors.push(
        {
          id: "1",
          hex: hslToHex(baseHue, baseSat, Math.max(10, baseLum - 40)),
          name: "Dark",
        },
        {
          id: "2",
          hex: hslToHex(baseHue, baseSat, Math.max(10, baseLum - 20)),
          name: "Medium Dark",
        },
        { id: "3", hex: baseHex, name: "Base" },
        {
          id: "4",
          hex: hslToHex(baseHue, baseSat, Math.min(90, baseLum + 20)),
          name: "Medium Light",
        },
        {
          id: "5",
          hex: hslToHex(baseHue, baseSat, Math.min(95, baseLum + 40)),
          name: "Light",
        }
      );
      break;

    default:
      colors.push({ id: "1", hex: baseHex, name: "Base" });
  }

  return colors;
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

export function PaletteBuilderScreen() {
  const [config, setConfig] = useState<PaletteConfig>({
    name: "My Palette",
    colors: [
      { id: "1", hex: "#3b82f6", name: "Primary Blue" },
      { id: "2", hex: "#8b5cf6", name: "Purple" },
      { id: "3", hex: "#10b981", name: "Green" },
    ],
    harmonyType: "complementary",
    baseColor: "#3b82f6",
  });

  const addColor = () => {
    const newColor: PaletteColor = {
      id: Date.now().toString(),
      hex: "#000000",
      name: `Color ${config.colors.length + 1}`,
    };
    setConfig((prev) => ({
      ...prev,
      colors: [...prev.colors, newColor],
    }));
  };

  const removeColor = (id: string) => {
    if (config.colors.length > 1) {
      setConfig((prev) => ({
        ...prev,
        colors: prev.colors.filter((color) => color.id !== id),
      }));
    }
  };

  const updateColor = (id: string, updates: Partial<PaletteColor>) => {
    setConfig((prev) => ({
      ...prev,
      colors: prev.colors.map((color) =>
        color.id === id ? { ...color, ...updates } : color
      ),
    }));
  };

  const generateHarmony = () => {
    const harmonized = generateHarmonyColors(
      config.baseColor,
      config.harmonyType
    );
    setConfig((prev) => ({
      ...prev,
      colors: harmonized,
    }));
  };

  const applyPreset = (preset: (typeof palettePresets)[0]) => {
    setConfig((prev) => ({
      ...prev,
      name: preset.name,
      colors: preset.colors,
    }));
  };

  const resetTool = () => {
    setConfig({
      name: "My Palette",
      colors: [
        { id: "1", hex: "#3b82f6", name: "Primary Blue" },
        { id: "2", hex: "#8b5cf6", name: "Purple" },
        { id: "3", hex: "#10b981", name: "Green" },
      ],
      harmonyType: "complementary",
      baseColor: "#3b82f6",
    });
  };

  const generateCSS = () => {
    const cssVars = config.colors
      .map((color) => {
        const varName = color.name.toLowerCase().replace(/\s+/g, "-");
        return `  --${varName}: ${color.hex};`;
      })
      .join("\n");

    return `:root {\n${cssVars}\n}`;
  };

  const copyPalette = async (format: "css" | "json" | "hex") => {
    let content = "";

    switch (format) {
      case "css":
        content = generateCSS();
        break;
      case "json":
        content = JSON.stringify(config.colors, null, 2);
        break;
      case "hex":
        content = config.colors.map((c) => c.hex).join(", ");
        break;
    }

    try {
      await copyToClipboard(content);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const previewElement = (
    <div className="w-64 h-40 rounded-lg border border-gray-300 shadow-lg overflow-hidden">
      <div className="h-24 flex">
        {config.colors.slice(0, 5).map((color) => (
          <div
            key={color.id}
            className="flex-1"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
      <div className="p-4 bg-white">
        <div className="text-sm font-medium text-gray-800">{config.name}</div>
        <div className="text-xs text-gray-600 mt-1">
          {config.colors.length} colors
        </div>
      </div>
    </div>
  );

  return (
    <ToolContainer
      title="Palette Builder Tool"
      description="Build cohesive color palettes for your projects using color theory"
      generatedCSS={generateCSS()}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<Palette size={24} />}
    >
      {/* Quick Presets */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Preset Palettes</h4>
        <div className="space-y-2">
          {palettePresets.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              size="sm"
              onClick={() => applyPreset(preset)}
              className="w-full text-xs h-8 justify-start"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {preset.colors.slice(0, 3).map((color) => (
                    <div
                      key={color.id}
                      className="w-3 h-3 rounded-full border border-white"
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
                <span>{preset.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Palette Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Palette Name</label>
        <Input
          type="text"
          value={config.name}
          onChange={(e) =>
            setConfig((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="My Palette"
        />
      </div>

      {/* Color Harmony Generator */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Generate Harmony</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1">Base Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.baseColor}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, baseColor: e.target.value }))
                }
                className="w-10 h-8 rounded border border-[var(--fe-border)] cursor-pointer"
              />
              <Input
                type="text"
                value={config.baseColor}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, baseColor: e.target.value }))
                }
                className="flex-1 text-xs h-8"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">
              Harmony Type
            </label>
            <Select
              value={config.harmonyType}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  harmonyType: e.target.value as typeof config.harmonyType,
                }))
              }
            >
              {harmonyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={generateHarmony}
            className="w-full text-xs h-8"
          >
            <RefreshCw size={12} className="mr-1" />
            Generate Harmony
          </Button>
        </div>
      </div>

      {/* Manual Colors */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium">Colors</h4>
          <Button
            size="sm"
            variant="outline"
            onClick={addColor}
            className="h-8"
          >
            <Plus size={12} className="mr-1" />
            Add
          </Button>
        </div>

        <div className="space-y-3">
          {config.colors.map((color) => (
            <div key={color.id} className="flex items-center gap-2">
              <input
                type="color"
                value={color.hex}
                onChange={(e) => updateColor(color.id, { hex: e.target.value })}
                className="w-10 h-8 rounded border border-[var(--fe-border)] cursor-pointer"
              />
              <Input
                type="text"
                value={color.hex}
                onChange={(e) => updateColor(color.id, { hex: e.target.value })}
                className="w-20 text-xs h-8"
                placeholder="#000000"
              />
              <Input
                type="text"
                value={color.name}
                onChange={(e) =>
                  updateColor(color.id, { name: e.target.value })
                }
                className="flex-1 text-xs h-8"
                placeholder="Color name"
              />
              {config.colors.length > 1 && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeColor(color.id)}
                  className="p-1 h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={12} />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Export Palette</h4>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyPalette("css")}
            className="flex-1 text-xs h-8"
          >
            <Copy size={10} className="mr-1" />
            CSS
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyPalette("json")}
            className="flex-1 text-xs h-8"
          >
            <Copy size={10} className="mr-1" />
            JSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyPalette("hex")}
            className="flex-1 text-xs h-8"
          >
            <Copy size={10} className="mr-1" />
            HEX
          </Button>
        </div>
      </div>

      {/* Quick Preview */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Quick Preview</h4>
        <div className="w-full h-16 rounded border border-[var(--fe-border)] overflow-hidden flex">
          {config.colors.map((color) => (
            <div
              key={color.id}
              className="flex-1"
              style={{ backgroundColor: color.hex }}
              title={`${color.name}: ${color.hex}`}
            />
          ))}
        </div>
      </div>
    </ToolContainer>
  );
}
