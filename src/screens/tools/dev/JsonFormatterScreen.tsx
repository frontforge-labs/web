import { useState } from "react";
import { Button } from "@frontenzo/ui";
import { FileJson, Copy, RotateCcw, Check, X, Download, Upload } from "lucide-react";
import { ToolContainer } from "../../../components/ToolContainer";
import { copyToClipboard } from "../../../lib/css/format";

interface JsonFormatterConfig {
  input: string;
  output: string;
  isValid: boolean;
  error: string | null;
  indentSize: number;
  sortKeys: boolean;
  minified: boolean;
}

const sampleJson = {
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipcode": "10001",
    "coordinates": {
      "lat": 40.7128,
      "lng": -74.0060
    }
  },
  "hobbies": ["reading", "swimming", "coding"],
  "isActive": true,
  "joinDate": "2023-01-15T10:30:00Z",
  "metadata": null
};

export function JsonFormatterScreen() {
  const [config, setConfig] = useState<JsonFormatterConfig>({
    input: JSON.stringify(sampleJson, null, 2),
    output: "",
    isValid: true,
    error: null,
    indentSize: 2,
    sortKeys: false,
    minified: false
  });

  const validateAndFormat = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      let formatted: string;

      if (config.minified) {
        formatted = JSON.stringify(parsed);
      } else {
        const replacer = config.sortKeys ?
          (_key: string, value: unknown) => {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
              return Object.keys(value).sort().reduce((sorted: Record<string, unknown>, k) => {
                sorted[k] = (value as Record<string, unknown>)[k];
                return sorted;
              }, {});
            }
            return value;
          } : undefined;

        formatted = JSON.stringify(parsed, replacer, config.indentSize);
      }

      setConfig(prev => ({
        ...prev,
        output: formatted,
        isValid: true,
        error: null
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Invalid JSON';
      setConfig(prev => ({
        ...prev,
        output: '',
        isValid: false,
        error: errorMessage
      }));
    }
  };

  const handleInputChange = (value: string) => {
    setConfig(prev => ({ ...prev, input: value }));
    validateAndFormat(value);
  };

  const handleFormatChange = (key: keyof Pick<JsonFormatterConfig, 'indentSize' | 'sortKeys' | 'minified'>, value: number | boolean) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);

    if (newConfig.input.trim()) {
      validateAndFormat(newConfig.input);
    }
  };

  const loadSample = () => {
    const sampleString = JSON.stringify(sampleJson, null, 2);
    setConfig(prev => ({ ...prev, input: sampleString }));
    validateAndFormat(sampleString);
  };

  const clearInput = () => {
    setConfig(prev => ({
      ...prev,
      input: '',
      output: '',
      isValid: true,
      error: null
    }));
  };

  const copyOutput = async () => {
    if (config.output) {
      await copyToClipboard(config.output);
    }
  };

  const copyInput = async () => {
    if (config.input) {
      await copyToClipboard(config.input);
    }
  };

  const downloadJson = () => {
    if (config.output) {
      const blob = new Blob([config.output], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'formatted.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const uploadJson = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          handleInputChange(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const resetTool = () => {
    setConfig({
      input: JSON.stringify(sampleJson, null, 2),
      output: "",
      isValid: true,
      error: null,
      indentSize: 2,
      sortKeys: false,
      minified: false
    });
    validateAndFormat(JSON.stringify(sampleJson, null, 2));
  };

  const generateOutput = () => {
    if (config.isValid && config.output) {
      return `/* Formatted JSON */\n${config.output}`;
    } else if (config.error) {
      return `/* JSON Validation Error */\n${config.error}`;
    }
    return '/* Enter JSON to format */';
  };

  const previewElement = (
    <div className="w-full h-64 rounded-lg border border-border shadow-sm overflow-hidden">
      <div className="h-full flex">
        {/* Input Side */}
        <div className="flex-1 border-r border-border">
          <div className="bg-surface-1 px-3 py-2 text-xs font-medium border-b border-border flex items-center justify-between">
            <span>Input JSON</span>
            <div className="flex items-center gap-1">
              {config.isValid ? (
                <Check size={14} className="text-green-600" />
              ) : (
                <X size={14} className="text-red-600" />
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={copyInput}
                className="h-6 px-1"
              >
                <Copy size={12} />
              </Button>
            </div>
          </div>
          <textarea
            value={config.input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full h-full p-3 text-xs font-mono resize-none border-0 focus:outline-none"
            placeholder="Paste your JSON here..."
            style={{ height: 'calc(100% - 40px)' }}
          />
        </div>

        {/* Output Side */}
        <div className="flex-1">
          <div className="bg-surface-1 px-3 py-2 text-xs font-medium border-b border-border flex items-center justify-between">
            <span>Formatted Output</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyOutput}
              className="h-6 px-1"
              disabled={!config.output}
            >
              <Copy size={12} />
            </Button>
          </div>
          <div className="h-full p-3 overflow-auto bg-gray-50" style={{ height: 'calc(100% - 40px)' }}>
            {config.error ? (
              <div className="text-red-600 text-xs font-mono">{config.error}</div>
            ) : (
              <pre className="text-xs font-mono whitespace-pre-wrap">
                {config.output || 'Enter valid JSON to see formatted output...'}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ToolContainer
      title="JSON Formatter & Validator"
      description="Format, validate, and minify JSON with syntax highlighting and error detection"
      generatedCSS={generateOutput()}
      onReset={resetTool}
      previewElement={previewElement}
      icon={<FileJson size={24} />}
    >
      {/* Quick Actions */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={loadSample}
          className="flex items-center gap-2"
        >
          <FileJson size={16} />
          Load Sample
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={uploadJson}
          className="flex items-center gap-2"
        >
          <Upload size={16} />
          Upload File
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={downloadJson}
          className="flex items-center gap-2"
          disabled={!config.output}
        >
          <Download size={16} />
          Download
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyOutput}
          className="flex items-center gap-2"
          disabled={!config.output}
        >
          <Copy size={16} />
          Copy Output
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={clearInput}
          className="flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Clear
        </Button>
      </div>

      {/* Formatting Options */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Formatting Options</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="minified"
              checked={config.minified}
              onChange={(e) => handleFormatChange('minified', e.target.checked)}
              className="rounded"
            />
            <label htmlFor="minified" className="text-sm">
              Minify (remove whitespace)
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sortKeys"
              checked={config.sortKeys}
              onChange={(e) => handleFormatChange('sortKeys', e.target.checked)}
              className="rounded"
              disabled={config.minified}
            />
            <label htmlFor="sortKeys" className="text-sm">
              Sort object keys
            </label>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="indentSize" className="text-sm whitespace-nowrap">
              Indent size:
            </label>
            <select
              id="indentSize"
              value={config.indentSize}
              onChange={(e) => handleFormatChange('indentSize', parseInt(e.target.value))}
              className="px-2 py-1 text-sm border border-border rounded"
              disabled={config.minified}
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </div>
        </div>
      </div>

      {/* Validation Status */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3">Validation Status</h4>
        <div className="p-3 rounded-lg border border-border bg-surface-1">
          <div className="flex items-center gap-2">
            {config.isValid ? (
              <>
                <Check size={16} className="text-green-600" />
                <span className="text-sm text-green-700 font-medium">Valid JSON</span>
              </>
            ) : (
              <>
                <X size={16} className="text-red-600" />
                <span className="text-sm text-red-700 font-medium">Invalid JSON</span>
              </>
            )}
          </div>
          {config.error && (
            <div className="mt-2 text-sm text-red-600 font-mono bg-red-50 p-2 rounded">
              {config.error}
            </div>
          )}
          {config.isValid && config.output && (
            <div className="mt-2 text-xs text-muted">
              Character count: {config.output.length} |
              Size: {new Blob([config.output]).size} bytes
              {config.input && (
                <span> | Compression: {Math.round((1 - config.output.length / config.input.length) * 100)}%</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* JSON Structure Info */}
      {config.isValid && config.input && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3">JSON Structure</h4>
          <div className="p-3 rounded-lg border border-border bg-surface-1">
            {(() => {
              try {
                const parsed = JSON.parse(config.input);
                const getType = (obj: unknown): string => {
                  if (obj === null) return 'null';
                  if (Array.isArray(obj)) return 'array';
                  return typeof obj;
                };

                const countProperties = (obj: unknown): number => {
                  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
                    return Object.keys(obj).length;
                  }
                  if (Array.isArray(obj)) {
                    return obj.length;
                  }
                  return 0;
                };

                return (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted">Type:</span>
                      <span className="ml-2 font-medium">{getType(parsed)}</span>
                    </div>
                    <div>
                      <span className="text-muted">Properties:</span>
                      <span className="ml-2 font-medium">{countProperties(parsed)}</span>
                    </div>
                    <div>
                      <span className="text-muted">Depth:</span>
                      <span className="ml-2 font-medium">
                        {JSON.stringify(parsed).split('{').length - 1 || JSON.stringify(parsed).split('[').length - 1}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted">Valid:</span>
                      <span className="ml-2 font-medium text-green-600">✓</span>
                    </div>
                  </div>
                );
              } catch {
                return null;
              }
            })()}
          </div>
        </div>
      )}
    </ToolContainer>
  );
}