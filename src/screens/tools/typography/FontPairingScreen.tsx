import { useState } from "react";
import {
  Button,
  Input,
  Select,
  ToolLayout,
  ControlGroup,
  FullWidthGroup,
  CodePanel,
  PreviewPanel,
  Textarea,
} from "@frontforge/ui";
import { Type, Copy, RotateCcw } from "lucide-react";
import { copyToClipboard } from "../../../lib/css/format";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { ProTip } from "../../../components/ProTip";

interface FontPair {
  name: string;
  heading: string;
  body: string;
  display: string;
}

interface FontPairingConfig {
  headingFont: string;
  bodyFont: string;
  headingSize: number;
  bodySize: number;
  headingWeight: string;
  bodyWeight: string;
  lineHeight: number;
  letterSpacing: number;
  headingText: string;
  bodyText: string;
  currentPair: FontPair;
}

const popularFonts = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Source Sans Pro",
  "Oswald",
  "Raleway",
  "Nunito",
  "Poppins",
  "Playfair Display",
  "Merriweather",
  "PT Serif",
  "Crimson Text",
  "Libre Baskerville",
  "Cormorant Garamond",
  "Dancing Script",
  "Pacifico",
  "Righteous",
  "Fredoka One",
];

const fontPairings = [
  {
    name: "Modern Professional",
    heading: "Inter",
    body: "Source Sans Pro",
    display: "Clean and readable for corporate sites",
  },
  {
    name: "Editorial Classic",
    heading: "Playfair Display",
    body: "Source Sans Pro",
    display: "Perfect for magazines and blogs",
  },
  {
    name: "Tech Startup",
    heading: "Montserrat",
    body: "Open Sans",
    display: "Modern and approachable",
  },
  {
    name: "Elegant Serif",
    heading: "Crimson Text",
    body: "Lato",
    display: "Sophisticated with great readability",
  },
  {
    name: "Bold Impact",
    heading: "Oswald",
    body: "Nunito",
    display: "Strong headlines with friendly body",
  },
  {
    name: "Minimal Clean",
    heading: "Roboto",
    body: "Roboto",
    display: "Consistent Google font family",
  },
  {
    name: "Creative Display",
    heading: "Righteous",
    body: "Open Sans",
    display: "Eye-catching for creative projects",
  },
  {
    name: "Classic Readable",
    heading: "Merriweather",
    body: "Merriweather",
    display: "Excellent for long-form reading",
  },
];

