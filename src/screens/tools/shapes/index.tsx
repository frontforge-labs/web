import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shapes,
  Lightbulb,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageHeader, Button } from "@frontforge/ui";
import { getToolIcon } from "../../../lib/toolIcons.tsx";
import { Breadcrumb } from "../../../components/Breadcrumb";

const shapesTools = [
  {
    name: "Border Radius Previewer",
    path: "/tools/shapes/border-radius",
    status: "ready" as const,
    description:
      "Create custom border radius with individual corner control and live preview",
    features: [
      "Individual corner control",
      "Multiple radius formats",
      "Live preview updates",
      "Copy CSS output",
    ],
  },
  {
    name: "Clip-Path Maker",
    path: "/tools/shapes/clip-path",
    status: "ready" as const,
    description:
      "Interactive tool for creating CSS clip-path shapes with polygon, circle, and ellipse support",
    features: [
      "Multiple shape types",
      "Visual point editing",
      "Preset shapes library",
      "Percentage-based coordinates",
    ],
  },
  {
    name: "Blob Shape Generator",
    path: "/tools/shapes/blob-generator",
    status: "ready" as const,
    description:
      "Generate organic blob shapes with randomization for unique design elements",
    features: [
      "Random blob generation",
      "Complexity control",
      "SVG export",
      "Multiple variations",
    ],
  },
  {
    name: "CSS Grid Layout Builder",
    path: "/tools/shapes/grid-builder",
    status: "ready" as const,
    description:
      "Visual grid layout builder with column and row configuration for responsive designs",
    features: [
      "Visual grid builder",
      "Gap and sizing controls",
      "Responsive templates",
      "Complete CSS output",
    ],
  },
];

const shapesTips = [
  {
    title: "Master Border Radius Variations",
    content:
      "Border radius accepts up to 8 values for complex shapes. Use 'border-radius: 10px 20px 30px 40px / 5px 10px 15px 20px' to create unique organic shapes with different horizontal and vertical radii.",
  },
  {
    title: "Clip-Path for Performance",
    content:
      "Clip-path is GPU-accelerated and more performant than CSS masking. Use it for image cropping, custom shapes, and creative layouts without adding extra DOM elements or images.",
  },
  {
    title: "Combine Shapes for Creativity",
    content:
      "Layer multiple elements with different clip-paths to create complex compositions. Use blend modes and opacity to achieve unique visual effects that stand out.",
  },
  {
    title: "Responsive Shape Design",
    content:
      "Use percentage values in clip-path for responsive shapes that scale with their containers. Test shapes across different viewport sizes to ensure they maintain visual appeal.",
  },
  {
    title: "Blob Shapes for Organic Feel",
    content:
      "Organic blob shapes add playfulness and modernity to designs. Use them as section backgrounds, decorative elements, or to break up rigid grid layouts with flowing, natural forms.",
  },
  {
    title: "CSS Grid for Complex Layouts",
    content:
      "CSS Grid excels at two-dimensional layouts. Use grid-template-areas for semantic layout definitions, and combine with flexbox for one-dimensional child alignment.",
  },
  {
    title: "Browser Support Considerations",
    content:
      "While clip-path has excellent modern browser support, always provide fallbacks for older browsers. Use @supports to progressively enhance designs with clipping and masking.",
  },
  {
    title: "Animate Shapes Carefully",
    content:
      "Animating clip-path or border-radius creates engaging effects, but use will-change and transform properties to maintain smooth 60fps performance across devices.",
  },
];

export function ShapesScreen() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % shapesTips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex(
      (prev) => (prev - 1 + shapesTips.length) % shapesTips.length
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <PageHeader
        title="Shapes & Layout"
        subtitle="Professional shape generators, clip-path tools, and layout builders for modern web design"
        icon={<Shapes size={24} />}
        breadcrumbs={<Breadcrumb />}
        iconBgClassName="bg-gradient-to-r from-purple-500 to-pink-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tools Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Available Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shapesTools.map((tool) => (
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
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white">
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
              Master CSS Shapes for Creative Web Design
            </h2>

            <p className="text-muted leading-relaxed mb-6">
              Shapes are fundamental to visual design, creating structure,
              hierarchy, and visual interest. Our comprehensive shape tools help
              you create custom border radius, craft unique clip-path shapes,
              generate organic blobs, and build complex grid layouts with
              precision and creative freedom.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Border Radius: Beyond Simple Rounded Corners
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Border radius offers more than simple rounded corners. Use
              individual corner values to create asymmetric shapes, or leverage
              the slash notation (horizontal / vertical) to create elliptical
              corners. Combine different values to create unique, organic shapes
              that add personality to cards, buttons, and containers.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Clip-Path: Cutting-Edge Shape Creation
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              CSS clip-path enables complex shape creation without images or SVG
              files. Create polygons, circles, ellipses, and custom paths to
              crop images, create unique layouts, and add visual interest.
              Clip-path is GPU-accelerated, performant, and perfect for
              responsive designs with percentage-based coordinates.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Organic Blob Shapes for Modern Design
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Blob shapes break away from rigid geometric forms, adding organic,
              playful elements to modern designs. Use SVG-based blob generators
              to create unique background shapes, decorative elements, and
              section dividers. Randomization ensures every blob is unique,
              perfect for distinctive brand identities.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              CSS Grid: Two-Dimensional Layout Mastery
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              CSS Grid revolutionizes layout design with powerful
              two-dimensional control. Define rows and columns with flexible
              units (fr, px, %, auto), use grid-template-areas for semantic
              layouts, and combine with gap properties for perfect spacing.
              Grid enables complex magazine-style layouts previously requiring
              JavaScript or complex float techniques.
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
                {currentTipIndex + 1} of {shapesTips.length}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2">
                {shapesTips[currentTipIndex].title}
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                {shapesTips[currentTipIndex].content}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevTip}
                disabled={shapesTips.length <= 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft size={14} />
                Previous
              </Button>

              <div className="flex gap-1">
                {shapesTips.map((_, index) => (
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
                disabled={shapesTips.length <= 1}
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
                to="/articles/clip-path-guide"
                className="block text-sm text-accent hover:underline"
              >
                Complete Clip-Path Guide
              </Link>
              <Link
                to="/articles/css-grid-layout"
                className="block text-sm text-accent hover:underline"
              >
                CSS Grid Layout Mastery
              </Link>
              <Link
                to="/articles/border-radius-techniques"
                className="block text-sm text-accent hover:underline"
              >
                Advanced Border Radius Techniques
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Shapes Tools Stats</h3>
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
