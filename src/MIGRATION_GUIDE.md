# Migration Guide - Code Restructuring

**Version:** 2.4.1  
**Last Updated:** November 29, 2025  
**Purpose:** Step-by-step guide for migrating to the new folder structure

---

## 📋 Overview

This guide will help you migrate the existing DHi Student Dashboard codebase from the current flat structure to the new organized architecture without breaking functionality.

**Current Structure:**
```
/components/
  ├── Calendar.tsx
  ├── ExamPrep.tsx
  ├── exam/
  ├── learn/
  ├── live/
  ├── liveroom/
  └── [many more files]
```

**New Structure:**
```
/01-design-system/
/02-core-components/
/03-feature-modules/
/04-shared/
/05-layouts/
```

---

## 🎯 Migration Strategy

### Phase 1: Preparation (No Code Changes)
✅ **Completed:**
- Created `/DESIGN_SYSTEM.md` documentation
- Created `/ARCHITECTURE.md` documentation  
- Created `/01-design-system/tokens/` with color, spacing, typography constants

🔄 **Next Steps:**
1. Review both documentation files
2. Understand the new structure
3. Plan the migration timeline

**Time Estimate:** 1 hour review

---

### Phase 2: Create Folder Structure

**Goal:** Create all new folders without moving any existing files yet.

```bash
# Create design system folders
mkdir -p 01-design-system/tokens
mkdir -p 01-design-system/primitives

# Create core components folders
mkdir -p 02-core-components/buttons
mkdir -p 02-core-components/inputs
mkdir -p 02-core-components/cards
mkdir -p 02-core-components/navigation
mkdir -p 02-core-components/layout
mkdir -p 02-core-components/feedback
mkdir -p 02-core-components/data-display
mkdir -p 02-core-components/widgets

# Create feature module folders
mkdir -p 03-feature-modules/dashboard/components
mkdir -p 03-feature-modules/exam-prep/components
mkdir -p 03-feature-modules/exam-prep/modes
mkdir -p 03-feature-modules/learn-your-way/components
mkdir -p 03-feature-modules/learn-your-way/modes
mkdir -p 03-feature-modules/live-rooms/components
mkdir -p 03-feature-modules/live-rooms/modes
mkdir -p 03-feature-modules/research-hub/components
mkdir -p 03-feature-modules/calendar/components
mkdir -p 03-feature-modules/wellness/components
mkdir -p 03-feature-modules/sharepoint/components
mkdir -p 03-feature-modules/counseling/components
mkdir -p 03-feature-modules/wallet/components
mkdir -p 03-feature-modules/settings/components
mkdir -p 03-feature-modules/auth/components

# Create shared folders
mkdir -p 04-shared/contexts
mkdir -p 04-shared/hooks
mkdir -p 04-shared/utils
mkdir -p 04-shared/types
mkdir -p 04-shared/constants

# Create layouts folder
mkdir -p 05-layouts
```

**Status:** ✅ Partial (tokens folder created)

**Time Estimate:** 15 minutes

---

### Phase 3: Move Existing Components (Safe Migrations)

#### Step 3.1: Move Shared Contexts
**Priority:** High (No visual impact)

```bash
# Move notification context
mv contexts/NotificationContext.tsx 04-shared/contexts/

# Update imports in:
# - App.tsx
# - NotificationPanel.tsx
# - Any components using useNotifications
```

**Files to Update:**
- `/App.tsx` - Change import path
- `/components/NotificationPanel.tsx` - Update context import

**Test After:**
- Open app
- Trigger a notification
- Verify notifications work

**Time Estimate:** 30 minutes

---

#### Step 3.2: Move Small Reusable Components
**Priority:** Medium (Low risk)

**Components to Move:**

1. **StatCard.tsx**
```bash
# Move file
mv components/StatCard.tsx 02-core-components/cards/StatCard.tsx

# Create index
echo "export { StatCard } from './StatCard';" > 02-core-components/cards/index.ts
```

**Update imports in:**
- `/components/VisualDashboard.tsx`
- Any other files using StatCard

2. **TimelineItem.tsx**
```bash
mv components/TimelineItem.tsx 02-core-components/data-display/TimelineItem.tsx
echo "export { TimelineItem } from './TimelineItem';" > 02-core-components/data-display/index.ts
```

**Update imports in:**
- `/components/VisualDashboard.tsx`

3. **QuickActionButton.tsx**
```bash
mv components/QuickActionButton.tsx 02-core-components/widgets/QuickActionButton.tsx
echo "export { QuickActionButton } from './QuickActionButton';" > 02-core-components/widgets/index.ts
```

**Update imports in:**
- `/components/VisualDashboard.tsx`

