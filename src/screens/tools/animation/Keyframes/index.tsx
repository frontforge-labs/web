import { useState, useEffect, type JSX } from "react";
import { Zap, Plus, Trash2 } from "lucide-react";
import {
  ToolLayout,
  Button,
  Input,
  Select,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import type { TKeyframesConfig, TKeyframe } from "./types";
import {
  defaultKeyframesConfig,
  keyframesPresets,
  generateKeyframesCSS,
} from "./utils";

export function KeyframesScreen(): JSX.Element {
  const [config, setConfig] = useState<TKeyframesConfig>(
    defaultKeyframesConfig
  );
  const [selectedKeyframe, setSelectedKeyframe] = useState<string>("1");
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      playState: isPlaying ? "running" : "paused",
    }));
  }, [isPlaying]);

  const handleReset = () => {
    setConfig(defaultKeyframesConfig);
    setSelectedKeyframe("1");
    setIsPlaying(true);
  };

  const applyPreset = (presetName: string) => {
    const preset = keyframesPresets[presetName];
    if (preset) {
      setConfig({
        ...preset,
        animationName: config.animationName,
      });
      setSelectedKeyframe(preset.keyframes[0]?.id || "1");
      setIsPlaying(true);
    }
  };

  const addKeyframe = () => {
    const newId = String(Date.now());
    const newKeyframe: TKeyframe = {
      id: newId,
      percentage: 50,
      properties: {},
    };
    setConfig((prev) => ({
      ...prev,
      keyframes: [...prev.keyframes, newKeyframe],
    }));
    setSelectedKeyframe(newId);
  };

  const removeKeyframe = (id: string) => {
    if (config.keyframes.length <= 2) return;
    setConfig((prev) => ({
      ...prev,
      keyframes: prev.keyframes.filter((kf) => kf.id !== id),
    }));
    if (selectedKeyframe === id) {
      setSelectedKeyframe(config.keyframes[0]?.id || "1");
    }
  };

  const updateKeyframe = (id: string, updates: Partial<TKeyframe>) => {
    setConfig((prev) => ({
      ...prev,
      keyframes: prev.keyframes.map((kf) =>
        kf.id === id ? { ...kf, ...updates } : kf
      ),
    }));
  };

  const currentKeyframe = config.keyframes.find(
    (kf) => kf.id === selectedKeyframe
  );

  const previewElement = (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[400px]">
      {/* Timeline Visualization */}
      <div className="w-full max-w-2xl">
        <div className="relative h-20 bg-gray-100 rounded-lg">
          {config.keyframes
            .sort((a, b) => a.percentage - b.percentage)
            .map((kf) => (
              <button
                key={kf.id}
                onClick={() => setSelectedKeyframe(kf.id)}
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 transition-all ${
                  kf.id === selectedKeyframe
                    ? "bg-blue-500 border-blue-600 scale-125 shadow-lg"
                    : "bg-white border-gray-300 hover:border-blue-400"
                }`}
                style={{ left: `${kf.percentage}%` }}
                title={`${kf.percentage}%`}
              >
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-600 font-medium whitespace-nowrap">
                  {kf.percentage}%
                </span>
              </button>
            ))}
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-300 -translate-y-1/2" />
        </div>
      </div>

      {/* Animated Element */}
      <div
        className="w-24 h-24 bg-blue-500 rounded-lg"
        style={{
          animation: isPlaying
            ? `${config.animationName} ${config.duration}s ${config.timingFunction} ${config.delay}s ${config.iterationCount} ${config.direction} ${config.fillMode} ${config.playState}`
            : "none",
        }}
      />

      {/* Play/Pause Control */}
      <Button
        variant={isPlaying ? "secondary" : "default"}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? "Pause" : "Play"} Animation
      </Button>

      {/* Add keyframes style tag */}
      <style>{generateKeyframesCSS(config)}</style>
    </div>
  );

  return (
    <ToolLayout
      title="Keyframes Generator"
      description="Create CSS keyframe animations with multiple steps and visual timeline editor"
      icon={<Zap size={24} />}
      breadcrumbs={<Breadcrumb />}
      generatedCSS={generateKeyframesCSS(config)}
      onReset={handleReset}
      showPreview={true}
      previewElement={previewElement}
      controlsTitle="Animation Controls"
      controlsGridCols={2}
      iconBgClassName="bg-gradient-to-r from-yellow-500 to-orange-600"
    >
      {/* Quick Presets */}
      <FullWidthGroup>
        <ControlGroup label="Quick Presets">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.keys(keyframesPresets).map((preset) => (
            <Button
              key={preset}
              variant="ghost"
              size="sm"
              onClick={() => applyPreset(preset)}
            >
              {preset}
            </Button>
          ))}
          </div>
        </ControlGroup>
      </FullWidthGroup>

      {/* Animation Settings */}
      <ControlGroup label="Animation Name">
        <Input
          value={config.animationName}
          onChange={(e) =>
            setConfig({ ...config, animationName: e.target.value })
          }
          placeholder="myAnimation"
        />
      </ControlGroup>

      <ControlGroup label="Duration (s)">
        <Input
          type="number"
          min="0"
          step="0.1"
          value={config.duration}
          onChange={(e) =>
            setConfig({ ...config, duration: parseFloat(e.target.value) || 0 })
          }
        />
      </ControlGroup>

      <ControlGroup label="Timing Function">
        <Select
          value={config.timingFunction}
          onChange={(e) =>
            setConfig({ ...config, timingFunction: e.target.value })
          }
        >
          <option value="ease">Ease</option>
          <option value="linear">Linear</option>
          <option value="ease-in">Ease In</option>
          <option value="ease-out">Ease Out</option>
          <option value="ease-in-out">Ease In Out</option>
          <option value="cubic-bezier(0.68, -0.55, 0.27, 1.55)">
            Cubic Bezier
          </option>
        </Select>
      </ControlGroup>

      <ControlGroup label="Iteration Count">
        <Select
          value={config.iterationCount}
          onChange={(e) =>
            setConfig({ ...config, iterationCount: e.target.value })
          }
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="infinite">Infinite</option>
        </Select>
      </ControlGroup>

      <ControlGroup label="Direction">
        <Select
          value={config.direction}
          onChange={(e) => setConfig({ ...config, direction: e.target.value })}
        >
          <option value="normal">Normal</option>
          <option value="reverse">Reverse</option>
          <option value="alternate">Alternate</option>
          <option value="alternate-reverse">Alternate Reverse</option>
        </Select>
      </ControlGroup>

      <ControlGroup label="Fill Mode">
        <Select
          value={config.fillMode}
          onChange={(e) => setConfig({ ...config, fillMode: e.target.value })}
        >
          <option value="none">None</option>
          <option value="forwards">Forwards</option>
          <option value="backwards">Backwards</option>
          <option value="both">Both</option>
        </Select>
      </ControlGroup>

      <ControlGroup label="Delay (s)">
        <Input
          type="number"
          min="0"
          step="0.1"
          value={config.delay}
          onChange={(e) =>
            setConfig({ ...config, delay: parseFloat(e.target.value) || 0 })
          }
        />
      </ControlGroup>

      {/* Keyframes Management */}
      <FullWidthGroup>
        <ControlGroup label="Keyframes">
          <div className="space-y-2">
            {config.keyframes
              .sort((a, b) => a.percentage - b.percentage)
              .map((kf) => (
                <div
                  key={kf.id}
                  className={`flex items-center gap-2 p-2 rounded border ${
                    kf.id === selectedKeyframe
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => setSelectedKeyframe(kf.id)}
                    className="flex-1 text-left text-sm"
                  >
                    {kf.percentage}%
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeKeyframe(kf.id)}
                    disabled={config.keyframes.length <= 2}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))}
            <Button variant="secondary" size="sm" onClick={addKeyframe}>
              <Plus size={14} className="mr-1" />
              Add Keyframe
            </Button>
          </div>
        </ControlGroup>
      </FullWidthGroup>

      {/* Selected Keyframe Properties */}
      {currentKeyframe && (
        <>
          <FullWidthGroup>
            <ControlGroup label={`Keyframe at ${currentKeyframe.percentage}%`}>
              <Input
                type="number"
                min="0"
                max="100"
                value={currentKeyframe.percentage}
                onChange={(e) =>
                  updateKeyframe(currentKeyframe.id, {
                    percentage: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="Percentage"
              />
            </ControlGroup>
          </FullWidthGroup>

          <ControlGroup label="Transform">
            <Input
              value={currentKeyframe.properties.transform || ""}
              onChange={(e) =>
                updateKeyframe(currentKeyframe.id, {
                  properties: {
                    ...currentKeyframe.properties,
                    transform: e.target.value,
                  },
                })
              }
              placeholder="translateX(100px) scale(1.2)"
            />
          </ControlGroup>

          <ControlGroup label="Opacity">
            <Input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={currentKeyframe.properties.opacity ?? ""}
              onChange={(e) =>
                updateKeyframe(currentKeyframe.id, {
                  properties: {
                    ...currentKeyframe.properties,
                    opacity: e.target.value
                      ? parseFloat(e.target.value)
                      : undefined,
                  },
                })
              }
              placeholder="0-1"
            />
          </ControlGroup>

          <ControlGroup label="Background Color">
            <Input
              type="color"
              value={currentKeyframe.properties.backgroundColor || "#3b82f6"}
              onChange={(e) =>
                updateKeyframe(currentKeyframe.id, {
                  properties: {
                    ...currentKeyframe.properties,
                    backgroundColor: e.target.value,
                  },
                })
              }
            />
          </ControlGroup>

          <ControlGroup label="Border Radius">
            <Input
              value={currentKeyframe.properties.borderRadius || ""}
              onChange={(e) =>
                updateKeyframe(currentKeyframe.id, {
                  properties: {
                    ...currentKeyframe.properties,
                    borderRadius: e.target.value,
                  },
                })
              }
              placeholder="50%"
            />
          </ControlGroup>
        </>
      )}
    </ToolLayout>
  );
}
