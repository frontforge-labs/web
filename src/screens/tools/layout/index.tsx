import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutGrid,
  Lightbulb,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageHeader, Button } from "@frontforge/ui";
import { getToolIcon } from "../../../lib/toolIcons.tsx";
import { Breadcrumb } from "../../../components/Breadcrumb";

const layoutTools = [
  {
    name: "Flexbox Playground",
    path: "/tools/layout/flexbox",
    status: "ready" as const,
    description:
      "Interactive flexbox layout builder with visual controls for all flex properties",
    features: [
      "All flex properties",
      "Visual alignment",
      "Responsive preview",
      "Complete CSS output",
    ],
  },
  {
    name: "Grid Generator",
    path: "/tools/layout/grid",
    status: "ready" as const,
    description:
      "Visual CSS Grid layout builder with column and row configuration for responsive designs",
    features: [
      "Visual grid builder",
      "Template areas",
      "Gap controls",
      "Responsive templates",
    ],
  },
  {
    name: "CSS Positioning Playground",
    path: "/tools/layout/positioning",
    status: "ready" as const,
    description:
      "Experiment with CSS positioning properties including static, relative, absolute, fixed, and sticky",
    features: [
      "All position types",
      "Visual offset controls",
      "Z-index management",
      "Real-time preview",
    ],
  },
  {
    name: "Responsive Breakpoint Tester",
    path: "/tools/layout/breakpoints",
    status: "ready" as const,
    description:
      "Test responsive designs across common device breakpoints with live preview",
    features: [
      "Common breakpoints",
      "Custom sizes",
      "Device presets",
      "Media query generator",
    ],
  },
];

const layoutTips = [
  {
    title: "Master Flexbox Fundamentals",
    content:
      "Flexbox excels at one-dimensional layouts (rows or columns). Use justify-content for main axis alignment, align-items for cross axis, and flex-grow/shrink for responsive sizing.",
  },
  {
    title: "CSS Grid for Two-Dimensional Layouts",
    content:
      "Grid is perfect for complex two-dimensional layouts. Use grid-template-areas for semantic layouts, fr units for flexible sizing, and minmax() for responsive column widths.",
  },
  {
    title: "Combine Flexbox and Grid",
    content:
      "Don't choose one over the other - use Grid for page layout and Flexbox for component layout. Grid defines structure, Flexbox handles alignment and distribution within grid items.",
  },
  {
    title: "Understand Position Context",
    content:
      "Absolute positioning is relative to the nearest positioned ancestor (not static). Fixed positioning is relative to viewport. Sticky combines relative and fixed based on scroll position.",
  },
  {
    title: "Mobile-First Responsive Design",
    content:
      "Start with mobile styles as base, then use min-width media queries to add complexity for larger screens. This progressive enhancement approach is more maintainable than desktop-first.",
  },
  {
    title: "Use Logical Properties",
    content:
      "Prefer logical properties like inline-start over left for better internationalization. These properties adapt to writing direction (LTR/RTL) automatically.",
  },
  {
    title: "Z-Index Stacking Context",
    content:
      "Z-index only works on positioned elements. Each positioned element creates a stacking context for its children. Understanding stacking contexts prevents layering issues.",
  },
  {
    title: "Container Queries for Components",
    content:
      "Use container queries (@container) instead of media queries for component-based responsive design. Components can adapt to their container size rather than viewport width.",
  },
];

