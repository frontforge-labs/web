import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileJson,
  Lightbulb,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageHeader, Button } from "@frontforge/ui";
import { getToolIcon } from "../../lib/toolIcons.tsx";
import { Breadcrumb } from "../../components/Breadcrumb";

const devTools = [
  {
    name: "JSON Formatter & Validator",
    path: "/tools/dev/json-formatter",
    status: "ready" as const,
    description:
      "Format, validate, and minify JSON with syntax highlighting and error detection",
    features: [
      "JSON validation & formatting",
      "Syntax error detection",
      "Minify & beautify options",
      "Tree view visualization",
    ],
  },
  {
    name: "RegEx Tester",
    path: "/tools/dev/regex-tester",
    status: "ready" as const,
    description:
      "Test regular expressions with real-time matching, flags, and explanation",
    features: [
      "Live regex testing",
      "Match highlighting",
      "Flag support (g, i, m)",
      "Pattern explanation",
    ],
  },
  {
    name: "Minifier/Beautifier",
    path: "/tools/dev/minifier",
    status: "ready" as const,
    description:
      "Minify and beautify CSS, JavaScript, HTML, and JSON for optimization",
    features: [
      "Multi-language support",
      "Size comparison stats",
      "Preserve comments option",
      "Custom formatting rules",
    ],
  },
  {
    name: "Diff Viewer",
    path: "/tools/dev/diff-viewer",
    status: "ready" as const,
    description:
      "Compare text files and code with side-by-side or unified diff views",
    features: [
      "Side-by-side comparison",
      "Unified diff format",
      "Line-by-line highlighting",
      "Ignore whitespace options",
    ],
  },
];

const devTips = [
  {
    title: "JSON Schema Validation",
    content:
      "Use JSON Schema to validate API responses and configuration files. Schemas provide documentation, validation rules, and can generate TypeScript types automatically for type-safe development.",
  },
  {
    title: "Regular Expression Performance",
    content:
      "Avoid catastrophic backtracking in regex patterns. Use possessive quantifiers when possible, limit nested quantifiers, and test complex patterns with large inputs to ensure performance remains acceptable.",
  },
  {
    title: "Code Minification Best Practices",
    content:
      "Minify code only for production builds. Preserve source maps for debugging, use tree-shaking to eliminate dead code, and configure minifiers to maintain essential comments like licenses.",
  },
  {
    title: "Version Control Diff Strategies",
    content:
      "Use semantic line breaks in documentation and configure Git to use better diff algorithms (patience, histogram) for more readable code comparisons. Ignore whitespace changes when reviewing.",
  },
  {
    title: "API Response Debugging",
    content:
      "Format JSON responses for better readability during development. Use browser dev tools' JSON viewer or dedicated formatters to understand complex nested data structures quickly.",
  },
  {
    title: "Development Environment Setup",
    content:
      "Standardize development tools across your team. Use EditorConfig, Prettier, and ESLint configurations to ensure consistent code formatting and catch common issues early in development.",
  },
  {
    title: "Code Review Efficiency",
    content:
      "Use diff tools to focus on meaningful changes. Configure your diff viewer to ignore formatting-only changes and highlight semantic differences that require careful review and testing.",
  },
  {
    title: "Performance Monitoring",
    content:
      "Monitor bundle sizes and loading performance in development. Use tools to track asset size changes over time and set up alerts when bundles exceed performance budgets.",
  },
];

export function DevToolsScreen() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % devTips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + devTips.length) % devTips.length);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <PageHeader
        title="Dev Tools"
        subtitle="JSON formatter, text diff, and developer utilities for efficient coding workflows"
        icon={<FileJson size={24} />}
        breadcrumbs={<Breadcrumb />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tools Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Available Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {devTools.map((tool) => (
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
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-slate-500 to-gray-600 flex items-center justify-center text-white">
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
              Essential Developer Utilities and Workflow Tools
            </h2>

            <p className="text-muted leading-relaxed mb-6">
              Developer productivity relies on efficient tooling for common
              tasks like data formatting, code comparison, and pattern matching.
              Our developer toolkit provides essential utilities that streamline
              workflows, reduce errors, and enable faster debugging and
              development cycles.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              JSON Processing and Validation
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              JSON formatting and validation are crucial for API development and
              configuration management. Proper JSON tools help identify syntax
              errors, understand complex data structures, and ensure data
              integrity across development environments. Well-formatted JSON
              improves code readability and debugging efficiency.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Regular Expression Testing and Debugging
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Regular expressions are powerful but complex tools for pattern
              matching and text processing. Interactive regex testing enables
              rapid iteration and validation, helping developers understand
              matching behavior, optimize performance, and avoid common pitfalls
              like catastrophic backtracking.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Code Optimization and Comparison
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Code minification reduces bundle sizes and improves loading
              performance, while diff tools enable efficient code review and
              change tracking. Understanding the impact of optimization
              techniques and maintaining readable comparison views are essential
              for modern development workflows.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Development Workflow Integration
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              Effective developer tools integrate seamlessly into existing
              workflows, supporting automation, continuous integration, and team
              collaboration. The best utilities provide consistent interfaces,
              reliable output, and configurable behavior that adapts to
              different project requirements and coding standards.
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
                {currentTipIndex + 1} of {devTips.length}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2">
                {devTips[currentTipIndex].title}
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                {devTips[currentTipIndex].content}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevTip}
                disabled={devTips.length <= 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft size={14} />
                Previous
              </Button>

              <div className="flex gap-1">
                {devTips.map((_, index) => (
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
                disabled={devTips.length <= 1}
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
                to="/articles/developer-workflow-optimization"
                className="block text-sm text-accent hover:underline"
              >
                Developer Workflow Optimization
              </Link>
              <Link
                to="/articles/regex-patterns-guide"
                className="block text-sm text-accent hover:underline"
              >
                Regular Expression Patterns Guide
              </Link>
              <Link
                to="/articles/json-api-best-practices"
                className="block text-sm text-accent hover:underline"
              >
                JSON API Best Practices
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Dev Tools Stats</h3>
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
