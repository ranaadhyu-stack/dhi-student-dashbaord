interface TimelineItemProps {
  time: string;
  title: string;
  location: string;
  action: string;
  actionType: 'primary' | 'secondary';
  theme: 'light' | 'dark';
}

export function TimelineItem({ time, title, location, action, actionType, theme }: TimelineItemProps) {
  return (
    <div className={`flex items-center justify-between py-4 px-4 border-b ${theme === 'dark' ? 'border-zinc-800/50 hover:bg-zinc-800/30' : 'border-gray-200/50 hover:bg-gray-50'} last:border-b-0 rounded-lg transition-all duration-300`}>
      <div className="flex items-center gap-5">
        <div className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'} min-w-[80px] font-medium`}>{time}</div>
        <div>
          <div className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-1 font-medium`}>{title}</div>
          <div className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>{location}</div>
        </div>
      </div>
      <button
        className={`px-5 py-2 text-xs rounded-xl transition-all duration-300 font-medium ${
          actionType === 'primary'
            ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg hover:shadow-emerald-500/20'
            : theme === 'dark'
              ? 'border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600'
              : 'border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
        }`}
      >
        {action}
      </button>
    </div>
  );
}