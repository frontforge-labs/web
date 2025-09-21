import { useState } from "react";
import { Button, Input } from "@frontenzo/ui";
import { Zap, Plus, Trash2, Copy, Play, Pause } from "lucide-react";
import { ToolContainer } from "../../../components/ToolContainer";
import { copyToClipboard } from "../../../lib/css/format";

interface Keyframe {
  id: string;
  percentage: number;
  transform: string;
  opacity: number;
  backgroundColor: string;
  borderRadius: number;
  scale: number;
  rotate: number;
  translateX: number;
  translateY: number;
}

interface AnimationConfig {
  name: string;
  duration: number;
  timingFunction: string;
  iterationCount: string;
  direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode: 'none' | 'forwards' | 'backwards' | 'both';
  delay: number;
  keyframes: Keyframe[];
  isPlaying: boolean;
}

const timingFunctions = [
  { value: 'ease', label: 'Ease' },
  { value: 'ease-in', label: 'Ease In' },
  { value: 'ease-out', label: 'Ease Out' },
  { value: 'ease-in-out', label: 'Ease In Out' },
  { value: 'linear', label: 'Linear' },
  { value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', label: 'Ease (Custom)' },
  { value: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)', label: 'Ease In (Custom)' },
  { value: 'cubic-bezier(0.215, 0.61, 0.355, 1)', label: 'Ease Out (Custom)' },
  { value: 'cubic-bezier(0.645, 0.045, 0.355, 1)', label: 'Ease In Out (Custom)' }
];

const animationPresets = [
  {
    name: "Fade In",
    config: {
      duration: 1000,
      timingFunction: 'ease-out',
      keyframes: [
        { percentage: 0, opacity: 0, scale: 1, rotate: 0, translateX: 0, translateY: 0 },
        { percentage: 100, opacity: 1, scale: 1, rotate: 0, translateX: 0, translateY: 0 }
      ]
    }
  },
  {
    name: "Bounce In",
    config: {
      duration: 1000,
      timingFunction: 'ease-out',
      keyframes: [
        { percentage: 0, opacity: 0, scale: 0.3, rotate: 0, translateX: 0, translateY: 0 },
        { percentage: 50, opacity: 1, scale: 1.05, rotate: 0, translateX: 0, translateY: 0 },
        { percentage: 70, opacity: 1, scale: 0.9, rotate: 0, translateX: 0, translateY: 0 },
        { percentage: 100, opacity: 1, scale: 1, rotate: 0, translateX: 0, translateY: 0 }
      ]
    }
  },
  {
    name: "Slide In Right",
    config: {
      duration: 800,
      timingFunction: 'ease-out',
      keyframes: [
        { percentage: 0, opacity: 0, scale: 1, rotate: 0, translateX: 100, translateY: 0 },
        { percentage: 100, opacity: 1, scale: 1, rotate: 0, translateX: 0, translateY: 0 }
      ]
    }
  },
  {
    name: "Pulse",
    config: {
      duration: 2000,
      timingFunction: 'ease-in-out',
      keyframes: [
        { percentage: 0, opacity: 1, scale: 1, rotate: 0, translateX: 0, translateY: 0 },
        { percentage: 50, opacity: 0.7, scale: 1.2, rotate: 0, translateX: 0, translateY: 0 },
        { percentage: 100, opacity: 1, scale: 1, rotate: 0, translateX: 0, translateY: 0 }
      ]
    }
  },
  {
    name: "Rotate In",
    config: {
      duration: 1000,
      timingFunction: 'ease-out',
      keyframes: [
        { percentage: 0, opacity: 0, scale: 0.8, rotate: -180, translateX: 0, translateY: 0 },
        { percentage: 100, opacity: 1, scale: 1, rotate: 0, translateX: 0, translateY: 0 }
      ]
    }
  }
];

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function KeyframesScreen() {
  const [config, setConfig] = useState<AnimationConfig>({
    name: 'custom-animation',
    duration: 1000,
    timingFunction: 'ease-out',
    iterationCount: '1',
    direction: 'normal',
    fillMode: 'forwards',
    delay: 0,
    isPlaying: false,
    keyframes: [
      {
        id: generateId(),
        percentage: 0,
        transform: '',
        opacity: 1,
        backgroundColor: '#3b82f6',
        borderRadius: 8,
        scale: 1,
        rotate: 0,
        translateX: 0,
        translateY: 0
      },
      {
        id: generateId(),
        percentage: 100,
        transform: '',
        opacity: 1,
        backgroundColor: '#3b82f6',
        borderRadius: 8,
        scale: 1.2,
        rotate: 0,
        translateX: 50,
        translateY: 0
      }
    ]
  });

  const addKeyframe = () => {
    const lastKeyframe = [...config.keyframes].sort((a, b) => a.percentage - b.percentage).pop();
    const newPercentage = lastKeyframe ? Math.min(lastKeyframe.percentage + 25, 100) : 50;

    const newKeyframe: Keyframe = {
      id: generateId(),
      percentage: newPercentage,
      transform: '',
      opacity: 1,
      backgroundColor: '#3b82f6',
      borderRadius: 8,
      scale: 1,
      rotate: 0,
      translateX: 0,
      translateY: 0
    };

    setConfig(prev => ({
      ...prev,
      keyframes: [...prev.keyframes, newKeyframe]
    }));
  };

  const removeKeyframe = (id: string) => {
    setConfig(prev => ({
      ...prev,
      keyframes: prev.keyframes.filter(keyframe => keyframe.id !== id)
    }));
  };

  const updateKeyframe = (id: string, updates: Partial<Keyframe>) => {
    setConfig(prev => ({
      ...prev,
      keyframes: prev.keyframes.map(keyframe =>
        keyframe.id === id ? { ...keyframe, ...updates } : keyframe
      )
    }));
  };

  const applyPreset = (preset: typeof animationPresets[0]) => {
    const keyframes = preset.config.keyframes.map(kf => ({
      id: generateId(),
      transform: '',
      backgroundColor: '#3b82f6',
      borderRadius: 8,
      ...kf
    }));

    setConfig(prev => ({
      ...prev,
      duration: preset.config.duration,
      timingFunction: preset.config.timingFunction,
      keyframes
    }));
  };

  const toggleAnimation = () => {
    setConfig(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const resetTool = () => {
    setConfig({
      name: 'custom-animation',
      duration: 1000,
      timingFunction: 'ease-out',
      iterationCount: '1',
      direction: 'normal',
      fillMode: 'forwards',
      delay: 0,
      isPlaying: false,
      keyframes: [
        {
          id: generateId(),
          percentage: 0,
          transform: '',
          opacity: 1,
          backgroundColor: '#3b82f6',
          borderRadius: 8,
          scale: 1,
          rotate: 0,
          translateX: 0,
          translateY: 0
        },
        {
          id: generateId(),
          percentage: 100,
          transform: '',
          opacity: 1,
          backgroundColor: '#3b82f6',
          borderRadius: 8,
          scale: 1.2,
          rotate: 0,
          translateX: 50,
          translateY: 0
        }
      ]
    });
  };

  const generateCSS = () => {
    const sortedKeyframes = [...config.keyframes].sort((a, b) => a.percentage - b.percentage);

    const keyframeRules = sortedKeyframes.map(kf => {
      const transforms = [];
      if (kf.scale !== 1) transforms.push(`scale(${kf.scale})`);
      if (kf.rotate !== 0) transforms.push(`rotate(${kf.rotate}deg)`);
      if (kf.translateX !== 0 || kf.translateY !== 0) transforms.push(`translate(${kf.translateX}px, ${kf.translateY}px)`);

      const properties = [];
      if (transforms.length > 0) properties.push(`transform: ${transforms.join(' ')}`);
      properties.push(`opacity: ${kf.opacity}`);
      properties.push(`background-color: ${kf.backgroundColor}`);
      properties.push(`border-radius: ${kf.borderRadius}px`);

      return `  ${kf.percentage}% {
    ${properties.join(';\n    ')};
  }`;
    }).join('\n');

    const animationCSS = `/* Animation Definition */
@keyframes ${config.name} {
${keyframeRules}
}

/* Animation Usage */
.animated-element {
  animation: ${config.name} ${config.duration}ms ${config.timingFunction} ${config.delay}ms ${config.iterationCount} ${config.direction} ${config.fillMode};
}`;

    return animationCSS;
  };

  const copyAnimationOnly = async () => {
    const animationProperty = `animation: ${config.name} ${config.duration}ms ${config.timingFunction} ${config.delay}ms ${config.iterationCount} ${config.direction} ${config.fillMode};`;
    await copyToClipboard(animationProperty);
  };

  const sortedKeyframes = [...config.keyframes].sort((a, b) => a.percentage - b.percentage);
  const currentKeyframe = sortedKeyframes[0] || config.keyframes[0];

  const previewElement = (
    <div className="w-full h-64 rounded-lg border border-border shadow-sm flex items-center justify-center p-8 bg-gray-50">
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="w-16 h-16 flex items-center justify-center text-white text-xs font-medium"
          style={{
            backgroundColor: currentKeyframe?.backgroundColor || '#3b82f6',
            borderRadius: `${currentKeyframe?.borderRadius || 8}px`,
            opacity: currentKeyframe?.opacity || 1,
            transform: `scale(${currentKeyframe?.scale || 1}) rotate(${currentKeyframe?.rotate || 0}deg) translate(${currentKeyframe?.translateX || 0}px, ${currentKeyframe?.translateY || 0}px)`,
            animation: config.isPlaying ? `${config.name}-preview ${config.duration}ms ${config.timingFunction} ${config.delay}ms ${config.iterationCount} ${config.direction} ${config.fillMode}` : 'none'
          }}
        >
          Preview
        </div>

        {/* Generate inline keyframes for preview */}
        {config.isPlaying && (
          <style>
            {`
              @keyframes ${config.name}-preview {
                ${sortedKeyframes.map(kf => {
                  const transforms = [];
                  if (kf.scale !== 1) transforms.push(`scale(${kf.scale})`);
                  if (kf.rotate !== 0) transforms.push(`rotate(${kf.rotate}deg)`);
                  if (kf.translateX !== 0 || kf.translateY !== 0) transforms.push(`translate(${kf.translateX}px, ${kf.translateY}px)`);

                  return `
                    ${kf.percentage}% {
                      transform: ${transforms.join(' ') || 'none'};
                      opacity: ${kf.opacity};
                      background-color: ${kf.backgroundColor};
                      border-radius: ${kf.borderRadius}px;
                    }
                  `;
                }).join('')}
              }
            `}
          </style>
        )}
      </div>
    </div>
  );

  return (
    <ToolContainer
      title="Keyframes Generator"
      description="Visual keyframe builder for creating custom CSS animations with timeline control"
      generatedCSS={generateCSS()}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<Zap size={24} />}
    >
      {/* Quick Actions */}
      <div className="flex gap-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleAnimation}
          className="flex items-center gap-2"
        >
          {config.isPlaying ? <Pause size={16} /> : <Play size={16} />}
          {config.isPlaying ? 'Pause' : 'Play'} Preview
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={addKeyframe}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Keyframe
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyAnimationOnly}
          className="flex items-center gap-2"
        >
          <Copy size={16} />
          Copy Animation CSS
        </Button>
      </div>

      {/* Animation Presets */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Animation Presets</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {animationPresets.map((preset) => (
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

      {/* Animation Settings */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Animation Properties</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Animation Name</label>
            <Input
              value={config.name}
              onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
              placeholder="animation-name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Duration (ms)</label>
            <Input
              type="number"
              value={config.duration}
              onChange={(e) => setConfig(prev => ({ ...prev, duration: parseInt(e.target.value) || 1000 }))}
              min={100}
              max={10000}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Timing Function</label>
            <select
              value={config.timingFunction}
              onChange={(e) => setConfig(prev => ({ ...prev, timingFunction: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {timingFunctions.map((func) => (
                <option key={func.value} value={func.value}>{func.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Delay (ms)</label>
            <Input
              type="number"
              value={config.delay}
              onChange={(e) => setConfig(prev => ({ ...prev, delay: parseInt(e.target.value) || 0 }))}
              min={0}
              max={5000}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Iteration Count</label>
            <select
              value={config.iterationCount}
              onChange={(e) => setConfig(prev => ({ ...prev, iterationCount: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="infinite">Infinite</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Direction</label>
            <select
              value={config.direction}
              onChange={(e) => setConfig(prev => ({ ...prev, direction: e.target.value as AnimationConfig['direction'] }))}
              className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="normal">Normal</option>
              <option value="reverse">Reverse</option>
              <option value="alternate">Alternate</option>
              <option value="alternate-reverse">Alternate Reverse</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Fill Mode</label>
            <select
              value={config.fillMode}
              onChange={(e) => setConfig(prev => ({ ...prev, fillMode: e.target.value as AnimationConfig['fillMode'] }))}
              className="w-full px-3 py-2 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="none">None</option>
              <option value="forwards">Forwards</option>
              <option value="backwards">Backwards</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium">Keyframes Timeline</h4>
          <span className="text-xs text-muted">{config.keyframes.length} keyframes</span>
        </div>

        <div className="space-y-4">
          {sortedKeyframes.map((keyframe, index) => (
            <div key={keyframe.id} className="p-4 bg-surface-1 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Keyframe {index + 1} - {keyframe.percentage}%</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeKeyframe(keyframe.id)}
                  className="text-destructive hover:text-destructive"
                  disabled={config.keyframes.length === 1}
                >
                  <Trash2 size={14} />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Percentage</label>
                  <Input
                    type="number"
                    value={keyframe.percentage}
                    onChange={(e) => updateKeyframe(keyframe.id, { percentage: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) })}
                    min={0}
                    max={100}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Opacity</label>
                  <Input
                    type="number"
                    value={keyframe.opacity}
                    onChange={(e) => updateKeyframe(keyframe.id, { opacity: Math.max(0, Math.min(1, parseFloat(e.target.value) || 1)) })}
                    min={0}
                    max={1}
                    step={0.1}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Scale</label>
                  <Input
                    type="number"
                    value={keyframe.scale}
                    onChange={(e) => updateKeyframe(keyframe.id, { scale: parseFloat(e.target.value) || 1 })}
                    min={0.1}
                    max={3}
                    step={0.1}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Rotate (deg)</label>
                  <Input
                    type="number"
                    value={keyframe.rotate}
                    onChange={(e) => updateKeyframe(keyframe.id, { rotate: parseInt(e.target.value) || 0 })}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Translate X (px)</label>
                  <Input
                    type="number"
                    value={keyframe.translateX}
                    onChange={(e) => updateKeyframe(keyframe.id, { translateX: parseInt(e.target.value) || 0 })}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Translate Y (px)</label>
                  <Input
                    type="number"
                    value={keyframe.translateY}
                    onChange={(e) => updateKeyframe(keyframe.id, { translateY: parseInt(e.target.value) || 0 })}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Background Color</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={keyframe.backgroundColor}
                      onChange={(e) => updateKeyframe(keyframe.id, { backgroundColor: e.target.value })}
                      className="w-8 h-8 rounded border border-border cursor-pointer"
                    />
                    <Input
                      value={keyframe.backgroundColor}
                      onChange={(e) => updateKeyframe(keyframe.id, { backgroundColor: e.target.value })}
                      className="flex-1 text-xs font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Border Radius (px)</label>
                  <Input
                    type="number"
                    value={keyframe.borderRadius}
                    onChange={(e) => updateKeyframe(keyframe.id, { borderRadius: parseInt(e.target.value) || 0 })}
                    min={0}
                    max={50}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
}