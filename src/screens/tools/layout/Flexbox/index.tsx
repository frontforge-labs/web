import { useState, type JSX } from "react";
import {
  Button,
  Input,
  Select,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Columns, RotateCcw, Plus, Minus } from "lucide-react";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";
import type { TFlexboxConfig, TFlexItemConfig } from "./types";
import { defaultConfig, flexboxPresets, createDefaultItem } from "./utils";

export function FlexboxScreen(): JSX.Element {
  const [config, setConfig] = useState<TFlexboxConfig>(defaultConfig);

  const updateConfig = (updates: Partial<TFlexboxConfig>): void => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const applyPreset = (preset: (typeof flexboxPresets)[0]): void => {
    const newConfig = { ...config, ...preset.config };
    // Ensure itemConfigs array matches itemCount
    while (newConfig.itemConfigs.length < newConfig.itemCount) {
      newConfig.itemConfigs.push(createDefaultItem());
    }
    while (newConfig.itemConfigs.length > newConfig.itemCount) {
      newConfig.itemConfigs.pop();
    }
    setConfig(newConfig);
  };

  const resetTool = (): void => {
    setConfig(defaultConfig);
  };

  const addItem = (): void => {
    updateConfig({
      itemCount: config.itemCount + 1,
      itemConfigs: [...config.itemConfigs, createDefaultItem()],
    });
  };

  const removeItem = (): void => {
    if (config.itemCount > 1) {
      const newConfigs = [...config.itemConfigs];
      newConfigs.pop();
      updateConfig({
        itemCount: config.itemCount - 1,
        itemConfigs: newConfigs,
        activeItemIndex: Math.min(config.activeItemIndex, config.itemCount - 2),
      });
    }
  };

  const updateItemConfig = (index: number, updates: Partial<TFlexItemConfig>): void => {
    const newConfigs = config.itemConfigs.map((item, i) =>
      i === index ? { ...item, ...updates } : item
    );
    updateConfig({ itemConfigs: newConfigs });
  };

  const generateCSS = (): string => {
    let css = `/* Flexbox Container */
.flex-container {
  display: flex;
  flex-direction: ${config.flexDirection};
  justify-content: ${config.justifyContent};
  align-items: ${config.alignItems};
  flex-wrap: ${config.flexWrap};
  gap: ${config.gap}px;`;

    if (config.flexWrap !== "nowrap") {
      css += `\n  align-content: ${config.alignContent};`;
    }

    css += `\n}`;

    const activeItem = config.itemConfigs[config.activeItemIndex];
    if (activeItem) {
      css += `\n\n/* Flex Item (Item ${config.activeItemIndex + 1}) */
.flex-item {
  flex-grow: ${activeItem.flexGrow};
  flex-shrink: ${activeItem.flexShrink};
  flex-basis: ${activeItem.flexBasis};`;

      if (activeItem.alignSelf !== "auto") {
        css += `\n  align-self: ${activeItem.alignSelf};`;
      }

      if (activeItem.order !== 0) {
        css += `\n  order: ${activeItem.order};`;
      }

      css += `\n}`;
    }

    return css;
  };

  const generatedCSS = generateCSS();

  const previewElement = (
    <div className="flex items-center justify-center min-h-[400px] p-8 bg-gray-100">
      <div
        className="w-full border-2 border-gray-300 bg-white p-4"
        style={{
          display: "flex",
          flexDirection: config.flexDirection,
          justifyContent: config.justifyContent,
          alignItems: config.alignItems,
          alignContent: config.alignContent,
          flexWrap: config.flexWrap,
          gap: `${config.gap}px`,
          height: `${config.containerHeight}px`,
        }}
      >
        {config.itemConfigs.map((item, index) => (
          <div
            key={item.id}
            onClick={() => updateConfig({ activeItemIndex: index })}
            className={`bg-gradient-to-br from-cyan-500 to-blue-600 rounded p-4 flex items-center justify-center text-white font-semibold cursor-pointer transition-all ${
              index === config.activeItemIndex
                ? "ring-4 ring-yellow-400"
                : "hover:opacity-80"
            }`}
            style={{
              flexGrow: item.flexGrow,
              flexShrink: item.flexShrink,
              flexBasis: item.flexBasis,
              alignSelf: item.alignSelf,
              order: item.order,
              minWidth: "60px",
              minHeight: "60px",
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );

  const activeItem = config.itemConfigs[config.activeItemIndex];

  return (
    <ToolLayout
      title="Flexbox Playground"
      description="Interactive flexbox layout builder with visual controls for all flex properties"
      icon={<Columns size={24} />}
      iconBgClassName="bg-gradient-to-r from-cyan-500 to-blue-600"
      breadcrumbs={
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Layout", href: "/tools/layout" },
            { label: "Flexbox", href: "/tools/layout/flexbox" },
          ]}
        />
      }
      generatedCSS={generatedCSS}
      previewElement={previewElement}
    >
      <ProTip content="Flexbox is perfect for one-dimensional layouts. Use justify-content for main axis, align-items for cross axis. Combine flex-grow and flex-basis for responsive item sizing. Click items to edit individual properties." />

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="secondary"
          size="sm"
          onClick={addItem}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Item
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={removeItem}
          disabled={config.itemCount <= 1}
          className="flex items-center gap-2"
        >
          <Minus size={16} />
          Remove
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

      {/* Presets */}
      <FullWidthGroup>
        <ControlGroup label="Quick Presets">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {flexboxPresets.map((preset) => (
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

      {/* Container Properties */}
      <FullWidthGroup>
        <h3 className="text-sm font-semibold mb-3">Container Properties</h3>
      </FullWidthGroup>

      <ControlGroup label="Flex Direction">
        <Select
          value={config.flexDirection}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateConfig({ flexDirection: e.target.value as TFlexboxConfig["flexDirection"] })
          }
        >
          <option value="row">Row →</option>
          <option value="row-reverse">Row Reverse ←</option>
          <option value="column">Column ↓</option>
          <option value="column-reverse">Column Reverse ↑</option>
        </Select>
      </ControlGroup>

      <ControlGroup label="Justify Content (Main Axis)">
        <Select
          value={config.justifyContent}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateConfig({ justifyContent: e.target.value as TFlexboxConfig["justifyContent"] })
          }
        >
          <option value="flex-start">Flex Start</option>
          <option value="flex-end">Flex End</option>
          <option value="center">Center</option>
          <option value="space-between">Space Between</option>
          <option value="space-around">Space Around</option>
          <option value="space-evenly">Space Evenly</option>
        </Select>
      </ControlGroup>

      <ControlGroup label="Align Items (Cross Axis)">
        <Select
          value={config.alignItems}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateConfig({ alignItems: e.target.value as TFlexboxConfig["alignItems"] })
          }
        >
          <option value="flex-start">Flex Start</option>
          <option value="flex-end">Flex End</option>
          <option value="center">Center</option>
          <option value="stretch">Stretch</option>
          <option value="baseline">Baseline</option>
        </Select>
      </ControlGroup>

      <ControlGroup label="Flex Wrap">
        <Select
          value={config.flexWrap}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            updateConfig({ flexWrap: e.target.value as TFlexboxConfig["flexWrap"] })
          }
        >
          <option value="nowrap">No Wrap</option>
          <option value="wrap">Wrap</option>
          <option value="wrap-reverse">Wrap Reverse</option>
        </Select>
      </ControlGroup>

      {config.flexWrap !== "nowrap" && (
        <ControlGroup label="Align Content (Multi-line)">
          <Select
            value={config.alignContent}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              updateConfig({ alignContent: e.target.value as TFlexboxConfig["alignContent"] })
            }
          >
            <option value="flex-start">Flex Start</option>
            <option value="flex-end">Flex End</option>
            <option value="center">Center</option>
            <option value="stretch">Stretch</option>
            <option value="space-between">Space Between</option>
            <option value="space-around">Space Around</option>
          </Select>
        </ControlGroup>
      )}

      <ControlGroup label={`Gap: ${config.gap}px`}>
        <input
          type="range"
          min="0"
          max="50"
          step="2"
          value={config.gap}
          onChange={(e) => updateConfig({ gap: parseInt(e.target.value) })}
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
      </ControlGroup>

      <ControlGroup label={`Container Height: ${config.containerHeight}px`}>
        <input
          type="range"
          min="200"
          max="600"
          step="10"
          value={config.containerHeight}
          onChange={(e) =>
            updateConfig({ containerHeight: parseInt(e.target.value) })
          }
          className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
        />
      </ControlGroup>

      {/* Item Properties */}
      <FullWidthGroup>
        <h3 className="text-sm font-semibold mb-3">
          Item Properties (Item {config.activeItemIndex + 1})
        </h3>
        <p className="text-xs text-muted mb-3">
          Click an item in the preview to edit its properties
        </p>
      </FullWidthGroup>

      {activeItem && (
        <>
          <ControlGroup label={`Flex Grow: ${activeItem.flexGrow}`}>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={activeItem.flexGrow}
              onChange={(e) =>
                updateItemConfig(config.activeItemIndex, {
                  flexGrow: parseInt(e.target.value),
                })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>

          <ControlGroup label={`Flex Shrink: ${activeItem.flexShrink}`}>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={activeItem.flexShrink}
              onChange={(e) =>
                updateItemConfig(config.activeItemIndex, {
                  flexShrink: parseInt(e.target.value),
                })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>

          <ControlGroup label="Flex Basis">
            <Input
              value={activeItem.flexBasis}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateItemConfig(config.activeItemIndex, {
                  flexBasis: e.target.value,
                })
              }
              placeholder="auto, 100px, 50%, etc."
            />
          </ControlGroup>

          <ControlGroup label="Align Self">
            <Select
              value={activeItem.alignSelf}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                updateItemConfig(config.activeItemIndex, {
                  alignSelf: e.target.value,
                })
              }
            >
              <option value="auto">Auto</option>
              <option value="flex-start">Flex Start</option>
              <option value="flex-end">Flex End</option>
              <option value="center">Center</option>
              <option value="stretch">Stretch</option>
              <option value="baseline">Baseline</option>
            </Select>
          </ControlGroup>

          <ControlGroup label={`Order: ${activeItem.order}`}>
            <input
              type="range"
              min="-5"
              max="5"
              step="1"
              value={activeItem.order}
              onChange={(e) =>
                updateItemConfig(config.activeItemIndex, {
                  order: parseInt(e.target.value),
                })
              }
              className="w-full h-2 bg-[var(--fe-border)] rounded-lg appearance-none cursor-pointer"
            />
          </ControlGroup>
        </>
      )}
    </ToolLayout>
  );
}
