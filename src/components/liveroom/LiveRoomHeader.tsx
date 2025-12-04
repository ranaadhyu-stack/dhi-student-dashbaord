import { Trophy, Gift, Clock, TrendingUp, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

interface LiveRoomHeaderProps {
  mode: 'solo' | 'public';
  onToggleMode: (mode: 'solo' | 'public') => void;
  xp: number;
  gifts: number;
  subject: string;
  timer: string;
  helpfulPercentage: number;
  notifications: number;
  theme: 'light' | 'dark';
}

export function LiveRoomHeader({
  mode,
  onToggleMode,
  xp,
  gifts,
  subject,
  timer,
  helpfulPercentage,
  notifications,
  theme,
}: LiveRoomHeaderProps) {
  return (
    <div className={`h-14 border-b px-3 sm:px-6 flex items-center justify-between ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-gray-200 bg-white'}`}>
      {/* Left Section - Stats */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 overflow-x-auto">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <Trophy className={`w-4 h-4 ${theme === 'dark' ? 'text-amber-500' : 'text-amber-600'} drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]`} />
          </motion.div>
          <motion.span 
            className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            animate={{ 
              textShadow: [
                '0 0 0px rgba(245,158,11,0)',
                '0 0 8px rgba(245,158,11,0.3)',
                '0 0 0px rgba(245,158,11,0)'
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            {xp}
          </motion.span>
        </motion.div>

        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div
            animate={{ 
              y: [0, -3, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            <Gift className={`w-4 h-4 ${theme === 'dark' ? 'text-purple-500' : 'text-purple-600'} drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]`} />
          </motion.div>
          <motion.span 
            className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            animate={{ 
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            {gifts}
          </motion.span>
        </motion.div>

        <div className={`h-6 w-px ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`} />

        <div className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>{subject}</div>

        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`} />
          <span className={`text-sm tabular-nums ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{timer}</span>
        </div>

        <div className="flex items-center gap-2">
          <TrendingUp className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`} />
          <div className={`w-24 h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`}>
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${helpfulPercentage}%` }}
            />
          </div>
          <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>{helpfulPercentage}%</span>
        </div>
      </div>

      {/* Center - Mode Toggle */}
      <div className={`flex items-center gap-1 rounded-lg p-1 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-100 border-gray-200'} border`}>
        <button
          onClick={() => onToggleMode('solo')}
          className={`px-4 py-1.5 text-xs rounded-md transition-all duration-200 ${
            mode === 'solo'
              ? theme === 'dark'
                ? 'bg-white text-zinc-950'
                : 'bg-white text-gray-900 shadow-sm'
              : theme === 'dark'
                ? 'text-zinc-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Solo Room
        </button>
        <button
          onClick={() => onToggleMode('public')}
          className={`px-4 py-1.5 text-xs rounded-md transition-all duration-200 ${
            mode === 'public'
              ? theme === 'dark'
                ? 'bg-white text-zinc-950'
                : 'bg-white text-gray-900 shadow-sm'
              : theme === 'dark'
                ? 'text-zinc-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Public Room
        </button>
      </div>

      {/* Right Section - Notifications */}
      <div className="relative">
        <button className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800'
            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
        }`}>
          <Bell className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
        </button>
        {notifications > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white">{notifications}</span>
          </div>
        )}
      </div>
    </div>
  );
}
