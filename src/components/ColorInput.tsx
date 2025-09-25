import { Input } from "@frontforge/ui";
import React, { type JSX } from "react";

export function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={onChange}
          className="w-12 h-10 rounded border border-border cursor-pointer"
        />
        <Input
          type="text"
          value={value}
          onChange={onChange}
          className="flex-1 font-mono"
          placeholder="#FFFFFF"
        />
      </div>
    </div>
  );
}
