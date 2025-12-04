import { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  label: string;
  icon: LucideIcon;
  theme: 'light' | 'dark';
}

export function QuickActionButton({ label, icon: Icon, theme }: QuickActionButtonProps) {
  return (
    <button className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'} border rounded-xl p-6 transition-all duration-300 shadow-lg group`}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 transition-all duration-300 ring-1 ring-emerald-500/20 group-hover:ring-emerald-500/40 group-hover:shadow-lg group-hover:shadow-emerald-500/20">
          <Icon className="w-6 h-6 text-emerald-500 group-hover:text-white transition-colors duration-300" />
        </div>
        <span className={`text-sm ${theme === 'dark' ? 'text-zinc-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'} transition-colors duration-300 font-medium`}>{label}</span>
      </div>
    </button>
  );
}