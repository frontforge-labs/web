import { useState } from "react";
import { Button, Input } from "@frontenzo/ui";
import { Shield, Copy, RotateCcw, CheckCircle, XCircle, AlertCircle, Eye } from "lucide-react";
import { ToolContainer } from "../../../components/ToolContainer";
import { hexToRgb, copyToClipboard } from "../../../lib/css/format";

interface ContrastConfig {
  foreground: string;
  background: string;
}

interface ContrastResult {
  ratio: number;
  wcagAA: {
    normal: boolean;
    large: boolean;
  };
  wcagAAA: {
    normal: boolean;
    large: boolean;
  };
}

const commonPresets = [
  { name: "Black on White", foreground: "#000000", background: "#FFFFFF" },
  { name: "White on Black", foreground: "#FFFFFF", background: "#000000" },
  { name: "Dark on Light", foreground: "#1f2937", background: "#f9fafb" },
  { name: "Blue on White", foreground: "#1e40af", background: "#ffffff" },
  { name: "White on Blue", foreground: "#ffffff", background: "#1e40af" },
  { name: "Gray on Light", foreground: "#6b7280", background: "#f3f4f6" },
  { name: "Dark on Yellow", foreground: "#1f2937", background: "#fef3c7" },
  { name: "Red on Light", foreground: "#dc2626", background: "#fef2f2" },
];

function calculateLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function calculateContrastRatio(foreground: string, background: string): number {
  const lumFg = calculateLuminance(foreground);
  const lumBg = calculateLuminance(background);

  const lighter = Math.max(lumFg, lumBg);
  const darker = Math.min(lumFg, lumBg);

  return (lighter + 0.05) / (darker + 0.05);
}

function getContrastResult(foreground: string, background: string): ContrastResult {
  const ratio = calculateContrastRatio(foreground, background);

  return {
    ratio,
    wcagAA: {
      normal: ratio >= 4.5,
      large: ratio >= 3.0,
    },
    wcagAAA: {
      normal: ratio >= 7.0,
      large: ratio >= 4.5,
    },
  };
}

function getComplianceIcon(passed: boolean) {
  return passed ? (
    <CheckCircle className="w-4 h-4 text-green-600" />
  ) : (
    <XCircle className="w-4 h-4 text-red-600" />
  );
}

function getGradeColor(passed: boolean) {
  return passed ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100";
}

