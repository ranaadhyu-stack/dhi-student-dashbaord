# DHi Student Dashboard - Code Architecture

**Version:** 2.4.1  
**Last Updated:** November 29, 2025  
**Purpose:** Complete codebase structure documentation for developers and AI assistants

---

## 📂 Project Structure Overview

```
/
├── 01-design-system/          # Design tokens, primitives, and base components
├── 02-core-components/        # Reusable UI components
├── 03-feature-modules/        # Feature-specific screens and logic
├── 04-shared/                 # Shared utilities, hooks, contexts
├── 05-layouts/                # Layout wrappers
├── styles/                    # Global CSS and Tailwind config
├── public/                    # Static assets
└── App.tsx                    # Root application component
```

---

## 🗂️ Detailed Structure

### `/01-design-system`
**Purpose:** Foundation layer - design tokens, primitives, and atomic components

```
/01-design-system
├── /tokens
│   ├── colors.ts              # Color palette constants
│   ├── spacing.ts             # Spacing scale values
│   ├── typography.ts          # Font configurations
│   └── index.ts               # Export all tokens
│
├── /primitives
│   ├── Button.tsx             # Base button (unstyled)
│   ├── Input.tsx              # Base input (unstyled)
│   ├── Card.tsx               # Base card (unstyled)
│   ├── Badge.tsx              # Base badge
│   ├── Progress.tsx           # Base progress bar
│   └── index.ts
│
└── /ui                         # Shadcn UI primitives (existing)
    ├── button.tsx
    ├── input.tsx
    ├── card.tsx
    ├── dialog.tsx
    └── [50+ shadcn components]
```

**What Goes Here:**
- Color, spacing, typography constants
- Unstyled base components
- Shadcn UI library components
- No business logic or theme-specific styling

---

### `/02-core-components`
**Purpose:** Styled, reusable components used across multiple features

```
/02-core-components
├── /buttons
│   ├── PrimaryButton.tsx      # Emerald action button
│   ├── SecondaryButton.tsx    # Zinc secondary button
│   ├── IconButton.tsx         # Icon-only button
│   ├── DestructiveButton.tsx  # Red delete button
│   └── index.ts
│
├── /inputs
│   ├── TextInput.tsx          # Standard text input
│   ├── SearchInput.tsx        # Input with search icon
│   ├── TextArea.tsx           # Multi-line textarea
│   ├── SelectInput.tsx        # Dropdown select
│   └── index.ts
│
├── /cards
│   ├── StatCard.tsx           # KPI stat card (existing)
│   ├── FeatureCard.tsx        # Feature highlight card
│   ├── InfoCard.tsx           # Information display card
│   ├── GradientCard.tsx       # Premium gradient card
│   └── index.ts
│
├── /navigation
│   ├── Sidebar.tsx            # Main sidebar (existing)
│   ├── TopBar.tsx             # Top navigation bar (existing)
│   ├── TabBar.tsx             # Horizontal tabs
│   ├── Breadcrumbs.tsx        # Breadcrumb navigation
│   └── index.ts
│
├── /layout
│   ├── PageHeader.tsx         # Page title & actions
│   ├── Section.tsx            # Content section wrapper
│   ├── Grid.tsx               # Responsive grid wrapper
│   ├── Panel.tsx              # Side panel component
│   └── index.ts
│
├── /feedback
│   ├── NotificationPanel.tsx  # Notification panel (existing)
│   ├── Toast.tsx              # Toast notifications
│   ├── LoadingSpinner.tsx     # Loading indicator
│   ├── ErrorMessage.tsx       # Error display
│   ├── EmptyState.tsx         # Empty state placeholder
│   └── index.ts
│
├── /data-display
│   ├── TimelineItem.tsx       # Timeline entry (existing)
│   ├── ProgressBar.tsx        # Linear progress
│   ├── CircularProgress.tsx   # Circular progress
│   ├── StatBadge.tsx          # Status badge
│   └── index.ts
│
└── /widgets
    ├── QuickActionButton.tsx  # Quick action (existing)
    ├── CreditsWidget.tsx      # Credits remaining pill
    ├── UserAvatar.tsx         # User profile avatar
    └── index.ts
```

