import { ArticleLayout } from "../../components/ArticleLayout";
import {
  ColorPreview,
  CodeExample,
  InfoBox,
} from "../../components/ArticleComponents";

export function ModernCssColorFunctionsArticle() {
  return (
    <ArticleLayout
      title="Modern CSS Color Functions"
      subtitle="Comprehensive guide to CSS color functions, manipulation techniques, and practical applications"
      readTime="7 min"
      publishDate="September 2025"
      author="FrontForge Team"
    >
      <div className="text-xl text-muted leading-relaxed mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg">
        Modern CSS provides powerful color functions that go far beyond simple
        hex values and named colors. These functions enable dynamic color
        manipulation, better accessibility, and more maintainable stylesheets
        through programmatic color generation and modification.
      </div>

      <h2>🎨 RGB and RGBA Functions</h2>

      <p className="text-lg leading-relaxed">
        The <strong>rgb()</strong> and <strong>rgba()</strong> functions provide
        precise control over red, green, and blue color channels. Modern CSS
        supports flexible syntax that makes color manipulation more intuitive.
      </p>

      <ColorPreview
        title="RGB Color Examples"
        colors={[
          {
            name: "Pure Red",
            value: "rgb(255, 0, 0)",
            description: "Maximum red channel",
          },
          {
            name: "Pure Green",
            value: "rgb(0, 255, 0)",
            description: "Maximum green channel",
          },
          {
            name: "Pure Blue",
            value: "rgb(0, 0, 255)",
            description: "Maximum blue channel",
          },
          {
            name: "Custom Purple",
            value: "rgb(128, 0, 128)",
            description: "Mixed red and blue",
          },
          {
            name: "Semi-transparent",
            value: "rgba(255, 0, 0, 0.5)",
            description: "50% opacity",
          },
          {
            name: "Almost Transparent",
            value: "rgba(0, 255, 0, 0.2)",
            description: "20% opacity",
          },
        ]}
      >
        RGB values range from 0-255, while alpha values range from 0
        (transparent) to 1 (opaque).
      </ColorPreview>

      <CodeExample
        title="Modern RGB Syntax Options"
        code={`/* Traditional comma syntax */
.traditional {
  color: rgb(255, 87, 51);
  background: rgba(255, 87, 51, 0.8);
}

/* Modern space syntax */
.modern {
  color: rgb(255 87 51);
  background: rgb(255 87 51 / 0.8);
}

/* Percentage values */
.percentage {
  color: rgb(100% 34% 20%);
  background: rgb(100% 34% 20% / 80%);
}

/* CSS custom properties */
:root {
  --red: 255;
  --green: 87;
  --blue: 51;
}

.dynamic {
  color: rgb(var(--red) var(--green) var(--blue));
}`}
        preview={
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div
              className="h-16 rounded"
              style={{ backgroundColor: "rgb(255, 87, 51)" }}
            ></div>
            <div
              className="h-16 rounded"
              style={{ backgroundColor: "rgba(255, 87, 51, 0.8)" }}
            ></div>
            <div
              className="h-16 rounded"
              style={{ backgroundColor: "rgb(255 87 51)" }}
            ></div>
            <div
              className="h-16 rounded"
              style={{ backgroundColor: "rgb(100% 34% 20%)" }}
            ></div>
          </div>
        }
      />

      <h2>🌈 HSL: Intuitive Color Manipulation</h2>

      <p className="text-lg leading-relaxed">
        <strong>HSL (Hue, Saturation, Lightness)</strong> provides the most
        intuitive way to work with colors programmatically. It mirrors how
        humans naturally think about color relationships.
      </p>

      <div className="my-8 p-6 bg-surface-1 border border-border rounded-lg">
        <h3 className="font-semibold mb-4">Understanding HSL Components</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div
              className="w-20 h-20 mx-auto mb-3 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))",
              }}
            ></div>
            <h4 className="font-medium">Hue</h4>
            <p className="text-sm text-muted">0-360° on color wheel</p>
          </div>

          <div className="text-center">
            <div
              className="w-20 h-20 mx-auto mb-3 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, hsl(240, 0%, 50%), hsl(240, 100%, 50%))",
              }}
            ></div>
            <h4 className="font-medium">Saturation</h4>
            <p className="text-sm text-muted">0-100% color intensity</p>
          </div>

          <div className="text-center">
            <div
              className="w-20 h-20 mx-auto mb-3 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, hsl(240, 100%, 0%), hsl(240, 100%, 50%), hsl(240, 100%, 100%))",
              }}
            ></div>
            <h4 className="font-medium">Lightness</h4>
            <p className="text-sm text-muted">0-100% brightness</p>
          </div>
        </div>
      </div>

      <ColorPreview
        title="HSL Color Variations from Single Hue"
        colors={[
          {
            name: "Base Blue",
            value: "hsl(240, 100%, 50%)",
            description: "H:240° S:100% L:50%",
          },
          {
            name: "Light Blue",
            value: "hsl(240, 100%, 75%)",
            description: "Increased lightness",
          },
          {
            name: "Dark Blue",
            value: "hsl(240, 100%, 25%)",
            description: "Decreased lightness",
          },
          {
            name: "Muted Blue",
            value: "hsl(240, 50%, 50%)",
            description: "Reduced saturation",
          },
          {
            name: "Pale Blue",
            value: "hsl(240, 30%, 80%)",
            description: "Low saturation, high lightness",
          },
          {
            name: "Navy Blue",
            value: "hsl(240, 100%, 20%)",
            description: "Full saturation, low lightness",
          },
        ]}
      >
        Notice how changing just one HSL component creates logical color
        relationships.
      </ColorPreview>

      <CodeExample
        title="HSL-Based Color System"
        code={`:root {
  /* Brand color foundation */
  --primary-hue: 240;
  --primary-sat: 100%;
  
  /* Complete color palette from single hue */
  --primary-50: hsl(var(--primary-hue) var(--primary-sat) 95%);
  --primary-100: hsl(var(--primary-hue) var(--primary-sat) 90%);
  --primary-200: hsl(var(--primary-hue) var(--primary-sat) 80%);
  --primary-500: hsl(var(--primary-hue) var(--primary-sat) 50%);
  --primary-800: hsl(var(--primary-hue) var(--primary-sat) 20%);
  --primary-900: hsl(var(--primary-hue) var(--primary-sat) 10%);
}

/* Theme variations */
.theme-warm {
  --primary-hue: 25; /* Orange */
}

.theme-cool {
  --primary-hue: 200; /* Blue */
}

.theme-nature {
  --primary-hue: 120; /* Green */
}`}
        preview={
          <div className="space-y-2">
            <div className="flex gap-1">
              {[95, 90, 80, 50, 20, 10].map((lightness) => (
                <div
                  key={lightness}
                  className="h-8 flex-1 rounded"
                  style={{ backgroundColor: `hsl(240, 100%, ${lightness}%)` }}
                ></div>
              ))}
            </div>
            <p className="text-xs text-muted">
              Blue palette (240° hue) with varying lightness
            </p>
          </div>
        }
      />

      <h2>🧮 Advanced Color Calculations</h2>

      <p className="text-lg leading-relaxed">
        Combine <strong>calc()</strong> with color functions to create dynamic,
        responsive color systems that adapt to user preferences and
        environmental conditions.
      </p>

      <CodeExample
        title="Dynamic Color Calculations"
        code={`:root {
  --base-hue: 240;
  --saturation-multiplier: 1;
  --lightness-offset: 0;
}

/* Responsive color adjustments */
.adaptive-colors {
  /* Base color */
  --primary: hsl(
    var(--base-hue), 
    calc(80% * var(--saturation-multiplier)), 
    calc(50% + var(--lightness-offset))
  );
  
  /* Auto-generated variations */
  --primary-light: hsl(
    var(--base-hue), 
    calc(60% * var(--saturation-multiplier)), 
    calc(75% + var(--lightness-offset))
  );
  
  --primary-dark: hsl(
    var(--base-hue), 
    calc(90% * var(--saturation-multiplier)), 
    calc(25% + var(--lightness-offset))
  );
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  :root {
    --saturation-multiplier: 0.8;
    --lightness-offset: 10%;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --saturation-multiplier: 1.2;
    --lightness-offset: 0;
  }
}`}
      />

      <h2>⚡ Interactive Color States</h2>

      <InfoBox type="tip" title="Logical Color Transitions">
        Use HSL to create intuitive hover and focus states. Slightly increase
        lightness for hover, decrease for active states, and adjust saturation
        for disabled elements.
      </InfoBox>

      <CodeExample
        title="Smart Interactive States"
        code={`.button {
  --hue: 240;
  --sat: 100%;
  --light: 50%;
  
  background: hsl(var(--hue) var(--sat) var(--light));
  transition: all 0.2s ease;
}

/* Hover: slightly lighter */
.button:hover {
  --light: 60%;
}

/* Active: slightly darker */
.button:active {
  --light: 40%;
}

/* Focus: more saturated */
.button:focus {
  --sat: 100%;
  box-shadow: 0 0 0 3px hsl(var(--hue) 50% 80%);
}

/* Disabled: desaturated */
.button:disabled {
  --sat: 30%;
  --light: 70%;
}`}
        preview={
          <div className="space-y-4">
            <div className="flex gap-4">
              <button
                className="px-4 py-2 rounded text-white"
                style={{ backgroundColor: "hsl(240, 100%, 50%)" }}
              >
                Normal
              </button>
              <button
                className="px-4 py-2 rounded text-white"
                style={{ backgroundColor: "hsl(240, 100%, 60%)" }}
              >
                Hover
              </button>
              <button
                className="px-4 py-2 rounded text-white"
                style={{ backgroundColor: "hsl(240, 100%, 40%)" }}
              >
                Active
              </button>
              <button
                className="px-4 py-2 rounded text-white opacity-60"
                style={{ backgroundColor: "hsl(240, 30%, 70%)" }}
              >
                Disabled
              </button>
            </div>
            <p className="text-xs text-muted">
              Button states using HSL adjustments
            </p>
          </div>
        }
      />

      <h2>🎯 Practical Applications</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold mb-4 text-blue-800">
            ✅ Best Practices
          </h3>
          <ul className="text-sm space-y-2 text-blue-700">
            <li>
              • Use <strong>HSL for color relationships</strong> and theme
              systems
            </li>
            <li>
              • Use <strong>RGB for precise brand colors</strong> and image
              matching
            </li>
            <li>
              • <strong>Combine with custom properties</strong> for maintainable
              systems
            </li>
            <li>
              • <strong>Test in different color modes</strong> (light/dark/high
              contrast)
            </li>
          </ul>
        </div>

        <div className="p-6 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="font-semibold mb-4 text-orange-800">
            ⚠️ Performance Tips
          </h3>
          <ul className="text-sm space-y-2 text-orange-700">
            <li>
              • <strong>Pre-calculate complex variations</strong> when possible
            </li>
            <li>
              • <strong>Limit calc() usage</strong> in frequently updated
              elements
            </li>
            <li>
              • <strong>Use static values</strong> for purely decorative
              elements
            </li>
            <li>
              • <strong>Profile performance</strong> on lower-end devices
            </li>
          </ul>
        </div>
      </div>

      <h2>🚀 Future-Proofing Your Color Code</h2>

      <CodeExample
        title="Progressive Enhancement Strategy"
        code={`/* Fallback for older browsers */
.modern-color {
  background: #3B82F6; /* Hex fallback */
  background: rgb(59, 130, 246); /* RGB fallback */
  background: hsl(217, 91%, 60%); /* HSL enhancement */
}

/* Feature detection */
@supports (color: color(display-p3 1 0 0)) {
  .modern-color {
    background: color(display-p3 0.234 0.510 0.965);
  }
}

/* Color mixing when available */
@supports (background: color-mix(in lch, blue, red)) {
  .modern-color {
    background: color-mix(in lch, #3B82F6, white 20%);
  }
}`}
      />

      <InfoBox type="info" title="Browser Support">
        Modern color functions have excellent browser support. RGB/RGBA and
        HSL/HSLA work in all modern browsers, while newer functions like
        color-mix() are rapidly gaining support.
      </InfoBox>

      <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">
          🎨 Ready to Level Up Your CSS?
        </h3>
        <p className="text-sm mb-4">
          Start using modern color functions to create more maintainable,
          dynamic, and accessible color systems in your projects.
        </p>
        <div className="flex gap-3 text-sm">
          <a
            href="/tools/color/converter"
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Convert Colors
          </a>
          <a
            href="/tools/color/picker"
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Explore HSL Values
          </a>
        </div>
      </div>
    </ArticleLayout>
  );
}
