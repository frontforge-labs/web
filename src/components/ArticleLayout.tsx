import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { PageHeader } from "@frontenzo/ui";
import { Breadcrumb } from "./Breadcrumb";

interface ArticleLayoutProps {
  title: string;
  subtitle: string;
  readTime: string;
  publishDate: string;
  author: string;
  children: ReactNode;
  breadcrumbs?: Array<{ label: string; href: string }>;
}

export function ArticleLayout({
  title,
  subtitle,
  readTime,
  publishDate,
  author,
  children,
  breadcrumbs,
}: ArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumb items={breadcrumbs} />

        {/* Back Button */}
        <Link
          to="/tools/color"
          className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Color Tools
        </Link>

        {/* Article Header */}
        <PageHeader title={title} subtitle={subtitle} />

        {/* Article Meta */}
        <div className="flex items-center gap-6 text-sm text-muted mb-8 border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{publishDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readTime} read</span>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-gray max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-8 prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-6 prose-h4:text-lg prose-p:leading-relaxed prose-p:mb-4 prose-li:leading-relaxed prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-strong:text-foreground">
          {children}
        </article>

        {/* Back to Tools Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link
            to="/tools/color"
            className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Explore More Color Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
