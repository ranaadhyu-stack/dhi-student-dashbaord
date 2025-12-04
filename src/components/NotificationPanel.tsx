import { X, CheckCheck, Trash2, Calendar, Book, Brain, Video, Heart, FileText, Wallet, MessageCircle, GraduationCap, Home } from 'lucide-react';
import { useNotifications, Notification } from '../contexts/NotificationContext';

interface NotificationPanelProps {
  theme: 'light' | 'dark';
  onClose: () => void;
}

export function NotificationPanel({ theme, onClose }: NotificationPanelProps) {
  const { notifications, markAsRead, markAllAsRead, clearNotification, clearAll, unreadCount } = useNotifications();

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        return <Home className="w-4 h-4" />;
      case 'live':
        return <Video className="w-4 h-4" />;
      case 'exam':
        return <GraduationCap className="w-4 h-4" />;
      case 'learn':
        return <Brain className="w-4 h-4" />;
      case 'chapter':
        return <Book className="w-4 h-4" />;
      case 'wellness':
        return <Heart className="w-4 h-4" />;
      case 'calendar':
        return <Calendar className="w-4 h-4" />;
      case 'wallet':
        return <Wallet className="w-4 h-4" />;
      case 'counseling':
        return <MessageCircle className="w-4 h-4" />;
      case 'share':
        return <FileText className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-emerald-500';
      case 'info':
        return 'text-blue-500';
      case 'warning':
        return 'text-orange-500';
      case 'error':
        return 'text-red-500';
      default:
        return theme === 'dark' ? 'text-zinc-400' : 'text-gray-600';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div
      className={`absolute top-full right-0 mt-2 w-96 rounded-xl border shadow-2xl overflow-hidden z-50 ${
        theme === 'dark'
          ? 'bg-zinc-900 border-zinc-800'
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Header */}
      <div
        className={`p-4 border-b flex items-center justify-between ${
          theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
        }`}
      >
        <div>
          <h3
            className={`${
              theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
            }`}
          >
            Notifications
          </h3>
          {unreadCount > 0 && (
            <p
              className={`text-xs mt-0.5 ${
                theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
              }`}
            >
              {unreadCount} unread
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {notifications.length > 0 && (
            <>
              <button
                onClick={markAllAsRead}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-zinc-800 text-zinc-400'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="Mark all as read"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
              <button
                onClick={clearAll}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-zinc-800 text-zinc-400'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="Clear all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'hover:bg-zinc-800 text-zinc-400'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[500px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <div
              className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
              }`}
            >
              <CheckCheck
                className={`w-8 h-8 ${
                  theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'
                }`}
              />
            </div>
            <p
              className={`text-sm ${
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
              }`}
            >
              No notifications yet
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 transition-colors ${
                  !notif.read
                    ? theme === 'dark'
                      ? 'bg-zinc-800/50'
                      : 'bg-blue-50/50'
                    : ''
                } ${
                  theme === 'dark'
                    ? 'hover:bg-zinc-800/70 border-zinc-800'
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
                onClick={() => !notif.read && markAsRead(notif.id)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${getTypeColor(notif.type)} ${
                      theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
                    }`}
                  >
                    {getTabIcon(notif.tab)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className={`text-sm ${
                          theme === 'dark' ? 'text-zinc-200' : 'text-gray-900'
                        }`}
                      >
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                      }`}
                    >
                      {notif.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className={`text-xs ${
                          theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
                        }`}
                      >
                        {formatTimestamp(notif.timestamp)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearNotification(notif.id);
                        }}
                        className={`text-xs transition-colors ${
                          theme === 'dark'
                            ? 'text-zinc-500 hover:text-zinc-300'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
