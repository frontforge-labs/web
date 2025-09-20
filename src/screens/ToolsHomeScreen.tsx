import { ToolCategoryCard } from '../components/ToolCategoryCard';
import { toolCategories } from '../lib/constants.tsx';

export function ToolsHomeScreen() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CSS Tools & Dev Utilities</h1>
        <p className="text-[var(--fe-text)]/70 text-lg">
          Professional-grade CSS tools and developer utilities for modern web development
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[var(--fe-border)]/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-500">1</div>
          <div className="text-sm text-[var(--fe-text)]/60">Ready</div>
        </div>
        <div className="bg-[var(--fe-border)]/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-500">6</div>
          <div className="text-sm text-[var(--fe-text)]/60">Coming Soon</div>
        </div>
        <div className="bg-[var(--fe-border)]/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-500">8</div>
          <div className="text-sm text-[var(--fe-text)]/60">Planned</div>
        </div>
        <div className="bg-[var(--fe-border)]/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-500">8</div>
          <div className="text-sm text-[var(--fe-text)]/60">Categories</div>
        </div>
      </div>

      {/* Tool Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {toolCategories.map((category) => (
          <ToolCategoryCard
            key={category.id}
            id={category.id}
            title={category.title}
            description={category.description}
            icon={category.icon}
            color={category.color}
            tools={category.tools}
          />
        ))}
      </div>
    </div>
  );
}