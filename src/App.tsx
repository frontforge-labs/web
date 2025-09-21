import { Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@frontenzo/ui";
import { ToolsLayout } from "./layouts/ToolsLayout";
import { ToolsHomeScreen } from "./screens/ToolsHomeScreen";
import { ColorToolsScreen } from "./screens/tools/ColorToolsScreen";
import { GradientGeneratorScreen } from "./screens/tools/color/GradientGeneratorScreen";
import { ColorStudioScreen } from "./screens/tools/color/ColorStudioScreen";
import { ContrastCheckerScreen } from "./screens/tools/color/ContrastCheckerScreen";
import { PaletteBuilderScreen } from "./screens/tools/color/PaletteBuilderScreen";
import { TypographyToolsScreen } from "./screens/tools/TypographyToolsScreen";
import { TextShadowScreen } from "./screens/tools/typography/TextShadowScreen";
import { FontPairingScreen } from "./screens/tools/typography/FontPairingScreen";
import { GradientTextScreen } from "./screens/tools/typography/GradientTextScreen";
import { VariableFontsScreen } from "./screens/tools/typography/VariableFontsScreen";
import { EffectsToolsScreen } from "./screens/tools/EffectsToolsScreen";
import { BoxShadowScreen } from "./screens/tools/effects/BoxShadowScreen";
import { ShapesToolsScreen } from "./screens/tools/ShapesToolsScreen";
import { BorderRadiusScreen } from "./screens/tools/shapes/BorderRadiusScreen";
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
        <h1 className="text-4xl font-bold mb-4">Welcome to FrontEnzo</h1>
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
    <ThemeProvider defaultTheme="system" storageKey="frontenzo-theme">
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
          <Route path="/tools/color/contrast" element={<ContrastCheckerScreen />} />
          <Route
            path="/tools/color/palette"
            element={<PaletteBuilderScreen />}
          />
          <Route path="/tools/typography" element={<TypographyToolsScreen />} />
          <Route path="/tools/typography/font-pairing" element={<FontPairingScreen />} />
          <Route path="/tools/typography/text-shadow" element={<TextShadowScreen />} />
          <Route path="/tools/typography/gradient-text" element={<GradientTextScreen />} />
          <Route path="/tools/typography/variable-fonts" element={<VariableFontsScreen />} />
          <Route path="/tools/effects" element={<EffectsToolsScreen />} />
          <Route path="/tools/effects/box-shadow" element={<BoxShadowScreen />} />
          <Route path="/tools/shapes" element={<ShapesToolsScreen />} />
          <Route path="/tools/shapes/border-radius" element={<BorderRadiusScreen />} />
          <Route path="/tools/layout" element={<LayoutToolsScreen />} />
          <Route path="/tools/layout/flexbox" element={<FlexboxScreen />} />
          <Route path="/tools/animation" element={<AnimationToolsScreen />} />
          <Route path="/tools/animation/keyframes" element={<KeyframesScreen />} />
          <Route path="/tools/dev-tools" element={<DevToolsScreen />} />
          <Route path="/tools/dev/json-formatter" element={<JsonFormatterScreen />} />
          <Route path="/tools/text-tools" element={<TextToolsScreen />} />
          <Route path="/tools/text/case-converter" element={<CaseConverterScreen />} />
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
