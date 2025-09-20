import { Link, useLocation } from 'react-router-dom';
import { RouterBreadcrumb, type BreadcrumbItem } from '@frontenzo/ui';
import { toolCategories } from '../lib/constants.tsx';

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const location = useLocation();

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    if (items) return items;

    const currentPath = location.pathname;
    const breadcrumbItems: BreadcrumbItem[] = [
      { label: 'FrontEnzo', href: '/' }
    ];

    if (currentPath.startsWith('/tools')) {
      breadcrumbItems.push({ label: 'Tools', href: '/tools' });

      for (const category of toolCategories) {
        if (currentPath === `/tools/${category.id}`) {
          breadcrumbItems.push({ label: category.title });
          break;
        }

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
    else if (currentPath === '/settings') {
      breadcrumbItems.push({ label: 'Settings' });
    }
    else if (currentPath === '/') {
      return [{ label: 'FrontEnzo' }];
    }

    return breadcrumbItems;
  };

  return (
    <RouterBreadcrumb
      generateItems={getBreadcrumbItems}
      LinkComponent={Link}
      className={className}
    />
  );
}