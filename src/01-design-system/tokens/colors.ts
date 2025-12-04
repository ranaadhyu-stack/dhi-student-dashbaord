/**
 * DHi Student Dashboard - Color Tokens
 * 
 * Central color palette for the design system.
 * Use these constants for consistent theming.
 */

export const colors = {
  // Dark Theme Colors
  dark: {
    background: '#09090b',        // zinc-950
    surface: '#18181b',           // zinc-900
    surfaceElevated: '#27272a',   // zinc-800
    surfaceHover: '#3f3f46',      // zinc-700
    border: 'rgba(255,255,255,0.1)', // white/10
    text: {
      primary: '#fafafa',         // zinc-50
      secondary: '#a1a1aa',       // zinc-400
      muted: '#71717a',           // zinc-500
    },
  },

  // Light Theme Colors
  light: {
    background: '#f9fafb',        // gray-50
    surface: '#ffffff',           // white
    surfaceElevated: '#f3f4f6',   // gray-100
    surfaceHover: '#e5e7eb',      // gray-200
    border: '#e5e7eb',            // gray-200
    text: {
      primary: '#111827',         // gray-900
      secondary: '#6b7280',       // gray-600
      muted: '#9ca3af',           // gray-500
    },
  },

  // Brand Colors
  brand: {
    primary: '#10b981',           // emerald-500
    primaryHover: '#059669',      // emerald-600
    primaryLight: '#34d399',      // emerald-400
    primaryDark: '#064e3b',       // emerald-900
  },

  // Semantic Colors
  semantic: {
    success: '#10b981',           // emerald-500
    warning: '#f59e0b',           // amber-500
    error: '#ef4444',             // red-500
    info: '#3b82f6',              // blue-500
  },

  // Feature Module Colors
  modules: {
    dashboard: '#10b981',         // emerald-500
    examPrep: '#3b82f6',          // blue-500
    learnYourWay: '#8b5cf6',      // purple-500
    liveRooms: '#06b6d4',         // cyan-500
    researchHub: '#10b981',       // emerald-500
    wellness: '#ec4899',          // pink-500
    wallet: '#f59e0b',            // amber-500
    counseling: '#10b981',        // emerald-500
  },
} as const;

export type Theme = 'light' | 'dark';

// Helper function to get theme colors
export function getThemeColors(theme: Theme) {
  return colors[theme];
}
