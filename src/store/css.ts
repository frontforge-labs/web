import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CssState, TTool, TRule } from '../lib/types';

const createEmptyRule = (key: TTool): TRule => ({
  key,
  css: '',
  meta: {},
});

const initialRules: Record<TTool, TRule> = {
  gradient: createEmptyRule('gradient'),
  boxShadow: createEmptyRule('boxShadow'),
  borderRadius: createEmptyRule('borderRadius'),
  textShadow: createEmptyRule('textShadow'),
  transform: createEmptyRule('transform'),
  borderOutline: createEmptyRule('borderOutline'),
  color: createEmptyRule('color'),
};

export const useCssStore = create<CssState>()(
  persist(
    (set, get) => ({
      rules: initialRules,
      activeTool: null,

      applyRule: (tool, css, meta = {}) =>
        set((state) => ({
          rules: {
            ...state.rules,
            [tool]: { key: tool, css, meta },
          },
          activeTool: tool,
        })),

      setActiveTool: (tool) => set({ activeTool: tool }),

      resetTool: (tool) =>
        set((state) => ({
          rules: {
            ...state.rules,
            [tool]: createEmptyRule(tool),
          },
        })),

      resetAll: () =>
        set({
          rules: initialRules,
          activeTool: null,
        }),

      getComposedCSS: () => {
        const { rules } = get();
        const activeCSSRules = Object.values(rules)
          .filter((rule) => rule.css.trim() !== '')
          .map((rule) => rule.css)
          .join('\n');

        return activeCSSRules
          ? `.fe-preview .target {\n${activeCSSRules}\n}`
          : '';
      },
    }),
    {
      name: 'frontenzo-css',
    }
  )
);