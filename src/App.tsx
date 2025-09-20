import { Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@frontenzo/ui';
import { ToolsLayout } from './layouts/ToolsLayout';
import { ToolsHomeScreen } from './screens/ToolsHomeScreen';
import { ColorToolsScreen } from './screens/tools/ColorToolsScreen';
import { GradientGeneratorScreen } from './screens/tools/color/GradientGeneratorScreen';

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
          <Route path="/tools/color/gradient" element={<GradientGeneratorScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
      </ToolsLayout>
    </ThemeProvider>
  );
}
