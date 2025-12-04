import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  theme: 'light' | 'dark';
}

export function StatCard({ title, value, subtitle, icon: Icon, theme }: StatCardProps) {
  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-200 hover:border-gray-300'} border rounded-xl p-6 shadow-lg transition-all duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center ring-1 ring-emerald-500/20">
          <Icon className="w-6 h-6 text-emerald-500" />
        </div>
        <button className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors duration-300 font-medium">
          View →
        </button>
      </div>
      <div className={`mb-2 text-3xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold`}>{value}</div>
      <div className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'} mb-1`}>{title}</div>
      <div className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}`}>{subtitle}</div>
    </div>
  );
}