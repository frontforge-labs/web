import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Type,
  Lightbulb,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageHeader, Button } from "@frontforge/ui";
import { getToolIcon } from "../../../lib/toolIcons.tsx";
import { Breadcrumb } from "../../../components/Breadcrumb";

const typographyTools = [
  {
    name: "Font Pairing Previewer",
    path: "/tools/typography/font-pairing",
    status: "ready" as const,
    description:
      "Test Google Fonts side by side to find perfect font combinations for your designs",
    features: [
      "500+ Google Fonts",
      "Real-time pairing preview",
      "Font weight variations",
      "Export CSS imports",
    ],
  },
  {
    name: "Text Shadow Generator",
    path: "/tools/typography/text-shadow",
    status: "ready" as const,
    description:
      "Create custom text shadows with live preview and CSS code generation",
    features: [
      "Multiple shadow layers",
      "Color and blur controls",
      "Interactive positioning",
      "Copy CSS output",
    ],
  },
  {
    name: "Gradient Text Generator",
    path: "/tools/typography/gradient-text",
    status: "ready" as const,
    description:
      "Apply beautiful linear and radial gradient fills to text elements",
    features: [
      "Linear & radial gradients",
      "Multiple color stops",
      "Angle adjustments",
      "Browser compatibility",
    ],
  },
  {
    name: "Variable Font Playground",
    path: "/tools/typography/variable-fonts",
    status: "ready" as const,
    description:
      "Interactive sliders for weight, width, and custom axes in variable fonts",
    features: [
      "Real-time axis control",
      "Popular variable fonts",
      "CSS font-variation",
      "Animation examples",
    ],
  },
];

const typographyTips = [
  {
    title: "Limit Your Font Pairs",
    content:
      "Use no more than 2-3 typefaces in a design. Pair a serif with a sans-serif for classic contrast, or combine fonts with different weights from the same family for subtle harmony.",
  },
  {
    title: "Establish Type Hierarchy",
    content:
      "Create clear visual hierarchy using font size, weight, and spacing. Headlines should be 2-4 times larger than body text, with consistent spacing between elements.",
  },
  {
    title: "Mind Your Line Height",
    content:
      "Set line-height to 1.4-1.6 times the font size for optimal readability. Tighter leading works for headlines, while body text needs more breathing room.",
  },
  {
    title: "Consider Reading Distance",
    content:
      "Body text should be 16px minimum for web. Increase font size for mobile devices and consider your audience - older users benefit from larger, higher-contrast text.",
  },
  {
    title: "Use Variable Fonts Wisely",
    content:
      "Variable fonts reduce file size and offer design flexibility, but use restraint. Subtle weight adjustments work better than dramatic axis changes in UI text.",
  },
  {
    title: "Test Across Devices",
    content:
      "Fonts render differently across operating systems and browsers. Test your typography on various devices to ensure consistent appearance and readability.",
  },
  {
    title: "Embrace White Space",
    content:
      "Generous margins and padding improve readability. Use letter-spacing sparingly - it can enhance headlines but hurts body text legibility when overdone.",
  },
  {
    title: "Choose Fonts for Purpose",
    content:
      "Select typefaces that match your content's tone. Corporate sites need reliable, professional fonts while creative projects can embrace more personality.",
  },
];

export function TypographyToolsScreen() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % typographyTips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex(
      (prev) => (prev - 1 + typographyTips.length) % typographyTips.length
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <PageHeader
        title="Typography Tools"
        subtitle="Professional text styling, font pairing, and typography effects for modern web design"
        icon={<Type size={24} />}
        breadcrumbs={<Breadcrumb />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tools Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Available Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {typographyTools.map((tool) => (
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
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-white">
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
              Master Typography for Professional Web Design
            </h2>

            <p className="text-muted leading-relaxed mb-6">
              Typography is the voice of your design - it communicates tone,
              hierarchy, and brand personality while ensuring optimal
              readability. Our comprehensive typography tools help you create
              stunning text effects, discover perfect font pairings, and
              implement modern variable font features with precision and
              creativity.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Modern Font Technologies
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Variable fonts revolutionize web typography by providing infinite
              design variations within a single font file. Adjust weight, width,
              slant, and custom axes in real-time, creating responsive
              typography that adapts to different screen sizes and contexts
              while maintaining optimal performance.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Typography Hierarchy & Rhythm
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Establish clear visual hierarchy through consistent use of font
              sizes, weights, and spacing. A well-defined typographic scale
              creates rhythm and guides readers through your content naturally.
              Use modular scales based on mathematical ratios for harmonious
              proportions across all text elements.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Performance & Accessibility
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Optimize font loading with modern techniques like font-display:
              swap and preloading critical fonts. Ensure accessibility with
              sufficient color contrast, appropriate font sizes, and readable
              font choices. Consider users with dyslexia and other reading
              challenges when selecting typefaces.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Creative Text Effects
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              Enhance your designs with subtle text shadows, gradient fills, and
              custom effects. These tools help you create eye-catching headlines
              and decorative text while maintaining readability and performance.
              Learn when to use effects sparingly for maximum impact.
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
                {currentTipIndex + 1} of {typographyTips.length}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2">
                {typographyTips[currentTipIndex].title}
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                {typographyTips[currentTipIndex].content}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevTip}
                disabled={typographyTips.length <= 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft size={14} />
                Previous
              </Button>

              <div className="flex gap-1">
                {typographyTips.map((_, index) => (
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
                disabled={typographyTips.length <= 1}
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
                to="/articles/typography-fundamentals"
                className="block text-sm text-accent hover:underline"
              >
                Typography Fundamentals
              </Link>
              <Link
                to="/articles/variable-fonts-guide"
                className="block text-sm text-accent hover:underline"
              >
                Variable Fonts Complete Guide
              </Link>
              <Link
                to="/articles/font-pairing-principles"
                className="block text-sm text-accent hover:underline"
              >
                Font Pairing Principles
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Typography Tools Stats</h3>
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
