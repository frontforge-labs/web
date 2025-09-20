import { useState } from 'react';
import { Button } from '@frontenzo/ui';
import { Copy, RotateCcw, Download, ExternalLink } from 'lucide-react';
import { copyToClipboard } from '../lib/css/format';
import { PageHeader } from './PageHeader';

interface ToolContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  generatedCSS: string;
  onReset?: () => void;
  showPreview?: boolean;
  previewElement?: React.ReactNode;
  icon?: React.ReactNode;
}

export function ToolContainer({
  title,
  description,
  children,
  generatedCSS,
  onReset,
  showPreview = true,
  previewElement,
  icon
}: ToolContainerProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleCopyCSS = async () => {
    try {
      await copyToClipboard(generatedCSS);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <PageHeader
        title={title}
        subtitle={description}
        icon={icon}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <div className="xl:col-span-1">
          <div className="bg-[var(--fe-border)]/10 rounded-lg border border-[var(--fe-border)] p-6">
            <h3 className="text-lg font-semibold mb-4">Controls</h3>
            {children}

            {/* Action Buttons */}
            <div className="mt-6 space-y-2">
              <Button
                onClick={handleCopyCSS}
                variant="default"
                className="w-full"
                disabled={!generatedCSS.trim()}
              >
                <Copy size={16} className="mr-2" />
                {copyStatus === 'copied' ? 'Copied!' : copyStatus === 'error' ? 'Error' : 'Copy CSS'}
              </Button>

              {onReset && (
                <Button
                  onClick={onReset}
                  variant="outline"
                  className="w-full"
                >
                  <RotateCcw size={16} className="mr-2" />
                  Reset
                </Button>
              )}

              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Download size={14} className="mr-1" />
                  Export
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <ExternalLink size={14} className="mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview & Output */}
        <div className="xl:col-span-2 space-y-6">
          {/* Preview */}
          {showPreview && (
            <div className="bg-[var(--fe-border)]/10 rounded-lg border border-[var(--fe-border)] p-6">
              <h3 className="text-lg font-semibold mb-4">Preview</h3>
              <div className="bg-white rounded-lg p-8 min-h-[200px] flex items-center justify-center">
                {previewElement || (
                  <div className="w-48 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-medium">
                    Preview Element
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Generated CSS */}
          <div className="bg-[var(--fe-border)]/10 rounded-lg border border-[var(--fe-border)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Generated CSS</h3>
              <Button
                onClick={handleCopyCSS}
                size="sm"
                variant="ghost"
                disabled={!generatedCSS.trim()}
              >
                <Copy size={14} className="mr-1" />
                Copy
              </Button>
            </div>
            <div className="relative group">
              <pre
                className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto font-mono border border-gray-700 cursor-pointer transition-all hover:border-gray-600"
                onClick={handleCopyCSS}
              >
                <code className="text-gray-100">
                  {generatedCSS ? (
                    <span dangerouslySetInnerHTML={{
                      __html: generatedCSS
                        .replace(/([{}])/g, '<span class="text-yellow-400">$1</span>')
                        .replace(/(\/\*.*?\*\/)/g, '<span class="text-gray-400">$1</span>')
                        .replace(/([a-zA-Z-]+)(?=\s*:)/g, '<span class="text-blue-300">$1</span>')
                        .replace(/:\s*([^;]+)/g, ': <span class="text-green-300">$1</span>')
                        .replace(/(\.[\w-]+)/g, '<span class="text-purple-300">$1</span>')
                    }} />
                  ) : (
                    <span className="text-gray-400">/* Configure the tool to generate CSS */</span>
                  )}
                </code>
              </pre>

              {/* Hover indicator */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-gray-200 px-2 py-1 rounded text-xs flex items-center gap-1 pointer-events-none">
                <Copy size={12} />
                <span>
                  {copyStatus === 'copied' ? 'Copied!' : copyStatus === 'error' ? 'Error' : 'Click to copy'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}