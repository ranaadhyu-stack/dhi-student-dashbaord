# AI Assistant Reference - DHi Student Dashboard

**Version:** 2.4.1  
**Last Updated:** November 29, 2025  
**Purpose:** Quick reference guide for AI assistants working on this project

---

## 🚀 Quick Start for AI

### First-Time Instructions
1. **Read this file first** - Contains essential quick reference
2. **Then read:** `/DESIGN_SYSTEM.md` - Complete design guidelines
3. **Then read:** `/ARCHITECTURE.md` - Code structure details
4. **For migration:** `/MIGRATION_GUIDE.md` - Step-by-step restructuring plan

---

## 📁 Current File Structure (Transitional State)

### ✅ Completed
```
/01-design-system/
  /tokens/
    ✅ colors.ts
    ✅ spacing.ts
    ✅ typography.ts
    ✅ index.ts

/DESIGN_SYSTEM.md        ✅ Complete design system documentation
/ARCHITECTURE.md         ✅ Complete architecture documentation  
/MIGRATION_GUIDE.md      ✅ Step-by-step migration plan
/AI_REFERENCE.md         ✅ This file
```

### 🔄 In Progress (Still in /components/)
```
/components/
  ├── Calendar.tsx                    → Will move to /03-feature-modules/calendar/
  ├── CounselingRoom.tsx              → Will move to /03-feature-modules/counseling/
  ├── ExamPrep.tsx                    → Will move to /03-feature-modules/exam-prep/
  ├── LearnYourWay.tsx                → Will move to /03-feature-modules/learn-your-way/
  ├── LiveRoom.tsx                    → Will move to /03-feature-modules/live-rooms/
  ├── Login.tsx                       → Will move to /03-feature-modules/auth/
  ├── NotificationPanel.tsx           → Will move to /02-core-components/feedback/
  ├── QuickActionButton.tsx           → Will move to /02-core-components/widgets/
  ├── ResearchHub.tsx                 → Will move to /03-feature-modules/research-hub/
  ├── Settings.tsx                    → Will move to /03-feature-modules/settings/
  ├── SharePoint.tsx                  → Will move to /03-feature-modules/sharepoint/
  ├── Sidebar.tsx                     → Will move to /02-core-components/navigation/
  ├── StatCard.tsx                    → Will move to /02-core-components/cards/
  ├── TimelineItem.tsx                → Will move to /02-core-components/data-display/
  ├── TopBar.tsx                      → Will move to /02-core-components/navigation/
  ├── VisualDashboard.tsx             → Will move to /03-feature-modules/dashboard/
  ├── Wallet.tsx                      → Will move to /03-feature-modules/wallet/
  ├── Wellness.tsx                    → Will move to /03-feature-modules/wellness/
  │
  ├── /exam/                          → Subcomponents for exam-prep
  ├── /learn/                         → Subcomponents for learn-your-way
  ├── /live/                          → Subcomponents for live-rooms
  ├── /liveroom/                      → More live-rooms (needs consolidation!)
  ├── /research/                      → Subcomponents for research-hub
  │
  ├── /ui/                            ✅ Keep as-is (Shadcn UI)
  └── /figma/                         ✅ Keep as-is (Special components)

/contexts/
  └── NotificationContext.tsx         → Will move to /04-shared/contexts/

/lib/
  └── theme-utils.ts                  → Will move to /04-shared/utils/
```

---

## 🎯 When to Use What

### For Design System Queries
**"What colors should I use?"**
→ `/DESIGN_SYSTEM.md` → Color System section  
→ `/01-design-system/tokens/colors.ts`

**"What spacing should I use?"**
→ `/DESIGN_SYSTEM.md` → Spacing & Layout section  
→ `/01-design-system/tokens/spacing.ts`

**"How should I style text?"**
→ `/DESIGN_SYSTEM.md` → Typography section  
→ `/01-design-system/tokens/typography.ts`

### For Component Patterns
**"How do I create a button?"**
→ `/DESIGN_SYSTEM.md` → Components Library → Buttons

**"How do I create a card?"**
→ `/DESIGN_SYSTEM.md` → Components Library → Cards

**"How do I handle theme?"**
→ `/DESIGN_SYSTEM.md` → Theme System section

### For Code Structure
**"Where should I put this new component?"**
→ `/ARCHITECTURE.md` → Component Architecture section

**"How should I organize imports?"**
→ `/ARCHITECTURE.md` → Import Path Conventions

**"What's the folder structure?"**
→ `/ARCHITECTURE.md` → Detailed Structure section

### For Migration Tasks
**"How do I move components?"**
→ `/MIGRATION_GUIDE.md` → Follow phase-by-phase plan

---

## 🎨 Design System Quick Reference

