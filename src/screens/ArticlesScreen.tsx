import { Link } from "react-router-dom";
import { BookOpen, Clock, User, ArrowRight } from "lucide-react";
import { PageHeader } from "@frontenzo/ui";
import { Breadcrumb } from "../components/Breadcrumb";

interface Article {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  publishDate: string;
  author: string;
  category: string;
  path: string;
  excerpt: string;
  tags: string[];
}

const articles: Article[] = [
  {
    id: "css-color-module",
    title: "CSS Color Module Level 4 Specification",
    subtitle: "Comprehensive guide to modern CSS color features",
    readTime: "8 min",
    publishDate: "September 2025",
    author: "FrontEnzo Team",
    category: "CSS Reference",
    path: "/articles/css-color-module",
    excerpt: "Explore the revolutionary color capabilities in CSS Color Module Level 4, from wider color gamuts to perceptually uniform color spaces.",
    tags: ["CSS", "Color", "Modern Web", "Standards"]
  },
  {
    id: "accessibility-guidelines",
    title: "Web Content Accessibility Guidelines",
    subtitle: "Building inclusive color experiences",
    readTime: "6 min",
    publishDate: "September 2025",
    author: "FrontEnzo Team",
    category: "Accessibility",
    path: "/articles/accessibility-guidelines",
    excerpt: "Learn how to create accessible color designs that comply with WCAG guidelines and ensure inclusive user experiences.",
    tags: ["Accessibility", "WCAG", "Inclusive Design", "UX"]
  },
  {
    id: "color-theory",
    title: "Color Theory for Web Designers",
    subtitle: "Master the fundamentals of color relationships",
    readTime: "10 min",
    publishDate: "September 2025",
    author: "FrontEnzo Team",
    category: "Design Theory",
    path: "/articles/color-theory",
    excerpt: "Understand color relationships, harmony principles, and how to apply color theory to create compelling web interfaces.",
    tags: ["Color Theory", "Design", "Psychology", "Harmony"]
  },
  {
    id: "modern-css-color-functions",
    title: "Modern CSS Color Functions",
    subtitle: "Advanced color manipulation techniques",
    readTime: "7 min",
    publishDate: "September 2025",
    author: "FrontEnzo Team",
    category: "CSS Techniques",
    path: "/articles/modern-css-color-functions",
    excerpt: "Discover powerful CSS color functions like color-mix(), relative colors, and next-generation color manipulation.",
    tags: ["CSS", "Functions", "Modern Web", "Advanced"]
  }
];

const categories = Array.from(new Set(articles.map(article => article.category)));

export function ArticlesScreen() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <PageHeader
        title="Articles"
        subtitle="In-depth guides, tutorials, and insights for modern web development"
        icon={<BookOpen size={24} />}
        breadcrumbs={<Breadcrumb />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-surface-1 border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full font-medium">
                        {article.category}
                      </span>
                    </div>

                    <Link
                      to={article.path}
                      className="block group-hover:text-accent transition-colors"
                    >
                      <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-muted mb-3 line-clamp-1">
                        {article.subtitle}
                      </p>
                    </Link>

                    <p className="text-muted leading-relaxed mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted mb-4">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{article.readTime} read</span>
                      </div>
                      <span>{article.publishDate}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-surface-2 text-muted rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-xs text-muted">
                            +{article.tags.length - 3} more
                          </span>
                        )}
                      </div>

                      <Link
                        to={article.path}
                        className="flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors"
                      >
                        Read article
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => {
                const count = articles.filter(article => article.category === category).length;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm">{category}</span>
                    <span className="text-xs text-muted bg-surface-2 px-2 py-1 rounded">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Popular Tags */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(articles.flatMap(article => article.tags)))
                .slice(0, 8)
                .map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-surface-2 text-muted rounded hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Article Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted">Total Articles</span>
                <span className="font-medium">{articles.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Categories</span>
                <span className="font-medium">{categories.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Avg. Read Time</span>
                <span className="font-medium">
                  {Math.round(articles.reduce((acc, article) =>
                    acc + parseInt(article.readTime), 0) / articles.length)} min
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}