import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Lightbulb, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader, Button } from "@frontenzo/ui";
import { getToolIcon } from "../../lib/toolIcons.tsx";
import { Breadcrumb } from "../../components/Breadcrumb";

const animationTools = [
  {
    name: "Keyframes Generator",
    path: "/tools/animation/keyframes",
    status: "ready" as const,
    description:
      "Visual keyframe builder for creating custom CSS animations with timeline control",
    features: [
      "Visual keyframe timeline",
      "Property animation curves",
      "Duration & easing control",
      "Animation preview loop",
    ],
  },
  {
    name: "Transition Playground",
    path: "/tools/animation/transitions",
    status: "ready" as const,
    description:
      "Interactive CSS transition builder with hover states and timing function controls",
    features: [
      "Property transition setup",
      "Hover state triggers",
      "Easing function picker",
      "Delay & duration tuning",
    ],
  },
  {
    name: "Easing Curve Visualizer",
    path: "/tools/animation/easing",
    status: "ready" as const,
    description:
      "Visualize and customize timing functions with bezier curve editing and presets",
    features: [
      "Bezier curve editor",
      "Easing presets library",
      "Curve comparison tool",
      "CSS timing functions",
    ],
  },
  {
    name: "Scroll Animation Builder",
    path: "/tools/animation/scroll-animations",
    status: "ready" as const,
    description:
      "Create scroll-triggered animations with Intersection Observer and CSS keyframes",
    features: [
      "Scroll trigger setup",
      "Intersection thresholds",
      "Animation sequences",
      "Performance optimization",
    ],
  },
];

const animationTips = [
  {
    title: "Performance-First Animation Design",
    content:
      "Animate only transform and opacity properties for 60fps performance. Avoid animating layout properties like width, height, or positioning as they trigger expensive browser reflows and repaints.",
  },
  {
    title: "Easing Functions Create Personality",
    content:
      "Use ease-out for elements entering the viewport, ease-in for exiting elements, and ease-in-out for looping animations. Custom cubic-bezier curves can express brand personality through motion.",
  },
  {
    title: "Animation Duration Sweet Spots",
    content:
      "Keep micro-interactions under 300ms, interface transitions between 300-500ms, and complex animations under 1000ms. Longer animations feel sluggish and impact perceived performance.",
  },
  {
    title: "Respect User Preferences",
    content:
      "Always implement prefers-reduced-motion media queries to disable or simplify animations for users with vestibular disorders or those who prefer less motion in their interfaces.",
  },
  {
    title: "Stagger Animation Timing",
    content:
      "When animating lists or groups, stagger the delays by 50-100ms per item to create natural, flowing motion. This technique makes bulk animations feel more organic and less mechanical.",
  },
  {
    title: "Use Transform Origin Strategically",
    content:
      "Transform-origin controls the pivot point for scale and rotation animations. Set it to create more natural motion that originates from interaction points or visual focal areas.",
  },
  {
    title: "Hardware Acceleration Triggers",
    content:
      "Use transform3d(0,0,0) or will-change property to trigger hardware acceleration for smooth animations. Remove will-change after animations complete to avoid memory issues.",
  },
  {
    title: "Animation State Management",
    content:
      "Manage animation states carefully - ensure animations can be interrupted gracefully and don't interfere with user interactions. Use animation-fill-mode to control start and end states.",
  },
];

export function AnimationToolsScreen() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % animationTips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + animationTips.length) % animationTips.length);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <PageHeader
        title="Animation"
        subtitle="Keyframe builder, transitions, and easing visualizer for smooth, performant web animations"
        icon={<Zap size={24} />}
        breadcrumbs={<Breadcrumb />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tools Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Available Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {animationTools.map((tool) => (
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
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center text-white">
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
              Modern Web Animation and Motion Design
            </h2>

            <p className="text-muted leading-relaxed mb-6">
              Web animation enhances user experience through purposeful motion that guides attention, provides feedback, and creates emotional connections. Our animation toolkit provides professional-grade tools for creating smooth, performant animations while maintaining accessibility and respecting user preferences.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              CSS Keyframes and Timeline Control
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Keyframe animations provide precise control over complex motion sequences. Define multiple animation states, control timing between frames, and create sophisticated effects that would be impossible with simple transitions. Master percentage-based keyframes for ultimate flexibility in animation choreography.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Transition Design and Easing Psychology
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              CSS transitions create smooth property changes that feel natural and responsive. Understanding easing functions is crucial - they communicate personality and context through motion. Ease-out feels fast and responsive, ease-in provides gentle conclusions, while custom bezier curves express unique brand characteristics.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Performance and Hardware Acceleration
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Modern animation leverages GPU acceleration for smooth 60fps performance. Stick to animating transform and opacity properties, use will-change hints judiciously, and understand the browser's rendering pipeline to avoid expensive layout recalculations that cause animation jank.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Scroll-Triggered Animation Patterns
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              Scroll animations create engaging, narrative experiences as users explore content. Use Intersection Observer for performance-conscious trigger detection, implement proper animation lifecycles, and design animations that enhance rather than distract from content consumption.
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
                {currentTipIndex + 1} of {animationTips.length}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2">{animationTips[currentTipIndex].title}</h4>
              <p className="text-sm text-muted leading-relaxed">
                {animationTips[currentTipIndex].content}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevTip}
                disabled={animationTips.length <= 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft size={14} />
                Previous
              </Button>

              <div className="flex gap-1">
                {animationTips.map((_, index) => (
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
                disabled={animationTips.length <= 1}
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
                to="/articles/css-animation-performance"
                className="block text-sm text-accent hover:underline"
              >
                CSS Animation Performance Guide
              </Link>
              <Link
                to="/articles/motion-design-principles"
                className="block text-sm text-accent hover:underline"
              >
                Motion Design Principles
              </Link>
              <Link
                to="/articles/scroll-animation-patterns"
                className="block text-sm text-accent hover:underline"
              >
                Scroll Animation Patterns
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Animation Tools Stats</h3>
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