**What Goes Here:**
- Styled components used in 2+ features
- Theme-aware components
- No feature-specific logic
- Should accept `theme` prop

---

### `/03-feature-modules`
**Purpose:** Feature-specific screens, components, and business logic

```
/03-feature-modules
├── /dashboard
│   ├── VisualDashboard.tsx    # Main dashboard screen (existing)
│   ├── /components
│   │   ├── KPICard.tsx
│   │   ├── TimelineWidget.tsx
│   │   ├── XPChart.tsx
│   │   ├── WeeklyAnalytics.tsx
│   │   └── QuickActions.tsx
│   └── index.ts
│
├── /exam-prep
│   ├── ExamPrep.tsx           # Main exam screen (existing)
│   ├── /components
│   │   ├── ExamHeader.tsx     # (existing)
│   │   ├── ExamBottomBar.tsx  # (existing)
│   │   ├── ExamLibraryPanel.tsx  # (existing)
│   │   └── InsightsPanel.tsx  # (existing)
│   ├── /modes
│   │   ├── PastPapersMode.tsx # (existing)
│   │   ├── MockTestMode.tsx   # (existing)
│   │   ├── MCQMode.tsx        # (existing)
│   │   ├── AnswerWritingMode.tsx  # (existing)
│   │   └── InstitutionalExamMode.tsx  # (existing)
│   └── index.ts
│
├── /learn-your-way
│   ├── LearnYourWay.tsx       # Main learn screen (existing)
│   ├── /components
│   │   ├── LearnHeader.tsx    # (existing)
│   │   ├── LearnBottomBar.tsx # (existing)
│   │   ├── LessonLibraryPanel.tsx  # (existing)
│   │   └── SettingsPanel.tsx  # (existing)
│   ├── /modes
│   │   ├── FlashcardsMode.tsx # (existing)
│   │   ├── GamifiedMode.tsx   # (existing)
│   │   ├── StoryMode.tsx      # (existing)
│   │   ├── MindMapMode.tsx    # (existing)
│   │   ├── ThreeDMode.tsx     # (existing)
│   │   └── RealWorldMode.tsx  # (existing)
│   └── index.ts
│
├── /live-rooms
│   ├── LiveRoom.tsx           # Main live room screen (existing)
│   ├── /components
│   │   ├── RoomSelector.tsx   # (existing - from /live/)
│   │   ├── ActiveRoom.tsx     # (existing - from /live/)
│   │   ├── UserGrid.tsx       # (existing - from /live/)
│   │   ├── AIBuddyPanel.tsx   # (existing - from /live/)
│   │   ├── PublicChatPanel.tsx  # (existing - from /live/)
│   │   ├── GroupChatPanel.tsx   # (existing - from /live/)
│   │   ├── LiveRoomHeader.tsx   # (existing - from /liveroom/)
│   │   ├── WelcomeScreen.tsx    # (existing - from /liveroom/)
│   │   ├── SessionSummary.tsx   # (existing - from /liveroom/)
│   │   └── RightPanel.tsx       # (existing - from /liveroom/)
│   ├── /modes
│   │   ├── PublicMode.tsx     # (existing - from /live/ and /liveroom/)
│   │   ├── SoloMode.tsx       # (existing - from /live/ and /liveroom/)
│   │   ├── GroupMode.tsx      # (existing - from /live/)
│   │   └── FocusMode.tsx      # (existing - from /liveroom/)
│   └── index.ts
│   
│   # NOTE: Merge /live/ and /liveroom/ folders - they contain duplicate/related components
│
├── /research-hub
│   ├── ResearchHub.tsx        # Main research screen (existing)
│   ├── /components
│   │   ├── ConversationView.tsx    # (existing)
│   │   ├── DetailsPanel.tsx        # (existing)
│   │   ├── SessionsPanel.tsx       # (existing)
│   │   ├── BottomBar.tsx           # (existing)
│   │   └── CenterPrompt.tsx        # (existing)
│   └── index.ts
│
├── /calendar
│   ├── Calendar.tsx           # Main calendar screen (existing)
│   ├── /components
│   │   ├── MonthView.tsx
│   │   ├── WeekView.tsx
│   │   ├── DayView.tsx
│   │   ├── EventCard.tsx
│   │   └── EventModal.tsx
│   └── index.ts
│
├── /wellness
│   ├── Wellness.tsx           # Main wellness screen (existing)
│   ├── /components
│   │   ├── MonthNavigator.tsx
│   │   ├── MoodTracker.tsx
│   │   ├── MealCard.tsx
│   │   ├── ExerciseCard.tsx
│   │   └── JournalPanel.tsx
│   └── index.ts
│
├── /sharepoint
│   ├── SharePoint.tsx         # Main sharepoint screen (existing)
│   ├── /components
│   │   ├── FolderTree.tsx
│   │   ├── FileList.tsx
│   │   ├── FilePreview.tsx
│   │   └── UploadZone.tsx
│   └── index.ts
│
├── /counseling
│   ├── CounselingRoom.tsx     # Main counseling screen (existing)
│   ├── /components
│   │   ├── ChatInterface.tsx
│   │   ├── SessionCard.tsx
│   │   ├── ResourcesPanel.tsx
│   │   └── NotesPanel.tsx
│   └── index.ts
│
├── /wallet
│   ├── Wallet.tsx             # Main wallet screen (existing)
│   ├── /components
│   │   ├── XPTracker.tsx
│   │   ├── CashoutPanel.tsx
│   │   ├── RewardsStore.tsx
│   │   ├── CouponCard.tsx
│   │   └── RedemptionHistory.tsx
│   └── index.ts
│
├── /settings
│   ├── Settings.tsx           # Main settings screen (existing)
│   ├── /components
│   │   ├── SettingsMenu.tsx
│   │   ├── ProfileSection.tsx
│   │   ├── SecuritySection.tsx
│   │   └── SubscriptionSection.tsx
│   └── index.ts
│
└── /auth
    ├── Login.tsx              # Login screen (existing)
    ├── /components
    │   ├── LoginForm.tsx
    │   ├── PINInput.tsx
    │   └── GlassCard.tsx
    └── index.ts
```

