import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@frontforge/ui";

interface Tool {
  name: string;
  path: string;
  status: "ready" | "coming-soon" | "planned";
}

interface ToolCategoryCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  tools: Tool[];
}

export function ToolCategoryCard({
  id,
  title,
  description,
  icon,
  color,
  tools,
}: ToolCategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // If clicking on a tool link, don't trigger card expansion
    if ((e.target as HTMLElement).closest("a")) {
      return;
    }

    // If expanded, toggle expansion; if collapsed, navigate to category page
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      navigate(`/tools/${id}`);
    }
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-surface-1 border border-border rounded-lg overflow-hidden hover:border-accent/20 hover:shadow-md transition-all duration-200 shadow-sm">
      {/* Card Header */}
      <div className="p-6 cursor-pointer" onClick={handleCardClick}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center text-white`}
            >
              {icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted">{description}</p>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={handleExpandClick}
            className="p-2 hover:bg-surface-2 rounded transition-colors ml-4"
          >
            {isExpanded ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Tools List */}
      {isExpanded && (
        <div className="border-t border-border p-6 bg-surface-2">
          <div className="space-y-3">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center justify-between"
              >
                <Link
                  to={tool.path}
                  className="text-sm hover:text-accent transition-colors font-medium"
                >
                  {tool.name}
                </Link>
                <Badge
                  variant={
                    tool.status === "ready"
                      ? "success"
                      : tool.status === "coming-soon"
                        ? "warning"
                        : "outline"
                  }
                >
                  {tool.status === "ready"
                    ? "Ready"
                    : tool.status === "coming-soon"
                      ? "Soon"
                      : "Planned"}
                </Badge>
              </div>
            ))}
          </div>

          {/* Category Page Link */}
          <div className="mt-4 pt-4 border-t border-border">
            <Link
              to={`/tools/${id}`}
              className="text-sm text-accent hover:underline font-medium"
            >
              View all {title.toLowerCase()} tools →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