**Test After Each Move:**
- Open Dashboard tab
- Verify all components render correctly
- Check for console errors

**Time Estimate:** 1 hour

---

#### Step 3.3: Move Navigation Components
**Priority:** High (Used app-wide)

1. **Sidebar.tsx**
```bash
mv components/Sidebar.tsx 02-core-components/navigation/Sidebar.tsx
echo "export { Sidebar } from './Sidebar';" > 02-core-components/navigation/index.ts
```

2. **TopBar.tsx**
```bash
mv components/TopBar.tsx 02-core-components/navigation/TopBar.tsx
echo "export { TopBar } from './TopBar';" >> 02-core-components/navigation/index.ts
```

3. **NotificationPanel.tsx**
```bash
mv components/NotificationPanel.tsx 02-core-components/feedback/NotificationPanel.tsx
echo "export { NotificationPanel } from './NotificationPanel';" > 02-core-components/feedback/index.ts
```

**Update imports in:**
- `/App.tsx` - All three components imported here

**Test After:**
- Refresh app
- Test sidebar navigation
- Test theme toggle
- Test notifications

**Time Estimate:** 45 minutes

---

### Phase 4: Organize Feature Modules

#### Step 4.1: Dashboard Module
**Priority:** High (Main screen)

**Already in correct location:**
- `/components/VisualDashboard.tsx` → Keep here temporarily

**Action:** Update its imports to use new paths

**Files to Update:**
```tsx
// OLD imports in VisualDashboard.tsx
import { StatCard } from './StatCard';
import { TimelineItem } from './TimelineItem';
import { QuickActionButton } from './QuickActionButton';

// NEW imports
import { StatCard } from '../02-core-components/cards';
import { TimelineItem } from '../02-core-components/data-display';
import { QuickActionButton } from '../02-core-components/widgets';
```

**Test:** Open Dashboard tab, verify everything renders

**Time Estimate:** 30 minutes

---

#### Step 4.2: Exam Prep Module
**Priority:** High (Complex feature)

**Current Structure:**
```
/components/ExamPrep.tsx
/components/exam/
  ├── ExamHeader.tsx
  ├── ExamBottomBar.tsx
  ├── ExamLibraryPanel.tsx
  ├── InsightsPanel.tsx
  └── modes/
      ├── PastPapersMode.tsx
      ├── MockTestMode.tsx
      ├── MCQMode.tsx
      ├── AnswerWritingMode.tsx
      └── InstitutionalExamMode.tsx
```

**Migration Steps:**
```bash
# Move main component
mv components/ExamPrep.tsx 03-feature-modules/exam-prep/ExamPrep.tsx

# Move subcomponents
mv components/exam/ExamHeader.tsx 03-feature-modules/exam-prep/components/
mv components/exam/ExamBottomBar.tsx 03-feature-modules/exam-prep/components/
mv components/exam/ExamLibraryPanel.tsx 03-feature-modules/exam-prep/components/
mv components/exam/InsightsPanel.tsx 03-feature-modules/exam-prep/components/

# Move modes
mv components/exam/modes/* 03-feature-modules/exam-prep/modes/

# Create index
cat > 03-feature-modules/exam-prep/index.ts << 'EOF'
export { ExamPrep } from './ExamPrep';
EOF
```

**Update imports in:**
1. **ExamPrep.tsx** - Update all relative imports:
```tsx
// OLD
import { ExamHeader } from './exam/ExamHeader';
import { PastPapersMode } from './exam/modes/PastPapersMode';

// NEW
import { ExamHeader } from './components/ExamHeader';
import { PastPapersMode } from './modes/PastPapersMode';
```

2. **App.tsx** - Update import:
```tsx
// OLD
import { ExamPrep } from './components/ExamPrep';

// NEW
import { ExamPrep } from './03-feature-modules/exam-prep';
```

**Test After:**
- Open Exam Prep tab
- Test all 5 modes
- Verify panels open/close
- Check bottom bar functionality

**Time Estimate:** 1.5 hours

---

#### Step 4.3: Learn Your Way Module
**Priority:** High (Complex feature)

**Migration Steps:**
```bash
# Move main component
mv components/LearnYourWay.tsx 03-feature-modules/learn-your-way/LearnYourWay.tsx

# Move subcomponents
mv components/learn/LearnHeader.tsx 03-feature-modules/learn-your-way/components/
mv components/learn/LearnBottomBar.tsx 03-feature-modules/learn-your-way/components/
mv components/learn/LessonLibraryPanel.tsx 03-feature-modules/learn-your-way/components/
mv components/learn/SettingsPanel.tsx 03-feature-modules/learn-your-way/components/

# Move modes
mv components/learn/modes/* 03-feature-modules/learn-your-way/modes/

# Create index
cat > 03-feature-modules/learn-your-way/index.ts << 'EOF'
export { LearnYourWay } from './LearnYourWay';
EOF
```

