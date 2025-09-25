import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Lightbulb,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageHeader, Button } from "@frontforge/ui";
import { getToolIcon } from "../../lib/toolIcons.tsx";
import { Breadcrumb } from "../../components/Breadcrumb";

const textTools = [
  {
    name: "Case Converter",
    path: "/tools/text/case-converter",
    status: "ready" as const,
    description:
      "Convert text between different cases including camelCase, snake_case, kebab-case, and more",
    features: [
      "Multiple case formats",
      "Bulk text processing",
      "Preserve line breaks",
      "Copy individual outputs",
    ],
  },
  {
    name: "Lorem Ipsum Generator",
    path: "/tools/text/lorem-ipsum",
    status: "ready" as const,
    description:
      "Generate placeholder text in various formats with customizable length and styling",
    features: [
      "Word/paragraph control",
      "Multiple text formats",
      "HTML output options",
      "Custom start text",
    ],
  },
  {
    name: "Slugify Tool",
    path: "/tools/text/slugify",
    status: "ready" as const,
    description:
      "Convert text to URL-friendly slugs with customizable separators and rules",
    features: [
      "URL-safe conversion",
      "Custom separators",
      "Unicode support",
      "Batch processing",
    ],
  },
  {
    name: "Base64 Encoder/Decoder",
    path: "/tools/text/base64",
    status: "ready" as const,
    description:
      "Encode and decode text using Base64 with support for files and binary data",
    features: [
      "Text & file support",
      "Bidirectional conversion",
      "Error handling",
      "Format validation",
    ],
  },
];

const textTips = [
  {
    title: "Consistent Naming Conventions",
    content:
      "Use consistent case conventions across your codebase. JavaScript uses camelCase for variables and functions, kebab-case for CSS classes, and snake_case is common in databases and Python.",
  },
  {
    title: "SEO-Friendly URL Slugs",
    content:
      "Create URL slugs that are descriptive, keyword-rich, and readable. Avoid special characters, use hyphens instead of underscores, and keep them concise while maintaining meaning.",
  },
  {
    title: "Lorem Ipsum Best Practices",
    content:
      "Use Lorem Ipsum for layout testing, but replace with real content early in development. Different languages have varying text patterns that can affect layout and design decisions.",
  },
  {
    title: "Base64 Encoding Applications",
    content:
      "Base64 is ideal for embedding small images in CSS/HTML, encoding data for APIs, and handling binary data in text-only contexts. Avoid for large files due to 33% size increase.",
  },
  {
    title: "Text Processing Performance",
    content:
      "For large text transformations, consider processing in chunks to avoid blocking the UI. Use Web Workers for intensive text processing tasks in production applications.",
  },
  {
    title: "Internationalization Considerations",
    content:
      "When processing text, consider Unicode normalization, right-to-left languages, and character encoding. Some case conversions behave differently across languages and locales.",
  },
  {
    title: "Accessibility in Text Tools",
    content:
      "Ensure text transformations maintain readability and meaning. Screen readers may struggle with certain case formats, so provide context when content meaning changes.",
  },
  {
    title: "Data Validation and Sanitization",
    content:
      "Always validate and sanitize text inputs, especially when processing user-generated content. Implement proper escaping for different output contexts (HTML, JSON, CSV).",
  },
];

export function TextToolsScreen() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % textTips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex(
      (prev) => (prev - 1 + textTips.length) % textTips.length
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <PageHeader
        title="Text Utilities"
        subtitle="Text transformers, encoders, and string utilities for efficient content processing"
        icon={<FileText size={24} />}
        breadcrumbs={<Breadcrumb />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tools Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Available Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {textTools.map((tool) => (
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
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white">
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
              Text Processing and Content Transformation Tools
            </h2>

            <p className="text-muted leading-relaxed mb-6">
              Text processing is fundamental to modern development workflows,
              from converting naming conventions to generating placeholder
              content. Our text utilities provide efficient, reliable tools for
              common text transformations, encoding operations, and content
              generation tasks.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Case Conversion and Naming Standards
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Consistent naming conventions improve code readability and
              maintainability. Different contexts require different case formats
              - camelCase for JavaScript variables, kebab-case for CSS classes,
              snake_case for database fields. Automated conversion ensures
              consistency across large codebases.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              URL Slugification and SEO Optimization
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              URL slugs should be descriptive, search-engine friendly, and
              human-readable. Proper slugification removes special characters,
              handles Unicode correctly, and creates clean URLs that improve
              both SEO performance and user experience.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Content Generation and Placeholder Text
            </h3>
            <p className="text-muted leading-relaxed mb-4">
              Lorem Ipsum and similar placeholder text enable design and layout
              testing without content dependencies. While useful for
              prototyping, consider the impact of different languages and text
              patterns on your designs when planning for international
              audiences.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Encoding and Data Transformation
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              Base64 encoding enables safe transmission of binary data through
              text-only channels. Understanding when and how to use different
              encoding schemes is crucial for APIs, data URLs, and handling file
              uploads in web applications.
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
                {currentTipIndex + 1} of {textTips.length}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2">
                {textTips[currentTipIndex].title}
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                {textTips[currentTipIndex].content}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevTip}
                disabled={textTips.length <= 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft size={14} />
                Previous
              </Button>

              <div className="flex gap-1">
                {textTips.map((_, index) => (
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
                disabled={textTips.length <= 1}
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
                to="/articles/text-processing-patterns"
                className="block text-sm text-accent hover:underline"
              >
                Text Processing Patterns
              </Link>
              <Link
                to="/articles/url-design-best-practices"
                className="block text-sm text-accent hover:underline"
              >
                URL Design Best Practices
              </Link>
              <Link
                to="/articles/encoding-security-guide"
                className="block text-sm text-accent hover:underline"
              >
                Encoding and Security Guide
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Text Tools Stats</h3>
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
