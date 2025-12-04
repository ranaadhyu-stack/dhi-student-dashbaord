# Theme Implementation Guide

## Quick Reference

This guide shows how to update components to support light/dark theme switching.

## Step-by-Step Process

### 1. Component Interface (✅ Already Done)
All components now have `theme: 'light' | 'dark'` in their props interface.

### 2. Visual Theme Updates (What Remains)

Replace hardcoded dark theme classes with conditional logic:

#### Pattern: Background Colors
```tsx
// ❌ Before
className="bg-zinc-950"

// ✅ After  
className={`${theme === 'dark' ? 'bg-zinc-950' : 'bg-white'}`}
```

#### Pattern: Text Colors
```tsx
// ❌ Before
className="text-white"

// ✅ After
className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}

// Secondary text
className={`${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}
```

#### Pattern: Border Colors
```tsx
// ❌ Before
className="border-zinc-800"

// ✅ After
className={`${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}
```

#### Pattern: Hover States
```tsx
// ❌ Before
className="hover:bg-zinc-800"

// ✅ After
className={`${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'}`}
```

## Complete Color Mapping Table

| Element Type | Dark Mode | Light Mode |
|--------------|-----------|------------|
| Primary BG | `bg-zinc-950` | `bg-white` or `bg-gray-50` |
| Card BG | `bg-zinc-900` | `bg-white` |
| Hover BG | `bg-zinc-800` | `bg-gray-100` |
| Primary Text | `text-white` | `text-gray-900` |
| Secondary Text | `text-zinc-300` | `text-gray-700` |
| Muted Text | `text-zinc-400` or `text-zinc-500` | `text-gray-500` or `text-gray-600` |
| Primary Border | `border-zinc-800` | `border-gray-200` |
| Secondary Border | `border-zinc-700` | `border-gray-300` |
| Input BG | `bg-zinc-900` | `bg-white` |
| Input Border | `border-zinc-800` | `border-gray-200` |
| Icon Color | `text-zinc-400` | `text-gray-600` |
| Accent (constant) | `bg-emerald-600 text-white` | `bg-emerald-600 text-white` |

## Example: Full Component Update

### Before (hardcoded dark):
```tsx
export function ExamplePanel({ isOpen, theme }: ExamplePanelProps) {
  return (
    <div className="bg-zinc-950 border-zinc-800 border-r">
      <h3 className="text-white mb-4">Title</h3>
      <input 
        className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
        placeholder="Search..."
      />
      <button className="bg-zinc-900 text-zinc-300 hover:bg-zinc-800">
        Click Me
      </button>
    </div>
  );
}
```

### After (theme-aware):
```tsx
export function ExamplePanel({ isOpen, theme }: ExamplePanelProps) {
  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-gray-200'} border-r`}>
      <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Title</h3>
      <input 
        className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'}`}
        placeholder="Search..."
      />
      <button className={`${theme === 'dark' ? 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
        Click Me
      </button>
    </div>
  );
}
```

## Components Requiring Visual Updates

### High Priority (Most Visible)
1. **LiveRoomHeader.tsx** - Top bar in live room
2. **RightPanel.tsx** - Chat panel in live room
3. **ExamLibraryPanel.tsx** - Left sidebar in exam prep
4. **InsightsPanel.tsx** - Right sidebar in exam prep

### Medium Priority  
5. **LessonLibraryPanel.tsx** - Left sidebar in learn mode
6. **SettingsPanel.tsx** - Right sidebar in learn mode
7. **SoloRoom.tsx** - Main solo room UI
8. **PublicRoom.tsx** - Main public room UI

### Lower Priority
9. **ExamBottomBar.tsx** - Bottom utility bar
10. **LearnBottomBar.tsx** - Bottom utility bar
11. **FocusMode.tsx** - Focus mode overlay
12. **SessionSummary.tsx** - End session modal

## Testing Checklist

After updating each component:
- [ ] Toggle theme button works (moon/sun icon in TopBar)
- [ ] All backgrounds switch correctly
- [ ] All text is readable in both modes
- [ ] Borders are visible in both modes
- [ ] Hover states work in both modes
- [ ] No console errors
- [ ] Component maintains layout and spacing

## Pro Tips

1. **Use Template Literals**: Combine theme classes with static classes
   ```tsx
   className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}
   ```

2. **Group Related Classes**: Keep related theme properties together
   ```tsx
   ${theme === 'dark' ? 'bg-zinc-900 text-white border-zinc-800' : 'bg-white text-gray-900 border-gray-200'}
   ```

3. **Use the Theme Utils**: Import helper functions from `/lib/theme-utils.ts`
   ```tsx
   import { themeClasses } from '../lib/theme-utils';
   // Then use: themeClasses.bg.primary(theme)
   ```

4. **Test Both Modes**: Always check your changes in both light and dark mode

5. **Maintain Consistency**: Use the color mapping table above for consistency across all components