**Update imports:** Same pattern as Exam Prep

**Test After:**
- Open Learn Your Way tab
- Test all 6 modes
- Verify panels work
- Check mode switching

**Time Estimate:** 1.5 hours

---

#### Step 4.4: Live Rooms Module
**Priority:** High (Has duplicate folders!)

**Current Problem:** Two folders with similar components:
- `/components/live/` - Has mode components
- `/components/liveroom/` - Has layout components

**Solution:** Merge both into one module

**Migration Steps:**
```bash
# Move main component
mv components/LiveRoom.tsx 03-feature-modules/live-rooms/LiveRoom.tsx

# Move components from /live/
mv components/live/RoomSelector.tsx 03-feature-modules/live-rooms/components/
mv components/live/ActiveRoom.tsx 03-feature-modules/live-rooms/components/
mv components/live/UserGrid.tsx 03-feature-modules/live-rooms/components/
mv components/live/AIBuddyPanel.tsx 03-feature-modules/live-rooms/components/
mv components/live/PublicChatPanel.tsx 03-feature-modules/live-rooms/components/
mv components/live/GroupChatPanel.tsx 03-feature-modules/live-rooms/components/

# Move components from /liveroom/
mv components/liveroom/LiveRoomHeader.tsx 03-feature-modules/live-rooms/components/
mv components/liveroom/WelcomeScreen.tsx 03-feature-modules/live-rooms/components/
mv components/liveroom/SessionSummary.tsx 03-feature-modules/live-rooms/components/
mv components/liveroom/RightPanel.tsx 03-feature-modules/live-rooms/components/

# Consolidate modes (check for duplicates!)
mv components/live/PublicMode.tsx 03-feature-modules/live-rooms/modes/
mv components/live/SoloMode.tsx 03-feature-modules/live-rooms/modes/
mv components/live/GroupMode.tsx 03-feature-modules/live-rooms/modes/
mv components/liveroom/FocusMode.tsx 03-feature-modules/live-rooms/modes/
mv components/liveroom/PublicRoom.tsx 03-feature-modules/live-rooms/modes/
mv components/liveroom/SoloRoom.tsx 03-feature-modules/live-rooms/modes/

# NOTE: Check if PublicMode and PublicRoom are duplicates
# Same with SoloMode and SoloRoom - consolidate if needed
```

**Consolidation Task:** Review and merge duplicate components

**Test After:**
- Open Live Room tab
- Test all 3 modes
- Verify video/chat works
- Check session summary

**Time Estimate:** 2 hours (includes deduplication)

---

#### Step 4.5: Research Hub Module
**Priority:** Medium

```bash
mv components/ResearchHub.tsx 03-feature-modules/research-hub/ResearchHub.tsx
mv components/research/* 03-feature-modules/research-hub/components/
echo "export { ResearchHub } from './ResearchHub';" > 03-feature-modules/research-hub/index.ts
```

**Time Estimate:** 45 minutes

---

#### Step 4.6: Simple Modules (Calendar, Wellness, etc.)
**Priority:** Medium

```bash
# Calendar
mv components/Calendar.tsx 03-feature-modules/calendar/Calendar.tsx
echo "export { Calendar } from './Calendar';" > 03-feature-modules/calendar/index.ts

# Wellness
mv components/Wellness.tsx 03-feature-modules/wellness/Wellness.tsx
echo "export { Wellness } from './Wellness';" > 03-feature-modules/wellness/index.ts

# SharePoint
mv components/SharePoint.tsx 03-feature-modules/sharepoint/SharePoint.tsx
echo "export { SharePoint } from './SharePoint';" > 03-feature-modules/sharepoint/index.ts

# Counseling
mv components/CounselingRoom.tsx 03-feature-modules/counseling/CounselingRoom.tsx
echo "export { CounselingRoom } from './CounselingRoom';" > 03-feature-modules/counseling/index.ts

# Wallet
mv components/Wallet.tsx 03-feature-modules/wallet/Wallet.tsx
echo "export { Wallet } from './Wallet';" > 03-feature-modules/wallet/index.ts

# Settings
mv components/Settings.tsx 03-feature-modules/settings/Settings.tsx
echo "export { Settings } from './Settings';" > 03-feature-modules/settings/index.ts

# Auth
mv components/Login.tsx 03-feature-modules/auth/Login.tsx
echo "export { Login } from './Login';" > 03-feature-modules/auth/index.ts
```