### Colors (Dark Theme - Default)
```tsx
// Backgrounds
bg-zinc-950    // Main background (#09090b)
bg-zinc-900    // Card surface (#18181b)
bg-zinc-800    // Elevated/hover (#27272a)

// Borders
border-white/10    // Standard borders

// Text
text-white         // Primary text (#fafafa)
text-zinc-400      // Secondary text (#a1a1aa)
text-zinc-500      // Muted text (#71717a)

// Primary Actions
bg-emerald-600     // Buttons
hover:bg-emerald-500

// Module Colors
exam: bg-blue-500 (#3b82f6)
learn: bg-purple-500 (#8b5cf6)
live: bg-cyan-500 (#06b6d4)
wellness: bg-pink-500 (#ec4899)
wallet: bg-amber-500 (#f59e0b)
```

### Spacing
```tsx
p-4    // 16px - Compact padding
p-6    // 24px - Standard padding
p-8    // 32px - Large padding

gap-4  // 16px - Standard gap
gap-6  // 24px - Loose gap

space-y-4  // 16px vertical spacing
space-y-6  // 24px vertical spacing
```

### Border Radius
```tsx
rounded-lg   // 8px - Buttons, inputs
rounded-xl   // 12px - Cards
rounded-2xl  // 16px - Modals
rounded-full // Pills, avatars
```

### Typography (IMPORTANT)
```tsx
// ❌ DO NOT USE unless requested:
text-xs, text-sm, text-lg, text-xl, text-2xl
font-bold, font-semibold

// ✅ USE semantic HTML:
<h1>, <h2>, <h3>  // For headings
<p>               // For body text
<label>           // For form labels

// Only add font-weight when needed:
style={{ fontWeight: 600 }}  // For labels, buttons
style={{ fontWeight: 700 }}  // For strong emphasis
```

### Transitions
```tsx
transition-all duration-300  // Quick transitions
transition-all duration-500  // Panel animations
ease-out                     // Smooth easing
```

---

## 🏗️ Component Creation Checklist

### When Creating ANY Component:

```tsx
// 1. Import in correct order
import { useState } from 'react';           // External libs
import { Icon } from 'lucide-react';        // Icons
import { Button } from '@/components/ui';   // UI components
import { useTheme } from '@/hooks';         // Hooks

// 2. Define Props interface
interface ComponentNameProps {
  theme: 'light' | 'dark';
  variant?: 'primary' | 'secondary';
  onAction?: () => void;
}

// 3. Export named function
export function ComponentName({ 
  theme, 
  variant = 'primary',
  onAction 
}: ComponentNameProps) {
  
  // 4. Use conditional theme styling
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

### Checklist:
- [ ] Props interface defined
- [ ] Theme prop included
- [ ] Conditional styling for light/dark
- [ ] Proper spacing (p-6, gap-4, etc.)
- [ ] Transitions on interactive elements
- [ ] Icons from lucide-react
- [ ] Semantic HTML elements
- [ ] No custom font size classes

---

## 🚨 Common Mistakes to Avoid

### ❌ DON'T DO THIS:
```tsx
// Using custom font sizes
<div className="text-2xl font-bold">Title</div>

// Pure black background
<div className="bg-black">

// No theme support
<div className="bg-gray-800">

// Inline styles for everything
<div style={{ padding: '24px', margin: '16px' }}>

// Generic component names
function Component() {}
```

### ✅ DO THIS:
```tsx
// Use semantic HTML
<h2 style={{ fontWeight: 700 }}>Title</h2>

// Use zinc-950, not black
<div className={theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}>

// Always support theme
<div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>

// Use Tailwind classes
<div className="p-6 mb-4">

// Descriptive names
function KPICard() {}
```

---

## 📂 File Locations (Current)

### Main Screens (Still in /components/)
```
Dashboard        → /components/VisualDashboard.tsx
Exam Prep        → /components/ExamPrep.tsx
Learn Your Way   → /components/LearnYourWay.tsx
Live Rooms       → /components/LiveRoom.tsx
Research Hub     → /components/ResearchHub.tsx
Calendar         → /components/Calendar.tsx
Wellness         → /components/Wellness.tsx
SharePoint       → /components/SharePoint.tsx
Counseling       → /components/CounselingRoom.tsx
Wallet           → /components/Wallet.tsx
Settings         → /components/Settings.tsx
Login            → /components/Login.tsx
```

### Navigation (Still in /components/)
```
Sidebar          → /components/Sidebar.tsx
TopBar           → /components/TopBar.tsx
Notifications    → /components/NotificationPanel.tsx
```

### Reusable Components (Still in /components/)
```
StatCard         → /components/StatCard.tsx
TimelineItem     → /components/TimelineItem.tsx
QuickActionButton → /components/QuickActionButton.tsx
```

### Subcomponents (Still in /components/subfolder/)
```
Exam Prep        → /components/exam/
Learn Your Way   → /components/learn/
Live Rooms       → /components/live/ + /components/liveroom/
Research Hub     → /components/research/
```

---

## 🔄 Migration Status

### Phase 1: Preparation ✅
- [x] Design system documentation created
- [x] Architecture documentation created
- [x] Migration guide created
- [x] AI reference created (this file)
- [x] Design tokens created

### Phase 2: Folder Structure 🔄
- [x] `/01-design-system/tokens/` created
- [ ] `/02-core-components/` folders needed
- [ ] `/03-feature-modules/` folders needed
- [ ] `/04-shared/` folders needed
- [ ] `/05-layouts/` folder needed

### Phase 3-7: Component Migration ⏳
- [ ] Move shared contexts
- [ ] Move reusable components
- [ ] Move navigation components
- [ ] Organize feature modules
- [ ] Move utilities
- [ ] Create path aliases
- [ ] Clean up

**Next Step:** Create remaining folder structure (See MIGRATION_GUIDE.md Phase 2)

---

## 🤖 AI Assistant Workflow

### For ANY Task, Follow This Order:

1. **Understand the request**
   - What feature/component is needed?
   - Does it already exist?
   - Where should it be placed?

2. **Check documentation**
   - Design system rules (colors, spacing, typography)
   - Component patterns (buttons, cards, inputs)
   - File structure (where to place it)

3. **Check existing code**
   - Search for similar components
   - Reuse patterns and styles
   - Follow existing conventions

4. **Write code**
   - Use design tokens
   - Support light/dark theme
   - Follow naming conventions
   - Add proper types

5. **Test mentally**
   - Does it support both themes?
   - Are transitions smooth?
   - Is spacing consistent?
   - Are imports correct?

---

## 📞 Quick Commands

### Find Component Location
```bash
# Current structure - search /components/
ls components/ | grep ComponentName

