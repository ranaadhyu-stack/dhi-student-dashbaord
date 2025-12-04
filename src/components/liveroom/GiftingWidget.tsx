import { useState } from 'react';
import { Gift, Sparkles, Heart, Star, Trophy, Zap, X } from 'lucide-react';

interface GiftOption {
  id: string;
  name: string;
  icon: any;
  credits: number;
  xpGain: number;
  color: string;
}

interface GiftingWidgetProps {
  onClose: () => void;
  userCredits: number;
  selectedProfile: any;
  theme: 'light' | 'dark';
  onSendGift: (gift: GiftOption) => void;
}

const giftOptions: GiftOption[] = [
  {
    id: 'sparkle',
    name: 'Sparkle',
    icon: Sparkles,
    credits: 5,
    xpGain: 25,
    color: 'from-yellow-500 to-amber-500',
  },
  {
    id: 'heart',
    name: 'Heart',
    icon: Heart,
    credits: 10,
    xpGain: 50,
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'star',
    name: 'Star',
    icon: Star,
    credits: 15,
    xpGain: 75,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'trophy',
    name: 'Trophy',
    icon: Trophy,
    credits: 20,
    xpGain: 100,
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'bolt',
    name: 'Lightning',
    icon: Zap,
    credits: 30,
    xpGain: 150,
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 'mega-gift',
    name: 'Mega Gift',
    icon: Gift,
    credits: 50,
    xpGain: 250,
    color: 'from-emerald-500 to-teal-500',
  },
];

export function GiftingWidget({ onClose, userCredits, selectedProfile, theme, onSendGift }: GiftingWidgetProps) {
  const [selectedGift, setSelectedGift] = useState<GiftOption | null>(null);

  const canAfford = (credits: number) => userCredits >= credits;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl shadow-black/50 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white mb-1">Send Gift</h3>
              <p className="text-sm text-zinc-400">to {selectedProfile.name}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center transition-all duration-200"
            >
              <X className="w-4 h-4 text-zinc-400" />
            </button>
          </div>

          {/* Credits Balance */}
          <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
            <span className="text-sm text-zinc-400">Your Credits</span>
            <span className="text-lg text-white">{userCredits}</span>
          </div>
        </div>

        {/* Gift Options Grid */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {giftOptions.map((gift) => {
              const IconComponent = gift.icon;
              const isSelected = selectedGift?.id === gift.id;
              const affordable = canAfford(gift.credits);

              return (
                <button
                  key={gift.id}
                  onClick={() => affordable && setSelectedGift(gift)}
                  disabled={!affordable}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : affordable
                      ? 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600 hover:bg-zinc-800'
                      : 'border-zinc-800 bg-zinc-900 opacity-40 cursor-not-allowed'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gift.color} flex items-center justify-center ${
                      !affordable ? 'grayscale' : ''
                    }`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className={`text-sm mb-1 ${affordable ? 'text-white' : 'text-zinc-600'}`}>
                        {gift.name}
                      </div>
                      <div className={`text-xs ${affordable ? 'text-zinc-400' : 'text-zinc-700'}`}>
                        {gift.credits} credits
                      </div>
                      <div className={`text-xs mt-1 ${isSelected ? 'text-emerald-400' : 'text-zinc-500'}`}>
                        +{gift.xpGain} XP
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Summary Section */}
          {selectedGift && (
            <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700 mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Selected Gift</span>
                <span className="text-white">{selectedGift.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Credits to Spend</span>
                <span className="text-white">{selectedGift.credits}</span>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-zinc-700 pt-2">
                <span className="text-zinc-400">Recipient Gains</span>
                <span className="text-emerald-400">+{selectedGift.xpGain} XP</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-sm text-zinc-400 hover:text-white transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => selectedGift && onSendGift(selectedGift)}
              disabled={!selectedGift}
              className={`flex-1 px-4 py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                selectedGift
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              }`}
            >
              <Gift className="w-4 h-4" />
              Send Gift
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}