**Update App.tsx imports for all**

**Time Estimate:** 2 hours

---

### Phase 5: Move Utilities and Shared Code

```bash
# Move theme utils
mv lib/theme-utils.ts 04-shared/utils/theme-utils.ts

# Create shared utils index
cat > 04-shared/utils/index.ts << 'EOF'
export * from './theme-utils';
EOF

# Create shared index
cat > 04-shared/index.ts << 'EOF'
export * from './contexts';
export * from './hooks';
export * from './utils';
EOF
```

**Time Estimate:** 30 minutes

---

### Phase 6: Create Path Aliases

**Update `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/01-design-system/*": ["01-design-system/*"],
      "@/02-core-components/*": ["02-core-components/*"],
      "@/03-feature-modules/*": ["03-feature-modules/*"],
      "@/04-shared/*": ["04-shared/*"],
      "@/05-layouts/*": ["05-layouts/*"],
      "@/components/*": ["components/*"],
      "@/styles/*": ["styles/*"]
    }
  }
}
```

**Update all imports to use aliases:**
```tsx
// Before
import { StatCard } from '../../02-core-components/cards';

// After
import { StatCard } from '@/02-core-components/cards';
```

**Time Estimate:** 1 hour

---

### Phase 7: Clean Up

1. **Remove empty folders:**
```bash
rmdir components/exam/modes
rmdir components/exam
rmdir components/learn/modes
rmdir components/learn
rmdir components/live
rmdir components/liveroom
rmdir components/research
```

2. **Verify `/components/` is empty except for:**
   - `/components/ui/` (Shadcn components - keep as is)
   - `/components/figma/` (Special components - keep as is)

3. **Move remaining `/components/` to design system:**
```bash
mv components/ui/* 01-design-system/ui/
mv components/figma 01-design-system/figma
```

**Time Estimate:** 30 minutes

---

## ✅ Testing Checklist

After all migrations, test:

### Navigation
- [ ] Sidebar opens/closes
- [ ] All tabs navigate correctly
- [ ] Theme toggle works
- [ ] Notifications work
- [ ] Logout works
- [ ] Login works

### Dashboard
- [ ] All KPI cards render
- [ ] Charts display correctly
- [ ] Timeline shows items
- [ ] Quick actions work

### Exam Prep
- [ ] All 5 modes work
- [ ] Insights panel opens
- [ ] Library panel opens
- [ ] Mode switching smooth

### Learn Your Way
- [ ] All 6 modes work
- [ ] Settings panel opens
- [ ] Library panel opens
- [ ] Lesson selection works

### Live Rooms
- [ ] Room selector works
- [ ] Public mode works
- [ ] Solo mode works
- [ ] Group mode works
- [ ] Session summary shows

### Other Tabs
- [ ] Calendar renders
- [ ] Wellness works
- [ ] SharePoint loads
- [ ] Counseling interface works
- [ ] Wallet displays correctly
- [ ] Settings all categories work

---

## 🚨 Rollback Plan

If migration fails:

1. **Keep backup of `/components/` folder:**
```bash
cp -r components components_backup
```

2. **If issues occur, restore:**
```bash
rm -rf components
mv components_backup components
```

3. **Revert App.tsx imports to original paths**

---

## 📊 Time Estimates

| Phase | Task | Time |
|-------|------|------|
| 1 | Preparation | 1h |
| 2 | Create folders | 15m |
| 3.1 | Move contexts | 30m |
| 3.2 | Move small components | 1h |
| 3.3 | Move navigation | 45m |
| 4.1 | Dashboard module | 30m |
| 4.2 | Exam Prep module | 1.5h |
| 4.3 | Learn Your Way module | 1.5h |
| 4.4 | Live Rooms module | 2h |
| 4.5 | Research Hub module | 45m |
| 4.6 | Simple modules | 2h |
| 5 | Move utilities | 30m |
| 6 | Path aliases | 1h |
| 7 | Clean up | 30m |
| **Total** | | **~14 hours** |

**Recommended:** Do over 2-3 days, testing thoroughly after each phase.

---

## 🤖 AI Assistant Guidelines

When following this migration:

1. **One phase at a time** - Complete and test before moving to next
2. **Always update App.tsx** - After moving any top-level component
3. **Test after each step** - Don't proceed if tests fail
4. **Keep backups** - Copy files before moving
5. **Document issues** - Note any problems encountered
6. **Update this guide** - Add learnings for future migrations

---

**Last Updated:** November 29, 2025  
**Status:** In Progress  
**Current Phase:** Phase 1 Complete, Phase 2 Partial
