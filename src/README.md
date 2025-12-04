# DHi Student Dashboard

**Version:** 2.4.1  
**Last Updated:** November 29, 2025

A comprehensive, AI-powered learning platform for students with dark-first design, minimal aesthetics, and enterprise-level functionality.

---

## 📚 Documentation Index

### For AI Assistants (START HERE)
**[AI_REFERENCE.md](./AI_REFERENCE.md)** - Quick reference guide for AI assistants  
↳ Your first stop for any task. Contains quick answers and links to detailed docs.

### Design & Development
**[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Complete design system documentation  
↳ Colors, typography, spacing, components, patterns, and guidelines.

**[ARCHITECTURE.md](./ARCHITECTURE.md)** - Code structure and organization  
↳ Folder structure, naming conventions, component architecture.

**[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Step-by-step restructuring plan  
↳ How to migrate from current flat structure to organized architecture.

### Setup & Configuration
**[QUICK_START.md](./QUICK_START.md)** - Getting started guide  
↳ Installation, setup, and running the application.

**[THEME_IMPLEMENTATION_GUIDE.md](./THEME_IMPLEMENTATION_GUIDE.md)** - Theme system details  
↳ How the light/dark theme system works.

---

## 🚀 Quick Start

### Installation
```bash
npm install
npm run dev
```

### First-Time Setup
1. Read [AI_REFERENCE.md](./AI_REFERENCE.md) for quick overview
2. Review [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for design rules
3. Check [ARCHITECTURE.md](./ARCHITECTURE.md) for code structure

---

## 🏗️ Project Structure

### Current State (Transitional)
The project is currently in migration from a flat structure to an organized, modular architecture.

**Current Location:** Most components are in `/components/`  
**Target Location:** Organized into 5 main folders:

```
/01-design-system/      ✅ Design tokens, primitives, UI library
/02-core-components/    ⏳ Reusable components (buttons, cards, navigation)
/03-feature-modules/    ⏳ Feature-specific screens and logic
/04-shared/             ⏳ Utilities, hooks, contexts
/05-layouts/            ⏳ Layout wrappers
```

**Migration Status:** Phase 1 complete (Documentation + Design Tokens)  
**Next Step:** Follow [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)

---

## 🎨 Design Philosophy

### Core Principles
- **Minimal & Clean**: Apple-level minimalism
- **Dark-First**: Zinc color palette, optimized for dark mode
- **Distraction-Free**: Corporate-educational aesthetic
- **Smooth Transitions**: 500ms ease-out animations
- **No Loud Colors**: Emerald green for primary actions only

### Visual Guidelines
- Rounded corners (`rounded-xl` for cards, `rounded-lg` for buttons)
- Minimal shadows (borders with `border-white/10`)
- Clean typography (Inter font, semantic HTML)
- Glassmorphism for premium feel

---

## 🧩 Features

### Main Modules
1. **Dashboard** - Visual analytics with KPIs, charts, and timeline
2. **Exam Prep** - 5 exam modes (Past Papers, Mock Tests, MCQ, etc.)
3. **Learn Your Way** - 6 learning modes (Flashcards, Story, Mind Map, etc.)
4. **Live Rooms** - Public, Solo, and Group study modes
5. **Research Hub (Chapter Studio)** - AI-powered research with ChatGPT-style interface
6. **Calendar** - Enterprise-level event management
7. **Wellness** - Mood tracking, meal logging, exercise, journal
8. **SharePoint** - 3-panel file explorer
9. **Counseling** - 1:1 session booking and chat
10. **Wallet** - XP tracking, cashout, rewards store
11. **Settings** - 9 categories (Profile, Security, Subscription, etc.)

### Core Features
- Premium login screen with glassmorphism
- Notification system with real-time updates
- Credits tracking with hover dropdown
- Theme toggle (light/dark)
- Responsive design (mobile + desktop)
- Premium chat interfaces (ChatGPT-style)

---

## 🎯 Tech Stack

### Frontend
- **React** 18+ with TypeScript
- **Tailwind CSS** v4.0 for styling
- **Lucide React** for icons
- **Motion/React** for animations (formerly Framer Motion)
- **Recharts** for data visualization

### UI Components
- **Shadcn UI** for primitives
- Custom component library (in progress)
- Design tokens system

### State Management
- React Context (NotificationContext)
- Local state with useState
- Custom hooks

---

## 📂 Key Files

### Root Level
```
/App.tsx                    # Main application component
/DESIGN_SYSTEM.md           # Design system documentation
/ARCHITECTURE.md            # Code architecture guide
/MIGRATION_GUIDE.md         # Migration instructions
/AI_REFERENCE.md            # AI assistant quick reference
```

### Design System
```
/01-design-system/
  /tokens/
    colors.ts               # Color palette
    spacing.ts              # Spacing scale
    typography.ts           # Font configuration
  /ui/                      # Shadcn UI components
  /figma/                   # Figma import components
```

### Components (Current)
```
/components/
  [All feature screens]     # To be migrated
  /exam/                    # Exam Prep subcomponents
  /learn/                   # Learn Your Way subcomponents
  /live/ + /liveroom/       # Live Rooms (needs consolidation)
  /research/                # Research Hub subcomponents
  /ui/                      # Shadcn UI (keep as-is)
  /figma/                   # Special components (keep as-is)
```

### Styles
```
/styles/
  globals.css               # Global CSS + Tailwind directives
```

### Contexts
```
/contexts/
  NotificationContext.tsx   # Notification system
```

---

## 🎨 Design System Highlights

### Colors (Dark Theme)
```css
Background:     #09090b  (zinc-950)
Surface:        #18181b  (zinc-900)
Border:         rgba(255,255,255,0.1)
Primary:        #10b981  (emerald-500)
Text Primary:   #fafafa  (zinc-50)
Text Secondary: #a1a1aa  (zinc-400)
```

### Spacing
```css
Standard padding:    p-6    (24px)
Standard gap:        gap-4  (16px)
Vertical spacing:    space-y-6  (24px)
```

### Typography
```tsx
// Use semantic HTML (no font-size classes)
<h1>  // Page title
<h2>  // Section heading
<h3>  // Card title
<p>   // Body text

// Add weight only when needed
style={{ fontWeight: 600 }}  // Semibold
style={{ fontWeight: 700 }}  // Bold
```

---

## 🔧 Development Workflow

### Adding New Components
1. **Check location**: Where does it belong?
   - Reusable? → `/02-core-components/`
   - Feature-specific? → `/03-feature-modules/[feature]/`
   - Design primitive? → `/01-design-system/`

2. **Follow patterns**:
   - Check [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for styling
   - Use existing components as templates
   - Support light/dark theme
   - Add proper TypeScript types

3. **Test thoroughly**:
   - Both themes
   - Responsive breakpoints
   - Hover/focus states
   - Transitions

### Modifying Existing Components
1. **Read the code first** - Understand existing patterns
2. **Preserve structure** - Don't break theme support
3. **Update documentation** - If patterns change
4. **Test after changes** - Verify nothing broke

---

## 🧪 Testing Checklist

### Visual Testing
- [ ] Component renders in dark theme
- [ ] Component renders in light theme
- [ ] Responsive on mobile (375px)
- [ ] Responsive on tablet (768px)
- [ ] Responsive on desktop (1440px+)

### Interaction Testing
- [ ] Hover states work
- [ ] Click actions trigger correctly
- [ ] Transitions are smooth (300-500ms)
- [ ] Focus states visible
- [ ] Disabled states styled correctly

### Integration Testing
- [ ] Navigation works between tabs
- [ ] Theme toggle persists
- [ ] Notifications display
- [ ] Login/logout flow works

---

## 📊 Project Statistics

- **Total Components:** 100+
- **Main Screens:** 12
- **Feature Modules:** 10
- **Lines of Code:** ~15,000
- **Design Tokens:** 3 files
- **Documentation:** 5 comprehensive files

---

## 🚀 Roadmap

### Current Phase: Code Restructuring
- [x] Create comprehensive documentation
- [x] Define design system
- [x] Create design tokens
- [ ] Migrate components to new structure
- [ ] Implement path aliases
- [ ] Clean up old folders

### Future Enhancements
- [ ] Backend integration (Supabase)
- [ ] Real-time collaboration
- [ ] File upload functionality
- [ ] Video calls in Live Rooms
- [ ] Unit tests + Storybook
- [ ] Performance optimization

---

## 🤝 Contributing

### For Developers
1. Read [AI_REFERENCE.md](./AI_REFERENCE.md) first
2. Follow [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) guidelines
3. Understand [ARCHITECTURE.md](./ARCHITECTURE.md) structure
4. Use [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for restructuring tasks

### For Designers
1. Review [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for current system
2. Maintain consistency with existing components
3. Use design tokens for colors and spacing

---

## 📝 Version History

### v2.4.1 (Current)
- Complete Settings interface
- Premium login screen
- Notification system integration
- Comprehensive documentation
- Design tokens system

### v2.4.0
- Visual Dashboard redesign
- Chapter Studio improvements
- Premium chat interfaces
- Wallet tab completion

### v2.3.0
- Live Rooms implementation
- Calendar enterprise features
- Wellness module
- SharePoint interface

---

## 📞 Support

### Documentation
- [AI_REFERENCE.md](./AI_REFERENCE.md) - Quick reference
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Design guidelines
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Code structure
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Migration steps

### Getting Help
1. Check documentation first
2. Search for similar components
3. Review existing patterns
4. Follow design system rules

---

## 📜 License

© 2025 DHi Development Team. All rights reserved.

---

## 🎯 Quick Links

| Document | Purpose | For |
|----------|---------|-----|
| [AI_REFERENCE.md](./AI_REFERENCE.md) | Quick reference guide | AI Assistants |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Complete design system | Everyone |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Code structure | Developers |
| [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) | Restructuring plan | Migration tasks |
| [QUICK_START.md](./QUICK_START.md) | Setup guide | New developers |

---

**Built with care by the DHi Development Team**  
**Optimized for AI-assisted development**  
**Designed for distraction-free learning**

---

## 💡 Pro Tips

### For AI Assistants
1. **Always** check [AI_REFERENCE.md](./AI_REFERENCE.md) first
2. **Never** add font-size classes unless requested
3. **Always** support both light and dark themes
4. **Use** design tokens from `/01-design-system/tokens/`
5. **Follow** the component creation checklist

### For Developers
1. Read documentation before coding
2. Reuse existing components
3. Test both themes
4. Keep file sizes manageable (<500 lines)
5. Follow naming conventions

---

**Last Updated:** November 29, 2025  
**Status:** Phase 1 Complete - Documentation & Design Tokens ✅  
**Next:** Phase 2 - Create Folder Structure ⏳