**What Goes Here:**
- Complete feature screens
- Feature-specific components (not reused elsewhere)
- Business logic and state management
- Mode variations
- Feature-specific utilities

**Naming Convention:**
- Main screen: `FeatureName.tsx`
- Subcomponents: Descriptive names in `/components`
- Modes: `ModeName.tsx` in `/modes`

---

### `/04-shared`
**Purpose:** Shared utilities, hooks, contexts, and types

```
/04-shared
├── /contexts
│   ├── NotificationContext.tsx    # (existing)
│   ├── ThemeContext.tsx           # Theme state management
│   ├── AuthContext.tsx            # Auth state management
│   └── index.ts
│
├── /hooks
│   ├── useNotifications.ts        # Notification hook
│   ├── useTheme.ts                # Theme hook
│   ├── useAuth.ts                 # Auth hook
│   ├── useLocalStorage.ts         # Local storage hook
│   ├── useDebounce.ts             # Debounce hook
│   └── index.ts
│
├── /utils
│   ├── theme-utils.ts             # (existing)
│   ├── date-utils.ts              # Date formatting
│   ├── format-utils.ts            # Number/text formatting
│   ├── storage-utils.ts           # Local/session storage
│   └── index.ts
│
├── /types
│   ├── index.ts                   # Global TypeScript types
│   ├── theme.ts                   # Theme types
│   ├── user.ts                    # User types
│   └── api.ts                     # API response types
│
└── /constants
    ├── routes.ts                  # Route constants
    ├── config.ts                  # App configuration
    └── index.ts
```

**What Goes Here:**
- React Context providers
- Custom React hooks
- Utility functions
- TypeScript types and interfaces
- App-wide constants

---

### `/05-layouts`
**Purpose:** Layout wrapper components

