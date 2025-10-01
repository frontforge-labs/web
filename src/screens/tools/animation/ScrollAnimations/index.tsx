import { useState, useEffect, useRef, type JSX } from "react";
import { Zap } from "lucide-react";
import {
  ToolLayout,
  Button,
  Input,
  Select,
  ControlGroup,
  FullWidthGroup,
} from "@frontforge/ui";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import type { TScrollAnimationConfig } from "./types";
import {
  defaultScrollAnimationConfig,
  scrollAnimationPresets,
  generateScrollAnimationCSS,
} from "./utils";

export function ScrollAnimationsScreen(): JSX.Element {
  const [config, setConfig] = useState<TScrollAnimationConfig>(
    defaultScrollAnimationConfig
  );
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleReset = () => {
    setConfig(defaultScrollAnimationConfig);
    setVisibleItems(new Set());
  };

  const applyPreset = (presetName: string) => {
    const preset = scrollAnimationPresets[presetName];
    if (preset) {
      setConfig({ ...config, ...preset });
      setVisibleItems(new Set());
    }
  };

  const resetAnimation = () => {
    setVisibleItems(new Set());
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-demo-item");

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0"
          );

          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => new Set(prev).add(index));
            }, index * config.stagger * 1000);

            if (config.once) {
              observerRef.current?.unobserve(entry.target);
            }
          } else if (!config.once) {
            setVisibleItems((prev) => {
              const next = new Set(prev);
              next.delete(index);
              return next;
            });
          }
        });
      },
      {
        threshold: config.threshold,
        rootMargin: "0px",
      }
    );

    elements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [config.threshold, config.stagger, config.once]);

  const previewElement = (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Scroll down to see the animation effect
        </p>
        <Button variant="secondary" size="sm" onClick={resetAnimation}>
          Reset Animation
        </Button>
      </div>

      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-y-scroll max-h-[500px] p-8">
        {/* Spacer to enable scrolling */}
        <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
          Scroll Down ↓
        </div>

        {/* Demo items */}
        <div className="space-y-8">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className="scroll-demo-item bg-white rounded-lg p-6 shadow-md"
              data-index={index - 1}
              style={{
                opacity: visibleItems.has(index - 1) ? 1 : config.opacity,
                transform: visibleItems.has(index - 1)
                  ? "translateX(0) translateY(0) scale(1) rotate(0deg)"
                  : `translateX(${config.translateX}) translateY(${config.translateY}) scale(${config.scale}) rotate(${config.rotate})`,
                transition: `all ${config.duration}s ${config.easingFunction} ${config.delay}s`,
              }}
            >
              <h3 className="font-semibold text-lg mb-2">
                Scroll Item {index}
              </h3>
              <p className="text-gray-600 text-sm">
                This element animates when it enters the viewport. Threshold:{" "}
                {config.threshold * 100}%
              </p>
            </div>
          ))}
        </div>

        {/* Bottom spacer */}
        <div className="h-40 flex items-center justify-center text-gray-400 text-sm mt-8">
          End of scroll area
        </div>
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="Scroll Animation Builder"
      description="Create scroll-triggered animations with intersection observer and CSS scroll-timeline"
      icon={<Zap size={24} />}
      breadcrumbs={<Breadcrumb />}
      generatedCSS={generateScrollAnimationCSS(config)}
      onReset={handleReset}
      showPreview={true}
      previewElement={previewElement}
      controlsTitle="Scroll Animation Controls"
      controlsGridCols={2}
      iconBgClassName="bg-gradient-to-r from-yellow-500 to-orange-600"
    >
      {/* Quick Presets */}
      <FullWidthGroup>
        <ControlGroup label="Animation Presets">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.keys(scrollAnimationPresets).map((preset) => (
            <Button
              key={preset}
              variant="ghost"
              size="sm"
              onClick={() => applyPreset(preset)}
            >
              {preset}
            </Button>
          ))}
          </div>
        </ControlGroup>
      </FullWidthGroup>

      {/* Trigger Settings */}
      <ControlGroup label="Threshold">
        <Input
          type="number"
          min="0"
          max="1"
          step="0.1"
          value={config.threshold}
          onChange={(e) =>
            setConfig({ ...config, threshold: parseFloat(e.target.value) || 0 })
          }
        />
      </ControlGroup>

      <ControlGroup label="Duration (s)">
        <Input
          type="number"
          min="0"
          step="0.1"
          value={config.duration}
          onChange={(e) =>
            setConfig({ ...config, duration: parseFloat(e.target.value) || 0 })
          }
        />
      </ControlGroup>

      <ControlGroup label="Easing">
        <Select
          value={config.easingFunction}
          onChange={(e) =>
            setConfig({ ...config, easingFunction: e.target.value })
          }
        >
          <option value="ease">Ease</option>
          <option value="linear">Linear</option>
          <option value="ease-in">Ease In</option>
          <option value="ease-out">Ease Out</option>
          <option value="ease-in-out">Ease In Out</option>
        </Select>
      </ControlGroup>

      <ControlGroup label="Delay (s)">
        <Input
          type="number"
          min="0"
          step="0.1"
          value={config.delay}
          onChange={(e) =>
            setConfig({ ...config, delay: parseFloat(e.target.value) || 0 })
          }
        />
      </ControlGroup>

      <ControlGroup label="Stagger (s)">
        <Input
          type="number"
          min="0"
          step="0.05"
          value={config.stagger}
          onChange={(e) =>
            setConfig({ ...config, stagger: parseFloat(e.target.value) || 0 })
          }
        />
      </ControlGroup>

      <ControlGroup label="Animate Once">
        <Select
          value={config.once ? "true" : "false"}
          onChange={(e) => setConfig({ ...config, once: e.target.value === "true" })}
        >
          <option value="true">Yes</option>
          <option value="false">No (Repeat)</option>
        </Select>
      </ControlGroup>

      {/* Initial State Properties */}
      <FullWidthGroup>
        <h3 className="text-sm font-semibold mb-3 col-span-2">Initial State (Before Trigger)</h3>
        <div className="grid grid-cols-2 gap-3 col-span-2">
          <ControlGroup label="Translate X">
            <Input
              value={config.translateX}
              onChange={(e) =>
                setConfig({ ...config, translateX: e.target.value })
              }
              placeholder="0"
            />
          </ControlGroup>

          <ControlGroup label="Translate Y">
            <Input
              value={config.translateY}
              onChange={(e) =>
                setConfig({ ...config, translateY: e.target.value })
              }
              placeholder="40px"
            />
          </ControlGroup>

          <ControlGroup label="Scale">
            <Input
              value={config.scale}
              onChange={(e) => setConfig({ ...config, scale: e.target.value })}
              placeholder="1"
            />
          </ControlGroup>

          <ControlGroup label="Rotate">
            <Input
              value={config.rotate}
              onChange={(e) => setConfig({ ...config, rotate: e.target.value })}
              placeholder="0deg"
            />
          </ControlGroup>

          <ControlGroup label="Opacity">
            <Input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={config.opacity}
              onChange={(e) =>
                setConfig({
                  ...config,
                  opacity: parseFloat(e.target.value) || 0,
                })
              }
            />
          </ControlGroup>
        </div>
      </FullWidthGroup>
    </ToolLayout>
  );
}