export function LayoutScreen() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % layoutTips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex(
      (prev) => (prev - 1 + layoutTips.length) % layoutTips.length
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <PageHeader
        title="Layout Tools"
        subtitle="Professional layout generators for flexbox, grid, positioning, and responsive design"
        icon={<LayoutGrid size={24} />}
        breadcrumbs={<Breadcrumb />}
        iconBgClassName="bg-gradient-to-r from-cyan-500 to-blue-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tools Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Available Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {layoutTools.map((tool) => (
                <Link
                  key={tool.name}
                  to={tool.path}
                  className={`group bg-surface-1 border border-border rounded-lg p-4 shadow-sm transition-all duration-200 ${
                    tool.status === "ready"
                      ? "hover:border-accent/20 hover:shadow-md cursor-pointer"
                      : "opacity-60 cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    if (tool.status !== "ready") {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                      {getToolIcon(tool.name)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-base group-hover:text-accent transition-colors">
                          {tool.name}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                            tool.status === "ready"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {tool.status === "ready" ? "Ready" : "Soon"}
                        </span>
                      </div>

                      <p className="text-sm text-muted mb-3 line-clamp-2">
                        {tool.description}
                      </p>

                      <div className="grid grid-cols-1 gap-1">
                        {tool.features.slice(0, 2).map((feature) => (
                          <div
                            key={feature}
                            className="text-xs text-muted flex items-center"
                          >
                            <div className="w-1 h-1 bg-accent rounded-full mr-2 flex-shrink-0" />
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                        {tool.features.length > 2 && (
                          <div className="text-xs text-muted opacity-60">
                            +{tool.features.length - 2} more features
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-semibold mb-6">
              Master CSS Layout for Modern Web Design
            </h2>

            <p className="text-muted leading-relaxed mb-6">
              Layout is the foundation of web design, defining structure, flow,
              and visual hierarchy. Our comprehensive layout tools help you
              master flexbox, CSS Grid, positioning, and responsive design with
              interactive controls and real-time preview.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Flexbox: One-Dimensional Layout Mastery
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Flexbox revolutionizes one-dimensional layouts with powerful
              alignment and distribution controls. Master flex-direction,
              justify-content, align-items, and flex-grow/shrink to create
              responsive navigation, card layouts, and component arrangements
              that adapt to content and screen size.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              CSS Grid: Two-Dimensional Layout Power
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              CSS Grid enables complex two-dimensional layouts previously
              requiring floats or JavaScript. Define rows and columns with
              flexible units, use grid-template-areas for semantic layouts, and
              leverage auto-placement for dynamic content. Grid transforms
              magazine-style layouts from nightmare to simple and maintainable.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              CSS Positioning: Precise Element Control
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Understanding CSS positioning is crucial for overlays, dropdowns,
              tooltips, and fixed navigation. Master the differences between
              static, relative, absolute, fixed, and sticky positioning. Each
              type serves specific use cases and creates different stacking
              contexts affecting z-index behavior.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Responsive Design: Mobile-First Approach
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              Responsive design ensures optimal experiences across all devices.
              Start with mobile styles and progressively enhance for larger
              screens using min-width media queries. Test common breakpoints
              (320px, 768px, 1024px, 1440px) and use relative units for
              flexible, accessible layouts that scale beautifully.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Tips */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb size={20} className="text-warning" />
                <h3 className="font-semibold">Pro Tips</h3>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted">
                {currentTipIndex + 1} of {layoutTips.length}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2">
                {layoutTips[currentTipIndex].title}
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                {layoutTips[currentTipIndex].content}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevTip}
                disabled={layoutTips.length <= 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft size={14} />
                Previous
              </Button>

              <div className="flex gap-1">
                {layoutTips.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTipIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTipIndex ? "bg-accent" : "bg-border"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={nextTip}
                disabled={layoutTips.length <= 1}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>

          {/* Related Resources */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={20} className="text-info" />
              <h3 className="font-semibold">Learn More</h3>
            </div>
            <div className="space-y-3">
              <Link
                to="/articles"
                className="block text-sm text-accent hover:underline font-medium"
              >
                Browse All Articles →
              </Link>
              <Link
                to="/articles/flexbox-guide"
                className="block text-sm text-accent hover:underline"
              >
                Complete Flexbox Guide
              </Link>
              <Link
                to="/articles/css-grid-layout"
                className="block text-sm text-accent hover:underline"
              >
                CSS Grid Layout Mastery
              </Link>
              <Link
                to="/articles/responsive-design"
                className="block text-sm text-accent hover:underline"
              >
                Responsive Design Best Practices
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Layout Tools Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted">Tools Available</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Ready to Use</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Coming Soon</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
