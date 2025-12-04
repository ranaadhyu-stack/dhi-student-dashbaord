import { ChevronLeft, ChevronRight, TrendingUp, Clock, Target, AlertCircle } from 'lucide-react';
import { ExamMode } from '../ExamPrep';
import { MockTestMetrics } from './modes/MockTestMode';

export interface MCQSessionMetrics {
  accuracy: number;
  topicPerformance: { topic: string; percentage: number }[];
  avgTime: number; // in seconds
  fastestTime: number; // in seconds
  slowestTime: number; // in seconds
  questionsAnswered: number;
}

export interface AnswerWritingMetrics {
  hasAnalyzed: boolean;
  structureScore: number;
  clarityScore: number;
  relevanceScore: number;
  missingPoints: string[];
  strengths: string[];
}

interface InsightsPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  currentMode: ExamMode;
  mcqSessionState?: 'idle' | 'file-selected' | 'practicing';
  mcqMetrics?: MCQSessionMetrics;
  mockTestMetrics?: MockTestMetrics;
  answerWritingMetrics?: AnswerWritingMetrics;
  theme: 'light' | 'dark';
}

export function InsightsPanel({ isOpen, onToggle, currentMode, mcqSessionState, mcqMetrics, mockTestMetrics, answerWritingMetrics, theme }: InsightsPanelProps) {
  const renderContent = () => {
    switch (currentMode) {
      case 'past-papers':
        return (
          <div className="p-4 space-y-4">
            <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
              <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Paper Metadata</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Year:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>2024</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Board:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>CBSE</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Subject:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Mathematics</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Duration:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>3 hours</span>
                </div>
              </div>
            </div>

            <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
              <h4 className={`text-sm mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                AI Insights
              </h4>
              <div className="space-y-3 text-xs">
                <div className={`p-3 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} rounded-lg`}>
                  <p className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>Calculus appeared <span className="text-emerald-500">4 times</span> in last 10 years</p>
                </div>
                <div className={`p-3 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} rounded-lg`}>
                  <p className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>Trigonometry is the <span className="text-emerald-500">most repeated</span> topic</p>
                </div>
                <div className={`p-3 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} rounded-lg`}>
                  <p className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>Average difficulty: <span className="text-amber-500">Medium-High</span></p>
                </div>
              </div>
            </div>

            <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
              <h4 className={`text-sm mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Topic Breakdown</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Calculus</span>
                    <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>35%</span>
                  </div>
                  <div className={`h-1.5 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '35%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Algebra</span>
                    <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>25%</span>
                  </div>
                  <div className={`h-1.5 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Trigonometry</span>
                    <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>40%</span>
                  </div>
                  <div className={`h-1.5 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'mcq':
        if (mcqSessionState === 'practicing' && mcqMetrics) {
          return (
            <div className="p-4 space-y-4">
              <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
                <h4 className={`text-sm mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <Target className="w-4 h-4 text-emerald-500" />
                  Accuracy Breakdown
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Overall Accuracy</span>
                      <span className="text-emerald-500">{mcqMetrics.accuracy}%</span>
                    </div>
                    <div className={`h-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                      <div 
                        className="h-full bg-emerald-600 rounded-full transition-all duration-300" 
                        style={{ width: `${mcqMetrics.accuracy}%` }} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
                <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Topic Performance</h4>
                <div className="space-y-2 text-xs">
                  {mcqMetrics.topicPerformance.length > 0 ? (
                    mcqMetrics.topicPerformance.map((topic) => (
                      <div key={topic.topic} className={`flex justify-between p-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} rounded-lg`}>
                        <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>{topic.topic}</span>
                        <span className={topic.percentage >= 75 ? 'text-emerald-500' : topic.percentage >= 50 ? 'text-amber-500' : 'text-red-500'}>{topic.percentage}%</span>
                      </div>
                    ))
                  ) : (
                    <div className={`flex justify-between p-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} rounded-lg`}>
                      <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>No data yet</span>
                      <span className={theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}>–%</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
                <h4 className={`text-sm mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                  Time Analysis
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Avg per question:</span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{Math.floor(mcqMetrics.avgTime / 60)}m {mcqMetrics.avgTime % 60}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Fastest:</span>
                    <span className="text-emerald-500">{mcqMetrics.fastestTime > 0 ? `${Math.floor(mcqMetrics.fastestTime / 60)}m ${mcqMetrics.fastestTime % 60}s` : '–'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Slowest:</span>
                    <span className="text-amber-500">{mcqMetrics.slowestTime > 0 ? `${Math.floor(mcqMetrics.slowestTime / 60)}m ${mcqMetrics.slowestTime % 60}s` : '–'}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        
        // Idle state (empty or file-selected, not practicing)
        return (
          <div className="p-4 space-y-4">
            {/* Helper text */}
            <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-gray-50 border border-gray-200'}`}>
              <p className={`text-xs text-center ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                Insights will appear after you start practicing questions.
              </p>
            </div>

            <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
              <h4 className={`text-sm mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <Target className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`} />
                Accuracy Breakdown
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Overall Accuracy</span>
                    <span className={theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}>0%</span>
                  </div>
                  <div className={`h-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-zinc-700 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
              <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Topic Performance</h4>
              <div className="space-y-2 text-xs">
                <div className={`flex justify-between p-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} rounded-lg`}>
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>No data yet</span>
                  <span className={theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}>–%</span>
                </div>
              </div>
            </div>

            <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
              <h4 className={`text-sm mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                Time Analysis
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Avg per question:</span>
                  <span className={theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}>–</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Fastest:</span>
                  <span className={theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}>–</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Slowest:</span>
                  <span className={theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}>–</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'mock-test':
        if (mockTestMetrics) {
          return (
            <div className="p-4 space-y-4">
              <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
                <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Section Outline</h4>
                <div className="space-y-2 text-xs">
                  <div className={`p-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} rounded-lg`}>
                    <div className="flex justify-between mb-1">
                      <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>Section A - MCQs</span>
                      <span className="text-emerald-500">{mockTestMetrics.sectionA.attempted}/{mockTestMetrics.sectionA.total}</span>
                    </div>
                    <div className={`h-1 ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${(mockTestMetrics.sectionA.attempted / mockTestMetrics.sectionA.total) * 100}%` }} />
                    </div>
                  </div>
                  <div className={`p-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} rounded-lg`}>
                    <div className="flex justify-between mb-1">
                      <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>Section B - Short</span>
                      <span className="text-amber-500">{mockTestMetrics.sectionB.attempted}/{mockTestMetrics.sectionB.total}</span>
                    </div>
                    <div className={`h-1 ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${(mockTestMetrics.sectionB.attempted / mockTestMetrics.sectionB.total) * 100}%` }} />
                    </div>
                  </div>
                  <div className={`p-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} rounded-lg`}>
                    <div className="flex justify-between mb-1">
                      <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>Section C - Long</span>
                      <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>{mockTestMetrics.sectionC.attempted}/{mockTestMetrics.sectionC.total}</span>
                    </div>
                    <div className={`h-1 ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${(mockTestMetrics.sectionC.attempted / mockTestMetrics.sectionC.total) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
                <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Progress Summary</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Attempted:</span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{mockTestMetrics.totalAttempted} / {mockTestMetrics.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Remaining:</span>
                    <span className="text-amber-500">{mockTestMetrics.remaining} questions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Marked for review:</span>
                    <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>{mockTestMetrics.markedForReview} questions</span>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        
        // Idle state (empty or file-selected, not practicing)
        return (
          <div className="p-4 space-y-4">
            {/* Helper text */}
            <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-gray-50 border border-gray-200'}`}>
              <p className={`text-xs text-center ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                Insights will appear after you start practicing questions.
              </p>
            </div>

            <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
              <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Section Outline</h4>
              <div className="space-y-2 text-xs">
                <div className={`p-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} rounded-lg`}>
                  <div className="flex justify-between mb-1">
                    <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>Section A - MCQs</span>
                    <span className="text-emerald-500">0/20</span>
                  </div>
                  <div className={`h-1 ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
                <div className={`p-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} rounded-lg`}>
                  <div className="flex justify-between mb-1">
                    <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>Section B - Short</span>
                    <span className="text-amber-500">0/15</span>
                  </div>
                  <div className={`h-1 ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
                <div className={`p-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} rounded-lg`}>
                  <div className="flex justify-between mb-1">
                    <span className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>Section C - Long</span>
                    <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>0/10</span>
                  </div>
                  <div className={`h-1 ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
              <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Progress Summary</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Attempted:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>0 / 45</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Remaining:</span>
                  <span className="text-amber-500">45 questions</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}>Marked for review:</span>
                  <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>0 questions</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'answer-writing':
        if (answerWritingMetrics && answerWritingMetrics.hasAnalyzed) {
          return (
            <div className="p-4 space-y-4">
              <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
                <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Writing Score</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Structure</span>
                      <span className="text-emerald-500">{answerWritingMetrics.structureScore}/10</span>
                    </div>
                    <div className={`h-1.5 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${answerWritingMetrics.structureScore * 10}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Clarity</span>
                      <span className="text-amber-500">{answerWritingMetrics.clarityScore}/10</span>
                    </div>
                    <div className={`h-1.5 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                      <div className="h-full bg-amber-600 rounded-full" style={{ width: `${answerWritingMetrics.clarityScore * 10}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Relevance</span>
                      <span className="text-emerald-500">{answerWritingMetrics.relevanceScore}/10</span>
                    </div>
                    <div className={`h-1.5 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${answerWritingMetrics.relevanceScore * 10}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
                <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Missing Points</h4>
                <ul className={`space-y-2 text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {answerWritingMetrics.missingPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-amber-500 flex-shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
                <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Your Strengths</h4>
                <ul className={`space-y-2 text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {answerWritingMetrics.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-emerald-500 flex-shrink-0">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }
        
        // Idle state (empty or file-selected, not practicing)
        return (
          <div className="p-4 space-y-4">
            {/* Helper text */}
            <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-gray-50 border border-gray-200'}`}>
              <p className={`text-xs text-center ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                Click "Analyze Answer" to see your writing insights.
              </p>
            </div>

            <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
              <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Writing Score</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Structure</span>
                    <span className={theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}>0/10</span>
                  </div>
                  <div className={`h-1.5 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-zinc-700 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Clarity</span>
                    <span className={theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}>0/10</span>
                  </div>
                  <div className={`h-1.5 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-zinc-700 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Relevance</span>
                    <span className={theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}>0/10</span>
                  </div>
                  <div className={`h-1.5 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-zinc-700 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
              <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Missing Points</h4>
              <div className={`text-xs text-center py-2 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
                No analysis yet
              </div>
            </div>

            <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-xl`}>
              <h4 className={`text-sm mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Your Strengths</h4>
              <div className={`text-xs text-center py-2 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-400'}`}>
                No analysis yet
              </div>
            </div>
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
        } border-l ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-gray-200 bg-white'} transition-all duration-300 overflow-hidden fixed lg:relative right-0 top-0 bottom-0 z-50 lg:z-auto`}
      >
        <div className="h-full overflow-auto">
          <div className={`p-4 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
            <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
              Insights & Tools
            </h3>
          </div>
          {renderContent()}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`absolute right-0 top-1/2 -translate-y-1/2 w-6 h-12 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800' : 'bg-white border-gray-200 hover:bg-gray-100'} border border-r-0 rounded-l-lg flex items-center justify-center transition-all duration-300 z-10`}
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