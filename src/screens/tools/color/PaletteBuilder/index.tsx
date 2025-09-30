import { useState } from "react";
import {
  Button,
  Input,
  Select,
  ColorInput,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Palette, Plus, Trash2, RefreshCw, Copy } from "lucide-react";
import { copyToClipboard } from "../../../../lib/css/format";
import type { TPaletteColor, TPaletteConfig } from "./types";
import { generateHarmonyColors, harmonyTypes, palettePresets } from "./utils";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";

export function PaletteBuilderScreen() {
  const [config, setConfig] = useState<TPaletteConfig>({
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
    const newColor: TPaletteColor = {
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

  const updateColor = (id: string, updates: Partial<TPaletteColor>) => {
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
    <ToolLayout
      title="Palette Builder Tool"
      description="Build cohesive color palettes for your projects using color theory"
      generatedCSS={generateCSS()}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<Palette size={24} />}
      breadcrumbs={<Breadcrumb />}
      controlsGridCols={2}
    >
      <FullWidthGroup>
        <ControlGroup label="Preset Palettes">
          <div className="grid grid-cols-2 gap-2">
            {palettePresets.map((preset) => (
              <Button
                key={preset.name}
                variant="secondary"
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
        </ControlGroup>
      </FullWidthGroup>

      <FullWidthGroup>
        <ControlGroup label="Palette Name">
          <Input
            type="text"
            value={config.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfig((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="My Palette"
          />
        </ControlGroup>
      </FullWidthGroup>

      <FullWidthGroup>
        <ControlGroup label="Generate Harmony">
          <ColorInput
            label="Base Color"
            value={config.baseColor}
            onChange={({ target }: { target: HTMLInputElement }) => {
              setConfig((prev) => ({ ...prev, baseColor: target.value }));
            }}
          />
          <div>
            <label className="block text-xs font-medium mb-1">
              Harmony Type
            </label>
            <Select
              value={config.harmonyType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
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
            variant="secondary"
            size="sm"
            onClick={generateHarmony}
            className="w-full text-xs h-8"
          >
            <RefreshCw size={12} className="mr-1" />
            Generate Harmony
          </Button>
        </ControlGroup>
      </FullWidthGroup>
      <FullWidthGroup>
        <ControlGroup
          label={
            <div className="flex items-center justify-between w-full">
              <span>Colors</span>
              <Button
                size="sm"
                variant="secondary"
                onClick={addColor}
                className="h-8"
              >
                <Plus size={12} className="mr-1" />
                Add
              </Button>
            </div>
          }
        >
          <div className="space-y-3">
            {config.colors.map((color) => (
              <div key={color.id} className="flex items-center gap-2">
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateColor(color.id, { hex: e.target.value })
                  }
                  className="w-10 h-8 rounded border border-[var(--fe-border)] cursor-pointer"
                />
                <Input
                  type="text"
                  value={color.hex}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateColor(color.id, { hex: e.target.value })
                  }
                  className="w-20 text-xs h-8"
                  placeholder="#000000"
                />
                <Input
                  type="text"
                  value={color.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
        </ControlGroup>
      </FullWidthGroup>

      {/* Export Options */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Export Palette</h4>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => copyPalette("css")}
            className="flex-1 text-xs h-8"
          >
            <Copy size={10} className="mr-1" />
            CSS
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => copyPalette("json")}
            className="flex-1 text-xs h-8"
          >
            <Copy size={10} className="mr-1" />
            JSON
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => copyPalette("hex")}
            className="flex-1 text-xs h-8"
          >
            <Copy size={10} className="mr-1" />
            HEX
          </Button>
        </div>
      </div>

      <FullWidthGroup>
        <ControlGroup label="Quick Preview">
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
        </ControlGroup>
      </FullWidthGroup>

      <FullWidthGroup>
        <ProTip content="Use color harmony principles to create balanced palettes. Complementary colors create high contrast, while analogous colors provide a more subtle, cohesive look. Export your palette as CSS variables for easy integration into your projects." />
      </FullWidthGroup>
    </ToolLayout>
  );
}
