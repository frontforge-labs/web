import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Lightbulb,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageHeader, Button } from "@frontforge/ui";
import { getToolIcon } from "../../../lib/toolIcons.tsx";
import { Breadcrumb } from "../../../components/Breadcrumb";

const animationTools = [
  {
    name: "Keyframes Generator",
    path: "/tools/animation/keyframes",
    status: "ready" as const,
    description:
      "Create CSS keyframe animations with multiple steps and visual timeline editor",
    features: [
      "Visual timeline",
      "Multiple keyframes",
      "Property animation",
      "Animation preview",
    ],
  },
  {
    name: "Transition Playground",
    path: "/tools/animation/transitions",
    status: "ready" as const,
    description:
      "Experiment with CSS transitions and timing functions for smooth property changes",
    features: [
      "All CSS properties",
      "Timing functions",
      "Duration & delay",
      "Live preview",
    ],
  },
  {
    name: "Easing Curve Visualizer",
    path: "/tools/animation/easing",
    status: "ready" as const,
    description:
      "Visualize and compare easing functions with interactive bezier curve editor",
    features: [
      "Cubic bezier editor",
      "Preset easings",
      "Curve comparison",
      "Custom timing",
    ],
  },
  {
    name: "Scroll Animation Builder",
    path: "/tools/animation/scroll-animations",
    status: "ready" as const,
    description:
      "Create scroll-triggered animations with intersection observer and CSS scroll-timeline",
    features: [
      "Scroll triggers",
      "Reveal animations",
      "Parallax effects",
      "Timeline control",
    ],
  },
];

const animationTips = [
  {
    title: "The 60 FPS Rule",
    content:
      "Aim for 60 frames per second (16.67ms per frame) for smooth animations. Use transform and opacity for GPU-accelerated animations. Avoid animating properties that trigger layout or paint like width, height, or margin.",
  },
  {
    title: "Use will-change Sparingly",
    content:
      "The will-change property optimizes animations but consumes memory. Apply it just before animation starts and remove it afterward. Don't use it on too many elements simultaneously or set it permanently in CSS.",
  },
  {
    title: "Easing Creates Natural Motion",
    content:
      "Linear animations feel robotic. Use easing functions like ease-out for entering elements, ease-in for exiting, and ease-in-out for continuous motion. Custom cubic-bezier curves provide unique character.",
  },
  {
    title: "Respect prefers-reduced-motion",
    content:
      "Users with vestibular disorders can feel sick from motion. Always respect the prefers-reduced-motion media query by reducing or removing animations for accessibility.",
  },
  {
    title: "Keyframes for Complex Sequences",
    content:
      "Use keyframes for multi-step animations or when animating multiple properties with different timings. Transitions work for simple state changes between two values.",
  },
  {
    title: "Animation Performance Tips",
    content:
      "Batch DOM reads and writes. Use transform: translateZ(0) to force GPU acceleration. Animate on composited layers. Use requestAnimationFrame for JavaScript animations.",
  },
  {
    title: "Scroll Animations Best Practices",
    content:
      "Use Intersection Observer for scroll-triggered animations instead of scroll event listeners. Consider using CSS scroll-timeline for better performance. Test on low-end devices.",
  },
  {
    title: "Animation Timing Strategy",
    content:
      "Fast animations (100-200ms) for micro-interactions. Medium (200-500ms) for UI transitions. Slow (500ms+) for complex sequences. Consistency creates predictability.",
  },
];

export function AnimationScreen() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % animationTips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex(
      (prev) => (prev - 1 + animationTips.length) % animationTips.length
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <PageHeader
        title="Animation Tools"
        subtitle="Professional CSS animation generators for keyframes, transitions, and scroll effects"
        icon={<Zap size={24} />}
        breadcrumbs={<Breadcrumb />}
        iconBgClassName="bg-gradient-to-r from-yellow-500 to-orange-600"
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
              Master CSS Animations for Engaging Web Experiences
            </h2>

            <p className="text-muted leading-relaxed mb-6">
              Animations breathe life into static designs, guide user attention,
              and create delightful interactions. Our comprehensive animation
              tools help you create smooth keyframe sequences, perfect
              transitions, visualize easing curves, and build scroll-triggered
              effects with precision and creative control.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              CSS Keyframes: Complex Animation Sequences
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              CSS keyframes enable multi-step animations with precise control
              over timing and properties. Define animation states at specific
              percentages, animate multiple properties simultaneously, and
              create loops, delays, and direction controls. Keyframes are
              perfect for loading spinners, bouncing elements, and complex UI
              transitions.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              CSS Transitions: Smooth State Changes
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Transitions provide smooth interpolation between CSS property
              values on state changes like :hover or :focus. Control duration,
              delay, and timing functions for each property. Transitions excel
              at micro-interactions like button hovers, form focus states, and
              menu reveals that enhance user experience without complexity.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Easing Functions: Natural Motion Design
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Easing functions define acceleration curves making animations feel
              natural and purposeful. Linear timing feels robotic while
              ease-in/out creates organic acceleration and deceleration. Custom
              cubic-bezier curves enable unique motion signatures. Understanding
              easing transforms mechanical animations into polished experiences.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Scroll Animations: Progressive Disclosure
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              Scroll-triggered animations reveal content progressively as users
              explore your page. Use Intersection Observer API for performant
              scroll detection, or CSS scroll-timeline for declarative scroll
              animations. Parallax effects, fade-ins, and slide-ups create
              engaging storytelling experiences when used with restraint.
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
              <h4 className="font-medium text-sm mb-2">
                {animationTips[currentTipIndex].title}
              </h4>
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
                to="/articles/css-animations"
                className="block text-sm text-accent hover:underline"
              >
                CSS Animations Complete Guide
              </Link>
              <Link
                to="/articles/animation-performance"
                className="block text-sm text-accent hover:underline"
              >
                Animation Performance Optimization
              </Link>
              <Link
                to="/articles/motion-design"
                className="block text-sm text-accent hover:underline"
              >
                Motion Design Principles
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
