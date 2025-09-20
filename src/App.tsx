import { Button } from "@frontenzo/ui";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--fe-bg)] text-[var(--fe-text)] p-8">
      <div className="space-x-3">
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  );
}
