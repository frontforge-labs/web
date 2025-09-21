import type { ReactNode } from "react";

interface ColorPreviewProps {
  title: string;
  colors: Array<{
    name: string;
    value: string;
    description?: string;
  }>;
  children?: ReactNode;
}

export function ColorPreview({ title, colors, children }: ColorPreviewProps) {
  return (
    <div className="my-8 p-6 bg-surface-1 border border-border rounded-lg">
      <h4 className="font-semibold mb-4 text-lg">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {colors.map((color, index) => (
          <div key={index} className="space-y-2">
            <div
              className="h-20 w-full rounded-lg border border-border shadow-sm"
              style={{ backgroundColor: color.value }}
            />
            <div className="text-sm">
              <div className="font-medium">{color.name}</div>
              <div className="font-mono text-xs text-muted">{color.value}</div>
              {color.description && (
                <div className="text-muted text-xs mt-1">
                  {color.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {children && <div className="text-sm text-muted">{children}</div>}
    </div>
  );
}

interface CodeExampleProps {
  title: string;
  code: string;
  language?: string;
  preview?: ReactNode;
}

export function CodeExample({
  title,
  code,
  language = "css",
  preview,
}: CodeExampleProps) {
  return (
    <div className="my-6 space-y-4">
      <h4 className="font-semibold text-lg">{title}</h4>

      {preview && (
        <div className="p-4 bg-surface-1 border border-border rounded-lg">
          <div className="text-sm font-medium mb-2 text-muted">Preview:</div>
          {preview}
        </div>
      )}

      <div className="relative">
        <div className="absolute top-2 right-2 text-xs text-muted bg-surface-1 px-2 py-1 rounded">
          {language}
        </div>
        <pre className="bg-surface-2 border border-border rounded-lg p-4 overflow-x-auto">
          <code className="text-sm font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
}

interface InfoBoxProps {
  type: "tip" | "warning" | "info";
  title: string;
  children: ReactNode;
}

export function InfoBox({ type, title, children }: InfoBoxProps) {
  const colors = {
    tip: "border-green-200 bg-green-50",
    warning: "border-orange-200 bg-orange-50",
    info: "border-blue-200 bg-blue-50",
  };

  const iconColors = {
    tip: "text-green-600",
    warning: "text-orange-600",
    info: "text-blue-600",
  };

  return (
    <div className={`my-6 p-4 border rounded-lg ${colors[type]}`}>
      <div className={`font-semibold mb-2 ${iconColors[type]}`}>{title}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
