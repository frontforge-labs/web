import { useState } from "react";
import { Button, Input } from "@frontforge/ui";
import { Shapes, Copy, Eye, Link as LinkIcon, Unlink } from "lucide-react";
import { ToolContainer } from "../../../components/ToolContainer";
import { copyToClipboard } from "../../../lib/css/format";

interface BorderRadiusConfig {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  linked: boolean;
  unit: "px" | "%" | "rem";
  backgroundColor: string;
  elementColor: string;
  width: number;
  height: number;
}

const radiusPresets = [
  {
    name: "None",
    values: { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 },
  },
  {
    name: "Subtle",
    values: { topLeft: 4, topRight: 4, bottomRight: 4, bottomLeft: 4 },
  },
  {
    name: "Rounded",
    values: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 },
  },
  {
    name: "Large",
    values: { topLeft: 16, topRight: 16, bottomRight: 16, bottomLeft: 16 },
  },
  {
    name: "Pill",
    values: {
      topLeft: 9999,
      topRight: 9999,
      bottomRight: 9999,
      bottomLeft: 9999,
    },
  },
  {
    name: "Top Only",
    values: { topLeft: 8, topRight: 8, bottomRight: 0, bottomLeft: 0 },
  },
  {
    name: "Circle",
    values: { topLeft: 50, topRight: 50, bottomRight: 50, bottomLeft: 50 },
  },
  {
    name: "Organic",
    values: { topLeft: 12, topRight: 24, bottomRight: 8, bottomLeft: 20 },
  },
  {
    name: "Tab Shape",
    values: { topLeft: 8, topRight: 8, bottomRight: 0, bottomLeft: 0 },
  },
  {
    name: "Ticket",
    values: { topLeft: 0, topRight: 12, bottomRight: 12, bottomLeft: 0 },
  },
];

