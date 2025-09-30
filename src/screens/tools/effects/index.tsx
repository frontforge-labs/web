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
import { getToolIcon } from "../../../lib/toolIcons.tsx";
import { Breadcrumb } from "../../../components/Breadcrumb";

const effectsTools = [
  {
    name: "Box Shadow Generator",
    path: "/tools/effects/box-shadow",
    status: "ready" as const,
    description:
      "Create layered box shadows with live preview and advanced customization options",
    features: [
      "Multiple shadow layers",
      "Inset and outset shadows",
      "Quick presets",
      "Copy CSS code",
    ],
  },
  {
    name: "CSS Filter Playground",
    path: "/tools/effects/filters",
    status: "ready" as const,
    description:
      "Interactive playground for CSS filter effects including blur, brightness, contrast, and more",
    features: [
      "10+ filter functions",
      "Real-time preview",
      "Combine multiple filters",
      "Export ready CSS",
    ],
  },
  {
    name: "Glassmorphism Generator",
    path: "/tools/effects/glassmorphism",
    status: "ready" as const,
    description:
      "Create modern frosted glass effects with backdrop blur and transparency",
    features: [
      "Backdrop blur control",
      "Opacity and saturation",
      "Border styling",
      "Modern UI presets",
    ],
  },
  {
    name: "Noise Texture Generator",
    path: "/tools/effects/noise-texture",
    status: "ready" as const,
    description:
      "Generate CSS noise textures and grain effects for subtle background patterns",
    features: [
      "Customizable grain size",
      "Opacity control",
      "Multiple blend modes",
      "SVG-based patterns",
    ],
  },
];

const effectsTips = [
  {
    title: "Layer Shadows for Depth",
    content:
      "Combine multiple box shadows with varying blur and opacity to create realistic depth and elevation. Use 2-3 layers: one for close shadow, one for ambient shadow, and a subtle highlight.",
  },
  {
    title: "Use Filters Sparingly",
    content:
      "CSS filters can impact performance, especially on mobile devices. Apply filters to specific elements rather than entire containers, and consider using will-change for animated filters.",
  },
  {
    title: "Master Glassmorphism Balance",
    content:
      "Effective glassmorphism requires the right balance of blur, opacity, and background contrast. Use backdrop-filter: blur(10-20px) with background opacity of 0.7-0.9 for best results.",
  },
  {
    title: "Optimize Filter Performance",
    content:
      "Filters like blur() and drop-shadow() are GPU-accelerated in modern browsers. However, avoid applying multiple complex filters simultaneously on many elements to maintain smooth performance.",
  },
  {
    title: "Create Subtle Noise Textures",
    content:
      "Noise and grain effects work best when subtle. Use low opacity (5-15%) and small grain size to add texture without overwhelming your design. Perfect for reducing color banding in gradients.",
  },
  {
    title: "Consider Dark Mode",
    content:
      "Shadows and effects look different in dark mode. Test your designs in both light and dark themes, adjusting shadow opacity and blur radius to maintain proper contrast and depth.",
  },
  {
    title: "Combine Effects Strategically",
    content:
      "Mix box shadows with subtle filters for rich visual effects. Pair drop-shadow with blur for glow effects, or combine grayscale with contrast for dramatic image treatments.",
  },
  {
    title: "Use Inset Shadows for Depth",
    content:
      "Inset box shadows create the illusion of recessed elements and depth. Perfect for input fields, buttons in pressed state, and creating inner glow effects on cards and containers.",
  },
];

export function EffectsScreen() {
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
        subtitle="Professional CSS effects, shadows, and visual filters for modern web design"
        icon={<Sparkles size={24} />}
        breadcrumbs={<Breadcrumb />}
        iconBgClassName="bg-gradient-to-r from-orange-500 to-red-600"
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
              Master CSS Effects for Professional Web Design
            </h2>

            <p className="text-muted leading-relaxed mb-6">
              Visual effects are the secret sauce of modern web design, adding
              depth, polish, and personality to your interfaces. Our
              comprehensive CSS effects tools help you create stunning shadows,
              apply powerful filters, generate glassmorphism effects, and add
              subtle textures with precision and creative control.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Box Shadows: Creating Realistic Depth
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Box shadows are fundamental to modern UI design, creating the
              illusion of elevation and layering. Master multi-layer shadows
              with different blur radiuses and spreads to achieve Material
              Design-style depth. Combine outset shadows for elevation and inset
              shadows for pressed states and input fields.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              CSS Filter Effects: Beyond Basic Styling
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              CSS filters provide powerful image manipulation directly in the
              browser. Apply blur, brightness, contrast, saturation, hue-rotate,
              and more without image editing software. Stack multiple filters for
              dramatic effects, create duotone images, or add subtle enhancements
              to photos and backgrounds.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Glassmorphism: Modern Frosted Glass UI
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Glassmorphism creates sophisticated frosted glass effects using
              backdrop-filter and transparency. This modern design trend works
              beautifully for cards, modals, and navigation elements floating
              over colorful backgrounds. Balance blur intensity with opacity for
              optimal readability and visual appeal.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Noise Textures: Subtle Visual Interest
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              Noise and grain textures add organic, analog warmth to digital
              designs. Use subtle noise to reduce color banding in gradients,
              add texture to flat backgrounds, or create vintage photo effects.
              SVG-based noise patterns offer infinite scalability and minimal
              file size overhead.
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
                to="/articles/box-shadow-guide"
                className="block text-sm text-accent hover:underline"
              >
                Complete Box Shadow Guide
              </Link>
              <Link
                to="/articles/css-filters"
                className="block text-sm text-accent hover:underline"
              >
                CSS Filter Effects Reference
              </Link>
              <Link
                to="/articles/glassmorphism-design"
                className="block text-sm text-accent hover:underline"
              >
                Glassmorphism Design Principles
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