const fontWeights = [
  { value: "300", label: "Light" },
  { value: "400", label: "Regular" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semi Bold" },
  { value: "700", label: "Bold" },
  { value: "800", label: "Extra Bold" },
  { value: "900", label: "Black" },
];

export function FontPairingScreen() {
  const [config, setConfig] = useState<FontPairingConfig>({
    headingFont: "Inter",
    bodyFont: "Source Sans Pro",
    headingSize: 32,
    bodySize: 16,
    headingWeight: "600",
    bodyWeight: "400",
    lineHeight: 1.5,
    letterSpacing: 0,
    headingText: "Your Amazing Headline Goes Here",
    bodyText:
      "This is sample body text that demonstrates how your chosen fonts work together. Good typography enhances readability and creates visual hierarchy. It should feel natural and support your content without drawing unnecessary attention to itself.",
    currentPair: fontPairings[0],
  });

  const applyFontPair = (pair: (typeof fontPairings)[0]) => {
    setConfig((prev) => ({
      ...prev,
      headingFont: pair.heading,
      bodyFont: pair.body,
      currentPair: {
        name: pair.name,
        heading: pair.heading,
        body: pair.body,
        display: pair.display,
      },
    }));
  };

  const resetTool = () => {
    setConfig({
      headingFont: "Inter",
      bodyFont: "Source Sans Pro",
      headingSize: 32,
      bodySize: 16,
      headingWeight: "600",
      bodyWeight: "400",
      lineHeight: 1.5,
      letterSpacing: 0,
      headingText: "Your Amazing Headline Goes Here",
      bodyText:
        "This is sample body text that demonstrates how your chosen fonts work together. Good typography enhances readability and creates visual hierarchy. It should feel natural and support your content without drawing unnecessary attention to itself.",
      currentPair: {
        name: fontPairings[0].name,
        heading: fontPairings[0].heading,
        body: fontPairings[0].body,
        display: fontPairings[0].display,
      },
    });
  };

  const generateCSS = () => {
    return `/* Font Pairing CSS */
@import url('https://fonts.googleapis.com/css2?family=${config.headingFont.replace(" ", "+")}:wght@${config.headingWeight}&family=${config.bodyFont.replace(" ", "+")}:wght@${config.bodyWeight}&display=swap');

/* Heading Font */
.heading {
  font-family: '${config.headingFont}', sans-serif;
  font-size: ${config.headingSize}px;
  font-weight: ${config.headingWeight};
  line-height: ${config.lineHeight};
  letter-spacing: ${config.letterSpacing}px;
}

/* Body Font */
.body {
  font-family: '${config.bodyFont}', sans-serif;
  font-size: ${config.bodySize}px;
  font-weight: ${config.bodyWeight};
  line-height: ${config.lineHeight};
  letter-spacing: ${config.letterSpacing}px;
}`;
  };

  const copyGoogleFontsImport = async () => {
    const importUrl = `@import url('https://fonts.googleapis.com/css2?family=${config.headingFont.replace(" ", "+")}:wght@${config.headingWeight}&family=${config.bodyFont.replace(" ", "+")}:wght@${config.bodyWeight}&display=swap');`;
    await copyToClipboard(importUrl);
  };

  return (
    <ToolLayout
      title="Font Pairing Previewer"
      description="Test Google Fonts side by side to find perfect font combinations for your designs"
      icon={<Type size={24} />}
      breadcrumbs={
        <Breadcrumb
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Typography", href: "/tools/typography" },
            { label: "Font Pairing", href: "/tools/typography/font-pairing" },
          ]}
        />
      }
    >
      {/* Controls */}
      <div className="space-y-6">
        <ProTip content="Great typography starts with font pairing. Use contrasting fonts for headers and body text to create visual hierarchy. Serif + Sans-serif combinations work well, or stick to different weights within the same font family for a cohesive look." />

        {/* Quick Actions */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            onClick={copyGoogleFontsImport}
            className="flex items-center gap-2"
          >
            <Copy size={16} />
            Copy Import
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

        {/* Font Pairing Presets */}
        <FullWidthGroup title="Popular Font Pairings">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {fontPairings.map((pair) => (
              <Button
                key={pair.name}
                variant={
                  config.currentPair.name === pair.name
                    ? "default"
                    : "secondary"
                }
                size="sm"
                onClick={() => applyFontPair(pair)}
                className="text-xs flex flex-col h-auto p-2"
              >
                <span className="font-medium">{pair.name}</span>
                <span className="text-xs opacity-70">
                  {pair.heading} + {pair.body}
                </span>
              </Button>
            ))}
          </div>
        </FullWidthGroup>

        {/* Font Selection */}
        <ControlGroup title="Font Selection">
          <div>
            <label className="block text-sm font-medium mb-2">
              Heading Font
            </label>
            <Select
              value={config.headingFont}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setConfig((prev) => ({
                  ...prev,
                  headingFont: e.target.value,
                }))
              }
            >
              {popularFonts.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Body Font</label>
            <Select
              value={config.bodyFont}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setConfig((prev) => ({ ...prev, bodyFont: e.target.value }))
              }
            >
              {popularFonts.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </Select>
          </div>
        </ControlGroup>

        {/* Typography Controls */}
        <ControlGroup title="Typography Controls">
          <div>
            <label className="block text-sm font-medium mb-2">
              Heading Size (px)
            </label>
            <Input
              type="number"
              value={config.headingSize}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfig((prev) => ({
                  ...prev,
                  headingSize: parseInt(e.target.value) || 32,
                }))
              }
              min={12}
              max={72}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Body Size (px)
            </label>
            <Input
              type="number"
              value={config.bodySize}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfig((prev) => ({
                  ...prev,
                  bodySize: parseInt(e.target.value) || 16,
                }))
              }
              min={10}
              max={24}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Heading Weight
            </label>
            <Select
              value={config.headingWeight}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setConfig((prev) => ({
                  ...prev,
                  headingWeight: e.target.value,
                }))
              }
            >
              {fontWeights.map((weight) => (
                <option key={weight.value} value={weight.value}>
                  {weight.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Body Weight
            </label>
            <Select
              value={config.bodyWeight}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setConfig((prev) => ({ ...prev, bodyWeight: e.target.value }))
              }
            >
              {fontWeights.map((weight) => (
                <option key={weight.value} value={weight.value}>
                  {weight.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Line Height
            </label>
            <Input
              type="number"
              value={config.lineHeight}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfig((prev) => ({
                  ...prev,
                  lineHeight: parseFloat(e.target.value) || 1.5,
                }))
              }
              min={1}
              max={2}
              step={0.1}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Letter Spacing (px)
            </label>
            <Input
              type="number"
              value={config.letterSpacing}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfig((prev) => ({
                  ...prev,
                  letterSpacing: parseFloat(e.target.value) || 0,
                }))
              }
              min={-2}
              max={5}
              step={0.1}
            />
          </div>
        </ControlGroup>

        {/* Sample Text */}
        <ControlGroup title="Sample Text">
          <div>
            <label className="block text-sm font-medium mb-2">
              Heading Text
            </label>
            <Input
              value={config.headingText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfig((prev) => ({
                  ...prev,
                  headingText: e.target.value,
                }))
              }
              placeholder="Enter heading text..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Body Text</label>
            <Textarea
              value={config.bodyText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setConfig((prev) => ({ ...prev, bodyText: e.target.value }))
              }
              rows={3}
              placeholder="Enter body text..."
            />
          </div>
        </ControlGroup>

        {/* Font Information */}
        <FullWidthGroup title="Current Pairing Info">
          <div className="p-4 bg-muted rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Heading:</span>
                <span className="ml-2 font-medium">
                  {config.headingFont} {config.headingWeight}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Body:</span>
                <span className="ml-2 font-medium">
                  {config.bodyFont} {config.bodyWeight}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Size Ratio:</span>
                <span className="ml-2 font-medium">
                  {(config.headingSize / config.bodySize).toFixed(1)}:1
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Line Height:</span>
                <span className="ml-2 font-medium">{config.lineHeight}</span>
              </div>
            </div>
            {config.currentPair.display && (
              <div className="mt-2 text-xs text-muted-foreground">
                <strong>Use case:</strong> {config.currentPair.display}
              </div>
            )}
          </div>
        </FullWidthGroup>
      </div>

      {/* Preview and Code Panels */}
      <div className="space-y-6">
        <PreviewPanel title="Font Preview">
          <link
            href={`https://fonts.googleapis.com/css2?family=${config.headingFont.replace(" ", "+")}:wght@${config.headingWeight}&family=${config.bodyFont.replace(" ", "+")}:wght@${config.bodyWeight}&display=swap`}
            rel="stylesheet"
          />

          <div className="space-y-4">
            <h1
              style={{
                fontFamily: `'${config.headingFont}', sans-serif`,
                fontSize: `${config.headingSize}px`,
                fontWeight: config.headingWeight,
                lineHeight: config.lineHeight,
                letterSpacing: `${config.letterSpacing}px`,
                margin: 0,
                color: "hsl(var(--foreground))",
              }}
            >
              {config.headingText}
            </h1>

            <p
              style={{
                fontFamily: `'${config.bodyFont}', sans-serif`,
                fontSize: `${config.bodySize}px`,
                fontWeight: config.bodyWeight,
                lineHeight: config.lineHeight,
                letterSpacing: `${config.letterSpacing}px`,
                margin: 0,
                color: "hsl(var(--muted-foreground))",
              }}
            >
              {config.bodyText}
            </p>
          </div>
        </PreviewPanel>

        <CodePanel
          title="Generated CSS"
          generatedCSS={generateCSS()}
          language="css"
        />
      </div>
    </ToolLayout>
  );
}
