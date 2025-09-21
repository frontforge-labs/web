import { Link } from "react-router-dom";
import { ArticleLayout } from "../../components/ArticleLayout";
import {
  ColorPreview,
  CodeExample,
  InfoBox,
} from "../../components/ArticleComponents";

export function CssColorModuleArticle() {
  return (
    <ArticleLayout
      title="CSS Color Module Level 4 Specification"
      subtitle="Comprehensive guide to modern CSS color features, new functions, and advanced color manipulation techniques"
      readTime="8 min"
      publishDate="September 2025"
      author="FrontEnzo Team"
    >
      <div className="text-lg text-muted leading-relaxed mb-8 p-6 bg-surface-1 border border-border rounded-lg">
        The CSS Color Module Level 4 specification introduces revolutionary
        color capabilities that transform how developers work with colors in
        modern web applications. From wider color gamuts to perceptually uniform
        color spaces, these features enable more precise and vibrant color
        experiences.
      </div>

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"></div>
        New Color Spaces and Wider Gamuts
      </h2>

      <p className="text-base leading-relaxed mb-6">
        CSS Color Module Level 4 expands beyond traditional sRGB with
        support for wider color gamuts including P3 display, Rec2020, and Lab
        color spaces. These enable more vibrant, accurate colors that better
        match what designers see in professional graphics software.
      </p>

      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
        Display P3 Color Space
      </h3>

      <ColorPreview
        title="sRGB vs Display P3 Color Comparison"
        colors={[
          {
            name: "sRGB Red",
            value: "#FF0000",
            description: "Standard red in sRGB",
          },
          {
            name: "sRGB Green",
            value: "#00FF00",
            description: "Standard green in sRGB",
          },
          {
            name: "sRGB Blue",
            value: "#0000FF",
            description: "Standard blue in sRGB",
          },
          {
            name: "Vivid Red",
            value: "#FF2D2D",
            description: "More vibrant red (P3-like)",
          },
          {
            name: "Vivid Green",
            value: "#2DFF2D",
            description: "More vibrant green (P3-like)",
          },
          {
            name: "Vivid Blue",
            value: "#2D2DFF",
            description: "More vibrant blue (P3-like)",
          },
        ]}
      >
        P3 covers approximately 50% more colors than sRGB, enabling more vibrant
        displays on modern devices.
      </ColorPreview>

      <InfoBox type="info" title="Browser Support">
        Display P3 is supported on Safari (macOS/iOS), Chrome on wide-gamut
        displays, and newer Firefox versions. Always provide sRGB fallbacks for
        maximum compatibility.
      </InfoBox>

      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-purple-500"></div>
        LAB and LCH Color Functions
      </h3>

      <p className="text-base leading-relaxed mb-6">
        LAB and LCH represent colors in perceptually uniform color
        spaces, meaning equal numeric changes result in equal perceived color
        differences. This makes them ideal for algorithmic color manipulation
        and creating smooth color transitions.
      </p>

      <div className="my-8 p-6 bg-surface-1 border border-border rounded-lg">
        <h4 className="font-semibold mb-4">Understanding LCH Components</h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div
              className="h-16 w-full mb-3 rounded"
              style={{
                background:
                  "linear-gradient(to right, #000000, #808080, #FFFFFF)",
              }}
            ></div>
            <h5 className="font-medium">Lightness (L)</h5>
            <p className="text-sm text-muted">0% (black) to 100% (white)</p>
          </div>

          <div className="text-center">
            <div
              className="h-16 w-full mb-3 rounded"
              style={{
                background: "linear-gradient(to right, #808080, #FF6B6B)",
              }}
            ></div>
            <h5 className="font-medium">Chroma (C)</h5>
            <p className="text-sm text-muted">0 (gray) to ~130 (vivid)</p>
          </div>

          <div className="text-center">
            <div
              className="h-16 w-full mb-3 rounded"
              style={{
                background:
                  "conic-gradient(from 0deg, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)",
              }}
            ></div>
            <h5 className="font-medium">Hue (H)</h5>
            <p className="text-sm text-muted">0-360° color wheel position</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-sm"></div>
        </div>
        Advanced Color Functions
      </h2>

      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-green-500"></div>
        The color() Function
      </h3>

      <p className="text-base leading-relaxed mb-6">
        The color() function provides access to any defined color space,
        enabling precise color specification across different display
        technologies and color profiles.
      </p>

      <CodeExample
        title="Color Space Specifications"
        code={`/* Different color spaces */
.srgb-color {
  color: color(srgb 0.8 0.2 0.1);
}

.p3-color {
  color: color(display-p3 0.9 0.1 0.2);
}

.rec2020-color {
  color: color(rec2020 0.7 0.3 0.1);
}

/* With alpha transparency */
.transparent-p3 {
  background: color(display-p3 0.5 0.8 0.2 / 0.7);
}`}
        preview={
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div
              className="h-16 rounded"
              style={{ backgroundColor: "rgb(204, 51, 26)" }}
            ></div>
            <div
              className="h-16 rounded"
              style={{ backgroundColor: "rgb(230, 26, 51)" }}
            ></div>
            <div
              className="h-16 rounded"
              style={{ backgroundColor: "rgb(179, 77, 26)" }}
            ></div>
            <div
              className="h-16 rounded opacity-70"
              style={{ backgroundColor: "rgb(128, 204, 51)" }}
            ></div>
          </div>
        }
      />

      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-orange-500"></div>
        Relative Color Syntax
      </h3>

      <p className="text-base leading-relaxed mb-6">
        One of the most powerful additions is relative color syntax,
        allowing you to modify existing colors by adjusting specific components.
        This eliminates the need for complex color manipulation libraries in
        many cases.
      </p>

      <div className="my-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
        <h4 className="font-semibold mb-4 text-purple-800">
          Relative Color Examples
        </h4>
        <div className="space-y-4">
          <div className="text-sm">
            <strong>Original Color:</strong>
            <span
              className="inline-block ml-2 w-6 h-6 rounded"
              style={{ backgroundColor: "#3B82F6" }}
            ></span>
            <code className="ml-2 text-xs bg-white px-2 py-1 rounded">
              #3B82F6
            </code>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>20% Lighter:</strong>
              <span
                className="inline-block ml-2 w-6 h-6 rounded"
                style={{ backgroundColor: "#60A5FA" }}
              ></span>
              <div className="text-xs text-muted mt-1">
                lch(from #3B82F6 calc(l + 20) c h)
              </div>
            </div>

            <div>
              <strong>20% Darker:</strong>
              <span
                className="inline-block ml-2 w-6 h-6 rounded"
                style={{ backgroundColor: "#1E40AF" }}
              ></span>
              <div className="text-xs text-muted mt-1">
                lch(from #3B82F6 calc(l - 20) c h)
              </div>
            </div>

            <div>
              <strong>More Saturated:</strong>
              <span
                className="inline-block ml-2 w-6 h-6 rounded"
                style={{ backgroundColor: "#2563EB" }}
              ></span>
              <div className="text-xs text-muted mt-1">
                lch(from #3B82F6 l calc(c * 1.3) h)
              </div>
            </div>

            <div>
              <strong>Complementary:</strong>
              <span
                className="inline-block ml-2 w-6 h-6 rounded"
                style={{ backgroundColor: "#F97316" }}
              ></span>
              <div className="text-xs text-muted mt-1">
                lch(from #3B82F6 l c calc(h + 180))
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full ml-1"></div>
        </div>
        Color Mixing and Interpolation
      </h2>

      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-pink-500"></div>
        The color-mix() Function
      </h3>

      <p className="text-base leading-relaxed mb-6">
        color-mix() allows you to blend two colors in any supported color
        space, with control over the mixing ratio. This is particularly useful
        for creating color variations and themed interfaces.
      </p>

      <ColorPreview
        title="Color Mixing Examples"
        colors={[
          {
            name: "Blue Base",
            value: "#3B82F6",
            description: "Starting color",
          },
          { name: "Red Base", value: "#EF4444", description: "Mixing color" },
          {
            name: "50/50 Mix",
            value: "#A663CD",
            description: "Equal blend (approximation)",
          },
          { name: "75% Blue", value: "#5570E8", description: "Blue dominant" },
          { name: "25% Blue", value: "#D955A3", description: "Red dominant" },
          {
            name: "With White",
            value: "#9DB8FB",
            description: "Blue + 30% white",
          },
        ]}
      >
        color-mix() enables dynamic color blending that was previously
        impossible with pure CSS.
      </ColorPreview>

      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-cyan-500"></div>
        Improved Gradient Interpolation
      </h3>

      <CodeExample
        title="Advanced Gradient Interpolation"
        code={`/* Default sRGB interpolation */
.srgb-gradient {
  background: linear-gradient(to right, red, blue);
}

/* LCH interpolation for smoother transitions */
.lch-gradient {
  background: linear-gradient(in lch to right, red, blue);
}

/* Longer hue path for more colorful gradients */
.longer-hue-gradient {
  background: linear-gradient(in lch longer hue to right, red, blue);
}`}
        preview={
          <div className="space-y-2">
            <div
              className="h-12 w-full rounded"
              style={{
                background: "linear-gradient(to right, red, blue)",
              }}
            ></div>
            <p className="text-xs text-muted">Standard sRGB interpolation</p>

            <div
              className="h-12 w-full rounded"
              style={{
                background:
                  "linear-gradient(to right, #FF0000, #FF8000, #FFFF00, #80FF00, #00FF00, #00FF80, #00FFFF, #0080FF, #0000FF)",
              }}
            ></div>
            <p className="text-xs text-muted">
              LCH-style interpolation (approximation)
            </p>
          </div>
        }
      />

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
          <div className="w-4 h-1 bg-white rounded-full"></div>
        </div>
        Browser Support and Implementation
      </h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold mb-4 text-green-800 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            Well Supported
          </h3>
          <ul className="text-sm space-y-2 text-green-700">
            <li>• color() function - Modern browsers</li>
            <li>• Display P3 - Safari, Chrome on wide-gamut displays</li>
            <li>• Basic LCH/LAB - Growing support</li>
            <li>• @supports queries - Excellent detection</li>
          </ul>
        </div>

        <div className="p-6 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="font-semibold mb-4 text-orange-800 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            Emerging Support
          </h3>
          <ul className="text-sm space-y-2 text-orange-700">
            <li>• color-mix() function - Latest browsers</li>
            <li>• Relative color syntax - Very new</li>
            <li>• Complex interpolation - Partial support</li>
            <li>• Wide gamut everywhere - Future goal</li>
          </ul>
        </div>
      </div>

      <CodeExample
        title="Progressive Enhancement Strategy"
        code={`/* Layer fallbacks for maximum compatibility */
.future-color {
  /* Hex fallback for all browsers */
  background: #3B82F6;
  
  /* RGB fallback for older browsers */
  background: rgb(59, 130, 246);
  
  /* P3 enhancement for wide-gamut displays */
  background: color(display-p3 0.234 0.510 0.965);
}

/* Feature detection */
@supports (background: color-mix(in lch, blue, red)) {
  .mixed-color {
    background: color-mix(in lch, #3B82F6, white 20%);
  }
}`}
      />

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <div className="w-3 h-3 border-2 border-white rounded-full"></div>
        </div>
        Practical Applications
      </h2>

      <InfoBox type="tip" title="Start Small, Think Big">
        Begin with color() function and Display P3 for immediate visual
        improvements on supporting devices. Layer in color-mix() and relative
        syntax as browser support improves.
      </InfoBox>

      <div className="space-y-6">
        <div className="p-6 bg-surface-1 border border-border rounded-lg">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500"></div>
            Immediate Wins
          </h3>
          <ul className="text-sm space-y-2">
            <li>• Enhanced brand colors on wide-gamut displays</li>
            <li>• Smoother gradients with LCH interpolation</li>
            <li>• Better accessibility through perceptual uniformity</li>
            <li>• Dynamic theming with color manipulation</li>
          </ul>
        </div>

        <div className="p-6 bg-surface-1 border border-border rounded-lg">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-500"></div>
            Future Possibilities
          </h3>
          <ul className="text-sm space-y-2">
            <li>• Complete CSS-based color systems without JavaScript</li>
            <li>• Real-time color adaptation based on content and context</li>
            <li>• Professional color workflows matching design tools</li>
            <li>• Automatic accessibility compliance through smart color functions</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 p-8 bg-surface-1 border border-border rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500"></div>
          <h3 className="font-semibold text-lg">
            Ready for the Future of CSS Colors?
          </h3>
        </div>
        <p className="text-muted mb-6 leading-relaxed">
          Start experimenting with these advanced color features today. Even
          basic implementations can provide immediate visual improvements on
          supporting devices.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/tools/color/studio"
            className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent-hover transition-colors text-sm font-medium"
          >
            Try Color Studio
          </Link>
          <Link
            to="/tools/color/gradient"
            className="px-4 py-2 bg-surface-2 text-foreground border border-border rounded-lg hover:bg-surface-3 transition-colors text-sm font-medium"
          >
            Create Gradients
          </Link>
        </div>
      </div>
    </ArticleLayout>
  );
}
