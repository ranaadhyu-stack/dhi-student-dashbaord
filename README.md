# DHI Student Dashboard

A comprehensive educational dashboard application with multiple features including research tools, exam preparation, wellness tracking, live rooms, and more.

[![GitHub](https://img.shields.io/badge/GitHub-ranaadhyu--stack%2Fdhi--student--dashbaord-blue?logo=github)](https://github.com/ranaadhyu-stack/dhi-student-dashbaord)

## Project Overview

- **Name**: DHI Student Dashboard
- **Repository**: https://github.com/ranaadhyu-stack/dhi-student-dashbaord
- **Goal**: Provide students with a complete learning management system featuring personalized dashboards, research tools, exam preparation, wellness tracking, live collaborative rooms, calendar management, and financial tracking.
- **Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS, Radix UI, Framer Motion, Recharts
- **Original Design**: Figma User Dashboard

## Features Completed

### ✅ Core Features
1. **Authentication System**
   - Login page with email and PIN authentication
   - Session management
   - Logout functionality

2. **Visual Dashboard**
   - Real-time statistics cards
   - Progress tracking charts
   - Activity timeline
   - Quick action buttons
   - Performance metrics visualization

3. **Research Hub**
   - Multi-session research management
   - Source organization and citation tools
   - Note-taking capabilities
   - Research timeline tracking
   - Export research data

4. **Exam Preparation**
   - Multiple learning modes (Mock Test, Flashcards, Answer Writing, Timed Practice)
   - Question bank management
   - Progress tracking
   - Performance analytics
   - Insights panel

5. **Learn Your Way**
   - Multiple learning modes (Story Mode, Gamified Mode, Real World Mode, 3D Mode)
   - Interactive content
   - File selection and management
   - Customizable learning experience

6. **Live Room**
   - Solo study rooms
   - Public collaboration rooms
   - Focus mode with Pomodoro timer
   - Real-time collaboration features

7. **Calendar**
   - Event management
   - Task scheduling
   - Deadline tracking
   - Visual timeline view

8. **Wellness Tracker**
   - Health metrics monitoring (steps, water intake, sleep)
   - Fitness goal tracking
   - Diet management
   - Mental wellness check-ins
   - Progress visualization

9. **SharePoint**
   - File sharing and collaboration
   - Folder organization
   - Document management
   - Recent activity tracking

10. **Counseling Room**
    - Video call interface
    - Chat functionality
    - Resource sharing
    - Appointment scheduling

11. **Wallet**
    - Transaction history
    - Balance tracking
    - Payment methods management
    - Financial analytics

12. **Settings**
    - Profile management
    - Notification preferences
    - Privacy controls
    - Account settings
    - Theme customization

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/ranaadhyu-stack/dhi-student-dashbaord.git
cd dhi-student-dashbaord

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Access

- **Local Development**: http://localhost:3000
- **GitHub Repository**: https://github.com/ranaadhyu-stack/dhi-student-dashbaord

## Current Functional Entry Points

### Main Routes
- `/` - Main application entry (redirects to login or dashboard)

### Component Navigation (via Sidebar)
- `dashboard` - Visual Dashboard with statistics and charts
- `research` - Research Hub with session management
- `exam` - Exam Preparation tools and practice modes
- `learn` - Learn Your Way with multiple learning modes
- `live` - Live Room for solo and collaborative study
- `calendar` - Calendar with event and task management
- `wellness` - Wellness Tracker for health metrics
- `share` - SharePoint for file sharing
- `counseling` - Counseling Room for video consultations
- `wallet` - Wallet for financial tracking
- `settings` - Settings for account and preferences

### API Endpoints (Mock Data)
All data is currently managed in component state. Future enhancements will include:
- `/api/auth/login` - User authentication
- `/api/dashboard/stats` - Dashboard statistics
- `/api/research/sessions` - Research session data
- `/api/exam/questions` - Exam questions and answers
- `/api/calendar/events` - Calendar events
- `/api/wellness/metrics` - Health metrics
- `/api/wallet/transactions` - Transaction history

## Data Architecture

### Data Models

**User Profile**
```typescript
{
  id: string
  email: string
  name: string
  avatar?: string
  preferences: {
    theme: 'light' | 'dark'
    notifications: boolean
  }
}
```

**Dashboard Statistics**
```typescript
{
  totalStudyHours: number
  completedCourses: number
  averageScore: number
  activeDays: number
}
```

**Research Session**
```typescript
{
  id: string
  title: string
  description: string
  sources: Array<{
    title: string
    url: string
    notes: string
  }>
  createdAt: Date
  updatedAt: Date
}
```

**Exam Question**
```typescript
{
  id: string
  question: string
  options: string[]
  correctAnswer: number
  difficulty: 'easy' | 'medium' | 'hard'
  subject: string
}
```

**Wellness Metrics**
```typescript
{
  date: Date
  steps: number
  water: number
  sleep: number
  mood: number
  weight: number
}
```

### Storage Services
- **Current**: Local component state (React useState)
- **Planned**: 
  - Backend API integration for persistent storage
  - LocalStorage for offline capabilities
  - IndexedDB for large datasets (research notes, documents)

### Data Flow
1. User interactions trigger component state updates
2. State changes re-render UI components
3. Context providers manage global state (notifications, theme)
4. Future: REST API calls for CRUD operations

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
No environment variables required for current demo version.

## User Guide

### Getting Started
1. **Login**: Enter your email and a 6-digit PIN to access the dashboard
2. **Navigation**: Use the sidebar to switch between different sections
3. **Theme**: Toggle between light and dark modes using the theme button in the top bar
4. **Notifications**: Click the bell icon to view system notifications

### Using Key Features

#### Research Hub
1. Click "Research Hub" in the sidebar
2. Create a new session or select an existing one
3. Add sources, take notes, and organize your research
4. Export your research when complete

#### Exam Preparation
1. Navigate to "Exam Prep"
2. Choose a learning mode (Mock Test, Flashcards, etc.)
3. Answer questions and review your performance
4. Track your progress over time

#### Wellness Tracker
1. Go to "Wellness" section
2. Log your daily metrics (steps, water, sleep)
3. Set goals and track progress
4. Review health trends and insights

#### Calendar Management
1. Open the "Calendar"
2. Add events, tasks, and deadlines
3. View your schedule by day, week, or month
4. Set reminders for important dates

## Development

### Project Structure
```
webapp/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── exam/           # Exam-related components
│   │   ├── learn/          # Learning mode components
│   │   ├── liveroom/       # Live room components
│   │   └── research/       # Research hub components
│   ├── contexts/           # React contexts
│   ├── lib/               # Utility functions
│   ├── styles/            # Global styles
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global CSS with Tailwind
├── public/                # Static assets
├── dist/                  # Production build output
├── package.json           # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

### Key Technologies
- **React 18**: Component framework with hooks
- **TypeScript**: Type safety and better developer experience
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library
- **Recharts**: Chart library for data visualization
- **Lucide React**: Icon library

### Component Architecture
- **Main App**: Manages authentication and routing
- **Sidebar**: Navigation menu
- **TopBar**: Header with theme toggle and notifications
- **Feature Components**: Independent modules for each feature
- **UI Components**: Reusable components from Radix UI

## Deployment Status

- **Platform**: Development (Vite Dev Server)
- **Status**: ✅ Active
- **Last Updated**: December 4, 2024

## Future Enhancements

### Planned Features
1. **Backend Integration**
   - REST API for data persistence
   - User authentication and authorization
   - Real-time updates with WebSockets

2. **Enhanced Learning Features**
   - AI-powered study recommendations
   - Collaborative study groups
   - Progress analytics and insights

3. **Mobile Responsiveness**
   - Optimize for mobile devices
   - Progressive Web App (PWA) support
   - Native mobile apps

4. **Advanced Analytics**
   - Detailed performance reports
   - Predictive analytics for exam preparation
   - Learning pattern recognition

5. **Integration Capabilities**
   - Google Calendar integration
   - Learning Management System (LMS) connectors
   - Third-party educational content

## Contributing

This is a demo project. For production use, consider:
- Adding proper authentication
- Implementing backend API
- Adding comprehensive testing
- Improving error handling
- Enhancing accessibility

## License

Private - Educational Demo Project

## Support

For issues or questions, please contact the development team.
