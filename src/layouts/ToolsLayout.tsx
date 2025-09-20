import { useWorkspaceStore } from '../store/workspace';
import { Sidebar } from '@frontenzo/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { toolCategories } from '../lib/constants.tsx';
import {
  Palette,
  Home,
  Settings
} from 'lucide-react';

interface ToolsLayoutProps {
  children: React.ReactNode;
}

export function ToolsLayout({ children }: ToolsLayoutProps) {
  const { sidebarCollapsed, setSidebarCollapsed } = useWorkspaceStore();
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home size={20} />,
      onClick: () => navigate('/'),
    },
    {
      id: 'tools-home',
      label: 'All Tools',
      icon: <Palette size={20} />,
      onClick: () => navigate('/tools'),
    },
    ...toolCategories.map(category => ({
      id: category.id,
      label: category.title,
      icon: category.icon,
      onClick: () => navigate(`/tools/${category.id}`),
    })),
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
      onClick: () => navigate('/settings'),
    },
  ];

  const currentPath = location.pathname;

  // Smart active sidebar detection
  const getActiveId = () => {
    if (currentPath === '/') return 'home';
    if (currentPath === '/settings') return 'settings';
    if (currentPath === '/tools') return 'tools-home';

    // Check for category or tool pages
    for (const category of toolCategories) {
      // Direct category page match
      if (currentPath === `/tools/${category.id}`) {
        return category.id;
      }

      // Tool page within category
      if (category.tools.some(tool => tool.path === currentPath)) {
        return category.id;
      }
    }

    return 'tools-home'; // fallback
  };

  return (
    <div className="h-screen flex bg-[var(--fe-bg)] text-[var(--fe-text)]">
      {/* Sidebar */}
      <Sidebar
        items={sidebarItems}
        activeId={getActiveId()}
        collapsed={sidebarCollapsed}
        onSelect={() => {}}
        className="border-r border-[var(--fe-border)]"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-14 border-b border-[var(--fe-border)] bg-[var(--fe-bg)]/80 backdrop-blur-sm flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-[var(--fe-border)]/50 rounded-lg transition-colors"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Settings size={18} />
            </button>
            <div className="h-6 w-px bg-[var(--fe-border)]" />
            <h2 className="font-semibold text-lg">FrontEnzo</h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--fe-text)]/60 font-medium">
              CSS Generator Tools
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}