import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface Tool {
  name: string;
  path: string;
  status: 'ready' | 'coming-soon' | 'planned';
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
  tools
}: ToolCategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // If clicking on a tool link, don't trigger card expansion
    if ((e.target as HTMLElement).closest('a')) {
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
    <div className="border border-[var(--fe-border)] rounded-lg overflow-hidden hover:border-[var(--fe-accent)] transition-colors">
      {/* Card Header */}
      <div
        className="p-6 cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center text-white`}>
              {icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-[var(--fe-text)]/70">{description}</p>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={handleExpandClick}
            className="p-2 hover:bg-[var(--fe-border)] rounded transition-colors ml-4"
          >
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>

      {/* Expanded Tools List */}
      {isExpanded && (
        <div className="border-t border-[var(--fe-border)] p-6 bg-[var(--fe-border)]/5">
          <div className="space-y-3">
            {tools.map((tool) => (
              <div key={tool.name} className="flex items-center justify-between">
                <Link
                  to={tool.path}
                  className="text-sm hover:text-[var(--fe-accent)] transition-colors font-medium"
                >
                  {tool.name}
                </Link>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    tool.status === 'ready'
                      ? 'bg-green-100 text-green-700'
                      : tool.status === 'coming-soon'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {tool.status === 'ready' ? 'Ready' : tool.status === 'coming-soon' ? 'Soon' : 'Planned'}
                </span>
              </div>
            ))}
          </div>

          {/* Category Page Link */}
          <div className="mt-4 pt-4 border-t border-[var(--fe-border)]">
            <Link
              to={`/tools/${id}`}
              className="text-sm text-[var(--fe-accent)] hover:underline font-medium"
            >
              View all {title.toLowerCase()} tools →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}