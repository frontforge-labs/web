import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { toolCategories } from '../lib/constants.tsx';

interface BreadcrumbItem {
  label: string;
  href?: string; // If no href, it's the current page
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]; // Optional custom breadcrumb items
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const location = useLocation();

  // Auto-generate breadcrumb items if not provided
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    if (items) return items;

    const currentPath = location.pathname;
    const breadcrumbItems: BreadcrumbItem[] = [
      { label: 'FrontEnzo', href: '/' }
    ];

    // Handle tools routes
    if (currentPath.startsWith('/tools')) {
      breadcrumbItems.push({ label: 'Tools', href: '/tools' });

      // Find matching category and tool
      for (const category of toolCategories) {
        // Check if we're on a category page
        if (currentPath === `/tools/${category.id}`) {
          breadcrumbItems.push({ label: category.title });
          break;
        }

        // Check if we're on a tool page within this category
        const tool = category.tools.find(t => t.path === currentPath);
        if (tool) {
          breadcrumbItems.push({
            label: category.title,
            href: `/tools/${category.id}`
          });
          breadcrumbItems.push({ label: tool.name });
          break;
        }
      }
    }
    // Handle settings
    else if (currentPath === '/settings') {
      breadcrumbItems.push({ label: 'Settings' });
    }
    // Home page - just show FrontEnzo
    else if (currentPath === '/') {
      return [{ label: 'FrontEnzo' }];
    }

    return breadcrumbItems;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <nav className={`flex items-center gap-2 text-xs ${className}`} aria-label="Breadcrumb">
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight size={12} className="text-[var(--fe-text)]/40" />}

            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="hover:text-[var(--fe-accent)] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-orange-500 underline font-medium" : ""}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}