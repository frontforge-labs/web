import { useState } from "react";
import { Button, Input } from "@frontforge/ui";
import { LayoutGrid, Plus, Trash2, Copy } from "lucide-react";
import { ToolContainer } from "../../../components/ToolContainer";
import { copyToClipboard } from "../../../lib/css/format";

interface FlexItem {
  id: string;
  flexGrow: number;
  flexShrink: number;
  flexBasis: string;
  alignSelf: string;
  order: number;
  content: string;
}

interface FlexboxConfig {
  flexDirection: "row" | "row-reverse" | "column" | "column-reverse";
  justifyContent:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  alignContent:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch";
  flexWrap: "nowrap" | "wrap" | "wrap-reverse";
  gap: number;
  containerHeight: number;
  containerWidth: number;
  items: FlexItem[];
}

const flexboxPresets = [
  {
    name: "Navigation Bar",
    config: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      alignItems: "center" as const,
      alignContent: "stretch" as const,
      flexWrap: "nowrap" as const,
      gap: 16,
      containerHeight: 60,
      items: [
        {
          id: "1",
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: "auto",
          alignSelf: "auto",
          order: 0,
          content: "Logo",
        },
        {
          id: "2",
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: "auto",
          alignSelf: "auto",
          order: 0,
          content: "Nav Links",
        },
        {
          id: "3",
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: "auto",
          alignSelf: "auto",
          order: 0,
          content: "Profile",
        },
      ],
    },
  },
  {
    name: "Card Layout",
    config: {
      flexDirection: "row" as const,
      justifyContent: "flex-start" as const,
      alignItems: "stretch" as const,
      alignContent: "flex-start" as const,
      flexWrap: "wrap" as const,
      gap: 20,
      containerHeight: 300,
      items: [
        {
          id: "1",
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: "300px",
          alignSelf: "auto",
          order: 0,
          content: "Card 1",
        },
        {
          id: "2",
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: "300px",
          alignSelf: "auto",
          order: 0,
          content: "Card 2",
        },
        {
          id: "3",
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: "300px",
          alignSelf: "auto",
          order: 0,
          content: "Card 3",
        },
      ],
    },
  },
  {
    name: "Centered Content",
    config: {
      flexDirection: "column" as const,
      justifyContent: "center" as const,
      alignItems: "center" as const,
      alignContent: "center" as const,
      flexWrap: "nowrap" as const,
      gap: 20,
      containerHeight: 400,
      items: [
        {
          id: "1",
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: "auto",
          alignSelf: "auto",
          order: 0,
          content: "Hero Title",
        },
        {
          id: "2",
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: "auto",
          alignSelf: "auto",
          order: 0,
          content: "Subtitle",
        },
        {
          id: "3",
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: "auto",
          alignSelf: "auto",
          order: 0,
          content: "CTA Button",
        },
      ],
    },
  },
  {
    name: "Sidebar Layout",
    config: {
      flexDirection: "row" as const,
      justifyContent: "flex-start" as const,
      alignItems: "stretch" as const,
      alignContent: "stretch" as const,
      flexWrap: "nowrap" as const,
      gap: 0,
      containerHeight: 500,
      items: [
        {
          id: "1",
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: "250px",
          alignSelf: "auto",
          order: 0,
          content: "Sidebar",
        },
        {
          id: "2",
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: "0",
          alignSelf: "auto",
          order: 0,
          content: "Main Content",
        },
      ],
    },
  },
];

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function FlexboxScreen() {
  const [config, setConfig] = useState<FlexboxConfig>({
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignContent: "flex-start",
    flexWrap: "nowrap",
    gap: 10,
    containerHeight: 300,
    containerWidth: 100,
    items: [
      {
        id: generateId(),
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "auto",
        alignSelf: "auto",
        order: 0,
        content: "Item 1",
      },
      {
        id: generateId(),
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "auto",
        alignSelf: "auto",
        order: 0,
        content: "Item 2",
      },
      {
        id: generateId(),
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
        alignSelf: "auto",
        order: 0,
        content: "Item 3",
      },
    ],
  });

  const addFlexItem = () => {
    const newItem: FlexItem = {
      id: generateId(),
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: "auto",
      alignSelf: "auto",
      order: 0,
      content: `Item ${config.items.length + 1}`,
    };
    setConfig((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const removeFlexItem = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const updateFlexItem = (id: string, updates: Partial<FlexItem>) => {
    setConfig((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  };

  const applyPreset = (preset: (typeof flexboxPresets)[0]) => {
    setConfig((prev) => ({
      ...prev,
      ...preset.config,
      containerWidth: prev.containerWidth,
      items: preset.config.items.map((item) => ({ ...item, id: generateId() })),
    }));
  };

  const resetTool = () => {
    setConfig({
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "stretch",
      alignContent: "flex-start",
      flexWrap: "nowrap",
      gap: 10,
      containerHeight: 300,
      containerWidth: 100,
      items: [
        {
          id: generateId(),
          flexGrow: 0,
          flexShrink: 1,
          flexBasis: "auto",
          alignSelf: "auto",
          order: 0,
          content: "Item 1",
        },
        {
          id: generateId(),
          flexGrow: 0,
          flexShrink: 1,
          flexBasis: "auto",
          alignSelf: "auto",
          order: 0,
          content: "Item 2",
        },
        {
          id: generateId(),
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: "auto",
          alignSelf: "auto",
          order: 0,
          content: "Item 3",
        },
      ],
    });
  };

  const generateCSS = () => {
    const containerCSS = `/* Flex Container */
.flex-container {
  display: flex;
  flex-direction: ${config.flexDirection};
  justify-content: ${config.justifyContent};
  align-items: ${config.alignItems};
  align-content: ${config.alignContent};
  flex-wrap: ${config.flexWrap};
  gap: ${config.gap}px;
  height: ${config.containerHeight}px;
}`;

    const itemsCSS = config.items
      .map((item, index) => {
        const flex = `${item.flexGrow} ${item.flexShrink} ${item.flexBasis}`;
        return `
/* Flex Item ${index + 1} */
.flex-item-${index + 1} {
  flex: ${flex};${item.alignSelf !== "auto" ? `\n  align-self: ${item.alignSelf};` : ""}${item.order !== 0 ? `\n  order: ${item.order};` : ""}
}`;
      })
      .join("");

    return containerCSS + itemsCSS;
  };

  const copyFlexboxOnly = async () => {
    const flexboxCSS = `display: flex;
flex-direction: ${config.flexDirection};
justify-content: ${config.justifyContent};
align-items: ${config.alignItems};
align-content: ${config.alignContent};
flex-wrap: ${config.flexWrap};
gap: ${config.gap}px;`;

    await copyToClipboard(flexboxCSS);
  };

  const previewElement = (
    <div className="w-full h-64 rounded-lg border border-border shadow-sm p-4">
      <div
        className="w-full border-2 border-dashed border-accent/30 rounded p-2"
        style={{
          height: `${config.containerHeight}px`,
          display: "flex",
          flexDirection: config.flexDirection,
          justifyContent: config.justifyContent,
          alignItems: config.alignItems,
          alignContent: config.alignContent,
          flexWrap: config.flexWrap,
          gap: `${config.gap}px`,
        }}
      >
        {config.items.map((item) => (
          <div
            key={item.id}
            className="bg-accent/20 border border-accent/40 rounded text-xs font-medium flex items-center justify-center text-accent px-2 py-1 min-w-0"
            style={{
              flex: `${item.flexGrow} ${item.flexShrink} ${item.flexBasis}`,
              alignSelf: item.alignSelf === "auto" ? undefined : item.alignSelf,
              order: item.order,
              minHeight: "30px",
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <ToolContainer
      title="Flexbox Playground"
      description="Interactive Flexbox playground with visual controls for container and item properties"
      generatedCSS={generateCSS()}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<LayoutGrid size={24} />}
    >
      {/* Quick Actions */}
      <div className="flex gap-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={addFlexItem}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Item
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyFlexboxOnly}
          className="flex items-center gap-2"
        >
          <Copy size={16} />
          Copy Flexbox CSS
        </Button>
      </div>

      {/* Presets */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Quick Presets</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {flexboxPresets.map((preset) => (
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

      {/* Container Settings */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Container Properties</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Flex Direction
            </label>
            <select
              value={config.flexDirection}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  flexDirection: e.target
                    .value as FlexboxConfig["flexDirection"],
                }))
              }
              className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="row">Row</option>
              <option value="row-reverse">Row Reverse</option>
              <option value="column">Column</option>
              <option value="column-reverse">Column Reverse</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Justify Content
            </label>
            <select
              value={config.justifyContent}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  justifyContent: e.target
                    .value as FlexboxConfig["justifyContent"],
                }))
              }
              className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="flex-start">Flex Start</option>
              <option value="flex-end">Flex End</option>
              <option value="center">Center</option>
              <option value="space-between">Space Between</option>
              <option value="space-around">Space Around</option>
              <option value="space-evenly">Space Evenly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Align Items
            </label>
            <select
              value={config.alignItems}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  alignItems: e.target.value as FlexboxConfig["alignItems"],
                }))
              }
              className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="stretch">Stretch</option>
              <option value="flex-start">Flex Start</option>
              <option value="flex-end">Flex End</option>
              <option value="center">Center</option>
              <option value="baseline">Baseline</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Flex Wrap</label>
            <select
              value={config.flexWrap}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  flexWrap: e.target.value as FlexboxConfig["flexWrap"],
                }))
              }
              className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="nowrap">No Wrap</option>
              <option value="wrap">Wrap</option>
              <option value="wrap-reverse">Wrap Reverse</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Gap (px)</label>
            <Input
              type="number"
              value={config.gap}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  gap: parseInt(e.target.value) || 0,
                }))
              }
              min={0}
              max={50}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Container Height (px)
            </label>
            <Input
              type="number"
              value={config.containerHeight}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  containerHeight: parseInt(e.target.value) || 200,
                }))
              }
              min={100}
              max={600}
            />
          </div>
        </div>
      </div>

      {/* Flex Items */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium">Flex Items</h4>
          <span className="text-xs text-muted">
            {config.items.length} items
          </span>
        </div>

        <div className="space-y-4">
          {config.items.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-surface-1 border border-border rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Item {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFlexItem(item.id)}
                  className="text-destructive hover:text-destructive"
                  disabled={config.items.length === 1}
                >
                  <Trash2 size={14} />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Content
                  </label>
                  <Input
                    value={item.content}
                    onChange={(e) =>
                      updateFlexItem(item.id, { content: e.target.value })
                    }
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Flex Grow
                  </label>
                  <Input
                    type="number"
                    value={item.flexGrow}
                    onChange={(e) =>
                      updateFlexItem(item.id, {
                        flexGrow: parseInt(e.target.value) || 0,
                      })
                    }
                    min={0}
                    max={10}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Flex Shrink
                  </label>
                  <Input
                    type="number"
                    value={item.flexShrink}
                    onChange={(e) =>
                      updateFlexItem(item.id, {
                        flexShrink: parseInt(e.target.value) || 0,
                      })
                    }
                    min={0}
                    max={10}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Flex Basis
                  </label>
                  <Input
                    value={item.flexBasis}
                    onChange={(e) =>
                      updateFlexItem(item.id, { flexBasis: e.target.value })
                    }
                    placeholder="auto, 100px, 50%"
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Align Self
                  </label>
                  <select
                    value={item.alignSelf}
                    onChange={(e) =>
                      updateFlexItem(item.id, { alignSelf: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="auto">Auto</option>
                    <option value="flex-start">Flex Start</option>
                    <option value="flex-end">Flex End</option>
                    <option value="center">Center</option>
                    <option value="baseline">Baseline</option>
                    <option value="stretch">Stretch</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
}
