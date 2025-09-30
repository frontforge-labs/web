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
import { getToolIcon } from "../../lib/toolIcons.tsx";
import { Breadcrumb } from "../../components/Breadcrumb";

const layoutTools = [
  {
    name: "Flexbox Playground",
    path: "/tools/layout/flexbox",
    status: "ready" as const,
    description:
      "Interactive Flexbox playground with visual controls for container and item properties",
    features: [
      "Visual flex container setup",
      "Drag & drop flex items",
      "Real-time CSS generation",
      "Common layout patterns",
    ],
  },
  {
    name: "Grid Generator",
    path: "/tools/layout/grid",
    status: "ready" as const,
    description:
      "Visual CSS Grid generator with template areas and responsive design controls",
    features: [
      "Visual grid builder",
      "Named grid areas",
      "Responsive breakpoints",
      "Gap & sizing controls",
    ],
  },
  {
    name: "CSS Positioning Playground",
    path: "/tools/layout/positioning",
    status: "ready" as const,
    description:
      "Master CSS positioning with interactive examples and visual feedback",
    features: [
      "Position value demos",
      "Z-index management",
      "Stacking context guide",
      "Visual positioning aid",
    ],
  },
  {
    name: "Responsive Breakpoint Tester",
    path: "/tools/layout/breakpoints",
    status: "ready" as const,
    description:
      "Test responsive designs across device sizes with custom breakpoint definitions",
    features: [
      "Device size testing",
      "Custom breakpoints",
      "Media query generator",
      "Viewport simulation",
    ],
  },
];

const layoutTips = [
  {
    title: "Flexbox vs Grid Decision Matrix",
    content:
      "Use Flexbox for one-dimensional layouts (rows or columns) and component-level alignment. Use CSS Grid for two-dimensional layouts and page-level structure. Grid excels at complex layouts with overlapping elements.",
  },
  {
    title: "Flex-Grow, Flex-Shrink, and Flex-Basis",
    content:
      "Master the flex shorthand property: flex-grow defines how much space an item should take, flex-shrink controls how much it can shrink, and flex-basis sets the initial size before free space is distributed.",
  },
  {
    title: "Grid Template Areas for Readability",
    content:
      "Use grid-template-areas to create semantic, readable grid layouts. Named grid areas make your CSS self-documenting and easier to maintain, especially for complex responsive designs.",
  },
  {
    title: "Positioning Context and Stacking",
    content:
      "Positioned elements create new stacking contexts. Use z-index judiciously and understand that position: relative on a parent creates the positioning context for absolutely positioned children.",
  },
  {
    title: "Mobile-First Responsive Design",
    content:
      "Start with mobile layouts and progressively enhance for larger screens using min-width media queries. This approach ensures better performance and accessibility on mobile devices.",
  },
  {
    title: "Intrinsic vs Extrinsic Sizing",
    content:
      "Prefer intrinsic sizing (min-content, max-content, fit-content) over fixed dimensions. This creates more flexible layouts that adapt to content changes and different languages.",
  },
  {
    title: "Container Queries for Component Layout",
    content:
      "Use container queries (@container) for component-based responsive design. This allows components to adapt based on their container size rather than viewport size.",
  },
  {
    title: "Layout Performance Optimization",
    content:
      "Minimize layout recalculation by avoiding changes to properties that trigger reflow. Use transform and opacity for animations, and will-change to hint at upcoming changes.",
  },
];

export function LayoutToolsScreen() {
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
        subtitle="Flexbox playground, grid generator, and layout helpers for modern responsive design"
        icon={<LayoutGrid size={24} />}
        breadcrumbs={<Breadcrumb />}
        iconBgClassName="bg-gradient-to-r from-orange-500 to-yellow-400"
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
              Modern CSS Layout Systems and Responsive Design
            </h2>

            <p className="text-muted leading-relaxed mb-6">
              CSS layout has evolved dramatically with Flexbox and Grid
              providing powerful tools for creating responsive, maintainable
              designs. Our layout toolkit enables you to master these modern
              layout systems through interactive exploration and visual
              feedback, building confidence with positioning, alignment, and
              responsive design patterns.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Flexbox for Component Layout
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Flexbox excels at one-dimensional layouts and component-level
              alignment. Master flex-direction, justify-content, align-items,
              and the flex shorthand to create flexible components that adapt to
              content changes. Flexbox is particularly powerful for navigation
              bars, card layouts, and form controls.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              CSS Grid for Page Structure
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              CSS Grid enables sophisticated two-dimensional layouts with
              precise control over rows and columns. Grid template areas provide
              semantic layout definitions, while grid line names create
              maintainable code. Grid excels at page-level structure, complex
              overlapping layouts, and responsive design patterns.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Strategic Positioning and Z-Index Management
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              CSS positioning creates layered interfaces with careful attention
              to stacking contexts. Understand how relative, absolute, and fixed
              positioning interact, and manage z-index systematically to avoid
              common pitfalls. Proper positioning enables tooltips, modals, and
              complex interactive elements.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Responsive Design with Container Queries
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              Container queries revolutionize responsive design by enabling
              component-based breakpoints. Design components that adapt to their
              container size rather than viewport dimensions, creating truly
              modular responsive designs that work in any context.
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
                to="/articles/flexbox-mastery"
                className="block text-sm text-accent hover:underline"
              >
                Complete Flexbox Guide
              </Link>
              <Link
                to="/articles/css-grid-layouts"
                className="block text-sm text-accent hover:underline"
              >
                CSS Grid Layout Patterns
              </Link>
              <Link
                to="/articles/responsive-design-system"
                className="block text-sm text-accent hover:underline"
              >
                Responsive Design Systems
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
