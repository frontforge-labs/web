import { useState, type JSX } from "react";
import {
  Button,
  Input,
  ColorInput,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Box, Plus, Trash2, Copy, RotateCcw } from "lucide-react";
import { copyToClipboard } from "../../../../lib/css/format";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";
import type { TBoxShadowConfig, TShadowLayer } from "./types";
import { shadowPresets, generateId } from "./utils";

export function BoxShadowScreen(): JSX.Element {
  const [config, setConfig] = useState<TBoxShadowConfig>({
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    elementWidth: 200,
    elementHeight: 200,
    shadows: [
      {
        id: generateId(),
        offsetX: 0,
        offsetY: 4,
        blurRadius: 6,
        spreadRadius: -1,
        color: "#0000001a",
        inset: false,
        enabled: true,
      },
    ],
  });

  const updateConfig = (updates: Partial<TBoxShadowConfig>): void => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const addShadowLayer = (): void => {
    const newShadow: TShadowLayer = {
      id: generateId(),
      offsetX: 0,
      offsetY: 0,
      blurRadius: 10,
      spreadRadius: 0,
      color: "#00000033",
      inset: false,
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
      backgroundColor: "#f9fafb",
      borderRadius: 8,
      elementWidth: 200,
      elementHeight: 200,
      shadows: [
        {
          id: generateId(),
          offsetX: 0,
          offsetY: 4,
          blurRadius: 6,
          spreadRadius: -1,
          color: "#0000001a",
          inset: false,
          enabled: true,
        },
      ],
    });
  };

  const generateCSS = (): string => {
    const enabledShadows = config.shadows.filter((shadow) => shadow.enabled);
    if (enabledShadows.length === 0) {
      return `/* No shadows enabled */\nbox-shadow: none;`;
    }

    const shadowValues = enabledShadows
      .map((shadow) => {
        const insetStr = shadow.inset ? "inset " : "";
        return `${insetStr}${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.spreadRadius}px ${shadow.color}`;
      })
      .join(",\n  ");

    return `/* Box Shadow Effect */\nbox-shadow: ${shadowValues};`;
  };

  const generatedCSS = generateCSS();

  const copyBoxShadowOnly = async (): Promise<void> => {
    const enabledShadows = config.shadows.filter((shadow) => shadow.enabled);
    if (enabledShadows.length === 0) {
      await copyToClipboard("box-shadow: none;");
      return;
    }

    const shadowValues = enabledShadows
      .map((shadow) => {
        const insetStr = shadow.inset ? "inset " : "";
        return `${insetStr}${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.spreadRadius}px ${shadow.color}`;
      })
      .join(",\n  ");

    await copyToClipboard(`box-shadow: ${shadowValues};`);
  };

  const previewElement = (
    <div
      className="flex items-center justify-center min-h-[300px] p-8"
      style={{ backgroundColor: config.backgroundColor }}
    >
      <div
        className="bg-white"
        style={{
          width: `${config.elementWidth}px`,
          height: `${config.elementHeight}px`,
          borderRadius: `${config.borderRadius}px`,
          boxShadow: config.shadows
            .filter((shadow) => shadow.enabled)
            .map((shadow) => {
              const insetStr = shadow.inset ? "inset " : "";
              return `${insetStr}${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.spreadRadius}px ${shadow.color}`;
            })
            .join(", "),
        }}
      />
    </div>
  );

  return (
    <ToolLayout
      title="Box Shadow Generator"
      description="Create layered box shadows with live preview and advanced customization"
      icon={<Box size={24} />}
      iconBgClassName="bg-gradient-to-r from-orange-500 to-red-600"
      breadcrumbs={
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Effects", href: "/tools/effects" },
            { label: "Box Shadow", href: "/tools/effects/box-shadow" },
          ]}
        />
      }
      generatedCSS={generatedCSS}
      previewElement={previewElement}
    >
      <ProTip content="Combine multiple shadows with different blur radii to create realistic depth. Use subtle shadows for cards and larger blur for floating elements. Try inset shadows for pressed button states." />

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="secondary"
          size="sm"
          onClick={addShadowLayer}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Layer
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={copyBoxShadowOnly}
          className="flex items-center gap-2"
        >
          <Copy size={16} />
          Copy Shadow
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

      {/* Element Settings */}
      <ControlGroup label="Element Settings">
        <div>
          <label className="block text-sm font-medium mb-2">Width (px)</label>
          <Input
            type="number"
            value={config.elementWidth}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig({ elementWidth: parseInt(e.target.value) || 200 })
            }
            min={50}
            max={400}
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
            min={50}
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
            max={100}
          />
        </div>
        <ColorInput
          label="Background Color"
          value={config.backgroundColor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateConfig({ backgroundColor: e.target.value })
          }
        />
      </ControlGroup>

      {/* Shadow Presets */}
      <FullWidthGroup>
        <ControlGroup label="Quick Presets">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
        </ControlGroup>
      </FullWidthGroup>

      {/* Shadow Layers */}
      <FullWidthGroup>
        <ControlGroup label="Shadow Layers">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground">
              {config.shadows.length} layers
            </span>
          </div>

          <div className="space-y-4">
            {config.shadows.map((shadow, index) => (
              <div key={shadow.id} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={shadow.enabled}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateShadowLayer(shadow.id, {
                          enabled: e.target.checked,
                        })
                      }
                      className="rounded"
                    />
                    <span className="text-sm font-medium">
                      Layer {index + 1}
                      {shadow.inset && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          (Inset)
                        </span>
                      )}
                    </span>
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

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      X Offset
                    </label>
                    <Input
                      type="number"
                      value={shadow.offsetX}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateShadowLayer(shadow.id, {
                          offsetY: parseInt(e.target.value) || 0,
                        })
                      }
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Blur
                    </label>
                    <Input
                      type="number"
                      value={shadow.blurRadius}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                      Spread
                    </label>
                    <Input
                      type="number"
                      value={shadow.spreadRadius}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateShadowLayer(shadow.id, {
                          spreadRadius: parseInt(e.target.value) || 0,
                        })
                      }
                      className="text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium mb-1">
                      Color
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="color"
                        value={
                          shadow.color.length === 7 ? shadow.color : "#000000"
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateShadowLayer(shadow.id, {
                            color: e.target.value,
                          })
                        }
                        className="w-8 h-8 rounded border border-border cursor-pointer"
                      />
                      <Input
                        value={shadow.color}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateShadowLayer(shadow.id, {
                            color: e.target.value,
                          })
                        }
                        className="flex-1 text-xs font-mono"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`inset-${shadow.id}`}
                    checked={shadow.inset}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateShadowLayer(shadow.id, {
                        inset: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <label
                    htmlFor={`inset-${shadow.id}`}
                    className="text-xs font-medium"
                  >
                    Inset shadow
                  </label>
                </div>
              </div>
            ))}
          </div>
        </ControlGroup>
      </FullWidthGroup>
    </ToolLayout>
  );
}