export function ContrastCheckerScreen() {
  const [config, setConfig] = useState<ContrastConfig>({
    foreground: "#1f2937",
    background: "#f9fafb",
  });

  const result = getContrastResult(config.foreground, config.background);

  const resetTool = () => {
    setConfig({
      foreground: "#1f2937",
      background: "#f9fafb",
    });
  };

  const applyPreset = (preset: typeof commonPresets[0]) => {
    setConfig({
      foreground: preset.foreground,
      background: preset.background,
    });
  };

  const swapColors = () => {
    setConfig((prev) => ({
      foreground: prev.background,
      background: prev.foreground,
    }));
  };

  const generateCSS = () => {
    return `/* Contrast Ratio: ${result.ratio.toFixed(2)}:1 */
color: ${config.foreground};
background-color: ${config.background};

/* WCAG Compliance:
 * AA Normal Text: ${result.wcagAA.normal ? "PASS" : "FAIL"}
 * AA Large Text: ${result.wcagAA.large ? "PASS" : "FAIL"}
 * AAA Normal Text: ${result.wcagAAA.normal ? "PASS" : "FAIL"}
 * AAA Large Text: ${result.wcagAAA.large ? "PASS" : "FAIL"}
 */`;
  };

  const copyContrastInfo = async () => {
    const info = `Contrast Ratio: ${result.ratio.toFixed(2)}:1
Foreground: ${config.foreground}
Background: ${config.background}

WCAG AA Compliance:
- Normal Text (4.5:1): ${result.wcagAA.normal ? "PASS ✓" : "FAIL ✗"}
- Large Text (3:1): ${result.wcagAA.large ? "PASS ✓" : "FAIL ✗"}

WCAG AAA Compliance:
- Normal Text (7:1): ${result.wcagAAA.normal ? "PASS ✓" : "FAIL ✗"}
- Large Text (4.5:1): ${result.wcagAAA.large ? "PASS ✓" : "FAIL ✗"}`;

    await copyToClipboard(info);
  };

  const previewElement = (
    <div className="space-y-4">
      {/* Main Preview */}
      <div
        className="w-full h-40 rounded-lg border border-border shadow-sm flex items-center justify-center text-center p-6"
        style={{
          backgroundColor: config.background,
          color: config.foreground,
        }}
      >
        <div>
          <div className="text-lg font-semibold mb-2">Sample Text</div>
          <div className="text-sm">
            The quick brown fox jumps over the lazy dog. This text demonstrates
            how the color combination looks in practice.
          </div>
        </div>
      </div>

      {/* Contrast Ratio Display */}
      <div className="bg-surface-1 rounded-lg p-4 border border-border">
        <div className="text-center">
          <div className="text-2xl font-bold mb-1">
            {result.ratio.toFixed(2)}:1
          </div>
          <div className="text-sm text-muted">Contrast Ratio</div>
        </div>
      </div>

      {/* Compliance Status */}
      <div className="grid grid-cols-2 gap-2">
        <div className={`text-center p-2 rounded text-xs font-medium ${getGradeColor(result.wcagAA.normal)}`}>
          AA Normal
          {result.wcagAA.normal ? " ✓" : " ✗"}
        </div>
        <div className={`text-center p-2 rounded text-xs font-medium ${getGradeColor(result.wcagAAA.normal)}`}>
          AAA Normal
          {result.wcagAAA.normal ? " ✓" : " ✗"}
        </div>
      </div>
    </div>
  );

  return (
    <ToolContainer
      title="Color Contrast Checker"
      description="Verify color combinations meet WCAG accessibility standards for optimal readability"
      generatedCSS={generateCSS()}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<Shield size={24} />}
    >
      {/* Quick Actions */}
      <div className="flex gap-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={swapColors}
          className="flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Swap Colors
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyContrastInfo}
          className="flex items-center gap-2"
        >
          <Copy size={16} />
          Copy Results
        </Button>
      </div>

      {/* Color Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Foreground (Text)</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={config.foreground}
              onChange={(e) => setConfig(prev => ({ ...prev, foreground: e.target.value }))}
              className="w-12 h-10 rounded border border-border cursor-pointer"
            />
            <Input
              type="text"
              value={config.foreground}
              onChange={(e) => setConfig(prev => ({ ...prev, foreground: e.target.value }))}
              className="flex-1 font-mono"
              placeholder="#000000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Background</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={config.background}
              onChange={(e) => setConfig(prev => ({ ...prev, background: e.target.value }))}
              className="w-12 h-10 rounded border border-border cursor-pointer"
            />
            <Input
              type="text"
              value={config.background}
              onChange={(e) => setConfig(prev => ({ ...prev, background: e.target.value }))}
              className="flex-1 font-mono"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>

      {/* WCAG Compliance Results */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={16} />
          <h4 className="text-sm font-medium">WCAG Compliance Results</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* WCAG AA */}
          <div className="p-4 bg-surface-1 border border-border rounded-lg">
            <h5 className="font-medium mb-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              WCAG AA (Minimum)
            </h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Normal Text (≥4.5:1)</span>
                <div className="flex items-center gap-1">
                  {getComplianceIcon(result.wcagAA.normal)}
                  <span className={result.wcagAA.normal ? "text-green-600" : "text-red-600"}>
                    {result.wcagAA.normal ? "PASS" : "FAIL"}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Large Text (≥3:1)</span>
                <div className="flex items-center gap-1">
                  {getComplianceIcon(result.wcagAA.large)}
                  <span className={result.wcagAA.large ? "text-green-600" : "text-red-600"}>
                    {result.wcagAA.large ? "PASS" : "FAIL"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* WCAG AAA */}
          <div className="p-4 bg-surface-1 border border-border rounded-lg">
            <h5 className="font-medium mb-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              WCAG AAA (Enhanced)
            </h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Normal Text (≥7:1)</span>
                <div className="flex items-center gap-1">
                  {getComplianceIcon(result.wcagAAA.normal)}
                  <span className={result.wcagAAA.normal ? "text-green-600" : "text-red-600"}>
                    {result.wcagAAA.normal ? "PASS" : "FAIL"}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Large Text (≥4.5:1)</span>
                <div className="flex items-center gap-1">
                  {getComplianceIcon(result.wcagAAA.large)}
                  <span className={result.wcagAAA.large ? "text-green-600" : "text-red-600"}>
                    {result.wcagAAA.large ? "PASS" : "FAIL"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Presets */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
          <Eye size={16} />
          Common Combinations
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {commonPresets.map((preset) => {
            const presetResult = getContrastResult(preset.foreground, preset.background);
            return (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => applyPreset(preset)}
                className="text-left justify-start h-auto p-3"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded border border-border"
                      style={{ backgroundColor: preset.foreground }}
                    />
                    <div
                      className="w-4 h-4 rounded border border-border"
                      style={{ backgroundColor: preset.background }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium">{preset.name}</div>
                    <div className="text-xs text-muted">{presetResult.ratio.toFixed(1)}:1</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {presetResult.wcagAA.normal ? (
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    ) : presetResult.wcagAA.large ? (
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    )}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Accessibility Info */}
      <div className="p-4 bg-surface-1 border border-border rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle size={16} className="text-blue-500 mt-0.5" />
          <div>
            <div className="text-sm font-medium mb-1">Accessibility Guidelines</div>
            <div className="text-xs text-muted leading-relaxed">
              <strong>Large text</strong> is defined as 18pt+ (24px+) or 14pt+ (18.5px+) bold.
              For critical applications, aim for AAA compliance. Use AA as the minimum standard
              for general content accessibility.
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}