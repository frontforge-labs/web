import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Palette,
  Lightbulb,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageHeader, Button } from "@frontforge/ui";
import { getToolIcon } from "../../lib/toolIcons.tsx";
import { Breadcrumb } from "../../components/Breadcrumb";

const colorTools = [
  {
    name: "CSS Gradient",
    path: "/tools/color/gradient",
    status: "ready" as const,
    description:
      "Create beautiful linear and radial gradients with live preview",
    features: [
      "Multiple color stops",
      "Angle control",
      "Quick presets",
      "Copy CSS code",
    ],
  },
  {
    name: "Color Studio",
    path: "/tools/color/studio",
    status: "ready" as const,
    description:
      "Advanced color picker, converter, and harmony generator with modern CSS support",
    features: [
      "Multiple format support",
      "Color harmony generator",
      "Interactive controls",
      "OKLCH color space",
    ],
  },
  {
    name: "Contrast Checker",
    path: "/tools/color/contrast",
    status: "ready" as const,
    description:
      "Verify color combinations meet WCAG accessibility standards for optimal readability",
    features: [
      "WCAG AA/AAA compliance",
      "Live contrast ratios",
      "Common presets",
      "Accessibility guidance",
    ],
  },
  {
    name: "Palette Builder",
    path: "/tools/color/palette",
    status: "ready" as const,
    description:
      "Build cohesive color palettes using color theory and harmony rules",
    features: [
      "Color harmony generator",
      "Preset palettes",
      "CSS/JSON export",
      "Custom naming",
    ],
  },
];

const colorTips = [
  {
    title: "Use the 60-30-10 Color Rule",
    content:
      "Apply 60% dominant color, 30% secondary color, and 10% accent color for balanced, professional designs that guide user attention effectively.",
  },
  {
    title: "Master Color Psychology",
    content:
      "Blue builds trust and reliability, green suggests growth and nature, red creates urgency and excitement. Choose colors that align with your brand message and user emotions.",
  },
  {
    title: "Ensure Color Accessibility",
    content:
      "Maintain WCAG contrast ratios: 4.5:1 for normal text, 3:1 for large text. Test with color blindness simulators to ensure inclusive design for all users.",
  },
  {
    title: "Leverage HSL for Better Control",
    content:
      "HSL (Hue, Saturation, Lightness) offers intuitive color manipulation. Adjust lightness for variations while keeping hue consistent for cohesive color schemes.",
  },
  {
    title: "Create Semantic Color Systems",
    content:
      "Define CSS custom properties for colors: --primary, --success, --warning, --error. This creates maintainable, scalable color systems across your application.",
  },
  {
    title: "Use Gradients Strategically",
    content:
      "Subtle gradients add depth without overwhelming content. Use 2-3 color stops maximum and keep angle between 45-135 degrees for natural, pleasing effects.",
  },
  {
    title: "Test in Different Lighting",
    content:
      "Colors appear differently across devices and lighting conditions. Test your color choices on various screens and in different environments for consistency.",
  },
  {
    title: "Build Harmonious Palettes",
    content:
      "Use color theory principles: complementary colors for contrast, analogous colors for harmony, triadic colors for vibrant yet balanced combinations.",
  },
];

export function ColorToolsScreen() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % colorTips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex(
      (prev) => (prev - 1 + colorTips.length) % colorTips.length
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <PageHeader
        title="Color Tools"
        subtitle="Professional CSS color generators, pickers, and palette builders for modern web design"
        icon={<Palette size={24} />}
        breadcrumbs={<Breadcrumb />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tools Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Available Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {colorTools.map((tool) => (
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
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
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
              Master CSS Colors for Professional Web Design
            </h2>

            <p className="text-muted leading-relaxed mb-6">
              Color is the cornerstone of effective web design, influencing user
              emotions, behavior, and brand perception. Our comprehensive CSS
              color tools help you create stunning gradients, pick perfect
              colors, build harmonious palettes, and convert between formats
              with precision and ease.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Advanced CSS Color Formats & Functions
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Modern CSS supports powerful color formats including HEX
              (#FF5733), RGB (rgb(255, 87, 51)), HSL (hsl(9, 100%, 60%)), and
              cutting-edge formats like LCH and P3 for wider color gamuts. Each
              format serves specific purposes: HSL for intuitive color
              manipulation, RGB for device compatibility, and LCH for
              perceptually uniform adjustments.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              CSS Gradients: Creating Visual Depth
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Linear and radial gradients transform flat designs into engaging
              visual experiences. Master advanced gradient techniques including
              multiple color stops, custom easing functions, conic gradients,
              and repeating patterns. Our gradient generator provides real-time
              preview with professional presets for instant inspiration.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Color Accessibility & WCAG Compliance
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Accessible color design ensures inclusive user experiences. Follow
              WCAG 2.1 guidelines with contrast ratios of 4.5:1 for normal text
              and 3:1 for large text. Consider color blindness affecting 8% of
              men and 0.5% of women by testing with deuteranopia, protanopia,
              and tritanopia simulators.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Color Theory in Digital Design
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              Build compelling color schemes using proven color theory
              principles. Complementary colors create high contrast and visual
              impact, analogous colors provide harmony and unity, while triadic
              schemes offer vibrant yet balanced combinations. Our palette
              builder automates these relationships while allowing manual
              fine-tuning.
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
                {currentTipIndex + 1} of {colorTips.length}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2">
                {colorTips[currentTipIndex].title}
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                {colorTips[currentTipIndex].content}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevTip}
                disabled={colorTips.length <= 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft size={14} />
                Previous
              </Button>

              <div className="flex gap-1">
                {colorTips.map((_, index) => (
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
                disabled={colorTips.length <= 1}
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
                to="/articles/css-color-module"
                className="block text-sm text-accent hover:underline"
              >
                CSS Color Module Level 4 Specification
              </Link>
              <Link
                to="/articles/accessibility-guidelines"
                className="block text-sm text-accent hover:underline"
              >
                Web Content Accessibility Guidelines
              </Link>
              <Link
                to="/articles/color-theory"
                className="block text-sm text-accent hover:underline"
              >
                Color Theory for Web Designers
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Color Tools Stats</h3>
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
