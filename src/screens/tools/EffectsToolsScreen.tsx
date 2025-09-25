import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Lightbulb,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageHeader, Button } from "@frontforge/ui";
import { getToolIcon } from "../../lib/toolIcons.tsx";
import { Breadcrumb } from "../../components/Breadcrumb";

const effectsTools = [
  {
    name: "Box Shadow Generator",
    path: "/tools/effects/box-shadow",
    status: "ready" as const,
    description:
      "Create multi-layer box shadows with precise control over inset, outset, and positioning",
    features: [
      "Multiple shadow layers",
      "Inset & outset shadows",
      "Live preview updates",
      "CSS code output",
    ],
  },
  {
    name: "CSS Filter Playground",
    path: "/tools/effects/filters",
    status: "ready" as const,
    description:
      "Interactive playground for CSS filters including blur, brightness, contrast, and more",
    features: [
      "All CSS filter functions",
      "Real-time preview",
      "Combine multiple filters",
      "Export CSS code",
    ],
  },
  {
    name: "Glassmorphism Generator",
    path: "/tools/effects/glassmorphism",
    status: "ready" as const,
    description:
      "Generate frosted glass UI effects with backdrop-filter and transparency",
    features: [
      "Backdrop blur control",
      "Transparency options",
      "Border styles",
      "Modern glass effects",
    ],
  },
  {
    name: "Noise Texture Generator",
    path: "/tools/effects/noise-texture",
    status: "ready" as const,
    description:
      "Create subtle CSS-based noise and texture overlays for backgrounds",
    features: [
      "Noise pattern generation",
      "Opacity control",
      "Pattern scaling",
      "CSS background output",
    ],
  },
];

const effectsTips = [
  {
    title: "Layer Your Box Shadows",
    content:
      "Use multiple shadow layers for depth. Start with a subtle close shadow, add a larger blurred shadow for depth, and finish with an optional inset shadow for dimension.",
  },
  {
    title: "Keep Filter Performance in Mind",
    content:
      "CSS filters can impact performance, especially blur and drop-shadow. Use them sparingly on elements that don't change frequently, and test on lower-end devices.",
  },
  {
    title: "Glassmorphism Best Practices",
    content:
      "Effective glassmorphism requires proper backdrop content. Use backdrop-filter: blur() with semi-transparent backgrounds and ensure sufficient contrast for readability.",
  },
  {
    title: "Subtle Effects Work Best",
    content:
      "Visual effects should enhance, not dominate your design. Start with subtle values and gradually increase intensity until you achieve the desired impact without overwhelming content.",
  },
  {
    title: "Consider Dark Mode",
    content:
      "Effects like glows and shadows behave differently in dark themes. Test your effects in both light and dark modes, adjusting colors and intensities accordingly.",
  },
  {
    title: "Use CSS Custom Properties",
    content:
      "Define shadow and filter values as CSS custom properties for easy theming and dynamic adjustments. This enables consistent effects across your design system.",
  },
  {
    title: "Optimize for Accessibility",
    content:
      "Respect user preferences for reduced motion. Some effects can trigger vestibular disorders, so provide alternatives when prefers-reduced-motion is enabled.",
  },
  {
    title: "Progressive Enhancement",
    content:
      "Not all browsers support modern CSS effects equally. Use @supports queries to provide fallbacks and ensure your design works without advanced effects.",
  },
];

export function EffectsToolsScreen() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % effectsTips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex(
      (prev) => (prev - 1 + effectsTips.length) % effectsTips.length
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <PageHeader
        title="Effects & Filters"
        subtitle="Professional visual effects, shadows, filters, and modern UI effects for contemporary web design"
        icon={<Sparkles size={24} />}
        breadcrumbs={<Breadcrumb />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tools Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Available Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {effectsTools.map((tool) => (
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
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white">
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
              Modern CSS Effects and Visual Enhancement
            </h2>

            <p className="text-muted leading-relaxed mb-6">
              Visual effects are the finishing touches that elevate web designs
              from functional to exceptional. Our effects toolkit provides
              professional-grade shadow generators, CSS filters, and modern
              glassmorphism effects that enhance user interfaces while
              maintaining optimal performance and accessibility standards.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Box Shadows and Depth Psychology
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Shadows create visual hierarchy through simulated depth, guiding
              user attention and establishing element relationships.
              Multi-layered shadows combine close, sharp shadows for definition
              with distant, soft shadows for elevation, creating realistic
              lighting effects that improve interface comprehension.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              CSS Filters for Dynamic Enhancement
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              CSS filter functions enable real-time image and element
              manipulation directly in the browser. Combine blur, brightness,
              contrast, and hue adjustments for hover states, focus indicators,
              and interactive feedback without requiring additional images or
              JavaScript processing.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Glassmorphism and Modern Transparency
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Glassmorphism creates sophisticated frosted glass effects using
              backdrop-filter and careful transparency. This design trend works
              particularly well for overlay elements, modal dialogs, and
              navigation components, providing visual separation while
              maintaining content context.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Performance and Browser Compatibility
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              Modern CSS effects leverage GPU acceleration for smooth
              performance, but require careful implementation. Use transform3d()
              to trigger hardware acceleration, implement progressive
              enhancement for older browsers, and consider user preferences for
              reduced motion to ensure inclusive experiences.
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
                {currentTipIndex + 1} of {effectsTips.length}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2">
                {effectsTips[currentTipIndex].title}
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                {effectsTips[currentTipIndex].content}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevTip}
                disabled={effectsTips.length <= 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft size={14} />
                Previous
              </Button>

              <div className="flex gap-1">
                {effectsTips.map((_, index) => (
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
                disabled={effectsTips.length <= 1}
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
                to="/articles/css-effects-guide"
                className="block text-sm text-accent hover:underline"
              >
                CSS Effects Complete Guide
              </Link>
              <Link
                to="/articles/glassmorphism-design"
                className="block text-sm text-accent hover:underline"
              >
                Glassmorphism Design Principles
              </Link>
              <Link
                to="/articles/shadow-design-systems"
                className="block text-sm text-accent hover:underline"
              >
                Shadow Design Systems
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Effects Tools Stats</h3>
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