export function BorderRadiusScreen() {
  const [config, setConfig] = useState<BorderRadiusConfig>({
    topLeft: 8,
    topRight: 8,
    bottomRight: 8,
    bottomLeft: 8,
    linked: true,
    unit: "px",
    backgroundColor: "#f3f4f6",
    elementColor: "#3b82f6",
    width: 200,
    height: 120,
  });

  const updateRadius = (
    corner: keyof Pick<
      BorderRadiusConfig,
      "topLeft" | "topRight" | "bottomRight" | "bottomLeft"
    >,
    value: number
  ) => {
    if (config.linked) {
      setConfig((prev) => ({
        ...prev,
        topLeft: value,
        topRight: value,
        bottomRight: value,
        bottomLeft: value,
      }));
    } else {
      setConfig((prev) => ({
        ...prev,
        [corner]: value,
      }));
    }
  };

  const applyPreset = (preset: (typeof radiusPresets)[0]) => {
    setConfig((prev) => ({
      ...prev,
      ...preset.values,
    }));
  };

  const toggleLinked = () => {
    setConfig((prev) => ({ ...prev, linked: !prev.linked }));
  };

  const resetTool = () => {
    setConfig({
      topLeft: 8,
      topRight: 8,
      bottomRight: 8,
      bottomLeft: 8,
      linked: true,
      unit: "px",
      backgroundColor: "#f3f4f6",
      elementColor: "#3b82f6",
      width: 200,
      height: 120,
    });
  };

  const generateCSS = () => {
    const { topLeft, topRight, bottomRight, bottomLeft, unit } = config;

    if (
      topLeft === topRight &&
      topRight === bottomRight &&
      bottomRight === bottomLeft
    ) {
      return `/* Uniform Border Radius */\nborder-radius: ${topLeft}${unit};`;
    }

    return `/* Individual Corner Border Radius */\nborder-radius: ${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit};`;
  };

  const copyRadiusOnly = async () => {
    const { topLeft, topRight, bottomRight, bottomLeft, unit } = config;

    let radiusValue;
    if (
      topLeft === topRight &&
      topRight === bottomRight &&
      bottomRight === bottomLeft
    ) {
      radiusValue = `border-radius: ${topLeft}${unit};`;
    } else {
      radiusValue = `border-radius: ${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit};`;
    }

    await copyToClipboard(radiusValue);
  };

  const previewElement = (
    <div
      className="w-full h-64 rounded-lg border border-border shadow-sm flex items-center justify-center p-8"
      style={{ backgroundColor: config.backgroundColor }}
    >
      <div
        className="flex items-center justify-center text-sm font-medium text-white"
        style={{
          backgroundColor: config.elementColor,
          width: `${config.width}px`,
          height: `${config.height}px`,
          borderTopLeftRadius: `${config.topLeft}${config.unit}`,
          borderTopRightRadius: `${config.topRight}${config.unit}`,
          borderBottomRightRadius: `${config.bottomRight}${config.unit}`,
          borderBottomLeftRadius: `${config.bottomLeft}${config.unit}`,
        }}
      >
        Border Radius
      </div>
    </div>
  );

  return (
    <ToolContainer
      title="Border Radius Previewer"
      description="Create complex border radius combinations with individual corner control and live preview"
      generatedCSS={generateCSS()}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<Shapes size={24} />}
    >
      {/* Quick Actions */}
      <div className="flex gap-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLinked}
          className="flex items-center gap-2"
        >
          {config.linked ? <LinkIcon size={16} /> : <Unlink size={16} />}
          {config.linked ? "Linked" : "Unlinked"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyRadiusOnly}
          className="flex items-center gap-2"
        >
          <Copy size={16} />
          Copy Radius
        </Button>
      </div>

      {/* Element Settings */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Element Settings</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.backgroundColor}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    backgroundColor: e.target.value,
                  }))
                }
                className="w-10 h-10 rounded border border-border cursor-pointer"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Element Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.elementColor}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    elementColor: e.target.value,
                  }))
                }
                className="w-10 h-10 rounded border border-border cursor-pointer"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Width (px)</label>
            <Input
              type="number"
              value={config.width}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  width: parseInt(e.target.value) || 200,
                }))
              }
              min={50}
              max={400}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Height (px)
            </label>
            <Input
              type="number"
              value={config.height}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  height: parseInt(e.target.value) || 120,
                }))
              }
              min={50}
              max={400}
            />
          </div>
        </div>
      </div>

      {/* Radius Presets */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
          <Eye size={16} />
          Quick Presets
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {radiusPresets.map((preset) => (
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

      {/* Unit Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Unit</label>
        <div className="flex gap-2">
          {(["px", "%", "rem"] as const).map((unit) => (
            <Button
              key={unit}
              variant={config.unit === unit ? "default" : "outline"}
              size="sm"
              onClick={() => setConfig((prev) => ({ ...prev, unit }))}
              className="text-xs"
            >
              {unit}
            </Button>
          ))}
        </div>
      </div>

      {/* Corner Controls */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium">Corner Radius Controls</h4>
          <span className="text-xs text-muted">
            {config.linked
              ? "Linked - all corners update together"
              : "Individual corner control"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Visual Corner Diagram */}
          <div className="aspect-square bg-surface-1 border border-border rounded-lg p-4 relative">
            <div className="text-center text-xs text-muted mb-2">
              Visual Guide
            </div>

            {/* Top Left */}
            <div className="absolute top-4 left-4">
              <div className="text-xs font-medium mb-1">TL</div>
              <div className="w-8 h-8 border-2 border-accent rounded-tl-lg"></div>
            </div>

            {/* Top Right */}
            <div className="absolute top-4 right-4">
              <div className="text-xs font-medium mb-1">TR</div>
              <div className="w-8 h-8 border-2 border-accent rounded-tr-lg"></div>
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-4 left-4">
              <div className="text-xs font-medium mb-1">BL</div>
              <div className="w-8 h-8 border-2 border-accent rounded-bl-lg"></div>
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-4 right-4">
              <div className="text-xs font-medium mb-1">BR</div>
              <div className="w-8 h-8 border-2 border-accent rounded-br-lg"></div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1">
                Top Left: {config.topLeft}
                {config.unit}
              </label>
              <Input
                type="number"
                value={config.topLeft}
                onChange={(e) =>
                  updateRadius("topLeft", parseInt(e.target.value) || 0)
                }
                min={0}
                max={config.unit === "%" ? 50 : 200}
                className="text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Top Right: {config.topRight}
                {config.unit}
              </label>
              <Input
                type="number"
                value={config.topRight}
                onChange={(e) =>
                  updateRadius("topRight", parseInt(e.target.value) || 0)
                }
                min={0}
                max={config.unit === "%" ? 50 : 200}
                className="text-sm"
                disabled={config.linked}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Bottom Right: {config.bottomRight}
                {config.unit}
              </label>
              <Input
                type="number"
                value={config.bottomRight}
                onChange={(e) =>
                  updateRadius("bottomRight", parseInt(e.target.value) || 0)
                }
                min={0}
                max={config.unit === "%" ? 50 : 200}
                className="text-sm"
                disabled={config.linked}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Bottom Left: {config.bottomLeft}
                {config.unit}
              </label>
              <Input
                type="number"
                value={config.bottomLeft}
                onChange={(e) =>
                  updateRadius("bottomLeft", parseInt(e.target.value) || 0)
                }
                min={0}
                max={config.unit === "%" ? 50 : 200}
                className="text-sm"
                disabled={config.linked}
              />
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
