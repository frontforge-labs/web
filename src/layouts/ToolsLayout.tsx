import { useWorkspaceStore } from "../store/workspace";
import { Sidebar, ThemeToggle } from "@frontforge/ui";
import { useLocation, useNavigate } from "react-router-dom";
import { toolCategories } from "../lib/constants.tsx";

interface ToolsLayoutProps {
  children: React.ReactNode;
}

export function ToolsLayout({ children }: ToolsLayoutProps) {
  const { sidebarCollapsed, setSidebarCollapsed } = useWorkspaceStore();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  // Enhanced navigation data with paths
  const sidebarCategories = toolCategories.map((category) => ({
    ...category,
    path: `/tools/${category.id}`,
  }));

  // Smart active detection
  const getActiveState = () => {
    if (currentPath === "/") return { activeId: "home" };
    if (currentPath === "/articles") return { activeId: "articles" };

    // Check for category or tool pages
    for (const category of toolCategories) {
      // Direct category page match
      if (currentPath === `/tools/${category.id}`) {
        return { activeCategoryId: category.id };
      }

      // Tool page within category
      const activeTool = category.tools.find(
        (tool) => tool.path === currentPath
      );
      if (activeTool) {
        return {
          activeCategoryId: category.id,
          activeToolPath: activeTool.path,
        };
      }
    }

    return {}; // No active state
  };

  const activeState = getActiveState();

  return (
    <div className="h-screen flex bg-bg text-text">
      {/* Sidebar */}
      <Sidebar
        categories={sidebarCategories}
        activeId={activeState.activeId}
        activeCategoryId={activeState.activeCategoryId}
        activeToolPath={activeState.activeToolPath}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNavigate={navigate}
        className="border-r border-border"
        footer={<ThemeToggle />}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
