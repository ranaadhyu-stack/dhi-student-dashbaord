import { 
  TrendingUp, 
  Calendar, 
  Heart, 
  Zap, 
  Play, 
  BookOpen, 
  GraduationCap, 
  Upload,
  Award,
  Brain,
  Lightbulb
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useEffect, useRef } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

interface VisualDashboardProps {
  theme: 'light' | 'dark';
}

export function VisualDashboard({ theme }: VisualDashboardProps) {
  const { addNotification } = useNotifications();
  const hasInitialized = useRef(false);

  // Add demo notifications on first load
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      
      setTimeout(() => {
        addNotification({
          title: 'Welcome Back!',
          message: 'You have 3 upcoming events this week.',
          type: 'info',
          tab: 'dashboard',
        });
      }, 1000);

      setTimeout(() => {
        addNotification({
          title: 'Study Streak Active',
          message: '7 days in a row! Keep up the great work.',
          type: 'success',
          tab: 'dashboard',
        });
      }, 2000);
    }
  }, [addNotification]);

  // Weekly study hours data
  const weeklyStudyData = [
    { day: 'Mon', hours: 4.5 },
    { day: 'Tue', hours: 6.2 },
    { day: 'Wed', hours: 5.8 },
    { day: 'Thu', hours: 7.1 },
    { day: 'Fri', hours: 5.5 },
    { day: 'Sat', hours: 8.3 },
    { day: 'Sun', hours: 6.7 },
  ];

  // Learning activity distribution
  const activityData = [
    { name: 'Research', value: 25, color: '#10b981' },
    { name: 'Exam Prep', value: 30, color: '#3b82f6' },
    { name: 'Learn Your Way', value: 20, color: '#8b5cf6' },
    { name: 'Live Rooms', value: 15, color: '#f59e0b' },
    { name: 'Tasks', value: 7, color: '#ec4899' },
    { name: 'Counseling', value: 3, color: '#14b8a6' },
  ];

  // Wellness trends data
  const wellnessData = [
    { day: 'Mon', mood: 7, sleep: 6.5 },
    { day: 'Tue', mood: 8, sleep: 7.2 },
    { day: 'Wed', mood: 6, sleep: 5.8 },
    { day: 'Thu', mood: 7, sleep: 6.9 },
    { day: 'Fri', mood: 9, sleep: 7.5 },
    { day: 'Sat', mood: 8, sleep: 8.2 },
    { day: 'Sun', mood: 8, sleep: 7.8 },
  ];

  // XP engagement data
  const xpData = [
    { activity: 'Helping Peers', xp: 450 },
    { activity: 'Flashcards', xp: 320 },
    { activity: 'Research', xp: 580 },
    { activity: 'Live Room', xp: 290 },
    { activity: 'Exam Prep', xp: 510 },
    { activity: 'Counseling', xp: 180 },
  ];

  // Quick actions
  const quickActions = [
    { label: 'Start Study Session', icon: Play, color: 'emerald' },
    { label: 'Open Chapter Studio', icon: BookOpen, color: 'blue' },
    { label: 'Start Exam Prep', icon: GraduationCap, color: 'purple' },
    { label: 'Upload Material', icon: Upload, color: 'orange' },
  ];

  const CircularProgress = ({ 
    value, 
    size = 120, 
    strokeWidth = 10,
    color = '#10b981' 
  }: { 
    value: number; 
    size?: number; 
    strokeWidth?: number;
    color?: string;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme === 'dark' ? '#27272a' : '#e5e7eb'}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s ease-in-out',
          }}
        />
      </svg>
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* SECTION 1 - Four Equal Hero Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 - Weekly Study Progress */}
        <div
          className={`rounded-xl p-6 border transition-all ${
            theme === 'dark'
              ? 'bg-zinc-900 border-white/10 hover:border-white/20'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <CircularProgress value={67} size={100} strokeWidth={8} color="#10b981" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`text-2xl ${
                    theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
                  }`}
                  style={{ fontWeight: 700 }}
                >
                  67%
                </span>
              </div>
            </div>
            <h3
              className={`mt-4 text-center text-sm ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
              }`}
            >
              Weekly Study Progress
            </h3>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-emerald-500">+12%</span>
            </div>
          </div>
        </div>

        {/* Card 2 - Upcoming Deadlines */}
        <div
          className={`rounded-xl p-6 border transition-all ${
            theme === 'dark'
              ? 'bg-zinc-900 border-white/10 hover:border-white/20'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex flex-col items-center">
            <Calendar
              className={`w-12 h-12 mb-3 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}
            />
            <span
              className={`text-4xl mb-2 ${
                theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
              }`}
              style={{ fontWeight: 700 }}
            >
              7
            </span>
            <h3
              className={`text-center text-sm ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
              }`}
            >
              Upcoming Deadlines
            </h3>
            <div className="w-full mt-4 space-y-1">
              <div className="h-1 bg-blue-500 rounded-full" style={{ width: '85%' }} />
              <div className="h-1 bg-purple-500 rounded-full" style={{ width: '60%' }} />
              <div className="h-1 bg-orange-500 rounded-full" style={{ width: '40%' }} />
            </div>
          </div>
        </div>

        {/* Card 3 - Wellness Snapshot */}
        <div
          className={`rounded-xl p-6 border transition-all ${
            theme === 'dark'
              ? 'bg-zinc-900 border-white/10 hover:border-white/20'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="text-5xl mb-3">😊</div>
            <h3
              className={`text-center text-sm mb-4 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
              }`}
            >
              Wellness Snapshot
            </h3>
            <div className="w-full space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>
                    Sleep
                  </span>
                  <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                    7.2h
                  </span>
                </div>
                <div
                  className={`h-2 rounded-full ${
                    theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className="h-2 bg-emerald-500 rounded-full"
                    style={{ width: '90%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>
                    Water
                  </span>
                  <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                    6/8
                  </span>
                </div>
                <div
                  className={`h-2 rounded-full ${
                    theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 - XP & Rewards */}
        <div
          className={`rounded-xl p-6 border transition-all ${
            theme === 'dark'
              ? 'bg-zinc-900 border-white/10 hover:border-white/20'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <CircularProgress value={73} size={100} strokeWidth={8} color="#f59e0b" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Zap className="w-6 h-6 text-orange-500 mb-1" />
                <span
                  className={`text-lg ${
                    theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
                  }`}
                  style={{ fontWeight: 700 }}
                >
                  2,150
                </span>
              </div>
            </div>
            <h3
              className={`mt-4 text-center text-sm ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
              }`}
            >
              XP Points
            </h3>
            <div
              className={`mt-2 px-3 py-1 rounded-full text-xs ${
                theme === 'dark'
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'bg-orange-50 text-orange-600'
              }`}
            >
              3 Rewards Available
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2 - Daily Performance Analytics */}
      <div
        className={`rounded-xl p-6 border transition-all ${
          theme === 'dark'
            ? 'bg-zinc-900 border-white/10 hover:border-white/20'
            : 'bg-white border-gray-200 hover:border-gray-300'
        }`}
      >
        <h2
          className={`mb-6 flex items-center gap-2 ${
            theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
          }`}
          style={{ fontWeight: 700 }}
        >
          <Brain className="w-5 h-5" />
          Daily Performance Analytics
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Today's Productivity Score */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative">
              <CircularProgress value={75} size={140} strokeWidth={10} color="#10b981" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={`text-4xl ${
                    theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
                  }`}
                  style={{ fontWeight: 700 }}
                >
                  75
                </span>
              </div>
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-full blur-xl opacity-20" 
                style={{ 
                  background: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
                  zIndex: -1 
                }}
              />
            </div>
            <h3
              className={`mt-4 text-sm text-center ${
                theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
              }`}
              style={{ fontWeight: 600 }}
            >
              Today's Productivity
            </h3>
            <p
              className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
              }`}
            >
              AI-calculated score
            </p>
          </div>

          {/* Middle - Four Mini Metrics */}
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {/* Study Minutes */}
              <div
                className={`rounded-lg p-4 border ${
                  theme === 'dark'
                    ? 'bg-zinc-950/50 border-white/10'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Study Minutes
                  </span>
                </div>
                <p className={`text-xl ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`} style={{ fontWeight: 600 }}>
                  42 min
                </p>
              </div>

              {/* Exam Prep Progress */}
              <div
                className={`rounded-lg p-4 border ${
                  theme === 'dark'
                    ? 'bg-zinc-950/50 border-white/10'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Exam Prep
                  </span>
                </div>
                <div className={`h-2 rounded-full mb-1 ${
                  theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'
                }`}>
                  <div
                    className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: '30%' }}
                  />
                </div>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
                }`}>
                  30% complete
                </p>
              </div>

              {/* Learn Your Way Sessions */}
              <div
                className={`rounded-lg p-4 border ${
                  theme === 'dark'
                    ? 'bg-zinc-950/50 border-white/10'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Learn Sessions
                  </span>
                </div>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`} style={{ fontWeight: 500 }}>
                  1 session
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
                }`}>
                  completed
                </p>
              </div>

              {/* Mood Status */}
              <div
                className={`rounded-lg p-4 border ${
                  theme === 'dark'
                    ? 'bg-zinc-950/50 border-white/10'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Heart className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-pink-400' : 'text-pink-600'
                  }`} />
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    Mood Status
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">😊</span>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`} style={{ fontWeight: 500 }}>
                    Stable
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - AI Suggestion */}
          <div
            className={`rounded-lg p-5 border ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-emerald-950/30 to-zinc-950/30 border-emerald-900/30'
                : 'bg-gradient-to-br from-emerald-50 to-gray-50 border-emerald-200'
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  theme === 'dark'
                    ? 'bg-emerald-500/20'
                    : 'bg-emerald-100'
                }`}>
                  <Lightbulb className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                </div>
                <h3 className={`text-sm ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`} style={{ fontWeight: 600 }}>
                  AI Suggestion for Today
                </h3>
              </div>
              <p className={`text-sm mb-4 flex-1 ${
                theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
              }`} style={{ lineHeight: '1.5' }}>
                Review Chapter 4 for 20 minutes and complete 1 mock quiz based on your recent activity.
              </p>
              <button
                className={`px-4 py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-1 ${
                  theme === 'dark'
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
                style={{ fontWeight: 600 }}
              >
                Do it now
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3 - Weekly Analytics (Three Equal Graphs) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly Study Hours */}
        <div
          className={`rounded-xl p-6 border transition-all ${
            theme === 'dark'
              ? 'bg-zinc-900 border-white/10 hover:border-white/20'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <h3
            className={`mb-4 text-sm ${
              theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
            }`}
            style={{ fontWeight: 600 }}
          >
            Weekly Study Hours
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyStudyData}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme === 'dark' ? '#27272a' : '#e5e7eb'}
              />
              <XAxis
                dataKey="day"
                stroke={theme === 'dark' ? '#71717a' : '#9ca3af'}
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke={theme === 'dark' ? '#71717a' : '#9ca3af'}
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#18181b' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#27272a' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#colorHours)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Learning Activity Distribution */}
        <div
          className={`rounded-xl p-6 border transition-all ${
            theme === 'dark'
              ? 'bg-zinc-900 border-white/10 hover:border-white/20'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <h3
            className={`mb-4 text-sm ${
              theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
            }`}
            style={{ fontWeight: 600 }}
          >
            Learning Activity Distribution
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={activityData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {activityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `${value}%`}
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#18181b' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#27272a' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: theme === 'dark' ? '#e4e4e7' : '#18181b',
                }}
                labelStyle={{
                  color: theme === 'dark' ? '#e4e4e7' : '#18181b',
                }}
                itemStyle={{
                  color: theme === 'dark' ? '#e4e4e7' : '#18181b',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {activityData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span
                  className={`text-xs ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                  }`}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wellness Trends */}
        <div
          className={`rounded-xl p-6 border transition-all ${
            theme === 'dark'
              ? 'bg-zinc-900 border-white/10 hover:border-white/20'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <h3
            className={`mb-4 text-sm ${
              theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
            }`}
            style={{ fontWeight: 600 }}
          >
            Wellness Trends
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={wellnessData}>
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme === 'dark' ? '#27272a' : '#e5e7eb'}
              />
              <XAxis
                dataKey="day"
                stroke={theme === 'dark' ? '#71717a' : '#9ca3af'}
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke={theme === 'dark' ? '#71717a' : '#9ca3af'}
                style={{ fontSize: '12px' }}
                domain={[0, 10]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#18181b' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#27272a' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="mood"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#colorMood)"
                name="Mood"
              />
              <Bar dataKey="sleep" fill="#3b82f6" name="Sleep (hrs)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECTION 4 - Full Width XP & Engagement Summary */}
      <div
        className={`rounded-xl p-6 border transition-all ${
          theme === 'dark'
            ? 'bg-zinc-900 border-white/10 hover:border-white/20'
            : 'bg-white border-gray-200 hover:border-gray-300'
        }`}
      >
        <h2
          className={`mb-6 flex items-center gap-2 ${
            theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
          }`}
          style={{ fontWeight: 700 }}
        >
          <Zap className="w-5 h-5 text-orange-500" />
          XP & Engagement Summary
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={xpData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === 'dark' ? '#27272a' : '#e5e7eb'}
            />
            <XAxis
              dataKey="activity"
              stroke={theme === 'dark' ? '#71717a' : '#9ca3af'}
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke={theme === 'dark' ? '#71717a' : '#9ca3af'}
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#18181b' : '#ffffff',
                border: `1px solid ${theme === 'dark' ? '#27272a' : '#e5e7eb'}`,
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="xp" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* SECTION 5 - Quick Action Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className={`rounded-xl p-6 border transition-all text-left group ${
              theme === 'dark'
                ? 'bg-zinc-900 border-white/10 hover:border-white/20 hover:bg-zinc-800'
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                action.color === 'emerald'
                  ? theme === 'dark'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-emerald-100 text-emerald-600'
                  : action.color === 'blue'
                  ? theme === 'dark'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-blue-100 text-blue-600'
                  : action.color === 'purple'
                  ? theme === 'dark'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-purple-100 text-purple-600'
                  : theme === 'dark'
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'bg-orange-100 text-orange-600'
              }`}
            >
              <action.icon className="w-6 h-6" />
            </div>
            <h3
              className={`text-sm ${
                theme === 'dark' ? 'text-zinc-200' : 'text-gray-900'
              }`}
              style={{ fontWeight: 600 }}
            >
              {action.label}
            </h3>
          </button>
        ))}
      </div>

      {/* SECTION 6 - Bottom Micro Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Mood Today */}
        <div
          className={`rounded-xl p-6 border ${
            theme === 'dark'
              ? 'bg-zinc-900 border-white/10'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center gap-6">
            <div className="text-5xl">😊</div>
            <div className="flex-1">
              <h3
                className={`text-sm mb-3 ${
                  theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                }`}
                style={{ fontWeight: 600 }}
              >
                Mood Today
              </h3>
              <div className="flex gap-1 items-end">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div
                    key={i}
                    className="w-6 bg-emerald-500 rounded"
                    style={{ height: `${Math.random() * 30 + 20}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Daily Calories */}
        <div
          className={`rounded-xl p-6 border ${
            theme === 'dark'
              ? 'bg-zinc-900 border-white/10'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center gap-6">
            <div className="relative">
              <CircularProgress value={65} size={80} strokeWidth={8} color="#f59e0b" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`text-lg ${
                    theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                  }`}
                  style={{ fontWeight: 700 }}
                >
                  65%
                </span>
              </div>
            </div>
            <div>
              <h3
                className={`text-sm mb-1 ${
                  theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                }`}
                style={{ fontWeight: 600 }}
              >
                Daily Calories
              </h3>
              <p
                className={`text-xs ${
                  theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
                }`}
              >
                1,300 / 2,000 kcal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
