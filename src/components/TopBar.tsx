import { Search, Bell, Moon, Sun, User, Menu, Star, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { NotificationPanel } from './NotificationPanel';

interface TopBarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onMenuClick: () => void;
}

export function TopBar({ theme, toggleTheme, onMenuClick }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const { unreadCount } = useNotifications();
  const notificationRef = useRef<HTMLDivElement>(null);
  const creditsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (creditsRef.current && !creditsRef.current.contains(event.target as Node)) {
        setShowCredits(false);
      }
    };

    if (showNotifications || showCredits) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showCredits]);

  return (
    <header className={`h-16 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-b flex items-center justify-between px-4 sm:px-6`}>
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={onMenuClick}
        className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-600'} transition-all duration-300`}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Icons */}
      <div className="flex items-center gap-2 ml-auto">
        <div ref={notificationRef} className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'} transition-all duration-300 relative`}
          >
            <Bell className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
            {unreadCount > 0 && (
              <>
                <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              </>
            )}
          </button>
          {showNotifications && (
            <NotificationPanel theme={theme} onClose={() => setShowNotifications(false)} />
          )}
        </div>
        <button 
          onClick={toggleTheme}
          className={`w-10 h-10 flex items-center justify-center rounded-xl ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'} transition-all duration-300`}
        >
          {theme === 'dark' ? (
            <Moon className="w-4 h-4 text-zinc-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
        </button>

        {/* Credits Remaining Component */}
        <div ref={creditsRef} className="relative ml-2">
          <button
            onClick={() => setShowCredits(!showCredits)}
            className={`px-3 py-1.5 rounded-full flex items-center gap-2 transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-white/10 hover:border-white/20 hover:bg-zinc-800'
                : 'bg-gray-100 border border-gray-200 hover:border-gray-300 hover:bg-gray-200'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className={`text-xs ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
              128
            </span>
            <span className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
              Credits
            </span>
          </button>

          {/* Dropdown */}
          {showCredits && (
            <div
              className={`absolute right-0 top-full mt-2 w-80 rounded-xl border shadow-2xl z-50 ${
                theme === 'dark'
                  ? 'bg-zinc-900 border-white/10'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="p-5">
                {/* Large Number with Progress */}
                <div className="text-center mb-6">
                  <div className={`text-5xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 700 }}>
                    128
                  </div>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Remaining Credits
                  </p>
                  {/* Progress Bar */}
                  <div className={`h-2 rounded-full mb-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`}>
                    <div
                      className="h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-300"
                      style={{ width: '43%' }}
                    />
                  </div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                    43% of monthly credits used
                  </p>
                </div>

                {/* Plan Details Section */}
                <div className={`mb-5 pb-5 border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                  <h4 className={`text-xs mb-3 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`} style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Plan Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                        Plan:
                      </span>
                      <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                        Student Plus
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                        Monthly Credits:
                      </span>
                      <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                        300
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                        Renews:
                      </span>
                      <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontWeight: 600 }}>
                        1 Dec 2025
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recent Usage Section */}
                <div className="mb-5">
                  <h4 className={`text-xs mb-3 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`} style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Recent Usage
                  </h4>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                        Chapter Studio Generation
                      </span>
                      <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        -40
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                        Diagram Generation
                      </span>
                      <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        -12
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                        Mock Test
                      </span>
                      <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        -20
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600'
                      : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600'
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  <Sparkles className="w-4 h-4" />
                  Upgrade / Buy Credits
                </button>
              </div>
            </div>
          )}
        </div>

        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 shadow-lg ml-2">
          <User className="w-4 h-4 text-white" />
        </button>
      </div>
    </header>
  );
}
