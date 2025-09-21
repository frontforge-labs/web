import { ArticleLayout } from "../../components/ArticleLayout";
import {
  ColorPreview,
  CodeExample,
  InfoBox,
} from "../../components/ArticleComponents";

export function AccessibilityGuidelinesArticle() {
  return (
    <ArticleLayout
      title="Web Content Accessibility Guidelines for Color"
      subtitle="Essential accessibility practices for inclusive color design and WCAG compliance"
      readTime="6 min"
      publishDate="September 2025"
      author="FrontEnzo Team"
    >
      <div className="text-xl text-muted leading-relaxed mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
        Creating accessible color designs ensures your content reaches the
        widest possible audience. Understanding WCAG guidelines and implementing
        proper color contrast is fundamental to inclusive web design that serves
        users with diverse visual capabilities.
      </div>

      <h2>♿ Understanding WCAG Color Requirements</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-green-800">
            📊 WCAG AA Standards
          </h3>
          <ul className="space-y-2 text-sm text-green-700">
            <li>• <strong>Normal text</strong>: 4.5:1 contrast ratio</li>
            <li>• <strong>Large text</strong>: 3:1 contrast ratio</li>
            <li>• <strong>UI components</strong>: 3:1 contrast ratio</li>
            <li>• <strong>Focus indicators</strong>: 3:1 contrast ratio</li>
          </ul>
        </div>

        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">
            🏆 WCAG AAA Standards
          </h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li>• <strong>Normal text</strong>: 7:1 contrast ratio</li>
            <li>• <strong>Large text</strong>: 4.5:1 contrast ratio</li>
            <li>• <strong>Enhanced readability</strong></li>
            <li>• <strong>Professional compliance</strong></li>
          </ul>
        </div>
      </div>

      <ColorPreview
        title="Contrast Examples: Good vs Bad"
        colors={[
          {
            name: "✅ Good Contrast",
            value: "#1F2937",
            description: "Ratio: 15.3:1 on white",
          },
          {
            name: "⚠️ Minimum AA",
            value: "#6B7280",
            description: "Ratio: 4.5:1 on white",
          },
          {
            name: "❌ Poor Contrast",
            value: "#D1D5DB",
            description: "Ratio: 1.6:1 on white",
          },
        ]}
      >
        Test these colors against white backgrounds to see the difference in
        readability.
      </ColorPreview>

      <h2>🌈 Color Blindness Considerations</h2>

      <InfoBox type="info" title="The Numbers">
        Approximately <strong>8% of men</strong> and <strong>0.5% of women</strong> experience some form
        of color vision deficiency. That's about 1 in 12 men and 1 in 200 women
        worldwide.
      </InfoBox>

      <div className="my-8 space-y-6">
        <div className="p-6 bg-surface-1 border border-border rounded-lg">
          <h3 className="font-semibold mb-4">Types of Color Blindness</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-300 rounded-lg"></div>
              <div>
                <div className="font-medium">Deuteranopia (Green-weak)</div>
                <div className="text-sm text-muted">
                  Most common - difficulty distinguishing red and green
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-300 rounded-lg"></div>
              <div>
                <div className="font-medium">Protanopia (Red-weak)</div>
                <div className="text-sm text-muted">
                  Reduced sensitivity to red light
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-300 rounded-lg"></div>
              <div>
                <div className="font-medium">Tritanopia (Blue-weak)</div>
                <div className="text-sm text-muted">
                  Rare - difficulty with blue and yellow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3>🛠️ Design Solutions for Color Blindness</h3>

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-red-800">
            ❌ Don't Rely on Color Alone
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-red-700">Error</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-green-700">Success</span>
            </div>
            <p className="text-red-600 mt-2">
              Color-only indicators can be invisible to color-blind users.
            </p>
          </div>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-green-800">
            ✅ Use Multiple Indicators
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center text-white text-xs">
                ×
              </div>
              <span className="text-red-700">Error</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center text-white text-xs">
                ✓
              </div>
              <span className="text-green-700">Success</span>
            </div>
            <p className="text-green-600 mt-2">
              Icons, patterns, and text provide clear meaning for everyone.
            </p>
          </div>
        </div>
      </div>

      <CodeExample
        title="Accessible Form Validation"
        code={`<!-- Bad: Color only -->
<input class="error-red" />
<span class="text-red">Error</span>

<!-- Good: Color + Icon + Text -->
<input class="error-red border-2" aria-invalid="true" />
<span class="text-red flex items-center gap-2">
  <svg class="error-icon">...</svg>
  Please enter a valid email address
</span>`}
        language="html"
      />

      <h2>🎯 Focus and Interactive States</h2>

      <ColorPreview
        title="Accessible Focus Indicators"
        colors={[
          {
            name: "Focus Ring",
            value: "#3B82F6",
            description: "2px solid, 3:1 contrast",
          },
          {
            name: "Focus Background",
            value: "#DBEAFE",
            description: "Subtle background change",
          },
          {
            name: "Focus Shadow",
            value: "rgba(59, 130, 246, 0.5)",
            description: "Box-shadow outline",
          },
        ]}
      >
        Focus indicators must be clearly visible and maintain proper contrast
        ratios.
      </ColorPreview>

      <CodeExample
        title="CSS Focus Indicators"
        code={`/* Accessible focus styles */
.button {
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition: all 0.2s;
}

.button:focus {
  outline-color: #3B82F6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .button:focus {
    outline-width: 3px;
    outline-style: solid;
  }
}`}
        preview={
          <div className="space-y-3">
            <button className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-2 focus:outline-blue-600 focus:outline-offset-2">
              Accessible Button
            </button>
            <p className="text-sm text-muted">
              Try tabbing to this button to see the focus indicator.
            </p>
          </div>
        }
      />

      <h2>🌙 Dark Mode & Light Sensitivity</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="p-6 bg-gray-900 text-white rounded-lg">
          <h3 className="font-semibold mb-4">🌙 Dark Mode Best Practices</h3>
          <ul className="text-sm space-y-2 text-gray-300">
            <li>• Use <strong>near-black</strong> (#121212) instead of pure black</li>
            <li>• <strong>Reduce contrast</strong> slightly to prevent eye strain</li>
            <li>• <strong>Increase surface elevation</strong> with lighter grays</li>
            <li>• <strong>Test contrast ratios</strong> in dark themes too</li>
          </ul>
        </div>

        <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-semibold mb-4">☀️ Light Mode Considerations</h3>
          <ul className="text-sm space-y-2 text-gray-700">
            <li>• Use <strong>sufficient contrast</strong> for bright environments</li>
            <li>• <strong>Avoid pure white</strong> backgrounds (#FAFAFA works better)</li>
            <li>• <strong>Consider outdoor usage</strong> and screen reflections</li>
            <li>• <strong>Provide theme toggle</strong> for user preference</li>
          </ul>
        </div>
      </div>

      <CodeExample
        title="Responsive Theme Implementation"
        code={`/* Respect user preferences */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #121212;
    --text-primary: #E5E5E5;
    --accent: #60A5FA;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --bg-primary: #FAFAFA;
    --text-primary: #1F2937;
    --accent: #3B82F6;
  }
}

/* High contrast support */
@media (prefers-contrast: high) {
  :root {
    --text-primary: #000000;
    --bg-primary: #FFFFFF;
  }
}`}
      />

      <h2>🔧 Testing Tools & Workflow</h2>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-blue-800">
            🛠️ Recommended Tools
          </h4>
          <ul className="text-sm space-y-1 text-blue-700">
            <li>• <strong>WebAIM Color Contrast Checker</strong> - Quick online testing</li>
            <li>
              • <strong>axe DevTools</strong> - Browser extension for comprehensive auditing
            </li>
            <li>• <strong>Stark</strong> - Design tool plugins for Figma/Sketch</li>
            <li>• <strong>Color Oracle</strong> - Color blindness simulator</li>
          </ul>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-green-800">
            ✅ Testing Checklist
          </h4>
          <ul className="text-sm space-y-1 text-green-700">
            <li>• Check contrast ratios for all text combinations</li>
            <li>• Test with color blindness simulators</li>
            <li>• Verify focus indicators are clearly visible</li>
            <li>• Ensure information isn't conveyed by color alone</li>
            <li>• Test in both light and dark modes</li>
          </ul>
        </div>
      </div>

      <InfoBox type="warning" title="Legal Requirements">
        Accessibility compliance isn't optional—it's increasingly required by
        law. The ADA, Section 508, and similar legislation worldwide mandate
        accessible digital experiences. Non-compliance can result in legal
        action and exclude significant portions of your potential audience.
      </InfoBox>

      <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">
          🎯 Ready to Test Your Colors?
        </h3>
        <p className="text-sm mb-4">
          Use our color tools to create accessible color schemes that look great
          and work for everyone.
        </p>
        <div className="flex gap-3 text-sm">
          <a
            href="/tools/color/picker"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Test Contrast Ratios
          </a>
          <a
            href="/tools/color/palette"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Build Accessible Palettes
          </a>
        </div>
      </div>
    </ArticleLayout>
  );
}
