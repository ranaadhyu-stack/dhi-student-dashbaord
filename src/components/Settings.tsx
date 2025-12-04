import { useState } from 'react';
import {
  User,
  Palette,
  Sliders,
  Bell,
  Shield,
  CreditCard,
  HardDrive,
  HelpCircle,
  Info,
  Lock,
  Mail,
  Phone,
  Building,
  Hash,
  Key,
  Monitor,
  Clock,
  Zap,
  Brain,
  BookOpen,
  GraduationCap,
  MessageCircle,
  Calendar,
  Wallet,
  Share2,
  Star,
  FileText,
  Upload,
  History,
  LogOut,
  ChevronRight,
  Check,
  AlertCircle,
  Send,
  Paperclip,
} from 'lucide-react';

interface SettingsProps {
  theme: 'light' | 'dark';
}

type Category =
  | 'profile'
  | 'personalization'
  | 'preferences'
  | 'notifications'
  | 'security'
  | 'subscription'
  | 'sharepoint'
  | 'support'
  | 'about';

export function Settings({ theme }: SettingsProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('profile');
  const [supportMessage, setSupportMessage] = useState('');
  const [issueCategory, setIssueCategory] = useState('general');

  const categories = [
    { id: 'profile' as Category, label: 'Profile', icon: User },
    { id: 'personalization' as Category, label: 'Personalization', icon: Palette },
    { id: 'preferences' as Category, label: 'Dashboard Preferences', icon: Sliders },
    { id: 'notifications' as Category, label: 'Notifications', icon: Bell },
    { id: 'security' as Category, label: 'Security', icon: Shield },
    { id: 'subscription' as Category, label: 'Subscription & Credits', icon: CreditCard },
    { id: 'sharepoint' as Category, label: 'SharePoint & Storage', icon: HardDrive },
    { id: 'support' as Category, label: 'Support', icon: HelpCircle },
    { id: 'about' as Category, label: 'About', icon: Info },
  ];

  const renderContent = () => {
    switch (selectedCategory) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h2
                className={`text-2xl mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontWeight: 700 }}
              >
                Profile
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Manage your dashboard identity and account information
              </p>
            </div>

            {/* Profile Preview Card */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-emerald-950/30 to-zinc-950/30 border-emerald-900/30'
                  : 'bg-gradient-to-br from-emerald-50 to-gray-50 border-emerald-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center">
                  <span className="text-white text-2xl" style={{ fontWeight: 700 }}>
                    AS
                  </span>
                </div>
                <div>
                  <h3
                    className={`text-lg mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    Arjun Sharma
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Dashboard ID: <span style={{ fontWeight: 600 }}>DHI-2024-ST-4728</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    className={`block text-sm mb-2 ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Arjun Sharma"
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      theme === 'dark'
                        ? 'bg-zinc-950 border-white/10 text-white focus:border-emerald-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                    }`}
                  />
                </div>

                {/* Institution Name (Readonly) */}
                <div>
                  <label
                    className={`block text-sm mb-2 ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    Institution Name
                  </label>
                  <div className="flex items-center gap-2">
                    <Building
                      className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}
                    />
                    <input
                      type="text"
                      defaultValue="Delhi Public School, R.K. Puram"
                      readOnly
                      className={`flex-1 px-4 py-2.5 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-zinc-950/50 border-white/5 text-zinc-500'
                          : 'bg-gray-100 border-gray-200 text-gray-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Dashboard ID (Readonly) */}
                <div>
                  <label
                    className={`block text-sm mb-2 ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    Dashboard ID
                  </label>
                  <div className="flex items-center gap-2">
                    <Hash
                      className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}
                    />
                    <input
                      type="text"
                      defaultValue="DHI-2024-ST-4728"
                      readOnly
                      className={`flex-1 px-4 py-2.5 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-zinc-950/50 border-white/5 text-zinc-500'
                          : 'bg-gray-100 border-gray-200 text-gray-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Registered Email */}
                <div>
                  <label
                    className={`block text-sm mb-2 ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    Registered Email
                  </label>
                  <div className="flex items-center gap-2">
                    <Mail
                      className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}
                    />
                    <input
                      type="email"
                      defaultValue="arjun.sharma@dpsrkp.edu.in"
                      className={`flex-1 px-4 py-2.5 rounded-lg border transition-all ${
                        theme === 'dark'
                          ? 'bg-zinc-950 border-white/10 text-white focus:border-emerald-500'
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    className={`block text-sm mb-2 ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2">
                    <Phone
                      className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}
                    />
                    <input
                      type="tel"
                      defaultValue="+91 98765 43210"
                      className={`flex-1 px-4 py-2.5 rounded-lg border transition-all ${
                        theme === 'dark'
                          ? 'bg-zinc-950 border-white/10 text-white focus:border-emerald-500'
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Grade / Class */}
                <div>
                  <label
                    className={`block text-sm mb-2 ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    Grade / Class
                  </label>
                  <select
                    defaultValue="12"
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      theme === 'dark'
                        ? 'bg-zinc-950 border-white/10 text-white focus:border-emerald-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                    }`}
                  >
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  className="px-4 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-all"
                  style={{ fontWeight: 600 }}
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Security Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className={`rounded-xl p-5 border ${
                  theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
                }`}
              >
                <Lock className={`w-5 h-5 mb-3 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <h3
                  className={`text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontWeight: 600 }}
                >
                  Change Password
                </h3>
                <p className={`text-xs mb-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Update your account password
                </p>
                <button
                  className={`text-sm px-4 py-2 rounded-lg transition-all ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  Change Password
                </button>
              </div>

              <div
                className={`rounded-xl p-5 border ${
                  theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
                }`}
              >
                <Key className={`w-5 h-5 mb-3 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3
                  className={`text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontWeight: 600 }}
                >
                  Regenerate Login PIN
                </h3>
                <p className={`text-xs mb-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Get a new secure PIN for quick login
                </p>
                <button
                  className={`text-sm px-4 py-2 rounded-lg transition-all ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  Regenerate PIN
                </button>
              </div>
            </div>
          </div>
        );

      case 'personalization':
        return (
          <div className="space-y-6">
            <div>
              <h2
                className={`text-2xl mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontWeight: 700 }}
              >
                Personalization
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Customize your dashboard appearance and layout
              </p>
            </div>

            {/* Theme Selection */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Theme
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  className={`p-4 rounded-lg border transition-all ${
                    theme === 'light'
                      ? 'border-emerald-500 bg-emerald-50'
                      : theme === 'dark'
                      ? 'border-white/10 bg-zinc-950 hover:border-white/20'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 mx-auto mb-2"></div>
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                    Light
                  </span>
                </button>
                <button
                  className={`p-4 rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'border-emerald-500 bg-emerald-950/30'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border-2 border-zinc-700 mx-auto mb-2"></div>
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                    Dark
                  </span>
                </button>
                <button
                  className={`p-4 rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'border-white/10 bg-zinc-950 hover:border-white/20'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white to-zinc-900 border-2 border-zinc-500 mx-auto mb-2"></div>
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                    Auto
                  </span>
                </button>
              </div>
            </div>

            {/* Accent Color */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Accent Color
              </h3>
              <div className="flex gap-3">
                <button className="w-12 h-12 rounded-lg bg-emerald-600 border-2 border-emerald-400 hover:scale-110 transition-all"></button>
                <button className="w-12 h-12 rounded-lg bg-blue-600 hover:scale-110 transition-all"></button>
                <button className="w-12 h-12 rounded-lg bg-purple-600 hover:scale-110 transition-all"></button>
                <button className="w-12 h-12 rounded-lg bg-orange-600 hover:scale-110 transition-all"></button>
                <button className="w-12 h-12 rounded-lg bg-pink-600 hover:scale-110 transition-all"></button>
              </div>
            </div>

            {/* Time Format */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Time Format
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`p-4 rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'border-emerald-500 bg-emerald-950/30'
                      : 'border-emerald-500 bg-emerald-50'
                  }`}
                >
                  <Clock className="w-5 h-5 mx-auto mb-2 text-emerald-500" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    12-hour
                  </span>
                </button>
                <button
                  className={`p-4 rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'border-white/10 bg-zinc-950 hover:border-white/20'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <Clock className={`w-5 h-5 mx-auto mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                    24-hour
                  </span>
                </button>
              </div>
            </div>

            {/* Dashboard Density */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Dashboard Density
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`p-4 rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'border-emerald-500 bg-emerald-950/30'
                      : 'border-emerald-500 bg-emerald-50'
                  }`}
                >
                  <div className="space-y-1.5 mb-2">
                    <div className={`h-2 rounded ${theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-600'}`}></div>
                    <div className={`h-2 rounded ${theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-600'}`}></div>
                  </div>
                  <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Comfortable
                  </span>
                </button>
                <button
                  className={`p-4 rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'border-white/10 bg-zinc-950 hover:border-white/20'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="space-y-1 mb-2">
                    <div className={`h-1.5 rounded ${theme === 'dark' ? 'bg-zinc-400' : 'bg-gray-600'}`}></div>
                    <div className={`h-1.5 rounded ${theme === 'dark' ? 'bg-zinc-400' : 'bg-gray-600'}`}></div>
                    <div className={`h-1.5 rounded ${theme === 'dark' ? 'bg-zinc-400' : 'bg-gray-600'}`}></div>
                  </div>
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                    Compact
                  </span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div>
              <h2
                className={`text-2xl mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontWeight: 700 }}
              >
                Dashboard Preferences
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Configure defaults for dashboard modules and AI behavior
              </p>
            </div>

            {/* AI Preferences */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Brain className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <h3
                  className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontWeight: 600 }}
                >
                  AI Preferences
                </h3>
              </div>

              <div className="space-y-4">
                {/* AI Response Style */}
                <div>
                  <label
                    className={`block text-sm mb-2 ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                    }`}
                  >
                    AI Response Style
                  </label>
                  <select
                    defaultValue="detailed"
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      theme === 'dark'
                        ? 'bg-zinc-950 border-white/10 text-white focus:border-emerald-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                    }`}
                  >
                    <option value="concise">Concise</option>
                    <option value="detailed">Detailed</option>
                    <option value="teaching">Teaching Mode</option>
                  </select>
                </div>

                {/* Save AI Chat History */}
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className={`text-sm mb-1 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}
                      style={{ fontWeight: 600 }}
                    >
                      Save AI Chat History
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Store all AI conversations for later review
                    </div>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-500'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full ml-auto mr-0.5 shadow"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Module Defaults */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sliders className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3
                  className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontWeight: 600 }}
                >
                  Module Defaults
                </h3>
              </div>

              <div className="space-y-4">
                {/* Default Learn Your Way Mode */}
                <div>
                  <label
                    className={`block text-sm mb-2 ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                    }`}
                  >
                    Default Learn Your Way Mode
                  </label>
                  <select
                    defaultValue="flashcards"
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      theme === 'dark'
                        ? 'bg-zinc-950 border-white/10 text-white focus:border-emerald-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                    }`}
                  >
                    <option value="flashcards">Flashcards</option>
                    <option value="gamified">Gamified Mode</option>
                    <option value="notes">Notes Making</option>
                    <option value="mindmap">Mind Map</option>
                    <option value="diagrams">Diagrams</option>
                    <option value="storytelling">Storytelling</option>
                  </select>
                </div>

                {/* Default Exam Prep Mode */}
                <div>
                  <label
                    className={`block text-sm mb-2 ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                    }`}
                  >
                    Default Exam Prep Mode
                  </label>
                  <select
                    defaultValue="past-papers"
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      theme === 'dark'
                        ? 'bg-zinc-950 border-white/10 text-white focus:border-emerald-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                    }`}
                  >
                    <option value="past-papers">Past Papers</option>
                    <option value="mock-test">Mock Test</option>
                  </select>
                </div>

                {/* Auto-Save Topics */}
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className={`text-sm mb-1 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}
                      style={{ fontWeight: 600 }}
                    >
                      Auto-Save Topics in Chapter Studio
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Automatically save generated content
                    </div>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-500'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full ml-auto mr-0.5 shadow"></div>
                  </button>
                </div>

                {/* Auto-Join Focus Mode */}
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className={`text-sm mb-1 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}
                      style={{ fontWeight: 600 }}
                    >
                      Auto-Join Focus Mode in Live Rooms
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Automatically enter solo focus mode
                    </div>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full ml-0.5 shadow"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications Within Dashboard */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <h3
                  className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontWeight: 600 }}
                >
                  Notifications Within Dashboard
                </h3>
              </div>

              <div className="space-y-4">
                {/* Enable Suggestions Card */}
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className={`text-sm mb-1 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}
                      style={{ fontWeight: 600 }}
                    >
                      Enable Suggestions Card
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Show AI suggestions on dashboard
                    </div>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-500'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full ml-auto mr-0.5 shadow"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h2
                className={`text-2xl mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontWeight: 700 }}
              >
                Notifications
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Manage notification preferences for all dashboard modules
              </p>
            </div>

            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <div className="space-y-5">
                {/* Exam Prep Alerts */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GraduationCap className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    <div>
                      <div
                        className={`text-sm mb-0.5 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}
                        style={{ fontWeight: 600 }}
                      >
                        Exam Prep Alerts
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        Notifications for upcoming tests and deadlines
                      </div>
                    </div>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-500'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full ml-auto mr-0.5 shadow"></div>
                  </button>
                </div>

                {/* Live Room Invites */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageCircle className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                    <div>
                      <div
                        className={`text-sm mb-0.5 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}
                        style={{ fontWeight: 600 }}
                      >
                        Live Room Invites
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        Get notified when peers invite you to study rooms
                      </div>
                    </div>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-500'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full ml-auto mr-0.5 shadow"></div>
                  </button>
                </div>

                {/* Counseling Session Alerts */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <div>
                      <div
                        className={`text-sm mb-0.5 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}
                        style={{ fontWeight: 600 }}
                      >
                        Counseling Session Alerts
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        Reminders for scheduled counseling appointments
                      </div>
                    </div>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-500'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full ml-auto mr-0.5 shadow"></div>
                  </button>
                </div>

                {/* Task Reminders */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className={`w-5 h-5 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} />
                    <div>
                      <div
                        className={`text-sm mb-0.5 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}
                        style={{ fontWeight: 600 }}
                      >
                        Task Reminders
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        Alerts for pending assignments and tasks
                      </div>
                    </div>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-500'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full ml-auto mr-0.5 shadow"></div>
                  </button>
                </div>

                {/* XP / Rewards Alerts */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wallet className={`w-5 h-5 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    <div>
                      <div
                        className={`text-sm mb-0.5 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}
                        style={{ fontWeight: 600 }}
                      >
                        XP / Rewards Alerts
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        Notifications for XP milestones and rewards
                      </div>
                    </div>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-500'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full ml-auto mr-0.5 shadow"></div>
                  </button>
                </div>

                {/* Credit Usage Alerts */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star className={`w-5 h-5 ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`} />
                    <div>
                      <div
                        className={`text-sm mb-0.5 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}
                        style={{ fontWeight: 600 }}
                      >
                        Credit Usage Alerts
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        Get notified when credits are running low
                      </div>
                    </div>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-500'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full ml-auto mr-0.5 shadow"></div>
                  </button>
                </div>

                {/* SharePoint Upload Notifications */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Share2 className={`w-5 h-5 ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`} />
                    <div>
                      <div
                        className={`text-sm mb-0.5 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}
                        style={{ fontWeight: 600 }}
                      >
                        SharePoint Upload Notifications
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        Alerts when files are uploaded or shared
                      </div>
                    </div>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-all ${
                      theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full ml-0.5 shadow"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h2
                className={`text-2xl mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontWeight: 700 }}
              >
                Security
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Manage your account security and access controls
              </p>
            </div>

            {/* Change Password */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Change Password
              </h3>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'bg-zinc-950 border-white/10 text-white focus:border-emerald-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                  }`}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'bg-zinc-950 border-white/10 text-white focus:border-emerald-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                  }`}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'bg-zinc-950 border-white/10 text-white focus:border-emerald-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                  }`}
                />
                <button
                  className="px-4 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-all"
                  style={{ fontWeight: 600 }}
                >
                  Update Password
                </button>
              </div>
            </div>

            {/* Login History */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Login History
              </h3>
              <div className="space-y-3">
                {[
                  { device: 'Chrome on Windows', location: 'New Delhi, India', time: '2 hours ago', current: true },
                  { device: 'Safari on iPhone', location: 'New Delhi, India', time: '1 day ago', current: false },
                  { device: 'Chrome on MacBook', location: 'Mumbai, India', time: '3 days ago', current: false },
                ].map((login, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      theme === 'dark' ? 'border-white/10 bg-zinc-950' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Monitor className={`w-5 h-5 mt-0.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                        <div>
                          <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                            {login.device}
                            {login.current && (
                              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                                Current
                              </span>
                            )}
                          </div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                            {login.location} • {login.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Devices */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Active Devices
              </h3>
              <div className="space-y-3">
                {[
                  { device: 'Chrome on Windows', location: 'New Delhi', active: 'Active now' },
                  { device: 'Safari on iPhone 14', location: 'New Delhi', active: 'Active 2h ago' },
                ].map((device, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      theme === 'dark' ? 'border-white/10 bg-zinc-950' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Monitor className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                        <div>
                          <div className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                            {device.device}
                          </div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                            {device.location} • {device.active}
                          </div>
                        </div>
                      </div>
                      <button
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                          theme === 'dark'
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                        }`}
                        style={{ fontWeight: 600 }}
                      >
                        <LogOut className="w-3 h-3 inline mr-1" />
                        Log Out
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2FA */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3
                    className={`text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                    style={{ fontWeight: 600 }}
                  >
                    Two-Factor Authentication
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                    Add an extra layer of security with Email OTP
                  </p>
                </div>
                <button
                  className={`w-12 h-6 rounded-full transition-all ${
                    theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'
                  }`}
                >
                  <div className="w-5 h-5 bg-white rounded-full ml-0.5 shadow"></div>
                </button>
              </div>
            </div>

            {/* Regenerate Secure PIN */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Regenerate Secure PIN
              </h3>
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Your current PIN: <span style={{ fontWeight: 700 }}>****</span>
              </p>
              <button
                className={`px-4 py-2.5 rounded-lg transition-all ${
                  theme === 'dark'
                    ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
                style={{ fontWeight: 600 }}
              >
                <Key className="w-4 h-4 inline mr-2" />
                Generate New PIN
              </button>
            </div>
          </div>
        );

      case 'subscription':
        return (
          <div className="space-y-6">
            <div>
              <h2
                className={`text-2xl mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontWeight: 700 }}
              >
                Subscription & Credits
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Manage your subscription plan and AI generation credits
              </p>
            </div>

            {/* Current Plan */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-emerald-950/30 to-zinc-950/30 border-emerald-900/30'
                  : 'bg-gradient-to-br from-emerald-50 to-gray-50 border-emerald-200'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <h3
                      className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                      style={{ fontWeight: 700 }}
                    >
                      Student Plus
                    </h3>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Active subscription • Renews on 1 Dec 2025
                  </p>
                </div>
                <button
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 transition-all"
                  style={{ fontWeight: 600 }}
                >
                  Request Upgrade
                </button>
              </div>

              {/* Credits Progress */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`} style={{ fontWeight: 600 }}>
                    Credits This Month
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`} style={{ fontWeight: 600 }}>
                    128 / 300
                  </span>
                </div>
                <div className={`h-3 rounded-full mb-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`}>
                  <div
                    className="h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-300"
                    style={{ width: '43%' }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>
                    172 credits used
                  </span>
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>
                    43% used
                  </span>
                </div>
              </div>
            </div>

            {/* Plan Details */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Plan Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Monthly Credits Allowed
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                    300 credits
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Credits Used This Month
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                    172 credits
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Credits Remaining
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                    128 credits
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Renewal Date
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                    1 December 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Transaction History
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'Chapter Studio Generation', credits: -40, time: '2 hours ago' },
                  { action: 'Diagram Generation', credits: -12, time: '1 day ago' },
                  { action: 'Mock Test Creation', credits: -20, time: '2 days ago' },
                  { action: 'Monthly Credit Allocation', credits: +300, time: '1 Nov 2025' },
                ].map((transaction, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      theme === 'dark' ? 'border-white/10 bg-zinc-950' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                          {transaction.action}
                        </div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                          {transaction.time}
                        </div>
                      </div>
                      <div
                        className={`text-sm ${
                          transaction.credits > 0
                            ? 'text-emerald-500'
                            : theme === 'dark'
                            ? 'text-zinc-400'
                            : 'text-gray-600'
                        }`}
                        style={{ fontWeight: 700 }}
                      >
                        {transaction.credits > 0 ? '+' : ''}{transaction.credits}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'sharepoint':
        return (
          <div className="space-y-6">
            <div>
              <h2
                className={`text-2xl mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontWeight: 700 }}
              >
                SharePoint & Storage
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Manage your dashboard file storage and SharePoint integration
              </p>
            </div>

            {/* Storage Overview */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <HardDrive className={`w-8 h-8 mx-auto mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  <div className={`text-2xl mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 700 }}>
                    2.4 GB
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                    Total Storage Used
                  </div>
                </div>
                <div className="text-center">
                  <FileText className={`w-8 h-8 mx-auto mb-2 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <div className={`text-2xl mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 700 }}>
                    147
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                    Total Files
                  </div>
                </div>
                <div className="text-center">
                  <Upload className={`w-8 h-8 mx-auto mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                  <div className={`text-2xl mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 700 }}>
                    12
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                    Uploads This Week
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Uploads */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Recent Uploads
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Physics_Chapter_4_Notes.pdf', size: '2.4 MB', time: '2 hours ago', type: 'PDF' },
                  { name: 'Math_Assignment_Solution.docx', size: '840 KB', time: '1 day ago', type: 'DOCX' },
                  { name: 'Chemistry_Diagram.png', size: '1.2 MB', time: '2 days ago', type: 'PNG' },
                ].map((file, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      theme === 'dark' ? 'border-white/10 bg-zinc-950' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        file.type === 'PDF'
                          ? theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                          : file.type === 'DOCX'
                          ? theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                          : theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                      }`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm mb-0.5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                          {file.name}
                        </div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                          {file.size} • {file.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Auto-backup Toggle */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className={`text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                    style={{ fontWeight: 600 }}
                  >
                    Auto-backup to Institution Server
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                    Automatically sync files with your institution's server
                  </p>
                </div>
                <button
                  className={`w-12 h-6 rounded-full transition-all ${
                    theme === 'dark' ? 'bg-emerald-600' : 'bg-emerald-500'
                  }`}
                >
                  <div className="w-5 h-5 bg-white rounded-full ml-auto mr-0.5 shadow"></div>
                </button>
              </div>
            </div>

            {/* Allowed File Types */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Allowed File Types
              </h3>
              <div className="flex flex-wrap gap-2">
                {['PDF', 'DOCX', 'PNG', 'JPG', 'XLSX', 'TXT'].map((type) => (
                  <span
                    key={type}
                    className={`px-3 py-1.5 rounded-lg text-xs ${
                      theme === 'dark'
                        ? 'bg-zinc-950 border border-white/10 text-zinc-400'
                        : 'bg-gray-100 border border-gray-200 text-gray-700'
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    .{type.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6">
            <div>
              <h2
                className={`text-2xl mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontWeight: 700 }}
              >
                Support
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Get help with your dashboard and report issues
              </p>
            </div>

            {/* AI Support Chat */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Brain className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <h3
                  className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontWeight: 600 }}
                >
                  AI Support Chat
                </h3>
              </div>
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Ask questions about dashboard features, troubleshooting, or general help
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your question here..."
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  className={`flex-1 px-4 py-2.5 rounded-lg border transition-all ${
                    theme === 'dark'
                      ? 'bg-zinc-950 border-white/10 text-white focus:border-emerald-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                  }`}
                />
                <button
                  className="px-4 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-all"
                  style={{ fontWeight: 600 }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Report an Issue */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Report an Issue
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm mb-2 ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                    }`}
                  >
                    Issue Category
                  </label>
                  <select
                    value={issueCategory}
                    onChange={(e) => setIssueCategory(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all ${
                      theme === 'dark'
                        ? 'bg-zinc-950 border-white/10 text-white focus:border-emerald-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                    }`}
                  >
                    <option value="general">General Issue</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="account">Account Problem</option>
                    <option value="performance">Performance Issue</option>
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-sm mb-2 ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                    }`}
                  >
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe the issue in detail..."
                    className={`w-full px-4 py-2.5 rounded-lg border transition-all resize-none ${
                      theme === 'dark'
                        ? 'bg-zinc-950 border-white/10 text-white focus:border-emerald-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                    }`}
                  />
                </div>
                <div>
                  <button
                    className={`w-full px-4 py-2.5 rounded-lg border border-dashed transition-all ${
                      theme === 'dark'
                        ? 'border-white/10 text-zinc-400 hover:border-white/20 hover:bg-zinc-950'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <Paperclip className="w-4 h-4 inline mr-2" />
                    Attach Screenshot (Optional)
                  </button>
                </div>
                <button
                  className="w-full px-4 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-all"
                  style={{ fontWeight: 600 }}
                >
                  Submit Issue
                </button>
              </div>
            </div>

            {/* View Support Tickets */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Your Support Tickets
              </h3>
              <div className="space-y-3">
                {[
                  { id: '#2847', title: 'Chapter Studio not loading', status: 'In Review', time: '2 days ago' },
                  { id: '#2801', title: 'Unable to upload files to SharePoint', status: 'Resolved', time: '1 week ago' },
                ].map((ticket, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      theme === 'dark' ? 'border-white/10 bg-zinc-950' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                            {ticket.id}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              ticket.status === 'Resolved'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </div>
                        <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                          {ticket.title}
                        </div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                          {ticket.time}
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Institution Counselor */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-blue-950/30 to-zinc-950/30 border-blue-900/30'
                  : 'bg-gradient-to-br from-blue-50 to-gray-50 border-blue-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className={`text-sm mb-0.5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                    style={{ fontWeight: 600 }}
                  >
                    Ms. Priya Gupta
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Institution Counselor
                  </p>
                </div>
              </div>
              <button
                className={`w-full px-4 py-2.5 rounded-lg transition-all ${
                  theme === 'dark'
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                style={{ fontWeight: 600 }}
              >
                Schedule a Session
              </button>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <div>
              <h2
                className={`text-2xl mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                style={{ fontWeight: 700 }}
              >
                About
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Dashboard information and institutional details
              </p>
            </div>

            {/* DHI Branding */}
            <div
              className={`rounded-xl p-6 border text-center ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-emerald-950/30 to-zinc-950/30 border-emerald-900/30'
                  : 'bg-gradient-to-br from-emerald-50 to-gray-50 border-emerald-200'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl" style={{ fontWeight: 700 }}>DHi</span>
              </div>
              <h3
                className={`text-xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 700 }}
              >
                DHi Student Dashboard
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Your complete learning companion
              </p>
            </div>

            {/* Version Info */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Version Number
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                    v2.4.1
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Last Updated
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                    November 25, 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Institution License */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Institution License Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Institution
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                    Delhi Public School, R.K. Puram
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    License Type
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                    Enterprise
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    License Valid Until
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                    31 March 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div
              className={`rounded-xl p-6 border ${
                theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                style={{ fontWeight: 600 }}
              >
                Legal & Policies
              </h3>
              <div className="space-y-2">
                <button
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                    theme === 'dark'
                      ? 'hover:bg-zinc-950 text-zinc-300 hover:text-white'
                      : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <span className="text-sm">Terms & Conditions</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                    theme === 'dark'
                      ? 'hover:bg-zinc-950 text-zinc-300 hover:text-white'
                      : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <span className="text-sm">Privacy Policy</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`flex-1 flex ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      {/* Left Panel - Category Menu */}
      <div
        className={`w-64 border-r ${
          theme === 'dark' ? 'border-white/10 bg-zinc-900' : 'border-gray-200 bg-white'
        } p-4`}
      >
        <h2
          className={`text-lg mb-4 px-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          style={{ fontWeight: 700 }}
        >
          Settings
        </h2>
        <nav className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                selectedCategory === category.id
                  ? theme === 'dark'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-600 text-white'
                  : theme === 'dark'
                  ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm" style={{ fontWeight: 600 }}>
                {category.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Right Panel - Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 sm:p-8">{renderContent()}</div>
      </div>
    </div>
  );
}
