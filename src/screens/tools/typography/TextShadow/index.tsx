import { useState, type JSX } from "react";
import { Button, Input, ColorInput } from "@frontforge/ui";
import { Type, Plus, Trash2, Copy, Eye } from "lucide-react";
import { ToolContainer } from "../../../../components/ToolContainer";
import { copyToClipboard } from "../../../../lib/css/format";
import type { TTextShadowConfig, TShadowLayer } from "./types";
import { shadowPresets, generateId } from "./utils";

export function TextShadowScreen(): JSX.Element {
  const [config, setConfig] = useState<TTextShadowConfig>({
    text: "Text Shadow",
    fontSize: 48,
    fontWeight: "600",
    fontFamily: "Inter, system-ui, sans-serif",
    textColor: "#1f2937",
    backgroundColor: "#f9fafb",
    shadows: [
      {
        id: generateId(),
        offsetX: 2,
        offsetY: 2,
        blurRadius: 4,
        color: "#00000040",
        enabled: true,
      },
    ],
  });

  const updateConfig = (updates: Partial<TTextShadowConfig>): void => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const addShadowLayer = (): void => {
    const newShadow: TShadowLayer = {
      id: generateId(),
      offsetX: 0,
      offsetY: 0,
      blurRadius: 5,
      color: "#00000040",
      enabled: true,
    };
    updateConfig({
      shadows: [...config.shadows, newShadow],
    });
  };

  const removeShadowLayer = (id: string): void => {
    updateConfig({
      shadows: config.shadows.filter((shadow) => shadow.id !== id),
    });
  };

  const updateShadowLayer = (
    id: string,
    updates: Partial<TShadowLayer>
  ): void => {
    updateConfig({
      shadows: config.shadows.map((shadow) =>
        shadow.id === id ? { ...shadow, ...updates } : shadow
      ),
    });
  };

  const applyPreset = (preset: (typeof shadowPresets)[0]): void => {
    updateConfig({
      shadows: preset.shadows.map((shadow) => ({
        ...shadow,
        id: generateId(),
      })),
    });
  };

  const resetTool = (): void => {
    setConfig({
      text: "Text Shadow",
      fontSize: 48,
      fontWeight: "600",
      fontFamily: "Inter, system-ui, sans-serif",
      textColor: "#1f2937",
      backgroundColor: "#f9fafb",
      shadows: [
        {
          id: generateId(),
          offsetX: 2,
          offsetY: 2,
          blurRadius: 4,
          color: "#00000040",
          enabled: true,
        },
      ],
    });
  };

  const generateCSS = (): string => {
    const enabledShadows = config.shadows.filter((shadow) => shadow.enabled);
    if (enabledShadows.length === 0) {
      return `/* No shadows enabled */\ntext-shadow: none;`;
    }

    const shadowValues = enabledShadows
      .map(
        (shadow) =>
          `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.color}`
      )
      .join(", ");

    return `/* Text Shadow Effect */\ntext-shadow: ${shadowValues};\ncolor: ${config.textColor};\nfont-size: ${config.fontSize}px;\nfont-weight: ${config.fontWeight};\nfont-family: ${config.fontFamily};`;
  };

  const copyTextShadowOnly = async (): Promise<void> => {
    const enabledShadows = config.shadows.filter((shadow) => shadow.enabled);
    if (enabledShadows.length === 0) {
      await copyToClipboard("text-shadow: none;");
      return;
    }

    const shadowValues = enabledShadows
      .map(
        (shadow) =>
          `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.color}`
      )
      .join(", ");

    await copyToClipboard(`text-shadow: ${shadowValues};`);
  };

  const previewElement = (
    <div
      className="w-full h-40 rounded-lg border border-border shadow-sm flex items-center justify-center"
      style={{ backgroundColor: config.backgroundColor }}
    >
      <div
        style={{
          fontSize: `${config.fontSize}px`,
          fontWeight: config.fontWeight,
          fontFamily: config.fontFamily,
          color: config.textColor,
          textShadow:
            config.shadows
              .filter((shadow) => shadow.enabled)
              .map(
                (shadow) =>
                  `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.color}`
              )
              .join(", ") || "none",
          textAlign: "center" as const,
          lineHeight: 1.2,
        }}
      >
        {config.text}
      </div>
    </div>
  );

  return (
    <ToolContainer
      title="Text Shadow Generator"
      description="Create custom text shadows with multiple layers and live preview"
      generatedCSS={generateCSS()}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<Type size={24} />}
    >
      {/* Quick Actions */}
      <div className="flex gap-2 mb-6">
        <Button
          variant="secondary"
          size="sm"
          onClick={addShadowLayer}
          className="flex items-center gap-2 w-full"
        >
          <Plus size={16} />
          Add Layer
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={copyTextShadowOnly}
          className="flex items-center gap-2 w-full"
        >
          <Copy size={16} />
          Copy Shadow
        </Button>
      </div>

      {/* Text Settings */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Text Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Sample Text
            </label>
            <Input
              value={config.text}
              onChange={(e) => updateConfig({ text: e.target.value })}
              placeholder="Enter your text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Font Size (px)
            </label>
            <Input
              type="number"
              value={config.fontSize}
              onChange={(e) =>
                updateConfig({ fontSize: parseInt(e.target.value) || 48 })
              }
              min={12}
              max={200}
            />
          </div>
          <ColorInput
            label="Text Color"
            value={config.textColor}
            onChange={(e) => updateConfig({ textColor: e.target.value })}
          />
          <ColorInput
            label="Background Color"
            value={config.backgroundColor}
            onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
          />
        </div>
      </div>

      {/* Shadow Presets */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
          <Eye size={16} />
          Quick Presets
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {shadowPresets.map((preset) => (
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
      </div>

      {/* Shadow Layers */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium">Shadow Layers</h4>
          <span className="text-xs text-muted">
            {config.shadows.length} layers
          </span>
        </div>

        <div className="space-y-4">
          {config.shadows.map((shadow, index) => (
            <div
              key={shadow.id}
              className="p-4 bg-surface-1 border border-border rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={shadow.enabled}
                    onChange={(e) =>
                      updateShadowLayer(shadow.id, {
                        enabled: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Layer {index + 1}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeShadowLayer(shadow.id)}
                  className="text-destructive hover:text-destructive"
                  disabled={config.shadows.length === 1}
                >
                  <Trash2 size={14} />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    X Offset
                  </label>
                  <Input
                    type="number"
                    value={shadow.offsetX}
                    onChange={(e) =>
                      updateShadowLayer(shadow.id, {
                        offsetX: parseInt(e.target.value) || 0,
                      })
                    }
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Y Offset
                  </label>
                  <Input
                    type="number"
                    value={shadow.offsetY}
                    onChange={(e) =>
                      updateShadowLayer(shadow.id, {
                        offsetY: parseInt(e.target.value) || 0,
                      })
                    }
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Blur</label>
                  <Input
                    type="number"
                    value={shadow.blurRadius}
                    onChange={(e) =>
                      updateShadowLayer(shadow.id, {
                        blurRadius: parseInt(e.target.value) || 0,
                      })
                    }
                    min={0}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Color
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={
                        shadow.color.length === 7 ? shadow.color : "#000000"
                      }
                      onChange={(e) =>
                        updateShadowLayer(shadow.id, { color: e.target.value })
                      }
                      className="w-8 h-8 rounded border border-border cursor-pointer"
                    />
                    <Input
                      value={shadow.color}
                      onChange={(e) =>
                        updateShadowLayer(shadow.id, { color: e.target.value })
                      }
                      className="flex-1 text-xs font-mono"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
}
