import { useState } from "react";
import { Button, Input } from "@frontenzo/ui";
import { Type, Plus, Trash2, Copy, Eye } from "lucide-react";
import { ToolContainer } from "../../../components/ToolContainer";
import { copyToClipboard } from "../../../lib/css/format";

interface ShadowLayer {
  id: string;
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  color: string;
  enabled: boolean;
}

interface TextShadowConfig {
  text: string;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  textColor: string;
  backgroundColor: string;
  shadows: ShadowLayer[];
}

const shadowPresets = [
  {
    name: "Subtle Drop",
    shadows: [
      { id: "1", offsetX: 1, offsetY: 1, blurRadius: 2, color: "#00000040", enabled: true }
    ]
  },
  {
    name: "Bold Shadow",
    shadows: [
      { id: "1", offsetX: 3, offsetY: 3, blurRadius: 0, color: "#000000", enabled: true }
    ]
  },
  {
    name: "Glow Effect",
    shadows: [
      { id: "1", offsetX: 0, offsetY: 0, blurRadius: 10, color: "#3b82f6", enabled: true }
    ]
  },
  {
    name: "Layered Depth",
    shadows: [
      { id: "1", offsetX: 1, offsetY: 1, blurRadius: 1, color: "#00000020", enabled: true },
      { id: "2", offsetX: 2, offsetY: 2, blurRadius: 4, color: "#00000030", enabled: true },
      { id: "3", offsetX: 4, offsetY: 4, blurRadius: 8, color: "#00000020", enabled: true }
    ]
  },
  {
    name: "Neon Glow",
    shadows: [
      { id: "1", offsetX: 0, offsetY: 0, blurRadius: 5, color: "#ff00ff", enabled: true },
      { id: "2", offsetX: 0, offsetY: 0, blurRadius: 10, color: "#ff00ff80", enabled: true },
      { id: "3", offsetX: 0, offsetY: 0, blurRadius: 15, color: "#ff00ff40", enabled: true }
    ]
  },
  {
    name: "Embossed",
    shadows: [
      { id: "1", offsetX: 1, offsetY: 1, blurRadius: 0, color: "#ffffff80", enabled: true },
      { id: "2", offsetX: -1, offsetY: -1, blurRadius: 0, color: "#00000040", enabled: true }
    ]
  }
];

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function TextShadowScreen() {
  const [config, setConfig] = useState<TextShadowConfig>({
    text: "Text Shadow",
    fontSize: 48,
    fontWeight: "600",
    fontFamily: "Inter, system-ui, sans-serif",
    textColor: "#1f2937",
    backgroundColor: "#f9fafb",
    shadows: [
      { id: generateId(), offsetX: 2, offsetY: 2, blurRadius: 4, color: "#00000040", enabled: true }
    ]
  });

  const addShadowLayer = () => {
    const newShadow: ShadowLayer = {
      id: generateId(),
      offsetX: 0,
      offsetY: 0,
      blurRadius: 5,
      color: "#00000040",
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
      text: "Text Shadow",
      fontSize: 48,
      fontWeight: "600",
      fontFamily: "Inter, system-ui, sans-serif",
      textColor: "#1f2937",
      backgroundColor: "#f9fafb",
      shadows: [
        { id: generateId(), offsetX: 2, offsetY: 2, blurRadius: 4, color: "#00000040", enabled: true }
      ]
    });
  };

  const generateCSS = () => {
    const enabledShadows = config.shadows.filter(shadow => shadow.enabled);
    if (enabledShadows.length === 0) {
      return `/* No shadows enabled */\ntext-shadow: none;`;
    }

    const shadowValues = enabledShadows
      .map(shadow => `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.color}`)
      .join(', ');

    return `/* Text Shadow Effect */\ntext-shadow: ${shadowValues};\ncolor: ${config.textColor};\nfont-size: ${config.fontSize}px;\nfont-weight: ${config.fontWeight};\nfont-family: ${config.fontFamily};`;
  };

  const copyTextShadowOnly = async () => {
    const enabledShadows = config.shadows.filter(shadow => shadow.enabled);
    if (enabledShadows.length === 0) {
      await copyToClipboard("text-shadow: none;");
      return;
    }

    const shadowValues = enabledShadows
      .map(shadow => `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.color}`)
      .join(', ');

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
          textShadow: config.shadows
            .filter(shadow => shadow.enabled)
            .map(shadow => `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.color}`)
            .join(', ') || 'none',
          textAlign: 'center' as const,
          lineHeight: 1.2
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
          onClick={copyTextShadowOnly}
          className="flex items-center gap-2"
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
            <label className="block text-sm font-medium mb-2">Sample Text</label>
            <Input
              value={config.text}
              onChange={(e) => setConfig(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Enter your text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Font Size (px)</label>
            <Input
              type="number"
              value={config.fontSize}
              onChange={(e) => setConfig(prev => ({ ...prev, fontSize: parseInt(e.target.value) || 48 }))}
              min={12}
              max={200}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.textColor}
                onChange={(e) => setConfig(prev => ({ ...prev, textColor: e.target.value }))}
                className="w-12 h-10 rounded border border-border cursor-pointer"
              />
              <Input
                value={config.textColor}
                onChange={(e) => setConfig(prev => ({ ...prev, textColor: e.target.value }))}
                className="flex-1 font-mono"
              />
            </div>
          </div>
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