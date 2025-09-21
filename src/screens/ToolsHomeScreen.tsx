import { ToolCategoryCard } from "../components/ToolCategoryCard";
import { StatsCard } from "@frontenzo/ui";
import { toolCategories } from "../lib/constants.tsx";

export function ToolsHomeScreen() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CSS Tools & Dev Utilities</h1>
        <p className="text-muted text-lg">
          Professional-grade CSS tools and developer utilities for modern web
          development
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatsCard title="Ready" value="4" valueClassName="text-success" />
        <StatsCard
          title="Coming Soon"
          value="3"
          valueClassName="text-warning"
        />
        <StatsCard title="Planned" value="8" valueClassName="text-info" />
        <StatsCard title="Categories" value="8" valueClassName="text-accent" />
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
