import React, { useState } from 'react';
import {
  Wallet as WalletIcon,
  TrendingUp,
  Gift,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Copy,
  X,
  ChevronRight,
  Users,
  BookOpen,
  Heart,
  Search,
  Info,
  Sparkles,
} from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

interface WalletProps {
  theme: 'light' | 'dark';
}

interface XPBreakdown {
  category: string;
  xp: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface RewardItem {
  id: string;
  brand: string;
  logo: string;
  title: string;
  description: string;
  requiredXP: number;
  category: 'Food' | 'Study' | 'Fun';
  terms: string;
  discount: string;
  minOrder?: string;
  status?: 'available' | 'redeemed' | 'revealed';
  couponCode?: string;
  validTill?: string;
}

interface RedemptionHistory {
  id: string;
  date: string;
  type: 'Cashout' | 'Coupon';
  description: string;
  xpSpent: number;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const Wallet: React.FC<WalletProps> = ({ theme }) => {
  const [timeFilter, setTimeFilter] = useState<'today' | '7days' | '30days'>('30days');
  const [cashoutPanelOpen, setCashoutPanelOpen] = useState(false);
  const [rewardPanelOpen, setRewardPanelOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [cashoutAmount, setCashoutAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [scratchedRewards, setScratchedRewards] = useState<string[]>([]);
  const { addNotification } = useNotifications();

  // Wallet data
  const totalXP = 8420;
  const availableXP = 7200;
  const reservedXP = 1220;

  const xpBreakdown: XPBreakdown[] = [
    { category: 'Helped Others', xp: 2800, color: '#10b981', icon: Users },
    { category: 'Exam Prep', xp: 2100, color: '#3b82f6', icon: BookOpen },
    { category: 'Wellness', xp: 1500, color: '#ec4899', icon: Heart },
    { category: 'Research', xp: 800, color: '#f59e0b', icon: Search },
  ];

  const recentEarnings = [
    { source: 'Completed Mock Test - Physics', xp: 150, time: '2 hours ago' },
    { source: 'Helped peer with Chemistry', xp: 80, time: '5 hours ago' },
    { source: 'Daily Wellness Check-in', xp: 30, time: '1 day ago' },
    { source: 'Research Session Completion', xp: 120, time: '2 days ago' },
  ];

  const rewards: RewardItem[] = [
    {
      id: 'r1',
      brand: "Domino's Pizza",
      logo: '🍕',
      title: '₹300 off above ₹999',
      description: 'Get ₹300 discount on orders above ₹999',
      requiredXP: 4000,
      category: 'Food',
      terms: 'Valid for 30 days from redemption. Cannot be combined with other offers.',
      discount: '₹300 off',
      minOrder: '₹999',
      status: 'available',
    },
    {
      id: 'r2',
      brand: 'Online Course Platform',
      logo: '📚',
      title: '50% off any course',
      description: 'Get 50% discount on any course up to ₹2000',
      requiredXP: 6000,
      category: 'Study',
      terms: 'Valid for 60 days. One course per redemption.',
      discount: '50% off',
      minOrder: 'Max ₹2000',
      status: 'available',
    },
    {
      id: 'r3',
      brand: 'Bookstore',
      logo: '📖',
      title: '₹200 voucher',
      description: 'Get ₹200 voucher for books and stationery',
      requiredXP: 3000,
      category: 'Study',
      terms: 'Valid for 45 days. Applicable on all products.',
      discount: '₹200 voucher',
      status: 'redeemed',
      couponCode: 'BOOK200XYZ',
      validTill: 'Dec 31, 2024',
    },
    {
      id: 'r4',
      brand: 'Movie Tickets',
      logo: '🎬',
      title: 'Buy 1 Get 1 Free',
      description: 'Buy one movie ticket and get one free',
      requiredXP: 3500,
      category: 'Fun',
      terms: 'Valid for 30 days. Applicable on weekdays only.',
      discount: 'BOGO',
      status: 'available',
    },
    {
      id: 'r5',
      brand: 'Coffee Shop',
      logo: '☕',
      title: '₹150 off above ₹500',
      description: 'Get ₹150 discount on orders above ₹500',
      requiredXP: 2500,
      category: 'Food',
      terms: 'Valid for 30 days. In-store and online.',
      discount: '₹150 off',
      minOrder: '₹500',
      status: 'available',
    },
    {
      id: 'r6',
      brand: 'Fitness App',
      logo: '💪',
      title: '3 months premium',
      description: 'Get 3 months of premium membership',
      requiredXP: 5000,
      category: 'Fun',
      terms: 'Valid for new users only. Auto-renewal disabled.',
      discount: '3 months',
      status: 'available',
    },
  ];

  const redemptionHistory: RedemptionHistory[] = [
    {
      id: 'h1',
      date: 'Nov 20, 2024',
      type: 'Coupon',
      description: 'Bookstore ₹200 voucher',
      xpSpent: 3000,
      status: 'Approved',
    },
    {
      id: 'h2',
      date: 'Nov 15, 2024',
      type: 'Cashout',
      description: 'Cashout to UPI: example@upi',
      xpSpent: 5000,
      status: 'Pending',
    },
    {
      id: 'h3',
      date: 'Nov 10, 2024',
      type: 'Coupon',
      description: "Domino's ₹300 off",
      xpSpent: 4000,
      status: 'Approved',
    },
    {
      id: 'h4',
      date: 'Oct 28, 2024',
      type: 'Cashout',
      description: 'Cashout to Bank Account',
      xpSpent: 3000,
      status: 'Rejected',
    },
  ];

  const totalXPInRing = xpBreakdown.reduce((sum, item) => sum + item.xp, 0);

  const handleRewardClick = (reward: RewardItem) => {
    setSelectedReward(reward);
    setRewardPanelOpen(true);
  };

  const handleScratch = (rewardId: string) => {
    if (!scratchedRewards.includes(rewardId)) {
      setScratchedRewards([...scratchedRewards, rewardId]);
      const reward = rewards.find(r => r.id === rewardId);
      addNotification({
        title: 'Coupon Code Revealed!',
        message: `Your ${reward?.brand} coupon code has been revealed.`,
        type: 'success',
        tab: 'wallet',
      });
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const calculateCashout = (xp: string): number => {
    const xpNum = parseInt(xp) || 0;
    return Math.floor((xpNum / 1000) * 50);
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      Food: theme === 'dark' ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-50 text-orange-600',
      Study: theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600',
      Fun: theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-50 text-purple-600',
    };
    return colors[category] || '';
  };

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header & Balance */}
        <div
          className={`rounded-2xl p-6 ${
            theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between">
            {/* Left: Title */}
            <div>
              <h1 className={`text-2xl mb-1 ${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}`}>
                My Wallet
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Earned by learning, helping others, and staying consistent.
              </p>
            </div>

            {/* Right: Balance & Animation */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className={`text-3xl mb-2 ${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}`}>
                  Total XP: <span className="text-emerald-500">{totalXP.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                    Available: <span className="text-emerald-500">{availableXP.toLocaleString()}</span>
                  </span>
                  <span className={theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}>·</span>
                  <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                    Reserved: <span className="text-amber-500">{reservedXP.toLocaleString()}</span>
                  </span>
                </div>
              </div>

              {/* Wallet Icon/Animation */}
              <div
                className={`w-24 h-24 rounded-2xl flex items-center justify-center text-5xl ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20'
                    : 'bg-gradient-to-br from-emerald-100 to-teal-100'
                }`}
              >
                💰
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row: XP Ring + Redeem Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* XP Ring & Breakdown */}
          <div
            className={`rounded-2xl p-6 ${
              theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-200'
            }`}
          >
            {/* Time Filters */}
            <div className="flex items-center gap-2 mb-6">
              {[
                { id: 'today', label: 'Today' },
                { id: '7days', label: 'Last 7 Days' },
                { id: '30days', label: 'Last 30 Days' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setTimeFilter(filter.id as any)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    timeFilter === filter.id
                      ? theme === 'dark'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-emerald-50 text-emerald-600'
                      : theme === 'dark'
                      ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* XP Ring Chart */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-48 h-48">
                {/* SVG Circle Chart */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    className={theme === 'dark' ? 'stroke-zinc-800' : 'stroke-gray-200'}
                    strokeWidth="16"
                    fill="none"
                  />
                  {xpBreakdown.map((item, index) => {
                    const previousXP = xpBreakdown.slice(0, index).reduce((sum, i) => sum + i.xp, 0);
                    const startAngle = (previousXP / totalXPInRing) * 360;
                    const endAngle = ((previousXP + item.xp) / totalXPInRing) * 360;
                    const circumference = 2 * Math.PI * 80;
                    const offset = (startAngle / 360) * circumference;
                    const length = ((endAngle - startAngle) / 360) * circumference;

                    return (
                      <circle
                        key={index}
                        cx="96"
                        cy="96"
                        r="80"
                        stroke={item.color}
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${length} ${circumference}`}
                        strokeDashoffset={-offset}
                        className="transition-all duration-500"
                      />
                    );
                  })}
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className={`text-3xl mb-1 ${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}`}>
                    {availableXP.toLocaleString()}
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                    XP Available
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-3 mt-6 w-full">
                {xpBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      {item.category}
                    </span>
                    <span className={`text-sm ml-auto ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                      {item.xp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Earnings */}
            <div>
              <h3 className={`text-sm mb-3 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                Recent Earnings
              </h3>
              <div className="space-y-2">
                {recentEarnings.map((earning, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex-1">
                      <p className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                        {earning.source}
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        {earning.time}
                      </p>
                    </div>
                    <div className="text-emerald-500 text-sm">+{earning.xp} XP</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Redeem Options */}
          <div className="space-y-6">
            {/* Cashout */}
            <div
              className={`rounded-2xl p-6 ${
                theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-50'
                  }`}
                >
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className={`mb-1 ${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}`}>
                    Cashout
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Convert XP to money after approval.
                  </p>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg mb-4 ${
                  theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
                }`}
              >
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                  1000 XP ≈ ₹50
                </p>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                  Minimum: 3000 XP (₹150)
                </p>
              </div>

              <button
                onClick={() => setCashoutPanelOpen(true)}
                className={`w-full py-3 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Request Cashout
              </button>
            </div>

            {/* Rewards Store */}
            <div
              className={`rounded-2xl p-6 ${
                theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-50'
                  }`}
                >
                  <Gift className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h3 className={`mb-1 ${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}`}>
                    Rewards Store
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Use XP for partner coupons.
                  </p>
                </div>
              </div>

              {/* Rewards Grid */}
              <div className="grid grid-cols-2 gap-3">
                {rewards.slice(0, 4).map((reward) => (
                  <button
                    key={reward.id}
                    onClick={() => handleRewardClick(reward)}
                    className={`p-4 rounded-lg text-left transition-all hover:scale-105 ${
                      reward.status === 'redeemed'
                        ? theme === 'dark'
                          ? 'bg-emerald-500/10 border border-emerald-500/30'
                          : 'bg-emerald-50 border border-emerald-200'
                        : theme === 'dark'
                        ? 'bg-zinc-800 hover:bg-zinc-700'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-3xl mb-2">{reward.logo}</div>
                    <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      {reward.brand}
                    </div>
                    <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'}`}>
                      {reward.title}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-500 text-xs">{reward.requiredXP} XP</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(reward.category)}`}>
                        {reward.category}
                      </span>
                    </div>
                    {reward.status === 'redeemed' && (
                      <div className="mt-2 text-xs text-emerald-500 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Tap to Reveal
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <button
                className={`w-full mt-4 py-2 rounded-lg text-sm transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                View All Rewards ({rewards.length})
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: History + Guidelines */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Redemption History */}
          <div
            className={`lg:col-span-2 rounded-2xl p-6 ${
              theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-200'
            }`}
          >
            <h3 className={`mb-4 ${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}`}>
              Redemption History
            </h3>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr
                    className={`text-left text-xs ${
                      theme === 'dark' ? 'text-zinc-500 border-zinc-800' : 'text-gray-500 border-gray-200'
                    } border-b`}
                  >
                    <th className="pb-3 font-normal">Date</th>
                    <th className="pb-3 font-normal">Type</th>
                    <th className="pb-3 font-normal">Description</th>
                    <th className="pb-3 font-normal">XP Spent</th>
                    <th className="pb-3 font-normal">Status</th>
                    <th className="pb-3 font-normal"></th>
                  </tr>
                </thead>
                <tbody>
                  {redemptionHistory.map((item) => (
                    <tr
                      key={item.id}
                      className={`border-b ${
                        theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
                      }`}
                    >
                      <td className={`py-3 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                        {item.date}
                      </td>
                      <td className="py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.type === 'Cashout'
                              ? theme === 'dark'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-emerald-50 text-emerald-600'
                              : theme === 'dark'
                              ? 'bg-purple-500/20 text-purple-400'
                              : 'bg-purple-50 text-purple-600'
                          }`}
                        >
                          {item.type}
                        </span>
                      </td>
                      <td className={`py-3 text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                        {item.description}
                      </td>
                      <td className="py-3 text-sm text-amber-500">-{item.xpSpent}</td>
                      <td className="py-3">
                        <span
                          className={`flex items-center gap-1 text-xs ${
                            item.status === 'Approved'
                              ? 'text-emerald-500'
                              : item.status === 'Pending'
                              ? 'text-amber-500'
                              : 'text-red-500'
                          }`}
                        >
                          {item.status === 'Approved' && <CheckCircle className="w-3 h-3" />}
                          {item.status === 'Pending' && <Clock className="w-3 h-3" />}
                          {item.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button
                          className={`text-xs flex items-center gap-1 ${
                            theme === 'dark' ? 'text-zinc-400 hover:text-zinc-300' : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          View <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Guidelines Card */}
          <div
            className={`rounded-2xl p-6 ${
              theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Info className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
              <h3 className={theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}>
                How Wallet Works
              </h3>
            </div>

            <ul className="space-y-3 mb-6">
              <li className={`text-sm flex gap-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                <span className="text-emerald-500">•</span>
                <span>XP is earned for learning and helping.</span>
              </li>
              <li className={`text-sm flex gap-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                <span className="text-emerald-500">•</span>
                <span>Rewards are optional and limited each month.</span>
              </li>
              <li className={`text-sm flex gap-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                <span className="text-emerald-500">•</span>
                <span>All redemptions need institution approval.</span>
              </li>
            </ul>

            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
              Offers and coupons are partner-provided and may change. This is not financial advice.
            </p>
          </div>
        </div>
      </div>

      {/* Cashout Slide Panel */}
      {cashoutPanelOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setCashoutPanelOpen(false)}
          />
          <div
            className={`fixed top-0 right-0 h-full w-full md:w-96 z-50 shadow-xl ${
              theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div
                className={`flex items-center justify-between p-6 border-b ${
                  theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
                }`}
              >
                <h3 className={theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}>
                  Request Cashout
                </h3>
                <button
                  onClick={() => setCashoutPanelOpen(false)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* XP Amount */}
                <div>
                  <label className={`text-sm mb-2 block ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    XP Amount
                  </label>
                  <input
                    type="number"
                    value={cashoutAmount}
                    onChange={(e) => setCashoutAmount(e.target.value)}
                    placeholder="3000"
                    min="3000"
                    step="100"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                      theme === 'dark'
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-100 focus:ring-emerald-500/50'
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-emerald-500'
                    }`}
                  />
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                    Minimum: 3000 XP
                  </p>
                </div>

                {/* Conversion Display */}
                <div
                  className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-emerald-50 border border-emerald-200'
                  }`}
                >
                  <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    You will receive:
                  </p>
                  <p className="text-2xl text-emerald-500">
                    ₹{calculateCashout(cashoutAmount)}
                  </p>
                </div>

                {/* UPI ID */}
                <div>
                  <label className={`text-sm mb-2 block ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    UPI ID or Bank Reference
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                      theme === 'dark'
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-100 focus:ring-emerald-500/50'
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-emerald-500'
                    }`}
                  />
                </div>

                {/* Notice */}
                <div
                  className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-amber-50 border border-amber-200'
                  }`}
                >
                  <p className={`text-sm ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}>
                    Your institution will review and approve this request. Processing time: 3-5 business days.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div
                className={`p-6 border-t ${
                  theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
                }`}
              >
                <div className="flex gap-3">
                  <button
                    onClick={() => setCashoutPanelOpen(false)}
                    className={`flex-1 py-3 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      addNotification({
                        title: 'Cashout Request Submitted',
                        message: `Request for ₹${cashoutAmount} submitted for admin approval.`,
                        type: 'success',
                        tab: 'wallet',
                      });
                      setCashoutPanelOpen(false);
                      setCashoutAmount('');
                      setUpiId('');
                    }}
                    className={`flex-1 py-3 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    Confirm Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Reward Detail Panel */}
      {rewardPanelOpen && selectedReward && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setRewardPanelOpen(false)}
          />
          <div
            className={`fixed top-0 right-0 h-full w-full md:w-96 z-50 shadow-xl ${
              theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div
                className={`flex items-center justify-between p-6 border-b ${
                  theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
                }`}
              >
                <h3 className={theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}>
                  Reward Details
                </h3>
                <button
                  onClick={() => setRewardPanelOpen(false)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Brand */}
                <div className="text-center">
                  <div className="text-6xl mb-3">{selectedReward.logo}</div>
                  <h4 className={`text-xl mb-2 ${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}`}>
                    {selectedReward.brand}
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    {selectedReward.title}
                  </p>
                </div>

                {/* Scratch Card (if redeemed and not scratched) */}
                {selectedReward.status === 'redeemed' && !scratchedRewards.includes(selectedReward.id) && (
                  <button
                    onClick={() => handleScratch(selectedReward.id)}
                    className={`w-full p-8 rounded-xl text-center transition-all hover:scale-105 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30'
                        : 'bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200'
                    }`}
                  >
                    <Sparkles className="w-12 h-12 mx-auto mb-3 text-emerald-500" />
                    <p className={`text-lg mb-2 ${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}`}>
                      Tap to Reveal Code
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Your reward is ready!
                    </p>
                  </button>
                )}

                {/* Revealed Code */}
                {selectedReward.status === 'redeemed' && scratchedRewards.includes(selectedReward.id) && (
                  <div
                    className={`p-6 rounded-xl ${
                      theme === 'dark'
                        ? 'bg-emerald-500/10 border border-emerald-500/30'
                        : 'bg-emerald-50 border border-emerald-200'
                    }`}
                  >
                    <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Coupon Code:
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`flex-1 px-4 py-3 rounded-lg font-mono text-lg ${
                          theme === 'dark' ? 'bg-zinc-900 text-emerald-400' : 'bg-white text-emerald-600'
                        }`}
                      >
                        {selectedReward.couponCode}
                      </div>
                      <button
                        onClick={() => copyCode(selectedReward.couponCode!)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          theme === 'dark'
                            ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                      Valid till: {selectedReward.validTill}
                    </p>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h5 className={`text-sm mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Description
                  </h5>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                    {selectedReward.description}
                  </p>
                </div>

                {/* Terms */}
                <div>
                  <h5 className={`text-sm mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Terms & Conditions
                  </h5>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                    {selectedReward.terms}
                  </p>
                </div>

                {/* Required XP */}
                <div
                  className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
                  }`}
                >
                  <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Required XP:
                  </p>
                  <p className="text-2xl text-emerald-500">
                    {selectedReward.requiredXP.toLocaleString()} XP
                  </p>
                </div>

                {/* Notice (if not redeemed) */}
                {selectedReward.status !== 'redeemed' && (
                  <div
                    className={`p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-amber-50 border border-amber-200'
                    }`}
                  >
                    <p className={`text-sm ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}>
                      Redemption will be pending admin approval. You'll receive the coupon code once approved (usually within 24 hours).
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {selectedReward.status !== 'redeemed' && (
                <div
                  className={`p-6 border-t ${
                    theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
                  }`}
                >
                  <button
                    disabled={availableXP < selectedReward.requiredXP}
                    onClick={() => {
                      if (availableXP >= selectedReward.requiredXP) {
                        addNotification({
                          title: 'Reward Redeemed!',
                          message: `${selectedReward.brand} coupon redeemed for ${selectedReward.requiredXP} XP. Scratch to reveal code!`,
                          type: 'success',
                          tab: 'wallet',
                        });
                        setRewardPanelOpen(false);
                      }
                    }}
                    className={`w-full py-3 rounded-lg transition-colors ${
                      availableXP < selectedReward.requiredXP
                        ? theme === 'dark'
                          ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : theme === 'dark'
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {availableXP < selectedReward.requiredXP
                      ? `Need ${selectedReward.requiredXP - availableXP} more XP`
                      : `Redeem for ${selectedReward.requiredXP} XP`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
