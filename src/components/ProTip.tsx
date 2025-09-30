import { Lightbulb } from "lucide-react";

export function ProTip({ content }: { content?: React.ReactNode }) {
  return (
    <div className="p-4 bg-bg border border-border rounded-lg">
      <div className="flex items-start gap-2 mb-1">
        <Lightbulb size={16} className="text-warning" />
        <div className="text-sm font-medium">Pro Tip</div>
      </div>
      <div className="text-xs text-muted leading-relaxed">{content}</div>
    </div>
  );
}
