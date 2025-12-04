# DHi Student Dashboard - Design System Documentation

**Version:** 2.4.1  
**Last Updated:** November 29, 2025  
**Purpose:** Complete design system reference for AI assistants and developers

---

## 📋 Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components Library](#components-library)
6. [Component Architecture](#component-architecture)
7. [Interaction Patterns](#interaction-patterns)
8. [Theme System](#theme-system)
9. [Code Structure](#code-structure)
10. [AI Instructions](#ai-instructions)

---

## 🎨 Design Philosophy

### Core Principles
1. **Minimal & Clean**: Apple-level minimalism with purposeful whitespace
2. **Distraction-Free**: Corporate-educational aesthetic for focus
3. **Smooth & Fluid**: 500ms ease-out transitions throughout
4. **Dark-First**: Optimized for dark mode with zinc color palette
5. **Responsive**: Mobile-first with enterprise desktop experience

### Visual Guidelines
- **No loud colors**: Use brand green (emerald) only for primary actions
- **Rounded corners**: `rounded-xl` (12px) for cards, `rounded-lg` (8px) for buttons
- **Minimal shadows**: Subtle elevation with `border-white/10` in dark mode
- **Clean typography**: Inter font, no custom font sizes unless requested
- **Glassmorphism**: Frosted glass effects for premium feel (login, overlays)

---

## 🎨 Color System

### Primary Palette

#### Dark Theme (Default)
```css
--background: #09090b;        /* zinc-950 - Main background */
--surface: #18181b;           /* zinc-900 - Card background */
--surface-elevated: #27272a;  /* zinc-800 - Hover states */
--border: rgba(255,255,255,0.1); /* white/10 - Borders */
--text-primary: #fafafa;      /* zinc-50 - Main text */
--text-secondary: #a1a1aa;    /* zinc-400 - Secondary text */
--text-muted: #71717a;        /* zinc-500 - Muted text */
```

#### Light Theme
```css
--background: #f9fafb;        /* gray-50 - Main background */
--surface: #ffffff;           /* white - Card background */
--surface-elevated: #f3f4f6;  /* gray-100 - Hover states */
--border: #e5e7eb;            /* gray-200 - Borders */
--text-primary: #111827;      /* gray-900 - Main text */
--text-secondary: #6b7280;    /* gray-600 - Secondary text */
--text-muted: #9ca3af;        /* gray-500 - Muted text */
```

### Brand Colors

#### Primary (Emerald - Success, Actions)
```css
--emerald-50: #ecfdf5;
--emerald-100: #d1fae5;
--emerald-400: #34d399;
--emerald-500: #10b981;  /* Primary action color */
--emerald-600: #059669;  /* Hover state */
--emerald-900: #064e3b;
--emerald-950: #022c22;
```

#### Semantic Colors

**Success**: Emerald (already primary)
```css
--success: #10b981;  /* emerald-500 */
```

**Warning**: Yellow/Amber
```css
--warning-light: #fef3c7;  /* amber-100 */
--warning: #f59e0b;        /* amber-500 */
--warning-dark: #d97706;   /* amber-600 */
```

**Error**: Red
```css
--error-light: #fee2e2;    /* red-100 */
--error: #ef4444;          /* red-500 */
--error-dark: #dc2626;     /* red-600 */
```

**Info**: Blue
```css
--info-light: #dbeafe;     /* blue-100 */
--info: #3b82f6;           /* blue-500 */
--info-dark: #2563eb;      /* blue-600 */
```

#### Feature Module Colors (Accent Usage)

```css
/* Dashboard */
--dashboard-primary: #10b981;  /* emerald-500 */

/* Exam Prep */
--exam-primary: #3b82f6;       /* blue-500 */
--exam-accent: #60a5fa;        /* blue-400 */

/* Learn Your Way */
--learn-primary: #8b5cf6;      /* purple-500 */
--learn-accent: #a78bfa;       /* purple-400 */

/* Live Rooms */
--live-primary: #06b6d4;       /* cyan-500 */
--live-accent: #22d3ee;        /* cyan-400 */

/* Wellness */
--wellness-primary: #ec4899;   /* pink-500 */
--wellness-accent: #f472b6;    /* pink-400 */

/* Wallet/XP */
--wallet-primary: #f59e0b;     /* amber-500 */
--wallet-accent: #fbbf24;      /* amber-400 */

/* Counseling */
--counseling-primary: #10b981; /* emerald-500 - calm */
--counseling-accent: #34d399;  /* emerald-400 */
```

### Color Usage Rules

1. **Primary Actions**: Always emerald-600 (buttons, CTAs)
2. **Hover States**: Emerald-500 (lighter for dark mode)
3. **Module Headers**: Use module-specific accent colors
4. **Status Indicators**: Use semantic colors (success/warning/error)
5. **Charts**: Multi-color gradients (emerald, blue, purple, cyan)
6. **Backgrounds**: Never use pure black (#000000), always zinc-950

---

## 📝 Typography

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Scale (Tailwind Classes)
**DO NOT use these classes unless explicitly requested:**
- `text-xs` (0.75rem / 12px)
- `text-sm` (0.875rem / 14px)
- `text-base` (1rem / 16px)
- `text-lg` (1.125rem / 18px)
- `text-xl` (1.25rem / 20px)
- `text-2xl` (1.5rem / 24px)
- `text-3xl` (1.875rem / 30px)

**Reason:** Global CSS defines default sizes for each HTML element.

### Font Weights
```css
font-weight: 400;  /* Regular - body text */
font-weight: 500;  /* Medium - subtle emphasis */
font-weight: 600;  /* Semibold - labels, buttons */
font-weight: 700;  /* Bold - headings, strong emphasis */
```

### Typography Usage

#### Headings
```tsx
// Page Title
<h1 className="text-2xl font-bold text-white">Dashboard</h1>

// Section Heading
<h2 className="text-xl font-bold text-white">Weekly Analytics</h2>

// Card Title
<h3 className="text-lg font-semibold text-white">Study Progress</h3>

// Subheading
<h4 className="text-sm font-semibold text-zinc-300">Details</h4>
```

#### Body Text
```tsx
// Primary
<p className="text-sm text-white">Main content</p>

// Secondary
<p className="text-sm text-zinc-400">Supporting text</p>

// Muted
<p className="text-xs text-zinc-500">Metadata, timestamps</p>
```

#### Labels & Buttons
```tsx
// Button Text
<button className="font-semibold">Action</button>

// Form Label
<label className="text-sm font-semibold text-zinc-300">Field Name</label>
```

### Line Height
- Headings: `leading-tight` (1.25)
- Body: `leading-normal` (1.5) - Default
- Compact: `leading-snug` (1.375)

---

## 📐 Spacing & Layout

### Spacing Scale (Tailwind)
```css
/* Base unit: 0.25rem (4px) */
1  = 0.25rem (4px)
2  = 0.5rem  (8px)
3  = 0.75rem (12px)
4  = 1rem    (16px)
5  = 1.25rem (20px)
6  = 1.5rem  (24px)
8  = 2rem    (32px)
10 = 2.5rem  (40px)
12 = 3rem    (48px)
16 = 4rem    (64px)
```

### Common Spacing Patterns

#### Card Padding
```tsx
// Standard card
<div className="p-6">  {/* 24px padding */}

// Compact card
<div className="p-4">  {/* 16px padding */}

// Large card
<div className="p-8">  {/* 32px padding */}
```

#### Gaps Between Elements
```tsx
// Tight spacing (within a component)
<div className="space-y-2">  {/* 8px vertical gap */}

// Standard spacing (between sections)
<div className="space-y-4">  {/* 16px vertical gap */}

// Loose spacing (between major sections)
<div className="space-y-6">  {/* 24px vertical gap */}
```

#### Grid Systems
```tsx
// Two-column layout
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// Three-column layout
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

// Four-column layout
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

// Auto-fit responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
```

### Border Radius
```css
rounded-sm   = 2px   /* Minimal */
rounded      = 4px   /* Default */
rounded-md   = 6px   /* Medium */
rounded-lg   = 8px   /* Buttons, inputs */
rounded-xl   = 12px  /* Cards, panels */
rounded-2xl  = 16px  /* Modal, large cards */
rounded-full = 9999px /* Pills, avatars */
```

### Component Sizing

#### Buttons
```tsx
// Small
<button className="px-3 py-1.5 text-sm">Small</button>

// Default
<button className="px-4 py-2 text-sm">Default</button>

// Large
<button className="px-6 py-3 text-base">Large</button>
```

#### Inputs
```tsx
// Standard
<input className="px-4 py-2.5 rounded-lg" />

// With icon
<input className="pl-10 pr-4 py-2.5 rounded-lg" />
```

#### Icons
```tsx
// Small: w-4 h-4 (16px)
// Default: w-5 h-5 (20px)
// Large: w-6 h-6 (24px)
// XL: w-8 h-8 (32px)
```

---

## 🧩 Components Library

### Core UI Components

#### Buttons

**Primary Button**
```tsx
<button className="px-4 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-all font-semibold">
  Primary Action
</button>
```

**Secondary Button**
```tsx
<button className="px-4 py-2.5 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-all font-semibold">
  Secondary Action
</button>
```

**Outline Button**
```tsx
<button className="px-4 py-2.5 rounded-lg border border-white/10 text-white hover:bg-zinc-800 transition-all font-semibold">
  Outline Action
</button>
```

**Destructive Button**
```tsx
<button className="px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-500 transition-all font-semibold">
  Delete
</button>
```

#### Cards

**Standard Card**
```tsx
<div className={`rounded-xl p-6 border ${
  theme === 'dark' 
    ? 'bg-zinc-900 border-white/10' 
    : 'bg-white border-gray-200'
}`}>
  {/* Content */}
</div>
```

**Gradient Card (Feature Highlight)**
```tsx
<div className={`rounded-xl p-6 border ${
  theme === 'dark'
    ? 'bg-gradient-to-br from-emerald-950/30 to-zinc-950/30 border-emerald-900/30'
    : 'bg-gradient-to-br from-emerald-50 to-gray-50 border-emerald-200'
}`}>
  {/* Content */}
</div>
```

**Stat Card**
```tsx
<div className="rounded-xl p-6 bg-zinc-900 border border-white/10">
  <div className="flex items-center gap-3 mb-2">
    <Icon className="w-5 h-5 text-emerald-400" />
    <span className="text-sm text-zinc-400">Label</span>
  </div>
  <div className="text-2xl font-bold text-white">1,234</div>
  <div className="text-xs text-zinc-500 mt-1">+12% from last week</div>
</div>
```

#### Inputs

**Text Input**
```tsx
<input
  type="text"
  placeholder="Enter text"
  className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
    theme === 'dark'
      ? 'bg-zinc-950 border-white/10 text-white focus:border-emerald-500'
      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
  }`}
/>
```

**Input with Icon**
```tsx
<div className="relative">
  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
  <input
    type="text"
    placeholder="Search"
    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white focus:border-emerald-500"
  />
</div>
```

**Textarea**
```tsx
<textarea
  rows={4}
  placeholder="Enter details"
  className="w-full px-4 py-2.5 rounded-lg border bg-zinc-950 border-white/10 text-white focus:border-emerald-500 resize-none"
/>
```

#### Toggles & Switches

**Toggle Switch**
```tsx
<button
  className={`w-12 h-6 rounded-full transition-all ${
    enabled ? 'bg-emerald-600' : 'bg-zinc-700'
  }`}
>
  <div className={`w-5 h-5 bg-white rounded-full shadow transition-all ${
    enabled ? 'ml-auto mr-0.5' : 'ml-0.5'
  }`} />
</button>
```

#### Progress Indicators

**Linear Progress Bar**
```tsx
<div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
  <div 
    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300"
    style={{ width: '65%' }}
  />
</div>
```

**Circular Progress**
```tsx
// See StatCard component for implementation
// Uses conic-gradient for circular progress
<div
  className="w-24 h-24 rounded-full"
  style={{
    background: `conic-gradient(
      ${color} ${percentage * 3.6}deg,
      ${theme === 'dark' ? '#27272a' : '#e5e7eb'} 0deg
    )`
  }}
>
  <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center">
    <span className="text-2xl font-bold">{value}%</span>
  </div>
</div>
```

#### Badges & Pills

**Status Badge**
```tsx
<span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400">
  Active
</span>
```

**Pill (Count)**
```tsx
<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-white">
  24
</span>
```

#### Navigation Components

**Tab Button**
```tsx
<button
  className={`px-4 py-2 rounded-lg transition-all ${
    active
      ? 'bg-emerald-600 text-white'
      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
  }`}
>
  Tab Name
</button>
```

**Sidebar Item**
```tsx
<button
  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
    active
      ? 'bg-emerald-600 text-white'
      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
  }`}
>
  <Icon className="w-5 h-5" />
  <span className="font-semibold">Item</span>
</button>
```

### Layout Components

#### Top Bar
- Height: `h-16` (64px)
- Background: `bg-zinc-900` (dark) / `bg-white` (light)
- Border: `border-b border-white/10`
- Contains: Logo, Credits, Theme Toggle, Notifications, Profile

#### Sidebar
- Width: `w-64` (256px desktop)
- Background: `bg-zinc-900` (dark) / `bg-white` (light)
- Border: `border-r border-white/10`
- Mobile: Full-screen overlay with slide-in animation

#### Main Content Area
- Padding: `p-6` (24px)
- Max Width: None (full width)
- Background: `bg-zinc-950` (dark) / `bg-gray-50` (light)

#### Modal Overlay
```tsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
  <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 max-w-md w-full">
    {/* Modal content */}
  </div>
</div>
```

#### Slide Panel
```tsx
<div className={`fixed right-0 top-0 h-full w-80 bg-zinc-900 border-l border-white/10 transform transition-transform duration-500 ease-out ${
  isOpen ? 'translate-x-0' : 'translate-x-full'
}`}>
  {/* Panel content */}
</div>
```

---

## 🏗️ Component Architecture

### File Structure

```
/src
  /01-design-system
    /tokens
      colors.ts              # Color constants
      spacing.ts             # Spacing values
      typography.ts          # Font configs
    /primitives
      Button.tsx             # Base button component
      Input.tsx              # Base input component
      Card.tsx               # Base card component
      
  /02-core-components
    /buttons
      PrimaryButton.tsx
      SecondaryButton.tsx
      IconButton.tsx
    /inputs
      TextInput.tsx
      SearchInput.tsx
      TextArea.tsx
    /cards
      StatCard.tsx
      FeatureCard.tsx
      InfoCard.tsx
    /navigation
      Sidebar.tsx
      TopBar.tsx
      TabBar.tsx
    /layout
      MainLayout.tsx
      AuthLayout.tsx
      TwoPanelLayout.tsx
      
  /03-feature-modules
    /dashboard
      VisualDashboard.tsx
      components/
        KPICard.tsx
        TimelineWidget.tsx
        XPChart.tsx
    /exam-prep
      ExamPrep.tsx
      components/
        ExamHeader.tsx
        ExamBottomBar.tsx
        InsightsPanel.tsx
      modes/
        PastPapersMode.tsx
        MockTestMode.tsx
        MCQMode.tsx
    /learn-your-way
      LearnYourWay.tsx
      components/
        LearnHeader.tsx
        LessonLibraryPanel.tsx
      modes/
        FlashcardsMode.tsx
        GamifiedMode.tsx
        StoryMode.tsx
    /live-rooms
      LiveRoom.tsx
      components/
        RoomSelector.tsx
        ActiveRoom.tsx
        UserGrid.tsx
      modes/
        PublicMode.tsx
        SoloMode.tsx
        GroupMode.tsx
    /research-hub
      ResearchHub.tsx
      components/
        ConversationView.tsx
        DetailsPanel.tsx
        SessionsPanel.tsx
    /calendar
      Calendar.tsx
    /wellness
      Wellness.tsx
    /sharepoint
      SharePoint.tsx
    /counseling
      CounselingRoom.tsx
    /wallet
      Wallet.tsx
    /settings
      Settings.tsx
      
  /04-shared
    /contexts
      NotificationContext.tsx
      ThemeContext.tsx
      AuthContext.tsx
    /hooks
      useNotifications.ts
      useTheme.ts
      useAuth.ts
    /utils
      theme-utils.ts
      date-utils.ts
      format-utils.ts
    /types
      index.ts
      
  /05-layouts
    MainLayout.tsx
    AuthLayout.tsx
```

### Component Naming Conventions

#### File Names
- PascalCase for components: `VisualDashboard.tsx`
- camelCase for utilities: `theme-utils.ts`
- kebab-case for styles: `global-styles.css`

#### Component Names
```tsx
// Feature screens (top-level)
export function VisualDashboard() {}

// Subcomponents
export function KPICard() {}

// Modes
export function FlashcardsMode() {}

// Layout components
export function MainLayout() {}
```

### Props Pattern
```tsx
interface ComponentProps {
  theme: 'light' | 'dark';
  variant?: 'primary' | 'secondary';
  className?: string;
  children?: React.ReactNode;
  onAction?: () => void;
}

export function Component({ 
  theme, 
  variant = 'primary',
  className = '',
  children,
  onAction 
}: ComponentProps) {
  // Implementation
}
```

---

## 🎯 Interaction Patterns

### Transitions & Animations

**Default Transition**
```css
transition-all duration-300 ease-in-out
```

**Smooth Panel Animation**
```css
transition-transform duration-500 ease-out
```

**Hover States**
```tsx
// Button hover
hover:bg-emerald-500 hover:scale-105

// Card hover
hover:border-emerald-500/50 hover:shadow-lg

// Icon hover
hover:text-emerald-400 hover:rotate-6
```

### User Feedback

**Loading States**
```tsx
<button disabled className="opacity-50 cursor-not-allowed">
  <Loader className="w-4 h-4 animate-spin" />
  Loading...
</button>
```

**Success State**
```tsx
<div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg p-4">
  <Check className="w-5 h-5 inline mr-2" />
  Success message
</div>
```

**Error State**
```tsx
<div className="bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg p-4">
  <AlertCircle className="w-5 h-5 inline mr-2" />
  Error message
</div>
```

### Focus States
```css
focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-950
```

### Disabled States
```css
disabled:opacity-50 disabled:cursor-not-allowed
```

---

## 🌓 Theme System

### Theme Structure
```tsx
type Theme = 'light' | 'dark';

interface ThemeColors {
  background: string;
  surface: string;
  border: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
}
```

### Theme Toggle
```tsx
const [theme, setTheme] = useState<'light' | 'dark'>('dark');

const toggleTheme = () => {
  setTheme(theme === 'dark' ? 'light' : 'dark');
};
```

### Conditional Styling
```tsx
className={`rounded-xl p-6 border ${
  theme === 'dark' 
    ? 'bg-zinc-900 border-white/10 text-white' 
    : 'bg-white border-gray-200 text-gray-900'
}`}
```

---

## 📂 Code Structure

### Import Order
```tsx
// 1. External libraries
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

// 2. Internal components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 3. Icons
import { ChevronRight, Bell, User } from 'lucide-react';

// 4. Utilities & contexts
import { useNotifications } from '@/contexts/NotificationContext';
import { formatDate } from '@/utils/date-utils';

// 5. Types
import type { Theme } from '@/types';
```

### Component Structure Template
```tsx
import { useState } from 'react';
import { Icon } from 'lucide-react';

interface ComponentNameProps {
  theme: 'light' | 'dark';
  variant?: string;
  onAction?: () => void;
}

export function ComponentName({ 
  theme, 
  variant = 'default',
  onAction 
}: ComponentNameProps) {
  // 1. State
  const [isActive, setIsActive] = useState(false);
  
  // 2. Hooks
  // useEffect, useContext, etc.
  
  // 3. Handlers
  const handleClick = () => {
    setIsActive(!isActive);
    onAction?.();
  };
  
  // 4. Render helpers
  const renderContent = () => {
    // Complex rendering logic
  };
  
  // 5. Main return
  return (
    <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
      {renderContent()}
    </div>
  );
}
```

---

## 🤖 AI Instructions

### For Code Generation

When generating new components or features:

1. **Always check theme**
   - Provide both light and dark theme styles
   - Use conditional className with ternary operators
   - Default to dark theme

2. **Use existing components**
   - Check `/02-core-components` first
   - Reuse patterns from similar features
   - Don't reinvent components

3. **Follow spacing rules**
   - Use `space-y-4` or `space-y-6` for vertical spacing
   - Use `gap-4` for grids
   - Use `p-6` for card padding

4. **Typography constraints**
   - DO NOT add `text-*` size classes unless requested
   - DO NOT add `font-*` weight classes unless needed
   - Use semantic HTML (h1, h2, p, etc.)

5. **Color usage**
   - Primary actions: `bg-emerald-600`
   - Hover: `hover:bg-emerald-500`
   - Borders: `border-white/10` (dark) or `border-gray-200` (light)
   - Text: `text-white` (dark) or `text-gray-900` (light)

6. **Transitions**
   - Always add `transition-all` to interactive elements
   - Use `duration-300` for quick transitions
   - Use `duration-500` for panel animations

7. **Icons**
   - Import from `lucide-react`
   - Size: `w-5 h-5` for most cases
   - Color: Match text color or use accent

### For Modifications

When modifying existing components:

1. **Preserve structure**
   - Don't change component architecture
   - Keep existing props
   - Maintain theme compatibility

2. **Use edit_tool for small changes**
   - Changes < 30% of file
   - Provide sufficient context (3-5 lines)

3. **Use write_tool for large changes**
   - Complete rewrites
   - New components
   - Major refactors

### For Debugging

Common issues and solutions:

1. **Theme not working**
   - Check if `theme` prop is passed
   - Verify conditional className syntax
   - Ensure parent provides theme

2. **Styling conflicts**
   - Check `/styles/globals.css` for defaults
   - Look for conflicting Tailwind classes
   - Verify specificity

3. **Transitions not smooth**
   - Add `transition-all`
   - Check `duration-*` value
   - Verify `ease-out` or `ease-in-out`

4. **Layout breaking**
   - Check responsive classes (`sm:`, `md:`, `lg:`)
   - Verify flex/grid setup
   - Test mobile viewport

---

## 📊 Module-Specific Guidelines

### Dashboard (VisualDashboard)
- **Layout**: 6 sections (hero cards, analytics, charts, actions, widgets)
- **Colors**: Emerald primary, multi-color charts
- **Key Feature**: Visual analytics with circular progress indicators

### Exam Prep
- **Layout**: 3-panel (header, modes, insights panel)
- **Colors**: Blue primary (#3b82f6)
- **Modes**: Past Papers, Mock Test, MCQ, Answer Writing, Institutional

### Learn Your Way
- **Layout**: 3-panel (header, content, settings/library)
- **Colors**: Purple primary (#8b5cf6)
- **Modes**: Flashcards, Gamified, Story, Mind Map, 3D Diagrams, Real World

### Live Rooms
- **Layout**: Mode selector → Active room
- **Colors**: Cyan primary (#06b6d4)
- **Modes**: Public Room, Solo Focus, Group Study

### Research Hub (Chapter Studio)
- **Layout**: Sessions panel + conversation + details panel
- **Colors**: Emerald primary
- **Key Feature**: ChatGPT-style interface with sticky footer

### Calendar
- **Layout**: Full-screen enterprise calendar
- **Colors**: Emerald events, semantic colors for categories
- **Key Feature**: Week/month/day views, event management

### Wellness
- **Layout**: Month navigation + grid cards + slide panels
- **Colors**: Pink primary (#ec4899)
- **Key Feature**: Mood tracking, meal logging, journal

### SharePoint
- **Layout**: 3-panel file explorer (folders, files, preview)
- **Colors**: Blue/teal for files
- **Key Feature**: Drag & drop, file management

### Counseling
- **Layout**: Calm, professional 1:1 chat interface
- **Colors**: Emerald calming palette
- **Key Feature**: Session booking, notes, resources

### Wallet
- **Layout**: XP tracking, cashout, rewards store, redemption history
- **Colors**: Amber/yellow for XP (#f59e0b)
- **Key Feature**: Scratch-to-reveal coupons, admin approval flow

### Settings
- **Layout**: 2-panel (menu + content)
- **Colors**: Emerald for active states
- **Categories**: Profile, Personalization, Preferences, Notifications, Security, Subscription, SharePoint, Support, About

---

## 🔗 Cross-References

### Related Documentation
- `/QUICK_START.md` - Setup instructions
- `/THEME_IMPLEMENTATION_GUIDE.md` - Theme details
- `/guidelines/Guidelines.md` - Feature guidelines

### Key Files
- `/styles/globals.css` - Global styles & tokens
- `/lib/theme-utils.ts` - Theme utility functions
- `/contexts/NotificationContext.tsx` - Notification system

---

## 📝 Version History

### v2.4.1 (Current)
- Complete Settings interface
- Premium login screen
- Notification system integration
- Credits remaining component

### v2.4.0
- Visual Dashboard redesign
- Chapter Studio improvements
- Premium chat interfaces
- Wallet tab completion

### v2.3.0
- Live Rooms full implementation
- Calendar enterprise features
- Wellness module
- SharePoint interface

---

**Last Updated:** November 29, 2025  
**Maintained By:** DHi Development Team  
**For AI Assistants:** This document should be referenced for all design and development decisions.
