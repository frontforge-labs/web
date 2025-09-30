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
import { getToolIcon } from "../../lib/toolIcons.tsx";
import { Breadcrumb } from "../../components/Breadcrumb";

const shapesTools = [
  {
    name: "Border Radius Previewer",
    path: "/tools/shapes/border-radius",
    status: "ready" as const,
    description:
      "Create complex border radius combinations with individual corner control and live preview",
    features: [
      "Individual corner control",
      "Elliptical radius support",
      "Live preview updates",
      "CSS output generation",
    ],
  },
  {
    name: "Clip-Path Maker",
    path: "/tools/shapes/clip-path",
    status: "ready" as const,
    description:
      "Generate CSS clip-path shapes including polygons, circles, ellipses, and custom paths",
    features: [
      "Polygon shape builder",
      "Circle & ellipse tools",
      "Custom path editor",
      "Visual point manipulation",
    ],
  },
  {
    name: "Blob Shape Generator",
    path: "/tools/shapes/blob-generator",
    status: "ready" as const,
    description:
      "Create organic, randomized fluid shapes perfect for modern design backgrounds",
    features: [
      "Randomized blob generation",
      "Smoothness control",
      "SVG & CSS output",
      "Animation-ready paths",
    ],
  },
  {
    name: "CSS Grid Layout Builder",
    path: "/tools/shapes/grid-builder",
    status: "ready" as const,
    description:
      "Visual grid layout builder with drag-and-drop functionality and template generation",
    features: [
      "Visual grid builder",
      "Template areas",
      "Gap & sizing controls",
      "Responsive breakpoints",
    ],
  },
];

const shapesTips = [
  {
    title: "Border Radius Design Principles",
    content:
      "Use consistent border radius values throughout your design system. Consider the relationship between element size and radius - larger elements can handle larger radii, while small elements need subtle curves.",
  },
  {
    title: "Clip-Path Performance",
    content:
      "Complex clip-path shapes can impact performance, especially on mobile devices. Use simple shapes when possible and test on various devices to ensure smooth animations and interactions.",
  },
  {
    title: "Organic Shapes in UI",
    content:
      "Blob shapes work best as background elements or decorative accents. Avoid using highly organic shapes for interactive elements as they can impact usability and touch target sizing.",
  },
  {
    title: "Grid Layout Best Practices",
    content:
      "Start with simple grid layouts and add complexity gradually. Use named grid lines and template areas for better code maintainability and easier responsive adjustments.",
  },
  {
    title: "Accessibility and Shapes",
    content:
      "Ensure sufficient contrast between shaped elements and their backgrounds. Complex shapes can interfere with text readability, so test with actual content and various screen readers.",
  },
  {
    title: "Responsive Shape Design",
    content:
      "Shapes should adapt gracefully across screen sizes. Consider how border radius, clip-paths, and blob shapes will scale and potentially simplify complex shapes on smaller screens.",
  },
  {
    title: "Browser Compatibility",
    content:
      "Always provide fallbacks for advanced CSS shapes. Use @supports queries to detect clip-path support and provide alternative designs for older browsers.",
  },
  {
    title: "Performance Optimization",
    content:
      "For animated shapes, use transform properties instead of changing clip-path or border-radius values directly. This ensures smooth animations by leveraging GPU acceleration.",
  },
];

export function ShapesToolsScreen() {
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
        subtitle="Professional shape generators, border radius tools, and advanced layout builders for modern web design"
        icon={<Shapes size={24} />}
        breadcrumbs={<Breadcrumb />}
        iconBgClassName="bg-gradient-to-r from-pink-500 to-red-500"
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
              Advanced CSS Shapes and Layout Systems
            </h2>

            <p className="text-muted leading-relaxed mb-6">
              Modern web design embraces organic shapes, sophisticated layouts,
              and custom geometric forms that break away from traditional
              rectangular constraints. Our shape and layout tools enable
              designers to create unique visual experiences while maintaining
              performance and accessibility standards.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Border Radius and Rounded Design
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Border radius transforms rectangular elements into sophisticated
              shapes that feel more natural and approachable. Master individual
              corner control, elliptical curves, and radius relationships to
              create cohesive design systems that enhance user experience
              through subtle visual cues.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              CSS Clip-Path for Custom Shapes
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Clip-path enables precise shape control beyond simple rectangles
              and circles. Create polygonal layouts, diagonal sections, and
              complex geometric designs that guide user attention and create
              dynamic visual hierarchies without requiring additional images or
              SVG files.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Organic Shapes and Blob Generation
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Organic, blob-like shapes add personality and movement to designs
              while maintaining a professional appearance. These naturally
              randomized forms work particularly well for background elements,
              hero sections, and brand identity elements that need to stand out
              from traditional geometric layouts.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Advanced Grid Layout Systems
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              CSS Grid provides unprecedented control over complex layouts with
              minimal code. Master grid template areas, implicit grids, and
              responsive design patterns to create layouts that adapt gracefully
              across devices while maintaining visual coherence and content
              hierarchy.
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
                to="/articles/advanced-css-shapes"
                className="block text-sm text-accent hover:underline"
              >
                Advanced CSS Shapes Guide
              </Link>
              <Link
                to="/articles/grid-layout-mastery"
                className="block text-sm text-accent hover:underline"
              >
                CSS Grid Layout Mastery
              </Link>
              <Link
                to="/articles/border-radius-design"
                className="block text-sm text-accent hover:underline"
              >
                Border Radius Design Systems
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
