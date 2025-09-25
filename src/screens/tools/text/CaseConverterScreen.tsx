import { useState, useEffect } from "react";
import { Button } from "@frontforge/ui";
import { FileText, Copy, RotateCcw, Type } from "lucide-react";
import { ToolContainer } from "../../../components/ToolContainer";
import { copyToClipboard } from "../../../lib/css/format";

interface CaseConverterConfig {
  input: string;
  preserveLineBreaks: boolean;
  outputs: {
    camelCase: string;
    pascalCase: string;
    snakeCase: string;
    kebabCase: string;
    constantCase: string;
    dotCase: string;
    pathCase: string;
    sentenceCase: string;
    titleCase: string;
    lowerCase: string;
    upperCase: string;
    toggleCase: string;
  };
}

const sampleTexts = [
  "hello world example",
  "This is a Sample Text",
  "convert_this_text",
  "convert-this-text",
  "convertThisText",
  "CONVERT_THIS_CONSTANT",
  "Mixed Case Example Text",
];

export function CaseConverterScreen() {
  const [config, setConfig] = useState<CaseConverterConfig>({
    input: "hello world example",
    preserveLineBreaks: true,
    outputs: {
      camelCase: "",
      pascalCase: "",
      snakeCase: "",
      kebabCase: "",
      constantCase: "",
      dotCase: "",
      pathCase: "",
      sentenceCase: "",
      titleCase: "",
      lowerCase: "",
      upperCase: "",
      toggleCase: "",
    },
  });

  const toCamelCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "")
      .replace(/[^a-zA-Z0-9]/g, "");
  };

  const toPascalCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
      .replace(/\s+/g, "")
      .replace(/[^a-zA-Z0-9]/g, "");
  };

  const toSnakeCase = (str: string): string => {
    return str
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join("_")
      .replace(/_{2,}/g, "_")
      .replace(/^_|_$/g, "");
  };

  const toKebabCase = (str: string): string => {
    return str
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join("-")
      .replace(/-{2,}/g, "-")
      .replace(/^-|-$/g, "");
  };

  const toConstantCase = (str: string): string => {
    return toSnakeCase(str).toUpperCase();
  };

  const toDotCase = (str: string): string => {
    return toSnakeCase(str).replace(/_/g, ".");
  };

  const toPathCase = (str: string): string => {
    return toSnakeCase(str).replace(/_/g, "/");
  };

  const toSentenceCase = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const toTitleCase = (str: string): string => {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  const toToggleCase = (str: string): string => {
    return str
      .split("")
      .map((char) =>
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      )
      .join("");
  };

  const convertText = (text: string) => {
    const lines = config.preserveLineBreaks ? text.split("\n") : [text];

    const converted = {
      camelCase: lines.map(toCamelCase).join("\n"),
      pascalCase: lines.map(toPascalCase).join("\n"),
      snakeCase: lines.map(toSnakeCase).join("\n"),
      kebabCase: lines.map(toKebabCase).join("\n"),
      constantCase: lines.map(toConstantCase).join("\n"),
      dotCase: lines.map(toDotCase).join("\n"),
      pathCase: lines.map(toPathCase).join("\n"),
      sentenceCase: lines.map(toSentenceCase).join("\n"),
      titleCase: lines.map(toTitleCase).join("\n"),
      lowerCase: lines.map((line) => line.toLowerCase()).join("\n"),
      upperCase: lines.map((line) => line.toUpperCase()).join("\n"),
      toggleCase: lines.map(toToggleCase).join("\n"),
    };

    setConfig((prev) => ({ ...prev, outputs: converted }));
  };

  const handleInputChange = (value: string) => {
    setConfig((prev) => ({ ...prev, input: value }));
    convertText(value);
  };

  const loadSample = (sample: string) => {
    handleInputChange(sample);
  };

  const resetTool = () => {
    const defaultInput = "hello world example";
    setConfig((prev) => ({
      ...prev,
      input: defaultInput,
      preserveLineBreaks: true,
    }));
    convertText(defaultInput);
  };

  const copyOutput = async (caseType: keyof CaseConverterConfig["outputs"]) => {
    await copyToClipboard(config.outputs[caseType]);
  };

  const generateOutput = () => {
    if (!config.input.trim()) {
      return "/* Enter text to convert between different cases */";
    }

    return `/* Case Conversion Results */
Original: ${config.input}

camelCase: ${config.outputs.camelCase}
PascalCase: ${config.outputs.pascalCase}
snake_case: ${config.outputs.snakeCase}
kebab-case: ${config.outputs.kebabCase}
CONSTANT_CASE: ${config.outputs.constantCase}
dot.case: ${config.outputs.dotCase}
path/case: ${config.outputs.pathCase}
Sentence case: ${config.outputs.sentenceCase}
Title Case: ${config.outputs.titleCase}
lowercase: ${config.outputs.lowerCase}
UPPERCASE: ${config.outputs.upperCase}
tOGGLE cASE: ${config.outputs.toggleCase}`;
  };

  const caseFormats = [
    {
      key: "camelCase" as const,
      name: "camelCase",
      description: "JavaScript variables, object properties",
    },
    {
      key: "pascalCase" as const,
      name: "PascalCase",
      description: "Class names, constructors",
    },
    {
      key: "snakeCase" as const,
      name: "snake_case",
      description: "Python variables, database fields",
    },
    {
      key: "kebabCase" as const,
      name: "kebab-case",
      description: "CSS classes, HTML attributes",
    },
    {
      key: "constantCase" as const,
      name: "CONSTANT_CASE",
      description: "Constants, environment variables",
    },
    {
      key: "dotCase" as const,
      name: "dot.case",
      description: "Configuration keys, namespaces",
    },
    {
      key: "pathCase" as const,
      name: "path/case",
      description: "File paths, routes",
    },
    {
      key: "sentenceCase" as const,
      name: "Sentence case",
      description: "Regular sentences, descriptions",
    },
    {
      key: "titleCase" as const,
      name: "Title Case",
      description: "Headings, titles",
    },
    {
      key: "lowerCase" as const,
      name: "lowercase",
      description: "General text, simple processing",
    },
    {
      key: "upperCase" as const,
      name: "UPPERCASE",
      description: "Emphasis, constants",
    },
    {
      key: "toggleCase" as const,
      name: "tOGGLE cASE",
      description: "Stylistic effects, testing",
    },
  ];

  const previewElement = (
    <div className="w-full h-64 rounded-lg border border-border shadow-sm overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Input Section */}
        <div className="border-b border-border p-4">
          <label className="block text-xs font-medium mb-2">Input Text</label>
          <textarea
            value={config.input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full h-16 text-sm border border-border rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="Enter text to convert..."
          />
        </div>

        {/* Quick Preview */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div>
              <strong>camelCase:</strong>{" "}
              <span className="font-mono">{config.outputs.camelCase}</span>
            </div>
            <div>
              <strong>snake_case:</strong>{" "}
              <span className="font-mono">{config.outputs.snakeCase}</span>
            </div>
            <div>
              <strong>kebab-case:</strong>{" "}
              <span className="font-mono">{config.outputs.kebabCase}</span>
            </div>
            <div>
              <strong>CONSTANT_CASE:</strong>{" "}
              <span className="font-mono">{config.outputs.constantCase}</span>
            </div>
            <div>
              <strong>Title Case:</strong>{" "}
              <span className="font-mono">{config.outputs.titleCase}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Initialize conversion on mount and when preserve line breaks changes
  useEffect(() => {
    if (config.input) {
      convertText(config.input);
    }
  }, [config.preserveLineBreaks]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ToolContainer
      title="Case Converter"
      description="Convert text between different cases including camelCase, snake_case, kebab-case, and more"
      generatedCSS={generateOutput()}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<FileText size={24} />}
    >
      {/* Quick Actions */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard(config.input)}
          className="flex items-center gap-2"
          disabled={!config.input}
        >
          <Copy size={16} />
          Copy Input
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetTool}
          className="flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Reset
        </Button>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="preserveLineBreaks"
            checked={config.preserveLineBreaks}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                preserveLineBreaks: e.target.checked,
              }))
            }
            className="rounded"
          />
          <label htmlFor="preserveLineBreaks" className="text-sm">
            Preserve line breaks
          </label>
        </div>
      </div>

      {/* Sample Texts */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Sample Texts</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {sampleTexts.map((sample, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => loadSample(sample)}
              className="text-xs truncate"
              title={sample}
            >
              {sample}
            </Button>
          ))}
        </div>
      </div>

      {/* Case Format Outputs */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Converted Formats</h4>
        <div className="grid grid-cols-1 gap-3">
          {caseFormats.map((format) => (
            <div
              key={format.key}
              className="p-3 bg-surface-1 border border-border rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Type size={14} className="text-accent" />
                  <span className="text-sm font-medium">{format.name}</span>
                  <span className="text-xs text-muted">
                    ({format.description})
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyOutput(format.key)}
                  className="h-6 px-2"
                  disabled={!config.outputs[format.key]}
                >
                  <Copy size={12} />
                </Button>
              </div>
              <div className="bg-gray-50 rounded p-2 font-mono text-sm">
                {config.outputs[format.key] || (
                  <span className="text-muted italic">
                    Enter text to see conversion...
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Case Format Guidelines</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-surface-1 border border-border rounded-lg">
            <h5 className="text-sm font-medium mb-2">Programming Contexts</h5>
            <ul className="text-xs space-y-1 text-muted">
              <li>
                <strong>camelCase:</strong> JavaScript, Java variables
              </li>
              <li>
                <strong>PascalCase:</strong> Class names, components
              </li>
              <li>
                <strong>snake_case:</strong> Python, database fields
              </li>
              <li>
                <strong>CONSTANT_CASE:</strong> Environment variables
              </li>
            </ul>
          </div>
          <div className="p-3 bg-surface-1 border border-border rounded-lg">
            <h5 className="text-sm font-medium mb-2">Web Development</h5>
            <ul className="text-xs space-y-1 text-muted">
              <li>
                <strong>kebab-case:</strong> CSS classes, HTML attributes
              </li>
              <li>
                <strong>dot.case:</strong> Configuration keys
              </li>
              <li>
                <strong>path/case:</strong> URLs, file paths
              </li>
              <li>
                <strong>Title Case:</strong> Headings, labels
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
