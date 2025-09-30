import { useState } from "react";
import {
  Button,
  ColorInput,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Shield, Copy, RotateCcw } from "lucide-react";
import { copyToClipboard } from "../../../../lib/css/format";
import {
  commonPresets,
  getComplianceIcon,
  getGradeColor,
  getTContrastResult,
} from "./utils";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ProTip } from "../../../../components/ProTip";

type TContrastConfig = {
  foreground: string;
  background: string;
};

export function ContrastCheckerScreen() {
  const [config, setConfig] = useState<TContrastConfig>({
    foreground: "#1f2937",
    background: "#f9fafb",
  });

  const result = getTContrastResult(config.foreground, config.background);

  const resetTool = () => {
    setConfig({
      foreground: "#1f2937",
      background: "#f9fafb",
    });
  };

  const applyPreset = (preset: (typeof commonPresets)[0]) => {
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
        <div
          className={`text-center p-2 rounded text-xs font-medium ${getGradeColor(result.wcagAA.normal)}`}
        >
          AA Normal
          {result.wcagAA.normal ? " ✓" : " ✗"}
        </div>
        <div
          className={`text-center p-2 rounded text-xs font-medium ${getGradeColor(result.wcagAAA.normal)}`}
        >
          AAA Normal
          {result.wcagAAA.normal ? " ✓" : " ✗"}
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Color Contrast Checker"
      description="Verify color combinations meet WCAG accessibility standards for optimal readability"
      generatedCSS={generateCSS()}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<Shield size={24} />}
      breadcrumbs={<Breadcrumb />}
      controlsGridCols={2}
    >
      <FullWidthGroup>
        <ControlGroup label="Quick Actions" orientation="horizontal">
          <Button
            variant="secondary"
            size="sm"
            onClick={swapColors}
            className="flex items-center gap-2 w-full"
          >
            <RotateCcw size={16} />
            Swap Colors
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={copyContrastInfo}
            className="flex items-center gap-2 w-full"
          >
            <Copy size={16} />
            Copy Results
          </Button>
        </ControlGroup>
      </FullWidthGroup>

      <FullWidthGroup>
        <ControlGroup label="Color Inputs" orientation="vertical">
          <ColorInput
            label="Foreground"
            value={config.foreground}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfig((prev) => ({ ...prev, foreground: e.target.value }))
            }
          />
          <ColorInput
            label="Background"
            value={config.background}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfig((prev) => ({ ...prev, background: e.target.value }))
            }
          />
        </ControlGroup>
      </FullWidthGroup>

      <FullWidthGroup>
        <ControlGroup label="WCAG Compliance Results">
          <div className="flex flex-col gap-2">
            <div className="p-4 bg-[color:var(--fe-bg)] border border-border rounded-lg">
              <h5 className="font-medium mb-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                WCAG AA (Minimum)
              </h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Normal Text (≥4.5:1)</span>
                  <div className="flex items-center gap-1">
                    {getComplianceIcon(result.wcagAA.normal)}
                    <span
                      className={
                        result.wcagAA.normal ? "text-green-600" : "text-red-600"
                      }
                    >
                      {result.wcagAA.normal ? "PASS" : "FAIL"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Large Text (≥3:1)</span>
                  <div className="flex items-center gap-1">
                    {getComplianceIcon(result.wcagAA.large)}
                    <span
                      className={
                        result.wcagAA.large ? "text-green-600" : "text-red-600"
                      }
                    >
                      {result.wcagAA.large ? "PASS" : "FAIL"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[color:var(--fe-bg)] border border-border rounded-lg">
              <h5 className="font-medium mb-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                WCAG AAA (Enhanced)
              </h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Normal Text (≥7:1)</span>
                  <div className="flex items-center gap-1">
                    {getComplianceIcon(result.wcagAAA.normal)}
                    <span
                      className={
                        result.wcagAAA.normal
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {result.wcagAAA.normal ? "PASS" : "FAIL"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Large Text (≥4.5:1)</span>
                  <div className="flex items-center gap-1">
                    {getComplianceIcon(result.wcagAAA.large)}
                    <span
                      className={
                        result.wcagAAA.large ? "text-green-600" : "text-red-600"
                      }
                    >
                      {result.wcagAAA.large ? "PASS" : "FAIL"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ControlGroup>
      </FullWidthGroup>
      <FullWidthGroup>
        <ControlGroup label="Common Combinations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {commonPresets.map((preset) => {
              const presetResult = getTContrastResult(
                preset.foreground,
                preset.background
              );
              return (
                <Button
                  key={preset.name}
                  variant="secondary"
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
                      <div className="text-xs text-muted">
                        {presetResult.ratio.toFixed(1)}:1
                      </div>
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
        </ControlGroup>
      </FullWidthGroup>

      <FullWidthGroup>
        <ProTip content="Use high contrast colors to improve readability and accessibility." />
      </FullWidthGroup>
    </ToolLayout>
  );
}
