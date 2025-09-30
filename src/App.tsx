import { Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@frontforge/ui";
import { ToolsLayout } from "./layouts/ToolsLayout";
import { ToolsHomeScreen } from "./screens/ToolsHomeScreen";
import { ColorToolsScreen } from "./screens/tools/color";
import { GradientGeneratorScreen } from "./screens/tools/color/GradientGenerator";
import { ColorStudioScreen } from "./screens/tools/color/ColorStudio";
import { ContrastCheckerScreen } from "./screens/tools/color/ContrastChecker";
import { PaletteBuilderScreen } from "./screens/tools/color/PaletteBuilder";
import { TypographyToolsScreen } from "./screens/tools/typography";
import { TextShadowScreen } from "./screens/tools/typography/TextShadow";
import { FontPairingScreen } from "./screens/tools/typography/FontPairing";
import { GradientTextScreen } from "./screens/tools/typography/GradientText";
import { VariableFontsScreen } from "./screens/tools/typography/VariableFonts";
import { EffectsScreen } from "./screens/tools/effects";
import { BoxShadowScreen } from "./screens/tools/effects/BoxShadow";
import { CSSFiltersScreen } from "./screens/tools/effects/CSSFilters";
import { GlassmorphismScreen } from "./screens/tools/effects/Glassmorphism";
import { NoiseTextureScreen } from "./screens/tools/effects/NoiseTexture";
import { ShapesScreen } from "./screens/tools/shapes";
import { BorderRadiusScreen } from "./screens/tools/shapes/BorderRadius";
import { ClipPathScreen } from "./screens/tools/shapes/ClipPath";
import { BlobGeneratorScreen } from "./screens/tools/shapes/BlobGenerator";
import { GridBuilderScreen } from "./screens/tools/shapes/GridBuilder";
import { LayoutToolsScreen } from "./screens/tools/LayoutToolsScreen";
import { FlexboxScreen } from "./screens/tools/layout/FlexboxScreen";
import { AnimationToolsScreen } from "./screens/tools/AnimationToolsScreen";
import { KeyframesScreen } from "./screens/tools/animation/KeyframesScreen";
import { DevToolsScreen } from "./screens/tools/DevToolsScreen";
import { JsonFormatterScreen } from "./screens/tools/dev/JsonFormatterScreen";
import { TextToolsScreen } from "./screens/tools/TextToolsScreen";
import { CaseConverterScreen } from "./screens/tools/text/CaseConverterScreen";
import { ArticlesScreen } from "./screens/ArticlesScreen";
import { CssColorModuleArticle } from "./screens/articles/CssColorModuleArticle";
import { AccessibilityGuidelinesArticle } from "./screens/articles/AccessibilityGuidelinesArticle";
import { ColorTheoryArticle } from "./screens/articles/ColorTheoryArticle";
import { ModernCssColorFunctionsArticle } from "./screens/articles/ModernCssColorFunctionsArticle";

function HomeScreen() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to FrontForge</h1>
        <p className="text-xl text-muted mb-8">
          Professional CSS generators and developer tools
        </p>
        <Link
          to="/tools"
          className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent-hover transition-colors shadow-sm"
        >
          Explore Tools →
        </Link>
      </div>
    </div>
  );
}

function SettingsScreen() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-surface-1 rounded-lg border border-border p-6 shadow-sm">
        <p className="text-muted">Settings panel coming soon...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="frontforge-theme">
      <ToolsLayout>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/tools" element={<ToolsHomeScreen />} />
          <Route path="/tools/color" element={<ColorToolsScreen />} />
          <Route
            path="/tools/color/gradient"
            element={<GradientGeneratorScreen />}
          />
          <Route path="/tools/color/studio" element={<ColorStudioScreen />} />
          <Route
            path="/tools/color/contrast"
            element={<ContrastCheckerScreen />}
          />
          <Route
            path="/tools/color/palette"
            element={<PaletteBuilderScreen />}
          />
          <Route path="/tools/typography" element={<TypographyToolsScreen />} />
          <Route
            path="/tools/typography/font-pairing"
            element={<FontPairingScreen />}
          />
          <Route
            path="/tools/typography/text-shadow"
            element={<TextShadowScreen />}
          />
          <Route
            path="/tools/typography/gradient-text"
            element={<GradientTextScreen />}
          />
          <Route
            path="/tools/typography/variable-fonts"
            element={<VariableFontsScreen />}
          />
          <Route path="/tools/effects" element={<EffectsScreen />} />
          <Route
            path="/tools/effects/box-shadow"
            element={<BoxShadowScreen />}
          />
          <Route
            path="/tools/effects/filters"
            element={<CSSFiltersScreen />}
          />
          <Route
            path="/tools/effects/glassmorphism"
            element={<GlassmorphismScreen />}
          />
          <Route
            path="/tools/effects/noise-texture"
            element={<NoiseTextureScreen />}
          />
          <Route path="/tools/shapes" element={<ShapesScreen />} />
          <Route
            path="/tools/shapes/border-radius"
            element={<BorderRadiusScreen />}
          />
          <Route
            path="/tools/shapes/clip-path"
            element={<ClipPathScreen />}
          />
          <Route
            path="/tools/shapes/blob-generator"
            element={<BlobGeneratorScreen />}
          />
          <Route
            path="/tools/shapes/grid-builder"
            element={<GridBuilderScreen />}
          />
          <Route path="/tools/layout" element={<LayoutToolsScreen />} />
          <Route path="/tools/layout/flexbox" element={<FlexboxScreen />} />
          <Route path="/tools/animation" element={<AnimationToolsScreen />} />
          <Route
            path="/tools/animation/keyframes"
            element={<KeyframesScreen />}
          />
          <Route path="/tools/dev-tools" element={<DevToolsScreen />} />
          <Route
            path="/tools/dev/json-formatter"
            element={<JsonFormatterScreen />}
          />
          <Route path="/tools/text-tools" element={<TextToolsScreen />} />
          <Route
            path="/tools/text/case-converter"
            element={<CaseConverterScreen />}
          />
          <Route path="/articles" element={<ArticlesScreen />} />
          <Route
            path="/articles/css-color-module"
            element={<CssColorModuleArticle />}
          />
          <Route
            path="/articles/accessibility-guidelines"
            element={<AccessibilityGuidelinesArticle />}
          />
          <Route
            path="/articles/color-theory"
            element={<ColorTheoryArticle />}
          />
          <Route
            path="/articles/modern-css-color-functions"
            element={<ModernCssColorFunctionsArticle />}
          />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
      </ToolsLayout>
    </ThemeProvider>
  );
}
