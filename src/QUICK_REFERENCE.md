# Quick Reference Card

**1-page cheat sheet for AI assistants**

---

## 📂 File Locations (Current)

```
All components:    /components/
Contexts:          /contexts/
Utils:             /lib/
Design tokens:     /01-design-system/tokens/
Documentation:     /*.md files
```

---

## 🎨 Design Rules

### Colors
```tsx
// Dark (default)
bg-zinc-950        // Background
bg-zinc-900        // Cards
border-white/10    // Borders
text-white         // Text
bg-emerald-600     // Primary actions

// Light
bg-gray-50         // Background
bg-white           // Cards
border-gray-200    // Borders
text-gray-900      // Text
```

### Spacing
```tsx
p-6       // Card padding (24px)
gap-4     // Standard gap (16px)
space-y-6 // Vertical spacing (24px)
```

### Borders
```tsx
rounded-lg   // Buttons, inputs (8px)
rounded-xl   // Cards (12px)
rounded-full // Pills, avatars
```

### Typography
```tsx
// ❌ DON'T use these:
text-2xl font-bold

// ✅ DO use these:
<h2 style={{ fontWeight: 700 }}>
```

### Transitions
```tsx
transition-all duration-300  // Standard
transition-all duration-500  // Panels
```

---

## 🧩 Component Template

```tsx
import { Icon } from 'lucide-react';

interface Props {
  theme: 'light' | 'dark';
  onAction?: () => void;
}

export function ComponentName({ theme, onAction }: Props) {
  return (
    <div className={`rounded-xl p-6 border ${
      theme === 'dark' 
        ? 'bg-zinc-900 border-white/10' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Content */}
    </div>
  );
}
```

---

## 📚 Documentation Map

```
README.md              → Overview
AI_REFERENCE.md        → Quick reference (detailed)
DESIGN_SYSTEM.md       → Complete design system
ARCHITECTURE.md        → Code structure
MIGRATION_GUIDE.md     → Step-by-step migration
STRUCTURE_VISUAL.md    → Visual before/after
PROJECT_SUMMARY.md     → Executive summary
QUICK_REFERENCE.md     → This file
```

---

## 🚨 Common Mistakes

### ❌ DON'T
```tsx
// Using font size classes
<div className="text-2xl font-bold">

// Pure black
<div className="bg-black">

// No theme support
<div className="bg-gray-800">

// Generic names
function Component() {}
```

### ✅ DO
```tsx
// Semantic HTML
<h2 style={{ fontWeight: 700 }}>

// Zinc, not black
<div className="bg-zinc-950">

// Theme support
<div className={theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}>

// Descriptive names
function KPICard() {}
```

---

## 🎯 Where to Put Code

```
Reusable component?     → /02-core-components/
Feature-specific?       → /03-feature-modules/
Utility function?       → /04-shared/utils/
React hook?             → /04-shared/hooks/
Context?                → /04-shared/contexts/
Design primitive?       → /01-design-system/
Layout wrapper?         → /05-layouts/
```

---

## 🔍 Quick Search

**"What colors?"** → DESIGN_SYSTEM.md → Color System  
**"What spacing?"** → DESIGN_SYSTEM.md → Spacing  
**"How to style?"** → DESIGN_SYSTEM.md → Components  
**"Where to put?"** → ARCHITECTURE.md → Structure  
**"How to migrate?"** → MIGRATION_GUIDE.md → Phases  

---

## ✅ Checklist

Before committing code:
- [ ] Supports light AND dark theme
- [ ] Uses design tokens
- [ ] Follows naming conventions
- [ ] Has TypeScript types
- [ ] Uses semantic HTML
- [ ] Has smooth transitions
- [ ] Imports correct
- [ ] Tested both themes

---

## 🚀 Migration Status

✅ Phase 1: Documentation (DONE)  
⏳ Phase 2: Folder structure  
⏳ Phase 3-7: Component migration  

**Next:** Create folder structure (15 min)

---

## 💡 Pro Tips

1. **Always check docs first**
2. **Never use font-size classes**
3. **Always support both themes**
4. **Use design tokens**
5. **Follow component checklist**

---

**Start here:** [AI_REFERENCE.md](./AI_REFERENCE.md)
