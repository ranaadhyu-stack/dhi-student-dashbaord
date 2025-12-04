export type Theme = 'light' | 'dark';

export const themeClasses = {
  bg: {
    primary: (theme: Theme) => theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50',
    secondary: (theme: Theme) => theme === 'dark' ? 'bg-zinc-900' : 'bg-white',
    tertiary: (theme: Theme) => theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100',
  },
  text: {
    primary: (theme: Theme) => theme === 'dark' ? 'text-white' : 'text-gray-900',
    secondary: (theme: Theme) => theme === 'dark' ? 'text-zinc-300' : 'text-gray-700',
    tertiary: (theme: Theme) => theme === 'dark' ? 'text-zinc-400' : 'text-gray-500',
    muted: (theme: Theme) => theme === 'dark' ? 'text-zinc-500' : 'text-gray-400',
  },
  border: {
    primary: (theme: Theme) => theme === 'dark' ? 'border-zinc-800' : 'border-gray-200',
    secondary: (theme: Theme) => theme === 'dark' ? 'border-zinc-700' : 'border-gray-300',
  },
  hover: {
    bg: (theme: Theme) => theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100',
    border: (theme: Theme) => theme === 'dark' ? 'hover:border-zinc-700' : 'hover:border-gray-300',
  }
};
