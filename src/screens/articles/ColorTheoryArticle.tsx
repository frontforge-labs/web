import { Link } from "react-router-dom";
import { ArticleLayout } from "../../components/ArticleLayout";
import {
  ColorPreview,
  CodeExample,
  InfoBox,
} from "../../components/ArticleComponents";

export function ColorTheoryArticle() {
  return (
    <ArticleLayout
      title="Color Theory for Web Designers"
      subtitle="Master the fundamental principles of color relationships, harmony, and psychology in digital design"
      readTime="10 min"
      publishDate="September 2025"
      author="FrontForge Team"
    >
      <div className="text-xl text-muted leading-relaxed mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
        Color theory provides the scientific foundation for creating harmonious,
        effective color schemes in web design. Understanding color
        relationships, psychological impacts, and cultural meanings enables
        designers to craft compelling visual experiences that resonate with
        their audience.
      </div>

      <h2>🎨 Understanding the Digital Color Wheel</h2>

      <p className="text-lg leading-relaxed">
        While traditional art uses Red, Yellow, Blue (RYB) primaries, digital
        design works with <strong>Red, Green, Blue (RGB)</strong> additive color
        mixing. This fundamental difference shapes how we create and combine
        colors on screens.
      </p>

      <ColorPreview
        title="RGB Primary Colors"
        colors={[
          { name: "Red", value: "#FF0000", description: "Pure red primary" },
          {
            name: "Green",
            value: "#00FF00",
            description: "Pure green primary",
          },
          { name: "Blue", value: "#0000FF", description: "Pure blue primary" },
        ]}
      >
        These are the building blocks of all digital colors. When combined, they
        create secondary colors.
      </ColorPreview>

      <ColorPreview
        title="RGB Secondary Colors"
        colors={[
          { name: "Cyan", value: "#00FFFF", description: "Green + Blue" },
          { name: "Magenta", value: "#FF00FF", description: "Red + Blue" },
          { name: "Yellow", value: "#FFFF00", description: "Red + Green" },
        ]}
      >
        Secondary colors are created by combining two primary colors at full
        intensity.
      </ColorPreview>

      <h2>🎯 Color Harmony Schemes</h2>

      <p className="text-lg leading-relaxed">
        Color harmony schemes provide{" "}
        <strong>proven mathematical relationships</strong> that create visually
        pleasing combinations. These aren't just artistic preferences—they're
        based on how our eyes and brain process color information.
      </p>

      <h3>Complementary Colors: Maximum Impact</h3>

      <ColorPreview
        title="Complementary Color Pairs"
        colors={[
          {
            name: "Blue & Orange",
            value: "#3B82F6",
            description: "High contrast, energetic",
          },
          {
            name: "Orange",
            value: "#F97316",
            description: "Blue's complement",
          },
          {
            name: "Red & Green",
            value: "#EF4444",
            description: "Classic Christmas combination",
          },
          { name: "Green", value: "#22C55E", description: "Red's complement" },
          {
            name: "Purple & Yellow",
            value: "#8B5CF6",
            description: "Luxury meets energy",
          },
          {
            name: "Yellow",
            value: "#EAB308",
            description: "Purple's complement",
          },
        ]}
      >
        Complementary colors create the highest contrast and visual excitement.
        Perfect for CTAs and focal points.
      </ColorPreview>

      <InfoBox type="tip" title="Pro Tip: Using Complementary Colors">
        Don't use complementary colors in equal amounts—it creates visual
        vibration and eye strain. Use one as the dominant color (60-70%) and the
        other as a powerful accent (10-15%).
      </InfoBox>

      <h3>Analogous Colors: Harmony & Unity</h3>

      <ColorPreview
        title="Analogous Color Schemes"
        colors={[
          { name: "Blue", value: "#3B82F6", description: "Base color" },
          { name: "Blue-Green", value: "#059669", description: "Neighbor 1" },
          { name: "Blue-Purple", value: "#7C3AED", description: "Neighbor 2" },
        ]}
      >
        Colors that sit next to each other on the color wheel create peaceful,
        comfortable designs.
      </ColorPreview>

      <CodeExample
        title="CSS Analogous Gradient"
        code={`/* Smooth analogous gradient */
.analogous-gradient {
  background: linear-gradient(
    135deg, 
    #3B82F6,  /* Blue */
    #059669,  /* Blue-green */
    #7C3AED   /* Blue-purple */
  );
}`}
        preview={
          <div
            className="h-20 w-full rounded-lg"
            style={{
              background: "linear-gradient(135deg, #3B82F6, #059669, #7C3AED)",
            }}
          />
        }
      />

      <h3>Triadic Colors: Vibrant Balance</h3>

      <ColorPreview
        title="Triadic Color Scheme"
        colors={[
          { name: "Red", value: "#EF4444", description: "0° on color wheel" },
          { name: "Yellow", value: "#EAB308", description: "120° rotation" },
          { name: "Blue", value: "#3B82F6", description: "240° rotation" },
        ]}
      >
        Three colors equally spaced (120°) create vibrant yet balanced
        combinations.
      </ColorPreview>

      <h2>🌡️ Color Temperature & Emotional Impact</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-red-800">
            🔥 Warm Colors
          </h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="h-16 bg-red-500 rounded"></div>
            <div className="h-16 bg-orange-500 rounded"></div>
            <div className="h-16 bg-yellow-500 rounded"></div>
          </div>
          <ul className="text-sm space-y-2 text-red-700">
            <li>
              • <strong>Energy & Excitement</strong>
            </li>
            <li>
              • <strong>Appetite Stimulation</strong>
            </li>
            <li>
              • <strong>Urgency & Action</strong>
            </li>
            <li>
              • <strong>Comfort & Warmth</strong>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">
            ❄️ Cool Colors
          </h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="h-16 bg-blue-500 rounded"></div>
            <div className="h-16 bg-green-500 rounded"></div>
            <div className="h-16 bg-purple-500 rounded"></div>
          </div>
          <ul className="text-sm space-y-2 text-blue-700">
            <li>
              • <strong>Trust & Reliability</strong>
            </li>
            <li>
              • <strong>Calm & Peace</strong>
            </li>
            <li>
              • <strong>Professionalism</strong>
            </li>
            <li>
              • <strong>Focus & Clarity</strong>
            </li>
          </ul>
        </div>
      </div>

      <h2>🧠 Color Psychology in Action</h2>

      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="w-16 h-16 bg-red-500 rounded-lg flex-shrink-0"></div>
          <div>
            <h4 className="font-semibold text-red-800">Red: Power & Urgency</h4>
            <p className="text-sm text-red-700">
              Increases heart rate, creates urgency. Perfect for sale buttons,
              error messages, and food brands.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="w-16 h-16 bg-blue-500 rounded-lg flex-shrink-0"></div>
          <div>
            <h4 className="font-semibold text-blue-800">
              Blue: Trust & Stability
            </h4>
            <p className="text-sm text-blue-700">
              Most universally accepted color. Ideal for finance, healthcare,
              and social platforms.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-16 h-16 bg-green-500 rounded-lg flex-shrink-0"></div>
          <div>
            <h4 className="font-semibold text-green-800">
              Green: Growth & Nature
            </h4>
            <p className="text-sm text-green-700">
              Represents money, nature, and "go" states. Easy on the eyes for
              extended use.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="w-16 h-16 bg-purple-500 rounded-lg flex-shrink-0"></div>
          <div>
            <h4 className="font-semibold text-purple-800">
              Purple: Luxury & Creativity
            </h4>
            <p className="text-sm text-purple-700">
              Historically rare and expensive. Perfect for beauty, creativity,
              and premium brands.
            </p>
          </div>
        </div>
      </div>

      <h2>⚖️ The 60-30-10 Rule</h2>

      <div className="my-8 p-6 bg-surface-1 border border-border rounded-lg">
        <h4 className="font-semibold mb-4">Perfect Color Balance Formula</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="h-24 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">60%</span>
            </div>
            <div className="font-medium">Dominant</div>
            <div className="text-sm text-muted">
              Neutral backgrounds, main surfaces
            </div>
          </div>
          <div className="text-center">
            <div className="h-24 bg-blue-500 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">30%</span>
            </div>
            <div className="font-medium">Secondary</div>
            <div className="text-sm text-muted">
              Main content areas, headers
            </div>
          </div>
          <div className="text-center">
            <div className="h-24 bg-orange-500 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">10%</span>
            </div>
            <div className="font-medium">Accent</div>
            <div className="text-sm text-muted">CTAs, highlights, links</div>
          </div>
        </div>
      </div>

      <CodeExample
        title="Implementing the 60-30-10 Rule in CSS"
        code={`:root {
  /* 60% - Dominant neutral */
  --color-dominant: #F8F9FA;
  
  /* 30% - Secondary brand */
  --color-secondary: #3B82F6;
  
  /* 10% - Accent highlights */
  --color-accent: #F97316;
}

body {
  background-color: var(--color-dominant);
}

.header, .sidebar {
  background-color: var(--color-secondary);
}

.cta-button, .highlight {
  background-color: var(--color-accent);
}`}
      />

      <InfoBox type="warning" title="Accessibility First">
        Beautiful color harmony means nothing if users can't read your content.
        Always test your color choices against WCAG contrast requirements: 4.5:1
        for normal text, 3:1 for large text.
      </InfoBox>

      <h2>🛠️ Practical Implementation Tips</h2>

      <div className="space-y-4">
        <div className="p-4 bg-surface-1 border border-border rounded-lg">
          <h4 className="font-semibold mb-2">✅ Do This</h4>
          <ul className="text-sm space-y-1">
            <li>
              • Start with one primary color, then build harmony relationships
            </li>
            <li>• Test colors in different lighting conditions</li>
            <li>• Consider your target audience and cultural context</li>
            <li>• Use tools like our Color Studio and Palette Builder</li>
          </ul>
        </div>

        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-red-800">❌ Avoid This</h4>
          <ul className="text-sm space-y-1 text-red-700">
            <li>• Using too many colors (stick to 2-4 main colors)</li>
            <li>• Relying only on color to convey information</li>
            <li>• Ignoring accessibility contrast requirements</li>
            <li>• Choosing colors based only on personal preference</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">
          🎓 Ready to Apply Color Theory?
        </h3>
        <p className="text-sm mb-4">
          Now that you understand the fundamentals, experiment with our color
          tools to create harmonious, effective color schemes for your projects.
        </p>
        <div className="flex gap-3 text-sm">
          <Link
            to="/tools/color/palette"
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Try Palette Builder
          </Link>
          <Link
            to="/tools/color/studio"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Color Studio
          </Link>
        </div>
      </div>
    </ArticleLayout>
  );
}
