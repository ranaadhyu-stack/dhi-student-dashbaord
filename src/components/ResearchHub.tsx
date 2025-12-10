import { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Send,
  BookOpen,
  Lightbulb,
  X,
  Check,
  Save,
  Sparkles,
  RotateCw,
  Maximize2,
  Download,
  Share2,
  FileBox,
  Mic,
  FileText,
} from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { FileSelectionModal, FileItem } from './learn/FileSelectionModal';

interface ResearchHubProps {
  theme: 'light' | 'dark';
}

interface ChapterSection {
  id: string;
  title: string;
  subsections?: ChapterTopic[];
}

interface ChapterTopic {
  id: string;
  title: string;
  keyInsights?: string[];
  rememberThis?: string;
  definitions?: string[];
  diagram?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface SavedTopic {
  id: string;
  title: string;
  insights: string[];
  rememberThis?: string;
  definitions?: string[];
  diagram?: string;
}

// Curriculum data structure
const subjects = [
  {
    id: 'biology',
    name: 'Biology',
    chapters: [
      { id: 'bio-1', name: 'Cell Structure and Function' },
      { id: 'bio-2', name: 'Photosynthesis' },
      { id: 'bio-3', name: 'Cellular Respiration' },
      { id: 'bio-4', name: 'DNA and Genetics' },
      { id: 'bio-5', name: 'Evolution and Natural Selection' },
    ],
  },
  {
    id: 'physics',
    name: 'Physics',
    chapters: [
      { id: 'phy-1', name: 'Motion and Forces' },
      { id: 'phy-2', name: 'Energy and Work' },
      { id: 'phy-3', name: 'Waves and Sound' },
      { id: 'phy-4', name: 'Electricity and Magnetism' },
      { id: 'phy-5', name: 'Quantum Mechanics' },
    ],
  },
  {
    id: 'maths',
    name: 'Mathematics',
    chapters: [
      { id: 'math-1', name: 'Algebra and Functions' },
      { id: 'math-2', name: 'Calculus - Differentiation' },
      { id: 'math-3', name: 'Calculus - Integration' },
      { id: 'math-4', name: 'Trigonometry' },
      { id: 'math-5', name: 'Statistics and Probability' },
    ],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    chapters: [
      { id: 'chem-1', name: 'Atomic Structure' },
      { id: 'chem-2', name: 'Chemical Bonding' },
      { id: 'chem-3', name: 'Acids and Bases' },
      { id: 'chem-4', name: 'Organic Chemistry' },
      { id: 'chem-5', name: 'Thermodynamics' },
    ],
  },
  {
    id: 'history',
    name: 'History',
    chapters: [
      { id: 'hist-1', name: 'World War I' },
      { id: 'hist-2', name: 'World War II' },
      { id: 'hist-3', name: 'The Cold War' },
      { id: 'hist-4', name: 'Industrial Revolution' },
      { id: 'hist-5', name: 'Renaissance Period' },
    ],
  },
];

export function ResearchHub({ theme }: ResearchHubProps) {
  const [sessionActive, setSessionActive] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [sessionId, setSessionId] = useState('');
  const [showEndModal, setShowEndModal] = useState(false);

  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<ChapterTopic | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [savedTopics, setSavedTopics] = useState<SavedTopic[]>([]);
  const [diagramFullScreen, setDiagramFullScreen] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [conversationExpanded, setConversationExpanded] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [summaryGenerated, setSummaryGenerated] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const { addNotification } = useNotifications();

  // Sample chapter structure (Photosynthesis)
  const chapterStructure: ChapterSection[] = [
    {
      id: 'intro',
      title: 'Introduction',
      subsections: [
        { id: 'intro-1', title: 'What is Photosynthesis?' },
        { id: 'intro-2', title: 'Why is it Important?' },
      ],
    },
    {
      id: 'section-1',
      title: 'Light-Dependent Reactions',
      subsections: [
        { id: 's1-1', title: 'Chloroplast Structure' },
        { id: 's1-2', title: 'Light Absorption by Chlorophyll' },
        { id: 's1-3', title: 'Electron Transport Chain' },
        { id: 's1-4', title: 'ATP and NADPH Production' },
      ],
    },
    {
      id: 'section-2',
      title: 'Light-Independent Reactions (Calvin Cycle)',
      subsections: [
        { id: 's2-1', title: 'Carbon Fixation' },
        { id: 's2-2', title: 'Reduction Phase' },
        { id: 's2-3', title: 'Regeneration of RuBP' },
      ],
    },
    {
      id: 'section-3',
      title: 'Factors Affecting Photosynthesis',
      subsections: [
        { id: 's3-1', title: 'Light Intensity' },
        { id: 's3-2', title: 'Carbon Dioxide Concentration' },
        { id: 's3-3', title: 'Temperature' },
      ],
    },
    {
      id: 'summary',
      title: 'Summary',
      subsections: [
        { id: 'sum-1', title: 'Key Takeaways' },
        { id: 'sum-2', title: 'Common Misconceptions' },
      ],
    },
  ];

  const sampleTopicData: Record<string, ChapterTopic> = {
    's1-2': {
      id: 's1-2',
      title: 'Light Absorption by Chlorophyll',
      keyInsights: [
        'Chlorophyll is the primary pigment responsible for capturing light energy in photosynthesis',
        'There are two main types: Chlorophyll a (absorbs blue-violet and red light) and Chlorophyll b (absorbs blue and orange light)',
        'Chlorophyll molecules are organized in photosystems (PSI and PSII) within the thylakoid membrane',
        'When light hits chlorophyll, electrons become excited and jump to higher energy levels',
        'The wavelengths of light absorbed correspond to the action spectrum of photosynthesis',
        'Green light is reflected, which is why plants appear green to our eyes',
        'Accessory pigments (carotenoids, xanthophylls) capture additional light wavelengths',
      ],
      rememberThis:
        'Chlorophyll absorbs RED and BLUE light most effectively, but reflects GREEN light—that\'s why leaves look green!',
      definitions: [
        'Photosystem: A complex of proteins and pigments that captures light energy',
        'Action Spectrum: A graph showing which wavelengths of light are most effective for photosynthesis',
        'Thylakoid: Membrane-bound compartment inside chloroplasts where light reactions occur',
      ],
      diagram: '🌿 [Diagram: Chlorophyll molecule structure with light absorption spectrum]',
    },
  };

  const generateSessionId = () => {
    const part1 = Math.floor(1000 + Math.random() * 9000);
    const part2 = Math.floor(100 + Math.random() * 900);
    return `${part1}-${part2}`;
  };

  const handleStartSession = () => {
    if (!selectedFile) return;
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setSessionActive(true);
    // Don't auto-open panel - let user open it when ready

    // Initialize with welcome message
    setChatMessages([
      {
        id: '1',
        role: 'assistant',
        content: `✅ Session started! I've broken down "${getSelectedChapterName()}" into structured sections. Click any topic from the chapter breakdown to begin.`,
        timestamp: new Date(),
      },
    ]);

    addNotification({
      title: 'Chapter Studio Session Started',
      message: `Session ${newSessionId} for "${getSelectedChapterName()}" has begun.`,
      type: 'success',
      tab: 'chapter',
    });
  };

  const handleEndSessionClick = () => {
    setShowEndModal(true);
  };

  const handleConfirmEndSession = () => {
    addNotification({
      title: 'Chapter Studio Session Ended',
      message: `Session completed with ${savedTopics.length} topics saved.`,
      type: 'info',
      tab: 'chapter',
    });

    // Reset all state
    setSessionActive(false);
    // Keep selectedFile for convenience, or clear it if preferred
    // setSelectedFile(null); 
    setSessionId('');
    setShowEndModal(false);
    setSelectedTopic(null);
    setChatMessages([]);
    setSavedTopics([]);
    setLeftPanelOpen(false);
    setRightPanelOpen(false);
    setExpandedSections(new Set());
    setInputMessage('');
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleTopicClick = (topic: ChapterTopic) => {
    const topicData = sampleTopicData[topic.id] || {
      ...topic,
      keyInsights: [
        'This is a sample insight for ' + topic.title,
        'Detailed content would be generated by AI',
        'Multiple key points would be listed here',
      ],
      rememberThis: 'Key concept to remember about ' + topic.title,
      definitions: ['Sample definition 1', 'Sample definition 2'],
      diagram: '📊 [Sample diagram for ' + topic.title + ']',
    };
    setSelectedTopic(topicData);
    setRightPanelOpen(true);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setChatMessages([...chatMessages, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about "${inputMessage}". Let me help you with that...`,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleSaveTopic = () => {
    if (!selectedTopic) return;
    const savedTopic: SavedTopic = {
      id: selectedTopic.id,
      title: selectedTopic.title,
      insights: selectedTopic.keyInsights || [],
      rememberThis: selectedTopic.rememberThis,
      definitions: selectedTopic.definitions,
      diagram: selectedTopic.diagram,
    };
    setSavedTopics([...savedTopics, savedTopic]);

    addNotification({
      title: 'Topic Saved',
      message: `"${selectedTopic.title}" has been saved to your collection.`,
      type: 'success',
      tab: 'chapter',
    });
  };

  const handleGenerateSummaryClick = () => {
    setShowSummaryModal(true);
  };

  const handleConfirmGenerateSummary = () => {
    setShowSummaryModal(false);
    setSummaryGenerated(true);

    // Show success toast
    setShowSuccessToast(true);

    // Auto-hide toast after 4 seconds
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const getSelectedChapterName = () => {
    return selectedFile?.name.replace('.pdf', '').replace('.docx', '') || '';
  };

  const canStartSession = !!selectedFile;

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
    setShowFileModal(false);
  };

  return (
    <div
      className={`flex flex-col h-full relative overflow-hidden ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'
        }`}
    >
      {/* Header Bar - Only shown in Chapter Studio */}
      <div
        className={`border-b px-6 py-4 flex items-center justify-between ${theme === 'dark'
          ? 'bg-zinc-900/95 border-zinc-800'
          : 'bg-white/95 border-gray-200'
          }`}
        style={{ backdropFilter: 'blur(10px)' }}
      >
        {/* Left - Session ID & Chapter Structure Button */}
        <div className="flex-1 flex items-center gap-3">
          {sessionId && (
            <>
              <button
                onClick={() => setLeftPanelOpen(!leftPanelOpen)}
                className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 transition-all ${leftPanelOpen
                  ? theme === 'dark'
                    ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  : theme === 'dark'
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500 animate-pulse'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 animate-pulse'
                  }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Chapter Structure
              </button>
              <span
                className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
                  }`}
              >
                Session ID: {sessionId}
              </span>
            </>
          )}
        </div>

        {/* Center - Open Lesson and Start Button */}
        <div className="flex items-center gap-3">
          {/* Selected File Display */}
          {selectedFile && (
            <div className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border ${theme === 'dark'
              ? 'bg-zinc-800/50 border-zinc-700 text-zinc-300'
              : 'bg-gray-50 border-gray-200 text-gray-700'
              }`}>
              <FileText className="w-4 h-4" />
              <span className="truncate max-w-[200px]">{selectedFile.name}</span>
              {!sessionActive && (
                <button
                  onClick={() => setSelectedFile(null)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}



          {/* Start Session Button */}
          {!sessionActive && selectedFile && (
            <button
              onClick={handleStartSession}
              disabled={!canStartSession}
              className={`px-6 py-2 rounded-lg text-sm transition-all ${!canStartSession
                ? theme === 'dark'
                  ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : theme === 'dark'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
            >
              Start Session
            </button>
          )}
        </div>

        {/* Right - End Session Button */}
        <div className="flex-1 flex justify-end gap-3">
          {sessionActive && (
            <>
              {/* Generate Summary Button */}
              <button
                onClick={handleGenerateSummaryClick}
                disabled={savedTopics.length === 0 || summaryGenerated}
                className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${summaryGenerated
                  ? theme === 'dark'
                    ? 'bg-emerald-500/20 text-emerald-400 cursor-default'
                    : 'bg-emerald-50 text-emerald-600 cursor-default'
                  : savedTopics.length === 0
                    ? theme === 'dark'
                      ? 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed opacity-50'
                      : 'bg-gray-100/50 text-gray-400 cursor-not-allowed opacity-50'
                    : theme === 'dark'
                      ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
              >
                {summaryGenerated ? (
                  <>
                    <Check className="w-4 h-4" />
                    Summary Generated
                  </>
                ) : (
                  <>
                    <FileBox className="w-4 h-4" />
                    Generate Summary
                  </>
                )}
              </button>

              {/* End Session Button */}
              <button
                onClick={handleEndSessionClick}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${theme === 'dark'
                  ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30 hover:text-red-300 border border-red-600/20'
                  : 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-200'
                  }`}
              >
                End Session
              </button>
            </>
          )}
        </div>
      </div>

      {/* End Session Modal */}
      {showEndModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <div
            className={`w-full max-w-md mx-4 rounded-xl p-6 ${theme === 'dark'
              ? 'bg-zinc-900 border border-zinc-800'
              : 'bg-white border border-gray-200'
              }`}
          >
            <h3
              className={`text-lg mb-3 ${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
                }`}
            >
              End Session?
            </h3>
            <p
              className={`text-sm mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                }`}
            >
              Are you sure you want to end this session? Your unsaved notes will not be
              included in the final summary.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowEndModal(false)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${theme === 'dark'
                  ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmEndSession}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${theme === 'dark'
                  ? 'bg-red-600 text-white hover:bg-red-500'
                  : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
              >
                End Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left Panel - Chapter Breakdown */}
      {sessionActive && (
        <div
          className={`absolute top-[73px] left-0 bottom-0 w-80 z-40 transition-all duration-500 ease-out ${leftPanelOpen ? 'translate-x-0' : '-translate-x-full'
            } ${theme === 'dark'
              ? 'bg-zinc-900 border-r border-zinc-800'
              : 'bg-white border-r border-gray-200'
            }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div
              className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
                }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen
                  className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}
                />
                <h3 className={theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}>
                  Chapter Structure
                </h3>
              </div>
              <button
                onClick={() => setLeftPanelOpen(false)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'
                  }`}
              >
                <X className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Chapter Title */}
            <div
              className={`p-4 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}
            >
              <h2 className={`text-lg ${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}`}>
                {getSelectedChapterName()}
              </h2>
            </div>

            {/* Scrollable Outline */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {chapterStructure.map((section) => (
                <div key={section.id}>
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`w-full flex items-center gap-2 p-3 rounded-xl text-left transition-colors ${theme === 'dark'
                      ? 'hover:bg-zinc-800 text-zinc-200'
                      : 'hover:bg-gray-100 text-gray-800'
                      }`}
                  >
                    {section.subsections && (
                      <>
                        {expandedSections.has(section.id) ? (
                          <ChevronDown className="w-4 h-4 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 flex-shrink-0" />
                        )}
                      </>
                    )}
                    <span className="text-sm">{section.title}</span>
                  </button>

                  {/* Subsections */}
                  {expandedSections.has(section.id) && section.subsections && (
                    <div className="ml-6 mt-1 space-y-1">
                      {section.subsections.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => handleTopicClick(topic)}
                          className={`w-full flex items-center gap-2 p-2.5 rounded-lg text-left transition-colors ${selectedTopic?.id === topic.id
                            ? theme === 'dark'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-emerald-50 text-emerald-600'
                            : theme === 'dark'
                              ? 'hover:bg-zinc-800 text-zinc-400'
                              : 'hover:bg-gray-50 text-gray-600'
                            }`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                          <span className="text-sm">{topic.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toggle Button for Diagram Panel */}
        {sessionActive && selectedTopic && (
          <div className="absolute top-20 right-4 z-30">
            <button
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all shadow-lg ${rightPanelOpen
                ? theme === 'dark'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
                : theme === 'dark'
                  ? 'bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 hover:bg-zinc-800 text-zinc-400'
                  : 'bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-gray-100 text-gray-600'
                }`}
            >
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Center Panel Content */}
        <div className="flex-1 overflow-y-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            {!sessionActive ? (
              /* Welcome View */
              /* Welcome View */
              <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden min-h-[60vh]">
                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

                {/* Glass Card Container */}
                <div className={`relative z-10 p-12 rounded-3xl border backdrop-blur-xl flex flex-col items-center max-w-2xl w-full text-center transition-all ${theme === 'dark'
                  ? 'bg-zinc-900/40 border-white/5 shadow-2xl shadow-black/50'
                  : 'bg-white/60 border-gray-200/50 shadow-xl shadow-emerald-500/5'
                  }`}>

                  {/* Pulsing Dhi Orb */}
                  <div className="relative mb-8 group cursor-pointer" onClick={() => setShowFileModal(true)}>
                    <div className={`absolute inset-0 rounded-full blur-xl animate-pulse transition-all duration-1000 ${theme === 'dark' ? 'bg-emerald-500/30' : 'bg-emerald-400/40'
                      }`} />
                    <div className={`relative w-24 h-24 rounded-full flex items-center justify-center border transition-all duration-500 group-hover:scale-105 ${theme === 'dark'
                      ? 'bg-zinc-900/80 border-emerald-500/30 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]'
                      : 'bg-white/80 border-emerald-400/30 shadow-[0_0_30px_-5px_rgba(52,211,153,0.3)]'
                      }`}>
                      <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-[spin_8s_linear_infinite]" />
                      <Sparkles className={`w-10 h-10 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}`} />
                    </div>
                  </div>

                  {/* Typography */}
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme === 'dark'
                      ? 'from-white via-emerald-200 to-emerald-400'
                      : 'from-gray-900 via-emerald-800 to-emerald-600'
                      }`}>
                      Dhi Studio
                    </span>
                  </h1>

                  <p className={`text-lg mb-8 max-w-md font-light leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                    Initialize your learning session. Upload a lesson to begin neural analysis.
                  </p>

                  {/* Action Area */}
                  <button
                    onClick={() => setShowFileModal(true)}
                    className={`group relative px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${theme === 'dark'
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40'
                      : 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40'
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5" />
                      <span>Open Lesson Material</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>

                  <div className={`mt-6 text-xs uppercase tracking-widest font-semibold opacity-40 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                    AI-Powered Curriculum Analysis
                  </div>
                </div>
              </div>
            ) : selectedTopic ? (
              /* Topic Summary View */
              <div className="space-y-6">
                {/* Topic Header */}
                <div>
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className={`text-sm mb-3 flex items-center gap-1 ${theme === 'dark'
                      ? 'text-zinc-400 hover:text-zinc-300'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Back to chat
                  </button>
                  <h1
                    className={`text-3xl mb-2 ${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
                      }`}
                  >
                    {selectedTopic.title}
                  </h1>
                </div>

                {/* Key Insights */}
                <div
                  className={`rounded-xl p-6 ${theme === 'dark'
                    ? 'bg-zinc-900 border border-zinc-800'
                    : 'bg-white border border-gray-200'
                    }`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb
                      className={`w-5 h-5 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                        }`}
                    />
                    <h3 className={theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}>
                      Key Insights
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {selectedTopic.keyInsights?.map((insight, index) => (
                      <li
                        key={index}
                        className={`flex gap-3 text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                          }`}
                      >
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${theme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-600'
                            }`}
                        />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Remember This */}
                {selectedTopic.rememberThis && (
                  <div
                    className={`rounded-xl p-6 ${theme === 'dark'
                      ? 'bg-emerald-500/10 border border-emerald-500/30'
                      : 'bg-emerald-50 border border-emerald-200'
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                          }`}
                      />
                      <div>
                        <h4
                          className={`text-sm mb-2 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'
                            }`}
                        >
                          Remember This
                        </h4>
                        <p
                          className={`text-sm ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'
                            }`}
                        >
                          {selectedTopic.rememberThis}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Definitions */}
                {selectedTopic.definitions && selectedTopic.definitions.length > 0 && (
                  <div
                    className={`rounded-xl p-6 ${theme === 'dark'
                      ? 'bg-zinc-900 border border-zinc-800'
                      : 'bg-white border border-gray-200'
                      }`}
                  >
                    <h3
                      className={`mb-4 ${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}`}
                    >
                      Definitions & Formulas
                    </h3>
                    <div className="space-y-3">
                      {selectedTopic.definitions.map((def, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg text-sm ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
                            }`}
                        >
                          <p className={theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}>
                            {def}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Save Topic Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveTopic}
                    disabled={savedTopics.some((t) => t.id === selectedTopic.id)}
                    className={`py-2.5 px-6 rounded-lg text-sm transition-colors flex items-center gap-2 ${savedTopics.some((t) => t.id === selectedTopic.id)
                      ? theme === 'dark'
                        ? 'bg-emerald-500/20 text-emerald-400 cursor-default'
                        : 'bg-emerald-50 text-emerald-600 cursor-default'
                      : theme === 'dark'
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                  >
                    {savedTopics.some((t) => t.id === selectedTopic.id) ? (
                      <>
                        <Check className="w-4 h-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save This Topic
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* Chat Messages View */
              <div className="space-y-4 pb-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-5 py-3 ${message.role === 'user'
                        ? theme === 'dark'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-600 text-white'
                        : theme === 'dark'
                          ? 'bg-zinc-800/60 border border-zinc-700/50 text-zinc-100'
                          : 'bg-white border border-gray-200 text-gray-900'
                        }`}
                      style={{
                        boxShadow:
                          message.role === 'assistant'
                            ? theme === 'dark'
                              ? '0 1px 2px 0 rgba(0, 0, 0, 0.3)'
                              : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                            : 'none',
                      }}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>


      </div>

      {/* Right Panel - Diagram View */}
      {sessionActive && selectedTopic && (
        <div
          className={`absolute top-[73px] right-0 bottom-0 w-96 z-40 transition-all duration-500 ease-out ${rightPanelOpen ? 'translate-x-0' : 'translate-x-full'
            } ${theme === 'dark'
              ? 'bg-zinc-900 border-l border-zinc-800'
              : 'bg-white border-l border-gray-200'
            }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div
              className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
                }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles
                  className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}
                />
                <h3 className={theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}>
                  Diagram View
                </h3>
              </div>
              <button
                onClick={() => setRightPanelOpen(false)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'
                  }`}
              >
                <X className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Diagram Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Topic Title */}
              <h4
                className={`text-sm mb-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}
              >
                {selectedTopic.title}
              </h4>

              {/* Diagram Container */}
              <div
                className={`aspect-square rounded-xl mb-6 flex items-center justify-center cursor-pointer transition-all hover:scale-[1.02] ${theme === 'dark'
                  ? 'bg-zinc-800 border border-zinc-700 hover:border-zinc-600'
                  : 'bg-gray-50 border border-gray-200 hover:border-gray-300'
                  }`}
                onClick={() => setDiagramFullScreen(true)}
              >
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">📊</div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                    AI-generated diagram
                  </p>
                  <p
                    className={`text-xs mt-2 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
                      }`}
                  >
                    Click to view full screen
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  className={`w-full py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 ${theme === 'dark'
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <RotateCw className="w-4 h-4" />
                  Regenerate Diagram
                </button>

                <button
                  className={`w-full py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 ${theme === 'dark'
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <Download className="w-4 h-4" />
                  Download PNG
                </button>

                <button
                  onClick={() => setDiagramFullScreen(true)}
                  className={`w-full py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 ${theme === 'dark'
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <Maximize2 className="w-4 h-4" />
                  View Full Screen
                </button>

                <button
                  className={`w-full py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 ${theme === 'dark'
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                >
                  <Share2 className="w-4 h-4" />
                  Add to SharePoint
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Diagram Modal */}
      {diagramFullScreen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90"
          onClick={() => setDiagramFullScreen(false)}
        >
          <button
            onClick={() => setDiagramFullScreen(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center flex-1">
            <div className="text-center">
              <div className="text-9xl mb-6">📊</div>
              <p className="text-white text-lg mb-2">AI-generated diagram</p>
              <p className="text-white/60 text-sm">{selectedTopic?.title}</p>
            </div>
          </div>

          <div className="p-6 flex gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Add to SharePoint
            </button>
          </div>
        </div>
      )}

      {/* Premium Google-Level Floating Chat Input */}
      {sessionActive && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="w-full max-w-3xl pointer-events-auto">
            {/* Expandable Conversation Panel */}
            <div
              className={`transition-all duration-300 ease-out overflow-hidden ${conversationExpanded && chatMessages.length > 1 ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div
                className={`mx-6 mb-3 rounded-2xl overflow-hidden ${theme === 'dark'
                  ? 'bg-zinc-900/90 border border-zinc-700/50'
                  : 'bg-white/90 border border-gray-200/50'
                  }`}
                style={{
                  backdropFilter: 'blur(20px)',
                  boxShadow: theme === 'dark'
                    ? '0 8px 16px rgba(0, 0, 0, 0.4)'
                    : '0 8px 16px rgba(0, 0, 0, 0.08)',
                }}
              >
                {/* Header */}
                <div
                  className={`flex items-center justify-between px-4 py-3 border-b ${theme === 'dark' ? 'border-zinc-700/50' : 'border-gray-200/50'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className={`w-4 h-4 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>
                      Recent Conversation
                    </span>
                  </div>
                  <button
                    onClick={() => setConversationExpanded(false)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'
                      }`}
                  >
                    <X className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`} />
                  </button>
                </div>

                {/* Messages */}
                <div className="max-h-60 overflow-y-auto p-4 space-y-3">
                  {chatMessages.slice(-5).map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${message.role === 'user'
                          ? theme === 'dark'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-600 text-white'
                          : theme === 'dark'
                            ? 'bg-zinc-800 text-zinc-200'
                            : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Chat Bar */}
            <div className="px-6 pb-6">
              <div
                className={`relative rounded-[20px] transition-all duration-200 ${theme === 'dark'
                  ? 'bg-zinc-900/80 border border-zinc-700/50'
                  : 'bg-white/80 border border-gray-200/50'
                  }`}
                style={{
                  backdropFilter: 'blur(24px)',
                  boxShadow: theme === 'dark'
                    ? '0 12px 32px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)'
                    : '0 12px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="relative flex items-center gap-2 px-5 py-4">
                  {/* Input Field */}
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => {
                      setInputMessage(e.target.value);
                      if (e.target.value && !conversationExpanded && chatMessages.length > 1) {
                        setConversationExpanded(true);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        handleSendMessage();
                        if (chatMessages.length > 0) {
                          setConversationExpanded(true);
                        }
                      }
                    }}
                    onFocus={() => {
                      if (chatMessages.length > 1) {
                        setConversationExpanded(true);
                      }
                    }}
                    placeholder="Ask AI anything about this chapter..."
                    className={`flex-1 bg-transparent border-none outline-none text-sm ${theme === 'dark'
                      ? 'text-zinc-100 placeholder-zinc-500'
                      : 'text-gray-900 placeholder-gray-400'
                      }`}
                  />

                  {/* Right Side Icons */}
                  <div className="flex items-center gap-2">
                    {/* Microphone Button */}
                    <button
                      onClick={() => setVoiceMode(!voiceMode)}
                      className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all ${voiceMode
                        ? 'bg-emerald-500 text-white'
                        : theme === 'dark'
                          ? 'hover:bg-zinc-800 text-zinc-400'
                          : 'hover:bg-gray-100 text-gray-600'
                        }`}
                    >
                      {/* Pulsing Ring for Active Voice Mode */}
                      {voiceMode && (
                        <>
                          <div className="absolute inset-0 rounded-xl bg-emerald-500/40 animate-ping" />
                          <div className="absolute inset-0 rounded-xl bg-emerald-500/20 animate-pulse" />
                        </>
                      )}
                      <Mic className="w-4 h-4 relative z-10" />
                    </button>

                    {/* Send Button */}
                    <button
                      onClick={() => {
                        handleSendMessage();
                        if (chatMessages.length >= 0) {
                          setConversationExpanded(true);
                        }
                      }}
                      disabled={!inputMessage.trim()}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${!inputMessage.trim()
                        ? theme === 'dark'
                          ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-600/30'
                        }`}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate Summary Confirmation Modal */}
      {showSummaryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <div
            className={`w-full max-w-md mx-4 rounded-xl p-6 ${theme === 'dark'
              ? 'bg-zinc-900 border border-zinc-800'
              : 'bg-white border border-gray-200'
              }`}
          >
            <h3
              className={`text-lg mb-3 ${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
                }`}
            >
              Generate Lesson Summary?
            </h3>
            <p
              className={`text-sm mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                }`}
            >
              Generating this lesson summary will finalize your current session. You won't be able to add more topics after this. Do you want to continue?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowSummaryModal(false)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${theme === 'dark'
                  ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmGenerateSummary}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${theme === 'dark'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
              >
                Generate Summary
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-[60] animate-in slide-in-from-right-8 fade-in duration-300">
          <div
            className={`rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 ${theme === 'dark'
              ? 'bg-zinc-900 border border-zinc-800'
              : 'bg-white border border-gray-200'
              }`}
            style={{
              minWidth: '320px',
              boxShadow: theme === 'dark'
                ? '0 10px 40px rgba(0, 0, 0, 0.5)'
                : '0 10px 40px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-emerald-500" />
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'}`}>
              Lesson summary generated and saved to SharePoint.
            </p>
          </div>
        </div>
      )}
      <FileSelectionModal
        isOpen={showFileModal}
        onClose={() => setShowFileModal(false)}
        onFileSelect={handleFileSelect}
        theme={theme}
        filterFolder="Lessons"
      />
    </div>
  );
}