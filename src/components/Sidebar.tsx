import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Lightbulb, 
  Video, 
  Calendar, 
  Heart, 
  Share2, 
  MessageCircle, 
  Wallet, 
  Settings,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: BookOpen, label: 'Chapter Studio', id: 'research' },
  { icon: GraduationCap, label: 'Exam Prep', id: 'exam' },
  { icon: Lightbulb, label: 'Learn Your Way', id: 'learn' },
  { icon: Video, label: 'Live Rooms', id: 'live' },
  { icon: Calendar, label: 'Calendar', id: 'calendar' },
  { icon: Heart, label: 'Wellness', id: 'wellness' },
  { icon: Share2, label: 'Share Point', id: 'share' },
  { icon: MessageCircle, label: 'Counseling', id: 'counseling' },
  { icon: Wallet, label: 'Wallet', id: 'wallet' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'light' | 'dark';
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

export function Sidebar({ activeTab, setActiveTab, theme, isOpen, onClose, onLogout }: SidebarProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`${isMobile ? 'fixed' : 'relative'} inset-y-0 left-0 z-50 w-64 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border-r flex flex-col transition-transform duration-300 lg:translate-x-0 ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}`}
      >
        <div className={`h-16 flex items-center justify-between px-6 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
          <h1 className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold`}>Student Portal</h1>
          <button
            onClick={onClose}
            className={`lg:hidden w-8 h-8 flex items-center justify-center rounded-lg ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-600'} transition-colors`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      
      <nav className="flex-1 py-4 px-3 flex flex-col">
        <div className="flex-1">
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-300 mb-1 ${
                activeTab === item.id
                  ? theme === 'dark' 
                    ? 'bg-zinc-800 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-900 shadow-sm'
                  : theme === 'dark'
                    ? 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.02,
                x: 4,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              <motion.div
                whileHover={{ 
                  rotate: [0, -10, 10, 0],
                  scale: 1.1,
                  transition: { duration: 0.4 }
                }}
              >
                <item.icon className="w-4 h-4" />
              </motion.div>
              <span>{item.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Logout Button */}
        <motion.button
          onClick={() => {
            if (onLogout) {
              onLogout();
            }
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-300 mt-2 ${
            theme === 'dark'
              ? 'bg-red-950/30 text-red-400 hover:bg-red-950/50 hover:text-red-300 border border-red-900/50'
              : 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-200'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ 
            scale: 1.02,
            x: 4,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          whileTap={{ 
            scale: 0.98,
            transition: { duration: 0.1 }
          }}
        >
          <motion.div
            whileHover={{ 
              rotate: [0, -10, 10, 0],
              scale: 1.1,
              transition: { duration: 0.4 }
            }}
          >
            <X className="w-4 h-4" />
          </motion.div>
          <span>Logout</span>
        </motion.button>
      </nav>
      </aside>
    </>
  );
}