# Check subfolders
ls components/exam/
ls components/learn/
ls components/live/
```

### Check Imports
```bash
# See what a file imports
grep "import" components/ComponentName.tsx
```

### Find Usage
```bash
# Where is this component used?
grep -r "ComponentName" components/
```

---

## 📊 Project Stats

- **Total Components:** ~100+
- **Main Screens:** 12
- **Feature Modules:** 10
- **Reusable Components:** ~30
- **Shadcn UI Components:** ~50
- **Design Tokens:** 3 files (colors, spacing, typography)

---

## 🎓 Learning Path for New AI Assistants

### Day 1: Understanding
1. Read this file (AI_REFERENCE.md)
2. Skim DESIGN_SYSTEM.md
3. Look at 2-3 existing components
4. Understand theme system

### Day 2: Deep Dive
1. Read full DESIGN_SYSTEM.md
2. Read ARCHITECTURE.md
3. Study component patterns
4. Review migration plan

### Day 3: Practice
1. Make small modifications
2. Create simple components
3. Follow design system rules
4. Test theme switching

---

## 🔗 External Resources

### Tailwind CSS
- Docs: https://tailwindcss.com/docs
- Current version: v4.0

### Lucide Icons
- Browse icons: https://lucide.dev/icons
- Import: `import { IconName } from 'lucide-react'`

### React
- Version: 18+
- Hooks documentation: https://react.dev/reference/react

---

## 📝 Notes for Future Development

### Planned Features (Not Yet Implemented)
- [ ] Backend integration (Supabase)
- [ ] Real-time collaboration
- [ ] File upload to SharePoint
- [ ] Video call in Live Rooms
- [ ] Real counseling session booking

### Known Issues
- Live Rooms has duplicate folders (`/live/` and `/liveroom/`)
  - **Fix:** Consolidate during migration (Phase 4.4)
- Some components have large file sizes (>500 lines)
  - **Fix:** Split into subcomponents when refactoring

### Future Improvements
- Add unit tests
- Add Storybook for component library
- Implement proper routing
- Add error boundaries
- Optimize performance

---

## 🎯 Success Criteria

### For This Migration
- ✅ All documentation created
- ⏳ All components organized into proper folders
- ⏳ All imports updated with path aliases
- ⏳ No functionality broken
- ⏳ All tests passing

### For Code Quality
- Consistent file structure
- Clear naming conventions
- Proper TypeScript types
- Theme support everywhere
- No design system violations

---

## 🆘 Getting Help

### If You're Stuck
1. Check this file for quick reference
2. Search DESIGN_SYSTEM.md for design questions
3. Search ARCHITECTURE.md for structure questions
4. Follow MIGRATION_GUIDE.md for migration tasks

### If You Find Errors
- Document in comments
- Note in migration guide
- Update this reference file

---

**Last Updated:** November 29, 2025  
**Maintained By:** DHi Development Team  
**For AI Assistants:** Bookmark this file as your starting point for all tasks

---

## 🔍 Quick Search Index

- **Colors**: `/DESIGN_SYSTEM.md` → Color System
- **Spacing**: `/DESIGN_SYSTEM.md` → Spacing & Layout
- **Typography**: `/DESIGN_SYSTEM.md` → Typography
- **Components**: `/DESIGN_SYSTEM.md` → Components Library
- **File Structure**: `/ARCHITECTURE.md` → Detailed Structure
- **Migration Steps**: `/MIGRATION_GUIDE.md` → Phase by Phase
- **Design Tokens**: `/01-design-system/tokens/`
- **Current Code**: `/components/` (transitional location)

---

**Remember:** This is a transitional state. The goal is to reach the organized structure described in ARCHITECTURE.md. Follow MIGRATION_GUIDE.md to get there safely.