```
/05-layouts
├── MainLayout.tsx             # Dashboard layout (sidebar + topbar + main)
├── AuthLayout.tsx             # Login/auth layout (centered, no nav)
├── TwoPanelLayout.tsx         # Two-panel layout (e.g., Settings)
├── ThreePanelLayout.tsx       # Three-panel layout (e.g., Research Hub)
└── index.ts
```

**What Goes Here:**
- Full-page layout components
- Navigation wrappers
- Common page structures

**Example Structure:**
```tsx
// MainLayout.tsx
export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
```

---

### `/styles`
**Purpose:** Global CSS, Tailwind config, and style utilities

```
/styles
├── globals.css                # Global CSS + Tailwind directives (existing)
└── tailwind.config.js         # Tailwind v4 config (if needed)
```

**What Goes Here:**
- Tailwind CSS imports
- Global CSS reset
- Custom CSS variables
- Font imports

---

### `/lib` (Optional - currently exists)
**Purpose:** Third-party library configurations

```
/lib
├── theme-utils.ts             # (existing)
└── [other configs]
```

---

## 🔧 Migration Plan

### Phase 1: Create New Structure
1. Create folder structure without moving files
2. Test empty structure with imports

### Phase 2: Move Core Components
1. Move `StatCard.tsx` → `/02-core-components/cards/`
2. Move `TimelineItem.tsx` → `/02-core-components/data-display/`
3. Move `QuickActionButton.tsx` → `/02-core-components/widgets/`
4. Update imports in dependent files

### Phase 3: Organize Feature Modules
1. Keep existing files in place (ExamPrep, LearnYourWay, etc.)
2. Move subcomponents into appropriate module folders:
   - `/components/exam/*` → `/03-feature-modules/exam-prep/components/`
   - `/components/learn/*` → `/03-feature-modules/learn-your-way/components/`
   - `/components/live/*` + `/components/liveroom/*` → `/03-feature-modules/live-rooms/components/`
   - `/components/research/*` → `/03-feature-modules/research-hub/components/`

### Phase 4: Consolidate Shared Code
1. Move contexts → `/04-shared/contexts/`
2. Extract reusable hooks → `/04-shared/hooks/`
3. Organize utilities → `/04-shared/utils/`

### Phase 5: Create Layouts
1. Extract layout logic from App.tsx → `/05-layouts/MainLayout.tsx`
2. Create AuthLayout for Login screen

### Phase 6: Update Imports
1. Update all import paths systematically
2. Use path aliases: `@/01-design-system/*`, `@/02-core-components/*`, etc.
3. Test each module after import updates

---

## 📝 Import Path Conventions

### Absolute Imports (Recommended)
Use path aliases defined in `tsconfig.json`:

```tsx
// From design system
import { colors } from '@/01-design-system/tokens';
import { Button } from '@/01-design-system/ui/button';

// From core components
import { StatCard } from '@/02-core-components/cards';
import { Sidebar } from '@/02-core-components/navigation';

// From feature modules
import { VisualDashboard } from '@/03-feature-modules/dashboard';
import { ExamPrep } from '@/03-feature-modules/exam-prep';

// From shared
import { useNotifications } from '@/04-shared/hooks';
import { NotificationProvider } from '@/04-shared/contexts';
import { formatDate } from '@/04-shared/utils';

// From layouts
import { MainLayout } from '@/05-layouts';
```

### Relative Imports (Within Same Module)
```tsx
// Within exam-prep module
import { ExamHeader } from './components/ExamHeader';
import { PastPapersMode } from './modes/PastPapersMode';
```

---

## 🎯 Component Ownership

### Who Owns What?

**Design System Team**
- `/01-design-system/*` - Tokens, primitives, Shadcn UI

**Core UI Team**
- `/02-core-components/*` - Reusable styled components

**Feature Teams**
- `/03-feature-modules/dashboard/*` - Dashboard team
- `/03-feature-modules/exam-prep/*` - Exam Prep team
- `/03-feature-modules/learn-your-way/*` - Learning team
- `/03-feature-modules/live-rooms/*` - Live Rooms team
- etc.

