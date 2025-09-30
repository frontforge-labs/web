import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TWorkspaceState } from "../lib/types";

export const useWorkspaceStore = create<TWorkspaceState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      drawerOpen: false,
      theme: "light",
      layoutPreset: "generators",

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setDrawerOpen: (open) => set({ drawerOpen: open }),
      setTheme: (theme) => set({ theme }),
      setLayoutPreset: (preset) => set({ layoutPreset: preset }),
    }),
    {
      name: "frontforge-workspace",
    }
  )
);
