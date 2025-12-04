import { ChevronLeft, ChevronRight, Trophy, Sparkles, Volume2, Network, LayoutGrid, Box, Flame, Brain, Target, Zap, TrendingUp, Lock, Star, Award, Gift, Send, FileText, Lightbulb } from 'lucide-react';
import { LearnMode } from '../LearnYourWay';
import { useState } from 'react';

interface SettingsPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  currentMode: LearnMode;
  theme: 'light' | 'dark';
  lessonState?: 'none' | 'loaded' | 'active';
  gamifiedStats?: {
    xpToday: number;
    currentLevel: number;
    xpCurrent: number;
    xpRequired: number;
    streak: number;
    skills: {
      memory: number;
      accuracy: number;
      speed: number;
      consistency: number;
    };
    unlockedBadges: number;
    xpToNextReward: number;
    tasksToStreak: number;
  };
  currentExample?: any;
  flashcardCount?: number;
  flashcardDifficulty?: 'Easy' | 'Medium' | 'Hard';
  flashcardShuffle?: boolean;
  flashcardProgress?: {
    reviewed: number;
    knowWell: number;
    needPractice: number;
  };
  onFlashcardCountChange?: (count: number) => void;
  onFlashcardDifficultyChange?: (difficulty: 'Easy' | 'Medium' | 'Hard') => void;
  onFlashcardShuffleChange?: (shuffle: boolean) => void;
}