**Platform Team**
- `/04-shared/*` - Shared utilities, hooks, contexts
- `/05-layouts/*` - Layout components
- `/App.tsx` - Root app logic

---

## 📊 Dependency Graph

```
App.tsx
  └─> 05-layouts/
        └─> 02-core-components/
              └─> 01-design-system/
  └─> 03-feature-modules/
        └─> 02-core-components/
        └─> 04-shared/
              └─> 01-design-system/
```

**Rules:**
- Features can import from core-components and shared
- Core-components can import from design-system
- Design-system has no dependencies (except external libs)
- No circular dependencies between features

---

## 🚀 Benefits of This Structure

### For Developers
1. **Clear Ownership**: Know where to add/modify code
2. **Predictable**: Consistent naming and organization
3. **Scalable**: Easy to add new features without clutter
4. **Testable**: Isolated modules are easier to test

### For AI Assistants
1. **Semantic Paths**: File location indicates purpose
2. **Consistent Patterns**: Same structure in every module
3. **Clear Boundaries**: No ambiguity about where code belongs
4. **Easy Navigation**: Numbered folders indicate hierarchy

### For Codebase Health
1. **Reusability**: Core components are clearly separated
2. **Maintainability**: Changes are localized
3. **Performance**: Tree-shaking works better
4. **Onboarding**: New developers understand structure quickly

---

## 📐 File Size Guidelines

- **Small**: < 200 lines (ideal for components)
- **Medium**: 200-500 lines (acceptable for feature screens)
- **Large**: 500-1000 lines (split if possible)
- **Too Large**: > 1000 lines (must split into subcomponents)

**When to Split:**
- Complex feature screens → Extract subcomponents
- Multiple modes → Separate files in `/modes/`
- Reusable logic → Extract to `/04-shared/utils/` or hooks

---

## 🔍 Finding Components

### By Purpose
**"I need a button"** → `/02-core-components/buttons/`  
**"I need a card"** → `/02-core-components/cards/`  
**"I need exam features"** → `/03-feature-modules/exam-prep/`  
**"I need date formatting"** → `/04-shared/utils/date-utils.ts`  

### By Visual Element
**Sidebar** → `/02-core-components/navigation/Sidebar.tsx`  
**TopBar** → `/02-core-components/navigation/TopBar.tsx`  
**Notification Panel** → `/02-core-components/feedback/NotificationPanel.tsx`  

### By Feature
**Dashboard** → `/03-feature-modules/dashboard/`  
**Exam Prep** → `/03-feature-modules/exam-prep/`  
**Live Rooms** → `/03-feature-modules/live-rooms/`  

---

## 🤖 AI Assistant Instructions

### When Creating New Components

1. **Ask yourself: "Where does this belong?"**
   - Used in 1 feature only? → Feature module
   - Used in 2+ features? → Core components
   - Unstyled primitive? → Design system

2. **Check if it already exists:**
   - Search `/02-core-components/` first
   - Search feature module
   - Search design system

3. **Follow naming conventions:**
   - PascalCase for components
   - Descriptive names (e.g., `XPTracker.tsx`, not `Component.tsx`)
   - Add to `index.ts` for clean imports

4. **Add proper types:**
   - Define Props interface
   - Export component with proper type
   - Document complex props

### When Modifying Code

1. **Understand the module:**
   - Read existing code structure
   - Check related components
   - Preserve existing patterns

2. **Update dependencies:**
   - Update imports if moving files
   - Check for circular dependencies
   - Test after changes

3. **Maintain consistency:**
   - Match existing code style
   - Use same theme patterns
   - Follow spacing rules

---

## 📚 Related Documentation

- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Complete design system guide
- **[QUICK_START.md](./QUICK_START.md)** - Setup and getting started
- **[THEME_IMPLEMENTATION_GUIDE.md](./THEME_IMPLEMENTATION_GUIDE.md)** - Theme system details

---

**Last Updated:** November 29, 2025  
**Maintained By:** DHi Development Team  
**For Questions:** Refer to design system or architecture lead
