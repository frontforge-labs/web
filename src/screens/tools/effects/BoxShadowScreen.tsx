import { useState } from "react";
import { Button, Input } from "@frontenzo/ui";
import { Sparkles, Plus, Trash2, Copy, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import { ToolContainer } from "../../../components/ToolContainer";
import { copyToClipboard } from "../../../lib/css/format";

interface ShadowLayer {
  id: string;
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  spreadRadius: number;
  color: string;
  inset: boolean;
  enabled: boolean;
}

interface BoxShadowConfig {
  backgroundColor: string;
  elementColor: string;
  borderRadius: number;
  shadows: ShadowLayer[];
}

const shadowPresets = [
  {
    name: "Material Soft",
    shadows: [
      { id: "1", offsetX: 0, offsetY: 1, blurRadius: 3, spreadRadius: 0, color: "#0000001a", inset: false, enabled: true },
      { id: "2", offsetX: 0, offsetY: 1, blurRadius: 2, spreadRadius: 0, color: "#0000000f", inset: false, enabled: true }
    ]
  },
  {
    name: "Material Raised",
    shadows: [
      { id: "1", offsetX: 0, offsetY: 2, blurRadius: 4, spreadRadius: 0, color: "#00000026", inset: false, enabled: true },
      { id: "2", offsetX: 0, offsetY: 1, blurRadius: 10, spreadRadius: 0, color: "#0000001a", inset: false, enabled: true }
    ]
  },
  {
    name: "Floating Card",
    shadows: [
      { id: "1", offsetX: 0, offsetY: 4, blurRadius: 8, spreadRadius: 0, color: "#00000014", inset: false, enabled: true },
      { id: "2", offsetX: 0, offsetY: 6, blurRadius: 20, spreadRadius: 0, color: "#0000000a", inset: false, enabled: true }
    ]
  },
  {
    name: "Pressed Button",
    shadows: [
      { id: "1", offsetX: 0, offsetY: 1, blurRadius: 2, spreadRadius: 0, color: "#00000033", inset: true, enabled: true }
    ]
  },
  {
    name: "Neon Glow",
    shadows: [
      { id: "1", offsetX: 0, offsetY: 0, blurRadius: 5, spreadRadius: 0, color: "#3b82f6", inset: false, enabled: true },
      { id: "2", offsetX: 0, offsetY: 0, blurRadius: 10, spreadRadius: 0, color: "#3b82f680", inset: false, enabled: true }
    ]
  },
  {
    name: "Inner Bevel",
    shadows: [
      { id: "1", offsetX: 0, offsetY: 1, blurRadius: 0, spreadRadius: 0, color: "#ffffff80", inset: true, enabled: true },
      { id: "2", offsetX: 0, offsetY: -1, blurRadius: 0, spreadRadius: 0, color: "#00000040", inset: true, enabled: true }
    ]
  }
];

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function BoxShadowScreen() {
  const [config, setConfig] = useState<BoxShadowConfig>({
    backgroundColor: "#f3f4f6",
    elementColor: "#ffffff",
    borderRadius: 8,
    shadows: [
      {
        id: generateId(),
        offsetX: 0,
        offsetY: 4,
        blurRadius: 6,
        spreadRadius: -1,
        color: "#0000001a",
        inset: false,
        enabled: true
      }
    ]
  });

  const addShadowLayer = () => {
    const newShadow: ShadowLayer = {
      id: generateId(),
      offsetX: 0,
      offsetY: 2,
      blurRadius: 4,
      spreadRadius: 0,
      color: "#00000020",
      inset: false,
      enabled: true
    };
    setConfig(prev => ({
      ...prev,
      shadows: [...prev.shadows, newShadow]
    }));
  };

  const removeShadowLayer = (id: string) => {
    setConfig(prev => ({
      ...prev,
      shadows: prev.shadows.filter(shadow => shadow.id !== id)
    }));
  };

  const updateShadowLayer = (id: string, updates: Partial<ShadowLayer>) => {
    setConfig(prev => ({
      ...prev,
      shadows: prev.shadows.map(shadow =>
        shadow.id === id ? { ...shadow, ...updates } : shadow
      )
    }));
  };

  const applyPreset = (preset: typeof shadowPresets[0]) => {
    setConfig(prev => ({
      ...prev,
      shadows: preset.shadows.map(shadow => ({ ...shadow, id: generateId() }))
    }));
  };

  const resetTool = () => {
    setConfig({
      backgroundColor: "#f3f4f6",
      elementColor: "#ffffff",
      borderRadius: 8,
      shadows: [
        {
          id: generateId(),
          offsetX: 0,
          offsetY: 4,
          blurRadius: 6,
          spreadRadius: -1,
          color: "#0000001a",
          inset: false,
          enabled: true
        }
      ]
    });
  };

  const generateCSS = () => {
    const enabledShadows = config.shadows.filter(shadow => shadow.enabled);
    if (enabledShadows.length === 0) {
      return `/* No shadows enabled */\nbox-shadow: none;`;
    }

    const shadowValues = enabledShadows
      .map(shadow => {
        const insetPrefix = shadow.inset ? 'inset ' : '';
        return `${insetPrefix}${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.spreadRadius}px ${shadow.color}`;
      })
      .join(', ');

    return `/* Box Shadow Effect */\nbox-shadow: ${shadowValues};\nbackground-color: ${config.elementColor};\nborder-radius: ${config.borderRadius}px;`;
  };

  const copyShadowOnly = async () => {
    const enabledShadows = config.shadows.filter(shadow => shadow.enabled);
    if (enabledShadows.length === 0) {
      await copyToClipboard("box-shadow: none;");
      return;
    }

    const shadowValues = enabledShadows
      .map(shadow => {
        const insetPrefix = shadow.inset ? 'inset ' : '';
        return `${insetPrefix}${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.spreadRadius}px ${shadow.color}`;
      })
      .join(', ');

    await copyToClipboard(`box-shadow: ${shadowValues};`);
  };

  const previewElement = (
    <div
      className="w-full h-64 rounded-lg border border-border shadow-sm flex items-center justify-center p-8"
      style={{ backgroundColor: config.backgroundColor }}
    >
      <div
        className="w-48 h-32 flex items-center justify-center text-sm font-medium text-muted"
        style={{
          backgroundColor: config.elementColor,
          borderRadius: `${config.borderRadius}px`,
          boxShadow: config.shadows
            .filter(shadow => shadow.enabled)
            .map(shadow => {
              const insetPrefix = shadow.inset ? 'inset ' : '';
              return `${insetPrefix}${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.spreadRadius}px ${shadow.color}`;
            })
            .join(', ') || 'none'
        }}
      >
        Shadow Preview
      </div>
    </div>
  );

  return (
    <ToolContainer
      title="Box Shadow Generator"
      description="Create multi-layer box shadows with precise control over inset, outset, and positioning"
      generatedCSS={generateCSS()}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<Sparkles size={24} />}
    >
      {/* Quick Actions */}
      <div className="flex gap-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={addShadowLayer}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Layer
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyShadowOnly}
          className="flex items-center gap-2"
        >
          <Copy size={16} />
          Copy Shadow
        </Button>
      </div>

      {/* Element Settings */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Element Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.backgroundColor}
                onChange={(e) => setConfig(prev => ({ ...prev, backgroundColor: e.target.value }))}
                className="w-12 h-10 rounded border border-border cursor-pointer"
              />
              <Input
                value={config.backgroundColor}
                onChange={(e) => setConfig(prev => ({ ...prev, backgroundColor: e.target.value }))}
                className="flex-1 font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Element Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.elementColor}
                onChange={(e) => setConfig(prev => ({ ...prev, elementColor: e.target.value }))}
                className="w-12 h-10 rounded border border-border cursor-pointer"
              />
              <Input
                value={config.elementColor}
                onChange={(e) => setConfig(prev => ({ ...prev, elementColor: e.target.value }))}
                className="flex-1 font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Border Radius (px)</label>
            <Input
              type="number"
              value={config.borderRadius}
              onChange={(e) => setConfig(prev => ({ ...prev, borderRadius: parseInt(e.target.value) || 0 }))}
              min={0}
              max={50}
            />
          </div>
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
              variant="outline"
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
          <span className="text-xs text-muted">{config.shadows.length} layers</span>
        </div>

        <div className="space-y-4">
          {config.shadows.map((shadow, index) => (
            <div key={shadow.id} className="p-4 bg-surface-1 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={shadow.enabled}
                    onChange={(e) => updateShadowLayer(shadow.id, { enabled: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">
                    Layer {index + 1} {shadow.inset && "(Inset)"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateShadowLayer(shadow.id, { inset: !shadow.inset })}
                    className="text-xs"
                  >
                    {shadow.inset ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                    {shadow.inset ? "Inset" : "Outset"}
                  </Button>
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
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">X Offset</label>
                  <Input
                    type="number"
                    value={shadow.offsetX}
                    onChange={(e) => updateShadowLayer(shadow.id, { offsetX: parseInt(e.target.value) || 0 })}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Y Offset</label>
                  <Input
                    type="number"
                    value={shadow.offsetY}
                    onChange={(e) => updateShadowLayer(shadow.id, { offsetY: parseInt(e.target.value) || 0 })}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Blur</label>
                  <Input
                    type="number"
                    value={shadow.blurRadius}
                    onChange={(e) => updateShadowLayer(shadow.id, { blurRadius: parseInt(e.target.value) || 0 })}
                    min={0}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Spread</label>
                  <Input
                    type="number"
                    value={shadow.spreadRadius}
                    onChange={(e) => updateShadowLayer(shadow.id, { spreadRadius: parseInt(e.target.value) || 0 })}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Color</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={shadow.color.length === 7 ? shadow.color : '#000000'}
                      onChange={(e) => updateShadowLayer(shadow.id, { color: e.target.value })}
                      className="w-8 h-8 rounded border border-border cursor-pointer"
                    />
                    <Input
                      value={shadow.color}
                      onChange={(e) => updateShadowLayer(shadow.id, { color: e.target.value })}
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