export function SettingsPanel({ isOpen, onToggle, currentMode, theme, lessonState = 'none', gamifiedStats, currentExample, flashcardCount, flashcardDifficulty, flashcardShuffle, flashcardProgress, onFlashcardCountChange, onFlashcardDifficultyChange, onFlashcardShuffleChange }: SettingsPanelProps) {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    setMessages([...messages, { role: 'user', content: chatInput }]);
    setChatInput('');
    
    // Simulate DHI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I can help explain this content. What specific aspect would you like to understand better?' 
      }]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    let prompt = '';
    if (action === 'transcript') prompt = 'Can you provide the transcript for this video?';
    else if (action === 'summarize') prompt = 'Please summarize this content for me.';
    else if (action === 'explain') prompt = 'Explain this in simple words.';
    
    setMessages([...messages, { role: 'user', content: prompt }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Here's a ${action === 'transcript' ? 'transcript' : action === 'summarize' ? 'summary' : 'simple explanation'} of the content...` 
      }]);
    }, 1000);
  };

  const renderContent = () => {
    switch (currentMode) {
      case 'gamified':
        // State 1: No Lesson Loaded
        if (lessonState === 'none') {
          return (
            <div className="p-4 flex items-center justify-center h-64">
              <p className={`text-sm text-center ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                Insights will appear once you start learning.
              </p>
            </div>
          );
        }

        // Get stats with defaults
        const stats = gamifiedStats || {
          xpToday: 0,
          currentLevel: 1,
          xpCurrent: 0,
          xpRequired: 500,
          streak: 0,
          skills: { memory: 0, accuracy: 0, speed: 0, consistency: 0 },
          unlockedBadges: 0,
          xpToNextReward: 125,
          tasksToStreak: 3
        };

        const xpPercentage = stats.xpRequired > 0 ? (stats.xpCurrent / stats.xpRequired) * 100 : 0;
        const xpRemaining = stats.xpRequired - stats.xpCurrent;

        return (
          <div className="p-4 space-y-4">
            {/* 1. XP & Level Block */}
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'} border`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className={`text-lg mb-0.5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Level {stats.currentLevel}</div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>{stats.xpToday} XP today</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>
              
              {/* XP Progress Bar */}
              <div className="space-y-1">
                <div className={`h-2 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(xpPercentage, 100)}%`,
                      boxShadow: xpPercentage > 0 ? '0 0 8px rgba(16, 185, 129, 0.4)' : 'none'
                    }}
                  />
                </div>
                <p className={`text-xs text-right ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {xpRemaining} XP to Level {stats.currentLevel + 1}
                </p>
              </div>
            </div>

            {/* 2. Streak Block */}
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'} border`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stats.streak} {stats.streak === 1 ? 'Day' : 'Days'}</div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Current Streak</p>
                </div>
              </div>
              
              {/* 7-Day Consistency Dots */}
              <div className="flex items-center gap-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-1.5 rounded-full ${
                      i < stats.streak
                        ? 'bg-gradient-to-r from-orange-500 to-orange-400'
                        : theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 3. Skill Breakdown */}
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'} border`}>
              <h4 className={`text-xs uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Skill Breakdown</h4>
              
              <div className="space-y-3">
                {/* Memory */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Brain className="w-3 h-3 text-purple-500" />
                      <span className={`text-xs ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Memory</span>
                    </div>
                    <span className="text-xs text-purple-500">{stats.skills.memory}%</span>
                  </div>
                  <div className={`h-1 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-purple-500 rounded-full transition-all duration-300" style={{ width: `${stats.skills.memory}%` }} />
                  </div>
                </div>

                {/* Accuracy */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Target className="w-3 h-3 text-emerald-500" />
                      <span className={`text-xs ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Accuracy</span>
                    </div>
                    <span className="text-xs text-emerald-500">{stats.skills.accuracy}%</span>
                  </div>
                  <div className={`h-1 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${stats.skills.accuracy}%` }} />
                  </div>
                </div>

                {/* Speed */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-amber-500" />
                      <span className={`text-xs ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Speed</span>
                    </div>
                    <span className="text-xs text-amber-500">{stats.skills.speed}%</span>
                  </div>
                  <div className={`h-1 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-amber-500 rounded-full transition-all duration-300" style={{ width: `${stats.skills.speed}%` }} />
                  </div>
                </div>

                {/* Consistency */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3 h-3 text-blue-500" />
                      <span className={`text-xs ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Consistency</span>
                    </div>
                    <span className="text-xs text-blue-500">{stats.skills.consistency}%</span>
                  </div>
                  <div className={`h-1 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${stats.skills.consistency}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Achievements Preview */}
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'} border`}>
              <h4 className={`text-xs uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Achievements</h4>
              
              {stats.unlockedBadges === 0 ? (
                <div className={`text-xs text-center py-4 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
                  No achievements yet
                </div>
              ) : (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {/* Show unlocked badges */}
                  {stats.unlockedBadges >= 1 && (
                    <div className="flex-shrink-0">
                      <div
                        className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center"
                        style={{
                          boxShadow: '0 0 12px rgba(245, 158, 11, 0.3)'
                        }}
                      >
                        <Star className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}

                  {stats.unlockedBadges >= 2 && (
                    <div className="flex-shrink-0">
                      <div
                        className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center"
                        style={{
                          boxShadow: '0 0 12px rgba(16, 185, 129, 0.3)'
                        }}
                      >
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Show locked badges */}
                  {stats.unlockedBadges < 4 && (
                    <>
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-lg ${theme === 'dark' ? 'bg-zinc-950 border border-zinc-800' : 'bg-gray-200 border border-gray-300'} flex items-center justify-center opacity-40`}>
                          <Lock className={`w-6 h-6 ${theme === 'dark' ? 'text-zinc-700' : 'text-gray-400'}`} />
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-lg ${theme === 'dark' ? 'bg-zinc-950 border border-zinc-800' : 'bg-gray-200 border border-gray-300'} flex items-center justify-center opacity-40`}>
                          <Lock className={`w-6 h-6 ${theme === 'dark' ? 'text-zinc-700' : 'text-gray-400'}`} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* 5. Next Reward Block */}
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'} border`}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                  <Gift className="w-4 h-4 text-white" />
                </div>
                <h4 className={`text-xs ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Next Rewards</h4>
              </div>
              
              <div className={`space-y-2 text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                <p>Next reward unlocks in <span className="text-emerald-500">{stats.xpToNextReward} XP</span></p>
                <p>{stats.tasksToStreak} {stats.tasksToStreak === 1 ? 'task' : 'tasks'} to next streak milestone</p>
              </div>
            </div>
          </div>
        );

      case 'real-world':
        if (lessonState === 'none') {
          return (
            <div className="p-4 flex items-center justify-center h-64">
              <p className={`text-sm text-center ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                Insights will appear once you start learning.
              </p>
            </div>
          );
        }

        return (
          <div className="p-4 h-full flex flex-col">
            {/* Header */}
            <div className="mb-4">
              <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>DHI Assistant</span>
            </div>

            {/* Context Chip */}
            <div className={`mb-4 p-3 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'} border`}>
              <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Current video:</div>
              <div className={`text-xs ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {currentExample ? currentExample.title : 'No video selected'}
              </div>
            </div>

            {/* Quick Actions - Only show when video is selected */}
            {currentExample && (
              <div className="mb-4 space-y-2">
                <button
                  onClick={() => handleQuickAction('transcript')}
                  className={`w-full px-3 py-2 rounded-lg text-xs transition-all duration-300 flex items-center gap-2 ${
                    theme === 'dark'
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  } border`}
                >
                  <FileText className="w-3 h-3" />
                  Get transcript
                </button>
                <button
                  onClick={() => handleQuickAction('summarize')}
                  className={`w-full px-3 py-2 rounded-lg text-xs transition-all duration-300 flex items-center gap-2 ${
                    theme === 'dark'
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  } border`}
                >
                  <Sparkles className="w-3 h-3" />
                  Summarize this
                </button>
                <button
                  onClick={() => handleQuickAction('explain')}
                  className={`w-full px-3 py-2 rounded-lg text-xs transition-all duration-300 flex items-center gap-2 ${
                    theme === 'dark'
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  } border`}
                >
                  <Lightbulb className="w-3 h-3" />
                  Explain in simple words
                </button>
              </div>
            )}

            {/* Chat History - Scrollable */}
            <div className="flex-1 overflow-auto mb-4 space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${
                    msg.role === 'user' 
                      ? 'ml-4' 
                      : 'mr-4'
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl text-xs ${
                      msg.role === 'user'
                        ? theme === 'dark'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-500 text-white'
                        : theme === 'dark'
                          ? 'bg-zinc-900 border-zinc-800 text-zinc-300 border'
                          : 'bg-gray-50 border-gray-200 text-gray-700 border'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="relative">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about this video…"
                className={`w-full pl-3 pr-10 py-2 rounded-lg text-sm focus:outline-none transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-emerald-500/50' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500/50'
                } border`}
              />
              <button
                onClick={handleSendMessage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 flex items-center justify-center"
              >
                <Send className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
        );

      case 'story':
        if (lessonState === 'none') {
          return (
            <div className="p-4 flex items-center justify-center h-64">
              <p className={`text-sm text-center ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                Insights will appear once you start learning.
              </p>
            </div>
          );
        }

        return (
          <div className="p-4 space-y-4">
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'} border`}>
              <div className="flex items-center gap-3 mb-4">
                <Volume2 className="w-5 h-5 text-emerald-500" />
                <h4 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Audio Settings</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`text-xs mb-2 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Playback Speed</label>
                  <select defaultValue="1" className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-zinc-950 border-zinc-800 text-white focus:border-zinc-700'
                      : 'bg-white border-gray-200 text-gray-900 focus:border-gray-300'
                  } border`}>
                    <option value="0.75">0.75x</option>
                    <option value="1">1.0x (Normal)</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                  </select>
                </div>

                <div>
                  <label className={`text-xs mb-2 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Language</label>
                  <select className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-zinc-950 border-zinc-800 text-white focus:border-zinc-700'
                      : 'bg-white border-gray-200 text-gray-900 focus:border-gray-300'
                  } border`}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>

                <div>
                  <label className={`text-xs mb-2 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Voice Style</label>
                  <select className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-zinc-950 border-zinc-800 text-white focus:border-zinc-700'
                      : 'bg-white border-gray-200 text-gray-900 focus:border-gray-300'
                  } border`}>
                    <option value="calm">Calm & Narrative</option>
                    <option value="energetic">Energetic</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
              </div>
            </div>

            <label className={`flex items-center gap-2 text-sm cursor-pointer p-4 rounded-xl transition-all duration-300 ${
              theme === 'dark'
                ? 'text-zinc-300 bg-zinc-900 border-zinc-800 hover:bg-zinc-800'
                : 'text-gray-700 bg-gray-50 border-gray-200 hover:bg-gray-100'
            } border`}>
              <input
                type="checkbox"
                defaultChecked
                className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-zinc-950 border-zinc-700' : 'bg-white border-gray-300'}`}
              />
              <span>Show Transcript</span>
            </label>
          </div>
        );

      case 'mind-map':
        if (lessonState === 'none') {
          return (
            <div className="p-4 flex items-center justify-center h-64">
              <p className={`text-sm text-center ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                Insights will appear once you start learning.
              </p>
            </div>
          );
        }

        return (
          <div className="p-4 space-y-4">
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'} border`}>
              <div className="flex items-center gap-3 mb-4">
                <Network className="w-5 h-5 text-emerald-500" />
                <h4 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Map Controls</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`text-xs mb-2 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Depth Level</label>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    defaultValue="2"
                    className="w-full"
                  />
                  <div className={`flex justify-between text-xs mt-1 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
                    <span>Main</span>
                    <span>Medium</span>
                    <span>Deep</span>
                  </div>
                </div>

                <label className={`flex items-center gap-2 text-sm cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                  <input
                    type="checkbox"
                    defaultChecked
                    className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-zinc-950 border-zinc-700' : 'bg-white border-gray-300'}`}
                  />
                  <span>Show Node Labels</span>
                </label>

                <label className={`flex items-center gap-2 text-sm cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                  <input
                    type="checkbox"
                    className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-zinc-950 border-zinc-700' : 'bg-white border-gray-300'}`}
                  />
                  <span>Main Ideas Only</span>
                </label>
              </div>
            </div>

            <button className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
            } border`}>
              Expand All Nodes
            </button>
          </div>
        );

      case 'flashcards':
        if (lessonState === 'none') {
          return (
            <div className="p-4 flex items-center justify-center h-64">
              <p className={`text-sm text-center ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                Insights will appear once you start learning.
              </p>
            </div>
          );
        }

        return (
          <div className="p-4 space-y-4">
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'} border`}>
              <div className="flex items-center gap-3 mb-4">
                <LayoutGrid className="w-5 h-5 text-emerald-500" />
                <h4 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Card Settings</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`text-xs mb-2 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Difficulty</label>
                  <div className="flex gap-2">
                    {['Easy', 'Medium', 'Hard'].map((level) => (
                      <button
                        key={level}
                        className={`flex-1 px-3 py-2 rounded-lg text-xs transition-all duration-300 ${
                          level === flashcardDifficulty
                            ? 'bg-emerald-600 text-white'
                            : theme === 'dark'
                              ? 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => onFlashcardDifficultyChange?.(level as 'Easy' | 'Medium' | 'Hard')}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`text-xs mb-2 block ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Card Count</label>
                  <select 
                    value={flashcardCount || 20} 
                    onChange={(e) => onFlashcardCountChange?.(parseInt(e.target.value))}
                    className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-zinc-950 border-zinc-800 text-white focus:border-zinc-700'
                      : 'bg-white border-gray-200 text-gray-900 focus:border-gray-300'
                  } border`}>
                    <option value="10">10 cards</option>
                    <option value="20">20 cards</option>
                    <option value="30">30 cards</option>
                    <option value="50">50 cards</option>
                  </select>
                </div>

                <label className={`flex items-center gap-2 text-sm cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                  <input
                    type="checkbox"
                    checked={flashcardShuffle || false}
                    onChange={(e) => onFlashcardShuffleChange?.(e.target.checked)}
                    className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-zinc-950 border-zinc-700' : 'bg-white border-gray-300'}`}
                  />
                  <span>Shuffle Cards</span>
                </label>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'} border`}>
              <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Your Progress</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Cards Reviewed:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{flashcardProgress?.reviewed || 0} / {flashcardCount || 20}</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Know Well:</span>
                  <span className="text-emerald-500">{flashcardProgress?.knowWell || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Need Practice:</span>
                  <span className="text-amber-500">{flashcardProgress?.needPractice || 0}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case '3d':
        return (
          <div className="p-4 space-y-4">
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'} border`}>
              <div className="flex items-center gap-3 mb-4">
                <Box className="w-5 h-5 text-emerald-500" />
                <h4 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Model Metadata</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Type:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Plant Cell</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Hotspots:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>12</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Resolution:</span>
                  <span className="text-emerald-500">High</span>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'} border`}>
              <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>View Options</h4>
              <div className="space-y-2">
                <button className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                } border`}>
                  Cross Section View
                </button>
                <button className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                } border`}>
                  Exploded View
                </button>
                <button className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                } border`}>
                  Labeled View
                </button>
              </div>
            </div>

            <label className={`flex items-center gap-2 text-sm cursor-pointer p-4 rounded-xl transition-all duration-300 ${
              theme === 'dark'
                ? 'text-zinc-300 bg-zinc-900 border-zinc-800 hover:bg-zinc-800'
                : 'text-gray-700 bg-gray-50 border-gray-200 hover:bg-gray-100'
            } border`}>
              <input
                type="checkbox"
                defaultChecked
                className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-zinc-950 border-zinc-700' : 'bg-white border-gray-300'}`}
              />
              <span>Show Labels</span>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div
        className={`${
          isOpen ? 'w-full sm:w-80' : 'w-0'
        } ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-gray-200 bg-white'} border-l transition-all duration-300 overflow-hidden fixed lg:relative right-0 top-0 bottom-0 z-50 lg:z-auto`}
      >
        <div className="h-full overflow-auto">
          <div className={`p-4 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
            <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Insights & Tools</h3>
          </div>
          {renderContent()}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`absolute right-0 top-1/2 -translate-y-1/2 w-6 h-12 rounded-l-lg flex items-center justify-center transition-all duration-300 z-10 ${
          theme === 'dark'
            ? 'bg-zinc-900 border border-zinc-800 border-r-0 hover:bg-zinc-800'
            : 'bg-white border border-gray-200 border-r-0 hover:bg-gray-50'
        }`}
        style={{ right: isOpen ? '320px' : '0px' }}
      >
        {isOpen ? (
          <ChevronRight className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
        ) : (
          <ChevronLeft className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
        )}
      </button>
    </>
  );
}