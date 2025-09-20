import { Link } from 'react-router-dom';
import { Palette, Lightbulb, BookOpen } from 'lucide-react';
import { PageHeader } from '@frontenzo/ui';
import { getToolIcon } from '../../lib/toolIcons.tsx';
import { Breadcrumb } from '../../components/Breadcrumb';

const colorTools = [
  {
    name: 'CSS Gradient',
    path: '/tools/color/gradient',
    status: 'ready' as const,
    description: 'Create beautiful linear and radial gradients with live preview',
    features: ['Multiple color stops', 'Angle control', 'Quick presets', 'Copy CSS code']
  },
  {
    name: 'Color Picker',
    path: '/tools/color/picker',
    status: 'coming-soon' as const,
    description: 'Advanced color picker with multiple format support',
    features: ['HEX, RGB, HSL formats', 'Color harmony', 'Accessibility checker', 'Color history']
  },
  {
    name: 'Palette Builder',
    path: '/tools/color/palette',
    status: 'coming-soon' as const,
    description: 'Build cohesive color palettes for your projects',
    features: ['Color theory rules', 'Export formats', 'Brand colors', 'Contrast analysis']
  },
  {
    name: 'Color Converter',
    path: '/tools/color/converter',
    status: 'coming-soon' as const,
    description: 'Convert between color formats with precision and ease',
    features: ['HEX ↔ RGB ↔ HSL', 'CSS color names', 'Batch conversion', 'Format validation']
  },
];

const colorTips = [
  {
    title: 'Use the 60-30-10 Rule',
    content: 'Allocate 60% to your dominant color, 30% to secondary, and 10% to accent colors for balanced design.'
  },
  {
    title: 'Consider Color Psychology',
    content: 'Blue builds trust, green suggests growth, red creates urgency. Choose colors that align with your message.'
  },
  {
    title: 'Test Accessibility',
    content: 'Ensure your color combinations meet WCAG contrast requirements for better accessibility.'
  },
];

export function ColorToolsScreen() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <PageHeader
        title="Color Tools"
        subtitle="Professional color utilities for modern web design"
        icon={<Palette size={24} />}
        breadcrumbs={<Breadcrumb />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tools Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Available Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {colorTools.map((tool) => (
                <Link
                  key={tool.name}
                  to={tool.path}
                  className={`group bg-surface-1 border border-border rounded-lg p-4 shadow-sm transition-all duration-200 ${
                    tool.status === 'ready'
                      ? 'hover:border-accent/20 hover:shadow-md cursor-pointer'
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={(e) => {
                    if (tool.status !== 'ready') {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      {getToolIcon(tool.name)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-base group-hover:text-accent transition-colors">
                          {tool.name}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                            tool.status === 'ready'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {tool.status === 'ready' ? 'Ready' : 'Soon'}
                        </span>
                      </div>

                      <p className="text-sm text-muted mb-3 line-clamp-2">
                        {tool.description}
                      </p>

                      <div className="grid grid-cols-1 gap-1">
                        {tool.features.slice(0, 2).map((feature) => (
                          <div key={feature} className="text-xs text-muted flex items-center">
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
            <h2 className="text-2xl font-semibold mb-6">Master CSS Colors for Modern Web Design</h2>

            <p className="text-muted leading-relaxed mb-6">
              Color is one of the most powerful tools in web design. It influences user emotions, guides attention,
              and creates visual hierarchy. Modern CSS provides extensive color capabilities, from simple hex values
              to complex gradients and color functions.
            </p>

            <h3 className="text-xl font-semibold mb-4">Understanding CSS Color Formats</h3>
            <p className="text-muted leading-relaxed mb-4">
              CSS supports multiple color formats: HEX (#FF5733), RGB (rgb(255, 87, 51)), HSL (hsl(9, 100%, 60%)),
              and newer formats like LCH and P3. Each format has its strengths - HSL is intuitive for adjustments,
              while LCH provides perceptually uniform color space.
            </p>

            <h3 className="text-xl font-semibold mb-4">CSS Gradients: Beyond Simple Colors</h3>
            <p className="text-muted leading-relaxed mb-4">
              Linear and radial gradients add depth and visual interest to designs. Modern browsers support
              complex gradient syntax including multiple color stops, custom angles, and gradient shapes.
              Our gradient tool simplifies this process while maintaining full CSS control.
            </p>

            <h3 className="text-xl font-semibold mb-4">Color Accessibility in Web Design</h3>
            <p className="text-muted leading-relaxed mb-6">
              Accessible color design ensures your content is usable by everyone. Follow WCAG guidelines
              for contrast ratios: 4.5:1 for normal text, 3:1 for large text. Consider color blindness
              by testing your designs with tools that simulate different types of color vision deficiency.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Tips */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={20} className="text-warning" />
              <h3 className="font-semibold">Pro Tips</h3>
            </div>
            <div className="space-y-4">
              {colorTips.map((tip, index) => (
                <div key={index}>
                  <h4 className="font-medium text-sm mb-1">{tip.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{tip.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Resources */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={20} className="text-info" />
              <h3 className="font-semibold">Learn More</h3>
            </div>
            <div className="space-y-3">
              <a href="#" className="block text-sm text-accent hover:underline">
                CSS Color Module Level 4 Specification
              </a>
              <a href="#" className="block text-sm text-accent hover:underline">
                Web Content Accessibility Guidelines
              </a>
              <a href="#" className="block text-sm text-accent hover:underline">
                Color Theory for Web Designers
              </a>
              <a href="#" className="block text-sm text-accent hover:underline">
                Modern CSS Color Functions
              </a>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Color Tools Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted">Tools Available</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Ready to Use</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Coming Soon</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}